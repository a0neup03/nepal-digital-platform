#!/usr/bin/env python3
"""
Production Nepal News Collector - 2025 Edition
Optimized with working RSS sources and modern web scraping techniques
"""

import asyncio
import aiohttp
import sqlite3
import json
import logging
import time
from datetime import datetime, timezone
from typing import List, Dict, Optional, Set
from dataclasses import dataclass, asdict
import feedparser
import hashlib
from contextlib import asynccontextmanager
import concurrent.futures

# Enhanced logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('../logs/production_collector.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

@dataclass
class Article:
    """Enhanced article data structure"""
    url: str
    title: str
    content: str
    source_site: str
    published_date: datetime
    scraped_date: datetime
    word_count: int = 0
    language: str = 'nepali'
    quality_score: float = 0.0

    def __post_init__(self):
        if not self.word_count:
            self.word_count = len(self.content.split())

class OptimizedDatabaseWriter:
    """High-performance database writer with batch operations and transactions"""

    def __init__(self, db_path: str, batch_size: int = 100):
        self.db_path = db_path
        self.batch_size = batch_size
        self.article_buffer: List[Article] = []
        self.processed_urls: Set[str] = set()
        self._ensure_tables()

    def _ensure_tables(self):
        """Ensure required database tables exist"""
        try:
            with sqlite3.connect(self.db_path) as conn:
                conn.execute("""
                    CREATE TABLE IF NOT EXISTS articles_enhanced (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        url TEXT UNIQUE NOT NULL,
                        title TEXT NOT NULL,
                        content TEXT,
                        source_site TEXT NOT NULL,
                        published_date TIMESTAMP,
                        scraped_date TIMESTAMP,
                        word_count INTEGER DEFAULT 0,
                        language TEXT DEFAULT 'nepali',
                        quality_score REAL DEFAULT 0.0,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """)

                # Create indexes for performance
                conn.execute("CREATE INDEX IF NOT EXISTS idx_source_site ON articles_enhanced(source_site)")
                conn.execute("CREATE INDEX IF NOT EXISTS idx_published_date ON articles_enhanced(published_date)")
                conn.execute("CREATE INDEX IF NOT EXISTS idx_scraped_date ON articles_enhanced(scraped_date)")

                conn.commit()
                logger.info("✅ Database tables initialized")
        except Exception as e:
            logger.error(f"❌ Database initialization failed: {e}")

    async def add_article(self, article: Article) -> bool:
        """Add article to buffer for batch processing"""
        if article.url in self.processed_urls:
            return False

        self.processed_urls.add(article.url)
        self.article_buffer.append(article)

        if len(self.article_buffer) >= self.batch_size:
            await self.flush_buffer()

        return True

    async def flush_buffer(self) -> int:
        """Flush article buffer to database with optimized batch operations"""
        if not self.article_buffer:
            return 0

        try:
            # Use thread pool for database operations to avoid blocking
            loop = asyncio.get_event_loop()
            with concurrent.futures.ThreadPoolExecutor() as executor:
                inserted_count = await loop.run_in_executor(executor, self._sync_batch_insert)

            logger.info(f"✅ Batch inserted {inserted_count} articles")
            self.article_buffer.clear()
            return inserted_count

        except Exception as e:
            logger.error(f"❌ Batch insert failed: {e}")
            return 0

    def _sync_batch_insert(self) -> int:
        """Optimized synchronous batch insert with proper error handling"""
        if not self.article_buffer:
            return 0

        with sqlite3.connect(self.db_path) as conn:
            # Enable WAL mode for better concurrency
            conn.execute("PRAGMA journal_mode=WAL")
            conn.execute("PRAGMA synchronous=NORMAL")
            conn.execute("PRAGMA cache_size=10000")

            insert_sql = """
                INSERT OR REPLACE INTO articles_enhanced (
                    url, title, content, source_site, published_date, scraped_date,
                    word_count, language, quality_score
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """

            # Prepare batch data
            batch_data = []
            for article in self.article_buffer:
                batch_data.append((
                    article.url,
                    article.title,
                    article.content,
                    article.source_site,
                    article.published_date.isoformat(),
                    article.scraped_date.isoformat(),
                    article.word_count,
                    article.language,
                    article.quality_score
                ))

            # Execute batch insert in transaction
            cursor = conn.executemany(insert_sql, batch_data)
            conn.commit()

            return cursor.rowcount

class ProductionNepalCollector:
    """Production-ready Nepal news collector with verified working sources"""

    def __init__(self, db_path: str = "nepal_news_intelligence.db"):
        self.db_path = db_path
        self.working_sources = self._get_verified_sources()

    def _get_verified_sources(self) -> List[Dict]:
        """Return only verified working RSS sources as of 2025"""
        return [
            {
                'name': 'BBC Nepali',
                'rss_url': 'https://feeds.bbci.co.uk/nepali/rss.xml',
                'category': 'international'
            },
            {
                'name': 'Online Khabar',
                'rss_url': 'https://www.onlinekhabar.com/feed',
                'category': 'mainstream'
            },
            {
                'name': 'Ratopati',
                'rss_url': 'https://ratopati.com/feed',
                'category': 'mainstream'
            },
            {
                'name': 'Setopati',
                'rss_url': 'https://setopati.com/feed/',
                'category': 'mainstream'
            },
            {
                'name': 'Ujyalo Online',
                'rss_url': 'https://ujyaaloonline.com/rss.xml',
                'category': 'mainstream'
            },
            {
                'name': 'Nagarik News',
                'rss_url': 'https://nagariknews.nagariknetwork.com/feed/',
                'category': 'mainstream'
            }
        ]

    async def collect_all_sources(self, max_articles_per_source: int = 50) -> Dict[str, int]:
        """Collect from all working sources with performance monitoring"""
        start_time = time.time()
        logger.info(f"🚀 Starting production collection from {len(self.working_sources)} verified sources")

        # Connection configuration optimized for Nepal news sites
        timeout = aiohttp.ClientTimeout(total=45, connect=15)
        connector = aiohttp.TCPConnector(
            limit=15,
            limit_per_host=3,
            ttl_dns_cache=600,
            keepalive_timeout=60
        )

        async with aiohttp.ClientSession(
            timeout=timeout,
            connector=connector,
            headers={
                'User-Agent': 'Mozilla/5.0 (compatible; NepalNewsBot/1.0; +https://nepalnews.info)',
                'Accept': 'application/rss+xml, application/xml, text/xml, text/html',
                'Accept-Language': 'ne,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cache-Control': 'no-cache'
            }
        ) as session:

            writer = OptimizedDatabaseWriter(self.db_path, batch_size=50)

            # Create tasks with controlled concurrency
            semaphore = asyncio.Semaphore(5)  # Limit to 5 concurrent sources
            tasks = [
                self._collect_from_source(session, semaphore, writer, source, max_articles_per_source)
                for source in self.working_sources
            ]

            # Execute with progress tracking
            results = await asyncio.gather(*tasks, return_exceptions=True)

            # Final flush
            await writer.flush_buffer()

            # Process results
            source_counts = {}
            successful_sources = 0

            for i, result in enumerate(results):
                source_name = self.working_sources[i]['name']
                if isinstance(result, Exception):
                    logger.error(f"❌ {source_name}: {result}")
                    source_counts[source_name] = 0
                else:
                    source_counts[source_name] = result
                    if result > 0:
                        successful_sources += 1

            total_time = time.time() - start_time
            total_articles = sum(source_counts.values())

            logger.info(f"✅ Production collection completed!")
            logger.info(f"📊 Results: {total_articles} articles from {successful_sources}/{len(self.working_sources)} sources")
            logger.info(f"⚡ Performance: {total_time:.2f}s ({total_articles/total_time:.1f} articles/sec)")
            logger.info(f"💾 Database: {self.db_path}")

            return source_counts

    async def _collect_from_source(self, session: aiohttp.ClientSession, semaphore: asyncio.Semaphore,
                                 writer: OptimizedDatabaseWriter, source: Dict, max_articles: int) -> int:
        """Collect articles from a single source with error handling"""
        async with semaphore:
            source_name = source['name']
            rss_url = source['rss_url']

            try:
                logger.info(f"📡 Collecting from {source_name}...")

                # Fetch RSS with retry logic
                for attempt in range(3):
                    try:
                        async with session.get(rss_url) as response:
                            if response.status == 200:
                                content = await response.text()
                                break
                            else:
                                logger.warning(f"HTTP {response.status} for {source_name} (attempt {attempt + 1})")
                                if attempt < 2:
                                    await asyncio.sleep(2 ** attempt)  # Exponential backoff
                    except asyncio.TimeoutError:
                        logger.warning(f"Timeout for {source_name} (attempt {attempt + 1})")
                        if attempt < 2:
                            await asyncio.sleep(2 ** attempt)
                else:
                    logger.error(f"❌ Failed to fetch {source_name} after 3 attempts")
                    return 0

                # Parse RSS feed
                feed = feedparser.parse(content)
                if not feed.entries:
                    logger.warning(f"No entries found in {source_name}")
                    return 0

                # Process articles with controlled concurrency
                entries = feed.entries[:max_articles]
                article_count = 0

                # Process in smaller batches to be polite to servers
                batch_size = 5
                for i in range(0, len(entries), batch_size):
                    batch = entries[i:i+batch_size]
                    tasks = [
                        self._process_entry(session, writer, entry, source)
                        for entry in batch
                    ]

                    results = await asyncio.gather(*tasks, return_exceptions=True)
                    successful = sum(1 for result in results if result is True)
                    article_count += successful

                    # Small delay between batches
                    await asyncio.sleep(0.5)

                logger.info(f"✅ {source_name}: {article_count} articles")
                return article_count

            except Exception as e:
                logger.error(f"❌ {source_name} failed: {e}")
                return 0

    async def _process_entry(self, session: aiohttp.ClientSession, writer: OptimizedDatabaseWriter,
                           entry: Dict, source: Dict) -> bool:
        """Process individual RSS entry with full content extraction"""
        try:
            title = entry.get('title', '').strip()
            url = entry.get('link', '').strip()

            if not title or not url:
                return False

            # Parse published date
            published_date = datetime.now(timezone.utc)
            if hasattr(entry, 'published_parsed') and entry.published_parsed:
                import calendar
                published_date = datetime.fromtimestamp(
                    calendar.timegm(entry.published_parsed),
                    tz=timezone.utc
                )

            # Extract content (prefer summary for RSS feeds)
            content = entry.get('summary', '')
            if not content:
                content = entry.get('description', '')

            # Clean content
            if content:
                # Remove HTML tags using simple regex (faster than BeautifulSoup for this)
                import re
                content = re.sub(r'<[^>]+>', '', content)
                content = re.sub(r'\s+', ' ', content).strip()

            # Calculate quality score
            quality_score = self._calculate_quality_score(title, content)

            # Create article
            article = Article(
                url=url,
                title=title,
                content=content[:2000],  # Limit content length
                source_site=source['name'],
                published_date=published_date,
                scraped_date=datetime.now(timezone.utc),
                quality_score=quality_score
            )

            return await writer.add_article(article)

        except Exception as e:
            logger.debug(f"Entry processing error: {e}")
            return False

    def _calculate_quality_score(self, title: str, content: str) -> float:
        """Calculate article quality score"""
        score = 0.5

        # Title quality
        if len(title) > 10:
            score += 0.1
        if len(title.split()) > 3:
            score += 0.1

        # Content quality
        content_length = len(content)
        if content_length > 100:
            score += 0.1
        if content_length > 300:
            score += 0.1
        if content_length > 600:
            score += 0.1

        # Nepali content detection
        nepali_chars = sum(1 for char in content if '\u0900' <= char <= '\u097F')
        if nepali_chars > 10:
            score += 0.1

        return min(score, 1.0)

async def main():
    """Main execution with performance monitoring"""
    collector = ProductionNepalCollector()

    start = time.time()
    results = await collector.collect_all_sources(max_articles_per_source=30)
    duration = time.time() - start

    print("\n🇳🇵 PRODUCTION COLLECTION SUMMARY")
    print("=" * 60)
    total_articles = 0
    for source, count in results.items():
        status = "✅" if count > 0 else "❌"
        print(f"{status} {source}: {count} articles")
        total_articles += count

    print("=" * 60)
    print(f"📊 Total Articles: {total_articles}")
    print(f"⏱️  Duration: {duration:.2f} seconds")
    print(f"⚡ Speed: {total_articles/duration:.1f} articles/second")
    print(f"💾 Saved to: nepal_news_intelligence.db")

if __name__ == "__main__":
    asyncio.run(main())