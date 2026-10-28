@echo off
title Scheme Saathi Launcher
echo ==============================================
echo   Starting Scheme Saathi (Server + Client)
echo ==============================================
echo.
start "Scheme Saathi Backend (Port 5000)" cmd /k "cd /d "%~dp0server" && npm start"
start "Scheme Saathi Frontend (Port 5173)" cmd /k "cd /d "%~dp0client" && npm run dev"
echo.
echo Launching your browser at http://localhost:5173...
timeout /t 3 /nobreak >nul
start http://localhost:5173
echo.
echo Application is running! Keep the terminal windows open while using.
