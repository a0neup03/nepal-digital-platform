#!/usr/bin/env python3
"""
COMPREHENSIVE NEPAL NEWS COLLECTOR
Systematically implements all working sites with proven patterns
Target: 1500+ total articles across all sources
"""

import requests
from bs4 import BeautifulSoup
import sqlite3
from datetime import datetime
import time
import feedparser

class ComprehensiveNepalCollector:
    """Complete systematic collector for all Nepal news sources"""

    def __init__(self, db_path='nepal_news.db'):
        self.db_path = db_path
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })

        self.source_mapping = {
            'nagarik_news': 1,
            'setopati': 2,
            'ratopati': 3,
            'kantipur': 4,
            'onlinekhabar': 5,
            'bbc_nepali': 6
        }

        self.existing_urls = self.load_existing_urls()

    def load_existing_urls(self):
        """Load existing URLs"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.execute("SELECT url FROM articles")
            urls = set(row[0] for row in cursor)
            conn.close()
            return urls
        except:
            return set()

    def collect_all_sites(self):
        """Comprehensive collection from all sites"""

        print("🇳🇵 COMPREHENSIVE NEPAL NEWS COLLECTION")
        print("=" * 70)
        print("Target: 1500+ articles across all major sources")
        print("=" * 70)

        # Collection plan with proven strategies
        collection_plan = [
            ('bbc_nepali', 50, self.collect_bbc_rss, 'RSS feeds - proven working'),
            ('nagarik_news', 400, self.collect_nagarik_pagination, 'Category pagination - proven working'),
            ('setopati', 200, self.collect_setopati_direct, 'Direct category access - testing'),
            ('ratopati', 300, self.collect_ratopati_articles, 'Article extraction - fixed method'),
            ('onlinekhabar', 150, self.collect_onlinekhabar_homepage, 'Homepage scraping - testing')
        ]

        total_collected = 0
        results = {}

        for site_name, target, collect_func, description in collection_plan:
            print(f"\n🎯 COLLECTING {site_name.upper()}")
            print(f"   Target: {target} articles")
            print(f"   Method: {description}")
            print("-" * 50)

            start_time = time.time()
            collected = collect_func(target)
            end_time = time.time()

            results[site_name] = {
                'collected': collected,
                'target': target,
                'time_taken': end_time - start_time,
                'success_rate': (collected / target) * 100 if target > 0 else 0
            }

            total_collected += collected

            print(f"   ✅ Result: {collected}/{target} articles ({results[site_name]['success_rate']:.1f}%)")

            # Brief pause between sites
            time.sleep(3)

        # Final summary
        print(f"\n🎉 COMPREHENSIVE COLLECTION COMPLETE")
        print("=" * 70)
        print(f"📈 Total articles collected: {total_collected}")

        for site, data in results.items():
            print(f"   {site:15}: {data['collected']:3}/{data['target']:3} ({data['success_rate']:5.1f}%)")

        return results

    # ==================== BBC NEPALI (RSS) ====================

    def collect_bbc_rss(self, target=50):
        """Collect from BBC Nepali RSS - proven working"""

        print("   📡 BBC Nepali RSS Collection")

        feeds = [
            'https://feeds.bbci.co.uk/nepali/rss.xml',
            'https://feeds.bbci.co.uk/nepali/news/rss.xml'
        ]

        collected = 0

        for feed_url in feeds:
            if collected >= target:
                break

            try:
                print(f"      Fetching: {feed_url}")
                feed = feedparser.parse(feed_url)

                for entry in feed.entries:
                    if collected >= target:
                        break

                    article_data = {
                        'url': entry.get('link', ''),
                        'title': entry.get('title', ''),
                        'content': BeautifulSoup(entry.get('summary', ''), 'html.parser').get_text()[:1000],
                        'published_date': entry.get('published', ''),
                        'source_site': 'bbc_nepali',
                        'source_id': self.source_mapping['bbc_nepali'],
                        'scraped_date': datetime.now().isoformat(),
                        'word_count': len(entry.get('summary', '').split()),
                        'language': 'nepali',
                        'collection_method': 'rss'
                    }

                    if article_data['url'] and article_data['url'] not in self.existing_urls:
                        if self.save_article(article_data):
                            collected += 1
                            print(f"      ✅ Saved: {article_data['title'][:50]}...")

            except Exception as e:
                print(f"      ❌ RSS error: {e}")

        return collected

    # ==================== NAGARIK NEWS (Pagination) ====================

    def collect_nagarik_pagination(self, target=400):
        """Collect from Nagarik using proven pagination method"""

        print("   📄 Nagarik News Category Pagination")

        collected = 0
        categories = ['politics', 'economy', 'sports', 'society']

        for category in categories:
            if collected >= target:
                break

            print(f"      📂 Category: {category}")

            for page in range(2, 21):  # Pages 2-20
                if collected >= target:
                    break

                url = f"https://nagariknews.nagariknetwork.com/{category}?page={page}"

                try:
                    response = self.session.get(url, timeout=10)
                    soup = BeautifulSoup(response.text, 'html.parser')

                    # Extract article links (proven method)
                    links = self.extract_nagarik_links(soup)
                    new_links = [l for l in links if l not in self.existing_urls]

                    for link in new_links[:10]:  # Max 10 per page
                        if collected >= target:
                            break

                        article_data = self.extract_nagarik_content(link)
                        if article_data and self.save_article(article_data):
                            collected += 1
                            self.existing_urls.add(link)

                    time.sleep(1)

                except Exception as e:
                    print(f"         ❌ Error page {page}: {e}")

        return collected

    def extract_nagarik_links(self, soup):
        """Extract Nagarik article links - proven method"""
        links = []

        for link in soup.find_all('a', href=True):
            href = link['href']

            if any(skip in href for skip in ['facebook', 'twitter', 'linkedin', 'share', 'author', 'tag']):
                continue

            if href.startswith('/politics/') or href.startswith('/sports/') or href.startswith('/economy/'):
                if '-' in href and '.html' in href:
                    links.append('https://nagariknews.nagariknetwork.com' + href)

        return list(set(links))

    def extract_nagarik_content(self, url):
        """Extract Nagarik content - proven method"""
        try:
            response = self.session.get(url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')

            # Title
            title = ''
            for selector in ['h1', '.entry-title', '.article-title']:
                elem = soup.select_one(selector)
                if elem and len(elem.get_text(strip=True)) > 10:
                    title = elem.get_text(strip=True)
                    break

            # Content
            content = ''
            for selector in ['.entry-content', '.article-content', '.post-content']:
                elem = soup.select_one(selector)
                if elem:
                    for tag in elem.find_all(['script', 'style']):
                        tag.decompose()
                    content = elem.get_text(strip=True, separator=' ')
                    if len(content) > 100:
                        break

            if title and content and len(content) > 50:
                return {
                    'url': url,
                    'title': title[:500],
                    'content': content[:1500],
                    'source_site': 'nagarik_news',
                    'source_id': self.source_mapping['nagarik_news'],
                    'scraped_date': datetime.now().isoformat(),
                    'word_count': len(content.split()),
                    'language': 'nepali',
                    'collection_method': 'pagination'
                }

        except:
            pass

        return None

    # ==================== SETOPATI (Direct Category) ====================

    def collect_setopati_direct(self, target=200):
        """Collect from Setopati using direct category access"""

        print("   📂 Setopati Direct Category Access")

        collected = 0
        categories = ['politics', 'social', 'sports', 'kinmel', 'literature']

        for category in categories:
            if collected >= target:
                break

            url = f"https://setopati.com/{category}"
            print(f"      📂 Category: {category}")

            try:
                response = self.session.get(url, timeout=10)
                soup = BeautifulSoup(response.text, 'html.parser')

                # Extract article links
                links = []
                for link in soup.find_all('a', href=True):
                    href = link['href']
                    if 'setopati.com' in href and '/detail/' in href and href not in self.existing_urls:
                        if not href.startswith('http'):
                            href = 'https://setopati.com' + href
                        links.append(href)

                unique_links = list(set(links))
                print(f"         Found {len(unique_links)} article links")

                for link in unique_links[:50]:  # Max 50 per category
                    if collected >= target:
                        break

                    article_data = self.extract_setopati_content(link)
                    if article_data and self.save_article(article_data):
                        collected += 1
                        print(f"         ✅ Saved: {article_data['title'][:40]}...")

                    time.sleep(0.5)

            except Exception as e:
                print(f"         ❌ Error: {e}")

        return collected

    def extract_setopati_content(self, url):
        """Extract Setopati content"""
        try:
            response = self.session.get(url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')

            # Title
            title = ''
            for selector in ['h1', '.entry-title', '.article-title', '.title']:
                elem = soup.select_one(selector)
                if elem and len(elem.get_text(strip=True)) > 10:
                    title = elem.get_text(strip=True)
                    break

            # Content
            content = ''
            for selector in ['.entry-content', '.description', '.article-content']:
                elem = soup.select_one(selector)
                if elem:
                    content = elem.get_text(strip=True, separator=' ')
                    if len(content) > 100:
                        break

            if title and content and len(content) > 50:
                return {
                    'url': url,
                    'title': title[:500],
                    'content': content[:1500],
                    'source_site': 'setopati',
                    'source_id': self.source_mapping['setopati'],
                    'scraped_date': datetime.now().isoformat(),
                    'word_count': len(content.split()),
                    'language': 'nepali',
                    'collection_method': 'direct_category'
                }

        except:
            pass

        return None

    # ==================== RATOPATI (Fixed Method) ====================

    def collect_ratopati_articles(self, target=300):
        """Collect from Ratopati using fixed article extraction"""

        print("   📰 Ratopati Article Extraction (Fixed)")

        collected = 0
        pages = [
            'https://ratopati.com/politics',
            'https://ratopati.com/politics?page=2',
            'https://ratopati.com/economy',
            'https://ratopati.com/society'
        ]

        for page_url in pages:
            if collected >= target:
                break

            try:
                response = self.session.get(page_url, timeout=10)
                soup = BeautifulSoup(response.text, 'html.parser')

                # Find actual article links (not category links)
                article_links = []
                for link in soup.find_all('a', href=True):
                    href = link['href']
                    if '/story/' in href and href not in self.existing_urls:
                        if not href.startswith('http'):
                            href = 'https://ratopati.com' + href
                        article_links.append(href)

                unique_links = list(set(article_links))

                for link in unique_links[:20]:  # Max 20 per page
                    if collected >= target:
                        break

                    article_data = self.extract_ratopati_content_fixed(link)
                    if article_data and self.save_article(article_data):
                        collected += 1

                    time.sleep(1)

            except Exception as e:
                print(f"         ❌ Error: {e}")

        return collected

    def extract_ratopati_content_fixed(self, url):
        """Extract Ratopati content using fixed method"""
        try:
            response = self.session.get(url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')

            # Title
            title = ''
            for selector in ['h1.title', '.story-title', 'h1']:
                elem = soup.select_one(selector)
                if elem:
                    title = elem.get_text(strip=True)
                    if len(title) > 10:
                        break

            # Content
            content = ''
            for selector in ['.story-content', '.article-content', '.description']:
                elem = soup.select_one(selector)
                if elem:
                    content = elem.get_text(strip=True, separator=' ')
                    if len(content) > 100:
                        break

            if title and content and len(content) > 50:
                return {
                    'url': url,
                    'title': title[:500],
                    'content': content[:1500],
                    'source_site': 'ratopati',
                    'source_id': self.source_mapping['ratopati'],
                    'scraped_date': datetime.now().isoformat(),
                    'word_count': len(content.split()),
                    'language': 'nepali',
                    'collection_method': 'article_extraction'
                }

        except:
            pass

        return None

    # ==================== ONLINEKHABAR (Homepage) ====================

    def collect_onlinekhabar_homepage(self, target=150):
        """Collect from OnlineKhabar homepage"""

        print("   🏠 OnlineKhabar Homepage Scraping")

        collected = 0
        urls_to_try = [
            'https://www.onlinekhabar.com',
            'https://english.onlinekhabar.com'
        ]

        for base_url in urls_to_try:
            if collected >= target:
                break

            try:
                response = self.session.get(base_url, timeout=10)
                soup = BeautifulSoup(response.text, 'html.parser')

                # Extract article links
                links = []
                for link in soup.find_all('a', href=True):
                    href = link['href']
                    if 'onlinekhabar.com' in href and len(href.split('/')) > 4:
                        if not href.startswith('http'):
                            href = base_url + href
                        if href not in self.existing_urls:
                            links.append(href)

                unique_links = list(set(links))[:target]

                for link in unique_links:
                    if collected >= target:
                        break

                    article_data = self.extract_onlinekhabar_content(link)
                    if article_data and self.save_article(article_data):
                        collected += 1

                    time.sleep(0.5)

            except Exception as e:
                print(f"         ❌ Error: {e}")

        return collected

    def extract_onlinekhabar_content(self, url):
        """Extract OnlineKhabar content"""
        try:
            response = self.session.get(url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')

            title = ''
            for selector in ['h1', '.entry-title', '.post-title']:
                elem = soup.select_one(selector)
                if elem and len(elem.get_text(strip=True)) > 10:
                    title = elem.get_text(strip=True)
                    break

            content = ''
            for selector in ['.entry-content', '.post-content', '.article-content']:
                elem = soup.select_one(selector)
                if elem:
                    content = elem.get_text(strip=True, separator=' ')
                    if len(content) > 100:
                        break

            if title and content and len(content) > 50:
                language = 'english' if 'english.onlinekhabar' in url else 'nepali'
                return {
                    'url': url,
                    'title': title[:500],
                    'content': content[:1500],
                    'source_site': 'onlinekhabar',
                    'source_id': self.source_mapping['onlinekhabar'],
                    'scraped_date': datetime.now().isoformat(),
                    'word_count': len(content.split()),
                    'language': language,
                    'collection_method': 'homepage_scraping'
                }

        except:
            pass

        return None

    # ==================== SAVE ARTICLE ====================

    def save_article(self, article_data):
        """Save article to database"""
        try:
            conn = sqlite3.connect(self.db_path)

            conn.execute('''
                INSERT OR IGNORE INTO articles (
                    url, title, content, source_site, source_id,
                    scraped_date, word_count, published_date, language, collection_method
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                article_data['url'],
                article_data['title'],
                article_data['content'],
                article_data['source_site'],
                article_data.get('source_id', 0),
                article_data['scraped_date'],
                article_data['word_count'],
                article_data.get('published_date', article_data['scraped_date']),
                article_data.get('language', 'unknown'),
                article_data.get('collection_method', 'unknown')
            ))

            conn.commit()
            conn.close()

            self.existing_urls.add(article_data['url'])
            return True

        except Exception as e:
            return False

if __name__ == "__main__":
    collector = ComprehensiveNepalCollector()
    collector.collect_all_sites()