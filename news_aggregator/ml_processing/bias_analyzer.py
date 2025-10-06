#!/usr/bin/env python3
"""
Nepal News Bias Analyzer - ML Processing Module
Separate ML/bias detection processing using clean database

Input: Clean database from data_collection module  
Output: Bias analysis reports and insights
"""

import sqlite3
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
import json
import logging
from dataclasses import dataclass
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import DBSCAN
import re

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class Article:
    id: int
    url: str
    title: str
    content: str
    source_site: str
    language: str
    published_date: datetime
    word_count: int

@dataclass 
class StoryCluster:
    cluster_id: str
    articles: List[Article]
    representative_title: str
    sources: List[str]
    languages: List[str]
    bias_score: float

@dataclass
class BiasReport:
    summary: Dict
    source_analysis: Dict
    language_bias: Dict
    story_clusters: List[StoryCluster]
    high_bias_stories: List[Dict]

class BiasAnalyzer:
    """ML-based bias detection and analysis"""
    
    def __init__(self, db_path: str = "nepal_news.db"):
        self.db_path = db_path
        self.vectorizer = TfidfVectorizer(
            max_features=5000,
            stop_words='english',
            ngram_range=(1, 2),
            min_df=2
        )
    
    def load_articles(self, days_back: int = 30) -> List[Article]:
        """Load articles from clean database"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cutoff_date = datetime.now() - timedelta(days=days_back)
        
        cursor.execute("""
            SELECT id, url, title, content, source_site, language, 
                   scraped_date, word_count
            FROM articles 
            WHERE scraped_date >= ?
            AND word_count >= 30
            ORDER BY scraped_date DESC
        """, (cutoff_date.isoformat(),))
        
        articles = []
        for row in cursor.fetchall():
            try:
                published_date = datetime.fromisoformat(row['scraped_date'])
            except:
                published_date = datetime.now()
                
            article = Article(
                id=row['id'],
                url=row['url'],
                title=row['title'],
                content=row['content'],
                source_site=row['source_site'],
                language=row['language'],
                published_date=published_date,
                word_count=row['word_count']
            )
            articles.append(article)
        
        conn.close()
        logger.info(f"Loaded {len(articles)} articles for bias analysis")
        return articles
    
    def cluster_similar_stories(self, articles: List[Article], 
                              similarity_threshold: float = 0.4) -> List[StoryCluster]:
        """Cluster articles into same stories across sources"""
        logger.info("Clustering similar stories for bias comparison...")
        
        if len(articles) < 2:
            return []
        
        # Prepare text for vectorization
        texts = []
        for article in articles:
            text = article.title + " " + " ".join(article.content.split()[:100])
            texts.append(text)
        
        try:
            # Generate embeddings
            tfidf_matrix = self.vectorizer.fit_transform(texts)
            similarity_matrix = cosine_similarity(tfidf_matrix)
            
            # Create distance matrix for clustering
            distance_matrix = 1 - similarity_matrix
            np.fill_diagonal(distance_matrix, 0)
            distance_matrix = np.maximum(distance_matrix, 0)
            
            # Cluster using DBSCAN
            clustering = DBSCAN(
                eps=1-similarity_threshold,
                min_samples=2,
                metric='precomputed'
            )
            
            cluster_labels = clustering.fit_predict(distance_matrix)
            
        except Exception as e:
            logger.error(f"Clustering error: {e}")
            return []
        
        # Group articles by cluster
        clusters = {}
        for i, label in enumerate(cluster_labels):
            if label == -1:  # Noise
                continue
            if label not in clusters:
                clusters[label] = []
            clusters[label].append(articles[i])
        
        # Create StoryCluster objects
        story_clusters = []
        for cluster_id, cluster_articles in clusters.items():
            if len(cluster_articles) < 2:
                continue
            
            # Representative title
            titles = [a.title for a in cluster_articles]
            representative_title = max(titles, key=len)
            
            # Sources and languages
            sources = list(set(a.source_site for a in cluster_articles))
            languages = list(set(a.language for a in cluster_articles))
            
            # Calculate bias score
            bias_score = self.calculate_cluster_bias(cluster_articles)
            
            cluster = StoryCluster(
                cluster_id=f"cluster_{cluster_id}",
                articles=cluster_articles,
                representative_title=representative_title,
                sources=sources,
                languages=languages,
                bias_score=bias_score
            )
            story_clusters.append(cluster)
        
        logger.info(f"Found {len(story_clusters)} story clusters")
        return story_clusters
    
    def calculate_cluster_bias(self, articles: List[Article]) -> float:
        """Calculate bias score for a story cluster"""
        if len(articles) < 2:
            return 0.0
        
        bias_score = 0.0
        
        # Word count variance (coverage bias)
        word_counts = [a.word_count for a in articles]
        if len(word_counts) > 1:
            coverage_variance = np.var(word_counts) / np.mean(word_counts)
            bias_score += coverage_variance * 0.3
        
        # Language bias
        languages = [a.language for a in articles]
        unique_languages = len(set(languages))
        if unique_languages > 1:
            bias_score += 2.0  # Cross-language stories get bias points
        
        # Source diversity
        sources = [a.source_site for a in articles]
        unique_sources = len(set(sources))
        if unique_sources == 1:
            bias_score += 1.0  # Single-source stories are potentially biased
        
        # Sentiment variance (simple implementation)
        sentiment_scores = []
        for article in articles:
            sentiment = self.calculate_simple_sentiment(article.content)
            sentiment_scores.append(sentiment)
        
        if len(sentiment_scores) > 1:
            sentiment_variance = np.var(sentiment_scores)
            bias_score += sentiment_variance * 0.5
        
        return min(bias_score, 10.0)  # Cap at 10.0
    
    def calculate_simple_sentiment(self, text: str) -> float:
        """Simple sentiment calculation using word patterns"""
        positive_words = ['good', 'positive', 'success', 'achievement', 'progress', 'development', 'excellent', 'great']
        negative_words = ['bad', 'negative', 'failure', 'problem', 'crisis', 'concern', 'terrible', 'worse']
        
        text_lower = text.lower()
        
        positive_count = sum(text_lower.count(word) for word in positive_words)
        negative_count = sum(text_lower.count(word) for word in negative_words)
        
        total_words = len(text.split())
        if total_words > 0:
            sentiment_score = (positive_count - negative_count) / total_words * 100
        else:
            sentiment_score = 0.0
        
        return sentiment_score
    
    def analyze_coverage_bias(self, cluster: StoryCluster) -> Dict:
        """Analyze coverage differences across sources"""
        coverage_analysis = {
            'source_coverage': {},
            'word_count_differences': {},
            'publication_timing': {},
            'language_coverage': {}
        }
        
        # Source coverage count
        for article in cluster.articles:
            source = article.source_site
            coverage_analysis['source_coverage'][source] = coverage_analysis['source_coverage'].get(source, 0) + 1
        
        # Word count analysis
        if cluster.articles:
            avg_word_count = np.mean([a.word_count for a in cluster.articles])
            for article in cluster.articles:
                ratio = article.word_count / avg_word_count if avg_word_count > 0 else 1.0
                coverage_analysis['word_count_differences'][article.source_site] = ratio
        
        # Publication timing
        if len(cluster.articles) > 1:
            first_published = min(a.published_date for a in cluster.articles)
            for article in cluster.articles:
                delay_hours = (article.published_date - first_published).total_seconds() / 3600
                coverage_analysis['publication_timing'][article.source_site] = delay_hours
        
        # Language coverage
        for lang in ['nepali', 'english']:
            lang_articles = [a for a in cluster.articles if a.language == lang]
            coverage_analysis['language_coverage'][lang] = len(lang_articles)
        
        return coverage_analysis
    
    def analyze_framing_bias(self, cluster: StoryCluster) -> Dict:
        """Analyze framing differences across sources"""
        framing_analysis = {
            'title_differences': {},
            'content_focus': {},
            'unique_terms': {}
        }
        
        # Title analysis
        for article in cluster.articles:
            title_words = article.title.lower().split()
            framing_analysis['title_differences'][article.source_site] = {
                'title': article.title,
                'length': len(title_words),
                'key_words': title_words[:5]
            }
        
        # Content focus analysis
        if len(cluster.articles) > 1:
            all_content = " ".join(a.content for a in cluster.articles)
            common_words = set(re.findall(r'\b\w{4,}\b', all_content.lower()))
            
            for article in cluster.articles:
                article_words = set(re.findall(r'\b\w{4,}\b', article.content.lower()))
                unique_focus = article_words - common_words
                framing_analysis['unique_terms'][article.source_site] = list(unique_focus)[:10]
        
        return framing_analysis
    
    def generate_bias_report(self, articles: List[Article], 
                           clusters: List[StoryCluster]) -> BiasReport:
        """Generate comprehensive bias analysis report"""
        logger.info("Generating bias analysis report...")
        
        # Summary statistics
        summary = {
            'total_articles': len(articles),
            'total_clusters': len(clusters),
            'multi_source_stories': len([c for c in clusters if len(c.sources) > 1]),
            'cross_language_stories': len([c for c in clusters if len(c.languages) > 1]),
            'analysis_date': datetime.now().isoformat()
        }
        
        # Source analysis
        source_stats = {}
        sources = set(a.source_site for a in articles)
        
        for source in sources:
            source_articles = [a for a in articles if a.source_site == source]
            source_stats[source] = {
                'total_articles': len(source_articles),
                'avg_word_count': np.mean([a.word_count for a in source_articles]) if source_articles else 0,
                'language': source_articles[0].language if source_articles else 'unknown',
                'clusters_participated': len([c for c in clusters if source in c.sources])
            }
        
        # Language bias analysis
        nepali_articles = [a for a in articles if a.language == 'nepali']
        english_articles = [a for a in articles if a.language == 'english']
        
        language_bias = {
            'nepali_articles': len(nepali_articles),
            'english_articles': len(english_articles),
            'language_ratio': len(nepali_articles) / len(english_articles) if english_articles else float('inf'),
            'cross_language_clusters': len([c for c in clusters if len(c.languages) > 1])
        }
        
        # High bias stories
        high_bias_stories = []
        for cluster in clusters:
            if cluster.bias_score > 5.0:
                coverage_bias = self.analyze_coverage_bias(cluster)
                framing_bias = self.analyze_framing_bias(cluster)
                
                high_bias_stories.append({
                    'cluster_id': cluster.cluster_id,
                    'title': cluster.representative_title,
                    'bias_score': cluster.bias_score,
                    'sources': cluster.sources,
                    'languages': cluster.languages,
                    'coverage_analysis': coverage_bias,
                    'framing_analysis': framing_bias
                })
        
        return BiasReport(
            summary=summary,
            source_analysis=source_stats,
            language_bias=language_bias,
            story_clusters=clusters,
            high_bias_stories=high_bias_stories
        )
    
    def run_bias_analysis(self, days_back: int = 30) -> BiasReport:
        """Run complete bias analysis"""
        logger.info(f"🔍 NEPAL NEWS BIAS ANALYSIS")
        logger.info(f"Analyzing articles from last {days_back} days")
        logger.info("=" * 50)
        
        # Load articles
        articles = self.load_articles(days_back)
        if not articles:
            logger.warning("No articles found for analysis")
            return None
        
        # Cluster stories
        clusters = self.cluster_similar_stories(articles)
        
        # Generate report
        report = self.generate_bias_report(articles, clusters)
        
        # Print summary
        print(f"\n📊 BIAS ANALYSIS SUMMARY")
        print("=" * 40)
        print(f"📰 Articles analyzed: {report.summary['total_articles']}")
        print(f"🔗 Story clusters: {report.summary['total_clusters']}")
        print(f"📋 Multi-source stories: {report.summary['multi_source_stories']}")
        print(f"🌐 Cross-language stories: {report.summary['cross_language_stories']}")
        
        print(f"\n📈 SOURCE ANALYSIS:")
        for source, stats in report.source_analysis.items():
            print(f"   {source}: {stats['total_articles']} articles, {stats['clusters_participated']} clusters")
        
        print(f"\n🔍 LANGUAGE BIAS:")
        print(f"   Nepali articles: {report.language_bias['nepali_articles']}")
        print(f"   English articles: {report.language_bias['english_articles']}")
        print(f"   Language ratio: {report.language_bias['language_ratio']:.1f}")
        
        if report.high_bias_stories:
            print(f"\n⚠️  HIGH BIAS STORIES ({len(report.high_bias_stories)}):")
            for story in report.high_bias_stories[:5]:
                print(f"   📰 {story['title'][:60]}... (bias: {story['bias_score']:.1f})")
        
        return report
    
    def save_report(self, report: BiasReport, filename: str = None) -> str:
        """Save bias analysis report to JSON"""
        if not filename:
            filename = f"bias_analysis_{datetime.now().strftime('%Y%m%d_%H%M')}.json"
        
        # Convert to serializable format
        report_dict = {
            'summary': report.summary,
            'source_analysis': report.source_analysis,
            'language_bias': report.language_bias,
            'high_bias_stories': report.high_bias_stories,
            'story_clusters': [
                {
                    'cluster_id': cluster.cluster_id,
                    'title': cluster.representative_title,
                    'sources': cluster.sources,
                    'languages': cluster.languages,
                    'bias_score': cluster.bias_score,
                    'article_count': len(cluster.articles)
                }
                for cluster in report.story_clusters
            ]
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(report_dict, f, indent=2, ensure_ascii=False, default=str)
        
        logger.info(f"Report saved to: {filename}")
        return filename

def main():
    analyzer = BiasAnalyzer()
    
    print("🧠 NEPAL NEWS BIAS ANALYZER")
    print("ML-based bias detection and analysis")
    print("Separate processing module using clean database")
    print("=" * 50)
    
    # Run analysis
    report = analyzer.run_bias_analysis(days_back=30)
    
    if report:
        # Save report
        filename = analyzer.save_report(report)
        print(f"\n💾 Analysis complete! Report saved to: {filename}")
    else:
        print("\n❌ No data available for analysis")

if __name__ == "__main__":
    main()