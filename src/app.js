const express = require('express');
const cors = require('cors');
const path = require('path');
const { cookieParser } = require('./middlewares/auth.middleware');

const app = express();

// ========== MIDDLEWARES ==========

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser);

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// ========== ROUTES ==========

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Travel Bliss API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      docs: '/api/docs',
      admin: '/api/admin/*'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Import routes
const demoRoutes = require('./routes/demo.routes');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const tourRoutes = require('./routes/tour.routes');

// Use routes
app.use('/api/demo', demoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tours', tourRoutes);

// Static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Static files (public - HTML pages) - OXIRIDA
app.use(express.static(path.join(__dirname, '../public')));

// ========== ERROR HANDLING ==========

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;
