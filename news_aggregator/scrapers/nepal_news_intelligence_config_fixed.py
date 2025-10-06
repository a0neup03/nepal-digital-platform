#!/usr/bin/env python3
"""
Nepal News Intelligence Platform - Configuration
Real-time news tracking with social media integration
"""

import os
from dataclasses import dataclass
from typing import List, Dict
from datetime import datetime

@dataclass
class NewsSource:
    """Configuration for news sources with social media integration"""
    name: str
    website_url: str
    rss_url: str
    twitter_handle: str
    twitter_id: str
    facebook_page: str
    facebook_id: str
    youtube_channel: str
    instagram_handle: str
    category: str
    political_leaning: str  # 'left', 'center', 'right', 'unknown'
    reliability_score: float  # 0.0 to 1.0
    language: str

# Nepal News Sources with Comprehensive Social Media Integration
NEPAL_NEWS_SOURCES = [
    NewsSource(
        name="Kantipur/Ekantipur",
        website_url="https://ekantipur.com",
        rss_url="https://ekantipur.com/rss",
        twitter_handle="@ekantipur",
        twitter_id="ekantipur",
        facebook_page="https://www.facebook.com/eKantipur/",
        facebook_id="eKantipur",
        youtube_channel="https://www.youtube.com/c/eKantipurTV",
        instagram_handle="@ekantipur",
        category="mainstream",
        political_leaning="center-left",
        reliability_score=0.85,
        language="nepali"
    ),
    NewsSource(
        name="Setopati",
        website_url="https://setopati.com",
        rss_url="https://setopati.com/rss",
        twitter_handle="@SetopatiOnline",
        twitter_id="SetopatiOnline",
        facebook_page="https://www.facebook.com/setopati/",
        facebook_id="setopati",
        youtube_channel="https://www.youtube.com/c/SetopatiOnline",
        instagram_handle="@setopati",
        category="mainstream",
        political_leaning="center-left",
        reliability_score=0.80,
        language="nepali"
    ),
    NewsSource(
        name="Nagarik News",
        website_url="https://nagariknews.nagariknetwork.com",
        rss_url="https://nagariknews.nagariknetwork.com/rss",
        twitter_handle="@nagariknews",
        twitter_id="nagariknews",
        facebook_page="https://www.facebook.com/nagariknews/",
        facebook_id="nagariknews",
        youtube_channel="https://www.youtube.com/c/NagarikNews",
        instagram_handle="@nagariknews",
        category="mainstream",
        political_leaning="center",
        reliability_score=0.75,
        language="nepali"
    ),
    NewsSource(
        name="BBC Nepali",
        website_url="https://www.bbc.com/nepali",
        rss_url="https://feeds.bbci.co.uk/nepali/rss.xml",
        twitter_handle="@bbcnepali",
        twitter_id="bbcnepali",
        facebook_page="https://www.facebook.com/bbcnepali",
        facebook_id="bbcnepali",
        youtube_channel="https://www.youtube.com/c/bbcnepali",
        instagram_handle="@bbcnepali",
        category="international",
        political_leaning="center",
        reliability_score=0.95,
        language="nepali"
    ),
    NewsSource(
        name="Ratopati",
        website_url="https://ratopati.com",
        rss_url="https://ratopati.com/rss",
        twitter_handle="@ratopati_news",
        twitter_id="ratopati_news",
        facebook_page="https://www.facebook.com/ratopati",
        facebook_id="ratopati",
        youtube_channel="https://www.youtube.com/c/RatopatiTV",
        instagram_handle="@ratopati",
        category="mainstream",
        political_leaning="center-right",
        reliability_score=0.70,
        language="nepali"
    ),
    NewsSource(
        name="Online Khabar",
        website_url="https://onlinekhabar.com",
        rss_url="https://onlinekhabar.com/rss",
        twitter_handle="@OnlineKhabar",
        twitter_id="OnlineKhabar",
        facebook_page="https://www.facebook.com/onlinekhabar",
        facebook_id="onlinekhabar",
        youtube_channel="https://www.youtube.com/c/OnlineKhabar",
        instagram_handle="@onlinekhabar",
        category="mainstream",
        political_leaning="center",
        reliability_score=0.75,
        language="nepali"
    ),
    NewsSource(
        name="Nepali Press",
        website_url="https://nepalpress.com",
        rss_url="https://nepalpress.com/rss",
        twitter_handle="@nepalpress",
        twitter_id="nepalpress",
        facebook_page="https://www.facebook.com/nepalpress",
        facebook_id="nepalpress",
        youtube_channel="https://www.youtube.com/c/NepaliPress",
        instagram_handle="@nepalpress",
        category="mainstream",
        political_leaning="center",
        reliability_score=0.65,
        language="nepali"
    ),
    NewsSource(
        name="Hamro Patro",
        website_url="https://hamropatro.com/news",
        rss_url="https://hamropatro.com/rss",
        twitter_handle="@HamroPatro",
        twitter_id="HamroPatro",
        facebook_page="https://www.facebook.com/hamropatro",
        facebook_id="hamropatro",
        youtube_channel="https://www.youtube.com/c/HamroPatroOfficial",
        instagram_handle="@hamropatro",
        category="digital",
        political_leaning="center",
        reliability_score=0.60,
        language="nepali"
    ),
    NewsSource(
        name="Annapurna Post",
        website_url="https://annapurnapost.com",
        rss_url="https://annapurnapost.com/rss",
        twitter_handle="@AnnapurnaPost",
        twitter_id="AnnapurnaPost",
        facebook_page="https://www.facebook.com/annapurnapost",
        facebook_id="annapurnapost",
        youtube_channel="https://www.youtube.com/c/AnnapurnaTV",
        instagram_handle="@annapurnapost",
        category="mainstream",
        political_leaning="center",
        reliability_score=0.78,
        language="nepali"
    ),
    NewsSource(
        name="Nepali Times",
        website_url="https://nepalitimes.com",
        rss_url="https://nepalitimes.com/rss",
        twitter_handle="@NepaliTimes",
        twitter_id="NepaliTimes",
        facebook_page="https://www.facebook.com/NepalTimes",
        facebook_id="NepalTimes",
        youtube_channel="https://www.youtube.com/c/NepaliTimes",
        instagram_handle="@nepalitimes",
        category="international",
        political_leaning="center",
        reliability_score=0.88,
        language="english"
    ),
    NewsSource(
        name="Republica",
        website_url="https://myrepublica.nagariknetwork.com",
        rss_url="https://myrepublica.nagariknetwork.com/rss",
        twitter_handle="@RepublicaNepal",
        twitter_id="RepublicaNepal",
        facebook_page="https://www.facebook.com/myrepublica",
        facebook_id="myrepublica",
        youtube_channel="https://www.youtube.com/c/RepublicaNepal",
        instagram_handle="@myrepublica",
        category="mainstream",
        political_leaning="center-right",
        reliability_score=0.72,
        language="english"
    ),
    NewsSource(
        name="The Himalayan Times",
        website_url="https://thehimalayantimes.com",
        rss_url="https://thehimalayantimes.com/rss",
        twitter_handle="@thehimtimes",
        twitter_id="thehimtimes",
        facebook_page="https://www.facebook.com/thehimalayantimes",
        facebook_id="thehimalayantimes",
        youtube_channel="https://www.youtube.com/c/TheHimalayanTimes",
        instagram_handle="@thehimalayantimes",
        category="mainstream",
        political_leaning="center",
        reliability_score=0.80,
        language="english"
    ),
    NewsSource(
        name="Gorkha Patra",
        website_url="https://gorkhapatraonline.com",
        rss_url="https://gorkhapatraonline.com/rss",
        twitter_handle="@GorkhaPatraNep",
        twitter_id="GorkhaPatraNep",
        facebook_page="https://www.facebook.com/gorkhapatra",
        facebook_id="gorkhapatra",
        youtube_channel="https://www.youtube.com/c/GorkhaPatraDaily",
        instagram_handle="@gorkhapatra",
        category="government",
        political_leaning="center",
        reliability_score=0.70,
        language="nepali"
    ),
    NewsSource(
        name="Ujyalo Online",
        website_url="https://ujyaaloonline.com",
        rss_url="https://ujyaaloonline.com/rss",
        twitter_handle="@UjyaaloOnline",
        twitter_id="UjyaaloOnline",
        facebook_page="https://www.facebook.com/ujyaaloonline",
        facebook_id="ujyaaloonline",
        youtube_channel="https://www.youtube.com/c/UjyaaloOnline",
        instagram_handle="@ujyaaloonline",
        category="mainstream",
        political_leaning="center",
        reliability_score=0.75,
        language="nepali"
    ),
    NewsSource(
        name="Khabarhub",
        website_url="https://khabarhub.com",
        rss_url="https://khabarhub.com/rss",
        twitter_handle="@khabarhub",
        twitter_id="khabarhub",
        facebook_page="https://www.facebook.com/khabarhub",
        facebook_id="khabarhub",
        youtube_channel="https://www.youtube.com/c/KhabarHub",
        instagram_handle="@khabarhub",
        category="digital",
        political_leaning="center",
        reliability_score=0.68,
        language="nepali"
    ),
    NewsSource(
        name="Pahilo Post",
        website_url="https://pahilopost.com",
        rss_url="https://pahilopost.com/rss",
        twitter_handle="@pahilopost",
        twitter_id="pahilopost",
        facebook_page="https://www.facebook.com/pahilopost",
        facebook_id="pahilopost",
        youtube_channel="https://www.youtube.com/c/PahiloPost",
        instagram_handle="@pahilopost",
        category="digital",
        political_leaning="center-left",
        reliability_score=0.73,
        language="nepali"
    ),
    NewsSource(
        name="Ukaalo",
        website_url="https://ukaalo.com",
        rss_url="https://ukaalo.com/feed",
        twitter_handle="@ukaalocom",
        twitter_id="ukaalocom",
        facebook_page="https://www.facebook.com/ukaalo",
        facebook_id="ukaalo",
        youtube_channel="https://www.youtube.com/c/UkaaloOnline",
        instagram_handle="@ukaalo",
        category="digital",
        political_leaning="center",
        reliability_score=0.70,
        language="nepali"
    ),
    NewsSource(
        name="Swasthya Khabar",
        website_url="https://swasthyakhabar.com",
        rss_url="https://swasthyakhabar.com/rss",
        twitter_handle="@swasthyakhabar",
        twitter_id="swasthyakhabar",
        facebook_page="https://www.facebook.com/swasthyakhabar",
        facebook_id="swasthyakhabar",
        youtube_channel="https://www.youtube.com/c/SwasthyaKhabar",
        instagram_handle="@swasthyakhabar",
        category="health",
        political_leaning="center",
        reliability_score=0.75,
        language="nepali"
    ),
    NewsSource(
        name="Taksar Magazine",
        website_url="https://taksar.com.np",
        rss_url="https://taksar.com.np/rss",
        twitter_handle="@taksarmagazine",
        twitter_id="taksarmagazine",
        facebook_page="https://www.facebook.com/taksarmagazine",
        facebook_id="taksarmagazine",
        youtube_channel="https://www.youtube.com/c/TaksarMagazine",
        instagram_handle="@taksarmagazine",
        category="magazine",
        political_leaning="center",
        reliability_score=0.72,
        language="nepali"
    ),
    NewsSource(
        name="Himal Khabarpatrika",
        website_url="https://himalmag.com",
        rss_url="https://himalmag.com/feed",
        twitter_handle="@himalmag",
        twitter_id="himalmag",
        facebook_page="https://www.facebook.com/himalmag",
        facebook_id="himalmag",
        youtube_channel="https://www.youtube.com/c/HimalMagazine",
        instagram_handle="@himalmag",
        category="magazine",
        political_leaning="center-left",
        reliability_score=0.82,
        language="english"
    )
]

# Popular Nepal Social Media Accounts for News Monitoring
NEPAL_SOCIAL_ACCOUNTS = [
    {
        "name": "Prime Minister's Office Nepal",
        "twitter_handle": "@PMOnep",
        "facebook_page": "https://www.facebook.com/PMONepal",
        "category": "government",
        "priority": "high"
    },
    {
        "name": "Nepal Government",
        "twitter_handle": "@NepalGov",
        "facebook_page": "https://www.facebook.com/NepalGovernment",
        "category": "government",
        "priority": "high"
    },
    {
        "name": "Nepal Police",
        "twitter_handle": "@NepalPoliceHQ",
        "facebook_page": "https://www.facebook.com/NepalPolice",
        "category": "law_enforcement",
        "priority": "medium"
    },
    {
        "name": "Ukeraa",
        "twitter_handle": "@ukeraa",
        "facebook_page": "https://www.facebook.com/Ukeraa/",
        "category": "social_media",
        "priority": "medium"
    },
    {
        "name": "Tribhuvan University",
        "twitter_handle": "@TUNepal",
        "facebook_page": "https://www.facebook.com/TribhuvanUniversity",
        "category": "education",
        "priority": "medium"
    },
    {
        "name": "Tourism Board Nepal",
        "twitter_handle": "@NTBNepal",
        "facebook_page": "https://www.facebook.com/welcomenepal",
        "category": "tourism",
        "priority": "low"
    }
]

# Twitter API Configuration
class TwitterConfig:
    """Twitter API configuration for news intelligence"""

    # API Keys (set via environment variables)
    API_KEY = os.getenv('TWITTER_API_KEY', '')
    API_SECRET = os.getenv('TWITTER_API_SECRET', '')
    ACCESS_TOKEN = os.getenv('TWITTER_ACCESS_TOKEN', '')
    ACCESS_TOKEN_SECRET = os.getenv('TWITTER_ACCESS_TOKEN_SECRET', '')
    BEARER_TOKEN = os.getenv('TWITTER_BEARER_TOKEN', '')

    # Rate limiting
    REQUESTS_PER_WINDOW = 300  # Twitter API v2 limit
    WINDOW_MINUTES = 15

    # Collection parameters
    TWEETS_PER_SOURCE = 100  # Recent tweets per news source
    MONITORING_KEYWORDS = [
        'नेपाल', 'काठमाडौं', 'सरकार', 'प्रधानमन्त्री', 'संसद',  # Nepal, Kathmandu, Government, PM, Parliament
        'राजनीति', 'अर्थतन्त्र', 'शिक्षा', 'स्वास्थ्य', 'कोरोना',  # Politics, Economy, Education, Health, Corona
        'भारत', 'चीन', 'अमेरिका', 'ट्रम्प', 'मोदी',  # India, China, America, Trump, Modi
        'न्युज', 'समाचार', 'खबर', 'पोखरा', 'भक्तपुर', 'ललितपुर',  # News, News, News, Pokhara, Bhaktapur, Lalitpur
        'बजेट', 'अदालत', 'पुलिस', 'सेना', 'निर्वाचन', 'चुनाव',  # Budget, Court, Police, Army, Election, Election
        'कोभिड', 'भूकम्प', 'बाढी', 'पहिरो', 'मौसम', 'यातायात'  # COVID, Earthquake, Flood, Landslide, Weather, Transport
    ]

# Analytics Configuration
class AnalyticsConfig:
    """Configuration for news intelligence analytics"""

    # Story lifecycle phases (in minutes)
    BREAKING_PHASE = 120      # 0-2 hours: Who reports first
    AMPLIFICATION_PHASE = 1440 # 2-24 hours: Social spread
    DISCUSSION_PHASE = 10080   # 1-7 days: Commentary period

    # Influence metrics thresholds
    HIGH_ENGAGEMENT_THRESHOLD = 100    # Retweets + likes
    VIRAL_THRESHOLD = 1000            # Viral story threshold
    FAST_PICKUP_HOURS = 4             # Cross-source pickup speed

    # Story matching parameters
    SIMILARITY_THRESHOLD = 0.7        # Content similarity for story matching
    TIME_WINDOW_HOURS = 24           # Time window for story clustering

    # Real-time analysis intervals
    DATA_COLLECTION_MINUTES = 15     # How often to collect new data
    ANALYTICS_UPDATE_MINUTES = 30    # How often to update analytics
    DASHBOARD_REFRESH_SECONDS = 60   # Dashboard refresh rate

# Database Configuration for Enhanced Schema
class DatabaseConfig:
    """Enhanced database schema for news intelligence"""

    DB_PATH = "nepal_news_intelligence.db"

    # Enhanced article schema
    ARTICLES_SCHEMA = """
    CREATE TABLE IF NOT EXISTS articles_enhanced (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        content TEXT,
        source_site TEXT NOT NULL,
        source_category TEXT,
        political_leaning TEXT,
        scraped_date TIMESTAMP,
        published_date TIMESTAMP,
        word_count INTEGER,
        language TEXT,
        quality_score REAL,

        -- New intelligence fields
        story_id TEXT,  -- Clustered story identifier
        story_phase TEXT,  -- breaking, amplification, discussion, archive
        first_source_flag BOOLEAN DEFAULT FALSE,  -- Was this the first to report?
        cross_source_count INTEGER DEFAULT 0,  -- How many sources covered this story

        -- Content analysis
        sentiment_score REAL,  -- -1 to 1
        topic_category TEXT,   -- Auto-detected topic
        entity_mentions TEXT,  -- JSON of detected entities

        -- Performance metrics
        estimated_reach INTEGER DEFAULT 0,
        engagement_score REAL DEFAULT 0.0,
        virality_coefficient REAL DEFAULT 0.0
    )
    """

    # Social media tracking schema
    SOCIAL_SCHEMA = """
    CREATE TABLE IF NOT EXISTS social_metrics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        article_url TEXT,
        twitter_id TEXT,
        tweet_text TEXT,
        tweet_url TEXT,
        published_at TIMESTAMP,

        -- Engagement metrics
        retweet_count INTEGER DEFAULT 0,
        like_count INTEGER DEFAULT 0,
        reply_count INTEGER DEFAULT 0,
        quote_count INTEGER DEFAULT 0,

        -- Calculated metrics
        engagement_rate REAL DEFAULT 0.0,
        amplification_factor REAL DEFAULT 0.0,

        -- Tracking
        collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (article_url) REFERENCES articles_enhanced (url)
    )
    """

    # Story intelligence schema
    STORIES_SCHEMA = """
    CREATE TABLE IF NOT EXISTS story_intelligence (
        story_id TEXT PRIMARY KEY,
        story_title TEXT,
        first_source TEXT,
        first_published TIMESTAMP,
        last_updated TIMESTAMP,

        -- Story lifecycle
        phase TEXT,  -- breaking, amplification, discussion, archive
        total_articles INTEGER DEFAULT 0,
        total_sources INTEGER DEFAULT 0,

        -- Performance metrics
        total_social_engagement INTEGER DEFAULT 0,
        estimated_total_reach INTEGER DEFAULT 0,
        peak_engagement_time TIMESTAMP,

        -- Content analysis
        dominant_sentiment REAL,
        topic_category TEXT,
        key_entities TEXT,  -- JSON

        -- Intelligence flags
        is_trending BOOLEAN DEFAULT FALSE,
        is_controversial BOOLEAN DEFAULT FALSE,
        cross_source_consensus REAL DEFAULT 0.0,  -- Agreement level across sources

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """

# Real-time Processing Configuration
class ProcessingConfig:
    """Configuration for real-time data processing"""

    # Background task intervals
    RSS_COLLECTION_SECONDS = 900      # 15 minutes
    TWITTER_COLLECTION_SECONDS = 1800  # 30 minutes
    STORY_ANALYSIS_SECONDS = 1800      # 30 minutes
    INFLUENCE_CALCULATION_SECONDS = 3600  # 1 hour

    # Processing parameters
    MAX_ARTICLES_PER_BATCH = 50
    MAX_TWEETS_PER_BATCH = 200
    PROCESSING_TIMEOUT_SECONDS = 300

    # File paths
    LOG_DIR = "logs/"
    CACHE_DIR = "cache/"
    BACKUP_DIR = "backups/"

# Dashboard Configuration
class DashboardConfig:
    """Configuration for real-time dashboard"""

    # Streamlit settings
    PAGE_TITLE = "🇳🇵 Nepal News Intelligence Platform"
    PAGE_ICON = "📊"
    LAYOUT = "wide"

    # Refresh rates
    REALTIME_REFRESH_SECONDS = 60
    ANALYTICS_REFRESH_SECONDS = 300

    # Display limits
    TOP_STORIES_LIMIT = 10
    TOP_SOURCES_LIMIT = 8
    RECENT_ACTIVITY_HOURS = 24

    # Color scheme for political spectrum
    POLITICAL_COLORS = {
        'left': '#FF6B6B',
        'center-left': '#FF8E8E',
        'center': '#4ECDC4',
        'center-right': '#45B7D1',
        'right': '#96CEB4',
        'unknown': '#FECA57'
    }

# Export configuration for easy import
__all__ = [
    'NEPAL_NEWS_SOURCES',
    'NEPAL_SOCIAL_ACCOUNTS',
    'TwitterConfig',
    'AnalyticsConfig',
    'DatabaseConfig',
    'ProcessingConfig',
    'DashboardConfig',
    'NewsSource'
]