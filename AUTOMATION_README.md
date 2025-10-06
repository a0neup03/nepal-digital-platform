# 🤖 Nepal News Collection Automation

## ✅ **Complete Automated System Ready**

Your Nepal News Intelligence Platform now has **professional-grade automated collection** using the proven cron-style approach.

---

## 🚀 **Quick Start**

### **1. Set Up Automation (One-time setup)**
```bash
# Run this once to set up automated collection
crontab -e

# Add these lines to your crontab:
0 */3 * * * /Users/muna/Documents/Aryan/aryan_try/nepal_working_platform/cron_scripts/run_news_collection.sh
0 * * * * /Users/muna/Documents/Aryan/aryan_try/nepal_working_platform/cron_scripts/run_rss_collection.sh
```

### **2. Monitor Collections**
```bash
# Check status anytime
python check_collection_status.py

# Watch live collection logs
tail -f logs/collection.log

# Manual collection (for testing)
python run_collections.py --all
```

---

## 📊 **What Gets Collected Automatically**

### **Every Hour (Lightweight):**
- ✅ **RSS Feeds** from Setopati, Online Khabar, BBC Nepali, Ratopati
- ⚡ **Fast execution** (~3 seconds)
- 📝 **Logged to**: `logs/rss.log`

### **Every 3 Hours (Comprehensive):**
- ✅ **RSS Feeds** (all sources)
- ✅ **Facebook Posts** from news pages
- ✅ **Direct Website Scraping** (7 verified sources)
- ⚡ **Execution time**: ~2-5 minutes
- 📝 **Logged to**: `logs/collection.log`

### **Weekly (Maintenance):**
- ✅ **Deep collection** with cleanup
- ✅ **Runs Sundays** at 3 AM
- ✅ **Database maintenance**

---

## 📁 **File Structure Created**

```
nepal_working_platform/
├── 🤖 Automation Scripts
│   ├── run_collections.py              # Main collection runner
│   ├── setup_automation.sh             # One-time setup (✅ completed)
│   └── check_collection_status.py      # Monitoring tool
│
├── 📁 cron_scripts/                    # Cron wrapper scripts
│   ├── run_news_collection.sh          # Comprehensive collection
│   └── run_rss_collection.sh           # RSS-only collection
│
├── 📁 logs/                            # All collection logs
│   ├── collection.log                  # Main collection activity
│   ├── rss.log                        # RSS collection activity
│   └── collection_status.log           # Success/failure tracking
│
└── 📰 News Dashboard
    ├── nepal_dashboard.py              # Main dashboard (reads from DB)
    └── nepal_news_intelligence.db      # Database (gets new articles)
```

---

## 🔍 **Monitoring & Troubleshooting**

### **Check System Status**
```bash
# Comprehensive status check
python check_collection_status.py

# Expected output:
🔍 Nepal News Collection Status Check
========================================
📰 Main Collection Log (last update: 2025-09-28 22:15:32)
   RSS collection completed successfully in 2.6s

✅ Status Log: 3 successes, 0 failures
⏰ Cron Status: Found 2 news collection cron jobs
```

### **View Real-time Logs**
```bash
# Watch collections as they happen
tail -f logs/collection.log

# Check recent RSS activity
tail logs/rss.log

# See success/failure summary
cat logs/collection_status.log
```

### **Manual Testing**
```bash
# Test individual collection methods
python run_collections.py --rss        # RSS only (~3 seconds)
python run_collections.py --facebook   # Facebook only (~1-2 minutes)
python run_collections.py --scraping   # Direct scraping (~2-3 minutes)
python run_collections.py --all        # All methods (~3-5 minutes)

# Verify all systems work
python run_collections.py --verify
```

---

## 📈 **Expected Performance**

### **Collection Speed:**
- **RSS Collection**: 2-5 seconds ⚡
- **Facebook Collection**: 1-2 minutes 🔍
- **Direct Scraping**: 2-3 minutes 🌐
- **Full Collection**: 3-5 minutes 🚀

### **Article Volume:**
- **RSS per hour**: 5-15 new articles
- **Comprehensive per 3h**: 20-50 new articles
- **Daily total**: 100-200 articles
- **Weekly total**: 700-1400 articles

### **Data Quality:**
- ✅ **Deduplication**: Automatic URL-based
- ✅ **Clean content**: Contamination filtering
- ✅ **Multiple sources**: RSS + Social + Direct
- ✅ **Real articles**: No "Sign in" or JavaScript errors

---

## 🎯 **How It Integrates with Dashboard**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Automated       │───▶│ nepal_news_     │───▶│ Nepal Dashboard │
│ Collection      │    │ intelligence.db │    │ (Real-time)     │
│ (Every 1-3h)    │    │ (New articles)  │    │ (Port 8505)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Your dashboard automatically shows new articles as they're collected!**

No manual intervention needed - the dashboard reads from the same database that automated collection feeds.

---

## 🛠️ **Maintenance Commands**

### **Start/Stop Collection**
```bash
# Check if cron is running
crontab -l | grep nepal

# Temporarily disable (comment out in crontab)
crontab -e
# Add # before the nepal lines

# Re-enable (remove # from crontab)
crontab -e
```

### **Troubleshooting**
```bash
# If collections stop working:
1. python run_collections.py --verify     # Check all systems
2. python run_collections.py --rss        # Test manually
3. cat logs/collection.log | tail -20     # Check recent logs
4. crontab -l                            # Verify cron jobs exist
```

### **Log Rotation (Optional)**
```bash
# Keep logs from growing too large
# Add to monthly cron (optional):
0 0 1 * * gzip /path/to/nepal_working_platform/logs/*.log && rm /path/to/nepal_working_platform/logs/*.log
```

---

## ✅ **Success Confirmation**

After setup, you should see:

1. **✅ Cron jobs installed** - `crontab -l` shows Nepal news jobs
2. **✅ Logs being created** - `ls logs/` shows recent .log files
3. **✅ New articles appearing** - Dashboard shows fresh content
4. **✅ Regular collection** - `collection_status.log` shows SUCCESS entries

---

## 🎉 **Congratulations!**

Your Nepal News Intelligence Platform now has:

- 🤖 **Fully automated collection** using professional cron scheduling
- 📊 **Three collection methods** working in harmony
- 📰 **Real-time dashboard** that updates automatically
- 🔍 **Easy monitoring** with status tools
- 📝 **Comprehensive logging** for troubleshooting
- ⚡ **Rock-solid reliability** using 50+ year proven technology

**No maintenance required - just monitor the logs occasionally and enjoy fresh Nepal news data!**

---

## 📞 **Quick Reference**

| Task | Command |
|------|---------|
| **Check Status** | `python check_collection_status.py` |
| **View Logs** | `tail -f logs/collection.log` |
| **Manual Run** | `python run_collections.py --all` |
| **Setup Cron** | `crontab -e` |
| **Test System** | `python run_collections.py --verify` |

**🔗 Dashboard**: http://localhost:8505 (always shows latest collected news)