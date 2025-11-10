const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

// Tour content assistant
router.post('/tour-assistant', aiController.tourAssistant);

// Quick suggestions
router.post('/quick-suggestions', aiController.quickSuggestions);

module.exports = router;
