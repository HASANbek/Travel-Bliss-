# 🌐 MongoDB Atlas Sozlash (Qadam-qadam)

## 1️⃣ Akkount Yaratish

1. https://www.mongodb.com/cloud/atlas/register ga kiring
2. Google yoki email bilan ro'yxatdan o'ting
3. Organizatsiya va loyiha nomini kiriting (masalan: "Travel Bliss")

## 2️⃣ Free Cluster Yaratish

1. **"Create a Deployment"** tugmasini bosing
2. **M0 (FREE)** ni tanlang
3. **Cloud Provider:** AWS (yoki istalgan)
4. **Region:** Frankfurt (yoki yaqin region)
5. **Cluster Name:** `travel-bliss-cluster` (yoki istalgan nom)
6. **"Create Deployment"** tugmasini bosing

⏱️ Cluster yaratilishi 3-5 daqiqa oladi

## 3️⃣ Database User Yaratish

1. **Security > Database Access** ga kiring
2. **"Add New Database User"** ni bosing
3. **Username:** `travelbliss_admin` (yoki istalgan)
4. **Password:** Kuchli parol yarating (yozib qo'ying!)
5. **Database User Privileges:** Read and write to any database
6. **"Add User"** tugmasini bosing

## 4️⃣ Network Access Sozlash

1. **Security > Network Access** ga kiring
2. **"Add IP Address"** ni bosing
3. **"Allow Access from Anywhere"** ni tanlang
   - Yoki `0.0.0.0/0` kiriting
4. **"Confirm"** tugmasini bosing

## 5️⃣ Connection String Olish

1. **Database > Clusters** ga kiring
2. Clusteringizda **"Connect"** tugmasini bosing
3. **"Drivers"** ni tanlang
4. **Driver:** Node.js va **Version:** 4.1 or later
5. **Connection String** ni ko'chirib oling:

```
mongodb+srv://travelbliss_admin:<password>@travel-bliss-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## 6️⃣ Backend ga Ulash

1. `.env` faylni oching
2. `MONGODB_URI` ga connection stringni qo'ying
3. `<password>` o'rniga o'z parolingizni yozing:

```env
MONGODB_URI=mongodb+srv://travelbliss_admin:sizning_parolingiz@travel-bliss-cluster.xxxxx.mongodb.net/travel-bliss?retryWrites=true&w=majority
```

**MUHIM:**
- `<password>` o'rniga o'z parolingizni yozing
- Database nomini oxiriga qo'shing: `/travel-bliss`

## 7️⃣ Test Qilish

1. Serverni qayta ishga tushiring:
```bash
cd travel-bliss-backend
npm run dev
```

2. MongoDB ulanganligini tekshiring:
```
✅ MongoDB Connected: travel-bliss-cluster.xxxxx.mongodb.net
📊 Database Name: travel-bliss
```

## 8️⃣ MongoDB Atlas GUI da Ko'rish

1. **Database > Browse Collections** ga kiring
2. Database va collection larni ko'ring
3. Ma'lumotlarni qo'shish, o'chirish, o'zgartirish mumkin

---

## ✅ Tayyor!

Endi siz:
- ✅ MongoDB Atlas cloud database ga egasiz
- ✅ Backend ulanganligini ko'rasiz
- ✅ GUI orqali ma'lumotlarni boshqarasiz
- ✅ Bepul 512MB storage

---

## 🔐 Xavfsizlik Maslahatlar

1. **Parolni himoya qiling** - .env faylni git ga yuklamang
2. **IP Access** - Production da faqat kerakli IP larni ruxsat bering
3. **User Privileges** - Har bir user uchun minimal privileges bering

---

## 📞 Yordam

MongoDB Atlas ishlamasa:
1. **Connection String** to'g'ri ekanligini tekshiring
2. **Parol** da maxsus belgilar bo'lsa, URL encode qiling
3. **Network Access** da IP ruxsat etilganligini tekshiring
4. **Cluster Active** ekanligini tekshiring

---

## 🎯 Keyingi Qadam

Backend ishlayotgan bo'lsa, API ni test qiling:
```bash
POST http://localhost:5000/api/auth/register
```
