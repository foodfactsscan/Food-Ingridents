
import { motion } from 'framer-motion';

const TruthInRating = ({ rating }) => {
    if (!rating) return null;

    const { score, verdict } = rating;

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}
        >
            {/* Large Circular Badge */}
            <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${verdict.color} 0%, ${verdict.color}dd 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 10px 40px ${verdict.color}60`,
                position: 'relative'
            }}>
                <div style={{
                    fontSize: '3rem',
                    fontWeight: '800',
                    color: '#fff',
                    lineHeight: 1
                }}>
                    {score}
                </div>
                <div style={{
                    fontSize: '0.9rem',
                    color: '#fff',
                    opacity: 0.9,
                    fontWeight: '600'
                }}>
                    / 5
                </div>

                {/* Grade Badge */}
                <div style={{
                    position: 'absolute',
                    bottom: '-10px',
                    background: '#fff',
                    color: verdict.color,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    {verdict.grade}
                </div>
            </div>

            {/* Verdict Text */}
            <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: verdict.color,
                textAlign: 'center'
            }}>
                {verdict.text}
            </div>
        </motion.div>
    );
};

export default TruthInRating;
