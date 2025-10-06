#!/usr/bin/env python3
"""
Debug clustering issue in trending stories
"""

def debug_clustering():
    """Debug the clustering algorithm issue"""
    print("🔍 Debugging Clustering Algorithm Issue...")

    import sqlite3
    import pandas as pd
    from datetime import datetime, timedelta
    import numpy as np

    db_path = 'nepal_news_intelligence.db'
    conn = sqlite3.connect(db_path)

    cutoff_time = datetime.now() - timedelta(hours=24)

    query = """
        SELECT id, title, content, scraped_date, source_site
        FROM articles_enhanced
        WHERE scraped_date >= ?
        ORDER BY scraped_date DESC
        LIMIT 1000
    """

    df = pd.read_sql_query(query, conn, params=(cutoff_time.isoformat(),))
    conn.close()

    print(f"📊 Raw articles: {len(df)}")

    if df.empty:
        print("❌ No articles found")
        return

    # Apply title validation
    from realtime_analytics_engine import NewsIntelligenceEngine
    analytics_engine = NewsIntelligenceEngine(db_path)

    df_filtered = df[df['title'].apply(analytics_engine.is_valid_news_title)].copy()
    print(f"📊 After validation: {len(df_filtered)}")

    if df_filtered.empty:
        print("❌ No articles after validation")
        return

    # Test TF-IDF vectorization
    df_filtered['combined_text'] = df_filtered['title'].fillna('') + ' ' + df_filtered['content'].fillna('')

    print("\n🔤 Testing TF-IDF Vectorization...")
    from sklearn.feature_extraction.text import TfidfVectorizer

    try:
        vectorizer = TfidfVectorizer(
            max_features=1000,
            stop_words='english',
            ngram_range=(1, 2),
            min_df=1,
            max_df=0.95
        )

        tfidf_matrix = vectorizer.fit_transform(df_filtered['combined_text'])
        print(f"✅ TF-IDF matrix shape: {tfidf_matrix.shape}")

        # Test cosine similarity
        print("\n📐 Testing Cosine Similarity...")
        from sklearn.metrics.pairwise import cosine_similarity

        similarity_matrix = cosine_similarity(tfidf_matrix)
        print(f"✅ Similarity matrix shape: {similarity_matrix.shape}")
        print(f"📊 Similarity range: {similarity_matrix.min():.3f} to {similarity_matrix.max():.3f}")

        # Test distance matrix
        print("\n🎯 Testing Distance Matrix...")
        distance_matrix = 1 - similarity_matrix
        print(f"📊 Distance range: {distance_matrix.min():.3f} to {distance_matrix.max():.3f}")

        if distance_matrix.min() < 0:
            print(f"❌ PROBLEM: Negative distances found! Min: {distance_matrix.min()}")
            negative_count = np.sum(distance_matrix < 0)
            total_count = distance_matrix.size
            print(f"   Negative values: {negative_count}/{total_count}")
        else:
            print("✅ Distance matrix is valid (no negative values)")

        # Test DBSCAN clustering
        print("\n🔍 Testing DBSCAN Clustering...")
        from sklearn.cluster import DBSCAN

        min_samples = max(2, len(df_filtered) // 20)
        eps = 0.3 + (len(df_filtered) / 1000) * 0.1
        print(f"📊 DBSCAN parameters: eps={eps:.3f}, min_samples={min_samples}")

        try:
            clustering = DBSCAN(eps=eps, min_samples=min_samples, metric='precomputed')
            cluster_labels = clustering.fit_predict(distance_matrix)

            unique_clusters = set(cluster_labels[cluster_labels != -1])
            noise_points = np.sum(cluster_labels == -1)

            print(f"✅ DBSCAN completed successfully!")
            print(f"📊 Found {len(unique_clusters)} clusters, {noise_points} noise points")

        except Exception as e:
            print(f"❌ DBSCAN failed: {e}")
            print("🔧 Trying to fix distance matrix...")

            # Fix negative values by clipping
            distance_matrix_fixed = np.clip(distance_matrix, 0, None)
            print(f"📊 Fixed distance range: {distance_matrix_fixed.min():.3f} to {distance_matrix_fixed.max():.3f}")

            try:
                clustering = DBSCAN(eps=eps, min_samples=min_samples, metric='precomputed')
                cluster_labels = clustering.fit_predict(distance_matrix_fixed)
                print("✅ DBSCAN with fixed matrix succeeded!")
            except Exception as e2:
                print(f"❌ Still failed: {e2}")

    except Exception as e:
        print(f"❌ Vectorization failed: {e}")

if __name__ == "__main__":
    debug_clustering()