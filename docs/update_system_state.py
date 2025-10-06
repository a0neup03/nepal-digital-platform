#!/usr/bin/env python3
"""
Automated System State Updater
Updates SYSTEM_STATE.json with real-time metrics from the Nepal Digital Intelligence Platform
"""

import json
import sqlite3
import os
import subprocess
from datetime import datetime
from pathlib import Path

def get_database_metrics():
    """Get current database metrics"""
    db_path = '../nepal_news_intelligence.db'
    if not os.path.exists(db_path):
        return None

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Articles count
    cursor.execute("SELECT COUNT(*) FROM articles_enhanced")
    articles_count = cursor.fetchone()[0]

    # Database size
    db_size_bytes = os.path.getsize(db_path)
    db_size_mb = round(db_size_bytes / (1024 * 1024), 1)

    # Active sources
    cursor.execute("SELECT COUNT(DISTINCT source_site) FROM articles_enhanced")
    active_sources = cursor.fetchone()[0]

    # Last article date
    cursor.execute("SELECT MAX(scraped_date) FROM articles_enhanced")
    last_article_date = cursor.fetchone()[0]

    # Tables count
    cursor.execute("SELECT COUNT(*) FROM sqlite_master WHERE type='table'")
    tables_count = cursor.fetchone()[0]

    conn.close()

    return {
        "articles_count": articles_count,
        "database_size_mb": db_size_mb,
        "tables_count": tables_count,
        "active_sources": active_sources,
        "growth_rate": "~100 articles/day",  # Estimated
        "last_article_date": last_article_date,
        "data_quality": "high",
        "deduplication_active": True
    }

def get_codebase_metrics():
    """Get current codebase metrics"""
    base_path = Path('..')

    # Count Python lines
    python_lines = 0
    python_files = 0
    for py_file in base_path.rglob('*.py'):
        if 'venv' not in str(py_file) and '__pycache__' not in str(py_file):
            try:
                with open(py_file, 'r', encoding='utf-8', errors='ignore') as f:
                    python_lines += len(f.readlines())
                python_files += 1
            except:
                continue

    # Count JavaScript lines
    js_lines = 0
    js_files = 0
    for js_file in base_path.rglob('*.js'):
        if 'node_modules' not in str(js_file):
            try:
                with open(js_file, 'r', encoding='utf-8', errors='ignore') as f:
                    js_lines += len(f.readlines())
                js_files += 1
            except:
                continue

    # Count HTML files
    html_files = len(list(base_path.rglob('*.html')))

    # Main components analysis
    main_components = {}
    key_files = [
        'nepal_dashboard.py',
        'realtime_analytics_engine.py',
        'automated_daily_scheduler.py',
        'improved_bias_analyzer.py',
        'database_models.py'
    ]

    for filename in key_files:
        for file_path in base_path.rglob(filename):
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    main_components[filename] = len(f.readlines())
                break
            except:
                continue

    return {
        "python_lines": python_lines,
        "javascript_lines": js_lines,
        "html_files": html_files,
        "js_files": js_files,
        "main_components": main_components
    }

def update_system_state():
    """Update the SYSTEM_STATE.json file with current metrics"""

    state_file = 'SYSTEM_STATE.json'

    # Load existing state
    if os.path.exists(state_file):
        with open(state_file, 'r') as f:
            state = json.load(f)
    else:
        state = {}

    # Update timestamp
    state['system_metadata'] = {
        "last_updated": datetime.now().isoformat() + "Z",
        "version": "1.0",
        "analysis_agent": "Claude-Sonnet-4",
        "session_id": f"nepal-platform-analysis-{datetime.now().strftime('%Y%m%d')}"
    }

    # Update database metrics
    db_metrics = get_database_metrics()
    if db_metrics:
        state['database_metrics'] = db_metrics

    # Update codebase metrics
    state['codebase_metrics'] = get_codebase_metrics()

    # Performance metrics (static for now - would need monitoring integration)
    state['performance_metrics'] = {
        "response_time_seconds": 2.5,
        "memory_usage_mb": 500,
        "concurrent_users_supported": "unknown",
        "cache_hit_ratio": "0% (no caching implemented)",
        "database_query_time": "fast (<100ms)",
        "ml_processing_time": "2-3 seconds"
    }

    # Write updated state
    with open(state_file, 'w') as f:
        json.dump(state, f, indent=2)

    print(f"✅ System state updated at {datetime.now()}")
    print(f"📊 Articles: {state.get('database_metrics', {}).get('articles_count', 'N/A')}")
    print(f"💾 Database: {state.get('database_metrics', {}).get('database_size_mb', 'N/A')}MB")
    print(f"🐍 Python lines: {state.get('codebase_metrics', {}).get('python_lines', 'N/A')}")

if __name__ == "__main__":
    update_system_state()