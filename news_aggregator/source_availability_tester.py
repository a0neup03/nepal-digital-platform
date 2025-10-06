#!/usr/bin/env python3
"""
SOURCE AVAILABILITY TESTING SYSTEM
Systematically test all 25 Nepal news sources to identify working ones
Goal: Expand from 2/25 to 15+/25 working sources
"""

import requests
from bs4 import BeautifulSoup
import time
import json
import sqlite3
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass, asdict
from nepal_news_intelligence_config import NEPAL_NEWS_SOURCES, NewsSource
import logging
import concurrent.futures
from threading import Lock

@dataclass
class SourceTestResult:
    """Result of testing a news source"""
    source_name: str
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

class SourceAvailabilityTester:
    """Comprehensive source testing system"""

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
        self.setup_test_database()

    def setup_logging(self):
        """Setup logging for test results"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('source_testing.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)

    def setup_test_database(self):
        """Create table to store test results"""
        try:
            with sqlite3.connect(self.db_path) as conn:
                conn.execute("""
                    CREATE TABLE IF NOT EXISTS source_test_results (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        source_name TEXT NOT NULL,
                        website_url TEXT NOT NULL,
                        status TEXT NOT NULL,
                        response_time REAL,
                        articles_found INTEGER,
                        article_samples TEXT,  -- JSON
                        error_message TEXT,
                        content_selectors_working TEXT,  -- JSON
                        link_patterns TEXT,  -- JSON
                        tested_at TIMESTAMP,
                        recommendations TEXT  -- JSON
                    )
                """)
        except Exception as e:
            self.logger.error(f"Failed to create test results table: {e}")

    def test_single_source(self, source: NewsSource, timeout: int = 10) -> SourceTestResult:
        """Test a single news source comprehensively"""
        start_time = time.time()

        try:
            self.logger.info(f"Testing source: {source.name} ({source.website_url})")

            # Test website accessibility
            response = self.session.get(source.website_url, timeout=timeout)
            response_time = time.time() - start_time

            if response.status_code != 200:
                return SourceTestResult(
                    source_name=source.name,
                    website_url=source.website_url,
                    status='broken',
                    response_time=response_time,
                    articles_found=0,
                    article_samples=[],
                    error_message=f"HTTP {response.status_code}",
                    content_selectors_working=[],
                    link_patterns=[],
                    tested_at=datetime.now(),
                    recommendations=[f"Site returned HTTP {response.status_code}"]
                )

            # Parse content and test selectors
            soup = BeautifulSoup(response.content, 'html.parser')
            articles_found, article_samples, working_selectors, link_patterns = self.analyze_content_structure(soup, source)

            # Determine status
            if articles_found >= 5:
                status = 'working'
                recommendations = ["Source is fully functional", "Ready for production use"]
            elif articles_found >= 2:
                status = 'limited'
                recommendations = ["Source partially working", "May need selector optimization"]
            else:
                status = 'broken'
                recommendations = ["Source needs investigation", "Content structure may have changed"]

            return SourceTestResult(
                source_name=source.name,
                website_url=source.website_url,
                status=status,
                response_time=response_time,
                articles_found=articles_found,
                article_samples=article_samples,
                error_message='',
                content_selectors_working=working_selectors,
                link_patterns=link_patterns,
                tested_at=datetime.now(),
                recommendations=recommendations
            )

        except requests.exceptions.Timeout:
            return SourceTestResult(
                source_name=source.name,
                website_url=source.website_url,
                status='error',
                response_time=timeout,
                articles_found=0,
                article_samples=[],
                error_message='Connection timeout',
                content_selectors_working=[],
                link_patterns=[],
                tested_at=datetime.now(),
                recommendations=['Increase timeout', 'Check network connectivity']
            )
        except Exception as e:
            return SourceTestResult(
                source_name=source.name,
                website_url=source.website_url,
                status='error',
                response_time=time.time() - start_time,
                articles_found=0,
                article_samples=[],
                error_message=str(e),
                content_selectors_working=[],
                link_patterns=[],
                tested_at=datetime.now(),
                recommendations=[f'Error: {str(e)}', 'Manual investigation needed']
            )

    def analyze_content_structure(self, soup: BeautifulSoup, source: NewsSource) -> Tuple[int, List[Dict], List[str], List[str]]:
        """Analyze content structure to find working selectors"""

        # Common content selectors to test
        content_selectors = [
            '.entry-content', '.post-content', '.article-content', '.content',
            '.description', '.story-content', '.news-content', '.article-body',
            'article', '.article', '.news-item', '.post', '.story',
            '.main-content', '.article-text', '.news-text', '.content-area'
        ]

        # Common link patterns to test
        link_selectors = [
            'a[href*="/news/"]', 'a[href*="/article/"]', 'a[href*="/story/"]',
            'a[href*="/post/"]', 'a[href*="/politics/"]', 'a[href*="/business/"]',
            'a[href*="/sports/"]', 'a[href*="/entertainment/"]', 'a[href*="/technology/"]',
            '.news-title a', '.article-title a', '.headline a', 'h2 a', 'h3 a'
        ]

        working_selectors = []
        article_samples = []
        found_links = []

        # Test content selectors
        for selector in content_selectors:
            try:
                elements = soup.select(selector)
                if elements and len(elements) > 0:
                    # Check if content is substantial (not just navigation or ads)
                    for element in elements[:3]:  # Test first 3 elements
                        content = element.get_text(strip=True)
                        if len(content) > 100 and 'advertisement' not in content.lower():
                            working_selectors.append(selector)
                            break
            except Exception:
                continue

        # Test link patterns
        all_links = []
        for selector in link_selectors:
            try:
                links = soup.select(selector)
                for link in links:
                    href = link.get('href', '')
                    title = link.get_text(strip=True)
                    if href and title and len(title) > 10:
                        # Validate if this looks like a news article
                        if any(pattern in href.lower() for pattern in ['/news/', '/article/', '/story/', '/post/', '2024', '2025']):
                            all_links.append({
                                'url': href,
                                'title': title,
                                'selector': selector
                            })
                            if selector not in found_links:
                                found_links.append(selector)
            except Exception:
                continue

        # Create article samples from found links
        unique_links = []
        seen_urls = set()
        for link in all_links:
            url = link['url']
            # Make URL absolute if relative
            if url.startswith('/'):
                url = source.website_url.rstrip('/') + url

            if url not in seen_urls and len(unique_links) < 10:
                unique_links.append({
                    'url': url,
                    'title': link['title'],
                    'selector_used': link['selector']
                })
                seen_urls.add(url)

        # Test a few links to validate content extraction
        validated_samples = []
        for sample in unique_links[:3]:  # Test first 3 links
            try:
                link_response = self.session.get(sample['url'], timeout=5)
                if link_response.status_code == 200:
                    link_soup = BeautifulSoup(link_response.content, 'html.parser')

                    # Try to extract content using working selectors
                    content_found = False
                    for selector in working_selectors[:2]:  # Test top 2 working selectors
                        content_elements = link_soup.select(selector)
                        if content_elements:
                            content = content_elements[0].get_text(strip=True)
                            if len(content) > 200:
                                validated_samples.append({
                                    'url': sample['url'],
                                    'title': sample['title'],
                                    'content_preview': content[:200] + '...',
                                    'content_length': len(content),
                                    'working_selector': selector
                                })
                                content_found = True
                                break

                    if not content_found:
                        validated_samples.append({
                            'url': sample['url'],
                            'title': sample['title'],
                            'content_preview': 'Content extraction failed',
                            'content_length': 0,
                            'working_selector': 'none'
                        })

            except Exception:
                # Skip if individual link fails
                continue

        return len(unique_links), validated_samples, working_selectors, found_links

    def test_all_sources(self, max_workers: int = 3) -> List[SourceTestResult]:
        """Test all configured sources concurrently"""
        results = []

        self.logger.info(f"Testing {len(NEPAL_NEWS_SOURCES)} news sources...")

        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
            # Submit all test jobs
            future_to_source = {
                executor.submit(self.test_single_source, source): source
                for source in NEPAL_NEWS_SOURCES
            }

            # Collect results as they complete
            for future in concurrent.futures.as_completed(future_to_source):
                source = future_to_source[future]
                try:
                    result = future.result()
                    results.append(result)
                    self.save_test_result(result)
                    self.logger.info(f"✓ {source.name}: {result.status} ({result.articles_found} articles)")
                except Exception as e:
                    self.logger.error(f"✗ {source.name}: Test failed - {e}")

        return results

    def save_test_result(self, result: SourceTestResult):
        """Save test result to database"""
        try:
            with self.db_lock:
                with sqlite3.connect(self.db_path) as conn:
                    conn.execute("""
                        INSERT INTO source_test_results (
                            source_name, website_url, status, response_time,
                            articles_found, article_samples, error_message,
                            content_selectors_working, link_patterns, tested_at, recommendations
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (
                        result.source_name,
                        result.website_url,
                        result.status,
                        result.response_time,
                        result.articles_found,
                        json.dumps(result.article_samples),
                        result.error_message,
                        json.dumps(result.content_selectors_working),
                        json.dumps(result.link_patterns),
                        result.tested_at,
                        json.dumps(result.recommendations)
                    ))
        except Exception as e:
            self.logger.error(f"Failed to save test result: {e}")

    def generate_report(self, results: List[SourceTestResult]) -> str:
        """Generate comprehensive test report"""
        working = [r for r in results if r.status == 'working']
        limited = [r for r in results if r.status == 'limited']
        broken = [r for r in results if r.status == 'broken']
        errors = [r for r in results if r.status == 'error']

        report = f"""
# NEPAL NEWS SOURCES AVAILABILITY TEST REPORT
Test Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
Total Sources Tested: {len(results)}

## SUMMARY
✅ Working Sources: {len(working)}/{len(results)} ({len(working)/len(results)*100:.1f}%)
⚠️  Limited Sources: {len(limited)}/{len(results)} ({len(limited)/len(results)*100:.1f}%)
❌ Broken Sources: {len(broken)}/{len(results)} ({len(broken)/len(results)*100:.1f}%)
🚫 Error Sources: {len(errors)}/{len(results)} ({len(errors)/len(results)*100:.1f}%)

## WORKING SOURCES (Ready for Production)
"""

        for result in working:
            report += f"""
### ✅ {result.source_name}
- URL: {result.website_url}
- Response Time: {result.response_time:.2f}s
- Articles Found: {result.articles_found}
- Working Selectors: {', '.join(result.content_selectors_working[:3])}
- Status: Production Ready
"""

        report += "\n## LIMITED SOURCES (Need Optimization)\n"
        for result in limited:
            report += f"""
### ⚠️ {result.source_name}
- URL: {result.website_url}
- Response Time: {result.response_time:.2f}s
- Articles Found: {result.articles_found}
- Issues: {', '.join(result.recommendations)}
"""

        report += "\n## BROKEN SOURCES (Need Investigation)\n"
        for result in broken:
            report += f"""
### ❌ {result.source_name}
- URL: {result.website_url}
- Error: {result.error_message or 'No articles found'}
- Recommendations: {', '.join(result.recommendations)}
"""

        report += "\n## ERROR SOURCES (Technical Issues)\n"
        for result in errors:
            report += f"""
### 🚫 {result.source_name}
- URL: {result.website_url}
- Error: {result.error_message}
- Action Needed: Manual investigation
"""

        # Add actionable recommendations
        report += f"""

## ACTIONABLE RECOMMENDATIONS

### Immediate Implementation (Working Sources)
{len(working)} sources are ready for immediate integration:
"""
        for result in working:
            report += f"- {result.source_name}: Use selectors {result.content_selectors_working[:2]}\n"

        if limited:
            report += f"""
### Optimization Tasks ({len(limited)} sources)
These sources need selector refinement:
"""
            for result in limited:
                report += f"- {result.source_name}: {result.recommendations[0] if result.recommendations else 'Needs optimization'}\n"

        if broken or errors:
            report += f"""
### Investigation Required ({len(broken + errors)} sources)
These sources need manual review:
"""
            for result in broken + errors:
                report += f"- {result.source_name}: {result.error_message or 'Structure changed'}\n"

        report += f"""

## IMPLEMENTATION PRIORITY
1. **Phase 1**: Implement {len(working)} working sources immediately
2. **Phase 2**: Optimize {len(limited)} limited sources (estimated 2-3 days)
3. **Phase 3**: Investigate {len(broken + errors)} broken sources (estimated 1 week)

**Expected Result**: Increase from 2 to {len(working)} working sources immediately
**Potential Maximum**: Up to {len(working) + len(limited)} sources with optimization
"""

        return report

    def export_working_source_config(self, results: List[SourceTestResult]) -> str:
        """Export configuration for working sources"""
        working_sources = [r for r in results if r.status == 'working']

        config = """# WORKING SOURCE CONFIGURATION
# Generated from availability testing
# Ready for production integration

WORKING_SOURCES = {
"""

        for result in working_sources:
            config += f"""    '{result.source_name.lower().replace(' ', '_')}': {{
        'name': '{result.source_name}',
        'url': '{result.website_url}',
        'selectors': {result.content_selectors_working[:3]},
        'link_patterns': {result.link_patterns[:3]},
        'articles_found': {result.articles_found},
        'response_time': {result.response_time:.2f},
        'status': 'production_ready'
    }},
"""

        config += "}\n"
        return config

def main():
    """Run comprehensive source availability testing"""
    print("🔍 Starting Nepal News Sources Availability Testing...")

    tester = SourceAvailabilityTester()

    # Test all sources
    results = tester.test_all_sources(max_workers=3)

    # Generate and save report
    report = tester.generate_report(results)

    with open('source_availability_report.md', 'w', encoding='utf-8') as f:
        f.write(report)

    # Export working source configuration
    config = tester.export_working_source_config(results)
    with open('working_sources_config.py', 'w', encoding='utf-8') as f:
        f.write(config)

    # Print summary
    working = len([r for r in results if r.status == 'working'])
    total = len(results)

    print(f"\n🎯 TESTING COMPLETE!")
    print(f"📊 Results: {working}/{total} sources working")
    print(f"📄 Report saved: source_availability_report.md")
    print(f"⚙️ Config saved: working_sources_config.py")
    print(f"📝 Logs saved: source_testing.log")

    if working >= 5:
        print(f"🎉 SUCCESS: {working} working sources found!")
        print("🚀 Ready to expand collection system significantly!")
    else:
        print(f"⚠️ Only {working} working sources found.")
        print("🔧 Manual investigation needed for better results.")

if __name__ == "__main__":
    main()