#!/bin/bash

# =============================================================================
# Database Reset Script for Local Development
# =============================================================================
# WARNING: This script will DELETE ALL DATA in your local database!
# This is ONLY for local development. NEVER run this in production!
# =============================================================================

set -e  # Exit on any error

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                    DATABASE RESET SCRIPT                           ║"
echo "║                                                                    ║"
echo "║  WARNING: This will DELETE ALL DATA in your local database!       ║"
echo "║  This script is ONLY for local development environments.          ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

# Check if running in production
if [ "$ASPNETCORE_ENVIRONMENT" = "Production" ]; then
    echo "❌ ERROR: This script cannot be run in Production!"
    exit 1
fi

# Navigate to the API directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_DIR="$SCRIPT_DIR/GigBartending.Api"

cd "$API_DIR"

echo "📍 Current directory: $(pwd)"
echo ""

# Check if dotnet-ef is installed
if ! command -v dotnet-ef &> /dev/null; then
    echo "❌ dotnet-ef is not installed."
    echo "Installing dotnet-ef tools..."
    dotnet tool install --global dotnet-ef --version 8.0.11
    echo "✅ dotnet-ef installed successfully"
    echo ""
fi

# Check if Docker container is running
echo "🔍 Checking if SQL Server Docker container is running..."
if ! docker ps | grep -q gigbartending-sqlserver; then
    echo "⚠️  SQL Server container is not running."
    echo "Starting Docker container..."
    cd "$SCRIPT_DIR"
    docker-compose up -d
    echo "⏳ Waiting 15 seconds for SQL Server to start..."
    sleep 15
    cd "$API_DIR"
    echo "✅ SQL Server container is now running"
else
    echo "✅ SQL Server container is already running"
fi
echo ""

# Step 1: Drop the database
echo "🗑️  Step 1: Dropping the database..."
dotnet ef database drop --force
echo "✅ Database dropped successfully"
echo ""

# Step 2: Apply migrations
echo "🔧 Step 2: Applying migrations..."
dotnet ef database update
echo "✅ Migrations applied successfully"
echo ""

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                  DATABASE RESET COMPLETED!                         ║"
echo "║                                                                    ║"
echo "║  ✅ Database has been dropped and recreated                        ║"
echo "║  ✅ All migrations have been applied                               ║"
echo "║                                                                    ║"
echo "║  Next step: Run 'npm run db:seed' to add sample data              ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
