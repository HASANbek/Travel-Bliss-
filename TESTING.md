# 🧪 Travel Bliss Backend - Test Qo'llanma

## ✅ Server Holati

Server hozir **DEMO MODE** da ishlayapti:
- ✅ Server ishga tushgan
- ✅ API endpoints javob bermoqda
- ⚠️ MongoDB ulanmagan (demo data bilan ishlaydi)

## 🚀 Serverni Ishga Tushirish

```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

Server manzili: **http://localhost:5000**

---

## 📡 Test Qilish Usullari

### 1️⃣ **Windows Batch Script** (Eng oson)

```bash
test-api.bat
```

Bu script avtomatik ravishda asosiy endpointlarni test qiladi.

---

### 2️⃣ **REST Client (VSCode)**

1. VSCode da **REST Client** extension o'rnating
2. `api-tests.http` faylni oching
3. Har bir requestda **"Send Request"** tugmasini bosing

**Afzalliklari:**
- VSCode ichida ishlaydi
- Natijalarni shu yerda ko'rish mumkin
- Token avtomatik saqlanadi

---

### 3️⃣ **Postman**

1. Postman dasturini oching
2. **Import** → **File** → `Travel-Bliss-API.postman_collection.json`
3. Collection yuklandi ✅

**Qulayliklar:**
- Professional test tool
- Requestlarni saqlaydi
- Token avtomatik yangilanadi (Login dan keyin)
- Environment variables

---

### 4️⃣ **cURL (Command Line)**

#### Server Health
```bash
curl http://localhost:5000/api/health
```

#### Backend Status
```bash
curl http://localhost:5000/api/demo/status
```

#### Demo Users
```bash
curl http://localhost:5000/api/demo/users
```

#### Create Demo User
```bash
curl -X POST http://localhost:5000/api/demo/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"phone\":\"+998901234569\"}"
```

---

## 📊 Mavjud Endpointlar

### ✅ Demo Mode (MongoDB kerak emas)

| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/health` | Server holati |
| GET | `/` | Root endpoint |
| GET | `/api/demo/status` | Backend ma'lumotlari |
| GET | `/api/demo/users` | Demo foydalanuvchilar |
| POST | `/api/demo/users` | Demo user yaratish |
| DELETE | `/api/demo/users/:id` | Demo user o'chirish |

### ⚠️ Auth Endpoints (MongoDB kerak)

| Method | Endpoint | Tavsif |
|--------|----------|--------|
| POST | `/api/auth/register` | Ro'yxatdan o'tish |
| POST | `/api/auth/login` | Kirish |
| POST | `/api/auth/logout` | Chiqish (protected) |
| GET | `/api/auth/me` | Profil (protected) |
| PUT | `/api/auth/update-password` | Parol o'zgartirish (protected) |
| PUT | `/api/auth/update-profile` | Profil yangilash (protected) |

---

## 🧪 Test Scenariyalari

### Scenario 1: Demo Users Test

1. **Get all demo users**
```bash
curl http://localhost:5000/api/demo/users
```

**Natija:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Demo foydalanuvchilar ro'yxati",
  "data": {
    "users": [
      {
        "id": "1",
        "name": "Javohir Akbarov",
        "email": "javohir@example.com",
        "phone": "+998901234567",
        "role": "user"
      },
      {
        "id": "2",
        "name": "Dilshod Karimov",
        "email": "dilshod@example.com",
        "phone": "+998901234568",
        "role": "admin"
      }
    ],
    "count": 2
  }
}
```

2. **Create new demo user**
```bash
curl -X POST http://localhost:5000/api/demo/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Aziz\",\"email\":\"aziz@test.com\",\"phone\":\"+998901111111\"}"
```

3. **Delete demo user**
```bash
curl -X DELETE http://localhost:5000/api/demo/users/1
```

---

### Scenario 2: Authentication Test (MongoDB kerak)

**1. Register yangi user**
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Ali\",\"email\":\"ali@test.com\",\"phone\":\"+998901234567\",\"password\":\"password123\"}"
```

**2. Login qilish**
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"ali@test.com\",\"password\":\"password123\"}"
```

**Natija:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "name": "Ali",
      "email": "ali@test.com"
    }
  }
}
```

**3. Token bilan profile olish**
```bash
curl http://localhost:5000/api/auth/me ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔍 Muammolarni Hal Qilish

### ❌ "Server not responding"
```bash
# Serverni qayta ishga tushiring
npm run dev
```

### ❌ "Port 5000 already in use"
```bash
# Port band bo'lsa, processni to'xtating
netstat -ano | findstr :5000
# Keyin .env da PORT ni o'zgartiring
PORT=5001
```

### ❌ "MongoDB connection error"
```
Bu normal - Demo mode da ishlayapti!
Auth endpoints ishlashi uchun MongoDB sozlang.
```

---

## 📈 Keyingi Qadamlar

1. ✅ Demo endpoints test qilish - **TAYYOR**
2. ⏳ MongoDB Atlas sozlash
3. ⏳ Auth endpoints test qilish
4. ⏳ Frontend bilan birlashtirish

---

## 💡 Maslahatlar

- **Postman** - Professional test uchun eng yaxshi
- **REST Client** - VSCode da tezkor test uchun
- **cURL** - Terminal orqali test uchun
- **test-api.bat** - Barcha asosiy testlarni bir marta ishga tushirish

---

## 📞 Yordam

Muammo bo'lsa:
1. Serverni qayta ishga tushiring (`npm run dev`)
2. Port bandligini tekshiring
3. `.env` faylni tekshiring
4. Log larni o'qing (consoleda)

**Server ishlayapti:** ✅
**Demo mode:** ✅
**Test uchun tayyor:** ✅
