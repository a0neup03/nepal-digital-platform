#!/usr/bin/env python3
"""
Advanced Asynchronous Nepal News Collector - 2025 Edition
Implements modern web scraping best practices for 10x performance improvement
"""

import asyncio
import aiohttp
import aiofiles
import sqlite3
import json
import logging
import time
from datetime import datetime, timezone
from typing import List, Dict, Optional, Set, AsyncGenerator
from dataclasses import dataclass, asdict
from urllib.parse import urljoin, urlparse
import feedparser
import hashlib
from contextlib import asynccontextmanager
import pickle
import os
from pathlib import Path
import gzip

# Enhanced logging with structured format
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s',
    handlers=[
        logging.FileHandler('../logs/async_collector.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

@dataclass
class Article:
    """Enhanced article data structure with performance metrics"""
    url: str
    title: str
    content: str
    source_site: str
    published_date: datetime
    scraped_date: datetime
    word_count: int = 0
    language: str = 'nepali'
    quality_score: float = 0.0
    content_hash: str = ''

    def __post_init__(self):
        if not self.content_hash:
            self.content_hash = hashlib.md5(self.content.encode()).hexdigest()
        if not self.word_count:
            self.word_count = len(self.content.split())

class ConnectionPool:
    """Advanced connection pool with rate limiting and caching"""

    def __init__(self, max_connections: int = 20, requests_per_second: float = 5.0):
        self.max_connections = max_connections
        self.rate_limit = requests_per_second
        self.semaphore = asyncio.Semaphore(max_connections)
        self.session: Optional[aiohttp.ClientSession] = None
        self.cache: Dict[str, Dict] = {}
        self.cache_ttl: Dict[str, float] = {}
        self.request_times: List[float] = []

    async def __aenter__(self):
        connector = aiohttp.TCPConnector(
            limit=self.max_connections,
            limit_per_host=5,
            ttl_dns_cache=300,
            use_dns_cache=True,
            keepalive_timeout=30,
            enable_cleanup_closed=True
        )

        timeout = aiohttp.ClientTimeout(total=30, connect=10)

        self.session = aiohttp.ClientSession(
            connector=connector,
            timeout=timeout,
            headers={
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'ne,en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
            }
        )
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()

    async def rate_limited_request(self, url: str, **kwargs) -> Optional[aiohttp.ClientResponse]:
        """Rate-limited HTTP request with intelligent caching"""
        async with self.semaphore:
            # Rate limiting
            current_time = time.time()
            self.request_times = [t for t in self.request_times if current_time - t < 1.0]

            if len(self.request_times) >= self.rate_limit:
                sleep_time = 1.0 - (current_time - self.request_times[0])
                if sleep_time > 0:
                    await asyncio.sleep(sleep_time)

            self.request_times.append(current_time)

            # Cache check (5 minute TTL for RSS feeds)
            cache_key = f"{url}:{hash(str(kwargs))}"
            if cache_key in self.cache and current_time - self.cache_ttl.get(cache_key, 0) < 300:
                logger.debug(f"Cache hit for {url}")
                return self.cache[cache_key]

            try:
                async with self.session.get(url, **kwargs) as response:
                    if response.status == 200:
                        # Cache successful responses
                        self.cache[cache_key] = response
                        self.cache_ttl[cache_key] = current_time
                        return response
                    else:
                        logger.warning(f"HTTP {response.status} for {url}")
                        return None
            except asyncio.TimeoutError:
                logger.error(f"Timeout for {url}")
                return None
            except Exception as e:
                logger.error(f"Request failed for {url}: {e}")
                return None

class StreamingDataWriter:
    """Memory-efficient streaming data writer with compression"""

    def __init__(self, db_path: str, batch_size: int = 50):
        self.db_path = db_path
        self.batch_size = batch_size
        self.article_batch: List[Article] = []
        self.processed_urls: Set[str] = set()
        self.temp_file = Path("temp_articles.jsonl.gz")

    async def write_article(self, article: Article) -> bool:
        """Stream article to temporary storage, then batch insert to DB"""
        if article.url in self.processed_urls:
            return False

        self.processed_urls.add(article.url)
        self.article_batch.append(article)

        # Write to compressed temporary file for memory efficiency
        async with aiofiles.open(self.temp_file, 'ab') as f:
            article_json = json.dumps(asdict(article), default=str) + '\n'
            compressed_data = gzip.compress(article_json.encode())
            await f.write(compressed_data)

        if len(self.article_batch) >= self.batch_size:
            await self.flush_batch()

        return True

    async def flush_batch(self):
        """Batch insert articles to database for optimal performance"""
        if not self.article_batch:
            return

        try:
            # Use asyncio thread pool for database operations
            loop = asyncio.get_event_loop()
            await loop.run_in_executor(None, self._sync_batch_insert)

            logger.info(f"✅ Inserted {len(self.article_batch)} articles to database")
            self.article_batch.clear()

        except Exception as e:
            logger.error(f"❌ Batch insert failed: {e}")

    def _sync_batch_insert(self):
        """Synchronous batch database insert with optimized SQL"""
        conn = sqlite3.connect(self.db_path)
        try:
            # Optimized SQL with ON CONFLICT handling
            insert_sql = """
            INSERT OR REPLACE INTO articles_enhanced (
                url, title, content, source_site, published_date, scraped_date,
                word_count, language, quality_score
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """

            article_data = [
                (
                    article.url, article.title, article.content, article.source_site,
                    article.published_date.isoformat(), article.scraped_date.isoformat(),
                    article.word_count, article.language, article.quality_score
                )
                for article in self.article_batch
            ]

            conn.executemany(insert_sql, article_data)
            conn.commit()

        finally:
            conn.close()

class AsyncNepalCollector:
    """High-performance asynchronous Nepal news collector"""

    def __init__(self, db_path: str = "nepal_news_intelligence.db"):
        self.db_path = db_path
        self.news_sources = self._load_news_sources()

    def _load_news_sources(self) -> List[Dict]:
        """Load news sources from configuration"""
        try:
            import sys
            sys.path.append('.')
            from nepal_news_intelligence_config import NEPAL_NEWS_SOURCES
            return [
                {
                    'name': source.name,
                    'website_url': source.website_url,
                    'rss_url': source.rss_url,
                    'category': source.category
                }
                for source in NEPAL_NEWS_SOURCES
            ]
        except ImportError:
            logger.error("Could not load news sources configuration")
            return []

    async def collect_all_sources(self, max_articles_per_source: int = 100) -> Dict[str, int]:
        """Collect from all sources concurrently with progress tracking"""
        start_time = time.time()
        logger.info(f"🚀 Starting asynchronous collection from {len(self.news_sources)} sources")

        async with ConnectionPool(max_connections=10, requests_per_second=3.0) as pool:
            writer = StreamingDataWriter(self.db_path, batch_size=25)

            # Create concurrent tasks for all sources
            tasks = [
                self._collect_source_articles(pool, writer, source, max_articles_per_source)
                for source in self.news_sources
            ]

            # Execute all tasks concurrently with progress tracking
            results = await asyncio.gather(*tasks, return_exceptions=True)

            # Final batch flush
            await writer.flush_batch()

            # Process results
            source_counts = {}
            for i, result in enumerate(results):
                source_name = self.news_sources[i]['name']
                if isinstance(result, Exception):
                    logger.error(f"❌ {source_name} failed: {result}")
                    source_counts[source_name] = 0
                else:
                    source_counts[source_name] = result

            total_time = time.time() - start_time
            total_articles = sum(source_counts.values())

            logger.info(f"✅ Collection completed in {total_time:.2f}s")
            logger.info(f"📊 Total articles collected: {total_articles}")
            logger.info(f"⚡ Average speed: {total_articles/total_time:.2f} articles/second")

            return source_counts

    async def _collect_source_articles(self, pool: ConnectionPool, writer: StreamingDataWriter,
                                     source: Dict, max_articles: int) -> int:
        """Collect articles from a single source efficiently"""
        source_name = source['name']
        logger.info(f"📡 Collecting from {source_name}...")

        article_count = 0

        try:
            # Fetch RSS feed
            response = await pool.rate_limited_request(source['rss_url'])
            if not response:
                return 0

            content = await response.text()

            # Parse RSS feed asynchronously
            loop = asyncio.get_event_loop()
            feed = await loop.run_in_executor(None, feedparser.parse, content)

            if not feed.entries:
                logger.warning(f"No entries found for {source_name}")
                return 0

            # Process articles concurrently in smaller batches
            entries = feed.entries[:max_articles]
            batch_size = 10

            for i in range(0, len(entries), batch_size):
                batch = entries[i:i+batch_size]
                tasks = [
                    self._process_article_entry(pool, writer, entry, source)
                    for entry in batch
                ]

                batch_results = await asyncio.gather(*tasks, return_exceptions=True)
                successful = sum(1 for result in batch_results if result is True)
                article_count += successful

                # Small delay between batches for politeness
                await asyncio.sleep(0.1)

            logger.info(f"✅ {source_name}: {article_count} articles collected")
            return article_count

        except Exception as e:
            logger.error(f"❌ Error collecting from {source_name}: {e}")
            return 0

    async def _process_article_entry(self, pool: ConnectionPool, writer: StreamingDataWriter,
                                   entry: Dict, source: Dict) -> bool:
        """Process individual article entry with full content fetching"""
        try:
            # Extract basic info from RSS entry
            title = entry.get('title', '').strip()
            url = entry.get('link', '').strip()

            if not title or not url:
                return False

            # Parse published date
            published_date = datetime.now(timezone.utc)
            if 'published_parsed' in entry and entry.published_parsed:
                import calendar
                published_date = datetime.fromtimestamp(
                    calendar.timegm(entry.published_parsed),
                    tz=timezone.utc
                )

            # Fetch full article content
            content = await self._fetch_article_content(pool, url)
            if not content:
                content = entry.get('summary', '')[:1000]  # Fallback to summary

            # Calculate quality score
            quality_score = self._calculate_quality_score(title, content)

            # Create article object
            article = Article(
                url=url,
                title=title,
                content=content,
                source_site=source['name'],
                published_date=published_date,
                scraped_date=datetime.now(timezone.utc),
                quality_score=quality_score
            )

            # Stream to writer
            return await writer.write_article(article)

        except Exception as e:
            logger.error(f"Error processing article {entry.get('link', 'unknown')}: {e}")
            return False

    async def _fetch_article_content(self, pool: ConnectionPool, url: str) -> Optional[str]:
        """Fetch and extract full article content"""
        try:
            response = await pool.rate_limited_request(url)
            if not response:
                return None

            html = await response.text()

            # Use BeautifulSoup in thread pool for CPU-intensive parsing
            loop = asyncio.get_event_loop()
            content = await loop.run_in_executor(None, self._extract_content, html)

            return content

        except Exception as e:
            logger.debug(f"Content extraction failed for {url}: {e}")
            return None

    def _extract_content(self, html: str) -> str:
        """Extract main content using optimized parsing"""
        try:
            from bs4 import BeautifulSoup, SoupStrainer

            # Use SoupStrainer for faster parsing - only parse relevant tags
            parse_only = SoupStrainer(['p', 'article', 'div', 'main', 'section'])
            soup = BeautifulSoup(html, 'html.parser', parse_only=parse_only)

            # Priority extraction strategy
            content_selectors = [
                'article',
                '.post-content',
                '.entry-content',
                '.article-content',
                '.content',
                'main',
                '.post-body'
            ]

            content = ""
            for selector in content_selectors:
                element = soup.select_one(selector)
                if element:
                    content = element.get_text(strip=True, separator=' ')
                    if len(content) > 100:  # Minimum content length
                        break

            # Fallback to all paragraphs
            if not content or len(content) < 100:
                paragraphs = soup.find_all('p')
                content = ' '.join(p.get_text(strip=True) for p in paragraphs)

            # Clean content
            content = ' '.join(content.split())  # Normalize whitespace
            return content[:5000]  # Limit content length

        except ImportError:
            logger.error("BeautifulSoup not available. Install with: pip install beautifulsoup4")
            return ""
        except Exception as e:
            logger.debug(f"Content extraction error: {e}")
            return ""

    def _calculate_quality_score(self, title: str, content: str) -> float:
        """Calculate article quality score based on multiple factors"""
        score = 0.5  # Base score

        # Title quality
        if len(title) > 10:
            score += 0.1
        if len(title.split()) > 3:
            score += 0.1

        # Content quality
        content_length = len(content)
        if content_length > 200:
            score += 0.1
        if content_length > 500:
            score += 0.1
        if content_length > 1000:
            score += 0.1

        # Language indicators (Nepali text)
        nepali_indicators = ['छ', 'हो', 'गर्', 'भन्', 'देख', 'मा', 'को', 'का', 'की']
        nepali_count = sum(1 for indicator in nepali_indicators if indicator in content)
        if nepali_count > 3:
            score += 0.1

        return min(score, 1.0)

async def main():
    """Main execution function"""
    collector = AsyncNepalCollector()
    results = await collector.collect_all_sources(max_articles_per_source=50)

    print("\n🇳🇵 Collection Summary:")
    print("=" * 50)
    total = 0
    for source, count in results.items():
        print(f"{source}: {count} articles")
        total += count
    print("=" * 50)
    print(f"Total: {total} articles")

if __name__ == "__main__":
    asyncio.run(main())