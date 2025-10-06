#!/bin/bash

echo "🇳🇵 LAUNCHING NEPAL DIGITAL PLATFORM"
echo "====================================="

# Kill any existing processes on these ports
echo "🧹 Cleaning up existing processes..."
lsof -ti:8505 | xargs kill -9 2>/dev/null || true
lsof -ti:8506 | xargs kill -9 2>/dev/null || true
lsof -ti:8507 | xargs kill -9 2>/dev/null || true

# Activate virtual environment
source nepal_env/bin/activate

echo ""
echo "🚀 Starting platforms..."

# Start News Dashboard
echo "📰 Starting News Dashboard on port 8505..."
streamlit run news_aggregator/nepal_dashboard.py --server.port=8505 --server.headless=true &
NEWS_PID=$!

# Start Office Tracker
echo "🏛️ Starting Office Tracker on port 8506..."
(cd office_tracker && python -m http.server 8506) &
OFFICE_PID=$!

# Start Political Game
echo "🎮 Starting Political Game on port 8507..."
(cd political_game && python -m http.server 8507) &
GAME_PID=$!

echo ""
echo "✅ All platforms launched successfully!"
echo ""
echo "📍 ACCESS URLS:"
echo "🌐 Landing Page: Open index.html in your browser"
echo "📰 News Dashboard: http://localhost:8505"
echo "🏛️ Office Tracker: http://localhost:8506/office-tracker-v2.html"
echo "🎮 Political Game: http://localhost:8507/nepal-optimized-strategy.html"
echo ""
echo "⏹️  To stop all platforms: killall streamlit && killall python"
echo ""
echo "🔄 Monitoring processes... (Press Ctrl+C to stop)"

# Wait for all background processes
wait $NEWS_PID $OFFICE_PID $GAME_PID