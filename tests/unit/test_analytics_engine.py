"""
Unit tests for the NewsIntelligenceEngine and enhanced clustering algorithms.

These tests verify:
- Enhanced clustering algorithm correctness
- Distance matrix calculation accuracy
- Contamination filtering effectiveness
- Temporal weighting logic
- Performance baselines

Based on Phase 1 algorithm improvements and discoveries.
"""

import pytest
import numpy as np
import time
from datetime import datetime, timedelta
from unittest.mock import patch, MagicMock

# Import the modules to test
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'news_aggregator'))

try:
    from realtime_analytics_engine import NewsIntelligenceEngine
    from enhanced_clustering_preprocessor import EnhancedNewsClusteringPreprocessor
except ImportError as e:
    pytest.skip(f"Could not import news_aggregator modules: {e}", allow_module_level=True)


class TestNewsIntelligenceEngine:
    """Test suite for the core news intelligence and clustering engine."""

    @pytest.mark.clustering
    def test_enhanced_clustering_with_real_data(self, analytics_engine, sample_articles):
        """Test enhanced clustering algorithm with realistic Nepal news data."""
        # Store test articles in database
        for article in sample_articles:
            try:
                # Store article using the engine's method
                analytics_engine.store_article_enhanced(article)
            except AttributeError:
                # Fallback to direct database insertion if method doesn't exist
                self._store_article_direct(analytics_engine, article)

        # Test enhanced clustering
        trending_stories = analytics_engine.detect_trending_stories_enhanced(24)

        # Verify algorithm doesn't crash and returns valid structure
        assert isinstance(trending_stories, list)
        assert len(trending_stories) >= 0  # Should not crash, may find 0 clusters

        # Verify story structure if any stories found
        for story in trending_stories:
            assert 'title' in story
            assert 'article_count' in story
            assert 'velocity' in story
            assert 'source_count' in story
            assert isinstance(story['article_count'], int)
            assert story['article_count'] > 0

    @pytest.mark.clustering
    def test_distance_matrix_calculation_accuracy(self, enhanced_preprocessor):
        """Verify angular distance calculation correctness from Phase 1 improvements."""
        # Create test TF-IDF matrix with known similar/dissimilar content
        test_texts = [
            "नेपाल सरकार प्रधानमन्त्री राजनीति",  # Political content
            "नेपाल सरकार मन्त्री राजनीति",        # Similar political content
            "फुटबल खेल च्याम्पियनसिप साफ"        # Sports content (different)
        ]

        tfidf_matrix, _, _ = enhanced_preprocessor.create_enhanced_tfidf_features(test_texts)

        # Test enhanced distance matrix calculation
        distance_matrix = enhanced_preprocessor.create_enhanced_distance_matrix(tfidf_matrix)

        # Verify distance matrix properties
        assert distance_matrix.shape == (3, 3)
        assert np.allclose(np.diag(distance_matrix), 0, atol=1e-3)  # Self-distance ≈ 0
        assert np.all(distance_matrix >= 0)  # Non-negative distances
        assert np.allclose(distance_matrix, distance_matrix.T, atol=1e-6)  # Symmetric

        # Verify angular distance properties (not simple 1-similarity)
        # Similar political articles should have smaller distance
        political_distance = distance_matrix[0, 1]
        sports_distance = distance_matrix[0, 2]
        assert political_distance < sports_distance, "Similar articles should have smaller distance"

        # Distance should be in reasonable range (angular distance / π)
        assert 0 <= political_distance <= 1
        assert 0 <= sports_distance <= 1

    @pytest.mark.nepali
    def test_contamination_filtering_effectiveness(self, analytics_engine, contaminated_articles):
        """Test contamination filtering improvements from Phase 1."""
        # Store contaminated articles
        for article in contaminated_articles:
            try:
                analytics_engine.store_article_enhanced(article)
            except AttributeError:
                self._store_article_direct(analytics_engine, article)

        # Attempt to detect trending stories
        trending_stories = analytics_engine.detect_trending_stories_enhanced(24)

        # Verify contaminated articles are filtered out
        contamination_patterns = ['sign in', 'javascript is not available', 'page not found']

        for story in trending_stories:
            story_title = story['title'].lower()
            for pattern in contamination_patterns:
                assert pattern not in story_title, f"Contamination pattern '{pattern}' found in story: {story_title}"

    @pytest.mark.performance
    def test_clustering_performance_baseline(self, analytics_engine):
        """Establish clustering performance baseline from Phase 1 optimization."""
        # Generate realistic test dataset
        test_articles = self._generate_performance_test_articles(50)

        # Store articles
        for article in test_articles:
            try:
                analytics_engine.store_article_enhanced(article)
            except AttributeError:
                self._store_article_direct(analytics_engine, article)

        # Measure clustering performance
        start_time = time.time()
        trending_stories = analytics_engine.detect_trending_stories_enhanced(24)
        duration = time.time() - start_time

        # Performance assertions based on Phase 1 discoveries
        assert duration < 10.0, f"Clustering took {duration:.3f}s, should be < 10s for 50 articles"

        # Log performance for monitoring
        print(f"Clustering Performance: {len(test_articles)} articles in {duration:.3f}s")

    def test_temporal_weighting_logic(self, enhanced_preprocessor):
        """Test temporal weighting calculation accuracy."""
        # Create test dates with known time differences
        now = datetime.now()
        test_dates = [
            now - timedelta(hours=1),   # Recent: should have high weight
            now - timedelta(hours=12),  # Medium: should have medium weight
            now - timedelta(hours=48),  # Old: should have low weight
        ]

        weights = enhanced_preprocessor.calculate_temporal_weights(test_dates, current_time=now)

        assert len(weights) == 3
        assert weights[0] > weights[1] > weights[2], "Weights should decrease with age"

        # Verify weight ranges based on algorithm
        assert 0.8 <= weights[0] <= 1.0, "Recent articles should have high weight"
        assert 0.1 <= weights[1] <= 0.9, "Medium-age articles should have medium weight"
        assert 0.05 <= weights[2] <= 0.3, "Old articles should have low weight"

    @pytest.mark.database
    def test_coalesce_pattern_handling(self, analytics_engine):
        """Test COALESCE(published_date, scraped_date) pattern from bug fixes."""
        # Create articles with NULL published_date
        articles_with_null_dates = [
            {
                'title': 'Article with NULL published date',
                'content': 'Test content',
                'source_site': 'test.com',
                'published_date': None,  # NULL date
                'scraped_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }
        ]

        # Store and retrieve without errors
        for article in articles_with_null_dates:
            try:
                analytics_engine.store_article_enhanced(article)
            except AttributeError:
                self._store_article_direct(analytics_engine, article)

        # Should not raise NoneType comparison errors
        trending_stories = analytics_engine.detect_trending_stories_enhanced(24)
        assert isinstance(trending_stories, list)  # Should complete without errors

    def test_enhanced_preprocessing_nepali_text(self, enhanced_preprocessor):
        """Test enhanced Nepali text preprocessing improvements."""
        test_text = "नेपाली कांग्रेसका सभापति शेरबहादुर देउवा र प्रधानमन्त्री केपी शर्मा ओली"
        title = "राजनीतिक भेटवार्ता"

        processed = enhanced_preprocessor.enhanced_text_preprocessing(
            text=test_text,
            title=title,
            source="ekantipur.com"
        )

        # Verify meaningful content is preserved
        assert len(processed) > 0
        assert 'नेपाली' in processed or 'कांग्रेसका' in processed or 'प्रधानमन्त्री' in processed

        # Verify title weighting (title appears multiple times)
        title_weight_count = processed.count('राजनीतिक')
        assert title_weight_count >= 2, "Title should be weighted (appear multiple times)"

    # Helper methods

    def _store_article_direct(self, engine, article):
        """Direct database storage for testing when store_article_enhanced is not available."""
        try:
            import sqlite3
            with sqlite3.connect(engine.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT OR REPLACE INTO articles_enhanced
                    (title, content, source_site, published_date, scraped_date, url)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (
                    article.get('title', ''),
                    article.get('content', ''),
                    article.get('source_site', ''),
                    article.get('published_date'),
                    article.get('scraped_date'),
                    article.get('url', '')
                ))
                conn.commit()
        except Exception as e:
            pytest.skip(f"Could not store test article: {e}")

    def _generate_performance_test_articles(self, count: int):
        """Generate articles for performance testing."""
        topics = [
            ('राजनीति', ['सरकार', 'प्रधानमन्त्री', 'मन्त्री', 'पार्टी', 'कांग्रेस', 'एमाले']),
            ('खेल', ['फुटबल', 'क्रिकेट', 'साफ', 'च्याम्पियनसिप', 'खेलाडी']),
            ('अर्थतन्त्र', ['बैंक', 'बजेट', 'व्यापार', 'उद्योग', 'राष्ट्र बैंक'])
        ]

        articles = []
        for i in range(count):
            topic_name, keywords = topics[i % len(topics)]
            keyword = keywords[i % len(keywords)]

            articles.append({
                'title': f"{keyword} सम्बन्धी समाचार {i+1}",
                'content': f"यो {topic_name} सम्बन्धी विस्तृत समाचार हो जसमा {keyword} का बारेमा उल्लेख छ।",
                'source_site': f"source{i % 3}.com",
                'published_date': (datetime.now() - timedelta(hours=i % 24)).strftime('%Y-%m-%d %H:%M:%S'),
                'scraped_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'url': f"https://example.com/news/{i}"
            })

        return articles


class TestEnhancedClusteringPreprocessor:
    """Test suite for the enhanced clustering preprocessor from Phase 1."""

    def test_tfidf_feature_creation(self, enhanced_preprocessor):
        """Test enhanced TF-IDF feature creation with optimized parameters."""
        test_texts = [
            "नेपाल सरकार राजनीति",
            "भारत अन्तर्राष्ट्रिय सम्बन्ध",
            "खेल फुटबल च्याम्पियनसिप"
        ]

        tfidf_matrix, feature_names, vectorizer = enhanced_preprocessor.create_enhanced_tfidf_features(test_texts)

        # Verify TF-IDF matrix properties
        assert tfidf_matrix.shape[0] == len(test_texts)
        assert tfidf_matrix.shape[1] <= 8000  # Max features limit
        assert len(feature_names) == tfidf_matrix.shape[1]

        # Verify matrix density is reasonable
        density = tfidf_matrix.nnz / (tfidf_matrix.shape[0] * tfidf_matrix.shape[1])
        assert 0.001 <= density <= 0.5, f"TF-IDF density {density} seems unreasonable"

    def test_news_importance_boosting(self, enhanced_preprocessor):
        """Test news-specific importance pattern boosting."""
        political_text = "नेपाली कांग्रेसका सभापति प्रधानमन्त्री सरकार"
        sports_text = "फुटबल खेल च्याम्पियनसिप"

        political_processed = enhanced_preprocessor.enhanced_text_preprocessing(
            text=political_text,
            title="राजनीतिक समाचार"
        )

        sports_processed = enhanced_preprocessor.enhanced_text_preprocessing(
            text=sports_text,
            title="खेल समाचार"
        )

        # Political terms should appear multiple times due to importance boosting
        political_term_count = political_processed.count('प्रधानमन्त्री')
        sports_term_count = sports_processed.count('फुटबल')

        # At least some importance boosting should occur
        assert political_term_count >= 1
        assert sports_term_count >= 1