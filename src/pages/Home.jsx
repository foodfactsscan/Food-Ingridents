
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scan, Search, Heart, ShieldCheck, Zap, Award, BookOpen, Leaf, Target, Baby, Activity } from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        variants={fadeInUp}
        className="glass-card"
        style={{
            padding: '2rem',
            borderRadius: 'var(--radius-2xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            height: '100%',
            border: '1px solid rgba(255,255,255,0.05)'
        }}
    >
        <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'rgba(132, 204, 22, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary)',
            marginBottom: '0.5rem'
        }}>
            <Icon size={30} />
        </div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: '700' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{description}</p>
    </motion.div>
);

const UseCaseCard = ({ icon: Icon, title, description }) => (
    <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{
            minWidth: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-secondary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold'
        }}>
            <Icon size={24} />
        </div>
        <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>{title}</h4>
            <p style={{ color: 'var(--color-text-muted)' }}>{description}</p>
        </div>
    </motion.div>
);

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <section style={{
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '6rem 0'
            }}>
                {/* Decorative Background Orbs */}
                <div className="animate-float" style={{
                    position: 'absolute', top: '15%', left: '5%', width: '350px', height: '350px',
                    background: 'var(--color-primary)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, zIndex: -1
                }} />
                <div className="animate-float" style={{
                    position: 'absolute', bottom: '10%', right: '5%', width: '500px', height: '500px',
                    background: 'var(--color-secondary)', borderRadius: '50%', filter: 'blur(130px)', opacity: 0.15, zIndex: -1, animationDelay: '2s'
                }} />

                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        style={{ maxWidth: '1000px', margin: '0 auto' }}
                    >
                        <motion.div variants={fadeInUp} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.5rem 1.5rem', borderRadius: '50px',
                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                            marginBottom: '2rem', color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.9rem'
                        }}>
                            <Award size={16} /> India's Best Food Scanner App
                        </motion.div>

                        <motion.h1 variants={fadeInUp} style={{
                            fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                            fontWeight: '800',
                            lineHeight: 1.05,
                            marginBottom: '1.5rem',
                            letterSpacing: '-0.02em'
                        }}>
                            Know Your Food,<br /><span className="text-gradient">Protect Your Health</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} style={{
                            fontSize: '1.4rem',
                            color: 'var(--color-text-muted)',
                            marginBottom: '3rem',
                            maxWidth: '800px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            lineHeight: 1.5
                        }}>
                            Get a <strong style={{ color: 'var(--color-primary)' }}>0-5 science-backed rating</strong> for every product. Instantly decode ingredients, detect allergens, and make smarter food choices with confidence.
                        </motion.p>

                        <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/scan" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem' }}>
                                <Scan size={24} /> Scan Product
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section style={{ padding: '6rem 0', background: 'rgba(0,0,0,0.2)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Making Healthy Eating <br /><span className="text-gradient">Simple & Accessible</span></h2>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                                India is witnessing a growing awareness around food safety. With lifestyle diseases on the rise, it's crucial to know what goes into your packaged foods.
                            </p>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                                Deciphering complex labels can be overwhelming. FactsScan empowers you with quick, reliable insights to avoid hidden sugars, palm oil, and preservatives.
                            </p>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-2xl)' }}>
                            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--color-primary)' }}>0-5</h3>
                                    <p>TruthIn Rating</p>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--color-accent)' }}>4</h3>
                                    <p>Key Components</p>
                                </div>
                            </div>
                            <Link to="/how-it-works" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                Learn How It Works
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Features Grid */}
            <section style={{ padding: '8rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className="section-title">Powerful App Features</h2>
                        <p className="section-subtitle">Everything you need to understand what's really in your food.</p>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}
                    >
                        <FeatureCard
                            icon={Scan}
                            title="Instant Barcode Scan"
                            description="Simply scan any barcode to instantly unlock nutrition facts, ingredient lists, and additives. Get valid health scores (Grade A-E) in seconds."
                        />
                        <FeatureCard
                            icon={BookOpen}
                            title="Label Decoder"
                            description="We translate complex chemical names into simple terms. Flag harmful ingredients like trans fats, palm oil, and artificial preservatives instantly."
                        />
                        <FeatureCard
                            icon={Target}
                            title="Smart Recommendations"
                            description="Found a Grade D product? Our AI automatically suggests healthier, cleaner alternatives (Grade A/B) within the same category."
                        />
                        <FeatureCard
                            icon={Award}
                            title="Expert-Curated Picks"
                            description="Explore lists created by nutrition experts. Find High Protein, Low Sugar, and High Fiber products that align with your wellness goals."
                        />
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Allergen Safety"
                            description="Life-saving alerts. We detect hidden allergens like nuts, gluten, and dairy, alerting you immediately if a product is unsafe for you."
                        />
                        <FeatureCard
                            icon={Leaf}
                            title="Custom Preferences"
                            description="Vegan? Gluten-free? Customize your profile to get personalized warnings and recommendations tailored to your lifestyle."
                        />
                    </motion.div>
                </div>
            </section>

            {/* Real World Use Cases */}
            <section style={{ padding: '6rem 0', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(132, 204, 22, 0.05) 100%)' }}>
                <div className="container">
                    <h2 className="section-title">Real-World Use Cases</h2>
                    <p className="section-subtitle">How FactsScan improves daily lives across India.</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '4rem' }}>
                        <UseCaseCard
                            icon={Baby}
                            title="For Parents"
                            description="Scanning kids' snacks to check for hidden sugars and allergens, ensuring safe and healthy choices for growing children."
                        />
                        <UseCaseCard
                            icon={Activity}
                            title="For Diabetics"
                            description="Verify sugar content and Glycemic impact in juices and packaged foods to manage blood glucose levels effectively."
                        />
                        <UseCaseCard
                            icon={Target}
                            title="Fitness Enthusiasts"
                            description="Avoid products with palm oil or low-quality fats. Find high-protein options that align perfectly with your workout goals."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '6rem 0', textAlign: 'center' }}>
                <div className="container">
                    <div className="glass-panel" style={{
                        padding: '5rem 2rem',
                        borderRadius: 'var(--radius-3xl)',
                        background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.2) 0%, rgba(14, 165, 233, 0.2) 100%)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem' }}>Ready to Eat Smarter?</h2>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
                            Join thousands of users making informed decisions every day. Start your journey to a healthier lifestyle now.
                        </p>
                        <Link to="/scan" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem' }}>
                            Get Started Now
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
