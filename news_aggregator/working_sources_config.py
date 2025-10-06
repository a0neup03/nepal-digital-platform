# WORKING SOURCE CONFIGURATION
# Generated from availability testing
# Ready for production integration

WORKING_SOURCES = {
    'kantipur/ekantipur': {
        'name': 'Kantipur/Ekantipur',
        'url': 'https://ekantipur.com',
        'selectors': ['article'],
        'link_patterns': ['a[href*="/news/"]', 'a[href*="/business/"]', 'a[href*="/sports/"]'],
        'articles_found': 10,
        'response_time': 0.86,
        'status': 'production_ready'
    },
    'ratopati': {
        'name': 'Ratopati',
        'url': 'https://ratopati.com',
        'selectors': [],
        'link_patterns': ['a[href*="/story/"]', '.news-title a', 'h2 a'],
        'articles_found': 10,
        'response_time': 1.44,
        'status': 'production_ready'
    },
    'nepali_press': {
        'name': 'Nepali Press',
        'url': 'https://nepalpress.com',
        'selectors': [],
        'link_patterns': ['.news-title a', 'h2 a', 'h3 a'],
        'articles_found': 10,
        'response_time': 0.61,
        'status': 'production_ready'
    },
}
