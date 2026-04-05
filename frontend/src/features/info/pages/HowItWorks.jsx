
import { motion } from 'framer-motion';
import { Apple, Leaf, Activity, AlertTriangle, Target, Microscope, Users, TrendingUp, X, Check } from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const ComponentCard = ({ number, icon: Icon, title, description, color }) => (
    <motion.div variants={fadeInUp} className="glass-card" style={{
        padding: '2.5rem',
        borderRadius: 'var(--radius-2xl)',
        border: `1px solid ${color}20`,
        background: `linear-gradient(135deg, ${color}08 0%, rgba(255,255,255,0.03) 100%)`
    }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
            <div style={{
                minWidth: '60px',
                height: '60px',
                borderRadius: '16px',
                background: `${color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color
            }}>
                <Icon size={30} />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '800',
                    color: color,
                    marginBottom: '0.5rem'
                }}>
                    COMPONENT {number}
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem' }}>{title}</h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                    {description}
                </p>
            </div>
        </div>
    </motion.div>
);

const PrincipleCard = ({ icon: Icon, title, description }) => (
    <motion.div variants={fadeInUp} style={{ textAlign: 'center' }}>
        <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: '#000'
        }}>
            <Icon size={36} />
        </div>
        <h4 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.75rem' }}>{title}</h4>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{description}</p>
    </motion.div>
);

const HowItWorks = () => {
    return (
        <div className="container" style={{ paddingBottom: '6rem' }}>

            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                style={{ textAlign: 'center', padding: '4rem 0 6rem 0' }}
            >
                <motion.div variants={fadeInUp} style={{
                    display: 'inline-block',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '50px',
                    background: 'rgba(132, 204, 22, 0.15)',
                    border: '1px solid rgba(132, 204, 22, 0.3)',
                    marginBottom: '1.5rem',
                    color: 'var(--color-primary)',
                    fontWeight: '700'
                }}>
                    The FactsScan Rating System
                </motion.div>

                <motion.h1 variants={fadeInUp} style={{
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    fontWeight: '800',
                    lineHeight: 1.1,
                    marginBottom: '1.5rem'
                }}>
                    Science-Backed.<br /><span className="text-gradient">Simple. Transparent.</span>
                </motion.h1>

                <motion.p variants={fadeInUp} style={{
                    fontSize: '1.3rem',
                    color: 'var(--color-text-muted)',
                    maxWidth: '800px',
                    margin: '0 auto 2rem auto',
                    lineHeight: 1.6
                }}>
                    We give every packaged food a simple rating from <strong style={{ color: 'var(--color-primary)' }}>0 to 5</strong>, so you can quickly understand how healthy it really is.
                </motion.p>
            </motion.section>

            {/* Why Beyond Nutri-Score */}
            <section style={{ padding: '4rem 1.5rem', background: 'rgba(0,0,0,0.2)', margin: '0 -1.5rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                        Unlike Simple Grades, We Look Deeper
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                        While front-of-pack marketing claims only highlight what sounds good, the <strong>FactsScan Rating System</strong> evaluates a product's <strong>nutrition profile</strong>, <strong>ingredient health impact</strong>, <strong>processing level</strong>, and <strong>harmful additives</strong>. It cuts through misleading claims and shows you the real health impact of what you're eating.
                    </p>
                </div>
            </section>

            {/* 4 Components */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                style={{ padding: '6rem 0' }}
            >
                <h2 className="section-title">Built on Four Core Components</h2>
                <p className="section-subtitle">Each component reflects a different aspect of a food's health impact.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
                    <ComponentCard
                        number="01"
                        icon={Apple}
                        title="Nutrition Profile"
                        description="We assess key nutrients relevant to the food category, both good and bad. Negative nutrients like sugar, sodium, and saturated fat are evaluated for their excess. Positive nutrients like fiber, protein, and minerals are rewarded where relevant. All assessments happen within the product's category."
                        color="#22c55e"
                    />
                    <ComponentCard
                        number="02"
                        icon={Leaf}
                        title="Ingredient Health Impact"
                        description="Ingredients matter just as much as nutrients. Each ingredient is evaluated for its health impact. Products made with wholesome, minimally processed ingredients score better than those using refined or low-nutrition substitutes. This ensures the score reflects what the food is actually made of."
                        color="#84cc16"
                    />
                    <ComponentCard
                        number="03"
                        icon={Activity}
                        title="Processing Level"
                        description="The degree of industrial processing matters. Less processing = better score. More processing = lower score. This includes how far the food is from its original form, based on the internationally recognized NOVA classification system."
                        color="#0ea5e9"
                    />
                    <ComponentCard
                        number="04"
                        icon={AlertTriangle}
                        title="Penalty for Harmful Additives"
                        description="The score is reduced if the product contains additives such as artificial colors, artificial sweeteners, emulsifiers, synthetic flavors, or partially hydrogenated oils. Only substances with red flags in scientific literature or regulatory discussions are penalized."
                        color="#f97316"
                    />
                </div>
            </motion.section>

            {/* Final Score */}
            <section style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="glass-panel" style={{
                    padding: '4rem',
                    borderRadius: 'var(--radius-3xl)',
                    background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%)'
                }}>
                    <Target size={60} style={{ margin: '0 auto 2rem', color: 'var(--color-primary)' }} />
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                        Final Score & Rating
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.7' }}>
                        The combined score from all four components is converted into a <strong>0-5 rating</strong>, along with a clear verdict and color coding to help you quickly understand the overall quality. This rating reflects the <strong>overall health impact</strong>, not just one nutrient or claim.
                    </p>
                </div>
            </section>

            {/* What We Don't Do */}
            <section style={{ padding: '4rem 0' }}>
                <h2 className="section-title">What We Don't Do</h2>
                <p className="section-subtitle">To ensure clarity, here's what the FactsScan Rating System does not do.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                    {[
                        { icon: X, title: 'Compare Across Categories', text: 'Ratings are meaningful only when compared within a category.' },
                        { icon: X, title: 'Personalize Ratings', text: 'Every product receives a universal rating based on its contents.' },
                        { icon: X, title: 'Rate Home-Cooked Food', text: 'Designed specifically for labelled, packaged food products.' },
                        { icon: X, title: 'Consider Brand or Price', text: 'The score is about what\'s inside, not who sells it.' },
                        { icon: X, title: 'Allow Advertiser Influence', text: 'All ratings are generated independently, without bias.' }
                    ].map((item, idx) => (
                        <div key={idx} className="glass-card" style={{
                            padding: '2rem',
                            borderRadius: 'var(--radius-xl)',
                            textAlign: 'center',
                            border: '1px solid rgba(239, 68, 68, 0.2)'
                        }}>
                            <item.icon size={40} style={{ color: '#ef4444', margin: '0 auto 1rem' }} />
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>{item.title}</h4>
                            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Guiding Principles */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                style={{ padding: '6rem 0' }}
            >
                <h2 className="section-title">Our Guiding Principles</h2>
                <p className="section-subtitle">Every rating is built on these core values.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginTop: '4rem' }}>
                    <PrincipleCard
                        icon={Microscope}
                        title="Science-First"
                        description="Every score is based on validated nutrition science, not trends or marketing."
                    />
                    <PrincipleCard
                        icon={Target}
                        title="Transparency"
                        description="Ratings are explainable and grounded in clear criteria, available to all."
                    />
                    <PrincipleCard
                        icon={Users}
                        title="Consumer-Centric"
                        description="Built for simplicity, without jargon. Usable in everyday choices."
                    />
                    <PrincipleCard
                        icon={TrendingUp}
                        title="Continuously Updated"
                        description="Reflects changes in regulatory norms and food industry shifts."
                    />
                </div>
            </motion.section>

        </div>
    );
};

export default HowItWorks;
