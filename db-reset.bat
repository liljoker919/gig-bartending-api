@echo off
REM =============================================================================
REM Database Reset Script for Local Development (Windows)
REM =============================================================================
REM WARNING: This script will DELETE ALL DATA in your local database!
REM This is ONLY for local development. NEVER run this in production!
REM =============================================================================

echo ╔════════════════════════════════════════════════════════════════════╗
echo ║                    DATABASE RESET SCRIPT                           ║
echo ║                                                                    ║
echo ║  WARNING: This will DELETE ALL DATA in your local database!       ║
echo ║  This script is ONLY for local development environments.          ║
echo ║                                                                    ║
echo ╚════════════════════════════════════════════════════════════════════╝
echo.

REM Check if running in production
if "%ASPNETCORE_ENVIRONMENT%"=="Production" (
    echo ❌ ERROR: This script cannot be run in Production!
    exit /b 1
)

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

REM Step 1: Drop the database
echo 🗑️  Step 1: Dropping the database...
dotnet ef database drop --force
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to drop database
    exit /b 1
)
echo ✅ Database dropped successfully
echo.

REM Step 2: Apply migrations
echo 🔧 Step 2: Applying migrations...
dotnet ef database update
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to apply migrations
    exit /b 1
)
echo ✅ Migrations applied successfully
echo.

echo ╔════════════════════════════════════════════════════════════════════╗
echo ║                  DATABASE RESET COMPLETED!                         ║
echo ║                                                                    ║
echo ║  ✅ Database has been dropped and recreated                        ║
echo ║  ✅ All migrations have been applied                               ║
echo ║                                                                    ║
echo ║  Next step: Run 'npm run db:seed' to add sample data              ║
echo ╚════════════════════════════════════════════════════════════════════╝

pause
