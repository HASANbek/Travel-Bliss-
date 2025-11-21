const express = require('express');
const router = express.Router();
const FileStorage = require('../utils/fileStorage');

const toursStorage = new FileStorage('tours.json');

/**
 * Generate XML Sitemap for SEO
 * @route GET /sitemap.xml
 */
router.get('/sitemap.xml', async (req, res) => {
  try {
    const tours = await toursStorage.findAll();
    const baseUrl = process.env.BASE_URL || 'https://travel-bliss.uz';

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>

  <!-- Tours Page -->
  <url>
    <loc>${baseUrl}/tours</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>

  <!-- About Page -->
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Contact Page -->
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Blog Page -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

    // Add all tours
    tours.forEach(tour => {
      if (tour.isActive) {
        sitemap += `
  <!-- Tour: ${tour.title} -->
  <url>
    <loc>${baseUrl}/tours/${tour.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${tour.updatedAt || tour.createdAt || new Date().toISOString()}</lastmod>
    ${tour.seo?.ogImage ? `<image:image>
      <image:loc>${tour.seo.ogImage}</image:loc>
      <image:title>${tour.title}</image:title>
    </image:image>` : ''}
  </url>
`;
      }
    });

    sitemap += '\n</urlset>';

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

/**
 * Generate robots.txt for SEO
 * @route GET /robots.txt
 */
router.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.BASE_URL || 'https://travel-bliss.uz';

  const robots = `# Travel Bliss - Robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Yandexbot
Allow: /

# Social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

# Crawl delay (be nice to server)
Crawl-delay: 1
`;

  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

module.exports = router;
