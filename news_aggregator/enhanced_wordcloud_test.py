#!/usr/bin/env python3
"""
Enhanced WordCloud Test with Nepali Text Processor
Test the improved word cloud generation with meaningful Nepali words
"""

import sqlite3
import pandas as pd
import os
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from nepali_text_processor import NepaliTextProcessor

def test_enhanced_wordcloud():
    print("🚀 Testing Enhanced WordCloud with Nepali Text Processor...")

    # Initialize the text processor
    processor = NepaliTextProcessor()

    # Connect to database and get articles
    try:
        conn = sqlite3.connect('nepal_news_intelligence.db')

        # Get recent articles
        query = """
        SELECT title, content, published_date
        FROM articles_enhanced
        WHERE title IS NOT NULL
        ORDER BY published_date DESC
        LIMIT 100
        """

        df = pd.read_sql_query(query, conn)
        conn.close()

        print(f"📚 Loaded {len(df)} articles from database")

        if df.empty:
            print("❌ No articles found")
            return

        # Combine all text
        all_text_parts = []
        for _, row in df.iterrows():
            title = row.get('title', '') or ''
            content = row.get('content', '') or ''
            combined = f"{title} {content}"
            all_text_parts.append(combined)

        combined_text = ' '.join(all_text_parts)
        print(f"📝 Total text length: {len(combined_text)} characters")

        # Process text with enhanced processor
        print("🔄 Processing text with NepaliTextProcessor...")
        processed_text = processor.process_text_for_wordcloud(combined_text, max_words=50)

        print(f"✅ Processed text length: {len(processed_text)} characters")
        print(f"📖 Sample processed text: {processed_text[:200]}...")

        # Check if we have meaningful content
        if len(processed_text.strip()) < 50:
            print("⚠️ Processed text too short, using fallback...")
            processed_text = processor.get_meaningful_fallback_text()

        # Font path resolution
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

        # Create enhanced word cloud
        print("🎨 Generating enhanced WordCloud...")

        wordcloud = WordCloud(
            width=1200,
            height=600,
            background_color='white',
            colormap='viridis',  # Better color scheme for Nepali
            max_words=30,
            font_path=font_path if font_path else None,
            prefer_horizontal=0.7,
            relative_scaling=0.5,
            min_font_size=16,
            max_font_size=80,
            random_state=42,
            collocations=False,
            normalize_plurals=False,
            include_numbers=True
        ).generate(processed_text)

        print("✅ WordCloud generation successful!")

        # Display top words
        word_freq = wordcloud.words_
        top_words = list(word_freq.keys())[:15]
        print(f"🔝 Top words: {top_words}")

        # Save the enhanced word cloud
        fig, ax = plt.subplots(figsize=(15, 8))
        ax.imshow(wordcloud, interpolation='bilinear')
        ax.axis('off')
        ax.set_title('Enhanced Nepali Word Cloud - Meaningful Words', fontsize=20, pad=20)

        filename = 'enhanced_nepali_wordcloud.png'
        plt.savefig(filename, dpi=300, bbox_inches='tight', facecolor='white')
        print(f"💾 Enhanced WordCloud saved as: {filename}")
        plt.close()

        # Create comparison with original method
        print("\n🔄 Creating comparison with original method...")

        # Original method (for comparison)
        import re
        simple_cleaned = re.sub(r'\s+', ' ', combined_text)
        simple_cleaned = re.sub(r'[^\w\s\u0900-\u097F]', ' ', simple_cleaned)

        original_wordcloud = WordCloud(
            width=1200,
            height=600,
            background_color='white',
            colormap='viridis',
            max_words=30,
            font_path=font_path if font_path else None,
            prefer_horizontal=0.7,
            min_font_size=16,
            max_font_size=80,
            random_state=42,
            collocations=False
        ).generate(simple_cleaned)

        # Save comparison
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(20, 8))

        ax1.imshow(original_wordcloud, interpolation='bilinear')
        ax1.axis('off')
        ax1.set_title('Original Method (Individual Characters)', fontsize=16)

        ax2.imshow(wordcloud, interpolation='bilinear')
        ax2.axis('off')
        ax2.set_title('Enhanced Method (Meaningful Words)', fontsize=16)

        plt.suptitle('WordCloud Comparison: Before vs After Enhancement', fontsize=20)
        plt.tight_layout()

        comparison_filename = 'wordcloud_comparison.png'
        plt.savefig(comparison_filename, dpi=300, bbox_inches='tight', facecolor='white')
        print(f"💾 Comparison saved as: {comparison_filename}")
        plt.close()

        # Show word analysis
        print("\n📊 Word Analysis:")
        original_words = list(original_wordcloud.words_.keys())[:10]
        enhanced_words = list(wordcloud.words_.keys())[:10]

        print(f"Original top words: {original_words}")
        print(f"Enhanced top words: {enhanced_words}")

        print("\n✅ Enhanced WordCloud test completed successfully!")

    except Exception as e:
        print(f"❌ Error in enhanced wordcloud test: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_enhanced_wordcloud()