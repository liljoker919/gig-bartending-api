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

# Detect docker compose command (docker-compose or docker compose)
DOCKER_COMPOSE_CMD=""
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
fi

# Check if Docker container is running
echo "🔍 Checking if SQL Server Docker container is running..."
if ! docker ps | grep -q gigbartending-sqlserver; then
    echo "⚠️  SQL Server container is not running."
    if [ -n "$DOCKER_COMPOSE_CMD" ]; then
        echo "Starting Docker container..."
        cd "$SCRIPT_DIR"
        $DOCKER_COMPOSE_CMD up -d
        echo "⏳ Waiting 15 seconds for SQL Server to start..."
        sleep 15
        cd "$API_DIR"
        echo "✅ SQL Server container is now running"
    else
        echo "❌ ERROR: Docker Compose is not available. Please install Docker Desktop or Docker Compose."
        exit 1
    fi
else
    echo "✅ SQL Server container is already running"
fi
echo ""

# Run the seed command
echo "🌱 Seeding database..."
dotnet run --seed-only
if [ $? -ne 0 ]; then
    echo "❌ Failed to seed database"
    exit 1
fi
echo "✅ Database seeded successfully"
echo ""

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                   DATABASE SEEDED SUCCESSFULLY!                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
