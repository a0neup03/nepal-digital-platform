#!/usr/bin/env python3
"""
Nepal News Intelligence - Health Check Script
Monitors system health and alerts on issues
"""

import sqlite3
import sys
from datetime import datetime, timedelta
from pathlib import Path

# Configuration
DB_PATH = Path(__file__).parent.parent / 'nepal_news_intelligence.db'
MAX_HOURS_WITHOUT_ARTICLE = 24
MIN_ARTICLES_PER_DAY = 20

def check_database_exists():
    """Check if database file exists"""
    if not DB_PATH.exists():
        print(f"❌ CRITICAL: Database not found at {DB_PATH}")
        return False
    return True

def check_last_article_time():
    """Check when last article was collected"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT MAX(scraped_date) FROM articles_enhanced
        """)
        last_article = cursor.fetchone()[0]
        conn.close()

        if not last_article:
            print("❌ ERROR: No articles in database")
            return False

        last_time = datetime.fromisoformat(last_article)
        hours_ago = (datetime.now() - last_time).total_seconds() / 3600

        if hours_ago > MAX_HOURS_WITHOUT_ARTICLE:
            print(f"⚠️  WARNING: Last article {hours_ago:.1f} hours ago (threshold: {MAX_HOURS_WITHOUT_ARTICLE}h)")
            return False
        else:
            print(f"✅ Data Freshness: Last article {hours_ago:.1f} hours ago")
            return True

    except Exception as e:
        print(f"❌ ERROR checking last article: {e}")
        return False

def check_daily_collection_rate():
    """Check if we're collecting enough articles per day"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cutoff = datetime.now() - timedelta(days=1)
        cursor.execute("""
            SELECT COUNT(*) FROM articles_enhanced
            WHERE scraped_date >= ?
        """, (cutoff.isoformat(),))

        articles_24h = cursor.fetchone()[0]
        conn.close()

        if articles_24h < MIN_ARTICLES_PER_DAY:
            print(f"⚠️  WARNING: Only {articles_24h} articles in last 24h (minimum: {MIN_ARTICLES_PER_DAY})")
            return False
        else:
            print(f"✅ Collection Rate: {articles_24h} articles in last 24h")
            return True

    except Exception as e:
        print(f"❌ ERROR checking collection rate: {e}")
        return False

def check_source_diversity():
    """Check if we're getting data from multiple sources"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cutoff = datetime.now() - timedelta(days=1)
        cursor.execute("""
            SELECT COUNT(DISTINCT source_site) FROM articles_enhanced
            WHERE scraped_date >= ?
        """, (cutoff.isoformat(),))

        sources_24h = cursor.fetchone()[0]
        conn.close()

        if sources_24h < 3:
            print(f"⚠️  WARNING: Only {sources_24h} sources active in last 24h")
            return False
        else:
            print(f"✅ Source Diversity: {sources_24h} active sources")
            return True

    except Exception as e:
        print(f"❌ ERROR checking sources: {e}")
        return False

def check_database_size():
    """Check database size and growth"""
    try:
        db_size_mb = DB_PATH.stat().st_size / (1024 * 1024)

        if db_size_mb > 500:  # Alert if > 500MB
            print(f"⚠️  WARNING: Database size is {db_size_mb:.1f}MB (consider archiving)")
        else:
            print(f"✅ Database Size: {db_size_mb:.1f}MB")

        return True

    except Exception as e:
        print(f"❌ ERROR checking database size: {e}")
        return False

def main():
    """Run all health checks"""
    print("=" * 50)
    print("Nepal News Intelligence - Health Check")
    print(f"Time: {datetime.now().isoformat()}")
    print("=" * 50)

    checks = [
        ("Database Exists", check_database_exists),
        ("Last Article Time", check_last_article_time),
        ("Daily Collection Rate", check_daily_collection_rate),
        ("Source Diversity", check_source_diversity),
        ("Database Size", check_database_size),
    ]

    results = []
    for name, check_func in checks:
        print(f"\n{name}:")
        result = check_func()
        results.append(result)

    print("\n" + "=" * 50)
    passed = sum(results)
    total = len(results)
    print(f"Health Check Summary: {passed}/{total} checks passed")
    print("=" * 50)

    # Exit code: 0 = all pass, 1 = some warnings, 2 = critical failure
    if passed == total:
        print("✅ System is healthy")
        sys.exit(0)
    elif passed >= total - 1:
        print("⚠️  System has warnings")
        sys.exit(1)
    else:
        print("❌ System has critical issues")
        sys.exit(2)

if __name__ == "__main__":
    main()
