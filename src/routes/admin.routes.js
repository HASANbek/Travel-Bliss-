const express = require('express');
const router = express.Router();

// Controllers
const {
  getDashboard,
  getAllUsers,
  getUserById,
  updateUserRole,
  toggleUserStatus,
  deleteUser,
  getAllTours,
  toggleTourStatus,
  getAllBookings,
  updateBookingStatus,
  getStatistics,
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/admin.controller');

// Middleware
const { protect, authorize } = require('../middlewares/auth.middleware');

// ========== MIDDLEWARE ==========
// Barcha admin routelar uchun authentication va authorization
// ✅ FILE STORAGE bilan ishlaydi!

router.use(protect);              // Faqat login qilgan userlar
router.use(authorize('admin'));   // Faqat admin rolga ega userlar

// ========== DASHBOARD ==========

// @route   GET /api/admin/dashboard
// @desc    Admin dashboard - asosiy statistika
// @access  Private/Admin
router.get('/dashboard', getDashboard);

// @route   GET /api/admin/statistics
// @desc    Batafsil statistika
// @access  Private/Admin
router.get('/statistics', getStatistics);

// ========== USER MANAGEMENT ==========

// @route   GET /api/admin/users
// @desc    Barcha foydalanuvchilarni olish
// @access  Private/Admin
router.get('/users', getAllUsers);

// @route   GET /api/admin/users/:id
// @desc    Foydalanuvchini ID bo'yicha olish
// @access  Private/Admin
router.get('/users/:id', getUserById);

// @route   PUT /api/admin/users/:id/role
// @desc    Foydalanuvchi rolini yangilash
// @access  Private/Admin
router.put('/users/:id/role', updateUserRole);

// @route   PUT /api/admin/users/:id/status
// @desc    Foydalanuvchini bloklash/faollashtirish
// @access  Private/Admin
router.put('/users/:id/status', toggleUserStatus);

// @route   DELETE /api/admin/users/:id
// @desc    Foydalanuvchini o'chirish
// @access  Private/Admin
router.delete('/users/:id', deleteUser);

// ========== TOUR MANAGEMENT ==========

// @route   GET /api/admin/tours
// @desc    Barcha turlarni olish
// @access  Private/Admin
router.get('/tours', getAllTours);

// @route   PUT /api/admin/tours/:id/status
// @desc    Tur statusini yangilash
// @access  Private/Admin
router.put('/tours/:id/status', toggleTourStatus);

// ========== BOOKING MANAGEMENT ==========

// @route   GET /api/admin/bookings
// @desc    Barcha buyurtmalarni olish
// @access  Private/Admin
router.get('/bookings', getAllBookings);

// @route   PUT /api/admin/bookings/:id/status
// @desc    Buyurtma statusini yangilash
// @access  Private/Admin
router.put('/bookings/:id/status', updateBookingStatus);

// ========== BLOG MANAGEMENT ==========
// Blog post management routes

// @route   GET /api/admin/blogs
// @desc    Barcha blog postlarni olish
// @access  Private/Admin
router.get('/blogs', getAllBlogs);

// @route   GET /api/admin/blogs/:id
// @desc    Blog postni ID bo'yicha olish
// @access  Private/Admin
router.get('/blogs/:id', getBlogById);

// @route   POST /api/admin/blogs
// @desc    Yangi blog post yaratish
// @access  Private/Admin
router.post('/blogs', createBlog);

// @route   PUT /api/admin/blogs/:id
// @desc    Blog postni yangilash
// @access  Private/Admin
router.put('/blogs/:id', updateBlog);

// @route   DELETE /api/admin/blogs/:id
// @desc    Blog postni o'chirish
// @access  Private/Admin
router.delete('/blogs/:id', deleteBlog);

module.exports = router;
