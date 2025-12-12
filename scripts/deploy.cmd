@echo off
REM PROOFCHAIN - Vercel Deployment Script
REM Usage: deploy.cmd [app] [--prod]

setlocal enabledelayedexpansion

set APP=%1
set PROD=%2
set ROOT_DIR=%CD%
set FAILED=0
set SUCCESS=0

if "%APP%"=="" set APP=all
if "%PROD%"=="--prod" (
    set PROD_FLAG=--prod
    set MODE=PRODUCTION
) else (
    set PROD_FLAG=
    set MODE=PREVIEW
)

echo.
echo ========================================
echo   PROOFCHAIN - Vercel Deployment
echo ========================================
echo Mode: %MODE%

vercel --version >nul 2>&1
if errorlevel 1 (
    echo Vercel CLI not found. Install with: npm i -g vercel
    exit /b 1
)

if "%APP%"=="all" (
    call :deploy_app landing
    call :deploy_app issuer
    call :deploy_app verifier
    call :deploy_app admin
) else (
    call :deploy_app %APP%
)

echo.
echo ========================================
echo   Success: %SUCCESS% / Failed: %FAILED%
if %FAILED% GTR 0 exit /b 1
exit /b 0

:deploy_app
set APP_NAME=%1
echo.
echo --- Deploying %APP_NAME% ---

if not exist "%ROOT_DIR%\apps\%APP_NAME%\.vercel\project.json" (
    echo   Not linked. Run: vercel link --cwd apps/%APP_NAME%
    set /a FAILED+=1
    goto :eof
)

vercel %PROD_FLAG% --yes --cwd "%ROOT_DIR%\apps\%APP_NAME%"
if errorlevel 1 (
    echo   [FAIL] %APP_NAME%
    set /a FAILED+=1
) else (
    echo   [OK] %APP_NAME%
    set /a SUCCESS+=1
)
goto :eof
