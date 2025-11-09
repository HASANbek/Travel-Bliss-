# 🔐 Travel Bliss - Authentication API Documentation

## 📋 Kirish

Travel Bliss backend authentication tizimi JWT (JSON Web Tokens) asosida ishlaydi.

---

## 🌐 Base URL

```
http://localhost:5000/api/auth
```

---

## 📌 API Endpoints

### 1️⃣ Ro'yxatdan O'tish (Register)

**Endpoint:** `POST /api/auth/register`
**Access:** Public
**Description:** Yangi foydalanuvchi yaratish

**Request Body:**
```json
{
  "name": "Javohir Akbarov",
  "email": "javohir@example.com",
  "phone": "+998901234567",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Muvaffaqiyatli!",
  "data": {
    "user": {
      "_id": "65abc123...",
      "name": "Javohir Akbarov",
      "email": "javohir@example.com",
      "phone": "+998901234567",
      "role": "user",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Validatsiya xatolari
- `400` - Email yoki telefon allaqachon ro'yxatdan o'tgan

---

### 2️⃣ Tizimga Kirish (Login)

**Endpoint:** `POST /api/auth/login`
**Access:** Public
**Description:** Mavjud foydalanuvchi tizimga kirishi

**Request Body:**
```json
{
  "email": "javohir@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Muvaffaqiyatli!",
  "data": {
    "user": {
      "_id": "65abc123...",
      "name": "Javohir Akbarov",
      "email": "javohir@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Email yoki parol kiritilmagan
- `401` - Email yoki parol noto'g'ri
- `403` - Akkaunt bloklangan

---

### 3️⃣ Tizimdan Chiqish (Logout)

**Endpoint:** `POST /api/auth/logout`
**Access:** Private (Token kerak)
**Description:** Foydalanuvchi tizimdan chiqishi

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Tizimdan muvaffaqiyatli chiqdingiz",
  "data": null
}
```

---

### 4️⃣ Joriy Foydalanuvchi Ma'lumotlari (Get Me)

**Endpoint:** `GET /api/auth/me`
**Access:** Private (Token kerak)
**Description:** Joriy foydalanuvchi haqida ma'lumot olish

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Foydalanuvchi ma'lumotlari",
  "data": {
    "user": {
      "_id": "65abc123...",
      "name": "Javohir Akbarov",
      "email": "javohir@example.com",
      "phone": "+998901234567",
      "role": "user",
      "avatar": "default-avatar.png",
      "isActive": true,
      "lastLogin": "2024-01-01T10:30:00.000Z"
    }
  }
}
```

---

### 5️⃣ Parolni Yangilash (Update Password)

**Endpoint:** `PUT /api/auth/update-password`
**Access:** Private (Token kerak)
**Description:** Foydalanuvchi parolini yangilash

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "password123",
  "newPassword": "newpassword456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Muvaffaqiyatli!",
  "data": {
    "user": {...},
    "token": "new_token...",
    "refreshToken": "new_refresh_token..."
  }
}
```

**Error Responses:**
- `400` - Eski va yangi parol kiritilmagan
- `401` - Joriy parol noto'g'ri

---

### 6️⃣ Profil Yangilash (Update Profile)

**Endpoint:** `PUT /api/auth/update-profile`
**Access:** Private (Token kerak)
**Description:** Foydalanuvchi profil ma'lumotlarini yangilash

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Yangi Ism",
  "phone": "+998901234567"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Profil muvaffaqiyatli yangilandi",
  "data": {
    "user": {
      "name": "Yangi Ism",
      "phone": "+998901234567",
      ...
    }
  }
}
```

---

## 🔑 Authorization

Himoyalangan endpointlarga murojaat qilish uchun JWT tokenni yuborish kerak:

### 1. Header orqali (Tavsiya qilinadi):
```
Authorization: Bearer <your_jwt_token>
```

### 2. Cookie orqali:
```
Cookie: token=<your_jwt_token>
```

---

## 🧪 Test Qilish (Postman/Insomnia)

### 1. Register Test:

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "+998901234567",
  "password": "test123"
}
```

### 2. Login Test:

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123"
}
```

### 3. Get Me Test:

```bash
GET http://localhost:5000/api/auth/me
Authorization: Bearer <token_from_login>
```

---

## 🧪 cURL orqali test qilish

### Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+998901234567",
    "password": "test123"
  }'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Get Me:
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ⚠️ Xavfsizlik

1. **Token Xavfsizligi:**
   - Tokenlarni `localStorage` o'rniga `httpOnly` cookie da saqlang
   - HTTPS ishlatilishi shart (production da)

2. **Parol Xavfsizligi:**
   - Parollar bcrypt bilan hash qilinadi
   - Minimum 6 ta belgi talab qilinadi

3. **Rate Limiting:**
   - Keyinchalik qo'shiladi (DDoS hujumlardan himoya)

---

## 📝 Validatsiya Qoidalari

### Register:
- **name:** 3-50 ta belgi
- **email:** To'g'ri email formati
- **phone:** 10-15 ta raqam
- **password:** Kamida 6 ta belgi

### Login:
- **email:** To'g'ri email formati
- **password:** Kiritilishi shart

---

## 🔄 Token Lifecycle

1. **Access Token:** 7 kun (default)
2. **Refresh Token:** 30 kun (default)
3. Token muddati tugaganda yangi token oling

---

## 📞 Support

Savollar bo'lsa:
- Email: support@travelbliss.uz
- GitHub: [Travel Bliss Backend](https://github.com/...)
