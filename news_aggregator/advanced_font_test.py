#!/usr/bin/env python3
"""
Advanced font and text shaping test for Devanagari script
Testing solutions for proper conjunct consonant rendering
"""

def test_devanagari_rendering():
    """Test different approaches to Devanagari rendering"""
    print("🧪 Testing Devanagari Script Rendering Solutions...")

    # Test text with common conjuncts and issues
    test_texts = [
        "प्रधानमन्त्री",  # pra-dhaan-mantri (half-ra issue)
        "सरकार",         # sarkar (simple)
        "न्यायपालिका",    # nyaya-paalika (nya conjunct)
        "पुरहरी",        # pur-hari
        "कार्यक्रम",      # karya-kram (conjuncts)
        "अर्थतन्त्र",     # artha-tantra
        "शिक्षा",        # siksha
        "स्वास्थ्य",      # swaasthya (swa conjunct)
    ]

    print("📝 Test words:")
    for i, word in enumerate(test_texts, 1):
        print(f"  {i}. {word}")

    # Test different font configurations
    print("\n🔧 Testing Font Configurations...")

    try:
        from wordcloud import WordCloud
        import matplotlib.pyplot as plt
        import os

        # Find available fonts
        font_paths = [
            'fonts/NotoSansDevanagari/hinted/ttf/NotoSansDevanagari-Regular.ttf',
            'fonts/NotoSansDevanagari/unhinted/ttf/NotoSansDevanagari-Regular.ttf',
            'fonts/NotoSansDevanagari/full/ttf/NotoSansDevanagari-Regular.ttf'
        ]

        working_font = None
        for font_path in font_paths:
            if os.path.exists(font_path):
                working_font = os.path.abspath(font_path)
                print(f"✅ Found font: {working_font}")
                break

        if not working_font:
            print("❌ No Devanagari font found")
            return False

        # Test 1: Basic WordCloud
        test_text = " ".join(test_texts * 3)  # Repeat for frequency

        print("\n📊 Test 1: Basic WordCloud Generation")
        wordcloud = WordCloud(
            width=800, height=400,
            font_path=working_font,
            background_color='white',
            max_words=20,
            prefer_horizontal=0.9,
            min_font_size=20,
            max_font_size=60
        ).generate(test_text)

        # Save test image
        fig, ax = plt.subplots(figsize=(12, 6))
        ax.imshow(wordcloud, interpolation='bilinear')
        ax.axis('off')
        ax.set_title('Devanagari Script Test - Basic WordCloud', fontsize=14)

        plt.savefig('devanagari_basic_test.png', dpi=200, bbox_inches='tight')
        plt.close()
        print("💾 Saved: devanagari_basic_test.png")

        # Test 2: Unicode Normalization
        print("\n📊 Test 2: Unicode Normalization")
        import unicodedata

        normalized_texts = []
        for text in test_texts:
            # Try different normalization forms
            nfc = unicodedata.normalize('NFC', text)  # Canonical composition
            nfd = unicodedata.normalize('NFD', text)  # Canonical decomposition

            print(f"Original: {text}")
            print(f"  NFC: {nfc} (len: {len(nfc)})")
            print(f"  NFD: {nfd} (len: {len(nfd)})")

            normalized_texts.append(nfc)  # Use NFC (composed form)

        normalized_test_text = " ".join(normalized_texts * 3)

        wordcloud_normalized = WordCloud(
            width=800, height=400,
            font_path=working_font,
            background_color='white',
            max_words=20,
            prefer_horizontal=0.9,
            min_font_size=20,
            max_font_size=60
        ).generate(normalized_test_text)

        fig, ax = plt.subplots(figsize=(12, 6))
        ax.imshow(wordcloud_normalized, interpolation='bilinear')
        ax.axis('off')
        ax.set_title('Devanagari Script Test - Unicode Normalized', fontsize=14)

        plt.savefig('devanagari_normalized_test.png', dpi=200, bbox_inches='tight')
        plt.close()
        print("💾 Saved: devanagari_normalized_test.png")

        # Test 3: Font Feature Analysis
        print("\n📊 Test 3: Font Feature Analysis")

        # Try to get font information
        try:
            from PIL import ImageFont
            font = ImageFont.truetype(working_font, 40)
            print(f"✅ Font loaded successfully with PIL: {font}")

            # Test individual character rendering
            from PIL import Image, ImageDraw
            img = Image.new('RGB', (400, 200), 'white')
            draw = ImageDraw.Draw(img)

            y_pos = 30
            for i, word in enumerate(test_texts[:4]):
                draw.text((20, y_pos), word, font=font, fill='black')
                y_pos += 40

            img.save('devanagari_pil_test.png')
            print("💾 Saved: devanagari_pil_test.png")

        except Exception as e:
            print(f"⚠️ PIL font test failed: {e}")

        print("\n✅ Devanagari rendering tests completed!")
        print("\n📋 Generated test files:")
        print("  • devanagari_basic_test.png")
        print("  • devanagari_normalized_test.png")
        print("  • devanagari_pil_test.png")
        print("\n🔍 Check these images to see rendering quality")

        return True

    except Exception as e:
        print(f"❌ Devanagari rendering test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def suggest_solutions():
    """Suggest solutions for Devanagari rendering issues"""
    print("\n💡 SOLUTIONS FOR DEVANAGARI RENDERING:")
    print("=" * 50)

    print("\n1. 🔧 **Immediate Fixes:**")
    print("   • Enhanced stopwords list (✅ implemented)")
    print("   • Unicode normalization (NFC form)")
    print("   • Better font selection priority")

    print("\n2. 🏗️ **Advanced Solutions (for perfect rendering):**")
    print("   • Install mplcairo: `pip install mplcairo`")
    print("   • Install HarfBuzz: `brew install harfbuzz` (macOS)")
    print("   • Use libraqm for complex text layout")
    print("   • Enable OpenType font features")

    print("\n3. 📚 **Alternative Approaches:**")
    print("   • Use Matplotlib with HarfBuzz backend")
    print("   • Pre-process text to handle conjuncts")
    print("   • Custom text shaping pipeline")
    print("   • SVG-based word cloud generation")

    print("\n4. 🎯 **Quick Win (current project):**")
    print("   • Filter out problematic conjuncts")
    print("   • Use simplified Devanagari forms when possible")
    print("   • Focus on most readable words")

if __name__ == "__main__":
    success = test_devanagari_rendering()
    suggest_solutions()

    if success:
        print("\n🎉 Tests completed successfully!")
        print("Check the generated PNG files to evaluate rendering quality.")
    else:
        print("\n❌ Tests failed. Check error messages above.")