#!/usr/bin/env python3
"""
Automated Social Media Collection System
Daily/Weekly collection of Facebook/Twitter data with news URL extraction
"""

import schedule
import time
import sqlite3
import pandas as pd
import requests
from datetime import datetime, timedelta
import logging
import re
from urllib.parse import urlparse, urljoin
from typing import List, Dict, Set
import json

from facebook_news_scraper import FacebookNewsScraper
from twitter_integration import TwitterNewsIntelligence
from nepal_news_intelligence_config import NEPAL_NEWS_SOURCES

class AutomatedSocialCollector:
    """Automated social media collection with URL extraction"""

    def __init__(self, db_path="nepal_news_intelligence.db"):
        self.db_path = db_path
        self.setup_logging()
        self.facebook_scraper = FacebookNewsScraper(db_path)
        self.twitter_scraper = TwitterNewsIntelligence(db_path)

    def setup_logging(self):
        """Setup logging for automated collection"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('logs/automated_social_collection.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)

    def extract_news_urls_from_social(self) -> Dict[str, List[str]]:
        """Extract news URLs from social media posts for targeted scraping"""
        try:
            conn = sqlite3.connect(self.db_path)

            # Get social posts from last 24 hours
            query = """
                SELECT DISTINCT tweet_text, tweet_url, published_at
                FROM social_metrics
                WHERE published_at >= datetime('now', '-24 hours')
                AND (tweet_text LIKE '%http%' OR tweet_text LIKE '%www.%')
            """

            social_posts = pd.read_sql_query(query, conn)

            # Also get Facebook posts
            fb_query = """
                SELECT DISTINCT post_text, post_url, published_at
                FROM facebook_metrics
                WHERE published_at >= datetime('now', '-24 hours')
                AND (post_text LIKE '%http%' OR post_text LIKE '%www.%')
            """

            try:
                fb_posts = pd.read_sql_query(fb_query, conn)
                # Combine with social posts
                fb_posts.columns = ['tweet_text', 'tweet_url', 'published_at']
                social_posts = pd.concat([social_posts, fb_posts], ignore_index=True)
            except:
                pass  # Facebook table might not exist

            conn.close()

            # Extract URLs from posts
            extracted_urls = {
                'news_urls': [],
                'social_urls': [],
                'external_urls': []
            }

            # Known Nepal news domains
            nepal_domains = [
                'ekantipur.com', 'setopati.com', 'nagariknews.nagariknetwork.com',
                'bbc.com/nepali', 'ratopati.com', 'onlinekhabar.com',
                'nepalpress.com', 'hamropatro.com', 'kathmandupost.com'
            ]

            url_pattern = re.compile(r'https?://[^\s]+')

            for _, post in social_posts.iterrows():
                text = post['tweet_text'] or ""
                urls_in_post = url_pattern.findall(text)

                for url in urls_in_post:
                    # Clean URL (remove tracking parameters)
                    clean_url = url.split('?')[0].split('#')[0]

                    # Categorize URL
                    domain = urlparse(clean_url).netloc.lower()

                    if any(nepal_domain in domain for nepal_domain in nepal_domains):
                        extracted_urls['news_urls'].append({
                            'url': clean_url,
                            'source_post': post['tweet_url'],
                            'published_at': post['published_at'],
                            'priority': 'high'  # News URLs get high priority
                        })
                    elif 'facebook.com' in domain or 'twitter.com' in domain or 't.co' in domain:
                        extracted_urls['social_urls'].append(clean_url)
                    else:
                        extracted_urls['external_urls'].append(clean_url)

            # Remove duplicates and sort by priority
            extracted_urls['news_urls'] = [
                dict(t) for t in {tuple(d.items()) for d in extracted_urls['news_urls']}
            ]

            self.logger.info(f"Extracted {len(extracted_urls['news_urls'])} news URLs from social media")
            return extracted_urls

        except Exception as e:
            self.logger.error(f"Error extracting URLs from social media: {e}")
            return {'news_urls': [], 'social_urls': [], 'external_urls': []}

    def scrape_social_news_urls(self, extracted_urls: Dict) -> int:
        """Scrape news articles from URLs found in social media"""
        from realtime_news_collector import RealTimeNewsCollector

        collector = RealTimeNewsCollector(self.db_path)
        scraped_count = 0

        for url_data in extracted_urls['news_urls'][:20]:  # Limit to 20 URLs
            try:
                url = url_data['url']
                self.logger.info(f"Scraping social-discovered URL: {url}")

                # Determine source from URL
                source = self.identify_source_from_url(url)
                if not source:
                    continue

                # Scrape article content
                content = collector.scrape_article_content(url)
                if not content:
                    continue

                # Create article record
                article = {
                    'url': url,
                    'title': content[:100] + "...",  # Use first 100 chars as title
                    'content': content,
                    'source_site': source.name,
                    'source_category': source.category,
                    'political_leaning': source.political_leaning,
                    'scraped_date': datetime.now().isoformat(),
                    'published_date': url_data['published_at'],
                    'word_count': len(content.split()),
                    'language': source.language,
                    'quality_score': 0.7,  # Default for social-discovered
                    'story_id': collector.generate_story_id(content[:100], content),
                    'story_phase': 'amplification',  # Social discovery = amplification phase
                    'first_source_flag': False,
                    'sentiment_score': 0.0,
                    'topic_category': collector.categorize_topic(content)
                }

                # Store article
                stored = collector.store_articles([article])
                scraped_count += stored

            except Exception as e:
                self.logger.warning(f"Error scraping URL {url_data.get('url', 'unknown')}: {e}")
                continue

        self.logger.info(f"Successfully scraped {scraped_count} articles from social media URLs")
        return scraped_count

    def identify_source_from_url(self, url: str) -> object:
        """Identify news source from URL"""
        domain = urlparse(url).netloc.lower()

        for source in NEPAL_NEWS_SOURCES:
            source_domain = urlparse(source.website_url).netloc.lower()
            if source_domain in domain or domain in source_domain:
                return source

        return None

    def daily_collection_job(self):
        """Daily social media collection job"""
        self.logger.info("🗓️ Starting daily social media collection")

        try:
            # 1. Collect fresh social media data
            fb_results = self.facebook_scraper.collect_all_facebook_sources()
            twitter_results = self.twitter_scraper.collect_all_sources()

            total_social = sum(fb_results.values()) + sum(twitter_results.values())
            self.logger.info(f"📱 Collected {total_social} new social media posts")

            # 2. Extract news URLs from social posts
            extracted_urls = self.extract_news_urls_from_social()

            # 3. Scrape articles from discovered URLs
            scraped_articles = self.scrape_social_news_urls(extracted_urls)

            # 4. Update engagement metrics
            self.update_engagement_metrics()

            self.logger.info(f"✅ Daily collection complete: {total_social} social posts, {scraped_articles} articles")

        except Exception as e:
            self.logger.error(f"❌ Daily collection failed: {e}")

    def weekly_deep_collection_job(self):
        """Weekly comprehensive collection and analysis"""
        self.logger.info("📅 Starting weekly deep collection")

        try:
            # 1. Run daily collection
            self.daily_collection_job()

            # 2. Analyze weekly trends
            self.analyze_weekly_trends()

            # 3. Clean up old data
            self.cleanup_old_data()

            self.logger.info("✅ Weekly deep collection complete")

        except Exception as e:
            self.logger.error(f"❌ Weekly collection failed: {e}")

    def update_engagement_metrics(self):
        """Update engagement metrics and link social posts to articles"""
        try:
            conn = sqlite3.connect(self.db_path)

            # Link social posts to articles based on URL matching
            update_query = """
                UPDATE social_metrics
                SET article_url = (
                    SELECT url FROM articles_enhanced
                    WHERE articles_enhanced.url = social_metrics.tweet_url
                    OR social_metrics.tweet_text LIKE '%' || articles_enhanced.url || '%'
                    LIMIT 1
                )
                WHERE article_url IS NULL
            """

            cursor = conn.cursor()
            cursor.execute(update_query)
            updated_rows = cursor.rowcount

            conn.commit()
            conn.close()

            self.logger.info(f"🔗 Linked {updated_rows} social posts to articles")

        except Exception as e:
            self.logger.error(f"Error updating engagement metrics: {e}")

    def analyze_weekly_trends(self):
        """Analyze weekly trends and generate insights"""
        try:
            conn = sqlite3.connect(self.db_path)

            # Get weekly trending topics
            trends_query = """
                SELECT
                    topic_category,
                    COUNT(*) as article_count,
                    AVG(quality_score) as avg_quality,
                    COUNT(DISTINCT source_site) as source_diversity
                FROM articles_enhanced
                WHERE scraped_date >= datetime('now', '-7 days')
                GROUP BY topic_category
                ORDER BY article_count DESC
                LIMIT 10
            """

            trends = pd.read_sql_query(trends_query, conn)

            # Store weekly insights
            for _, trend in trends.iterrows():
                insight = {
                    'insight_type': 'weekly_trend',
                    'insight_title': f"Weekly Trend: {trend['topic_category']}",
                    'insight_description': f"{trend['article_count']} articles published across {trend['source_diversity']} sources",
                    'confidence_score': min(trend['article_count'] / 10, 1.0),
                    'related_stories': trend['topic_category'],
                    'created_at': datetime.now().isoformat()
                }

                conn.execute("""
                    INSERT OR REPLACE INTO realtime_insights (
                        insight_type, insight_title, insight_description,
                        confidence_score, related_stories, created_at
                    ) VALUES (?, ?, ?, ?, ?, ?)
                """, (
                    insight['insight_type'], insight['insight_title'],
                    insight['insight_description'], insight['confidence_score'],
                    insight['related_stories'], insight['created_at']
                ))

            conn.commit()
            conn.close()

        except Exception as e:
            self.logger.error(f"Error analyzing weekly trends: {e}")

    def cleanup_old_data(self):
        """Clean up old social media data to maintain performance"""
        try:
            conn = sqlite3.connect(self.db_path)

            # Keep only last 30 days of social media data
            cleanup_queries = [
                "DELETE FROM social_metrics WHERE published_at < datetime('now', '-30 days')",
                "DELETE FROM facebook_metrics WHERE published_at < datetime('now', '-30 days')",
                "DELETE FROM realtime_insights WHERE created_at < datetime('now', '-7 days') AND insight_type = 'daily'"
            ]

            for query in cleanup_queries:
                conn.execute(query)

            conn.commit()
            conn.close()

            self.logger.info("🧹 Cleaned up old data")

        except Exception as e:
            self.logger.error(f"Error cleaning up data: {e}")

    def start_automated_collection(self):
        """Start automated collection system"""
        self.logger.info("🚀 Starting automated social media collection system")

        # Schedule daily collection (every day at 6 AM and 6 PM)
        schedule.every().day.at("06:00").do(self.daily_collection_job)
        schedule.every().day.at("18:00").do(self.daily_collection_job)

        # Schedule weekly deep collection (every Sunday at 2 AM)
        schedule.every().sunday.at("02:00").do(self.weekly_deep_collection_job)

        self.logger.info("📅 Scheduled jobs:")
        self.logger.info("   - Daily collection: 6:00 AM and 6:00 PM")
        self.logger.info("   - Weekly deep collection: Sunday 2:00 AM")

        # Keep the scheduler running
        while True:
            schedule.run_pending()
            time.sleep(60)  # Check every minute

def main():
    """Test the automated collection system"""
    print("🤖 Automated Social Media Collection System")
    print("=" * 50)

    collector = AutomatedSocialCollector()

    print("1. Test daily collection")
    print("2. Test URL extraction")
    print("3. Start automated scheduler")
    choice = input("Choose option (1-3): ")

    if choice == "1":
        collector.daily_collection_job()
    elif choice == "2":
        urls = collector.extract_news_urls_from_social()
        print(f"Extracted URLs: {json.dumps(urls, indent=2)}")
    elif choice == "3":
        collector.start_automated_collection()
    else:
        print("Invalid choice")

if __name__ == "__main__":
    main()