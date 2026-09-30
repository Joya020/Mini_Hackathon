@echo off
echo ========================================================
echo Launching FoodShare - Smart Surplus Food Redistribution
echo ========================================================
echo.
echo Starting application in your default web browser...
start "" "%~dp0index.html"
echo.
echo Application launched! You can also serve it using:
echo    npx serve .
echo or
echo    python -m http.server 3000
echo.
pause
