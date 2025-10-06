#!/usr/bin/env python3
"""
Setup Script for Nepal News Intelligence Platform
Initializes database, migrates existing data, and tests system components
"""

import sqlite3
import pandas as pd
from datetime import datetime, timedelta
import logging
import os
import sys
from typing import Dict, List
import hashlib
import re

from nepal_news_intelligence_config import DatabaseConfig, NEPAL_NEWS_SOURCES
from realtime_analytics_engine import NewsIntelligenceEngine
from twitter_integration import TwitterNewsIntelligence

class IntelligencePlatformSetup:
    """Setup and migration for Nepal News Intelligence Platform"""

    def __init__(self):
        self.old_db = "nepal_news.db"
        self.new_db = "nepal_news_intelligence.db"
        self.setup_logging()

    def setup_logging(self):
        """Setup logging"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)

    def create_enhanced_database(self):
        """Create enhanced database schema"""
        try:
            conn = sqlite3.connect(self.new_db)

            # Articles enhanced table
            conn.execute(DatabaseConfig.ARTICLES_SCHEMA)

            # Social metrics table
            conn.execute(DatabaseConfig.SOCIAL_SCHEMA)

            # Story intelligence table
            conn.execute(DatabaseConfig.STORIES_SCHEMA)

            # Additional tables for intelligence platform
            conn.execute("""
                CREATE TABLE IF NOT EXISTS realtime_insights (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    insight_type TEXT NOT NULL,
                    insight_title TEXT,
                    insight_description TEXT,
                    confidence_score REAL,
                    related_stories TEXT,
                    related_sources TEXT,
                    action_recommended TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    expires_at TIMESTAMP,
                    is_active BOOLEAN DEFAULT TRUE
                )
            """)

            conn.execute("""
                CREATE TABLE IF NOT EXISTS trending_analysis (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    hashtag TEXT,
                    mention_count INTEGER,
                    source_count INTEGER,
                    time_window TIMESTAMP,
                    trend_score REAL DEFAULT 0.0,
                    related_stories TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Create indexes for performance
            conn.execute("CREATE INDEX IF NOT EXISTS idx_articles_story_id ON articles_enhanced(story_id)")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_articles_source ON articles_enhanced(source_site)")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_articles_date ON articles_enhanced(scraped_date)")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_social_date ON social_metrics(published_at)")

            conn.commit()
            conn.close()

            self.logger.info("✅ Enhanced database schema created successfully")
            return True

        except Exception as e:
            self.logger.error(f"❌ Failed to create enhanced database: {e}")
            return False

    def migrate_existing_data(self):
        """Migrate data from existing database to enhanced schema"""
        try:
            if not os.path.exists(self.old_db):
                self.logger.warning(f"⚠️ Original database {self.old_db} not found. Creating sample data instead.")
                return self.create_sample_data()

            # Read from old database
            old_conn = sqlite3.connect(self.old_db)

            # Check available tables
            tables = old_conn.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
            table_names = [table[0] for table in tables]

            self.logger.info(f"📋 Found tables in original database: {table_names}")

            # Try different table names
            article_table = None
            for table_name in ['articles', 'articles_enhanced', 'speed_articles', 'ultra_articles']:
                if table_name in table_names:
                    article_table = table_name
                    break

            if not article_table:
                self.logger.error("❌ No article table found in original database")
                old_conn.close()
                return self.create_sample_data()

            # Read articles
            query = f"""
                SELECT url, title, content, source_site, scraped_date,
                       word_count, quality_score, published_date
                FROM {article_table}
                WHERE content IS NOT NULL
                LIMIT 2000
            """

            df = pd.read_sql_query(query, old_conn)
            old_conn.close()

            if df.empty:
                self.logger.warning("⚠️ No articles found in original database. Creating sample data.")
                return self.create_sample_data()

            self.logger.info(f"📊 Found {len(df)} articles to migrate")

            # Enhance articles with intelligence fields
            enhanced_articles = self.enhance_articles_for_intelligence(df)

            # Insert into new database
            new_conn = sqlite3.connect(self.new_db)

            for _, article in enhanced_articles.iterrows():
                try:
                    new_conn.execute("""
                        INSERT OR REPLACE INTO articles_enhanced (
                            url, title, content, source_site, source_category,
                            political_leaning, scraped_date, published_date,
                            word_count, language, quality_score, story_id,
                            story_phase, first_source_flag, sentiment_score,
                            topic_category
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (
                        article['url'],
                        article['title'],
                        article['content'],
                        article['source_site'],
                        article['source_category'],
                        article['political_leaning'],
                        article['scraped_date'],
                        article.get('published_date'),
                        article.get('word_count', 0),
                        'nepali',
                        article.get('quality_score', 0.5),
                        article['story_id'],
                        article['story_phase'],
                        article['first_source_flag'],
                        article['sentiment_score'],
                        article['topic_category']
                    ))
                except Exception as e:
                    self.logger.warning(f"⚠️ Failed to insert article {article['url']}: {e}")

            new_conn.commit()
            new_conn.close()

            self.logger.info(f"✅ Successfully migrated {len(enhanced_articles)} articles")
            return True

        except Exception as e:
            self.logger.error(f"❌ Migration failed: {e}")
            return self.create_sample_data()

    def enhance_articles_for_intelligence(self, df: pd.DataFrame) -> pd.DataFrame:
        """Add intelligence fields to migrated articles"""
        enhanced_df = df.copy()

        # Add source metadata
        source_metadata = {source.name: source for source in NEPAL_NEWS_SOURCES}

        def get_source_info(source_site):
            # Try to match source by name or find best match
            for source in NEPAL_NEWS_SOURCES:
                if source.name.lower() in source_site.lower() or source_site.lower() in source.name.lower():
                    return source.category, source.political_leaning
                elif any(word in source_site.lower() for word in source.name.lower().split()):
                    return source.category, source.political_leaning
            return 'mainstream', 'center'  # Default

        enhanced_df[['source_category', 'political_leaning']] = enhanced_df['source_site'].apply(
            lambda x: pd.Series(get_source_info(x))
        )

        # Generate story IDs
        enhanced_df['story_id'] = enhanced_df.apply(
            lambda row: self.generate_story_id(row['title'], row['content'] or ''), axis=1
        )

        # Determine story phase based on scraped_date
        enhanced_df['scraped_date'] = pd.to_datetime(enhanced_df['scraped_date'])
        current_time = datetime.now()

        def determine_phase(scraped_date):
            hours_elapsed = (current_time - scraped_date).total_seconds() / 3600
            if hours_elapsed <= 2:
                return 'breaking'
            elif hours_elapsed <= 24:
                return 'amplification'
            elif hours_elapsed <= 168:  # 7 days
                return 'discussion'
            else:
                return 'archive'

        enhanced_df['story_phase'] = enhanced_df['scraped_date'].apply(determine_phase)

        # Identify first sources for stories
        story_first_sources = enhanced_df.groupby('story_id')['scraped_date'].idxmin()
        enhanced_df['first_source_flag'] = enhanced_df.index.isin(story_first_sources)

        # Basic sentiment analysis
        enhanced_df['sentiment_score'] = enhanced_df['content'].fillna('').apply(self.calculate_basic_sentiment)

        # Basic topic categorization
        enhanced_df['topic_category'] = enhanced_df['content'].fillna('').apply(self.categorize_topic)

        return enhanced_df

    def generate_story_id(self, title: str, content: str) -> str:
        """Generate story ID based on content"""
        combined_text = f"{title} {content[:200]}"
        cleaned_text = re.sub(r'[^\w\s]', '', combined_text.lower())
        story_hash = hashlib.md5(cleaned_text.encode()).hexdigest()[:12]
        return f"story_{story_hash}"

    def calculate_basic_sentiment(self, text: str) -> float:
        """Basic sentiment calculation"""
        positive_words = ['राम्रो', 'उत्कृष्ट', 'सफल', 'प्रगति', 'विकास']
        negative_words = ['नराम्रो', 'असफल', 'समस्या', 'संकट', 'विवाद']

        positive_count = sum(1 for word in positive_words if word in text)
        negative_count = sum(1 for word in negative_words if word in text)

        if positive_count + negative_count == 0:
            return 0.0

        return (positive_count - negative_count) / (positive_count + negative_count)

    def categorize_topic(self, text: str) -> str:
        """Basic topic categorization"""
        topic_keywords = {
            'Politics': ['सरकार', 'प्रधानमन्त्री', 'मन्त्री', 'संसद', 'राजनीति'],
            'Economy': ['अर्थतन्त्र', 'बजेट', 'कर', 'व्यापार', 'बैंक'],
            'Social': ['शिक्षा', 'स्वास्थ्य', 'समाज', 'महिला', 'युवा'],
            'International': ['भारत', 'चीन', 'अमेरिका', 'विदेश'],
            'Sports': ['खेल', 'फुटबल', 'क्रिकेट'],
            'Culture': ['पर्व', 'चाड', 'संस्कृति', 'कला']
        }

        topic_scores = {}
        for topic, keywords in topic_keywords.items():
            score = sum(1 for keyword in keywords if keyword in text)
            if score > 0:
                topic_scores[topic] = score

        return max(topic_scores, key=topic_scores.get) if topic_scores else 'General'

    def create_sample_data(self):
        """Create sample data for testing"""
        try:
            self.logger.info("📝 Creating sample data for testing...")

            sample_articles = [
                {
                    'url': f'https://example.com/article_{i}',
                    'title': f'Sample news article {i} about Nepal politics',
                    'content': f'This is sample content for article {i}. Contains politics keywords सरकार and राजनीति.',
                    'source_site': 'ekantipur',
                    'scraped_date': datetime.now() - timedelta(hours=i),
                    'word_count': 150 + i * 10,
                    'quality_score': 0.7 + (i % 3) * 0.1
                }
                for i in range(1, 21)
            ]

            # Add variety to sources
            sources = ['ekantipur', 'setopati', 'nagarik_news', 'bbc_nepali', 'ratopati']
            for i, article in enumerate(sample_articles):
                article['source_site'] = sources[i % len(sources)]

            df = pd.DataFrame(sample_articles)
            enhanced_df = self.enhance_articles_for_intelligence(df)

            # Insert sample data
            conn = sqlite3.connect(self.new_db)
            for _, article in enhanced_df.iterrows():
                conn.execute("""
                    INSERT OR REPLACE INTO articles_enhanced (
                        url, title, content, source_site, source_category,
                        political_leaning, scraped_date, word_count, quality_score,
                        story_id, story_phase, first_source_flag, sentiment_score,
                        topic_category, language
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    article['url'], article['title'], article['content'],
                    article['source_site'], article['source_category'],
                    article['political_leaning'], article['scraped_date'],
                    article['word_count'], article['quality_score'],
                    article['story_id'], article['story_phase'],
                    article['first_source_flag'], article['sentiment_score'],
                    article['topic_category'], 'nepali'
                ))

            conn.commit()
            conn.close()

            self.logger.info(f"✅ Created {len(enhanced_df)} sample articles")
            return True

        except Exception as e:
            self.logger.error(f"❌ Failed to create sample data: {e}")
            return False

    def test_system_components(self):
        """Test all system components"""
        self.logger.info("🧪 Testing system components...")

        try:
            # Test analytics engine
            analytics_engine = NewsIntelligenceEngine(self.new_db)

            # Test trending stories detection
            trending = analytics_engine.detect_trending_stories()
            self.logger.info(f"✅ Trending stories: {len(trending)} detected")

            # Test influence metrics
            influence = analytics_engine.calculate_source_influence_metrics()
            self.logger.info(f"✅ Source influence: {len(influence)} sources analyzed")

            # Test insights generation
            insights = analytics_engine.generate_realtime_insights()
            self.logger.info(f"✅ Real-time insights: {len(insights)} generated")

            # Test Twitter integration
            twitter_engine = TwitterNewsIntelligence(self.new_db)
            results = twitter_engine.collect_all_sources()
            total_tweets = sum(results.values())
            self.logger.info(f"✅ Twitter integration: {total_tweets} tweets collected")

            return True

        except Exception as e:
            self.logger.error(f"❌ System test failed: {e}")
            return False

    def run_complete_setup(self):
        """Run complete setup process"""
        self.logger.info("🚀 Starting Nepal News Intelligence Platform Setup")
        self.logger.info("="*60)

        steps = [
            ("Creating enhanced database schema", self.create_enhanced_database),
            ("Migrating existing data", self.migrate_existing_data),
            ("Testing system components", self.test_system_components)
        ]

        for step_name, step_function in steps:
            self.logger.info(f"📋 {step_name}...")
            if not step_function():
                self.logger.error(f"❌ Setup failed at step: {step_name}")
                return False

        self.logger.info("="*60)
        self.logger.info("🎉 Nepal News Intelligence Platform setup completed successfully!")
        self.logger.info(f"📊 Database: {self.new_db}")
        self.logger.info("🚀 Ready to launch dashboard with: streamlit run nepal_news_intelligence_dashboard.py")

        return True

def main():
    """Main setup function"""
    setup = IntelligencePlatformSetup()

    print("🇳🇵 NEPAL NEWS INTELLIGENCE PLATFORM SETUP")
    print("="*50)
    print("This will create an enhanced database and migrate existing data.")
    print("Continue? (y/n): ", end="")

    response = input().lower()
    if response not in ['y', 'yes']:
        print("Setup cancelled.")
        return

    success = setup.run_complete_setup()

    if success:
        print("\n" + "="*50)
        print("✅ SETUP COMPLETE!")
        print("\n🚀 To launch the dashboard:")
        print("   streamlit run nepal_news_intelligence_dashboard.py")
        print("\n📊 Database location:")
        print(f"   {setup.new_db}")
    else:
        print("\n❌ Setup failed. Check the logs for details.")

if __name__ == "__main__":
    main()