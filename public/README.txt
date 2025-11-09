================================
TRAVEL BLISS BACKEND - WEB INTERFACE
================================

Server ishga tushganidan keyin, Chrome'da quyidagi manzillarni oching:

📱 ASOSIY SAHIFALAR:
-------------------

1. Asosiy Test Sahifa:
   http://localhost:5000/

   Ushbu sahifada:
   - Server holati
   - Demo foydalanuvchilar
   - API test qilish

2. Tour Management Sahifasi:
   http://localhost:5000/tours.html

   Ushbu sahifada:
   - Turlarni ko'rish
   - Yangi tur yaratish
   - Turlarni tahrirlash va o'chirish
   - Statistika

🔌 API ENDPOINTS:
-----------------

Health & Status:
- GET  http://localhost:5000/api/health
- GET  http://localhost:5000/api/demo/status

Demo Users:
- GET    http://localhost:5000/api/demo/users
- POST   http://localhost:5000/api/demo/users
- DELETE http://localhost:5000/api/demo/users/:id

Tours:
- GET    http://localhost:5000/api/tours
- GET    http://localhost:5000/api/tours/:id
- POST   http://localhost:5000/api/tours
- PUT    http://localhost:5000/api/tours/:id
- DELETE http://localhost:5000/api/tours/:id
- GET    http://localhost:5000/api/tours/featured
- GET    http://localhost:5000/api/tours/stats

Auth (MongoDB kerak):
- POST http://localhost:5000/api/auth/register
- POST http://localhost:5000/api/auth/login
- POST http://localhost:5000/api/auth/logout
- GET  http://localhost:5000/api/auth/me
- PUT  http://localhost:5000/api/auth/update-password
- PUT  http://localhost:5000/api/auth/update-profile

🚀 SERVERNI ISHGA TUSHIRISH:
---------------------------

Development mode:
  npm run dev

Production mode:
  npm start

📝 ESLATMA:
-----------
- Server default portda ishlaydi: 5000
- MongoDB ulanmagan - DEMO MODE
- Barcha HTML sahifalar backend ichida /public papkada
- Static files avtomatik serve qilinadi

================================
