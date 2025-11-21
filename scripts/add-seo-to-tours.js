const fs = require('fs');
const path = require('path');

// Helper function to create URL-friendly slug
function createSlug(title, duration) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + `-${duration}-days`;
}

// Read tours
const toursPath = path.join(__dirname, '../data/tours.json');
const tours = JSON.parse(fs.readFileSync(toursPath, 'utf8'));

// SEO templates for each tour
const seoTemplates = {
  'Samarkand City Tour': {
    keywords: ['samarkand tour', 'registan square tour', 'uzbekistan travel', 'silk road tour', 'samarkand city tour', 'central asia travel', 'unesco heritage uzbekistan', 'samarkand 3 days', 'cultural tour uzbekistan', 'travel bliss samarkand'],
    ogImage: 'samarkand-registan-square.jpg'
  },
  'Bukhara Heritage Tour': {
    keywords: ['bukhara tour', 'bukhara heritage', 'uzbekistan cultural tour', 'islamic architecture tour', 'silk road bukhara', 'central asia travel', 'unesco bukhara', 'ancient bukhara', 'bukhara 5 days', 'travel bliss bukhara'],
    ogImage: 'bukhara-kalyan-minaret.jpg'
  },
  'Khiva Ancient City': {
    keywords: ['khiva tour', 'khiva ancient city', 'ichan kala', 'uzbekistan desert tour', 'silk road khiva', 'khorezm tour', 'unesco khiva', 'central asia adventure', 'khiva 4 days', 'travel bliss khiva'],
    ogImage: 'khiva-ichan-kala.jpg'
  },
  'Tashkent Modern Tour': {
    keywords: ['tashkent tour', 'tashkent city tour', 'uzbekistan capital', 'modern tashkent', 'soviet architecture', 'uzbekistan metropolis', 'tashkent shopping', 'tashkent 2 days', 'city break uzbekistan', 'travel bliss tashkent'],
    ogImage: 'tashkent-modern-city.jpg'
  }
};

// Add SEO to each tour
tours.forEach(tour => {
  const slug = createSlug(tour.title, tour.duration);
  const template = seoTemplates[tour.title] || {
    keywords: [`${tour.destination.toLowerCase()} tour`, 'uzbekistan travel', 'travel bliss'],
    ogImage: `${tour.destination.toLowerCase()}-tour.jpg`
  };

  tour.slug = slug;
  tour.seo = {
    title: `${tour.title} ${tour.duration} Days | ${tour.destination} | Travel Bliss Uzbekistan`,
    description: `${tour.description}. ${tour.duration}-day guided tour from $${tour.price}. All-inclusive package with expert guides. Book your ${tour.destination} adventure now!`,
    keywords: template.keywords,
    canonical: `https://travel-bliss.uz/tours/${slug}`,
    ogTitle: `${tour.title} - ${tour.duration} Days in ${tour.destination}`,
    ogDescription: `${tour.description}. Rating: ${tour.rating}/5 (${tour.ratingsCount} reviews). From $${tour.price}/person.`,
    ogImage: `https://travel-bliss.uz/images/tours/${template.ogImage}`,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: `${tour.title} - Experience ${tour.destination}`,
    twitterDescription: `${tour.duration}-day guided tour through ${tour.destination}. From $${tour.price}/person. Expert guides, all-inclusive.`,
    twitterImage: `https://travel-bliss.uz/images/tours/${template.ogImage}`
  };

  console.log(`✅ SEO added to: ${tour.title}`);
});

// Write back to file
fs.writeFileSync(toursPath, JSON.stringify(tours, null, 2), 'utf8');

console.log('\n🎉 SEO successfully added to all tours!');
console.log(`📊 Total tours processed: ${tours.length}`);
