const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destination.controller');
// const { protect, authorize } = require('../middlewares/auth.middleware');

// Public routes
router
  .route('/')
  .get(destinationController.getAllDestinations)
  .post(destinationController.createDestination); // Later add: protect, authorize('admin')

router
  .route('/:identifier')
  .get(destinationController.getDestination)
  .put(destinationController.updateDestination) // Later add: protect, authorize('admin')
  .delete(destinationController.deleteDestination); // Later add: protect, authorize('admin')

module.exports = router;
