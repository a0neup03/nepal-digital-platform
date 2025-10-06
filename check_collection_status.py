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
