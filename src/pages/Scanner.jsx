import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ArrowRight, X, Leaf, Star, Zap, Award, Check, Heart, Camera, Upload, ScanLine, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import Quagga from 'quagga';
import { searchProducts, getProductsByCategory, getExpertCuratedProducts } from '../services/api';

const EXPERT_LISTS = [
    { id: 'high-protein', name: 'High Protein', icon: Zap, color: '#eab308' },
    { id: 'low-sugar', name: 'Low Sugar', icon: Heart, color: '#ec4899' },
    { id: 'high-fiber', name: 'High Fiber', icon: Leaf, color: '#22c55e' },
    { id: 'low-fat', name: 'Low Fat', icon: Award, color: '#3b82f6' },
];

const CATEGORIES = [
    { id: 'snacks', name: 'Snacks' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'dairies', name: 'Dairy' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'cereals-and-potatoes', name: 'Cereals' },
    { id: 'plant-based-foods', name: 'Plant Based' },
    { id: 'meats', name: 'Meats' },
    { id: 'seafood', name: 'Seafood' },
];

const Scanner = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);


    // New states for camera and image upload
    const [scanMode, setScanMode] = useState(null); // 'camera' | 'upload' | null
    const [cameraError, setCameraError] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [detectedBarcode, setDetectedBarcode] = useState('');

    const webcamRef = useRef(null);
    const fileInputRef = useRef(null);
    const scanIntervalRef = useRef(null);

    const navigate = useNavigate();

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (scanIntervalRef.current) {
                clearInterval(scanIntervalRef.current);
            }
            if (Quagga.initialized) {
                Quagga.stop();
            }
        };
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;
        performSearch(searchTerm);
    };

    const performSearch = async (term) => {
        setLoading(true);
        // If it is numeric, assume barcode
        if (/^\d+$/.test(term)) {
            navigate(`/product/${term}`);
            return;
        }

        setActiveFilter(null);
        const results = await searchProducts(term, {});
        setSearchResults(results.products || []);
        setLoading(false);
    };

    const handleExpertClick = async (type) => {
        setLoading(true);
        setSearchTerm('');
        setActiveFilter(type);
        const results = await getExpertCuratedProducts(type);
        setSearchResults(results.products || []);
        setLoading(false);
    };

    const handleCategoryClick = async (catId) => {
        setLoading(true);
        setSearchTerm('');
        setActiveFilter(catId);
        const results = await getProductsByCategory(catId);
        setSearchResults(results.products || []);
        setLoading(false);
    };

    const clearResults = () => {
        setSearchResults([]);
        setSearchTerm('');
        setActiveFilter(null);
    };

    // Camera Barcode Scanning
    const startCameraScanning = () => {
        setScanMode('camera');
        setCameraError('');
        setIsScanning(true);

        // Start scanning after camera initializes
        setTimeout(() => {
            if (webcamRef.current) {
                scanIntervalRef.current = setInterval(() => {
                    captureAndScan();
                }, 1000); // Scan every second
            }
        }, 1000);
    };

    const captureAndScan = () => {
        if (!webcamRef.current) return;

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        // Create image element for Quagga
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            Quagga.decodeSingle({
                src: imageSrc,
                numOfWorkers: 0,
                inputStream: {
                    size: 800
                },
                decoder: {
                    readers: ['ean_reader', 'ean_8_reader', 'code_128_reader', 'code_39_reader', 'upc_reader', 'upc_e_reader']
                },
            }, (result) => {
                if (result && result.codeResult) {
                    const barcode = result.codeResult.code;
                    setDetectedBarcode(barcode);
                    setIsScanning(false);
                    clearInterval(scanIntervalRef.current);

                    // Auto-search with detected barcode
                    setTimeout(() => {
                        closeScanMode();
                        navigate(`/product/${barcode}`);
                    }, 1500);
                }
            });
        };
    };

    const handleCameraError = (error) => {
        console.error('Camera error:', error);
        setCameraError('Camera access denied or not available. Please check permissions.');
        setIsScanning(false);
    };

    // Image Upload Barcode Detection
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadError('');
        setIsScanning(true);

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageSrc = event.target.result;

            Quagga.decodeSingle({
                src: imageSrc,
                numOfWorkers: 0,
                inputStream: {
                    size: 800
                },
                decoder: {
                    readers: ['ean_reader', 'ean_8_reader', 'code_128_reader', 'code_39_reader', 'upc_reader', 'upc_e_reader']
                },
            }, (result) => {
                setIsScanning(false);

                if (result && result.codeResult) {
                    const barcode = result.codeResult.code;
                    setDetectedBarcode(barcode);

                    // Auto-search with detected barcode
                    setTimeout(() => {
                        closeScanMode();
                        navigate(`/product/${barcode}`);
                    }, 1500);
                } else {
                    setUploadError('No barcode detected in the image. Please try another image or ensure the barcode is clearly visible.');
                }
            });
        };

        reader.onerror = () => {
            setUploadError('Failed to read the image file. Please try again.');
            setIsScanning(false);
        };

        reader.readAsDataURL(file);
    };

    const closeScanMode = () => {
        setScanMode(null);
        setIsScanning(false);
        setDetectedBarcode('');
        setCameraError('');
        setUploadError('');
        if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current);
        }
        if (Quagga.initialized) {
            Quagga.stop();
        }
    };

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="section-title">Find Healthy Food</h1>
                <p className="section-subtitle">Search products, scan barcodes, or browse expert-curated lists.</p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} style={{ position: 'relative', marginTop: '2rem' }}>
                    <div className="glass-panel" style={{
                        display: 'flex', alignItems: 'center', padding: '0.5rem', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.05)'
                    }}>
                        <Search className="text-muted" style={{ marginLeft: '1rem', color: 'var(--color-text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search product (e.g. 'Oats', 'Nutella') or enter barcode..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', padding: '1rem', fontSize: '1rem', outline: 'none' }}
                        />
                        {searchTerm && <button type="button" onClick={() => setSearchTerm('')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginRight: '0.5rem' }}><X size={18} /></button>}
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? '...' : 'Search'}
                        </button>
                    </div>

                    {/* Scan Options - Camera & Upload */}
                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startCameraScanning}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                                border: 'none',
                                borderRadius: 'var(--radius-full)',
                                color: '#fff',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)'
                            }}
                        >
                            <Camera size={20} />
                            Scan Barcode
                        </motion.button>

                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setScanMode('upload');
                                fileInputRef.current?.click();
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                border: 'none',
                                borderRadius: 'var(--radius-full)',
                                color: '#fff',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                            }}
                        >
                            <Upload size={20} />
                            Upload Image
                        </motion.button>
                    </div>

                    {/* Hidden file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />


                </form>
            </div>

            {/* Camera/Upload Modal */}
            <AnimatePresence>
                {scanMode === 'camera' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.95)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{
                                background: 'var(--gradient-card)',
                                borderRadius: 'var(--radius-2xl)',
                                padding: '2rem',
                                maxWidth: '600px',
                                width: '100%',
                                position: 'relative',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <button
                                onClick={closeScanMode}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    border: '1px solid #ef4444',
                                    borderRadius: 'var(--radius-full)',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#ef4444'
                                }}
                            >
                                <XCircle size={20} />
                            </button>

                            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: 'var(--radius-full)',
                                    background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                                    marginBottom: '1rem'
                                }}>
                                    <ScanLine size={30} color="#fff" />
                                </div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                                    Scan Barcode
                                </h2>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                    Position the barcode within the frame
                                </p>
                            </div>

                            {cameraError ? (
                                <div style={{
                                    padding: '1.5rem',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    borderRadius: 'var(--radius-lg)',
                                    textAlign: 'center',
                                    color: '#ef4444'
                                }}>
                                    <XCircle size={40} style={{ marginBottom: '1rem' }} />
                                    <p>{cameraError}</p>
                                </div>
                            ) : (
                                <>
                                    <div style={{
                                        position: 'relative',
                                        borderRadius: 'var(--radius-lg)',
                                        overflow: 'hidden',
                                        background: '#000',
                                        aspectRatio: '4/3'
                                    }}>
                                        <Webcam
                                            ref={webcamRef}
                                            audio={false}
                                            screenshotFormat="image/jpeg"
                                            videoConstraints={{
                                                facingMode: 'environment'
                                            }}
                                            onUserMediaError={handleCameraError}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />

                                        {/* Scanning overlay */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: '80%',
                                            height: '40%',
                                            border: '3px solid #7c3aed',
                                            borderRadius: 'var(--radius-lg)',
                                            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '20px',
                                                height: '20px',
                                                borderTop: '4px solid #ec4899',
                                                borderLeft: '4px solid #ec4899'
                                            }} />
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                width: '20px',
                                                height: '20px',
                                                borderTop: '4px solid #ec4899',
                                                borderRight: '4px solid #ec4899'
                                            }} />
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                width: '20px',
                                                height: '20px',
                                                borderBottom: '4px solid #ec4899',
                                                borderLeft: '4px solid #ec4899'
                                            }} />
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                width: '20px',
                                                height: '20px',
                                                borderBottom: '4px solid #ec4899',
                                                borderRight: '4px solid #ec4899'
                                            }} />
                                        </div>
                                    </div>

                                    {detectedBarcode && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{
                                                marginTop: '1rem',
                                                padding: '1rem',
                                                background: 'rgba(34, 197, 94, 0.1)',
                                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                                borderRadius: 'var(--radius-lg)',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <Check size={24} color="#22c55e" style={{ marginBottom: '0.5rem' }} />
                                            <p style={{ color: '#22c55e', fontWeight: '600' }}>
                                                Barcode Detected: {detectedBarcode}
                                            </p>
                                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                                Redirecting to product...
                                            </p>
                                        </motion.div>
                                    )}

                                    {isScanning && !detectedBarcode && (
                                        <div style={{
                                            marginTop: '1rem',
                                            textAlign: 'center',
                                            color: 'var(--color-text-muted)'
                                        }}>
                                            <div className="animate-pulse" style={{ marginBottom: '0.5rem' }}>
                                                <ScanLine size={24} style={{ display: 'inline-block' }} />
                                            </div>
                                            <p style={{ fontSize: '0.9rem' }}>Scanning for barcode...</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Upload Processing Modal */}
            <AnimatePresence>
                {scanMode === 'upload' && isScanning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.95)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{
                                background: 'var(--gradient-card)',
                                borderRadius: 'var(--radius-2xl)',
                                padding: '3rem',
                                textAlign: 'center',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <div className="animate-pulse" style={{ marginBottom: '1rem' }}>
                                <Upload size={48} color="#3b82f6" />
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                Processing Image...
                            </h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>
                                Detecting barcode from uploaded image
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Upload Error Display */}
            <AnimatePresence>
                {uploadError && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'fixed',
                            top: '100px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1001,
                            maxWidth: '500px',
                            width: '90%'
                        }}
                    >
                        <div style={{
                            padding: '1.5rem',
                            background: 'rgba(239, 68, 68, 0.95)',
                            border: '1px solid #ef4444',
                            borderRadius: 'var(--radius-lg)',
                            color: '#fff',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '1rem'
                        }}>
                            <XCircle size={24} style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Upload Error</p>
                                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>{uploadError}</p>
                            </div>
                            <button
                                onClick={() => {
                                    setUploadError('');
                                    setScanMode(null);
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    padding: '0.25rem'
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {searchResults.length > 0 && (
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>
                        {activeFilter ? `Results for "${activeFilter}"` : `Search Results`}
                    </h2>
                    <button onClick={clearResults} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <X size={18} /> Clear Results
                    </button>
                </div>
            )}

            {/* Main Content Area (Expert Lists & Categories) - Hide if searching */}
            {searchResults.length === 0 && !loading && (
                <>
                    {/* Expert Curated Lists */}
                    <div style={{ marginBottom: '4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Star fill="var(--color-primary)" color="var(--color-primary)" />
                            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Expert-Curated Lists</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            {EXPERT_LISTS.map((list) => (
                                <motion.button
                                    key={list.id}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleExpertClick(list.id)}
                                    className="glass-card"
                                    style={{
                                        padding: '1.5rem',
                                        borderRadius: 'var(--radius-xl)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        textAlign: 'left',
                                        color: '#fff',
                                        background: `linear-gradient(135deg, ${list.color}15 0%, rgba(255,255,255,0.05) 100%)`,
                                        border: `1px solid ${list.color}40`
                                    }}
                                >
                                    <div style={{ color: list.color }}><list.icon size={28} /></div>
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{list.name}</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Nutritionist Pick</div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Browse by Category</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    className="glass-panel"
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        borderRadius: '50px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        background: 'rgba(255,255,255,0.03)',
                                        color: 'var(--color-text)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Results Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
                {searchResults.map((product) => (
                    <motion.div
                        key={product._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card"
                        style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', cursor: 'pointer', position: 'relative', display: 'flex', flexDirection: 'column' }}
                        onClick={() => navigate(`/product/${product._id}`)}
                    >
                        <div style={{ padding: '2rem', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                            <img
                                src={product.image_front_small_url || 'https://placehold.co/200x200?text=No+Image'}
                                alt={product.product_name}
                                style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }}
                            />
                        </div>

                        <div style={{ padding: '1.5rem', background: 'rgba(15, 23, 42, 0.4)' }}>
                            {/* Grade Badge */}
                            <div style={{
                                position: 'absolute', top: '1rem', right: '1rem',
                                background: '#fff', color: '#000', fontWeight: '800', width: '36px', height: '36px',
                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                            }}>
                                {product.nutrition_grades?.toUpperCase() || '?'}
                            </div>

                            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {product.product_name || 'Unknown Product'}
                            </h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                                {product.brands || 'Unknown Brand'}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {loading && (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <div className="animate-float" style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
                    <p style={{ color: 'var(--color-text-muted)' }}>Scanning database...</p>
                </div>
            )}
        </div>
    );
};

export default Scanner;
