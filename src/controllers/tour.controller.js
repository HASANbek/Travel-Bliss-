const Tour = require('../models/Tour.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const mongoose = require('mongoose');

// Demo tours data (works when MongoDB is not connected)
let demoTours = [
  {
    id: '1',
    title: 'Samarkand City Tour',
    description: 'Visit the magnificent Registan Square, Ulugbek Observatory and Gur-Amir Mausoleum',
    destination: 'Samarkand',
    price: 500,
    duration: 3,
    nights: 2,
    destinationsCount: 3,
    maxGroupSize: 15,
    groupSizeMin: 5,
    difficulty: 'easy',
    category: 'cultural',
    imageCover: 'samarkand.jpg',
    accommodation: '5 Star Hotel',
    meals: 'Breakfast & Dinner',
    transportation: 'Taxi, Car',
    languages: ['English', 'Spanish'],
    animal: 'Cat, Pet only',
    ageRange: { min: 18, max: 45 },
    season: 'Winter Season',
    highlights: [
      'Eiffel Tower – Skip-the-line access & breathtaking views from the summit',
      'Louvre Museum – See the Mona Lisa and world-renowned masterpieces',
      'Opera Garnier – Visit the stunning opera house that inspired "The Phantom of the Opera"'
    ],
    locations: [
      { name: 'Southern France', image: 'location1.jpg', days: '01 Days' },
      { name: 'Louvre Museum', image: 'location2.jpg', days: '03 Days' }
    ],
    freeCancellation: 'Some tours offer free cancellation up to a certain period (e.g., 24-48 hours before departure)',
    healthSafety: 'COVID-19 regulations, vaccinations, or travel restrictions',
    faq: [
      { question: 'What are the must-visit places in France?', answer: 'Top destinations include Paris (Eiffel Tower, Louvre), Nice (French Riviera), Bordeaux (wine tours), Provence (lavender fields), and Normandy (Mont Saint-Michel).' },
      { question: 'Do tour packages include entrance fees?', answer: 'Most packages include entrance fees to major attractions, but it\'s best to confirm with your tour operator.' }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Eiffel Tower – The symbol of France',
        description: 'The Eiffel Tower is the heart of Paris and offers a variety of exciting activities for visitors. As like, climb the Eiffel Tower, take the elevator to the summit, sunset & night view, picnic at champ de mars & bike tour around the Eiffel Tower.',
        activities: ['Climb the Eiffel Tower', 'Sunset & night view', 'Bike tour'],
        meals: 'Breakfast, Lunch, Snacks',
        accommodation: 'Rajonikanto Hotel',
        transport: ['Car', 'Flight', 'Boat']
      },
      {
        day: 2,
        title: 'Louvre Museum – Home of the Mona Lisa',
        description: 'Explore the world-famous Louvre Museum and see the Mona Lisa and other masterpieces.',
        activities: ['Museum tour', 'Art appreciation'],
        meals: 'Breakfast, Dinner',
        accommodation: 'Paris Grand Hotel',
        transport: ['Car', 'Walking']
      },
      {
        day: 3,
        title: 'Notre-Dame – Iconic Gothic Cathedral',
        description: 'Visit the stunning Notre-Dame Cathedral and explore the historic Latin Quarter.',
        activities: ['Cathedral visit', 'Latin Quarter walking tour'],
        meals: 'Breakfast',
        accommodation: 'Paris Grand Hotel',
        transport: ['Car']
      }
    ],
    included: ['Accommodation', 'Transportation', 'Guide services'],
    excluded: ['Meals', 'Personal expenses'],
    rating: 4.8,
    ratingsCount: 125,
    isActive: true,
    isFeatured: true,
    hotSale: true,
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Bukhara Historical Safari',
    description: 'Discover architectural monuments: Ark Fortress, Po-i-Kalyan Complex',
    destination: 'Bukhara',
    price: 450,
    duration: 2,
    maxGroupSize: 20,
    difficulty: 'easy',
    category: 'cultural',
    imageCover: 'bukhara.jpg',
    included: ['Accommodation', 'Transportation', 'Guide services', 'Museum entries'],
    excluded: ['Meals'],
    rating: 4.9,
    ratingsCount: 98,
    isActive: true,
    isFeatured: true,
    hotSale: true,
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Chimgan Mountains Adventure',
    description: 'Hiking in the mountains and connecting with nature',
    destination: 'Chimgan',
    price: 300,
    duration: 1,
    maxGroupSize: 10,
    difficulty: 'challenging',
    category: 'adventure',
    imageCover: 'chimgan.jpg',
    included: ['Transportation', 'Guide', 'Equipment'],
    excluded: ['Accommodation', 'Meals'],
    rating: 4.5,
    ratingsCount: 67,
    isActive: true,
    isFeatured: false,
    hotSale: false,
    createdAt: new Date()
  }
];

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
exports.getAllTours = asyncHandler(async (req, res) => {
  // MongoDB ulanmagan bo'lsa demo data qaytarish
  if (mongoose.connection.readyState !== 1) {
    return res.status(200).json(
      new ApiResponse(200, {
        tours: demoTours,
        count: demoTours.length,
        mode: 'DEMO'
      }, 'Demo turlar ro\'yxati')
    );
  }

  // Query parameters
  const { category, difficulty, minPrice, maxPrice, sort, limit = 10, page = 1 } = req.query;

  // Build query
  let query = Tour.find();

  // Filters
  if (category) query = query.where('category').equals(category);
  if (difficulty) query = query.where('difficulty').equals(difficulty);
  if (minPrice) query = query.where('price').gte(Number(minPrice));
  if (maxPrice) query = query.where('price').lte(Number(maxPrice));

  // Sorting
  if (sort) {
    const sortBy = sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(Number(limit));

  const tours = await query;
  const total = await Tour.countDocuments();

  res.status(200).json(
    new ApiResponse(200, {
      tours,
      count: tours.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    }, 'Tours list retrieved successfully')
  );
});

// @desc    Get single tour
// @route   GET /api/tours/:id
// @access  Public
exports.getTour = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // MongoDB ulanmagan bo'lsa demo data
  if (mongoose.connection.readyState !== 1) {
    const tour = demoTours.find(t => t.id === id);
    if (!tour) {
      throw new ApiError(404, 'Tour not found');
    }
    return res.status(200).json(
      new ApiResponse(200, { tour, mode: 'DEMO' }, 'Tour details retrieved successfully')
    );
  }

  const tour = await Tour.findById(id);

  if (!tour) {
    throw new ApiError(404, 'Tour not found');
  }

  res.status(200).json(
    new ApiResponse(200, { tour }, 'Tour details retrieved successfully')
  );
});

// @desc    Create tour
// @route   POST /api/tours
// @access  Private/Admin
exports.createTour = asyncHandler(async (req, res) => {
  const requestData = req.body;

  // Map frontend field names to backend model field names
  const tourData = {
    title: requestData.name || requestData.title,
    summary: requestData.summary,
    description: requestData.description,
    destination: requestData.location || requestData.destination,
    price: requestData.price,
    discountPrice: requestData.discountPrice,
    duration: requestData.duration,
    nights: requestData.nights,
    destinationsCount: requestData.destinationsCount,
    maxGroupSize: requestData.maxGroupSize,
    groupSizeMin: requestData.groupSizeMin,
    difficulty: requestData.difficulty,
    startDates: requestData.startDate ? [requestData.startDate] : requestData.startDates || [],
    imageCover: requestData.image || requestData.imageCover || 'default-tour.jpg',
    images: requestData.images || [],
    category: requestData.category,
    videoUrl: requestData.videoUrl,
    itinerary: requestData.itinerary,
    tags: requestData.tags || [],
    included: requestData.includes || requestData.included || [],
    excluded: requestData.excludes || requestData.excluded || [],
    accommodation: requestData.accommodation,
    meals: requestData.meals,
    transportation: requestData.transportation,
    languages: requestData.languages || [],
    animal: requestData.animal,
    ageRange: requestData.ageRange,
    season: requestData.season,
    highlights: requestData.highlights || [],
    locations: requestData.locations || [],
    freeCancellation: requestData.freeCancellation,
    healthSafety: requestData.healthSafety,
    faq: requestData.faq || [],
    rating: requestData.rating || 0,
    isActive: requestData.isActive !== undefined ? requestData.isActive : true,
    isFeatured: requestData.isFeatured || false,
    hotSale: requestData.hotSale || false
  };

  // Remove undefined fields
  Object.keys(tourData).forEach(key => {
    if (tourData[key] === undefined) {
      delete tourData[key];
    }
  });

  // MongoDB ulanmagan bo'lsa demo data
  if (mongoose.connection.readyState !== 1) {
    const newTour = {
      id: String(demoTours.length + 1),
      ...tourData,
      rating: 0,
      ratingsCount: 0,
      isActive: true,
      isFeatured: false,
      createdAt: new Date()
    };
    demoTours.push(newTour);

    return res.status(201).json(
      new ApiResponse(201, { tour: newTour, mode: 'DEMO' }, 'Tour created successfully')
    );
  }

  const tour = await Tour.create(tourData);

  res.status(201).json(
    new ApiResponse(201, { tour }, 'Tour created successfully')
  );
});

// @desc    Update tour
// @route   PUT /api/tours/:id
// @access  Private/Admin
exports.updateTour = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const requestData = req.body;

  // Map frontend field names to backend model field names
  const updateData = {};

  if (requestData.name || requestData.title) updateData.title = requestData.name || requestData.title;
  if (requestData.summary !== undefined) updateData.summary = requestData.summary;
  if (requestData.description !== undefined) updateData.description = requestData.description;
  if (requestData.location || requestData.destination) updateData.destination = requestData.location || requestData.destination;
  if (requestData.price !== undefined) updateData.price = requestData.price;
  if (requestData.discountPrice !== undefined) updateData.discountPrice = requestData.discountPrice;
  if (requestData.duration !== undefined) updateData.duration = requestData.duration;
  if (requestData.nights !== undefined) updateData.nights = requestData.nights;
  if (requestData.destinationsCount !== undefined) updateData.destinationsCount = requestData.destinationsCount;
  if (requestData.maxGroupSize !== undefined) updateData.maxGroupSize = requestData.maxGroupSize;
  if (requestData.groupSizeMin !== undefined) updateData.groupSizeMin = requestData.groupSizeMin;
  if (requestData.difficulty !== undefined) updateData.difficulty = requestData.difficulty;
  if (requestData.startDate) updateData.startDates = [requestData.startDate];
  if (requestData.startDates) updateData.startDates = requestData.startDates;
  if (requestData.image || requestData.imageCover) updateData.imageCover = requestData.image || requestData.imageCover;
  if (requestData.images) updateData.images = requestData.images;
  if (requestData.category !== undefined) updateData.category = requestData.category;
  if (requestData.videoUrl !== undefined) updateData.videoUrl = requestData.videoUrl;
  if (requestData.itinerary !== undefined) updateData.itinerary = requestData.itinerary;
  if (requestData.tags) updateData.tags = requestData.tags;
  if (requestData.includes || requestData.included) updateData.included = requestData.includes || requestData.included;
  if (requestData.excludes || requestData.excluded) updateData.excluded = requestData.excludes || requestData.excluded;
  if (requestData.accommodation !== undefined) updateData.accommodation = requestData.accommodation;
  if (requestData.meals !== undefined) updateData.meals = requestData.meals;
  if (requestData.transportation !== undefined) updateData.transportation = requestData.transportation;
  if (requestData.languages) updateData.languages = requestData.languages;
  if (requestData.animal !== undefined) updateData.animal = requestData.animal;
  if (requestData.ageRange !== undefined) updateData.ageRange = requestData.ageRange;
  if (requestData.season !== undefined) updateData.season = requestData.season;
  if (requestData.highlights) updateData.highlights = requestData.highlights;
  if (requestData.locations) updateData.locations = requestData.locations;
  if (requestData.freeCancellation !== undefined) updateData.freeCancellation = requestData.freeCancellation;
  if (requestData.healthSafety !== undefined) updateData.healthSafety = requestData.healthSafety;
  if (requestData.faq) updateData.faq = requestData.faq;
  if (requestData.rating !== undefined) updateData.rating = requestData.rating;
  if (requestData.isActive !== undefined) updateData.isActive = requestData.isActive;
  if (requestData.isFeatured !== undefined) updateData.isFeatured = requestData.isFeatured;
  if (requestData.hotSale !== undefined) updateData.hotSale = requestData.hotSale;

  // MongoDB ulanmagan bo'lsa demo data
  if (mongoose.connection.readyState !== 1) {
    const tourIndex = demoTours.findIndex(t => t.id === id);
    if (tourIndex === -1) {
      throw new ApiError(404, 'Tour not found');
    }

    demoTours[tourIndex] = {
      ...demoTours[tourIndex],
      ...updateData,
      id: demoTours[tourIndex].id,
      createdAt: demoTours[tourIndex].createdAt
    };

    return res.status(200).json(
      new ApiResponse(200, { tour: demoTours[tourIndex], mode: 'DEMO' }, 'Tour updated successfully')
    );
  }

  const tour = await Tour.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });

  if (!tour) {
    throw new ApiError(404, 'Tour not found');
  }

  res.status(200).json(
    new ApiResponse(200, { tour }, 'Tour updated successfully')
  );
});

// @desc    Delete tour
// @route   DELETE /api/tours/:id
// @access  Private/Admin
exports.deleteTour = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // MongoDB ulanmagan bo'lsa demo data
  if (mongoose.connection.readyState !== 1) {
    const tourIndex = demoTours.findIndex(t => t.id === id);
    if (tourIndex === -1) {
      throw new ApiError(404, 'Tour not found');
    }

    demoTours.splice(tourIndex, 1);

    return res.status(200).json(
      new ApiResponse(200, null, 'Tour deleted successfully')
    );
  }

  const tour = await Tour.findByIdAndDelete(id);

  if (!tour) {
    throw new ApiError(404, 'Tour not found');
  }

  res.status(200).json(
    new ApiResponse(200, null, 'Tour deleted successfully')
  );
});

// @desc    Get featured tours
// @route   GET /api/tours/featured
// @access  Public
exports.getFeaturedTours = asyncHandler(async (req, res) => {
  // MongoDB ulanmagan bo'lsa demo data
  if (mongoose.connection.readyState !== 1) {
    const featured = demoTours.filter(t => t.isFeatured);
    return res.status(200).json(
      new ApiResponse(200, { tours: featured, count: featured.length, mode: 'DEMO' }, 'Featured tours retrieved successfully')
    );
  }

  const tours = await Tour.find({ isFeatured: true, isActive: true }).limit(6);

  res.status(200).json(
    new ApiResponse(200, { tours, count: tours.length }, 'Featured tours retrieved successfully')
  );
});

// @desc    Get tour statistics
// @route   GET /api/tours/stats
// @access  Public
exports.getTourStats = asyncHandler(async (req, res) => {
  // MongoDB ulanmagan bo'lsa demo stats
  if (mongoose.connection.readyState !== 1) {
    const stats = {
      totalTours: demoTours.length,
      avgPrice: Math.round(demoTours.reduce((sum, t) => sum + t.price, 0) / demoTours.length),
      avgRating: Math.round(demoTours.reduce((sum, t) => sum + t.rating, 0) / demoTours.length * 10) / 10,
      categories: {
        cultural: demoTours.filter(t => t.category === 'cultural').length,
        adventure: demoTours.filter(t => t.category === 'adventure').length,
        nature: demoTours.filter(t => t.category === 'nature').length
      },
      mode: 'DEMO'
    };

    return res.status(200).json(
      new ApiResponse(200, stats, 'Tour statistics retrieved successfully')
    );
  }

  const stats = await Tour.aggregate([
    {
      $group: {
        _id: null,
        totalTours: { $sum: 1 },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
        avgRating: { $avg: '$rating' },
        avgDuration: { $avg: '$duration' }
      }
    }
  ]);

  const categoryStats = await Tour.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        avgPrice: { $avg: '$price' }
      }
    }
  ]);

  res.status(200).json(
    new ApiResponse(200, {
      general: stats[0] || {},
      categories: categoryStats
    }, 'Tour statistics retrieved successfully')
  );
});
