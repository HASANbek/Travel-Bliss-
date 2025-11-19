const express = require('express');
const {
  checkAvailability,
  createBooking,
  getAllBookings,
  getBookingById,
  getMyBookings,
  confirmBooking,
  cancelBooking,
  deleteBooking,
  getBookingStats
} = require('../controllers/booking.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes
// @route   POST /api/bookings/check-availability
// @desc    Check if tour is available on specific date
// @access  Public
router.post('/check-availability', checkAvailability);

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Public (for now, will be Private later)
router.post('/', createBooking);

// Protected routes (require authentication)
// @route   GET /api/bookings/my-bookings
// @desc    Get current user's bookings
// @access  Private
router.get('/my-bookings', protect, getMyBookings);

// Admin routes
// @route   GET /api/bookings/stats
// @desc    Get booking statistics
// @access  Private/Admin
router.get('/stats', protect, authorize('admin'), getBookingStats);

// @route   GET /api/bookings
// @desc    Get all bookings with filters
// @access  Private/Admin
router.get('/', protect, authorize('admin'), getAllBookings);

// @route   GET /api/bookings/:id
// @desc    Get single booking by ID
// @access  Private (Admin or booking owner)
router.get('/:id', protect, getBookingById);

// @route   PUT /api/bookings/:id/confirm
// @desc    Confirm booking
// @access  Private/Admin
router.put('/:id/confirm', protect, authorize('admin'), confirmBooking);

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel booking
// @access  Private/Admin
router.put('/:id/cancel', protect, authorize('admin'), cancelBooking);

// @route   DELETE /api/bookings/:id
// @desc    Delete booking
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), deleteBooking);

module.exports = router;
