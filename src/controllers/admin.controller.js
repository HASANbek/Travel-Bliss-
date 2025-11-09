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
