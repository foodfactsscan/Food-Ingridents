import express from 'express';
import { authenticateToken } from './auth-simple.js';
import { profilesDB } from '../db.js';

const router = express.Router();

// ═══════════════════════════════════════════
// GET /api/profile - Get user profile
// ═══════════════════════════════════════════
router.get('/', authenticateToken, (req, res) => {
    try {
        const profile = profilesDB.get(req.userEmail) || null;
        res.json({ success: true, profile });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ═══════════════════════════════════════════
// PUT /api/profile - Update user profile
// ═══════════════════════════════════════════
router.put('/', authenticateToken, (req, res) => {
    try {
        const {
            firstName,
            lastName,
            profilePhoto,
            gender,
            age,
            heightCm,
            weightKg,
            goal,
            chronicDiseases,
            temporaryIssues,
            customHealthIssues,
            customGoals
        } = req.body;

        const existingProfile = profilesDB.get(req.userEmail) || {};

        const updatedProfile = {
            ...existingProfile,
            email: req.userEmail,
            firstName: firstName !== undefined ? firstName : (existingProfile.firstName || ''),
            lastName: lastName !== undefined ? lastName : (existingProfile.lastName || ''),
            profilePhoto: profilePhoto !== undefined ? profilePhoto : (existingProfile.profilePhoto || ''),
            gender: gender !== undefined ? gender : (existingProfile.gender || ''),
            age: age !== undefined ? age : (existingProfile.age || null),
            heightCm: heightCm !== undefined ? heightCm : (existingProfile.heightCm || null),
            weightKg: weightKg !== undefined ? weightKg : (existingProfile.weightKg || null),
            goal: goal !== undefined ? goal : (existingProfile.goal || ''),
            chronicDiseases: chronicDiseases !== undefined ? chronicDiseases : (existingProfile.chronicDiseases || []),
            temporaryIssues: temporaryIssues !== undefined ? temporaryIssues : (existingProfile.temporaryIssues || []),
            customHealthIssues: customHealthIssues !== undefined ? customHealthIssues : (existingProfile.customHealthIssues || []),
            customGoals: customGoals !== undefined ? customGoals : (existingProfile.customGoals || []),
            updatedAt: new Date().toISOString()
        };

        // Save to file DB — persists across restarts
        profilesDB.set(req.userEmail, updatedProfile);

        res.json({
            success: true,
            message: 'Profile updated successfully',
            profile: updatedProfile
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ═══════════════════════════════════════════
// DELETE /api/profile/temporary-issue
// ═══════════════════════════════════════════
router.delete('/temporary-issue', authenticateToken, (req, res) => {
    try {
        const { issue } = req.body;
        const profile = profilesDB.get(req.userEmail);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.temporaryIssues = (profile.temporaryIssues || []).filter(i => i !== issue);
        profilesDB.set(req.userEmail, profile);

        res.json({ success: true, profile });
    } catch (error) {
        console.error('Delete temporary issue error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ═══════════════════════════════════════════
// POST /api/profile/history - Add/Update history item
// ═══════════════════════════════════════════
router.post('/history', authenticateToken, (req, res) => {
    try {
        const { barcode, productName, brand, image, grade } = req.body;

        if (!barcode) {
            return res.status(400).json({ message: 'Barcode is required' });
        }

        // Get existing profile or create scaffold
        const profile = profilesDB.get(req.userEmail) || { email: req.userEmail };

        // Initialize history if missing
        let history = Array.isArray(profile.history) ? profile.history : [];

        // Remove if exists (to bring to top)
        history = history.filter(item => item.barcode !== barcode);

        // Add new item to top
        history.unshift({
            barcode,
            productName: productName || 'Unknown Product',
            brand: brand || '',
            image: image || '',
            grade: grade || '?',
            scannedAt: new Date().toISOString()
        });

        // Limit to 50 items
        if (history.length > 50) {
            history = history.slice(0, 50);
        }

        // Save
        profile.history = history;
        profilesDB.set(req.userEmail, profile);

        res.json({ success: true, history });
    } catch (error) {
        console.error('Add history error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ═══════════════════════════════════════════
// DELETE /api/profile/history/:barcode - Remove item
// ═══════════════════════════════════════════
router.delete('/history/:barcode', authenticateToken, (req, res) => {
    try {
        const { barcode } = req.params;
        const profile = profilesDB.get(req.userEmail);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        let history = Array.isArray(profile.history) ? profile.history : [];
        const initialLength = history.length;

        history = history.filter(item => item.barcode !== barcode);

        if (history.length === initialLength) {
            return res.status(404).json({ message: 'Item not found in history' });
        }

        profile.history = history;
        profilesDB.set(req.userEmail, profile);

        res.json({ success: true, history });
    } catch (error) {
        console.error('Delete history error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
