# Laravel + Filament v4 O'rnatish Qo'llanmasi

## 1-qadam: XAMPP O'rnatish

### A. XAMPP Yuklab Olish
1. Brauzerda oching: https://www.apachefriends.org/download.html
2. **XAMPP for Windows** ni tanlang
3. PHP 8.2 yoki 8.3 versiyasini tanlang (tavsiya: 8.2.12)
4. Yuklab olingan faylni ishga tushiring: `xampp-windows-x64-8.2.12-0-VS16-installer.exe`

### B. O'rnatish Sozlamalari
1. O'rnatish joyini tanlang: `C:\xampp` (tavsiya)
2. Quyidagi komponentlarni belgilang:
   - ✅ Apache
   - ✅ MySQL
   - ✅ PHP
   - ✅ phpMyAdmin
   - ❌ Qolganlarini o'chirish mumkin

3. O'rnatish tugagandan keyin:
   - XAMPP Control Panel ni oching
   - **Apache** va **MySQL** ni Start qiling

---

## 2-qadam: Composer O'rnatish

### A. Composer Yuklab Olish
1. Brauzerda oching: https://getcomposer.org/download/
2. **Composer-Setup.exe** ni yuklab oling
3. Installer ni ishga tushiring

### B. O'rnatish Sozlamalari
1. PHP yo'lini tanlang: `C:\xampp\php\php.exe`
2. Proxy sozlamalarini tashlab o'tish mumkin
3. "Install" tugmasini bosing

### C. Tekshirish
Terminal ochib quyidagini yozing:
```bash
composer --version
```

---

## 3-qadam: MySQL Database Yaratish

1. Brauzerda oching: http://localhost/phpmyadmin
2. "New" tugmasini bosing
3. Database nomi: `travel_bliss`
4. Collation: `utf8mb4_unicode_ci`
5. "Create" tugmasini bosing

---

## 4-qadam: Laravel Loyihasi Yaratish

Terminal ochib quyidagi buyruqlarni bajaring:

```bash
cd C:\Users\ANUBIS PC

# Laravel loyihasi yaratish
composer create-project laravel/laravel travel-bliss

# Loyihaga o'tish
cd travel-bliss

# .env faylini sozlash
```

`.env` faylida quyidagilarni o'zgartiring:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=travel_bliss
DB_USERNAME=root
DB_PASSWORD=
```

Database migration:
```bash
php artisan migrate
```

---

## 5-qadam: Filament v4 O'rnatish

```bash
# Filament o'rnatish
composer require filament/filament:"^4.0"

# Filament panel yaratish
php artisan filament:install --panels

# Admin user yaratish
php artisan make:filament-user
```

Admin ma'lumotlarini kiriting:
- Name: Admin
- Email: admin@travelbliss.uz
- Password: o'zingizni parolingiz

---

## 6-qadam: Serverni Ishga Tushirish

```bash
php artisan serve
```

Brauzerda oching:
- Frontend: http://localhost:8000
- Admin Panel: http://localhost:8000/admin

---

## Qo'shimcha: Agar muammo bo'lsa

### PHP kengaytmalarini yoqish
`C:\xampp\php\php.ini` faylini oching va quyidagilarni uncomment qiling:
```ini
extension=fileinfo
extension=gd
extension=mbstring
extension=openssl
extension=pdo_mysql
extension=zip
```

---

Tayyor! Menga xabar bering qaysi qadamdasiz.
