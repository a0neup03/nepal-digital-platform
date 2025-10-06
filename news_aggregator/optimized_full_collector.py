#!/usr/bin/env python3
"""
OPTIMIZED FULL CONTENT COLLECTOR
Goal: Get complete articles with speed optimizations
Strategy: Full content + batch processing + smart timeouts + parallel processing
"""

import requests
from bs4 import BeautifulSoup
import sqlite3
from datetime import datetime
import time
import hashlib
import concurrent.futures
from threading import Lock

class OptimizedFullCollector:
    """Full content collector with speed optimizations"""

    def __init__(self, db_path='nepal_news.db'):
        self.db_path = db_path
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
        self.existing_urls = self.load_existing_urls()
        self.db_lock = Lock()

    def load_existing_urls(self):
        """Load existing URLs for deduplication"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.execute("SELECT url FROM articles")
            urls = set(row[0] for row in cursor)
            conn.close()
            return urls
        except:
            return set()

    def save_article_thread_safe(self, article_data):
        """Thread-safe article saving"""
        try:
            with self.db_lock:
                conn = sqlite3.connect(self.db_path)
                cursor = conn.execute('''
                    INSERT INTO articles (
                        url, source_id, title, content, author,
                        published_date, collected_date, language,
                        word_count, content_hash, title_hash,
                        source_site, category, scraped_date,
                        collection_method, quality_score, framework_version
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    article_data['url'],
                    str(article_data.get('source_id', 13)),
                    article_data['title'],
                    article_data['content'],
                    article_data.get('author', ''),
                    article_data.get('published_date', article_data['scraped_date']),
                    article_data['scraped_date'],
                    article_data.get('language', 'nepali'),
                    article_data['word_count'],
                    hashlib.md5(article_data['content'].encode()).hexdigest(),
                    hashlib.md5(article_data['title'].encode()).hexdigest(),
                    article_data['source_site'],
                    article_data.get('category', ''),
                    article_data['scraped_date'],
                    article_data.get('collection_method', 'optimized_full'),
                    article_data.get('quality_score', 0.9),
                    article_data.get('framework_version', '1.0')
                ))
                conn.commit()
                conn.close()
                self.existing_urls.add(article_data['url'])
                return True
        except Exception as e:
            return False

    def extract_full_content_optimized(self, url, source_site):
        """Optimized full content extraction"""
        try:
            # Faster timeout but still get full content
            response = self.session.get(url, timeout=8)
            if response.status_code != 200:
                return None

            soup = BeautifulSoup(response.text, 'html.parser')

            # Optimized title extraction - try multiple selectors efficiently
            title = ''
            title_selectors = ['h1', '.entry-title', '.post-title', '.article-title', '.news-title', '.title', '.headline']

            for selector in title_selectors:
                elem = soup.select_one(selector)
                if elem:
                    title = elem.get_text(strip=True)
                    if len(title) > 10:
                        break

            # Optimized full content extraction
            content = ''

            # Try comprehensive content selectors
            content_selectors = [
                '.entry-content', '.post-content', '.article-content', '.content',
                '.description', '.story-content', '.news-content', '.article-body',
                '.post-body', '.news-body', '.story', '.article'
            ]

            for selector in content_selectors:
                elem = soup.select_one(selector)
                if elem:
                    # Remove unwanted elements efficiently
                    for unwanted in elem.select('script, style, nav, aside, footer, header, .advertisement, .ad, .social-share'):
                        unwanted.decompose()

                    content = elem.get_text(strip=True, separator=' ')
                    if len(content) > 200:  # Good content threshold
                        break

            # Enhanced fallback - get all paragraphs if no content section found
            if not content or len(content) < 200:
                paragraphs = soup.find_all('p')
                content_parts = []

                for p in paragraphs:
                    p_text = p.get_text(strip=True)
                    if len(p_text) > 20:  # Filter out short/nav paragraphs
                        content_parts.append(p_text)

                content = ' '.join(content_parts)

            # Try article schema if still no good content
            if not content or len(content) < 100:
                article_tag = soup.find('article')
                if article_tag:
                    content = article_tag.get_text(strip=True, separator=' ')

            # Quality checks
            if not title or len(title) < 5:
                return None
            if not content or len(content) < 50:
                return None

            # Clean up extra whitespace
            content = ' '.join(content.split())

            return {
                'url': url,
                'title': title[:500],
                'content': content[:3000],  # Full content but with reasonable limit
                'source_site': source_site,
                'source_id': 13,
                'scraped_date': datetime.now().isoformat(),
                'word_count': len(content.split()),
                'language': 'nepali',
                'collection_method': 'optimized_full',
                'quality_score': 0.95 if len(content) > 500 else 0.85,
                'category': 'news'
            }

        except Exception as e:
            return None

    def parallel_collect_from_source(self, source_name, base_url, categories, target=50):
        """Parallel collection from a single source"""
        print(f"\n🚀 OPTIMIZED FULL: {source_name} (Target: {target})")
        print("=" * 50)

        # Fast link discovery
        all_links = []
        print("📋 Link discovery...")

        for category in categories:
            category_url = f"{base_url}/{category}"
            try:
                response = self.session.get(category_url, timeout=8)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, 'html.parser')

                    # Fast link extraction
                    for link in soup.find_all('a', href=True):
                        href = link['href']
                        if href.startswith('/'):
                            href = base_url + href

                        # Article pattern matching
                        if base_url in href and any(pattern in href for pattern in [
                            '/news/', '/story/', '/article/', '/2025/', '/2024/', category
                        ]):
                            if href.count('/') >= 4 and len(href) > 40:
                                all_links.append(href)

                print(f"   {category}: {len([l for l in all_links if category in l])} links")
                time.sleep(0.2)

            except Exception as e:
                print(f"   {category}: Error - {e}")

        # Filter new links
        unique_links = list(set(all_links))
        new_links = [url for url in unique_links if url not in self.existing_urls][:target]

        print(f"📊 Total unique: {len(unique_links)}, New: {len(new_links)}")

        if not new_links:
            return 0

        # Parallel processing with thread pool
        print("⚡ Parallel processing...")
        collected = 0

        def process_article(url):
            article_data = self.extract_full_content_optimized(url, source_name)
            if article_data and self.save_article_thread_safe(article_data):
                return 1
            return 0

        # Use ThreadPoolExecutor for parallel processing
        with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
            # Submit all tasks
            future_to_url = {executor.submit(process_article, url): url for url in new_links}

            # Collect results as they complete
            for i, future in enumerate(concurrent.futures.as_completed(future_to_url)):
                try:
                    result = future.result()
                    collected += result
                    if result:
                        print(f"   ✅ {collected}: {future_to_url[future][-30:]}")

                    # Progress indicator
                    if (i + 1) % 10 == 0:
                        print(f"   📊 Progress: {i+1}/{len(new_links)} processed, {collected} saved")

                except Exception as e:
                    print(f"   ❌ Error processing: {e}")

        print(f"📊 {source_name}: {collected}/{target} articles collected")
        return collected

    def run_optimized_full_session(self, target_articles=200):
        """Run optimized full content collection session"""
        print("🚀 OPTIMIZED FULL CONTENT COLLECTION")
        print("=" * 60)
        print("Strategy: Complete articles + parallel processing + optimized extraction")

        start_time = time.time()

        # Current status
        conn = sqlite3.connect(self.db_path)
        cursor = conn.execute('SELECT COUNT(*) FROM articles')
        initial_count = cursor.fetchone()[0]
        conn.close()

        print(f"📊 Starting: {initial_count} articles")
        print(f"🎯 Target: +{target_articles} articles")

        # High-potential sources
        sources = [
            ('ratopati', 'https://ratopati.com', ['politics', 'news', 'business', 'sports']),
            ('setopati', 'https://setopati.com', ['politics', 'news', 'business', 'sports']),
            ('onlinekhabar', 'https://onlinekhabar.com', ['news', 'politics', 'sports', 'business']),
            ('kantipurtv', 'https://kantipurtv.com', ['news', 'politics', 'sports']),
            ('pahilopost', 'https://pahilopost.com', ['news', 'politics', 'sports']),
        ]

        results = {}
        total_collected = 0

        for source_name, base_url, categories in sources:
            if total_collected >= target_articles:
                break

            collected = self.parallel_collect_from_source(
                source_name, base_url, categories,
                min(50, target_articles - total_collected)
            )
            results[source_name] = collected
            total_collected += collected

            # Time and progress check
            elapsed = time.time() - start_time
            rate = total_collected / elapsed if elapsed > 0 else 0
            print(f"⏱️ Elapsed: {elapsed:.1f}s | Rate: {rate:.1f} articles/sec")

            if elapsed > 100:  # Stop before timeout
                print("⏱️ Approaching timeout, stopping...")
                break

        # Final status
        conn = sqlite3.connect(self.db_path)
        cursor = conn.execute('SELECT COUNT(*) FROM articles')
        final_count = cursor.fetchone()[0]

        cursor = conn.execute('''
            SELECT source_site, COUNT(*), AVG(word_count) FROM articles
            GROUP BY source_site ORDER BY COUNT(*) DESC
        ''')
        sources_stats = cursor.fetchall()
        conn.close()

        elapsed_total = time.time() - start_time
        actual_collected = final_count - initial_count

        print(f"\n🚀 OPTIMIZED FULL COLLECTION COMPLETE")
        print("=" * 60)
        print(f"Time elapsed: {elapsed_total:.1f} seconds")
        print(f"Articles collected: {actual_collected}")
        print(f"Collection rate: {actual_collected/elapsed_total:.1f} articles/second")
        print(f"Database total: {final_count}")

        print(f"\nSource breakdown (with avg words):")
        for source, count, avg_words in sources_stats[:12]:
            print(f"  {source}: {count} articles ({avg_words:.0f} avg words)")

        print(f"\nSession results:")
        for source, collected in results.items():
            if collected > 0:
                print(f"  {source}: +{collected} articles")

        return {
            'collected': actual_collected,
            'final_count': final_count,
            'time_elapsed': elapsed_total,
            'rate': actual_collected/elapsed_total if elapsed_total > 0 else 0
        }

if __name__ == "__main__":
    collector = OptimizedFullCollector()
    result = collector.run_optimized_full_session(150)

    print(f"\n🎯 OPTIMIZED FULL RESULTS")
    print(f"Articles collected: {result['collected']}")
    print(f"Total in database: {result['final_count']}")
    print(f"Collection rate: {result['rate']:.1f} articles/second")

    # Compare with minimal method
    if result['rate'] > 1.0:
        print("🎉 EXCELLENT: Full content with good speed!")
    elif result['rate'] > 0.5:
        print("✅ GOOD: Acceptable speed for full content")
    else:
        print("⚠️ SLOW: May need further optimization")