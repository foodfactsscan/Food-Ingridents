
import { motion } from 'framer-motion';
import { Apple, Leaf, Activity, AlertTriangle } from 'lucide-react';

const COMPONENT_INFO = {
    nutrition: {
        icon: Apple,
        title: 'Nutrition Profile',
        description: 'Balance of nutrients - penalizing excess sugar, sodium, and saturated fat while rewarding protein and fiber.'
    },
    ingredients: {
        icon: Leaf,
        title: 'Ingredient Health',
        description: 'Quality of ingredients - whole foods score higher than refined or reconstituted substitutes.'
    },
    processing: {
        icon: Activity,
        title: 'Processing Level',
        description: 'Degree of industrial processing - less processed foods score better (based on NOVA classification).'
    },
    additives: {
        icon: AlertTriangle,
        title: 'Harmful Additives',
        description: 'Penalty for artificial colors, sweeteners, emulsifiers, and other potentially risky substances.'
    }
};

const RatingBreakdown = ({ breakdown }) => {
    if (!breakdown) return null;

    return (
        <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Rating Breakdown
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Nutrition */}
                <ComponentRow
                    component="nutrition"
                    score={breakdown.nutrition.score}
                    max={breakdown.nutrition.max}
                />

                {/* Ingredients */}
                <ComponentRow
                    component="ingredients"
                    score={breakdown.ingredients.score}
                    max={breakdown.ingredients.max}
                />

                {/* Processing */}
                <ComponentRow
                    component="processing"
                    score={breakdown.processing.score}
                    max={breakdown.processing.max}
                />

                {/* Additives (penalty shown as positive) */}
                <ComponentRow
                    component="additives"
                    score={breakdown.additives.max - breakdown.additives.penalty}
                    max={breakdown.additives.max}
                    isPenalty
                />
            </div>
        </div>
    );
};

const ComponentRow = ({ component, score, max, isPenalty }) => {
    const info = COMPONENT_INFO[component];
    const Icon = info.icon;
    const percentage = (score / max) * 100;

    // Color based on performance
    let barColor = '#22c55e'; // Green
    if (percentage < 33) barColor = '#ef4444'; // Red
    else if (percentage < 66) barColor = '#f59e0b'; // Orange

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card"
            style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: '8px',
                        background: `${barColor}20`,
                        color: barColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Icon size={20} />
                    </div>
                    <div>
                        <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{info.title}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                            {info.description}
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: barColor }}>
                    {score.toFixed(1)}/{max}
                </div>
            </div>

            {/* Progress Bar */}
            <div style={{
                height: '10px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '5px',
                overflow: 'hidden'
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{
                        height: '100%',
                        background: barColor,
                        borderRadius: '5px'
                    }}
                />
            </div>
        </motion.div>
    );
};

export default RatingBreakdown;
