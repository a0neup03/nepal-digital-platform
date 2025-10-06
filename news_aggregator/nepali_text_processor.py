#!/usr/bin/env python3
"""
Enhanced Nepali Text Processor for WordCloud
Proper tokenization and preprocessing of Devanagari script for meaningful word extraction
"""

import re
import unicodedata
from typing import List, Dict, Set
from collections import Counter

class NepaliTextProcessor:
    """Enhanced processor for Nepali/Devanagari text to extract meaningful words"""

    def __init__(self):
        # Devanagari Unicode ranges
        self.devanagari_range = (0x0900, 0x097F)  # Main Devanagari block
        self.devanagari_extended = (0xA8E0, 0xA8FF)  # Devanagari Extended

        # Comprehensive Nepali stop words (particles, conjunctions, common words)
        self.nepali_stop_words = {
            # Basic particles and conjunctions
            'र', 'का', 'की', 'को', 'ले', 'लाई', 'बाट', 'मा', 'छ', 'हो', 'भो', 'थियो', 'छैन',

            # Numbers
            'एक', 'दुई', 'तीन', 'चार', 'पाँच', 'छ', 'सात', 'आठ', 'नौ', 'दश',

            # Demonstratives and interrogatives
            'यो', 'त्यो', 'यी', 'ती', 'यहाँ', 'त्यहाँ', 'कहाँ', 'कति', 'कुन', 'के', 'को',

            # Verb forms and auxiliaries - EXPANDED
            'गर्दै', 'गरेको', 'गर्ने', 'भएको', 'भने', 'भनेको', 'हुँदै', 'हुने', 'भएर',
            'गर्न', 'गरे', 'गर्छ', 'गर्छन्', 'गर्यो', 'गरिने', 'गरिएको', 'गरिन्छ',
            'हुन्छ', 'हुन्छन्', 'हुने', 'भने', 'भनी', 'भनेर', 'भएर', 'भइ',

            # Common particles and connectors - EXPANDED
            'पनि', 'छन्', 'छैन', 'छिन्', 'छौं', 'छु', 'हुँ', 'हौं', 'हो', 'हुन्',
            'लागि', 'मात्र', 'सम्म', 'देखि', 'पछि', 'अगाडि', 'माथि', 'तल', 'भित्र', 'बाहिर',
            'अनि', 'त्यसैले', 'तर', 'वा', 'अथवा', 'कि', 'भने', 'यदि', 'जुन', 'जो', 'जस',

            # Time and frequency words
            'आज', 'भोलि', 'हिजो', 'अब', 'त्यसपछि', 'पहिले', 'बेला', 'समय', 'दिन',
            'सधैं', 'कहिले', 'कहिल्यै', 'बारम्बार', 'फेरि', 'अर्को', 'यस', 'त्यस',

            # Quantity and measurement
            'धेरै', 'थोरै', 'सबै', 'केही', 'कम', 'बढी', 'पूरै', 'आधा', 'केवल',

            # Short meaningless words (2-3 characters)
            'न', 'त', 'स', 'म', 'ब', 'प', 'क', 'ग', 'च', 'ज', 'ट', 'ड', 'ण', 'थ', 'द', 'ध',
            'श', 'ष', 'ह', 'य', 'व', 'ल', 'क्ष', 'त्र', 'ज्ञ'
        }

        # Common English stop words that might appear
        self.english_stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
            'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had'
        }

        # Meaningful Nepali terms that should be prioritized
        self.nepali_priority_words = {
            'नेपाल': 5.0, 'सरकार': 4.0, 'प्रधानमन्त्री': 4.0, 'राजनीति': 3.5, 'समाचार': 3.0,
            'निर्वाचन': 3.5, 'कांग्रेस': 3.0, 'एमाले': 3.0, 'माओवादी': 3.0, 'विकास': 3.0,
            'अर्थतन्त्र': 3.0, 'शिक्षा': 2.5, 'स्वास्थ्य': 2.5, 'यातायात': 2.5, 'कृषि': 2.5,
            'उद्योग': 2.5, 'व्यापार': 2.5, 'बैंक': 2.5, 'बीमा': 2.5, 'संसद': 3.5, 'सभा': 3.0,
            'न्यायपालिका': 3.0, 'अदालत': 2.5, 'पुलिस': 2.5, 'सेना': 2.5, 'प्रहरी': 2.5
        }

    def is_devanagari_char(self, char: str) -> bool:
        """Check if character is in Devanagari range"""
        code = ord(char)
        return (self.devanagari_range[0] <= code <= self.devanagari_range[1] or
                self.devanagari_extended[0] <= code <= self.devanagari_extended[1])

    def clean_text(self, text: str) -> str:
        """Basic text cleaning while preserving Devanagari structure"""
        if not text:
            return ""

        # Normalize Unicode (important for Devanagari)
        text = unicodedata.normalize('NFC', text)

        # Replace multiple whitespace with single space
        text = re.sub(r'\s+', ' ', text)

        # Remove special punctuation but keep Devanagari punctuation
        # Keep: letters, numbers, spaces, Devanagari punctuation (।, ॥)
        text = re.sub(r'[^\w\s\u0900-\u097F।॥]', ' ', text)

        return text.strip()

    def extract_devanagari_words(self, text: str) -> List[str]:
        """Extract meaningful Devanagari words using improved tokenization"""
        if not text:
            return []

        cleaned_text = self.clean_text(text)

        # Split on whitespace and punctuation
        potential_words = re.split(r'[\s।॥]+', cleaned_text)

        valid_words = []
        for word in potential_words:
            word = word.strip()
            if not word:
                continue

            # Skip if too short (likely incomplete)
            if len(word) < 2:
                continue

            # Check if word contains Devanagari characters
            has_devanagari = any(self.is_devanagari_char(c) for c in word)

            if has_devanagari:
                # Skip common stop words
                if word.lower() not in self.nepali_stop_words:
                    valid_words.append(word)
            else:
                # For non-Devanagari words (English), apply basic filtering
                if (len(word) >= 3 and
                    word.lower() not in self.english_stop_words and
                    word.isalpha()):
                    valid_words.append(word)

        return valid_words

    def create_word_frequency_dict(self, words: List[str]) -> Dict[str, float]:
        """Create frequency dictionary with priority weighting"""
        if not words:
            return {}

        # Count word frequencies
        word_counts = Counter(words)

        # Apply priority weighting
        weighted_freqs = {}
        for word, count in word_counts.items():
            # Base frequency
            freq = count

            # Apply priority multiplier if word is in priority list
            if word in self.nepali_priority_words:
                freq *= self.nepali_priority_words[word]

            # Boost longer meaningful words
            if len(word) >= 4 and any(self.is_devanagari_char(c) for c in word):
                freq *= 1.5

            weighted_freqs[word] = freq

        return weighted_freqs

    def process_text_for_wordcloud(self, text: str, max_words: int = 50) -> str:
        """Process text and return space-separated string optimized for WordCloud"""
        if not text:
            return ""

        # Extract meaningful words
        words = self.extract_devanagari_words(text)

        if not words:
            return ""

        # Get frequency-weighted words
        word_freqs = self.create_word_frequency_dict(words)

        # Sort by frequency and take top words
        top_words = sorted(word_freqs.items(), key=lambda x: x[1], reverse=True)[:max_words]

        # Create text string where frequent words appear more often
        result_words = []
        for word, freq in top_words:
            # Repeat words based on frequency for WordCloud
            repeat_count = max(1, int(freq / max(1, max(word_freqs.values())) * 10))
            result_words.extend([word] * repeat_count)

        return ' '.join(result_words)

    def get_meaningful_fallback_text(self) -> str:
        """Get meaningful Nepali fallback text if processing fails"""
        fallback_terms = [
            'नेपाल', 'सरकार', 'राजनीति', 'समाचार', 'प्रधानमन्त्री', 'मन्त्री', 'संसद',
            'कांग्रेस', 'एमाले', 'माओवादी', 'निर्वाचन', 'विकास', 'अर्थतन्त्र', 'शिक्षा',
            'स्वास्थ्य', 'यातायात', 'कृषि', 'उद्योग', 'व्यापार', 'बैंक', 'न्यायपालिका',
            'Nepal', 'Government', 'Politics', 'News', 'Congress', 'Election', 'Development',
            'Economy', 'Education', 'Health', 'Agriculture', 'Industry', 'Business'
        ]

        # Weight important terms by repeating them
        weighted_text = []
        for term in fallback_terms:
            if term in self.nepali_priority_words:
                weight = int(self.nepali_priority_words[term])
                weighted_text.extend([term] * weight)
            else:
                weighted_text.append(term)

        return ' '.join(weighted_text)

def test_processor():
    """Test the Nepali text processor"""
    processor = NepaliTextProcessor()

    test_texts = [
        "नेपाल सरकारले नयाँ नीति घोषणा गर्यो। प्रधानमन्त्रीले संसदमा भाषण दिए।",
        "कांग्रेस र एमालेबीच राजनीतिक सहमति भयो। निर्वाचन आयोगले तयारी सुरु गर्यो।",
        "अर्थतन्त्रमा सुधार आएको छ। विकास निर्माणका कामहरू सुरु भएका छन्।"
    ]

    for i, text in enumerate(test_texts):
        print(f"\n--- Test {i+1} ---")
        print(f"Original: {text}")

        words = processor.extract_devanagari_words(text)
        print(f"Extracted words: {words}")

        processed = processor.process_text_for_wordcloud(text)
        print(f"Processed for WordCloud: {processed[:100]}...")

if __name__ == "__main__":
    test_processor()