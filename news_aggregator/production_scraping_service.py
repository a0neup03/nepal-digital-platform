#!/usr/bin/env python3
"""
Production News Scraping Service for Nepal Digital Intelligence Platform
=========================================================================

Features:
- Automated scheduling with APScheduler
- Working collector integration from ratenepal directory
- Health monitoring and error recovery
- Performance metrics and logging
- Production-grade service management

Usage:
    python production_scraping_service.py [--interval HOURS] [--daemon]
"""

import os
import sys
import time
import logging
import signal
import argparse
import subprocess
import sqlite3
import json
import threading
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Optional, Any

# Production scheduler imports
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from apscheduler.executors.pool import ThreadPoolExecutor
from apscheduler.events import EVENT_JOB_EXECUTED, EVENT_JOB_ERROR, EVENT_JOB_MISSED


class ProductionScrapingService:
    """Production-grade news scraping service with monitoring and automation."""

    def __init__(self,
                 interval_hours: int = 2,
                 database_path: str = "nepal_news_intelligence.db",
                 log_dir: str = "logs",
                 daemon_mode: bool = False):
        """
        Initialize the production scraping service.

        Args:
            interval_hours: Hours between scraping runs (default: 2)
            database_path: Path to the main database
            log_dir: Directory for log files
            daemon_mode: Run in background daemon mode
        """
        self.interval_hours = interval_hours
        self.database_path = Path(database_path)
        self.log_dir = Path(log_dir)
        self.daemon_mode = daemon_mode

        # Working collector path (from ratenepal discovery)
        self.working_collector_path = Path("/Users/muna/Documents/Aryan/aryan_try/ratenepal/nepal_news_aggregator/optimized_full_collector.py")

        # Service state
        self.is_running = False
        self.scheduler = None
        self.stats = {
            'total_runs': 0,
            'successful_runs': 0,
            'failed_runs': 0,
            'last_run_time': None,
            'last_success_time': None,
            'articles_collected_today': 0,
            'service_start_time': datetime.now()
        }

        # Setup logging and monitoring
        self._setup_logging()
        self._setup_scheduler()
        self._setup_signal_handlers()

    def _setup_logging(self):
        """Configure production logging."""
        self.log_dir.mkdir(exist_ok=True)

        # Configure formatters
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s'
        )

        # Main service logger
        self.logger = logging.getLogger('scraping_service')
        self.logger.setLevel(logging.INFO)

        # File handlers
        file_handler = logging.FileHandler(self.log_dir / 'scraping_service.log')
        file_handler.setFormatter(formatter)

        error_handler = logging.FileHandler(self.log_dir / 'scraping_errors.log')
        error_handler.setLevel(logging.ERROR)
        error_handler.setFormatter(formatter)

        # Console handler (only if not daemon mode)
        if not self.daemon_mode:
            console_handler = logging.StreamHandler(sys.stdout)
            console_handler.setFormatter(formatter)
            self.logger.addHandler(console_handler)

        self.logger.addHandler(file_handler)
        self.logger.addHandler(error_handler)

    def _setup_scheduler(self):
        """Configure APScheduler with persistence."""
        # Job store for persistence
        jobstores = {
            'default': SQLAlchemyJobStore(url=f'sqlite:///{self.log_dir}/scheduler_jobs.db')
        }

        # Thread pool executor
        executors = {
            'default': ThreadPoolExecutor(2)
        }

        # Job defaults
        job_defaults = {
            'coalesce': True,
            'max_instances': 1,
            'misfire_grace_time': 300  # 5 minutes grace period
        }

        # Create scheduler
        if self.daemon_mode:
            self.scheduler = BackgroundScheduler(
                jobstores=jobstores,
                executors=executors,
                job_defaults=job_defaults
            )
        else:
            self.scheduler = BlockingScheduler(
                jobstores=jobstores,
                executors=executors,
                job_defaults=job_defaults
            )

        # Add event listeners
        self.scheduler.add_listener(self._job_executed, EVENT_JOB_EXECUTED)
        self.scheduler.add_listener(self._job_error, EVENT_JOB_ERROR)
        self.scheduler.add_listener(self._job_missed, EVENT_JOB_MISSED)

    def _setup_signal_handlers(self):
        """Setup graceful shutdown handlers."""
        signal.signal(signal.SIGINT, self._signal_handler)
        signal.signal(signal.SIGTERM, self._signal_handler)

    def _signal_handler(self, signum, frame):
        """Handle shutdown signals gracefully."""
        self.logger.info(f"Received signal {signum}, shutting down gracefully...")
        self.stop_service()
        sys.exit(0)

    def _job_executed(self, event):
        """Handle successful job execution."""
        self.stats['total_runs'] += 1
        self.stats['successful_runs'] += 1
        self.stats['last_run_time'] = datetime.now()
        self.stats['last_success_time'] = datetime.now()

        self.logger.info(f"Scraping job completed successfully. Stats: {self.get_stats_summary()}")

    def _job_error(self, event):
        """Handle job execution errors."""
        self.stats['total_runs'] += 1
        self.stats['failed_runs'] += 1
        self.stats['last_run_time'] = datetime.now()

        self.logger.error(f"Scraping job failed: {event.exception}")
        self.logger.error(f"Job traceback: {event.traceback}")

    def _job_missed(self, event):
        """Handle missed job executions."""
        self.logger.warning(f"Scraping job missed: {event.job_id}")

    def run_collector(self):
        """Execute the working news collector."""
        try:
            self.logger.info("Starting news collection run...")

            # Check if working collector exists
            if not self.working_collector_path.exists():
                raise FileNotFoundError(f"Working collector not found: {self.working_collector_path}")

            # Record pre-collection article count
            pre_count = self._get_article_count()

            # Execute the working collector with timeout
            start_time = time.time()

            # Change to the ratenepal directory for proper imports
            old_cwd = os.getcwd()
            os.chdir(self.working_collector_path.parent)

            try:
                # Run the optimized collector
                result = subprocess.run([
                    sys.executable,
                    str(self.working_collector_path),
                    "--limit", "50",  # Collect up to 50 articles per run
                    "--timeout", "300"  # 5 minute timeout
                ],
                capture_output=True,
                text=True,
                timeout=600  # 10 minute hard timeout
                )

                if result.returncode == 0:
                    # Collection successful
                    duration = time.time() - start_time
                    post_count = self._get_article_count()
                    articles_collected = post_count - pre_count

                    self.stats['articles_collected_today'] += articles_collected

                    self.logger.info(f"Collection completed successfully:")
                    self.logger.info(f"  - Duration: {duration:.2f} seconds")
                    self.logger.info(f"  - Articles collected: {articles_collected}")
                    self.logger.info(f"  - Total articles in DB: {post_count}")

                    # Copy data to main database if needed
                    self._sync_databases()

                else:
                    # Collection failed
                    self.logger.error(f"Collector failed with return code: {result.returncode}")
                    self.logger.error(f"STDOUT: {result.stdout}")
                    self.logger.error(f"STDERR: {result.stderr}")
                    raise subprocess.CalledProcessError(result.returncode, "optimized_full_collector.py")

            finally:
                # Always restore working directory
                os.chdir(old_cwd)

        except subprocess.TimeoutExpired:
            self.logger.error("News collection timed out after 10 minutes")
            raise
        except Exception as e:
            self.logger.error(f"Error during news collection: {e}")
            raise

    def _get_article_count(self) -> int:
        """Get current article count from database."""
        try:
            # Try ratenepal database first
            ratenepal_db = self.working_collector_path.parent / "nepal_news.db"
            if ratenepal_db.exists():
                with sqlite3.connect(str(ratenepal_db)) as conn:
                    cursor = conn.execute("SELECT COUNT(*) FROM articles")
                    return cursor.fetchone()[0]

            # Fallback to main database
            if self.database_path.exists():
                with sqlite3.connect(str(self.database_path)) as conn:
                    cursor = conn.execute("SELECT COUNT(*) FROM articles_enhanced")
                    return cursor.fetchone()[0]

            return 0
        except Exception as e:
            self.logger.warning(f"Could not get article count: {e}")
            return 0

    def _sync_databases(self):
        """Sync data from ratenepal database to main database."""
        try:
            ratenepal_db = self.working_collector_path.parent / "nepal_news.db"

            if not ratenepal_db.exists() or not self.database_path.exists():
                self.logger.warning("Database sync skipped - missing database files")
                return

            # This is a simplified sync - in production, implement proper data migration
            self.logger.info("Database sync would run here (implement based on schema differences)")

        except Exception as e:
            self.logger.error(f"Database sync failed: {e}")

    def get_stats_summary(self) -> Dict[str, Any]:
        """Get current service statistics."""
        uptime = datetime.now() - self.stats['service_start_time']
        success_rate = (self.stats['successful_runs'] / max(self.stats['total_runs'], 1)) * 100

        return {
            'uptime_hours': uptime.total_seconds() / 3600,
            'total_runs': self.stats['total_runs'],
            'success_rate': f"{success_rate:.1f}%",
            'articles_today': self.stats['articles_collected_today'],
            'last_run': self.stats['last_run_time'].isoformat() if self.stats['last_run_time'] else None,
            'last_success': self.stats['last_success_time'].isoformat() if self.stats['last_success_time'] else None
        }

    def start_service(self):
        """Start the automated scraping service."""
        try:
            self.logger.info(f"Starting Nepal News Scraping Service")
            self.logger.info(f"  - Collection interval: {self.interval_hours} hours")
            self.logger.info(f"  - Database: {self.database_path}")
            self.logger.info(f"  - Working collector: {self.working_collector_path}")
            self.logger.info(f"  - Daemon mode: {self.daemon_mode}")

            # Verify working collector
            if not self.working_collector_path.exists():
                raise FileNotFoundError(f"Working collector not found: {self.working_collector_path}")

            # Schedule the collection job
            self.scheduler.add_job(
                func=self.run_collector,
                trigger='interval',
                hours=self.interval_hours,
                id='news_collection',
                name='Nepal News Collection',
                replace_existing=True,
                next_run_time=datetime.now() + timedelta(seconds=30)  # Start in 30 seconds
            )

            # Add daily stats reset job
            self.scheduler.add_job(
                func=self._reset_daily_stats,
                trigger='cron',
                hour=0,
                minute=0,
                id='daily_stats_reset',
                name='Daily Stats Reset',
                replace_existing=True
            )

            # Add health check job
            self.scheduler.add_job(
                func=self._health_check,
                trigger='interval',
                minutes=30,
                id='health_check',
                name='Service Health Check',
                replace_existing=True
            )

            self.is_running = True
            self.logger.info("Scheduler started successfully")

            # Run initial collection immediately
            self.logger.info("Running initial collection...")
            self.run_collector()

            # Start scheduler
            self.scheduler.start()

        except Exception as e:
            self.logger.error(f"Failed to start service: {e}")
            raise

    def stop_service(self):
        """Stop the scraping service gracefully."""
        if self.scheduler and self.is_running:
            self.logger.info("Stopping scraping service...")
            self.scheduler.shutdown(wait=True)
            self.is_running = False
            self.logger.info("Service stopped successfully")

    def _reset_daily_stats(self):
        """Reset daily statistics."""
        self.stats['articles_collected_today'] = 0
        self.logger.info("Daily statistics reset")

    def _health_check(self):
        """Perform service health check."""
        health_status = {
            'service_running': self.is_running,
            'scheduler_running': self.scheduler.running if self.scheduler else False,
            'working_collector_exists': self.working_collector_path.exists(),
            'database_accessible': self.database_path.exists(),
            'last_success_hours_ago': None
        }

        if self.stats['last_success_time']:
            hours_ago = (datetime.now() - self.stats['last_success_time']).total_seconds() / 3600
            health_status['last_success_hours_ago'] = hours_ago

            # Alert if no successful collection in 6 hours
            if hours_ago > 6:
                self.logger.warning(f"No successful collection in {hours_ago:.1f} hours")

        self.logger.info(f"Health check: {health_status}")

    def get_service_status(self) -> Dict[str, Any]:
        """Get comprehensive service status."""
        return {
            'service': {
                'running': self.is_running,
                'mode': 'daemon' if self.daemon_mode else 'foreground',
                'interval_hours': self.interval_hours
            },
            'scheduler': {
                'running': self.scheduler.running if self.scheduler else False,
                'jobs': len(self.scheduler.get_jobs()) if self.scheduler else 0
            },
            'statistics': self.get_stats_summary(),
            'paths': {
                'database': str(self.database_path),
                'working_collector': str(self.working_collector_path),
                'log_directory': str(self.log_dir)
            }
        }


def main():
    """Main entry point for the scraping service."""
    parser = argparse.ArgumentParser(description='Nepal News Scraping Service')
    parser.add_argument('--interval', type=int, default=2,
                       help='Hours between collection runs (default: 2)')
    parser.add_argument('--database', type=str, default='nepal_news_intelligence.db',
                       help='Database path (default: nepal_news_intelligence.db)')
    parser.add_argument('--daemon', action='store_true',
                       help='Run in daemon mode (background)')
    parser.add_argument('--status', action='store_true',
                       help='Show service status and exit')

    args = parser.parse_args()

    # Create service instance
    service = ProductionScrapingService(
        interval_hours=args.interval,
        database_path=args.database,
        daemon_mode=args.daemon
    )

    if args.status:
        # Show status and exit
        status = service.get_service_status()
        print(json.dumps(status, indent=2))
        return

    try:
        if args.daemon:
            # Daemon mode - start and detach
            service.start_service()

            # Keep daemon running
            while service.is_running:
                time.sleep(60)  # Check every minute

        else:
            # Foreground mode - start and block
            service.start_service()

    except KeyboardInterrupt:
        print("\nShutdown requested...")
    except Exception as e:
        print(f"Service error: {e}")
        sys.exit(1)
    finally:
        service.stop_service()


if __name__ == "__main__":
    main()