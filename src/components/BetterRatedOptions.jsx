import { ChevronRight } from 'lucide-react';

const BetterRatedOptions = ({ alternatives = [] }) => {
    // Mock data if no alternatives provided
    const defaultAlternatives = [
        {
            name: 'Organic Whole Wheat Noodles',
            brand: 'Healthy Choice',
            rating: 4.2,
            image: 'https://placehold.co/100x100/22c55e/ffffff?text=4.2',
            barcode: '8901234567890'
        },
        {
            name: 'Millet Noodles',
            brand: 'NutriPro',
            rating: 3.9,
            image: 'https://placehold.co/100x100/84cc16/ffffff?text=3.9',
            barcode: '8901234567891'
        },
        {
            name: 'Brown Rice Noodles',
            brand: 'FitFood',
            rating: 3.7,
            image: 'https://placehold.co/100x100/eab308/ffffff?text=3.7',
            barcode: '8901234567892'
        }
    ];

    const displayAlternatives = alternatives.length > 0 ? alternatives : defaultAlternatives;

    const getRatingColor = (rating) => {
        if (rating >= 4) return '#22c55e';
        if (rating >= 3) return '#84cc16';
        if (rating >= 2) return '#eab308';
        return '#f97316';
    };

    return (
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                Better Rated Options
            </h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Health Conscious Alternatives
            </p>

            {/* Alternative Products Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '1rem'
            }}>
                {displayAlternatives.slice(0, 3).map((alt, idx) => (
                    <div
                        key={idx}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: 'var(--radius-xl)',
                            padding: '1rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        }}
                    >
                        {/* Rating Badge */}
                        <div style={{
                            position: 'absolute',
                            top: '0.5rem',
                            right: '0.5rem',
                            background: getRatingColor(alt.rating),
                            color: '#000',
                            padding: '0.25rem 0.75rem',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: '700',
                            fontSize: '0.9rem'
                        }}>
                            {alt.rating}
                        </div>

                        {/* Product Image */}
                        <div style={{
                            width: '100%',
                            height: '100px',
                            background: '#fff',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img
                                src={alt.image}
                                alt={alt.name}
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                        </div>

                        {/* Product Info */}
                        <p style={{
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            lineHeight: '1.3',
                            marginBottom: '0.25rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}>
                            {alt.name}
                        </p>
                        <p style={{
                            fontSize: '0.75rem',
                            color: 'var(--color-text-muted)'
                        }}>
                            {alt.brand}
                        </p>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <button
                className="btn-secondary"
                style={{
                    width: '100%',
                    marginTop: '1.5rem',
                    justifyContent: 'space-between',
                    padding: '1rem'
                }}
            >
                View All Alternatives
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default BetterRatedOptions;
