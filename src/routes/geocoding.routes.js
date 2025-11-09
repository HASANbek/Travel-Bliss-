const express = require('express');
const router = express.Router();
const { searchLocation } = require('../controllers/geocoding.controller');

// @route   GET /api/geocoding/search?q=attraction&city=Samarkand
// @desc    Search for location coordinates
// @access  Public
router.get('/search', searchLocation);

module.exports = router;
