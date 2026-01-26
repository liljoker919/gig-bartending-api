#!/bin/bash

# =============================================================================
# Database Seed Script for Local Development
# =============================================================================
# This script seeds the database with sample data for development.
# Safe to run multiple times - checks if data exists before seeding.
# =============================================================================

set -e  # Exit on any error

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                     DATABASE SEED SCRIPT                           ║"
echo "║                                                                    ║"
echo "║  This script populates the database with sample data.             ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

# Navigate to the API directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_DIR="$SCRIPT_DIR/GigBartending.Api"

cd "$API_DIR"

echo "📍 Current directory: $(pwd)"
echo ""

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

# Run the seed command
echo "🌱 Seeding database..."
dotnet run --seed-only
echo ""

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                   DATABASE SEEDED SUCCESSFULLY!                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
