#!/bin/bash
#
# Setup Cron Jobs for Nepal News Intelligence
# This script helps you set up automated news collection
#

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the absolute path to this script's directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"

echo "========================================"
echo "Nepal News Intelligence - Cron Setup"
echo "========================================"
echo ""
echo "Project Directory: $PROJECT_DIR"
echo ""

# Check if collection script exists
if [ ! -f "$SCRIPT_DIR/collect_news.sh" ]; then
    echo -e "${RED}ERROR: collect_news.sh not found!${NC}"
    exit 1
fi

# Make sure it's executable
chmod +x "$SCRIPT_DIR/collect_news.sh"

echo "Collection script: $SCRIPT_DIR/collect_news.sh ✅"
echo ""

# Test the collection script
echo "Testing collection script..."
if "$SCRIPT_DIR/collect_news.sh" --test > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Collection script test successful${NC}"
else
    echo -e "${RED}❌ Collection script test failed${NC}"
    echo "Please fix the script before setting up cron"
    exit 1
fi

echo ""
echo "========================================"
echo "Cron Job Configuration"
echo "========================================"
echo ""
echo "The following cron jobs will be added:"
echo ""
echo "1. Morning Collection (6:00 AM Nepal Time)"
echo "   → 15 0 * * * $SCRIPT_DIR/collect_news.sh"
echo ""
echo "2. Midday Collection (12:00 PM Nepal Time)"
echo "   → 15 6 * * * $SCRIPT_DIR/collect_news.sh"
echo ""
echo "3. Evening Collection (6:00 PM Nepal Time)"
echo "   → 15 12 * * * $SCRIPT_DIR/collect_news.sh"
echo ""
echo "4. Health Check (Every 6 hours)"
echo "   → 0 */6 * * * $SCRIPT_DIR/health_check.py >> $SCRIPT_DIR/../logs/health.log"
echo ""

# Ask for confirmation
read -p "Do you want to add these cron jobs? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted. No changes made."
    exit 0
fi

# Create temporary cron file
TEMP_CRON=$(mktemp)

# Get existing crontab (if any)
crontab -l > "$TEMP_CRON" 2>/dev/null || true

# Check if our jobs already exist
if grep -q "collect_news.sh" "$TEMP_CRON"; then
    echo -e "${YELLOW}Warning: Collection jobs already exist in crontab${NC}"
    read -p "Do you want to replace them? (y/n) " -n 1 -r
    echo ""

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Remove old jobs
        grep -v "collect_news.sh" "$TEMP_CRON" > "$TEMP_CRON.new"
        mv "$TEMP_CRON.new" "$TEMP_CRON"
    else
        echo "Keeping existing jobs. Aborted."
        rm "$TEMP_CRON"
        exit 0
    fi
fi

# Add header comment
echo "" >> "$TEMP_CRON"
echo "# Nepal News Intelligence - Automated Collection" >> "$TEMP_CRON"
echo "# Added: $(date)" >> "$TEMP_CRON"

# Add morning collection (6 AM Nepal = 00:15 UTC)
echo "15 0 * * * $SCRIPT_DIR/collect_news.sh" >> "$TEMP_CRON"

# Add midday collection (12 PM Nepal = 06:15 UTC)
echo "15 6 * * * $SCRIPT_DIR/collect_news.sh" >> "$TEMP_CRON"

# Add evening collection (6 PM Nepal = 12:15 UTC)
echo "15 12 * * * $SCRIPT_DIR/collect_news.sh" >> "$TEMP_CRON"

# Add health check (every 6 hours)
echo "0 */6 * * * $SCRIPT_DIR/health_check.py >> $SCRIPT_DIR/../logs/health.log 2>&1" >> "$TEMP_CRON"

# Install new crontab
crontab "$TEMP_CRON"
rm "$TEMP_CRON"

echo ""
echo -e "${GREEN}✅ Cron jobs installed successfully!${NC}"
echo ""
echo "Installed jobs:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
crontab -l | grep -A 4 "Nepal News Intelligence"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "To view all cron jobs: crontab -l"
echo "To edit cron jobs: crontab -e"
echo "To remove all cron jobs: crontab -r"
echo ""
echo "Logs will be saved to: $SCRIPT_DIR/../logs/"
echo ""
echo "Next scheduled runs:"
echo "- Morning: Tomorrow 6:00 AM Nepal Time"
echo "- Midday: Today/Tomorrow 12:00 PM Nepal Time"
echo "- Evening: Today/Tomorrow 6:00 PM Nepal Time"
echo ""
echo -e "${GREEN}Setup complete! 🎉${NC}"
