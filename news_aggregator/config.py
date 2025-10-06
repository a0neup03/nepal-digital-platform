"""
Configuration for Nepal News Aggregator
Production-grade settings based on Ground News architecture
"""

import os
from typing import List, Dict
from datetime import timedelta

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://localhost/nepal_news")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# RSS Feed Sources (Major Nepali News Sources)
# Updated with working RSS URLs
NEPALI_NEWS_SOURCES = {
    "setopati": {
        "name": "Setopati",
        "rss_url": "https://setopati.com/feed",
        "bias_rating": "center",
        "reliability": "high",
        "language": "nepali"
    },
    "onlinekhabar": {
        "name": "Online Khabar",
        "rss_url": "https://onlinekhabar.com/feed",
        "bias_rating": "center",
        "reliability": "high",
        "language": "nepali"
    },
    "ratopati": {
        "name": "Ratopati",
        "rss_url": "https://ratopati.com/feed",
        "bias_rating": "center-left",
        "reliability": "medium",
        "language": "nepali"
    },
    "myrepublica": {
        "name": "My Republica",
        "rss_url": "https://myrepublica.nagariknetwork.com/feed",
        "bias_rating": "center-right",
        "reliability": "high",
        "language": "english"
    },
    # Backup test source
    "bbc_nepali": {
        "name": "BBC Nepali",
        "rss_url": "https://feeds.bbci.co.uk/nepali/rss.xml",
        "bias_rating": "center",
        "reliability": "high",
        "language": "nepali"
    }
}

# Similarity Detection Configuration (Based on SemHash)
SIMILARITY_CONFIG = {
    "embedding_model": "sentence-transformers/paraphrase-multilingual-mpnet-base-v2",
    "similarity_threshold": 0.85,  # High threshold for duplicate detection
    "cluster_threshold": 0.70,     # Lower threshold for story clustering
    "max_embedding_cache": 10000,  # Cache embeddings for performance
    "dimension_reduction": 384,     # Embedding dimensions
}

# Clustering Configuration (Based on Online News Clustering)
CLUSTERING_CONFIG = {
    "algorithm": "incremental_kmeans",
    "max_clusters": 50,
    "min_cluster_size": 2,
    "decay_factor": 0.95,           # For temporal weighting
    "recompute_interval": 3600,     # Recompute clusters every hour
}

# Multi-Stage Processing Pipeline
PIPELINE_CONFIG = {
    "stage_1_exact_match": True,       # MD5 hash comparison
    "stage_2_fast_similarity": True,   # TF-IDF + LSH
    "stage_3_semantic_embedding": True, # Sentence transformers
    "stage_4_ai_verification": False,  # Expensive AI (disabled for now)
    
    "batch_size": 100,
    "max_articles_per_hour": 1000,
    "retention_days": 90,
}

# RSS Collection Configuration
RSS_CONFIG = {
    "update_interval": 300,         # 5 minutes (like Ground News)
    "request_timeout": 30,
    "max_retries": 3,
    "user_agent": "Nepal News Aggregator 1.0",
    "respect_robots_txt": True,
}

# Performance and Scaling
PERFORMANCE_CONFIG = {
    "enable_caching": True,
    "cache_ttl": 3600,              # 1 hour
    "background_processing": True,
    "parallel_workers": 4,
    "memory_limit_mb": 2048,
}

# Temporal Processing (Critical for historical data)
TEMPORAL_CONFIG = {
    "story_lifecycle_days": 7,      # How long to track story development
    "breaking_news_hours": 24,      # Breaking news detection window
    "historical_batch_size": 500,   # For processing historical data
    "time_decay_factor": 0.1,       # Reduce importance of old articles
}

# Bias Detection (Like AllSides)
BIAS_CONFIG = {
    "enable_bias_detection": True,
    "political_keywords": {
        "left": ["समाजवाद", "वामपन्थी", "कम्युनिष्ट"],
        "center": ["मध्यमार्गी", "संविधान", "लोकतन्त्र"],
        "right": ["राष्ट्रवाद", "हिन्दुत्व", "परम्परागत"]
    }
}

# Quality Filters - Optimized for RSS feeds (summaries)
QUALITY_CONFIG = {
    "min_article_length": 10,       # Very low for RSS summaries
    "max_article_length": 50000,    # Maximum characters
    "spam_keywords": ["click here", "subscribe now", "advertisement"],
    "required_elements": ["title", "published_date"],  # Content optional for RSS
}

# API Configuration
API_CONFIG = {
    "host": "0.0.0.0",
    "port": 8000,
    "workers": 4,
    "enable_cors": True,
    "rate_limit": "100/minute",
}

# Development vs Production
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
DEBUG = ENVIRONMENT == "development"

if DEBUG:
    # Reduce processing for development
    RSS_CONFIG["update_interval"] = 3600  # 1 hour
    PIPELINE_CONFIG["max_articles_per_hour"] = 100
    SIMILARITY_CONFIG["max_embedding_cache"] = 1000