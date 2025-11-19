# 🔑 PAROLNI TIKLASH - TEZKOR QO'LLANMA

## ✅ TAYYOR VA ISHLAYDI!

Parolni tiklash tizimi **to'liq tayyor**!
OTP kod **terminal console'da** ko'rinadi.

---

## 🚀 QANDAY TEST QILISH?

### 1. Server ishga tushiring
```bash
npm run dev
```

### 2. Login sahifasini oching
```
http://localhost:4000/gofly/admin-login.html
```

### 3. "Parolni unutdingizmi?" ni bosing

### 4. Email yoki telefon kiriting
```
Email: admin@travelbliss.uz
yoki
Telefon: +998901234567
```

### 5. "OTP Kod Yuborish" bosing

### 6. Terminal'dan OTP kodni oling

**Terminal'da ko'rinadi:**
```
📧 ===== EMAIL SENT =====
To: admin@travelbliss.uz
🔐 OTP KOD: 123456
========================
```

yoki

```
📱 ===== SMS SENT =====
To: +998901234567
🔐 OTP KOD: 654321
=======================
```

### 7. OTP kodni kiriting sahifada
```
[1] [2] [3] [4] [5] [6]
```

### 8. "Tasdiqlash" bosing

### 9. Yangi parol o'rnating
```
Yangi Parol:    myNewPassword123
Tasdiqlash:     myNewPassword123
```

### 10. "Parolni O'zgartirish" bosing

### 11. ✅ Login qiling yangi parol bilan!

---

## 📍 SAHIFALAR

| Sahifa | URL |
|--------|-----|
| Login | `http://localhost:4000/gofly/admin-login.html` |
| Forgot Password | `http://localhost:4000/gofly/forgot-password.html` |
| Admin Panel | `http://localhost:4000/admin` |

---

## 🔐 API ENDPOINTS

| Endpoint | Method | Ma'lumot |
|----------|--------|----------|
| `/api/auth/forgot-password` | POST | OTP yuborish |
| `/api/auth/verify-otp` | POST | OTP tasdiqlash |
| `/api/auth/reset-password` | POST | Parol o'zgartirish |

---

## ⚙️ QANDAY ISHLAYDI?

### OTP Kod Qayerda Ko'rinadi?

**JAVOB:** `npm run dev` ishlab turgan **terminal oynasida**!

**Sabab:**
Hozircha Email/SMS provider ulanmagan.
OTP kod faqat **console'ga chiqariladi** (development mode).

---

## 🔮 KEYINGI QADAM: SMS YUBORISH

Agar real telefonaga SMS yuborish kerak bo'lsa:

### Eskiz.uz Integration

1. **Ro'yxatdan o'ting:** https://eskiz.uz/
2. **API Token oling**
3. **.env fayliga qo'shing:**
   ```env
   ESKIZ_EMAIL=your_email@example.com
   ESKIZ_PASSWORD=your_password
   ```
4. **Kod allaqachon tayyor!** Faqat .env to'ldiring va ishlaydi! ✅

**Narx:** 1 SMS ≈ 50-100 so'm (juda arzon!)

---

## ✅ XULOSA

🔑 **Parolni tiklash TAYYOR!**

**Hozirgi holat:**
- ✅ Forgot password sahifa ishlaydi
- ✅ OTP generatsiya qilinadi
- ✅ OTP console'da ko'rinadi
- ✅ OTP tasdiqlash ishlaydi
- ✅ Parol o'zgartirish ishlaydi
- ⏳ Real SMS yuborish (keyinroq)

**Test qilish:**
1. Login → "Parolni unutdingizmi?"
2. Email/Telefon kiriting
3. Terminal'dan OTP oling
4. OTP kiriting va tasdiqlang
5. Yangi parol o'rnating
6. Login qiling!

**Hammasi ishlaydi!** 🚀
