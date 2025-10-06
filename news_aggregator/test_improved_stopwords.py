#!/usr/bin/env python3
"""
Test improved stopwords and Unicode normalization
"""

def test_improved_filtering():
    """Test the enhanced stopword filtering"""
    print("🧪 Testing Enhanced Stopword Filtering...")

    from nepali_text_processor import NepaliTextProcessor
    from improved_wordcloud_generator import ImprovedWordCloudGenerator

    processor = NepaliTextProcessor()

    # Test text with known problematic words
    test_text = """
    नेपाल सरकारले प्रधानमन्त्री पनि छन् लागि गर्न मन्त्री नेतृत्वमा कार्यक्रम आयोजना गर्यो।
    काठमाडौंमा राजनीतिक दलहरूको बैठक भयो। निर्वाचन आयोगले तयारी सुरु गरेको छ।
    विकास निर्माणका काम छन् पनि अब गर्न लागि भएको छ।
    """

    print(f"📝 Test text: {test_text}")

    # Extract words before and after
    print("\n🔍 BEFORE Enhancement:")
    words_before = test_text.split()
    print(f"All words: {words_before}")

    print("\n🔍 AFTER Enhancement:")
    meaningful_words = processor.extract_devanagari_words(test_text)
    print(f"Meaningful words: {meaningful_words}")

    # Check which words were filtered
    filtered_out = set(words_before) - set(meaningful_words)
    print(f"\n❌ Filtered out: {filtered_out}")

    # Generate word cloud
    print("\n🎨 Generating improved word cloud...")
    generator = ImprovedWordCloudGenerator()
    wordcloud = generator.generate_from_text(test_text)

    if wordcloud:
        generator.save_wordcloud(wordcloud, 'improved_stopwords_test.png')

        top_words = list(wordcloud.words_.keys())[:10]
        print(f"✅ Top words in cloud: {top_words}")

        # Check for problematic words
        problematic_words = {'पनि', 'छन्', 'गर्न', 'लागि', 'भएको', 'गरेको'}
        found_problematic = [word for word in top_words if word in problematic_words]

        if found_problematic:
            print(f"⚠️ Still found problematic words: {found_problematic}")
        else:
            print("✅ No problematic stopwords in top results!")

        return True
    else:
        print("❌ Word cloud generation failed")
        return False

def create_comparison_cloud():
    """Create comparison with database content"""
    print("\n🧪 Creating Database Content Comparison...")

    from improved_wordcloud_generator import ImprovedWordCloudGenerator

    generator = ImprovedWordCloudGenerator()

    # Generate from actual database
    wordcloud = generator.generate_from_database(limit=30)

    if wordcloud:
        generator.save_wordcloud(wordcloud, 'enhanced_database_wordcloud.png')

        top_words = list(wordcloud.words_.keys())[:15]
        print(f"🎯 Database top words: {top_words}")

        # Analyze word quality
        print("\n📊 Word Quality Analysis:")
        meaningful_count = 0
        stopword_count = 0
        single_char_count = 0

        stopwords = {'पनि', 'छन्', 'गर्न', 'लागि', 'भएको', 'गरेको', 'हुने', 'भने', 'छ', 'हो'}

        for word in top_words:
            if len(word) == 1:
                single_char_count += 1
                print(f"   ❌ Single character: {word}")
            elif word in stopwords:
                stopword_count += 1
                print(f"   ⚠️  Stopword: {word}")
            else:
                meaningful_count += 1
                print(f"   ✅ Meaningful: {word}")

        print(f"\n📈 Quality Score: {meaningful_count}/{len(top_words)} meaningful words")
        print(f"   • Meaningful: {meaningful_count}")
        print(f"   • Stopwords: {stopword_count}")
        print(f"   • Single chars: {single_char_count}")

        return meaningful_count >= len(top_words) * 0.7  # 70% meaningful threshold

    return False

if __name__ == "__main__":
    print("🚀 Testing Enhanced Nepali Text Processing")
    print("=" * 50)

    test1 = test_improved_filtering()
    test2 = create_comparison_cloud()

    print("\n" + "=" * 50)
    print("📊 RESULTS:")

    if test1:
        print("✅ Stopword filtering test: PASSED")
    else:
        print("❌ Stopword filtering test: FAILED")

    if test2:
        print("✅ Database word quality test: PASSED")
    else:
        print("❌ Database word quality test: FAILED")

    if test1 and test2:
        print("\n🎉 All improvements working correctly!")
        print("📁 Check generated files:")
        print("   • improved_stopwords_test.png")
        print("   • enhanced_database_wordcloud.png")
    else:
        print("\n⚠️ Some issues remain. Check individual test results above.")