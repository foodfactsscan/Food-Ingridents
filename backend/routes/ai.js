import express from 'express';

const router = express.Router();

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// POST /api/ai/analyze - AI-powered personalized product analysis
router.post('/analyze', async (req, res) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(200).json({
                success: false,
                error: 'GEMINI_API_KEY not configured',
                fallback: true
            });
        }

        const { productName, productBrands, nutrients, ingredientsText, customHealthIssues, customGoals } = req.body;

        if ((!customHealthIssues || customHealthIssues.length === 0) && (!customGoals || customGoals.length === 0)) {
            return res.json({ success: true, concerns: [], benefits: [], notes: [] });
        }

        // Build prompt
        const nutrientSummary = nutrients ? Object.entries(nutrients)
            .filter(([key, val]) => typeof val === 'number' && key.includes('_100g'))
            .map(([key, val]) => `${key.replace('_100g', '')}: ${val}`)
            .slice(0, 20)
            .join(', ') : 'Not available';

        const prompt = `You are a nutrition and health expert AI. Analyze whether this food product is suitable for a person with these specific health conditions and goals.

PRODUCT:
- Name: ${productName || 'Unknown'}
- Brand: ${productBrands || 'Unknown'}
- Key Nutrients per 100g: ${nutrientSummary}
- Ingredients: ${ingredientsText || 'Not available'}

USER'S CUSTOM HEALTH CONDITIONS:
${(customHealthIssues || []).map((issue, i) => `${i + 1}. ${issue}`).join('\n') || 'None'}

USER'S CUSTOM GOALS:
${(customGoals || []).map((goal, i) => `${i + 1}. ${goal}`).join('\n') || 'None'}

INSTRUCTIONS:
1. Analyze this product SPECIFICALLY for the user's stated conditions and goals.
2. Identify concrete concerns (negative impacts) and benefits (positive aspects).
3. For each concern or benefit, explain WHY in 1-2 sentences.
4. Be specific — reference actual nutrients or ingredients from the product.
5. If a condition or goal is unclear, still try your best interpretation.

Respond ONLY with valid JSON in this exact format (no markdown, no code fences):
{
  "concerns": [
    { "label": "short title", "reason": "specific explanation referencing the product", "source": "which condition/goal this relates to", "severity": "high or medium or low" }
  ],
  "benefits": [
    { "label": "short title", "reason": "specific explanation referencing the product", "source": "which condition/goal this relates to" }
  ],
  "overallNote": "A single sentence summary of whether this product is suitable"
}

If there are no concerns, return an empty array for concerns. Same for benefits. Always include overallNote.`;

        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Gemini API error:', response.status, errorData);
            return res.json({
                success: false,
                error: `Gemini API error: ${response.status}`,
                fallback: true
            });
        }

        const data = await response.json();

        // Extract text from Gemini response
        const textContent = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Parse JSON from the response (handle potential markdown code fences)
        let parsed;
        try {
            // Try to extract JSON from the response text
            let jsonStr = textContent.trim();
            // Remove markdown code fences if present
            if (jsonStr.startsWith('```')) {
                jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
            }
            parsed = JSON.parse(jsonStr);
        } catch (parseError) {
            console.error('Failed to parse Gemini response:', textContent);
            return res.json({
                success: false,
                error: 'Failed to parse AI response',
                rawText: textContent,
                fallback: true
            });
        }

        res.json({
            success: true,
            concerns: (parsed.concerns || []).map(c => ({
                ...c,
                type: 'ai-custom',
                icon: '🤖'
            })),
            benefits: (parsed.benefits || []).map(b => ({
                ...b,
                type: 'ai-custom',
                icon: '🤖'
            })),
            overallNote: parsed.overallNote || '',
        });

    } catch (error) {
        console.error('AI analysis error:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            fallback: true
        });
    }
});

export default router;
