# 🚀 BUYURTMA TIZIMI - TEZKOR BOSHLASH

## ⚡ 5 DAQIQADA ISHGA TUSHIRING!

### 1️⃣ Server Ishga Tushiring
```bash
npm run dev
```

Server ishga tushgandan so'ng ko'rasiz:
```
🚀 TRAVEL BLISS BACKEND SERVER
📍 Server running on: http://localhost:4000
```

---

### 2️⃣ Birinchi Buyurtmani Yarating

1. **Oching:** http://localhost:4000/gofly/tour-details.html?id=1

2. **Sana tanlang:**
   - "Check-in" maydonida kelajak sanani tanlang
   - Misol: 2025-11-25

3. **Mehmonlar sonini tanlang:**
   - "Guests" dropdown'dan tanlang
   - Misol: 2 Guests

4. **"Check Availability" tugmasini bosing**

5. **Ma'lumotlarni to'ldiring:**
   - **Name:** John Doe
   - **Email:** john@example.com
   - **Phone:** +998901234567
   - **Special Requests:** (ixtiyoriy)

6. **"Continue" bosing**

7. **Ma'lumotlarni ko'rib chiqing va "Confirm Booking" bosing**

8. **✅ Tayyor!** Buyurtma ID ni ko'rasiz.

---

### 3️⃣ Email Xabarlarini Tekshiring

Terminal (npm run dev ishlab turgan joyda) quyidagilarni ko'rasiz:

```
📧 ===== EMAIL SENT (CONSOLE MODE) =====
To: john@example.com
🔐 Booking ID: BOOK-XXXXXX
Subject: Buyurtma tasdiqlandi
======================================

📧 ===== EMAIL SENT (CONSOLE MODE) =====
To: admin@travelbliss.uz
🔔 New Booking Notification
======================================
```

---

### 4️⃣ Admin Panelda Ko'ring

1. **Login qiling:** http://localhost:4000/gofly/admin-login.html
   - Email: `admin@travelbliss.uz`
   - Parol: `admin123`

2. **"Bookings" menyusini bosing**

3. **Yangi buyurtmangizni ko'rasiz!**
   - Status: **Pending** (sariq rang)
   - Barcha ma'lumotlar ko'rsatiladi

4. **Buyurtmani tasdiqlang:**
   - "Confirm" tugmasini bosing
   - Status **Confirmed** (yashil rang) ga o'zgaradi
   - Mijozga tasdiqlash email yuboriladi (konsol)

---

## 📋 TEZKOR HAVOLALAR

### Saytlar
- **Login:** http://localhost:4000/gofly/admin-login.html
- **Turlar:** http://localhost:4000/gofly/tour-details.html?id=1
- **Admin Panel:** http://localhost:4000/admin

### Demo Ma'lumotlar
- **Admin Email:** admin@travelbliss.uz
- **Admin Parol:** admin123
- **Test Phone:** +998901234567
- **Test Email:** john@example.com

---

## 🔧 REAL EMAILLARNI YOQISH

### Gmail bilan (5 daqiqa)

1. **Gmail'da App Password yarating:**
   - https://myaccount.google.com/apppasswords
   - 2-factor auth yoqing
   - App password yarating

2. **`.env` fayliga qo'shing:**
```env
EMAIL_USER=sizning-gmail@gmail.com
EMAIL_PASSWORD=app-password-bu-yerda
ADMIN_EMAIL=admin@travelbliss.uz
```

3. **Serverni qayta ishga tushiring:**
```bash
# Ctrl+C (serveristopping)
npm run dev
```

4. **✅ Tayyor!** Endi real emaillar yuboriladi!

---

## 📱 REAL SMS YOQISH

### Eskiz.uz bilan (10 daqiqa)

1. **Ro'yxatdan o'ting:** https://eskiz.uz/

2. **API Token oling**

3. **`.env` fayliga qo'shing:**
```env
ESKIZ_EMAIL=sizning-email@example.com
ESKIZ_PASSWORD=sizning-parol
```

4. **Serverni qayta ishga tushiring**

5. **✅ Tayyor!** Endi real SMSlar yuboriladi!

**Narx:** ~50-100 so'm per SMS (juda arzon!)

---

## ❓ TEZKOR YORDAM

### Muammo: Modal ochilmaydi
✅ **Yechim:** Sana tanlanganligini tekshiring

### Muammo: "Email format noto'g'ri"
✅ **Yechim:** `name@domain.com` formatida yozing

### Muammo: "Telefon format noto'g'ri"
✅ **Yechim:** `+998XXXXXXXXX` formatida yozing (9 ta raqam)

### Muammo: Buyurtmalar ko'rinmaydi
✅ **Yechim:**
1. Admin sifatida kirganingizni tekshiring
2. Sahifani yangilang (F5)
3. `data/bookings.json` fayli borligini tekshiring

---

## 📚 TO'LIQ HUJJATLAR

Batafsil ma'lumot uchun:
- **Inglizcha:** `BOOKING_SYSTEM_GUIDE.md`
- **O'zbekcha:** `BOOKING_SISTEMA_OZBEKCHA.md`

---

## ✅ TAYYOR XUSUSIYATLAR

- ✅ 3-bosqichli buyurtma modal
- ✅ Validatsiya (email, telefon, sana)
- ✅ Email xabarlari (mijoz + admin)
- ✅ Admin buyurtmalarni boshqarish
- ✅ Status filtrlash
- ✅ Statistika dashboard
- ✅ Tasdiqlash/Bekor qilish
- ✅ Responsive dizayn

---

## 🎯 ESLATMA

**To'lov tizimi QO'SHILMAGAN** - siz so'raganingiz bo'yicha!

Agar to'lov kerak bo'lsa (Click/Payme), ayting - qo'shamiz!

---

## 🎉 HAMMASI TAYYOR!

Sistema **to'liq ishlaydigan** holatda!

Test qiling va zavq oling! 🚀

---

**Muammolar bo'lsa:** Konsol (npm run dev) ga qarang - barcha xatolar va loglar u yerda!
