-- =====================================================
-- OFFICE TRACKER USER DATA SCHEMA
-- Privacy-Compliant, GDPR-Ready
-- Created: October 5, 2025
-- =====================================================

-- Table 1: User Sessions (Anonymous)
CREATE TABLE IF NOT EXISTS user_sessions (
    session_id TEXT PRIMARY KEY,
    session_start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_end_time TIMESTAMP,
    user_agent TEXT,
    ip_hash TEXT,
    consent_given BOOLEAN DEFAULT FALSE,
    consent_timestamp TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_session_start ON user_sessions(session_start_time);

-- Table 2: Office Selections (User Choices)
CREATE TABLE IF NOT EXISTS office_selections (
    selection_id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    selection_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Location choices
    province TEXT NOT NULL,
    district TEXT NOT NULL,
    ward TEXT,

    -- Office type choice
    office_type TEXT NOT NULL,

    -- Services requested (JSON array)
    services_requested TEXT,
    custom_service_description TEXT,

    -- Timer data (optional)
    timer_used BOOLEAN DEFAULT FALSE,
    wait_time_seconds INTEGER,
    service_completion_time_seconds INTEGER,

    -- Experience ratings (optional)
    service_rating INTEGER CHECK(service_rating BETWEEN 1 AND 5),
    staff_rating INTEGER CHECK(staff_rating BETWEEN 1 AND 5),
    facility_rating INTEGER CHECK(facility_rating BETWEEN 1 AND 5),

    -- Privacy flag
    anonymous_submission BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (session_id) REFERENCES user_sessions(session_id)
);

CREATE INDEX IF NOT EXISTS idx_selection_timestamp ON office_selections(selection_timestamp);
CREATE INDEX IF NOT EXISTS idx_province_district ON office_selections(province, district);
CREATE INDEX IF NOT EXISTS idx_office_type ON office_selections(office_type);

-- Table 3: Service Feedback (Detailed User Input)
CREATE TABLE IF NOT EXISTS service_feedback (
    feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
    selection_id INTEGER NOT NULL,
    feedback_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Issue reporting
    issue_reported BOOLEAN DEFAULT FALSE,
    issue_category TEXT,
    issue_description TEXT,

    -- Suggestions
    improvement_suggestions TEXT,

    -- Sentiment analysis (auto-generated)
    sentiment_score REAL,
    sentiment_category TEXT,

    FOREIGN KEY (selection_id) REFERENCES office_selections(selection_id)
);

CREATE INDEX IF NOT EXISTS idx_issue_category ON service_feedback(issue_category);

-- Table 4: Analytics Aggregates (Denormalized for Fast Queries)
CREATE TABLE IF NOT EXISTS daily_office_analytics (
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

    -- Top services (JSON array)
    top_services TEXT,

    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(analytics_date, province, district, office_type)
);

CREATE INDEX IF NOT EXISTS idx_analytics_date ON daily_office_analytics(analytics_date, province);

-- Table 5: Data Retention Log
CREATE TABLE IF NOT EXISTS data_retention_log (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cleanup_date DATE NOT NULL,
    records_deleted INTEGER,
    retention_period_days INTEGER,
    table_name TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_cleanup_date ON data_retention_log(cleanup_date);

-- =====================================================
-- ANALYTICS VIEWS
-- =====================================================

-- Most visited offices by district
CREATE VIEW IF NOT EXISTS v_popular_offices AS
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
CREATE VIEW IF NOT EXISTS v_service_demand AS
SELECT
    province,
    district,
    json_extract(value, '$') as service_name,
    COUNT(*) as demand_count
FROM office_selections, json_each(services_requested)
WHERE selection_timestamp >= DATE('now', '-7 days')
GROUP BY province, district, service_name
ORDER BY demand_count DESC;

-- Average wait times by office type
CREATE VIEW IF NOT EXISTS v_wait_time_analysis AS
SELECT
    office_type,
    province,
    COUNT(*) as submissions,
    AVG(wait_time_seconds) / 60.0 as avg_wait_minutes,
    MAX(wait_time_seconds) / 60.0 as max_wait_minutes,
    MIN(wait_time_seconds) / 60.0 as min_wait_minutes
FROM office_selections
WHERE timer_used = 1
  AND selection_timestamp >= DATE('now', '-30 days')
GROUP BY office_type, province
ORDER BY avg_wait_minutes DESC;

-- =====================================================
-- INSERT SAMPLE DATA FOR TESTING
-- =====================================================

-- Sample session
INSERT OR IGNORE INTO user_sessions (session_id, consent_given, consent_timestamp)
VALUES ('test-session-001', 1, CURRENT_TIMESTAMP);

-- Sample selection
INSERT OR IGNORE INTO office_selections (
    session_id, province, district, office_type,
    services_requested, service_rating, staff_rating, facility_rating
) VALUES (
    'test-session-001',
    'Bagmati',
    'Kathmandu',
    'District Administration',
    '["citizenship", "passport_recommendation"]',
    4, 3, 4
);

-- Verify tables created
SELECT 'Office Tracker Schema Created Successfully' AS status;
SELECT 'Tables created: ' || COUNT(*) AS table_count FROM sqlite_master WHERE type='table';
SELECT 'Views created: ' || COUNT(*) AS view_count FROM sqlite_master WHERE type='view';
