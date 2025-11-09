const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema
 * Foydalanuvchi ma'lumotlarini saqlash uchun
 */
const userSchema = new mongoose.Schema(
  {
    // Ism
    name: {
      type: String,
      required: [true, 'Iltimos ismingizni kiriting'],
      trim: true,
      minlength: [3, 'Ism kamida 3 ta belgidan iborat bo\'lishi kerak'],
      maxlength: [50, 'Ism 50 ta belgidan oshmasligi kerak']
    },

    // Email
    email: {
      type: String,
      required: [true, 'Email kiriting'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Iltimos to\'g\'ri email kiriting'
      ]
    },

    // Telefon raqam
    phone: {
      type: String,
      required: [true, 'Telefon raqam kiriting'],
      unique: true,
      match: [
        /^[\+]?[0-9]{10,15}$/,
        'Iltimos to\'g\'ri telefon raqam kiriting'
      ]
    },

    // Parol (hash qilingan)
    password: {
      type: String,
      required: [true, 'Parol kiriting'],
      minlength: [6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'],
      select: false // Query da avtomatik qaytarilmaydi
    },

    // Avatar/Profil rasmi
    avatar: {
      type: String,
      default: 'default-avatar.png'
    },

    // Foydalanuvchi roli
    role: {
      type: String,
      enum: ['user', 'admin', 'agent'],
      default: 'user'
    },

    // Email tasdiqlangan mi?
    isEmailVerified: {
      type: Boolean,
      default: false
    },

    // Telefon tasdiqlangan mi?
    isPhoneVerified: {
      type: Boolean,
      default: false
    },

    // Akkaunt aktiv mi?
    isActive: {
      type: Boolean,
      default: true
    },

    // Password reset token
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // Email verification token
    emailVerificationToken: String,
    emailVerificationExpire: Date,

    // Oxirgi kirish vaqti
    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true // createdAt, updatedAt avtomatik qo'shiladi
  }
);

/**
 * MIDDLEWARE: Parolni hash qilish (save qilishdan oldin)
 */
userSchema.pre('save', async function(next) {
  // Agar parol o'zgarmagan bo'lsa, o'tkazib yuborish
  if (!this.isModified('password')) {
    return next();
  }

  // Parolni hash qilish
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * METHOD: Parolni tekshirish
 * @param {String} enteredPassword - Foydalanuvchi kiritgan parol
 * @returns {Boolean} - Parol to'g'ri yoki noto'g'ri
 */
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * METHOD: Foydalanuvchi obyektini JSON formatiga o'zgartirish
 * Parolni olib tashlash
 */
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpire;
  delete user.emailVerificationToken;
  delete user.emailVerificationExpire;
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
