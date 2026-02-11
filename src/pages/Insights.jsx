import { motion } from 'framer-motion';
import { TrendingUp, Award, AlertTriangle, Lightbulb, BarChart3, Users, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Insights = () => {
    const topScannedProducts = [
        { name: 'Maggi 2-Minute Noodles', category: 'Instant Noodles', scans: '125K+', grade: 'D', color: '#f97316' },
        { name: 'Parle-G Biscuits', category: 'Biscuits', scans: '98K+', grade: 'C', color: '#eab308' },
        { name: 'Coca-Cola', category: 'Beverages', scans: '87K+', grade: 'E', color: '#ef4444' },
        { name: 'Amul Milk', category: 'Dairy', scans: '76K+', grade: 'B', color: '#84cc16' },
        { name: 'Britannia Good Day', category: 'Cookies', scans: '65K+', grade: 'C', color: '#eab308' }
    ];

    const healthInsights = [
        {
            icon: AlertTriangle,
            color: '#ef4444',
            title: 'Most Concerning Additive',
            subtitle: 'E621 (MSG)',
            description: 'Found in 45% of processed foods. May cause headaches in sensitive individuals.',
            action: 'Learn More',
            link: 'https://world.openfoodfacts.org/additive/e621-monosodium-glutamate',
            external: true
        },
        {
            icon: Award,
            color: '#22c55e',
            title: 'Healthiest Category',
            subtitle: 'Dairy & Milk Products',
            description: 'Average grade: B. Rich in protein and calcium with minimal processing.',
            action: 'Explore Products',
            link: '/scan',
            external: false
        },
        {
            icon: TrendingUp,
            color: '#7c3aed',
            title: 'Growing Trend',
            subtitle: 'Organic Products',
            description: '32% increase in scans for organic-labeled products this month.',
            action: 'View Trends',
            link: '#category-breakdown',
            external: false
        }
    ];

    const nutritionTips = [
        {
            icon: '🥗',
            title: 'Check Sodium Levels',
            tip: 'Limit sodium intake to 2000mg/day. Many packaged foods exceed 50% RDA per serving.',
            badge: 'Essential'
        },
        {
            icon: '🍬',
            title: 'Watch Added Sugars',
            tip: 'WHO recommends less than 25g added sugar daily. A single soda can exceed this limit.',
            badge: 'Critical'
        },
        {
            icon: '🔴',
            title: 'Avoid Trans Fats',
            tip: 'Even small amounts of trans fats can increase heart disease risk. Always check labels.',
            badge: 'Important'
        },
        {
            icon: '💪',
            title: 'Prioritize Protein',
            tip: 'Aim for 75g protein daily. Choose products with at least 10g protein per serving.',
            badge: 'Recommended'
        }
    ];

    const categoryBreakdown = [
        { category: 'Snacks & Chips', avgGrade: 'D', percentage: 28, color: '#f97316' },
        { category: 'Beverages', avgGrade: 'D', percentage: 22, color: '#f97316' },
        { category: 'Biscuits & Cookies', avgGrade: 'C', percentage: 18, color: '#eab308' },
        { category: 'Dairy Products', avgGrade: 'B', percentage: 15, color: '#84cc16' },
        { category: 'Instant Foods', avgGrade: 'D', percentage: 12, color: '#f97316' },
        { category: 'Others', avgGrade: 'C', percentage: 5, color: '#eab308' }
    ];

    const userStats = [
        { label: 'Total Scans', value: '1.2M+', icon: BarChart3 },
        { label: 'Active Users', value: '85K+', icon: Users },
        { label: 'Healthier Choices', value: '67%', icon: Heart },
        { label: 'Products Rated', value: '500K+', icon: Award }
    ];

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
                    Insights & Trends
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--color-text-muted)',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    Data-driven insights to help you make smarter food choices
                </p>
            </motion.div>

            {/* User Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}
            >
                {userStats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="glass-card"
                        style={{
                            padding: '2rem',
                            textAlign: 'center'
                        }}
                    >
                        <stat.icon size={32} color="#7c3aed" style={{ margin: '0 auto 1rem' }} />
                        <div style={{
                            fontSize: '2rem',
                            fontWeight: '800',
                            marginBottom: '0.5rem'
                        }}>
                            {stat.value}
                        </div>
                        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Key Insights */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ marginBottom: '3rem' }}
            >
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>
                    <Lightbulb size={32} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} color="#7c3aed" />
                    Key Insights
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {healthInsights.map((insight, idx) => (
                        <div
                            key={idx}
                            className="glass-card"
                            style={{ padding: '2rem' }}
                        >
                            <insight.icon size={40} color={insight.color} style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                {insight.title}
                            </h3>
                            <p style={{
                                fontSize: '1.5rem',
                                fontWeight: '800',
                                color: insight.color,
                                marginBottom: '1rem'
                            }}>
                                {insight.subtitle}
                            </p>
                            <p style={{
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                marginBottom: '1.5rem'
                            }}>
                                {insight.description}
                            </p>

                            {insight.external ? (
                                <a
                                    href={insight.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', display: 'block', width: '100%' }}
                                >
                                    <button className="btn-secondary" style={{ width: '100%' }}>
                                        {insight.action}
                                    </button>
                                </a>
                            ) : insight.link.startsWith('#') ? (
                                <button
                                    className="btn-secondary"
                                    style={{ width: '100%' }}
                                    onClick={() => document.getElementById(insight.link.substring(1))?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    {insight.action}
                                </button>
                            ) : (
                                <Link to={insight.link} style={{ textDecoration: 'none', display: 'block', width: '100%' }}>
                                    <button className="btn-secondary" style={{ width: '100%' }}>
                                        {insight.action}
                                    </button>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Top Scanned Products */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card"
                style={{ padding: '2rem', marginBottom: '3rem' }}
            >
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>
                    <TrendingUp size={32} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} color="#7c3aed" />
                    Top Scanned Products
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {topScannedProducts.map((product, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '1.5rem',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: 'var(--radius-xl)',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '800',
                                    fontSize: '1.2rem'
                                }}>
                                    {idx + 1}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                                        {product.name}
                                    </div>
                                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                        {product.category}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                                        Scans
                                    </div>
                                    <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>
                                        {product.scans}
                                    </div>
                                </div>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: product.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '800',
                                    fontSize: '1.5rem',
                                    color: '#000'
                                }}>
                                    {product.grade}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Category Breakdown */}
            <motion.div
                id="category-breakdown"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card"
                style={{ padding: '2rem', marginBottom: '3rem' }}
            >
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>
                    <BarChart3 size={32} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} color="#7c3aed" />
                    Category Breakdown
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {categoryBreakdown.map((cat, idx) => (
                        <div key={idx}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: '600' }}>{cat.category}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Avg Grade:</span>
                                    <span style={{
                                        width: '35px',
                                        height: '35px',
                                        borderRadius: '50%',
                                        background: cat.color,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '700',
                                        color: '#000'
                                    }}>
                                        {cat.avgGrade}
                                    </span>
                                </span>
                            </div>
                            <div style={{
                                height: '12px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: 'var(--radius-full)',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${cat.percentage}%` }}
                                    transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                                    style={{
                                        height: '100%',
                                        background: cat.color,
                                        borderRadius: 'var(--radius-full)'
                                    }}
                                />
                            </div>
                            <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                                {cat.percentage}% of scans
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Nutrition Tips */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ marginBottom: '3rem' }}
            >
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>
                    <Zap size={32} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} color="#7c3aed" />
                    Quick Nutrition Tips
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {nutritionTips.map((tip, idx) => (
                        <div
                            key={idx}
                            className="glass-card"
                            style={{ padding: '1.5rem' }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                                {tip.icon}
                            </div>
                            <div style={{
                                display: 'inline-block',
                                padding: '0.25rem 0.75rem',
                                background: 'rgba(124, 58, 237, 0.2)',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                color: '#7c3aed',
                                marginBottom: '1rem'
                            }}>
                                {tip.badge}
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                                {tip.title}
                            </h3>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                {tip.tip}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="glass-card"
                style={{
                    padding: '3rem',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                    border: '1px solid rgba(124, 58, 237, 0.3)'
                }}
            >
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
                    Ready to Make Healthier Choices?
                </h2>
                <p style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '1.1rem',
                    marginBottom: '2rem',
                    maxWidth: '600px',
                    margin: '0 auto 2rem'
                }}>
                    Start scanning products today and join thousands of users making informed food decisions.
                </p>
                <Link to="/scan">
                    <button
                        className="btn-primary"
                        style={{
                            padding: '1rem 3rem',
                            fontSize: '1.1rem'
                        }}
                    >
                        Scan Your First Product
                    </button>
                </Link>
            </motion.div>
        </div>
    );
};

export default Insights;
