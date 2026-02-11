
// Massive database of popular Indian products for fallback
// Categories: Biscuits, Snacks, Beverages, Chocolates, Dairy, Instant Food, Staples

export const INDIAN_PRODUCTS_DB = {
    // --- BISCUITS & COOKIES ---
    '8901063010031': {
        _id: '8901063010031',
        product_name: 'Parle-G Original Gluco Biscuits',
        brands: 'Parle',
        image_front_url: 'https://placehold.co/400x400/ea580c/ffffff?text=Parle-G',
        nutrition_grades: 'c',
        nova_group: 4,
        nutriments: { energy_100g: 1950, fat_100g: 12.5, 'saturated-fat_100g': 4.2, sugars_100g: 22.8, proteins_100g: 7.2, fiber_100g: 2.1, salt_100g: 0.8, sodium_100g: 320 },
        nutrient_levels: { fat: 'moderate', sugars: 'high', salt: 'low' },
        ingredients_text: 'Wheat Flour, Sugar, Edible Vegetable Oil (Palm Oil), Invert Sugar Syrup, Leavening Agents (E500ii, E503ii), Milk Solids, Salt, Emulsifiers (E322)',
        additives_tags: ['en:e500ii', 'en:e503ii', 'en:e322'],
        labels_tags: ['vegetarian'],
        categories: 'Biscuits, Sweet Biscuits',
        categories_tags: ['en:biscuits', 'en:sweet-biscuits']
    },
    '8901063034266': {
        _id: '8901063034266',
        product_name: 'Britannia Good Day Butter Cookies',
        brands: 'Britannia',
        image_front_url: 'https://placehold.co/400x400/f59e0b/ffffff?text=Good+Day',
        nutrition_grades: 'e',
        nova_group: 4,
        nutriments: { energy_100g: 2100, fat_100g: 22.5, sugars_100g: 26.5, proteins_100g: 6.8, fiber_100g: 1.5, salt_100g: 0.7 },
        ingredients_text: 'Refined Wheat Flour, Sugar, Palm Oil, Butter, Milk Solids, Invert Syrup, Salt, Emulsifiers'
    },
    '8901063029415': {
        _id: '8901063029415',
        product_name: 'Britannia Marie Gold',
        brands: 'Britannia',
        image_front_url: 'https://placehold.co/400x400/eab308/ffffff?text=Marie+Gold',
        nutrition_grades: 'c',
        nova_group: 4,
        nutriments: { energy_100g: 1850, fat_100g: 10.5, sugars_100g: 20.8, proteins_100g: 8.2, fiber_100g: 3.1, salt_100g: 0.9 },
        ingredients_text: 'Wheat Flour, Sugar, Palm Oil, Invert Syrup, Leavening Agents, Milk Solids, Salt'
    },
    '7622201844976': {
        _id: '7622201844976',
        product_name: 'Oreo Vanilla Creme Biscuits',
        brands: 'Cadbury',
        image_front_url: 'https://placehold.co/400x400/292524/ffffff?text=Oreo',
        nutrition_grades: 'e',
        nova_group: 4,
        nutriments: { energy_100g: 2050, fat_100g: 19.5, sugars_100g: 38.0, proteins_100g: 4.8, fiber_100g: 1.5, salt_100g: 0.5 },
        ingredients_text: 'Wheat Flour, Sugar, Palm Oil, Cocoa Solids, Invert Syrup, Leavening Agents, Salt, Emulsifiers'
    },
    '8901725134762': {
        _id: '8901725134762',
        product_name: 'Sunfeast Dark Fantasy Choco Fills',
        brands: 'Sunfeast',
        image_front_url: 'https://placehold.co/400x400/7f1d1d/ffffff?text=Dark+Fantasy',
        nutrition_grades: 'e',
        nova_group: 4,
        nutriments: { energy_100g: 2150, fat_100g: 24.5, sugars_100g: 36.0, proteins_100g: 5.2, fiber_100g: 1.8, salt_100g: 0.4 },
        ingredients_text: 'Choco Creme, Wheat Flour, Hydrogenated Vegetable Oil, Sugar, Invert Syrup, Liquid Glucose, Cocoa Powder'
    },
    '8901725181230': {
        _id: '8901725181230',
        product_name: 'Sunfeast Mom\'s Magic Cashew & Almond',
        brands: 'Sunfeast',
        image_front_url: 'https://placehold.co/400x400/ca8a04/ffffff?text=Moms+Magic',
        nutrition_grades: 'd',
        nova_group: 4,
        nutriments: { energy_100g: 2080, fat_100g: 21.0, sugars_100g: 24.0, proteins_100g: 6.5, fiber_100g: 2.0, salt_100g: 0.6 },
        ingredients_text: 'Wheat Flour, Sugar, Palm Oil, Cashew (2%), Almond (1%), Milk Solids, Butter, Salt'
    },

    // --- SNACKS & CHIPS ---
    '8901491100511': {
        _id: '8901491100511',
        product_name: 'Lays India\'s Magic Masala',
        brands: 'Lays',
        image_front_url: 'https://placehold.co/400x400/1e3a8a/ffffff?text=Lays+Magic',
        nutrition_grades: 'd',
        nova_group: 4,
        nutriments: { energy_100g: 2280, fat_100g: 34.5, sugars_100g: 2.0, proteins_100g: 6.8, fiber_100g: 4.1, salt_100g: 1.8 },
        nutrient_levels: { fat: 'high', sugars: 'low', salt: 'high' },
        ingredients_text: 'Potato, Edible Vegetable Oil (Palmolein, Rice Bran), Spices & Condiments (Onion, Garlic, Chilli, Coriander)'
    },
    '8901491502018': {
        _id: '8901491502018',
        product_name: 'Lays American Style Cream & Onion',
        brands: 'Lays',
        image_front_url: 'https://placehold.co/400x400/16a34a/ffffff?text=Lays+Green',
        nutrition_grades: 'd',
        nova_group: 4,
        nutriments: { energy_100g: 2260, fat_100g: 33.0, sugars_100g: 4.5, proteins_100g: 6.5, fiber_100g: 3.8, salt_100g: 1.6 },
        ingredients_text: 'Potato, Edible Vegetable Oil, Sugar, Salt, Milk Solids, Onion Powder, Parsley, Cheese Powder'
    },
    '8901491101839': {
        _id: '8901491101839',
        product_name: 'Kurkure Masala Munch',
        brands: 'Kurkure',
        image_front_url: 'https://placehold.co/400x400/ea580c/ffffff?text=Kurkure',
        nutrition_grades: 'e',
        nova_group: 4,
        nutriments: { energy_100g: 2320, fat_100g: 36.0, sugars_100g: 1.5, proteins_100g: 5.8, fiber_100g: 2.0, salt_100g: 2.1 },
        ingredients_text: 'Rice Meal, Corn Meal, Gram Meal, Edible Vegetable Oil, Spices & Condiments, Salt'
    },
    '8904004400262': {
        _id: '8904004400262',
        product_name: 'Haldiram\'s Aloo Bhujia',
        brands: 'Haldirams',
        image_front_url: 'https://placehold.co/400x400/dc2626/ffffff?text=Aloo+Bhujia',
        nutrition_grades: 'd',
        nova_group: 4,
        nutriments: { energy_100g: 2450, fat_100g: 42.0, sugars_100g: 0.5, proteins_100g: 10.0, fiber_100g: 3.5, salt_100g: 2.5 },
        ingredients_text: 'Potatoes, Edible Vegetable Oil, Chickpea Flour (Besan), Moth Bean Flour, Salt, Spices'
    },
    '8904004400019': {
        _id: '8904004400019',
        product_name: 'Haldiram\'s Bhujia Sev',
        brands: 'Haldirams',
        image_front_url: 'https://placehold.co/400x400/dc2626/ffffff?text=Bhujia+Sev',
        nutrition_grades: 'd',
        nutriments: { energy_100g: 2400, fat_100g: 40.0, sugars_100g: 0.5, proteins_100g: 12.0, fiber_100g: 4.0, salt_100g: 2.4 },
        ingredients_text: 'Chickpea Flour, Moth Bean Flour, Edible Vegetable Oil, Salt, Spices'
    },

    // --- INSTANT FOODS ---
    '8901058866438': {
        _id: '8901058866438',
        product_name: 'Maggi 2-Minute Noodles Masala',
        brands: 'Nestle',
        image_front_url: 'https://placehold.co/400x400/fbbf24/000000?text=Maggi',
        nutrition_grades: 'd',
        nova_group: 4,
        nutriments: { energy_100g: 1900, fat_100g: 15.2, 'saturated-fat_100g': 7.8, sugars_100g: 3.5, proteins_100g: 9.8, fiber_100g: 2.8, salt_100g: 2.9, sodium_100g: 1160 },
        nutrient_levels: { fat: 'high', 'saturated-fat': 'high', sugars: 'low', salt: 'high' },
        ingredients_text: 'Refined Wheat Flour, Palm Oil, Wheat Gluten, Salt, Thickeners (E412, E466), Onion Powder, Garlic Powder, Turmeric Powder, Red Chilli Powder, Coriander Powder, Cumin Powder, Black Pepper Powder, Ginger Powder, Fenugreek Powder, Cardamom Powder, Clove Powder, Cinnamon Powder, Bay Leaf, Spices & Condiments, Hydrolysed Groundnut Protein, Flavor Enhancers (E621, E635), Sugar, Caramel Color (E150c), Citric Acid (E330), Maltodextrin, Dehydrated Vegetables (Carrot, Peas), Modified Starch, Yeast Extract',
        additives_tags: ['en:e412', 'en:e466', 'en:e621', 'en:e635', 'en:e150c', 'en:e330'],
        labels_tags: ['vegetarian'],
        categories: 'Instant Noodles, Snacks',
        categories_tags: ['en:instant-noodles', 'en:snacks']
    },
    '8901725189328': {
        _id: '8901725189328',
        product_name: 'Sunfeast YiPPee! Magic Masala Noodles',
        brands: 'Sunfeast',
        image_front_url: 'https://placehold.co/400x400/ef4444/ffffff?text=YiPPee',
        nutrition_grades: 'd',
        nova_group: 4,
        nutriments: { energy_100g: 1920, fat_100g: 14.8, sugars_100g: 3.2, proteins_100g: 9.0, fiber_100g: 3.0, salt_100g: 2.8 },
        ingredients_text: 'Refined Wheat Flour, Palm Oil, Salt, Spices, Dehydrated Vegetables'
    },
    '8901058837131': {
        _id: '8901058837131',
        product_name: 'Maggi Hot Heads Spicy Instant Noodles',
        brands: 'Nestle',
        image_front_url: 'https://placehold.co/400x400/991b1b/ffffff?text=Maggi+Spicy',
        nutrition_grades: 'e',
        nova_group: 4,
        nutriments: { energy_100g: 1950, fat_100g: 16.0, sugars_100g: 4.0, proteins_100g: 9.5, fiber_100g: 2.5, salt_100g: 3.2 },
    },

    // --- BEVERAGES ---
    '8901764031206': {
        _id: '8901764031206',
        product_name: 'Thumbs Up (750ml)',
        brands: 'Coca Cola',
        image_front_url: 'https://placehold.co/400x400/000000/ffffff?text=Thums+Up',
        nutrition_grades: 'e',
        nova_group: 4,
        nutriments: { energy_100g: 180, fat_100g: 0, sugars_100g: 10.6, proteins_100g: 0, fiber_100g: 0, salt_100g: 0 },
        ingredients_text: 'Carbonated Water, Sugar, Acidity Regulator (338), Caffeine, Natural Color (150d)'
    },
    '5449000000996': {
        _id: '5449000000996',
        product_name: 'Coca-Cola Original Taste',
        brands: 'Coca Cola',
        image_front_url: 'https://placehold.co/400x400/dc2626/ffffff?text=Coca+Cola',
        nutrition_grades: 'e',
        nova_group: 4,
        nutriments: { energy_100g: 180, fat_100g: 0, sugars_100g: 10.6, proteins_100g: 0, fiber_100g: 0, salt_100g: 0 },
        ingredients_text: 'Carbonated Water, Sugar, Color (150d), Phosphoric Acid, Natural Flavors, Caffeine'
    },
    '8901063100220': {
        _id: '8901063100220',
        product_name: 'Bru Instant Coffee',
        brands: 'Bru',
        image_front_url: 'https://placehold.co/400x400/57534e/ffffff?text=Bru+Coffee',
        nutrition_grades: 'b',
        nova_group: 3,
        nutriments: { energy_100g: 350, fat_100g: 0.5, sugars_100g: 2.0, proteins_100g: 12.0, fiber_100g: 15.0, salt_100g: 0.1 },
        ingredients_text: 'Instant Coffee, Chicory Mixture'
    },
    '8901063140028': {
        _id: '8901063140028',
        product_name: 'Nescafe Classic Instant Coffee',
        brands: 'Nescafe',
        image_front_url: 'https://placehold.co/400x400/57534e/ffffff?text=Nescafe',
        nutrition_grades: 'b',
        nova_group: 3,
        nutriments: { energy_100g: 340, fat_100g: 0.2, sugars_100g: 1.0, proteins_100g: 11.0, fiber_100g: 14.0, salt_100g: 0.1 },
        ingredients_text: 'Coffee Beans'
    },
    '8901888002685': {
        _id: '8901888002685',
        product_name: 'Real Fruit Power Mixed Fruit',
        brands: 'Dabur',
        image_front_url: 'https://placehold.co/400x400/ea580c/ffffff?text=Real+Juice',
        nutrition_grades: 'd',
        nova_group: 4,
        nutriments: { energy_100g: 220, fat_100g: 0, sugars_100g: 13.5, proteins_100g: 0.5, fiber_100g: 0.5, salt_100g: 0.05 },
        ingredients_text: 'Water, Mixed Fruit Concentrate, Sugar, Acidity Regulator, Antioxidant'
    },

    // --- DAIRY ---
    '8901430029520': {
        _id: '8901430029520',
        product_name: 'Amul Butter - Pasteurised',
        brands: 'Amul',
        image_front_url: 'https://placehold.co/400x400/fcd34d/000000?text=Amul+Butter',
        nutrition_grades: 'e',
        nova_group: 3,
        nutriments: { energy_100g: 3000, fat_100g: 80.0, sugars_100g: 2.0, proteins_100g: 1.2, fiber_100g: 0, salt_100g: 1.5 },
        ingredients_text: 'Cream, Salt'
    },
    '8901430000574': {
        _id: '8901430000574',
        product_name: 'Amul Taaza Toned Milk',
        brands: 'Amul',
        image_front_url: 'https://placehold.co/400x400/2563eb/ffffff?text=Amul+Taaza',
        nutrition_grades: 'a',
        nova_group: 1,
        nutriments: { energy_100g: 240, fat_100g: 3.0, sugars_100g: 4.7, proteins_100g: 3.0, fiber_100g: 0, salt_100g: 0.1 },
        ingredients_text: 'Toned Milk'
    },
    '8901058000016': {
        _id: '8901058000016',
        product_name: 'Amul Cheese Cubes',
        brands: 'Amul',
        image_front_url: 'https://placehold.co/400x400/fbbf24/000000?text=Amul+Cheese',
        nutrition_grades: 'd',
        nova_group: 4,
        nutriments: { energy_100g: 1300, fat_100g: 25.0, sugars_100g: 1.5, proteins_100g: 20.0, fiber_100g: 0, salt_100g: 2.5 },
        ingredients_text: 'Cheese, Milk Solids, Emulsifiers, Salt, Preservatives'
    },

    // --- CHOCOLATES ---
    '7622201416258': {
        _id: '7622201416258',
        product_name: 'Cadbury Dairy Milk Silk',
        brands: 'Cadbury',
        image_front_url: 'https://placehold.co/400x400/5b21b6/ffffff?text=Dairy+Milk',
        nutrition_grades: 'e',
        nova_group: 4,
        nutriments: { energy_100g: 2230, fat_100g: 31.0, sugars_100g: 56.0, proteins_100g: 8.0, fiber_100g: 1.2, salt_100g: 0.2 },
        ingredients_text: 'Sugar, Milk Solids, Cocoa Butter, Cocoa Solids, Emulsifiers'
    },
    '8901058863611': {
        _id: '8901058863611',
        product_name: 'Nestle KitKat',
        brands: 'Nestle',
        image_front_url: 'https://placehold.co/400x400/dc2626/ffffff?text=KitKat',
        nutrition_grades: 'e',
        nova_group: 4,
        nutriments: { energy_100g: 2150, fat_100g: 28.0, sugars_100g: 49.0, proteins_100g: 7.5, fiber_100g: 1.5, salt_100g: 0.3 },
        ingredients_text: 'Sugar, Wheat Flour, Milk Solids, Cocoa Butter, Cocoa Mass, Palm Oil, Emulsifiers, Yeast, Salt'
    },
    '3017620422003': {
        _id: '3017620422003',
        product_name: 'Nutella Hazelnut Spread',
        brands: 'Ferrero',
        image_front_url: 'https://placehold.co/400x400/7f1d1d/ffffff?text=Nutella',
        nutrition_grades: 'e',
        nova_group: 4,
        nutriments: { energy_100g: 2250, fat_100g: 30.9, sugars_100g: 56.3, proteins_100g: 6.3, fiber_100g: 0, salt_100g: 0.1 },
        ingredients_text: 'Sugar, Palm Oil, Hazelnuts, Skimmed Milk Powder, Fat-Reduced Cocoa, Emulsifier (Soy Lecithin), Vanillin'
    },

    // --- STAPLES & SPICES ---
    '8901725012312': {
        _id: '8901725012312',
        product_name: 'Aashirvaad Superior MP Atta',
        brands: 'Aashirvaad',
        image_front_url: 'https://placehold.co/400x400/d97706/ffffff?text=Atta',
        nutrition_grades: 'a',
        nova_group: 1,
        nutriments: { energy_100g: 1450, fat_100g: 1.5, sugars_100g: 0.5, proteins_100g: 11.5, fiber_100g: 10.5, salt_100g: 0 },
        ingredients_text: 'Whole Wheat'
    },
    '8901035035048': {
        _id: '8901035035048',
        product_name: 'Tata Salt - Vacuum Evaporated',
        brands: 'Tata',
        image_front_url: 'https://placehold.co/400x400/ef4444/ffffff?text=Tata+Salt',
        nutrition_grades: 'd',
        nova_group: 2,
        nutriments: { energy_100g: 0, fat_100g: 0, sugars_100g: 0, proteins_100g: 0, fiber_100g: 0, salt_100g: 99.0 },
        ingredients_text: 'Edible Common Salt, Iodine, Anti-caking Agent'
    },
    '8901786191001': {
        _id: '8901786191001',
        product_name: 'Everest Meat Masala',
        brands: 'Everest',
        image_front_url: 'https://placehold.co/400x400/991b1b/ffffff?text=Everest',
        nutrition_grades: 'c',
        nova_group: 3,
        nutriments: { energy_100g: 1200, fat_100g: 12.0, sugars_100g: 2.0, proteins_100g: 10.0, fiber_100g: 15.0, salt_100g: 15.0 },
        ingredients_text: 'Chilli, Coriander, Cumin, Black Pepper, Garlic, Ginger, Salt, Turmeric'
    }
};
