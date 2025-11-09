const { body, validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

/**
 * Validatsiya xatolarini tekshirish
 */
exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return next(new ApiError(400, errorMessages.join(', ')));
  }

  next();
};

/**
 * Register validatsiyasi
 */
exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Ism kiritilishi shart')
    .isLength({ min: 3 })
    .withMessage('Ism kamida 3 ta belgidan iborat bo\'lishi kerak')
    .isLength({ max: 50 })
    .withMessage('Ism 50 ta belgidan oshmasligi kerak'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email kiritilishi shart')
    .isEmail()
    .withMessage('To\'g\'ri email kiriting')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Telefon raqam kiritilishi shart')
    .matches(/^[\+]?[0-9]{10,15}$/)
    .withMessage('To\'g\'ri telefon raqam kiriting'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Parol kiritilishi shart')
    .isLength({ min: 6 })
    .withMessage('Parol kamida 6 ta belgidan iborat bo\'lishi kerak')
];

/**
 * Login validatsiyasi
 */
exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email kiritilishi shart')
    .isEmail()
    .withMessage('To\'g\'ri email kiriting')
    .normalizeEmail(),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Parol kiritilishi shart')
];

/**
 * Parol yangilash validatsiyasi
 */
exports.updatePasswordValidation = [
  body('currentPassword')
    .trim()
    .notEmpty()
    .withMessage('Joriy parol kiritilishi shart'),

  body('newPassword')
    .trim()
    .notEmpty()
    .withMessage('Yangi parol kiritilishi shart')
    .isLength({ min: 6 })
    .withMessage('Yangi parol kamida 6 ta belgidan iborat bo\'lishi kerak')
];

/**
 * Profil yangilash validatsiyasi
 */
exports.updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Ism kamida 3 ta belgidan iborat bo\'lishi kerak')
    .isLength({ max: 50 })
    .withMessage('Ism 50 ta belgidan oshmasligi kerak'),

  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[0-9]{10,15}$/)
    .withMessage('To\'g\'ri telefon raqam kiriting')
];

/**
 * Tour validatsiyasi
 */
exports.validateTour = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Tour nomi kiritilishi shart')
    .isLength({ min: 3 })
    .withMessage('Tour nomi kamida 3 ta belgidan iborat bo\'lishi kerak')
    .isLength({ max: 100 })
    .withMessage('Tour nomi 100 ta belgidan oshmasligi kerak'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Tour tavsifi kiritilishi shart')
    .isLength({ min: 10 })
    .withMessage('Tavsif kamida 10 ta belgidan iborat bo\'lishi kerak'),

  body('destination')
    .trim()
    .notEmpty()
    .withMessage('Manzil kiritilishi shart'),

  body('price')
    .notEmpty()
    .withMessage('Narx kiritilishi shart')
    .isNumeric()
    .withMessage('Narx raqam bo\'lishi kerak')
    .custom((value) => value >= 0)
    .withMessage('Narx 0 dan kichik bo\'lishi mumkin emas'),

  body('duration')
    .notEmpty()
    .withMessage('Davomiyligi kiritilishi shart')
    .isInt({ min: 1 })
    .withMessage('Davomiyligi kamida 1 kun bo\'lishi kerak'),

  body('maxGroupSize')
    .notEmpty()
    .withMessage('Maksimal guruh hajmi kiritilishi shart')
    .isInt({ min: 1, max: 50 })
    .withMessage('Guruh hajmi 1 dan 50 gacha bo\'lishi kerak'),

  body('difficulty')
    .optional()
    .isIn(['easy', 'moderate', 'challenging'])
    .withMessage('Qiyinlik darajasi: easy, moderate yoki challenging bo\'lishi kerak'),

  body('category')
    .notEmpty()
    .withMessage('Kategoriya kiritilishi shart')
    .isIn(['cultural', 'adventure', 'hiking', 'day-trip'])
    .withMessage('Kategoriya: cultural, adventure, hiking yoki day-trip bo\'lishi kerak'),

  body('included')
    .optional()
    .isArray()
    .withMessage('Included array bo\'lishi kerak'),

  body('excluded')
    .optional()
    .isArray()
    .withMessage('Excluded array bo\'lishi kerak'),

  this.validate
];
