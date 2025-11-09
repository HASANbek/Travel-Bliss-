const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const { uploadImage, uploadMultipleImages } = require('../controllers/upload.controller');

// @route   POST /api/upload
// @desc    Upload a single image
// @access  Public
router.post('/', upload.single('image'), uploadImage);

// @route   POST /api/upload/multiple
// @desc    Upload multiple images
// @access  Public
router.post('/multiple', upload.array('images', 10), uploadMultipleImages);

module.exports = router;
