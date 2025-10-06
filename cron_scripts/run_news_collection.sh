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
