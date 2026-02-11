import { useState } from 'react';
import { Heart, Leaf, Activity, Zap } from 'lucide-react';

const PositiveSection = ({ product }) => {
    const [purchaseIntent, setPurchaseIntent] = useState(null);

    const positives = [];

    // Check for positive nutrients
    if (product.nutriments?.proteins_100g > 8) {
        positives.push({
            icon: Activity,
            name: 'Protein',
            value: `${product.nutriments.proteins_100g.toFixed(1)} g`,
            color: '#22c55e'
        });
    }

    if (product.nutriments?.fiber_100g > 3) {
        positives.push({
            icon: Leaf,
            name: 'Fiber',
            value: `${product.nutriments.fiber_100g.toFixed(1)} g`,
            color: '#84cc16'
        });
    }

    if (product.nutriments?.['fruits-vegetables-nuts_100g'] > 40) {
        positives.push({
            icon: Zap,
            name: 'Fruits & Veggies',
            value: `${product.nutriments['fruits-vegetables-nuts_100g'].toFixed(0)}%`,
            color: '#10b981'
        });
    }

    if (positives.length === 0 && product.nutriments?.fat_100g < 3) {
        positives.push({
            icon: Heart,
            name: 'Low Fat',
            value: `${product.nutriments.fat_100g.toFixed(1)} g`,
            color: '#3b82f6'
        });
    }

    if (positives.length === 0) return null;

    return (
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                What You'll Like 😊
            </h3>

            {positives.map((item, idx) => (
                <div
                    key={idx}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem',
                        borderBottom: idx < positives.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <item.icon size={24} color={item.color} />
                        <span style={{ fontWeight: '500' }}>{item.name}</span>
                    </div>
                    <span style={{ color: item.color, fontWeight: '700', fontSize: '1.1rem' }}>
                        {item.value}
                    </span>
                </div>
            ))}

            {/* Purchase Intent */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1.05rem' }}>
                    Would you buy this product?
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                    <button
                        onClick={() => setPurchaseIntent('yes')}
                        style={{
                            padding: '0.75rem 2rem',
                            borderRadius: 'var(--radius-full)',
                            border: purchaseIntent === 'yes' ? '2px solid #22c55e' : '2px solid rgba(255,255,255,0.2)',
                            background: purchaseIntent === 'yes' ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
                            color: purchaseIntent === 'yes' ? '#22c55e' : '#fff',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => setPurchaseIntent('no')}
                        style={{
                            padding: '0.75rem 2rem',
                            borderRadius: 'var(--radius-full)',
                            border: purchaseIntent === 'no' ? '2px solid #ef4444' : '2px solid rgba(255,255,255,0.2)',
                            background: purchaseIntent === 'no' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                            color: purchaseIntent === 'no' ? '#ef4444' : '#fff',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        No
                    </button>
                    <button
                        onClick={() => setPurchaseIntent('bought')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-full)',
                            border: purchaseIntent === 'bought' ? '2px solid #94a3b8' : '2px solid rgba(255,255,255,0.2)',
                            background: purchaseIntent === 'bought' ? 'rgba(148, 163, 184, 0.2)' : 'transparent',
                            color: purchaseIntent === 'bought' ? '#94a3b8' : '#fff',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        Already Bought
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PositiveSection;
