# 🚀 GitHub Actions - Automated News Collection Setup

**Created**: October 5, 2025
**Status**: ✅ Ready to Deploy
**Cost**: 100% FREE (using ~2.25% of free tier)

---

## 📋 What This Does

Your news collection will run **automatically 3 times daily**:
- 🌅 **6:00 AM Nepal Time** - Morning collection
- 🌞 **12:00 PM Nepal Time** - Midday collection
- 🌆 **6:00 PM Nepal Time** - Evening collection

**No computer needed** - Runs in GitHub's cloud servers!

---

## ⚡ Quick Setup (5 Minutes)

### **Step 1: Push Files to GitHub**

```bash
cd /Users/muna/Documents/Aryan/aryan_try/nepal_working_platform

# Add the workflow file
git add .github/workflows/collect-news.yml
git add news_aggregator/requirements.txt

# Commit
git commit -m "Add automated news collection workflow

- GitHub Actions workflow for 3x daily collection
- Requirements.txt for Python dependencies
- Runs at 6 AM, 12 PM, 6 PM Nepal Time

🤖 Generated with Claude Code"

# Push to GitHub
git push origin main
```

### **Step 2: Enable GitHub Actions (if not already enabled)**

1. Go to your GitHub repository
2. Click **"Actions"** tab at the top
3. If prompted, click **"I understand my workflows, go ahead and enable them"**

### **Step 3: Test the Workflow**

**Manual test (recommended before automated schedule):**

1. Go to **Actions** tab on GitHub
2. Click **"Automated News Collection"** workflow on the left
3. Click **"Run workflow"** button (top right)
4. Leave default settings (100 articles)
5. Click green **"Run workflow"** button
6. Watch it run! (takes ~30 seconds)

✅ **Success looks like:**
- Green checkmark ✓
- "Collection successful" in logs
- Database file updated in repository
- New commit with collected articles

---

## 📊 What Happens Each Run

```
1. GitHub starts fresh Ubuntu Linux server
2. Checks out your code
3. Installs Python 3.9
4. Installs dependencies (feedparser, requests, etc.)
5. Runs comprehensive_rss_collector.py
6. Collects ~100 articles from 6 RSS sources
7. Updates nepal_news_intelligence.db
8. Runs health checks
9. Commits database back to repository
10. Pushes changes to GitHub
11. Server shuts down
```

**Duration**: ~30 seconds per run
**Cost**: $0.00 (free tier)

---

## 🔍 Monitoring & Logs

### **View Collection Reports**

1. Go to **Actions** tab
2. Click any workflow run
3. See summary:
   ```
   📰 Collection Report

   Total Articles: 2,150
   Active Sources: 33
   New Articles: 87

   ✅ Status: Collection successful
   ```

### **View Detailed Logs**

Click **"collect-news"** job → Expand any step to see:
- Python output
- Articles collected
- Database statistics
- Any errors/warnings

### **Email Notifications**

By default, GitHub emails you if a workflow **fails**:
- Go to GitHub Settings → Notifications
- Check "Actions" notifications
- Get alerted if collection breaks

---

## 🛠️ Advanced Configuration

### **Change Collection Times**

Edit `.github/workflows/collect-news.yml`:

```yaml
on:
  schedule:
    # Current: 6 AM, 12 PM, 6 PM Nepal
    - cron: '15 0 * * *'   # 6:00 AM Nepal
    - cron: '15 6 * * *'   # 12:00 PM Nepal
    - cron: '15 12 * * *'  # 6:00 PM Nepal

    # Want hourly? Add more lines:
    # - cron: '15 * * * *'  # Every hour at :15 minutes
```

**Cron syntax**: `minute hour day month weekday`
- `15 0 * * *` = 0:15 UTC every day = 6:00 AM Nepal
- `*/2 * * * *` = Every 2 hours
- `0 */6 * * *` = Every 6 hours

### **Change Collection Limit**

Edit workflow, line 45:
```yaml
env:
  LIMIT: ${{ github.event.inputs.limit || '100' }}  # Change 100 to any number
```

Or use manual trigger with custom limit!

### **Disable Specific Times**

Comment out a schedule line with `#`:
```yaml
on:
  schedule:
    - cron: '15 0 * * *'   # Morning
    # - cron: '15 6 * * *'  # DISABLED: Midday
    - cron: '15 12 * * *'  # Evening
```

---

## 🎯 Usage Metrics

### **Your Usage:**
```
Collections per month: 90 (3/day × 30 days)
Time per collection:   30 seconds
Monthly usage:         45 minutes

Free tier:             2,000 minutes/month
Percentage used:       2.25%
Remaining:             1,955 minutes (97.75%)
```

**You could run 44x more collections and still be free!**

---

## 🔧 Troubleshooting

### **Problem: Workflow doesn't run automatically**

**Solution 1**: Repository must have activity
- GitHub disables workflows after 60 days of no repo activity
- Make any commit to re-enable

**Solution 2**: Check Actions permissions
- Settings → Actions → General
- Allow "Read and write permissions"

### **Problem: Database conflicts**

If you edit database locally AND GitHub Actions runs:

```bash
# Before working locally, pull latest:
git pull

# After workflow runs, you'll see:
git pull
# Merge conflict in nepal_news_intelligence.db

# Keep GitHub's version (it's newer):
git checkout --theirs news_aggregator/nepal_news_intelligence.db
git add news_aggregator/nepal_news_intelligence.db
git commit -m "Resolve database conflict"
```

**Best practice**:
- Let GitHub Actions handle collection
- Work on code, not database
- Pull before running dashboard locally

### **Problem: "No new articles collected"**

Check logs for:
- Network errors (RSS feed down)
- Duplicate detection (articles already exist)
- Rate limiting (too many requests)

**Solution**: Wait for next run, usually resolves itself

---

## 📁 Files Created

```
.github/workflows/collect-news.yml  # GitHub Actions workflow
news_aggregator/requirements.txt    # Python dependencies
docs/GITHUB_ACTIONS_SETUP.md        # This guide
```

---

## 🎉 Benefits You Get

✅ **24/7 Collection** - No computer needed
✅ **Automatic Commits** - Database always updated
✅ **Version History** - Every collection tracked in git
✅ **Email Alerts** - Know when something breaks
✅ **Manual Trigger** - Run collection anytime from GitHub
✅ **Detailed Logs** - See exactly what happened
✅ **100% Free** - Using only 2.25% of free tier
✅ **Professional** - Same system used by major companies

---

## 🔄 Workflow After Setup

### **Daily Workflow:**

```bash
# Morning: Check collection ran
# (optional - GitHub emails you if it failed)

# When you want to work:
git pull  # Get latest articles from GitHub

# Run dashboard locally
streamlit run news_aggregator/nepal_dashboard.py

# See fresh articles from automated collection!
```

### **No More Manual Collection!**

❌ **Old way**: `./collect_news.sh` manually
✅ **New way**: Happens automatically, just `git pull`

---

## 🚀 Next Steps

1. **✅ Push to GitHub** (files already created)
2. **✅ Test manual run** (Actions → Run workflow)
3. **✅ Wait for first scheduled run** (next 6 AM/12 PM/6 PM Nepal)
4. **✅ Check email** for success notification
5. **✅ Pull database** and view in dashboard

---

## 📊 Alternative: PythonAnywhere for Dashboard

**Phase 2 (optional)**: Deploy dashboard publicly

Once collection is automated, you can:
1. Keep GitHub Actions collecting data
2. Deploy Streamlit dashboard to PythonAnywhere
3. Public URL for anyone to view news intelligence

**Cost**: Still free with PythonAnywhere free tier

---

## 🎯 Success Criteria

✅ Workflow runs without errors
✅ Database grows by ~100 articles per run
✅ Commits appear in repository 3x daily
✅ Email notification if failure
✅ Can run manually from GitHub UI

---

## 📞 Support

**Check workflow status**: github.com/[your-username]/[repo-name]/actions
**View logs**: Click any run → collect-news job
**Re-run failed job**: Click "Re-run jobs" button

---

*Setup guide created: October 5, 2025*
*Estimated setup time: 5 minutes*
*Ongoing maintenance: Zero - fully automated*
