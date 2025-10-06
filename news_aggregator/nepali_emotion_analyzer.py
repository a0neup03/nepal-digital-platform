#!/usr/bin/env python3
"""
Nepali/Hindi Multilingual Emotion Analyzer
Based on 2024 research for Nepali sentiment analysis and Hindi-English code-mixed models
"""

import sqlite3
import pandas as pd
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np
from typing import Dict, List
import logging
import re

class NepaliEmotionAnalyzer:
    """Advanced emotion analyzer for Nepali/Hindi text using state-of-the-art models"""

    def __init__(self):
        self.setup_logging()
        self.load_models()

        # Enhanced Nepali emotion keywords from research
        self.nepali_emotion_keywords = {
            'joy': ['खुशी', 'हर्ष', 'सफल', 'जित', 'खुशीको', 'हर्षित', 'प्रसन्न', 'मजा', 'आनन्द', 'बधाई', 'उत्सव', 'विजय'],
            'sadness': ['दुःख', 'शोक', 'रुवाई', 'दुर्घटना', 'मृत्यु', 'हत्या', 'मरे', 'बिछोड', 'दुखी', 'बेपत्ता', 'हराए', 'गुमाए', 'बालिका', 'युवक', 'मारिए'],
            'anger': ['रिस', 'क्रोध', 'गुसा', 'विरोध', 'आन्दोलन', 'हर्ताल', 'प्रदर्शन', 'रक्सी', 'लड्ने', 'आयोग', 'प्रतिवेदन', 'अन्याय', 'भ्रष्टाचार'],
            'fear': ['डर', 'चिन्ता', 'समस्या', 'त्रास', 'भय', 'डराउने', 'चिन्तित', 'तनाव', 'खतरा', 'छाला', 'खुकुलो', 'साइड इफेक्ट', 'असर'],
            'surprise': ['आश्चर्य', 'अचम्म', 'हैरान', 'चकित', 'अनपेक्षित', 'शानदार', 'विस्मय', 'अनौठो'],
            'neutral': ['भन्छ', 'गरे', 'भएको', 'हुने', 'छ', 'थियो', 'गर्ने', 'बारे', 'गठित', 'आज']
        }

    def setup_logging(self):
        """Setup logging"""
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)

    def load_models(self):
        """Load multilingual emotion detection models"""
        try:
            # Primary: Multilingual sentiment model (supports Nepali/Hindi)
            self.sentiment_model = pipeline(
                "sentiment-analysis",
                model="tabularisai/multilingual-sentiment-analysis"
            )

            # Secondary: Multilingual BERT for emotion classification
            self.emotion_model = pipeline(
                "text-classification",
                model="j-hartmann/emotion-english-distilroberta-base"
            )

            # Tertiary: mBERT for fallback (supports 100+ languages including Nepali)
            self.multilingual_model = pipeline(
                "sentiment-analysis",
                model="nlptown/bert-base-multilingual-uncased-sentiment"
            )

            self.logger.info("Successfully loaded multilingual emotion models")

        except Exception as e:
            self.logger.warning(f"Error loading advanced models: {e}. Using fallback methods.")
            self.sentiment_model = None
            self.emotion_model = None
            self.multilingual_model = None

    def detect_language(self, text: str) -> str:
        """Simple language detection for Nepali vs English"""
        nepali_chars = len(re.findall(r'[\u0900-\u097F]', text))  # Devanagari script
        english_chars = len(re.findall(r'[a-zA-Z]', text))

        if nepali_chars > english_chars:
            return 'nepali'
        elif english_chars > 0:
            return 'english'
        else:
            return 'mixed'

    def keyword_emotion_detection(self, text: str) -> Dict:
        """Keyword-based emotion detection for Nepali text"""
        text_lower = text.lower()
        emotion_scores = {}

        for emotion, keywords in self.nepali_emotion_keywords.items():
            score = sum(1 for keyword in keywords if keyword in text_lower)
            emotion_scores[emotion] = score

        # Determine dominant emotion
        if sum(emotion_scores.values()) == 0:
            return {'emotion': 'neutral', 'confidence': 0.5, 'method': 'keyword_default'}

        dominant_emotion = max(emotion_scores, key=emotion_scores.get)
        confidence = emotion_scores[dominant_emotion] / sum(emotion_scores.values())

        return {
            'emotion': dominant_emotion,
            'confidence': confidence,
            'method': 'keyword_based',
            'scores': emotion_scores
        }

    def ml_emotion_detection(self, text: str) -> Dict:
        """ML-based emotion detection using multilingual models"""
        if not self.sentiment_model:
            return self.keyword_emotion_detection(text)

        try:
            # Try multilingual sentiment first
            sentiment_result = self.sentiment_model(text[:512])

            # Try emotion classification
            emotion_result = None
            if self.emotion_model:
                try:
                    emotion_result = self.emotion_model(text[:512])
                except:
                    pass

            # Process results
            sentiment_label = sentiment_result[0]['label'] if sentiment_result else 'NEUTRAL'
            sentiment_score = sentiment_result[0]['score'] if sentiment_result else 0.5

            # Map sentiment to emotion
            emotion_mapping = {
                'POSITIVE': 'joy',
                'NEGATIVE': 'sadness',
                'NEUTRAL': 'neutral'
            }

            # Use emotion model result if available
            if emotion_result and emotion_result[0]['score'] > 0.7:
                emotion = emotion_result[0]['label'].lower()
                confidence = emotion_result[0]['score']
            else:
                emotion = emotion_mapping.get(sentiment_label, 'neutral')
                confidence = sentiment_score

            return {
                'emotion': emotion,
                'confidence': confidence,
                'method': 'ml_based',
                'sentiment_label': sentiment_label,
                'sentiment_score': sentiment_score
            }

        except Exception as e:
            self.logger.warning(f"ML emotion detection failed: {e}")
            return self.keyword_emotion_detection(text)

    def analyze_emotion(self, text: str) -> Dict:
        """BERT-FIRST emotion analysis - prioritizes ML models over keywords"""
        if not text or len(text.strip()) < 3:
            return {'emotion': 'neutral', 'confidence': 0.5, 'method': 'empty_text', 'aligned_sentiment': 0.0}

        language = self.detect_language(text)

        # ALWAYS try ML first, regardless of language
        ml_result = self.ml_emotion_detection(text)
        keyword_result = self.keyword_emotion_detection(text)

        # BERT-FIRST approach: Use ML unless it completely fails
        if ml_result['method'] == 'ml_based' and ml_result['confidence'] > 0.6:
            # ML is confident, use it directly
            final_emotion = ml_result['emotion']
            final_confidence = ml_result['confidence']
            method = f'bert_primary_{language}'

            # For negative sentiment, refine using keywords if needed
            if final_emotion in ['sadness'] and language == 'nepali':
                refined_emotion = self.refine_negative_emotion_with_keywords(text, ml_result['confidence'])
                if refined_emotion != 'sadness':
                    final_emotion = refined_emotion
                    method = f'bert_refined_{language}'

        elif ml_result['method'] == 'ml_based' and ml_result['confidence'] > 0.4:
            # ML is moderately confident, ensemble with keywords
            if keyword_result['emotion'] != 'neutral' and keyword_result['confidence'] > 0.4:
                # Both models have opinions, weighted ensemble favoring BERT
                final_emotion = ml_result['emotion']  # Primary from BERT
                final_confidence = (ml_result['confidence'] * 0.8) + (keyword_result['confidence'] * 0.2)
                method = f'bert_ensemble_{language}'
            else:
                # Use BERT result even if moderate confidence
                final_emotion = ml_result['emotion']
                final_confidence = ml_result['confidence']
                method = f'bert_moderate_{language}'

        else:
            # ML failed or very low confidence, fall back to keywords
            if keyword_result['emotion'] != 'neutral' and keyword_result['confidence'] > 0.3:
                final_emotion = keyword_result['emotion']
                final_confidence = keyword_result['confidence']
                method = f'keyword_fallback_{language}'
            else:
                # Both failed, use neutral
                final_emotion = 'neutral'
                final_confidence = 0.5
                method = f'neutral_fallback_{language}'

        # Calculate aligned sentiment score based on emotion
        aligned_sentiment = self.emotion_to_sentiment(final_emotion, final_confidence)

        # Map to our emoji system
        emotion_emojis = {
            'joy': '😊 JOY',
            'sadness': '😢 SADNESS',
            'anger': '😠 ANGER',
            'fear': '😰 FEAR',
            'surprise': '😲 SURPRISE',
            'neutral': '😐 NEUTRAL'
        }

        # Get sentiment display
        sentiment_display = self.get_sentiment_display(aligned_sentiment)

        return {
            'emotion': final_emotion,
            'emotion_display': emotion_emojis.get(final_emotion, '😐 NEUTRAL'),
            'confidence': final_confidence,
            'method': method,
            'language': language,
            'aligned_sentiment': aligned_sentiment,
            'sentiment_display': sentiment_display,
            'ml_confidence': ml_result.get('confidence', 0),
            'keyword_confidence': keyword_result.get('confidence', 0)
        }

    def refine_negative_emotion_with_keywords(self, text: str, ml_confidence: float) -> str:
        """Use keywords to refine negative emotions detected by BERT"""
        text_lower = text.lower()

        # Count keyword matches for each negative emotion
        sadness_score = sum(1 for keyword in self.nepali_emotion_keywords['sadness'] if keyword in text_lower)
        anger_score = sum(1 for keyword in self.nepali_emotion_keywords['anger'] if keyword in text_lower)
        fear_score = sum(1 for keyword in self.nepali_emotion_keywords['fear'] if keyword in text_lower)

        # Only refine if we have strong keyword evidence
        total_matches = sadness_score + anger_score + fear_score
        if total_matches >= 2:  # Need at least 2 keyword matches to override BERT
            if anger_score > sadness_score and anger_score > fear_score:
                return 'anger'
            elif fear_score > sadness_score and fear_score > anger_score:
                return 'fear'

        return 'sadness'  # Default to BERT's original classification

    def emotion_to_sentiment(self, emotion: str, confidence: float) -> float:
        """Convert emotion to aligned sentiment score"""
        emotion_sentiment_map = {
            'joy': 0.7,         # Positive
            'sadness': -0.6,    # Negative
            'anger': -0.5,      # Negative
            'fear': -0.4,       # Negative
            'surprise': 0.2,    # Slightly positive
            'neutral': 0.0      # Neutral
        }

        base_sentiment = emotion_sentiment_map.get(emotion, 0.0)
        # Adjust by confidence
        return base_sentiment * confidence

    def get_sentiment_display(self, sentiment_score: float) -> str:
        """Get sentiment display from score"""
        if sentiment_score > 0.2:
            return '😊 POSITIVE'
        elif sentiment_score < -0.2:
            return '😞 NEGATIVE'
        else:
            return '😐 NEUTRAL'

    def analyze_batch_emotions(self, texts: List[str]) -> List[Dict]:
        """Analyze emotions for a batch of texts"""
        results = []
        for text in texts:
            result = self.analyze_emotion(text)
            results.append(result)
        return results

    def get_emotion_summary(self, texts: List[str]) -> Dict:
        """Get emotion distribution summary for a list of texts"""
        results = self.analyze_batch_emotions(texts)

        emotion_counts = {}
        total_confidence = 0

        for result in results:
            emotion = result['emotion']
            confidence = result['confidence']

            if emotion not in emotion_counts:
                emotion_counts[emotion] = {'count': 0, 'total_confidence': 0}

            emotion_counts[emotion]['count'] += 1
            emotion_counts[emotion]['total_confidence'] += confidence
            total_confidence += confidence

        # Calculate percentages and average confidence
        summary = {}
        total_texts = len(results)

        for emotion, data in emotion_counts.items():
            summary[emotion] = {
                'count': data['count'],
                'percentage': (data['count'] / total_texts) * 100,
                'avg_confidence': data['total_confidence'] / data['count']
            }

        return {
            'emotion_distribution': summary,
            'dominant_emotion': max(emotion_counts, key=lambda x: emotion_counts[x]['count']),
            'total_texts_analyzed': total_texts,
            'overall_confidence': total_confidence / total_texts if total_texts > 0 else 0
        }

def test_analyzer():
    """Test the emotion analyzer with sample Nepali text"""
    analyzer = NepaliEmotionAnalyzer()

    test_texts = [
        "आज धेरै खुशी लाग्यो",  # Today I felt very happy
        "दुर्घटनामा परी मृत्यु भयो",  # Died in an accident
        "यो निर्णयले धेरै रिस उठ्यो",  # This decision made me very angry
        "के होला थाहा छैन",  # Don't know what will happen
        "बधाई छ सफलताको लागि"  # Congratulations for success
    ]

    print("Testing Nepali Emotion Analyzer")
    print("=" * 50)

    for text in test_texts:
        result = analyzer.analyze_emotion(text)
        print(f"Text: {text}")
        print(f"Emotion: {result['emotion_display']}")
        print(f"Confidence: {result['confidence']:.2f}")
        print(f"Method: {result['method']}")
        print("-" * 30)

    # Test summary
    summary = analyzer.get_emotion_summary(test_texts)
    print(f"\nEmotion Summary:")
    print(f"Dominant Emotion: {summary['dominant_emotion']}")
    print(f"Distribution: {summary['emotion_distribution']}")

if __name__ == "__main__":
    test_analyzer()