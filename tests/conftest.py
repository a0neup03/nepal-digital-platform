"""
pytest configuration and shared fixtures for Nepal Digital Intelligence Platform testing.

This module provides:
- Test database fixtures for isolated testing
- Sample article data for realistic testing
- Mock services for external dependencies
- Common testing utilities and helpers
"""

import pytest
import sqlite3
import tempfile
import os
import json
from datetime import datetime, timedelta
from typing import List, Dict, Any
import sys

# Add the news_aggregator directory to Python path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'news_aggregator'))

try:
    from realtime_analytics_engine import NewsIntelligenceEngine
    from enhanced_clustering_preprocessor import EnhancedNewsClusteringPreprocessor
except ImportError as e:
    pytest.skip(f"Could not import news_aggregator modules: {e}", allow_module_level=True)


@pytest.fixture(scope="session")
def test_database():
    """
    Create isolated test database for all tests.

    This fixture:
    - Creates a temporary SQLite database
    - Initializes the schema using NewsIntelligenceEngine
    - Provides the database path to tests
    - Cleans up the database after tests complete

    Returns:
        str: Path to the test database file
    """
    # Create temporary database file
    with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as tmp:
        db_path = tmp.name

    try:
        # Initialize with test schema
        engine = NewsIntelligenceEngine(db_path)
        # The engine initialization should create necessary tables

        yield db_path

    finally:
        # Cleanup
        if os.path.exists(db_path):
            os.unlink(db_path)


@pytest.fixture
def sample_articles() -> List[Dict[str, Any]]:
    """
    Provide realistic Nepal news articles for testing.

    Returns:
        List[Dict]: List of article dictionaries with realistic Nepal news content
    """
    return [
        {
            'title': 'प्रधानमन्त्री ओली र भारतीय राजदूतबीच भेटवार्ता',
            'content': 'प्रधानमन्त्री केपी शर्मा ओली र भारतीय राजदूत नवीन श्रीवास्तवबीच आज भेटवार्ता भएको छ। भेटमा दुई देशबीचको व्यापारिक सम्बन्धका विषयमा छलफल भएको प्रधानमन्त्रीको सचिवालयले जनाएको छ।',
            'source_site': 'ekantipur.com',
            'published_date': (datetime.now() - timedelta(hours=2)).strftime('%Y-%m-%d %H:%M:%S'),
            'scraped_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'url': 'https://ekantipur.com/news/2025/09/28/pm-meeting',
            'category': 'राजनीति'
        },
        {
            'title': 'नेपाली राष्ट्रिय फुटबल टिमको तयारी सुरु',
            'content': 'आगामी साफ च्याम्पियनसिपका लागि नेपाली राष्ट्रिय फुटबल टिमको तयारी सुरु भएको छ। प्रशिक्षक अब्दुल्लाह अल्मुताइरीले खेलाडीहरूको छनोटका लागि राष्ट्रिय टिमको बोलाएका छन्।',
            'source_site': 'setopati.com',
            'published_date': (datetime.now() - timedelta(hours=4)).strftime('%Y-%m-%d %H:%M:%S'),
            'scraped_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'url': 'https://setopati.com/sports/football/nepal-team-preparation',
            'category': 'खेल'
        },
        {
            'title': 'नेपाल राष्ट्र बैंकले नयाँ मौद्रिक नीति ल्याउने',
            'content': 'नेपाल राष्ट्र बैंकले आगामी आर्थिक वर्षका लागि नयाँ मौद्रिक नीति ल्याउने भएको छ। यस नीतिमा मुद्रास्फीति नियन्त्रण र ब्याजदर स्थिरीकरणमा जोड दिइने बैंकले जनाएको छ।',
            'source_site': 'nagariknews.nagariknetwork.com',
            'published_date': (datetime.now() - timedelta(hours=6)).strftime('%Y-%m-%d %H:%M:%S'),
            'scraped_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'url': 'https://nagariknews.nagariknetwork.com/economy/monetary-policy',
            'category': 'अर्थतन्त्र'
        },
        {
            'title': 'काठमाडौंमा वायु प्रदूषण बढ्दो',
            'content': 'काठमाडौं उपत्यकामा वायु प्रदूषणको मात्रा दिनदिनै बढ्दै गएको छ। वातावरण विभागका अनुसार प्रदूषणको मात्रा विश्व स्वास्थ्य संगठनले तोकेको मापदण्डभन्दा तीन गुणा बढी छ।',
            'source_site': 'ekantipur.com',
            'published_date': (datetime.now() - timedelta(hours=8)).strftime('%Y-%m-%d %H:%M:%S'),
            'scraped_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'url': 'https://ekantipur.com/environment/air-pollution-kathmandu',
            'category': 'वातावरण'
        },
        {
            'title': 'दशैं तिहारमा विद्युत आपूर्ति व्यवस्थित रहने',
            'content': 'आगामी दशैं तिहारको समयमा विद्युत आपूर्ति व्यवस्थित रहने नेपाल विद्युत प्राधिकरणले जनाएको छ। त्यहि समयमा मर्मतसम्भारका कामहरू स्थगित गरिने प्राधिकरणले भनेको छ।',
            'source_site': 'setopati.com',
            'published_date': (datetime.now() - timedelta(hours=12)).strftime('%Y-%m-%d %H:%M:%S'),
            'scraped_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'url': 'https://setopati.com/social/electricity-supply-festival',
            'category': 'समाज'
        }
    ]


@pytest.fixture
def contaminated_articles() -> List[Dict[str, Any]]:
    """
    Provide articles with contamination patterns for testing filtering.

    Returns:
        List[Dict]: Articles containing common contamination patterns
    """
    return [
        {
            'title': 'Sign in',
            'content': 'Please sign in to continue reading...',
            'source_site': 'example.com',
            'published_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'scraped_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        },
        {
            'title': 'JavaScript is not available',
            'content': 'This page requires JavaScript to be enabled...',
            'source_site': 'example.com',
            'published_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'scraped_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        },
        {
            'title': 'Page not found',
            'content': '404 - The requested page could not be found...',
            'source_site': 'example.com',
            'published_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'scraped_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
    ]


@pytest.fixture
def enhanced_preprocessor():
    """
    Provide an instance of the enhanced clustering preprocessor.

    Returns:
        EnhancedNewsClusteringPreprocessor: Configured preprocessor instance
    """
    return EnhancedNewsClusteringPreprocessor()


@pytest.fixture
def analytics_engine(test_database):
    """
    Provide a NewsIntelligenceEngine instance with test database.

    Args:
        test_database: Test database fixture

    Returns:
        NewsIntelligenceEngine: Configured engine with test database
    """
    return NewsIntelligenceEngine(test_database)


class MockHTTPResponse:
    """Mock HTTP response for testing external service calls."""

    def __init__(self, status_code: int, content: str):
        self.status_code = status_code
        self.text = content
        self.content = content.encode('utf-8')

    def json(self):
        """Mock JSON response."""
        return json.loads(self.content)


@pytest.fixture
def mock_news_sources():
    """
    Provide mock responses for news source testing.

    Returns:
        Dict: Mock responses for different news sources
    """
    return {
        'ekantipur.com': MockHTTPResponse(200, '''
            <html>
                <title>मुख्य समाचार - एकान्तकार</title>
                <div class="news-content">
                    <h1>प्रधानमन्त्री ओलीको महत्वपूर्ण घोषणा</h1>
                    <p>सरकारले नयाँ नीति ल्याउने घोषणा गरेको छ...</p>
                </div>
            </html>
        '''),
        'setopati.com': MockHTTPResponse(200, '''
            <html>
                <title>सेतोपाटी</title>
                <div class="article">
                    <h2>ताजा खबर</h2>
                    <p>काठमाडौंमा आज भएको घटनाक्रम...</p>
                </div>
            </html>
        '''),
        'nagariknews.nagariknetwork.com': MockHTTPResponse(200, '''
            <html>
                <title>नागरिक न्यूज</title>
                <article>
                    <h1>राष्ट्रिय समाचार</h1>
                    <p>नेपालमा भएका ताजा घटनाहरू...</p>
                </article>
            </html>
        ''')
    }


def pytest_configure(config):
    """Configure pytest with custom markers."""
    config.addinivalue_line(
        "markers", "performance: mark test as performance benchmark"
    )
    config.addinivalue_line(
        "markers", "integration: mark test as integration test"
    )
    config.addinivalue_line(
        "markers", "slow: mark test as slow running"
    )


def pytest_collection_modifyitems(config, items):
    """Modify test collection to add markers based on test location."""
    for item in items:
        # Add performance marker to performance tests
        if "performance" in str(item.fspath):
            item.add_marker(pytest.mark.performance)

        # Add integration marker to integration tests
        if "integration" in str(item.fspath):
            item.add_marker(pytest.mark.integration)