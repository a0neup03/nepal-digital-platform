"""
Database Models for Nepal News Aggregator
Independent data layer - works with any processing components
Designed for scalability with proper indexing and relationships
"""

from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Float, Boolean, JSON, ForeignKey, Index
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from datetime import datetime, timezone
import uuid
from typing import Dict, List, Optional
import json

from config import DATABASE_URL

Base = declarative_base()

class NewsSource(Base):
    """News source metadata (RSS feeds, websites, etc.)"""
    __tablename__ = 'news_sources'
    
    id = Column(String(50), primary_key=True)  # e.g., 'kantipur', 'setopati'
    name = Column(String(200), nullable=False)
    website_url = Column(String(500))
    rss_url = Column(String(500))
    language = Column(String(10), default='nepali')
    
    # Bias and reliability (like Ground News)
    bias_rating = Column(String(20), default='center')  # left, center-left, center, center-right, right
    reliability_score = Column(Float, default=0.5)  # 0.0 to 1.0
    
    # Metadata
    country = Column(String(10), default='NP')
    category = Column(String(50))  # news, blog, social_media
    
    # Tracking
    created_at = Column(DateTime, default=datetime.utcnow)
    last_fetched = Column(DateTime)
    is_active = Column(Boolean, default=True)
    
    # Statistics
    total_articles_collected = Column(Integer, default=0)
    fetch_success_rate = Column(Float, default=1.0)
    
    # Relationships
    articles = relationship("NewsArticle", back_populates="source")

class NewsArticle(Base):
    """Individual news articles from any source"""
    __tablename__ = 'news_articles'
    
    # Primary identification
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    url = Column(String(1000), unique=True, nullable=False)
    source_id = Column(String(50), ForeignKey('news_sources.id'), nullable=False)
    
    # Content
    title = Column(Text, nullable=False)
    content = Column(Text)
    summary = Column(Text)
    author = Column(String(200))
    
    # Metadata
    published_date = Column(DateTime, nullable=False)
    collected_date = Column(DateTime, default=datetime.utcnow)
    language = Column(String(10), default='nepali')
    category = Column(String(100))  # politics, sports, economy, etc.
    
    # Content analysis
    word_count = Column(Integer)
    has_image = Column(Boolean, default=False)
    
    # Fingerprints for deduplication (computed by similarity engine)
    content_hash = Column(String(32))  # MD5 hash
    title_hash = Column(String(32))   # MD5 hash
    
    # Quality metrics
    quality_score = Column(Float, default=0.5)  # 0.0 to 1.0
    spam_score = Column(Float, default=0.0)     # 0.0 to 1.0
    
    # Processing status
    is_processed = Column(Boolean, default=False)
    processing_error = Column(Text)
    
    # Relationships
    source = relationship("NewsSource", back_populates="articles")
    similarities = relationship("ArticleSimilarity", 
                              foreign_keys="ArticleSimilarity.article1_id",
                              back_populates="article1")
    cluster_memberships = relationship("ClusterMembership", back_populates="article")
    
    # Indexes for performance
    __table_args__ = (
        Index('idx_article_published_date', 'published_date'),
        Index('idx_article_source_date', 'source_id', 'published_date'),
        Index('idx_article_content_hash', 'content_hash'),
        Index('idx_article_title_hash', 'title_hash'),
        Index('idx_article_processed', 'is_processed'),
        Index('idx_article_url_hash', 'url'),
    )

class ArticleSimilarity(Base):
    """Pairwise similarity between articles (computed by similarity engine)"""
    __tablename__ = 'article_similarities'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    article1_id = Column(UUID(as_uuid=True), ForeignKey('news_articles.id'), nullable=False)
    article2_id = Column(UUID(as_uuid=True), ForeignKey('news_articles.id'), nullable=False)
    
    # Similarity metrics
    similarity_score = Column(Float, nullable=False)  # 0.0 to 1.0
    method_used = Column(String(20), nullable=False)  # exact, tfidf, semantic
    
    # Classification results
    is_duplicate = Column(Boolean, default=False)
    is_same_story = Column(Boolean, default=False)
    
    # Processing metadata
    computed_date = Column(DateTime, default=datetime.utcnow)
    processing_time_ms = Column(Float)
    
    # Relationships
    article1 = relationship("NewsArticle", foreign_keys=[article1_id])
    article2 = relationship("NewsArticle", foreign_keys=[article2_id])
    
    # Indexes
    __table_args__ = (
        Index('idx_similarity_articles', 'article1_id', 'article2_id'),
        Index('idx_similarity_score', 'similarity_score'),
        Index('idx_similarity_duplicate', 'is_duplicate'),
        Index('idx_similarity_same_story', 'is_same_story'),
    )

class StoryCluster(Base):
    """Story clusters (groups of related articles)"""
    __tablename__ = 'story_clusters'
    
    id = Column(String(50), primary_key=True)  # e.g., 'cluster_000001'
    
    # Story information
    representative_title = Column(Text)
    story_summary = Column(Text)
    topic_keywords = Column(ARRAY(String))
    
    # Temporal tracking
    first_seen = Column(DateTime, nullable=False)
    last_updated = Column(DateTime, nullable=False)
    story_phase = Column(String(20), default='breaking')  # breaking, developing, analysis, archived
    
    # Quality metrics
    cohesion_score = Column(Float, default=0.0)  # How similar articles are within cluster
    importance_score = Column(Float, default=0.0)  # Story importance
    article_count = Column(Integer, default=0)
    
    # Geographic and categorical
    dominant_source_id = Column(String(50), ForeignKey('news_sources.id'))
    primary_language = Column(String(10), default='nepali')
    category = Column(String(100))
    
    # Status
    is_active = Column(Boolean, default=True)
    is_breaking_news = Column(Boolean, default=False)
    
    # Processing metadata
    created_date = Column(DateTime, default=datetime.utcnow)
    last_processed = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    dominant_source = relationship("NewsSource")
    memberships = relationship("ClusterMembership", back_populates="cluster")
    
    # Indexes
    __table_args__ = (
        Index('idx_cluster_active', 'is_active'),
        Index('idx_cluster_breaking', 'is_breaking_news'),
        Index('idx_cluster_updated', 'last_updated'),
        Index('idx_cluster_phase', 'story_phase'),
        Index('idx_cluster_importance', 'importance_score'),
    )

class ClusterMembership(Base):
    """Many-to-many relationship between articles and clusters"""
    __tablename__ = 'cluster_memberships'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    article_id = Column(UUID(as_uuid=True), ForeignKey('news_articles.id'), nullable=False)
    cluster_id = Column(String(50), ForeignKey('story_clusters.id'), nullable=False)
    
    # Membership metadata
    added_date = Column(DateTime, default=datetime.utcnow)
    confidence_score = Column(Float, default=0.5)  # How confident we are about this assignment
    is_representative = Column(Boolean, default=False)  # Is this a representative article for the cluster?
    
    # Relationships
    article = relationship("NewsArticle", back_populates="cluster_memberships")
    cluster = relationship("StoryCluster", back_populates="memberships")
    
    # Indexes
    __table_args__ = (
        Index('idx_membership_article', 'article_id'),
        Index('idx_membership_cluster', 'cluster_id'),
        Index('idx_membership_representative', 'is_representative'),
        Index('idx_membership_confidence', 'confidence_score'),
    )

class ProcessingJob(Base):
    """Track processing jobs for monitoring and debugging"""
    __tablename__ = 'processing_jobs'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    job_type = Column(String(50), nullable=False)  # rss_collection, similarity_detection, clustering
    status = Column(String(20), default='pending')  # pending, running, completed, failed
    
    # Job details
    source_id = Column(String(50), ForeignKey('news_sources.id'))
    articles_processed = Column(Integer, default=0)
    
    # Timing
    started_at = Column(DateTime)
    completed_at = Column(DateTime)
    processing_time_seconds = Column(Float)
    
    # Results
    result_summary = Column(JSON)  # Flexible JSON field for job-specific results
    error_message = Column(Text)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Indexes
    __table_args__ = (
        Index('idx_job_type_status', 'job_type', 'status'),
        Index('idx_job_created', 'created_at'),
        Index('idx_job_source', 'source_id'),
    )

class SystemMetrics(Base):
    """System performance and health metrics"""
    __tablename__ = 'system_metrics'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    metric_name = Column(String(100), nullable=False)
    metric_value = Column(Float, nullable=False)
    metric_unit = Column(String(20))
    
    # Context
    component = Column(String(50))  # rss_collector, similarity_engine, clustering_engine
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Additional data
    extra_data = Column(JSON)
    
    # Indexes
    __table_args__ = (
        Index('idx_metrics_name_time', 'metric_name', 'timestamp'),
        Index('idx_metrics_component', 'component'),
    )

class DatabaseManager:
    """Database connection and session management"""
    
    def __init__(self, database_url: str = None):
        self.database_url = database_url or DATABASE_URL
        self.engine = create_engine(self.database_url)
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
    
    def create_tables(self):
        """Create all tables"""
        Base.metadata.create_all(bind=self.engine)
    
    def get_session(self):
        """Get database session"""
        return self.SessionLocal()
    
    def close_session(self, session):
        """Close database session"""
        session.close()
    
    def add_news_source(self, source_data: Dict) -> NewsSource:
        """Add or update news source"""
        session = self.get_session()
        try:
            source = session.query(NewsSource).filter_by(id=source_data['id']).first()
            if source:
                # Update existing
                for key, value in source_data.items():
                    setattr(source, key, value)
            else:
                # Create new
                source = NewsSource(**source_data)
                session.add(source)
            
            session.commit()
            return source
        finally:
            self.close_session(session)
    
    def add_article(self, article_data: Dict) -> NewsArticle:
        """Add article to database"""
        session = self.get_session()
        try:
            # Check if article already exists (by URL)
            existing = session.query(NewsArticle).filter_by(url=article_data['url']).first()
            if existing:
                return existing
            
            article = NewsArticle(**article_data)
            session.add(article)
            session.commit()
            return article
        finally:
            self.close_session(session)
    
    def add_similarity(self, similarity_data: Dict) -> ArticleSimilarity:
        """Add similarity result to database"""
        session = self.get_session()
        try:
            similarity = ArticleSimilarity(**similarity_data)
            session.add(similarity)
            session.commit()
            return similarity
        finally:
            self.close_session(session)
    
    def add_cluster(self, cluster_data: Dict) -> StoryCluster:
        """Add or update story cluster"""
        session = self.get_session()
        try:
            cluster = session.query(StoryCluster).filter_by(id=cluster_data['id']).first()
            if cluster:
                # Update existing
                for key, value in cluster_data.items():
                    if key != 'id':  # Don't update ID
                        setattr(cluster, key, value)
            else:
                # Create new
                cluster = StoryCluster(**cluster_data)
                session.add(cluster)
            
            session.commit()
            return cluster
        finally:
            self.close_session(session)
    
    def add_cluster_membership(self, article_id: str, cluster_id: str, confidence: float = 0.5) -> ClusterMembership:
        """Add article to cluster"""
        session = self.get_session()
        try:
            # Check if membership already exists
            existing = session.query(ClusterMembership).filter_by(
                article_id=article_id, 
                cluster_id=cluster_id
            ).first()
            if existing:
                existing.confidence_score = confidence
                existing.added_date = datetime.utcnow()
            else:
                membership = ClusterMembership(
                    article_id=article_id,
                    cluster_id=cluster_id,
                    confidence_score=confidence
                )
                session.add(membership)
            
            session.commit()
            return existing or membership
        finally:
            self.close_session(session)
    
    def get_articles_by_timerange(self, start_date: datetime, end_date: datetime) -> List[NewsArticle]:
        """Get articles within time range"""
        session = self.get_session()
        try:
            return session.query(NewsArticle).filter(
                NewsArticle.published_date >= start_date,
                NewsArticle.published_date <= end_date
            ).all()
        finally:
            self.close_session(session)
    
    def get_active_clusters(self) -> List[StoryCluster]:
        """Get all active story clusters"""
        session = self.get_session()
        try:
            return session.query(StoryCluster).filter_by(is_active=True).all()
        finally:
            self.close_session(session)
    
    def get_breaking_news_clusters(self) -> List[StoryCluster]:
        """Get breaking news clusters"""
        session = self.get_session()
        try:
            return session.query(StoryCluster).filter_by(
                is_active=True,
                is_breaking_news=True
            ).order_by(StoryCluster.importance_score.desc()).all()
        finally:
            self.close_session(session)
    
    def log_processing_job(self, job_data: Dict) -> ProcessingJob:
        """Log processing job"""
        session = self.get_session()
        try:
            job = ProcessingJob(**job_data)
            session.add(job)
            session.commit()
            return job
        finally:
            self.close_session(session)
    
    def record_metric(self, metric_name: str, value: float, component: str, unit: str = None, metadata: Dict = None):
        """Record system metric"""
        session = self.get_session()
        try:
            metric = SystemMetrics(
                metric_name=metric_name,
                metric_value=value,
                metric_unit=unit,
                component=component,
                metadata=metadata
            )
            session.add(metric)
            session.commit()
        finally:
            self.close_session(session)

def initialize_database(database_url: str = None):
    """Initialize database with required data"""
    db = DatabaseManager(database_url)
    
    # Create tables
    db.create_tables()
    
    # Add default news sources from config
    from config import NEPALI_NEWS_SOURCES
    for source_id, source_config in NEPALI_NEWS_SOURCES.items():
        source_data = {
            'id': source_id,
            'name': source_config['name'],
            'rss_url': source_config['rss_url'],
            'language': source_config['language'],
            'bias_rating': source_config['bias_rating'],
            'reliability_score': 0.8 if source_config['reliability'] == 'high' else 0.6,
            'is_active': True
        }
        db.add_news_source(source_data)
    
    print("✅ Database initialized with news sources")
    return db

def main():
    """Test database operations"""
    print("🗄️ Testing Database Layer")
    
    # Initialize database
    db = initialize_database()
    
    # Test adding an article
    article_data = {
        'url': 'https://test.com/article1',
        'source_id': 'setopati',
        'title': 'Test Article',
        'content': 'This is a test article content.',
        'published_date': datetime.now(timezone.utc),
        'word_count': 10,
        'content_hash': 'testhash123',
        'title_hash': 'titlhash123'
    }
    
    article = db.add_article(article_data)
    print(f"✅ Added article: {article.id}")
    
    # Test statistics
    session = db.get_session()
    try:
        article_count = session.query(NewsArticle).count()
        source_count = session.query(NewsSource).count()
        print(f"📊 Database contains {article_count} articles from {source_count} sources")
    finally:
        db.close_session(session)

if __name__ == "__main__":
    main()