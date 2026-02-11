import { Shield, Lock, Eye, UserCheck, Database, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    const lastUpdated = "February 3, 2026";

    const sections = [
        {
            icon: Database,
            title: "Information We Collect",
            content: [
                "When you use FactsScan, we collect minimal information to provide you with the best possible experience:",
                "• Product barcode scans for nutritional analysis",
                "• Search queries to improve our product database",
                "• Usage analytics to enhance app performance",
                "• Device information for compatibility purposes",
                "We do not collect personally identifiable information without your explicit consent."
            ]
        },
        {
            icon: Lock,
            title: "How We Use Your Information",
            content: [
                "Your data is used solely to:",
                "• Provide accurate nutritional information",
                "• Improve our product database and search functionality",
                "• Analyze app performance and user experience",
                "• Send important updates about our service (with your permission)",
                "We never sell, rent, or share your personal information with third parties for marketing purposes."
            ]
        },
        {
            icon: Cookie,
            title: "Cookies and Tracking",
            content: [
                "FactsScan uses minimal cookies and tracking technologies:",
                "• Essential cookies for app functionality",
                "• Analytics cookies to understand user behavior (anonymized)",
                "• Preference cookies to remember your settings",
                "You can control cookie preferences through your browser settings. Disabling certain cookies may affect app functionality."
            ]
        },
        {
            icon: Eye,
            title: "Third-Party Services",
            content: [
                "We integrate with trusted third-party services:",
                "• Open Food Facts API for comprehensive product data",
                "• Analytics platforms for usage insights (anonymized data only)",
                "• Cloud hosting providers for reliable service delivery",
                "These services have their own privacy policies, which we encourage you to review."
            ]
        },
        {
            icon: Shield,
            title: "Data Security",
            content: [
                "We implement industry-standard security measures:",
                "• Encrypted data transmission (HTTPS/SSL)",
                "• Secure cloud infrastructure",
                "• Regular security audits and updates",
                "• Limited access to user data on a need-to-know basis",
                "While we strive to protect your information, no system is 100% secure. We cannot guarantee absolute security."
            ]
        },
        {
            icon: UserCheck,
            title: "Your Rights",
            content: [
                "You have the right to:",
                "• Access the data we have collected about you",
                "• Request correction of inaccurate information",
                "• Request deletion of your data",
                "• Opt-out of analytics and marketing communications",
                "• Export your data in a portable format",
                "To exercise these rights, please contact us at privacy@factsscan.com"
            ]
        }
    ];

    return (
        <div className="page-container">
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                borderRadius: 'var(--radius-3xl)',
                padding: '3rem 2rem',
                marginBottom: '3rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)'
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
                    <Shield size={40} color="#fff" />
                </div>
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: '900',
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Privacy Policy
                </h1>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-text-muted)',
                    maxWidth: '700px',
                    margin: '0 auto 1rem'
                }}>
                    Your privacy matters to us. This policy outlines how we collect, use, and protect your information.
                </p>
                <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                    fontStyle: 'italic'
                }}>
                    Last Updated: {lastUpdated}
                </p>
            </div>

            {/* Introduction */}
            <div style={{
                background: 'var(--gradient-card)',
                borderRadius: 'var(--radius-2xl)',
                padding: '2rem',
                marginBottom: '3rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#fff'
                }}>
                    Welcome to FactsScan
                </h2>
                <p style={{
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.8',
                    fontSize: '1rem'
                }}>
                    At FactsScan, we are committed to protecting your privacy and ensuring transparency in how we handle your data.
                    This Privacy Policy explains our practices regarding the collection, use, and disclosure of information when you
                    use our food scanning and nutritional analysis service. By using FactsScan, you agree to the terms outlined in
                    this policy. If you have any questions or concerns, please don't hesitate to contact us.
                </p>
            </div>

            {/* Policy Sections */}
            <div style={{
                display: 'grid',
                gap: '2rem',
                marginBottom: '3rem'
            }}>
                {sections.map((section, index) => (
                    <div
                        key={index}
                        style={{
                            background: 'var(--gradient-card)',
                            borderRadius: 'var(--radius-2xl)',
                            padding: '2rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'transform 0.3s, box-shadow 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(124, 58, 237, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: 'var(--radius-lg)',
                                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <section.icon size={24} color="#7c3aed" />
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#fff'
                            }}>
                                {section.title}
                            </h3>
                        </div>
                        <div>
                            {section.content.map((paragraph, idx) => (
                                <p
                                    key={idx}
                                    style={{
                                        color: 'var(--color-text-muted)',
                                        lineHeight: '1.8',
                                        fontSize: '1rem',
                                        marginBottom: paragraph.startsWith('•') ? '0.5rem' : '1rem'
                                    }}
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Changes to Policy */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                borderRadius: 'var(--radius-2xl)',
                padding: '2rem',
                marginBottom: '3rem',
                border: '1px solid rgba(124, 58, 237, 0.3)'
            }}>
                <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#fff'
                }}>
                    Changes to This Policy
                </h3>
                <p style={{
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.8',
                    fontSize: '1rem'
                }}>
                    We may update our Privacy Policy from time to time to reflect changes in our practices or for legal reasons.
                    We will notify you of any significant changes by posting the new Privacy Policy on this page and updating the
                    "Last Updated" date. We encourage you to review this policy periodically for any changes.
                </p>
            </div>

            {/* Contact Information */}
            <div style={{
                background: 'var(--gradient-card)',
                borderRadius: 'var(--radius-2xl)',
                padding: '2rem',
                marginBottom: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center'
            }}>
                <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#fff'
                }}>
                    Questions or Concerns?
                </h3>
                <p style={{
                    color: 'var(--color-text-muted)',
                    marginBottom: '1.5rem',
                    lineHeight: '1.8'
                }}>
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <a
                        href="mailto:privacy@factsscan.com"
                        style={{
                            color: '#7c3aed',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        privacy@factsscan.com
                    </a>
                    <a
                        href="mailto:support@factsscan.com"
                        style={{
                            color: '#7c3aed',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        support@factsscan.com
                    </a>
                </div>
            </div>

            {/* Back to Home */}
            <div style={{ textAlign: 'center' }}>
                <Link
                    to="/"
                    style={{
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: '600',
                        transition: 'transform 0.3s, box-shadow 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(124, 58, 237, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
