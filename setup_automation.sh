#!/bin/bash
"""
Nepal News Collection Automation Setup
======================================

Sets up automated news collection using cron (the professional way)
"""

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"

log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✓${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
    exit 1
}

create_directories() {
    log "Creating directories..."
    mkdir -p "$PROJECT_DIR/logs"
    mkdir -p "$PROJECT_DIR/cron_scripts"
    success "Directories created"
}

create_cron_wrapper() {
    log "Creating cron wrapper script..."

    cat > "$PROJECT_DIR/cron_scripts/run_news_collection.sh" << 'EOF'
#!/bin/bash
# Cron wrapper script for news collection
# This handles environment setup and logging

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Set up environment
cd "$PROJECT_DIR"

# Add timestamp to log
echo "========================================" >> logs/collection.log
echo "Collection run started: $(date)" >> logs/collection.log

# Run the collection with proper error handling
if python run_collections.py --all >> logs/collection.log 2>&1; then
    echo "Collection completed successfully: $(date)" >> logs/collection.log
    echo "SUCCESS: $(date)" >> logs/collection_status.log
else
    echo "Collection failed: $(date)" >> logs/collection.log
    echo "FAILED: $(date)" >> logs/collection_status.log
fi

echo "========================================" >> logs/collection.log
EOF

    chmod +x "$PROJECT_DIR/cron_scripts/run_news_collection.sh"
    success "Cron wrapper script created"
}

create_rss_only_wrapper() {
    log "Creating RSS-only cron wrapper..."

    cat > "$PROJECT_DIR/cron_scripts/run_rss_collection.sh" << 'EOF'
#!/bin/bash
# Lightweight RSS-only collection for hourly runs

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "RSS collection started: $(date)" >> logs/rss.log
if python run_collections.py --rss >> logs/rss.log 2>&1; then
    echo "RSS collection completed: $(date)" >> logs/rss.log
else
    echo "RSS collection failed: $(date)" >> logs/rss.log
fi
EOF

    chmod +x "$PROJECT_DIR/cron_scripts/run_rss_collection.sh"
    success "RSS wrapper script created"
}

show_cron_setup() {
    log "Cron setup instructions:"
    echo
    echo "To set up automated news collection, run:"
    echo -e "${GREEN}crontab -e${NC}"
    echo
    echo "Then add these lines:"
    echo -e "${YELLOW}"
    echo "# Nepal News Collection - Every 3 hours (comprehensive)"
    echo "0 */3 * * * $PROJECT_DIR/cron_scripts/run_news_collection.sh"
    echo
    echo "# RSS Collection - Every hour (lightweight)"
    echo "0 * * * * $PROJECT_DIR/cron_scripts/run_rss_collection.sh"
    echo
    echo "# Weekly deep clean and maintenance (optional)"
    echo "0 3 * * 0 $PROJECT_DIR/cron_scripts/run_news_collection.sh"
    echo -e "${NC}"
    echo
    echo "This will:"
    echo "• Run comprehensive collection (RSS + Facebook + Scraping) every 3 hours"
    echo "• Run quick RSS collection every hour"
    echo "• Run weekly maintenance on Sundays at 3 AM"
    echo
    echo "Logs will be saved to:"
    echo "• $PROJECT_DIR/logs/collection.log (main collection)"
    echo "• $PROJECT_DIR/logs/rss.log (RSS only)"
    echo "• $PROJECT_DIR/logs/collection_status.log (success/failure tracking)"
}

create_monitoring_script() {
    log "Creating monitoring script..."

    cat > "$PROJECT_DIR/check_collection_status.py" << 'EOF'
#!/usr/bin/env python3
"""
Simple monitoring script for news collection status
"""

import os
import sys
from datetime import datetime, timedelta
from pathlib import Path

def check_collection_status():
    """Check the status of our news collection system."""
    project_dir = Path(__file__).parent
    logs_dir = project_dir / "logs"

    print("🔍 Nepal News Collection Status Check")
    print("=" * 40)

    # Check if log directories exist
    if not logs_dir.exists():
        print("❌ No logs directory found - collection may not be running")
        return

    # Check main collection log
    main_log = logs_dir / "collection.log"
    if main_log.exists():
        # Get last few lines to see recent activity
        try:
            with open(main_log, 'r') as f:
                lines = f.readlines()

            if lines:
                print(f"📰 Main Collection Log (last update: {datetime.fromtimestamp(main_log.stat().st_mtime)})")
                # Show last 5 lines
                for line in lines[-5:]:
                    print(f"   {line.strip()}")
            else:
                print("📰 Main collection log is empty")
        except Exception as e:
            print(f"❌ Error reading main log: {e}")
    else:
        print("📰 No main collection log found")

    print()

    # Check RSS log
    rss_log = logs_dir / "rss.log"
    if rss_log.exists():
        print(f"📡 RSS Collection Log (last update: {datetime.fromtimestamp(rss_log.stat().st_mtime)})")
        try:
            with open(rss_log, 'r') as f:
                lines = f.readlines()
            if lines:
                for line in lines[-3:]:
                    print(f"   {line.strip()}")
            else:
                print("   RSS log is empty")
        except Exception as e:
            print(f"❌ Error reading RSS log: {e}")
    else:
        print("📡 No RSS collection log found")

    print()

    # Check status log
    status_log = logs_dir / "collection_status.log"
    if status_log.exists():
        print(f"✅ Status Log (last update: {datetime.fromtimestamp(status_log.stat().st_mtime)})")
        try:
            with open(status_log, 'r') as f:
                lines = f.readlines()
            if lines:
                # Count recent successes vs failures
                recent_lines = lines[-10:]  # Last 10 entries
                successes = len([l for l in recent_lines if 'SUCCESS' in l])
                failures = len([l for l in recent_lines if 'FAILED' in l])

                print(f"   Recent runs: {successes} successes, {failures} failures")

                # Show last status
                if lines:
                    last_status = lines[-1].strip()
                    print(f"   Last run: {last_status}")
            else:
                print("   Status log is empty")
        except Exception as e:
            print(f"❌ Error reading status log: {e}")
    else:
        print("✅ No status log found")

    print()

    # Check if cron is likely running
    print("⏰ Cron Status Check:")
    try:
        import subprocess
        result = subprocess.run(['crontab', '-l'], capture_output=True, text=True)
        if result.returncode == 0 and 'run_news_collection' in result.stdout:
            print("   ✅ Cron jobs appear to be configured")
            # Count how many Nepal news jobs
            job_count = result.stdout.count('run_news_collection') + result.stdout.count('run_rss_collection')
            print(f"   📋 Found {job_count} news collection cron jobs")
        else:
            print("   ⚠️  No Nepal news cron jobs found")
            print("   Run: crontab -e to set up automation")
    except Exception:
        print("   ⚠️  Could not check cron status")

    print()
    print("💡 To set up automation: python setup_automation.sh")
    print("💡 To run collection now: python run_collections.py --all")
    print("💡 To check logs: tail -f logs/collection.log")

if __name__ == "__main__":
    check_collection_status()
EOF

    chmod +x "$PROJECT_DIR/check_collection_status.py"
    success "Monitoring script created"
}

test_collection() {
    log "Testing collection system..."

    cd "$PROJECT_DIR"

    if python run_collections.py --verify; then
        success "Collection system verification passed"

        warning "Running a quick RSS test..."
        if python run_collections.py --rss; then
            success "RSS collection test completed"
        else
            warning "RSS collection test had issues (check logs)"
        fi
    else
        error "Collection system verification failed"
    fi
}

main() {
    echo "🚀 Setting up Nepal News Collection Automation"
    echo "=============================================="
    echo

    create_directories
    create_cron_wrapper
    create_rss_only_wrapper
    create_monitoring_script

    echo
    test_collection

    echo
    show_cron_setup

    echo
    success "Setup complete! 🎉"
    echo
    echo "Next steps:"
    echo "1. Run: crontab -e"
    echo "2. Add the cron lines shown above"
    echo "3. Monitor with: python check_collection_status.py"
    echo "4. Check logs with: tail -f logs/collection.log"
}

main "$@"