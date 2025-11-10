const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

/**
 * Demo kategoriyalar (MongoDB siz test uchun)
 */
let demoCategories = [
  {
    id: '1',
    name: 'Cultural Tours',
    slug: 'cultural-tours',
    description: 'Explore the rich cultural heritage and historical sites',
    icon: '🏛️',
    color: '#667eea',
    image: '/uploads/categories/cultural.jpg',
    isActive: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Adventure Tours',
    slug: 'adventure-tours',
    description: 'Thrilling adventures and exciting outdoor activities',
    icon: '🏔️',
    color: '#f59e0b',
    image: '/uploads/categories/adventure.jpg',
    isActive: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Homestays & Hiking',
    slug: 'homestays-hiking',
    description: 'Authentic local experiences with comfortable homestays',
    icon: '🏡',
    color: '#10b981',
    image: '/uploads/categories/homestays.jpg',
    isActive: true,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Day Trips',
    slug: 'day-trips',
    description: 'Perfect one-day excursions to nearby attractions',
    icon: '☀️',
    color: '#ec4899',
    image: '/uploads/categories/day-trips.jpg',
    isActive: true,
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

/**
 * @desc    Barcha kategoriyalarni olish
 * @route   GET /api/categories
 * @access  Public
 */
exports.getAllCategories = asyncHandler(async (req, res) => {
  // Filter by isActive if specified
  const { active } = req.query;
  let categories = demoCategories;

  if (active === 'true') {
    categories = categories.filter(cat => cat.isActive);
  }

  // Sort by order
  categories = categories.sort((a, b) => a.order - b.order);

  res.status(200).json(
    new ApiResponse(200, { categories, count: categories.length }, 'Kategoriyalar ro\'yxati')
  );
});

/**
 * @desc    Bitta kategoriyani olish
 * @route   GET /api/categories/:id
 * @access  Public
 */
exports.getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = demoCategories.find(cat => cat.id === id || cat.slug === id);

  if (!category) {
    return res.status(404).json(
      new ApiResponse(404, null, 'Kategoriya topilmadi')
    );
  }

  res.status(200).json(
    new ApiResponse(200, { category }, 'Kategoriya topildi')
  );
});

/**
 * @desc    Yangi kategoriya yaratish
 * @route   POST /api/categories
 * @access  Admin
 */
exports.createCategory = asyncHandler(async (req, res) => {
  const { name, description, icon, color, image } = req.body;

  if (!name) {
    return res.status(400).json(
      new ApiResponse(400, null, 'Kategoriya nomi kiritilmagan')
    );
  }

  // Check if category with same name already exists
  const existingCategory = demoCategories.find(cat =>
    cat.name.toLowerCase() === name.toLowerCase()
  );

  if (existingCategory) {
    return res.status(400).json(
      new ApiResponse(400, null, 'Bu nom bilan kategoriya allaqachon mavjud')
    );
  }

  // Generate slug
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const newCategory = {
    id: String(demoCategories.length + 1),
    name,
    slug,
    description: description || '',
    icon: icon || '🎯',
    color: color || '#667eea',
    image: image || '/uploads/default-category.jpg',
    isActive: true,
    order: demoCategories.length + 1,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  demoCategories.push(newCategory);

  res.status(201).json(
    new ApiResponse(201, { category: newCategory }, 'Kategoriya yaratildi')
  );
});

/**
 * @desc    Kategoriyani yangilash
 * @route   PUT /api/categories/:id
 * @access  Admin
 */
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, icon, color, image, isActive, order } = req.body;

  const index = demoCategories.findIndex(cat => cat.id === id);

  if (index === -1) {
    return res.status(404).json(
      new ApiResponse(404, null, 'Kategoriya topilmadi')
    );
  }

  // Update fields
  if (name) {
    demoCategories[index].name = name;
    demoCategories[index].slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  if (description !== undefined) demoCategories[index].description = description;
  if (icon) demoCategories[index].icon = icon;
  if (color) demoCategories[index].color = color;
  if (image) demoCategories[index].image = image;
  if (isActive !== undefined) demoCategories[index].isActive = isActive;
  if (order !== undefined) demoCategories[index].order = order;

  demoCategories[index].updatedAt = new Date();

  res.status(200).json(
    new ApiResponse(200, { category: demoCategories[index] }, 'Kategoriya yangilandi')
  );
});

/**
 * @desc    Kategoriyani o'chirish
 * @route   DELETE /api/categories/:id
 * @access  Admin
 */
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const index = demoCategories.findIndex(cat => cat.id === id);

  if (index === -1) {
    return res.status(404).json(
      new ApiResponse(404, null, 'Kategoriya topilmadi')
    );
  }

  const deletedCategory = demoCategories.splice(index, 1);

  res.status(200).json(
    new ApiResponse(200, { category: deletedCategory[0] }, 'Kategoriya o\'chirildi')
  );
});
