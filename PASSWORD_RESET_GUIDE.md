# 🔑 PAROLNI TIKLASH TIZIMI - TO'LIQ TAYYOR!

## 🎉 NIMA QILINDI?

**Parolni tiklash (Forgot Password)** tizimi **to'liq tayyor**!

Foydalanuvchilar endi parolni **Email** yoki **Telefon** orqali tiklashi mumkin! 🚀

---

## 🌟 XUSUSIYATLAR

### ✅ Email orqali parolni tiklash
- OTP kod emailga yuboriladi
- 6 raqamli kod
- 10 daqiqa amal qiladi

### ✅ Telefon orqali parolni tiklash
- OTP kod telefonaga SMS orqali yuboriladi
- 6 raqamli kod
- 10 daqiqa amal qiladi

### ✅ 3 Bosqichli Jarayon
1. **Email/Telefon kiritish** → OTP yuboriladi
2. **OTP kodni tasdiqlash** → Kod tekshiriladi
3. **Yangi parol o'rnatish** → Parol o'zgartiriladi

### ✅ Xavfsizlik
- OTP kod 10 daqiqadan keyin o'z-o'zidan yaroqsiz bo'ladi
- Parol bcrypt bilan hash qilinadi
- Parol kamida 6 ta belgi bo'lishi kerak

---

## 🚀 QANDAY ISHLAYDI?

### Jarayon:

```
1. Parolni unutdingizmi? → Click
   ↓
2. Email yoki telefon kiriting
   ↓
3. OTP kod 123456 yuboriladi
   (Email yoki SMS orqali)
   ↓
4. OTP kodni kiriting va tasdiqlang
   ↓
5. Yangi parol o'rnating
   ↓
6. ✅ Parol o'zgartirildi!
   ↓
7. Login sahifasiga redirect
```

---

## 📍 SAHIFALAR

### 1. Login Sahifasi
**URL:** `http://localhost:4000/gofly/admin-login.html`

**Yangi xususiyat:**
- ✅ "Parolni unutdingizmi?" link qo'shildi
- Link forgot-password.html ga yo'naltiradi

```
┌──────────────────────────────┐
│  🔐 Admin Panel              │
│  Travel Bliss Admin          │
├──────────────────────────────┤
│  Email:                      │
│  [___________________]       │
│                              │
│  Parol:                      │
│  [___________________]       │
│                              │
│  [        Kirish       ]     │
│                              │
│  Parolni unutdingizmi? ← NEW │
└──────────────────────────────┘
```

---

### 2. Forgot Password Sahifasi
**URL:** `http://localhost:4000/gofly/forgot-password.html`

**3 ta bosqich:**

#### Bosqich 1: Email/Telefon Kiritish
```
┌──────────────────────────────────┐
│  🔑 Parolni Tiklash              │
│  Email yoki telefon orqali...    │
├──────────────────────────────────┤
│  ●━━━━  (Step 1/3)              │
│                                  │
│  Email yoki Telefon:             │
│  [_________________________]     │
│  admin@travelbliss.uz yoki       │
│  +998901234567                   │
│                                  │
│  [  OTP Kod Yuborish  ]          │
│                                  │
│  OTP kod emailingizga yoki       │
│  telefoningizga yuboriladi       │
│                                  │
│  ← Login sahifasiga qaytish      │
└──────────────────────────────────┘
```

#### Bosqich 2: OTP Kodni Kiriting
```
┌──────────────────────────────────┐
│  🔑 Parolni Tiklash              │
├──────────────────────────────────┤
│  ━●━━━━  (Step 2/3)             │
│                                  │
│  6 Raqamli OTP Kodni Kiriting:   │
│                                  │
│  [1] [2] [3] [4] [5] [6]         │
│   ▲                              │
│   └─ Auto-focus                  │
│                                  │
│  [     Tasdiqlash      ]         │
│                                  │
│  Kod kelmadimi? Qayta yuborish   │
└──────────────────────────────────┘
```

#### Bosqich 3: Yangi Parol
```
┌──────────────────────────────────┐
│  🔑 Parolni Tiklash              │
├──────────────────────────────────┤
│  ━━━●━━  (Step 3/3)             │
│                                  │
│  Yangi Parol:                    │
│  [_________________________]     │
│  Kamida 6 ta belgi               │
│                                  │
│  Parolni Tasdiqlash:             │
│  [_________________________]     │
│  Parolni qayta kiriting          │
│                                  │
│  [ Parolni O'zgartirish ]        │
└──────────────────────────────────┘
```

---

## 🔧 BACKEND API

### 1. OTP Yuborish (Forgot Password)

**Endpoint:** `POST /api/auth/forgot-password`

**Body:**
```json
{
  "emailOrPhone": "admin@travelbliss.uz"
}
```

yoki

```json
{
  "emailOrPhone": "+998901234567"
}
```

**Response (Email):**
```json
{
  "success": true,
  "message": "OTP kod emailga yuborildi. Iltimos emailingizni tekshiring.",
  "data": {
    "method": "email",
    "email": "admin@travelbliss.uz",
    "message": "OTP kod admin@travelbliss.uz ga yuborildi"
  }
}
```

**Response (SMS):**
```json
{
  "success": true,
  "message": "OTP kod telefon raqamingizga yuborildi.",
  "data": {
    "method": "sms",
    "phone": "+998901234567",
    "message": "OTP kod +998901234567 ga yuborildi"
  }
}
```

**Backend Console (Email):**
```
📧 ===== EMAIL SENT =====
To: admin@travelbliss.uz
Subject: Parolni Tiklash - Travel Bliss

Salom Admin,

Parolni tiklash uchun quyidagi OTP kodni kiriting:

🔐 OTP KOD: 123456

Bu kod 10 daqiqa davomida amal qiladi.

Agar siz bu so'rovni yubormasangiz, bu xabarni e'tiborsiz qoldiring.

Travel Bliss jamoasi
========================
```

**Backend Console (SMS):**
```
📱 ===== SMS SENT =====
To: +998901234567

Travel Bliss - Parolni tiklash

🔐 OTP KOD: 123456

Bu kod 10 daqiqa amal qiladi.
=======================
```

---

### 2. OTP Tasdiqlash (Verify OTP)

**Endpoint:** `POST /api/auth/verify-otp`

**Body:**
```json
{
  "emailOrPhone": "admin@travelbliss.uz",
  "otp": "123456"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "OTP kod to'g'ri. Yangi parol o'rnating.",
  "data": {
    "verified": true
  }
}
```

**Error Response (Noto'g'ri OTP):**
```json
{
  "success": false,
  "message": "OTP kod noto'g'ri"
}
```

**Error Response (Muddati o'tgan):**
```json
{
  "success": false,
  "message": "OTP kod muddati o'tgan. Qaytadan so'rov yuboring."
}
```

---

### 3. Yangi Parol O'rnatish (Reset Password)

**Endpoint:** `POST /api/auth/reset-password`

**Body:**
```json
{
  "emailOrPhone": "admin@travelbliss.uz",
  "otp": "123456",
  "newPassword": "newSecurePassword123"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Parol muvaffaqiyatli o'zgartirildi. Endi login qilishingiz mumkin.",
  "data": null
}
```

**Error Response (Noto'g'ri OTP):**
```json
{
  "success": false,
  "message": "OTP kod noto'g'ri"
}
```

**Error Response (Qisqa parol):**
```json
{
  "success": false,
  "message": "Parol kamida 6 ta belgidan iborat bo'lishi kerak"
}
```

---

## 📝 FILE STORAGE

OTP kod va muddati `data/users.json` da saqlanadi:

**Oldingi user ma'lumotlari:**
```json
{
  "id": "1",
  "name": "Admin",
  "email": "admin@travelbliss.uz",
  "password": "$2a$10$...",
  "role": "admin"
}
```

**OTP yuborilgandan keyin:**
```json
{
  "id": "1",
  "name": "Admin",
  "email": "admin@travelbliss.uz",
  "password": "$2a$10$...",
  "role": "admin",
  "resetPasswordOTP": "123456",
  "resetPasswordOTPExpires": "2024-11-19T13:30:00.000Z"
}
```

**Parol o'zgartirilgandan keyin:**
```json
{
  "id": "1",
  "name": "Admin",
  "email": "admin@travelbliss.uz",
  "password": "$2a$10$NEW_HASHED_PASSWORD...",
  "role": "admin",
  "resetPasswordOTP": null,
  "resetPasswordOTPExpires": null,
  "updatedAt": "2024-11-19T13:25:00.000Z"
}
```

---

## ✅ TEST QILISH

### Test 1: Email orqali parolni tiklash

**1. Forgot Password sahifasini oching:**
```
http://localhost:4000/gofly/forgot-password.html
```

**2. Email kiriting:**
```
Email yoki Telefon: admin@travelbliss.uz
```

**3. "OTP Kod Yuborish" bosing**

**4. Terminal'da OTP kodni ko'ring:**
```
📧 ===== EMAIL SENT =====
To: admin@travelbliss.uz
🔐 OTP KOD: 123456
========================
```

**5. OTP kodni kiriting:**
```
[1] [2] [3] [4] [5] [6]
```

**6. "Tasdiqlash" bosing**

**7. Yangi parol o'rnating:**
```
Yangi Parol: myNewPassword123
Tasdiqlash:  myNewPassword123
```

**8. "Parolni O'zgartirish" bosing**

**9. Login sahifasiga redirect bo'lasiz**

**10. Yangi parol bilan login qiling:**
```
Email: admin@travelbliss.uz
Parol: myNewPassword123
```

✅ **Natija:** Muvaffaqiyatli login qilasiz!

---

### Test 2: Telefon orqali parolni tiklash

**1-10. Yuqoridagi bosqichlarni takrorlang, lekin telefon raqam kiriting:**

```
Email yoki Telefon: +998901234567
```

**Terminal'da:**
```
📱 ===== SMS SENT =====
To: +998901234567
🔐 OTP KOD: 654321
=======================
```

---

### Test 3: Noto'g'ri OTP

**1. Noto'g'ri OTP kiriting:**
```
[9] [9] [9] [9] [9] [9]
```

**Natija:**
```
❌ OTP kod noto'g'ri
```

---

### Test 4: OTP Muddati O'tgan

**1. OTP olganingizdan 10 daqiqadan keyin tasdiqlashga harakat qiling**

**Natija:**
```
❌ OTP kod muddati o'tgan. Qaytadan so'rov yuboring.
```

---

### Test 5: Parollar Mos Kelmadi

**1. Yangi parol bosqichida:**
```
Yangi Parol:    password123
Tasdiqlash:     password456  ← har xil
```

**Natija:**
```
❌ Parollar mos kelmadi!
```

---

## 🔒 XAVFSIZLIK XUSUSIYATLARI

### ✅ Amalga oshirilgan:

1. **OTP Expiration**
   - OTP kod 10 daqiqadan keyin yaroqsiz bo'ladi
   - Muddati o'tgan OTP qabul qilinmaydi

2. **OTP Validation**
   - Faqat 6 raqamli kod
   - Faqat raqamlar qabul qilinadi
   - OTP to'g'riligini backend tekshiradi

3. **Password Hashing**
   - Yangi parol bcrypt bilan hash qilinadi (10 salt rounds)
   - Plain text parol hech qachon saqlanmaydi

4. **Password Requirements**
   - Kamida 6 ta belgi
   - Frontend va backend validatsiyasi

5. **User Existence Check**
   - Faqat mavjud email/telefon uchun OTP yuboriladi
   - Mavjud bo'lmagan foydalanuvchi xatosi qaytariladi

6. **One-time Use**
   - Parol o'zgartirilgandan keyin OTP o'chiriladi
   - Bir xil OTP qayta ishlatilmaydi

---

## 🎨 UI/UX XUSUSIYATLARI

### ✅ Bajarilgan:

1. **Step Indicator**
   - 3 ta nuqta: ●━━━━ (1-bosqich)
   - Progressni ko'rsatadi

2. **OTP Input Animation**
   - Auto-focus keyingi inputga
   - Backspace oldingi inputga qaytadi
   - Faqat raqamlar kiritiladi

3. **Loading States**
   - Har bir tugmada spinner
   - Disabled holat kutish vaqtida

4. **Responsive Design**
   - Mobile-friendly
   - Gradient background
   - Modern card design

5. **Error Handling**
   - Alert messages (danger/success/info)
   - 5 sekunddan keyin auto-hide

6. **Resend OTP**
   - "Kod kelmadimi? Qayta yuborish" link
   - 1-bosqichga qaytaradi

---

## 🔄 EMAIL/SMS INTEGRATSIYA (Keyingi Qadam)

Hozirda OTP kod **console'ga** yuboriladi (development uchun).

**Production uchun:**

### Email Integratsiya:

**Nodemailer:**
```javascript
// src/utils/sendEmail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function sendOTPEmail(email, otp, name) {
  await transporter.sendMail({
    from: '"Travel Bliss" <noreply@travelbliss.uz>',
    to: email,
    subject: 'Parolni Tiklash - Travel Bliss',
    html: `
      <h2>Salom ${name},</h2>
      <p>Parolni tiklash uchun quyidagi OTP kodni kiriting:</p>
      <h1 style="color: #0F16E6;">${otp}</h1>
      <p>Bu kod 10 daqiqa davomida amal qiladi.</p>
      <p>Agar siz bu so'rovni yubormasangiz, bu xabarni e'tiborsiz qoldiring.</p>
      <br>
      <p>Travel Bliss jamoasi</p>
    `
  });
}

module.exports = { sendOTPEmail };
```

---

### SMS Integratsiya:

**Playmobile/Eskiz.uz:**
```javascript
// src/utils/sendSMS.js
const axios = require('axios');

async function sendOTPSMS(phone, otp) {
  const response = await axios.post('https://notify.eskiz.uz/api/message/sms/send', {
    mobile_phone: phone,
    message: `Travel Bliss - Parolni tiklash\n\nOTP KOD: ${otp}\n\nBu kod 10 daqiqa amal qiladi.`,
    from: 'TravelBliss'
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.ESKIZ_TOKEN}`
    }
  });

  return response.data;
}

module.exports = { sendOTPSMS };
```

**Controller'da ishlatish:**
```javascript
// forgotPassword controller'ida
if (isEmail) {
  await sendOTPEmail(user.email, otp, user.name);
} else {
  await sendOTPSMS(user.phone, otp);
}
```

---

## 📊 STATISTIKA

| Xususiyat | Oldingi Holat | Hozirgi Holat |
|-----------|---------------|---------------|
| Parolni tiklash | ❌ Yo'q | ✅ Email/Telefon |
| OTP sistem | ❌ Yo'q | ✅ 6 raqamli kod |
| Xavfsizlik | ❌ Yo'q | ✅ 10 daqiqa expiry |
| UI/UX | ❌ Yo'q | ✅ 3-bosqichli wizard |
| Validatsiya | ❌ Yo'q | ✅ Frontend + Backend |

---

## 🆘 MUAMMOLARNI HAL QILISH

### Muammo 1: "Foydalanuvchi topilmadi"

**Sabab:**
- Email yoki telefon noto'g'ri
- User mavjud emas

**Yechim:**
```bash
# Userlar ro'yxatini ko'ring
cat data/users.json

# Yoki admin yarating
node create-admin.js
```

---

### Muammo 2: "OTP kod noto'g'ri"

**Sabab:**
- Noto'g'ri kod kiritilgan
- Terminal'dan to'g'ri kodni oling

**Yechim:**
```bash
# Terminal'da OTP kodni ko'ring:
📧 ===== EMAIL SENT =====
🔐 OTP KOD: 123456  ← Buni kiriting
```

---

### Muammo 3: "OTP kod muddati o'tgan"

**Sabab:**
- 10 daqiqadan ko'p vaqt o'tgan

**Yechim:**
- "Qayta yuborish" tugmasini bosing
- Yangi OTP kod olasiz

---

### Muammo 4: OTP console'da ko'rinmayapti

**Sabab:**
- Server terminal'i topilmayapti
- Nodemon restart bo'lgan

**Yechim:**
```bash
# Server ishlab turganini tekshiring
npm run dev

# Terminal loglarini kuzatib turing
```

---

## 📚 FAYLLAR

### Yangi Yaratilgan:
```
public/gofly/forgot-password.html    ← Parolni tiklash sahifasi
PASSWORD_RESET_GUIDE.md              ← Bu dokumentatsiya
```

### O'zgartirilgan:
```
src/controllers/auth.controller.js   ← 3 ta yangi funksiya
  - forgotPassword()
  - verifyOTP()
  - resetPassword()

src/routes/auth.routes.js            ← 3 ta yangi route
  - POST /api/auth/forgot-password
  - POST /api/auth/verify-otp
  - POST /api/auth/reset-password

public/gofly/admin-login.html        ← "Parolni unutdingizmi?" link
```

---

## ✅ XULOSA

🔑 **Parolni tiklash tizimi to'liq tayyor!**

**Qanday ishlatiladi:**
1. ✅ Login sahifasida "Parolni unutdingizmi?" ni bosing
2. ✅ Email yoki telefon kiriting
3. ✅ OTP kod console'da ko'rinadi (development)
4. ✅ OTP kodni tasdiqlang
5. ✅ Yangi parol o'rnating
6. ✅ Login qiling!

**Keyingi qadamlar:**
- 📧 Email provider integratsiya (Nodemailer)
- 📱 SMS provider integratsiya (Eskiz.uz/Playmobile)
- 🎨 Email template dizayni
- ⏱️ Rate limiting (5 OTP / 1 soat)

**Sizning saytingiz endi professional va secure!** 🚀

---

**Savol bo'lsa:**
1. Forgot password sahifasini oching
2. Test qiling
3. Console'da OTP kodni ko'ring

**Demo:**
- Email: admin@travelbliss.uz
- Telefon: +998901234567
- Console'dan OTP kodni oling

**Tayyormisiz test qilishga?** 😊
