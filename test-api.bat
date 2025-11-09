@echo off
chcp 65001 > nul
echo.
echo ================================================
echo 🧪 TRAVEL BLISS BACKEND API TEST
echo ================================================
echo.

echo 📡 1. Server Holati Tekshiruv...
echo.
curl -s http://localhost:5000/api/health | jq .
echo.
echo ------------------------------------------------
echo.

echo 📊 2. Backend Status...
echo.
curl -s http://localhost:5000/api/demo/status | jq .
echo.
echo ------------------------------------------------
echo.

echo 👥 3. Demo Foydalanuvchilar...
echo.
curl -s http://localhost:5000/api/demo/users | jq .
echo.
echo ------------------------------------------------
echo.

echo ✅ Test tugadi!
echo.
pause
