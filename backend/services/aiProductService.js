// AI-powered product lookup service using Gemini AI
// Fallback when product is not found in OpenFoodFacts or local DB

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Use Gemini AI to search and extract product information
 */
export async function searchProductWithAI(barcode) {
    if (!GEMINI_API_KEY) {
        console.log('⚠️ Gemini API key not configured');
        return null;
    }

    try {
        const prompt = `You are a food product database expert. A user scanned barcode "${barcode}" (Indian packaged food product).

Search your knowledge for this barcode and provide ACCURATE product information in EXACTLY this JSON format (no markdown, just pure JSON):

{
    "product_name": "Exact product name with brand",
    "brands": "Brand name",
    "quantity": "Net quantity (e.g. 50g, 1L, 500ml)",
    "nutrition_grades": "a/b/c/d/e based on health",
    "nova_group": 1-4 (1=unprocessed, 4=ultra-processed),
    "nutriments": {
        "energy_100g": number (kJ),
        "fat_100g": number,
        "saturated-fat_100g": number,
        "sugars_100g": number,
        "proteins_100g": number,
        "fiber_100g": number,
        "salt_100g": number,
        "sodium_100g": number
    },
    "nutrient_levels": {
        "fat": "low/moderate/high",
        "saturated-fat": "low/moderate/high",
        "sugars": "low/moderate/high",
        "salt": "low/moderate/high"
    },
    "ingredients_text": "Full ingredient list",
    "categories": "Main category, sub-category",
    "categories_tags": ["en:category1", "en:category2"],
    "allergens_tags": ["en:allergen1"],
    "additives_tags": ["en:additive1"],
    "labels_tags": ["vegetarian/non-vegetarian"],
    "ai_generated": true
}

IMPORTANT:
1. If you don't know this exact barcode, return appropriate data for the closest matching product logic.
2. Use realistic nutritional values for similar Indian products.
3. Be conservative with health grades (d/e for junk food).
4. Include common additives for packaged foods.
5. **CRITICAL: ALWAYS PROVIDE 'quantity'. Estimate if necessary (e.g. '100g' for snacks, '500ml' for drinks, '50g' for chocolates). DO NOT LEAVE EMPTY.**
6. No markdown formatting - pure JSON only`;

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: 2048,
                }
            })
        });

        if (!response.ok) {
            console.error('Gemini API error:', response.status);
            return null;
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) return null;

        // Extract JSON from response (remove markdown if present)
        let jsonText = text.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/```\n?/g, '');
        }

        const productData = JSON.parse(jsonText);

        // Validate we got a real product
        if (!productData || productData === null || !productData.product_name) {
            console.log('❌ Gemini: Product not found');
            return null;
        }

        console.log('✅ Gemini AI found product:', productData.product_name);
        return {
            _id: barcode,
            code: barcode,
            ...productData,
            data_source: 'ai_generated'
        };

    } catch (error) {
        console.error('Error in AI product search:', error.message);
        return null;
    }
}
