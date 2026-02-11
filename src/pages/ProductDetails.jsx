
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductByBarcode, getHealthierAlternatives } from '../services/api';
import { calculateTruthInRating } from '../services/ratingEngine';
import { parseAdditives, parseIngredients } from '../services/additiveParser';
import { motion } from 'framer-motion';
import { ChevronLeft, AlertTriangle, CheckCircle, Leaf, Activity } from 'lucide-react';
import TruthInRating from '../components/TruthInRating';
import RatingBreakdown from '../components/RatingBreakdown';
import ConcernSection from '../components/ConcernSection';
import PositiveSection from '../components/PositiveSection';
import ServingSizeTabs from '../components/ServingSizeTabs';
import DetailedNutrients from '../components/DetailedNutrients';
import BetterRatedOptions from '../components/BetterRatedOptions';
import AllNutrientsSheet from '../components/AllNutrientsSheet';
import PersonalizedAnalysis from '../components/PersonalizedAnalysis';

const ProductDetails = () => {
    const { barcode } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alternatives, setAlternatives] = useState([]);
    const [detectedAllergens, setDetectedAllergens] = useState([]);
    const [truthInRating, setTruthInRating] = useState(null);
    const [showAllNutrients, setShowAllNutrients] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const data = await getProductByBarcode(barcode);

            if (data && data.product) {
                setProduct(data.product);

                // Calculate TruthIn Rating
                const rating = calculateTruthInRating(data.product);
                setTruthInRating(rating);

                // Allergen Checks
                if (data.product.allergens_tags) {
                    const found = data.product.allergens_tags.map(tag => tag.replace('en:', '').replace('fr:', ''));
                    setDetectedAllergens(found);
                }

                // Fetch Alternatives for low ratings (async, don't block UI)
                const grade = data.product.nutrition_grades;
                if (grade && ['c', 'd', 'e'].includes(grade.toLowerCase()) && data.product.categories) {
                    const mainCategory = data.product.categories_tags?.[0] || data.product.main_category;
                    if (mainCategory) {
                        // Don't await - load alternatives in background
                        getHealthierAlternatives(mainCategory, grade).then(alts => {
                            setAlternatives(alts);
                        });
                    }
                }
            }
            setLoading(false);
        };

        if (barcode) fetchProduct();
    }, [barcode]);

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                <Link to="/scan" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
                    <ChevronLeft size={20} /> Back to Search
                </Link>

                {/* Skeleton Loader */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                    <div className="glass-card animate-pulse" style={{ height: '400px', borderRadius: 'var(--radius-2xl)' }}></div>
                    <div>
                        <div className="glass-card animate-pulse" style={{ height: '60px', marginBottom: '1rem', borderRadius: 'var(--radius-xl)' }}></div>
                        <div className="glass-card animate-pulse" style={{ height: '200px', marginBottom: '1rem', borderRadius: 'var(--radius-xl)' }}></div>
                        <div className="glass-card animate-pulse" style={{ height: '300px', borderRadius: 'var(--radius-xl)' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container" style={{ paddingTop: '6rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                <h2 style={{ marginBottom: '1rem' }}>Product Not Found</h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                    We couldn't find this product in our international database.
                </p>
                <Link to="/scan" className="btn-primary">
                    Try Another Product
                </Link>
            </div>
        );
    }

    const isUnknown = product.product_name === 'Unknown Pacakged Food';
    const grade = product.nutrition_grades && product.nutrition_grades !== 'unknown' ? product.nutrition_grades.toUpperCase() : '?';
    const gradeColor = { 'A': '#22c55e', 'B': '#84cc16', 'C': '#eab308', 'D': '#f97316', 'E': '#ef4444' }[grade] || '#94a3b8';

    // NOVA Group (Processing Level)
    const novaGroup = product.nova_group;
    const novaColor = { 1: '#22c55e', 2: '#eab308', 3: '#f97316', 4: '#ef4444' }[novaGroup] || '#94a3b8';
    const novaText = { 1: 'Unprocessed', 2: 'Processed Culinary', 3: 'Processed', 4: 'Ultra Processed' }[novaGroup] || 'Unknown';

    const isVegetarian = product.labels_tags?.some(tag => tag.includes('vegetarian')) || product.ingredients_analysis_tags?.some(tag => tag.includes('vegetarian'));

    return (
        <div className="container" style={{ paddingBottom: '6rem' }}>
            <Link to="/scan" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
                <ChevronLeft size={20} /> Back to Search
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>

                {/* Left Column: Image & Highlights */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-2xl)', textAlign: 'center', background: '#fff' }}>
                        <img
                            src={product.image_front_url || 'https://placehold.co/400x400?text=No+Image'}
                            alt={product.product_name}
                            style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Quick Status Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                        {isVegetarian && (
                            <div style={{
                                padding: '0.5rem 1rem', borderRadius: '50px',
                                background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e',
                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600'
                            }}>
                                <Leaf size={16} /> Vegetarian
                            </div>
                        )}
                        <div style={{
                            padding: '0.5rem 1rem', borderRadius: '50px',
                            background: `${novaColor}20`, color: novaColor,
                            border: `1px solid ${novaColor}40`,
                            display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600'
                        }}>
                            <Activity size={16} /> NOVA {novaGroup}: {novaText}
                        </div>
                    </div>

                    {detectedAllergens.length > 0 && (
                        <div className="glass-panel" style={{
                            marginTop: '2rem', padding: '1.5rem', borderRadius: 'var(--radius-xl)',
                            border: '1px solid #ef4444', background: 'rgba(239, 68, 68, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', marginBottom: '0.5rem' }}>
                                <AlertTriangle />
                                <h3 style={{ margin: 0 }}>Allergen Alert</h3>
                            </div>
                            <p style={{ color: '#ffbaba' }}>Contains: <strong>{detectedAllergens.join(', ')}</strong></p>
                        </div>
                    )}
                </motion.div>

                {/* Right Column: Nutrition & Analysis */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', lineHeight: 1.1, marginBottom: '0.5rem' }}>{product.product_name}</h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>{product.brands}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem', marginTop: '1rem' }}>
                        {product.brands && <span className="chip" style={{ background: 'var(--color-primary-glow)', color: '#fff' }}>{product.brands.split(',')[0]}</span>}
                        {product.quantity && <span className="chip">{product.quantity}</span>}
                        {product.categories_tags && <span className="chip">{product.categories_tags[0]?.replace('en:', '').split('-').join(' ')}</span>}
                    </div>

                    {/* ★ Personalized Health Analysis ★ */}
                    {!isUnknown && <PersonalizedAnalysis product={product} />}

                    {/* Serving Size Tabs */}
                    {!isUnknown && <ServingSizeTabs product={product} />}

                    {isUnknown && (
                        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid #eab308' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#eab308', fontWeight: 'bold' }}>
                                <AlertTriangle />
                                Product Data Missing
                            </div>
                            <p style={{ marginTop: '0.5rem', color: 'var(--color-text-muted)' }}>
                                We found the barcode <strong>{product._id}</strong> but don't have detailed data yet.
                                <br />Be the first to add this Indian product!
                            </p>
                            <button className="btn-secondary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                                + Add Nutrition Info
                            </button>
                        </div>
                    )}

                    {/* TruthIn Rating System */}
                    {!isUnknown && truthInRating && (
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '3rem 0' }}>
                            <TruthInRating rating={truthInRating} />
                        </div>
                    )}

                    {/* Rating Breakdown */}
                    <RatingBreakdown breakdown={truthInRating?.breakdown} />

                    {/* What Should Concern You Section */}
                    {!isUnknown && (
                        <ConcernSection
                            product={product}
                            additives={parseAdditives(product)}
                            ingredients={parseIngredients(product)}
                        />
                    )}

                    {/* What You'll Like Section */}
                    {!isUnknown && <PositiveSection product={product} />}

                    {/* Detailed Nutrients with Progress Bars */}
                    {!isUnknown && <DetailedNutrients product={product} onAllNutrientsClick={() => setShowAllNutrients(true)} />}

                    {/* All Ingredients Button */}
                    {!isUnknown && (
                        <button
                            style={{
                                width: '100%',
                                padding: '1rem',
                                marginBottom: '2rem',
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
                            className="glass-card"
                        >
                            All Ingredients
                            <ChevronLeft size={20} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                    )}

                    {/* Better Rated Options */}
                    {!isUnknown && <BetterRatedOptions alternatives={alternatives} />}
                </motion.div>
            </div>

            {alternatives.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.6rem', background: 'var(--color-primary)', borderRadius: '12px', color: '#000' }}><CheckCircle size={24} /></div>
                        <div>
                            <h2 style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>Healthier Alternatives</h2>
                            <p style={{ color: 'var(--color-text-muted)' }}>Smart recommendations based on better nutrition grades.</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '2rem' }}>
                        {alternatives.map((alt) => (
                            <Link to={`/product/${alt._id}`} key={alt._id} style={{ textDecoration: 'none', color: 'inherit', flex: '0 0 280px' }}>
                                <div className="glass-card" style={{ padding: '1rem', borderRadius: 'var(--radius-xl)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ height: '180px', background: '#fff', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', position: 'relative' }}>
                                        <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#22c55e', color: '#fff', fontWeight: '800', width: '30px', height: '30px', display: 'flex', fontSize: '0.8rem', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                                            {alt.nutrition_grades?.toUpperCase()}
                                        </div>
                                        <img
                                            src={alt.image_front_small_url || 'https://placehold.co/150x150'}
                                            alt={alt.product_name}
                                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                        />
                                    </div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{alt.product_name}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{alt.brands}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* All Nutrients Bottom Sheet */}
            <AllNutrientsSheet
                product={product}
                show={showAllNutrients}
                onClose={() => setShowAllNutrients(false)}
            />
        </div>
    );
};

const NutritionRow = ({ label, value, percent, color, high }) => (
    <div style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '0.8rem', borderRadius: '12px',
        background: 'rgba(255,255,255,0.02)',
        border: high ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255,255,255,0.05)'
    }}>
        <div style={{ width: '100px', fontWeight: '500', color: high ? '#ef4444' : 'var(--color-text)' }}>{label}</div>
        <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ height: '100%', background: color }}
            />
        </div>
        <div style={{ width: '60px', textAlign: 'right', fontWeight: 'bold' }}>{value}</div>
    </div>
);

// Render All Nutrients Sheet
const renderAllNutrientsSheet = (product, showAllNutrients, setShowAllNutrients) => (
    <AllNutrientsSheet
        product={product}
        show={showAllNutrients}
        onClose={() => setShowAllNutrients(false)}
    />
);

export default ProductDetails;
