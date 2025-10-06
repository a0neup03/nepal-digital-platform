#!/usr/bin/env python3
"""
EXTENDED SOURCE AVAILABILITY TESTER
Test sources from both nepal_working_platform and ratenepal configurations
Goal: Find maximum working sources from both systems
"""

import sys
import os
sys.path.append('/Users/muna/Documents/Aryan/aryan_try/ratenepal/nepal_news_aggregator')

import requests
from bs4 import BeautifulSoup
import time
import json
import sqlite3
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass, asdict
import logging
import concurrent.futures
from threading import Lock

# Import both configurations
from nepal_news_intelligence_config import NEPAL_NEWS_SOURCES
try:
    from nepal_config import SOURCES as RATENEPAL_SOURCES
except ImportError:
    RATENEPAL_SOURCES = {}

@dataclass
class ExtendedSourceTestResult:
    """Extended result for comprehensive testing"""
    source_name: str
    source_config: str  # 'nepal_working_platform' or 'ratenepal'
    website_url: str
    status: str  # 'working', 'limited', 'broken', 'error'
    response_time: float
    articles_found: int
    article_samples: List[Dict]
    error_message: str
    content_selectors_working: List[str]
    link_patterns: List[str]
    tested_at: datetime
    recommendations: List[str]
    collection_strategy: str  # 'direct', 'pagination', 'api', 'archive'

class ExtendedSourceTester:
    """Test sources from multiple configuration systems"""

    def __init__(self, db_path='nepal_news_intelligence.db'):
        self.db_path = db_path
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        })
        self.db_lock = Lock()
        self.setup_logging()

    def setup_logging(self):
        """Setup logging for test results"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('extended_source_testing.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)

    def combine_source_configs(self) -> Dict:
        """Combine sources from both configuration systems"""
        combined_sources = {}

        # Add nepal_working_platform sources
        for source in NEPAL_NEWS_SOURCES:
            combined_sources[f"nwp_{source.name.lower().replace(' ', '_').replace('/', '_')}"] = {
                'name': source.name,
                'url': source.website_url,
                'config_source': 'nepal_working_platform',
                'strategy': 'direct',
                'selectors': ['.entry-content', '.post-content', '.article-content', '.content', 'article'],
                'title_selectors': ['h1', '.entry-title', '.article-title']
            }

        # Add ratenepal sources
        for source_id, config in RATENEPAL_SOURCES.items():
            # Extract base URL from pagination pattern if available
            url = config.get('pagination_pattern', '').split('/{')[0] if config.get('pagination_pattern') else f"https://{source_id}.com"

            # Map to actual working URLs
            url_mapping = {
                'nagarik_news': 'https://nagariknews.nagariknetwork.com',
                'kathmandu_post': 'https://kathmandupost.com',
                'onlinekhabar_english': 'https://english.onlinekhabar.com',
                'kantipur': 'https://kantipur.com',
                'setopati': 'https://setopati.com',
                'ratopati': 'https://ratopati.com'
            }

            combined_sources[f"rn_{source_id}"] = {
                'name': source_id.replace('_', ' ').title(),
                'url': url_mapping.get(source_id, url),
                'config_source': 'ratenepal',
                'strategy': config.get('strategy', 'direct'),
                'selectors': config.get('content_selectors', ['.entry-content']),
                'title_selectors': config.get('title_selectors', ['h1']),
                'categories': config.get('categories', []),
                'pagination_pattern': config.get('pagination_pattern', ''),
                'rate_limit': config.get('rate_limit', 1.0)
            }

        return combined_sources

    def test_source_with_strategy(self, source_id: str, config: Dict, timeout: int = 10) -> ExtendedSourceTestResult:
        """Test source using its specific strategy"""
        start_time = time.time()

        try:
            self.logger.info(f"Testing {source_id}: {config['name']} ({config['url']})")

            # Test basic accessibility first
            response = self.session.get(config['url'], timeout=timeout)
            base_response_time = time.time() - start_time

            if response.status_code != 200:
                return ExtendedSourceTestResult(
                    source_name=config['name'],
                    source_config=config['config_source'],
                    website_url=config['url'],
                    status='broken',
                    response_time=base_response_time,
                    articles_found=0,
                    article_samples=[],
                    error_message=f"HTTP {response.status_code}",
                    content_selectors_working=[],
                    link_patterns=[],
                    tested_at=datetime.now(),
                    recommendations=[f"Site returned HTTP {response.status_code}"],
                    collection_strategy=config['strategy']
                )

            # Test specific strategy
            if config['strategy'] == 'CATEGORY_PAGINATION':
                articles_found, samples, working_selectors = self.test_pagination_strategy(config)
            elif config['strategy'] == 'API_OFFSET':
                articles_found, samples, working_selectors = self.test_api_strategy(config)
            elif config['strategy'] == 'ARCHIVE_DIVING':
                articles_found, samples, working_selectors = self.test_archive_strategy(config)
            else:
                # Default direct strategy
                soup = BeautifulSoup(response.content, 'html.parser')
                articles_found, samples, working_selectors, _ = self.analyze_content_structure(soup, config)

            total_response_time = time.time() - start_time

            # Determine status
            if articles_found >= 5:
                status = 'working'
                recommendations = [f"Source fully functional with {config['strategy']} strategy", "Ready for production"]
            elif articles_found >= 2:
                status = 'limited'
                recommendations = [f"Partial success with {config['strategy']}", "Needs optimization"]
            else:
                status = 'broken'
                recommendations = [f"Strategy {config['strategy']} failed", "Needs investigation"]

            return ExtendedSourceTestResult(
                source_name=config['name'],
                source_config=config['config_source'],
                website_url=config['url'],
                status=status,
                response_time=total_response_time,
                articles_found=articles_found,
                article_samples=samples,
                error_message='',
                content_selectors_working=working_selectors,
                link_patterns=[],
                tested_at=datetime.now(),
                recommendations=recommendations,
                collection_strategy=config['strategy']
            )

        except Exception as e:
            return ExtendedSourceTestResult(
                source_name=config['name'],
                source_config=config['config_source'],
                website_url=config['url'],
                status='error',
                response_time=time.time() - start_time,
                articles_found=0,
                article_samples=[],
                error_message=str(e),
                content_selectors_working=[],
                link_patterns=[],
                tested_at=datetime.now(),
                recommendations=[f'Error: {str(e)}'],
                collection_strategy=config['strategy']
            )

    def test_pagination_strategy(self, config: Dict) -> Tuple[int, List[Dict], List[str]]:
        """Test category pagination strategy"""
        articles_found = 0
        samples = []
        working_selectors = []

        try:
            # Test first category and first few pages
            category = config.get('categories', ['politics'])[0]
            for page in range(1, 4):  # Test first 3 pages
                if 'pagination_pattern' in config:
                    url = config['pagination_pattern'].format(category=category, page=page)
                    response = self.session.get(url, timeout=8)
                    if response.status_code == 200:
                        soup = BeautifulSoup(response.content, 'html.parser')

                        # Find article links
                        links = soup.find_all('a', href=True)
                        article_links = []

                        for link in links:
                            href = link.get('href', '')
                            title = link.get_text(strip=True)
                            if href and title and len(title) > 10:
                                if any(pattern in href.lower() for pattern in ['/news/', '/article/', '/story/', '2024', '2025']):
                                    article_links.append({'url': href, 'title': title})

                        articles_found += len(article_links)

                        # Test content extraction on first few articles
                        for article_link in article_links[:2]:
                            url = article_link['url']
                            if not url.startswith('http'):
                                url = config['url'].rstrip('/') + '/' + url.lstrip('/')

                            try:
                                article_response = self.session.get(url, timeout=5)
                                if article_response.status_code == 200:
                                    article_soup = BeautifulSoup(article_response.content, 'html.parser')

                                    for selector in config.get('selectors', ['.entry-content']):
                                        content_elem = article_soup.select_one(selector)
                                        if content_elem:
                                            content = content_elem.get_text(strip=True)
                                            if len(content) > 100:
                                                if selector not in working_selectors:
                                                    working_selectors.append(selector)
                                                samples.append({
                                                    'url': url,
                                                    'title': article_link['title'],
                                                    'content_preview': content[:200] + '...',
                                                    'selector': selector
                                                })
                                                break
                            except:
                                continue

                        if articles_found >= 10:  # Enough for testing
                            break

        except Exception as e:
            self.logger.error(f"Pagination strategy failed: {e}")

        return articles_found, samples[:5], working_selectors

    def test_api_strategy(self, config: Dict) -> Tuple[int, List[Dict], List[str]]:
        """Test API-based collection strategy"""
        articles_found = 0
        samples = []
        working_selectors = []

        try:
            endpoints = config.get('api_endpoints', [])
            for endpoint in endpoints[:1]:  # Test first endpoint
                for offset in range(0, 100, 50):  # Test first few offsets
                    url = endpoint.format(offset=offset)
                    response = self.session.get(url, timeout=8)
                    if response.status_code == 200:
                        try:
                            data = response.json()
                            if isinstance(data, list):
                                articles_found += len(data)
                                for item in data[:3]:
                                    if 'link' in item or 'url' in item:
                                        samples.append({
                                            'url': item.get('link', item.get('url', '')),
                                            'title': item.get('title', {}).get('rendered', item.get('title', 'No title')),
                                            'content_preview': 'API endpoint working',
                                            'selector': 'api'
                                        })
                                        working_selectors.append('api')
                        except:
                            continue

                    if articles_found >= 10:
                        break

        except Exception as e:
            self.logger.error(f"API strategy failed: {e}")

        return articles_found, samples[:5], working_selectors

    def test_archive_strategy(self, config: Dict) -> Tuple[int, List[Dict], List[str]]:
        """Test archive diving strategy"""
        articles_found = 0
        samples = []
        working_selectors = []

        try:
            # Test recent dates
            for days_back in range(1, 8):  # Test last week
                date = datetime.now() - timedelta(days=days_back)
                if 'archive_pattern' in config:
                    url = config['archive_pattern'].format(
                        year=date.year,
                        month=date.month,
                        day=date.day
                    )
                    response = self.session.get(url, timeout=8)
                    if response.status_code == 200:
                        soup = BeautifulSoup(response.content, 'html.parser')

                        # Find article links
                        links = soup.find_all('a', href=True)
                        for link in links[:5]:  # Test first few links
                            href = link.get('href', '')
                            title = link.get_text(strip=True)
                            if href and title and len(title) > 10:
                                articles_found += 1
                                samples.append({
                                    'url': href,
                                    'title': title,
                                    'content_preview': 'Archive link found',
                                    'selector': 'archive'
                                })
                                working_selectors.append('archive')

                    if articles_found >= 10:
                        break

        except Exception as e:
            self.logger.error(f"Archive strategy failed: {e}")

        return articles_found, samples[:5], working_selectors

    def analyze_content_structure(self, soup: BeautifulSoup, config: Dict) -> Tuple[int, List[Dict], List[str], List[str]]:
        """Analyze content structure for direct strategy"""
        working_selectors = []
        article_samples = []
        found_links = []

        # Test selectors from config
        for selector in config.get('selectors', ['.entry-content']):
            try:
                elements = soup.select(selector)
                if elements and len(elements) > 0:
                    for element in elements[:3]:
                        content = element.get_text(strip=True)
                        if len(content) > 100:
                            working_selectors.append(selector)
                            break
            except:
                continue

        # Find article links
        links = soup.find_all('a', href=True)
        unique_links = []
        seen_urls = set()

        for link in links:
            href = link.get('href', '')
            title = link.get_text(strip=True)
            if href and title and len(title) > 10:
                if href not in seen_urls:
                    unique_links.append({'url': href, 'title': title})
                    seen_urls.add(href)

        return len(unique_links), unique_links[:5], working_selectors, found_links

    def test_all_extended_sources(self, max_workers: int = 3) -> List[ExtendedSourceTestResult]:
        """Test all sources from both configuration systems"""
        sources = self.combine_source_configs()
        results = []

        self.logger.info(f"Testing {len(sources)} sources from both configuration systems...")

        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
            future_to_source = {
                executor.submit(self.test_source_with_strategy, source_id, config): (source_id, config)
                for source_id, config in sources.items()
            }

            for future in concurrent.futures.as_completed(future_to_source):
                source_id, config = future_to_source[future]
                try:
                    result = future.result()
                    results.append(result)
                    self.logger.info(f"✓ {source_id}: {result.status} ({result.articles_found} articles) - {result.collection_strategy}")
                except Exception as e:
                    self.logger.error(f"✗ {source_id}: Test failed - {e}")

        return results

    def generate_extended_report(self, results: List[ExtendedSourceTestResult]) -> str:
        """Generate comprehensive report comparing both systems"""
        nwp_results = [r for r in results if r.source_config == 'nepal_working_platform']
        rn_results = [r for r in results if r.source_config == 'ratenepal']

        working = [r for r in results if r.status == 'working']
        limited = [r for r in results if r.status == 'limited']
        broken = [r for r in results if r.status == 'broken']
        errors = [r for r in results if r.status == 'error']

        report = f"""
# EXTENDED NEPAL NEWS SOURCES AVAILABILITY TEST REPORT
Test Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
Total Sources Tested: {len(results)}

## CONFIGURATION COMPARISON
📂 Nepal Working Platform Sources: {len(nwp_results)}
📂 Ratenepal Sources: {len(rn_results)}

## OVERALL SUMMARY
✅ Working Sources: {len(working)}/{len(results)} ({len(working)/len(results)*100:.1f}%)
⚠️  Limited Sources: {len(limited)}/{len(results)} ({len(limited)/len(results)*100:.1f}%)
❌ Broken Sources: {len(broken)}/{len(results)} ({len(broken)/len(results)*100:.1f}%)
🚫 Error Sources: {len(errors)}/{len(results)} ({len(errors)/len(results)*100:.1f}%)

## WORKING SOURCES BY STRATEGY
"""

        strategy_groups = {}
        for result in working:
            strategy = result.collection_strategy
            if strategy not in strategy_groups:
                strategy_groups[strategy] = []
            strategy_groups[strategy].append(result)

        for strategy, sources in strategy_groups.items():
            report += f"""
### 🚀 {strategy.upper()} Strategy ({len(sources)} sources)
"""
            for result in sources:
                report += f"""
#### ✅ {result.source_name} ({result.source_config})
- URL: {result.website_url}
- Response Time: {result.response_time:.2f}s
- Articles Found: {result.articles_found}
- Working Selectors: {', '.join(result.content_selectors_working[:3]) if result.content_selectors_working else 'N/A'}
- Status: Production Ready
"""

        # Best performing sources
        top_sources = sorted(working, key=lambda x: x.articles_found, reverse=True)[:5]
        report += f"""

## TOP 5 PERFORMING SOURCES
"""
        for i, result in enumerate(top_sources, 1):
            report += f"""
{i}. **{result.source_name}** ({result.source_config})
   - Articles Found: {result.articles_found}
   - Strategy: {result.collection_strategy}
   - Response Time: {result.response_time:.2f}s
"""

        # Configuration recommendations
        report += f"""

## IMPLEMENTATION RECOMMENDATIONS

### Immediate Integration ({len(working)} sources ready)
"""
        for result in working:
            report += f"- **{result.source_name}**: Use {result.collection_strategy} strategy\n"

        report += f"""
### Priority Implementation Order
1. **High Performance** ({len([r for r in working if r.articles_found >= 10])} sources): Ready for immediate deployment
2. **Medium Performance** ({len([r for r in working if 5 <= r.articles_found < 10])} sources): Good for secondary collection
3. **Limited Sources** ({len(limited)} sources): Need optimization but promising

### Expected Collection Improvement
- **Current**: 2-3 working sources
- **With Implementation**: {len(working)} working sources
- **Improvement**: {len(working)/3:.1f}x more sources
- **Expected Articles**: {sum(r.articles_found for r in working)} articles per collection cycle
"""

        return report

def main():
    """Run extended source availability testing"""
    print("🔍 Starting Extended Nepal News Sources Testing...")
    print("📂 Testing sources from both nepal_working_platform and ratenepal...")

    tester = ExtendedSourceTester()

    # Test all sources
    results = tester.test_all_extended_sources(max_workers=3)

    # Generate and save report
    report = tester.generate_extended_report(results)

    with open('extended_source_availability_report.md', 'w', encoding='utf-8') as f:
        f.write(report)

    # Print summary
    working = len([r for r in results if r.status == 'working'])
    total = len(results)

    print(f"\n🎯 EXTENDED TESTING COMPLETE!")
    print(f"📊 Results: {working}/{total} sources working")
    print(f"📄 Report saved: extended_source_availability_report.md")
    print(f"📝 Logs saved: extended_source_testing.log")

    if working >= 8:
        print(f"🎉 EXCELLENT: {working} working sources found!")
        print("🚀 Major collection system improvement possible!")
    elif working >= 5:
        print(f"✅ GOOD: {working} working sources found!")
        print("📈 Significant improvement over current system!")
    else:
        print(f"⚠️ Limited success: {working} working sources found.")

if __name__ == "__main__":
    main()