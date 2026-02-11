import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import authService from '../services/authService';

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // Backend requires: 8+ chars, uppercase, lowercase, number, special char
        if (password.length < 8) return false;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = 'First name must be at least 2 characters';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = 'Last name must be at least 2 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be 8+ characters with uppercase, lowercase, number, and special character';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        // Call backend API
        const result = await authService.signup({
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.toLowerCase().trim(),
            password: formData.password
        });

        setIsLoading(false);

        if (result.success) {
            // Navigate to OTP verification page
            navigate('/verify-otp', {
                state: {
                    email: result.email || formData.email.toLowerCase().trim(),
                    purpose: 'signup',
                    devOtp: result.devOtp || null // Pass dev OTP if SMTP not configured
                }
            });
        } else {
            setErrors({ general: result.error || 'Signup failed. Please try again.' });
        }
    };

    return (
        <div className="page-container" style={{
            minHeight: 'calc(100vh - 160px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '520px'
            }}>
                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80px',
                        height: '80px',
                        borderRadius: 'var(--radius-full)',
                        background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                        marginBottom: '1.5rem',
                        boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)'
                    }}>
                        <UserPlus size={40} color="#fff" />
                    </div>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        marginBottom: '0.5rem',
                        background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Create Account
                    </h1>
                    <p style={{
                        fontSize: '1rem',
                        color: 'var(--color-text-muted)'
                    }}>
                        Join FactsScan for healthier food choices
                    </p>
                </div>

                {/* Signup Form */}
                <div style={{
                    background: 'var(--gradient-card)',
                    borderRadius: 'var(--radius-2xl)',
                    padding: '2.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                }}>
                    {errors.general && (
                        <div style={{
                            padding: '1rem',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}>
                            <AlertCircle size={20} color="#ef4444" />
                            <span style={{ color: '#ef4444', fontSize: '0.9rem' }}>
                                {errors.general}
                            </span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Name Fields Row */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            {/* First Name */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    color: '#fff',
                                    fontWeight: '600',
                                    fontSize: '0.9rem'
                                }}>
                                    First Name
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <User
                                        size={18}
                                        style={{
                                            position: 'absolute',
                                            left: '0.75rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'var(--color-text-muted)'
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 0.875rem 0.875rem 2.5rem',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: `1px solid ${errors.firstName ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                                            borderRadius: 'var(--radius-lg)',
                                            color: '#fff',
                                            fontSize: '0.95rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                {errors.firstName && (
                                    <span style={{
                                        display: 'block',
                                        marginTop: '0.35rem',
                                        color: '#ef4444',
                                        fontSize: '0.8rem'
                                    }}>
                                        {errors.firstName}
                                    </span>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    color: '#fff',
                                    fontWeight: '600',
                                    fontSize: '0.9rem'
                                }}>
                                    Last Name
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <User
                                        size={18}
                                        style={{
                                            position: 'absolute',
                                            left: '0.75rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'var(--color-text-muted)'
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 0.875rem 0.875rem 2.5rem',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: `1px solid ${errors.lastName ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                                            borderRadius: 'var(--radius-lg)',
                                            color: '#fff',
                                            fontSize: '0.95rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                {errors.lastName && (
                                    <span style={{
                                        display: 'block',
                                        marginTop: '0.35rem',
                                        color: '#ef4444',
                                        fontSize: '0.8rem'
                                    }}>
                                        {errors.lastName}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Email Field */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: '#fff',
                                fontWeight: '600'
                            }}>
                                Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail
                                    size={20}
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--color-text-muted)'
                                    }}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1rem 1rem 3rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: `1px solid ${errors.email ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                                        borderRadius: 'var(--radius-lg)',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            {errors.email && (
                                <span style={{
                                    display: 'block',
                                    marginTop: '0.5rem',
                                    color: '#ef4444',
                                    fontSize: '0.85rem'
                                }}>
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        {/* Password Field */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: '#fff',
                                fontWeight: '600'
                            }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock
                                    size={20}
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--color-text-muted)'
                                    }}
                                />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="At least 6 characters"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 3rem 1rem 3rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: `1px solid ${errors.password ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                                        borderRadius: 'var(--radius-lg)',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--color-text-muted)',
                                        padding: '0.25rem',
                                        display: 'flex'
                                    }}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <span style={{
                                    display: 'block',
                                    marginTop: '0.5rem',
                                    color: '#ef4444',
                                    fontSize: '0.85rem'
                                }}>
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: '#fff',
                                fontWeight: '600'
                            }}>
                                Confirm Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock
                                    size={20}
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--color-text-muted)'
                                    }}
                                />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Re-enter your password"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 3rem 1rem 3rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: `1px solid ${errors.confirmPassword ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                                        borderRadius: 'var(--radius-lg)',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--color-text-muted)',
                                        padding: '0.25rem',
                                        display: 'flex'
                                    }}
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <span style={{
                                    display: 'block',
                                    marginTop: '0.5rem',
                                    color: '#ef4444',
                                    fontSize: '0.85rem'
                                }}>
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>

                        {/* Signup Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: isLoading
                                    ? 'rgba(124, 58, 237, 0.5)'
                                    : 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                                border: 'none',
                                borderRadius: 'var(--radius-lg)',
                                color: '#fff',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)'
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.5)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(124, 58, 237, 0.4)';
                            }}
                        >
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div style={{
                        marginTop: '1.5rem',
                        textAlign: 'center',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <p style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '0.95rem'
                        }}>
                            Already registered?{' '}
                            <Link
                                to="/login"
                                style={{
                                    color: '#7c3aed',
                                    textDecoration: 'none',
                                    fontWeight: '600'
                                }}
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
