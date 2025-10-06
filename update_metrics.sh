#!/bin/bash
# Quick metrics update script for Nepal Digital Intelligence Platform

echo "🔄 Updating system metrics..."

cd docs
python3 update_system_state.py

echo ""
echo "📋 Current System Overview:"
echo "=========================="

# Extract key metrics from JSON
if command -v jq &> /dev/null; then
    echo "📊 Articles: $(cat SYSTEM_STATE.json | jq -r '.database_metrics.articles_count')"
    echo "💾 Database: $(cat SYSTEM_STATE.json | jq -r '.database_metrics.database_size_mb')MB"
    echo "📈 Active Sources: $(cat SYSTEM_STATE.json | jq -r '.database_metrics.active_sources')"
    echo "🐍 Python Files Lines: $(cat SYSTEM_STATE.json | jq -r '.codebase_metrics.python_lines')"
    echo "🔧 Main Components:"
    echo "   - nepal_dashboard.py: $(cat SYSTEM_STATE.json | jq -r '.codebase_metrics.main_components.\"nepal_dashboard.py\"') lines"
    echo "   - realtime_analytics_engine.py: $(cat SYSTEM_STATE.json | jq -r '.codebase_metrics.main_components.\"realtime_analytics_engine.py\"') lines"
else
    echo "💡 Install jq for formatted output: brew install jq"
    echo "📄 Full metrics available in docs/SYSTEM_STATE.json"
fi

echo ""
echo "✅ Metrics updated successfully!"