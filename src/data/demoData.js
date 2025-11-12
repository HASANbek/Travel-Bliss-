// Shared demo data for when MongoDB is not connected
// This data is shared between blog.controller.js and admin.controller.js

const demoBlogs = [
  {
    _id: '1',
    title: 'Top 10 Beaches to Visit This Summer Season',
    slug: 'top-10-beaches-to-visit-this-summer-season',
    excerpt: 'Summer is here, and it\'s time to soak up the sun on some of the world\'s most stunning beaches! Discover the top 10 beaches that you must visit this summer.',
    content: 'Summer is here, and it\'s time to soak up the sun on some of the world\'s most stunning beaches...',
    author: {
      name: 'Sarah Johnson',
      email: 'sarah@travelbliss.uz',
      avatar: 'sarah.jpg'
    },
    featuredImage: 'assets/img/home3/blog-img1.jpg',
    images: ['assets/img/home3/blog-img1.jpg', 'assets/img/home3/blog-img2.jpg'],
    category: 'beach-holidays',
    tags: ['beaches', 'summer', 'travel', 'vacation'],
    status: 'published',
    isPublished: true,
    publishedAt: new Date('2024-06-15'),
    views: 1250,
    commentsCount: 24,
    readingTime: 8,
    isFeatured: true,
    metaTitle: 'Top 10 Beaches to Visit This Summer - Travel Bliss',
    metaDescription: 'Discover the most stunning beaches around the world perfect for your summer vacation.',
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-06-15')
  },
  {
    _id: '2',
    title: 'Best Time to Visit Europe: A Complete Guide',
    slug: 'best-time-to-visit-europe',
    title2: 'Your European Adventure Guide',
    excerpt: 'Planning a European adventure? Learn about the best times to visit different European destinations based on weather, crowds, and events.',
    content: 'Europe offers something special in every season. Whether you\'re looking for sunny Mediterranean beaches or cozy Christmas markets...',
    author: {
      name: 'Michael Chen',
      email: 'michael@travelbliss.uz',
      avatar: 'michael.jpg'
    },
    featuredImage: 'assets/img/home3/blog-img2.jpg',
    image: 'assets/img/home3/blog-img2.jpg',
    category: 'destination-guides',
    tags: ['europe', 'travel-tips', 'planning'],
    status: 'published',
    isPublished: true,
    publishedAt: new Date('2024-06-10'),
    views: 890,
    commentsCount: 15,
    readingTime: 6,
    isFeatured: false,
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-06-10')
  },
  {
    _id: '3',
    title: 'Travel Tips for Asia: Essential Guide for First-Timers',
    slug: 'travel-tips-for-asia',
    title2: 'Make Your Asian Journey Smooth',
    excerpt: 'First time visiting Asia? Here are essential tips to make your Asian adventure smooth and unforgettable.',
    content: 'Asia is a diverse continent with rich cultures, stunning landscapes, and incredible food...',
    author: {
      name: 'Emily Rodriguez',
      email: 'emily@travelbliss.uz',
      avatar: 'emily.jpg'
    },
    featuredImage: 'assets/img/home3/blog-img3.jpg',
    image: 'assets/img/home3/blog-img3.jpg',
    category: 'travel-tips',
    tags: ['asia', 'travel-tips', 'guide'],
    status: 'published',
    isPublished: true,
    publishedAt: new Date('2024-06-08'),
    views: 654,
    commentsCount: 12,
    readingTime: 5,
    isFeatured: true,
    createdAt: new Date('2024-06-08'),
    updatedAt: new Date('2024-06-08')
  },
  {
    _id: '4',
    title: 'Hidden Gems in Africa You Must Explore',
    slug: 'hidden-gems-in-africa',
    title2: 'Beyond the Safari Trail',
    excerpt: 'Beyond the popular safari destinations, Africa has countless hidden gems waiting to be discovered.',
    content: 'Africa is home to some of the world\'s most breathtaking landscapes and wildlife...',
    author: {
      name: 'David Thompson',
      email: 'david@travelbliss.uz',
      avatar: 'david.jpg'
    },
    featuredImage: 'assets/img/home3/blog-img1.jpg',
    image: 'assets/img/home3/blog-img1.jpg',
    category: 'adventure-tours',
    tags: ['africa', 'adventure', 'hidden-gems'],
    status: 'published',
    isPublished: true,
    publishedAt: new Date('2024-06-05'),
    views: 445,
    commentsCount: 8,
    readingTime: 7,
    isFeatured: false,
    createdAt: new Date('2024-06-05'),
    updatedAt: new Date('2024-06-05')
  }
];

module.exports = {
  demoBlogs
};
