@echo off
REM =============================================================================
REM Database Migration Script for Local Development (Windows)
REM =============================================================================
REM This script applies all pending migrations to your local database.
REM Safe to run multiple times - only applies new migrations.
REM =============================================================================

echo ╔════════════════════════════════════════════════════════════════════╗
echo ║                   DATABASE MIGRATION SCRIPT                        ║
echo ║                                                                    ║
echo ║  This script applies all pending migrations to the database.      ║
echo ╚════════════════════════════════════════════════════════════════════╝
echo.

REM Navigate to the API directory
cd "%~dp0GigBartending.Api"

echo 📍 Current directory: %CD%
echo.

REM Check if dotnet-ef is installed
where dotnet-ef >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ dotnet-ef is not installed.
    echo Installing dotnet-ef tools...
    dotnet tool install --global dotnet-ef --version 8.0.11
    echo ✅ dotnet-ef installed successfully
    echo.
)

REM Detect docker compose command
set DOCKER_COMPOSE_CMD=
where docker-compose >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    set DOCKER_COMPOSE_CMD=docker-compose
) else (
    docker compose version >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        set DOCKER_COMPOSE_CMD=docker compose
    )
)

REM Check if Docker container is running
echo 🔍 Checking if SQL Server Docker container is running...
docker ps | findstr gigbartending-sqlserver >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  SQL Server container is not running.
    if defined DOCKER_COMPOSE_CMD (
        echo Starting Docker container...
        cd "%~dp0"
        %DOCKER_COMPOSE_CMD% up -d
        echo ⏳ Waiting 15 seconds for SQL Server to start...
        timeout /t 15 /nobreak >nul
        cd "%~dp0GigBartending.Api"
        echo ✅ SQL Server container is now running
    ) else (
        echo ❌ ERROR: Docker Compose is not available. Please install Docker Desktop.
        exit /b 1
    )
) else (
    echo ✅ SQL Server container is already running
)
echo.

REM Apply migrations
echo 🔧 Applying migrations...
dotnet ef database update
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to apply migrations
    exit /b 1
)
echo.

echo ╔════════════════════════════════════════════════════════════════════╗
echo ║                  MIGRATIONS APPLIED SUCCESSFULLY!                  ║
echo ╚════════════════════════════════════════════════════════════════════╝

pause
