import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
    const lastUpdated = "February 3, 2026";

    const sections = [
        {
            icon: CheckCircle,
            title: "Acceptance of Terms",
            content: [
                "By accessing and using FactsScan, you accept and agree to be bound by the terms and conditions of this agreement. " +
                "If you do not agree to these terms, please do not use our service.",
                "These Terms of Service constitute a legally binding agreement between you and FactsScan. We reserve the right to " +
                "update these terms at any time, and your continued use of the service constitutes acceptance of any changes."
            ]
        },
        {
            icon: Users,
            title: "User Responsibilities",
            content: [
                "As a user of FactsScan, you agree to:",
                "• Use the service for lawful purposes only",
                "• Provide accurate information when scanning products",
                "• Not attempt to reverse engineer or compromise our systems",
                "• Not use automated tools to scrape or download our content",
                "• Respect intellectual property rights of FactsScan and third parties",
                "• Not misuse or abuse our service in any way",
                "Violation of these responsibilities may result in suspension or termination of your access to FactsScan."
            ]
        },
        {
            icon: Scale,
            title: "Service Description",
            content: [
                "FactsScan provides nutritional information and analysis for food products by:",
                "• Scanning product barcodes to retrieve nutritional data",
                "• Searching our database of food products from Open Food Facts",
                "• Providing health grades and nutritional insights",
                "• Offering comparison tools for informed decision-making",
                "Our service is provided 'as is' for informational and educational purposes. While we strive for accuracy, " +
                "we cannot guarantee the completeness or correctness of all nutritional information."
            ]
        },
        {
            icon: AlertTriangle,
            title: "Disclaimers and Limitations",
            content: [
                "Important disclaimers:",
                "• Nutritional information is sourced from third-party databases (primarily Open Food Facts)",
                "• We do not guarantee the accuracy, completeness, or timeliness of product information",
                "• FactsScan is not a substitute for professional medical or dietary advice",
                "• Always verify nutritional information with the actual product packaging",
                "• Consult healthcare professionals for personalized dietary recommendations",
                "• We are not liable for decisions made based on information from our service",
                "Use of FactsScan does not create a healthcare provider-patient relationship."
            ]
        },
        {
            icon: XCircle,
            title: "Limitation of Liability",
            content: [
                "To the fullest extent permitted by law:",
                "• FactsScan and its creators shall not be liable for any indirect, incidental, special, or consequential damages",
                "• We are not responsible for any health issues arising from dietary decisions",
                "• Our total liability shall not exceed the amount you paid to use our service (currently free)",
                "• We are not liable for service interruptions, data loss, or technical issues",
                "• We do not warrant that the service will be uninterrupted, secure, or error-free",
                "This limitation applies even if we have been advised of the possibility of such damages."
            ]
        },
        {
            icon: FileText,
            title: "Intellectual Property",
            content: [
                "All content, features, and functionality of FactsScan are owned by us and protected by copyright, trademark, " +
                "and other intellectual property laws.",
                "You are granted a limited, non-exclusive, non-transferable license to use FactsScan for personal, non-commercial purposes.",
                "You may not:",
                "• Reproduce, distribute, or create derivative works from our content",
                "• Use our trademarks or branding without permission",
                "• Remove or modify any copyright notices",
                "Product data from Open Food Facts is licensed under the Open Database License (ODbL)."
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
                    <FileText size={40} color="#fff" />
                </div>
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: '900',
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Terms of Service
                </h1>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-text-muted)',
                    maxWidth: '700px',
                    margin: '0 auto 1rem'
                }}>
                    Please read these terms carefully before using FactsScan. Your use of our service constitutes acceptance of these terms.
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
                    These Terms of Service ("Terms") govern your use of FactsScan, a web-based nutritional information platform.
                    By accessing or using our service, you agree to comply with and be bound by these Terms. If you disagree with
                    any part of these terms, you do not have permission to access our service. We encourage you to read these
                    terms carefully and contact us if you have any questions.
                </p>
            </div>

            {/* Terms Sections */}
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

            {/* Termination */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
                borderRadius: 'var(--radius-2xl)',
                padding: '2rem',
                marginBottom: '3rem',
                border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
                <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#fff'
                }}>
                    Termination
                </h3>
                <p style={{
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.8',
                    fontSize: '1rem'
                }}>
                    We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability,
                    for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right
                    to use the service will cease immediately.
                </p>
            </div>

            {/* Governing Law */}
            <div style={{
                background: 'var(--gradient-card)',
                borderRadius: 'var(--radius-2xl)',
                padding: '2rem',
                marginBottom: '3rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#fff'
                }}>
                    Governing Law
                </h3>
                <p style={{
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.8',
                    fontSize: '1rem'
                }}>
                    These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict
                    of law provisions. Any disputes arising from these Terms or your use of FactsScan shall be subject to the exclusive
                    jurisdiction of the courts in India.
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
                    Questions About These Terms?
                </h3>
                <p style={{
                    color: 'var(--color-text-muted)',
                    marginBottom: '1.5rem',
                    lineHeight: '1.8'
                }}>
                    If you have any questions about these Terms of Service, please contact us:
                </p>
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <a
                        href="mailto:legal@factsscan.com"
                        style={{
                            color: '#7c3aed',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        legal@factsscan.com
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

export default TermsOfService;
