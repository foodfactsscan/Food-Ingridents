
const BASE_URL = 'https://world.openfoodfacts.org/cgi/search.pl';
const PRODUCT_URL_V0 = 'https://world.openfoodfacts.org/api/v0/product';
const PRODUCT_URL_V2 = 'https://world.openfoodfacts.net/api/v2/product';
const INDIA_PRODUCT_URL = 'https://in.openfoodfacts.org/api/v0/product';

// Import Indian products database for barcode lookup
import { INDIAN_PRODUCTS_DB } from './indianProductsDb';

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const getCached = (key) => {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }
    return null;
};

const setCache = (key, data) => {
    cache.set(key, { data, timestamp: Date.now() });
};

// Timeout wrapper for fetch with retry
const fetchWithTimeout = async (url, timeout = 12000, retries = 2) => {
    for (let i = 0; i <= retries; i++) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'User-Agent': 'FactsScan/2.0 - Indian Food Scanner App - factsscan.com'
                }
            });
            clearTimeout(id);

            if (response.ok) {
                return response;
            }

            if (i < retries) {
                await new Promise(resolve => setTimeout(resolve, 800));
                continue;
            }

            throw new Error(`HTTP ${response.status}`);
        } catch (error) {
            clearTimeout(id);
            if (i === retries) throw error;
            await new Promise(resolve => setTimeout(resolve, 800));
        }
    }
};

// Quick fetch with no retries (for parallel fallback calls)
const quickFetch = async (url, timeout = 8000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: { 'User-Agent': 'FactsScan/2.0 - Indian Food Scanner App' }
        });
        clearTimeout(id);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        clearTimeout(id);
        return null;
    }
};

// Normalize product data to ensure all required fields exist
const normalizeProduct = (product) => {
    if (!product) return null;

    // Ensure nutriments object exists with all required fields
    const n = product.nutriments || {};
    product.nutriments = {
        energy_100g: n.energy_100g || n['energy-kcal_100g'] || 0,
        'energy-kcal_100g': n['energy-kcal_100g'] || n.energy_100g || 0,
        fat_100g: n.fat_100g || 0,
        'saturated-fat_100g': n['saturated-fat_100g'] || 0,
        sugars_100g: n.sugars_100g || 0,
        proteins_100g: n.proteins_100g || 0,
        fiber_100g: n.fiber_100g || 0,
        salt_100g: n.salt_100g || 0,
        sodium_100g: n.sodium_100g || (n.salt_100g ? n.salt_100g * 400 : 0),
        carbohydrates_100g: n.carbohydrates_100g || 0,
        ...n
    };

    // Ensure nutrient_levels exists
    if (!product.nutrient_levels) {
        const fat = product.nutriments.fat_100g;
        const sugar = product.nutriments.sugars_100g;
        const salt = product.nutriments.salt_100g;
        const satFat = product.nutriments['saturated-fat_100g'];

        product.nutrient_levels = {
            fat: fat > 17.5 ? 'high' : fat > 3 ? 'moderate' : 'low',
            sugars: sugar > 22.5 ? 'high' : sugar > 5 ? 'moderate' : 'low',
            salt: salt > 1.5 ? 'high' : salt > 0.3 ? 'moderate' : 'low',
            'saturated-fat': satFat > 5 ? 'high' : satFat > 1.5 ? 'moderate' : 'low',
        };
    }

    // Ensure labels_tags is an array
    if (!product.labels_tags) product.labels_tags = [];
    if (!product.categories_tags) product.categories_tags = [];
    if (!product.additives_tags) product.additives_tags = [];

    return product;
};

// Check if product has meaningful data
const hasGoodData = (product) => {
    if (!product) return false;
    const n = product.nutriments || {};
    const hasNutrients = (n.energy_100g || n['energy-kcal_100g'] || n.fat_100g || n.proteins_100g);
    const hasName = product.product_name && product.product_name !== 'Unknown' && product.product_name.length > 1;
    return hasName && hasNutrients;
};

// Merge two product objects, preferring the one with more data
const mergeProducts = (primary, secondary) => {
    if (!secondary) return primary;
    if (!primary) return secondary;

    const merged = { ...primary };

    // Fill in missing fields from secondary
    if (!merged.image_front_url && secondary.image_front_url) merged.image_front_url = secondary.image_front_url;
    if (!merged.nutrition_grades && secondary.nutrition_grades) merged.nutrition_grades = secondary.nutrition_grades;
    if (!merged.nova_group && secondary.nova_group) merged.nova_group = secondary.nova_group;
    if (!merged.ingredients_text && secondary.ingredients_text) merged.ingredients_text = secondary.ingredients_text;
    if (!merged.allergens_tags?.length && secondary.allergens_tags?.length) merged.allergens_tags = secondary.allergens_tags;
    if (!merged.labels_tags?.length && secondary.labels_tags?.length) merged.labels_tags = secondary.labels_tags;
    if (!merged.categories && secondary.categories) merged.categories = secondary.categories;
    if (!merged.categories_tags?.length && secondary.categories_tags?.length) merged.categories_tags = secondary.categories_tags;
    if (!merged.additives_tags?.length && secondary.additives_tags?.length) merged.additives_tags = secondary.additives_tags;
    if (!merged.ingredients_analysis_tags?.length && secondary.ingredients_analysis_tags?.length) merged.ingredients_analysis_tags = secondary.ingredients_analysis_tags;
    if (!merged.quantity && secondary.quantity) merged.quantity = secondary.quantity;

    // If primary nutrients are mostly 0 but secondary has data, use secondary
    const pNut = merged.nutriments || {};
    const sNut = secondary.nutriments || {};
    const pHasData = (pNut.energy_100g || pNut.fat_100g || pNut.proteins_100g);
    const sHasData = (sNut.energy_100g || sNut.fat_100g || sNut.proteins_100g);

    if (!pHasData && sHasData) {
        merged.nutriments = { ...sNut };
    }

    return merged;
};

/**
 * MAIN PRODUCT LOOKUP - Multi-source search with smart fallback
 */
export const getProductByBarcode = async (barcode) => {
    const cacheKey = `product_${barcode}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    console.log(`🔍 Searching for barcode: ${barcode}`);

    // STEP 1: Check local Indian DB first (instant, 0ms)
    let localProduct = null;
    if (INDIAN_PRODUCTS_DB[barcode]) {
        console.log('✅ Found in local Indian DB:', barcode);
        localProduct = { ...INDIAN_PRODUCTS_DB[barcode] };
    }

    // STEP 2: Query multiple OpenFoodFacts sources IN PARALLEL
    const isIndianBarcode = barcode.startsWith('890');

    const apiCalls = [
        // World API v0 (most complete)
        quickFetch(`${PRODUCT_URL_V0}/${barcode}.json`),
        // World API v2 (newer data format)
        quickFetch(`${PRODUCT_URL_V2}/${barcode}?fields=product_name,brands,image_front_url,nutrition_grades,nova_group,nutriments,nutrient_levels,ingredients_text,allergens_tags,labels_tags,categories,categories_tags,additives_tags,ingredients_analysis_tags,quantity,serving_size,serving_quantity`),
    ];

    // Add India-specific API for Indian barcodes
    if (isIndianBarcode) {
        apiCalls.push(quickFetch(`${INDIA_PRODUCT_URL}/${barcode}.json`));
    }

    try {
        const results = await Promise.all(apiCalls);

        let bestProduct = localProduct;

        // Check each API result
        for (const data of results) {
            if (data && data.status === 1 && data.product && hasGoodData(data.product)) {
                if (!bestProduct || !hasGoodData(bestProduct)) {
                    bestProduct = data.product;
                } else {
                    // Merge for most complete data
                    bestProduct = mergeProducts(bestProduct, data.product);
                }
            }
        }

        if (bestProduct && hasGoodData(bestProduct)) {
            const normalized = normalizeProduct(bestProduct);
            const result = { status: 1, product: normalized };
            setCache(cacheKey, result);
            console.log('✅ Product found:', normalized.product_name);
            return result;
        }

        // If we have a local product even if API failed
        if (localProduct) {
            const normalized = normalizeProduct(localProduct);
            const result = { status: 1, product: normalized };
            setCache(cacheKey, result);
            return result;
        }

    } catch (error) {
        console.warn('API calls failed:', error.message);

        // Return local product if available
        if (localProduct) {
            const normalized = normalizeProduct(localProduct);
            const result = { status: 1, product: normalized };
            setCache(cacheKey, result);
            return result;
        }
    }

    // STEP 3: Try one more time with direct v0 call (with retries)
    try {
        const response = await fetchWithTimeout(`${PRODUCT_URL_V0}/${barcode}.json`, 15000, 3);
        const data = await response.json();
        if (data.status === 1 && data.product) {
            const normalized = normalizeProduct(data.product);
            const result = { status: 1, product: normalized };
            setCache(cacheKey, result);
            console.log('✅ Product found on retry:', normalized.product_name);
            return result;
        }
    } catch (error) {
        console.warn('Retry also failed:', error.message);
    }

    // STEP 4: Product not found anywhere
    console.log('❌ Product not found:', barcode);
    return null;
};

export const searchProducts = async (query, filters = {}, page = 1) => {
    const cacheKey = `search_${query}_${JSON.stringify(filters)}_${page}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
        // If query is a barcode (numeric), search by barcode first
        if (/^\d{8,14}$/.test(query)) {
            // Try barcode lookup
            const barcodeResult = await getProductByBarcode(query);
            if (barcodeResult && barcodeResult.status === 1) {
                return {
                    products: [barcodeResult.product],
                    count: 1
                };
            }
        }

        // Search local DB by name (for non-barcode queries)
        const localMatches = [];
        const queryLower = query.toLowerCase();
        for (const [barcode, product] of Object.entries(INDIAN_PRODUCTS_DB)) {
            const name = (product.product_name || '').toLowerCase();
            const brand = (product.brands || '').toLowerCase();
            if (name.includes(queryLower) || brand.includes(queryLower)) {
                localMatches.push(product);
            }
        }

        // Search OpenFoodFacts API
        let url = `${BASE_URL}?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page=${page}&page_size=24&sort_by=popularity`;

        // Apply filters
        if (filters.vegetarian) {
            url += `&tagtype_0=labels&tag_contains_0=contains&tag_0=vegetarian`;
        }

        // Try India-specific search first
        const indiaUrl = url + '&countries=india';
        let products = [];
        let count = 0;

        try {
            const indiaResponse = await fetchWithTimeout(indiaUrl, 10000);
            const indiaData = await indiaResponse.json();
            if (indiaData.products && indiaData.products.length > 0) {
                products = indiaData.products;
                count = indiaData.count || products.length;
            }
        } catch (e) {
            // India search failed, will try global
        }

        // If India search returned few results, also try global
        if (products.length < 5) {
            try {
                const globalResponse = await fetchWithTimeout(url, 10000);
                const globalData = await globalResponse.json();
                if (globalData.products && globalData.products.length > 0) {
                    // Merge: Indian results first, then global (avoiding duplicates)
                    const existingIds = new Set(products.map(p => p._id || p.code));
                    const newProducts = globalData.products.filter(p => !existingIds.has(p._id || p.code));
                    products = [...products, ...newProducts];
                    count = Math.max(count, globalData.count || 0);
                }
            } catch (e) {
                // Global search also failed
            }
        }

        // Combine local matches with API results (local first, deduped)
        if (localMatches.length > 0) {
            const apiIds = new Set(products.map(p => p._id || p.code));
            const uniqueLocal = localMatches.filter(p => !apiIds.has(p._id));
            products = [...uniqueLocal, ...products];
            count += uniqueLocal.length;
        }

        const result = { products, count };
        setCache(cacheKey, result);
        return result;

    } catch (error) {
        console.error("Error searching products:", error);

        // Still return local matches if API fails
        const localMatches = [];
        const queryLower = query.toLowerCase();
        for (const [barcode, product] of Object.entries(INDIAN_PRODUCTS_DB)) {
            const name = (product.product_name || '').toLowerCase();
            const brand = (product.brands || '').toLowerCase();
            if (name.includes(queryLower) || brand.includes(queryLower)) {
                localMatches.push(product);
            }
        }

        if (localMatches.length > 0) {
            return { products: localMatches, count: localMatches.length };
        }

        return { products: [], count: 0 };
    }
};

// Category browsing with India-first approach
export const getProductsByCategory = async (category, page = 1) => {
    const cacheKey = `category_${category}_${page}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
        const categoryMapping = {
            'snacks': 'snacks',
            'beverages': 'beverages',
            'dairies': 'dairies',
            'fruits': 'fruits',
            'cereals-and-potatoes': 'cereals-and-potatoes',
            'plant-based-foods': 'plant-based-foods-and-beverages',
            'meats': 'meats',
            'seafood': 'seafood'
        };

        const offCategory = categoryMapping[category] || category;

        // Try India-specific first
        const url = `${BASE_URL}?tagtype_0=categories&tag_contains_0=contains&tag_0=${offCategory}&action=process&json=1&page=${page}&page_size=24&sort_by=unique_scans_n&countries=india`;

        const response = await fetchWithTimeout(url, 12000);
        const data = await response.json();

        // If no India results, try global
        if (!data.products || data.products.length === 0) {
            const globalUrl = `${BASE_URL}?tagtype_0=categories&tag_contains_0=contains&tag_0=${offCategory}&action=process&json=1&page=${page}&page_size=24&sort_by=unique_scans_n`;

            const globalResponse = await fetchWithTimeout(globalUrl, 12000);
            const globalData = await globalResponse.json();

            const result = {
                products: globalData.products || [],
                count: globalData.count || 0
            };
            setCache(cacheKey, result);
            return result;
        }

        const result = {
            products: data.products || [],
            count: data.count || 0
        };
        setCache(cacheKey, result);
        return result;

    } catch (error) {
        console.error("Error fetching category:", error);
        return { products: [], count: 0 };
    }
};

// Expert curated product lists
export const getExpertCuratedProducts = async (type) => {
    const cacheKey = `expert_${type}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
        let url = `${BASE_URL}?action=process&json=1&page_size=24&sort_by=unique_scans_n`;

        switch (type) {
            case 'high-protein':
                url += `&tagtype_0=categories&tag_contains_0=contains&tag_0=high-protein&tagtype_1=nutrition_grades&tag_contains_1=contains&tag_1=a`;
                break;
            case 'low-sugar':
                url += `&nutriment_0=sugars&nutriment_compare_0=lt&nutriment_value_0=5&tagtype_0=nutrition_grades&tag_contains_0=contains&tag_0=a`;
                break;
            case 'high-fiber':
                url += `&nutriment_0=fiber&nutriment_compare_0=gt&nutriment_value_0=5&tagtype_0=nutrition_grades&tag_contains_0=contains&tag_0=a`;
                break;
            case 'low-fat':
                url += `&nutriment_0=fat&nutriment_compare_0=lt&nutriment_value_0=3&tagtype_0=nutrition_grades&tag_contains_0=contains&tag_0=a`;
                break;
            default:
                return { products: [], count: 0 };
        }

        const response = await fetchWithTimeout(url, 12000);
        const data = await response.json();

        if (!data.products || data.products.length === 0) {
            let broaderUrl = `${BASE_URL}?action=process&json=1&page_size=24&sort_by=unique_scans_n`;

            switch (type) {
                case 'high-protein':
                    broaderUrl += `&tagtype_0=categories&tag_contains_0=contains&tag_0=high-protein`;
                    break;
                case 'low-sugar':
                    broaderUrl += `&nutriment_0=sugars&nutriment_compare_0=lt&nutriment_value_0=10`;
                    break;
                case 'high-fiber':
                    broaderUrl += `&tagtype_0=categories&tag_contains_0=contains&tag_0=high-fiber`;
                    break;
                case 'low-fat':
                    broaderUrl += `&nutriment_0=fat&nutriment_compare_0=lt&nutriment_value_0=5`;
                    break;
            }

            const broaderResponse = await fetchWithTimeout(broaderUrl, 12000);
            const broaderData = await broaderResponse.json();

            const result = {
                products: broaderData.products || [],
                count: broaderData.count || 0
            };
            setCache(cacheKey, result);
            return result;
        }

        const result = {
            products: data.products || [],
            count: data.count || 0
        };
        setCache(cacheKey, result);
        return result;

    } catch (error) {
        console.error("Error fetching expert curated:", error);
        return { products: [], count: 0 };
    }
};

export const getHealthierAlternatives = async (category, currentGrade) => {
    if (!category) return [];

    const cacheKey = `alternatives_${category}_${currentGrade}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
        const url = `${BASE_URL}?tagtype_0=categories&tag_contains_0=contains&tag_0=${category}&tagtype_1=nutrition_grades&tag_contains_1=contains&tag_1=a&action=process&json=1&page_size=6&sort_by=unique_scans_n`;

        const response = await fetchWithTimeout(url, 10000);
        const data = await response.json();

        if (data.products && data.products.length < 3) {
            const urlB = `${BASE_URL}?tagtype_0=categories&tag_contains_0=contains&tag_0=${category}&tagtype_1=nutrition_grades&tag_contains_1=contains&tag_1=b&action=process&json=1&page_size=6&sort_by=unique_scans_n`;
            const responseB = await fetchWithTimeout(urlB, 10000);
            const dataB = await responseB.json();

            const alternatives = [...(data.products || []), ...(dataB.products || [])].slice(0, 5);
            setCache(cacheKey, alternatives);
            return alternatives;
        }

        const alternatives = (data.products || []).slice(0, 5);
        setCache(cacheKey, alternatives);
        return alternatives;

    } catch (error) {
        console.error("Error fetching alternatives:", error);
        return [];
    }
};
