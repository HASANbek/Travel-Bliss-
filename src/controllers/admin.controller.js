const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

// ========== DEMO MA'LUMOTLAR (MongoDB ulanmaguncha) ==========

let demoUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@travelbliss.uz',
    phone: '+998901234567',
    role: 'admin',
    isActive: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Javohir Akbarov',
    email: 'javohir@example.com',
    phone: '+998901234568',
    role: 'user',
    isActive: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '3',
    name: 'Dilshod Karimov',
    email: 'dilshod@example.com',
    phone: '+998901234569',
    role: 'agent',
    isActive: true,
    createdAt: new Date('2024-02-01')
  },
  {
    id: '4',
    name: 'Aziza Rahimova',
    email: 'aziza@example.com',
    phone: '+998901234570',
    role: 'user',
    isActive: false,
    createdAt: new Date('2024-02-10')
  }
];

let demoTours = [
  {
    id: '1',
    title: 'Samarqand - Buxoro Turi',
    destination: 'Uzbekistan',
    duration: '5 kun / 4 kecha',
    price: 350,
    category: 'Cultural',
    availableSeats: 15,
    totalBookings: 5,
    status: 'active'
  },
  {
    id: '2',
    title: 'Dubai Luxury Tour',
    destination: 'UAE',
    duration: '7 kun / 6 kecha',
    price: 1200,
    category: 'Luxury',
    availableSeats: 10,
    totalBookings: 8,
    status: 'active'
  },
  {
    id: '3',
    title: 'Istanbul Shopping Tour',
    destination: 'Turkey',
    duration: '4 kun / 3 kecha',
    price: 450,
    category: 'Shopping',
    availableSeats: 20,
    totalBookings: 12,
    status: 'active'
  }
];

let demoBookings = [
  {
    id: '1',
    userId: '2',
    tourId: '1',
    userName: 'Javohir Akbarov',
    tourTitle: 'Samarqand - Buxoro Turi',
    totalPrice: 700,
    quantity: 2,
    status: 'confirmed',
    paymentStatus: 'paid',
    bookingDate: new Date('2024-03-01')
  },
  {
    id: '2',
    userId: '3',
    tourId: '2',
    userName: 'Dilshod Karimov',
    tourTitle: 'Dubai Luxury Tour',
    totalPrice: 1200,
    quantity: 1,
    status: 'pending',
    paymentStatus: 'pending',
    bookingDate: new Date('2024-03-05')
  }
];

// ========== ADMIN DASHBOARD ==========

/**
 * @desc    Admin Dashboard - Asosiy Statistika
 * @route   GET /api/admin/dashboard
 * @access  Private/Admin
 */
exports.getDashboard = asyncHandler(async (req, res) => {
  const stats = {
    totalUsers: demoUsers.length,
    activeUsers: demoUsers.filter(u => u.isActive).length,
    totalTours: demoTours.length,
    activeTours: demoTours.filter(t => t.status === 'active').length,
    totalBookings: demoBookings.length,
    confirmedBookings: demoBookings.filter(b => b.status === 'confirmed').length,
    pendingBookings: demoBookings.filter(b => b.status === 'pending').length,
    totalRevenue: demoBookings.reduce((sum, b) => sum + b.totalPrice, 0),
    paidRevenue: demoBookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.totalPrice, 0),
    pendingRevenue: demoBookings
      .filter(b => b.paymentStatus === 'pending')
      .reduce((sum, b) => sum + b.totalPrice, 0)
  };

  const recentBookings = demoBookings.slice(0, 5);
  const popularTours = demoTours
    .sort((a, b) => b.totalBookings - a.totalBookings)
    .slice(0, 5);

  res.status(200).json(
    new ApiResponse(200, {
      stats,
      recentBookings,
      popularTours
    }, 'Admin dashboard ma\'lumotlari')
  );
});

// ========== USER MANAGEMENT ==========

/**
 * @desc    Barcha foydalanuvchilarni olish
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
exports.getAllUsers = asyncHandler(async (req, res) => {
  const { role, isActive, search } = req.query;

  let filteredUsers = [...demoUsers];

  // Filter by role
  if (role) {
    filteredUsers = filteredUsers.filter(u => u.role === role);
  }

  // Filter by active status
  if (isActive !== undefined) {
    const active = isActive === 'true';
    filteredUsers = filteredUsers.filter(u => u.isActive === active);
  }

  // Search by name or email
  if (search) {
    filteredUsers = filteredUsers.filter(
      u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.status(200).json(
    new ApiResponse(200, {
      users: filteredUsers,
      total: filteredUsers.length
    }, 'Foydalanuvchilar ro\'yxati')
  );
});

/**
 * @desc    Foydalanuvchini ID bo'yicha olish
 * @route   GET /api/admin/users/:id
 * @access  Private/Admin
 */
exports.getUserById = asyncHandler(async (req, res) => {
  const user = demoUsers.find(u => u.id === req.params.id);

  if (!user) {
    return next(new ApiError(404, 'Foydalanuvchi topilmadi'));
  }

  res.status(200).json(new ApiResponse(200, { user }, 'Foydalanuvchi ma\'lumotlari'));
});

/**
 * @desc    Foydalanuvchi rolini yangilash
 * @route   PUT /api/admin/users/:id/role
 * @access  Private/Admin
 */
exports.updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = demoUsers.find(u => u.id === req.params.id);

  if (!user) {
    return next(new ApiError(404, 'Foydalanuvchi topilmadi'));
  }

  if (!['user', 'admin', 'agent'].includes(role)) {
    return next(new ApiError(400, 'Noto\'g\'ri rol'));
  }

  user.role = role;

  res.status(200).json(
    new ApiResponse(200, { user }, 'Foydalanuvchi roli yangilandi')
  );
});

/**
 * @desc    Foydalanuvchini bloklash/faollashtirish
 * @route   PUT /api/admin/users/:id/status
 * @access  Private/Admin
 */
exports.toggleUserStatus = asyncHandler(async (req, res) => {
  const user = demoUsers.find(u => u.id === req.params.id);

  if (!user) {
    return next(new ApiError(404, 'Foydalanuvchi topilmadi'));
  }

  user.isActive = !user.isActive;

  res.status(200).json(
    new ApiResponse(
      200,
      { user },
      user.isActive ? 'Foydalanuvchi faollashtirildi' : 'Foydalanuvchi bloklandi'
    )
  );
});

/**
 * @desc    Foydalanuvchini o'chirish
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = asyncHandler(async (req, res) => {
  const index = demoUsers.findIndex(u => u.id === req.params.id);

  if (index === -1) {
    return next(new ApiError(404, 'Foydalanuvchi topilmadi'));
  }

  const deletedUser = demoUsers.splice(index, 1);

  res.status(200).json(
    new ApiResponse(200, { user: deletedUser[0] }, 'Foydalanuvchi o\'chirildi')
  );
});

// ========== TOUR MANAGEMENT ==========

/**
 * @desc    Barcha turlarni olish (Admin)
 * @route   GET /api/admin/tours
 * @access  Private/Admin
 */
exports.getAllTours = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, {
      tours: demoTours,
      total: demoTours.length
    }, 'Turlar ro\'yxati')
  );
});

/**
 * @desc    Tur statusini yangilash
 * @route   PUT /api/admin/tours/:id/status
 * @access  Private/Admin
 */
exports.toggleTourStatus = asyncHandler(async (req, res) => {
  const tour = demoTours.find(t => t.id === req.params.id);

  if (!tour) {
    return next(new ApiError(404, 'Tur topilmadi'));
  }

  tour.status = tour.status === 'active' ? 'inactive' : 'active';

  res.status(200).json(
    new ApiResponse(200, { tour }, 'Tur statusi yangilandi')
  );
});

// ========== BOOKING MANAGEMENT ==========

/**
 * @desc    Barcha buyurtmalarni olish
 * @route   GET /api/admin/bookings
 * @access  Private/Admin
 */
exports.getAllBookings = asyncHandler(async (req, res) => {
  const { status, paymentStatus } = req.query;

  let filteredBookings = [...demoBookings];

  if (status) {
    filteredBookings = filteredBookings.filter(b => b.status === status);
  }

  if (paymentStatus) {
    filteredBookings = filteredBookings.filter(b => b.paymentStatus === paymentStatus);
  }

  res.status(200).json(
    new ApiResponse(200, {
      bookings: filteredBookings,
      total: filteredBookings.length
    }, 'Buyurtmalar ro\'yxati')
  );
});

/**
 * @desc    Buyurtma statusini yangilash
 * @route   PUT /api/admin/bookings/:id/status
 * @access  Private/Admin
 */
exports.updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const booking = demoBookings.find(b => b.id === req.params.id);

  if (!booking) {
    return next(new ApiError(404, 'Buyurtma topilmadi'));
  }

  booking.status = status;

  res.status(200).json(
    new ApiResponse(200, { booking }, 'Buyurtma statusi yangilandi')
  );
});

// ========== STATISTICS ==========

/**
 * @desc    Batafsil statistika
 * @route   GET /api/admin/statistics
 * @access  Private/Admin
 */
exports.getStatistics = asyncHandler(async (req, res) => {
  const userStats = {
    total: demoUsers.length,
    byRole: {
      admin: demoUsers.filter(u => u.role === 'admin').length,
      agent: demoUsers.filter(u => u.role === 'agent').length,
      user: demoUsers.filter(u => u.role === 'user').length
    },
    active: demoUsers.filter(u => u.isActive).length,
    inactive: demoUsers.filter(u => !u.isActive).length
  };

  const tourStats = {
    total: demoTours.length,
    active: demoTours.filter(t => t.status === 'active').length,
    inactive: demoTours.filter(t => t.status === 'inactive').length,
    totalBookings: demoTours.reduce((sum, t) => sum + t.totalBookings, 0)
  };

  const bookingStats = {
    total: demoBookings.length,
    confirmed: demoBookings.filter(b => b.status === 'confirmed').length,
    pending: demoBookings.filter(b => b.status === 'pending').length,
    cancelled: demoBookings.filter(b => b.status === 'cancelled').length
  };

  const revenueStats = {
    total: demoBookings.reduce((sum, b) => sum + b.totalPrice, 0),
    paid: demoBookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.totalPrice, 0),
    pending: demoBookings
      .filter(b => b.paymentStatus === 'pending')
      .reduce((sum, b) => sum + b.totalPrice, 0)
  };

  res.status(200).json(
    new ApiResponse(200, {
      users: userStats,
      tours: tourStats,
      bookings: bookingStats,
      revenue: revenueStats
    }, 'Batafsil statistika')
  );
});

// ========== BLOG MANAGEMENT ==========

// Demo Blog Posts
let demoBlogs = [
  {
    _id: '1',
    title: 'Nature, Culture & Thrill: Travel Stories That Inspire',
    title2: 'Experience the Best of Uzbekistan',
    category: 'Travel Stories',
    author: 'Admin',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600',
    featuredImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600',
    excerpt: 'Discover the hidden gems of Uzbekistan through our carefully curated travel experiences.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    tags: 'uzbekistan, travel, culture',
    status: 'published',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20')
  },
  {
    _id: '2',
    title: 'Dream. Explore. Discover. Where Will You Go Next?',
    title2: 'Your Next Adventure Awaits',
    category: 'Destinations',
    author: 'Admin',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600',
    featuredImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600',
    excerpt: 'Explore the ancient Silk Road cities and experience the rich cultural heritage.',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tags: 'destinations, adventure, history',
    status: 'published',
    createdAt: new Date('2024-02-18'),
    updatedAt: new Date('2024-02-18')
  },
  {
    _id: '3',
    title: 'Top 10 Travel Tips for First-Time Visitors to Uzbekistan',
    title2: 'Make Your Journey Unforgettable',
    category: 'Travel Tips',
    author: 'Admin',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600',
    featuredImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600',
    excerpt: 'Essential tips and tricks for making your first trip to Uzbekistan unforgettable.',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    tags: 'tips, guide, uzbekistan',
    status: 'draft',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15')
  },
  {
    _id: '4',
    title: 'Hidden Gems: Unexplored Destinations in Central Asia',
    title2: 'Beyond the Tourist Trail',
    category: 'Destinations',
    author: 'Admin',
    image: 'assets/img/home3/blog-img2.jpg',
    featuredImage: 'assets/img/home3/blog-img2.jpg',
    excerpt: 'Discover breathtaking locations in Central Asia that most travelers never see.',
    content: 'Central Asia is full of hidden treasures waiting to be explored. From remote mountain villages to ancient fortresses, these destinations offer authentic experiences away from the crowds.',
    tags: 'central asia, hidden gems, adventure',
    status: 'published',
    createdAt: new Date('2024-02-12'),
    updatedAt: new Date('2024-02-12')
  },
  {
    _id: '5',
    title: 'A Foodie\'s Guide to Uzbekistan: Must-Try Dishes',
    title2: 'Taste the Authentic Flavors',
    category: 'Food & Culture',
    author: 'Admin',
    image: 'assets/img/home3/blog-img3.jpg',
    featuredImage: 'assets/img/home3/blog-img3.jpg',
    excerpt: 'Explore the rich culinary traditions of Uzbekistan with our comprehensive food guide.',
    content: 'Uzbek cuisine is a delightful blend of flavors, influenced by centuries of Silk Road trade. From plov to samsa, discover the dishes that define this Central Asian nation.',
    tags: 'food, uzbekistan, cuisine, culture',
    status: 'published',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  },
  {
    _id: '6',
    title: 'Best Time to Visit the Silk Road Countries',
    title2: 'Plan Your Perfect Journey',
    category: 'Travel Planning',
    author: 'Admin',
    image: 'assets/img/home3/blog-img1.jpg',
    featuredImage: 'assets/img/home3/blog-img1.jpg',
    excerpt: 'Learn about the ideal seasons to explore the historic Silk Road routes.',
    content: 'Timing is everything when planning a Silk Road adventure. Discover the best months to visit each country along this legendary trade route.',
    tags: 'silk road, travel planning, seasons',
    status: 'published',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  }
];

// Get all blogs
exports.getAllBlogs = asyncHandler(async (req, res) => {
  res.status(200).json(demoBlogs);
});

// Get blog by ID
exports.getBlogById = asyncHandler(async (req, res) => {
  const blog = demoBlogs.find(b => b._id === req.params.id);

  if (!blog) {
    throw new ApiError(404, 'Blog post not found');
  }

  res.status(200).json(
    new ApiResponse(200, blog, 'Blog post retrieved successfully')
  );
});

// Create new blog
exports.createBlog = asyncHandler(async (req, res) => {
  const { title, category, author, image, featuredImage, excerpt, content, tags, status, location, title2 } = req.body;

  if (!title || !category || !content) {
    throw new ApiError(400, 'Title, category, and content are required');
  }

  // Use either image or featuredImage, prefer featuredImage if both exist
  const blogImage = featuredImage || image;

  const newBlog = {
    _id: String(demoBlogs.length + 1),
    title,
    category,
    author: author || 'Admin',
    image: blogImage,
    featuredImage: blogImage,
    excerpt,
    content,
    tags,
    status: status || 'draft',
    location,
    title2,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  demoBlogs.unshift(newBlog);

  res.status(201).json(
    new ApiResponse(201, newBlog, 'Blog post created successfully')
  );
});

// Update blog
exports.updateBlog = asyncHandler(async (req, res) => {
  const blogIndex = demoBlogs.findIndex(b => b._id === req.params.id);

  if (blogIndex === -1) {
    throw new ApiError(404, 'Blog post not found');
  }

  const { title, category, author, image, featuredImage, excerpt, content, tags, status, location, title2 } = req.body;

  // Use either image or featuredImage, prefer featuredImage if both exist
  const blogImage = featuredImage || image || demoBlogs[blogIndex].image || demoBlogs[blogIndex].featuredImage;

  demoBlogs[blogIndex] = {
    ...demoBlogs[blogIndex],
    title: title || demoBlogs[blogIndex].title,
    category: category || demoBlogs[blogIndex].category,
    author: author || demoBlogs[blogIndex].author,
    image: blogImage,
    featuredImage: blogImage,
    excerpt: excerpt || demoBlogs[blogIndex].excerpt,
    content: content || demoBlogs[blogIndex].content,
    tags: tags || demoBlogs[blogIndex].tags,
    status: status || demoBlogs[blogIndex].status,
    location: location || demoBlogs[blogIndex].location,
    title2: title2 !== undefined ? title2 : demoBlogs[blogIndex].title2,
    updatedAt: new Date()
  };

  res.status(200).json(
    new ApiResponse(200, demoBlogs[blogIndex], 'Blog post updated successfully')
  );
});

// Delete blog
exports.deleteBlog = asyncHandler(async (req, res) => {
  const blogIndex = demoBlogs.findIndex(b => b._id === req.params.id);

  if (blogIndex === -1) {
    throw new ApiError(404, 'Blog post not found');
  }

  demoBlogs.splice(blogIndex, 1);

  res.status(200).json(
    new ApiResponse(200, null, 'Blog post deleted successfully')
  );
});
