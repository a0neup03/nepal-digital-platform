"""
Streamlit Cloud Entry Point
Redirects to the main news dashboard
"""

import sys
import os

# Add news_aggregator to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'news_aggregator'))

# Import and run the main dashboard
from nepal_dashboard import *
