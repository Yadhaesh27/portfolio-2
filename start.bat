@echo off
setlocal enabledelayedexpansion
title Portfolio 2.0 - Neural Aurora (Port 5175)

cd /d "%~dp0"

echo ===================================================
echo   Portfolio 2.0 - Neural Aurora Development Server
echo   Target URL: http://localhost:5175/
echo ===================================================
echo.

where node >nul 2>&1
if errorlevel 1 goto NoNode

where npm >nul 2>&1
if errorlevel 1 goto NoNpm

if not exist "node_modules\" goto InstallDeps
goto StartServer

:InstallDeps
echo [INFO] First time setup: Installing dependencies...
echo Please wait while npm packages are installed...
echo.
call npm install
if errorlevel 1 goto InstallFailed
echo.
echo [SUCCESS] Dependencies installed successfully!
echo.
goto StartServer

:StartServer
echo Starting local development server...
echo Local URL: http://localhost:5175/
echo.
echo Press Ctrl+C in this window anytime to stop the server.
echo ===================================================
echo.

:: Launch browser in background after short delay so server has time to bind
start "" cmd /c "ping -n 3 127.0.0.1 >nul & start http://localhost:5175"

:: Run Vite dev server on port 5175
call npm run dev -- --port 5175

if errorlevel 1 goto ServerError
goto End

:NoNode
echo [ERROR] Node.js is not installed or not in your PATH.
echo Please install Node.js from https://nodejs.org/ and restart this file.
echo.
pause
exit /b 1

:NoNpm
echo [ERROR] npm was not found. Please verify your Node.js installation.
echo.
pause
exit /b 1

:InstallFailed
echo.
echo [ERROR] npm install failed. Please check your internet connection.
echo.
pause
exit /b 1

:ServerError
echo.
echo [WARNING] Development server stopped or encountered an error.
pause
exit /b 1

:End
