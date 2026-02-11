
// TruthIn-style Rating Engine (0-5 scale)
// Based on 4 components: Nutrition, Ingredients, Processing, Additives

const HARMFUL_ADDITIVES = [
    'aspartame', 'sucralose', 'acesulfame', 'saccharin', // Artificial sweeteners
    'e951', 'e950', 'e954', 'e955', // Sweetener codes
    'e102', 'e110', 'e122', 'e124', 'e129', // Artificial colors
    'e433', 'e434', 'e435', 'e436', // Emulsifiers
    'partially hydrogenated', 'trans fat', 'hydrogenated oil',
    'msg', 'monosodium glutamate', 'e621',
    'tbhq', 'bha', 'bht', 'e320', 'e321' // Preservatives
];

const REFINED_INGREDIENTS = [
    'refined', 'white flour', 'maida', 'refined sugar', 'white sugar',
    'palm oil', 'hydrogenated', 'corn syrup', 'high fructose'
];

const WHOLE_INGREDIENTS = [
    'whole grain', 'whole wheat', 'oats', 'brown rice', 'quinoa',
    'vegetables', 'fruits', 'nuts', 'seeds', 'legumes'
];

/**
 * Calculate TruthIn-style rating (0-5 scale)
 */
export const calculateTruthInRating = (product) => {
    if (!product) return null;

    const nutrition = scoreNutritionProfile(product);
    const ingredients = scoreIngredientHealth(product);
    const processing = scoreProcessingLevel(product);
    const additivesPenalty = penalizeHarmfulAdditives(product);

    const totalScore = Math.max(0, Math.min(5, nutrition + ingredients + processing + additivesPenalty));

    return {
        score: parseFloat(totalScore.toFixed(1)),
        breakdown: {
            nutrition: { score: nutrition, max: 2 },
            ingredients: { score: ingredients, max: 1.5 },
            processing: { score: processing, max: 1 },
            additives: { penalty: Math.abs(additivesPenalty), max: 0.5 }
        },
        verdict: getRatingVerdict(totalScore)
    };
};

/**
 * Component 1: Nutrition Profile (0-2 points)
 */
const scoreNutritionProfile = (product) => {
    const nutriments = product.nutriments || {};
    const levels = product.nutrient_levels || {};

    let score = 2.0; // Start with max

    // Penalties for negative nutrients
    if (levels.sugars === 'high') score -= 0.5;
    else if (levels.sugars === 'moderate') score -= 0.25;

    if (levels.salt === 'high') score -= 0.4;
    else if (levels.salt === 'moderate') score -= 0.2;

    if (levels.fat === 'high') score -= 0.3;
    if (levels['saturated-fat'] === 'high') score -= 0.3;

    // Rewards for positive nutrients
    const protein = nutriments.proteins_100g || 0;
    const fiber = nutriments.fiber_100g || 0;

    if (protein > 10) score += 0.3;
    else if (protein > 5) score += 0.15;

    if (fiber > 5) score += 0.2;
    else if (fiber > 3) score += 0.1;

    return Math.max(0, Math.min(2, score));
};

/**
 * Component 2: Ingredient Health Impact (0-1.5 points)
 */
const scoreIngredientHealth = (product) => {
    const ingredientsText = (product.ingredients_text || '').toLowerCase();

    if (!ingredientsText) return 0.75; // Neutral if unknown

    let score = 1.5; // Start with max

    // Check for refined/unhealthy ingredients
    const refinedCount = REFINED_INGREDIENTS.filter(ing =>
        ingredientsText.includes(ing)
    ).length;

    score -= refinedCount * 0.3;

    // Reward for whole/healthy ingredients
    const wholeCount = WHOLE_INGREDIENTS.filter(ing =>
        ingredientsText.includes(ing)
    ).length;

    score += wholeCount * 0.15;

    return Math.max(0, Math.min(1.5, score));
};

/**
 * Component 3: Processing Level (0-1 point, based on NOVA)
 */
const scoreProcessingLevel = (product) => {
    const novaGroup = product.nova_group;

    if (!novaGroup) return 0.5; // Neutral if unknown

    const novaScores = {
        1: 1.0,    // Unprocessed/minimally processed
        2: 0.66,   // Processed culinary ingredients
        3: 0.33,   // Processed foods
        4: 0.0     // Ultra-processed
    };

    return novaScores[novaGroup] || 0.5;
};

/**
 * Component 4: Harmful Additives Penalty (0 to -0.5)
 */
const penalizeHarmfulAdditives = (product) => {
    const ingredientsText = (product.ingredients_text || '').toLowerCase();
    const additivesTags = product.additives_tags || [];

    let penalty = 0;

    // Check ingredients text
    const foundAdditives = HARMFUL_ADDITIVES.filter(additive =>
        ingredientsText.includes(additive)
    );

    penalty -= foundAdditives.length * 0.1;

    // Check additive tags
    const harmfulTags = additivesTags.filter(tag =>
        HARMFUL_ADDITIVES.some(harmful => tag.toLowerCase().includes(harmful))
    );

    penalty -= harmfulTags.length * 0.1;

    return Math.max(-0.5, penalty);
};

/**
 * Convert score to verdict
 */
export const getRatingVerdict = (score) => {
    if (score >= 4.5) return { text: 'Excellent', color: '#22c55e', grade: 'A+' };
    if (score >= 4.0) return { text: 'Very Good', color: '#84cc16', grade: 'A' };
    if (score >= 3.5) return { text: 'Good', color: '#a3e635', grade: 'B+' };
    if (score >= 3.0) return { text: 'Average', color: '#eab308', grade: 'B' };
    if (score >= 2.5) return { text: 'Below Average', color: '#f59e0b', grade: 'C' };
    if (score >= 2.0) return { text: 'Poor', color: '#f97316', grade: 'D' };
    return { text: 'Very Poor', color: '#ef4444', grade: 'E' };
};
