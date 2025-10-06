#!/usr/bin/env python3
"""
Test validation issue with Nepali characters
"""

def test_nepali_validation():
    """Test why Nepali titles are being rejected"""
    print("🧪 Testing Nepali Title Validation Issue...")

    test_titles = [
        'नेपालमा नयाँ सरकार गठन',
        'प्रधानमन्त्रीले भने कि...',
        'काठमाडौंमा बैठक सम्पन्न',
        'अर्थतन्त्रमा सुधार आवश्यक',
        'Sign in',
        'JavaScript is not available'
    ]

    for title in test_titles:
        print(f"\n📝 Testing: '{title}'")

        # Test individual components of validation
        print(f"   Length >= 10: {len(title.strip()) >= 10}")

        words = title.split()
        print(f"   Words: {words}")

        meaningful_words = []
        for word in words:
            is_alpha = word.isalpha()
            is_long_enough = len(word) >= 3
            print(f"      '{word}' - len: {len(word)}, isalpha: {is_alpha}, long enough: {is_long_enough}")
            if len(word) >= 3 and word.isalpha():
                meaningful_words.append(word)

        print(f"   Meaningful words: {meaningful_words} (count: {len(meaningful_words)})")
        print(f"   Has >= 2 meaningful: {len(meaningful_words) >= 2}")

        # Test alphanumeric ratio
        alphanumeric_chars = sum(1 for c in title if c.isalnum())
        total_chars = len(title)
        ratio = alphanumeric_chars / total_chars if total_chars > 0 else 0
        print(f"   Alphanumeric ratio: {alphanumeric_chars}/{total_chars} = {ratio:.2f}")
        print(f"   Ratio >= 0.6: {ratio >= 0.6}")

        # Overall validation
        is_valid = (
            len(title.strip()) >= 10 and
            len(meaningful_words) >= 2 and
            ratio >= 0.6
        )
        print(f"   ✅ OVERALL VALID: {is_valid}")

def test_devanagari_properties():
    """Test Devanagari character properties"""
    print("\n🔤 Testing Devanagari Character Properties...")

    devanagari_chars = ['न', 'े', 'प', 'ा', 'ल', 'म', 'ा']
    for char in devanagari_chars:
        print(f"'{char}': isalpha={char.isalpha()}, isalnum={char.isalnum()}, unicode={ord(char)}")

    # Test complete words
    words = ['नेपाल', 'सरकार', 'गठन', 'प्रधानमन्त्री']
    for word in words:
        print(f"'{word}': isalpha={word.isalpha()}, isalnum={word.isalnum()}, len={len(word)}")

if __name__ == "__main__":
    test_nepali_validation()
    test_devanagari_properties()