# Nepal News Automated Scheduler 🇳🇵

Production-ready automated news collection system using APScheduler with comprehensive monitoring, error handling, and recovery mechanisms.

## 🚀 Quick Start

### Prerequisites
```bash
cd news_aggregator
source ../nepal_env/bin/activate
pip install apscheduler
```

### Usage

```bash
# Run production scheduler (runs indefinitely)
python automated_daily_scheduler.py

# Test with manual collection
python automated_daily_scheduler.py --manual

# Check database health
python automated_daily_scheduler.py --health-check

# List scheduled jobs
python automated_daily_scheduler.py --list-jobs

# Run specific collections
python automated_daily_scheduler.py --run-morning
python automated_daily_scheduler.py --run-evening
```

## ⏰ Schedule Overview

| Collection Type | Time | Frequency | Description |
|----------------|------|-----------|-------------|
| 🌅 Morning Collection | 6:00 AM | Daily | Comprehensive + RSS + Social |
| 🌆 Evening Collection | 6:00 PM | Daily | Real-time + Social |
| 🔧 Weekly Maintenance | 2:00 AM | Sunday | Deep analysis + cleanup |
| 📊 Health Check | - | Every 6 hours | Database monitoring |
| ⚡ Breaking News | Top of hour | Hourly | Light real-time collection |

## 🛠️ Production Features

### ✅ Best Practices Implementation (2025)

- **APScheduler**: Enterprise-grade scheduling with persistence
- **Error Recovery**: Exponential backoff retry with 3 attempts
- **Signal Handling**: Graceful shutdown (SIGINT, SIGTERM)
- **Production Logging**: Rotating logs (10MB, 5 backups)
- **Monitoring**: Real-time metrics and health tracking
- **Thread Safety**: Controlled concurrency (max 3 workers)

### 🔧 Advanced Configuration

- **Job Persistence**: SQLite jobstore survives restarts
- **Misfire Grace**: 1-hour tolerance for missed jobs
- **Rate Limiting**: Prevents overlapping job execution
- **Log Cleanup**: Automatic cleanup of logs older than 7 days
- **Weekly Reports**: JSON performance summaries

## 📊 Monitoring & Metrics

The scheduler tracks:
- Total runs and success rates
- Consecutive failure alerts (3+ failures)
- Database health metrics
- Performance timings
- Scraper-specific success rates

## 🔍 Troubleshooting

### Common Issues

1. **Missing Scrapers**: Ensure all files in `scrapers/` directory
2. **Database Access**: Verify `nepal_news_intelligence.db` exists
3. **Port Conflicts**: Check no other schedulers running

### Error Recovery
- **Automatic retries** with exponential backoff
- **Graceful degradation** if individual scrapers fail
- **Health monitoring** with automatic alerts

## 📁 Architecture Separation

```
news_aggregator/
├── automated_daily_scheduler.py    # Main scheduler (this file)
├── nepal_dashboard.py              # Web dashboard (separate)
└── scrapers/                       # Data collection components
    ├── automated_social_collector.py
    ├── realtime_news_collector.py
    ├── comprehensive_collector.py
    └── nepal_news_intelligence_config.py
```

## 🚨 Production Deployment

1. **Testing**: Run `--manual` first to verify scrapers work
2. **Background**: Use `nohup python automated_daily_scheduler.py &`
3. **Monitoring**: Check logs in `logs/production.log`
4. **Systemd**: Consider systemd service for auto-restart

### Example Systemd Service

```ini
[Unit]
Description=Nepal News Scheduler
After=network.target

[Service]
Type=simple
User=your_user
WorkingDirectory=/path/to/news_aggregator
ExecStart=/path/to/nepal_env/bin/python automated_daily_scheduler.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

## 📈 Performance Expectations

- **Morning Collection**: ~5-10 minutes (comprehensive)
- **Evening Collection**: ~2-5 minutes (targeted)
- **Memory Usage**: ~100-200MB during collection
- **Database Growth**: ~50-100 articles/day expected

Built with 2025 web scraping best practices for reliable, scalable news intelligence.