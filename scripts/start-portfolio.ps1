# One-click Windows launcher. Run via Start-Portfolio.cmd from the extracted project.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $root
$site = 'http://127.0.0.1:5175/'

function Stop-WithMessage([string]$message) {
  Write-Host "`nERROR: $message" -ForegroundColor Red
  exit 1
}

Write-Host "`n  NEURAL AURORA  |  Portfolio 2.0" -ForegroundColor Cyan
Write-Host "  One-click local start`n"
if (-not (Get-Command 'node.exe' -ErrorAction SilentlyContinue)) {
  Stop-WithMessage 'Node.js is not installed or is not on PATH. Install Node.js 20.19+ or 22.12+ from https://nodejs.org/, then double-click Start-Portfolio.cmd again.'
}
if (-not (Get-Command 'npm.cmd' -ErrorAction SilentlyContinue)) {
  Stop-WithMessage 'npm was not found. Reinstall Node.js with npm enabled.'
}
if (-not (Test-Path -LiteralPath (Join-Path $root 'package.json'))) {
  Stop-WithMessage 'package.json was not found. Extract the entire ZIP before starting.'
}

if (-not (Test-Path -LiteralPath (Join-Path $root 'node_modules/vite/bin/vite.js'))) {
  Write-Host 'First launch: installing required packages. This needs an internet connection.' -ForegroundColor Yellow
  & npm.cmd install --no-audit --no-fund
  if ($LASTEXITCODE -ne 0) { Stop-WithMessage 'Package installation failed. Check your internet connection and the npm error above.' }
}

Write-Host "`nStarting the site..." -ForegroundColor Cyan
Write-Host 'Keep this window open while viewing your portfolio.'
$server = Start-Process -FilePath 'cmd.exe' -ArgumentList @('/d', '/c', 'npm.cmd run dev -- --host 127.0.0.1 --port 5175 --strictPort') -WorkingDirectory $root -NoNewWindow -PassThru
$ready = $false
for ($i = 0; $i -lt 80; $i++) {
  Start-Sleep -Milliseconds 500
  $server.Refresh()
  if ($server.HasExited) { break }
  try {
    $response = Invoke-WebRequest -Uri $site -UseBasicParsing -TimeoutSec 2
    if ($response.StatusCode -eq 200) { $ready = $true; break }
  } catch { }
}
if ($ready) {
  Write-Host "`nSite ready at $site" -ForegroundColor Green
  Start-Process $site
  Write-Host 'Your default browser has been opened. Close this window or press Ctrl+C to stop.'
} else {
  Write-Host "`nThe site did not respond at $site. Check the terminal output above." -ForegroundColor Yellow
  Write-Host 'Port 5175 may already be in use by another application.'
}
if (-not $server.HasExited) { $server.WaitForExit() }
if (-not $ready -or $server.ExitCode -ne 0) { exit 1 }
exit 0
