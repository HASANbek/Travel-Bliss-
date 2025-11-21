const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

// Tour content assistant
router.post('/tour-assistant', aiController.tourAssistant);

// Quick suggestions
router.post('/quick-suggestions', aiController.quickSuggestions);

// Generate SEO for tour
router.post('/generate-seo', aiController.generateSEO);

module.exports = router;
