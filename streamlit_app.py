"""
Streamlit Cloud Entry Point
Redirects to the main news dashboard with error handling
"""

import streamlit as st
import sys
import os
import traceback

st.write("🔍 Starting Nepal News Dashboard...")

try:
    # Add news_aggregator to path
    news_agg_path = os.path.join(os.path.dirname(__file__), 'news_aggregator')
    st.write(f"📁 Adding to path: {news_agg_path}")
    sys.path.insert(0, news_agg_path)

    st.write("✅ Path added successfully")

    # Check if database exists
    db_path = os.path.join(os.path.dirname(__file__), 'nepal_news_intelligence.db')
    db_exists = os.path.exists(db_path)
    st.write(f"🗄️ Database exists at root: {db_exists}")

    db_path2 = os.path.join(news_agg_path, 'nepal_news_intelligence.db')
    db_exists2 = os.path.exists(db_path2)
    st.write(f"🗄️ Database exists in news_aggregator: {db_exists2}")

    st.write("📦 Attempting to import nepal_dashboard...")

    # Import and run the main dashboard
    from nepal_dashboard import *

    st.write("✅ Dashboard imported successfully!")

except Exception as e:
    st.error("❌ Error loading dashboard:")
    st.error(str(e))
    st.code(traceback.format_exc())
    st.write("---")
    st.write("### Debug Information:")
    st.write(f"Python version: {sys.version}")
    st.write(f"Current directory: {os.getcwd()}")
    st.write(f"Files in current directory: {os.listdir('.')[:20]}")
