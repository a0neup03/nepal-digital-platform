-- =====================================================
-- POLITICAL GAME USER DATA SCHEMA
-- Player Choices, Game Progression, Learning Analytics
-- Created: October 5, 2025
-- =====================================================

-- Table 1: Game Sessions
CREATE TABLE IF NOT EXISTS game_sessions (
    session_id TEXT PRIMARY KEY,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    character_selected TEXT,
    game_mode TEXT,

    -- Progress tracking
    total_play_time_seconds INTEGER DEFAULT 0,
    levels_completed INTEGER DEFAULT 0,
    decisions_made INTEGER DEFAULT 0,

    -- Learning metrics
    constitutional_knowledge_score REAL,
    political_strategy_score REAL,
    ethical_decision_score REAL,

    -- Session metadata
    browser_language TEXT,
    device_type TEXT,

    consent_given BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_game_character ON game_sessions(character_selected);
CREATE INDEX IF NOT EXISTS idx_game_started ON game_sessions(started_at);

-- Table 2: Player Decisions (Core Game Choices)
CREATE TABLE IF NOT EXISTS player_decisions (
    decision_id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    decision_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Decision context
    scenario_id TEXT NOT NULL,
    decision_point TEXT NOT NULL,

    -- Choice made
    choice_selected TEXT NOT NULL,
    alternative_choices TEXT,

    -- Decision metadata
    time_taken_seconds INTEGER,
    difficulty_level INTEGER,

    -- Outcomes
    public_approval_change INTEGER,
    constitutional_adherence_score REAL,
    long_term_impact_score REAL,

    -- Educational value
    learning_objective TEXT,
    constitutional_article_referenced TEXT,

    FOREIGN KEY (session_id) REFERENCES game_sessions(session_id)
);

CREATE INDEX IF NOT EXISTS idx_decision_scenario ON player_decisions(scenario_id);
CREATE INDEX IF NOT EXISTS idx_decision_timestamp ON player_decisions(decision_timestamp);

-- Table 3: Quiz Responses (Constitutional Knowledge Testing)
CREATE TABLE IF NOT EXISTS quiz_responses (
    response_id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    response_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Quiz details
    quiz_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    question_category TEXT,

    -- Response
    answer_selected TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    is_correct BOOLEAN,

    -- Analytics
    time_to_answer_seconds INTEGER,
    attempts_count INTEGER DEFAULT 1,
    hint_used BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (session_id) REFERENCES game_sessions(session_id)
);

CREATE INDEX IF NOT EXISTS idx_quiz_category ON quiz_responses(question_category);
CREATE INDEX IF NOT EXISTS idx_quiz_correct ON quiz_responses(is_correct);

-- Table 4: Character Progression
CREATE TABLE IF NOT EXISTS character_progression (
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

    -- Achievements
    achievements_unlocked TEXT,
    badges_earned TEXT,

    -- Milestone tracking
    current_level INTEGER DEFAULT 1,
    experience_points INTEGER DEFAULT 0,

    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (session_id) REFERENCES game_sessions(session_id)
);

CREATE INDEX IF NOT EXISTS idx_progression_character ON character_progression(character_name);

-- Table 5: Learning Analytics Aggregates
CREATE TABLE IF NOT EXISTS learning_analytics (
    analytics_id INTEGER PRIMARY KEY AUTOINCREMENT,
    analytics_date DATE NOT NULL,

    -- Overall metrics
    total_players INTEGER DEFAULT 0,
    total_decisions_made INTEGER DEFAULT 0,
    average_session_duration_minutes REAL,

    -- Character popularity
    most_popular_character TEXT,
    character_distribution TEXT,

    -- Educational effectiveness
    average_quiz_accuracy REAL,
    most_challenging_topics TEXT,
    most_learned_constitutional_articles TEXT,

    -- Decision patterns
    most_common_decisions TEXT,
    ethical_decision_trend REAL,

    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(analytics_date)
);

CREATE INDEX IF NOT EXISTS idx_learning_date ON learning_analytics(analytics_date);

-- =====================================================
-- ANALYTICS VIEWS
-- =====================================================

-- Popular game scenarios
CREATE VIEW IF NOT EXISTS v_popular_scenarios AS
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
CREATE VIEW IF NOT EXISTS v_character_performance AS
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
CREATE VIEW IF NOT EXISTS v_learning_effectiveness AS
SELECT
    question_category,
    COUNT(*) as total_questions,
    SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_answers,
    ROUND(100.0 * SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) / COUNT(*), 2) as accuracy_percentage,
    AVG(time_to_answer_seconds) as avg_time_seconds
FROM quiz_responses
WHERE response_timestamp >= DATE('now', '-7 days')
GROUP BY question_category
ORDER BY accuracy_percentage ASC;

-- =====================================================
-- INSERT SAMPLE DATA FOR TESTING
-- =====================================================

-- Sample game session
INSERT OR IGNORE INTO game_sessions (
    session_id, character_selected, game_mode, consent_given
) VALUES (
    'test-game-001', 'balen', 'tutorial', 1
);

-- Sample decision
INSERT OR IGNORE INTO player_decisions (
    session_id, scenario_id, decision_point, choice_selected,
    time_taken_seconds, difficulty_level, public_approval_change
) VALUES (
    'test-game-001', 'corruption_scandal_01', 'initial_response',
    'investigate_thoroughly', 45, 3, 15
);

-- Sample quiz response
INSERT OR IGNORE INTO quiz_responses (
    session_id, quiz_id, question_id, question_category,
    answer_selected, correct_answer, is_correct, time_to_answer_seconds
) VALUES (
    'test-game-001', 'quiz_fundright', 'q001', 'fundamental_rights',
    'right_to_equality', 'right_to_equality', 1, 12
);

-- Verify tables created
SELECT 'Political Game Schema Created Successfully' AS status;
SELECT 'Tables created: ' || COUNT(*) AS table_count FROM sqlite_master WHERE type='table';
SELECT 'Views created: ' || COUNT(*) AS view_count FROM sqlite_master WHERE type='view';
