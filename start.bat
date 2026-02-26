@echo off
echo ============================================
echo  KMC 3D React - Instalacion y arranque
echo ============================================
cd /d "%~dp0"

echo [1/2] Instalando dependencias...
npm install

echo.
echo [2/2] Iniciando servidor de desarrollo...
npm run dev
