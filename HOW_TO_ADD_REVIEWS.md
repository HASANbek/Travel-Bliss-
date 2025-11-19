# Yangi Turga Review Qo'shish Yo'riqnomasi

## 1. Qayerga review qo'shish kerak?

Fayl: `public/gofly/tour-details.html`

Qator: **1987-2223** oralig'ida (loadReviews funksiyasi ichida)

## 2. Yangi tur uchun review qo'shish

### Misol: 5-turga review qo'shish

```javascript
// Tour 5: Yangi Tur Nomi reviews
'5': [
    {
        name: 'John_Smith',                    // Foydalanuvchi nomi
        location: 'London, UK',                 // Joylashuv
        avatar: 'https://i.pravatar.cc/150?img=20',  // Avatar rasmi (img raqamini o'zgartiring: 1-70)
        rating: 5,                              // Baho (1-5)
        date: 'Nov 2025',                       // Sana
        title: 'Amazing tour!',                 // Review sarlavhasi
        text: 'This tour was incredible...',   // Review matni
        helpful: 10                             // Helpful soni
    },
    {
        name: 'Maria_Garcia',
        location: 'Madrid, Spain',
        avatar: 'https://i.pravatar.cc/150?img=21',
        rating: 4,
        date: 'Oct 2025',
        title: 'Very good experience',
        text: 'Great organization and friendly guide...',
        helpful: 7
    }
],
```

## 3. Qayerga joylashtiriladi?

Review kodini quyidagi joyga qo'shing:

```javascript
// Tour 4: Grand Uzbekistan Tour reviews
'4': [
    // ... mavjud reviewlar
],
// YANGI TURNI SHU YERGA QO'SHING ↓
'5': [
    // Sizning yangi reviewlaringiz
],
// Default reviews for new tours
'default': [
```

## 4. Avatar rasmlari

Avatar uchun `img` raqamini 1 dan 70 gacha o'zgartiring:
- `https://i.pravatar.cc/150?img=1`
- `https://i.pravatar.cc/150?img=2`
- `https://i.pravatar.cc/150?img=3`
- va h.k.

## 5. Agar review qo'shmasangiz

Agar yangi turga maxsus review qo'shmasangiz, avtomatik ravishda **umumiy Travel Bliss reviewlari** ko'rinadi (3 ta default review).

## 6. Misol - To'liq kod

```javascript
const allReviews = {
    '1': [ /* Tour 1 reviewlar */ ],
    '2': [ /* Tour 2 reviewlar */ ],
    '3': [ /* Tour 3 reviewlar */ ],
    '4': [ /* Tour 4 reviewlar */ ],
    '5': [
        {
            name: 'Alice_Wonder',
            location: 'Sydney, Australia',
            avatar: 'https://i.pravatar.cc/150?img=25',
            rating: 5,
            date: 'Dec 2025',
            title: 'Perfect holiday!',
            text: 'Everything was organized perfectly. The guide was knowledgeable and friendly. Hotels were comfortable and food was delicious. Highly recommend Travel Bliss for anyone visiting Uzbekistan!',
            helpful: 15
        }
    ],
    'default': [ /* Default reviewlar */ ]
};
```

## 7. Saqlash va yangilash

1. Faylni saqlang (Ctrl+S)
2. Brauzerda sahifani yangilang (F5)
3. Yangi turga kiring va reviewlarni ko'ring

---

**Eslatma:** Agar yordam kerak bo'lsa, menga yozing!
