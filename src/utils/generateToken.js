const jwt = require('jsonwebtoken');

/**
 * JWT Access Token yaratish
 * @param {String} userId - Foydalanuvchi ID
 * @returns {String} - JWT token
 */
const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    }
  );
};

/**
 * JWT Refresh Token yaratish
 * @param {String} userId - Foydalanuvchi ID
 * @returns {String} - Refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d'
    }
  );
};

/**
 * Token va Cookieni response ga qo'shish
 * @param {Object} res - Express response
 * @param {String} token - JWT token
 * @param {String} refreshToken - Refresh token
 */
const sendTokenResponse = (res, statusCode, user, token, refreshToken) => {
  // Cookie options
  const cookieOptions = {
    httpOnly: true, // XSS hujumlaridan himoya
    secure: process.env.NODE_ENV === 'production', // HTTPS da
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 kun
  };

  const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 kun
  };

  // Cookie ga token yozish
  res.cookie('token', token, cookieOptions);
  res.cookie('refreshToken', refreshToken, refreshCookieOptions);

  // Response qaytarish
  res.status(statusCode).json({
    success: true,
    message: 'Muvaffaqiyatli!',
    data: {
      user,
      token,
      refreshToken
    }
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  sendTokenResponse
};
