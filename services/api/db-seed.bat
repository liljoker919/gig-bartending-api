@echo off
REM =============================================================================
REM Database Seed Script for Local Development (Windows)
REM =============================================================================
REM This script seeds the database with sample data for development.
REM Safe to run multiple times - checks if data exists before seeding.
REM =============================================================================

echo ╔════════════════════════════════════════════════════════════════════╗
echo ║                     DATABASE SEED SCRIPT                           ║
echo ║                                                                    ║
echo ║  This script populates the database with sample data.             ║
echo ╚════════════════════════════════════════════════════════════════════╝
echo.

REM Navigate to the API directory
cd "%~dp0GigBartending.Api"

echo 📍 Current directory: %CD%
echo.

REM Check if Docker container is running
echo 🔍 Checking if SQL Server Docker container is running...
docker ps | findstr gigbartending-sqlserver >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  SQL Server container is not running.
    echo Starting Docker container...
    cd "%~dp0"
    docker-compose up -d
    echo ⏳ Waiting 15 seconds for SQL Server to start...
    timeout /t 15 /nobreak >nul
    cd "%~dp0GigBartending.Api"
    echo ✅ SQL Server container is now running
) else (
    echo ✅ SQL Server container is already running
)
echo.

REM Run the seed command
echo 🌱 Seeding database...
dotnet run --seed-only
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to seed database
    exit /b 1
)
echo.

echo ╔════════════════════════════════════════════════════════════════════╗
echo ║                   DATABASE SEEDED SUCCESSFULLY!                    ║
echo ╚════════════════════════════════════════════════════════════════════╝

pause
