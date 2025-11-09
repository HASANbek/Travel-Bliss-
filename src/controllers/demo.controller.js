const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

/**
 * Demo foydalanuvchilar (MongoDB siz test uchun)
 */
let demoUsers = [
  {
    id: '1',
    name: 'Javohir Akbarov',
    email: 'javohir@example.com',
    phone: '+998901234567',
    role: 'user',
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Dilshod Karimov',
    email: 'dilshod@example.com',
    phone: '+998901234568',
    role: 'admin',
    createdAt: new Date()
  }
];

/**
 * @desc    Barcha demo foydalanuvchilarni olish
 * @route   GET /api/demo/users
 * @access  Public
 */
exports.getAllUsers = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, { users: demoUsers, count: demoUsers.length }, 'Demo foydalanuvchilar ro\'yxati')
  );
});

/**
 * @desc    Demo foydalanuvchi yaratish
 * @route   POST /api/demo/users
 * @access  Public
 */
exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  const newUser = {
    id: String(demoUsers.length + 1),
    name,
    email,
    phone,
    role: 'user',
    createdAt: new Date()
  };

  demoUsers.push(newUser);

  res.status(201).json(
    new ApiResponse(201, { user: newUser }, 'Demo foydalanuvchi yaratildi')
  );
});

/**
 * @desc    Demo foydalanuvchini o'chirish
 * @route   DELETE /api/demo/users/:id
 * @access  Public
 */
exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const index = demoUsers.findIndex(user => user.id === id);

  if (index === -1) {
    return res.status(404).json(
      new ApiResponse(404, null, 'Foydalanuvchi topilmadi')
    );
  }

  const deletedUser = demoUsers.splice(index, 1);

  res.status(200).json(
    new ApiResponse(200, { user: deletedUser[0] }, 'Foydalanuvchi o\'chirildi')
  );
});

/**
 * @desc    Backend va Database holati
 * @route   GET /api/demo/status
 * @access  Public
 */
exports.getStatus = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, {
      backend: 'ishlayapti ✅',
      database: 'MongoDB ulanmagan (Demo mode)',
      mode: 'DEMO MODE',
      endpoints: {
        users: '/api/demo/users',
        status: '/api/demo/status',
        auth: '/api/auth/*'
      },
      message: 'MongoDB ulanishi uchun .env faylga MONGODB_URI qo\'shing'
    }, 'Backend holati')
  );
});
