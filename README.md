# 🌍 Travel Bliss Backend API

Travel Agency Management System - Backend API

## 📋 Features

- User Authentication & Authorization
- Tour Package Management
- Hotel Booking System
- Flight Booking
- Visa Services
- Payment Integration (Payme, Click, Uzum Bank)
- Admin Dashboard
- Reviews & Ratings
- Email & SMS Notifications

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer
- **Validation:** Express Validator
- **Email:** Nodemailer
- **Payment Gateways:** Payme, Click, Uzum Bank

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd travel-bliss-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env file with your configuration
```

4. **Start MongoDB**
```bash
# Make sure MongoDB is running on your system
# OR use MongoDB Atlas (cloud)
```

5. **Run the application**

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 🌐 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /
GET /api/health
```

### Authentication (Coming Soon)
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh-token
```

### Tours (Coming Soon)
```
GET    /api/tours
GET    /api/tours/:id
POST   /api/tours
PUT    /api/tours/:id
DELETE /api/tours/:id
```

### Hotels (Coming Soon)
```
GET    /api/hotels
GET    /api/hotels/:id
POST   /api/hotels
PUT    /api/hotels/:id
DELETE /api/hotels/:id
```

### Bookings (Coming Soon)
```
GET    /api/bookings
POST   /api/bookings
GET    /api/bookings/:id
PUT    /api/bookings/:id
```

## 📁 Project Structure

```
travel-bliss-backend/
├── src/
│   ├── config/          # Configuration files
│   │   └── database.js
│   ├── controllers/     # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middlewares/     # Custom middlewares
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   └── asyncHandler.js
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── uploads/             # Uploaded files
├── .env                 # Environment variables
├── .env.example         # Environment variables example
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Environment Variables

See `.env.example` for all required environment variables.

## 🚀 Development

```bash
# Install dependencies
npm install

# Run in development mode (with auto-reload)
npm run dev

# Run in production mode
npm start
```

## 📝 API Documentation

API documentation will be available at:
```
http://localhost:5000/api/docs
```

## 🧪 Testing

```bash
npm test
```

## 📄 License

ISC

## 👥 Authors

Travel Bliss Team

## 📞 Support

For support, email support@travelbliss.uz
