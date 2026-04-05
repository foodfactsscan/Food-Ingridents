import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const NutrientDetailItem = ({ icon, name, value, unit, percentDailyIntake, type = 'concern' }) => {
    const [expanded, setExpanded] = useState(false);

    // Determine colors based on nutrient type and value
    const getColorForValue = (percent, nutrientType) => {
        if (nutrientType === 'positive') {
            // For positive nutrients (protein, fiber), higher is better
            if (percent < 5) return { color: '#ef4444', zone: 'Low' };
            if (percent < 10) return { color: '#f97316', zone: 'Moderate' };
            if (percent < 20) return { color: '#22c55e', zone: 'Good' };
            return { color: '#16a34a', zone: 'Excellent' };
        } else {
            // For concern nutrients (sodium, sugar, fat), lower is better
            if (percent < 5) return { color: '#22c55e', zone: 'Low' };
            if (percent < 20) return { color: '#84cc16', zone: 'Moderate' };
            if (percent < 40) return { color: '#f59e0b', zone: 'High' };
            return { color: '#ef4444', zone: 'Very High' };
        }
    };

    const barColor = getColorForValue(percentDailyIntake, type);

    // Calculate bar position (scale to fit the range)
    const getBarPosition = (percent) => {
        if (percent <= 0) return 0;
        if (percent >= 100) return 100;
        return percent;
    };

    const position = getBarPosition(percentDailyIntake);

    return (
        <div style={{
            padding: '1rem 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div
                onClick={() => setExpanded(!expanded)}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                    <span style={{ fontWeight: '600', fontSize: '1rem' }}>{name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                        color: type === 'positive' ? '#22c55e' : '#ef4444',
                        fontWeight: '700',
                        fontSize: '1.1rem'
                    }}>
                        {value} {unit}
                    </span>
                    {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </div>

            {expanded && (
                <div style={{ marginTop: '1rem' }}>
                    <p style={{
                        fontSize: '0.95rem',
                        color: 'var(--color-text-muted)',
                        marginBottom: '0.75rem'
                    }}>
                        {percentDailyIntake.toFixed(1)}% of recommended daily intake
                    </p>

                    {/* Gradient Progress Bar */}
                    <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                        {/* Marker */}
                        <div style={{
                            position: 'absolute',
                            left: `${Math.min(position, 95)}%`,
                            top: '-25px',
                            transform: 'translateX(-50%)',
                            fontSize: '0.85rem',
                            fontWeight: '700'
                        }}>
                            {value}
                            <div style={{
                                width: '0',
                                height: '0',
                                borderLeft: '6px solid transparent',
                                borderRight: '6px solid transparent',
                                borderTop: '8px solid #64748b',
                                margin: '0 auto'
                            }} />
                        </div>

                        {/* Gradient Bar */}
                        <div style={{
                            height: '12px',
                            borderRadius: '6px',
                            background: 'linear-gradient(90deg, #22c55e 0%, #84cc16 20%, #eab308 40%, #f97316 60%, #ef4444 100%)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Value Indicator */}
                            <div style={{
                                position: 'absolute',
                                left: `${position}%`,
                                top: 0,
                                bottom: 0,
                                width: '3px',
                                background: '#000',
                                boxShadow: '0 0 6px rgba(0,0,0,0.5)'
                            }} />
                        </div>

                        {/* Scale Labels */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: 'var(--color-text-muted)',
                            marginTop: '0.25rem'
                        }}>
                            <span>0</span>
                            <span>{type === 'positive' ? '>75' : '>100'}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const DetailedNutrients = ({ product, onAllNutrientsClick }) => {
    const nutrients = product.nutriments || {};

    const nutrientItems = [
        {
            icon: '🔥',
            name: 'Saturated Fat',
            value: (nutrients['saturated-fat_100g'] || 0).toFixed(1),
            unit: 'g',
            percentDailyIntake: ((nutrients['saturated-fat_100g'] || 0) / 22) * 100,
            type: 'concern'
        },
        {
            icon: '🧂',
            name: 'Sodium',
            value: ((nutrients.sodium_100g || 0) * 10).toFixed(1),
            unit: 'mg',
            percentDailyIntake: ((nutrients.sodium_100g || 0) / 200) * 100,
            type: 'concern'
        },
        {
            icon: '💪',
            name: 'Protein',
            value: (nutrients.proteins_100g || 0).toFixed(1),
            unit: 'g',
            percentDailyIntake: ((nutrients.proteins_100g || 0) / 75) * 100,
            type: 'positive'
        },
        {
            icon: '🌾',
            name: 'Dietary Fiber',
            value: (nutrients.fiber_100g || 0).toFixed(1),
            unit: 'g',
            percentDailyIntake: ((nutrients.fiber_100g || 0) / 30) * 100,
            type: 'positive'
        },
        {
            icon: '🍬',
            name: 'Total Sugars',
            value: (nutrients.sugars_100g || 0).toFixed(1),
            unit: 'g',
            percentDailyIntake: ((nutrients.sugars_100g || 0) / 50) * 100,
            type: 'concern'
        },
        {
            icon: '🍭',
            name: 'Added Sugars',
            value: ((nutrients.sugars_100g || 0) * 0.7).toFixed(1), // Approximate
            unit: 'g',
            percentDailyIntake: (((nutrients.sugars_100g || 0) * 0.7) / 25) * 100,
            type: 'concern'
        },
        {
            icon: '🚫',
            name: 'Trans Fat',
            value: (nutrients['trans-fat_100g'] || 0).toFixed(2),
            unit: 'g',
            percentDailyIntake: ((nutrients['trans-fat_100g'] || 0) / 2) * 100,
            type: 'concern'
        }
    ];

    // Filter out nutrients with zero or minimal values
    const displayNutrients = nutrientItems.filter(n => parseFloat(n.value) > 0);

    return (
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            {displayNutrients.map((nutrient, idx) => (
                <NutrientDetailItem key={idx} {...nutrient} />
            ))}

            {/* All Nutrients Button */}
            <button
                onClick={onAllNutrientsClick}
                style={{
                    width: '100%',
                    padding: '1rem',
                    marginTop: '1rem',
                    borderRadius: 'var(--radius-xl)',
                    border: 'none',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '1rem'
                }}
            >
                All Nutrients
                <ChevronDown size={20} />
            </button>
        </div>
    );
};

export default DetailedNutrients;
