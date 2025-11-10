const express = require('express');
const router = express.Router();

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controller');

// @route   GET /api/categories
// @desc    Barcha kategoriyalar
// @access  Public
router.get('/', getAllCategories);

// @route   GET /api/categories/:id
// @desc    Bitta kategoriya
// @access  Public
router.get('/:id', getCategoryById);

// @route   POST /api/categories
// @desc    Yangi kategoriya yaratish
// @access  Admin
router.post('/', createCategory);

// @route   PUT /api/categories/:id
// @desc    Kategoriyani yangilash
// @access  Admin
router.put('/:id', updateCategory);

// @route   DELETE /api/categories/:id
// @desc    Kategoriyani o'chirish
// @access  Admin
router.delete('/:id', deleteCategory);

module.exports = router;
