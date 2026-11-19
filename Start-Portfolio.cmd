@echo off
setlocal
cd /d "%~dp0"
title Neural Aurora - Portfolio 2.0
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\start-portfolio.ps1"
if errorlevel 1 (
  echo.
  echo Launcher reported an error. Review the message above.
  pause
)
