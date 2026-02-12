
// Health Rating Engine (0-5 scale)
// 5 = BEST (Grade A - Healthiest)
// 0 = WORST (Grade E - Unhealthiest)
// Based on: Nutrition Profile, Ingredients, Processing Level, Additives

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
 * Calculate Health Rating (0-5 scale)
 * Higher score = Healthier product
 */
export const calculateTruthInRating = (product) => {
    if (!product) return null;

    const nutrition = scoreNutritionProfile(product);
    const ingredients = scoreIngredientHealth(product);
    const processing = scoreProcessingLevel(product);
    const additivesPenalty = penalizeHarmfulAdditives(product);

    // Total score: max 5.0
    const totalScore = Math.max(0, Math.min(5, nutrition + ingredients + processing + additivesPenalty));

    return {
        score: parseFloat(totalScore.toFixed(1)),
        breakdown: {
            nutrition: { score: nutrition, max: 2.5 },
            ingredients: { score: ingredients, max: 1.25 },
            processing: { score: processing, max: 1.0 },
            additives: { penalty: Math.abs(additivesPenalty), max: 0.25 }
        },
        verdict: getRatingVerdict(totalScore)
    };
};

/**
 * Component 1: Nutrition Profile (0-2.5 points)
 * Higher score = Better nutrition
 */
const scoreNutritionProfile = (product) => {
    const nutriments = product.nutriments || {};
    const levels = product.nutrient_levels || {};

    let score = 1.25; // Start at middle (neutral)

    // PENALTIES for harmful nutrients (reduce score)
    // Sugar penalties
    if (levels.sugars === 'high') score -= 0.6;
    else if (levels.sugars === 'moderate') score -= 0.3;

    // Salt penalties
    if (levels.salt === 'high') score -= 0.5;
    else if (levels.salt === 'moderate') score -= 0.25;

    // Fat penalties
    if (levels.fat === 'high') score -= 0.4;
    else if (levels.fat === 'moderate') score -= 0.2;

    // Saturated fat penalties
    if (levels['saturated-fat'] === 'high') score -= 0.4;
    else if (levels['saturated-fat'] === 'moderate') score -= 0.2;

    // REWARDS for beneficial nutrients (increase score)
    const protein = nutriments.proteins_100g || 0;
    const fiber = nutriments.fiber_100g || 0;

    // Protein rewards
    if (protein >= 15) score += 0.5;
    else if (protein >= 10) score += 0.35;
    else if (protein >= 5) score += 0.2;

    // Fiber rewards
    if (fiber >= 8) score += 0.4;
    else if (fiber >= 5) score += 0.25;
    else if (fiber >= 3) score += 0.15;

    return Math.max(0, Math.min(2.5, score));
};

/**
 * Component 2: Ingredient Health Impact (0-1.25 points)
 * Higher score = Healthier ingredients
 */
const scoreIngredientHealth = (product) => {
    const ingredientsText = (product.ingredients_text || '').toLowerCase();

    if (!ingredientsText) return 0.625; // Neutral if unknown

    let score = 0.625; // Start at middle

    // PENALTIES for refined/unhealthy ingredients
    const refinedCount = REFINED_INGREDIENTS.filter(ing =>
        ingredientsText.includes(ing)
    ).length;

    score -= refinedCount * 0.15; // Each refined ingredient = -0.15

    // REWARDS for whole/healthy ingredients
    const wholeCount = WHOLE_INGREDIENTS.filter(ing =>
        ingredientsText.includes(ing)
    ).length;

    score += wholeCount * 0.2; // Each whole ingredient = +0.2

    return Math.max(0, Math.min(1.25, score));
};

/**
 * Component 3: Processing Level (0-1.0 point, based on NOVA)
 * Higher score = Less processed
 */
const scoreProcessingLevel = (product) => {
    const novaGroup = product.nova_group;

    if (!novaGroup) return 0.5; // Neutral if unknown

    const novaScores = {
        1: 1.0,    // Unprocessed/minimally processed = BEST
        2: 0.66,   // Processed culinary ingredients
        3: 0.33,   // Processed foods
        4: 0.0     // Ultra-processed = WORST
    };

    return novaScores[novaGroup] || 0.5;
};

/**
 * Component 4: Harmful Additives Penalty (0 to -0.25)
 * More additives = Lower score
 */
const penalizeHarmfulAdditives = (product) => {
    const ingredientsText = (product.ingredients_text || '').toLowerCase();
    const additivesTags = product.additives_tags || [];

    let penalty = 0;

    // Check ingredients text
    const foundAdditives = HARMFUL_ADDITIVES.filter(additive =>
        ingredientsText.includes(additive)
    );

    penalty -= foundAdditives.length * 0.05;

    // Check additive tags
    const harmfulTags = additivesTags.filter(tag =>
        HARMFUL_ADDITIVES.some(harmful => tag.toLowerCase().includes(harmful))
    );

    penalty -= harmfulTags.length * 0.05;

    return Math.max(-0.25, penalty);
};

/**
 * Convert numeric score to letter grade with traffic light colors
 * 5.0 = Grade A (Green - Best)
 * 0.0 = Grade E (Red - Worst)
 */
export const getRatingVerdict = (score) => {
    // Traffic light: Green (A) → Yellow-Green (B) → Yellow (C) → Orange (D) → Red (E)

    if (score >= 4.5) return { text: 'Excellent', color: '#22c55e', grade: 'A' };      // 4.5-5.0 = Bright Green
    if (score >= 4.0) return { text: 'Very Good', color: '#65a30d', grade: 'A' };     // 4.0-4.4 = Dark Green
    if (score >= 3.5) return { text: 'Good', color: '#84cc16', grade: 'B' };          // 3.5-3.9 = Lime Green
    if (score >= 3.0) return { text: 'Above Average', color: '#a3e635', grade: 'B' }; // 3.0-3.4 = Light Green
    if (score >= 2.5) return { text: 'Average', color: '#eab308', grade: 'C' };       // 2.5-2.9 = Yellow
    if (score >= 2.0) return { text: 'Below Average', color: '#f59e0b', grade: 'C' }; // 2.0-2.4 = Amber
    if (score >= 1.5) return { text: 'Poor', color: '#f97316', grade: 'D' };          // 1.5-1.9 = Orange
    if (score >= 1.0) return { text: 'Very Poor', color: '#ea580c', grade: 'D' };     // 1.0-1.4 = Deep Orange
    return { text: 'Avoid', color: '#ef4444', grade: 'E' };                           // 0.0-0.9 = Red
};
