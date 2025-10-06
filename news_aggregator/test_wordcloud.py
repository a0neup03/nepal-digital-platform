#!/usr/bin/env python3
"""
Test script to diagnose word cloud issues with Nepali fonts
"""

import os
import sys
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import sqlite3

def test_wordcloud():
    print("🔍 Testing Word Cloud Generation...")

    # Test font path resolution
    font_candidates = [
        'fonts/NotoSansDevanagari/hinted/ttf/NotoSansDevanagari-Regular.ttf',
        'fonts/NotoSansDevanagari/unhinted/ttf/NotoSansDevanagari-Regular.ttf',
        'fonts/NotoSansDevanagari/full/ttf/NotoSansDevanagari-Regular.ttf'
    ]

    font_path = None
    for font in font_candidates:
        print(f"Checking font: {font}")
        if os.path.exists(font):
            font_path = font
            print(f"✅ Found font: {font}")
            break
        else:
            print(f"❌ Not found: {font}")

    if font_path:
        print(f"Using font: {font_path}")
    else:
        print("⚠️ No font found, using default")

    # Test Nepali text
    nepali_text = "नेपाल सरकार राजनीति समाचार प्रधानमन्त्री मन्त्री कांग्रेस एमाले माओवादी निर्वाचन विकास अर्थतन्त्र"
    mixed_text = nepali_text + " Nepal Government Politics News Congress Election Development"

    print(f"\nTest text: {mixed_text[:50]}...")

    # Try to create word cloud
    try:
        wordcloud = WordCloud(
            width=800,
            height=400,
            background_color='white',
            colormap='Set2',
            max_words=20,
            font_path=font_path if font_path else None,
            prefer_horizontal=0.8,
            min_font_size=12,
            collocations=False
        ).generate(mixed_text)

        print("✅ WordCloud generation successful!")

        # Try to save it
        fig, ax = plt.subplots(figsize=(10, 5))
        ax.imshow(wordcloud, interpolation='bilinear')
        ax.axis('off')
        ax.set_title('Test Nepali Word Cloud', fontsize=16)

        plt.savefig('test_wordcloud.png', dpi=150, bbox_inches='tight')
        print("✅ WordCloud saved as test_wordcloud.png")
        plt.close()

    except Exception as e:
        print(f"❌ WordCloud generation failed: {e}")
        import traceback
        traceback.print_exc()

    # Test database content
    print("\n🗄️ Testing database content...")
    try:
        conn = sqlite3.connect('nepal_news_intelligence.db')
        cursor = conn.cursor()

        # Check what content we have
        cursor.execute("SELECT title, content FROM articles_enhanced LIMIT 5")
        rows = cursor.fetchall()

        print(f"Found {len(rows)} sample articles:")
        for i, (title, content) in enumerate(rows[:3]):
            print(f"{i+1}. Title: {title[:50] if title else 'No title'}...")
            print(f"   Content: {content[:100] if content else 'No content'}...")

        conn.close()
        print("✅ Database accessible")

    except Exception as e:
        print(f"❌ Database error: {e}")

    print("\n🔚 Test completed!")

if __name__ == "__main__":
    test_wordcloud()