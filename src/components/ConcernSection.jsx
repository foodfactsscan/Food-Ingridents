import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, AlertTriangle, Droplet, Activity, Box } from 'lucide-react';

const AdditiveItem = ({ code, name, level }) => {
    const [expanded, setExpanded] = useState(false);

    const levelColors = {
        'safe': { bg: '#dcfce7', text: '#16a34a', label: 'Generally Safe' },
        'minimal': { bg: '#fef3c7', text: '#d97706', label: 'Minimal Concern' },
        'moderate': { bg: '#fed7aa', text: '#ea580c', label: 'Moderate Concern' },
        'high': { bg: '#fecaca', text: '#dc2626', label: 'High Concern' }
    };

    const color = levelColors[level] || levelColors.minimal;

    return (
        <div style={{
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            padding: '1rem 0'
        }}>
            <div
                onClick={() => setExpanded(!expanded)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: color.text
                    }} />
                    <span style={{ fontWeight: '500' }}>{name || code}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                        color: color.text,
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}>
                        {color.label}
                    </span>
                    {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{
                            marginTop: '0.75rem',
                            paddingLeft: '1.5rem',
                            color: 'var(--color-text-muted)',
                            fontSize: '0.9rem'
                        }}
                    >
                        <p><strong>{code}</strong> - {name || 'Additive'}</p>
                        <p style={{ marginTop: '0.5rem' }}>
                            {level === 'safe' && 'This additive is considered safe for consumption in regulated amounts.'}
                            {level === 'minimal' && 'Generally recognized as safe, though some individuals may be sensitive.'}
                            {level === 'moderate' && 'May cause reactions in sensitive individuals. Limit consumption.'}
                            {level === 'high' && 'Avoid if possible. May have health concerns.'}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ConcernSection = ({ product, additives = [], ingredients = [] }) => {
    const [activeTab, setActiveTab] = useState('additives');
    const [showBottomSheet, setShowBottomSheet] = useState(false);

    const novaLevel = product.nova_group;
    const novaText = {
        1: 'Unprocessed',
        2: 'Processed Culinary',
        3: 'Processed',
        4: 'Ultra-Processed'
    }[novaLevel] || 'Unknown';

    const novaColor = novaLevel === 4 ? '#ef4444' : novaLevel === 3 ? '#f97316' : '#22c55e';

    return (
        <div>
            {/* What Should Concern You */}
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                    What Should Concern You 🤔
                </h3>

                {/* Processing Level */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderRadius: 'var(--radius-xl)',
                    marginBottom: '1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Box size={24} color={novaColor} />
                        <span style={{ fontWeight: '600' }}>Processing Level</span>
                    </div>
                    <span style={{ color: novaColor, fontWeight: '700' }}>
                        {novaText}
                    </span>
                </div>

                {/* Additives Summary */}
                {additives.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                        <div
                            onClick={() => setShowBottomSheet(!showBottomSheet)}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                background: 'rgba(234, 179, 8, 0.1)',
                                borderRadius: 'var(--radius-xl)',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <AlertTriangle size={24} color="#d97706" />
                                <span style={{ fontWeight: '600' }}>Additives</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    background: '#f59e0b',
                                    color: '#000',
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '700',
                                    fontSize: '0.9rem'
                                }}>
                                    {additives.length}
                                </div>
                                {showBottomSheet ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>

                        {/* Show first 4 additives inline */}
                        {!showBottomSheet && additives.slice(0, 4).map((additive, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.75rem 1rem',
                                fontSize: '0.95rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: '#f59e0b'
                                    }} />
                                    <span>{additive.code}</span>
                                </div>
                                <span style={{ color: '#d97706', fontSize: '0.85rem' }}>
                                    {additive.level === 'safe' && 'Safe'}
                                    {additive.level === 'minimal' && 'Minimal Concern'}
                                    {additive.level === 'moderate' && 'Moderate Concern'}
                                    {additive.level === 'high' && 'High Concern'}
                                </span>
                            </div>
                        ))}

                        {/* View All link */}
                        {!showBottomSheet && additives.length > 4 && (
                            <div
                                onClick={() => setShowBottomSheet(true)}
                                style={{
                                    textAlign: 'center',
                                    padding: '0.75rem',
                                    color: '#7c3aed',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                View All
                            </div>
                        )}
                    </div>
                )}

                {/* Nutrient Warnings */}
                {product.nutriments?.['saturated-fat_100g'] > 5 && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem',
                        borderBottom: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Droplet size={20} color="#ef4444" />
                            <span>Saturated Fat</span>
                        </div>
                        <span style={{ color: '#ef4444', fontWeight: '600' }}>
                            (not more than) {product.nutriments['saturated-fat_100g']?.toFixed(1)} g
                        </span>
                    </div>
                )}

                {product.nutriments?.sodium_100g > 400 && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Activity size={20} color="#ef4444" />
                            <span>Sodium</span>
                        </div>
                        <span style={{ color: '#ef4444', fontWeight: '600' }}>
                            {(product.nutriments.sodium_100g * 10).toFixed(1)} mg
                        </span>
                    </div>
                )}
            </div>

            {/* Bottom Sheet */}
            <AnimatePresence>
                {showBottomSheet && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="glass-card"
                        style={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            maxHeight: '70vh',
                            borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0',
                            padding: '1.5rem',
                            overflow: 'auto',
                            zIndex: 1000,
                            boxShadow: '0 -10px 40px rgba(0,0,0,0.5)'
                        }}
                    >
                        {/* Tabs */}
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            marginBottom: '1.5rem',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-full)'
                        }}>
                            <button
                                onClick={() => setActiveTab('additives')}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-full)',
                                    border: 'none',
                                    background: activeTab === 'additives' ? '#7c3aed' : 'transparent',
                                    color: '#fff',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <AlertTriangle size={18} />
                                Additives ({additives.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('ingredients')}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-full)',
                                    border: 'none',
                                    background: activeTab === 'ingredients' ? '#7c3aed' : 'transparent',
                                    color: '#fff',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                🧂 Ingredients ({ingredients.length})
                            </button>
                        </div>

                        {/* Content */}
                        <div>
                            {activeTab === 'additives' ? (
                                additives.map((additive, idx) => (
                                    <AdditiveItem
                                        key={idx}
                                        code={additive.code}
                                        name={additive.name}
                                        level={additive.level}
                                    />
                                ))
                            ) : (
                                ingredients.map((ingredient, idx) => (
                                    <div key={idx} style={{
                                        padding: '1rem 0',
                                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: '#94a3b8'
                                        }} />
                                        <span>{ingredient}</span>
                                    </div>
                                ))
                            )}
                        </div>

                        <button
                            onClick={() => setShowBottomSheet(false)}
                            className="btn-secondary"
                            style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay */}
            {showBottomSheet && (
                <div
                    onClick={() => setShowBottomSheet(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 999
                    }}
                />
            )}
        </div>
    );
};

export default ConcernSection;
