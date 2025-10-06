#!/usr/bin/env python3
"""
Standalone News Collection Service for Nepal Digital Intelligence Platform
==========================================================================

Purpose:
- Separate data collection service that feeds the main news aggregator
- Integrates with existing nepal_news_intelligence.db database
- Uses proven working collector from ratenepal directory
- Maintains separation between data collection and analysis/dashboard

Architecture:
┌─────────────────────┐    ┌────────────────────────┐    ┌─────────────────────┐
│ News Collector      │───▶│ nepal_news_            │───▶│ News Aggregator     │
│ Service             │    │ intelligence.db        │    │ Dashboard           │
│ (This File)         │    │                        │    │ (nepal_dashboard.py)│
└─────────────────────┘    └────────────────────────┘    └─────────────────────┘

Usage:
    python news_collector_service.py --start --interval 2
    python news_collector_service.py --status
    python news_collector_service.py --stop
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
import shutil
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Optional, Any

# Production scheduler imports
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from apscheduler.executors.pool import ThreadPoolExecutor


class NewsCollectorService:
    """Standalone news collection service that feeds the main aggregator database."""

    def __init__(self,
                 interval_hours: int = 2,
                 main_db_path: str = "news_aggregator/nepal_news_intelligence.db"):
        """
        Initialize the news collection service.

        Args:
            interval_hours: Hours between collection runs
            main_db_path: Path to main aggregator database
        """
        self.interval_hours = interval_hours
        self.main_db_path = Path(main_db_path)
        self.service_dir = Path("collector_service")
        self.service_dir.mkdir(exist_ok=True)

        # Working collector configuration
        self.ratenepal_base = Path("/Users/muna/Documents/Aryan/aryan_try/ratenepal/nepal_news_aggregator")
        self.working_collector = self.ratenepal_base / "optimized_full_collector.py"
        self.temp_db = self.service_dir / "temp_collection.db"

        # Service state
        self.is_running = False
        self.scheduler = None
        self.pid_file = self.service_dir / "collector.pid"

        # Setup components
        self._setup_logging()
        self._setup_database_schema()
        self._setup_scheduler()

    def _setup_logging(self):
        """Configure logging for the collection service."""
        log_dir = self.service_dir / "logs"
        log_dir.mkdir(exist_ok=True)

        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )

        self.logger = logging.getLogger('news_collector')
        self.logger.setLevel(logging.INFO)

        # File handler
        file_handler = logging.FileHandler(log_dir / 'collector.log')
        file_handler.setFormatter(formatter)

        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(formatter)

        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)

    def _setup_database_schema(self):
        """Ensure main database has required schema for collected articles."""
        try:
            with sqlite3.connect(self.main_db_path) as conn:
                # Check if articles_enhanced table exists and create if needed
                cursor = conn.execute("""
                    SELECT name FROM sqlite_master
                    WHERE type='table' AND name='articles_enhanced'
                """)

                if not cursor.fetchone():
                    self.logger.info("Creating articles_enhanced table in main database")
                    conn.execute("""
                        CREATE TABLE articles_enhanced (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            url TEXT UNIQUE,
                            source_site TEXT,
                            title TEXT,
                            content TEXT,
                            author TEXT,
                            published_date TEXT,
                            scraped_date TEXT,
                            language TEXT,
                            word_count INTEGER,
                            content_hash TEXT,
                            title_hash TEXT,
                            category TEXT,
                            image_url TEXT,
                            summary TEXT,
                            tags TEXT,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        )
                    """)

                # Add index for performance
                conn.execute("""
                    CREATE INDEX IF NOT EXISTS idx_articles_enhanced_scraped_date
                    ON articles_enhanced(scraped_date)
                """)
                conn.execute("""
                    CREATE INDEX IF NOT EXISTS idx_articles_enhanced_source_site
                    ON articles_enhanced(source_site)
                """)

        except Exception as e:
            self.logger.error(f"Database schema setup failed: {e}")
            raise

    def _setup_scheduler(self):
        """Configure APScheduler for background collection."""
        jobstores = {
            'default': SQLAlchemyJobStore(url=f'sqlite:///{self.service_dir}/scheduler.db')
        }

        executors = {
            'default': ThreadPoolExecutor(1)  # Single thread for collection
        }

        job_defaults = {
            'coalesce': True,
            'max_instances': 1,
            'misfire_grace_time': 300
        }

        self.scheduler = BackgroundScheduler(
            jobstores=jobstores,
            executors=executors,
            job_defaults=job_defaults
        )

    def run_collection(self):
        """Execute news collection and transfer to main database."""
        try:
            self.logger.info("Starting news collection...")

            # Verify working collector exists
            if not self.working_collector.exists():
                raise FileNotFoundError(f"Working collector not found: {self.working_collector}")

            # Clean temporary database
            if self.temp_db.exists():
                self.temp_db.unlink()

            # Run collection in ratenepal directory
            start_time = time.time()
            old_cwd = os.getcwd()

            try:
                os.chdir(self.ratenepal_base)

                # Execute collector with our temporary database
                env = os.environ.copy()
                env['NEPAL_DB_PATH'] = str(self.temp_db)

                result = subprocess.run([
                    sys.executable,
                    str(self.working_collector),
                    "--limit", "100",  # Collect up to 100 articles
                    "--database", str(self.temp_db)
                ],
                capture_output=True,
                text=True,
                timeout=900,  # 15 minute timeout
                env=env
                )

                duration = time.time() - start_time

                if result.returncode == 0:
                    # Collection successful, transfer data
                    articles_transferred = self._transfer_articles()

                    self.logger.info(f"Collection completed successfully:")
                    self.logger.info(f"  - Duration: {duration:.2f} seconds")
                    self.logger.info(f"  - Articles transferred: {articles_transferred}")

                    return articles_transferred

                else:
                    self.logger.error(f"Collection failed: {result.stderr}")
                    raise subprocess.CalledProcessError(result.returncode, "collector")

            finally:
                os.chdir(old_cwd)

        except Exception as e:
            self.logger.error(f"Collection error: {e}")
            raise

    def _transfer_articles(self) -> int:
        """Transfer articles from temporary database to main database."""
        try:
            if not self.temp_db.exists():
                self.logger.warning("No temporary database found, nothing to transfer")
                return 0

            transferred = 0

            # Connect to both databases
            with sqlite3.connect(self.temp_db) as temp_conn, \
                 sqlite3.connect(self.main_db_path) as main_conn:

                # Get articles from temporary database
                temp_cursor = temp_conn.execute("""
                    SELECT url, source_id as source_site, title, content, author,
                           published_date, collected_date as scraped_date, language,
                           word_count, content_hash, title_hash
                    FROM articles
                """)

                # Prepare main database insert
                main_cursor = main_conn.cursor()

                for row in temp_cursor:
                    try:
                        # Map fields from collector format to main database format
                        article_data = {
                            'url': row[0],
                            'source_site': row[1] or 'unknown',
                            'title': row[2],
                            'content': row[3],
                            'author': row[4],
                            'published_date': row[5],
                            'scraped_date': row[6] or datetime.now().isoformat(),
                            'language': row[7] or 'ne',
                            'word_count': row[8] or 0,
                            'content_hash': row[9],
                            'title_hash': row[10]
                        }

                        # Insert into main database (ignore duplicates)
                        main_cursor.execute("""
                            INSERT OR IGNORE INTO articles_enhanced
                            (url, source_site, title, content, author, published_date,
                             scraped_date, language, word_count, content_hash, title_hash)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """, (
                            article_data['url'],
                            article_data['source_site'],
                            article_data['title'],
                            article_data['content'],
                            article_data['author'],
                            article_data['published_date'],
                            article_data['scraped_date'],
                            article_data['language'],
                            article_data['word_count'],
                            article_data['content_hash'],
                            article_data['title_hash']
                        ))

                        if main_cursor.rowcount > 0:
                            transferred += 1

                    except Exception as e:
                        self.logger.warning(f"Failed to transfer article {row[0]}: {e}")

                main_conn.commit()

            # Clean up temporary database
            self.temp_db.unlink()

            return transferred

        except Exception as e:
            self.logger.error(f"Transfer failed: {e}")
            return 0

    def start_service(self):
        """Start the collection service."""
        try:
            # Check if already running
            if self.is_running_check():
                raise RuntimeError("Service is already running")

            self.logger.info(f"Starting News Collection Service")
            self.logger.info(f"  - Collection interval: {self.interval_hours} hours")
            self.logger.info(f"  - Main database: {self.main_db_path}")
            self.logger.info(f"  - Working collector: {self.working_collector}")

            # Verify prerequisites
            if not self.working_collector.exists():
                raise FileNotFoundError(f"Working collector not found: {self.working_collector}")

            if not self.main_db_path.exists():
                raise FileNotFoundError(f"Main database not found: {self.main_db_path}")

            # Schedule collection job
            self.scheduler.add_job(
                func=self.run_collection,
                trigger='interval',
                hours=self.interval_hours,
                id='news_collection',
                name='News Collection Job',
                replace_existing=True,
                next_run_time=datetime.now() + timedelta(seconds=10)  # Start in 10 seconds
            )

            # Start scheduler
            self.scheduler.start()
            self.is_running = True

            # Write PID file
            with open(self.pid_file, 'w') as f:
                f.write(str(os.getpid()))

            self.logger.info("Collection service started successfully")

            # Run initial collection
            try:
                self.run_collection()
            except Exception as e:
                self.logger.warning(f"Initial collection failed: {e}")

            # Keep service running
            while self.is_running:
                time.sleep(30)

        except Exception as e:
            self.logger.error(f"Failed to start service: {e}")
            raise

    def stop_service(self):
        """Stop the collection service."""
        try:
            if self.scheduler and self.scheduler.running:
                self.scheduler.shutdown(wait=True)

            self.is_running = False

            # Remove PID file
            if self.pid_file.exists():
                self.pid_file.unlink()

            self.logger.info("Collection service stopped")

        except Exception as e:
            self.logger.error(f"Error stopping service: {e}")

    def is_running_check(self) -> bool:
        """Check if service is currently running."""
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

    def get_status(self) -> Dict[str, Any]:
        """Get service status information."""
        return {
            'service': {
                'running': self.is_running_check(),
                'interval_hours': self.interval_hours,
                'pid_file': str(self.pid_file),
                'service_directory': str(self.service_dir)
            },
            'databases': {
                'main_database': str(self.main_db_path),
                'main_exists': self.main_db_path.exists(),
                'temp_database': str(self.temp_db),
                'temp_exists': self.temp_db.exists()
            },
            'collector': {
                'working_collector': str(self.working_collector),
                'collector_exists': self.working_collector.exists(),
                'ratenepal_base': str(self.ratenepal_base)
            },
            'scheduler': {
                'running': self.scheduler.running if self.scheduler else False,
                'jobs': len(self.scheduler.get_jobs()) if self.scheduler else 0
            }
        }


def main():
    """Main entry point for the collection service."""
    parser = argparse.ArgumentParser(description='Nepal News Collection Service')
    parser.add_argument('--start', action='store_true', help='Start the service')
    parser.add_argument('--stop', action='store_true', help='Stop the service')
    parser.add_argument('--status', action='store_true', help='Show service status')
    parser.add_argument('--collect', action='store_true', help='Run single collection')
    parser.add_argument('--interval', type=int, default=2,
                       help='Hours between collections (default: 2)')
    parser.add_argument('--database', type=str, default='news_aggregator/nepal_news_intelligence.db',
                       help='Main database path')

    args = parser.parse_args()

    if not any([args.start, args.stop, args.status, args.collect]):
        parser.print_help()
        return

    service = NewsCollectorService(
        interval_hours=args.interval,
        main_db_path=args.database
    )

    try:
        if args.status:
            status = service.get_status()
            print(json.dumps(status, indent=2))

        elif args.collect:
            print("Running single collection...")
            count = service.run_collection()
            print(f"Collected {count} articles")

        elif args.start:
            if service.is_running_check():
                print("Service is already running")
                return

            print("Starting collection service...")
            service.start_service()

        elif args.stop:
            if not service.is_running_check():
                print("Service is not running")
                return

            print("Stopping collection service...")
            service.stop_service()
            print("Service stopped")

    except KeyboardInterrupt:
        print("\nShutdown requested...")
        service.stop_service()
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()