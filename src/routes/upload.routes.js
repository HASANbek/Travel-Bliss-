const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const { uploadImage, uploadMultipleImages, uploadTourImage } = require('../controllers/upload.controller');

// @route   POST /api/upload
// @desc    Upload a single image
// @access  Public
router.post('/', (req, res, next) => {
    console.log('📤 Upload route hit');
    console.log('📤 Content-Type:', req.headers['content-type']);
    next();
}, upload.single('image'), uploadImage);

// @route   POST /api/upload/multiple
// @desc    Upload multiple images
// @access  Public
router.post('/multiple', upload.array('images', 10), uploadMultipleImages);

// @route   POST /api/upload/tour-image
// @desc    Upload tour itinerary day image
// @access  Public
router.post('/tour-image', upload.uploadTourImage.single('image'), uploadTourImage);

module.exports = router;
