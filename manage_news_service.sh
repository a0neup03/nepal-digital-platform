#!/bin/bash
"""
Nepal News Collection Service Manager
====================================

Simple service management script for the news collection service.

Usage:
    ./manage_news_service.sh start    # Start the collection service
    ./manage_news_service.sh stop     # Stop the collection service
    ./manage_news_service.sh status   # Check service status
    ./manage_news_service.sh restart  # Restart the service
    ./manage_news_service.sh collect  # Run single collection
"""

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVICE_SCRIPT="$SCRIPT_DIR/news_collector_service.py"
LOG_DIR="$SCRIPT_DIR/collector_service/logs"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

check_requirements() {
    log "Checking requirements..."

    # Check Python
    if ! command -v python3 &> /dev/null; then
        error "Python3 is required but not installed"
    fi

    # Check service script
    if [ ! -f "$SERVICE_SCRIPT" ]; then
        error "Service script not found: $SERVICE_SCRIPT"
    fi

    # Check database
    DB_PATH="$SCRIPT_DIR/news_aggregator/nepal_news_intelligence.db"
    if [ ! -f "$DB_PATH" ]; then
        warning "Main database not found at: $DB_PATH"
        warning "Make sure the news aggregator has been run at least once"
    fi

    # Check working collector
    COLLECTOR_PATH="/Users/muna/Documents/Aryan/aryan_try/ratenepal/nepal_news_aggregator/optimized_full_collector.py"
    if [ ! -f "$COLLECTOR_PATH" ]; then
        error "Working collector not found at: $COLLECTOR_PATH"
    fi

    success "Requirements check passed"
}

start_service() {
    log "Starting Nepal News Collection Service..."
    check_requirements

    # Create log directory
    mkdir -p "$LOG_DIR"

    # Start service in background
    python3 "$SERVICE_SCRIPT" --start --interval 2 > "$LOG_DIR/service_start.log" 2>&1 &
    SERVICE_PID=$!

    # Wait a moment to check if it started successfully
    sleep 3

    if kill -0 $SERVICE_PID 2>/dev/null; then
        success "Service started successfully (PID: $SERVICE_PID)"
        success "Logs available in: $LOG_DIR"
        success "Collection will run every 2 hours"
    else
        error "Service failed to start. Check logs in: $LOG_DIR/service_start.log"
    fi
}

stop_service() {
    log "Stopping Nepal News Collection Service..."

    python3 "$SERVICE_SCRIPT" --stop

    if [ $? -eq 0 ]; then
        success "Service stopped successfully"
    else
        warning "Service may not have been running"
    fi
}

status_service() {
    log "Checking Nepal News Collection Service status..."

    python3 "$SERVICE_SCRIPT" --status

    # Also check for recent logs
    if [ -d "$LOG_DIR" ]; then
        echo
        log "Recent log entries:"
        if [ -f "$LOG_DIR/collector.log" ]; then
            tail -5 "$LOG_DIR/collector.log" 2>/dev/null || true
        else
            warning "No log file found yet"
        fi
    fi
}

collect_once() {
    log "Running single news collection..."
    check_requirements

    python3 "$SERVICE_SCRIPT" --collect

    if [ $? -eq 0 ]; then
        success "Collection completed successfully"
    else
        error "Collection failed"
    fi
}

restart_service() {
    log "Restarting Nepal News Collection Service..."
    stop_service
    sleep 2
    start_service
}

show_usage() {
    echo "Nepal News Collection Service Manager"
    echo
    echo "Usage: $0 {start|stop|status|restart|collect|logs|help}"
    echo
    echo "Commands:"
    echo "  start    - Start the collection service (runs every 2 hours)"
    echo "  stop     - Stop the collection service"
    echo "  status   - Show service status and recent activity"
    echo "  restart  - Restart the service"
    echo "  collect  - Run a single collection immediately"
    echo "  logs     - Show recent log entries"
    echo "  help     - Show this help message"
    echo
    echo "Examples:"
    echo "  $0 start     # Start automated collection"
    echo "  $0 collect   # Run collection once"
    echo "  $0 status    # Check if service is running"
}

show_logs() {
    if [ -d "$LOG_DIR" ]; then
        log "Recent collector logs:"
        if [ -f "$LOG_DIR/collector.log" ]; then
            tail -20 "$LOG_DIR/collector.log"
        else
            warning "No collector log file found"
        fi
    else
        warning "Log directory not found: $LOG_DIR"
    fi
}

# Main command processing
case "${1:-}" in
    start)
        start_service
        ;;
    stop)
        stop_service
        ;;
    status)
        status_service
        ;;
    restart)
        restart_service
        ;;
    collect)
        collect_once
        ;;
    logs)
        show_logs
        ;;
    help|--help|-h)
        show_usage
        ;;
    *)
        show_usage
        exit 1
        ;;
esac