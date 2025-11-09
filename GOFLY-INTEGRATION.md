# 🌐 Gofly Website + Travel Bliss Backend Integration

## ✅ Nima Qilindi:

1. ✅ Gofly-website backend'ga ko'chirildi (`/public/gofly/`)
2. ✅ API integration JavaScript fayl yaratildi (`gofly-api.js`)
3. ✅ Dashboard professional qilib yaratildi
4. ✅ Backend API tayyor

---

## 🎯 Qanday Ishlaydi:

```
┌─────────────────────────────────────┐
│  ADMIN DASHBOARD                    │
│  http://localhost:5000/             │
│                                     │
│  Siz bu yerda:                      │
│  - Turlar yaratasz                  │
│  - Tahrirlaysiz                     │
│  - O'chirasiz                       │
└──────────────┬──────────────────────┘
               │
               │ API: /api/tours
               │
               ▼
┌─────────────────────────────────────┐
│  BACKEND API                        │
│  - Turlar saqlanadi                 │
│  - JSON formatda qaytaradi          │
└──────────────┬──────────────────────┘
               │
               │ JavaScript fetch()
               │
               ▼
┌─────────────────────────────────────┐
│  GOFLY WEBSITE (Frontend)           │
│  http://localhost:5000/gofly/...    │
│                                     │
│  Foydalanuvchilar ko'radi:          │
│  - Avtomatik yangilangan turlar     │
│  - Dashboard'dan yaratgan turlar    │
└─────────────────────────────────────┘
```

---

## 🚀 Qanday Ishlatish:

### 1. **Dashboard'da Tur Yaratish:**

```
1. Chrome'da: http://localhost:5000/
2. Sidebar dan "Tours" ni tanlang
3. "➕ Yangi Tur" tugmasini bosing
4. Formani to'ldiring:
   - Tur nomi: "Samarqand Sayohati"
   - Tavsif: "..."
   - Manzil: "Samarqand"
   - Kategoriya: "Madaniy"
   - Narx: 500000 UZS
   - Davomiyligi: 3 kun
   - va hokazo
5. "Saqlash" tugmasini bosing
```

### 2. **Gofly Website'da Ko'rish:**

```
1. Chrome'da: http://localhost:5000/gofly/travel-agency-03.html
2. Sahifani scroll qiling "Popular Package" qismiga
3. Siz yaratgan turlar avtomatik ko'rinadi!
```

---

## 📋 Gofly Saytni API ga Ulash:

Gofly saytda turlarni API dan olish uchun:

### travel-agency-03.html ga qo'shish kerak:

1. **HTML'da tours container yaratish** (1885-qator atrofida):

```html
<!-- Line 1885 atrofida -->
<div class="row gy-lg-5 gy-4" id="tours-container">
    <!-- Turlar bu yerda avtomatik yuklandi -->
</div>
```

2. **JavaScript faylni ulash** (oxirida, </body> dan oldin):

```html
<!-- Before </body> tag -->
<script src="gofly-api.js"></script>
</body>
```

---

## 🔧 Qo'lda Qo'shish:

### travel-agency-03.html ni tahrirlash:

```bash
1. Faylni oching: C:\Users\ANUBIS PC\travel-bliss-backend\public\gofly\travel-agency-03.html

2. 1885-qatorni toping:
   <div class="row gy-lg-5 gy-4">

3. Uni o'zgartiring:
   <div class="row gy-lg-5 gy-4" id="tours-container">

4. Fayl oxirida (</body> dan oldin) qo'shing:
   <script src="gofly-api.js"></script>

5. Saqlang!
```

---

## ✨ Test Qilish:

### 1. Dashboard Test:
```
http://localhost:5000/
- Tur yarating
- Tahrirlang
- O'chiring
```

### 2. API Test:
```
http://localhost:5000/api/tours
- Barcha turlarni ko'ring (JSON)
```

### 3. Gofly Website Test:
```
http://localhost:5000/gofly/travel-agency-03.html
- Turlar ko'rinishini tekshiring
```

---

## 🎨 Gofly Sayt Strukturasi:

```
/public/gofly/
├── assets/              # CSS, JS, Images
├── index.html           # Bosh sahifa
├── travel-agency-03.html # Turlar sahifasi
├── gofly-api.js         # API integration (🆕 YARATILDI)
└── ...
```

---

## 💡 Qanday Ishlaydi:

1. **Dashboard'da tur yaratiladi** → Backend'ga POST so'rov
2. **Backend ma'lumotni saqlaydi** → Database yoki memory'da
3. **Gofly website ochiladi** → GET /api/tours
4. **JavaScript turlarni yuklaydi** → gofly-api.js
5. **Sahifada ko'rsatiladi** → Dinamik HTML

---

## 🔥 Keyingi Qadamlar:

1. **MongoDB ulash** (hozir DEMO mode)
   ```
   .env faylda MONGODB_URI ni to'ldiring
   ```

2. **Gofly saytni to'liq integratsiya**
   ```
   travel-agency-03.html ga id="tours-container" qo'shing
   gofly-api.js ni ulang
   ```

3. **Production deploy**
   ```
   Server'ga yuklang
   Domain ulang
   ```

---

## 📞 Maslahatlar:

- Dashboard: **http://localhost:5000/**
- Gofly Website: **http://localhost:5000/gofly/travel-agency-03.html**
- API: **http://localhost:5000/api/tours**
- Health: **http://localhost:5000/api/health**

---

## ✅ Tayyor!

Hamma narsa sozlangan! Faqat:
1. travel-agency-03.html ga `id="tours-container"` qo'shing
2. `<script src="gofly-api.js"></script>` qo'shing
3. Serverni restart qiling
4. Test qiling!

🚀 **Backend ishlayapti va boshqarishga tayyor!**
