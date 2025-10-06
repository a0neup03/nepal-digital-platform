# ⚡ Quick Start Implementation Checklist
**For**: Daily News Updates + User Data Storage
**Date**: October 5, 2025

---

## 🎯 IMMEDIATE ACTIONS (Today)

### **✅ Step 1: Verify Dashboard is Running**
```bash
# Check if dashboard is accessible
curl http://localhost:8505

# If not running, start it:
cd news_aggregator
streamlit run nepal_dashboard.py --server.port=8505
```

**Status**: ✅ **COMPLETE** - Dashboard confirmed running on port 8505

---

### **✅ Step 2: Test News Collection Manually**
```bash
cd news_aggregator
python comprehensive_rss_collector.py --limit 50
```

**Status**: ✅ **COMPLETE** - Collection working, 35+ articles collected

---

### **⚡ Step 3: Set Up Automated Collection (PRIORITY)**

#### **Option A: macOS/Linux Cron (Recommended for Testing)**

**1. Create the wrapper script:**
```bash
mkdir -p news_aggregator/scripts

cat > news_aggregator/scripts/collect_news.sh << 'EOF'
#!/bin/bash
cd /Users/muna/Documents/Aryan/aryan_try/nepal_working_platform/news_aggregator
source ../nepal_env/bin/activate
python comprehensive_rss_collector.py --limit 100 >> logs/cron_$(date +\%Y-\%m-\%d).log 2>&1
EOF

chmod +x news_aggregator/scripts/collect_news.sh
```

**2. Test the script:**
```bash
./news_aggregator/scripts/collect_news.sh
# Should create log file and collect news
```

**3. Set up cron jobs:**
```bash
crontab -e

# Add these lines (adjust path to match your system):
# 6 AM Nepal Time (00:15 UTC)
15 0 * * * /Users/muna/Documents/Aryan/aryan_try/nepal_working_platform/news_aggregator/scripts/collect_news.sh

# 12 PM Nepal Time (06:15 UTC)
15 6 * * * /Users/muna/Documents/Aryan/aryan_try/nepal_working_platform/news_aggregator/scripts/collect_news.sh

# 6 PM Nepal Time (12:15 UTC)
15 12 * * * /Users/muna/Documents/Aryan/aryan_try/nepal_working_platform/news_aggregator/scripts/collect_news.sh
```

**4. Verify cron is scheduled:**
```bash
crontab -l
```

---

### **📋 Step 4: Create User Data Database Tables**

#### **For Office Tracker:**
```bash
cd office_tracker

sqlite3 nepal_office_tracker.db < ../docs/schemas/office_tracker_schema.sql
```

**Create the schema file first:**
```bash
mkdir -p docs/schemas

# Copy schema from DAILY_UPDATES_AND_USER_DATA_PLAN.md
# Lines 247-450 (Office Tracker schema)
```

#### **For Political Game:**
```bash
cd political_game

sqlite3 political_game_analytics.db < ../docs/schemas/game_analytics_schema.sql
```

**Create the schema file:**
```bash
# Copy schema from DAILY_UPDATES_AND_USER_DATA_PLAN.md
# Lines 834-1029 (Political Game schema)
```

---

## 📅 WEEK 1 PLAN

### **Monday: Automation Setup**
- [x] Verify dashboard running
- [x] Test news collection
- [ ] Create cron wrapper script
- [ ] Schedule cron jobs (6 AM, 12 PM, 6 PM)
- [ ] Monitor first automated run

### **Tuesday: Database Setup**
- [ ] Create office_selections schema
- [ ] Create game_sessions schema
- [ ] Set up database indexes
- [ ] Test database writes

### **Wednesday: Office Tracker Frontend**
- [ ] Add consent banner HTML
- [ ] Implement consent localStorage
- [ ] Add data submission function
- [ ] Test end-to-end flow

### **Thursday: Office Tracker Backend**
- [ ] Create FastAPI endpoint `/api/office-selections`
- [ ] Add input validation
- [ ] Test with frontend
- [ ] Verify data storage

### **Friday: Political Game Integration**
- [ ] Add GameAnalytics class to game
- [ ] Implement consent dialog
- [ ] Add decision tracking
- [ ] Test data collection

### **Weekend: Testing & Monitoring**
- [ ] Verify cron jobs running
- [ ] Check database growth
- [ ] Review collection logs
- [ ] Test analytics queries

---

## 🔍 MONITORING CHECKLIST

### **Daily Checks (Automated)**
```bash
# Check last article collection time
sqlite3 news_aggregator/nepal_news_intelligence.db \
  "SELECT MAX(scraped_date) FROM articles_enhanced"

# Should be within last 24 hours
```

### **Weekly Checks (Manual)**
```bash
# 1. Article count growth
sqlite3 news_aggregator/nepal_news_intelligence.db \
  "SELECT COUNT(*) FROM articles_enhanced"

# 2. User data collection
sqlite3 office_tracker/nepal_office_tracker.db \
  "SELECT COUNT(*) FROM office_selections"

# 3. Game analytics
sqlite3 political_game/political_game_analytics.db \
  "SELECT COUNT(*) FROM game_sessions"

# 4. Review logs
tail -50 news_aggregator/logs/cron_$(date +%Y-%m-%d).log
```

---

## 🚨 TROUBLESHOOTING

### **News Collection Not Running**
```bash
# Check cron logs
grep CRON /var/log/system.log | tail -20

# Test script manually
./news_aggregator/scripts/collect_news.sh

# Check for errors
tail -100 news_aggregator/logs/cron_$(date +%Y-%m-%d).log
```

### **Database Errors**
```bash
# Check database integrity
sqlite3 news_aggregator/nepal_news_intelligence.db "PRAGMA integrity_check"

# Check table schemas
sqlite3 news_aggregator/nepal_news_intelligence.db ".schema articles_enhanced"
```

### **Dashboard Not Loading**
```bash
# Check if Streamlit is running
ps aux | grep streamlit

# Restart dashboard
cd news_aggregator
streamlit run nepal_dashboard.py --server.port=8505
```

---

## 📊 SUCCESS INDICATORS

### **After Week 1**
- ✅ Cron jobs running 3x daily
- ✅ 150-300 new articles collected
- ✅ Zero failed collections
- ✅ Database schemas created
- ✅ Consent system implemented

### **After Week 2**
- ✅ User data being collected
- ✅ Office Tracker storing selections
- ✅ Game tracking decisions
- ✅ Analytics queries working
- ✅ Privacy compliance verified

### **After Week 3**
- ✅ Analytics dashboard operational
- ✅ Data retention automation working
- ✅ Monitoring system active
- ✅ Health checks automated
- ✅ Documentation complete

---

## 🔗 REFERENCE DOCUMENTS

1. **Full Implementation Plan**: `docs/DAILY_UPDATES_AND_USER_DATA_PLAN.md`
2. **Database Schemas**: Extract from implementation plan
3. **Best Practices Research**: Included in implementation plan
4. **CLAUDE.md**: Primary system reference
5. **CHANGELOG.md**: Track all changes

---

## 💡 QUICK TIPS

**Cron Job Tips**:
- Use absolute paths (not relative)
- Activate virtual environment in script
- Log everything to files
- Test script manually before scheduling

**Database Tips**:
- Always use parameterized queries (prevent SQL injection)
- Create indexes on frequently queried columns
- Back up database before schema changes
- Test with small data before production

**Privacy Tips**:
- Always get explicit consent
- Store only necessary data
- Anonymize everything possible
- Implement data retention limits (90 days)
- Document what you collect in privacy policy

---

*Checklist Created: October 5, 2025*
*Follow sequentially for smooth implementation*
