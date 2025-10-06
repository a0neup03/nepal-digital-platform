#!/usr/bin/env python3
"""
Debug script to replicate the exact dashboard word cloud generation logic
"""

import sqlite3
import pandas as pd
import re
import os
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import streamlit as st

def debug_wordcloud_generation():
    print("🔍 Debugging Dashboard Word Cloud Generation...")

    # Replicate the exact logic from nepal_dashboard.py
    db_path = "nepal_news_intelligence.db"

    try:
        # Connect to database
        conn = sqlite3.connect(db_path)

        # Get recent articles - replicate the dashboard query
        query = """
        SELECT title, content, published_date
        FROM articles_enhanced
        WHERE title IS NOT NULL
        AND published_date >= date('now', '-7 days')
        ORDER BY published_date DESC
        LIMIT 50
        """

        df = pd.read_sql_query(query, conn)
        print(f"Found {len(df)} recent articles")

        if df.empty:
            print("No recent articles, trying all articles...")
            query = """
            SELECT title, content
            FROM articles_enhanced
            WHERE title IS NOT NULL
            LIMIT 100
            """
            df = pd.read_sql_query(query, conn)
            print(f"Found {len(df)} total articles")

        conn.close()

        if df.empty:
            print("❌ No articles found in database")
            return

        # Combine title and content for word cloud - exact dashboard logic
        text_data = []
        for _, row in df.iterrows():
            title = row.get('title', '') or ''
            content = row.get('content', '') or ''
            combined = f"{title} {content}"
            text_data.append(combined)

        # Clean and process text
        all_text = ' '.join(text_data)
        print(f"Total text length: {len(all_text)}")
        print(f"Sample text: {all_text[:200]}...")

        # Check for Nepali content
        nepali_chars = [c for c in all_text if ord(c) >= 0x0900 and ord(c) <= 0x097F]
        print(f"Nepali characters: {len(nepali_chars)} ({len(set(nepali_chars))} unique)")

        # Basic text cleaning - similar to dashboard
        # Remove extra whitespace and special chars but keep Nepali
        cleaned_text = re.sub(r'\s+', ' ', all_text)
        cleaned_text = re.sub(r'[^\w\s\u0900-\u097F]', ' ', cleaned_text)
        cleaned_text = cleaned_text.strip()

        print(f"Cleaned text length: {len(cleaned_text)}")
        print(f"Cleaned sample: {cleaned_text[:200]}...")

        # Test different text scenarios
        scenarios = [
            ("Full Database Text", cleaned_text),
            ("Nepali Only", ' '.join([c for c in cleaned_text if ord(c) >= 0x0900 and ord(c) <= 0x097F or c.isspace()])),
            ("Mixed Fallback", "नेपाल सरकार राजनीति समाचार प्रधानमन्त्री मन्त्री कांग्रेस एमाले माओवादी निर्वाचन विकास अर्थतन्त्र Nepal Government Politics News Congress Election Development")
        ]

        # Font path resolution - exact dashboard logic
        font_path = None
        font_candidates = [
            'fonts/NotoSansDevanagari/hinted/ttf/NotoSansDevanagari-Regular.ttf',
            'fonts/NotoSansDevanagari/unhinted/ttf/NotoSansDevanagari-Regular.ttf',
            'fonts/NotoSansDevanagari/full/ttf/NotoSansDevanagari-Regular.ttf'
        ]

        for font in font_candidates:
            if os.path.exists(font):
                font_path = font
                print(f"✅ Using font: {font}")
                break

        if not font_path:
            print("⚠️ No font found, using default")

        # Test each scenario
        for scenario_name, test_text in scenarios:
            print(f"\n🧪 Testing scenario: {scenario_name}")
            print(f"Text length: {len(test_text)}")

            if len(test_text.strip()) < 10:
                print("❌ Text too short, skipping")
                continue

            try:
                # Exact WordCloud parameters from dashboard
                wordcloud = WordCloud(
                    width=1000,
                    height=500,
                    background_color='white',
                    colormap='Set2',
                    max_words=25,
                    font_path=font_path if font_path else None,
                    prefer_horizontal=0.8,
                    relative_scaling=0.6,
                    min_font_size=14,
                    max_font_size=70,
                    random_state=42,
                    collocations=False,
                    normalize_plurals=False
                ).generate(test_text)

                print("✅ WordCloud generation successful!")

                # Save test image
                fig, ax = plt.subplots(figsize=(10, 5))
                ax.imshow(wordcloud, interpolation='bilinear')
                ax.axis('off')
                ax.set_title(f'Debug: {scenario_name}', fontsize=16, pad=20)

                filename = f"debug_wordcloud_{scenario_name.lower().replace(' ', '_')}.png"
                plt.savefig(filename, dpi=150, bbox_inches='tight')
                print(f"✅ Saved as {filename}")
                plt.close()

                # Show top words
                word_freq = wordcloud.words_
                top_words = list(word_freq.keys())[:10]
                print(f"Top words: {top_words}")

            except Exception as e:
                print(f"❌ WordCloud failed for {scenario_name}: {e}")
                import traceback
                traceback.print_exc()

        print("\n🔚 Debug completed!")

    except Exception as e:
        print(f"❌ Database error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    debug_wordcloud_generation()