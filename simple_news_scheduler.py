#!/usr/bin/env python3
"""
Simple News Collection Scheduler
================================

Automated scheduler for our existing working_multi_source_collector.py
Runs collection every few hours and logs results.

Usage:
    python simple_news_scheduler.py --start     # Start background scheduler
    python simple_news_scheduler.py --run-once  # Run collection once
    python simple_news_scheduler.py --stop      # Stop scheduler
    python simple_news_scheduler.py --status    # Check status
"""

import os
import sys
import time
import logging
import argparse
import subprocess
import signal
import threading
from datetime import datetime, timedelta
from pathlib import Path

# Add news_aggregator to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'news_aggregator'))

try:
    from working_multi_source_collector import WorkingMultiSourceCollector
except ImportError as e:
    print(f"Error: Could not import collector: {e}")
    print("Make sure working_multi_source_collector.py exists in news_aggregator/")
    sys.exit(1)


class SimpleNewsScheduler:
    """Simple scheduler that runs our existing collector periodically."""

    def __init__(self, interval_hours=3):
        self.interval_hours = interval_hours
        self.is_running = False
        self.scheduler_thread = None
        self.pid_file = Path("news_scheduler.pid")

        # Setup logging
        self.setup_logging()

        # Initialize collector
        self.collector = WorkingMultiSourceCollector(db_path='news_aggregator/nepal_news_intelligence.db')

    def setup_logging(self):
        """Setup simple logging."""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('news_scheduler.log'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger('scheduler')

    def run_collection(self):
        """Run the news collection using our existing collector."""
        try:
            self.logger.info("Starting news collection...")
            start_time = time.time()

            # Use our existing collector's main collection method
            total_collected = self.collector.collect_all_sources()

            duration = time.time() - start_time
            self.logger.info(f"Collection completed in {duration:.1f}s - {total_collected} articles collected")

            return total_collected

        except Exception as e:
            self.logger.error(f"Collection failed: {e}")
            return 0

    def scheduler_loop(self):
        """Main scheduler loop that runs in background."""
        self.logger.info(f"Scheduler started - collecting every {self.interval_hours} hours")

        # Run initial collection
        self.run_collection()

        while self.is_running:
            try:
                # Sleep for the interval
                sleep_time = self.interval_hours * 3600  # Convert to seconds
                self.logger.info(f"Next collection in {self.interval_hours} hours...")

                # Sleep in chunks so we can check is_running
                for _ in range(int(sleep_time / 60)):  # Check every minute
                    if not self.is_running:
                        break
                    time.sleep(60)

                if self.is_running:
                    self.run_collection()

            except Exception as e:
                self.logger.error(f"Scheduler error: {e}")
                time.sleep(300)  # Wait 5 minutes on error

    def start_scheduler(self):
        """Start the background scheduler."""
        if self.is_running_check():
            self.logger.warning("Scheduler is already running")
            return

        self.logger.info("Starting news collection scheduler...")

        # Write PID file
        with open(self.pid_file, 'w') as f:
            f.write(str(os.getpid()))

        self.is_running = True
        self.scheduler_thread = threading.Thread(target=self.scheduler_loop, daemon=True)
        self.scheduler_thread.start()

        # Set up signal handlers for graceful shutdown
        signal.signal(signal.SIGINT, self._signal_handler)
        signal.signal(signal.SIGTERM, self._signal_handler)

        try:
            # Keep main thread alive
            while self.is_running:
                time.sleep(1)
        except KeyboardInterrupt:
            self.stop_scheduler()

    def stop_scheduler(self):
        """Stop the scheduler."""
        self.logger.info("Stopping scheduler...")
        self.is_running = False

        if self.scheduler_thread and self.scheduler_thread.is_alive():
            self.scheduler_thread.join(timeout=5)

        # Remove PID file
        if self.pid_file.exists():
            self.pid_file.unlink()

        self.logger.info("Scheduler stopped")

    def _signal_handler(self, signum, frame):
        """Handle shutdown signals."""
        self.logger.info(f"Received signal {signum}, shutting down...")
        self.stop_scheduler()
        sys.exit(0)

    def is_running_check(self):
        """Check if scheduler is already running."""
        if not self.pid_file.exists():
            return False

        try:
            with open(self.pid_file, 'r') as f:
                pid = int(f.read().strip())

            # Check if process is still running
            os.kill(pid, 0)
            return True
        except (OSError, ValueError):
            # Process not running or invalid PID
            if self.pid_file.exists():
                self.pid_file.unlink()
            return False

    def get_status(self):
        """Get scheduler status."""
        if self.is_running_check():
            try:
                with open(self.pid_file, 'r') as f:
                    pid = f.read().strip()

                # Check log file for last collection
                log_file = Path('news_scheduler.log')
                if log_file.exists():
                    with open(log_file, 'r') as f:
                        lines = f.readlines()

                    # Find last collection
                    last_collection = None
                    for line in reversed(lines[-50:]):  # Check last 50 lines
                        if 'Collection completed' in line:
                            last_collection = line.strip()
                            break

                return {
                    'status': 'RUNNING',
                    'pid': pid,
                    'interval_hours': self.interval_hours,
                    'last_collection': last_collection
                }
            except Exception as e:
                return {'status': 'ERROR', 'error': str(e)}
        else:
            return {'status': 'STOPPED'}


def main():
    parser = argparse.ArgumentParser(description='Simple News Collection Scheduler')
    parser.add_argument('--start', action='store_true', help='Start the scheduler')
    parser.add_argument('--stop', action='store_true', help='Stop the scheduler')
    parser.add_argument('--status', action='store_true', help='Check scheduler status')
    parser.add_argument('--run-once', action='store_true', help='Run collection once and exit')
    parser.add_argument('--interval', type=int, default=3, help='Hours between collections (default: 3)')

    args = parser.parse_args()

    if not any([args.start, args.stop, args.status, args.run_once]):
        parser.print_help()
        return

    scheduler = SimpleNewsScheduler(interval_hours=args.interval)

    if args.status:
        status = scheduler.get_status()
        print(f"Scheduler Status: {status['status']}")
        if status['status'] == 'RUNNING':
            print(f"PID: {status['pid']}")
            print(f"Interval: {status['interval_hours']} hours")
            if status.get('last_collection'):
                print(f"Last collection: {status['last_collection']}")
        elif status['status'] == 'ERROR':
            print(f"Error: {status['error']}")

    elif args.run_once:
        print("Running single news collection...")
        count = scheduler.run_collection()
        print(f"Collected {count} articles")

    elif args.start:
        if scheduler.is_running_check():
            print("Scheduler is already running")
        else:
            print(f"Starting scheduler (collecting every {args.interval} hours)...")
            scheduler.start_scheduler()

    elif args.stop:
        if not scheduler.is_running_check():
            print("Scheduler is not running")
        else:
            # Send stop signal to running process
            try:
                with open(scheduler.pid_file, 'r') as f:
                    pid = int(f.read().strip())
                os.kill(pid, signal.SIGTERM)
                print("Stop signal sent to scheduler")
            except Exception as e:
                print(f"Error stopping scheduler: {e}")


if __name__ == "__main__":
    main()