#!/usr/bin/env python3
"""
Real-time Analytics Engine for Nepal News Intelligence Platform
Story lifecycle tracking, influence measurement, and intelligent insights
"""

import sqlite3
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional
import json
import logging
from collections import defaultdict
import hashlib
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import DBSCAN
import networkx as nx

from nepal_news_intelligence_config import AnalyticsConfig, NEPAL_NEWS_SOURCES
from enhanced_clustering_preprocessor import EnhancedNewsClusteringPreprocessor

class NewsIntelligenceEngine:
    """Real-time analytics engine for news intelligence"""

    def __init__(self, db_path="nepal_news_intelligence.db"):
        self.db_path = db_path
        self.config = AnalyticsConfig()
        self.setup_logging()

        # Initialize enhanced clustering preprocessor
        self.enhanced_preprocessor = EnhancedNewsClusteringPreprocessor()
        self.setup_database()
        # Nepali-aware TfidfVectorizer with proper tokenization
        self.vectorizer = TfidfVectorizer(
            max_features=1000,
            token_pattern=r'[\u0900-\u097F]+|[a-zA-Z]+',  # Nepali unicode + English words
            lowercase=True,
            stop_words=None  # We'll handle stopwords in preprocessing
        )

    def setup_logging(self):
        """Setup logging for analytics engine"""
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)

    def setup_database(self):
        """Setup enhanced database schema for analytics"""
        try:
            conn = sqlite3.connect(self.db_path)

            # Enhanced articles table with intelligence fields
            conn.execute("""
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

                    -- Intelligence fields
                    story_id TEXT,
                    story_phase TEXT,
                    first_source_flag BOOLEAN DEFAULT FALSE,
                    cross_source_count INTEGER DEFAULT 0,

                    -- Content analysis
                    sentiment_score REAL,
                    topic_category TEXT,
                    entity_mentions TEXT,

                    -- Performance metrics
                    estimated_reach INTEGER DEFAULT 0,
                    engagement_score REAL DEFAULT 0.0,
                    virality_coefficient REAL DEFAULT 0.0,

                    -- Calculated at insert/update
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Story intelligence table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS story_intelligence (
                    story_id TEXT PRIMARY KEY,
                    story_title TEXT,
                    first_source TEXT,
                    first_published TIMESTAMP,
                    last_updated TIMESTAMP,

                    -- Lifecycle
                    current_phase TEXT,
                    total_articles INTEGER DEFAULT 0,
                    total_sources INTEGER DEFAULT 0,

                    -- Performance
                    total_social_engagement INTEGER DEFAULT 0,
                    estimated_total_reach INTEGER DEFAULT 0,
                    peak_engagement_time TIMESTAMP,

                    -- Content
                    dominant_sentiment REAL,
                    topic_category TEXT,
                    key_entities TEXT,

                    -- Intelligence flags
                    is_trending BOOLEAN DEFAULT FALSE,
                    is_controversial BOOLEAN DEFAULT FALSE,
                    cross_source_consensus REAL DEFAULT 0.0,

                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Real-time insights table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS realtime_insights (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    insight_type TEXT NOT NULL,
                    insight_title TEXT,
                    insight_description TEXT,
                    confidence_score REAL,
                    related_stories TEXT,  -- JSON array
                    related_sources TEXT,  -- JSON array
                    action_recommended TEXT,

                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    expires_at TIMESTAMP,
                    is_active BOOLEAN DEFAULT TRUE
                )
            """)

            conn.commit()
            conn.close()
            self.logger.info("Analytics database schema initialized")

        except Exception as e:
            self.logger.error(f"Database setup failed: {e}")

    def generate_story_id(self, title: str, content: str) -> str:
        """Generate unique story ID based on content similarity"""
        # Combine title and first 200 characters of content
        combined_text = f"{title} {content[:200]}"

        # Clean and normalize
        cleaned_text = re.sub(r'[^\w\s]', '', combined_text.lower())

        # Generate hash
        story_hash = hashlib.md5(cleaned_text.encode()).hexdigest()[:12]

        return f"story_{story_hash}"

    def detect_story_clusters(self, hours_back: int = 24) -> Dict[str, List[Dict]]:
        """Detect story clusters using content similarity"""
        try:
            conn = sqlite3.connect(self.db_path)

            # Get recent articles
            cutoff_time = datetime.now() - timedelta(hours=hours_back)

            query = """
                SELECT url, title, content, source_site, published_date
                FROM articles_enhanced
                WHERE COALESCE(published_date, scraped_date) >= ?
                AND content IS NOT NULL
                ORDER BY published_date DESC
            """

            df = pd.read_sql_query(query, conn, params=(cutoff_time.isoformat(),))
            conn.close()

            if df.empty:
                return {}

            # Prepare text for clustering WITH SOCIAL MEDIA CLEANING
            texts = []
            for _, row in df.iterrows():
                combined_text = f"{row['title']} {row['content'][:500]}"
                cleaned_text = self.clean_social_media_contamination(combined_text)
                texts.append(cleaned_text)

            # Vectorize and cluster
            if len(texts) > 1:
                tfidf_matrix = self.vectorizer.fit_transform(texts)

                # Use DBSCAN for clustering
                similarity_threshold = 0.3
                clustering = DBSCAN(
                    eps=1-similarity_threshold,
                    min_samples=2,
                    metric='cosine'
                ).fit(tfidf_matrix.toarray())

                # Group articles by cluster
                clusters = defaultdict(list)
                for idx, cluster_id in enumerate(clustering.labels_):
                    if cluster_id != -1:  # Not noise
                        article_data = {
                            'url': df.iloc[idx]['url'],
                            'title': df.iloc[idx]['title'],
                            'source': df.iloc[idx]['source_site'],
                            'published': df.iloc[idx]['published_date']
                        }
                        clusters[f"cluster_{cluster_id}"].append(article_data)

                # Filter clusters with multiple sources
                multi_source_clusters = {}
                for cluster_id, articles in clusters.items():
                    sources = set(article['source'] for article in articles)
                    if len(sources) > 1:  # Multiple sources covering same story
                        multi_source_clusters[cluster_id] = articles

                self.logger.info(f"Detected {len(multi_source_clusters)} multi-source story clusters")
                return multi_source_clusters

            return {}

        except Exception as e:
            self.logger.error(f"Error detecting story clusters: {e}")
            return {}

    def analyze_story_lifecycle(self, story_id: str) -> Dict:
        """Analyze lifecycle phase of a story"""
        try:
            conn = sqlite3.connect(self.db_path)

            # Get all articles for this story
            query = """
                SELECT a.*, s.retweet_count, s.like_count, s.engagement_score
                FROM articles_enhanced a
                LEFT JOIN social_metrics s ON a.url = s.article_url
                WHERE a.story_id = ?
                ORDER BY a.published_date ASC
            """

            df = pd.read_sql_query(query, conn, params=(story_id,))
            conn.close()

            if df.empty:
                return {}

            # Calculate lifecycle metrics
            first_article = df.iloc[0]
            latest_article = df.iloc[-1]

            time_span = pd.to_datetime(latest_article['published_date']) - pd.to_datetime(first_article['published_date'])
            hours_elapsed = time_span.total_seconds() / 3600

            # Determine current phase
            if hours_elapsed <= self.config.BREAKING_PHASE / 60:
                current_phase = "breaking"
            elif hours_elapsed <= self.config.AMPLIFICATION_PHASE / 60:
                current_phase = "amplification"
            elif hours_elapsed <= self.config.DISCUSSION_PHASE / 60:
                current_phase = "discussion"
            else:
                current_phase = "archive"

            # Calculate engagement metrics
            total_engagement = df['engagement_score'].fillna(0).sum()
            avg_engagement = df['engagement_score'].fillna(0).mean()

            # Source diversity
            unique_sources = df['source_site'].nunique()

            lifecycle_data = {
                'story_id': story_id,
                'current_phase': current_phase,
                'hours_elapsed': round(hours_elapsed, 2),
                'total_articles': len(df),
                'unique_sources': unique_sources,
                'first_source': first_article['source_site'],
                'latest_source': latest_article['source_site'],
                'total_engagement': int(total_engagement),
                'avg_engagement': round(avg_engagement, 2),
                'story_title': first_article['title']
            }

            return lifecycle_data

        except Exception as e:
            self.logger.error(f"Error analyzing story lifecycle: {e}")
            return {}

    def calculate_source_influence_metrics(self, hours_back: int = 24) -> pd.DataFrame:
        """Calculate real-time influence metrics for news sources"""
        try:
            conn = sqlite3.connect(self.db_path)

            cutoff_time = datetime.now() - timedelta(hours=hours_back)

            # Complex query to calculate influence metrics
            query = """
                WITH source_stats AS (
                    SELECT
                        a.source_site,
                        COUNT(DISTINCT a.story_id) as unique_stories,
                        COUNT(*) as total_articles,
                        AVG(a.word_count) as avg_word_count,
                        AVG(a.quality_score) as avg_quality,
                        SUM(CASE WHEN a.first_source_flag THEN 1 ELSE 0 END) as stories_broken_first,
                        AVG(a.cross_source_count) as avg_cross_source_pickup,
                        COALESCE(SUM(s.engagement_score), 0) as total_social_engagement,
                        COALESCE(AVG(s.engagement_score), 0) as avg_social_engagement
                    FROM articles_enhanced a
                    LEFT JOIN social_metrics s ON a.url = s.article_url
                    WHERE COALESCE(a.published_date, a.scraped_date) >= ?
                    GROUP BY a.source_site
                ),
                source_network AS (
                    SELECT
                        source_site,
                        COUNT(DISTINCT story_id) as connected_stories
                    FROM articles_enhanced
                    WHERE COALESCE(published_date, scraped_date) >= ? AND cross_source_count > 0
                    GROUP BY source_site
                )
                SELECT
                    ss.*,
                    COALESCE(sn.connected_stories, 0) as network_connected_stories
                FROM source_stats ss
                LEFT JOIN source_network sn ON ss.source_site = sn.source_site
                ORDER BY ss.total_social_engagement DESC
            """

            df = pd.read_sql_query(query, conn, params=(cutoff_time.isoformat(), cutoff_time.isoformat()))
            conn.close()

            if not df.empty:
                # Calculate composite influence score
                df['influence_score'] = (
                    df['stories_broken_first'] * 3 +  # Breaking news weight
                    df['avg_cross_source_pickup'] * 2 +  # Cross-source pickup
                    df['avg_social_engagement'] / 100 +  # Social engagement
                    df['avg_quality'] * 1  # Content quality
                ).round(2)

                # Calculate story origination rate
                df['origination_rate'] = (df['stories_broken_first'] / df['unique_stories'] * 100).round(1)

                # Calculate network centrality proxy
                df['network_centrality'] = (df['network_connected_stories'] / df['unique_stories']).round(2)

                # Rank sources
                df['influence_rank'] = df['influence_score'].rank(ascending=False).astype(int)

            self.logger.info(f"Calculated influence metrics for {len(df)} sources")
            return df

        except Exception as e:
            self.logger.error(f"Error calculating influence metrics: {e}")
            return pd.DataFrame()

    def clean_social_media_contamination(self, text: str) -> str:
        """
        Remove social media sharing artifacts and web contamination from scraped text
        Enhanced based on data analysis showing linkedin, setopati, click contamination
        """
        if not text:
            return ""

        import re

        # High-frequency contamination terms found in analysis
        contamination_terms = [
            'linkedin', 'facebook', 'twitter', 'instagram', 'setopati', 'click', 'link',
            'follow', 'share', 'like', 'post', 'comment', 'website', 'url', 'sale',
            'प्रकाशित', 'सम्पादक', 'रिपोर्टर', 'संवाददाता', 'source', 'photo', 'video',
            # Web interface contamination (identified from dashboard issue)
            'sign', 'javascript', 'login', 'register', 'account', 'profile', 'settings',
            'dashboard', 'sidebar', 'menu', 'navigation', 'header', 'footer', 'banner'
        ]

        # Remove contamination terms (case insensitive)
        for term in contamination_terms:
            text = re.sub(rf'\b{term}\b', ' ', text, flags=re.IGNORECASE)

        # Define social media sharing patterns
        social_patterns = [
            # Social sharing buttons
            r'share\s+on\s+(facebook|twitter|instagram|linkedin|whatsapp)',
            r'like\s+us\s+on\s+(facebook|twitter|instagram)',
            r'follow\s+us\s+on\s+(facebook|twitter|instagram|linkedin)',
            r'tweet\s+this',
            r'share\s+this\s+story',
            r'share\s+this\s+article',

            # Social media URLs and handles
            r'https?://(?:www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com/\S+',
            r'@[a-zA-Z0-9_]+',
            r'#[a-zA-Z0-9_]+',

            # Advertisement and promotional text
            r'advertisement',
            r'sponsored\s+content',
            r'promoted\s+post',
            r'ad\s+by',
            r'click\s+here\s+to',
            r'subscribe\s+now',
            r'sign\s+up\s+for',

            # Newsletter and email signup
            r'newsletter\s+signup',
            r'email\s+subscription',
            r'get\s+our\s+newsletter',
            r'join\s+our\s+mailing\s+list',

            # Website navigation elements
            r'home\s*\|\s*about\s*\|\s*contact',
            r'privacy\s+policy',
            r'terms\s+of\s+service',
            r'copyright\s+©',
            r'all\s+rights\s+reserved',

            # Comment and engagement prompts
            r'leave\s+a\s+comment',
            r'what\s+do\s+you\s+think',
            r'tell\s+us\s+in\s+the\s+comments',

            # Read more links
            r'read\s+more\s+here',
            r'continue\s+reading',
            r'full\s+story\s+here',

            # Generic web elements
            r'loading\.\.\.',
            r'please\s+enable\s+javascript',
            r'cookies\s+policy',

            # Specific contamination patterns found in trending analysis
            r'^sign\s+in$',  # Exact match for "Sign in" titles
            r'javascript\s+is\s+not\s+available\.?',  # "JavaScript is not available"
            r'page\s+not\s+found',
            r'404\s+error',
            r'access\s+denied',
            r'login\s+required',
            r'please\s+log\s+in',
            r'session\s+expired',
            r'unauthorized\s+access',

            # Nepali social media terms
            r'फेसबुकमा\s+साझा\s+गर्नुहोस्',
            r'ट्विटरमा\s+साझा',
            r'लाइक\s+र\s+साझा',
        ]

        # Clean the text
        cleaned_text = text.lower()

        # Remove social media patterns
        for pattern in social_patterns:
            cleaned_text = re.sub(pattern, ' ', cleaned_text, flags=re.IGNORECASE)

        # Remove HTML entities and tags that might have been missed
        cleaned_text = re.sub(r'&[a-zA-Z]+;', ' ', cleaned_text)
        cleaned_text = re.sub(r'<[^>]+>', ' ', cleaned_text)

        # Remove URLs
        cleaned_text = re.sub(r'https?://\S+', ' ', cleaned_text)
        cleaned_text = re.sub(r'www\.\S+', ' ', cleaned_text)

        # Remove email addresses
        cleaned_text = re.sub(r'\S+@\S+\.\S+', ' ', cleaned_text)

        # Remove phone numbers
        cleaned_text = re.sub(r'[\+]?[1-9]?[0-9]{7,15}', ' ', cleaned_text)

        # Remove excessive whitespace and normalize
        cleaned_text = re.sub(r'\s+', ' ', cleaned_text)
        cleaned_text = cleaned_text.strip()

        return cleaned_text

    def is_valid_news_title(self, title: str) -> bool:
        """
        Validate if a title is a legitimate news title and not web contamination
        """
        if not title or len(title.strip()) < 10:
            return False

        title_lower = title.lower().strip()

        # Direct contamination matches
        contaminated_titles = {
            'sign in', 'javascript is not available.', 'javascript is not available',
            'page not found', '404 error', 'access denied', 'login required',
            'please log in', 'session expired', 'unauthorized access', 'loading...',
            'home', 'about', 'contact', 'privacy policy', 'terms of service',
            'cookies policy', 'newsletter signup', 'subscribe now'
        }

        if title_lower in contaminated_titles:
            return False

        # Pattern-based contamination detection
        contamination_patterns = [
            r'^sign\s+in\s*$',
            r'javascript.*not.*available',
            r'^\s*loading\.+\s*$',
            r'^\s*click\s+here\s*$',
            r'^\s*more\s*$',
            r'^\s*continue\s*$',
            r'^\s*next\s*$',
            r'^\s*previous\s*$',
            r'^\s*home\s*$',
            r'^\s*menu\s*$',
        ]

        import re
        for pattern in contamination_patterns:
            if re.match(pattern, title_lower, re.IGNORECASE):
                return False

        # Must contain at least one meaningful word (3+ characters)
        # Enhanced for Devanagari script support
        words = title.split()
        meaningful_words = []

        for word in words:
            # Check if word is meaningful (3+ chars and contains letters)
            if len(word) >= 3:
                # For Devanagari, check if word contains any alphabetic characters
                # including combining characters (vowel marks)
                has_letters = any(c.isalpha() or (0x0900 <= ord(c) <= 0x097F) for c in word)
                if has_letters:
                    meaningful_words.append(word)

        if len(meaningful_words) < 2:
            return False

        # Should not be mostly punctuation or special characters
        # Enhanced for Devanagari: count Devanagari range as alphanumeric
        alphanumeric_chars = sum(1 for c in title if c.isalnum() or (0x0900 <= ord(c) <= 0x097F))
        if alphanumeric_chars < len(title) * 0.5:  # Lowered threshold for Devanagari
            return False

        return True

    def detect_trending_stories_enhanced(self, hours_back: int = 6) -> List[Dict]:
        """Enhanced trending detection using advanced preprocessing and distance matrix (2025 v3)"""
        try:
            conn = sqlite3.connect(self.db_path)
            cutoff_time = datetime.now() - timedelta(hours=hours_back)

            # Enhanced query for comprehensive topic analysis
            query = """
                SELECT
                    a.title,
                    a.content,
                    a.published_date,
                    a.source_site,
                    a.url,
                    a.word_count,
                    a.quality_score,
                    a.sentiment_score,
                    COALESCE(s.engagement_score, 0) as engagement_score,
                    COALESCE(s.retweet_count, 0) as shares_count,
                    COALESCE(s.like_count, 0) as likes_count
                FROM articles_enhanced a
                LEFT JOIN social_metrics s ON a.url = s.article_url
                WHERE (a.published_date >= ? OR a.scraped_date >= ?)
                AND a.title IS NOT NULL
                AND LENGTH(a.title) > 10
                ORDER BY a.published_date DESC
                LIMIT 1000
            """

            df = pd.read_sql_query(query, conn, params=(cutoff_time.isoformat(), cutoff_time.isoformat()))
            conn.close()

            if df.empty:
                return []

            # Enhanced contamination filtering BEFORE processing
            print(f"📊 Before title validation: {len(df)} articles")
            df = df[df['title'].apply(self.is_valid_news_title)].copy()

            # Additional filtering for enhanced algorithm
            enhanced_contamination_patterns = [
                'sign in', 'javascript is not available', 'page not found', 'error 404',
                'click here', 'login required', 'access denied', 'permission denied'
            ]

            def is_enhanced_valid_title(title):
                if not title or pd.isna(title):
                    return False
                title_lower = str(title).lower().strip()
                return not any(pattern in title_lower for pattern in enhanced_contamination_patterns)

            df = df[df['title'].apply(is_enhanced_valid_title)].copy()
            print(f"📊 After enhanced validation: {len(df)} articles")

            if df.empty:
                return []

            # Combine title and content for analysis WITH SOCIAL MEDIA CLEANING
            df['raw_combined'] = df['title'].fillna('') + ' ' + df['content'].fillna('')
            df['combined_text'] = df['raw_combined'].apply(self.clean_social_media_contamination)

            # ENHANCED PREPROCESSING using our new algorithm
            processed_texts = []
            temporal_weights = []
            source_diversity = []

            for _, row in df.iterrows():
                # Enhanced text preprocessing
                processed_text = self.enhanced_preprocessor.enhanced_text_preprocessing(
                    text=row['combined_text'],
                    title=row['title'],
                    source=row['source_site']
                )
                processed_texts.append(processed_text)

            # Calculate temporal weights using enhanced algorithm
            temporal_weights = self.enhanced_preprocessor.calculate_temporal_weights(
                df['published_date'].tolist()
            )

            # Calculate source diversity scores (for same-source penalty)
            source_sites = df['source_site'].tolist()
            source_diversity = [hash(site) % 1000 for site in source_sites]  # Simple hash-based diversity

            # Filter out empty processed texts
            valid_indices = [i for i, text in enumerate(processed_texts) if len(text) > 5]
            if not valid_indices:
                return []

            # Keep only valid data
            df_filtered = df.iloc[valid_indices].copy()
            processed_texts_filtered = [processed_texts[i] for i in valid_indices]
            temporal_weights_filtered = temporal_weights[valid_indices]
            source_diversity_filtered = [source_diversity[i] for i in valid_indices]

            # ENHANCED TF-IDF FEATURES
            tfidf_matrix, feature_names, vectorizer = self.enhanced_preprocessor.create_enhanced_tfidf_features(
                processed_texts_filtered
            )

            # ENHANCED DISTANCE MATRIX with multiple similarity measures
            distance_matrix = self.enhanced_preprocessor.create_enhanced_distance_matrix(
                tfidf_matrix,
                temporal_weights=temporal_weights_filtered,
                source_diversity=source_diversity_filtered
            )

            # OPTIMIZED DBSCAN parameters based on distance matrix analysis
            # Distance matrix analysis shows range [0.000, 2.856] with mean ~0.340
            # Need stricter eps to prevent over-clustering
            if len(df_filtered) <= 10:
                min_samples = 2
                eps = 0.25  # Stricter for small datasets
            elif len(df_filtered) <= 50:
                min_samples = 2
                eps = 0.20  # Much stricter for medium datasets (was 0.55)
            elif len(df_filtered) <= 100:
                min_samples = 2
                eps = 0.18  # Stricter for larger datasets (was 0.5)
            else:
                min_samples = max(2, len(df_filtered) // 40)  # Slightly higher min_samples
                eps = 0.15  # Much stricter for very large datasets (was 0.45)

            # Apply DBSCAN clustering
            from sklearn.cluster import DBSCAN
            clustering = DBSCAN(eps=eps, min_samples=min_samples, metric='precomputed')
            cluster_labels = clustering.fit_predict(distance_matrix)

            # Handle single large cluster by refining
            unique_clusters = set(cluster_labels[cluster_labels != -1])
            if len(unique_clusters) == 1 and len(df_filtered) > 10:
                eps = eps * 0.7
                clustering = DBSCAN(eps=eps, min_samples=min_samples, metric='precomputed')
                cluster_labels = clustering.fit_predict(distance_matrix)

            df_filtered['cluster'] = cluster_labels

            # Calculate topic scores with enhanced metrics
            trending_topics = []

            for cluster_id in set(cluster_labels):
                if cluster_id == -1:  # Skip noise points
                    continue

                cluster_mask = (cluster_labels == cluster_id)
                cluster_articles = df_filtered[cluster_mask].copy()

                if len(cluster_articles) < 2:  # Skip single-article clusters
                    continue

                # Get most representative terms using enhanced TF-IDF
                cluster_indices = np.where(cluster_mask)[0]
                cluster_tfidf = tfidf_matrix[cluster_indices]
                cluster_center = cluster_tfidf.mean(axis=0).A1

                top_term_indices = np.argsort(cluster_center)[-20:][::-1]
                cluster_terms = [feature_names[i] for i in top_term_indices if cluster_center[i] > 0]

                # Generate enhanced topic name - use article titles instead of TF-IDF terms
                # TF-IDF terms often extract stop words or meaningless fragments
                def extract_meaningful_topic_from_titles(articles):
                    """Extract meaningful topic name from article titles"""
                    titles = articles['title'].tolist()

                    # Look for common meaningful words in titles
                    import re
                    from collections import Counter

                    # Extract meaningful words from all titles
                    all_words = []
                    for title in titles:
                        # Clean title and extract words
                        clean_title = re.sub(r'[^\u0900-\u097F\s\w]', ' ', title)
                        words = clean_title.split()

                        # Filter meaningful words (length > 2, not common stop words)
                        meaningful_words = []
                        for word in words:
                            if len(word) > 2 and word not in ['छन्', 'गर्न', 'भएको', 'गरेको', 'the', 'and', 'for', 'with']:
                                meaningful_words.append(word)
                        all_words.extend(meaningful_words)

                    if all_words:
                        # Get most common meaningful words
                        word_freq = Counter(all_words)
                        top_words = [word for word, count in word_freq.most_common(3) if count > 1]
                        if top_words:
                            return ' '.join(top_words[:2])

                    # Fallback to first article title (cleaned)
                    first_title = titles[0] if titles else "समाचार"
                    # Clean up the title
                    clean_title = re.sub(r'[|]+', ' ', first_title)
                    clean_title = re.sub(r'\s+', ' ', clean_title).strip()
                    return clean_title[:40] + ('...' if len(clean_title) > 40 else '')

                topic_name = extract_meaningful_topic_from_titles(cluster_articles)

                # Enhanced metrics calculation
                article_count = len(cluster_articles)
                source_count = cluster_articles['source_site'].nunique()

                # Enhanced temporal metrics
                try:
                    date_series = pd.to_datetime(cluster_articles['published_date'], errors='coerce')
                    if date_series.notna().sum() > 1:
                        time_span = date_series.max() - date_series.min()
                        hours_active = max(time_span.total_seconds() / 3600, 0.5)
                    else:
                        hours_active = 24
                    velocity = article_count / hours_active
                except:
                    velocity = 0.1

                # Social and quality metrics
                total_engagement = cluster_articles['engagement_score'].sum()
                total_shares = cluster_articles['shares_count'].sum()
                avg_quality = cluster_articles['quality_score'].mean()
                avg_word_count = cluster_articles['word_count'].mean()

                # Enhanced temporal importance using our algorithm
                cluster_temporal_weights = [temporal_weights_filtered[i] for i in cluster_indices]
                temporal_score = np.mean(cluster_temporal_weights)

                # Enhanced trending score calculation
                trending_score = (
                    article_count * 3.0 +           # Volume factor (increased)
                    source_count * 5.0 +            # Source diversity (critical)
                    velocity * 4.0 +                # Publication velocity (increased)
                    temporal_score * 20.0 +         # Recency boost (enhanced)
                    (total_engagement / 100) +      # Social engagement
                    (total_shares / 50) +           # Sharing activity
                    min(avg_quality * 3, 15) +      # Quality bonus (enhanced)
                    min(np.log1p(avg_word_count), 8) # Article depth (enhanced)
                )

                # Topic classification
                def classify_topic(terms):
                    political_terms = ['ओली', 'देउवा', 'प्रचण्ड', 'दाहाल', 'कांग्रेस', 'एमाले', 'माओवादी', 'सरकार']
                    economic_terms = ['बजेट', 'अर्थतन्त्र', 'बैंक', 'व्यापार']
                    social_terms = ['शिक्षा', 'स्वास्थ्य', 'कृषि', 'खेल']

                    terms_lower = [t.lower() for t in terms]
                    if any(term in terms_lower for term in political_terms):
                        return '🏛️'
                    elif any(term in terms_lower for term in economic_terms):
                        return '💰'
                    elif any(term in terms_lower for term in social_terms):
                        return '👥'
                    else:
                        return '📰'

                emoji = classify_topic(cluster_terms)

                # Fix date parsing with proper error handling
                try:
                    first_published = pd.to_datetime(cluster_articles['published_date'], errors='coerce').min()
                except:
                    first_published = pd.NaT

                topic_data = {
                    'title': f"{emoji} {topic_name}",
                    'topic_name': f"{emoji} {topic_name}",
                    'article_count': article_count,
                    'source_count': source_count,
                    'velocity': round(velocity, 2),
                    'trending_score': round(trending_score, 2),
                    'total_engagement': int(total_engagement),
                    'temporal_score': round(temporal_score, 3),
                    'hours_active': round(hours_active, 1),
                    'quality_score': round(avg_quality, 2),
                    'first_published': first_published.strftime('%Y-%m-%d %H:%M:%S') if pd.notna(first_published) else None,
                    'articles': cluster_articles[['title', 'source_site', 'url', 'published_date']].to_dict('records')
                }

                trending_topics.append(topic_data)

            # Sort by enhanced trending score
            trending_topics.sort(key=lambda x: x['trending_score'], reverse=True)

            # Enhanced logging
            n_clusters = len(set(cluster_labels)) - (1 if -1 in cluster_labels else 0)
            n_noise = list(cluster_labels).count(-1)
            noise_percentage = (n_noise / len(cluster_labels)) * 100 if cluster_labels.size > 0 else 0

            self.logger.info(f"Enhanced trending detection: {len(trending_topics)} topics found using improved algorithm")
            self.logger.info(f"Clustering stats: {n_clusters} clusters, {n_noise} noise points ({noise_percentage:.1f}%), eps={eps:.3f}")
            self.logger.info(f"Algorithm improvements: Angular distance, news-specific weighting, temporal integration")

            return trending_topics[:15]

        except Exception as e:
            self.logger.error(f"Error in enhanced trending detection: {e}")
            import traceback
            self.logger.error(f"Traceback: {traceback.format_exc()}")
            # Fallback to simple method
            return self._simple_trending_fallback(hours_back)

    def detect_trending_stories(self, hours_back: int = 6) -> List[Dict]:
        """Advanced trending detection using enhanced preprocessing and distance matrix (2025 v3)"""
        # Use the enhanced algorithm as the primary method
        return self.detect_trending_stories_enhanced(hours_back)

    def _simple_trending_fallback(self, hours_back: int) -> List[Dict]:
        """Fallback simple trending detection if advanced method fails"""
        try:
            conn = sqlite3.connect(self.db_path)
            cutoff_time = datetime.now() - timedelta(hours=hours_back)

            # Enhanced query for comprehensive topic analysis
            query = """
                SELECT
                    a.title,
                    a.content,
                    a.published_date,
                    a.source_site,
                    a.url,
                    a.word_count,
                    a.quality_score,
                    a.sentiment_score,
                    COALESCE(s.engagement_score, 0) as engagement_score,
                    COALESCE(s.retweet_count, 0) as shares_count,
                    COALESCE(s.like_count, 0) as likes_count
                FROM articles_enhanced a
                LEFT JOIN social_metrics s ON a.url = s.article_url
                WHERE (a.published_date >= ? OR a.scraped_date >= ?)
                AND a.title IS NOT NULL
                AND LENGTH(a.title) > 10
                ORDER BY a.published_date DESC
                LIMIT 1000
            """

            df = pd.read_sql_query(query, conn, params=(cutoff_time.isoformat(), cutoff_time.isoformat()))
            conn.close()

            if df.empty:
                return []

            # Filter out contaminated titles BEFORE processing
            print(f"📊 Before title validation: {len(df)} articles")
            df = df[df['title'].apply(self.is_valid_news_title)].copy()
            print(f"📊 After title validation: {len(df)} articles")

            if df.empty:
                return []

            # Import required libraries for advanced NLP
            from sklearn.feature_extraction.text import TfidfVectorizer
            from sklearn.cluster import KMeans
            from collections import Counter
            import numpy as np
            import re

            # Combine title and content for analysis WITH SOCIAL MEDIA CLEANING
            df['raw_combined'] = df['title'].fillna('') + ' ' + df['content'].fillna('')
            df['combined_text'] = df['raw_combined'].apply(self.clean_social_media_contamination)

            # Enhanced Nepali + English preprocessing with proper stopwords
            def preprocess_text(text):
                if pd.isna(text) or not text:
                    return ""

                # Convert to lowercase and clean
                text = str(text).lower()

                # Remove URLs, emails, special characters but keep Nepali text
                text = re.sub(r'http\S+|www\S+|[^\w\s\u0900-\u097F]', ' ', text)

                # Remove extra whitespace
                text = ' '.join(text.split())

                # Comprehensive Nepali + English stopwords
                nepali_stopwords = {'र', 'क', 'न', 'ल', 'त', 'स', 'प', 'म', 'द', 'य', 'व', 'ट', 'ह', 'ग', 'ज', 'छ', 'ब', 'ख', 'थ', 'श', 'ष', 'ड', 'ई', 'च', 'ध', 'भ', 'एक', 'का', 'की', 'को', 'ले', 'मा', 'बाट', 'लाई', 'छन', 'गरे', 'गर्न', 'हुन', 'भन', 'रह', 'आफ', 'यस', 'तर', 'अनि', 'त्यो', 'यो', 'भएको', 'गरेको', 'लागि', 'भने', 'धेरै'}
                english_stopwords = {'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those'}

                # Remove stopwords but keep meaningful words (length > 2)
                words = text.split()
                words = [w for w in words if w not in nepali_stopwords and w not in english_stopwords and len(w) > 2]

                return ' '.join(words)

            df['processed_text'] = df['combined_text'].apply(preprocess_text)

            # Remove empty processed texts
            df = df[df['processed_text'].str.len() > 10].copy()

            if df.empty:
                return []

            # Advanced TF-IDF with temporal weighting
            def temporal_weight(published_date, current_time):
                """Calculate temporal weight - recent articles get higher scores"""
                try:
                    pub_time = pd.to_datetime(published_date)
                    time_diff_hours = (current_time - pub_time).total_seconds() / 3600

                    # Exponential decay with half-life of 6 hours
                    decay_factor = np.exp(-0.1155 * time_diff_hours)  # ln(2)/6 ≈ 0.1155
                    return max(decay_factor, 0.1)  # Minimum weight of 0.1
                except:
                    return 0.1

            current_time = datetime.now()
            df['temporal_weight'] = df['published_date'].apply(lambda x: temporal_weight(x, current_time))

            # TF-IDF with custom parameters for news analysis
            # Enhanced vectorizer with proper Nepali tokenization
            vectorizer = TfidfVectorizer(
                max_features=5000,
                ngram_range=(1, 2),  # Unigrams and bigrams
                min_df=2,  # Term must appear in at least 2 documents
                max_df=0.85,  # Ignore terms that appear in more than 85% of documents
                token_pattern=r'[\u0900-\u097F]+|[a-zA-Z]+',  # Nepali unicode + English words
                stop_words=None,  # We'll handle stop words manually for Nepali
                lowercase=True,
                sublinear_tf=True  # Use sublinear scaling for TF
            )

            # Create TF-IDF matrix
            tfidf_matrix = vectorizer.fit_transform(df['processed_text'])
            feature_names = vectorizer.get_feature_names_out()

            # IMPROVED: Dynamic clustering using cosine similarity + DBSCAN (2024 research)
            # Calculate pairwise similarity matrix
            similarity_matrix = cosine_similarity(tfidf_matrix)

            # Use DBSCAN for density-based clustering (better than K-means for varying cluster sizes)
            # Convert similarity to distance (1 - similarity)
            # Fix floating-point precision issues that cause tiny negative values
            distance_matrix = np.clip(1 - similarity_matrix, 0, None)

            # Apply DBSCAN with more inclusive parameters for better cluster coverage
            # Optimized for news clustering where we want to capture more trending topics (2025 v2)
            if len(df) <= 10:
                min_samples = 2  # Very small datasets need minimal clustering
                eps = 0.6  # Very lenient for tiny datasets
            elif len(df) <= 50:
                min_samples = 2  # Keep minimal for small-medium datasets
                eps = 0.55 + (len(df) / 100) * 0.05  # Adaptive eps: 0.55-0.575 range
            elif len(df) <= 100:
                min_samples = 2  # More inclusive for medium datasets
                eps = 0.5 + (len(df) / 200) * 0.1  # Adaptive eps: 0.5-0.55 range
            else:
                min_samples = max(2, len(df) // 50)  # More lenient for large datasets
                eps = 0.45 + (len(df) / 1000) * 0.15  # Adaptive eps: 0.45-0.6+ range

            try:
                from sklearn.cluster import DBSCAN
                clustering = DBSCAN(eps=eps, min_samples=min_samples, metric='precomputed')
                cluster_labels = clustering.fit_predict(distance_matrix)

                # Handle single large cluster by refining
                unique_clusters = set(cluster_labels[cluster_labels != -1])
                if len(unique_clusters) == 1 and len(df) > 10:
                    # Too few clusters, decrease eps
                    eps = eps * 0.7
                    clustering = DBSCAN(eps=eps, min_samples=min_samples, metric='precomputed')
                    cluster_labels = clustering.fit_predict(distance_matrix)

            except ImportError:
                # Fallback to K-means if DBSCAN not available
                n_topics = min(15, len(df) // 3)
                if n_topics < 3:
                    n_topics = min(10, len(df))
                kmeans = KMeans(n_clusters=n_topics, random_state=42, n_init=10)
                cluster_labels = kmeans.fit_predict(tfidf_matrix.toarray())

            df['cluster'] = cluster_labels

            # Get cluster centers for DBSCAN (calculate centroids)
            cluster_centers = {}
            for cluster_id in set(cluster_labels):
                if cluster_id != -1:  # Skip noise points
                    cluster_mask = cluster_labels == cluster_id
                    cluster_vectors = tfidf_matrix[cluster_mask]
                    cluster_centers[cluster_id] = cluster_vectors.mean(axis=0).A1  # Convert to 1D array

            # Calculate topic scores with multiple factors
            trending_topics = []

            for cluster_id in set(cluster_labels):
                if cluster_id == -1:  # Skip noise points in DBSCAN
                    continue

                cluster_mask = df['cluster'] == cluster_id
                cluster_articles = df[cluster_mask]

                if len(cluster_articles) < 2:  # Skip single-article topics
                    continue

                # Get cluster center and most important terms
                if cluster_id in cluster_centers:
                    cluster_center = cluster_centers[cluster_id]
                    top_term_indices = cluster_center.argsort()[-10:][::-1]
                    cluster_terms = [feature_names[i] for i in top_term_indices]
                else:
                    # Fallback: use most frequent terms from cluster articles
                    cluster_text = ' '.join(cluster_articles['combined_text'].fillna(''))
                    from collections import Counter
                    words = cluster_text.split()
                    word_freq = Counter(words)
                    cluster_terms = [word for word, count in word_freq.most_common(10)]

                # Generate meaningful topic name from article titles
                def generate_topic_name(articles, terms):
                    # Try to find common meaningful terms from article titles
                    common_words = []
                    article_titles = articles['title'].tolist()

                    # Key political figures and terms
                    key_terms = {
                        'ओली': 'KP Oli',
                        'देउवा': 'Sher Bahadur Deuba',
                        'प्रचण्ड': 'Pushpa Kamal Dahal',
                        'दाहाल': 'Pushpa Kamal Dahal',
                        'कांग्रेस': 'Nepali Congress',
                        'एमाले': 'UML Party',
                        'माओवादी': 'Maoist Party',
                        'सरकार': 'Government',
                        'मन्त्री': 'Minister',
                        'प्रधानमन्त्री': 'Prime Minister',
                        'बजेट': 'Budget',
                        'भ्रष्टाचार': 'Corruption',
                        'अर्थतन्त्र': 'Economy',
                        'चुनाव': 'Election',
                        'संसद': 'Parliament'
                    }

                    # Look for key terms in titles
                    found_terms = []
                    for title in article_titles[:5]:  # Check first 5 titles
                        title_lower = title.lower()
                        for nepali_term, english_term in key_terms.items():
                            if nepali_term in title_lower:
                                found_terms.append(english_term)
                                break
                        # Also check English terms directly
                        for term in ['election', 'budget', 'minister', 'government', 'parliament']:
                            if term in title_lower:
                                found_terms.append(term.title())
                                break

                    if found_terms:
                        # Use most common meaningful term
                        from collections import Counter
                        most_common = Counter(found_terms).most_common(1)
                        return most_common[0][0]

                    # Fallback: use first article's key words
                    first_title = article_titles[0]
                    words = first_title.split()[:3]  # First 3 words
                    # Filter out very short or common words
                    meaningful_words = [w for w in words if len(w) > 2 and w not in ['को', 'ले', 'मा', 'नै', 'लाई']]
                    if meaningful_words:
                        return ' '.join(meaningful_words[:2])

                    return 'News Topic'

                topic_name = generate_topic_name(cluster_articles, cluster_terms)

                # Calculate comprehensive trending score
                article_count = len(cluster_articles)
                source_count = cluster_articles['source_site'].nunique()

                # Time-based metrics
                try:
                    # Handle published_date parsing with fallback
                    date_series = pd.to_datetime(cluster_articles['published_date'], errors='coerce')
                    if date_series.notna().sum() > 1:
                        time_span = date_series.max() - date_series.min()
                        hours_active = max(time_span.total_seconds() / 3600, 0.5)
                    else:
                        hours_active = 24  # Default to 24 hours if dates are invalid
                    velocity = article_count / hours_active
                except:
                    velocity = 0.1  # Safe fallback

                # Social engagement metrics
                total_engagement = cluster_articles['engagement_score'].sum()
                total_shares = cluster_articles['shares_count'].sum()
                total_likes = cluster_articles['likes_count'].sum()

                # Quality metrics
                avg_quality = cluster_articles['quality_score'].mean()
                avg_word_count = cluster_articles['word_count'].mean()

                # Temporal importance (recent articles weighted higher)
                temporal_score = cluster_articles['temporal_weight'].mean()

                # Sentiment diversity (controversial topics trend more)
                sentiment_variance = cluster_articles['sentiment_score'].var()
                sentiment_diversity = min(sentiment_variance * 10, 5)  # Cap at 5

                # Advanced trending score calculation (2025 algorithm)
                trending_score = (
                    article_count * 2.5 +           # Volume factor
                    source_count * 4.0 +            # Source diversity (critical)
                    velocity * 3.0 +                # Publication velocity
                    temporal_score * 15.0 +         # Recency boost
                    (total_engagement / 100) +      # Social engagement
                    (total_shares / 50) +           # Sharing activity
                    sentiment_diversity +           # Controversy factor
                    min(avg_quality * 2, 10) +      # Quality bonus
                    min(np.log1p(avg_word_count), 5) # Article depth
                )

                # Topic classification using key terms
                def classify_topic(terms):
                    political_terms = ['ओली', 'देउवा', 'प्रचण्ड', 'दाहाल', 'कांग्रेस', 'एमाले', 'माओवादी', 'सरकार',
                                     'oli', 'deuba', 'prachanda', 'congress', 'uml', 'maoist', 'government']
                    economic_terms = ['बजेट', 'अर्थतन्त्र', 'बैंक', 'व्यापार', 'budget', 'economy', 'bank', 'trade']
                    social_terms = ['शिक्षा', 'स्वास्थ्य', 'कृषि', 'education', 'health', 'agriculture', 'social']

                    terms_lower = [t.lower() for t in terms]

                    if any(term in terms_lower for term in political_terms):
                        return '🏛️'
                    elif any(term in terms_lower for term in economic_terms):
                        return '💰'
                    elif any(term in terms_lower for term in social_terms):
                        return '👥'
                    else:
                        return '📰'

                emoji = classify_topic(cluster_terms)

                # Get first published date for timeline compatibility
                first_published = pd.to_datetime(cluster_articles['published_date']).min()

                topic_data = {
                    'title': f"{emoji} {topic_name}",  # Dashboard compatibility
                    'topic_name': f"{emoji} {topic_name}",
                    'article_count': article_count,
                    'source_count': source_count,
                    'velocity': round(velocity, 2),
                    'trending_score': round(trending_score, 2),
                    'total_engagement': int(total_engagement),
                    'temporal_score': round(temporal_score, 3),
                    'hours_active': round(hours_active, 1),
                    'quality_score': round(avg_quality, 2),
                    'sentiment_diversity': round(sentiment_diversity, 2),
                    'first_published': first_published.strftime('%Y-%m-%d %H:%M:%S') if pd.notna(first_published) else None,
                    'articles': cluster_articles[['title', 'source_site', 'url', 'published_date']].to_dict('records')  # Return ALL articles, not just 5
                }

                trending_topics.append(topic_data)

            # Sort by trending score and return top results
            trending_topics.sort(key=lambda x: x['trending_score'], reverse=True)

            # Log clustering quality metrics
            n_clusters = len(set(cluster_labels)) - (1 if -1 in cluster_labels else 0)
            n_noise = list(cluster_labels).count(-1)
            self.logger.info(f"Advanced trending detection: {len(trending_topics)} topics found using DBSCAN clustering")
            self.logger.info(f"Clustering stats: {n_clusters} clusters, {n_noise} noise points, eps={eps:.3f}, min_samples={min_samples}")
            return trending_topics[:15]  # Return top 15 for better coverage

        except Exception as e:
            self.logger.error(f"Error in advanced trending detection: {e}")
            # Fallback to simple method
            return self._simple_trending_fallback(hours_back)

    def _simple_trending_fallback(self, hours_back: int) -> List[Dict]:
        """Fallback simple trending detection if advanced method fails"""
        try:
            conn = sqlite3.connect(self.db_path)
            cutoff_time = datetime.now() - timedelta(hours=hours_back)

            query = """
                SELECT title, COUNT(*) as count,
                       COUNT(DISTINCT source_site) as sources,
                       MAX(published_date) as latest
                FROM articles_enhanced
                WHERE COALESCE(published_date, scraped_date) >= ? AND title IS NOT NULL
                GROUP BY title
                HAVING count >= 2
                ORDER BY sources DESC, count DESC
                LIMIT 10
            """

            df = pd.read_sql_query(query, conn, params=(cutoff_time.isoformat(),))
            conn.close()

            simple_trends = []
            for _, row in df.iterrows():
                # Clean and improve topic name generation
                title = row['title']

                # Remove problematic characters and clean up text
                import re
                title = re.sub(r'[|]+', ' ', title)  # Remove multiple pipes
                title = re.sub(r'\s+', ' ', title)   # Normalize whitespace
                title = title.strip()

                # Extract meaningful part of the title
                words = title.split()[:4]  # First 4 words
                clean_title = ' '.join(words)

                # Truncate if still too long
                if len(clean_title) > 45:
                    clean_title = clean_title[:42] + '...'

                simple_trends.append({
                    'topic_name': f"📰 {clean_title}",
                    'title': f"📰 {clean_title}",  # Dashboard compatibility
                    'article_count': row['count'],
                    'source_count': row['sources'],
                    'trending_score': row['sources'] * 2 + row['count'],
                    'first_published': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),  # Add missing field
                    'articles': []
                })

            return simple_trends

        except Exception as e:
            self.logger.error(f"Even simple trending fallback failed: {e}")
            return []

    def generate_realtime_insights(self) -> List[Dict]:
        """Generate actionable real-time insights"""
        insights = []

        try:
            # Get trending stories
            trending = self.detect_trending_stories()

            # Get influence metrics
            influence_df = self.calculate_source_influence_metrics()

            # Generate insights based on patterns

            # 1. Breaking news insight
            if trending:
                top_story = trending[0]
                if top_story['velocity'] > 2:  # More than 2 articles per hour
                    insights.append({
                        'type': 'breaking_news',
                        'title': 'Breaking Story Detected',
                        'description': f"'{top_story['title'][:50]}...' is rapidly developing with {top_story['article_count']} articles from {top_story['source_count']} sources",
                        'confidence': 0.9,
                        'action': 'Monitor for additional developments',
                        'related_story': top_story['story_id']
                    })

            # 2. Source performance insight
            if not influence_df.empty:
                top_source = influence_df.iloc[0]
                if top_source['stories_broken_first'] > 0:
                    insights.append({
                        'type': 'source_performance',
                        'title': 'Leading News Source',
                        'description': f"{top_source['source_site']} broke {top_source['stories_broken_first']} stories first in the last 24 hours",
                        'confidence': 0.8,
                        'action': 'Monitor this source for early story detection',
                        'related_source': top_source['source_site']
                    })

            # 3. Cross-source story insight
            story_clusters = self.detect_story_clusters(hours_back=12)
            if story_clusters:
                largest_cluster = max(story_clusters.values(), key=len)
                if len(largest_cluster) >= 3:
                    sources = set(article['source'] for article in largest_cluster)
                    insights.append({
                        'type': 'cross_source_story',
                        'title': 'Multi-Source Story Coverage',
                        'description': f"Major story covered by {len(sources)} sources: {largest_cluster[0]['title'][:50]}...",
                        'confidence': 0.85,
                        'action': 'Analyze coverage differences across sources',
                        'related_sources': list(sources)
                    })

            # 4. Social engagement insight
            high_engagement_stories = [s for s in trending if s['total_engagement'] > 500]
            if high_engagement_stories:
                story = high_engagement_stories[0]
                insights.append({
                    'type': 'social_engagement',
                    'title': 'High Social Engagement',
                    'description': f"Story '{story['title'][:50]}...' generating significant social media discussion",
                    'confidence': 0.75,
                    'action': 'Monitor social media sentiment and reach',
                    'related_story': story['story_id']
                })

            self.logger.info(f"Generated {len(insights)} real-time insights")
            return insights

        except Exception as e:
            self.logger.error(f"Error generating insights: {e}")
            return []

    def get_dashboard_summary(self, hours_back: int = 24) -> Dict:
        """Get comprehensive dashboard summary for real-time display"""
        try:
            summary = {
                'last_updated': datetime.now().isoformat(),
                'trending_stories': self.detect_trending_stories(hours_back=min(hours_back, 24)),
                'source_influence': self.calculate_source_influence_metrics(hours_back=hours_back).head(8).to_dict('records'),
                'realtime_insights': self.generate_realtime_insights(),
                'story_clusters': len(self.detect_story_clusters(hours_back=min(hours_back, 48))),
                'total_active_stories': self._count_active_stories(hours_back),
                'total_articles_24h': self._count_recent_articles(hours_back),
                'social_engagement_24h': self._calculate_total_engagement(24)
            }

            return summary

        except Exception as e:
            self.logger.error(f"Error generating dashboard summary: {e}")
            return {}

    def _count_active_stories(self, hours_back: int = 48) -> int:
        """Count currently active stories"""
        try:
            conn = sqlite3.connect(self.db_path)

            # Stories active in specified hours
            cutoff_time = datetime.now() - timedelta(hours=hours_back)

            query = """
                SELECT COUNT(DISTINCT story_id) as active_stories
                FROM articles_enhanced
                WHERE COALESCE(published_date, scraped_date) >= ? AND story_id IS NOT NULL
            """

            result = conn.execute(query, (cutoff_time.isoformat(),)).fetchone()
            conn.close()

            return result[0] if result else 0

        except Exception:
            return 0

    def _count_recent_articles(self, hours: int) -> int:
        """Count articles in the last N hours"""
        try:
            conn = sqlite3.connect(self.db_path)

            cutoff_time = datetime.now() - timedelta(hours=hours)

            query = """
                SELECT COUNT(*) as recent_articles
                FROM articles_enhanced
                WHERE COALESCE(published_date, scraped_date) >= ?
            """

            result = conn.execute(query, (cutoff_time.isoformat(),)).fetchone()
            conn.close()

            return result[0] if result else 0

        except Exception:
            return 0

    def _calculate_total_engagement(self, hours: int) -> int:
        """Calculate total social engagement in last N hours"""
        try:
            conn = sqlite3.connect(self.db_path)

            cutoff_time = datetime.now() - timedelta(hours=hours)

            query = """
                SELECT COALESCE(SUM(engagement_score), 0) as total_engagement
                FROM social_metrics
                WHERE published_at >= ?
            """

            result = conn.execute(query, (cutoff_time.isoformat(),)).fetchone()
            conn.close()

            return int(result[0]) if result else 0

        except Exception:
            return 0

def main():
    """Test the analytics engine"""
    engine = NewsIntelligenceEngine()

    print("🧠 Testing News Intelligence Analytics Engine")
    print("="*60)

    # Test trending stories
    trending = engine.detect_trending_stories()
    print(f"\n📈 Trending Stories: {len(trending)} detected")
    for story in trending[:3]:
        print(f"   - {story['title'][:50]}... ({story['source_count']} sources)")

    # Test influence metrics
    influence = engine.calculate_source_influence_metrics()
    print(f"\n🏆 Source Influence Rankings:")
    for _, source in influence.head(5).iterrows():
        print(f"   {source['influence_rank']}. {source['source_site']} (Score: {source['influence_score']})")

    # Test real-time insights
    insights = engine.generate_realtime_insights()
    print(f"\n💡 Real-time Insights: {len(insights)} generated")
    for insight in insights:
        print(f"   - {insight['title']}: {insight['description'][:50]}...")

if __name__ == "__main__":
    main()