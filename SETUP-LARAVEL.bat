@echo off
chcp 65001 >nul
echo ========================================
echo TRAVEL BLISS - Laravel + Filament Setup
echo ========================================
echo.

echo ✅ Laravel Herd allaqachon o'rnatilgan!
echo 📍 Location: C:\Program Files\Herd\
echo.

echo 📋 KEYINGI QADAMLAR:
echo.
echo 1️⃣  Laravel Herd ni ishga tushiring:
echo    - Start Menu dan "Herd" ni toping
echo    - Yoki C:\Program Files\Herd\Herd.exe ni ishga tushiring
echo.
echo 2️⃣  Herd ochilgandan keyin:
echo    - Settings -^> PHP (PHP 8.2 yoki 8.3 tanlang)
echo    - Settings -^> Database (MySQL yoqing)
echo.
echo 3️⃣  Terminal ochib quyidagi buyruqlarni bajaring:
echo    cd C:\Users\ANUBIS PC
echo    composer create-project laravel/laravel travel-bliss
echo    cd travel-bliss
echo    composer require filament/filament:"^4.0"
echo    php artisan filament:install --panels
echo    php artisan make:filament-user
echo    php artisan serve
echo.
echo 4️⃣  Brauzerda oching:
echo    http://localhost:8000/admin
echo.
echo ========================================
echo.
echo ⚠️  MUAMMO BO'LSA:
echo.
echo SSL sertifikat muammosi tufayli avtomatik o'rnatish ishlamadi.
echo.
echo ✅ YECHIM 1 - Herd ishlatish (yuqoridagi qadamlar)
echo.
echo ✅ YECHIM 2 - XAMPP o'rnatish:
echo    1. https://www.apachefriends.org/download.html
echo    2. XAMPP for Windows (PHP 8.2) yuklab oling
echo    3. O'rnatgandan keyin LARAVEL-SETUP-GUIDE.md ni o'qing
echo.
echo ========================================
pause
