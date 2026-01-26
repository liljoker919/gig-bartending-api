#!/bin/bash

# =============================================================================
# Database Migration Script for Local Development
# =============================================================================
# This script applies all pending migrations to your local database.
# Safe to run multiple times - only applies new migrations.
# =============================================================================

set -e  # Exit on any error

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                   DATABASE MIGRATION SCRIPT                        ║"
echo "║                                                                    ║"
echo "║  This script applies all pending migrations to the database.      ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

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

# Apply migrations
echo "🔧 Applying migrations..."
dotnet ef database update
echo ""

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                  MIGRATIONS APPLIED SUCCESSFULLY!                  ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
