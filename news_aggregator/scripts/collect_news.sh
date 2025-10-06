#!/bin/bash
#
# Nepal News Intelligence - Automated Collection Script
# Runs news collection with comprehensive logging and error handling
#
# Usage: ./collect_news.sh [--test]
#

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Configuration
PROJECT_DIR="/Users/muna/Documents/Aryan/aryan_try/nepal_working_platform"
VENV_DIR="$PROJECT_DIR/nepal_env"
NEWS_DIR="$PROJECT_DIR/news_aggregator"
LOG_DIR="$NEWS_DIR/logs"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)
LOG_FILE="$LOG_DIR/cron_$DATE.log"
ERROR_LOG="$LOG_DIR/errors.log"

# Ensure directories exist
mkdir -p "$LOG_DIR"

# Function to log with timestamp
log() {
    echo "[$TIMESTAMP] $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo "[$TIMESTAMP] ERROR: $1" | tee -a "$LOG_FILE" "$ERROR_LOG"
}

# Start logging
log "========================================="
log "Starting Nepal News Collection"
log "========================================="

# Check if virtual environment exists
if [ ! -d "$VENV_DIR" ]; then
    log_error "Virtual environment not found at $VENV_DIR"
    exit 1
fi

# Activate virtual environment
log "Activating virtual environment..."
source "$VENV_DIR/bin/activate"

# Check Python version
PYTHON_VERSION=$(python --version 2>&1)
log "Using $PYTHON_VERSION"

# Change to news aggregator directory
cd "$NEWS_DIR" || {
    log_error "Failed to change to $NEWS_DIR"
    exit 1
}

# Check if collection script exists
if [ ! -f "comprehensive_rss_collector.py" ]; then
    log_error "Collection script not found: comprehensive_rss_collector.py"
    exit 1
fi

# Determine collection limit (test mode uses 10, production uses 100)
LIMIT=100
if [ "${1:-}" = "--test" ]; then
    LIMIT=10
    log "Running in TEST mode (limit: $LIMIT articles)"
fi

# Run collection with timeout (5 minutes max)
log "Starting collection (limit: $LIMIT articles)..."
START_TIME=$(date +%s)

# Check if timeout/gtimeout is available (Linux/macOS compatibility)
if command -v timeout &> /dev/null; then
    TIMEOUT_CMD="timeout 300"
elif command -v gtimeout &> /dev/null; then
    TIMEOUT_CMD="gtimeout 300"
else
    # macOS without coreutils - run without timeout
    log "⚠️  Warning: timeout command not available (install with 'brew install coreutils')"
    TIMEOUT_CMD=""
fi

# Run collection
if [ -n "$TIMEOUT_CMD" ]; then
    $TIMEOUT_CMD python comprehensive_rss_collector.py --limit "$LIMIT" >> "$LOG_FILE" 2>&1
    EXIT_CODE=$?
else
    python comprehensive_rss_collector.py --limit "$LIMIT" >> "$LOG_FILE" 2>&1
    EXIT_CODE=$?
fi

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

# Check exit status
if [ $EXIT_CODE -eq 0 ]; then
    log "✅ Collection successful (duration: ${DURATION}s)"

    # Count new articles
    NEW_ARTICLES=$(sqlite3 nepal_news_intelligence.db \
        "SELECT COUNT(*) FROM articles_enhanced WHERE scraped_date >= datetime('now', '-1 hour')" 2>/dev/null || echo "0")

    log "📰 New articles collected: $NEW_ARTICLES"

    # Update success counter
    echo "$TIMESTAMP|success|$NEW_ARTICLES|${DURATION}s" >> "$LOG_DIR/success_history.log"

elif [ $EXIT_CODE -eq 124 ] || [ $EXIT_CODE -eq 137 ]; then
    log_error "Collection timed out after 300 seconds"
    echo "$TIMESTAMP|timeout|0|300s" >> "$LOG_DIR/failure_history.log"
    exit 1
else
    log_error "Collection failed with exit code $EXIT_CODE"
    echo "$TIMESTAMP|failed|0|${DURATION}s|code_$EXIT_CODE" >> "$LOG_DIR/failure_history.log"
    exit 1
fi

# Database health check
log "Running database health check..."
DB_SIZE=$(du -h nepal_news_intelligence.db | cut -f1)
TOTAL_ARTICLES=$(sqlite3 nepal_news_intelligence.db \
    "SELECT COUNT(*) FROM articles_enhanced" 2>/dev/null || echo "0")
DISTINCT_SOURCES=$(sqlite3 nepal_news_intelligence.db \
    "SELECT COUNT(DISTINCT source_site) FROM articles_enhanced" 2>/dev/null || echo "0")

log "📊 Database stats:"
log "   - Size: $DB_SIZE"
log "   - Total articles: $TOTAL_ARTICLES"
log "   - Active sources: $DISTINCT_SOURCES"

# Check for stale data (no articles in 24 hours = warning)
LAST_ARTICLE=$(sqlite3 nepal_news_intelligence.db \
    "SELECT MAX(scraped_date) FROM articles_enhanced" 2>/dev/null || echo "")

if [ -n "$LAST_ARTICLE" ]; then
    # macOS compatible date parsing
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS uses -j -f for parsing
        LAST_EPOCH=$(date -j -f "%Y-%m-%d %H:%M:%S" "${LAST_ARTICLE/T/ }" +%s 2>/dev/null || echo "0")
    else
        # Linux uses -d for parsing
        LAST_EPOCH=$(date -d "$LAST_ARTICLE" +%s 2>/dev/null || echo "0")
    fi

    NOW_EPOCH=$(date +%s)
    HOURS_AGO=$(( (NOW_EPOCH - LAST_EPOCH) / 3600 ))

    if [ $HOURS_AGO -gt 24 ]; then
        log_error "⚠️  WARNING: Last article is $HOURS_AGO hours old"
    else
        log "✅ Data freshness: Last article $HOURS_AGO hours ago"
    fi
fi

# Cleanup old logs (keep last 30 days)
log "Cleaning up old logs..."
find "$LOG_DIR" -name "cron_*.log" -mtime +30 -delete 2>/dev/null || true
log "Cleanup complete"

log "========================================="
log "Collection finished successfully"
log "========================================="

exit 0
