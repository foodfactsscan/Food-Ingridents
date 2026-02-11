
const BASE_URL = 'https://world.openfoodfacts.org/cgi/search.pl';
const PRODUCT_URL = 'https://world.openfoodfacts.org/api/v0/product';

// Import massive Indian products database for barcode lookup only
import { INDIAN_PRODUCTS_DB } from './indianProductsDb';

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes for fresh data

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
const fetchWithTimeout = async (url, timeout = 10000, retries = 2) => {
    for (let i = 0; i <= retries; i++) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            console.log(`Fetching: ${url.substring(0, 100)}...`);
            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'User-Agent': 'FactsScan - Food Scanner App'
                }
            });
            clearTimeout(id);

            if (response.ok) {
                return response;
            }

            // If not ok and not last retry, continue
            if (i < retries) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
                continue;
            }

            throw new Error(`HTTP ${response.status}`);
        } catch (error) {
            clearTimeout(id);
            if (i === retries) {
                throw error;
            }
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
};

export const getProductByBarcode = async (barcode) => {
    const cacheKey = `product_${barcode}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    // 1. Check local massive DB first (Fastest) - ONLY for barcode lookup
    if (INDIAN_PRODUCTS_DB[barcode]) {
        console.log('Found in local Indian DB:', barcode);
        const data = { status: 1, product: INDIAN_PRODUCTS_DB[barcode] };
        setCache(cacheKey, data);
        return data;
    }

    // 2. Check OpenFoodFacts API - PRIMARY SOURCE
    try {
        const response = await fetchWithTimeout(`${PRODUCT_URL}/${barcode}.json`, 10000);
        const data = await response.json();
        if (data.status === 1 && data.product) {
            setCache(cacheKey, data);
            return data;
        }
    } catch (error) {
        console.warn("API fetch failed:", error);
    }

    // 3. Product not found
    return null;
};

export const searchProducts = async (query, filters = {}, page = 1) => {
    const cacheKey = `search_${query}_${JSON.stringify(filters)}_${page}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
        // Search local DB ONLY if it's a barcode (numeric)
        if (/^\d+$/.test(query)) {
            if (INDIAN_PRODUCTS_DB[query]) {
                return {
                    products: [INDIAN_PRODUCTS_DB[query]],
                    count: 1
                };
            }
        }

        // Use Open Food Facts API - REAL DATA
        let url = `${BASE_URL}?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page=${page}&page_size=24&sort_by=popularity`;

        // Apply filters if present
        if (filters.vegetarian) {
            url += `&tagtype_0=labels&tag_contains_0=contains&tag_0=vegetarian`;
        }

        const response = await fetchWithTimeout(url, 10000);
        const data = await response.json();

        const result = {
            products: data.products || [],
            count: data.count || 0
        };

        setCache(cacheKey, result);
        return result;

    } catch (error) {
        console.error("Error searching products:", error);
        return { products: [], count: 0 };
    }
};

// FIXED: Category browsing with REAL Open Food Facts data
export const getProductsByCategory = async (category, page = 1) => {
    const cacheKey = `category_${category}_${page}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
        // Map our category names to Open Food Facts category tags
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

        // Updated query: Use proper OFF API with country filter for better results
        const url = `${BASE_URL}?tagtype_0=categories&tag_contains_0=contains&tag_0=${offCategory}&action=process&json=1&page=${page}&page_size=24&sort_by=unique_scans_n&countries=india`;

        console.log('Fetching category:', offCategory);
        const response = await fetchWithTimeout(url, 12000);
        const data = await response.json();

        // If no India-specific results, try global
        if (!data.products || data.products.length === 0) {
            const globalUrl = `${BASE_URL}?tagtype_0=categories&tag_contains_0=contains&tag_0=${offCategory}&action=process&json=1&page=${page}&page_size=24&sort_by=unique_scans_n`;

            console.log('Trying global search for category:', offCategory);
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

// FIXED: Expert curated lists with REAL nutritional filtering
export const getExpertCuratedProducts = async (type) => {
    const cacheKey = `expert_${type}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
        let url = `${BASE_URL}?action=process&json=1&page_size=24&sort_by=unique_scans_n`;

        switch (type) {
            case 'high-protein':
                // Products with high protein content
                url += `&tagtype_0=categories&tag_contains_0=contains&tag_0=high-protein&tagtype_1=nutrition_grades&tag_contains_1=contains&tag_1=a`;
                break;

            case 'low-sugar':
                // Products with low sugar and good nutrition grade
                url += `&nutriment_0=sugars&nutriment_compare_0=lt&nutriment_value_0=5&tagtype_0=nutrition_grades&tag_contains_0=contains&tag_0=a`;
                break;

            case 'high-fiber':
                // Products with high fiber content
                url += `&nutriment_0=fiber&nutriment_compare_0=gt&nutriment_value_0=5&tagtype_0=nutrition_grades&tag_contains_0=contains&tag_0=a`;
                break;

            case 'low-fat':
                // Products with low fat and good nutrition grade
                url += `&nutriment_0=fat&nutriment_compare_0=lt&nutriment_value_0=3&tagtype_0=nutrition_grades&tag_contains_0=contains&tag_0=a`;
                break;

            default:
                return { products: [], count: 0 };
        }

        console.log('Fetching expert list:', type);
        const response = await fetchWithTimeout(url, 12000);
        const data = await response.json();

        // If strict criteria returns nothing, try broader search
        if (!data.products || data.products.length === 0) {
            console.log('Trying broader search for:', type);
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
            // Try grade B if not enough A products
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
