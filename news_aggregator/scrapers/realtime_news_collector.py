#!/usr/bin/env python3
"""
Real-time News Collector for Nepal News Intelligence Platform
Continuously scrapes fresh articles from RSS feeds and websites
"""

import feedparser
import requests
import sqlite3
import pandas as pd
import logging
import time
from datetime import datetime, timedelta
from typing import List, Dict, Optional
from bs4 import BeautifulSoup
import hashlib
import re
import threading
from urllib.parse import urljoin, urlparse

from nepal_news_intelligence_config import NEPAL_NEWS_SOURCES

class RealTimeNewsCollector:
    """Real-time news collection system for Nepal sources"""

    def __init__(self, db_path="nepal_news_intelligence.db"):
        self.db_path = db_path
        self.setup_logging()
        self.setup_session()
        self.running = False

    def setup_logging(self):
        """Setup logging for real-time collection"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)

    def setup_session(self):
        """Setup requests session with proper headers"""
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
        })

    def scrape_rss_feed(self, source: object) -> List[Dict]:
        """Scrape RSS feed for new articles"""
        articles = []

        try:
            self.logger.info(f"Scraping RSS feed: {source.rss_url}")

            # Parse RSS feed
            feed = feedparser.parse(source.rss_url)

            if not feed.entries:
                self.logger.warning(f"No entries found in RSS feed for {source.name}")
                return articles

            for entry in feed.entries[:10]:  # Limit to 10 most recent
                try:
                    # Extract basic information
                    article = {
                        'url': entry.link,
                        'title': entry.title,
                        'published_date': self.parse_date(entry.get('published')),
                        'source_site': source.name,
                        'source_category': source.category,
                        'political_leaning': source.political_leaning,
                        'scraped_date': datetime.now().isoformat(),
                        'language': source.language
                    }

                    # Try to get full content
                    content = self.scrape_article_content(entry.link)
                    article['content'] = content
                    article['word_count'] = len(content.split()) if content else 0

                    # Generate story ID and other intelligence fields
                    article['story_id'] = self.generate_story_id(article['title'], content or '')
                    article['quality_score'] = self.calculate_quality_score(article)
                    article['sentiment_score'] = 0.0  # Will be calculated later
                    article['topic_category'] = self.categorize_topic(content or article['title'])

                    # Determine story phase (all new articles start as 'breaking')
                    article['story_phase'] = 'breaking'
                    article['first_source_flag'] = True  # Will be updated based on existing stories

                    articles.append(article)

                except Exception as e:
                    self.logger.warning(f"Error processing entry {entry.get('link', 'unknown')}: {e}")
                    continue

        except Exception as e:
            self.logger.error(f"Error scraping RSS feed {source.rss_url}: {e}")

        return articles

    def scrape_article_content(self, url: str) -> str:
        """Scrape full article content from URL"""
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, 'html.parser')

            # Remove unwanted elements
            for element in soup(['script', 'style', 'nav', 'header', 'footer', 'aside']):
                element.decompose()

            # Try common content selectors
            content_selectors = [
                'article', '.article-content', '.content', '.post-content',
                '.entry-content', '.news-content', 'main', '.main-content'
            ]

            content = ""
            for selector in content_selectors:
                content_elem = soup.select_one(selector)
                if content_elem:
                    content = content_elem.get_text(strip=True)
                    break

            # Fallback to body if no content found
            if not content:
                body = soup.find('body')
                if body:
                    content = body.get_text(strip=True)

            # Clean and limit content
            content = re.sub(r'\s+', ' ', content)
            return content[:5000]  # Limit to 5000 characters

        except Exception as e:
            self.logger.warning(f"Error scraping content from {url}: {e}")
            return ""

    def parse_date(self, date_str: str) -> Optional[str]:
        """Parse various date formats to ISO format"""
        if not date_str:
            return None

        try:
            # Try feedparser's built-in date parsing
            parsed = feedparser._parse_date(date_str)
            if parsed:
                return datetime(*parsed[:6]).isoformat()
        except:
            pass

        return datetime.now().isoformat()

    def generate_story_id(self, title: str, content: str) -> str:
        """Generate story ID for clustering"""
        combined_text = f"{title} {content[:200]}"
        cleaned_text = re.sub(r'[^\w\s]', '', combined_text.lower())
        story_hash = hashlib.md5(cleaned_text.encode()).hexdigest()[:12]
        return f"story_{story_hash}"

    def calculate_quality_score(self, article: Dict) -> float:
        """Calculate basic quality score for article"""
        score = 0.5  # Base score

        # Title length (reasonable titles get points)
        title_len = len(article['title'])
        if 20 <= title_len <= 100:
            score += 0.1

        # Content length
        word_count = article.get('word_count', 0)
        if word_count > 100:
            score += 0.2
        if word_count > 500:
            score += 0.1

        # Has publication date
        if article.get('published_date'):
            score += 0.1

        return min(score, 1.0)

    def categorize_topic(self, text: str) -> str:
        """Basic topic categorization"""
        topic_keywords = {
            'Politics': ['सरकार', 'प्रधानमन्त्री', 'मन्त्री', 'संसद', 'राजनीति', 'नेता', 'पार्टी'],
            'Economy': ['अर्थतन्त्र', 'बजेट', 'कर', 'व्यापार', 'बैंक', 'रुपैयाँ', 'आर्थिक'],
            'Social': ['शिक्षा', 'स्वास्थ्य', 'समाज', 'महिला', 'युवा', 'बालबालिका'],
            'International': ['भारत', 'चीन', 'अमेरिका', 'विदेश', 'राष्ट्रपति'],
            'Sports': ['खेल', 'फुटबल', 'क्रिकेट', 'खेलाडी'],
            'Culture': ['पर्व', 'चाड', 'संस्कृति', 'कला', 'साहित्य'],
            'Technology': ['प्रविधि', 'इन्टरनेट', 'मोबाइल', 'कम्प्युटर'],
            'Disaster': ['भूकम्प', 'बाढी', 'पहिरो', 'आपतकाल']
        }

        text_lower = text.lower()
        topic_scores = {}

        for topic, keywords in topic_keywords.items():
            score = sum(1 for keyword in keywords if keyword in text_lower)
            if score > 0:
                topic_scores[topic] = score

        return max(topic_scores, key=topic_scores.get) if topic_scores else 'General'

    def store_articles(self, articles: List[Dict]) -> int:
        """Store new articles in database"""
        stored_count = 0

        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()

            for article in articles:
                try:
                    # Check if article already exists
                    cursor.execute("SELECT id FROM articles_enhanced WHERE url = ?", (article['url'],))
                    if cursor.fetchone():
                        continue  # Skip existing articles

                    # Insert new article
                    cursor.execute("""
                        INSERT INTO articles_enhanced (
                            url, title, content, source_site, source_category,
                            political_leaning, scraped_date, published_date,
                            word_count, language, quality_score, story_id,
                            story_phase, first_source_flag, sentiment_score,
                            topic_category
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (
                        article['url'], article['title'], article['content'],
                        article['source_site'], article['source_category'],
                        article['political_leaning'], article['scraped_date'],
                        article['published_date'], article['word_count'],
                        article['language'], article['quality_score'],
                        article['story_id'], article['story_phase'],
                        article['first_source_flag'], article['sentiment_score'],
                        article['topic_category']
                    ))
                    stored_count += 1

                except sqlite3.Error as e:
                    self.logger.warning(f"Error storing article {article['url']}: {e}")
                    continue

            conn.commit()
            conn.close()

        except Exception as e:
            self.logger.error(f"Database error: {e}")

        return stored_count

    def run_collection_cycle(self):
        """Run one complete collection cycle"""
        total_collected = 0

        self.logger.info("🔄 Starting news collection cycle")

        for source in NEPAL_NEWS_SOURCES:
            try:
                self.logger.info(f"📰 Collecting from {source.name}")

                # Scrape RSS feed
                articles = self.scrape_rss_feed(source)

                # Store articles
                stored = self.store_articles(articles)
                total_collected += stored

                self.logger.info(f"✅ {source.name}: {len(articles)} scraped, {stored} new articles stored")

                # Rate limiting
                time.sleep(2)

            except Exception as e:
                self.logger.error(f"❌ Error processing {source.name}: {e}")
                continue

        self.logger.info(f"🎉 Collection cycle complete. Total new articles: {total_collected}")
        return total_collected

    def run_continuous_collection(self, interval_minutes: int = 15):
        """Run continuous news collection"""
        self.running = True
        self.logger.info(f"🚀 Starting continuous news collection (every {interval_minutes} minutes)")

        while self.running:
            try:
                # Run collection cycle
                self.run_collection_cycle()

                # Wait for next cycle
                self.logger.info(f"⏰ Waiting {interval_minutes} minutes until next collection...")
                time.sleep(interval_minutes * 60)

            except KeyboardInterrupt:
                self.logger.info("🛑 Collection stopped by user")
                break
            except Exception as e:
                self.logger.error(f"❌ Error in continuous collection: {e}")
                time.sleep(60)  # Wait 1 minute on error

    def stop_collection(self):
        """Stop continuous collection"""
        self.running = False

def main():
    """Test the real-time news collector"""
    print("📰 Testing Real-time News Collector")
    print("=" * 50)

    collector = RealTimeNewsCollector()

    # Run one collection cycle
    total = collector.run_collection_cycle()
    print(f"\n✅ Collection complete! {total} new articles collected.")

    # Option to run continuous collection
    print("\n🔄 Run continuous collection? (y/n): ", end="")
    response = input().lower()

    if response in ['y', 'yes']:
        try:
            collector.run_continuous_collection(interval_minutes=5)  # Every 5 minutes for testing
        except KeyboardInterrupt:
            print("\n🛑 Collection stopped.")

if __name__ == "__main__":
    main()