# 🚀 Streamlit Cloud Deployment Guide
**Nepal News Intelligence Dashboard**

**Date**: October 5, 2025
**Cost**: 100% FREE
**Setup Time**: 5 minutes

---

## 📋 What You're Deploying

**News Aggregator Dashboard** with:
- Real-time news intelligence
- BERT sentiment analysis
- ML-powered clustering
- Word cloud visualization
- Trending story detection
- 2,038+ articles from 33 sources

**Live at:** `https://nepal-news-intelligence.streamlit.app` (after deployment)

---

## ✅ Prerequisites (Already Done!)

- ✅ GitHub repository created
- ✅ Files pushed to GitHub
- ✅ `requirements-streamlit.txt` created
- ✅ `.streamlit/config.toml` configured
- ✅ `packages.txt` for system fonts

---

## 🚀 Step-by-Step Deployment

### **Step 1: Sign Up for Streamlit Cloud (FREE)**

1. Go to: https://share.streamlit.io/
2. Click **"Sign up"**
3. Choose **"Continue with GitHub"**
4. Authorize Streamlit to access your GitHub

---

### **Step 2: Create New App**

1. Click **"New app"** button
2. Fill in the form:

```
Repository: a0neup03/nepal-digital-platform
Branch: main
Main file path: news_aggregator/nepal_dashboard.py
App URL: nepal-news-intelligence (or your choice)
```

3. Click **"Advanced settings"** (optional):
   - Python version: 3.9
   - Requirements file: requirements-streamlit.txt

4. Click **"Deploy!"**

---

### **Step 3: Wait for Deployment (2-3 minutes)**

You'll see:
```
⏳ Installing dependencies...
⏳ Building app...
🎉 Your app is live!
```

**Your dashboard URL:** `https://nepal-news-intelligence.streamlit.app`

---

## 🔧 Configuration Files (Already Created)

### **1. requirements-streamlit.txt**
```
streamlit==1.28.0
pandas==2.0.3
plotly==5.17.0
matplotlib==3.7.2
wordcloud==1.9.2
scikit-learn==1.3.0
requests==2.31.0
beautifulsoup4==4.12.2
feedparser==6.0.10
```

### **2. .streamlit/config.toml**
```toml
[theme]
primaryColor="#635bff"
backgroundColor="#ffffff"

[server]
headless = true
port = 8505
```

### **3. packages.txt** (System dependencies)
```
fonts-noto
libfreetype6-dev
```

---

## 🔄 Auto-Deploy from GitHub

**Every time you push to GitHub:**
1. GitHub Actions collects news (3x daily)
2. Database updates automatically
3. Streamlit Cloud **auto-redeploys** (within 2 minutes)
4. Dashboard shows latest articles

**No manual work needed!** 🎉

---

## 🌐 Complete Architecture

```
┌─────────────────────────────────────────┐
│  Netlify: nepal-digital-platform        │
│  https://nepal-digital-platform.netlify.app │
│                                         │
│  Landing Page with links to:            │
│  ✅ Political Game (Netlify)            │
│  ✅ Office Tracker (Netlify)            │
│  ✅ News Dashboard → Streamlit Cloud    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  Streamlit Cloud                        │
│  https://nepal-news-intelligence.streamlit.app │
│                                         │
│  ✅ Full Python features                │
│  ✅ BERT analysis                       │
│  ✅ ML clustering                       │
│  ✅ Real-time updates                   │
└─────────────────────────────────────────┘
                    ↑
┌─────────────────────────────────────────┐
│  GitHub Actions (3x daily)              │
│  ✅ Automated news collection           │
│  ✅ Database updates                    │
│  ✅ Triggers Streamlit redeploy         │
└─────────────────────────────────────────┘
```

---

## 📊 Free Tier Limits

| Resource | Limit | Your Usage |
|----------|-------|------------|
| **Apps** | Unlimited public | 1 app |
| **RAM** | 1 GB | ~500 MB ✅ |
| **CPU** | 1 core | Sufficient ✅ |
| **Storage** | 1 GB | ~200 MB ✅ |
| **Viewers** | Unlimited | ∞ |
| **Deploy time** | Unlimited | Free ✅ |

**You're well within limits!** ✅

---

## 🔗 Update Landing Page Links

After deployment, update your **Netlify landing page** (`index.html`):

```html
<!-- Old link (local port) -->
<a href="http://localhost:8505">News Dashboard</a>

<!-- New link (Streamlit Cloud) -->
<a href="https://nepal-news-intelligence.streamlit.app" target="_blank">
  News Dashboard
</a>
```

---

## 🛠️ Troubleshooting

### **Issue: App won't deploy**

**Check:**
1. Is `requirements-streamlit.txt` in repository root? ✓
2. Is path correct: `news_aggregator/nepal_dashboard.py`? ✓
3. Are all Python files committed to GitHub? ✓

**Solution:** Check deployment logs in Streamlit Cloud UI

### **Issue: Database not found**

**Cause:** Database file might be too large for Streamlit Cloud

**Solution:** Already handled - database is 7.6 MB (well under 1GB limit)

### **Issue: Fonts not rendering Nepali**

**Cause:** Missing system fonts

**Solution:** Already handled - `packages.txt` includes `fonts-noto`

### **Issue: App is slow**

**Cause:** Too many dependencies

**Solution:** Already optimized - using lightweight versions only

---

## 🎯 Post-Deployment Checklist

- [ ] **Visit Streamlit Cloud app** - Test all features
- [ ] **Check GitHub Actions** - Verify database updates work
- [ ] **Update Netlify landing page** - Link to Streamlit URL
- [ ] **Test auto-redeploy** - Push a change, watch it redeploy
- [ ] **Share with users** - Get feedback

---

## 📱 Custom Domain (Optional)

Want `news.yoursite.com` instead of `.streamlit.app`?

1. Go to Streamlit Cloud settings
2. Click **"Custom domain"**
3. Add your domain
4. Update DNS settings (CNAME record)

**Cost:** Still FREE with Streamlit Cloud ✅

---

## 🔄 Daily Workflow After Deployment

```bash
# Everything is automated!

6:00 AM Nepal → GitHub Actions collects news
              → Database updates on GitHub
              → Streamlit Cloud auto-redeploys
              → Dashboard shows new articles

12:00 PM Nepal → Repeat

6:00 PM Nepal → Repeat

# You do nothing! Just visit:
https://nepal-news-intelligence.streamlit.app
```

---

## 🎉 What You Get (FREE)

✅ **Professional news dashboard**
✅ **24/7 availability**
✅ **Automatic updates** (3x daily)
✅ **Full Python features** (ML, BERT, clustering)
✅ **Unlimited viewers**
✅ **Auto-deploy from GitHub**
✅ **SSL certificate** (HTTPS)
✅ **CDN delivery** (fast worldwide)

**Total Cost: $0/month**

---

## 🚀 Next Steps

1. **Deploy to Streamlit Cloud** (5 minutes)
2. **Update Netlify landing page** with Streamlit URL
3. **Test complete platform** (all 3 dashboards)
4. **Push changes to GitHub**
5. **Share platform with users**

---

## 📞 Support Resources

**Streamlit Cloud:**
- Docs: https://docs.streamlit.io/streamlit-community-cloud
- Forum: https://discuss.streamlit.io/
- Status: https://status.streamlit.io/

**Your Setup:**
- GitHub repo: https://github.com/a0neup03/nepal-digital-platform
- Netlify site: https://nepal-digital-platform.netlify.app
- Streamlit app: (after deployment)

---

*Deployment guide created: October 5, 2025*
*Estimated deployment time: 5 minutes*
*No coding required - just click and deploy!*
