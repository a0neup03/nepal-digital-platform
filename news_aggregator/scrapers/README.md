# Nepal News Scrapers - Download Components

## 🔄 **Separation Architecture**

This directory contains **data collection/download components** separated from the web dashboard components for better organization and maintainability.

### 📁 **Directory Structure**
```
scrapers/                    # Download/Collection Components
├── automated_social_collector.py    # Main orchestration system
├── facebook_news_collector.py       # Facebook data collection
├── realtime_news_collector.py       # RSS & real-time monitoring
├── comprehensive_collector.py       # Multi-source systematic collection
└── nepal_news_intelligence_config.py # Configuration

../                          # Web/Dashboard Components
├── nepal_dashboard.py              # Main Streamlit dashboard
├── realtime_analytics_engine.py    # Analytics processing
├── improved_bias_analyzer.py       # BERT-based analysis
├── nepal_news_intelligence.db      # Main database (1,648 articles)
└── ... (other web components)
```

## 🚀 **Production-Ready Scrapers**

### 1. **automated_social_collector.py**
- **Main orchestration system** with scheduling
- Daily collection: 6 AM and 6 PM
- Weekly analysis: Sunday 2 AM
- Social media integration
- Trend analysis and cleanup

### 2. **facebook_news_collector.py**
- Advanced Facebook scraping with content linking
- Mobile Facebook access for better reach
- Post extraction and similarity scoring
- Links Facebook posts to news articles
- Engagement metrics calculation

### 3. **realtime_news_collector.py**
- Continuous RSS feed monitoring
- Multi-threaded collection capability
- Story ID generation and deduplication
- Quality scoring and categorization
- Real-time article processing

### 4. **comprehensive_collector.py**
- Systematic collection from all major Nepal news sources
- Target: 1500+ articles across sources
- Multiple collection strategies (RSS, pagination, direct access)
- Performance tracking and success rates

## ⚙️ **Configuration**

The `nepal_news_intelligence_config.py` contains:
- Major Nepal news sources (Kantipur, BBC Nepali, Setopati, Ratopati, etc.)
- Category definitions (Politics, Economics, Sports, etc.)
- Rate limiting and ethical scraping parameters
- Database schema definitions

## 🛠️ **Usage Examples**

### Daily News Collection
```python
cd scrapers/
python automated_social_collector.py
```

### Facebook Integration
```python
cd scrapers/
python facebook_news_collector.py
```

### Real-time Monitoring
```python
cd scrapers/
python realtime_news_collector.py
```

### Comprehensive Collection
```python
cd scrapers/
python comprehensive_collector.py
```

## 🔒 **Ethical Considerations**
- Random delays between requests (2-8 seconds)
- Respectful scraping practices
- User-Agent rotation
- SSL verification handling
- Rate limiting compliance

## 📊 **Database Integration**
All scrapers write to: `../nepal_news_intelligence.db`
- **Articles**: 1,648 enhanced articles
- **Social Data**: 168 Facebook metrics + 568 social metrics
- **Intelligence**: Real-time insights, trending analysis
- **Total Data Points**: 2,384+

## 🔗 **Web Dashboard Integration**
The web dashboard (`../nepal_dashboard.py`) reads from the database populated by these scrapers, maintaining clear separation between data collection and presentation layers.