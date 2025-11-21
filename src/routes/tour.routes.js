const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour.controller');
const { validateTour } = require('../middlewares/validation.middleware');
// const { protect, authorize } = require('../middlewares/auth.middleware');

// Public routes
router.get('/stats', tourController.getTourStats);
router.get('/featured', tourController.getFeaturedTours);
router.get('/:id/seo', tourController.getTourSEO);
router.put('/:id/seo', tourController.updateTourSEO);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour); // Temporarily disabled validation: validateTour

router
  .route('/:id')
  .get(tourController.getTour)
  .put(tourController.updateTour) // Temporarily disabled validation: validateTour
  .delete(tourController.deleteTour); // Keyinchalik: protect, authorize('admin')

module.exports = router;
