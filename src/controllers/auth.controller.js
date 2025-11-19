const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const {
  generateAccessToken,
  generateRefreshToken,
  sendTokenResponse
} = require('../utils/generateToken');
const FileStorage = require('../utils/fileStorage');
// const { sendOTPSMS } = require('../utils/sendSMS'); // Will be enabled later for real SMS
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Initialize file storage for users
const usersStorage = new FileStorage('users.json');

/**
 * @desc    Ro'yxatdan o'tish (Register)
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, phone, password, role, isActive } = req.body;

  // Check if MongoDB is connected
  if (mongoose.connection.readyState !== 1) {
    // Use file storage
    const users = await usersStorage.findAll();

    // 1. Email allaqachon mavjudligini tekshirish
    const existingUserByEmail = users.find(u => u.email === email);
    if (existingUserByEmail) {
      return next(new ApiError(400, 'Bu email allaqachon ro\'yxatdan o\'tgan'));
    }

    // 2. Telefon raqam allaqachon mavjudligini tekshirish
    const existingUserByPhone = users.find(u => u.phone === phone);
    if (existingUserByPhone) {
      return next(new ApiError(400, 'Bu telefon raqam allaqachon ro\'yxatdan o\'tgan'));
    }

    // 3. Parolni hash qilish
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Yangi foydalanuvchi yaratish
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || 'user',
      avatar: 'default-avatar.png',
      isEmailVerified: false,
      isPhoneVerified: false,
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await usersStorage.create(newUser);

    // 5. Tokenlar yaratish
    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    // 6. Parolni response'dan olib tashlash
    const userResponse = { ...newUser };
    delete userResponse.password;

    // 7. Token bilan response qaytarish
    sendTokenResponse(res, 201, userResponse, accessToken, refreshToken);
  } else {
    // Use MongoDB
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
      password,
      role: role || 'user',
      isActive: isActive !== undefined ? isActive : true
    });

    // 4. Tokenlar yaratish
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // 5. Token bilan response qaytarish
    sendTokenResponse(res, 201, user, accessToken, refreshToken);
  }
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

  // Check if MongoDB is connected
  if (mongoose.connection.readyState !== 1) {
    // Use file storage
    const users = await usersStorage.findAll();
    const user = users.find(u => u.email === email);

    if (!user) {
      return next(new ApiError(401, 'Email yoki parol noto\'g\'ri'));
    }

    // 3. Parolni tekshirish
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return next(new ApiError(401, 'Email yoki parol noto\'g\'ri'));
    }

    // 4. Akkaunt aktiv ekanligini tekshirish
    if (!user.isActive) {
      return next(new ApiError(403, 'Akkauntingiz bloklangan. Iltimos admin bilan bog\'laning'));
    }

    // 5. Oxirgi kirish vaqtini yangilash
    user.lastLogin = new Date();
    await usersStorage.update(user.id, { lastLogin: user.lastLogin });

    // 6. Tokenlar yaratish
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // 7. Parolni response'dan olib tashlash
    const userResponse = { ...user };
    delete userResponse.password;

    // 8. Token bilan response qaytarish
    sendTokenResponse(res, 200, userResponse, accessToken, refreshToken);
  } else {
    // Use MongoDB
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
  }
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

/**
 * @desc    Parolni tiklash uchun OTP yuborish (Email yoki Telefon orqali)
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { emailOrPhone } = req.body;

  if (!emailOrPhone) {
    return next(new ApiError(400, 'Email yoki telefon raqamni kiriting'));
  }

  // Check if MongoDB is connected
  if (mongoose.connection.readyState !== 1) {
    // Use file storage
    const users = await usersStorage.findAll();

    // Email yoki telefon bo'yicha qidirish
    const user = users.find(
      u => u.email === emailOrPhone || u.phone === emailOrPhone
    );

    if (!user) {
      return next(new ApiError(404, 'Foydalanuvchi topilmadi'));
    }

    // 6 raqamli OTP kod generatsiya qilish
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 daqiqa

    // OTP ni foydalanuvchi ma'lumotlariga saqlash
    await usersStorage.update(user.id, {
      resetPasswordOTP: otp,
      resetPasswordOTPExpires: otpExpires
    });

    // Email yoki SMS orqali yuborish
    const isEmail = emailOrPhone.includes('@');

    if (isEmail) {
      // Email orqali yuborish (hozircha console'ga)
      console.log('\n📧 ===== EMAIL SENT =====');
      console.log(`To: ${user.email}`);
      console.log(`Subject: Parolni Tiklash - Travel Bliss`);
      console.log(`\nSalom ${user.name},\n`);
      console.log(`Parolni tiklash uchun quyidagi OTP kodni kiriting:\n`);
      console.log(`🔐 OTP KOD: ${otp}\n`);
      console.log(`Bu kod 10 daqiqa davomida amal qiladi.\n`);
      console.log(`Agar siz bu so'rovni yubormasangiz, bu xabarni e'tiborsiz qoldiring.\n`);
      console.log(`Travel Bliss jamoasi`);
      console.log('========================\n');

      res.status(200).json(
        new ApiResponse(
          200,
          {
            method: 'email',
            email: user.email,
            message: `OTP kod ${user.email} ga yuborildi`
          },
          'OTP kod emailga yuborildi. Iltimos emailingizni tekshiring.'
        )
      );
    } else {
      // SMS orqali yuborish (hozircha console'ga)
      // TODO: Enable real SMS sending with Eskiz.uz later
      // try {
      //   const smsResult = await sendOTPSMS(user.phone, otp, user.name);
      //   console.log('📱 SMS Result:', smsResult.mode, '-', smsResult.message);
      // } catch (err) {
      //   console.error('⚠️ SMS sending error:', err.message);
      // }

      console.log('\n📱 ===== SMS SENT (CONSOLE MODE) =====');
      console.log(`To: ${user.phone}`);
      console.log(`\nTravel Bliss - Parolni tiklash\n`);
      console.log(`🔐 OTP KOD: ${otp}\n`);
      console.log(`Bu kod 10 daqiqa amal qiladi.`);
      console.log('=====================================\n');

      res.status(200).json(
        new ApiResponse(
          200,
          {
            method: 'sms',
            phone: user.phone,
            message: `OTP kod ${user.phone} ga yuborildi`
          },
          'OTP kod telefon raqamingizga yuborildi.'
        )
      );
    }
  } else {
    // MongoDB version
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user) {
      return next(new ApiError(404, 'Foydalanuvchi topilmadi'));
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpires = otpExpires;
    await user.save({ validateBeforeSave: false });

    // Send via email or SMS
    const isEmail = emailOrPhone.includes('@');

    if (isEmail) {
      console.log('\n📧 ===== EMAIL SENT =====');
      console.log(`To: ${user.email}`);
      console.log(`🔐 OTP KOD: ${otp}`);
      console.log('========================\n');

      res.status(200).json(
        new ApiResponse(
          200,
          { method: 'email', email: user.email },
          'OTP kod emailga yuborildi'
        )
      );
    } else {
      // SMS orqali yuborish (hozircha console'ga)
      // TODO: Enable real SMS sending with Eskiz.uz later
      // try {
      //   const smsResult = await sendOTPSMS(user.phone, otp, user.name);
      //   console.log('📱 SMS Result:', smsResult.mode, '-', smsResult.message);
      // } catch (err) {
      //   console.error('⚠️ SMS sending error:', err.message);
      // }

      console.log('\n📱 ===== SMS SENT (CONSOLE MODE) =====');
      console.log(`To: ${user.phone}`);
      console.log(`🔐 OTP KOD: ${otp}`);
      console.log('=====================================\n');

      res.status(200).json(
        new ApiResponse(
          200,
          { method: 'sms', phone: user.phone },
          'OTP kod telefon raqamingizga yuborildi'
        )
      );
    }
  }
});

/**
 * @desc    OTP kodni tekshirish
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
exports.verifyOTP = asyncHandler(async (req, res, next) => {
  const { emailOrPhone, otp } = req.body;

  if (!emailOrPhone || !otp) {
    return next(new ApiError(400, 'Email/telefon va OTP kodni kiriting'));
  }

  // Check if MongoDB is connected
  if (mongoose.connection.readyState !== 1) {
    // Use file storage
    const users = await usersStorage.findAll();

    const user = users.find(
      u => (u.email === emailOrPhone || u.phone === emailOrPhone)
    );

    if (!user) {
      return next(new ApiError(404, 'Foydalanuvchi topilmadi'));
    }

    // OTP tekshirish
    if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp) {
      return next(new ApiError(400, 'OTP kod noto\'g\'ri'));
    }

    // OTP muddati o'tganligini tekshirish
    const otpExpires = new Date(user.resetPasswordOTPExpires);
    if (otpExpires < new Date()) {
      return next(new ApiError(400, 'OTP kod muddati o\'tgan. Qaytadan so\'rov yuboring.'));
    }

    res.status(200).json(
      new ApiResponse(200, { verified: true }, 'OTP kod to\'g\'ri. Yangi parol o\'rnating.')
    );
  } else {
    // MongoDB version
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user) {
      return next(new ApiError(404, 'Foydalanuvchi topilmadi'));
    }

    if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp) {
      return next(new ApiError(400, 'OTP kod noto\'g\'ri'));
    }

    if (user.resetPasswordOTPExpires < Date.now()) {
      return next(new ApiError(400, 'OTP kod muddati o\'tgan'));
    }

    res.status(200).json(
      new ApiResponse(200, { verified: true }, 'OTP kod to\'g\'ri')
    );
  }
});

/**
 * @desc    Yangi parol o'rnatish (OTP bilan)
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { emailOrPhone, otp, newPassword } = req.body;

  if (!emailOrPhone || !otp || !newPassword) {
    return next(new ApiError(400, 'Barcha maydonlarni to\'ldiring'));
  }

  if (newPassword.length < 6) {
    return next(new ApiError(400, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'));
  }

  // Check if MongoDB is connected
  if (mongoose.connection.readyState !== 1) {
    // Use file storage
    const users = await usersStorage.findAll();

    const user = users.find(
      u => (u.email === emailOrPhone || u.phone === emailOrPhone)
    );

    if (!user) {
      return next(new ApiError(404, 'Foydalanuvchi topilmadi'));
    }

    // OTP tekshirish
    if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp) {
      return next(new ApiError(400, 'OTP kod noto\'g\'ri'));
    }

    // OTP muddati tekshirish
    const otpExpires = new Date(user.resetPasswordOTPExpires);
    if (otpExpires < new Date()) {
      return next(new ApiError(400, 'OTP kod muddati o\'tgan'));
    }

    // Yangi parolni hash qilish
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Parolni yangilash va OTP ni o'chirish
    await usersStorage.update(user.id, {
      password: hashedPassword,
      resetPasswordOTP: null,
      resetPasswordOTPExpires: null,
      updatedAt: new Date()
    });

    res.status(200).json(
      new ApiResponse(200, null, 'Parol muvaffaqiyatli o\'zgartirildi. Endi login qilishingiz mumkin.')
    );
  } else {
    // MongoDB version
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    }).select('+resetPasswordOTP +resetPasswordOTPExpires');

    if (!user) {
      return next(new ApiError(404, 'Foydalanuvchi topilmadi'));
    }

    if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp) {
      return next(new ApiError(400, 'OTP kod noto\'g\'ri'));
    }

    if (user.resetPasswordOTPExpires < Date.now()) {
      return next(new ApiError(400, 'OTP kod muddati o\'tgan'));
    }

    // Set new password
    user.password = newPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;
    await user.save();

    res.status(200).json(
      new ApiResponse(200, null, 'Parol muvaffaqiyatli o\'zgartirildi')
    );
  }
});
