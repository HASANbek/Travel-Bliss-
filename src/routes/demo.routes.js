const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  createUser,
  deleteUser,
  getStatus
} = require('../controllers/demo.controller');

// @route   GET /api/demo/status
// @desc    Backend holati
// @access  Public
router.get('/status', getStatus);

// @route   GET /api/demo/users
// @desc    Barcha demo foydalanuvchilar
// @access  Public
router.get('/users', getAllUsers);

// @route   POST /api/demo/users
// @desc    Demo foydalanuvchi yaratish
// @access  Public
router.post('/users', createUser);

// @route   DELETE /api/demo/users/:id
// @desc    Demo foydalanuvchini o'chirish
// @access  Public
router.delete('/users/:id', deleteUser);

module.exports = router;
