#!/usr/bin/env python3
"""
Enhanced News Clustering Preprocessor
=====================================

Fixes core algorithmic issues in news story clustering:
1. Improved text preprocessing for mixed Nepali-English content
2. Enhanced distance matrix calculation with semantic similarity
3. News-specific feature weighting and temporal considerations

Author: Claude Code (2025)
Based on: Clustering analysis and best practices research
"""

import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
from datetime import datetime, timedelta
import re
import unicodedata
import logging

logger = logging.getLogger(__name__)

class EnhancedNewsClusteringPreprocessor:
    """
    Advanced preprocessor for news clustering with proper distance matrix calculation.

    Key improvements:
    - Enhanced Nepali-English text processing
    - Semantic-aware distance matrix calculation
    - News-specific feature weighting
    - Temporal decay integration
    """

    def __init__(self):
        self.nepali_stopwords = {
            'पनि', 'छन्', 'गर्न', 'लागि', 'भएको', 'गरेको', 'हुने', 'भने', 'गर्ने',
            'त्यो', 'यो', 'उनले', 'उनका', 'उनको', 'अनुसार', 'सम्म', 'बारे',
            'बारेमा', 'सँग', 'सँगै', 'पछि', 'अगाडि', 'माथि', 'तल', 'भित्र',
            'बाहिर', 'वरिपरि', 'नजिक', 'टाढा', 'बीच', 'बीचमा', 'साथ', 'साथै',
            'समेत', 'मात्र', 'केवल', 'सुरु', 'अन्त', 'शुरु', 'समाप्त', 'प्रारम्भ',
            'यसैगरी', 'यसरी', 'त्यसैगरी', 'त्यसरी', 'जसरी', 'जसैगरी'
        }

        self.english_stopwords = {
            'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
            'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have',
            'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
            'may', 'might', 'must', 'shall', 'can', 'this', 'that', 'these', 'those'
        }

        # News-specific patterns to boost importance
        self.news_importance_patterns = {
            'political': ['सरकार', 'प्रधानमन्त्री', 'मन्त्री', 'राजनीति', 'नेता', 'पार्टी', 'कांग्रेस', 'एमाले', 'माओवादी'],
            'economic': ['अर्थतन्त्र', 'बजेट', 'बैंक', 'रुपैयाँ', 'व्यापार', 'उद्योग', 'कारोबार'],
            'social': ['समाज', 'शिक्षा', 'स्वास्थ्य', 'कृषि', 'खेल', 'संस्कृति'],
            'international': ['भारत', 'चीन', 'अमेरिका', 'युरोप', 'एसिया', 'अन्तर्राष्ट्रिय']
        }

    def enhanced_text_preprocessing(self, text: str, title: str = "", source: str = "") -> str:
        """
        Enhanced text preprocessing for mixed Nepali-English content.

        Args:
            text: Article content
            title: Article title (gets higher weight)
            source: Source site (for source-specific processing)

        Returns:
            Processed text ready for vectorization
        """
        if not text or pd.isna(text):
            return ""

        # Combine title (3x weight) + content
        combined = f"{title} {title} {title} {text}" if title else text

        # Unicode normalization for consistent Nepali processing
        combined = unicodedata.normalize('NFC', combined)

        # Enhanced token extraction - handles mixed Nepali-English
        # Matches: Nepali words, English words, numbers, important punctuation
        token_pattern = r'[\u0900-\u097F]+|[a-zA-Z]{2,}|\d+'
        tokens = re.findall(token_pattern, combined, re.UNICODE)

        # Clean and filter tokens
        cleaned_tokens = []
        for token in tokens:
            token = token.strip().lower()

            # Skip if too short or is stopword
            if len(token) < 2:
                continue
            if token in self.nepali_stopwords or token in self.english_stopwords:
                continue

            # Apply news-specific importance boosting
            importance_multiplier = 1
            for category, patterns in self.news_importance_patterns.items():
                if any(pattern in token for pattern in patterns):
                    importance_multiplier = 2  # Reduced from 3 to prevent over-similarity
                    break

            # Add token multiple times based on importance
            cleaned_tokens.extend([token] * importance_multiplier)

        # Remove duplicates while preserving frequency
        # (TF-IDF will handle the frequency)
        processed_text = ' '.join(cleaned_tokens)

        # Minimum length filter (more lenient than before)
        return processed_text if len(processed_text) > 5 else ""

    def create_enhanced_distance_matrix(self, tfidf_matrix, temporal_weights=None,
                                       source_diversity=None) -> np.ndarray:
        """
        Create enhanced distance matrix with multiple similarity measures.

        Args:
            tfidf_matrix: TF-IDF sparse matrix
            temporal_weights: Array of temporal weights for each article
            source_diversity: Array indicating source diversity scores

        Returns:
            Enhanced distance matrix for DBSCAN clustering
        """
        # 1. Base cosine similarity
        cosine_sim = cosine_similarity(tfidf_matrix)

        # 2. Convert to distance with proper scaling
        # Use arccos for angular distance (more meaningful than 1-similarity)
        # Clip to avoid numerical issues
        cosine_sim_clipped = np.clip(cosine_sim, -1, 1)
        angular_distance = np.arccos(np.abs(cosine_sim_clipped)) / np.pi

        # 3. Apply temporal weighting if provided
        if temporal_weights is not None:
            temporal_weights = np.array(temporal_weights)
            # Create temporal similarity matrix
            temporal_diff = np.abs(temporal_weights[:, np.newaxis] - temporal_weights)
            temporal_similarity = np.exp(-temporal_diff * 2)  # Exponential decay

            # Combine with angular distance (lower weight for temporal)
            angular_distance = 0.7 * angular_distance + 0.3 * (1 - temporal_similarity)

        # 4. Apply source diversity penalty if provided
        if source_diversity is not None:
            source_diversity = np.array(source_diversity)
            # Penalize articles from same source slightly
            source_diff = (source_diversity[:, np.newaxis] == source_diversity).astype(float)
            same_source_penalty = source_diff * 0.1  # Small penalty for same source
            angular_distance = angular_distance + same_source_penalty

        # 5. Normalize distance matrix to [0, 1] range
        scaler = StandardScaler()
        distance_matrix_flat = angular_distance.flatten().reshape(-1, 1)
        distance_matrix_normalized = scaler.fit_transform(distance_matrix_flat).reshape(angular_distance.shape)

        # Ensure diagonal is 0 (distance from article to itself)
        np.fill_diagonal(distance_matrix_normalized, 0)

        # Ensure non-negative and symmetric
        distance_matrix_final = np.clip(distance_matrix_normalized, 0, None)
        distance_matrix_final = (distance_matrix_final + distance_matrix_final.T) / 2

        logger.info(f"Enhanced distance matrix created: "
                   f"range [{distance_matrix_final.min():.3f}, {distance_matrix_final.max():.3f}], "
                   f"mean {distance_matrix_final.mean():.3f}")

        return distance_matrix_final

    def create_enhanced_tfidf_features(self, processed_texts: list) -> tuple:
        """
        Create enhanced TF-IDF features optimized for news clustering.

        Args:
            processed_texts: List of preprocessed text strings

        Returns:
            Tuple of (tfidf_matrix, feature_names, vectorizer)
        """
        # Dynamic parameters based on corpus size to fix TF-IDF errors
        doc_count = len(processed_texts)

        if doc_count < 5:
            # Very small corpus - use minimal filtering
            min_df = 1
            max_df = 1.0
            max_features = min(1000, doc_count * 100)
            ngram_range = (1, 1)  # Only unigrams for small corpus
        elif doc_count < 20:
            # Small corpus - light filtering
            min_df = 1
            max_df = 0.95
            max_features = min(2000, doc_count * 150)
            ngram_range = (1, 2)  # Unigrams and bigrams
        else:
            # Larger corpus - normal filtering
            min_df = 2
            max_df = 0.9
            max_features = 8000
            ngram_range = (1, 3)  # Include trigrams

        # Enhanced vectorizer with dynamic parameters
        vectorizer = TfidfVectorizer(
            max_features=max_features,
            ngram_range=ngram_range,
            min_df=min_df,
            max_df=max_df,
            token_pattern=r'[\u0900-\u097F]+|[a-zA-Z]{2,}|\d+',  # Enhanced pattern
            stop_words=None,  # Handled manually for Nepali
            lowercase=True,
            sublinear_tf=True,  # Use log scaling for TF
            norm='l2',  # L2 normalization
            use_idf=True,
            smooth_idf=True  # Add smoothing to IDF
        )

        try:
            tfidf_matrix = vectorizer.fit_transform(processed_texts)
            feature_names = vectorizer.get_feature_names_out()

            logger.info(f"TF-IDF matrix created: {tfidf_matrix.shape}, "
                       f"density: {tfidf_matrix.nnz / (tfidf_matrix.shape[0] * tfidf_matrix.shape[1]):.4f}")

            return tfidf_matrix, feature_names, vectorizer

        except Exception as e:
            logger.error(f"TF-IDF creation failed: {e}")
            raise

    def calculate_temporal_weights(self, published_dates: list, current_time: datetime = None) -> np.ndarray:
        """
        Calculate temporal weights for articles with improved decay function.

        Args:
            published_dates: List of published datetime objects
            current_time: Reference time (defaults to now)

        Returns:
            Array of temporal weights
        """
        if current_time is None:
            current_time = datetime.now()

        weights = []
        for pub_date in published_dates:
            try:
                if pd.isna(pub_date):
                    weights.append(0.1)
                    continue

                pub_time = pd.to_datetime(pub_date)
                time_diff_hours = (current_time - pub_time).total_seconds() / 3600

                # Improved temporal decay: faster initial decay, slower long-term
                # Recent articles (< 2 hours): weight 0.9-1.0
                # Older articles (> 24 hours): weight 0.1-0.3
                if time_diff_hours <= 2:
                    weight = 1.0 - 0.05 * time_diff_hours  # Slight decay in first 2 hours
                elif time_diff_hours <= 12:
                    weight = 0.9 * np.exp(-0.1 * (time_diff_hours - 2))  # Exponential decay
                else:
                    weight = 0.3 * np.exp(-0.05 * (time_diff_hours - 12))  # Slower decay

                weights.append(max(weight, 0.05))  # Minimum weight

            except Exception:
                weights.append(0.1)  # Default weight for invalid dates

        return np.array(weights)

if __name__ == "__main__":
    # Test the enhanced preprocessor
    preprocessor = EnhancedNewsClusteringPreprocessor()

    # Test text processing
    sample_text = "नेपाली कांग्रेसका सभापति शेरबहादुर देउवा र प्रधानमन्त्री केपी शर्मा ओलीबीच भेटवार्ता भएको छ। The meeting was held in Kathmandu yesterday."
    processed = preprocessor.enhanced_text_preprocessing(sample_text, title="Political Meeting")
    print(f"Processed text: {processed}")

    # Test temporal weights
    dates = [datetime.now() - timedelta(hours=1), datetime.now() - timedelta(hours=6), datetime.now() - timedelta(hours=24)]
    weights = preprocessor.calculate_temporal_weights(dates)
    print(f"Temporal weights: {weights}")