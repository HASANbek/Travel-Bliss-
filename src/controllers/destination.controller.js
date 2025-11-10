const Destination = require('../models/Destination.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
exports.getAllDestinations = asyncHandler(async (req, res) => {
  const { isActive } = req.query;

  const filter = {};
  if (isActive !== undefined) {
    filter.isActive = isActive === 'true';
  }

  const destinations = await Destination.find(filter).sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, { destinations, count: destinations.length }, 'Destinations retrieved successfully')
  );
});

// @desc    Get single destination by ID or slug
// @route   GET /api/destinations/:identifier
// @access  Public
exports.getDestination = asyncHandler(async (req, res) => {
  const { identifier } = req.params;

  let destination;

  // Check if identifier is a valid MongoDB ObjectId
  if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
    destination = await Destination.findById(identifier);
  } else {
    // Otherwise, treat it as a slug
    destination = await Destination.findOne({ slug: identifier });
  }

  if (!destination) {
    throw new ApiError(404, 'Destination not found');
  }

  res.status(200).json(
    new ApiResponse(200, { destination }, 'Destination retrieved successfully')
  );
});

// @desc    Create new destination
// @route   POST /api/destinations
// @access  Private/Admin
exports.createDestination = asyncHandler(async (req, res) => {
  const destinationData = {
    name: req.body.name,
    tagline: req.body.tagline,
    description: req.body.description,
    country: req.body.country,
    capital: req.body.capital,
    currency: req.body.currency,
    language: req.body.language,
    heroImage: req.body.heroImage || 'default-destination.jpg',
    popularPlaces: req.body.popularPlaces || [],
    features: req.body.features || [],
    seasons: req.body.seasons || [],
    faq: req.body.faq || [],
    isActive: req.body.isActive !== undefined ? req.body.isActive : true,
    isFeatured: req.body.isFeatured || false
  };

  const destination = await Destination.create(destinationData);

  res.status(201).json(
    new ApiResponse(201, { destination }, 'Destination created successfully')
  );
});

// @desc    Update destination
// @route   PUT /api/destinations/:id
// @access  Private/Admin
exports.updateDestination = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updateData = {};

  if (req.body.name !== undefined) updateData.name = req.body.name;
  if (req.body.tagline !== undefined) updateData.tagline = req.body.tagline;
  if (req.body.description !== undefined) updateData.description = req.body.description;
  if (req.body.country !== undefined) updateData.country = req.body.country;
  if (req.body.capital !== undefined) updateData.capital = req.body.capital;
  if (req.body.currency !== undefined) updateData.currency = req.body.currency;
  if (req.body.language !== undefined) updateData.language = req.body.language;
  if (req.body.heroImage !== undefined) updateData.heroImage = req.body.heroImage;
  if (req.body.popularPlaces !== undefined) updateData.popularPlaces = req.body.popularPlaces;
  if (req.body.features !== undefined) updateData.features = req.body.features;
  if (req.body.seasons !== undefined) updateData.seasons = req.body.seasons;
  if (req.body.faq !== undefined) updateData.faq = req.body.faq;
  if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;
  if (req.body.isFeatured !== undefined) updateData.isFeatured = req.body.isFeatured;

  const destination = await Destination.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });

  if (!destination) {
    throw new ApiError(404, 'Destination not found');
  }

  res.status(200).json(
    new ApiResponse(200, { destination }, 'Destination updated successfully')
  );
});

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
// @access  Private/Admin
exports.deleteDestination = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const destination = await Destination.findByIdAndDelete(id);

  if (!destination) {
    throw new ApiError(404, 'Destination not found');
  }

  res.status(200).json(
    new ApiResponse(200, { destination }, 'Destination deleted successfully')
  );
});
