const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
// const { protect, authorize } = require('../middlewares/auth.middleware');

// Public routes
router.get('/featured', blogController.getFeaturedBlogs);
router.get('/recent', blogController.getRecentBlogs);
router.get('/category/:category', blogController.getBlogsByCategory);

// Main CRUD routes
router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog); // Later: protect, authorize('admin')

router
  .route('/:id')
  .get(blogController.getBlog)
  .put(blogController.updateBlog) // Later: protect, authorize('admin')
  .delete(blogController.deleteBlog); // Later: protect, authorize('admin')

// Comments
router.post('/:id/comments', blogController.addComment);

module.exports = router;
