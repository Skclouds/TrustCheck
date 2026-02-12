@echo off
echo ========================================
echo   Starting TrustCheck Application
echo ========================================
echo.
echo Starting Backend and Frontend servers...
echo.

cd server
start "TrustCheck Backend" cmd /k "npm run dev"

timeout /t 2 /nobreak >nul

cd ..\client\trustcheck
start "TrustCheck Frontend" cmd /k "npm start"

echo.
echo ========================================
echo   Both servers are starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Close the server windows to stop the servers.
echo.
pause
