"""
Streamlit Cloud Entry Point
Runs the main news dashboard
"""

import sys
import os

# Add news_aggregator to path so imports work
news_agg_path = os.path.join(os.path.dirname(__file__), 'news_aggregator')
sys.path.insert(0, news_agg_path)

# Change to news_aggregator directory so relative file paths work
os.chdir(news_agg_path)

# Execute the dashboard as a script (not import it)
with open('nepal_dashboard.py', 'r', encoding='utf-8') as f:
    dashboard_code = f.read()

exec(dashboard_code, {'__name__': '__main__', '__file__': 'nepal_dashboard.py'})
