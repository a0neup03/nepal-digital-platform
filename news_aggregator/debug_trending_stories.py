#!/usr/bin/env python3
"""
Debug trending stories to identify contamination source
"""

def debug_trending_stories():
    """Debug the trending stories detection"""
    print("🔍 Debugging Trending Stories Detection...")

    from realtime_analytics_engine import NewsIntelligenceEngine

    analytics_engine = NewsIntelligenceEngine('nepal_news_intelligence.db')

    # Get trending stories with debugging
    print("\n📊 Getting trending stories...")
    trending_stories = analytics_engine.detect_trending_stories(hours_back=24)

    print(f"📈 Found {len(trending_stories)} trending stories")

    # Check for contaminated titles
    contaminated_patterns = {
        'sign in', 'javascript is not available', 'javascript is not available.',
        'page not found', '404 error', 'access denied', 'login required'
    }

    print("\n🔍 Analyzing each trending story:")

    for i, story in enumerate(trending_stories[:20], 1):  # Check first 20
        title = story.get('title', '')
        title_lower = title.lower().strip()

        is_contaminated = title_lower in contaminated_patterns
        status = "❌ CONTAMINATED" if is_contaminated else "✅ Clean"

        print(f"{i:2d}. {status}: '{title}'")

        if is_contaminated:
            print(f"    📍 Pattern matched: '{title_lower}'")
            # Check articles that contributed to this
            articles = story.get('articles', [])
            print(f"    📚 Based on {len(articles)} articles")
            for j, article in enumerate(articles[:3], 1):  # Show first 3 articles
                article_title = article.get('title', 'N/A')
                article_source = article.get('source', 'N/A')
                print(f"        {j}. '{article_title}' from {article_source}")

    # Check if validation is being called
    print("\n🧪 Testing title validation function...")
    test_titles = [
        'Sign in',
        'JavaScript is not available',
        'नेपालमा नयाँ सरकार गठन',
        'प्रधानमन्त्रीले भने...'
    ]

    for title in test_titles:
        is_valid = analytics_engine.is_valid_news_title(title)
        status = "✅ Valid" if is_valid else "❌ Invalid"
        print(f"   {status}: '{title}'")

if __name__ == "__main__":
    debug_trending_stories()