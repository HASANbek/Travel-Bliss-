const express = require('express');
const router = express.Router();

const {
  getAllPages,
  getAboutPage,
  updateAboutPage,
  getContactPage,
  updateContactPage,
  getFaqPage,
  updateFaqPage,
  getVisaPage,
  updateVisaPage,
  addTeamMember,
  removeTeamMember
} = require('../controllers/pages.controller');

const { protect, authorize } = require('../middlewares/auth.middleware');

// ========== PUBLIC ROUTES ==========

// @route   GET /api/pages
// @desc    Get all pages data
// @access  Public
router.get('/', getAllPages);

// @route   GET /api/pages/about
// @desc    Get About page
// @access  Public
router.get('/about', getAboutPage);

// @route   GET /api/pages/contact
// @desc    Get Contact page
// @access  Public
router.get('/contact', getContactPage);

// @route   GET /api/pages/faq
// @desc    Get FAQ page
// @access  Public
router.get('/faq', getFaqPage);

// @route   GET /api/pages/visa
// @desc    Get Visa page
// @access  Public
router.get('/visa', getVisaPage);

// ========== ADMIN ROUTES ==========

// @route   PUT /api/pages/about
// @desc    Update About page
// @access  Private/Admin
router.put('/about', protect, authorize('admin'), updateAboutPage);

// @route   PUT /api/pages/contact
// @desc    Update Contact page
// @access  Private/Admin
router.put('/contact', protect, authorize('admin'), updateContactPage);

// @route   PUT /api/pages/faq
// @desc    Update FAQ page
// @access  Private/Admin
router.put('/faq', protect, authorize('admin'), updateFaqPage);

// @route   PUT /api/pages/visa
// @desc    Update Visa page
// @access  Private/Admin
router.put('/visa', protect, authorize('admin'), updateVisaPage);

// @route   POST /api/pages/about/team
// @desc    Add team member
// @access  Private/Admin
router.post('/about/team', protect, authorize('admin'), addTeamMember);

// @route   DELETE /api/pages/about/team/:id
// @desc    Remove team member
// @access  Private/Admin
router.delete('/about/team/:id', protect, authorize('admin'), removeTeamMember);

module.exports = router;
