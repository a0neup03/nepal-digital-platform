#!/usr/bin/env python3
"""
Fast Duplicate Detection using MinHash LSH
Replaces O(n²) comparison with O(n) LSH approach for massive performance improvement
"""

import sqlite3
import hashlib
import re
import time
from typing import List, Dict, Set, Tuple
from collections import defaultdict
import logging
import random

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MinHashLSH:
    """Fast duplicate detection using MinHash Locality Sensitive Hashing"""

    def __init__(self, num_perm: int = 128, threshold: float = 0.6, num_bands: int = 16):
        """
        Initialize MinHash LSH

        Args:
            num_perm: Number of hash permutations (signature length)
            threshold: Similarity threshold for duplicates
            num_bands: Number of bands for LSH (affects precision/recall)
        """
        self.num_perm = num_perm
        self.threshold = threshold
        self.num_bands = num_bands
        self.rows_per_band = num_perm // num_bands

        # Generate random hash functions
        self.hash_functions = []
        for _ in range(num_perm):
            a = random.randint(1, 2**32 - 1)
            b = random.randint(0, 2**32 - 1)
            self.hash_functions.append((a, b))

        # LSH buckets
        self.lsh_buckets = defaultdict(set)

        logger.info(f"MinHash LSH initialized: {num_perm} perms, {num_bands} bands, threshold {threshold}")

    def shingle_text(self, text: str, k: int = 3) -> Set[str]:
        """Create k-shingles from text"""
        if not text:
            return set()

        # Clean and normalize text
        text = re.sub(r'[^\w\s]', ' ', text.lower())
        words = text.split()

        if len(words) < k:
            return {' '.join(words)}

        shingles = set()
        for i in range(len(words) - k + 1):
            shingle = ' '.join(words[i:i+k])
            shingles.add(shingle)

        return shingles

    def compute_minhash(self, shingles: Set[str]) -> List[int]:
        """Compute MinHash signature for a set of shingles"""
        if not shingles:
            return [float('inf')] * self.num_perm

        signature = [float('inf')] * self.num_perm

        for shingle in shingles:
            # Hash the shingle to get a base hash value
            shingle_hash = hash(shingle) % (2**32)

            # Apply each hash function
            for i, (a, b) in enumerate(self.hash_functions):
                hash_val = (a * shingle_hash + b) % (2**32)
                signature[i] = min(signature[i], hash_val)

        return signature

    def add_to_lsh(self, doc_id: int, signature: List[int]):
        """Add document signature to LSH buckets"""
        for band_idx in range(self.num_bands):
            start = band_idx * self.rows_per_band
            end = start + self.rows_per_band

            # Create band signature
            band_sig = tuple(signature[start:end])

            # Hash the band signature to create bucket key
            bucket_key = hash(band_sig) % (2**20)  # Use large bucket space

            self.lsh_buckets[bucket_key].add(doc_id)

    def get_candidate_pairs(self) -> Set[Tuple[int, int]]:
        """Get candidate pairs from LSH buckets"""
        candidate_pairs = set()

        for bucket in self.lsh_buckets.values():
            if len(bucket) > 1:
                bucket_list = list(bucket)
                for i in range(len(bucket_list)):
                    for j in range(i + 1, len(bucket_list)):
                        doc1, doc2 = bucket_list[i], bucket_list[j]
                        pair = (min(doc1, doc2), max(doc1, doc2))
                        candidate_pairs.add(pair)

        return candidate_pairs

    def jaccard_similarity(self, sig1: List[int], sig2: List[int]) -> float:
        """Estimate Jaccard similarity from MinHash signatures"""
        if len(sig1) != len(sig2):
            return 0.0

        matches = sum(1 for a, b in zip(sig1, sig2) if a == b)
        return matches / len(sig1)

class FastDuplicateDetector:
    """Fast duplicate detection for Nepal news articles"""

    def __init__(self, db_path: str = "nepal_news_consolidated.db"):
        self.db_path = db_path
        self.minhash_lsh = MinHashLSH(num_perm=128, threshold=0.6, num_bands=16)

    def extract_articles(self) -> List[Dict]:
        """Extract articles from database for duplicate detection"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()

            cursor.execute("""
                SELECT id, url, title, content, source_site
                FROM articles_consolidated
                WHERE is_duplicate = FALSE
                ORDER BY id
            """)

            articles = []
            for row in cursor.fetchall():
                articles.append({
                    'id': row[0],
                    'url': row[1],
                    'title': row[2] or '',
                    'content': row[3] or '',
                    'source_site': row[4] or ''
                })

            conn.close()
            logger.info(f"Extracted {len(articles)} articles for duplicate detection")
            return articles

        except Exception as e:
            logger.error(f"Failed to extract articles: {e}")
            return []

    def preprocess_articles(self, articles: List[Dict]) -> Dict[int, List[int]]:
        """Preprocess articles and compute MinHash signatures"""
        signatures = {}

        logger.info("Computing MinHash signatures...")
        start_time = time.time()

        for i, article in enumerate(articles):
            if i % 100 == 0:
                logger.info(f"Processed {i}/{len(articles)} articles")

            # Combine title and content for similarity
            text = f"{article['title']} {article['content']}"

            # Create shingles
            shingles = self.minhash_lsh.shingle_text(text, k=3)

            # Compute MinHash signature
            signature = self.minhash_lsh.compute_minhash(shingles)
            signatures[article['id']] = signature

            # Add to LSH
            self.minhash_lsh.add_to_lsh(article['id'], signature)

        elapsed = time.time() - start_time
        logger.info(f"MinHash computation completed in {elapsed:.2f} seconds")

        return signatures

    def detect_duplicates_fast(self) -> List[Tuple[int, int, float]]:
        """Fast duplicate detection using LSH"""
        articles = self.extract_articles()
        if not articles:
            return []

        # Preprocess and build LSH index
        signatures = self.preprocess_articles(articles)

        # Get candidate pairs from LSH
        logger.info("Getting candidate pairs from LSH...")
        candidate_pairs = self.minhash_lsh.get_candidate_pairs()
        logger.info(f"Found {len(candidate_pairs)} candidate pairs (vs {len(articles)*(len(articles)-1)//2} total pairs)")

        # Verify candidates with actual similarity calculation
        logger.info("Verifying candidate pairs...")
        duplicates = []

        for doc1_id, doc2_id in candidate_pairs:
            sig1 = signatures[doc1_id]
            sig2 = signatures[doc2_id]

            similarity = self.minhash_lsh.jaccard_similarity(sig1, sig2)

            if similarity >= self.minhash_lsh.threshold:
                duplicates.append((doc1_id, doc2_id, similarity))

        # Sort by similarity (highest first)
        duplicates.sort(key=lambda x: x[2], reverse=True)

        logger.info(f"Found {len(duplicates)} duplicate pairs")
        return duplicates

    def save_duplicates(self, duplicates: List[Tuple[int, int, float]]):
        """Save detected duplicates to database"""
        if not duplicates:
            logger.info("No duplicates to save")
            return

        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()

            # Clear existing duplicate detections (from fast method)
            cursor.execute("DELETE FROM duplicate_detection WHERE detection_method = 'lsh'")

            for doc1_id, doc2_id, similarity in duplicates:
                cursor.execute("""
                    INSERT INTO duplicate_detection (
                        article1_id, article2_id, overall_similarity,
                        duplicate_type, detection_method, is_confirmed
                    ) VALUES (?, ?, ?, ?, ?, ?)
                """, (
                    doc1_id, doc2_id, similarity,
                    'identical' if similarity > 0.9 else 'near_duplicate',
                    'lsh', True
                ))

            # Mark articles as duplicates (keep higher quality as master)
            duplicate_groups = self.group_duplicates(duplicates)

            for group in duplicate_groups:
                # Choose master (for now, just pick first one - could enhance with quality scoring)
                master_id = min(group)

                for article_id in group:
                    if article_id != master_id:
                        cursor.execute("""
                            UPDATE articles_consolidated
                            SET is_duplicate = TRUE, master_article_id = ?
                            WHERE id = ?
                        """, (master_id, article_id))

            conn.commit()
            conn.close()

            logger.info(f"Saved {len(duplicates)} duplicate relationships")

        except Exception as e:
            logger.error(f"Failed to save duplicates: {e}")

    def group_duplicates(self, duplicates: List[Tuple[int, int, float]]) -> List[Set[int]]:
        """Group duplicate pairs into connected components"""
        # Build adjacency list
        graph = defaultdict(set)
        for doc1, doc2, _ in duplicates:
            graph[doc1].add(doc2)
            graph[doc2].add(doc1)

        # Find connected components
        visited = set()
        groups = []

        for node in graph:
            if node not in visited:
                # DFS to find connected component
                component = set()
                stack = [node]

                while stack:
                    current = stack.pop()
                    if current not in visited:
                        visited.add(current)
                        component.add(current)
                        stack.extend(graph[current] - visited)

                if len(component) > 1:
                    groups.append(component)

        return groups

    def generate_report(self) -> Dict:
        """Generate duplicate detection report"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()

            # Overall stats
            cursor.execute("SELECT COUNT(*) FROM articles_consolidated")
            total_articles = cursor.fetchone()[0]

            cursor.execute("SELECT COUNT(*) FROM articles_consolidated WHERE is_duplicate = TRUE")
            duplicate_articles = cursor.fetchone()[0]

            cursor.execute("SELECT COUNT(*) FROM duplicate_detection WHERE detection_method = 'lsh'")
            duplicate_pairs = cursor.fetchone()[0]

            # Source breakdown
            cursor.execute("""
                SELECT source_site,
                       COUNT(*) as total,
                       COUNT(CASE WHEN is_duplicate = TRUE THEN 1 END) as duplicates
                FROM articles_consolidated
                GROUP BY source_site
                ORDER BY duplicates DESC
            """)
            source_stats = cursor.fetchall()

            conn.close()

            return {
                'total_articles': total_articles,
                'duplicate_articles': duplicate_articles,
                'duplicate_pairs': duplicate_pairs,
                'duplicate_rate': (duplicate_articles / total_articles * 100) if total_articles > 0 else 0,
                'source_breakdown': [
                    {'source': row[0], 'total': row[1], 'duplicates': row[2]}
                    for row in source_stats
                ]
            }

        except Exception as e:
            logger.error(f"Failed to generate report: {e}")
            return {}

def main():
    """Main execution function"""
    logger.info("🚀 Starting Fast Duplicate Detection with MinHash LSH")

    detector = FastDuplicateDetector()

    # Run fast duplicate detection
    start_time = time.time()
    duplicates = detector.detect_duplicates_fast()
    detection_time = time.time() - start_time

    # Save results
    detector.save_duplicates(duplicates)

    # Generate report
    report = detector.generate_report()

    # Display results
    print("\n" + "="*60)
    print("⚡ FAST DUPLICATE DETECTION COMPLETED")
    print("="*60)
    print(f"⏱️  Detection Time: {detection_time:.2f} seconds")
    print(f"📊 Total Articles: {report.get('total_articles', 0)}")
    print(f"🔍 Duplicate Articles: {report.get('duplicate_articles', 0)}")
    print(f"🔗 Duplicate Pairs: {report.get('duplicate_pairs', 0)}")
    print(f"📈 Duplicate Rate: {report.get('duplicate_rate', 0):.1f}%")

    print("\n📋 Source Breakdown:")
    for source_stat in report.get('source_breakdown', [])[:10]:
        print(f"  {source_stat['source']}: {source_stat['duplicates']}/{source_stat['total']} duplicates")

    print(f"\n✅ Fast duplicate detection completed using MinHash LSH!")
    print(f"⚡ Performance: ~{len(duplicates)*100/detection_time:.0f} pairs/second")

if __name__ == "__main__":
    main()