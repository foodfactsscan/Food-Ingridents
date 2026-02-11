import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Check for success message from navigation
    useEffect(() => {
        if (location.state?.message) {
            setSuccess(location.state.message);
            // Clear message after 5 seconds
            setTimeout(() => setSuccess(''), 5000);
            // Clear navigation state
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const result = await login(formData.email, formData.password);

            if (result.success) {
                navigate('/');
            } else {
                setErrors({ general: result.error || 'Login failed. Please check your credentials.' });
            }
        } catch (error) {
            setErrors({ general: 'An unexpected error occurred. Please try again.' });
        } finally {
            setIsLoading(false);
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
                maxWidth: '480px'
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
                        <LogIn size={40} color="#fff" />
                    </div>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        marginBottom: '0.5rem',
                        background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Welcome Back
                    </h1>
                    <p style={{
                        fontSize: '1rem',
                        color: 'var(--color-text-muted)'
                    }}>
                        Sign in to access your account
                    </p>
                </div>

                {/* Login Form */}
                <div style={{
                    background: 'var(--gradient-card)',
                    borderRadius: 'var(--radius-2xl)',
                    padding: '2.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                }}>
                    {success && (
                        <div style={{
                            padding: '1rem',
                            background: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}>
                            <CheckCircle size={20} color="#22c55e" />
                            <span style={{ color: '#22c55e', fontSize: '0.9rem' }}>
                                {success}
                            </span>
                        </div>
                    )}

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
                            <div style={{
                                position: 'relative'
                            }}>
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
                                        outline: 'none',
                                        transition: 'border-color 0.3s'
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
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: '#fff',
                                fontWeight: '600'
                            }}>
                                Password
                            </label>
                            <div style={{
                                position: 'relative'
                            }}>
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
                                    placeholder="Enter your password"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 3rem 1rem 3rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: `1px solid ${errors.password ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                                        borderRadius: 'var(--radius-lg)',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s'
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
                                        display: 'flex',
                                        alignItems: 'center'
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

                        {/* Forgot Password Link */}
                        <div style={{
                            textAlign: 'right',
                            marginBottom: '1.5rem'
                        }}>
                            <Link
                                to="/forgot-password"
                                style={{
                                    color: '#7c3aed',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: '600'
                                }}
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
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
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Sign Up Link */}
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
                            Not registered?{' '}
                            <Link
                                to="/signup"
                                style={{
                                    color: '#7c3aed',
                                    textDecoration: 'none',
                                    fontWeight: '600'
                                }}
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
