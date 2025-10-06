#!/usr/bin/env python3
"""
Simple Collection Runner for Nepal News Intelligence Platform
============================================================

Uses our existing proven collectors from ratenepal directory:
1. RSS Feed Collection (rss_collector_working.py)
2. Facebook Collection (facebook_news_collector.py)
3. Direct Scraping (optimized_full_collector.py)

Usage:
    python run_collections.py --rss        # Run RSS collection only
    python run_collections.py --facebook   # Run Facebook collection only
    python run_collections.py --scraping   # Run direct scraping only
    python run_collections.py --all        # Run all three methods
    python run_collections.py --schedule   # Set up automated scheduling
"""

import os
import sys
import subprocess
import time
import logging
from datetime import datetime
from pathlib import Path
import argparse

class NewsCollectionRunner:
    """Simple runner for our existing collection systems."""

    def __init__(self):
        # Paths to our existing working collectors
        self.ratenepal_base = Path("/Users/muna/Documents/Aryan/aryan_try/ratenepal/nepal_news_aggregator")
        self.main_db = Path("news_aggregator/nepal_news_intelligence.db")

        # Existing working collectors
        self.collectors = {
            'rss': self.ratenepal_base / "rss_collector_working.py",
            'facebook': self.ratenepal_base / "facebook_news_collector.py",
            'scraping': self.ratenepal_base / "optimized_full_collector.py",
            'daily': self.ratenepal_base / "automated_daily_updates.py"
        }

        self.setup_logging()

    def setup_logging(self):
        """Setup simple logging."""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('collection_runs.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger('collection_runner')

    def verify_collectors(self):
        """Verify all our collectors exist."""
        missing = []
        for name, path in self.collectors.items():
            if not path.exists():
                missing.append(f"{name}: {path}")

        if missing:
            self.logger.error("Missing collectors:")
            for item in missing:
                self.logger.error(f"  - {item}")
            return False
        return True

    def run_collector(self, collector_name: str, **kwargs) -> dict:
        """Run a specific collector and return results."""
        if collector_name not in self.collectors:
            raise ValueError(f"Unknown collector: {collector_name}")

        collector_path = self.collectors[collector_name]
        self.logger.info(f"Running {collector_name} collector: {collector_path}")

        start_time = time.time()
        old_cwd = os.getcwd()

        try:
            # Change to ratenepal directory for proper imports
            os.chdir(self.ratenepal_base)

            # Build command
            cmd = [sys.executable, str(collector_path)]

            # Add specific arguments based on collector
            if collector_name == 'scraping':
                cmd.extend(["--limit", "50"])  # Limit articles for faster runs
            elif collector_name == 'facebook':
                cmd.extend(["--pages", "5"])   # Limit pages to scrape

            # Run the collector
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=600  # 10 minute timeout
            )

            duration = time.time() - start_time

            if result.returncode == 0:
                self.logger.info(f"{collector_name} completed successfully in {duration:.1f}s")

                # Try to extract article count from output
                articles_collected = self._extract_article_count(result.stdout)

                return {
                    'status': 'success',
                    'duration': duration,
                    'articles_collected': articles_collected,
                    'output': result.stdout[-500:] if result.stdout else ''  # Last 500 chars
                }
            else:
                self.logger.error(f"{collector_name} failed with return code {result.returncode}")
                self.logger.error(f"Error output: {result.stderr}")

                return {
                    'status': 'error',
                    'duration': duration,
                    'error': result.stderr,
                    'return_code': result.returncode
                }

        except subprocess.TimeoutExpired:
            self.logger.error(f"{collector_name} timed out after 10 minutes")
            return {
                'status': 'timeout',
                'duration': time.time() - start_time
            }
        except Exception as e:
            self.logger.error(f"Error running {collector_name}: {e}")
            return {
                'status': 'exception',
                'duration': time.time() - start_time,
                'error': str(e)
            }
        finally:
            os.chdir(old_cwd)

    def _extract_article_count(self, output: str) -> int:
        """Try to extract article count from collector output."""
        if not output:
            return 0

        import re
        patterns = [
            r'(\d+)\s+articles?\s+collected',
            r'collected\s+(\d+)\s+articles?',
            r'total[:\s]+(\d+)',
            r'(\d+)\s+new\s+articles?'
        ]

        for pattern in patterns:
            match = re.search(pattern, output, re.IGNORECASE)
            if match:
                return int(match.group(1))

        return 0

    def run_all_collectors(self):
        """Run all three collection methods in sequence."""
        self.logger.info("Starting comprehensive news collection...")

        if not self.verify_collectors():
            return

        start_time = time.time()
        results = {}
        total_articles = 0

        # Run in order of efficiency: RSS -> Scraping -> Facebook
        collection_order = ['rss', 'scraping', 'facebook']

        for collector in collection_order:
            if self.collectors[collector].exists():
                result = self.run_collector(collector)
                results[collector] = result

                if result['status'] == 'success':
                    total_articles += result.get('articles_collected', 0)

                # Small delay between collectors
                time.sleep(5)

        total_duration = time.time() - start_time

        # Log summary
        self.logger.info(f"Collection cycle completed in {total_duration:.1f}s")
        self.logger.info(f"Total articles collected: {total_articles}")

        for collector, result in results.items():
            status = result['status']
            duration = result.get('duration', 0)
            articles = result.get('articles_collected', 0)
            self.logger.info(f"  {collector}: {status} - {articles} articles in {duration:.1f}s")

        return results

    def setup_cron_schedule(self):
        """Help user set up cron job for automated collection."""
        script_path = os.path.abspath(__file__)

        cron_entries = [
            "# Nepal News Collection - Every 3 hours",
            f"0 */3 * * * cd {os.getcwd()} && python {script_path} --all >> collection_cron.log 2>&1",
            "",
            "# Alternative: Twice daily at 8 AM and 8 PM",
            f"# 0 8,20 * * * cd {os.getcwd()} && python {script_path} --all >> collection_cron.log 2>&1"
        ]

        print("To set up automated collection, add this to your crontab:")
        print("(Run: crontab -e)")
        print()
        for entry in cron_entries:
            print(entry)
        print()
        print("This will run all collectors every 3 hours automatically.")
        print("Logs will be saved to collection_cron.log")


def main():
    parser = argparse.ArgumentParser(description='Nepal News Collection Runner')
    parser.add_argument('--rss', action='store_true', help='Run RSS feed collection')
    parser.add_argument('--facebook', action='store_true', help='Run Facebook collection')
    parser.add_argument('--scraping', action='store_true', help='Run direct website scraping')
    parser.add_argument('--daily', action='store_true', help='Run daily update system')
    parser.add_argument('--all', action='store_true', help='Run all collection methods')
    parser.add_argument('--schedule', action='store_true', help='Show cron schedule setup')
    parser.add_argument('--verify', action='store_true', help='Verify all collectors exist')

    args = parser.parse_args()

    if not any([args.rss, args.facebook, args.scraping, args.daily, args.all, args.schedule, args.verify]):
        parser.print_help()
        return

    runner = NewsCollectionRunner()

    if args.verify:
        if runner.verify_collectors():
            print("✅ All collectors found and ready")
        else:
            print("❌ Some collectors are missing")
        return

    if args.schedule:
        runner.setup_cron_schedule()
        return

    # Run specific collectors
    if args.all:
        runner.run_all_collectors()
    else:
        if args.rss:
            runner.run_collector('rss')
        if args.facebook:
            runner.run_collector('facebook')
        if args.scraping:
            runner.run_collector('scraping')
        if args.daily:
            runner.run_collector('daily')


if __name__ == "__main__":
    main()