/**
 * SEO Helper Functions
 * Utilities to help generate SEO-friendly content for Travel Bliss
 */

const { generateTourSchema, generateBreadcrumbSchema, generateOrganizationSchema } = require('./generateTourSchema');

/**
 * Create URL-friendly slug from title
 * @param {string} title - Tour title
 * @param {number} duration - Tour duration in days
 * @returns {string} URL-friendly slug
 */
function createSlug(title, duration) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + `-${duration}-days`;
}

/**
 * Generate SEO meta tags for tour
 * @param {Object} tour - Tour object
 * @returns {Object} SEO meta tags
 */
function generateTourSEO(tour) {
  const slug = tour.slug || createSlug(tour.title, tour.duration);
  const baseUrl = process.env.BASE_URL || 'https://travel-bliss.uz';

  return {
    title: `${tour.title} ${tour.duration} Days | ${tour.destination} | Travel Bliss Uzbekistan`,
    description: `${tour.description}. ${tour.duration}-day guided tour from $${tour.price}. All-inclusive package with expert guides. Book your ${tour.destination} adventure now!`,
    keywords: tour.seo?.keywords || [
      `${tour.destination.toLowerCase()} tour`,
      'uzbekistan travel',
      'silk road tour',
      'central asia travel',
      'travel bliss'
    ],
    canonical: `${baseUrl}/tours/${slug}`,
    ogTitle: `${tour.title} - ${tour.duration} Days in ${tour.destination}`,
    ogDescription: `${tour.description}. Rating: ${tour.rating}/5 (${tour.ratingsCount} reviews). From $${tour.price}/person.`,
    ogImage: tour.seo?.ogImage || `${baseUrl}/images/tours/${tour.destination.toLowerCase()}-tour.jpg`,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: `${tour.title} - Experience ${tour.destination}`,
    twitterDescription: `${tour.duration}-day guided tour through ${tour.destination}. From $${tour.price}/person. Expert guides, all-inclusive.`,
    twitterImage: tour.seo?.ogImage || `${baseUrl}/images/tours/${tour.destination.toLowerCase()}-tour.jpg`
  };
}

/**
 * Generate complete SEO package for tour (meta tags + structured data)
 * @param {Object} tour - Tour object
 * @returns {Object} Complete SEO package with meta and schema
 */
function generateCompleteSEO(tour) {
  return {
    meta: generateTourSEO(tour),
    schema: {
      tour: generateTourSchema(tour),
      breadcrumb: generateBreadcrumbSchema(tour),
      organization: generateOrganizationSchema()
    }
  };
}

/**
 * Generate meta description with optimal length (150-160 characters)
 * @param {string} description - Original description
 * @param {number} maxLength - Maximum length (default 155)
 * @returns {string} Optimized meta description
 */
function optimizeMetaDescription(description, maxLength = 155) {
  if (description.length <= maxLength) {
    return description;
  }

  // Cut at last complete word before maxLength
  const trimmed = description.substring(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(' ');
  return trimmed.substring(0, lastSpace) + '...';
}

/**
 * Generate SEO-friendly title with optimal length (50-60 characters)
 * @param {string} title - Original title
 * @param {number} maxLength - Maximum length (default 60)
 * @returns {string} Optimized title
 */
function optimizeSEOTitle(title, maxLength = 60) {
  if (title.length <= maxLength) {
    return title;
  }

  const trimmed = title.substring(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(' ');
  return trimmed.substring(0, lastSpace);
}

/**
 * Extract keywords from tour data
 * @param {Object} tour - Tour object
 * @returns {Array} Array of relevant keywords
 */
function extractKeywords(tour) {
  const keywords = new Set();

  // Add destination-related keywords
  keywords.add(`${tour.destination.toLowerCase()} tour`);
  keywords.add(`${tour.destination.toLowerCase()} travel`);

  // Add category keywords
  if (tour.category) {
    keywords.add(`${tour.category} tour uzbekistan`);
  }

  // Add duration keywords
  keywords.add(`${tour.duration} day tour`);
  keywords.add(`${tour.duration} days ${tour.destination.toLowerCase()}`);

  // Add generic keywords
  keywords.add('uzbekistan travel');
  keywords.add('silk road tour');
  keywords.add('central asia travel');
  keywords.add('travel bliss');

  // Add location-specific keywords from itinerary
  if (tour.itinerary && Array.isArray(tour.itinerary)) {
    tour.itinerary.forEach(day => {
      if (day.activities && Array.isArray(day.activities)) {
        day.activities.forEach(activity => {
          if (activity.length > 3 && activity.length < 30) {
            keywords.add(activity.toLowerCase());
          }
        });
      }
    });
  }

  return Array.from(keywords);
}

/**
 * Validate SEO data completeness
 * @param {Object} tour - Tour object
 * @returns {Object} Validation result with missing fields
 */
function validateSEO(tour) {
  const required = ['title', 'description', 'slug', 'destination', 'price', 'duration'];
  const missing = [];
  const warnings = [];

  required.forEach(field => {
    if (!tour[field]) {
      missing.push(field);
    }
  });

  // Check SEO object
  if (!tour.seo) {
    warnings.push('SEO object is missing');
  } else {
    if (!tour.seo.keywords || tour.seo.keywords.length < 5) {
      warnings.push('Not enough SEO keywords (minimum 5 recommended)');
    }
    if (!tour.seo.ogImage) {
      warnings.push('Open Graph image is missing');
    }
  }

  // Check description length
  if (tour.description && tour.description.length < 100) {
    warnings.push('Description is too short (minimum 100 characters recommended)');
  }

  return {
    isValid: missing.length === 0,
    missing,
    warnings
  };
}

module.exports = {
  createSlug,
  generateTourSEO,
  generateCompleteSEO,
  optimizeMetaDescription,
  optimizeSEOTitle,
  extractKeywords,
  validateSEO
};
