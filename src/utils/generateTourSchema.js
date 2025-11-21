/**
 * Generate Schema.org structured data for tours
 * This helps Google understand tour content and show rich results
 */

function generateTourSchema(tour) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tour.title,
    "description": tour.description,
    "url": tour.seo?.canonical || `https://travel-bliss.uz/tours/${tour.slug}`,
    "image": tour.seo?.ogImage || `https://travel-bliss.uz/images/tours/${tour.slug}.jpg`,
    "offers": {
      "@type": "Offer",
      "price": tour.price,
      "priceCurrency": "USD",
      "availability": tour.isActive ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": tour.seo?.canonical || `https://travel-bliss.uz/tours/${tour.slug}`,
      "seller": {
        "@type": "Organization",
        "name": "Travel Bliss Uzbekistan",
        "url": "https://travel-bliss.uz",
        "logo": "https://travel-bliss.uz/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+998-93-224-4333",
          "contactType": "customer service",
          "email": "info@travel-bliss.uz",
          "availableLanguage": ["en", "uz", "ru"]
        }
      }
    },
    "touristType": "Tourists",
    "tourBookingPage": `https://travel-bliss.uz/tours/${tour.slug}/book`,
    "duration": `P${tour.duration}D`,
    "itinerary": tour.itinerary?.map((day, index) => ({
      "@type": "Place",
      "name": day.title,
      "description": day.description
    })),
    "provider": {
      "@type": "Organization",
      "name": "Travel Bliss",
      "url": "https://travel-bliss.uz",
      "logo": "https://travel-bliss.uz/logo.png"
    },
    "aggregateRating": tour.rating && tour.ratingsCount ? {
      "@type": "AggregateRating",
      "ratingValue": tour.rating,
      "reviewCount": tour.ratingsCount,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "category": tour.category,
    "keywords": tour.seo?.keywords?.join(', ')
  };
}

function generateBreadcrumbSchema(tour) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://travel-bliss.uz"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tours",
        "item": "https://travel-bliss.uz/tours"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tour.destination,
        "item": `https://travel-bliss.uz/tours?destination=${tour.destination.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": tour.title,
        "item": tour.seo?.canonical || `https://travel-bliss.uz/tours/${tour.slug}`
      }
    ]
  };
}

function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Travel Bliss Uzbekistan",
    "alternateName": "Travel Bliss",
    "url": "https://travel-bliss.uz",
    "logo": "https://travel-bliss.uz/logo.png",
    "image": "https://travel-bliss.uz/images/cover.jpg",
    "description": "Premium travel agency in Uzbekistan offering customized tours along the Silk Road. Experience Samarkand, Bukhara, Khiva, and more with expert local guides.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UZ",
      "addressLocality": "Tashkent",
      "addressRegion": "Tashkent"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.2995",
      "longitude": "69.2401"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998-93-224-4333",
      "contactType": "customer service",
      "email": "info@travel-bliss.uz",
      "availableLanguage": ["English", "Uzbek", "Russian"]
    },
    "sameAs": [
      "https://facebook.com/travelblissuz",
      "https://instagram.com/travelblissuz",
      "https://twitter.com/travelblissuz"
    ],
    "priceRange": "$$$"
  };
}

module.exports = {
  generateTourSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema
};
