# 🚀 Daily News Updates & User Data Storage - Implementation Plan
**Date**: October 5, 2025
**Based on**: 2025 Best Practices Research (GDPR, Scalability, Privacy)

---

## 📋 OVERVIEW

This document provides comprehensive implementation plans for:
1. **Automated Daily News Updates** - Reliable, scalable news collection
2. **Office Tracker User Data** - Privacy-compliant selection/choice storage
3. **Political Game User Data** - Analytics-ready game choice tracking

---

## 🗞️ PART 1: AUTOMATED DAILY NEWS UPDATES

### **Current Status** ✅
- Dashboard running on port 8505 ✅
- News collection working (35+ articles collected today) ✅
- 6 verified RSS sources active ✅
- Database: 1,961+ articles total ✅

### **Problem Identified** ⚠️
- Last automated collection: October 3, 10:49 AM
- Gap: 2 days without automated updates
- Scheduler not running continuously

---

### **SOLUTION 1: Reliable Cron-Based Automation** (Recommended)

#### **Architecture**
```
Local Cron Job (Primary)
├── Daily Collection: 6:00 AM, 6:00 PM Nepal Time
├── Backup Job: 12:00 PM (midday catch-up)
├── Health Check: Every hour (lightweight)
└── Weekly Cleanup: Sunday 2:00 AM
```

#### **Implementation Steps**

**Step 1: Create Wrapper Script**
```bash
# File: news_aggregator/scripts/run_collection_with_logging.sh
#!/bin/bash

# Configuration
PROJECT_DIR="/Users/muna/Documents/Aryan/aryan_try/nepal_working_platform"
VENV_DIR="$PROJECT_DIR/nepal_env"
LOG_DIR="$PROJECT_DIR/news_aggregator/logs"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# Activate virtual environment
source "$VENV_DIR/bin/activate"

# Change to project directory
cd "$PROJECT_DIR/news_aggregator"

# Run collection with full logging
echo "[$TIMESTAMP] Starting news collection..." >> "$LOG_DIR/cron_$DATE.log"

python comprehensive_rss_collector.py --limit 100 \
  >> "$LOG_DIR/cron_$DATE.log" 2>&1

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo "[$TIMESTAMP] ✅ Collection successful" >> "$LOG_DIR/cron_$DATE.log"
else
    echo "[$TIMESTAMP] ❌ Collection failed with code $EXIT_CODE" >> "$LOG_DIR/cron_$DATE.log"
fi

# Optional: Send notification on failure (future enhancement)
if [ $EXIT_CODE -ne 0 ]; then
    # Future: email/slack notification
    echo "Collection failed at $TIMESTAMP" >> "$LOG_DIR/failures.log"
fi

exit $EXIT_CODE
```

**Step 2: Make Script Executable**
```bash
chmod +x news_aggregator/scripts/run_collection_with_logging.sh
```

**Step 3: Set Up Cron Jobs**
```bash
# Open crontab editor
crontab -e

# Add these lines (Nepal Time = UTC+5:45, adjust accordingly)
# 6:00 AM Nepal Time (00:15 UTC) - Morning collection
15 0 * * * /Users/muna/Documents/Aryan/aryan_try/nepal_working_platform/news_aggregator/scripts/run_collection_with_logging.sh

# 12:00 PM Nepal Time (06:15 UTC) - Midday backup
15 6 * * * /Users/muna/Documents/Aryan/aryan_try/nepal_working_platform/news_aggregator/scripts/run_collection_with_logging.sh

# 6:00 PM Nepal Time (12:15 UTC) - Evening collection
15 12 * * * /Users/muna/Documents/Aryan/aryan_try/nepal_working_platform/news_aggregator/scripts/run_collection_with_logging.sh

# Every Sunday 2:00 AM (20:15 UTC Saturday) - Weekly cleanup
15 20 * * 6 /Users/muna/Documents/Aryan/aryan_try/nepal_working_platform/news_aggregator/scripts/weekly_cleanup.sh
```

**Step 4: Create Health Check Script**
```python
# File: news_aggregator/scripts/health_check.py
import sqlite3
from datetime import datetime, timedelta
import sys

DB_PATH = '../nepal_news_intelligence.db'

try:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Check last article time
    cursor.execute("""
        SELECT MAX(scraped_date) FROM articles_enhanced
    """)
    last_article = cursor.fetchone()[0]

    if last_article:
        last_time = datetime.fromisoformat(last_article)
        hours_ago = (datetime.now() - last_time).total_seconds() / 3600

        if hours_ago > 24:
            print(f"⚠️  WARNING: Last article {hours_ago:.1f} hours ago")
            sys.exit(1)
        else:
            print(f"✅ Healthy: Last article {hours_ago:.1f} hours ago")
            sys.exit(0)
    else:
        print("❌ ERROR: No articles in database")
        sys.exit(2)

except Exception as e:
    print(f"❌ ERROR: {e}")
    sys.exit(3)
finally:
    if conn:
        conn.close()
```

---

### **SOLUTION 2: Cloud-Based Reliability** (Production Scale)

#### **Option A: GitHub Actions (FREE)**
```yaml
# File: .github/workflows/daily-news-collection.yml
name: Daily News Collection

on:
  schedule:
    - cron: '15 0,6,12 * * *'  # 6 AM, 12 PM, 6 PM Nepal Time
  workflow_dispatch:  # Manual trigger option

jobs:
  collect-news:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'

      - name: Install dependencies
        run: |
          pip install -r news_aggregator/requirements.txt

      - name: Run news collection
        run: |
          cd news_aggregator
          python comprehensive_rss_collector.py --limit 100

      - name: Commit updated database
        run: |
          git config user.name "News Collector Bot"
          git config user.email "bot@nepal-platform.local"
          git add news_aggregator/nepal_news_intelligence.db
          git commit -m "🤖 Automated news collection $(date)" || echo "No changes"
          git push
```

**Pros**: Free, reliable, no local machine dependency
**Cons**: Database in git (size concerns), need to handle conflicts

#### **Option B: PythonAnywhere (FREE Tier)**
```python
# Schedule on PythonAnywhere dashboard
# Daily tasks at 6 AM, 12 PM, 6 PM
# Point to your script: /home/username/nepal_platform/news_aggregator/comprehensive_rss_collector.py
```

**Pros**: Always-on, dedicated environment, database stays external
**Cons**: Free tier limits (1 scheduled task), need to upgrade for multiple times

#### **Option C: Google Cloud Functions (Generous Free Tier)**
```python
# cloud_function/main.py
import functions_framework
from google.cloud import storage
import subprocess

@functions_framework.http
def collect_news(request):
    """HTTP Cloud Function for news collection"""

    # Download latest database from Cloud Storage
    # Run collection
    # Upload updated database back

    result = subprocess.run(['python', 'comprehensive_rss_collector.py', '--limit', '100'])

    if result.returncode == 0:
        return {'status': 'success', 'articles': 'collected'}
    else:
        return {'status': 'error'}, 500
```

**Deployment**:
```bash
# Deploy function
gcloud functions deploy collect-news \
  --runtime python39 \
  --trigger-http \
  --schedule="15 0,6,12 * * *"
```

---

### **SOLUTION 3: Celery + RabbitMQ** (Enterprise Scale)

For when you scale to 100+ sources:

```python
# celery_app.py
from celery import Celery
from celery.schedules import crontab

app = Celery('news_collector', broker='pyamqp://guest@localhost//')

@app.task(bind=True, max_retries=3)
def collect_from_source(self, source_url):
    try:
        # Collection logic
        pass
    except Exception as exc:
        raise self.retry(exc=exc, countdown=60)

# Schedule configuration
app.conf.beat_schedule = {
    'morning-collection': {
        'task': 'collect_all_sources',
        'schedule': crontab(hour=0, minute=15),  # 6 AM Nepal
    },
    'evening-collection': {
        'task': 'collect_all_sources',
        'schedule': crontab(hour=12, minute=15),  # 6 PM Nepal
    },
}
```

---

### **RECOMMENDED IMPLEMENTATION SEQUENCE**

**Week 1**: Local Cron + Logging
```bash
1. Create wrapper script with logging
2. Set up cron jobs (6 AM, 12 PM, 6 PM)
3. Monitor logs for 7 days
4. Verify collection consistency
```

**Week 2**: Health Monitoring
```bash
1. Implement health check script
2. Add hourly health check to cron
3. Set up failure notifications (email/Slack)
4. Create weekly cleanup job
```

**Week 3**: Cloud Backup
```bash
1. Set up GitHub Actions as backup
2. Configure PythonAnywhere account
3. Test cloud collection independently
4. Implement failover logic
```

**Month 2+**: Scale & Optimize
```bash
1. Monitor collection success rate
2. Add more sources as needed
3. Implement Celery if scaling beyond 20 sources
4. Consider database replication
```

---

## 👥 PART 2: OFFICE TRACKER USER DATA STORAGE

### **Current Situation**
- Office Tracker collects user selections (province, district, ward, office type, services)
- Currently: In-memory only (lost on page refresh)
- Need: Privacy-compliant persistent storage with analytics

---

### **DATABASE SCHEMA DESIGN**

#### **Approach: Hybrid Schema**
- **Normalized for operations** (fast writes, data integrity)
- **Denormalized views for analytics** (fast reads, reporting)

```sql
-- =====================================================
-- OFFICE TRACKER USER DATA SCHEMA
-- Privacy-Compliant, GDPR-Ready
-- =====================================================

-- Table 1: User Sessions (Anonymous)
CREATE TABLE user_sessions (
    session_id TEXT PRIMARY KEY,  -- UUID, no PII
    session_start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_end_time TIMESTAMP,
    user_agent TEXT,              -- Browser info
    ip_hash TEXT,                 -- SHA-256 hash (for rate limiting, not tracking)
    consent_given BOOLEAN DEFAULT FALSE,  -- GDPR consent
    consent_timestamp TIMESTAMP,
    INDEX idx_session_start (session_start_time)
);

-- Table 2: Office Selections (User Choices)
CREATE TABLE office_selections (
    selection_id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    selection_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Location choices
    province TEXT NOT NULL,
    district TEXT NOT NULL,
    ward TEXT,  -- Optional

    -- Office type choice
    office_type TEXT NOT NULL,

    -- Services requested (JSON array for flexibility)
    services_requested TEXT,  -- JSON: ["passport", "citizenship"]
    custom_service_description TEXT,  -- If "other" selected

    -- Timer data (optional, based on user consent)
    timer_used BOOLEAN DEFAULT FALSE,
    wait_time_seconds INTEGER,
    service_completion_time_seconds INTEGER,

    -- Experience ratings (optional)
    service_rating INTEGER CHECK(service_rating BETWEEN 1 AND 5),
    staff_rating INTEGER CHECK(staff_rating BETWEEN 1 AND 5),
    facility_rating INTEGER CHECK(facility_rating BETWEEN 1 AND 5),

    -- Privacy flag
    anonymous_submission BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (session_id) REFERENCES user_sessions(session_id),
    INDEX idx_timestamp (selection_timestamp),
    INDEX idx_province_district (province, district),
    INDEX idx_office_type (office_type)
);

-- Table 3: Service Feedback (Detailed User Input)
CREATE TABLE service_feedback (
    feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
    selection_id INTEGER NOT NULL,
    feedback_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Issue reporting
    issue_reported BOOLEAN DEFAULT FALSE,
    issue_category TEXT,  -- "corruption", "delay", "poor_service", "other"
    issue_description TEXT,  -- User-provided details

    -- Suggestions
    improvement_suggestions TEXT,

    -- Sentiment analysis (auto-generated)
    sentiment_score REAL,  -- -1 to 1
    sentiment_category TEXT,  -- "positive", "neutral", "negative"

    FOREIGN KEY (selection_id) REFERENCES office_selections(selection_id),
    INDEX idx_issue_category (issue_category)
);

-- Table 4: Analytics Aggregates (Denormalized for Fast Queries)
CREATE TABLE daily_office_analytics (
    analytics_id INTEGER PRIMARY KEY AUTOINCREMENT,
    analytics_date DATE NOT NULL,
    province TEXT NOT NULL,
    district TEXT NOT NULL,
    office_type TEXT NOT NULL,

    -- Aggregated metrics
    total_visits INTEGER DEFAULT 0,
    unique_sessions INTEGER DEFAULT 0,
    average_wait_time_seconds REAL,
    average_service_time_seconds REAL,
    average_service_rating REAL,
    average_staff_rating REAL,
    average_facility_rating REAL,

    -- Issue tracking
    corruption_reports INTEGER DEFAULT 0,
    delay_complaints INTEGER DEFAULT 0,
    poor_service_complaints INTEGER DEFAULT 0,

    -- Top services requested (JSON array)
    top_services TEXT,  -- JSON: [{"service": "passport", "count": 45}, ...]

    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(analytics_date, province, district, office_type),
    INDEX idx_date_province (analytics_date, province)
);

-- =====================================================
-- PRIVACY & COMPLIANCE
-- =====================================================

-- Table 5: Data Retention Policy Tracking
CREATE TABLE data_retention_log (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cleanup_date DATE NOT NULL,
    records_deleted INTEGER,
    retention_period_days INTEGER,
    table_name TEXT NOT NULL,
    INDEX idx_cleanup_date (cleanup_date)
);

-- =====================================================
-- VIEWS FOR ANALYTICS (Fast Read Access)
-- =====================================================

-- Most visited offices by district
CREATE VIEW v_popular_offices AS
SELECT
    province,
    district,
    office_type,
    COUNT(*) as visit_count,
    AVG(service_rating) as avg_rating,
    DATE(selection_timestamp) as visit_date
FROM office_selections
WHERE selection_timestamp >= DATE('now', '-30 days')
GROUP BY province, district, office_type, DATE(selection_timestamp)
ORDER BY visit_count DESC;

-- Service demand heatmap
CREATE VIEW v_service_demand AS
SELECT
    province,
    district,
    json_each.value as service_name,
    COUNT(*) as demand_count
FROM office_selections, json_each(services_requested)
WHERE selection_timestamp >= DATE('now', '-7 days')
GROUP BY province, district, service_name
ORDER BY demand_count DESC;

-- Average wait times by office type
CREATE VIEW v_wait_time_analysis AS
SELECT
    office_type,
    province,
    COUNT(*) as submissions,
    AVG(wait_time_seconds) / 60.0 as avg_wait_minutes,
    MAX(wait_time_seconds) / 60.0 as max_wait_minutes,
    MIN(wait_time_seconds) / 60.0 as min_wait_minutes
FROM office_selections
WHERE timer_used = TRUE
  AND selection_timestamp >= DATE('now', '-30 days')
GROUP BY office_type, province
ORDER BY avg_wait_minutes DESC;
```

---

### **PRIVACY-COMPLIANT IMPLEMENTATION**

#### **Frontend: Consent Management**
```javascript
// office-tracker-v2.html

// Step 1: Show consent banner
function showConsentBanner() {
    const banner = `
        <div id="consent-banner" class="consent-overlay">
            <div class="consent-content">
                <h3>🔒 तपाईंको गोपनीयता महत्वपूर्ण छ</h3>
                <p>हामी तपाईंको कार्यालय भ्रमण र सेवा अनुभव सुधार गर्न डाटा सङ्कलन गर्छौं।</p>

                <h4>हामी यो डाटा सङ्कलन गर्छौं:</h4>
                <ul>
                    <li>✅ तपाईंले छनोट गर्नुभएको प्रदेश र जिल्ला</li>
                    <li>✅ तपाईंले खोज्नुभएको सेवा</li>
                    <li>✅ तपाईंको सेवा मूल्यांकन (यदि दिनुभयो भने)</li>
                </ul>

                <h4>हामी यो डाटा सङ्कलन गर्दैनौं:</h4>
                <ul>
                    <li>❌ तपाईंको नाम वा ठेगाना</li>
                    <li>❌ तपाईंको फोन नम्बर वा इमेल</li>
                    <li>❌ कुनै व्यक्तिगत पहिचान जानकारी</li>
                </ul>

                <div class="consent-actions">
                    <button onclick="acceptConsent()">✅ स्वीकार गर्नुहोस्</button>
                    <button onclick="declineConsent()">❌ अस्वीकार गर्नुहोस्</button>
                    <a href="/privacy-policy.html">गोपनीयता नीति पढ्नुहोस्</a>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', banner);
}

// Step 2: Handle consent
function acceptConsent() {
    trackingData.consentGiven = true;
    trackingData.consentTimestamp = new Date().toISOString();
    localStorage.setItem('officeTrackerConsent', 'granted');
    document.getElementById('consent-banner').remove();
    initializeTracking();
}

function declineConsent() {
    trackingData.consentGiven = false;
    localStorage.setItem('officeTrackerConsent', 'declined');
    document.getElementById('consent-banner').remove();
    // Still allow app use, but no data collection
}

// Step 3: Data submission with privacy
async function submitSelectionData() {
    const submissionData = {
        sessionId: trackingData.sessionId,
        consentGiven: trackingData.consentGiven,

        // Only include if consent given
        selections: trackingData.consentGiven ? {
            province: trackingData.province,
            district: trackingData.district,
            ward: trackingData.ward,
            officeType: trackingData.officeType,
            services: trackingData.services,
            customService: trackingData.customServiceDescription
        } : null,

        // Timer data only if explicitly opted in
        timerData: trackingData.timerOptIn ? {
            waitTimeSeconds: trackingData.waitTimeSeconds,
            serviceTimeSeconds: trackingData.serviceTimeSeconds
        } : null,

        // Ratings always anonymous
        ratings: trackingData.ratingsProvided ? {
            serviceRating: trackingData.serviceRating,
            staffRating: trackingData.staffRating,
            facilityRating: trackingData.facilityRating
        } : null,

        timestamp: new Date().toISOString()
    };

    try {
        const response = await fetch('/api/office-selections', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData)
        });

        if (response.ok) {
            showNotification('✅ धन्यवाद! तपाईंको प्रतिक्रिया सुरक्षित गरियो।');
        }
    } catch (error) {
        console.error('Submission error:', error);
    }
}
```

#### **Backend: FastAPI Endpoint with Validation**
```python
# office_tracker/webapp_backend/api/office_selections.py
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field, validator
from typing import List, Optional
from datetime import datetime
import hashlib
import uuid

router = APIRouter()

class OfficeSelection(BaseModel):
    sessionId: str = Field(..., min_length=36, max_length=36)
    consentGiven: bool

    # Location (required if consent given)
    province: Optional[str]
    district: Optional[str]
    ward: Optional[str]

    # Office details
    officeType: Optional[str]
    services: Optional[List[str]]
    customService: Optional[str]

    # Timer data (only if opted in)
    waitTimeSeconds: Optional[int]
    serviceTimeSeconds: Optional[int]

    # Ratings
    serviceRating: Optional[int] = Field(None, ge=1, le=5)
    staffRating: Optional[int] = Field(None, ge=1, le=5)
    facilityRating: Optional[int] = Field(None, ge=1, le=5)

    @validator('services')
    def validate_services(cls, v):
        if v and len(v) > 10:  # Reasonable limit
            raise ValueError('Too many services selected')
        return v

@router.post("/office-selections")
async def submit_selection(selection: OfficeSelection, request: Request):
    """
    Submit office selection data with privacy compliance
    """

    # Validate consent
    if not selection.consentGiven:
        # Still log anonymous aggregate data
        await log_anonymous_visit(selection)
        return {"status": "received", "tracking": "declined"}

    # Generate IP hash (for rate limiting, not tracking)
    client_ip = request.client.host
    ip_hash = hashlib.sha256(client_ip.encode()).hexdigest()

    # Store session data
    await db.execute("""
        INSERT OR IGNORE INTO user_sessions (session_id, ip_hash, consent_given, consent_timestamp)
        VALUES (?, ?, ?, ?)
    """, (selection.sessionId, ip_hash, True, datetime.now()))

    # Store selection data
    selection_id = await db.execute("""
        INSERT INTO office_selections (
            session_id, province, district, ward, office_type,
            services_requested, custom_service_description,
            timer_used, wait_time_seconds, service_completion_time_seconds,
            service_rating, staff_rating, facility_rating,
            anonymous_submission
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        selection.sessionId,
        selection.province,
        selection.district,
        selection.ward,
        selection.officeType,
        json.dumps(selection.services) if selection.services else None,
        selection.customService,
        bool(selection.waitTimeSeconds),
        selection.waitTimeSeconds,
        selection.serviceTimeSeconds,
        selection.serviceRating,
        selection.staffRating,
        selection.facilityRating,
        True  # Always anonymous
    ))

    # Update aggregates (for fast analytics)
    await update_daily_analytics(selection)

    return {
        "status": "success",
        "selectionId": selection_id,
        "message": "Data stored securely and anonymously"
    }

async def update_daily_analytics(selection: OfficeSelection):
    """Update aggregated analytics table"""
    today = datetime.now().date()

    await db.execute("""
        INSERT INTO daily_office_analytics (
            analytics_date, province, district, office_type,
            total_visits, unique_sessions
        ) VALUES (?, ?, ?, ?, 1, 1)
        ON CONFLICT(analytics_date, province, district, office_type)
        DO UPDATE SET
            total_visits = total_visits + 1,
            average_service_rating = (
                (average_service_rating * total_visits + ?) / (total_visits + 1)
            ),
            last_updated = CURRENT_TIMESTAMP
    """, (
        today,
        selection.province,
        selection.district,
        selection.officeType,
        selection.serviceRating or 0
    ))
```

---

### **DATA RETENTION & CLEANUP**

```python
# office_tracker/webapp_backend/scripts/data_cleanup.py
from datetime import datetime, timedelta

async def cleanup_old_data():
    """
    GDPR-compliant data cleanup
    Retention policy: 90 days for raw data, 2 years for aggregates
    """

    cutoff_date = datetime.now() - timedelta(days=90)

    # Delete old selections
    deleted_count = await db.execute("""
        DELETE FROM office_selections
        WHERE selection_timestamp < ?
    """, (cutoff_date,))

    # Delete orphaned sessions
    await db.execute("""
        DELETE FROM user_sessions
        WHERE session_id NOT IN (
            SELECT DISTINCT session_id FROM office_selections
        )
    """)

    # Log cleanup
    await db.execute("""
        INSERT INTO data_retention_log (cleanup_date, records_deleted, retention_period_days, table_name)
        VALUES (?, ?, 90, 'office_selections')
    """, (datetime.now().date(), deleted_count))

    print(f"✅ Cleaned up {deleted_count} records older than 90 days")

# Run weekly via cron
# 0 2 * * 0 python webapp_backend/scripts/data_cleanup.py
```

---

## 🎮 PART 3: POLITICAL GAME USER DATA STORAGE

### **Game Analytics Schema**

```sql
-- =====================================================
-- POLITICAL GAME USER DATA SCHEMA
-- Player Choices, Game Progression, Learning Analytics
-- =====================================================

-- Table 1: Game Sessions
CREATE TABLE game_sessions (
    session_id TEXT PRIMARY KEY,  -- UUID
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    character_selected TEXT,  -- "prachanda", "balen", "binod", etc.
    game_mode TEXT,  -- "tutorial", "campaign", "crisis"

    -- Progress tracking
    total_play_time_seconds INTEGER DEFAULT 0,
    levels_completed INTEGER DEFAULT 0,
    decisions_made INTEGER DEFAULT 0,

    -- Learning metrics
    constitutional_knowledge_score REAL,  -- 0-100
    political_strategy_score REAL,
    ethical_decision_score REAL,

    -- Session metadata
    browser_language TEXT,
    device_type TEXT,  -- "desktop", "mobile", "tablet"

    consent_given BOOLEAN DEFAULT FALSE,

    INDEX idx_character (character_selected),
    INDEX idx_started_at (started_at)
);

-- Table 2: Player Decisions (Core Game Choices)
CREATE TABLE player_decisions (
    decision_id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    decision_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Decision context
    scenario_id TEXT NOT NULL,  -- "budget_allocation_2025", "corruption_scandal_01"
    decision_point TEXT NOT NULL,  -- Specific choice point in scenario

    -- Choice made
    choice_selected TEXT NOT NULL,  -- "allocate_to_education", "investigate_corruption"
    alternative_choices TEXT,  -- JSON: ["ignore_issue", "delegate_to_committee"]

    -- Decision metadata
    time_taken_seconds INTEGER,  -- How long to decide
    difficulty_level INTEGER,  -- 1-5

    -- Outcomes (calculated after choice)
    public_approval_change INTEGER,  -- -100 to +100
    constitutional_adherence_score REAL,  -- 0-100
    long_term_impact_score REAL,  -- 0-100

    -- Educational value
    learning_objective TEXT,  -- What this teaches
    constitutional_article_referenced TEXT,  -- e.g., "Article 51(a)"

    FOREIGN KEY (session_id) REFERENCES game_sessions(session_id),
    INDEX idx_scenario (scenario_id),
    INDEX idx_timestamp (decision_timestamp)
);

-- Table 3: Quiz Responses (Constitutional Knowledge Testing)
CREATE TABLE quiz_responses (
    response_id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    response_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Quiz details
    quiz_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    question_category TEXT,  -- "fundamental_rights", "directive_principles", etc.

    -- Response
    answer_selected TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    is_correct BOOLEAN,

    -- Analytics
    time_to_answer_seconds INTEGER,
    attempts_count INTEGER DEFAULT 1,
    hint_used BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (session_id) REFERENCES game_sessions(session_id),
    INDEX idx_quiz_category (question_category),
    INDEX idx_correct (is_correct)
);

-- Table 4: Character Progression
CREATE TABLE character_progression (
    progression_id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    character_name TEXT NOT NULL,

    -- Skill levels
    revolutionary_leadership INTEGER DEFAULT 0,
    corruption_fighting INTEGER DEFAULT 0,
    economic_genius INTEGER DEFAULT 0,
    strategic_mastermind INTEGER DEFAULT 0,
    idealistic_vision INTEGER DEFAULT 0,
    outsider_perspective INTEGER DEFAULT 0,

    -- Achievements unlocked
    achievements_unlocked TEXT,  -- JSON array
    badges_earned TEXT,  -- JSON array

    -- Milestone tracking
    current_level INTEGER DEFAULT 1,
    experience_points INTEGER DEFAULT 0,

    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (session_id) REFERENCES game_sessions(session_id),
    INDEX idx_character (character_name)
);

-- Table 5: Learning Analytics Aggregates
CREATE TABLE learning_analytics (
    analytics_id INTEGER PRIMARY KEY AUTOINCREMENT,
    analytics_date DATE NOT NULL,

    -- Overall metrics
    total_players INTEGER DEFAULT 0,
    total_decisions_made INTEGER DEFAULT 0,
    average_session_duration_minutes REAL,

    -- Character popularity
    most_popular_character TEXT,
    character_distribution TEXT,  -- JSON: {"prachanda": 120, "balen": 95, ...}

    -- Educational effectiveness
    average_quiz_accuracy REAL,  -- 0-100
    most_challenging_topics TEXT,  -- JSON array
    most_learned_constitutional_articles TEXT,  -- JSON array

    -- Decision patterns
    most_common_decisions TEXT,  -- JSON
    ethical_decision_trend REAL,  -- Trend over time

    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(analytics_date),
    INDEX idx_date (analytics_date)
);

-- =====================================================
-- ANALYTICS VIEWS
-- =====================================================

-- Popular game scenarios
CREATE VIEW v_popular_scenarios AS
SELECT
    scenario_id,
    COUNT(*) as play_count,
    AVG(time_taken_seconds) as avg_decision_time,
    AVG(public_approval_change) as avg_approval_impact
FROM player_decisions
WHERE decision_timestamp >= DATE('now', '-30 days')
GROUP BY scenario_id
ORDER BY play_count DESC;

-- Character performance analysis
CREATE VIEW v_character_performance AS
SELECT
    gs.character_selected,
    COUNT(DISTINCT gs.session_id) as total_players,
    AVG(gs.total_play_time_seconds) / 60.0 as avg_play_minutes,
    AVG(gs.constitutional_knowledge_score) as avg_knowledge_score,
    COUNT(pd.decision_id) as total_decisions
FROM game_sessions gs
LEFT JOIN player_decisions pd ON gs.session_id = pd.session_id
WHERE gs.started_at >= DATE('now', '-30 days')
GROUP BY gs.character_selected
ORDER BY total_players DESC;

-- Learning effectiveness
CREATE VIEW v_learning_effectiveness AS
SELECT
    question_category,
    COUNT(*) as total_questions,
    SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_answers,
    ROUND(100.0 * SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) / COUNT(*), 2) as accuracy_percentage,
    AVG(time_to_answer_seconds) as avg_time_seconds
FROM quiz_responses
WHERE response_timestamp >= DATE('now', '-7 days')
GROUP BY question_category
ORDER BY accuracy_percentage ASC;  -- Hardest topics first
```

---

### **GAME DATA COLLECTION - JAVASCRIPT IMPLEMENTATION**

```javascript
// political_game/analytics.js

class GameAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.consentGiven = this.checkConsent();
        this.decisionBuffer = [];
        this.syncInterval = 30000;  // Sync every 30 seconds

        if (this.consentGiven) {
            this.startSession();
            this.setupAutoSync();
        }
    }

    generateSessionId() {
        return 'game-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    checkConsent() {
        const consent = localStorage.getItem('gameAnalyticsConsent');
        if (!consent) {
            this.showConsentDialog();
            return false;
        }
        return consent === 'granted';
    }

    showConsentDialog() {
        // Similar to office tracker consent banner
        const dialog = `
            <div class="consent-dialog">
                <h3>🎮 खेल सुधार गर्न मद्दत गर्नुहोस्</h3>
                <p>हामी तपाईंको खेल अनुभव र सिकाइ ट्र्याक गर्न चाहन्छौं।</p>
                <button onclick="gameAnalytics.acceptConsent()">स्वीकार गर्नुहोस्</button>
                <button onclick="gameAnalytics.declineConsent()">अस्वीकार गर्नुहोस्</button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', dialog);
    }

    acceptConsent() {
        localStorage.setItem('gameAnalyticsConsent', 'granted');
        this.consentGiven = true;
        this.startSession();
        this.setupAutoSync();
        document.querySelector('.consent-dialog').remove();
    }

    declineConsent() {
        localStorage.setItem('gameAnalyticsConsent', 'declined');
        this.consentGiven = false;
        document.querySelector('.consent-dialog').remove();
    }

    async startSession() {
        const sessionData = {
            sessionId: this.sessionId,
            characterSelected: gameState.selectedCharacter,
            gameMode: gameState.mode,
            startedAt: new Date().toISOString(),
            deviceType: this.getDeviceType()
        };

        await this.sendToServer('/api/game-sessions', sessionData);
    }

    trackDecision(scenarioId, choiceSelected, metadata = {}) {
        if (!this.consentGiven) return;

        const decision = {
            sessionId: this.sessionId,
            scenarioId: scenarioId,
            decisionPoint: metadata.decisionPoint || 'main',
            choiceSelected: choiceSelected,
            alternativeChoices: metadata.alternatives || [],
            timeTakenSeconds: metadata.timeTaken || 0,
            difficultyLevel: metadata.difficulty || 3,
            timestamp: new Date().toISOString()
        };

        this.decisionBuffer.push(decision);

        // Immediate sync for critical decisions
        if (metadata.critical) {
            this.syncDecisions();
        }
    }

    trackQuizResponse(quizId, questionId, answerSelected, correctAnswer) {
        if (!this.consentGiven) return;

        const response = {
            sessionId: this.sessionId,
            quizId: quizId,
            questionId: questionId,
            questionCategory: this.getCategoryFromQuestionId(questionId),
            answerSelected: answerSelected,
            correctAnswer: correctAnswer,
            isCorrect: answerSelected === correctAnswer,
            timeToAnswerSeconds: this.calculateAnswerTime(),
            timestamp: new Date().toISOString()
        };

        this.sendToServer('/api/quiz-responses', response);
    }

    updateCharacterProgression(skills, achievements) {
        if (!this.consentGiven) return;

        const progression = {
            sessionId: this.sessionId,
            characterName: gameState.selectedCharacter,
            ...skills,
            achievementsUnlocked: JSON.stringify(achievements),
            currentLevel: gameState.playerLevel,
            experiencePoints: gameState.xp
        };

        this.sendToServer('/api/character-progression', progression);
    }

    async syncDecisions() {
        if (this.decisionBuffer.length === 0) return;

        const decisions = [...this.decisionBuffer];
        this.decisionBuffer = [];

        await this.sendToServer('/api/player-decisions/batch', {
            decisions: decisions
        });
    }

    setupAutoSync() {
        setInterval(() => {
            this.syncDecisions();
        }, this.syncInterval);

        // Sync on page unload
        window.addEventListener('beforeunload', () => {
            this.syncDecisions();
            this.endSession();
        });
    }

    async endSession() {
        const endData = {
            sessionId: this.sessionId,
            endedAt: new Date().toISOString(),
            totalPlayTimeSeconds: this.calculateTotalPlayTime(),
            levelsCompleted: gameState.levelsCompleted,
            decisionsMade: gameState.totalDecisions
        };

        navigator.sendBeacon('/api/game-sessions/end', JSON.stringify(endData));
    }

    async sendToServer(endpoint, data) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                console.error('Analytics sync failed:', await response.text());
            }
        } catch (error) {
            console.error('Analytics error:', error);
            // Store failed requests for retry
            this.storeFailedRequest(endpoint, data);
        }
    }

    getDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }

    getCategoryFromQuestionId(questionId) {
        // Extract category from question ID format: "cat_fundright_q001"
        const parts = questionId.split('_');
        return parts[1] || 'general';
    }

    calculateAnswerTime() {
        // Track time between question display and answer
        return Math.floor((Date.now() - this.questionStartTime) / 1000);
    }

    calculateTotalPlayTime() {
        return Math.floor((Date.now() - this.sessionStartTime) / 1000);
    }
}

// Initialize analytics
const gameAnalytics = new GameAnalytics();

// Example usage in game:
function onPlayerChoice(scenarioId, choice, alternatives) {
    gameAnalytics.trackDecision(scenarioId, choice, {
        alternatives: alternatives,
        timeTaken: getDecisionTime(),
        difficulty: getCurrentScenarioDifficulty(),
        decisionPoint: getCurrentDecisionPoint()
    });
}
```

---

## 📊 ANALYTICS DASHBOARD

### **Real-Time Analytics Endpoint**

```python
# webapp_backend/api/analytics.py
from fastapi import APIRouter
from typing import List, Dict

router = APIRouter()

@router.get("/analytics/office-tracker/dashboard")
async def get_office_tracker_dashboard():
    """Real-time office tracker analytics"""

    # Most visited offices
    popular_offices = await db.fetch_all("""
        SELECT * FROM v_popular_offices LIMIT 10
    """)

    # Service demand heatmap
    service_demand = await db.fetch_all("""
        SELECT * FROM v_service_demand
    """)

    # Average wait times
    wait_times = await db.fetch_all("""
        SELECT * FROM v_wait_time_analysis
    """)

    # Corruption reports by district
    corruption_map = await db.fetch_all("""
        SELECT
            province,
            district,
            SUM(corruption_reports) as total_reports,
            DATE(analytics_date) as report_date
        FROM daily_office_analytics
        WHERE analytics_date >= DATE('now', '-30 days')
        GROUP BY province, district, DATE(analytics_date)
        ORDER BY total_reports DESC
    """)

    return {
        "popularOffices": popular_offices,
        "serviceDemand": service_demand,
        "waitTimes": wait_times,
        "corruptionMap": corruption_map,
        "lastUpdated": datetime.now().isoformat()
    }

@router.get("/analytics/political-game/dashboard")
async def get_game_dashboard():
    """Game analytics dashboard"""

    # Character popularity
    character_stats = await db.fetch_all("""
        SELECT * FROM v_character_performance
    """)

    # Learning effectiveness
    learning_stats = await db.fetch_all("""
        SELECT * FROM v_learning_effectiveness
    """)

    # Popular scenarios
    popular_scenarios = await db.fetch_all("""
        SELECT * FROM v_popular_scenarios LIMIT 10
    """)

    # Daily player count trend
    player_trend = await db.fetch_all("""
        SELECT
            analytics_date,
            total_players,
            average_session_duration_minutes
        FROM learning_analytics
        WHERE analytics_date >= DATE('now', '-30 days')
        ORDER BY analytics_date
    """)

    return {
        "characterStats": character_stats,
        "learningEffectiveness": learning_stats,
        "popularScenarios": popular_scenarios,
        "playerTrend": player_trend,
        "lastUpdated": datetime.now().isoformat()
    }
```

---

## 🚀 IMPLEMENTATION ROADMAP

### **Week 1: Foundation**
```
Day 1-2: News Collection Automation
├── Create wrapper scripts
├── Set up cron jobs (6 AM, 12 PM, 6 PM)
└── Test logging system

Day 3-4: Database Schema Setup
├── Create office_selections tables
├── Create game_sessions tables
└── Set up indexes and views

Day 5-7: Frontend Consent Integration
├── Add consent banners
├── Implement localStorage checks
└── Test consent flow
```

### **Week 2: Data Collection**
```
Day 1-3: Office Tracker Backend
├── Implement FastAPI endpoints
├── Add validation and privacy checks
└── Test data submission

Day 4-5: Game Analytics Backend
├── Implement game session endpoints
├── Add decision tracking
└── Test batch submissions

Day 6-7: Testing & Refinement
├── End-to-end testing
├── Performance optimization
└── Security audit
```

### **Week 3: Analytics & Monitoring**
```
Day 1-3: Analytics Views
├── Create dashboard queries
├── Build analytics API endpoints
└── Test aggregation performance

Day 4-5: Monitoring Setup
├── Health checks for collection
├── Data retention automation
└── Alert system configuration

Day 6-7: Documentation
├── API documentation
├── Privacy policy updates
└── User guides
```

---

## ✅ SUCCESS METRICS

### **News Collection**
- ✅ 3 daily collections (6 AM, 12 PM, 6 PM)
- ✅ 95%+ success rate
- ✅ 50-100 new articles per day
- ✅ < 5 minute collection time
- ✅ Automated health monitoring

### **User Data Collection**
- ✅ 100% GDPR compliance
- ✅ Consent rate > 60%
- ✅ < 500ms API response time
- ✅ 99.9% data integrity
- ✅ 90-day retention policy enforced

### **Analytics Quality**
- ✅ Real-time dashboard updates
- ✅ Aggregates updated hourly
- ✅ < 2 second query response
- ✅ Actionable insights available
- ✅ Privacy-preserving analytics

---

*Implementation Plan Created: October 5, 2025*
*Ready for phased deployment starting Week 1*
*All systems designed for privacy, scalability, and reliability*
