#!/usr/bin/env python3
"""
Improved WordCloud Generator using frequency dictionaries
This avoids WordCloud's internal tokenization by providing frequency data directly
"""

import sqlite3
import pandas as pd
import os
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from nepali_text_processor import NepaliTextProcessor
from collections import Counter

class ImprovedWordCloudGenerator:
    """Generate word clouds using frequency dictionaries to bypass tokenization issues"""

    def __init__(self):
        self.processor = NepaliTextProcessor()
        self.font_path = self._get_font_path()

    def _get_font_path(self):
        """Get the best available Nepali font with absolute path resolution"""
        import os

        # Get current script directory for relative path resolution
        current_dir = os.path.dirname(os.path.abspath(__file__))

        font_candidates = [
            'fonts/NotoSansDevanagari/hinted/ttf/NotoSansDevanagari-Regular.ttf',
            'fonts/NotoSansDevanagari/unhinted/ttf/NotoSansDevanagari-Regular.ttf',
            'fonts/NotoSansDevanagari/full/ttf/NotoSansDevanagari-Regular.ttf'
        ]

        for font in font_candidates:
            # Try relative path first
            if os.path.exists(font):
                absolute_font_path = os.path.abspath(font)
                print(f"✅ Using font (relative): {absolute_font_path}")
                return absolute_font_path

            # Try from current script directory
            script_relative_font = os.path.join(current_dir, font)
            if os.path.exists(script_relative_font):
                print(f"✅ Using font (script relative): {script_relative_font}")
                return script_relative_font

        # Try system fonts as fallback
        system_font_paths = [
            '/System/Library/Fonts/Helvetica.ttc',  # macOS fallback
            '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',  # Linux fallback
            'C:\\Windows\\Fonts\\arial.ttf'  # Windows fallback
        ]

        for sys_font in system_font_paths:
            if os.path.exists(sys_font):
                print(f"⚠️ Using system font fallback: {sys_font}")
                return sys_font

        print("⚠️ No fonts found, using default (may show boxes for Nepali)")
        return None

    def generate_from_database(self, limit=100, days_back=30):
        """Generate word cloud from database articles"""
        try:
            conn = sqlite3.connect('nepal_news_intelligence.db')

            # Get recent articles
            query = """
            SELECT title, content, published_date
            FROM articles_enhanced
            WHERE title IS NOT NULL
            ORDER BY published_date DESC
            LIMIT ?
            """

            df = pd.read_sql_query(query, conn, params=[limit])
            conn.close()

            print(f"📚 Loaded {len(df)} articles from database")

            if df.empty:
                print("❌ No articles found")
                return None

            # Combine all text
            all_text_parts = []
            for _, row in df.iterrows():
                title = row.get('title', '') or ''
                content = row.get('content', '') or ''
                combined = f"{title} {content}"
                all_text_parts.append(combined)

            combined_text = ' '.join(all_text_parts)
            print(f"📝 Total text length: {len(combined_text)} characters")

            return self.generate_from_text(combined_text)

        except Exception as e:
            print(f"❌ Database error: {e}")
            return None

    def generate_from_text(self, text):
        """Generate word cloud from raw text using frequency approach"""
        if not text:
            print("❌ No text provided")
            return None

        # Extract meaningful words
        print("🔄 Extracting meaningful Nepali words...")
        words = self.processor.extract_devanagari_words(text)
        print(f"📊 Extracted {len(words)} words")

        if not words:
            print("⚠️ No words extracted, using fallback")
            fallback_text = self.processor.get_meaningful_fallback_text()
            words = self.processor.extract_devanagari_words(fallback_text)

        # Create frequency dictionary
        word_freq = self.processor.create_word_frequency_dict(words)
        print(f"📈 Created frequency dict with {len(word_freq)} unique words")

        # Show top words
        top_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:15]
        print(f"🔝 Top words with frequencies:")
        for word, freq in top_words:
            print(f"   {word}: {freq:.2f}")

        if not word_freq:
            print("❌ No word frequencies generated")
            return None

        # Apply Unicode normalization to word frequencies for better rendering
        print("📝 Applying Unicode normalization...")
        import unicodedata

        normalized_word_freq = {}
        for word, freq in word_freq.items():
            # Normalize to NFC (Canonical Composition) for better Devanagari rendering
            normalized_word = unicodedata.normalize('NFC', word)
            normalized_word_freq[normalized_word] = freq

        # Generate WordCloud using frequency dictionary
        print("🎨 Generating WordCloud from frequencies...")

        wordcloud = WordCloud(
            width=1400,
            height=700,
            background_color='white',
            colormap='plasma',  # Better visibility for Devanagari
            max_words=20,  # Reduced to show only most meaningful words
            font_path=self.font_path,
            prefer_horizontal=0.9,  # More horizontal text for better Devanagari reading
            relative_scaling=0.5,  # Better size distribution
            min_font_size=20,  # Larger minimum for better Devanagari visibility
            max_font_size=80,  # Controlled maximum size
            random_state=42,
            collocations=False,
            include_numbers=False,  # Exclude numbers
            normalize_plurals=False
        ).generate_from_frequencies(normalized_word_freq)  # Use normalized frequencies!

        print("✅ WordCloud generation successful!")
        return wordcloud

    def save_wordcloud(self, wordcloud, filename='improved_nepali_wordcloud.png'):
        """Save the generated word cloud"""
        if not wordcloud:
            print("❌ No wordcloud to save")
            return False

        try:
            fig, ax = plt.subplots(figsize=(18, 10))
            ax.imshow(wordcloud, interpolation='bilinear')
            ax.axis('off')
            ax.set_title('Nepal News Word Cloud - Meaningful Words',
                        fontsize=24, pad=30, fontweight='bold')

            plt.savefig(filename, dpi=300, bbox_inches='tight',
                       facecolor='white', edgecolor='none')
            plt.close()

            print(f"💾 WordCloud saved as: {filename}")

            # Show final word analysis
            words = wordcloud.words_
            top_final_words = list(words.keys())[:10]
            print(f"🎯 Final top words in WordCloud: {top_final_words}")

            return True

        except Exception as e:
            print(f"❌ Error saving wordcloud: {e}")
            return False

    def create_comparison(self):
        """Create a comparison between old and new methods"""
        print("\n🔄 Creating method comparison...")

        # Load data
        conn = sqlite3.connect('nepal_news_intelligence.db')
        query = "SELECT title, content FROM articles_enhanced WHERE title IS NOT NULL LIMIT 50"
        df = pd.read_sql_query(query, conn)
        conn.close()

        combined_text = ' '.join([f"{row.get('title', '')} {row.get('content', '')}"
                                for _, row in df.iterrows()])

        # Method 1: Original (character-based)
        import re
        simple_cleaned = re.sub(r'\s+', ' ', combined_text)
        simple_cleaned = re.sub(r'[^\w\s\u0900-\u097F]', ' ', simple_cleaned)

        old_wordcloud = WordCloud(
            width=700, height=350, background_color='white',
            max_words=20, font_path=self.font_path,
            colormap='Blues', random_state=42
        ).generate(simple_cleaned)

        # Method 2: New (word-based)
        new_wordcloud = self.generate_from_text(combined_text)

        if not new_wordcloud:
            print("❌ Could not generate new wordcloud for comparison")
            return False

        # Create side-by-side comparison
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(24, 10))

        ax1.imshow(old_wordcloud, interpolation='bilinear')
        ax1.axis('off')
        ax1.set_title('❌ Old Method: Individual Characters', fontsize=18, color='red')

        ax2.imshow(new_wordcloud, interpolation='bilinear')
        ax2.axis('off')
        ax2.set_title('✅ New Method: Meaningful Words', fontsize=18, color='green')

        plt.suptitle('WordCloud Enhancement Comparison', fontsize=24, fontweight='bold')
        plt.tight_layout()

        comparison_filename = 'nepali_wordcloud_enhancement_comparison.png'
        plt.savefig(comparison_filename, dpi=300, bbox_inches='tight', facecolor='white')
        plt.close()

        print(f"💾 Comparison saved as: {comparison_filename}")

        # Print comparison results
        old_words = list(old_wordcloud.words_.keys())[:10]
        new_words = list(new_wordcloud.words_.keys())[:10]

        print(f"\n📊 Comparison Results:")
        print(f"❌ Old method top words: {old_words}")
        print(f"✅ New method top words: {new_words}")

        return True

def test_improved_generator():
    """Test the improved word cloud generator"""
    print("🚀 Testing Improved WordCloud Generator...")

    generator = ImprovedWordCloudGenerator()

    # Test 1: Generate from database
    print("\n=== Test 1: Database WordCloud ===")
    wordcloud = generator.generate_from_database(limit=100)
    if wordcloud:
        generator.save_wordcloud(wordcloud, 'test_database_wordcloud.png')

    # Test 2: Generate from sample text
    print("\n=== Test 2: Sample Text WordCloud ===")
    sample_text = """
    नेपाल सरकारले नयाँ नीति घोषणा गर्यो। प्रधानमन्त्रीले संसदमा भाषण दिए।
    कांग्रेस र एमालेबीच राजनीतिक सहमति भयो। निर्वाचन आयोगले तयारी सुरु गर्यो।
    अर्थतन्त्रमा सुधार आएको छ। विकास निर्माणका कामहरू सुरु भएका छन्।
    शिक्षा क्षेत्रमा नयाँ योजना ल्याइएको छ। स्वास्थ्य सेवामा सुधार गरिएको छ।
    """

    sample_wordcloud = generator.generate_from_text(sample_text)
    if sample_wordcloud:
        generator.save_wordcloud(sample_wordcloud, 'test_sample_wordcloud.png')

    # Test 3: Create comparison
    print("\n=== Test 3: Method Comparison ===")
    generator.create_comparison()

    print("\n✅ All tests completed!")

if __name__ == "__main__":
    test_improved_generator()