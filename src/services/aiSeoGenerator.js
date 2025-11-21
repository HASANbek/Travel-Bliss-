/**
 * AI-powered SEO Generator Service
 * Uses Gemini AI to generate professional SEO content for tours
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

class AISEOGenerator {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;

    if (!this.apiKey) {
      console.warn('⚠️ GEMINI_API_KEY not found. AI SEO generation will not work.');
      this.genAI = null;
    } else {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
    }
  }

  /**
   * Check if AI is available
   */
  isAvailable() {
    return this.genAI !== null;
  }

  /**
   * Generate SEO content for a tour using AI
   * @param {Object} tourData - Tour information
   * @returns {Promise<Object>} Generated SEO data
   */
  async generateSEO(tourData) {
    if (!this.isAvailable()) {
      throw new Error('AI SEO Generator is not available. Please configure GEMINI_API_KEY in .env file.');
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = this.buildPrompt(tourData);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse JSON response from AI
      const seoData = this.parseAIResponse(text);

      // Validate and optimize
      return this.validateAndOptimize(seoData, tourData);

    } catch (error) {
      console.error('AI SEO Generation Error:', error);

      // Fallback to template-based SEO
      console.log('Falling back to template-based SEO...');
      return this.generateTemplateSEO(tourData);
    }
  }

  /**
   * Build AI prompt for SEO generation
   */
  buildPrompt(tourData) {
    return `You are an expert SEO specialist for a travel agency called "Travel Bliss" in Uzbekistan.
Generate professional SEO content for the following tour in JSON format.

Tour Information:
- Title: ${tourData.title}
- Destination: ${tourData.destination}
- Duration: ${tourData.duration} days
- Price: $${tourData.price}
- Description: ${tourData.description}
- Category: ${tourData.category || 'cultural'}
${tourData.highlights ? `- Highlights: ${tourData.highlights.join(', ')}` : ''}
${tourData.included ? `- Included: ${tourData.included.join(', ')}` : ''}

Generate SEO content with these requirements:

1. SEO Title:
   - Must be 50-60 characters
   - Include destination and "Travel Bliss"
   - Compelling and click-worthy

2. Meta Description:
   - Must be 150-160 characters
   - Include price, duration, and call-to-action
   - Persuasive and informative

3. Keywords:
   - Generate 12-15 relevant keywords
   - Include:
     * Destination-based keywords
     * Tour type keywords
     * Location keywords (Uzbekistan, Central Asia)
     * Duration keywords
     * Brand keyword (travel bliss)
   - Mix of short-tail and long-tail keywords

4. URL Slug:
   - SEO-friendly URL slug
   - Format: destination-tour-type-duration-days
   - All lowercase, hyphen-separated

5. Open Graph Title & Description:
   - Optimized for social media sharing
   - Engaging and shareable

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "title": "SEO title here",
  "description": "Meta description here",
  "keywords": ["keyword1", "keyword2", ...],
  "slug": "url-slug-here",
  "ogTitle": "Open Graph title here",
  "ogDescription": "Open Graph description here",
  "twitterTitle": "Twitter title here",
  "twitterDescription": "Twitter description here"
}`;
  }

  /**
   * Parse AI response and extract JSON
   */
  parseAIResponse(text) {
    try {
      // Remove markdown code blocks if present
      let cleanText = text.trim();
      cleanText = cleanText.replace(/```json\n?/g, '');
      cleanText = cleanText.replace(/```\n?/g, '');
      cleanText = cleanText.trim();

      // Parse JSON
      const seoData = JSON.parse(cleanText);
      return seoData;

    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw new Error('AI returned invalid JSON response');
    }
  }

  /**
   * Validate and optimize AI-generated SEO
   */
  validateAndOptimize(seoData, tourData) {
    // Ensure title length is optimal
    if (seoData.title && seoData.title.length > 60) {
      seoData.title = seoData.title.substring(0, 57) + '...';
    }

    // Ensure description length is optimal
    if (seoData.description && seoData.description.length > 160) {
      const trimmed = seoData.description.substring(0, 157);
      const lastSpace = trimmed.lastIndexOf(' ');
      seoData.description = trimmed.substring(0, lastSpace) + '...';
    }

    // Ensure slug is properly formatted
    if (!seoData.slug) {
      seoData.slug = this.createSlug(tourData.title, tourData.duration);
    }

    // Add canonical URL
    const baseUrl = process.env.BASE_URL || 'https://travel-bliss.uz';
    seoData.canonical = `${baseUrl}/tours/${seoData.slug}`;

    // Add image URLs if available
    seoData.ogImage = tourData.seo?.ogImage || `${baseUrl}/images/tours/${tourData.destination.toLowerCase()}-tour.jpg`;
    seoData.twitterImage = seoData.ogImage;

    // Add meta types
    seoData.ogType = 'website';
    seoData.twitterCard = 'summary_large_image';

    return seoData;
  }

  /**
   * Fallback template-based SEO generation (when AI is not available)
   */
  generateTemplateSEO(tourData) {
    const slug = this.createSlug(tourData.title, tourData.duration);
    const baseUrl = process.env.BASE_URL || 'https://travel-bliss.uz';

    const seoData = {
      title: `${tourData.title} ${tourData.duration} Days | ${tourData.destination} | Travel Bliss`,
      description: `${tourData.description.substring(0, 100)}. ${tourData.duration}-day guided tour from $${tourData.price}. Book your ${tourData.destination} adventure now!`,
      keywords: this.generateTemplateKeywords(tourData),
      slug: slug,
      canonical: `${baseUrl}/tours/${slug}`,
      ogTitle: `${tourData.title} - ${tourData.duration} Days in ${tourData.destination}`,
      ogDescription: `Explore ${tourData.destination} with Travel Bliss. ${tourData.duration} days from $${tourData.price}/person. Expert guides, all-inclusive.`,
      ogImage: `${baseUrl}/images/tours/${tourData.destination.toLowerCase()}-tour.jpg`,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: `${tourData.title} - Experience ${tourData.destination}`,
      twitterDescription: `${tourData.duration}-day guided tour through ${tourData.destination}. From $${tourData.price}/person. Expert guides, all-inclusive.`,
      twitterImage: `${baseUrl}/images/tours/${tourData.destination.toLowerCase()}-tour.jpg`
    };

    return seoData;
  }

  /**
   * Generate template keywords
   */
  generateTemplateKeywords(tourData) {
    const keywords = [
      `${tourData.destination.toLowerCase()} tour`,
      `${tourData.destination.toLowerCase()} travel`,
      'uzbekistan travel',
      'silk road tour',
      'central asia travel',
      `${tourData.duration} day tour`,
      `${tourData.category} tour uzbekistan`,
      'travel bliss',
      `${tourData.destination.toLowerCase()} ${tourData.duration} days`,
      'uzbekistan tours',
      `${tourData.destination.toLowerCase()} package`,
      'uzbekistan vacation'
    ];

    return keywords;
  }

  /**
   * Create URL-friendly slug
   */
  createSlug(title, duration) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + `-${duration}-days`;
  }

  /**
   * Calculate SEO score (0-100)
   */
  calculateSEOScore(seoData) {
    let score = 0;
    const checks = [];

    // Title length (50-60 chars = optimal)
    if (seoData.title) {
      if (seoData.title.length >= 50 && seoData.title.length <= 60) {
        score += 20;
        checks.push({ name: 'Title Length', status: 'perfect', points: 20 });
      } else if (seoData.title.length >= 40 && seoData.title.length <= 70) {
        score += 15;
        checks.push({ name: 'Title Length', status: 'good', points: 15 });
      } else {
        score += 5;
        checks.push({ name: 'Title Length', status: 'needs improvement', points: 5 });
      }
    }

    // Description length (150-160 chars = optimal)
    if (seoData.description) {
      if (seoData.description.length >= 150 && seoData.description.length <= 160) {
        score += 20;
        checks.push({ name: 'Description Length', status: 'perfect', points: 20 });
      } else if (seoData.description.length >= 120 && seoData.description.length <= 170) {
        score += 15;
        checks.push({ name: 'Description Length', status: 'good', points: 15 });
      } else {
        score += 5;
        checks.push({ name: 'Description Length', status: 'needs improvement', points: 5 });
      }
    }

    // Keywords count (10-15 = optimal)
    if (seoData.keywords && Array.isArray(seoData.keywords)) {
      if (seoData.keywords.length >= 10 && seoData.keywords.length <= 15) {
        score += 20;
        checks.push({ name: 'Keywords Count', status: 'perfect', points: 20 });
      } else if (seoData.keywords.length >= 5 && seoData.keywords.length <= 20) {
        score += 15;
        checks.push({ name: 'Keywords Count', status: 'good', points: 15 });
      } else {
        score += 5;
        checks.push({ name: 'Keywords Count', status: 'needs improvement', points: 5 });
      }
    }

    // Has slug
    if (seoData.slug) {
      score += 10;
      checks.push({ name: 'URL Slug', status: 'present', points: 10 });
    }

    // Has canonical URL
    if (seoData.canonical) {
      score += 10;
      checks.push({ name: 'Canonical URL', status: 'present', points: 10 });
    }

    // Has Open Graph tags
    if (seoData.ogTitle && seoData.ogDescription && seoData.ogImage) {
      score += 10;
      checks.push({ name: 'Open Graph Tags', status: 'complete', points: 10 });
    }

    // Has Twitter Card tags
    if (seoData.twitterTitle && seoData.twitterDescription && seoData.twitterImage) {
      score += 10;
      checks.push({ name: 'Twitter Card Tags', status: 'complete', points: 10 });
    }

    return {
      score: Math.min(score, 100),
      checks: checks,
      grade: score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D'
    };
  }
}

module.exports = new AISEOGenerator();
