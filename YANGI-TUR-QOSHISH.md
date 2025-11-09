# 🎯 YANGI TURLAR QO'SHISH - To'liq Qo'llanma

## 📋 Mundarija
1. [Dashboard Orqali Qo'shish (Oson Yo'l)](#dashboard-orqali)
2. [API Orqali Qo'shish (Dasturchilar Uchun)](#api-orqali)
3. [Turni Ko'rish va Tekshirish](#tekshirish)
4. [Misollar](#misollar)

---

## 🖥️ Dashboard Orqali Qo'shish (Oson Yo'l) {#dashboard-orqali}

### 1️⃣ Dashboard ni Oching
```
http://localhost:5000/
yoki
http://localhost:5000/admin.html
```

### 2️⃣ Forma ni To'ldiring

Dashboard chap tarafida **"Tur Yaratish"** formasi bor:

#### ✏️ Majburiy Maydonlar:

| Maydon | Ta'rif | Misol |
|--------|--------|-------|
| **Tur Nomi** | Tur sarlavhasi | "Toshkent Shahar Turi" |
| **Tavsif** | Batafsil ma'lumot | "Toshkent shahrining diqqatga sazovor joylarini ziyorat qiling..." |
| **Manzil** | Qayerga borish | "Toshkent" |
| **Narx (UZS)** | Narxi | 250000 |
| **Davomiyligi** | Necha kun | 1 |
| **Max Guruh** | Max odamlar | 25 |
| **Kategoriya** | Tur turi | Madaniy / Sarguzasht / Tabiat / Shahar / Plyaj / Tog' |
| **Qiyinlik** | Qiyin-oson | Oson / O'rtacha / Qiyin |

#### 📝 Qo'shimcha Maydonlar:

- **Reyting**: 1-5 orasida (default: 4.5)
- **Rasm Fayli**: Rasm nomi (masalan: tashkent.jpg)
- **Featured**: ✅ Belgilang → asosiy sahifada ko'rsatiladi

### 3️⃣ Live Preview

Formani to'ldirar ekansiz, **pastda ko'rinish namunasi** avtomatik yangilanadi! 👁️

### 4️⃣ Saqlash

**"✅ Saqlash"** tugmasini bosing!

### 5️⃣ Natija

✅ **O'ng tarafda** yangi tur darhol ko'rinadi
✅ **Saytda** avtomatik paydo bo'ladi
✅ **Statistika** yangilanadi

---

## 🔌 API Orqali Qo'shish (Dasturchilar Uchun) {#api-orqali}

### Endpoint
```
POST http://localhost:5000/api/tours
```

### Headers
```json
{
  "Content-Type": "application/json"
}
```

### Request Body

```json
{
  "title": "Tur Nomi",
  "description": "Batafsil tavsif...",
  "destination": "Manzil",
  "price": 250000,
  "duration": 1,
  "maxGroupSize": 25,
  "category": "city",
  "difficulty": "easy",
  "rating": 4.7,
  "imageCover": "image.jpg",
  "isFeatured": true,
  "isActive": true,
  "included": ["Transport", "Gid"],
  "excluded": ["Mehmonxona"]
}
```

### cURL Misol

```bash
curl -X POST http://localhost:5000/api/tours \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Farg'\''ona Vodiysi Sayohati",
    "description": "Farg'\''ona vodiysining go'\''zal joylarini kashf eting",
    "destination": "Farg'\''ona",
    "price": 350000,
    "duration": 2,
    "maxGroupSize": 20,
    "category": "cultural",
    "difficulty": "easy",
    "rating": 4.6,
    "imageCover": "fergana.jpg",
    "isFeatured": false,
    "isActive": true,
    "included": ["Mehmonxona", "Transport", "Gid xizmati"],
    "excluded": ["Ovqat"]
  }'
```

### Response

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Tur yaratildi",
  "data": {
    "tour": {
      "id": "5",
      "title": "Farg'ona Vodiysi Sayohati",
      "description": "...",
      "price": 350000,
      ...
    },
    "mode": "DEMO"
  }
}
```

---

## 🔍 Turni Ko'rish va Tekshirish {#tekshirish}

### 1. Barcha Turlar
```
http://localhost:5000/gofly/travel-agency-03.html
```

### 2. Bitta Tur (Details)
```
http://localhost:5000/gofly/tour-details.html?id=4
```

### 3. API Orqali
```bash
# Barcha turlar
curl http://localhost:5000/api/tours

# Bitta tur
curl http://localhost:5000/api/tours/4
```

---

## 📚 Misollar {#misollar}

### Misol 1: Toshkent Shahar Turi

**Dashboard Orqali:**
1. Dashboard oching: http://localhost:5000/
2. Forma to'ldiring:
   - Tur Nomi: `Toshkent Shahar Turi`
   - Tavsif: `Toshkent shahrining diqqatga sazovor joylarini ziyorat qiling: Hazrati Imom majmuasi, Chorsu bozori, Toshkent metro`
   - Manzil: `Toshkent`
   - Narx: `250000`
   - Davomiyligi: `1`
   - Max Guruh: `25`
   - Kategoriya: `Shahar`
   - Qiyinlik: `Oson`
   - Featured: ✅ Belgilang
3. **Saqlash** bosing
4. Ko'ring: http://localhost:5000/gofly/tour-details.html?id=4

---

### Misol 2: Farg'ona Vodiysi

**API Orqali:**
```bash
curl -X POST http://localhost:5000/api/tours \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Farg'\''ona Vodiysi Sayohati",
    "description": "Farg'\''ona vodiysining go'\''zal joylarini kashf eting: Rishton kulolchiligi, Marg'\''ilon atlas fabrikasi, Qo'\''qon xonligi yodgorliklari",
    "destination": "Farg'\''ona",
    "price": 380000,
    "duration": 2,
    "maxGroupSize": 18,
    "category": "cultural",
    "difficulty": "easy",
    "rating": 4.6,
    "imageCover": "fergana.jpg",
    "isFeatured": false,
    "isActive": true,
    "included": ["Mehmonxona", "Transport", "Gid xizmati", "Tushlik"],
    "excluded": ["Kechki ovqat", "Shaxsiy xarajatlar"]
  }'
```

---

### Misol 3: Zarafshon Tog'lari

**Dashboard Orqali:**
```
Tur Nomi: Zarafshon Tog'lari Safari
Tavsif: Zarafshon tog' tizmasida noyob tabiat manzaralarini tomosha qiling
Manzil: Zarafshon
Narx: 420000
Davomiyligi: 3
Max Guruh: 12
Kategoriya: Tog'
Qiyinlik: O'rtacha
Reyting: 4.8
Featured: ✅
```

---

### Misol 4: Aral Dengizi

**API Orqali:**
```bash
curl -X POST http://localhost:5000/api/tours \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Aral Dengizi Ekspeditsiyasi",
    "description": "Aral dengizi qirg'\''og'\''idagi noyob manzaralar va tarixiy kemalar qabristonini ziyorat qiling",
    "destination": "Muynaq",
    "price": 650000,
    "duration": 4,
    "maxGroupSize": 10,
    "category": "adventure",
    "difficulty": "hard",
    "rating": 4.9,
    "imageCover": "aral.jpg",
    "isFeatured": true,
    "isActive": true,
    "included": ["Mehmonxona", "4x4 Transport", "Gid xizmati", "Ovqat", "Camping uskunalar"],
    "excluded": ["Shaxsiy xarajatlar", "Sug'\''urta"]
  }'
```

---

## 🎨 Kategoriyalar va Iconlar

| Kategoriya | Icon | Inglizcha | O'zbekcha |
|------------|------|-----------|-----------|
| cultural | 🏛️ | cultural | Madaniy |
| adventure | ⛰️ | adventure | Sarguzasht |
| nature | 🌲 | nature | Tabiat |
| city | 🏙️ | city | Shahar |
| beach | 🏖️ | beach | Plyaj |
| mountain | ⛰️ | mountain | Tog' |

---

## ⚙️ Qiyinlik Darajalari

| Inglizcha | O'zbekcha | Badge Rangi |
|-----------|-----------|-------------|
| easy | Oson | 🟢 Yashil |
| medium | O'rtacha | 🟡 Sariq |
| hard | Qiyin | 🔴 Qizil |

---

## 📊 Ma'lumotlar Tuzilishi

### Majburiy Fieldlar (required)
```javascript
{
  title: String (3-100 belgi),
  description: String (min 10 belgi),
  destination: String,
  price: Number (>= 0),
  duration: Number (>= 1),
  maxGroupSize: Number (1-50),
  category: String [cultural, adventure, nature, city, beach, mountain],
  difficulty: String [easy, medium, hard]
}
```

### Ixtiyoriy Fieldlar (optional)
```javascript
{
  rating: Number (1-5, default: 4.5),
  imageCover: String (default: "default.jpg"),
  isFeatured: Boolean (default: false),
  isActive: Boolean (default: true),
  included: Array of Strings,
  excluded: Array of Strings,
  ratingsCount: Number (default: 0)
}
```

---

## 🔄 Workflow

```
1. Dashboard Ochish
   ↓
2. Forma To'ldirish
   ↓
3. Live Preview Ko'rish
   ↓
4. Saqlash
   ↓
5. API ga POST Request
   ↓
6. Backend Validation
   ↓
7. Ma'lumot Saqlanadi
   ↓
8. Response (ID bilan)
   ↓
9. Dashboard Yangilanadi
   ↓
10. Gofly Saytida Paydo Bo'ladi
```

---

## ✅ Tekshirish Ro'yxati

Yangi tur qo'shganda:

- [ ] Tur nomi to'ldirilgan (3+ belgi)
- [ ] Tavsif yetarli batafsil (10+ belgi)
- [ ] Narx to'g'ri (musbat son)
- [ ] Davomiyligi kiritilgan (1+ kun)
- [ ] Kategoriya tanlangan
- [ ] Qiyinlik darajasi tanlangan
- [ ] Featured kerakmi? (tekshiring)
- [ ] Live preview to'g'ri ko'rinyaptimi?
- [ ] Saqlangandan keyin saytda ko'rinyaptimi?

---

## 🐛 Muammolarni Hal Qilish

### Tur saqlanmayapti?
```bash
# 1. Server ishlab turibdimi?
curl http://localhost:5000/api/health

# 2. Browser console ni tekshiring (F12)

# 3. Validatsiya xatolarini o'qing
```

### Saytda ko'rinmayapti?
```bash
# 1. Cache ni tozalang
Ctrl + F5

# 2. API ni tekshiring
curl http://localhost:5000/api/tours

# 3. JavaScript console ni ko'ring
F12 → Console
```

---

## 📞 Qo'shimcha Yo'riqnoma

### Rasm Qo'shish
1. Rasmni `/public/gofly/assets/img/home1/` papkasiga joylashtiring
2. Dashboard da rasm nomini kiriting (masalan: `fergana.jpg`)
3. Saqlang

### Turni O'chirish
1. Dashboard da turlar ro'yxatida 🗑️ tugmasini bosing
2. Tasdiqlang
3. Saytdan ham, API dan ham o'chadi

---

## 🎯 Natija

Endi siz:
- ✅ Dashboard orqali yangi turlar qo'sha olasiz
- ✅ API orqali turlar yarata olasiz
- ✅ Turlar avtomatik saytda ko'rinadi
- ✅ Live preview bilan ko'rib turgan holda tahrirlaysiz

**Omad! 🚀**

---

## 📊 Hozirgi Turlar

Server ishga tushgan paytda default 3 ta tur bor:

1. **Samarqand Sayohati** (ID: 1)
2. **Buxoro Tarixiy Safari** (ID: 2)
3. **Chimyon Tog'lari Sarguzashti** (ID: 3)
4. **Toshkent Shahar Turi** (ID: 4) - Yangi qo'shildi! ✅

Hozir jami: **4 ta tur**

Yangi tur qo'shganingizda ID avtomatik oshadi (5, 6, 7...)

---

**Last Updated**: 2025-11-08
**Version**: 1.0
**Author**: Claude Code Assistant
