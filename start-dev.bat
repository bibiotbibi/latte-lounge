@echo off
echo ========================================
echo    LatteLounge Development Environment
echo ========================================
echo.

echo 🚀 Starting API Server on port 5000...
start "LatteLounge API Server" cmd /k "cd /d %~dp0 && echo Starting Express API Server... && node server/server.js"

echo ⏳ Waiting for API server to start...
timeout /t 5 /nobreak >nul

echo 🌐 Starting Next.js Development Server on port 3000...
start "LatteLounge Next.js App" cmd /k "cd /d %~dp0 && echo Starting Next.js App... && npm run dev"

echo.
echo ✅ Both servers are starting...
echo.
echo 📡 API Server: http://localhost:5000
echo 🌐 Next.js App: http://localhost:3000
echo 🧪 Test API: npm run test:api
echo.
echo 💡 Tips:
echo - Wait a few seconds for both servers to fully start
echo - The items page will show "API Offline" until the server is ready
echo - Check the API health indicator in the top-right corner
echo.
pause