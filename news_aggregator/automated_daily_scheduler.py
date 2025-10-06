#!/usr/bin/env python3
"""
Automated Daily News Collection System - Production Ready
Runs scraping infrastructure twice daily with APScheduler for robustness
Incorporates 2025 best practices for production web scraping automation
"""

import os
import sys
import time
import logging
import subprocess
import sqlite3
import json
import signal
import threading
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Optional, Any

# Production scheduler with persistence and error recovery
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from apscheduler.executors.pool import ThreadPoolExecutor
from apscheduler.events import EVENT_JOB_EXECUTED, EVENT_JOB_ERROR, EVENT_JOB_MISSED

# Add scrapers directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'scrapers'))

class ProductionLogger:
    """Enhanced logging for production environment"""

    def __init__(self, log_dir: Path):
        self.log_dir = log_dir
        self.log_dir.mkdir(exist_ok=True)

        # Configure root logger
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s',
            handlers=[
                logging.FileHandler(self.log_dir / 'scheduler.log'),
                logging.FileHandler(self.log_dir / 'production.log'),
                logging.StreamHandler(sys.stdout)
            ]
        )

        # Separate loggers for different components
        self.scheduler_logger = logging.getLogger('scheduler')
        self.scraper_logger = logging.getLogger('scraper')
        self.monitor_logger = logging.getLogger('monitor')

        # Set rotating file handlers for production
        from logging.handlers import RotatingFileHandler

        # Max 10MB per log file, keep 5 backups
        handler = RotatingFileHandler(
            self.log_dir / 'production.log',
            maxBytes=10*1024*1024,  # 10MB
            backupCount=5
        )
        handler.setFormatter(logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        ))

        self.scheduler_logger.addHandler(handler)
        self.scraper_logger.addHandler(handler)
        self.monitor_logger.addHandler(handler)

logger_system = ProductionLogger(Path(__file__).parent / 'logs')

class NepalNewsScheduler:
    """Production-ready automated scheduler with APScheduler and monitoring"""

    def __init__(self):
        self.scrapers_dir = Path(__file__).parent / 'scrapers'
        self.logs_dir = Path(__file__).parent / 'logs'
        self.data_dir = Path(__file__).parent / 'scheduler_data'
        self.logs_dir.mkdir(exist_ok=True)
        self.data_dir.mkdir(exist_ok=True)

        self.logger = logger_system.scheduler_logger
        self.scraper_logger = logger_system.scraper_logger
        self.monitor_logger = logger_system.monitor_logger

        # Metrics tracking
        self.job_metrics = {
            'total_runs': 0,
            'successful_runs': 0,
            'failed_runs': 0,
            'last_successful_run': None,
            'consecutive_failures': 0,
            'scraper_success_rates': {}
        }

        # Required scraper files
        self.required_scrapers = [
            'automated_social_collector.py',
            'realtime_news_collector.py',
            'comprehensive_collector.py',
            'nepal_news_intelligence_config.py'
        ]

        # APScheduler configuration
        self.jobstore = SQLAlchemyJobStore(url=f'sqlite:///{self.data_dir}/scheduler_jobs.db')
        self.executors = {
            'default': ThreadPoolExecutor(max_workers=3),  # Limit concurrent scrapers
        }
        self.job_defaults = {
            'coalesce': True,  # Combine multiple pending executions into one
            'max_instances': 1,  # Prevent overlapping runs
            'misfire_grace_time': 3600  # Allow 1 hour delay for missed jobs
        }

        # Initialize scheduler
        self.scheduler = BlockingScheduler(
            jobstores={'default': self.jobstore},
            executors=self.executors,
            job_defaults=self.job_defaults,
            timezone='Asia/Kathmandu'
        )

        # Add event listeners for monitoring
        self.scheduler.add_listener(self._job_executed, EVENT_JOB_EXECUTED)
        self.scheduler.add_listener(self._job_error, EVENT_JOB_ERROR)
        self.scheduler.add_listener(self._job_missed, EVENT_JOB_MISSED)

        # Setup signal handlers for graceful shutdown
        signal.signal(signal.SIGINT, self._signal_handler)
        signal.signal(signal.SIGTERM, self._signal_handler)

        self.shutdown_requested = threading.Event()

        if not self._verify_scrapers():
            raise RuntimeError("Missing required scraper files")

    def _signal_handler(self, signum, frame):
        """Handle shutdown signals gracefully"""
        self.logger.info(f"Received signal {signum}, initiating graceful shutdown...")
        self.shutdown_requested.set()
        if self.scheduler.running:
            self.scheduler.shutdown(wait=True)

    def _job_executed(self, event):
        """Handle successful job execution"""
        self.job_metrics['total_runs'] += 1
        self.job_metrics['successful_runs'] += 1
        self.job_metrics['last_successful_run'] = datetime.now()
        self.job_metrics['consecutive_failures'] = 0

        self.monitor_logger.info(f"✅ Job '{event.job_id}' completed successfully")

    def _job_error(self, event):
        """Handle job execution errors"""
        self.job_metrics['total_runs'] += 1
        self.job_metrics['failed_runs'] += 1
        self.job_metrics['consecutive_failures'] += 1

        self.monitor_logger.error(f"❌ Job '{event.job_id}' failed: {event.exception}")

        # Alert if too many consecutive failures
        if self.job_metrics['consecutive_failures'] >= 3:
            self.monitor_logger.critical(
                f"🚨 ALERT: {self.job_metrics['consecutive_failures']} consecutive job failures!"
            )

    def _job_missed(self, event):
        """Handle missed job executions"""
        self.monitor_logger.warning(f"⏰ Job '{event.job_id}' was missed (scheduled: {event.scheduled_run_time})")

    def _verify_scrapers(self) -> bool:
        """Verify all required scraper files exist"""
        missing = []
        for scraper in self.required_scrapers:
            scraper_path = self.scrapers_dir / scraper
            if not scraper_path.exists():
                missing.append(scraper)

        if missing:
            self.logger.error(f"Missing scraper files: {missing}")
            self.logger.info("Please ensure all scraper files are in the scrapers/ directory")

            # Try to find scrapers in parent directories
            self._attempt_scraper_recovery(missing)
            return False

        self.logger.info("✅ All required scraper files verified")
        return True

    def _attempt_scraper_recovery(self, missing_scrapers: List[str]):
        """Attempt to find missing scrapers in parent directories"""
        parent_ratenepal = Path(__file__).parent.parent.parent / 'ratenepal'

        if parent_ratenepal.exists():
            self.logger.info(f"Attempting to locate missing scrapers in {parent_ratenepal}")

            for scraper in missing_scrapers:
                # Search for the scraper file
                found_files = list(parent_ratenepal.rglob(scraper))
                if found_files:
                    source_file = found_files[0]
                    self.logger.info(f"Found {scraper} at {source_file}")
                    self.logger.info(f"Consider copying: cp {source_file} {self.scrapers_dir}/")

    def run_scraper_with_retry(self, scraper_name: str, description: str, max_retries: int = 3) -> bool:
        """Run scraper with exponential backoff retry logic"""
        for attempt in range(1, max_retries + 1):
            self.scraper_logger.info(f"🚀 [{attempt}/{max_retries}] Starting {description}...")

            try:
                # Enhanced command execution with better error handling
                cmd = [sys.executable, str(self.scrapers_dir / scraper_name)]

                # Run with timeout and environment isolation
                process = subprocess.Popen(
                    cmd,
                    cwd=self.scrapers_dir,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    text=True,
                    env=dict(os.environ, PYTHONPATH=str(self.scrapers_dir))
                )

                try:
                    stdout, stderr = process.communicate(timeout=2400)  # 40 minute timeout

                    if process.returncode == 0:
                        self.scraper_logger.info(f"✅ {description} completed successfully")

                        # Log summary output (not full output for brevity)
                        if stdout:
                            lines = stdout.strip().split('\n')
                            if len(lines) > 10:
                                summary = f"Output: {lines[0]}...{lines[-1]} ({len(lines)} lines total)"
                            else:
                                summary = f"Output: {stdout[:300]}"
                            self.scraper_logger.info(summary)

                        # Track success rate
                        self.job_metrics['scraper_success_rates'][scraper_name] = \
                            self.job_metrics['scraper_success_rates'].get(scraper_name, 0) + 1

                        return True
                    else:
                        error_msg = f"❌ {description} failed (attempt {attempt}/{max_retries}) - Return code: {process.returncode}"
                        self.scraper_logger.error(error_msg)
                        if stderr:
                            self.scraper_logger.error(f"Error output: {stderr[:500]}")

                except subprocess.TimeoutExpired:
                    process.kill()
                    self.scraper_logger.error(f"❌ {description} timed out (attempt {attempt}/{max_retries})")

            except Exception as e:
                self.scraper_logger.error(f"❌ {description} failed with exception (attempt {attempt}/{max_retries}): {e}")

            # Exponential backoff if more retries remain
            if attempt < max_retries:
                backoff_time = 2 ** attempt  # 2, 4, 8 seconds
                self.scraper_logger.info(f"⏳ Retrying in {backoff_time} seconds...")
                time.sleep(backoff_time)

        self.scraper_logger.error(f"❌ {description} failed after {max_retries} attempts")
        return False

    def morning_collection(self):
        """Morning news collection routine (6 AM) - Enhanced with monitoring"""
        collection_start = datetime.now()
        self.logger.info("🌅 STARTING MORNING NEWS COLLECTION CYCLE")

        success_count = 0
        total_tasks = 3
        task_results = {}

        # 1. Comprehensive article collection (highest priority)
        task_results['comprehensive'] = self.run_scraper_with_retry(
            'comprehensive_collector.py',
            'Comprehensive article collection from all major sources'
        )
        if task_results['comprehensive']:
            success_count += 1

        # 2. Real-time RSS monitoring
        task_results['realtime'] = self.run_scraper_with_retry(
            'realtime_news_collector.py',
            'Real-time RSS feed monitoring and processing'
        )
        if task_results['realtime']:
            success_count += 1

        # 3. Social media integration
        task_results['social'] = self.run_scraper_with_retry(
            'automated_social_collector.py',
            'Social media integration and trend analysis'
        )
        if task_results['social']:
            success_count += 1

        # Calculate collection duration
        duration = datetime.now() - collection_start

        # Enhanced logging with metrics
        self.logger.info(f"🌅 MORNING COLLECTION COMPLETED: {success_count}/{total_tasks} tasks successful in {duration.total_seconds():.1f}s")

        if success_count == total_tasks:
            self.logger.info("✅ All morning collection tasks completed successfully")
        else:
            failed_tasks = [task for task, success in task_results.items() if not success]
            self.logger.warning(f"⚠️ {total_tasks - success_count} morning tasks failed: {failed_tasks}")

        # Post-collection database health check
        self.database_health_check()

    def evening_collection(self):
        """Evening news collection routine (6 PM) - Optimized for breaking news"""
        collection_start = datetime.now()
        self.logger.info("🌆 STARTING EVENING NEWS COLLECTION CYCLE")

        success_count = 0
        total_tasks = 2
        task_results = {}

        # 1. Real-time updates and breaking news (priority)
        task_results['realtime_evening'] = self.run_scraper_with_retry(
            'realtime_news_collector.py',
            'Evening real-time updates and breaking news collection'
        )
        if task_results['realtime_evening']:
            success_count += 1

        # 2. Social media trends and engagement analysis
        task_results['social_evening'] = self.run_scraper_with_retry(
            'automated_social_collector.py',
            'Evening social media trends and engagement analysis'
        )
        if task_results['social_evening']:
            success_count += 1

        # Calculate duration
        duration = datetime.now() - collection_start

        # Enhanced logging
        self.logger.info(f"🌆 EVENING COLLECTION COMPLETED: {success_count}/{total_tasks} tasks successful in {duration.total_seconds():.1f}s")

        if success_count == total_tasks:
            self.logger.info("✅ All evening collection tasks completed successfully")
        else:
            failed_tasks = [task for task, success in task_results.items() if not success]
            self.logger.warning(f"⚠️ {total_tasks - success_count} evening tasks failed: {failed_tasks}")

        # Post-collection health check
        self.database_health_check()

    def weekly_maintenance(self):
        """Weekly maintenance and deep analysis (Sunday 2 AM)"""
        logger.info("🔧 STARTING WEEKLY MAINTENANCE CYCLE")

        # Run comprehensive analysis with cleanup
        success = self.run_scraper(
            'comprehensive_collector.py',
            'Weekly comprehensive analysis and database maintenance'
        )

        if success:
            logger.info("✅ Weekly maintenance completed successfully")
        else:
            logger.error("❌ Weekly maintenance failed")

    def database_health_check(self):
        """Check database health and log statistics"""
        try:
            import sqlite3

            db_path = Path(__file__).parent / 'nepal_news_intelligence.db'
            if not db_path.exists():
                logger.warning("⚠️ Database file not found")
                return

            conn = sqlite3.connect(str(db_path))
            cursor = conn.cursor()

            # Get article counts by date
            cursor.execute("""
                SELECT
                    COUNT(*) as total_articles,
                    COUNT(CASE WHEN date(published_date) = date('now') THEN 1 END) as today_articles,
                    COUNT(CASE WHEN date(published_date) >= date('now', '-7 days') THEN 1 END) as week_articles
                FROM articles_enhanced
            """)

            total, today, week = cursor.fetchone()

            # This was the old logger reference - need to remove this line as it was replaced with enhanced version above
            # logger.info(f"📊 DATABASE HEALTH: {total} total articles, {today} today, {week} this week")

            conn.close()

        except Exception as e:
            self.monitor_logger.error(f"❌ Database health check failed: {e}")
            return {'status': 'error', 'reason': str(e)}

    def _cleanup_old_logs(self):
        """Clean up old log files to prevent disk space issues"""
        try:
            log_files = list(self.logs_dir.glob("*.log*"))
            week_ago = datetime.now() - timedelta(days=7)

            cleaned_count = 0
            for log_file in log_files:
                if log_file.stat().st_mtime < week_ago.timestamp():
                    log_file.unlink()
                    cleaned_count += 1

            if cleaned_count > 0:
                self.logger.info(f"🧹 Cleaned up {cleaned_count} old log files")
        except Exception as e:
            self.logger.warning(f"⚠️ Log cleanup failed: {e}")

    def _generate_weekly_report(self):
        """Generate comprehensive weekly performance report"""
        try:
            report_data = {
                'timestamp': datetime.now().isoformat(),
                'job_metrics': self.job_metrics,
                'database_health': self.database_health_check()
            }

            report_file = self.data_dir / f"weekly_report_{datetime.now().strftime('%Y%m%d')}.json"
            with open(report_file, 'w') as f:
                json.dump(report_data, f, indent=2, default=str)

            self.logger.info(f"📋 Weekly report generated: {report_file}")
        except Exception as e:
            self.logger.error(f"❌ Weekly report generation failed: {e}")

    def _log_startup_info(self):
        """Log comprehensive startup information"""
        self.logger.info("═══════════════════════════════════════")
        self.logger.info("🇳🇵 Nepal News Scheduler - Production Mode")
        self.logger.info("═══════════════════════════════════════")
        self.logger.info(f"📂 Working Directory: {Path.cwd()}")
        self.logger.info(f"📁 Scrapers Directory: {self.scrapers_dir}")
        self.logger.info(f"📄 Logs Directory: {self.logs_dir}")
        self.logger.info(f"💾 Data Directory: {self.data_dir}")
        self.logger.info(f"🐍 Python: {sys.version.split()[0]}")
        self.logger.info(f"⏰ Timezone: Asia/Kathmandu")
        self.logger.info("═══════════════════════════════════════")

    def _generate_performance_summary(self):
        """Generate performance summary for manual runs"""
        metrics = self.job_metrics
        total_runs = metrics['total_runs']
        success_rate = (metrics['successful_runs'] / total_runs * 100) if total_runs > 0 else 0

        self.monitor_logger.info("📊 Performance Summary:")
        self.monitor_logger.info(f"   Total Runs: {total_runs}")
        self.monitor_logger.info(f"   Success Rate: {success_rate:.1f}%")
        self.monitor_logger.info(f"   Consecutive Failures: {metrics['consecutive_failures']}")
        self.monitor_logger.info(f"   Last Successful Run: {metrics['last_successful_run']}")

    def _cleanup_on_shutdown(self):
        """Perform cleanup tasks on scheduler shutdown"""
        self.logger.info("🧹 Performing shutdown cleanup...")

        # Save final metrics
        try:
            metrics_file = self.data_dir / "final_metrics.json"
            with open(metrics_file, 'w') as f:
                json.dump(self.job_metrics, f, indent=2, default=str)
            self.logger.info("💾 Final metrics saved")
        except Exception as e:
            self.logger.error(f"❌ Failed to save final metrics: {e}")

        self.logger.info("✅ Shutdown cleanup completed")

    def setup_schedule(self):
        """Setup the production-ready collection schedule with APScheduler"""
        self.logger.info("⏰ Setting up production automated collection schedule...")

        try:
            # Morning collection at 6:00 AM daily
            self.scheduler.add_job(
                func=self.morning_collection,
                trigger='cron',
                hour=6,
                minute=0,
                id='morning_collection',
                name='Morning News Collection',
                replace_existing=True
            )

            # Evening collection at 6:00 PM daily
            self.scheduler.add_job(
                func=self.evening_collection,
                trigger='cron',
                hour=18,
                minute=0,
                id='evening_collection',
                name='Evening News Collection',
                replace_existing=True
            )

            # Weekly maintenance on Sunday at 2:00 AM
            self.scheduler.add_job(
                func=self.weekly_maintenance,
                trigger='cron',
                day_of_week='sun',
                hour=2,
                minute=0,
                id='weekly_maintenance',
                name='Weekly Maintenance',
                replace_existing=True
            )

            # Database health check every 6 hours
            self.scheduler.add_job(
                func=self.database_health_check,
                trigger='interval',
                hours=6,
                id='health_check',
                name='Database Health Check',
                replace_existing=True
            )

            # Optional: Hourly light collection for breaking news
            self.scheduler.add_job(
                func=lambda: self.run_scraper_with_retry(
                    'realtime_news_collector.py',
                    'Hourly breaking news check',
                    max_retries=1
                ),
                trigger='cron',
                minute=0,  # Every hour at minute 0
                id='hourly_breaking',
                name='Hourly Breaking News Check',
                replace_existing=True
            )

            self.logger.info("✅ Production schedule configured successfully")
            self.logger.info("📋 Scheduled Jobs:")
            self.logger.info("   🌅 Morning Collection: 6:00 AM daily (comprehensive + RSS + social)")
            self.logger.info("   🌆 Evening Collection: 6:00 PM daily (real-time + social)")
            self.logger.info("   🔧 Weekly Maintenance: Sunday 2:00 AM (maintenance + cleanup)")
            self.logger.info("   📊 Health Check: Every 6 hours")
            self.logger.info("   ⚡ Breaking News: Every hour (light collection)")

        except Exception as e:
            self.logger.error(f"❌ Failed to setup schedule: {e}")
            raise

    def run_production_scheduler(self):
        """Run the production scheduler with full monitoring"""
        self.setup_schedule()

        self.logger.info("🚀 Production Nepal News Scheduler started")
        self.logger.info("Signal handling: SIGINT, SIGTERM for graceful shutdown")

        # Run initial health check
        health_status = self.database_health_check()
        self.logger.info(f"Initial health check: {health_status.get('status', 'unknown')}")

        # Log startup metrics
        self._log_startup_info()

        try:
            self.logger.info("Scheduler entering main loop...")
            self.scheduler.start()

        except KeyboardInterrupt:
            self.logger.info("⏹️ Scheduler stopped by user (SIGINT)")
        except Exception as e:
            self.logger.error(f"❌ Scheduler crashed: {e}")
            raise
        finally:
            self._cleanup_on_shutdown()

    def run_manual_collection(self):
        """Run manual collection cycle for testing and verification"""
        self.logger.info("🔧 Running manual collection cycle for testing...")

        start_time = datetime.now()

        self.logger.info("Step 1: Running morning collection routine...")
        self.morning_collection()

        self.logger.info("Step 2: Running evening collection routine...")
        self.evening_collection()

        self.logger.info("Step 3: Performing comprehensive database health check...")
        health_data = self.database_health_check()

        self.logger.info("Step 4: Running performance diagnostics...")
        self._generate_performance_summary()

        duration = datetime.now() - start_time
        self.logger.info(f"✅ Manual collection cycle completed in {duration.total_seconds():.1f} seconds")

        return health_data

def main():
    """Main entry point with enhanced argument parsing"""
    import argparse

    parser = argparse.ArgumentParser(
        description='Nepal News Production Scheduler - Automated data collection system',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Run production scheduler
  python automated_daily_scheduler.py

  # Run manual collection test
  python automated_daily_scheduler.py --manual

  # Check database health only
  python automated_daily_scheduler.py --health-check

  # Show scheduled jobs
  python automated_daily_scheduler.py --list-jobs

  # Run specific collection type
  python automated_daily_scheduler.py --run-morning
        """
    )

    parser.add_argument(
        '--manual',
        action='store_true',
        help='Run manual collection cycle for testing (runs morning + evening collections)'
    )
    parser.add_argument(
        '--health-check',
        action='store_true',
        help='Run database health check only and exit'
    )
    parser.add_argument(
        '--list-jobs',
        action='store_true',
        help='List all scheduled jobs and exit'
    )
    parser.add_argument(
        '--run-morning',
        action='store_true',
        help='Run morning collection once and exit'
    )
    parser.add_argument(
        '--run-evening',
        action='store_true',
        help='Run evening collection once and exit'
    )
    parser.add_argument(
        '--run-maintenance',
        action='store_true',
        help='Run weekly maintenance once and exit'
    )
    parser.add_argument(
        '--verbose',
        action='store_true',
        help='Enable verbose logging output'
    )

    args = parser.parse_args()

    try:
        # Initialize scheduler
        scheduler = NepalNewsScheduler()

        # Handle specific commands
        if args.health_check:
            print("🔍 Running database health check...")
            health_data = scheduler.database_health_check()
            print(f"Status: {health_data.get('status', 'unknown')}")
            if health_data.get('status') == 'healthy':
                print(f"📊 Articles: {health_data.get('total_articles', 0)} total, {health_data.get('today_articles', 0)} today")
                print(f"💾 Database size: {health_data.get('db_size_mb', 0)} MB")

        elif args.list_jobs:
            print("📋 Scheduled Jobs:")
            print("   🌅 Morning Collection: 6:00 AM daily")
            print("   🌆 Evening Collection: 6:00 PM daily")
            print("   🔧 Weekly Maintenance: Sunday 2:00 AM")
            print("   📊 Health Check: Every 6 hours")
            print("   ⚡ Breaking News: Every hour")

        elif args.run_morning:
            print("🌅 Running morning collection...")
            scheduler.morning_collection()

        elif args.run_evening:
            print("🌆 Running evening collection...")
            scheduler.evening_collection()

        elif args.run_maintenance:
            print("🔧 Running weekly maintenance...")
            scheduler.weekly_maintenance()

        elif args.manual:
            print("🔧 Running manual collection test...")
            health_data = scheduler.run_manual_collection()
            print(f"✅ Test completed. Database status: {health_data.get('status', 'unknown')}")

        else:
            # Run production scheduler
            print("🚀 Starting production scheduler...")
            scheduler.run_production_scheduler()

    except KeyboardInterrupt:
        print("\n⏹️ Interrupted by user")
    except RuntimeError as e:
        print(f"❌ Setup Error: {e}")
        print("💡 Tip: Ensure all scraper files exist in the scrapers/ directory")
        exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        exit(1)

if __name__ == "__main__":
    main()