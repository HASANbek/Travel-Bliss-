const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const pagesStorage = require('../storage/pages.storage');

/**
 * @desc    Get all pages
 * @route   GET /api/pages
 * @access  Public
 */
exports.getAllPages = asyncHandler(async (req, res) => {
  const pages = await pagesStorage.findAll();

  res.status(200).json(
    new ApiResponse(200, pages, 'Barcha sahifalar')
  );
});

/**
 * @desc    Get About page
 * @route   GET /api/pages/about
 * @access  Public
 */
exports.getAboutPage = asyncHandler(async (req, res) => {
  const about = await pagesStorage.findById('about');

  if (!about) {
    return res.status(404).json(
      new ApiResponse(404, null, 'Sahifa topilmadi')
    );
  }

  res.status(200).json(
    new ApiResponse(200, about, 'About sahifasi')
  );
});

/**
 * @desc    Update About page
 * @route   PUT /api/pages/about
 * @access  Private/Admin
 */
exports.updateAboutPage = asyncHandler(async (req, res) => {
  const updated = await pagesStorage.updateAbout(req.body);

  res.status(200).json(
    new ApiResponse(200, updated, 'About sahifasi yangilandi')
  );
});

/**
 * @desc    Get Contact page
 * @route   GET /api/pages/contact
 * @access  Public
 */
exports.getContactPage = asyncHandler(async (req, res) => {
  const contact = await pagesStorage.findById('contact');

  if (!contact) {
    return res.status(404).json(
      new ApiResponse(404, null, 'Sahifa topilmadi')
    );
  }

  res.status(200).json(
    new ApiResponse(200, contact, 'Contact sahifasi')
  );
});

/**
 * @desc    Update Contact page
 * @route   PUT /api/pages/contact
 * @access  Private/Admin
 */
exports.updateContactPage = asyncHandler(async (req, res) => {
  const updated = await pagesStorage.updateContact(req.body);

  res.status(200).json(
    new ApiResponse(200, updated, 'Contact sahifasi yangilandi')
  );
});

/**
 * @desc    Get FAQ page
 * @route   GET /api/pages/faq
 * @access  Public
 */
exports.getFaqPage = asyncHandler(async (req, res) => {
  const faq = await pagesStorage.findById('faq');

  if (!faq) {
    return res.status(404).json(
      new ApiResponse(404, null, 'Sahifa topilmadi')
    );
  }

  res.status(200).json(
    new ApiResponse(200, faq, 'FAQ sahifasi')
  );
});

/**
 * @desc    Update FAQ page
 * @route   PUT /api/pages/faq
 * @access  Private/Admin
 */
exports.updateFaqPage = asyncHandler(async (req, res) => {
  const updated = await pagesStorage.updateFaq(req.body);

  res.status(200).json(
    new ApiResponse(200, updated, 'FAQ sahifasi yangilandi')
  );
});

/**
 * @desc    Get Visa page
 * @route   GET /api/pages/visa
 * @access  Public
 */
exports.getVisaPage = asyncHandler(async (req, res) => {
  const visa = await pagesStorage.findById('visa');

  if (!visa) {
    return res.status(404).json(
      new ApiResponse(404, null, 'Sahifa topilmadi')
    );
  }

  res.status(200).json(
    new ApiResponse(200, visa, 'Visa sahifasi')
  );
});

/**
 * @desc    Update Visa page
 * @route   PUT /api/pages/visa
 * @access  Private/Admin
 */
exports.updateVisaPage = asyncHandler(async (req, res) => {
  const updated = await pagesStorage.updateVisa(req.body);

  res.status(200).json(
    new ApiResponse(200, updated, 'Visa sahifasi yangilandi')
  );
});

/**
 * @desc    Add team member to About
 * @route   POST /api/pages/about/team
 * @access  Private/Admin
 */
exports.addTeamMember = asyncHandler(async (req, res) => {
  const { name, position, positionUz, image, social } = req.body;

  if (!name || !position) {
    return res.status(400).json(
      new ApiResponse(400, null, 'Ism va lavozim kiritilishi shart')
    );
  }

  const updated = await pagesStorage.addTeamMember({
    name,
    position,
    positionUz: positionUz || '',
    image: image || '',
    social: social || {}
  });

  res.status(201).json(
    new ApiResponse(201, updated, 'Jamoa a\'zosi qo\'shildi')
  );
});

/**
 * @desc    Remove team member
 * @route   DELETE /api/pages/about/team/:id
 * @access  Private/Admin
 */
exports.removeTeamMember = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updated = await pagesStorage.removeTeamMember(id);

  if (!updated) {
    return res.status(404).json(
      new ApiResponse(404, null, 'Jamoa a\'zosi topilmadi')
    );
  }

  res.status(200).json(
    new ApiResponse(200, updated, 'Jamoa a\'zosi o\'chirildi')
  );
});
