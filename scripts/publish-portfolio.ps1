# Optional one-click Windows publisher. Vercel sign-in is still required on first use.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $root
function Stop-WithMessage([string]$message) {
  Write-Host "`nERROR: $message" -ForegroundColor Red
  exit 1
}
Write-Host "`n  NEURAL AURORA  |  Publish on Vercel" -ForegroundColor Cyan
Write-Host 'This will deploy your portfolio publicly, including your resume and contact information.' -ForegroundColor Yellow
if (-not (Get-Command 'node.exe' -ErrorAction SilentlyContinue) -or -not (Get-Command 'npm.cmd' -ErrorAction SilentlyContinue)) {
  Stop-WithMessage 'Install Node.js with npm from https://nodejs.org/ first.'
}
if (-not (Test-Path -LiteralPath (Join-Path $root 'node_modules/vite/bin/vite.js'))) {
  Write-Host 'Installing packages...' -ForegroundColor Cyan
  & npm.cmd install --no-audit --no-fund
  if ($LASTEXITCODE -ne 0) { Stop-WithMessage 'npm install failed. See errors above.' }
}
Write-Host "`nChecking the production build..." -ForegroundColor Cyan
& npm.cmd run build
if ($LASTEXITCODE -ne 0) { Stop-WithMessage 'The build failed. Fix the errors before publishing.' }
Write-Host "`nRunning Vercel deployment. Sign in and select your own Vercel account when prompted." -ForegroundColor Cyan
& npx.cmd --yes vercel@latest --prod
if ($LASTEXITCODE -ne 0) { Stop-WithMessage 'Vercel did not complete deployment. See the Vercel output above.' }
Write-Host "`nDeployment finished. Open the HTTPS URL printed above." -ForegroundColor Green
Read-Host 'Press Enter to close this window' | Out-Null
exit 0
