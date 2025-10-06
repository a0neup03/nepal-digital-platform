# Testing Framework Design Specification

## Project Context
**Component**: Nepal Digital Intelligence Platform - Testing Infrastructure
**Specification ID**: 002-testing-framework
**Design Phase**: Implementation Architecture
**Based on**: requirements.md (comprehensive test coverage and infrastructure)

## 1. HOW It Will Be Built

### Architecture Overview

```
tests/
├── conftest.py                 # pytest configuration and shared fixtures
├── unit/                       # Component-level testing
│   ├── test_analytics_engine.py        # Core ML/clustering algorithms
│   ├── test_nepali_processor.py        # Devanagari text processing
│   ├── test_dashboard_components.py    # Streamlit UI components
│   ├── test_database_operations.py     # SQLite CRUD and queries
│   └── test_wordcloud_generator.py     # Visualization components
├── integration/                # Cross-component testing
│   ├── test_end_to_end_workflows.py    # Complete user journeys
│   ├── test_data_pipeline.py           # Collection → Processing → Display
│   └── test_component_interactions.py  # Dashboard ↔ Analytics integration
├── performance/                # Load and speed testing
│   ├── test_clustering_performance.py  # Algorithm speed benchmarks
│   ├── test_database_performance.py    # Query optimization validation
│   └── test_dashboard_load.py          # UI responsiveness under load
├── fixtures/                   # Test data and utilities
│   ├── sample_articles.json            # Realistic Nepal news data
│   ├── test_database.db                # Clean test database
│   ├── mock_responses.py               # External service mocks
│   └── test_helpers.py                 # Common testing utilities
└── reports/                    # Coverage and performance reports
    ├── coverage.html                   # Visual coverage reports
    └── performance_benchmarks.json     # Historical performance data
```

### Core Testing Strategy

#### 1. **Pytest-Centric Framework**
```python
# conftest.py - Global test configuration
import pytest
import sqlite3
import tempfile
from news_aggregator.realtime_analytics_engine import NewsIntelligenceEngine
from news_aggregator.enhanced_clustering_preprocessor import EnhancedNewsClusteringPreprocessor

@pytest.fixture(scope="session")
def test_database():
    """Create isolated test database for all tests."""
    with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as tmp:
        db_path = tmp.name

    # Initialize with test schema
    engine = NewsIntelligenceEngine(db_path)
    engine.initialize_database()

    yield db_path

    # Cleanup
    os.unlink(db_path)

@pytest.fixture
def sample_articles():
    """Provide realistic Nepal news articles for testing."""
    return [
        {
            'title': 'प्रधानमन्त्री ओली र भारतीय राजदूतबीच भेटवार्ता',
            'content': 'नेपाली कांग्रेसका सभापति शेरबहादुर देउवा...',
            'source_site': 'ekantipur.com',
            'published_date': '2025-09-28 10:00:00',
            'scraped_date': '2025-09-28 10:05:00'
        },
        # More realistic test data...
    ]
```

#### 2. **Modular Test Architecture**
```python
# unit/test_analytics_engine.py - Core algorithm testing
class TestNewsIntelligenceEngine:

    def test_enhanced_clustering_with_real_data(self, test_database, sample_articles):
        """Test enhanced clustering algorithm with realistic Nepal news data."""
        engine = NewsIntelligenceEngine(test_database)

        # Insert test articles
        for article in sample_articles:
            engine.store_article(article)

        # Test clustering
        trending_stories = engine.detect_trending_stories_enhanced(24)

        # Assertions based on our algorithm discoveries
        assert len(trending_stories) >= 0  # Should not crash
        assert all('title' in story for story in trending_stories)
        assert all('article_count' in story for story in trending_stories)

        # Performance assertion
        start_time = time.time()
        engine.detect_trending_stories_enhanced(24)
        duration = time.time() - start_time
        assert duration < 5.0  # Should complete in < 5 seconds

    def test_distance_matrix_calculation_accuracy(self, test_database):
        """Verify angular distance calculation correctness."""
        preprocessor = EnhancedNewsClusteringPreprocessor()

        # Create test TF-IDF matrix
        test_texts = ["नेपाल सरकार", "भारत राजनीति", "चीन अर्थतन्त्र"]
        tfidf_matrix, _, _ = preprocessor.create_enhanced_tfidf_features(test_texts)

        # Test distance matrix
        distance_matrix = preprocessor.create_enhanced_distance_matrix(tfidf_matrix)

        # Verify angular distance properties
        assert distance_matrix.shape == (3, 3)
        assert np.allclose(np.diag(distance_matrix), 0)  # Self-distance is 0
        assert np.all(distance_matrix >= 0)  # Non-negative distances
        assert np.allclose(distance_matrix, distance_matrix.T)  # Symmetric
```

#### 3. **Performance Testing Integration**
```python
# performance/test_clustering_performance.py
import time
import memory_profiler
import pytest

class TestClusteringPerformance:

    @pytest.mark.performance
    def test_clustering_speed_benchmark(self, test_database):
        """Establish baseline clustering performance."""
        engine = NewsIntelligenceEngine(test_database)

        # Test with different data sizes
        for article_count in [10, 50, 100, 250]:
            articles = generate_test_articles(article_count)
            for article in articles:
                engine.store_article(article)

            start_time = time.time()
            trending_stories = engine.detect_trending_stories_enhanced(24)
            duration = time.time() - start_time

            # Performance assertions based on our discoveries
            assert duration < (article_count * 0.02)  # Scale linearly

            # Log for benchmarking
            print(f"Articles: {article_count}, Duration: {duration:.3f}s")

    @pytest.mark.performance
    @memory_profiler.profile
    def test_memory_usage_within_limits(self, test_database):
        """Ensure memory usage stays within 500MB limit."""
        engine = NewsIntelligenceEngine(test_database)

        # Load realistic dataset
        articles = generate_test_articles(1000)  # Large dataset
        for article in articles:
            engine.store_article(article)

        # Monitor memory during clustering
        initial_memory = memory_profiler.memory_usage()[0]
        trending_stories = engine.detect_trending_stories_enhanced(24)
        peak_memory = max(memory_profiler.memory_usage())

        memory_increase = peak_memory - initial_memory
        assert memory_increase < 500  # < 500MB increase
```

#### 4. **Integration Testing Strategy**
```python
# integration/test_end_to_end_workflows.py
class TestCompleteUserWorkflows:

    def test_complete_news_processing_pipeline(self, test_database):
        """Test complete flow: Collection → Processing → Dashboard Display."""
        # Simulate news collection
        collector_data = simulate_news_collection()

        # Process through analytics engine
        engine = NewsIntelligenceEngine(test_database)
        for article in collector_data:
            engine.store_article(article)

        # Generate dashboard data
        trending_stories = engine.detect_trending_stories_enhanced(24)
        word_cloud_data = engine.generate_word_cloud_data()
        timeline_data = engine.get_timeline_data()

        # Verify complete pipeline
        assert len(trending_stories) >= 0
        assert word_cloud_data is not None
        assert timeline_data is not None

        # Verify data consistency
        total_articles = engine.get_article_count(24)
        assert total_articles == len(collector_data)

    def test_timeline_button_integration(self, test_database):
        """Test timeline button functionality bug resolution."""
        engine = NewsIntelligenceEngine(test_database)

        # Test different time periods
        time_periods = {'1H': 1, '6H': 6, '1D': 24, '1W': 168}

        for period_name, hours in time_periods.items():
            stories = engine.detect_trending_stories_enhanced(hours)

            # Verify stories are filtered by time period
            if stories:
                for story in stories:
                    story_time = story.get('first_published')
                    if story_time:
                        # Verify story is within time window
                        time_diff = (datetime.now() - story_time).total_seconds() / 3600
                        assert time_diff <= hours
```

### Testing Tools & Dependencies

#### Core Testing Stack
```python
# requirements-test.txt
pytest==8.0.0                  # Core testing framework
pytest-cov==4.0.0             # Coverage reporting
pytest-mock==3.12.0           # Mocking utilities
pytest-benchmark==4.0.0       # Performance benchmarking
memory-profiler==0.61.0       # Memory usage monitoring
locust==2.17.0                # Load testing (optional)
factory-boy==3.3.0            # Test data generation
```

#### Mock and Fixture Strategy
```python
# fixtures/mock_responses.py
class MockNewsSource:
    """Mock external news sources for testing."""

    def __init__(self):
        self.responses = {
            'ekantipur.com': {
                'status_code': 200,
                'content': '<html>मुख्य समाचार...</html>'
            },
            'setopati.com': {
                'status_code': 200,
                'content': '<html>ताजा खबर...</html>'
            }
        }

    def get(self, url):
        """Mock HTTP GET request."""
        for domain, response in self.responses.items():
            if domain in url:
                return MockResponse(response['status_code'], response['content'])
        return MockResponse(404, '')

# fixtures/test_helpers.py
def generate_realistic_nepal_articles(count: int) -> List[Dict]:
    """Generate realistic Nepal news articles for testing."""
    topics = [
        ('राजनीति', ['सरकार', 'प्रधानमन्त्री', 'मन्त्री', 'पार्टी']),
        ('खेल', ['फुटबल', 'क्रिकेट', 'साफ']),
        ('अर्थतन्त्र', ['बैंक', 'बजेट', 'व्यापार'])
    ]

    articles = []
    for i in range(count):
        topic, keywords = random.choice(topics)
        title = f"{random.choice(keywords)} सम्बन्धी समाचार {i+1}"
        content = f"यो {topic} सम्बन्धी विस्तृत समाचार हो..."

        articles.append({
            'title': title,
            'content': content,
            'source_site': random.choice(['ekantipur.com', 'setopati.com']),
            'published_date': datetime.now() - timedelta(hours=random.randint(1, 24)),
            'scraped_date': datetime.now()
        })

    return articles
```

### Continuous Integration Setup

#### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Nepal Platform Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set up Python 3.8
      uses: actions/setup-python@v3
      with:
        python-version: 3.8

    - name: Install dependencies
      run: |
        pip install -r requirements.txt
        pip install -r requirements-test.txt

    - name: Run unit tests with coverage
      run: |
        pytest tests/unit/ --cov=news_aggregator --cov-report=html

    - name: Run integration tests
      run: |
        pytest tests/integration/

    - name: Run performance tests
      run: |
        pytest tests/performance/ -m performance

    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
```

### Quality Gates

#### Coverage Requirements
- **Critical Components**: 95% coverage (analytics_engine, database_operations)
- **UI Components**: 85% coverage (dashboard_components)
- **Utilities**: 90% coverage (nepali_processor, wordcloud_generator)

#### Performance Benchmarks
- **Clustering**: < 5 seconds for 250 articles
- **Database Queries**: < 1 second for complex COALESCE patterns
- **Dashboard Load**: < 3 seconds for complete page render
- **Memory Usage**: < 500MB peak during normal operation

#### Test Quality Standards
- All tests must have descriptive names explaining what they verify
- Each test should verify one specific behavior
- Tests must be isolated and not depend on external services
- Performance tests must include baseline measurements

---

## Implementation Strategy

### Phase 1: Foundation (Week 1)
1. Set up pytest configuration and directory structure
2. Create core fixtures and mock utilities
3. Implement critical unit tests for analytics engine
4. Establish coverage reporting

### Phase 2: Comprehensive Coverage (Week 2)
1. Complete unit test suite for all components
2. Implement integration tests for user workflows
3. Add performance benchmarking tests
4. Set up continuous integration

### Phase 3: Quality Assurance (Week 3)
1. Review and optimize test coverage
2. Performance baseline establishment
3. Documentation and testing guidelines
4. Training for development team

This design provides a robust foundation for maintaining code quality and catching regressions while supporting the sophisticated Nepal news intelligence platform.

**Next**: tasks.md for detailed implementation timeline and execution steps.