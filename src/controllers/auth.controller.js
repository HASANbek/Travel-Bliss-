const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const {
  generateAccessToken,
  generateRefreshToken,
  sendTokenResponse
} = require('../utils/generateToken');

/**
 * @desc    Ro'yxatdan o'tish (Register)
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  // 1. Email allaqachon mavjudligini tekshirish
  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    return next(new ApiError(400, 'Bu email allaqachon ro\'yxatdan o\'tgan'));
  }

  // 2. Telefon raqam allaqachon mavjudligini tekshirish
  const existingUserByPhone = await User.findOne({ phone });
  if (existingUserByPhone) {
    return next(new ApiError(400, 'Bu telefon raqam allaqachon ro\'yxatdan o\'tgan'));
  }

  // 3. Yangi foydalanuvchi yaratish
  const user = await User.create({
    name,
    email,
    phone,
    password
  });

  // 4. Tokenlar yaratish
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // 5. Token bilan response qaytarish
  sendTokenResponse(res, 201, user, accessToken, refreshToken);
});

/**
 * @desc    Tizimga kirish (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Email va parol kiritilganligini tekshirish
  if (!email || !password) {
    return next(new ApiError(400, 'Email va parolni kiriting'));
  }

  // 2. Foydalanuvchini topish (parol bilan)
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ApiError(401, 'Email yoki parol noto\'g\'ri'));
  }

  // 3. Parolni tekshirish
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(new ApiError(401, 'Email yoki parol noto\'g\'ri'));
  }

  // 4. Akkaunt aktiv ekanligini tekshirish
  if (!user.isActive) {
    return next(new ApiError(403, 'Akkauntingiz bloklangan. Iltimos admin bilan bog\'laning'));
  }

  // 5. Oxirgi kirish vaqtini yangilash
  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  // 6. Tokenlar yaratish
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // 7. Token bilan response qaytarish
  sendTokenResponse(res, 200, user, accessToken, refreshToken);
});

/**
 * @desc    Tizimdan chiqish (Logout)
 * @route   POST /api/auth/logout
 * @access  Private
 */
exports.logout = asyncHandler(async (req, res, next) => {
  // Cookielarni o'chirish
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 1000),
    httpOnly: true
  });

  res.cookie('refreshToken', 'none', {
    expires: new Date(Date.now() + 1000),
    httpOnly: true
  });

  res.status(200).json(
    new ApiResponse(200, null, 'Tizimdan muvaffaqiyatli chiqdingiz')
  );
});

/**
 * @desc    Joriy foydalanuvchi ma'lumotlarini olish
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  // req.user middleware orqali qo'shilgan
  const user = await User.findById(req.user.id);

  res.status(200).json(
    new ApiResponse(200, { user }, 'Foydalanuvchi ma\'lumotlari')
  );
});

/**
 * @desc    Parolni yangilash
 * @route   PUT /api/auth/update-password
 * @access  Private
 */
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  // Validatsiya
  if (!currentPassword || !newPassword) {
    return next(new ApiError(400, 'Eski va yangi parolni kiriting'));
  }

  // Foydalanuvchini topish
  const user = await User.findById(req.user.id).select('+password');

  // Joriy parolni tekshirish
  const isPasswordCorrect = await user.comparePassword(currentPassword);

  if (!isPasswordCorrect) {
    return next(new ApiError(401, 'Joriy parol noto\'g\'ri'));
  }

  // Yangi parolni o'rnatish
  user.password = newPassword;
  await user.save();

  // Yangi tokenlar yaratish
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  sendTokenResponse(res, 200, user, accessToken, refreshToken);
});

/**
 * @desc    Profil ma'lumotlarini yangilash
 * @route   PUT /api/auth/update-profile
 * @access  Private
 */
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { name, phone } = req.body;

  const fieldsToUpdate = {};
  if (name) fieldsToUpdate.name = name;
  if (phone) fieldsToUpdate.phone = phone;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json(
    new ApiResponse(200, { user }, 'Profil muvaffaqiyatli yangilandi')
  );
});
