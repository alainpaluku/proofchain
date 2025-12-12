# PROOFCHAIN - Script de déploiement Vercel pour Monorepo

param(
    [string]$App = "all",
    [switch]$Production = $false
)

$ErrorActionPreference = "Continue"
$RootDir = Get-Location

$Apps = [ordered]@{
    "landing"  = "apps/landing"
    "verifier" = "apps/verifier"
    "issuer"   = "apps/issuer"
    "admin"    = "apps/admin"
}

function Deploy-App {
    param([string]$AppName, [string]$AppPath, [bool]$IsProd)
    
    Write-Host ""
    Write-Host "--- Deploying $AppName ---" -ForegroundColor Cyan
    
    $projectJsonPath = Join-Path $RootDir $AppPath ".vercel" "project.json"
    
    if (-not (Test-Path $projectJsonPath)) {
        Write-Host "  Not linked. Run: vercel link --cwd $AppPath" -ForegroundColor Yellow
        return $false
    }
    
    $fullAppPath = Join-Path $RootDir $AppPath
    
    try {
        if ($IsProd) {
            $result = & vercel --prod --yes --cwd $fullAppPath 2>&1
        } else {
            $result = & vercel --yes --cwd $fullAppPath 2>&1
        }
        
        $resultStr = $result -join "`n"
        
        if ($resultStr -match "(https://[^\s]+\.vercel\.app)") {
            Write-Host "  OK: $($Matches[1])" -ForegroundColor Green
            return $true
        } elseif ($resultStr -match "Error") {
            Write-Host "  Error: $resultStr" -ForegroundColor Red
            return $false
        } else {
            Write-Host "  $resultStr" -ForegroundColor Yellow
            return $true
        }
    }
    catch {
        Write-Host "  Error: $_" -ForegroundColor Red
        return $false
    }
}

# Main
Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "   PROOFCHAIN - Vercel Deployment" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta

$vercelVersion = & vercel --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Vercel CLI not found. Install with: npm i -g vercel" -ForegroundColor Red
    exit 1
}

$mode = if ($Production) { "PRODUCTION" } else { "PREVIEW" }
Write-Host "Mode: $mode" -ForegroundColor Yellow

$results = @{}

if ($App -eq "all") {
    foreach ($appName in $Apps.Keys) {
        $results[$appName] = Deploy-App -AppName $appName -AppPath $Apps[$appName] -IsProd $Production
    }
} elseif ($Apps.Contains($App)) {
    $results[$App] = Deploy-App -AppName $App -AppPath $Apps[$App] -IsProd $Production
} else {
    Write-Host "Unknown app: $App. Available: $($Apps.Keys -join ', ')" -ForegroundColor Red
    exit 1
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
$ok = 0; $fail = 0
foreach ($name in $results.Keys) {
    if ($results[$name]) { 
        Write-Host "  [OK]   $name" -ForegroundColor Green
        $ok++ 
    } else { 
        Write-Host "  [FAIL] $name" -ForegroundColor Red
        $fail++ 
    }
}

if ($fail -eq 0) {
    Write-Host "All deployments successful!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "$fail deployment(s) failed." -ForegroundColor Yellow
    exit 1
}
