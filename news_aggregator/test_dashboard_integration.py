#!/usr/bin/env python3
"""
Test dashboard integration to verify enhanced word cloud works
"""

def test_enhanced_modules_import():
    """Test if the enhanced modules can be imported correctly"""
    print("🧪 Testing Enhanced Modules Import...")

    try:
        from nepali_text_processor import NepaliTextProcessor
        print("✅ NepaliTextProcessor imported successfully")

        processor = NepaliTextProcessor()
        sample_text = "नेपाल सरकारले प्रधानमन्त्री राजनीति समाचार"
        words = processor.extract_devanagari_words(sample_text)
        print(f"✅ Text processing works: {words}")

    except ImportError as e:
        print(f"❌ NepaliTextProcessor import failed: {e}")
        return False

    try:
        from improved_wordcloud_generator import ImprovedWordCloudGenerator
        print("✅ ImprovedWordCloudGenerator imported successfully")

        generator = ImprovedWordCloudGenerator()
        print("✅ Generator instance created")

    except ImportError as e:
        print(f"❌ ImprovedWordCloudGenerator import failed: {e}")
        return False

    return True

def test_dashboard_syntax():
    """Test if the dashboard file has valid syntax"""
    print("\n🧪 Testing Dashboard Syntax...")

    try:
        import ast
        with open('nepal_dashboard.py', 'r', encoding='utf-8') as f:
            dashboard_code = f.read()

        # Parse the syntax
        ast.parse(dashboard_code)
        print("✅ Dashboard syntax is valid")

        # Check for key imports
        if 'from nepali_text_processor import' in dashboard_code:
            print("✅ Enhanced import found in dashboard")
        else:
            print("⚠️ Enhanced import not found in dashboard")

        if 'ENHANCED_WORDCLOUD_AVAILABLE' in dashboard_code:
            print("✅ Enhanced word cloud flag found")
        else:
            print("⚠️ Enhanced word cloud flag not found")

        return True

    except SyntaxError as e:
        print(f"❌ Dashboard syntax error: {e}")
        return False
    except Exception as e:
        print(f"❌ Dashboard test error: {e}")
        return False

def test_word_cloud_generation():
    """Test the actual word cloud generation"""
    print("\n🧪 Testing Word Cloud Generation...")

    try:
        from improved_wordcloud_generator import ImprovedWordCloudGenerator
        import sqlite3

        # Get sample data from database
        conn = sqlite3.connect('nepal_news_intelligence.db')
        cursor = conn.cursor()
        cursor.execute("SELECT title FROM articles_enhanced WHERE title IS NOT NULL LIMIT 5")
        sample_titles = [row[0] for row in cursor.fetchall()]
        conn.close()

        if not sample_titles:
            print("⚠️ No sample titles found in database")
            return False

        sample_text = ' '.join(sample_titles)
        print(f"📝 Sample text: {sample_text[:100]}...")

        # Generate word cloud
        generator = ImprovedWordCloudGenerator()
        wordcloud = generator.generate_from_text(sample_text)

        if wordcloud:
            print("✅ Word cloud generated successfully")

            # Check top words
            top_words = list(wordcloud.words_.keys())[:5]
            print(f"🎯 Top words: {top_words}")

            # Verify meaningful words (not just characters)
            meaningful_count = sum(1 for word in top_words if len(word) >= 3)
            if meaningful_count >= 3:
                print(f"✅ Found {meaningful_count} meaningful words")
                return True
            else:
                print(f"⚠️ Only {meaningful_count} meaningful words found")
                return False
        else:
            print("❌ Word cloud generation failed")
            return False

    except Exception as e:
        print(f"❌ Word cloud test error: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Run all integration tests"""
    print("🚀 Dashboard Integration Test Suite")
    print("=" * 50)

    tests = [
        ("Enhanced Modules Import", test_enhanced_modules_import),
        ("Dashboard Syntax", test_dashboard_syntax),
        ("Word Cloud Generation", test_word_cloud_generation)
    ]

    results = []
    for test_name, test_func in tests:
        print(f"\n▶️ Running: {test_name}")
        try:
            result = test_func()
            results.append((test_name, result))
            if result:
                print(f"✅ {test_name}: PASSED")
            else:
                print(f"❌ {test_name}: FAILED")
        except Exception as e:
            print(f"❌ {test_name}: ERROR - {e}")
            results.append((test_name, False))

    # Summary
    print("\n" + "=" * 50)
    print("📊 TEST SUMMARY")
    passed = sum(1 for _, result in results if result)
    total = len(results)

    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"   {status}: {test_name}")

    print(f"\n🎯 Results: {passed}/{total} tests passed")

    if passed == total:
        print("🎉 All tests passed! Enhanced word cloud is ready for use.")
        print("\n📋 NEXT STEPS:")
        print("1. Run: streamlit run nepal_dashboard.py --server.port=8505")
        print("2. Enable '✨ Use Enhanced Word Cloud' in the sidebar")
        print("3. Check '📊 Show Original vs Enhanced Comparison' to see the difference")
    else:
        print("⚠️ Some tests failed. Check the errors above.")

    return passed == total

if __name__ == "__main__":
    main()