const { GoogleGenerativeAI } = require('@google/generative-ai');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const aiSeoGenerator = require('../services/aiSeoGenerator');

// Initialize Gemini AI
let genAI;
let model;

// Initialize AI model
function initializeAI() {
  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️ GEMINI_API_KEY not found in .env file. AI Assistant will not work.');
    return false;
  }

  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    console.log('✅ Google Gemini AI initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize Gemini AI:', error.message);
    return false;
  }
}

// Tour Assistant - Help with creating tour content
exports.tourAssistant = asyncHandler(async (req, res) => {
  const { prompt, currentData } = req.body;

  if (!prompt) {
    return res.status(400).json(
      new ApiResponse(400, null, 'Prompt is required')
    );
  }

  // Check if AI is initialized
  if (!model) {
    const initialized = initializeAI();
    if (!initialized) {
      return res.status(503).json(
        new ApiResponse(503, null, 'AI service is not configured. Please add GEMINI_API_KEY to .env file.')
      );
    }
  }

  try {
    // Build the AI prompt
    const systemPrompt = `You are a professional tour content writer for a travel agency in Uzbekistan.
Your task is to help create engaging, informative tour descriptions.

Current tour data:
${currentData ? JSON.stringify(currentData, null, 2) : 'No data yet'}

User request: ${prompt}

Please provide helpful content in JSON format with these fields (only include fields that are relevant to the request):
{
  "title": "Tour title (if requested)",
  "summary": "Brief 1-2 sentence summary (if requested)",
  "description": "Detailed tour description with paragraphs (if requested)",
  "highlights": ["Highlight 1", "Highlight 2"] (if requested, array of strings),
  "suggestions": "Any additional suggestions or improvements"
}

Keep the tone professional, engaging, and informative. Focus on Uzbekistan's rich history, culture, and unique experiences.`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse JSON from response
    let aiData = {};
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiData = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        // If no JSON, return raw text
        aiData = { rawResponse: text };
      }
    } catch (parseError) {
      console.log('Could not parse JSON, returning raw response');
      aiData = { rawResponse: text };
    }

    res.status(200).json(
      new ApiResponse(200, aiData, 'AI response generated successfully')
    );

  } catch (error) {
    console.error('AI Error:', error);

    // Handle specific API errors
    if (error.message?.includes('API key')) {
      return res.status(401).json(
        new ApiResponse(401, null, 'Invalid API key. Please check your GEMINI_API_KEY.')
      );
    }

    res.status(500).json(
      new ApiResponse(500, null, `AI service error: ${error.message}`)
    );
  }
});

// Quick suggestions for tour content
exports.quickSuggestions = asyncHandler(async (req, res) => {
  const { field, currentValue } = req.body;

  if (!field) {
    return res.status(400).json(
      new ApiResponse(400, null, 'Field name is required')
    );
  }

  // Check if AI is initialized
  if (!model) {
    const initialized = initializeAI();
    if (!initialized) {
      return res.status(503).json(
        new ApiResponse(503, null, 'AI service is not configured.')
      );
    }
  }

  try {
    let prompt = '';

    switch (field) {
      case 'title':
        prompt = `Suggest 3 catchy tour titles for a tour in Uzbekistan. Current: "${currentValue || 'none'}". Return as JSON array: ["title1", "title2", "title3"]`;
        break;
      case 'summary':
        prompt = `Write a brief 1-2 sentence tour summary for: "${currentValue || 'tour in Uzbekistan'}". Make it engaging and informative.`;
        break;
      case 'highlights':
        prompt = `Suggest 5 tour highlights for a tour titled: "${currentValue || 'Uzbekistan tour'}". Return as JSON array: ["highlight1", "highlight2", ...]`;
        break;
      default:
        prompt = `Provide suggestions for improving this tour ${field}: "${currentValue}"`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json(
      new ApiResponse(200, { suggestion: text }, 'Suggestions generated')
    );

  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json(
      new ApiResponse(500, null, `AI service error: ${error.message}`)
    );
  }
});

// Generate SEO for tour using AI
exports.generateSEO = asyncHandler(async (req, res) => {
  const tourData = req.body;

  // Validate required fields
  if (!tourData.title || !tourData.destination || !tourData.duration || !tourData.price) {
    return res.status(400).json(
      new ApiResponse(400, null, 'Missing required tour data: title, destination, duration, and price are required')
    );
  }

  // Check if AI SEO generator is available
  if (!aiSeoGenerator.isAvailable()) {
    console.log('AI not available, using template-based SEO generation');

    // Generate template-based SEO
    const seoData = aiSeoGenerator.generateTemplateSEO(tourData);
    const score = aiSeoGenerator.calculateSEOScore(seoData);

    return res.status(200).json(
      new ApiResponse(200, {
        seo: seoData,
        score: score,
        method: 'template',
        message: 'SEO generated using template (AI not configured)'
      }, 'SEO generated successfully using template')
    );
  }

  try {
    // Generate SEO using AI
    const seoData = await aiSeoGenerator.generateSEO(tourData);
    const score = aiSeoGenerator.calculateSEOScore(seoData);

    res.status(200).json(
      new ApiResponse(200, {
        seo: seoData,
        score: score,
        method: 'ai',
        message: 'SEO generated successfully using AI'
      }, 'SEO generated successfully')
    );

  } catch (error) {
    console.error('AI SEO Generation Error:', error);

    // Fallback to template-based SEO on error
    const seoData = aiSeoGenerator.generateTemplateSEO(tourData);
    const score = aiSeoGenerator.calculateSEOScore(seoData);

    res.status(200).json(
      new ApiResponse(200, {
        seo: seoData,
        score: score,
        method: 'template_fallback',
        message: 'SEO generated using template (AI error occurred)',
        error: error.message
      }, 'SEO generated using fallback template')
    );
  }
});

// Initialize on module load
initializeAI();
