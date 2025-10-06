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
