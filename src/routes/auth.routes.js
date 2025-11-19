const express = require('express');
const router = express.Router();

// Controllers
const {
  register,
  login,
  logout,
  getMe,
  updatePassword,
  updateProfile,
  forgotPassword,
  verifyOTP,
  resetPassword
} = require('../controllers/auth.controller');

// Middleware
const { protect } = require('../middlewares/auth.middleware');
const {
  registerValidation,
  loginValidation,
  updatePasswordValidation,
  updateProfileValidation,
  validate
} = require('../middlewares/validation.middleware');

/**
 * PUBLIC ROUTES
 */

// @route   POST /api/auth/register
// @desc    Ro'yxatdan o'tish
// @access  Public
router.post('/register', registerValidation, validate, register);

// @route   POST /api/auth/login
// @desc    Tizimga kirish
// @access  Public
router.post('/login', loginValidation, validate, login);

// @route   POST /api/auth/forgot-password
// @desc    Parolni tiklash uchun OTP yuborish
// @access  Public
router.post('/forgot-password', forgotPassword);

// @route   POST /api/auth/verify-otp
// @desc    OTP kodni tekshirish
// @access  Public
router.post('/verify-otp', verifyOTP);

// @route   POST /api/auth/reset-password
// @desc    Yangi parol o'rnatish (OTP bilan)
// @access  Public
router.post('/reset-password', resetPassword);

/**
 * PROTECTED ROUTES (Autentifikatsiya talab qilinadi)
 */

// @route   POST /api/auth/logout
// @desc    Tizimdan chiqish
// @access  Private
router.post('/logout', protect, logout);

// @route   GET /api/auth/me
// @desc    Joriy foydalanuvchi ma'lumotlarini olish
// @access  Private
router.get('/me', protect, getMe);

// @route   PUT /api/auth/update-password
// @desc    Parolni yangilash
// @access  Private
router.put('/update-password', protect, updatePasswordValidation, validate, updatePassword);

// @route   PUT /api/auth/update-profile
// @desc    Profil ma'lumotlarini yangilash
// @access  Private
router.put('/update-profile', protect, updateProfileValidation, validate, updateProfile);

module.exports = router;
