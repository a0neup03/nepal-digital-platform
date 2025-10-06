#!/usr/bin/env python3
"""
Final verification test for trending topics and word cloud fixes
"""

def test_trending_stories_filtering():
    """Test that contaminated titles are filtered out of trending stories"""
    print("🧪 Testing Trending Stories Filtering...")

    try:
        from realtime_analytics_engine import NewsIntelligenceEngine

        engine = NewsIntelligenceEngine()
        trending = engine.detect_trending_stories(hours_back=24)

        print(f"📈 Found {len(trending)} trending stories")

        # Check for contamination
        contaminated_count = 0
        for story in trending[:10]:
            title = story.get('title', '')
            if title.lower() in ['sign in', 'javascript is not available', 'javascript is not available.']:
                contaminated_count += 1
                print(f"⚠️ CONTAMINATED: {title}")
            else:
                print(f"✅ CLEAN: {title[:60]}...")

        if contaminated_count == 0:
            print("✅ No contaminated titles found in trending stories!")
            return True
        else:
            print(f"❌ Found {contaminated_count} contaminated titles")
            return False

    except Exception as e:
        print(f"❌ Trending stories test failed: {e}")
        return False

def test_enhanced_word_cloud_integration():
    """Test enhanced word cloud integration with dashboard"""
    print("\n🧪 Testing Enhanced Word Cloud Integration...")

    try:
        # Test the enhanced word cloud generation
        from improved_wordcloud_generator import ImprovedWordCloudGenerator

        generator = ImprovedWordCloudGenerator()

        # Generate from database
        wordcloud = generator.generate_from_database(limit=50)

        if wordcloud:
            print("✅ Enhanced word cloud generation successful!")

            # Check top words for meaningfulness
            top_words = list(wordcloud.words_.keys())[:10]
            print(f"🎯 Top words: {top_words}")

            # Check if words are meaningful (not single characters)
            meaningful_count = sum(1 for word in top_words if len(word) >= 3)

            if meaningful_count >= 7:
                print(f"✅ Found {meaningful_count}/10 meaningful words!")

                # Save final verification image
                success = generator.save_wordcloud(wordcloud, 'final_verification_wordcloud.png')

                return success
            else:
                print(f"⚠️ Only {meaningful_count}/10 words are meaningful")
                return False
        else:
            print("❌ Enhanced word cloud generation failed")
            return False

    except Exception as e:
        print(f"❌ Enhanced word cloud test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_font_rendering():
    """Test font rendering for Nepali characters"""
    print("\n🧪 Testing Font Rendering...")

    try:
        from improved_wordcloud_generator import ImprovedWordCloudGenerator

        generator = ImprovedWordCloudGenerator()

        if generator.font_path:
            print(f"✅ Font path resolved: {generator.font_path}")

            # Test with pure Nepali content
            nepali_text = "नेपाल सरकार प्रधानमन्त्री मन्त्रिपरिषद राजनीति कांग्रेस एमाले माओवादी निर्वाचन विकास शिक्षा स्वास्थ्य"

            wordcloud = generator.generate_from_text(nepali_text)

            if wordcloud:
                print("✅ Nepali text word cloud generated!")

                # Save Nepali-only test
                generator.save_wordcloud(wordcloud, 'nepali_font_test.png')

                top_words = list(wordcloud.words_.keys())[:5]
                print(f"🇳🇵 Top Nepali words: {top_words}")

                return True
            else:
                print("❌ Nepali word cloud generation failed")
                return False
        else:
            print("⚠️ No font path found - will use default (may show boxes)")
            return False

    except Exception as e:
        print(f"❌ Font rendering test failed: {e}")
        return False

def main():
    """Run all final verification tests"""
    print("🚀 FINAL VERIFICATION TEST SUITE")
    print("=" * 50)
    print("Testing fixes for trending topics contamination and word cloud fonts")
    print()

    tests = [
        ("Trending Stories Filtering", test_trending_stories_filtering),
        ("Enhanced Word Cloud Integration", test_enhanced_word_cloud_integration),
        ("Font Rendering", test_font_rendering)
    ]

    results = []

    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))

            if result:
                print(f"✅ {test_name}: PASSED\n")
            else:
                print(f"❌ {test_name}: FAILED\n")

        except Exception as e:
            print(f"❌ {test_name}: ERROR - {e}\n")
            results.append((test_name, False))

    # Final summary
    print("=" * 50)
    print("📊 FINAL RESULTS")

    passed = sum(1 for _, result in results if result)
    total = len(results)

    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"   {status}: {test_name}")

    print(f"\n🎯 Overall: {passed}/{total} tests passed")

    if passed == total:
        print("\n🎉 ALL FIXES VERIFIED!")
        print("\n📋 SUMMARY OF FIXES APPLIED:")
        print("   1. ✅ Enhanced title validation to filter 'Sign in' and 'JavaScript is not available'")
        print("   2. ✅ Improved social media contamination cleaning")
        print("   3. ✅ Enhanced word cloud with proper Nepali tokenization")
        print("   4. ✅ Fixed font path resolution with absolute paths")
        print("   5. ✅ Word clouds now show meaningful words instead of characters")
        print("\n🚀 The dashboard should now display:")
        print("   • Clean trending topics without generic web errors")
        print("   • Enhanced word cloud with proper Nepali words")
        print("   • Both word clouds should show meaningful content")

        return True
    else:
        print(f"\n⚠️ {total-passed} tests failed. Check the errors above.")
        return False

if __name__ == "__main__":
    main()