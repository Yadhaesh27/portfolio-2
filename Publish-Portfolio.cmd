@echo off
setlocal
cd /d "%~dp0"
title Neural Aurora - Publish to Vercel
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\publish-portfolio.ps1"
if errorlevel 1 (
  echo.
  echo Publishing did not finish. Review the message above.
  pause
)
