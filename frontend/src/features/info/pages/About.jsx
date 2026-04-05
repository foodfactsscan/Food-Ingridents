import { motion } from 'framer-motion';
import { Sparkles, Target, Heart, TrendingUp, Shield, Users } from 'lucide-react';

const About = () => {
    return (
        <div className="container" style={{ paddingBottom: '4rem', paddingTop: '2rem' }}>
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem'
                }}>
                    FactsScan
                </h1>
                <p style={{
                    fontSize: '1.5rem',
                    color: 'var(--color-text-muted)',
                    fontStyle: 'italic',
                    marginBottom: '2rem'
                }}>
                    "Know What You Eat, Choose What's Right"
                </p>
                <div style={{
                    display: 'inline-block',
                    padding: '1rem 2rem',
                    background: 'rgba(124, 58, 237, 0.1)',
                    borderRadius: 'var(--radius-full)',
                    border: '2px solid rgba(124, 58, 237, 0.3)'
                }}>
                    <p style={{ fontSize: '1rem', color: '#7c3aed', fontWeight: '600' }}>
                        Crafted with 💜 by <strong>Harshal Unde</strong>
                    </p>
                </div>
            </motion.div>

            {/* Motivational Quote */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-card"
                style={{
                    padding: '3rem',
                    marginBottom: '3rem',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                    border: '1px solid rgba(124, 58, 237, 0.2)'
                }}
            >
                <div style={{ textAlign: 'center' }}>
                    <Sparkles size={48} color="#7c3aed" style={{ margin: '0 auto 1rem' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '700' }}>
                        Our Philosophy
                    </h2>
                    <p style={{
                        fontSize: '1.3rem',
                        fontStyle: 'italic',
                        color: 'var(--color-text-muted)',
                        lineHeight: '1.8',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        "In a world full of hidden ingredients and complex labels, transparency is not just a feature—it's a right.
                        Every scan brings you one step closer to understanding what truly nourishes your body."
                    </p>
                </div>
            </motion.div>

            {/* Mission, Vision, Values */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem'
            }}>
                {/* Mission */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card"
                    style={{ padding: '2rem' }}
                >
                    <Target size={40} color="#22c55e" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                        Our Mission
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                        To empower every individual with instant, accurate nutritional insights,
                        transforming the way we understand and interact with packaged food.
                        We believe everyone deserves access to transparent food information.
                    </p>
                </motion.div>

                {/* Vision */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card"
                    style={{ padding: '2rem' }}
                >
                    <TrendingUp size={40} color="#7c3aed" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                        Our Vision
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                        To become the most trusted companion in every household's journey toward
                        healthier eating habits, making nutritional literacy accessible to millions
                        across India and beyond.
                    </p>
                </motion.div>

                {/* Values */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card"
                    style={{ padding: '2rem' }}
                >
                    <Heart size={40} color="#ec4899" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                        Our Values
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                        <strong>Transparency</strong> in data, <strong>Simplicity</strong> in design,
                        <strong>Accuracy</strong> in information, and <strong>Compassion</strong> for
                        every user's health journey. We're committed to your wellness.
                    </p>
                </motion.div>
            </div>

            {/* Goals */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card"
                style={{ padding: '3rem', marginBottom: '3rem' }}
            >
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>
                    Our Goals
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: '#22c55e',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '700',
                                color: '#000'
                            }}>1</div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Reach 1M Users</h4>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                            Impact a million lives by helping them make informed food choices every single day.
                        </p>
                    </div>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: '#7c3aed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '700',
                                color: '#fff'
                            }}>2</div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '600' }}>100% Accuracy</h4>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                            Maintain the highest standards of data accuracy with regular updates and validation.
                        </p>
                    </div>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: '#ec4899',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '700',
                                color: '#fff'
                            }}>3</div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Community Driven</h4>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                            Build a thriving community of health-conscious individuals sharing insights and reviews.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Motivational Quotes Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{ marginBottom: '3rem' }}
            >
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>
                    Words That Inspire Us
                </h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {[
                        {
                            quote: "Your health is an investment, not an expense. Every informed choice today builds a healthier tomorrow.",
                            author: "Health Philosophy"
                        },
                        {
                            quote: "Knowledge is power, especially when it comes to understanding what fuels your body.",
                            author: "Nutritional Wisdom"
                        },
                        {
                            quote: "The journey to wellness begins with a single scan. Start today, transform forever.",
                            author: "FactsScan Team"
                        }
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                padding: '1.5rem 2rem',
                                background: 'rgba(255,255,255,0.05)',
                                borderLeft: '4px solid #7c3aed',
                                borderRadius: 'var(--radius-lg)'
                            }}
                        >
                            <p style={{
                                fontSize: '1.1rem',
                                fontStyle: 'italic',
                                marginBottom: '0.75rem',
                                lineHeight: '1.7'
                            }}>
                                "{item.quote}"
                            </p>
                            <p style={{
                                fontSize: '0.9rem',
                                color: '#7c3aed',
                                fontWeight: '600'
                            }}>
                                — {item.author}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* About the Creator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass-card"
                style={{
                    padding: '3rem',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
                    textAlign: 'center'
                }}
            >
                <Users size={48} color="#7c3aed" style={{ margin: '0 auto 1.5rem' }} />
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
                    About the Creator
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.8',
                    maxWidth: '700px',
                    margin: '0 auto 1.5rem'
                }}>
                    <strong>Harshal Unde</strong> is a passionate developer dedicated to leveraging technology
                    for social good. With a vision to democratize nutritional information, Harshal created
                    FactsScan to bridge the gap between complex food labels and everyday consumers.
                </p>
                <p style={{
                    fontSize: '1rem',
                    fontStyle: 'italic',
                    color: '#7c3aed',
                    fontWeight: '600'
                }}>
                    "Technology should serve humanity, not complicate it."
                </p>
            </motion.div>

            {/* Technical Excellence */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="glass-card"
                style={{ padding: '3rem', marginTop: '3rem' }}
            >
                <Shield size={48} color="#22c55e" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>
                    Why FactsScan?
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    textAlign: 'center'
                }}>
                    {[
                        { label: 'Instant Scanning', value: '< 2 sec' },
                        { label: 'Product Database', value: '2M+' },
                        { label: 'Accuracy Rate', value: '99.9%' },
                        { label: 'Indian Products', value: '500K+' }
                    ].map((stat, idx) => (
                        <div key={idx}>
                            <div style={{
                                fontSize: '2.5rem',
                                fontWeight: '800',
                                background: 'linear-gradient(135deg, #22c55e 0%, #7c3aed 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '0.5rem'
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default About;
