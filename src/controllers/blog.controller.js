const Blog = require('../models/Blog.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const mongoose = require('mongoose');

// Demo blogs data (works when MongoDB is not connected)
let demoBlogs = [
  {
    _id: '1',
    title: 'Top 10 Beaches to Visit This Summer Season',
    slug: 'top-10-beaches-to-visit-this-summer-season',
    excerpt: 'Summer is here, and it\'s time to soak up the sun on some of the world\'s most stunning beaches! Discover the top 10 beaches that you must visit this summer.',
    content: 'Summer is here, and it\'s time to soak up the sun on some of the world\'s most stunning beaches...',
    author: {
      name: 'Sarah Johnson',
      email: 'sarah@travelbliss.uz',
      avatar: 'sarah.jpg'
    },
    featuredImage: 'assets/img/home3/blog-img1.jpg',
    images: ['assets/img/home3/blog-img1.jpg', 'assets/img/home3/blog-img2.jpg'],
    category: 'beach-holidays',
    tags: ['beaches', 'summer', 'travel', 'vacation'],
    status: 'published',
    isPublished: true,
    publishedAt: new Date('2024-06-15'),
    views: 1250,
    commentsCount: 24,
    readingTime: 8,
    isFeatured: true,
    metaTitle: 'Top 10 Beaches to Visit This Summer - Travel Bliss',
    metaDescription: 'Discover the most stunning beaches around the world perfect for your summer vacation.',
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-06-15')
  },
  {
    _id: '2',
    title: 'Best Time to Visit Europe: A Complete Guide',
    slug: 'best-time-to-visit-europe',
    excerpt: 'Planning a European adventure? Learn about the best times to visit different European destinations based on weather, crowds, and events.',
    content: 'Europe offers something special in every season. Whether you\'re looking for sunny Mediterranean beaches or cozy Christmas markets...',
    author: {
      name: 'Michael Chen',
      email: 'michael@travelbliss.uz',
      avatar: 'michael.jpg'
    },
    featuredImage: 'assets/img/home3/blog-img2.jpg',
    category: 'destination-guides',
    tags: ['europe', 'travel-tips', 'planning'],
    status: 'published',
    isPublished: true,
    publishedAt: new Date('2024-06-10'),
    views: 890,
    commentsCount: 15,
    readingTime: 6,
    isFeatured: false,
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-06-10')
  },
  {
    _id: '3',
    title: 'Travel Tips for Asia: Essential Guide for First-Timers',
    slug: 'travel-tips-for-asia',
    excerpt: 'First time visiting Asia? Here are essential tips to make your Asian adventure smooth and unforgettable.',
    content: 'Asia is a diverse continent with rich cultures, stunning landscapes, and incredible food...',
    author: {
      name: 'Emily Rodriguez',
      email: 'emily@travelbliss.uz',
      avatar: 'emily.jpg'
    },
    featuredImage: 'assets/img/home3/blog-img3.jpg',
    category: 'travel-tips',
    tags: ['asia', 'travel-tips', 'guide'],
    status: 'published',
    isPublished: true,
    publishedAt: new Date('2024-06-08'),
    views: 654,
    commentsCount: 12,
    readingTime: 5,
    isFeatured: true,
    createdAt: new Date('2024-06-08'),
    updatedAt: new Date('2024-06-08')
  },
  {
    _id: '4',
    title: 'Hidden Gems in Africa You Must Explore',
    slug: 'hidden-gems-in-africa',
    excerpt: 'Beyond the popular safari destinations, Africa has countless hidden gems waiting to be discovered.',
    content: 'Africa is home to some of the world\'s most breathtaking landscapes and wildlife...',
    author: {
      name: 'David Thompson',
      email: 'david@travelbliss.uz',
      avatar: 'david.jpg'
    },
    featuredImage: 'assets/img/home3/blog-img1.jpg',
    category: 'adventure-tours',
    tags: ['africa', 'adventure', 'hidden-gems'],
    status: 'published',
    isPublished: true,
    publishedAt: new Date('2024-06-05'),
    views: 445,
    commentsCount: 8,
    readingTime: 7,
    isFeatured: false,
    createdAt: new Date('2024-06-05'),
    updatedAt: new Date('2024-06-05')
  }
];

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getAllBlogs = asyncHandler(async (req, res) => {
  // Try to get from database
  if (mongoose.connection.readyState === 1) {
    const {
      category,
      tags,
      status = 'published',
      featured,
      page = 1,
      limit = 10,
      sort = '-publishedAt'
    } = req.query;

    // Build filter
    const filter = {};

    if (category) filter.category = category;
    if (tags) filter.tags = { $in: tags.split(',') };
    if (status) filter.status = status;
    if (featured !== undefined) filter.isFeatured = featured === 'true';

    // Execute query
    const blogs = await Blog.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Blog.countDocuments(filter);

    res.status(200).json(new ApiResponse(200, {
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    }, 'Blogs retrieved successfully'));
  } else {
    // Return demo data if MongoDB is not connected
    let filteredBlogs = [...demoBlogs];

    if (req.query.category) {
      filteredBlogs = filteredBlogs.filter(blog => blog.category === req.query.category);
    }

    if (req.query.featured === 'true') {
      filteredBlogs = filteredBlogs.filter(blog => blog.isFeatured);
    }

    res.status(200).json(new ApiResponse(200, {
      blogs: filteredBlogs,
      totalPages: 1,
      currentPage: 1,
      total: filteredBlogs.length
    }, 'Demo blogs retrieved successfully'));
  }
});

// @desc    Get single blog by ID or slug
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Try to get from database
  if (mongoose.connection.readyState === 1) {
    const blog = mongoose.Types.ObjectId.isValid(id)
      ? await Blog.findById(id).populate('relatedPosts')
      : await Blog.findOne({ slug: id }).populate('relatedPosts');

    if (!blog) {
      throw new ApiError(404, 'Blog not found');
    }

    // Increment views
    await blog.incrementViews();

    res.status(200).json(new ApiResponse(200, blog, 'Blog retrieved successfully'));
  } else {
    // Return demo data
    const blog = demoBlogs.find(b => b._id === id || b.slug === id);

    if (!blog) {
      throw new ApiError(404, 'Blog not found');
    }

    res.status(200).json(new ApiResponse(200, blog, 'Demo blog retrieved successfully'));
  }
});

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private/Admin
exports.createBlog = asyncHandler(async (req, res) => {
  // Try to save to database
  if (mongoose.connection.readyState === 1) {
    const blog = await Blog.create(req.body);
    res.status(201).json(new ApiResponse(201, blog, 'Blog created successfully'));
  } else {
    // Add to demo data
    const newBlog = {
      _id: String(demoBlogs.length + 1),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      commentsCount: 0
    };

    demoBlogs.push(newBlog);
    res.status(201).json(new ApiResponse(201, newBlog, 'Demo blog created successfully'));
  }
});

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
exports.updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Try to update in database
  if (mongoose.connection.readyState === 1) {
    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!blog) {
      throw new ApiError(404, 'Blog not found');
    }

    res.status(200).json(new ApiResponse(200, blog, 'Blog updated successfully'));
  } else {
    // Update in demo data
    const index = demoBlogs.findIndex(b => b._id === id);

    if (index === -1) {
      throw new ApiError(404, 'Blog not found');
    }

    demoBlogs[index] = {
      ...demoBlogs[index],
      ...req.body,
      updatedAt: new Date()
    };

    res.status(200).json(new ApiResponse(200, demoBlogs[index], 'Demo blog updated successfully'));
  }
});

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
exports.deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Try to delete from database
  if (mongoose.connection.readyState === 1) {
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      throw new ApiError(404, 'Blog not found');
    }

    res.status(200).json(new ApiResponse(200, null, 'Blog deleted successfully'));
  } else {
    // Delete from demo data
    const index = demoBlogs.findIndex(b => b._id === id);

    if (index === -1) {
      throw new ApiError(404, 'Blog not found');
    }

    demoBlogs.splice(index, 1);
    res.status(200).json(new ApiResponse(200, null, 'Demo blog deleted successfully'));
  }
});

// @desc    Get featured blogs
// @route   GET /api/blogs/featured
// @access  Public
exports.getFeaturedBlogs = asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;

  // Try to get from database
  if (mongoose.connection.readyState === 1) {
    const blogs = await Blog.getFeatured(parseInt(limit));
    res.status(200).json(new ApiResponse(200, blogs, 'Featured blogs retrieved successfully'));
  } else {
    // Return demo data
    const featured = demoBlogs.filter(b => b.isFeatured).slice(0, parseInt(limit));
    res.status(200).json(new ApiResponse(200, featured, 'Demo featured blogs retrieved successfully'));
  }
});

// @desc    Get recent blogs
// @route   GET /api/blogs/recent
// @access  Public
exports.getRecentBlogs = asyncHandler(async (req, res) => {
  const { limit = 4 } = req.query;

  // Try to get from database
  if (mongoose.connection.readyState === 1) {
    const blogs = await Blog.find({ status: 'published', isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
      .select('title slug excerpt featuredImage publishedAt category readingTime');

    res.status(200).json(new ApiResponse(200, blogs, 'Recent blogs retrieved successfully'));
  } else {
    // Return demo data
    const recent = demoBlogs
      .filter(b => b.status === 'published')
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, parseInt(limit));

    res.status(200).json(new ApiResponse(200, recent, 'Demo recent blogs retrieved successfully'));
  }
});

// @desc    Get blogs by category
// @route   GET /api/blogs/category/:category
// @access  Public
exports.getBlogsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { limit = 10, page = 1 } = req.query;

  // Try to get from database
  if (mongoose.connection.readyState === 1) {
    const blogs = await Blog.find({ category, status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Blog.countDocuments({ category, status: 'published' });

    res.status(200).json(new ApiResponse(200, {
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    }, 'Blogs retrieved successfully'));
  } else {
    // Return demo data
    const filtered = demoBlogs.filter(b => b.category === category && b.status === 'published');
    res.status(200).json(new ApiResponse(200, {
      blogs: filtered,
      totalPages: 1,
      currentPage: 1,
      total: filtered.length
    }, 'Demo blogs retrieved successfully'));
  }
});

// @desc    Add comment to blog
// @route   POST /api/blogs/:id/comments
// @access  Public
exports.addComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, content } = req.body;

  // Try to update database
  if (mongoose.connection.readyState === 1) {
    const blog = await Blog.findById(id);

    if (!blog) {
      throw new ApiError(404, 'Blog not found');
    }

    blog.comments.push({
      author: { name, email, avatar: 'default-avatar.jpg' },
      content,
      isApproved: false
    });

    blog.commentsCount = blog.comments.length;
    await blog.save();

    res.status(201).json(new ApiResponse(201, blog, 'Comment added successfully'));
  } else {
    // Add to demo data
    const blog = demoBlogs.find(b => b._id === id);

    if (!blog) {
      throw new ApiError(404, 'Blog not found');
    }

    if (!blog.comments) blog.comments = [];

    blog.comments.push({
      author: { name, email, avatar: 'default-avatar.jpg' },
      content,
      createdAt: new Date(),
      isApproved: false
    });

    blog.commentsCount = blog.comments.length;

    res.status(201).json(new ApiResponse(201, blog, 'Demo comment added successfully'));
  }
});
