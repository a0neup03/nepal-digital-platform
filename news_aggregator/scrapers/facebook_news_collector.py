#!/usr/bin/env python3
"""
Enhanced Facebook News Collector for Nepal News Sources
Scrapes Facebook posts from news organizations and integrates with existing database
"""

import sqlite3
import requests
from bs4 import BeautifulSoup
import re
import time
import random
from datetime import datetime, timedelta
from typing import List, Dict, Optional
import json
import logging
from urllib.parse import urljoin, urlparse
import hashlib
from nepal_news_intelligence_config import NEPAL_NEWS_SOURCES, DatabaseConfig

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('facebook_collector.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class FacebookNewsCollector:
    """Enhanced Facebook news scraper for Nepal news sources"""

    def __init__(self, db_path: str = "nepal_news_intelligence.db"):
        """Initialize collector with database connection"""
        self.db_path = db_path
        self.session = requests.Session()

        # Set realistic headers to avoid blocking
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
        })

        # Rate limiting
        self.request_delay = (2, 5)  # Random delay between requests

        # Initialize database with enhanced schema
        self.init_database()

        logger.info("Facebook News Collector initialized")

    def init_database(self):
        """Initialize database with enhanced schema for Facebook integration"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()

            # Create enhanced facebook_posts table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS facebook_posts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    post_url TEXT UNIQUE NOT NULL,
                    post_id TEXT,
                    source_name TEXT NOT NULL,
                    facebook_page TEXT NOT NULL,
                    post_text TEXT,
                    post_date TIMESTAMP,
                    collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                    -- Post metrics
                    reactions_count INTEGER DEFAULT 0,
                    comments_count INTEGER DEFAULT 0,
                    shares_count INTEGER DEFAULT 0,

                    -- Content analysis
                    has_link BOOLEAN DEFAULT FALSE,
                    external_link TEXT,
                    word_count INTEGER DEFAULT 0,
                    language TEXT DEFAULT 'nepali',

                    -- Linking to news articles
                    linked_article_url TEXT,
                    is_news_post BOOLEAN DEFAULT TRUE,

                    -- Processing flags
                    content_extracted BOOLEAN DEFAULT FALSE,
                    sentiment_analyzed BOOLEAN DEFAULT FALSE,
                    duplicate_checked BOOLEAN DEFAULT FALSE,

                    FOREIGN KEY (linked_article_url) REFERENCES articles_enhanced (url)
                )
            """)

            # Create duplicate detection table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS content_duplicates (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    content_hash TEXT NOT NULL,
                    facebook_post_id INTEGER,
                    article_url TEXT,
                    similarity_score REAL,
                    link_type TEXT, -- 'identical', 'similar', 'related'
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                    FOREIGN KEY (facebook_post_id) REFERENCES facebook_posts (id),
                    FOREIGN KEY (article_url) REFERENCES articles_enhanced (url)
                )
            """)

            # Create source tracking table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS source_integration (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    source_name TEXT NOT NULL,
                    facebook_page TEXT NOT NULL,
                    website_url TEXT NOT NULL,

                    -- Collection stats
                    total_posts_collected INTEGER DEFAULT 0,
                    last_collection_date TIMESTAMP,
                    last_post_date TIMESTAMP,

                    -- Integration stats
                    linked_articles INTEGER DEFAULT 0,
                    duplicate_posts INTEGER DEFAULT 0,
                    unique_content_posts INTEGER DEFAULT 0,

                    -- Health metrics
                    collection_success_rate REAL DEFAULT 0.0,
                    avg_posts_per_day REAL DEFAULT 0.0,

                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                    UNIQUE(source_name, facebook_page)
                )
            """)

            conn.commit()
            conn.close()
            logger.info("Database schema initialized successfully")

        except Exception as e:
            logger.error(f"Database initialization failed: {e}")
            raise

    def scrape_facebook_posts(self, source) -> List[Dict]:
        """
        Scrape recent Facebook posts from a news source
        Uses mobile Facebook for better accessibility
        """
        posts = []

        # Convert regular Facebook URL to mobile version for better scraping
        mobile_url = self.convert_to_mobile_url(source.facebook_page)

        try:
            logger.info(f"Scraping Facebook posts from {source.name}: {mobile_url}")

            # Random delay to avoid rate limiting
            time.sleep(random.uniform(*self.request_delay))

            response = self.session.get(mobile_url, timeout=30)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, 'html.parser')

            # Find post containers (mobile Facebook structure)
            post_containers = soup.find_all(['article', 'div'], class_=re.compile(r'story|timeline|post'))

            if not post_containers:
                # Fallback: look for common mobile Facebook patterns
                post_containers = soup.find_all('div', string=re.compile(r'घण्टा|मिनेट|दिन|ago|hr|min|day', re.I))
                post_containers = [container.find_parent() for container in post_containers if container.find_parent()]
                post_containers = [container for container in post_containers if container]

            logger.info(f"Found {len(post_containers)} potential post containers for {source.name}")

            for container in post_containers[:20]:  # Limit to recent 20 posts
                try:
                    post_data = self.extract_post_data(container, source)
                    if post_data:
                        posts.append(post_data)

                except Exception as e:
                    logger.warning(f"Failed to extract post data: {e}")
                    continue

            logger.info(f"Successfully extracted {len(posts)} posts from {source.name}")

        except Exception as e:
            logger.error(f"Failed to scrape {source.name} Facebook page: {e}")

        return posts

    def convert_to_mobile_url(self, facebook_url: str) -> str:
        """Convert regular Facebook URL to mobile version for easier scraping"""
        if 'm.facebook.com' in facebook_url:
            return facebook_url

        # Extract page identifier
        if facebook_url.endswith('/'):
            facebook_url = facebook_url[:-1]

        page_id = facebook_url.split('/')[-1]
        return f"https://m.facebook.com/{page_id}"

    def extract_post_data(self, container, source) -> Optional[Dict]:
        """Extract post data from HTML container"""
        try:
            post_data = {
                'source_name': source.name,
                'facebook_page': source.facebook_page,
                'post_text': '',
                'post_date': None,
                'post_url': '',
                'has_link': False,
                'external_link': '',
                'reactions_count': 0,
                'comments_count': 0,
                'shares_count': 0,
                'word_count': 0,
                'is_news_post': True
            }

            # Extract post text
            text_elements = container.find_all(['p', 'div', 'span'], string=True)
            post_texts = []

            for element in text_elements:
                text = element.get_text(strip=True)
                if text and len(text) > 10 and not self.is_navigation_text(text):
                    post_texts.append(text)

            if post_texts:
                post_data['post_text'] = ' '.join(post_texts[:3])  # Combine up to 3 text segments
                post_data['word_count'] = len(post_data['post_text'].split())

            # Skip if no meaningful text
            if post_data['word_count'] < 5:
                return None

            # Extract links
            links = container.find_all('a', href=True)
            for link in links:
                href = link.get('href', '')
                if self.is_external_news_link(href):
                    post_data['has_link'] = True
                    post_data['external_link'] = self.resolve_facebook_redirect(href)
                    break

            # Extract post date (attempt various patterns)
            post_data['post_date'] = self.extract_post_date(container)

            # Generate post URL (best effort)
            post_data['post_url'] = self.generate_post_url(container, source)

            # Check if this looks like a news post
            post_data['is_news_post'] = self.is_news_post(post_data['post_text'])

            return post_data if post_data['is_news_post'] else None

        except Exception as e:
            logger.warning(f"Failed to extract post data: {e}")
            return None

    def is_navigation_text(self, text: str) -> bool:
        """Check if text is navigation/UI element rather than content"""
        navigation_patterns = [
            'Home', 'Timeline', 'About', 'Photos', 'More', 'Like', 'Comment', 'Share',
            'See More', 'See Less', 'View all comments', 'Log In', 'Sign Up',
            'घर', 'फोटो', 'बारे', 'टिप्पणी', 'साझा', 'लग इन'
        ]

        return any(pattern.lower() in text.lower() for pattern in navigation_patterns)

    def is_external_news_link(self, href: str) -> bool:
        """Check if link points to external news content"""
        if not href:
            return False

        # Common news URL patterns
        news_patterns = [
            '/news/', '/article/', '/story/', '/post/',
            'ratopati.com', 'setopati.com', 'onlinekhabar.com',
            'ekantipur.com', 'bbc.com/nepali', 'nagariknews.nagariknetwork.com'
        ]

        return any(pattern in href.lower() for pattern in news_patterns)

    def resolve_facebook_redirect(self, facebook_url: str) -> str:
        """Resolve Facebook redirect URLs to actual destination"""
        try:
            if 'l.facebook.com' in facebook_url or 'lm.facebook.com' in facebook_url:
                # Extract the actual URL from Facebook redirect
                if 'u=' in facebook_url:
                    import urllib.parse
                    parsed = urllib.parse.parse_qs(urllib.parse.urlparse(facebook_url).query)
                    if 'u' in parsed:
                        return urllib.parse.unquote(parsed['u'][0])

            return facebook_url

        except Exception as e:
            logger.warning(f"Failed to resolve Facebook redirect: {e}")
            return facebook_url

    def extract_post_date(self, container) -> Optional[datetime]:
        """Extract post date from various possible patterns"""
        try:
            # Look for time elements
            time_elements = container.find_all(['time', 'abbr', 'span'],
                                             class_=re.compile(r'time|date', re.I))

            # Also look for text patterns
            date_patterns = [
                r'(\d+)\s*घण्टा',  # X hours ago in Nepali
                r'(\d+)\s*मिनेट',  # X minutes ago in Nepali
                r'(\d+)\s*दिन',    # X days ago in Nepali
                r'(\d+)\s*hr',     # X hr ago
                r'(\d+)\s*min',    # X min ago
                r'(\d+)\s*day',    # X day ago
            ]

            # Try to extract from element attributes
            for element in time_elements:
                if element.get('datetime'):
                    try:
                        return datetime.fromisoformat(element['datetime'].replace('Z', '+00:00'))
                    except:
                        pass

                if element.get('data-utime'):
                    try:
                        return datetime.fromtimestamp(int(element['data-utime']))
                    except:
                        pass

            # Try to extract from text patterns
            text_content = container.get_text()
            for pattern in date_patterns:
                match = re.search(pattern, text_content, re.I)
                if match:
                    value = int(match.group(1))
                    if 'घण्टा' in pattern or 'hr' in pattern:
                        return datetime.now() - timedelta(hours=value)
                    elif 'मिनेट' in pattern or 'min' in pattern:
                        return datetime.now() - timedelta(minutes=value)
                    elif 'दिन' in pattern or 'day' in pattern:
                        return datetime.now() - timedelta(days=value)

            return None

        except Exception as e:
            logger.warning(f"Failed to extract post date: {e}")
            return None

    def generate_post_url(self, container, source) -> str:
        """Generate a best-effort post URL"""
        try:
            # Look for permalink or story URL
            permalink_links = container.find_all('a', href=re.compile(r'story|posts|permalink'))

            if permalink_links:
                href = permalink_links[0].get('href', '')
                if href.startswith('/'):
                    return f"https://facebook.com{href}"
                elif href.startswith('http'):
                    return href

            # Fallback: generate timestamp-based URL
            timestamp = int(time.time())
            page_id = source.facebook_id
            return f"https://facebook.com/{page_id}/posts/{timestamp}"

        except Exception as e:
            logger.warning(f"Failed to generate post URL: {e}")
            return f"https://facebook.com/{source.facebook_id}"

    def is_news_post(self, text: str) -> bool:
        """Determine if post text appears to be news content"""
        if len(text) < 20:
            return False

        # News indicators in Nepali and English
        news_indicators = [
            # Nepali terms
            'सरकार', 'मन्त्री', 'प्रधानमन्त्री', 'संसद', 'राजनीति',
            'अर्थतन्त्र', 'शिक्षा', 'स्वास्थ्य', 'काठमाडौं', 'नेपाल',
            'भारत', 'चीन', 'कांग्रेस', 'एमाले', 'घटना', 'समाचार',

            # English terms
            'government', 'minister', 'nepal', 'kathmandu', 'politics',
            'economy', 'education', 'health', 'news', 'breaking',
            'report', 'according', 'statement', 'announced'
        ]

        # Check for news indicators
        text_lower = text.lower()
        indicator_count = sum(1 for indicator in news_indicators if indicator in text_lower)

        # News posts should have at least 2 news indicators and reasonable length
        return indicator_count >= 2 and len(text.split()) >= 10

    def save_posts_to_database(self, posts: List[Dict]) -> int:
        """Save collected posts to database with duplicate checking"""
        if not posts:
            return 0

        saved_count = 0

        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()

            for post in posts:
                try:
                    # Check for duplicates based on post URL or text similarity
                    cursor.execute("""
                        SELECT id FROM facebook_posts
                        WHERE post_url = ? OR
                              (source_name = ? AND post_text = ?)
                    """, (post['post_url'], post['source_name'], post['post_text']))

                    if cursor.fetchone():
                        logger.debug(f"Skipping duplicate post: {post['post_url'][:50]}...")
                        continue

                    # Insert new post
                    cursor.execute("""
                        INSERT INTO facebook_posts (
                            post_url, source_name, facebook_page, post_text,
                            post_date, has_link, external_link, reactions_count,
                            comments_count, shares_count, word_count, language,
                            is_news_post
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (
                        post['post_url'],
                        post['source_name'],
                        post['facebook_page'],
                        post['post_text'],
                        post['post_date'],
                        post['has_link'],
                        post['external_link'],
                        post['reactions_count'],
                        post['comments_count'],
                        post['shares_count'],
                        post['word_count'],
                        'nepali',
                        post['is_news_post']
                    ))

                    saved_count += 1
                    logger.debug(f"Saved post: {post['post_text'][:50]}...")

                except Exception as e:
                    logger.warning(f"Failed to save post: {e}")
                    continue

            conn.commit()
            conn.close()

            logger.info(f"Saved {saved_count} new Facebook posts to database")

        except Exception as e:
            logger.error(f"Database save failed: {e}")

        return saved_count

    def update_source_stats(self, source_name: str, facebook_page: str, posts_collected: int):
        """Update collection statistics for source"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()

            cursor.execute("""
                INSERT OR REPLACE INTO source_integration (
                    source_name, facebook_page, website_url,
                    total_posts_collected, last_collection_date,
                    updated_at
                ) VALUES (?, ?, ?,
                         COALESCE((SELECT total_posts_collected FROM source_integration
                                  WHERE source_name = ? AND facebook_page = ?), 0) + ?,
                         CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            """, (source_name, facebook_page, '', source_name, facebook_page, posts_collected))

            conn.commit()
            conn.close()

        except Exception as e:
            logger.error(f"Failed to update source stats: {e}")

    def collect_all_sources(self) -> Dict[str, int]:
        """Collect Facebook posts from all configured news sources"""
        results = {}
        total_collected = 0

        logger.info(f"Starting Facebook collection for {len(NEPAL_NEWS_SOURCES)} sources")

        for source in NEPAL_NEWS_SOURCES:
            if not source.facebook_page or source.facebook_page == 'N/A':
                logger.info(f"Skipping {source.name}: No Facebook page configured")
                continue

            try:
                logger.info(f"Collecting from {source.name}...")

                posts = self.scrape_facebook_posts(source)
                saved_count = self.save_posts_to_database(posts)

                results[source.name] = saved_count
                total_collected += saved_count

                # Update source statistics
                self.update_source_stats(source.name, source.facebook_page, saved_count)

                logger.info(f"✅ {source.name}: {saved_count} new posts collected")

                # Rate limiting between sources
                time.sleep(random.uniform(3, 8))

            except Exception as e:
                logger.error(f"❌ Failed to collect from {source.name}: {e}")
                results[source.name] = 0

        logger.info(f"🎉 Facebook collection completed: {total_collected} total posts collected")
        return results

    def link_with_existing_articles(self) -> int:
        """Link Facebook posts with existing articles based on content similarity"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()

            # Get Facebook posts that haven't been linked yet
            cursor.execute("""
                SELECT id, post_text, external_link, source_name, post_date
                FROM facebook_posts
                WHERE linked_article_url IS NULL AND is_news_post = 1
                ORDER BY post_date DESC
                LIMIT 100
            """)

            facebook_posts = cursor.fetchall()

            if not facebook_posts:
                logger.info("No unlinked Facebook posts found")
                return 0

            # Get existing articles for comparison
            cursor.execute("""
                SELECT url, title, content, source_site, scraped_date
                FROM articles_enhanced
                WHERE scraped_date >= datetime('now', '-30 days')
                ORDER BY scraped_date DESC
            """)

            articles = cursor.fetchall()

            if not articles:
                logger.info("No recent articles found for linking")
                return 0

            links_created = 0

            for fb_post in facebook_posts:
                fb_id, fb_text, fb_link, fb_source, fb_date = fb_post

                # Try to find matching articles
                best_match = None
                best_score = 0

                for article in articles:
                    art_url, art_title, art_content, art_source, art_date = article

                    # Calculate similarity score
                    similarity_score = self.calculate_content_similarity(
                        fb_text, art_title, art_content, fb_source, art_source
                    )

                    if similarity_score > best_score and similarity_score > 0.3:
                        best_match = art_url
                        best_score = similarity_score

                # Link if good match found
                if best_match:
                    cursor.execute("""
                        UPDATE facebook_posts
                        SET linked_article_url = ?, duplicate_checked = 1
                        WHERE id = ?
                    """, (best_match, fb_id))

                    # Record the duplicate relationship
                    content_hash = hashlib.md5(fb_text.encode()).hexdigest()
                    cursor.execute("""
                        INSERT OR IGNORE INTO content_duplicates (
                            content_hash, facebook_post_id, article_url,
                            similarity_score, link_type
                        ) VALUES (?, ?, ?, ?, ?)
                    """, (content_hash, fb_id, best_match, best_score,
                          'similar' if best_score < 0.8 else 'identical'))

                    links_created += 1
                    logger.debug(f"Linked Facebook post {fb_id} to article {best_match} (score: {best_score:.2f})")
                else:
                    # Mark as checked even if no match
                    cursor.execute("""
                        UPDATE facebook_posts
                        SET duplicate_checked = 1
                        WHERE id = ?
                    """, (fb_id,))

            conn.commit()
            conn.close()

            logger.info(f"Created {links_created} Facebook-to-article links")
            return links_created

        except Exception as e:
            logger.error(f"Failed to link Facebook posts with articles: {e}")
            return 0

    def calculate_content_similarity(self, fb_text: str, art_title: str,
                                   art_content: str, fb_source: str, art_source: str) -> float:
        """Calculate similarity score between Facebook post and article"""
        try:
            score = 0.0

            # Source matching bonus
            if fb_source.lower() in art_source.lower() or art_source.lower() in fb_source.lower():
                score += 0.2

            # Text similarity using simple word overlap
            fb_words = set(fb_text.lower().split())
            art_words = set((art_title + ' ' + (art_content or '')).lower().split())

            if fb_words and art_words:
                intersection = len(fb_words.intersection(art_words))
                union = len(fb_words.union(art_words))
                jaccard_similarity = intersection / union if union > 0 else 0
                score += jaccard_similarity * 0.6

            # Title similarity (if Facebook post contains title keywords)
            if art_title:
                art_title_words = set(art_title.lower().split())
                title_intersection = len(fb_words.intersection(art_title_words))
                if title_intersection > 0:
                    score += (title_intersection / len(art_title_words)) * 0.4

            return min(score, 1.0)  # Cap at 1.0

        except Exception as e:
            logger.warning(f"Failed to calculate similarity: {e}")
            return 0.0

    def generate_collection_report(self) -> Dict:
        """Generate comprehensive collection report"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()

            # Overall stats
            cursor.execute("SELECT COUNT(*) FROM facebook_posts")
            total_posts = cursor.fetchone()[0]

            cursor.execute("SELECT COUNT(*) FROM facebook_posts WHERE collected_at >= datetime('now', '-24 hours')")
            posts_24h = cursor.fetchone()[0]

            cursor.execute("SELECT COUNT(*) FROM facebook_posts WHERE linked_article_url IS NOT NULL")
            linked_posts = cursor.fetchone()[0]

            # Source breakdown
            cursor.execute("""
                SELECT source_name, COUNT(*) as posts,
                       COUNT(CASE WHEN collected_at >= datetime('now', '-24 hours') THEN 1 END) as recent_posts,
                       COUNT(CASE WHEN linked_article_url IS NOT NULL THEN 1 END) as linked_posts
                FROM facebook_posts
                GROUP BY source_name
                ORDER BY posts DESC
            """)
            source_stats = cursor.fetchall()

            # Content stats
            cursor.execute("""
                SELECT
                    AVG(word_count) as avg_word_count,
                    COUNT(CASE WHEN has_link = 1 THEN 1 END) as posts_with_links,
                    COUNT(CASE WHEN is_news_post = 1 THEN 1 END) as news_posts
                FROM facebook_posts
            """)
            content_stats = cursor.fetchone()

            conn.close()

            report = {
                'collection_date': datetime.now().isoformat(),
                'total_facebook_posts': total_posts,
                'posts_last_24h': posts_24h,
                'linked_to_articles': linked_posts,
                'linking_rate': (linked_posts / total_posts * 100) if total_posts > 0 else 0,
                'avg_word_count': round(content_stats[0] or 0, 1),
                'posts_with_external_links': content_stats[1] or 0,
                'classified_as_news': content_stats[2] or 0,
                'source_breakdown': {
                    source[0]: {
                        'total_posts': source[1],
                        'recent_posts': source[2],
                        'linked_posts': source[3]
                    }
                    for source in source_stats
                }
            }

            return report

        except Exception as e:
            logger.error(f"Failed to generate collection report: {e}")
            return {}

def main():
    """Main execution function"""
    logger.info("🚀 Starting Enhanced Facebook News Collection")

    collector = FacebookNewsCollector()

    # Step 1: Collect new posts
    collection_results = collector.collect_all_sources()

    # Step 2: Link with existing articles
    logger.info("🔗 Linking Facebook posts with existing articles...")
    links_created = collector.link_with_existing_articles()

    # Step 3: Generate report
    report = collector.generate_collection_report()

    # Display results
    print("\n" + "="*60)
    print("📊 FACEBOOK COLLECTION COMPLETED")
    print("="*60)

    print(f"📈 Total Facebook Posts in Database: {report.get('total_facebook_posts', 0)}")
    print(f"🆕 New Posts Collected (24h): {report.get('posts_last_24h', 0)}")
    print(f"🔗 Posts Linked to Articles: {report.get('linked_to_articles', 0)}")
    print(f"📊 Article Linking Rate: {report.get('linking_rate', 0):.1f}%")

    print("\n📋 Source Breakdown:")
    for source, stats in report.get('source_breakdown', {}).items():
        print(f"  {source}: {stats['total_posts']} total, {stats['recent_posts']} recent")

    print(f"\n🎯 New Links Created: {links_created}")
    print(f"📝 Average Post Length: {report.get('avg_word_count', 0)} words")

    logger.info("✅ Facebook collection completed successfully")

if __name__ == "__main__":
    main()