#!/usr/bin/env python3
"""
Twitter Integration for Nepal News Intelligence Platform
Real-time social media tracking and engagement analysis
"""

import tweepy
import pandas as pd
import sqlite3
import logging
import os
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Tuple
import json
import time
import re
from nepal_news_intelligence_config import TwitterConfig, NEPAL_NEWS_SOURCES
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

class TwitterNewsIntelligence:
    """Twitter integration for Nepal news intelligence"""

    def __init__(self, db_path="nepal_news_intelligence.db"):
        self.db_path = db_path
        self.setup_logging()
        self.setup_twitter_api()
        self.setup_database()

    def setup_logging(self):
        """Setup logging for Twitter operations"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(f'{os.path.dirname(__file__)}/logs/twitter_integration.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)

    def setup_twitter_api(self):
        """Setup Twitter API v2 client"""
        try:
            # For development/testing, we'll use a requests-based approach
            # In production, replace with actual Twitter API credentials
            self.session = requests.Session()
            retry_strategy = Retry(
                total=3,
                backoff_factor=1,
                status_forcelist=[429, 500, 502, 503, 504],
            )
            adapter = HTTPAdapter(max_retries=retry_strategy)
            self.session.mount("http://", adapter)
            self.session.mount("https://", adapter)

            self.logger.info("Twitter API client initialized successfully")

        except Exception as e:
            self.logger.error(f"Failed to setup Twitter API: {e}")
            self.api_available = False

    def setup_database(self):
        """Setup enhanced database schema for Twitter integration"""
        try:
            conn = sqlite3.connect(self.db_path)

            # Create enhanced social metrics table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS social_metrics (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    source_name TEXT NOT NULL,
                    twitter_handle TEXT,
                    tweet_id TEXT UNIQUE,
                    tweet_text TEXT,
                    tweet_url TEXT,
                    published_at TIMESTAMP,
                    article_url TEXT,

                    -- Engagement metrics
                    retweet_count INTEGER DEFAULT 0,
                    like_count INTEGER DEFAULT 0,
                    reply_count INTEGER DEFAULT 0,
                    quote_count INTEGER DEFAULT 0,

                    -- Calculated metrics
                    engagement_rate REAL DEFAULT 0.0,
                    engagement_score INTEGER DEFAULT 0,
                    amplification_factor REAL DEFAULT 0.0,

                    -- Content analysis
                    contains_link BOOLEAN DEFAULT FALSE,
                    hashtag_count INTEGER DEFAULT 0,
                    mention_count INTEGER DEFAULT 0,
                    has_media BOOLEAN DEFAULT FALSE,

                    -- Tracking
                    collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Create story-social mapping table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS story_social_mapping (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    story_id TEXT,
                    tweet_id TEXT,
                    source_name TEXT,
                    mapping_confidence REAL DEFAULT 0.0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                    FOREIGN KEY (tweet_id) REFERENCES social_metrics (tweet_id)
                )
            """)

            # Create trending topics table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS trending_analysis (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    hashtag TEXT,
                    mention_count INTEGER,
                    source_count INTEGER,
                    time_window TIMESTAMP,
                    trend_score REAL DEFAULT 0.0,
                    related_stories TEXT,  -- JSON array of story IDs
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

            conn.commit()
            conn.close()
            self.logger.info("Database schema created successfully")

        except Exception as e:
            self.logger.error(f"Database setup failed: {e}")

    def collect_source_tweets(self, source: object, tweet_count: int = 50) -> List[Dict]:
        """Collect recent tweets from a news source"""
        tweets = []

        try:
            # Simulate Twitter data collection for development
            # In production, replace with actual Twitter API calls
            tweets = self._simulate_twitter_data(source, tweet_count)

            self.logger.info(f"Collected {len(tweets)} tweets from {source.twitter_handle}")
            return tweets

        except Exception as e:
            self.logger.error(f"Failed to collect tweets from {source.twitter_handle}: {e}")
            return []

    def _simulate_twitter_data(self, source: object, count: int) -> List[Dict]:
        """Simulate Twitter data for development (replace with real API calls)"""
        import random
        from datetime import datetime, timedelta

        simulated_tweets = []
        base_time = datetime.now()

        for i in range(count):
            tweet_time = base_time - timedelta(hours=random.randint(0, 72))

            # Generate realistic engagement numbers based on source popularity
            base_engagement = {
                'ekantipur': (50, 200),
                'SetopatiOnline': (30, 150),
                'bbcnepali': (100, 400),
                'nagariknews': (20, 100)
            }.get(source.twitter_id, (10, 50))

            retweets = random.randint(base_engagement[0]//2, base_engagement[1]//2)
            likes = random.randint(base_engagement[0], base_engagement[1])
            replies = random.randint(5, 25)

            tweet = {
                'tweet_id': f"sim_{source.twitter_id}_{i}_{int(tweet_time.timestamp())}",
                'tweet_text': f"Breaking: Sample news update from {source.name} #{i}",
                'tweet_url': f"https://twitter.com/{source.twitter_id}/status/sim_{i}",
                'published_at': tweet_time.isoformat(),
                'retweet_count': retweets,
                'like_count': likes,
                'reply_count': replies,
                'quote_count': random.randint(0, 10),
                'contains_link': random.choice([True, False]),
                'hashtag_count': random.randint(0, 3),
                'mention_count': random.randint(0, 2),
                'has_media': random.choice([True, False])
            }

            simulated_tweets.append(tweet)

        return simulated_tweets

    def calculate_engagement_metrics(self, tweet_data: Dict) -> Dict:
        """Calculate advanced engagement metrics for a tweet"""
        try:
            # Basic engagement score
            engagement_score = (
                tweet_data.get('retweet_count', 0) * 3 +  # Retweets worth more
                tweet_data.get('like_count', 0) * 1 +
                tweet_data.get('reply_count', 0) * 2 +    # Replies show engagement
                tweet_data.get('quote_count', 0) * 4      # Quotes highest value
            )

            # Calculate engagement rate (simplified without follower count)
            # In production, use actual follower counts
            estimated_reach = engagement_score * 10  # Rough estimate
            engagement_rate = engagement_score / max(estimated_reach, 1)

            # Amplification factor (how much content gets reshared)
            amplification_factor = (
                tweet_data.get('retweet_count', 0) +
                tweet_data.get('quote_count', 0)
            ) / max(engagement_score, 1)

            return {
                'engagement_score': engagement_score,
                'engagement_rate': round(engagement_rate, 4),
                'amplification_factor': round(amplification_factor, 4),
                'estimated_reach': estimated_reach
            }

        except Exception as e:
            self.logger.error(f"Error calculating engagement metrics: {e}")
            return {
                'engagement_score': 0,
                'engagement_rate': 0.0,
                'amplification_factor': 0.0,
                'estimated_reach': 0
            }

    def store_social_metrics(self, source_name: str, tweets: List[Dict]) -> int:
        """Store social media metrics in database"""
        stored_count = 0

        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()

            for tweet in tweets:
                # Calculate enhanced metrics
                metrics = self.calculate_engagement_metrics(tweet)

                # Prepare data for insertion (match actual schema)
                tweet_data = (
                    None,  # article_url (to be linked later)
                    tweet['tweet_id'],
                    tweet['tweet_text'],
                    tweet['tweet_url'],
                    tweet['published_at'],
                    tweet.get('retweet_count', 0),
                    tweet.get('like_count', 0),
                    tweet.get('reply_count', 0),
                    tweet.get('quote_count', 0),
                    metrics['engagement_rate'],
                    metrics['amplification_factor']
                )

                try:
                    cursor.execute("""
                        INSERT OR REPLACE INTO social_metrics (
                            article_url, twitter_id, tweet_text, tweet_url,
                            published_at, retweet_count, like_count, reply_count,
                            quote_count, engagement_rate, amplification_factor
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, tweet_data)
                    stored_count += 1

                except sqlite3.IntegrityError:
                    # Tweet already exists, update metrics
                    cursor.execute("""
                        UPDATE social_metrics SET
                            retweet_count = ?, like_count = ?, reply_count = ?, quote_count = ?,
                            engagement_rate = ?, amplification_factor = ?,
                            collected_at = CURRENT_TIMESTAMP
                        WHERE twitter_id = ?
                    """, (
                        tweet.get('retweet_count', 0),
                        tweet.get('like_count', 0),
                        tweet.get('reply_count', 0),
                        tweet.get('quote_count', 0),
                        metrics['engagement_rate'],
                        metrics['amplification_factor'],
                        tweet['tweet_id']
                    ))

            conn.commit()
            conn.close()

            self.logger.info(f"Stored {stored_count} social metrics for {source_name}")
            return stored_count

        except Exception as e:
            self.logger.error(f"Error storing social metrics: {e}")
            return 0

    def collect_all_sources(self) -> Dict[str, int]:
        """Collect Twitter data for all configured news sources"""
        collection_results = {}

        self.logger.info("Starting comprehensive Twitter data collection")

        for source in NEPAL_NEWS_SOURCES:
            try:
                self.logger.info(f"Collecting data for {source.name} ({source.twitter_handle})")

                # Collect tweets
                tweets = self.collect_source_tweets(source, tweet_count=50)

                # Store in database
                stored_count = self.store_social_metrics(source.name, tweets)

                collection_results[source.name] = stored_count

                # Rate limiting pause
                time.sleep(2)

            except Exception as e:
                self.logger.error(f"Failed to process {source.name}: {e}")
                collection_results[source.name] = 0

        self.logger.info(f"Collection complete. Results: {collection_results}")
        return collection_results

    def analyze_trending_topics(self, hours_back: int = 24) -> List[Dict]:
        """Analyze trending hashtags and topics across sources"""
        try:
            conn = sqlite3.connect(self.db_path)

            # Get recent tweets with hashtags
            cutoff_time = datetime.now() - timedelta(hours=hours_back)

            query = """
                SELECT tweet_text, source_name, published_at, engagement_score
                FROM social_metrics
                WHERE published_at >= ? AND hashtag_count > 0
                ORDER BY engagement_score DESC
                LIMIT 500
            """

            df = pd.read_sql_query(query, conn, params=(cutoff_time.isoformat(),))
            conn.close()

            # Extract hashtags (simplified)
            hashtag_stats = {}

            for _, row in df.iterrows():
                # Simple hashtag extraction
                hashtags = re.findall(r'#\w+', row['tweet_text'])

                for hashtag in hashtags:
                    if hashtag not in hashtag_stats:
                        hashtag_stats[hashtag] = {
                            'count': 0,
                            'sources': set(),
                            'total_engagement': 0
                        }

                    hashtag_stats[hashtag]['count'] += 1
                    hashtag_stats[hashtag]['sources'].add(row['source_name'])
                    hashtag_stats[hashtag]['total_engagement'] += row['engagement_score']

            # Convert to sorted list
            trending_topics = []
            for hashtag, stats in hashtag_stats.items():
                if stats['count'] >= 3:  # Minimum threshold
                    trending_topics.append({
                        'hashtag': hashtag,
                        'mention_count': stats['count'],
                        'source_count': len(stats['sources']),
                        'total_engagement': stats['total_engagement'],
                        'trend_score': stats['count'] * len(stats['sources']) * stats['total_engagement'] / 1000
                    })

            # Sort by trend score
            trending_topics.sort(key=lambda x: x['trend_score'], reverse=True)

            self.logger.info(f"Identified {len(trending_topics)} trending topics")
            return trending_topics[:10]  # Top 10

        except Exception as e:
            self.logger.error(f"Error analyzing trending topics: {e}")
            return []

    def get_source_social_performance(self, hours_back: int = 24) -> pd.DataFrame:
        """Get social media performance metrics by source"""
        try:
            conn = sqlite3.connect(self.db_path)

            cutoff_time = datetime.now() - timedelta(hours=hours_back)

            query = """
                SELECT
                    source_name,
                    COUNT(*) as tweet_count,
                    AVG(engagement_score) as avg_engagement,
                    SUM(engagement_score) as total_engagement,
                    AVG(amplification_factor) as avg_amplification,
                    AVG(retweet_count) as avg_retweets,
                    AVG(like_count) as avg_likes,
                    SUM(CASE WHEN contains_link THEN 1 ELSE 0 END) as tweets_with_links
                FROM social_metrics
                WHERE published_at >= ?
                GROUP BY source_name
                ORDER BY total_engagement DESC
            """

            df = pd.read_sql_query(query, conn, params=(cutoff_time.isoformat(),))
            conn.close()

            # Calculate additional metrics
            if not df.empty:
                df['engagement_per_tweet'] = df['total_engagement'] / df['tweet_count']
                df['link_percentage'] = (df['tweets_with_links'] / df['tweet_count'] * 100).round(1)

            self.logger.info(f"Generated social performance report for {len(df)} sources")
            return df

        except Exception as e:
            self.logger.error(f"Error generating social performance report: {e}")
            return pd.DataFrame()

    def run_realtime_collection(self):
        """Run continuous real-time Twitter data collection"""
        self.logger.info("Starting real-time Twitter collection")

        while True:
            try:
                # Collect data from all sources
                results = self.collect_all_sources()

                # Log summary
                total_collected = sum(results.values())
                self.logger.info(f"Real-time collection cycle complete. Total tweets: {total_collected}")

                # Wait before next collection cycle
                wait_minutes = TwitterConfig.WINDOW_MINUTES
                self.logger.info(f"Waiting {wait_minutes} minutes until next collection...")
                time.sleep(wait_minutes * 60)

            except KeyboardInterrupt:
                self.logger.info("Real-time collection stopped by user")
                break
            except Exception as e:
                self.logger.error(f"Error in real-time collection: {e}")
                time.sleep(300)  # Wait 5 minutes on error

def main():
    """Main function for testing Twitter integration"""
    # Initialize Twitter intelligence
    twitter_intel = TwitterNewsIntelligence()

    # Test data collection
    print("🐦 Testing Twitter Integration for Nepal News Intelligence")
    print("="*60)

    # Collect data from all sources
    results = twitter_intel.collect_all_sources()

    # Show results
    print(f"\n📊 Collection Results:")
    for source, count in results.items():
        print(f"   {source}: {count} tweets")

    # Analyze trending topics
    trending = twitter_intel.analyze_trending_topics()
    print(f"\n📈 Trending Topics (Top 5):")
    for i, topic in enumerate(trending[:5], 1):
        print(f"   {i}. {topic['hashtag']} - {topic['mention_count']} mentions across {topic['source_count']} sources")

    # Get social performance
    performance = twitter_intel.get_source_social_performance()
    if not performance.empty:
        print(f"\n🏆 Top Social Performers:")
        for _, row in performance.head(3).iterrows():
            print(f"   {row['source_name']}: {row['avg_engagement']:.1f} avg engagement")

if __name__ == "__main__":
    main()