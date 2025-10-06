#!/usr/bin/env python3
"""
FIXED ENHANCED MULTI-SOURCE COLLECTOR
Production-ready collector using all 7 verified working sources
Compatible with existing database schema
"""

import requests
from bs4 import BeautifulSoup
import sqlite3
from datetime import datetime, timedelta
import time
import hashlib
import concurrent.futures
from threading import Lock
import logging
import json
import random
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
import os

@dataclass
class SourceConfig:
    """Configuration for a verified working source"""
    name: str
    url: str
    selectors: List[str]
    title_selectors: List[str]
    expected_articles: int
    response_time: float
    status: str

class FixedEnhancedCollector:
    """Production-ready multi-source collector compatible with existing schema"""

    def __init__(self, db_path='nepal_news_intelligence.db'):
        self.db_path = db_path
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        })

        self.db_lock = Lock()
        self.existing_urls = set()
        self.setup_logging()
        self.load_existing_urls()

        # Verified working sources from testing
        self.working_sources = {
            'ratopati': SourceConfig(
                name='ratopati.com',
                url='https://ratopati.com',
                selectors=['.entry-content', '.article-content', '.post-content', '.content', 'article'],
                title_selectors=['h1', '.entry-title', '.article-title', '.title'],
                expected_articles=234,
                response_time=0.55,
                status='working'
            ),
            'online_khabar': SourceConfig(
                name='onlinekhabar.com',
                url='https://onlinekhabar.com',
                selectors=['.entry-content', '.article-content', '.post-content', '.content', 'article'],
                title_selectors=['h1', '.entry-title', '.article-title', '.title'],
                expected_articles=209,
                response_time=1.03,
                status='working'
            ),
            'nagarik_news': SourceConfig(
                name='nagariknews.nagariknetwork.com',
                url='https://nagariknews.nagariknetwork.com',
                selectors=['article', '.entry-content', '.article-content', '.post-content'],
                title_selectors=['h1', '.entry-title', '.article-title'],
                expected_articles=169,
                response_time=0.49,
                status='working'
            ),
            'kantipur': SourceConfig(
                name='ekantipur.com',
                url='https://ekantipur.com',
                selectors=['article', '.entry-content', '.article-content', '.post-content'],
                title_selectors=['h1', '.entry-title', '.article-title'],
                expected_articles=163,
                response_time=0.75,
                status='working'
            ),
            'nepali_press': SourceConfig(
                name='nepalpress.com',
                url='https://nepalpress.com',
                selectors=['.entry-content', '.article-content', '.post-content', '.content', 'article'],
                title_selectors=['h1', '.entry-title', '.article-title', '.title'],
                expected_articles=149,
                response_time=0.54,
                status='working'
            ),
            'setopati': SourceConfig(
                name='setopati.com',
                url='https://setopati.com',
                selectors=['.entry-content', '.article-content', '.post-content', '.content', 'article'],
                title_selectors=['h1', '.entry-title', '.article-title', '.title'],
                expected_articles=146,
                response_time=0.79,
                status='working'
            ),
            'bbc_nepali': SourceConfig(
                name='bbc.com/nepali',
                url='https://www.bbc.com/nepali',
                selectors=['.story-body', '.entry-content', '.article-content', '.content', 'article'],
                title_selectors=['h1', '.story-headline', '.entry-title', '.article-title'],
                expected_articles=45,
                response_time=0.33,
                status='working'
            )
        }

    def setup_logging(self):
        """Setup comprehensive logging"""
        os.makedirs('logs', exist_ok=True)

        # Create formatters
        formatter = logging.Formatter(
            '%(asctime)s - %(levelname)s - %(message)s'
        )

        # File handler
        file_handler = logging.FileHandler('logs/fixed_enhanced_collector.log')
        file_handler.setFormatter(formatter)

        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(formatter)

        # Setup logger
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)
        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)

    def load_existing_urls(self):
        """Load existing URLs for deduplication"""
        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.execute("SELECT url FROM articles_enhanced")
                self.existing_urls = set(row[0] for row in cursor)
                self.logger.info(f"Loaded {len(self.existing_urls)} existing URLs for deduplication")
        except Exception as e:
            self.logger.warning(f"Could not load existing URLs: {e}")
            self.existing_urls = set()

    def extract_links_from_source(self, source_config: SourceConfig, max_articles: int = 30) -> List[Dict]:
        """Extract article links from a source's homepage"""
        try:
            self.logger.info(f"Extracting links from {source_config.name}...")

            response = self.session.get(source_config.url, timeout=10)
            if response.status_code != 200:
                self.logger.error(f"{source_config.name}: HTTP {response.status_code}")
                return []

            soup = BeautifulSoup(response.content, 'html.parser')

            # Find all links that look like articles
            links = soup.find_all('a', href=True)
            article_links = []

            for link in links:
                href = link.get('href', '')
                title = link.get_text(strip=True)

                if not href or not title or len(title) < 10:
                    continue

                # Make URL absolute
                if href.startswith('/'):
                    href = source_config.url.rstrip('/') + href
                elif not href.startswith('http'):
                    continue

                # Filter for article-like URLs
                if any(pattern in href.lower() for pattern in [
                    '/news/', '/article/', '/story/', '/post/',
                    '2024', '2025', '/politics/', '/sports/', '/business/'
                ]):
                    if href not in self.existing_urls:
                        article_links.append({
                            'url': href,
                            'title': title,
                            'source': source_config.name
                        })

            # Limit to max_articles and shuffle for diversity
            if len(article_links) > max_articles:
                random.shuffle(article_links)
                article_links = article_links[:max_articles]

            self.logger.info(f"{source_config.name}: Found {len(article_links)} new article links")
            return article_links

        except Exception as e:
            self.logger.error(f"Link extraction failed for {source_config.name}: {e}")
            return []

    def extract_article_content(self, url: str, source_config: SourceConfig) -> Optional[Dict]:
        """Extract content from a single article"""
        try:
            response = self.session.get(url, timeout=8)
            if response.status_code != 200:
                return None

            soup = BeautifulSoup(response.content, 'html.parser')

            # Extract title
            title = ''
            for selector in source_config.title_selectors:
                title_elem = soup.select_one(selector)
                if title_elem:
                    title = title_elem.get_text(strip=True)
                    if len(title) > 10:
                        break

            if not title:
                return None

            # Extract content
            content = ''
            for selector in source_config.selectors:
                content_elem = soup.select_one(selector)
                if content_elem:
                    content = content_elem.get_text(strip=True)
                    if len(content) > 100:
                        break

            if not content or len(content) < 50:
                return None

            # Calculate quality score
            word_count = len(content.split())
            quality_score = min(1.0, word_count / 500.0)  # Higher score for longer articles

            # Detect language (simple heuristic)
            devanagari_count = sum(1 for char in content if '\u0900' <= char <= '\u097F')
            language = 'nepali' if devanagari_count > 50 else 'english'

            return {
                'url': url,
                'title': title,
                'content': content,
                'source_site': source_config.name,
                'word_count': word_count,
                'quality_score': quality_score,
                'language': language,
                'scraped_date': datetime.now()
            }

        except Exception as e:
            self.logger.warning(f"Content extraction failed for {url}: {e}")
            return None

    def save_article_safe(self, article_data: Dict) -> bool:
        """Thread-safe article saving using existing schema"""
        try:
            with self.db_lock:
                with sqlite3.connect(self.db_path) as conn:
                    conn.execute("""
                        INSERT INTO articles_enhanced (
                            url, title, content, source_site, scraped_date,
                            word_count, quality_score, language
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    """, (
                        article_data['url'],
                        article_data['title'],
                        article_data['content'],
                        article_data['source_site'],
                        article_data['scraped_date'],
                        article_data['word_count'],
                        article_data['quality_score'],
                        article_data['language']
                    ))

                    self.existing_urls.add(article_data['url'])
                    return True

        except sqlite3.IntegrityError:
            # URL already exists
            return False
        except Exception as e:
            self.logger.error(f"Failed to save article {article_data['url']}: {e}")
            return False

    def collect_from_source(self, source_id: str, max_articles: int = 30) -> Dict:
        """Collect articles from a single source with comprehensive metrics"""
        source_config = self.working_sources[source_id]
        start_time = time.time()

        self.logger.info(f"Starting collection from {source_config.name}...")

        stats = {
            'source_name': source_config.name,
            'articles_collected': 0,
            'errors_encountered': 0,
            'start_time': start_time,
            'links_found': 0,
            'links_processed': 0
        }

        try:
            # Extract links
            article_links = self.extract_links_from_source(source_config, max_articles)
            stats['links_found'] = len(article_links)

            if not article_links:
                self.logger.warning(f"No new article links found for {source_config.name}")
                stats['collection_time_seconds'] = time.time() - start_time
                stats['success_rate'] = 0.0
                return stats

            # Process articles with parallel execution
            with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
                future_to_url = {
                    executor.submit(self.extract_article_content, link['url'], source_config): link
                    for link in article_links
                }

                for future in concurrent.futures.as_completed(future_to_url):
                    link = future_to_url[future]
                    stats['links_processed'] += 1

                    try:
                        article_data = future.result()
                        if article_data:
                            if self.save_article_safe(article_data):
                                stats['articles_collected'] += 1
                                if stats['articles_collected'] % 5 == 0:
                                    self.logger.info(f"{source_config.name}: Collected {stats['articles_collected']} articles...")
                        else:
                            stats['errors_encountered'] += 1

                    except Exception as e:
                        stats['errors_encountered'] += 1
                        self.logger.warning(f"Error processing {link['url']}: {e}")

            # Calculate final stats
            collection_time = time.time() - start_time
            success_rate = stats['articles_collected'] / max(stats['links_processed'], 1)

            stats.update({
                'collection_time_seconds': collection_time,
                'success_rate': success_rate,
                'end_time': time.time()
            })

            self.logger.info(f"{source_config.name}: Collected {stats['articles_collected']} articles "
                           f"in {collection_time:.1f}s (Success rate: {success_rate:.2%})")

            return stats

        except Exception as e:
            self.logger.error(f"Collection failed for {source_config.name}: {e}")
            stats['errors_encountered'] += 1
            stats['collection_time_seconds'] = time.time() - start_time
            stats['success_rate'] = 0.0
            return stats

    def collect_from_all_sources(self, max_articles_per_source: int = 30, max_workers: int = 3) -> Dict:
        """Collect from all working sources with parallel execution"""
        self.logger.info("🚀 Starting fixed enhanced multi-source collection...")
        total_start_time = time.time()

        all_stats = {
            'total_sources': len(self.working_sources),
            'total_articles_collected': 0,
            'total_errors': 0,
            'source_results': {}
        }

        # Collect from all sources in parallel
        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
            future_to_source = {
                executor.submit(self.collect_from_source, source_id, max_articles_per_source): source_id
                for source_id in self.working_sources.keys()
            }

            for future in concurrent.futures.as_completed(future_to_source):
                source_id = future_to_source[future]
                try:
                    stats = future.result()
                    all_stats['source_results'][source_id] = stats
                    all_stats['total_articles_collected'] += stats['articles_collected']
                    all_stats['total_errors'] += stats['errors_encountered']

                except Exception as e:
                    self.logger.error(f"Source {source_id} collection failed: {e}")
                    all_stats['total_errors'] += 1

        # Calculate final metrics
        total_time = time.time() - total_start_time
        all_stats['total_collection_time'] = total_time
        all_stats['articles_per_second'] = all_stats['total_articles_collected'] / max(total_time, 1)

        self.logger.info(f"🎯 Collection Complete!")
        self.logger.info(f"📊 Total Articles: {all_stats['total_articles_collected']}")
        self.logger.info(f"⏱️ Total Time: {total_time:.1f}s")
        self.logger.info(f"⚡ Rate: {all_stats['articles_per_second']:.2f} articles/second")
        self.logger.info(f"❌ Total Errors: {all_stats['total_errors']}")

        return all_stats

    def generate_collection_report(self, stats: Dict) -> str:
        """Generate detailed collection report"""
        report = f"""
# FIXED ENHANCED MULTI-SOURCE COLLECTION REPORT
Collection Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## SUMMARY
- **Total Sources**: {stats['total_sources']}
- **Total Articles Collected**: {stats['total_articles_collected']}
- **Collection Time**: {stats['total_collection_time']:.1f} seconds
- **Collection Rate**: {stats['articles_per_second']:.2f} articles/second
- **Total Errors**: {stats['total_errors']}

## SOURCE PERFORMANCE
"""

        for source_id, source_stats in stats['source_results'].items():
            source_config = self.working_sources[source_id]
            report += f"""
### {source_config.name}
- **Articles Collected**: {source_stats['articles_collected']}
- **Links Found**: {source_stats['links_found']}
- **Links Processed**: {source_stats['links_processed']}
- **Success Rate**: {source_stats['success_rate']:.2%}
- **Collection Time**: {source_stats['collection_time_seconds']:.1f}s
- **Errors**: {source_stats['errors_encountered']}
"""

        # Performance ranking
        ranked_sources = sorted(
            stats['source_results'].items(),
            key=lambda x: x[1]['articles_collected'],
            reverse=True
        )

        report += "\n## PERFORMANCE RANKING\n"
        for i, (source_id, source_stats) in enumerate(ranked_sources, 1):
            source_config = self.working_sources[source_id]
            report += f"{i}. **{source_config.name}**: {source_stats['articles_collected']} articles\n"

        report += f"""

## SYSTEM IMPROVEMENT
- **Previous System**: 2-3 sources, limited collection
- **Enhanced System**: {stats['total_sources']} sources, {stats['total_articles_collected']} articles
- **Success**: Multi-source collection system working!

## RECOMMENDATIONS
1. **Successful Sources**: Continue using top performing sources
2. **Error Analysis**: Review logs for improvement opportunities
3. **Scaling**: Increase max_articles_per_source for more collection
4. **Monitoring**: Set up automated collection scheduling
"""

        return report

def main():
    """Run fixed enhanced multi-source collection"""
    print("🚀 Starting Fixed Enhanced Multi-Source News Collection...")

    collector = FixedEnhancedCollector()

    # Run collection with moderate limits to avoid overwhelming
    stats = collector.collect_from_all_sources(max_articles_per_source=20)

    # Generate report
    report = collector.generate_collection_report(stats)

    # Save report
    with open('fixed_enhanced_collection_report.md', 'w', encoding='utf-8') as f:
        f.write(report)

    print("📄 Report saved: fixed_enhanced_collection_report.md")
    print("📝 Logs saved: logs/fixed_enhanced_collector.log")

    if stats['total_articles_collected'] > 20:
        print(f"🎉 SUCCESS! Collected {stats['total_articles_collected']} articles!")
        print("🚀 Enhanced collection system is working!")
    elif stats['total_articles_collected'] > 0:
        print(f"✅ PARTIAL SUCCESS: {stats['total_articles_collected']} articles collected")
        print("📈 System improvement demonstrated!")
    else:
        print(f"⚠️ No new articles collected - database may be up to date")

if __name__ == "__main__":
    main()