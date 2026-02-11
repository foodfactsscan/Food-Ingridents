import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendOTPEmail, generateOTP, isSmtpConfigured } from '../services/emailService.js';
import { usersDB } from '../db.js';

const router = express.Router();

// OTPs stay in-memory (they're temporary, 5-min expiry)
const otps = new Map();

// JWT secret from env or auto-generated
const JWT_SECRET = process.env.JWT_SECRET || 'factsscan-dev-secret-change-in-production';
const JWT_EXPIRES_IN = '30d'; // Token valid for 30 days

// Helper: Check if we're in dev mode (no SMTP)
const isDevMode = () => !isSmtpConfigured();

// Helper: Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { email: user.email, firstName: user.firstName, lastName: user.lastName },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

// Helper: Verify JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
};

// Middleware: Authenticate token
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        // Fallback: try base64 decode for old tokens
        try {
            const legacy = JSON.parse(Buffer.from(token, 'base64').toString());
            if (legacy.email) {
                req.userEmail = legacy.email;
                return next();
            }
        } catch (e) { /* ignore */ }
        return res.status(401).json({ message: 'Invalid or expired token. Please login again.' });
    }

    req.userEmail = decoded.email;
    next();
};

// ═══════════════════════════════════════════
// POST /api/auth/signup
// ═══════════════════════════════════════════
router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const emailLower = email.toLowerCase().trim();

        // Check if user exists and already verified
        const existingUser = usersDB.get(emailLower);
        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({ message: 'Email already registered. Please login.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store user (not verified yet)
        usersDB.set(emailLower, {
            firstName,
            lastName,
            email: emailLower,
            password: hashedPassword,
            isVerified: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        // Generate and store OTP
        const otp = generateOTP();
        otps.set(emailLower, {
            otp,
            type: 'signup',
            expiresAt: Date.now() + 5 * 60 * 1000,
            attempts: 0
        });

        // Send Email (or fallback to console in dev mode)
        await sendOTPEmail(emailLower, otp, 'signup');

        const response = {
            success: true,
            message: 'OTP sent to your email. Please verify to complete registration.',
            email: emailLower
        };

        // In dev mode (no SMTP), include OTP in response
        if (isDevMode()) {
            response.devOtp = otp;
            response.message = 'DEV MODE: Your OTP is shown below. Enter it to verify.';
        }

        res.status(201).json(response);
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
});

// ═══════════════════════════════════════════
// POST /api/auth/verify-otp
// ═══════════════════════════════════════════
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp, type } = req.body;
        const emailLower = email.toLowerCase().trim();
        const otpData = otps.get(emailLower);

        // Validation
        if (!otpData || otpData.type !== type) {
            return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
        }
        if (Date.now() > otpData.expiresAt) {
            otps.delete(emailLower);
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }
        if (otpData.otp !== otp.trim()) {
            otpData.attempts++;
            if (otpData.attempts >= 5) {
                otps.delete(emailLower);
                return res.status(400).json({ message: 'Too many attempts. Request a new OTP.' });
            }
            return res.status(400).json({ message: `Invalid OTP. ${5 - otpData.attempts} attempts remaining.` });
        }

        // OTP Verified — clear it
        otps.delete(emailLower);

        if (type === 'signup') {
            const user = usersDB.get(emailLower);
            if (!user) return res.status(404).json({ message: 'User not found' });

            // Mark as verified and save to file DB
            user.isVerified = true;
            user.verifiedAt = new Date().toISOString();
            user.updatedAt = new Date().toISOString();
            usersDB.set(emailLower, user);

            // Generate JWT token
            const token = generateToken(user);

            res.json({
                success: true,
                message: 'Email verified successfully!',
                token,
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isVerified: true
                }
            });
        } else {
            // forgot-password OTP verified
            res.json({ success: true, message: 'OTP Verified' });
        }
    } catch (error) {
        console.error('Verify error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ═══════════════════════════════════════════
// POST /api/auth/resend-otp
// ═══════════════════════════════════════════
router.post('/resend-otp', async (req, res) => {
    try {
        const { email, type } = req.body;
        const emailLower = email.toLowerCase().trim();

        if (type === 'forgot-password' && !usersDB.has(emailLower)) {
            return res.status(404).json({ message: 'No account found with this email' });
        }

        const otp = generateOTP();
        otps.set(emailLower, {
            otp,
            type,
            expiresAt: Date.now() + 5 * 60 * 1000,
            attempts: 0
        });

        await sendOTPEmail(emailLower, otp, type);

        const response = { success: true, message: 'New OTP sent' };

        if (isDevMode()) {
            response.devOtp = otp;
            response.message = 'DEV MODE: New OTP generated. Check below.';
        }

        res.json(response);
    } catch (error) {
        console.error('Resend error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ═══════════════════════════════════════════
// POST /api/auth/login
// ═══════════════════════════════════════════
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const emailLower = email.toLowerCase().trim();
        const user = usersDB.get(emailLower);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password. Please check your credentials.' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password. Please check your credentials.' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: 'Email not verified. Please sign up again to verify.', needsVerification: true });
        }

        // Update last login
        user.lastLogin = new Date().toISOString();
        usersDB.set(emailLower, user);

        // Generate JWT token
        const token = generateToken(user);

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isVerified: true
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// ═══════════════════════════════════════════
// POST /api/auth/forgot-password
// ═══════════════════════════════════════════
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const emailLower = email.toLowerCase().trim();

        if (!usersDB.has(emailLower)) {
            return res.status(404).json({ message: 'No account found with this email' });
        }

        const otp = generateOTP();
        otps.set(emailLower, {
            otp,
            type: 'forgot-password',
            expiresAt: Date.now() + 5 * 60 * 1000,
            attempts: 0
        });

        await sendOTPEmail(emailLower, otp, 'forgot-password');

        const response = { success: true, message: 'Password reset OTP sent to your email' };

        if (isDevMode()) {
            response.devOtp = otp;
            response.message = 'DEV MODE: Password reset OTP generated. Check below.';
        }

        res.json(response);
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ═══════════════════════════════════════════
// POST /api/auth/reset-password
// ═══════════════════════════════════════════
router.post('/reset-password', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const emailLower = email.toLowerCase().trim();
        const user = usersDB.get(emailLower);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.updatedAt = new Date().toISOString();
        usersDB.set(emailLower, user);

        // Clear any OTPs
        otps.delete(emailLower);

        res.json({ success: true, message: 'Password reset successfully. Please login with your new password.' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
