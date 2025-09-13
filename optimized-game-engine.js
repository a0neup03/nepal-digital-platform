// ============================================================================
// 🇳🇵 NEPAL OPTIMIZED POLITICAL STRATEGY ENGINE
// ============================================================================
// High-performance, smooth gameplay with Nepali language support
// Analytics dashboard with decision graphs and performance optimization
// ============================================================================

console.log('🚀 JavaScript file loading...');

// ============================================================================
// PERFORMANCE OPTIMIZATION CONFIGURATION
// ============================================================================

const PERFORMANCE_CONFIG = {
    // UI Update optimization
    UI_UPDATE_THROTTLE: 50, // 50ms between UI updates (20 FPS) - faster
    CHART_UPDATE_THROTTLE: 200, // 200ms between chart updates - faster
    ANIMATION_FRAME_BUDGET: 16, // 16ms per frame (60 FPS)
    
    // Memory management
    MAX_EVENT_HISTORY: 100,
    MAX_CACHED_CALCULATIONS: 50,
    CLEANUP_INTERVAL: 30000, // 30 seconds
    
    // Event optimization
    EVENT_POOL_SIZE: 10,
    PROBABILITY_CACHE_TTL: 60000, // 1 minute
    
    // Real-time settings (optimized for thoughtful gameplay)
    EVENT_INTERVAL_MIN: 60000,  // 1 minute
    EVENT_INTERVAL_MAX: 120000, // 2 minutes
    
    // Critical thresholds for analytics
    CRITICAL_THRESHOLDS: {
        stability: 30,
        economy: 25,
        morale: 35,
        stress: 75
    },
    
    // Pause system
    PAUSE_TIMEOUT: 300000, // 5 minutes auto-pause timeout
    IDLE_TIMEOUT: 60000    // 1 minute idle warning
};

// ============================================================================
// COMPREHENSIVE NEPALI-ENGLISH TRANSLATIONS
// ============================================================================

const TRANSLATIONS = {
    ne: {
        // Loading and setup
        'loading_title': 'उन्नत राजनीतिक रणनीति इन्जिन',
        'initializing': 'सम्भाव्यता म्याट्रिक्स प्रारम्भ गर्दै...',
        'loading_events': 'घटनाहरू लोड गर्दै...',
        'building_profiles': 'चरित्र प्रोफाइलहरू निर्माण गर्दै...',
        'ready': 'तपाईंको राजनीतिक यात्रा सुरु गर्न तयार!',
        
        // Character selection
        'choose_character': '🇳🇵 के होला त देशमा अब?',
        'character_subtitle': 'कुन नेता बनेर नेपालको भविष्य लेख्ने? हरेक चरित्रको फरक कथा र चुनौती छ।',
        'advanced_features': '✨ उन्नत सुविधाहरू: प्रति पात्र ५०+ घटनाहरू • रियल-टाइम गेमप्ले • सम्भाव्यता-आधारित परिणामहरू',
        'start_journey': '🚀 राजनीतिक यात्रा सुरु गर्नुहोस्',
        
        // Characters
        'Sher Bahadur Deuba': 'शेर बहादुर देउवा',
        'deuba_desc': '५ पटकका प्रधानमन्त्री • कूटनीतिक मास्टर • गठबन्धन निर्माता',
        'KP Sharma Oli': 'केपी शर्मा ओली', 
        'oli_desc': 'बलियो नेता • निर्णायक • राष्ट्रवादी',
        'Prachanda': 'प्रचण्ड',
        'prachanda_desc': 'क्रान्तिकारी • रणनीतिक • गृहयुद्ध नेता',
        'Balen Shah': 'बालेन शाह',
        'clean_desc': 'काठमाडौं मेयर • भ्रष्टाचार विरोधी • इन्जिनियर पृष्ठभूमि',
        'Normal Citizen': 'सामान्य नागरिक',
        'citizen_desc': 'बाहिरी • सम्बन्धित • अप्रत्याशित',
        'Binod Chaudhary': 'बिनोद चौधरी',
        'corrupt_desc': 'व्यापारी राजनीतिज्ञ • आर्थिक प्रतिभाशाली • व्यावहारिक',
        'The Wildcard': 'जोकर कार्ड',
        'wildcard_desc': 'रहस्यमय • अप्रत्याशित • खेल परिवर्तक',
        'genz_desc': '२२ वर्षीय कलेजका विद्यार्थी - पार्टी, होमवर्क, इन्टर्नशिप र ट्रेकिंग मा व्यस्त। राजनीति मा चासो कम तर सामाजिक सञ्जाल मा सक्रिय।',
        
        // New Characters
        'Sushila Karki': 'सुशीला कार्की',
        'sushila_karki_desc': 'पूर्व प्रधान न्यायाधीश • संवैधानिक विशेषज्ञ • नेपालकी पहिली महिला प्रधानमन्त्री • संकट व्यवस्थापक',
        'Gagan Thapa': 'गागन थापा', 
        'gagan_thapa_desc': 'युवा नेता • कांग्रेसका उदीयमान व्यक्तित्व • पुस्ता परिवर्तनको मुख • वक्तृत्व कुशल',
        'Rabi Lamichhane': 'रवि लामिछाने',
        'rabi_lamichhane_desc': 'मिडिया व्यक्तित्व • भ्रष्टाचार विरोधी • जनवादी अपील • राजनीतिक बाहिरी व्यक्ति',
        
        // Game interface
        'game_title': 'नेपाल राजनीतिक रणनीति',
        'next_event': 'अर्को घटना',
        'day': 'दिन',
        'political_capital': 'राजनीतिक पूँजी',
        'decisions': 'निर्णयहरू',
        
        // Metrics
        'stability': 'स्थिरता',
        'economy': 'अर्थतन्त्र', 
        'morale': 'मनोबल',
        'stress': 'तनाव',
        'coalition_relations': 'गठबन्धन सम्बन्धहरू',
        
        // Game elements
        'character_profile': 'चरित्र प्रोफाइल',
        'recent_decisions': 'हालका निर्णयहरू',
        'event_probability': 'घटना सम्भावना',
        'active_effects': 'सक्रिय प्रभावहरू र नतिजाहरू',
        'no_effects': 'कुनै सक्रिय प्रभावहरू छैनन्',
        'no_decisions': 'अहिलेसम्म कुनै निर्णय छैन',
        
        // Analytics
        'analytics_title': 'निर्णय विश्लेषण',
        'score_trends': 'स्कोर ट्रेन्ड',
        'decision_history': 'निर्णय इतिहास',
        'performance_stats': 'प्रदर्शन तथ्याङ्क',
        'success_rate': 'सफलता दर',
        'avg_score': 'औसत स्कोर',
        'critical_decisions': 'महत्वपूर्ण निर्णयहरू',
        'time_in_office': 'कार्यालयमा समय',
        
        // Game over
        'game_over': 'राजनीतिक करियर समाप्त!',
        'career_ended': 'तपाईंको नेतृत्व समाप्त भएको छ।',
        'play_again': 'फेरि खेल्नुहोस्',
        'analyze_game': 'निर्णयहरू विश्लेषण गर्नुहोस्',
        
        // Events and choices
        'calculating': 'गणना गर्दै...',
        'success': 'सफलता',
        'partial_success': 'आंशिक सफलता',
        'constitutional': 'संवैधानिक',
        'unconstitutional': 'असंवैधानिक',
        'success_chance': 'सफलताको सम्भावना',
        
        // Factions
        'military': 'सेना', 
        'judiciary': 'न्यायपालिका',
        'media': 'मिडिया',
        'youth': 'युवा',
        'international': 'अन्तर्राष्ट्रिय',
        'congress': 'कांग्रेस',
        'business': 'व्यापार',
        'civil_society': 'नागरिक समाज',
        'maoist_network': 'माओवादी नेटवर्क',
        
        // Event Types
        'constitutional_crisis': 'संवैधानिक संकट',
        'economic_emergency': 'आर्थिक आपतकाल',
        'social_conflict': 'सामाजिक द्वन्द्व',
        'international_relations': 'अन्तर्राष्ट्रिय सम्बन्ध',
        'natural_disaster': 'प्राकृतिक विपत्ति',
        'security_challenge': 'सुरक्षा चुनौती'
    },
    en: {
        // Loading and setup
        'loading_title': 'Advanced Political Strategy Engine',
        'initializing': 'Initializing probability matrices...',
        'loading_events': 'Loading events...',
        'building_profiles': 'Building character profiles...',
        'ready': 'Ready to begin your political journey!',
        
        // Character selection
        'choose_character': '🇳🇵 What Will Happen to the Country Now?',
        'character_subtitle': 'Which leader will you become to write Nepal\'s future? Every character has different stories and challenges.',
        'advanced_features': '✨ Advanced Features: 50+ events per character • Real-time gameplay • Probability-based outcomes',
        'start_journey': '🚀 Begin Political Journey',
        
        // Characters
        'Sher Bahadur Deuba': 'Sher Bahadur Deuba',
        'deuba_desc': '5-time PM • Diplomatic Master • Coalition Builder', 
        'KP Sharma Oli': 'KP Sharma Oli',
        'oli_desc': 'Strong Leader • Decisive • Nationalist',
        'Prachanda': 'Prachanda',
        'prachanda_desc': '10-year civil war leader • Revolutionary-turned-politician • Mass movement expert • Political survivor',
        'Clean Politician': 'Clean Politician',
        'clean_desc': 'Anti-Corruption • Idealistic • Politically Weak',
        'Normal Citizen': 'Normal Citizen', 
        'citizen_desc': 'Outsider • Relatable • Unpredictable',
        'Corrupt Operator': 'Corrupt Operator',
        'corrupt_desc': 'System Savvy • Economic Genius • Morally Gray',
        'The Wildcard': 'The Wildcard',
        'wildcard_desc': 'Mysterious • Unpredictable • Game Changer',
        'genz_desc': '22-year-old college student - Busy with parties, homework, internships and hiking. Low interest in politics but active on social media.',
        
        // New Characters
        'sushila_karki_desc': 'Former Chief Justice • Constitutional Expert • Nepal\'s First Female PM • Crisis Manager',
        'gagan_thapa_desc': 'Youth Leader • Rising Congress Figure • Generational Change Voice • Articulate Speaker',
        'rabi_lamichhane_desc': 'Media Personality • Anti-Corruption Crusader • Populist Appeal • Political Outsider',
        
        // Game interface
        'game_title': 'Nepal Political Strategy',
        'next_event': 'Next Event',
        'day': 'Day',
        'political_capital': 'Political Capital',
        'decisions': 'Decisions',
        
        // Metrics
        'stability': 'Stability',
        'economy': 'Economy',
        'morale': 'Morale', 
        'stress': 'Stress',
        'coalition_relations': 'Coalition Relations',
        
        // Game elements
        'character_profile': 'Character Profile',
        'recent_decisions': 'Recent Decisions',
        'event_probability': 'Event Probability',
        'active_effects': 'Active Effects & Consequences',
        'no_effects': 'No active effects',
        'no_decisions': 'No decisions yet',
        
        // Analytics
        'analytics_title': 'Decision Analysis',
        'score_trends': 'Score Trends',
        'decision_history': 'Decision History',
        'performance_stats': 'Performance Stats',
        'success_rate': 'Success Rate',
        'avg_score': 'Average Score',
        'critical_decisions': 'Critical Decisions',
        'time_in_office': 'Time in Office',
        
        // Game over
        'game_over': 'Political Career Ended!',
        'career_ended': 'Your leadership has come to an end.',
        'play_again': 'Play Again',
        'analyze_game': 'Analyze Decisions',
        
        // Events and choices
        'calculating': 'Calculating...',
        'success': 'Success',
        'partial_success': 'Partial Success',
        'constitutional': 'Constitutional',
        'unconstitutional': 'Unconstitutional', 
        'success_chance': 'Success Chance',
        
        // Factions
        'military': 'Military',
        'judiciary': 'Judiciary', 
        'media': 'Media',
        'youth': 'Youth',
        'international': 'International',
        'congress': 'Congress',
        'business': 'Business',
        'civil_society': 'Civil Society',
        'maoist_network': 'Maoist Network',
        
        // Event Types
        'constitutional_crisis': 'Constitutional Crisis',
        'economic_emergency': 'Economic Emergency',
        'social_conflict': 'Social Conflict',
        'international_relations': 'International Relations',
        'natural_disaster': 'Natural Disaster',
        'security_challenge': 'Security Challenge'
    }
};

// ============================================================================
// PERFORMANCE-OPTIMIZED GAME STATE
// ============================================================================

let gameState = {
    // Core metrics
    stability: 75, economy: 60, morale: 70, stress: 15,
    coalition_relations: 60, // Coalition relationship strength
    
    // Advanced systems
    politicalCapital: 100,
    daysPassed: 0,
    decisionsMade: 0,
    
    // Character system
    character: null,
    characterTraits: {},
    
    // Faction relations (-100 to 100)
    factions: {
        military: 50, judiciary: 50, media: 50, 
        youth: 50, international: 50, congress: 50,
        business: 50, civil_society: 50,
        // Additional faction relations from events
        china_relations: 0, human_rights: 50, republican: 50, 
        constitutional: 50, freedom: 50
    },
    
    // Event system
    currentEvent: null,
    usedEvents: [],
    eventHistory: [],
    activeEffects: [],
    nextEventTime: 0, // Will be set when game starts
    
    // Performance optimization
    lastUIUpdate: 0,
    uiUpdatePending: false,
    probabilityCache: new Map(),
    
    // STORYLINE CONTINUITY & CONSEQUENCE TRACKING SYSTEM
    characterRelationships: {
        prachanda_deuba: 0,      // -100 to +100 relationship score
        prachanda_oli: 0,
        prachanda_genz: -20,     // Youth disappointed in old revolutionary
        deuba_oli: -10,          // Political rivals
        deuba_gagan: 20,         // Mentor-mentee potential
        genz_gagan: 30,          // Youth alliance potential
        karki_all: 10            // Neutral respect for female PM
    },
    
    pastDecisions: [],           // Track all major decisions made
    unlockedScenarios: [],       // Scenarios unlocked by previous choices
    characterReputation: {
        prachanda: { authenticity: 50, trustworthiness: 30, revolutionary_cred: 70 },
        deuba: { experience: 90, diplomacy: 85, youth_connection: 20 },
        genz_student: { idealism: 90, experience: 10, tech_savvy: 95 }
    },
    
    currentStoryArcs: [],        // Active storylines that connect scenarios
    consequencesToApply: [],     // Delayed consequences from previous choices
    
    // Analytics tracking
    analyticsData: {
        decisions: [],
        scoreHistory: [],
        startTime: null
    },
    
    // Game control
    isPaused: false,
    lastUserActivity: Date.now(),
    idleWarningShown: false,
    
    // UI state
    currentTheme: 'dark',
    currentLanguage: 'ne' // Default to Nepali
};

// ============================================================================
// OPTIMIZED CHARACTERS WITH NEPALI EVENTS
// ============================================================================

const CHARACTERS = {
    
    prachanda: {
        name: "Pushpa Kamal Dahal 'Prachanda'",
        nameKey: "Prachanda",
        icon: "😈",
        descKey: "prachanda_desc",
        
        traits: {
            revolutionary_leader: 0.95,
            strategic_mastermind: 0.85,
            mass_mobilizer: 0.90,
            civil_war_commander: 0.80,
            political_survivor: 0.85,
            ideological_flexible: 0.70,
            youth_inspiration: -0.10,
            establishment_suspicion: -0.40
        },
        
        startingStats: {
            stability: 60, economy: 45, morale: 85, stress: 30,
            politicalCapital: 95,
            factionBonus: { 
                youth: -10, 
                civil_society: 25, 
                military: -15, 
                business: -20, 
                international: -10,
                maoist_network: 40 
            }
        },
        
        eventModifiers: {
            revolutionary_movement: 2.0,
            youth_uprising: 1.8,
            constitutional_crisis: 1.6,
            economic_inequality: 1.7,
            international_pressure: 1.4,
            establishment_politics: 0.6,
            military_affairs: 1.5,
            corruption_scandals: 1.3
        }
    },
    
    clean_politician: {
        name: "Balen Shah",
        nameKey: "Balen Shah",
        icon: "😇",
        descKey: "clean_desc",
        
        traits: {
            corruption_fighter: 0.9,
            idealistic: 0.7,
            honest: 0.8,
            politically_weak: -0.5,
            media_darling: 0.6
        },
        
        startingStats: {
            stability: 60, economy: 70, morale: 85, stress: 5,
            politicalCapital: 70,
            factionBonus: { media: 25, civil_society: 30, youth: 20 }
        },
        
        eventModifiers: {
            corruption: 1.8,
            reform: 1.6,
            political_manipulation: 1.4,
            idealistic_choices: 1.5
        }
    },
    
    normal_citizen: {
        name: "Normal Citizen",
        nameKey: "Normal Citizen",
        icon: "🙋🏽",
        descKey: "citizen_desc",
        
        traits: {
            outsider_perspective: 0.6,
            relatable: 0.8,
            learning_curve: -0.3,
            authentic: 0.7,
            unpredictable: 0.5
        },
        
        startingStats: {
            stability: 55, economy: 60, morale: 90, stress: 30,
            politicalCapital: 60,
            factionBonus: { youth: 35, civil_society: 25 }
        },
        
        eventModifiers: {
            common_issues: 1.6,
            learning_experiences: 1.7,
            political_traps: 1.5,
            authenticity_tests: 1.4
        }
    },
    
    corrupt_operator: {
        name: "Binod Chaudhary",
        nameKey: "Binod Chaudhary",
        icon: "💰",
        descKey: "corrupt_desc",
        
        traits: {
            system_knowledge: 0.9,
            economic_genius: 0.8,
            network_access: 0.7,
            morally_flexible: -0.6,
            corruption_master: 0.5
        },
        
        startingStats: {
            stability: 70, economy: 85, morale: 45, stress: 15,
            politicalCapital: 130,
            factionBonus: { business: 40, military: 15 }
        },
        
        eventModifiers: {
            economic_opportunities: 1.8,
            corruption_temptations: 1.9,
            ethical_dilemmas: 1.6,
            system_manipulation: 1.5
        }
    },
    
    wildcard: {
        name: "The Wildcard",
        nameKey: "The Wildcard",
        icon: "🎭",
        descKey: "wildcard_desc",
        
        traits: {
            unpredictable: 1.0,
            game_changer: 0.8,
            mysterious: 0.6,
            chaotic_genius: 0.7,
            wild_card_factor: 0.9
        },
        
        startingStats: {
            stability: Math.floor(Math.random() * 60) + 40,
            economy: Math.floor(Math.random() * 60) + 40,
            morale: Math.floor(Math.random() * 60) + 40,
            stress: Math.floor(Math.random() * 30) + 10,
            politicalCapital: Math.floor(Math.random() * 80) + 80
        },
        
        eventModifiers: {
            wild_events: 2.0,
            chaos_opportunities: 1.8,
            game_changing: 1.6,
            unpredictable: 1.9
        }
    },

    genz_student: {
        name: "राजन (GenZ Student)",
        nameKey: "राजन - युवा विद्यार्थी", 
        icon: "🎓",
        descKey: "genz_desc",
        
        traits: {
            tech_savvy: 0.9,
            social_media_influence: 0.8,
            idealistic: 0.7,
            inexperienced: -0.5,
            adaptable: 0.6,
            politically_naive: -0.8
        },
        
        startingStats: {
            stability: 50, economy: 40, morale: 80, stress: 30,
            politicalCapital: 20,
            factionBonus: { youth: 30, media: 15, civil_society: 10 },
            isNonPolitical: true, // Special flag for non-political character
            politicalActivation: 0 // Tracks political involvement (0-100)
        },
        
        eventModifiers: {
            social: 1.8,
            education: 1.6,
            technology: 1.7,
            lifestyle: 1.9,
            career: 1.5,
            political: 0.1, // Very low chance of political events initially
            crisis: 0.3
        }
    },

    sushila_karki: {
        name: "Sushila Karki",
        nameKey: "Sushila Karki",
        icon: "⚖️",
        descKey: "sushila_karki_desc",
        
        traits: {
            judicial_experience: 0.95,
            constitutional_expert: 0.90,
            first_woman_pm: 0.85,
            crisis_manager: 0.80,
            establishment_credibility: 0.75,
            political_outsider: -0.60
        },
        
        startingStats: {
            stability: 75, economy: 70, morale: 80, stress: 25,
            politicalCapital: 85,
            factionBonus: { 
                judiciary: 40, 
                civil_society: 25, 
                international: 20,
                congress: -15,
                military: 10
            }
        },
        
        eventModifiers: {
            constitutional_crisis: 1.8,
            judicial_affairs: 2.0,
            women_issues: 1.6,
            crisis_management: 1.5,
            political_parties: 0.7
        }
    },

    gagan_thapa: {
        name: "Gagan Thapa",
        nameKey: "Gagan Thapa", 
        icon: "🌟",
        descKey: "gagan_thapa_desc",
        
        traits: {
            youth_leader: 0.85,
            congress_insider: 0.75,
            generational_bridge: 0.80,
            articulate_speaker: 0.90,
            reform_minded: 0.70,
            establishment_pressure: -0.40
        },
        
        startingStats: {
            stability: 65, economy: 60, morale: 85, stress: 20,
            politicalCapital: 90,
            factionBonus: { 
                youth: 35, 
                congress: 20, 
                media: 15,
                civil_society: 10
            }
        },
        
        eventModifiers: {
            youth_politics: 1.7,
            party_renewal: 1.6,
            generational_conflict: 1.8,
            congress_affairs: 1.4,
            social_media: 1.5
        }
    },

    rabi_lamichhane: {
        name: "Rabi Lamichhane",
        nameKey: "Rabi Lamichhane",
        icon: "📺",
        descKey: "rabi_lamichhane_desc",
        
        traits: {
            media_expertise: 0.95,
            public_communication: 0.90,
            anti_corruption: 0.80,
            political_outsider: 0.70,
            populist_appeal: 0.85,
            establishment_enemy: -0.50
        },
        
        startingStats: {
            stability: 60, economy: 55, morale: 90, stress: 30,
            politicalCapital: 75,
            factionBonus: { 
                media: 30, 
                civil_society: 25, 
                youth: 20,
                congress: -20,
                business: -15
            }
        },
        
        eventModifiers: {
            media_affairs: 2.0,
            anti_corruption: 1.8,
            public_opinion: 1.7,
            political_establishment: 0.6,
            transparency: 1.6
        }
    },

    deuba: {
        name: "Sher Bahadur Deuba",
        nameKey: "Sher Bahadur Deuba",
        icon: "👴🏽", 
        descKey: "deuba_desc",
        
        traits: {
            experienced: 0.8,
            diplomatic: 0.9,
            coalition_builder: 0.7,
            age_wisdom: 0.6,
            corruption_vulnerable: -0.3
        },
        
        startingStats: {
            stability: 80, economy: 65, morale: 75, stress: 10,
            politicalCapital: 120,
            factionBonus: { congress: 20, international: 15 }
        },
        
        eventModifiers: {
            diplomatic: 1.5,
            coalition: 1.4,
            crisis: 0.8,
            corruption: 1.2
        }
    },

    kp_oli: {
        name: "KP Sharma Oli", 
        nameKey: "KP Sharma Oli",
        icon: "💪🏽",
        descKey: "oli_desc",
        
        traits: {
            authoritarian: 0.7,
            nationalist: 0.8,
            decisive: 0.6,
            controversial: -0.4,
            china_friendly: 0.5
        },
        
        startingStats: {
            stability: 70, economy: 55, morale: 65, stress: 20,
            politicalCapital: 110,
            factionBonus: { military: 25, business: 10 }
        },
        
        eventModifiers: {
            crisis: 1.3,
            nationalism: 1.6,
            china_relations: 1.4,
            media_conflict: 1.5
        }
    }
};

// ============================================================================
// OPTIMIZED EVENT POOLS WITH NEPALI CONTENT
// ============================================================================

const NEPALI_EVENTS = [
    {
        id: "student_protest_ne",
        title: {
            ne: "विद्यार्थी आन्दोलनमा मृत्यु",
            en: "Student Protests Turn Deadly"
        },
        description: {
            ne: "प्रहरीले विद्यार्थी प्रदर्शनकारीहरूमाथि गोली चलायो, ८ जना युवाहरूको मृत्यु भयो। क्रोधित भीड सरकारी भवनहरूतर्फ मार्च गर्दै।",
            en: "Police opened fire on student protesters, killing 8 young people. Angry crowds march toward government buildings."
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1612538498456-e861df91d4d6?w=400&h=200&fit=crop&q=60", // Student protest in Nepal
        baseWeight: 0.55,
        choices: [
            {
                text: {
                    ne: "शान्ति पुनर्स्थापना गर्न सेना परिचालन गर्नुहोस्",
                    en: "Deploy military to restore order"
                },
                outcome: {
                    ne: "शान्ति स्थापना भयो तर अन्तर्राष्ट्रिय निन्दा। तपाईंलाई अधिनायकवादी भनियो।",
                    en: "Order restored but international condemnation. You're labeled authoritarian."
                },
                isConstitutional: false,
                effects: { stability: -25, morale: -30, stress: 15, military: 10, international: -20, coalition_relations: -15 }
            },
            {
                text: {
                    ne: "विद्यार्थी नेताहरूसँग व्यक्तिगत भेट गर्नुहोस्",
                    en: "Meet personally with student leaders"
                },
                outcome: {
                    ne: "साहसी कदम जसले तनाव कम गर्न सक्छ वा तपाईंलाई जोखिममा पार्न सक्छ।",
                    en: "Bold move that could calm tensions or put you at risk."
                },
                isConstitutional: true,
                effects: { stability: 10, morale: 15, stress: -5, youth: 20, coalition_relations: 5 }
            }
        ]
    },

    // PRACHANDA EXPANDED SCENARIOS - Building to 30+ scenarios
    // Theme: Revolutionary leader dealing with accountability and legacy
    {
        id: "prachanda_revolution_accountability_2025", 
        title: {
            ne: "क्रान्तिकालीन अपराधको जवाफदेहिता",
            en: "Revolutionary War Crimes Accountability"
        },
        description: {
            ne: "मानव अधिकार संगठनहरूले १० वर्षे गृहयुद्धका घटनाहरूको छानबिन माग्दै। तपाईंको नेतृत्वमा भएका घटनाहरूका लागि अन्तर्राष्ट्रिय दबाब बढ्दै। पुराना योद्धाहरूले 'विश्वासघात' भन्ने चेतावनी। अतीत र वर्तमान बीचको द्वन्द्व।",
            en: "Human rights organizations demanding investigation of 10-year civil war incidents. International pressure increasing for incidents under your leadership. Old fighters warn of 'betrayal'. Conflict between past and present."
        },
        type: "war_crimes",
        imageUrl: "https://images.unsplash.com/photo-1586715196006-cd2e4df15d18?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.45,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "prachanda",
        
        choices: [
            {
                text: {
                    ne: "सत्य र मेलमिलाप आयोग मार्फत खुला छानबिन गर्ने",
                    en: "Conduct open investigation through Truth and Reconciliation Commission"
                },
                outcome: {
                    ne: "क्रान्तिकालीन घटनाहरूको निष्पक्ष छानबिनको घोषणा गर्नुभयो। मानव अधिकारकर्मीहरूको प्रशंसा तर पुराना साथीहरूको रोष।",
                    en: "Announced impartial investigation of revolutionary incidents. Praise from human rights activists but anger from old comrades."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 25, stress: 30,
                    civil_society: 40, international: 35, judiciary: 30,
                    maoist_network: -40, military: -20, congress: 15
                }
            },
            {
                text: {
                    ne: "राष्ट्रिय एकताको नाममा अतीतलाई बिर्सने अपील",
                    en: "Appeal to forget past in name of national unity"
                },
                outcome: {
                    ne: "राष्ट्रिय एकताका लागि अतीतका घाउहरू बिर्सेर अगाडि बढ्न आग्रह गर्नुभयो। माओवादी समर्थकहरूको राहत तर पीडितहरूको निराशा।",
                    en: "Urged to move forward forgetting past wounds for national unity. Relief from Maoist supporters but disappointment from victims."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: -10, stress: 20,
                    maoist_network: 30, military: 15, congress: 20,
                    civil_society: -30, international: -25, judiciary: -15
                }
            },
            {
                text: {
                    ne: "गृहयुद्धको ऐतिहासिक आवश्यकता र न्यायको बीचमा संतुलन",
                    en: "Balance between historical necessity of civil war and justice"
                },
                outcome: {
                    ne: "क्रान्तिको औचित्य बताउँदै गल्तीहरूको स्वीकार गर्नुभयो। जटिल तर संतुलित दृष्टिकोण। मिश्रित प्रतिक्रिया।",
                    en: "Acknowledged mistakes while explaining revolution's justification. Complex but balanced approach. Mixed reactions."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 15, stress: 25,
                    civil_society: 20, international: 15, judiciary: 20,
                    maoist_network: 10, congress: 10
                }
            }
        ]
    },

    {
        id: "prachanda_communist_ideology_modern_politics_2025",
        title: {
            ne: "कम्युनिस्ट आदर्श र आधुनिक राजनीति",
            en: "Communist Ideals vs Modern Politics"
        },
        description: {
            ne: "युवा कम्युनिस्टहरूले तपाईंलाई 'पुँजीवादी भएको' आरोप लगाए। विदेशी लगानी, निजीकरण, बजार अर्थतन्त्र स्वीकार गरेको भन्दै आलोचना। तर व्यावहारिक राजनीतिमा यी आवश्यक। क्रान्तिकारी आदर्श र व्यावहारिकता बीचको टकराव।",
            en: "Young communists accuse you of 'becoming capitalist'. Criticized for accepting foreign investment, privatization, market economy. But these are necessary in practical politics. Clash between revolutionary ideals and pragmatism."
        },
        type: "ideological_conflict",
        imageUrl: "https://images.unsplash.com/photo-1586715196006-cd2e4df15d18?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        realWorldEvent: true,
        characterSpecific: "prachanda",
        
        choices: [
            {
                text: {
                    ne: "कम्युनिस्ट आदर्शमा फर्कने घोषणा गर्ने",
                    en: "Announce return to communist ideals"
                },
                outcome: {
                    ne: "शुद्ध कम्युनिस्ट नीति अपनाउने घोषणा गर्नुभयो। युवा कम्युनिस्टहरूको उत्साह तर आर्थिक अस्थिरताको डर।",
                    en: "Announced adoption of pure communist policy. Enthusiasm from young communists but fear of economic instability."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 20, stress: 25,
                    maoist_network: 40, youth: 25, civil_society: 15,
                    business: -40, international: -30, congress: -20
                }
            },
            {
                text: {
                    ne: "नेपाली परिस्थितिमा मिल्ने मिश्रित अर्थतन्त्रको वकालत गर्ने",
                    en: "Advocate mixed economy suitable for Nepali context"
                },
                outcome: {
                    ne: "नेपाली विशेषता अनुसार मिश्रित अर्थनीतिको पक्षमा बोल्नुभयो। व्यावहारिक दृष्टिकोण तर कम्युनिस्ट आधारको असन्तुष्टि।",
                    en: "Spoke for mixed economic policy according to Nepali characteristics. Practical approach but dissatisfaction from communist base."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 10, stress: 15,
                    business: 20, international: 25, congress: 20,
                    maoist_network: -15, youth: -10
                }
            },
            {
                text: {
                    ne: "२१औं शताब्दीको कम्युनिज्मको नयाँ व्याख्या प्रस्तुत गर्ने",
                    en: "Present new interpretation of 21st century communism"
                },
                outcome: {
                    ne: "आधुनिक कम्युनिज्मको नयाँ सिद्धान्त प्रस्तुत गर्नुभयो। बौद्धिक नेतृत्व देखाउनुभयो तर व्यावहारिक कार्यान्वयनमा प्रश्न।",
                    en: "Presented new theory of modern communism. Showed intellectual leadership but questions on practical implementation."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 25, stress: 20,
                    maoist_network: 25, youth: 20, international: 15,
                    civil_society: 20, media: 25
                }
            }
        ]
    },

    // PRACHANDA COMEBACK SCENARIOS - Starting from his current hiding situation
    {
        id: "prachanda_comeback_strategy_2025",
        title: {
            ne: "प्रचण्डको पुनरागमन रणनीति",
            en: "Prachanda's Comeback Strategy"
        },
        description: {
            ne: "सुशीला कार्की अन्तरिम प्रधानमन्त्री भएपछि प्रचण्ड लुकेर बसेका छन्। पार्टी भित्र विभाजन, युवाहरूको आक्रोश, गिरफ्तारीको डर। अब राजनीतिक पुनरागमनको बाटो खोज्नुपर्छ। तपाईं प्रचण्ड हुनुहुन्छ - कसरी फर्कने?",
            en: "After Sushila Karki becomes interim PM, Prachanda is in hiding. Party divided, youth angry, arrest fears. Must find path to political comeback. You are Prachanda - how to return?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.8,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "prachanda",
        
        choices: [
            {
                text: {
                    ne: "सर्वोच्च अदालतमा कानुनी चुनौती - कार्कीको नियुक्ति असंवैधानिक",
                    en: "Legal challenge in Supreme Court - Karki's appointment unconstitutional"
                },
                outcome: {
                    ne: "संविधानविद्हरूले समर्थन गरे। कानुनी लड्दै सम्मानजनक फर्कने मौका। तर ढिलो प्रक्रिया, राजनीतिक शक्ति गुम्ने जोखिम।",
                    en: "Constitutional experts support. Honorable return while fighting legally. But slow process, risk losing political power."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 15, stress: 5,
                    judiciary: 25, congress: 10, international: 15,
                    maoist_network: -5, youth: -10
                }
            },
            {
                text: {
                    ne: "ओली र देउवासँग गुप्त गठबन्धन - 'बिग थ्री' एकजुट भएर फर्कने",
                    en: "Secret alliance with Oli & Deuba - 'Big Three' unite to return"
                },
                outcome: {
                    ne: "पुराना घाइते नेताहरू एकजुट भएर शक्तिशाली छन्। तर जनताले 'पुराना चेहराहरूको फर्कने' भनेर आक्रोश व्यक्त गरे।",
                    en: "Old wounded leaders united are powerful. But people angry about 'old faces returning'."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: -15, stress: 10,
                    congress: 30, military: 15, business: 20,
                    youth: -25, civil_society: -20
                }
            },
            {
                text: {
                    ne: "जनआन्दोलनको नेतृत्व लिने - 'असल शासनको लागि क्रान्ति'",
                    en: "Lead people's movement - 'Revolution for Good Governance'"
                },
                outcome: {
                    ne: "क्रान्तिकारी साख फेरि जीवित! युवाहरू उत्साहित तर सेना र व्यापारीहरू डराए। खतरनाक तर प्रभावशाली।",
                    en: "Revolutionary credibility revived! Youth excited but military and business scared. Dangerous but powerful."
                },
                isConstitutional: false,
                effects: { 
                    stability: -20, morale: 30, stress: 25,
                    youth: 35, maoist_network: 40, civil_society: 15,
                    military: -25, business: -20, international: -15
                }
            },
            {
                text: {
                    ne: "सुशीला कार्कीलाई समर्थन गर्दै सहयोग प्रस्ताव - सम्मानजनक साझेदारी",
                    en: "Support Sushila Karki with cooperation offer - honorable partnership"
                },
                outcome: {
                    ne: "महिला अधिकारकर्मी र मध्यमवर्गीयले सराहना गरे। तर माओवादी कार्यकर्ताले धोका दिएको भने। बुद्धिमत्तापूर्ण तर जोखिमपूर्ण।",
                    en: "Women's rights activists and middle class appreciate. But Maoist cadres feel betrayed. Wise but risky."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 10, stress: -5,
                    judiciary: 20, civil_society: 25, international: 20,
                    maoist_network: -20, youth: -5
                }
            }
        ]
    },

    // DEUBA COMEBACK SCENARIOS - Diplomatic Master's Return Strategy
    {
        id: "deuba_comeback_strategy_2025",
        title: {
            ne: "देउवाको कूटनीतिक पुनरागमन",
            en: "Deuba's Diplomatic Comeback"
        },
        description: {
            ne: "पाँच पटकका प्रधानमन्त्री देउवा अहिले छाया नेता बनेका छन्। कांग्रेसभित्र युवा असन्तुष्टि, अन्तर्राष्ट्रिय साझेदारहरूको चासो। अनुभवी राजनीतिज्ञको रूपमा फर्कने रणनीति बनाउनुपर्छ। तपाईं देउवा हुनुहुन्छ - कसरी नेतृत्व फिर्ता लिने?",
            en: "Five-time PM Deuba now shadow leader. Youth unrest within Congress, international partners interested. Must strategize return as experienced statesman. You are Deuba - how to reclaim leadership?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.75,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "deuba",
        
        choices: [
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय समुदायसँग गुप्त वार्ता - स्थिरताको ग्यारेन्टी",
                    en: "Secret talks with international community - guarantee stability"
                },
                outcome: {
                    ne: "भारत र अमेरिकाले चासो देखाए। राजनीतिक स्थिरताको आश्वासन दिँदै समर्थन प्राप्त गर्ने मौका। तर 'विदेशी कठपुतली' भनिने जोखिम।",
                    en: "India and America show interest. Chance to gain support by guaranteeing stability. But risk being called 'foreign puppet'."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 10, stress: 5,
                    international: 35, business: 25, military: 15,
                    youth: -15, civil_society: -10
                }
            },
            {
                text: {
                    ne: "कांग्रेसमा युवा नेतृत्वलाई अवसर - नयाँ पुस्ताको साथ",
                    en: "Empower young leadership in Congress - ally with new generation"
                },
                outcome: {
                    ne: "गागन थापा र विश्वप्रकाशजस्ता युवा नेताहरूसँग साझेदारी। पार्टी नवीकरण भयो तर पुराना नेताहरूको असन्तुष्टि।",
                    en: "Partnership with young leaders like Gagan Thapa. Party renewed but old leaders unhappy."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: 10,
                    youth: 30, congress: 20, civil_society: 20,
                    business: -5
                }
            },
            {
                text: {
                    ne: "संविधान संशोधनको प्रस्ताव - व्यवस्थापिका सुधार",
                    en: "Propose constitutional amendment - parliamentary reform"
                },
                outcome: {
                    ne: "कानुनी विशेषज्ञता देखाउँदै व्यवस्थापिका सुधारको नेतृत्व लिनुभयो। न्यायपालिकाको समर्थन तर राजनीतिक विरोध।",
                    en: "Lead parliamentary reform showing legal expertise. Judiciary support but political opposition."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 15, stress: 15,
                    judiciary: 30, international: 20, congress: 15,
                    maoist_network: -10, youth: -5
                }
            },
            {
                text: {
                    ne: "राष्ट्रिय एकताको सरकार बनाउने प्रस्ताव - सर्वदलीय सहमति",
                    en: "Propose national unity government - all-party consensus"
                },
                outcome: {
                    ne: "अनुभवी कूटनीतिज्ञको रूपमा सबैलाई एकसाथ ल्याउने प्रयास। स्थिरता बढ्यो तर व्यक्तिगत राजनीतिक शक्ति कम भयो।",
                    en: "Attempt to unite everyone as experienced diplomat. Stability increased but personal political power reduced."
                },
                isConstitutional: true,
                effects: { 
                    stability: 30, morale: 20, stress: -5,
                    congress: 25, military: 20, international: 25,
                    youth: 5, civil_society: 15
                }
            }
        ]
    },

    // GEN Z POLITICAL AWAKENING SCENARIOS - Youth Movement Leadership
    {
        id: "genz_political_awakening_2025",
        title: {
            ne: "जेन जेडको राजनीतिक जागरण",
            en: "Gen Z Political Awakening"
        },
        description: {
            ne: "तपाईं राजन, एक युवा आन्दोलनकारी। सुशीला कार्की PM बनेपछि जेन जेड आन्दोलनले सफलता पायो। अब राजनीतिक शक्ति कसरी प्रयोग गर्ने? पुराना राजनीतिसँग सम्झौता कि नयाँ राजनीति निर्माण? तपाईं जेन जेड नेता हुनुहुन्छ।",
            en: "You are Rajan, young activist. After Sushila Karki becomes PM, Gen Z movement achieved success. Now how to use political power? Compromise with old politics or build new? You are Gen Z leader."
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.85,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "genz_student",
        
        choices: [
            {
                text: {
                    ne: "नयाँ राजनीतिक पार्टी स्थापना - 'युवा शक्ति पार्टी'",
                    en: "Form new political party - 'Youth Power Party'"
                },
                outcome: {
                    ne: "बोल्ड निर्णय! युवाहरू उत्साहित तर राजनीतिक अनुभवको कमी। संसदीय प्रक्रिया सिक्नुपर्ने चुनौती।",
                    en: "Bold decision! Youth excited but lack political experience. Challenge of learning parliamentary process."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 35, stress: 20,
                    youth: 45, civil_society: 30, media: 25,
                    congress: -20, military: -5, business: -10
                }
            },
            {
                text: {
                    ne: "सुशीला कार्कीसँग सहकार्य - संस्थागत सुधारको लागि",
                    en: "Cooperate with Sushila Karki - for institutional reform"
                },
                outcome: {
                    ne: "बुद्धिमत्तापूर्ण साझेदारी। महिला नेतृत्व र युवा शक्तिको संयोजन। संस्थागत सुधारमा प्रगति तर कट्टरपन्थी युवाहरूको आलोचना।",
                    en: "Wise partnership. Combination of women leadership and youth power. Institutional reform progress but radical youth criticism."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 25, stress: 5,
                    youth: 25, civil_society: 35, judiciary: 25,
                    international: 20, congress: 10
                }
            },
            {
                text: {
                    ne: "डिजिटल लोकतन्त्र प्रयोग - अनलाइन सहभागिता बढाउने",
                    en: "Experiment with digital democracy - increase online participation"
                },
                outcome: {
                    ne: "Tech-savvy पुस्ताको नेतृत्वमा नयाँ प्रयोग। अन्तर्राष्ट्रिय ध्यान तर पुराना राजनीतिज्ञहरूको अनुकूलन गर्न समस्या।",
                    en: "New experiment led by tech-savvy generation. International attention but old politicians struggle to adapt."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 30, stress: 15,
                    youth: 40, civil_society: 25, international: 30,
                    congress: -15, military: -10
                }
            },
            {
                text: {
                    ne: "भ्रष्टाचार विरोधी जन अदालत स्थापना - जवाफदेहिता सुनिश्चित गर्ने",
                    en: "Establish anti-corruption people's court - ensure accountability"
                },
                outcome: {
                    ne: "लोकप्रिय तर विवादास्पद निर्णय। जनताले समर्थन गरे तर न्यायपालिकाले अधिकार क्षेत्रको प्रश्न उठायो।",
                    en: "Popular but controversial decision. People support but judiciary questions jurisdiction."
                },
                isConstitutional: false,
                effects: { 
                    stability: -15, morale: 30, stress: 25,
                    youth: 35, civil_society: 20,
                    judiciary: -25, congress: -20, military: -15
                }
            }
        ]
    },

    // KP OLI COMEBACK SCENARIOS - The Wounded Lion's Return
    {
        id: "oli_comeback_strategy_2025",
        title: {
            ne: "केपी ओलीको राजनीतिक पुनरुत्थान",
            en: "KP Oli's Political Resurrection"
        },
        description: {
            ne: "जेन जेड आन्दोलनले तपाईंलाई राजीनामा दिन बाध्य पारेपछि ओली अहिले राजनीतिक मृत्युको छेउमा। एमालेभित्र विद्रोह, युवाहरूको घृणा, अन्तर्राष्ट्रिय समुदायको उपेक्षा। तर अनुभवी राजनीतिज्ञ! तपाईं ओली हुनुहुन्छ - कसरी फेरि उठ्ने?",
            en: "After Gen Z movement forced your resignation, Oli now faces political death. Rebellion within UML, youth hatred, international neglect. But you're an experienced politician! You are Oli - how to rise again?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.8,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "kp_oli",
        
        choices: [
            {
                text: {
                    ne: "चीनसँग आर्थिक सहयोग खोजेर शक्ति फर्काउने - Belt and Road फेरि सक्रिय",
                    en: "Seek economic support from China to regain power - reactivate Belt and Road"
                },
                outcome: {
                    ne: "चीनले चासो देखायो। आर्थिक परियोजनाको वाचा दिँदै राजनीतिक समर्थन प्राप्त गर्ने मौका। तर 'चिनियाँ दलाल' भनिने जोखिम बढ्यो।",
                    en: "China shows interest. Chance to gain political support by promising economic projects. But risk of being called 'Chinese agent' increases."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: -10, stress: 10,
                    international: -15, business: 30, military: 10,
                    youth: -25, civil_society: -20
                }
            },
            {
                text: {
                    ne: "एमाले युवा नेताहरूसँग सम्झौता - पार्टीभित्रको विद्रोह रोक्ने",
                    en: "Compromise with young UML leaders - stop party rebellion"
                },
                outcome: {
                    ne: "ईश्वर पोखरेल र योगेश भट्टराईसँग सम्झौता। पार्टी एकता जोगियो तर नेतृत्व बाँड्नुपर्यो। शक्ति कम भयो तर जिउँदै रहे।",
                    en: "Compromise with Ishwar Pokhrel and Yogesh Bhattarai. Party unity preserved but had to share leadership. Less power but survived."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 5, stress: -5,
                    congress: 10, military: 15, business: 10,
                    youth: -15
                }
            },
            {
                text: {
                    ne: "भारतसँग गुप्त वार्ता - सीमा मामिलामा नरमता देखाउने",
                    en: "Secret talks with India - show flexibility on border issues"
                },
                outcome: {
                    ne: "कालापानी मामिलामा नरम अडान लिएपछि भारतले समर्थन दियो। राजनीतिक स्थिरता बढ्यो तर राष्ट्रवादीहरूले धोका दिएको भने।",
                    en: "After taking soft stance on Kalapani, India provides support. Political stability increased but nationalists feel betrayed."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: -15, stress: 5,
                    international: 25, business: 20, military: 20,
                    youth: -20, civil_society: -15
                }
            },
            {
                text: {
                    ne: "राष्ट्रवादी एजेन्डा फर्काएर जनता जित्ने - 'नेपाल पहिले' नारा",
                    en: "Win people back with nationalist agenda - 'Nepal First' slogan"
                },
                outcome: {
                    ne: "देशभक्ति र राष्ट्रिय गौरवको कुरा गरेर मध्यमवर्गीय समर्थन फर्कायो। तर अन्तर्राष्ट्रिय समुदाय चिन्तित भयो।",
                    en: "Won back middle-class support by talking patriotism and national pride. But international community worried."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 25, stress: 15,
                    youth: -5, civil_society: 15, business: 5,
                    international: -20, congress: -10
                }
            }
        ]
    },

    // SUSHILA KARKI CHALLENGES - First Female PM's Dilemmas  
    {
        id: "karki_pm_challenges_2025",
        title: {
            ne: "सुशीला कार्कीका प्रधानमन्त्री चुनौतीहरू",
            en: "Sushila Karki's PM Challenges"
        },
        description: {
            ne: "नेपालकी पहिली महिला प्रधानमन्त्री बन्नु ऐतिहासिक तर चुनौतीपूर्ण। राजनीतिक दलहरूको विरोध, पुरुष प्रधान राजनीतिमा स्थान बनाउनुपर्ने दबाब। तपाईं सुशीला कार्की हुनुहुन्छ - कसरी शासन गर्ने?",
            en: "Becoming Nepal's first female PM is historic but challenging. Political party opposition, pressure to establish place in male-dominated politics. You are Sushila Karki - how to govern?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.7,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "sushila_karki",
        
        choices: [
            {
                text: {
                    ne: "न्यायिक सुधारमा फोकस - भ्रष्टाचार विरोधी अदालत स्थापना",
                    en: "Focus on judicial reform - establish anti-corruption court"
                },
                outcome: {
                    ne: "न्यायाधीशको अनुभव प्रयोग गरेर न्यायिक व्यवस्था सुधार गर्नुभयो। जनताको ठूलो समर्थन तर राजनीतिज्ञहरू डराए।",
                    en: "Used judicial experience to reform justice system. Huge public support but politicians scared."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 35, stress: 10,
                    judiciary: 40, civil_society: 30, youth: 25,
                    congress: -15, business: -10
                }
            },
            {
                text: {
                    ne: "महिला अधिकार र लैंगिक समानताको एजेन्डा अगाडि बढाउने",
                    en: "Advance women's rights and gender equality agenda"
                },
                outcome: {
                    ne: "ऐतिहासिक महिला नेतृत्वको फाइदा उठाउँदै लैंगिक नीति ल्याउनुभयो। महिलाहरूमा ठूलो उत्साह तर पुरुष राजनीतिज्ञहरूको असहयोग।",
                    en: "Leveraged historic women leadership to bring gender policies. Great excitement among women but non-cooperation from male politicians."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 30, stress: 15,
                    civil_society: 35, youth: 20, international: 25,
                    congress: -20, military: -5
                }
            },
            {
                text: {
                    ne: "राजनीतिक दलहरूसँग वार्ता गरेर आम सहमति खोज्ने",
                    en: "Negotiate with political parties to find consensus"
                },
                outcome: {
                    ne: "कूटनीतिक दक्षता देखाउँदै सबै दलसँग वार्ता गर्नुभयो। राजनीतिक स्थिरता आयो तर साहसिक निर्णय लिन गाह्रो भयो।",
                    en: "Showed diplomatic skill by negotiating with all parties. Political stability came but difficult to make bold decisions."
                },
                isConstitutional: true,
                effects: { 
                    stability: 30, morale: 15, stress: -10,
                    congress: 20, military: 15, business: 15,
                    youth: -5, civil_society: 5
                }
            },
            {
                text: {
                    ne: "संविधान बमोजिम तत्काल चुनावको तयारी गर्ने - लोकतान्त्रिक वैधता",
                    en: "Prepare for immediate elections as per constitution - democratic legitimacy"
                },
                outcome: {
                    ne: "संवैधानिक प्रक्रिया पछ्याउँदै चुनावको घोषणा गर्नुभयो। लोकतान्त्रिक मूल्यको सम्मान भयो तर राजनीतिक अस्थिरता बढ्यो।",
                    en: "Announced elections following constitutional process. Democratic values respected but political instability increased."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 20, stress: 20,
                    judiciary: 25, international: 30, civil_society: 25,
                    congress: 10, youth: 15
                }
            }
        ]
    },

    // POST-COMEBACK FOLLOW-UP SCENARIOS
    {
        id: "prachanda_after_legal_challenge_2025",
        title: {
            ne: "प्रचण्डको कानुनी लड़ाइको नतिजा",
            en: "Result of Prachanda's Legal Battle"
        },
        description: {
            ne: "सर्वोच्च अदालतमा केस लड्दा न्यायाधीशहरूको बहुमतले कार्कीको नियुक्ति संवैधानिक भएको ठहर गर्यो। तर अल्पमतले असंवैधानिक भन्यो। अब के गर्ने? न्यायपालिकाको निर्णय मान्ने कि राजनीतिक दबाब दिने?",
            en: "Fighting case in Supreme Court, majority judges ruled Karki's appointment constitutional. But minority said unconstitutional. Now what? Accept judiciary decision or apply political pressure?"
        },
        type: "crisis",  
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "न्यायपालिकाको निर्णय सम्मान गर्दै कार्कीसँग सहकार्य गर्ने",
                    en: "Respect judiciary decision and cooperate with Karki"
                },
                outcome: {
                    ne: "संवैधानिक मर्यादा बजाएर राज्य व्यवस्थालाई बलियो बनाउनुभयो। अन्तर्राष्ट्रिय प्रशंसा तर माओवादी कार्यकर्ताहरूको असन्तुष्टि।",
                    en: "Maintained constitutional dignity and strengthened state system. International praise but Maoist cadres unhappy."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 15, stress: -5,
                    judiciary: 30, international: 25, civil_society: 20,
                    maoist_network: -15, youth: -5
                }
            },
            {
                text: {
                    ne: "फुल कोर्ट बेन्च माग गरेर फेरि लड्ने - अन्तिम न्याय चाहिने",
                    en: "Demand full court bench and fight again - need final justice"
                },
                outcome: {
                    ne: "कानुनी लड़ाइ जारी राख्दै दृढता देखाउनुभयो। न्यायिक प्रक्रियामा भएको असहमति उजागर भयो तर राजनीतिक संकट लम्बियो।",
                    en: "Showed determination by continuing legal battle. Exposed disagreement in judicial process but prolonged political crisis."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 20, stress: 15,
                    judiciary: -10, maoist_network: 15, congress: 5,
                    civil_society: -10, international: -5
                }
            }
        ]
    },

    // GAGAN THAPA YOUNG LEADERSHIP SCENARIOS
    {
        id: "gagan_thapa_leadership_2025",
        title: {
            ne: "गागन थापाको युवा नेतृत्व चुनौती",
            en: "Gagan Thapa's Young Leadership Challenge"
        },
        description: {
            ne: "कांग्रेसका युवा नेता गागन थापा अहिले कांग्रेसभित्र र जेन जेड बीचको पुल। पुराना नेताहरूको दबाब र युवाहरूको अपेक्षा। तपाईं गागन हुनुहुन्छ - कसरी दुवैलाई सन्तुष्ट पार्ने?",
            en: "Young Congress leader Gagan Thapa now bridge between Congress old guard and Gen Z. Pressure from old leaders and expectations from youth. You are Gagan - how to satisfy both?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.6,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "gagan_thapa",
        
        choices: [
            {
                text: {
                    ne: "कांग्रेसमा आमूल परिवर्तन ल्याउने - पुरानो गार्डलाई चुनौती दिने",
                    en: "Bring radical change in Congress - challenge old guard"
                },
                outcome: {
                    ne: "साहसी सुधारवादी एजेन्डा ल्याएर युवाहरूलाई उत्साहित पार्नुभयो। तर शेर बहादुर र रामचन्द्रजस्ता नेताहरूको विरोध झेल्नुपर्यो।",
                    en: "Excited youth with bold reform agenda. But faced opposition from leaders like Sher Bahadur and Ramchandra."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 25, stress: 20,
                    youth: 35, civil_society: 25, congress: -20,
                    business: -5
                }
            },
            {
                text: {
                    ne: "चुनावी रणनीति बनाएर कांग्रेसलाई जिताउने - व्यावहारिक राजनीति",
                    en: "Create election strategy to make Congress win - practical politics"
                },
                outcome: {
                    ne: "राजनीतिक बुद्धिमत्ता देखाएर पार्टीका लागि चुनावी योजना बनाउनुभयो। पुराना नेताहरूको सराहना तर युवाहरूले अवसरवादी भने।",
                    en: "Showed political wisdom by creating election plan for party. Old leaders appreciated but youth called opportunistic."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 10, stress: 10,
                    congress: 25, business: 15, military: 10,
                    youth: -10, civil_society: -5
                }
            },
            {
                text: {
                    ne: "जेन जेड र कांग्रेसबीच संवाद स्थापना गर्ने - मध्यस्थकर्ता भूमिका",
                    en: "Establish dialogue between Gen Z and Congress - mediator role"
                },
                outcome: {
                    ne: "कूटनीतिक क्षमता देखाएर दुवै समूहलाई नजिक ल्याउने प्रयास गर्नुभयो। आंशिक सफलता तर दुवै तर्फबाट दबाब झेल्नुपर्यो।",
                    en: "Showed diplomatic skill trying to bring both groups closer. Partial success but faced pressure from both sides."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 20, stress: 15,
                    youth: 20, congress: 15, civil_society: 20,
                    military: 5
                }
            },
            {
                text: {
                    ne: "सुशीला कार्कीसँग सहयोग गरेर सुधारको एजेन्डा अगाडि बढाउने",
                    en: "Cooperate with Sushila Karki to advance reform agenda"
                },
                outcome: {
                    ne: "महिला नेतृत्वलाई समर्थन गरेर प्रगतिशील छवि बनाउनुभयो। अन्तर्राष्ट्रिय प्रशंसा तर पार्टीभित्र विवाद भयो।",
                    en: "Built progressive image by supporting women leadership. International praise but controversy within party."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: 10,
                    international: 25, civil_society: 30, youth: 25,
                    congress: -15
                }
            }
        ]
    },

    // RABI LAMICHHANE MEDIA MOGUL SCENARIOS
    {
        id: "rabi_lamichhane_media_power_2025",
        title: {
            ne: "रवि लामिछानेको मिडिया शक्ति प्रयोग",
            en: "Rabi Lamichhane's Media Power Usage"
        },
        description: {
            ne: "मिडिया म्यान रवि लामिछाने अहिले राजनीतिक संकटमा शक्तिशाली आवाज। जनमत निर्माण गर्न सक्ने क्षमता, तर राजनीतिक दलहरूको संदेह। तपाईं रवि हुनुहुन्छ - मिडिया शक्ति कसरी प्रयोग गर्ने?",
            en: "Media man Rabi Lamichhane now powerful voice in political crisis. Capacity to shape public opinion, but political parties suspicious. You are Rabi - how to use media power?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.5,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "rabi_lamichhane",
        
        choices: [
            {
                text: {
                    ne: "निष्पक्ष पत्रकारिता जारी राखेर सत्य उजागर गर्ने",
                    en: "Continue neutral journalism and expose truth"
                },
                outcome: {
                    ne: "पत्रकारिताको मर्यादा कायम राख्दै भ्रष्टाचार र अन्याय उजागर गर्नुभयो। जनताको भरोसा बढ्यो तर राजनीतिज्ञहरूको रिस बढ्यो।",
                    en: "Maintained journalism dignity while exposing corruption and injustice. Public trust increased but politicians' anger grew."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 30, stress: 15,
                    civil_society: 35, youth: 25, media: 30,
                    congress: -15, business: -10
                }
            },
            {
                text: {
                    ne: "राष्ट्रिय सुधारको आन्दोलनमा सक्रिय भूमिका लिने",
                    en: "Take active role in national reform movement"
                },
                outcome: {
                    ne: "मिडियाबाट राजनीतिमा सक्रिय संलग्नता देखाउनुभयो। सुधारकामीहरूको समर्थन पाउनुभयो तर निष्पक्षतामा प्रश्न उठ्यो।",
                    en: "Showed active political engagement through media. Got reformist support but neutrality questioned."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 25, stress: 20,
                    civil_society: 25, youth: 30, media: -10,
                    congress: -20, military: -5
                }
            },
            {
                text: {
                    ne: "राजनीतिक दल खोलेर प्रत्यक्ष राजनीतिमा प्रवेश",
                    en: "Form political party and enter direct politics"
                },
                outcome: {
                    ne: "साहसी निर्णय लिएर मिडियाबाट राजनीतिमा आउनुभयो। नयाँ विकल्पको रूपमा चर्चा तर अनुभवको कमीको आलोचना।",
                    en: "Made bold decision to come from media to politics. Discussed as new alternative but criticized for lack of experience."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 20, stress: 25,
                    youth: 25, civil_society: 15, media: -20,
                    congress: -25, business: -15
                }
            }
        ]
    },

    // ECONOMIC CRISIS MANAGEMENT SCENARIOS  
    {
        id: "economic_crisis_management_2025",
        title: {
            ne: "आर्थिक संकट व्यवस्थापन",
            en: "Economic Crisis Management"
        },
        description: {
            ne: "राजनीतिक अस्थिरताले आर्थिक संकट बढाएको छ। विदेशी मुद्राको अभाव, उद्योग बन्द, बेरोजगारी बढ्दै। तपाईंको चरित्रले आर्थिक समस्या कसरी समाधान गर्ने?",
            en: "Political instability has worsened economic crisis. Foreign currency shortage, industries closed, unemployment rising. How does your character solve economic problems?"
        },
        type: "economic",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.3,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "तत्काल IMF र विश्व बैंकसँग सहायता खोज्ने",
                    en: "Immediately seek help from IMF and World Bank"
                },
                outcome: {
                    ne: "अन्तर्राष्ट्रिय वित्तीय संस्थाहरूले सहायताको आश्वासन दिए। तर कडा शर्त र आर्थिक नीति परिवर्तनको दबाब आयो।",
                    en: "International financial institutions assured help. But strict conditions and pressure for economic policy changes came."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: -10, stress: 10,
                    international: 25, business: -15, economy: 20,
                    youth: -10, civil_society: -5
                }
            },
            {
                text: {
                    ne: "स्वदेशी उद्योग र कृषिमा जोड दिने - आत्मनिर्भरता",
                    en: "Focus on domestic industry and agriculture - self-reliance"
                },
                outcome: {
                    ne: "आत्मनिर्भर आर्थिक मोडेलको वकालत गरेर राष्ट्रवादी भावना जगाउनुभयो। दीर्घकालीन समाधान तर तत्काल राहत सीमित।",
                    en: "Advocated self-reliant economic model and awakened nationalist sentiment. Long-term solution but limited immediate relief."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 25, stress: -5,
                    youth: 15, civil_society: 20, business: 5,
                    international: -10
                }
            },
            {
                text: {
                    ne: "भ्रष्टाचार नियन्त्रण गरेर राजकोष सुधार्ने",
                    en: "Control corruption to improve treasury"
                },
                outcome: {
                    ne: "भ्रष्टाचार विरोधी अभियान चलाएर राज्यको आम्दानी बढाउने प्रयास गर्नुभयो। जनप्रिय कदम तर शक्तिशाली स्वार्थहरूको प्रतिरोध।",
                    en: "Launched anti-corruption campaign to increase state revenue. Popular move but resistance from powerful interests."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 35, stress: 20,
                    civil_society: 35, youth: 30, judiciary: 20,
                    business: -20, congress: -15
                }
            }
        ]
    },

    // INTERNATIONAL RELATIONS CRISIS
    {
        id: "international_relations_crisis_2025",
        title: {
            ne: "अन्तर्राष्ट्रिय सम्बन्ध संकट",
            en: "International Relations Crisis"
        },
        description: {
            ne: "नेपालको राजनीतिक अस्थिरताले भारत र चीन दुवै चिन्तित। अमेरिकाले MCC कार्यान्वयनको दबाब, भारतले सीमा मामिलामा कडाई। तपाईंको बाह्य नीति के हुन्छ?",
            en: "Nepal's political instability worries both India and China. America pressures MCC implementation, India tough on border issues. What's your foreign policy?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.35,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "भारत र चीन बीच सन्तुलन कायम गर्दै तटस्थ रहने",
                    en: "Remain neutral while balancing between India and China"
                },
                outcome: {
                    ne: "परम्परागत तटस्थ नीति अपनाएर दुवै शक्तिसँग सन्तुलित सम्बन्ध बनाउने कोशिश गर्नुभयो। कूटनीतिक सफलता तर कुनै पक्षबाट पूर्ण समर्थन पाइएन।",
                    en: "Adopted traditional neutral policy trying to maintain balanced relations with both powers. Diplomatic success but no full support from any side."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 15, stress: 5,
                    international: 15, military: 10, congress: 15,
                    youth: 5
                }
            },
            {
                text: {
                    ne: "अमेरिकी MCC कार्यान्वयन गरेर पश्चिम नजिक जाने",
                    en: "Implement US MCC and move closer to West"
                },
                outcome: {
                    ne: "पश्चिमी गठबन्धनतर्फ झुकेर आर्थिक सहायता प्राप्त गर्ने रणनीति अपनाउनुभयो। अमेरिका खुशी तर चीन र केही नेपालीहरूको विरोध।",
                    en: "Adopted strategy to lean toward Western alliance for economic aid. America happy but opposition from China and some Nepalis."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: -10, stress: 15,
                    international: 30, business: 25, economy: 15,
                    youth: -15, civil_society: -10
                }
            },
            {
                text: {
                    ne: "चीनसँग BRI सम्झौता विस्तार गरेर आर्थिक साझेदारी बढाउने",
                    en: "Expand BRI agreement with China to increase economic partnership"
                },
                outcome: {
                    ne: "चीनसँगको आर्थिक साझेदारी गहिरो पारेर ठूला परियोजनाको वाचा पाउनुभयो। तर भारत र पश्चिमको चिन्ता बढ्यो।",
                    en: "Deepened economic partnership with China and got promise of big projects. But India and West's concerns increased."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 10, stress: 10,
                    business: 30, economy: 20, congress: -10,
                    international: -15, military: -5
                }
            }
        ]
    },

    // ORDINARY CITIZEN SCENARIOS - "What Should Happen" Perspective
    {
        id: "citizen_political_crisis_response_2025",
        title: {
            ne: "सामान्य नागरिकको राजनीतिक संकटको प्रतिक्रिया",
            en: "Ordinary Citizen's Response to Political Crisis"
        },
        description: {
            ne: "तपाईं एक सामान्य नेपाली नागरिक हुनुहुन्छ। सुशीला कार्की PM भएपछि र राजनीतिक अस्थिरता देखेपछि, तपाईंलाई लाग्छ के हुनुपर्छ? तपाईंको आवाज कसरी सुनाउने?",
            en: "You are an ordinary Nepali citizen. After Sushila Karki becomes PM and seeing political instability, what do you think should happen? How to make your voice heard?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.7,
        realWorldEvent: true,
        isStartingScenario: true,
        // No characterSpecific field - this scenario should appear for all characters
        
        choices: [
            {
                text: {
                    ne: "जेन जेड आन्दोलनमा सक्रिय सहभागिता - युवाहरूको साथ दिने",
                    en: "Actively participate in Gen Z movement - support youth"
                },
                outcome: {
                    ne: "आन्दोलनमा सामेल भएर परिवर्तनको पक्षमा आवाज उठाउनुभयो। युवाहरूको उत्साह बढ्यो तर केही पुराना पुस्ताले असहयोग गरे।",
                    en: "Joined movement and raised voice for change. Youth enthusiasm increased but some older generation showed non-cooperation."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 25, stress: 15,
                    youth: 35, civil_society: 25, congress: -10,
                    business: -5
                }
            },
            {
                text: {
                    ne: "सुशीला कार्कीलाई समर्थन गर्दै लैंगिक न्याय माग्ने",
                    en: "Support Sushila Karki while demanding gender justice"
                },
                outcome: {
                    ne: "महिला नेतृत्वको समर्थनमा उभिएर ऐतिहासिक क्षणको महत्व बुझाउनुभयो। महिला अधिकारकर्मीहरूको प्रशंसा पाउनुभयो।",
                    en: "Stood in support of women leadership and explained importance of historic moment. Got appreciation from women's rights activists."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 30, stress: 5,
                    civil_society: 35, international: 20, judiciary: 15,
                    congress: -5
                }
            },
            {
                text: {
                    ne: "तत्काल चुनावको माग - लोकतान्त्रिक वैधता चाहिने",
                    en: "Demand immediate elections - need democratic legitimacy"
                },
                outcome: {
                    ne: "संविधानको पक्षमा उभिएर निर्वाचित सरकारको माग गर्नुभयो। लोकतन्त्रप्रेमीहरूको समर्थन तर राजनीतिक अस्थिरता बढ्यो।",
                    en: "Stood for constitution and demanded elected government. Support from democracy lovers but political instability increased."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 20, stress: 20,
                    judiciary: 25, civil_society: 30, international: 25,
                    congress: 15, youth: 15
                }
            },
            {
                text: {
                    ne: "मौन रहेर घरपरिवारको सुरक्षालाई प्राथमिकता दिने",
                    en: "Stay silent and prioritize family security"
                },
                outcome: {
                    ne: "राजनीतिक उथलपुथलमा सामेल नभएर आफ्नो परिवारको सुरक्षालाई प्राथमिकता दिनुभयो। व्यक्तिगत स्थिरता तर सामाजिक परिवर्तनमा योगदान नभएको खेद।",
                    en: "Prioritized family security without joining political turmoil. Personal stability but regret of not contributing to social change."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: -10, stress: -10,
                    business: 10, youth: -15, civil_society: -20
                }
            }
        ]
    },

    // CITIZEN ECONOMIC HARDSHIP SCENARIOS
    {
        id: "citizen_economic_hardship_2025",
        title: {
            ne: "नागरिकको आर्थिक कठिनाई",
            en: "Citizen's Economic Hardship"
        },
        description: {
            ne: "राजनीतिक अस्थिरताले मँहगाई बढेको, जागिर गुम्ने डर, पेट्रोल-ग्यासको मूल्य आकाशिएको। तपाईं सामान्य नागरिकको रूपमा के गर्नुहुन्छ? कसरी बाँच्ने?",
            en: "Political instability has increased inflation, job loss fears, fuel prices skyrocketed. What do you do as ordinary citizen? How to survive?"
        },
        type: "economic",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.6,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "सरकार विरुद्ध आन्दोलन गर्ने - भोकमरी विरोधी प्रदर्शन",
                    en: "Protest against government - anti-hunger demonstration"
                },
                outcome: {
                    ne: "आफ्ना आर्थिक समस्याको पक्षमा सडकमा उत्रिनुभयो। मध्यमवर्गीयहरूको समर्थन पाएर दबाब सिर्जना गर्नुभयो।",
                    en: "Took to streets for your economic problems. Created pressure by getting middle-class support."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 15, stress: 20,
                    civil_society: 25, youth: 20, business: -15,
                    congress: -10
                }
            },
            {
                text: {
                    ne: "छिमेकीहरूसँग मिलेर सामुदायिक सहयोग स्थापना गर्ने",
                    en: "Establish community support with neighbors"
                },
                outcome: {
                    ne: "स्थानीय स्तरमा एकअर्कालाई सहयोग गर्ने प्रणाली बनाउनुभयो। सामुदायिक एकता बलियो भयो तर राज्यको जिम्मेवारी छुट्यो।",
                    en: "Created mutual support system at local level. Community unity strengthened but state responsibility escaped."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 20, stress: -5,
                    civil_society: 30, youth: 15, business: 5
                }
            },
            {
                text: {
                    ne: "विदेशी रोजगारीको तयारी गर्ने - नेपाल छाडेर जाने",
                    en: "Prepare for foreign employment - leave Nepal"
                },
                outcome: {
                    ne: "देशको अवस्था देखेर बाहिर जाने निर्णय गर्नुभयो। व्यक्तिगत समाधान तर देशको जनशक्ति हानि भयो।",
                    en: "Decided to go abroad seeing country's condition. Personal solution but country's human resource loss."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: -15, stress: -15,
                    economy: -5, youth: -10, civil_society: -15,
                    international: 5
                }
            }
        ]
    },

    // CITIZEN CONSTITUTIONAL AWARENESS SCENARIO
    {
        id: "citizen_constitutional_education_2025",
        title: {
            ne: "नागरिकको संवैधानिक जानकारी परीक्षा",
            en: "Citizen's Constitutional Knowledge Test"
        },
        description: {
            ne: "राजनीतिक नेताहरूले संविधानको धारा ७६ र ७७ को कुरा गर्दैछन्। तर तपाईंलाई पक्का लाग्दैन यो के हो। तपाईं सामान्य नागरिकको रूपमा संविधान बारे के सोच्नुहुन्छ?",
            en: "Political leaders talk about Articles 76 and 77 of constitution. But you're not sure what this is. What do you think about constitution as ordinary citizen?"
        },
        type: "constitutional",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "संविधान अध्ययन गरेर जानकार नागरिक बन्ने",
                    en: "Study constitution and become informed citizen"
                },
                outcome: {
                    ne: "धारा ७६ प्रधानमन्त्री नियुक्ति प्रक्रिया र धारा ७७ मन्त्रिपरिषद् गठनको बारे सिक्नुभयो। शिक्षित मतदाता बन्नुभयो।",
                    en: "Learned Article 76 PM appointment process and Article 77 Council of Ministers formation. Became educated voter."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: 10,
                    civil_society: 30, judiciary: 20, youth: 15,
                    education: 25
                }
            },
            {
                text: {
                    ne: "राजनीति नेताहरूका कुरा सुनेर अन्दाजी गर्ने",
                    en: "Guess by listening to political leaders"
                },
                outcome: {
                    ne: "आधा-अधुरो जानकारी र चर्चाको आधारमा राय बनाउनुभयो। भ्रममा रहनुभयो तर कम्तिमा चासो त राख्नुभयो।",
                    en: "Formed opinion based on incomplete information and discussions. Remained confused but at least showed interest."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 10, stress: 5,
                    civil_society: 10, youth: 5
                }
            },
            {
                text: {
                    ne: "संविधान जटिल छ भनेर ध्यान नदिने - व्यावहारिक जीवनमा फोकस",
                    en: "Ignore constitution as too complex - focus on practical life"
                },
                outcome: {
                    ne: "कानुनी कुरामा नबुझेर आफ्नो दैनिक जीवनमा मात्र ध्यान दिनुभयो। व्यक्तिगत शान्ति तर लोकतान्त्रिक सहभागिता कम भयो।",
                    en: "Didn't understand legal matters and focused only on daily life. Personal peace but reduced democratic participation."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 5, stress: -10,
                    civil_society: -15, judiciary: -10, youth: -5
                }
            }
        ]
    },

    // MORE PRACHANDA STORYLINE SCENARIOS - Building to 50+ questions
    {
        id: "prachanda_party_split_crisis_2025",
        title: {
            ne: "प्रचण्डको पार्टी विभाजन संकट",
            en: "Prachanda's Party Split Crisis"
        },
        description: {
            ne: "माओवादी पार्टीभित्र तपाईंका पुराना साथीहरूले विद्रोह गरेका छन्। बादल, वर्षमान र नारायणकाजी तपाईंविरुद्ध उभिएका छन्। 'प्रचण्ड अब बुर्जुवा भएको' भन्दै नयाँ पार्टी बनाउने धम्की। कसरी सामना गर्ने?",
            en: "Old comrades in Maoist party have rebelled against you. Badal, Barsha Man and Narayan Kaji stand against you. They threaten to form new party saying 'Prachanda has become bourgeois'. How to handle?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "आत्मालोचना गर्दै क्रान्तिकारी मूल्यमा फर्कने वाचा गर्ने",
                    en: "Self-criticize and promise return to revolutionary values"
                },
                outcome: {
                    ne: "पुराना कमरेडहरूले तपाईंको इमानदारी मानेर एकता जोगाए। तर विपक्षीले तपाईंलाई कमजोर भन्दै आक्रमण गरे।",
                    en: "Old comrades respected your honesty and preserved unity. But opposition attacked calling you weak."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 20, stress: 15,
                    maoist_network: 25, civil_society: 15, youth: 5,
                    congress: -15, business: -10
                }
            },
            {
                text: {
                    ne: "विद्रोही नेताहरूलाई पार्टीबाट निष्कासन गर्ने - कडा कारबाही",
                    en: "Expel rebel leaders from party - tough action"
                },
                outcome: {
                    ne: "निर्णायक नेतृत्व देखाएर विद्रोह दमन गर्नुभयो। वफादार कार्यकर्ताहरूको समर्थन तर पार्टी कमजोर भयो।",
                    en: "Showed decisive leadership and suppressed rebellion. Loyal cadres' support but party weakened."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: -5, stress: 20,
                    maoist_network: -10, military: 10, business: 10,
                    civil_society: -15, youth: -10
                }
            },
            {
                text: {
                    ne: "गुप्त वार्ता गरेर सम्झौता खोज्ने - एकताको लागि",
                    en: "Seek compromise through secret talks - for unity"
                },
                outcome: {
                    ne: "कूटनीतिक दक्षता देखाएर आन्तरिक विवाद समाधान गर्नुभयो। पार्टी एकजुट रह्यो तर नेतृत्वमा सम्झौता गर्नुपर्यो।",
                    en: "Showed diplomatic skill resolving internal dispute. Party remained united but had to compromise on leadership."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 15, stress: 5,
                    maoist_network: 15, congress: 5, civil_society: 10
                }
            },
            {
                text: {
                    ne: "जनताको अदालतमा जाने - 'माओवादी जनताले निर्णय गरून्'",
                    en: "Go to people's court - 'Let Maoist people decide'"
                },
                outcome: {
                    ne: "लोकतान्त्रिक तरिकाले पार्टी समस्या समाधान गर्ने साहसिक प्रयास। आधारभूत कार्यकर्ताहरूको ठूलो समर्थन पाउनुभयो।",
                    en: "Bold attempt to solve party problem democratically. Got huge support from grassroot workers."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 30, stress: 10,
                    maoist_network: 30, civil_society: 25, youth: 15,
                    congress: -5
                }
            }
        ]
    },

    {
        id: "prachanda_revolution_anniversary_2025",
        title: {
            ne: "प्रचण्डको दस वर्षे जनयुद्ध स्मरण",
            en: "Prachanda's Ten-Year People's War Memorial"
        },
        description: {
            ne: "जनयुद्धका सहिदहरूको स्मृतिदिनमा तपाईंलाई मुख्य अतिथि बनाइयो। तर शहिद परिवारहरूले 'तिमीले हाम्रो बलिदान बेचेका छौ' भन्दै विरोध गरिरहेका छन्। युवाहरूले 'फर्जी क्रान्तिकारी' भन्छन्। कसरी सामना गर्ने?",
            en: "You're made chief guest at People's War martyrs memorial day. But martyr families protest saying 'you sold our sacrifice'. Youth call you 'fake revolutionary'. How to handle?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.35,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "शहिद परिवारसँग खुला संवाद - 'मैले गल्ती गरेको स्वीकार गर्छु'",
                    en: "Open dialogue with martyr families - 'I admit my mistakes'"
                },
                outcome: {
                    ne: "इमानदारी देखाएर केही परिवारहरूको मन छुन्यो। तर राजनीतिक विपक्षीहरूले कमजोरी देखाएको भनेर आक्रमण गरे।",
                    en: "Honesty touched some families' hearts. But political opponents attacked saying you showed weakness."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 25, stress: 20,
                    civil_society: 30, maoist_network: 15, international: 10,
                    congress: -20, youth: -5
                }
            },
            {
                text: {
                    ne: "क्रान्तिकारी उपलब्धि रक्षा गर्ने - 'गणतन्त्र ल्याउनकै लागि संघर्ष'",
                    en: "Defend revolutionary achievements - 'struggle was to bring republic'"
                },
                outcome: {
                    ne: "गणतन्त्रको उपलब्धि जोडेर आफ्नो भूमिका जायज ठहराउनुभयो। माओवादी कार्यकर्ताहरूको उत्साह बढ्यो तर आलोचकहरू मान्दैनन्।",
                    en: "Justified your role by emphasizing republican achievement. Maoist workers' enthusiasm increased but critics don't accept."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 20, stress: 10,
                    maoist_network: 25, military: 5, congress: 5,
                    youth: -10, civil_society: -5
                }
            },
            {
                text: {
                    ne: "कार्यक्रम बहिस्कार गर्ने - 'अपमानको सामना गर्न सक्दिन'",
                    en: "Boycott program - 'Cannot face humiliation'"
                },
                outcome: {
                    ne: "स्वाभिमान जोगाउन कार्यक्रम छाड्नुभयो। केहीले बुझे तर धेरैले कायरता भने। राजनीतिक छविमा असर पर्यो।",
                    en: "Left program to preserve dignity. Some understood but many called it cowardice. Political image affected."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: -15, stress: -10,
                    maoist_network: -5, congress: -10, civil_society: -20,
                    youth: -15
                }
            },
            {
                text: {
                    ne: "नयाँ क्रान्तिको घोषणा गर्ने - 'दोस्रो जनयुद्धको तयारी'",
                    en: "Declare new revolution - 'prepare for second people's war'"
                },
                outcome: {
                    ne: "साहसी घोषणाले क्रान्तिकारी छवि फर्काएर उत्साही कार्यकर्ताहरूको समर्थन पाउनुभयो। तर राज्य र अन्तर्राष्ट्रिय समुदाय चिन्तित भयो।",
                    en: "Bold announcement restored revolutionary image and got enthusiastic workers' support. But state and international community worried."
                },
                isConstitutional: false,
                effects: { 
                    stability: -20, morale: 35, stress: 30,
                    maoist_network: 40, youth: 10, civil_society: -10,
                    military: -25, international: -30, congress: -30
                }
            }
        ]
    },

    {
        id: "prachanda_wealth_scandal_2025",
        title: {
            ne: "प्रचण्डको सम्पत्ति विवाद",
            en: "Prachanda's Wealth Controversy"
        },
        description: {
            ne: "मिडियाले तपाईंको करोडौंको सम्पत्ति उजागर गर्यो। घर, जग्गा, बैंक ब्यालेन्स देखाएर 'गरिब किसानका नेताले कसरी यति धन कमाए?' भन्दै प्रश्न उठाइरहेका छन्। विशेषगरी बुढानीलकण्ठको महंगो घर चर्चामा।",
            en: "Media exposed your crores of wealth. Showing houses, land, bank balance asking 'how did poor farmer's leader earn so much?' Especially expensive Budhanilkantha house in discussion."
        },
        type: "scandal",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.3,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "पूर्ण सम्पत्ति विवरण सार्वजनिक गर्ने - पारदर्शिता देखाउने",
                    en: "Publish complete wealth details - show transparency"
                },
                outcome: {
                    ne: "सम्पूर्ण सम्पत्तिको हिसाब सार्वजनिक गरेर पारदर्शिता देखाउनुभयो। केहीले इमानदारी भने तर धेरैले रकम धेरै भएको आलोचना गरे।",
                    en: "Showed transparency by publishing all wealth accounts. Some called it honesty but many criticized the large amount."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: -5, stress: 15,
                    civil_society: 15, international: 15, judiciary: 20,
                    maoist_network: -10, youth: -15, business: 10
                }
            },
            {
                text: {
                    ne: "पारिवारिक आम्दानीको स्रोत बताउने - पत्नी र छोराको व्यापार",
                    en: "Explain family income sources - wife and son's business"
                },
                outcome: {
                    ne: "पारिवारिक व्यापारको कुरा गरेर सम्पत्तिको स्रोत बुझाउने प्रयास गर्नुभयो। तर आलोचकहरूले 'राजनीतिक प्रभावको दुरुपयोग' भने।",
                    en: "Tried to explain wealth source through family business. But critics said 'misuse of political influence'."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 5, stress: 10,
                    business: 15, congress: 5, maoist_network: 5,
                    civil_society: -10, youth: -10
                }
            },
            {
                text: {
                    ne: "भ्रष्टाचारको आरोप अस्वीकार गर्दै मिडिया विरुद्ध लाग्ने",
                    en: "Deny corruption charges and attack media"
                },
                outcome: {
                    ne: "आक्रामक बचाव गर्दै मिडियालाई षड्यन्त्रकारी भन्नुभयो। वफादार समर्थकहरूले विश्वास गरे तर विश्वसनीयतामा प्रश्न खडा भयो।",
                    en: "Aggressively defended calling media conspirators. Loyal supporters believed but credibility questioned."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 10, stress: 20,
                    maoist_network: 15, congress: -5, media: -25,
                    civil_society: -15, international: -10
                }
            },
            {
                text: {
                    ne: "गरिबहरूका लागि सम्पत्ति दान गर्ने घोषणा गर्ने",
                    en: "Announce donation of wealth for poor people"
                },
                outcome: {
                    ne: "आफ्नो सम्पत्ति गरिब किसानहरूका लागि दान गर्ने घोषणा गरेर सबैलाई चकित पार्नुभयो। साहसी निर्णयले ठूलो प्रशंसा पाउनुभयो।",
                    en: "Surprised everyone by announcing donation of wealth for poor farmers. Bold decision got huge appreciation."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 35, stress: 5,
                    civil_society: 35, maoist_network: 30, youth: 20,
                    international: 25, media: 20, business: -15
                }
            }
        ]
    },

    // Continue with more Prachanda scenarios...
    {
        id: "prachanda_china_visit_pressure_2025",
        title: {
            ne: "प्रचण्डमा चीन भ्रमणको दबाब",
            en: "Pressure on Prachanda for China Visit"
        },
        description: {
            ne: "बेइजिङबाट गुप्त सन्देश आयो - 'तपाईं चीनको साँचो मित्र हुनुहुन्छ। अमेरिकी प्रभावविरुद्ध हामीसँग उभिनुहोस्।' MCC विरोधी भूमिका लिन भनिएको छ। भारतले पनि आफ्नो चिन्ता जनाएको छ। कसरी सन्तुलन बनाउने?",
            en: "Secret message from Beijing - 'You are China's true friend. Stand with us against American influence.' Asked to take anti-MCC role. India also expressed concerns. How to balance?"
        },
        type: "international",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.35,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "चीनको प्रस्ताव स्वीकार गर्दै MCC को सक्रिय विरोध गर्ने",
                    en: "Accept China's proposal and actively oppose MCC"
                },
                outcome: {
                    ne: "चीनसँग घनिष्ठ सम्बन्ध बनाएर ठूला परियोजनाको वाचा पाउनुभयो। तर अमेरिका र भारत दुवै रुष्ट भए।",
                    en: "Built close relations with China and got promise of big projects. But both America and India became angry."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 15, stress: 20,
                    international: -15, business: 20, economy: 15,
                    congress: -15, youth: -5, military: -10
                }
            },
            {
                text: {
                    ne: "तटस्थ रहने - कुनै पक्ष नलिने, नेपालको स्वतन्त्र नीति",
                    en: "Remain neutral - don't take sides, Nepal's independent policy"
                },
                outcome: {
                    ne: "सबै शक्तिसँग समान दूरी कायम राख्दै राष्ट्रिय स्वतन्त्रता जोगाउनुभयो। कूटनीतिक सफलता तर कुनै पक्षबाट विशेष सहायता नपाइने।",
                    en: "Preserved national independence by maintaining equal distance with all powers. Diplomatic success but no special help from any side."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 20, stress: 10,
                    international: 10, congress: 15, civil_society: 20,
                    business: 5
                }
            },
            {
                text: {
                    ne: "भारतसँग सल्लाह लिएर निर्णय गर्ने - पारम्परिक मित्रता",
                    en: "Decide after consulting with India - traditional friendship"
                },
                outcome: {
                    ne: "भारतको सुझावलाई महत्व दिएर द्विपक्षीय सम्बन्ध बलियो बनाउनुभयो। तर चीनले धोका दिएको महसुस गर्यो।",
                    en: "Strengthened bilateral relations by valuing India's advice. But China felt betrayed."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 10, stress: 15,
                    international: 15, military: 15, congress: 15,
                    business: -10, maoist_network: -5
                }
            }
        ]
    },

    // ADDITIONAL PRACHANDA SCENARIOS - Continuing storyline development
    {
        id: "prachanda_son_controversy_2025",
        title: {
            ne: "प्रचण्डको छोराको विवाद",
            en: "Prachanda's Son Controversy"
        },
        description: {
            ne: "तपाईंको छोरा प्रकाशले व्यापारमा अनधिकृत फाइदा उठाएको आरोप लाग्यो। सरकारी ठेक्कामा घुस, कर छली र राजनीतिक प्रभाव दुरुपयोग भएको मिडियाको दाबी। 'पारिवारिक भ्रष्टाचार' को आरोपले तपाईंको छविमा दाग लाग्यो।",
            en: "Your son Prakash accused of taking unauthorized business advantages. Media claims bribes in government contracts, tax evasion and political influence misuse. 'Family corruption' charges stain your image."
        },
        type: "scandal",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.3,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "छोरालाई पार्टीका सबै पदबाट हटाउने - कडा कारबाही",
                    en: "Remove son from all party positions - tough action"
                },
                outcome: {
                    ne: "पारिवारिक स्वार्थभन्दा पार्टीलाई प्राथमिकता दिएर सिद्धान्तवादी छवि बनाउनुभयो। जनताले सराहना गरे तर पारिवारिक सम्बन्धमा तनाव।",
                    en: "Built principled image by prioritizing party over family interests. People appreciated but family relations tense."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 30, stress: 25,
                    civil_society: 35, judiciary: 25, international: 20,
                    maoist_network: 10, business: -15
                }
            },
            {
                text: {
                    ne: "छोराको बचाव गर्दै षड्यन्त्रको आरोप लगाउने",
                    en: "Defend son and accuse conspiracy"
                },
                outcome: {
                    ne: "पारिवारिक प्रेम देखाएर छोराको पक्षमा उभिनुभयो। केही समर्थकहरूले बुझे तर विपक्षीले भ्रष्टाचार रक्षक भने।",
                    en: "Showed family love by standing for son. Some supporters understood but opposition called corruption protector."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 5, stress: 15,
                    maoist_network: 15, congress: -20, civil_society: -25,
                    judiciary: -15, media: -20
                }
            },
            {
                text: {
                    ne: "स्वतन्त्र छानबिनको माग गर्ने - सत्यता परीक्षण",
                    en: "Demand independent investigation - truth testing"
                },
                outcome: {
                    ne: "निष्पक्ष छानबिन गरेर सत्य उजागर गर्न चाहनुभएको देखाउनुभयो। साहसी कदम तर नतिजाको पर्खाइमा तनावपूर्ण समय।",
                    en: "Showed willingness to expose truth through impartial investigation. Bold step but tense time waiting for results."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 20, stress: 20,
                    judiciary: 30, civil_society: 25, international: 15,
                    congress: 5, youth: 10
                }
            }
        ]
    },

    {
        id: "prachanda_former_rebels_demand_2025",
        title: {
            ne: "पुराना लड्नेहरूको माग",
            en: "Former Fighters' Demands"
        },
        description: {
            ne: "जनयुद्धका पुराना लड्नेहरूले तपाईंलाई घेरा हालेका छन्। 'हामीलाई वाचा गरिएको जमिन, जागिर र सम्मान कहाँ छ?' भन्दै आक्रोशित छन्। केहीले हतियार उठाउने धम्की दिएका छन्। आफ्ना पुराना कमरेडहरूलाई कसरी सम्हाल्ने?",
            en: "Former People's War fighters have surrounded you. They're angry asking 'where's the land, jobs and respect promised to us?' Some threaten to take up arms. How to handle your old comrades?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.35,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "तत्काल राहत प्याकेज घोषणा गर्ने - आपातकालीन सहायता",
                    en: "Announce immediate relief package - emergency assistance"
                },
                outcome: {
                    ne: "पुराना लड्नेहरूको समस्यालाई प्राथमिकता दिएर तत्काल राहतको व्यवस्था गर्नुभयो। उनीहरूको कृतज्ञता पाएर हिंसाबाट बच्नुभयो।",
                    en: "Prioritized former fighters' problems and arranged immediate relief. Got their gratitude and avoided violence."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 25, stress: 10,
                    maoist_network: 35, military: 10, civil_society: 15,
                    business: -15, congress: -5
                }
            },
            {
                text: {
                    ne: "व्यवस्थित पुनर्वास कार्यक्रम सुरु गर्ने - दीर्घकालीन समाधान",
                    en: "Start systematic rehabilitation program - long-term solution"
                },
                outcome: {
                    ne: "व्यापक पुनर्वास योजना बनाएर दिगो समाधानको बाटो देखाउनुभयो। केही असन्तुष्ट भए तर दूरदर्शी नेतृत्वको प्रशंसा भयो।",
                    en: "Showed path to sustainable solution with comprehensive rehabilitation plan. Some dissatisfied but visionary leadership praised."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 20, stress: 15,
                    maoist_network: 20, international: 20, civil_society: 25,
                    congress: 10, business: 5
                }
            },
            {
                text: {
                    ne: "कानुन व्यवस्था कडा पार्ने - धम्की दिनेहरूलाई चेतावनी",
                    en: "Tighten law and order - warn those making threats"
                },
                outcome: {
                    ne: "सुरक्षा बलको सहायताले धम्कीलाई नियन्त्रण गर्नुभयो। तत्कालीन शान्ति आयो तर पुराना साथीहरूसँग सम्बन्ध बिग्रियो।",
                    en: "Controlled threats with security forces' help. Immediate peace came but relations with old comrades deteriorated."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: -10, stress: 20,
                    military: 20, congress: 15, business: 15,
                    maoist_network: -25, civil_society: -10, youth: -15
                }
            },
            {
                text: {
                    ne: "व्यक्तिगत भेटघाट गरेर समस्या बुझ्ने - कमरेडभावना",
                    en: "Meet personally and understand problems - comradeship"
                },
                outcome: {
                    ne: "पुराना साथीहरूसँग व्यक्तिगत भेट गरेर उनीहरूको पीडा बुझ्नुभयो। भावनात्मक संवादले तनाव कम गर्यो र विश्वास फिर्ता आयो।",
                    en: "Met old comrades personally and understood their pain. Emotional dialogue reduced tension and restored trust."
                },
                isConstitutional: true,
                effects: { 
                    stability: 30, morale: 30, stress: 5,
                    maoist_network: 40, civil_society: 20, youth: 10,
                    media: 15, congress: 5
                }
            }
        ]
    },

    {
        id: "prachanda_pm_ambition_2025",
        title: {
            ne: "प्रचण्डको प्रधानमन्त्री बन्ने महत्वाकांक्षा",
            en: "Prachanda's Prime Minister Ambition"
        },
        description: {
            ne: "सुशीला कार्की अस्थायी भएपछि तपाईंको PM बन्ने इच्छा बलियो भयो। तर संख्या पुग्दैन - ओली र देउवा दुवैसँग सम्झौता चाहिन्छ। कांग्रेसले शर्त राखेको छ, एमालेले अर्को मोल मागेको छ। राष्ट्रपतिले मिति तोकेका छन्।",
            en: "After Sushila Karki becomes interim, your PM ambition strengthens. But numbers don't add up - need agreement with both Oli and Deuba. Congress set conditions, UML demands another price. President set deadline."
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "कांग्रेससँग गठबन्धन गर्ने - देउवासँग मिलेर ओलीलाई बाहिर राख्ने",
                    en: "Coalition with Congress - partner with Deuba to keep Oli out"
                },
                outcome: {
                    ne: "देउवासँगको ऐतिहासिक गठबन्धनले PM पद नजिक ल्यायो। कांग्रेसका सर्तहरू मान्न पर्यो तर शक्ति साझेदारी भयो।",
                    en: "Historic coalition with Deuba brought PM position closer. Had to accept Congress conditions but got power sharing."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 20, stress: 10,
                    congress: 30, maoist_network: 20, international: 15,
                    military: -10, business: 10
                }
            },
            {
                text: {
                    ne: "एमालेसँग सम्झौता गर्ने - ओलीको सहयोगमा सरकार बनाउने",
                    en: "Deal with UML - form government with Oli's support"
                },
                outcome: {
                    ne: "ओलीसँगको चतुर सम्झौताले PM बनाउने बाटो खुल्यो। कम्युनिस्ट एकता देखायो तर कांग्रेसको कडा विरोध झेल्नुपर्यो।",
                    en: "Smart deal with Oli opened path to become PM. Showed communist unity but faced strong Congress opposition."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 25, stress: 15,
                    maoist_network: 25, military: 15, business: 5,
                    congress: -25, civil_society: -10, international: -5
                }
            },
            {
                text: {
                    ne: "राष्ट्रिय सहमति सरकारको प्रस्ताव गर्ने - सबै पार्टी समावेश",
                    en: "Propose national consensus government - include all parties"
                },
                outcome: {
                    ne: "राष्ट्रिय एकताको नाममा सबै दललाई साथ लिने महत्वाकांक्षी योजना पेश गर्नुभयो। कूटनीतिक उत्कृष्टता तर व्यक्तिगत शक्ति सीमित।",
                    en: "Presented ambitious plan to bring all parties together in name of national unity. Diplomatic excellence but limited personal power."
                },
                isConstitutional: true,
                effects: { 
                    stability: 35, morale: 30, stress: 5,
                    congress: 20, military: 20, international: 25,
                    civil_society: 30, maoist_network: 5
                }
            },
            {
                text: {
                    ne: "PM पदको दौड छोडेर किंगमेकर बन्ने - पर्दाको नेतृत्व",
                    en: "Quit PM race and become kingmaker - behind-scenes leadership"
                },
                outcome: {
                    ne: "प्रत्यक्ष शक्ति त्यागेर पर्दाको शक्तिशाली व्यक्ति बन्नुभयो। सबैले तपाईंको सल्लाह खोज्छन् तर जनताको नजरमा पछाडि परिनुभयो।",
                    en: "Gave up direct power to become powerful behind-scenes person. Everyone seeks your advice but fell back in public eye."
                },
                isConstitutional: true,
                effects: { 
                    stability: 30, morale: -5, stress: -10,
                    congress: 25, military: 15, international: 20,
                    youth: -20, civil_society: -15, maoist_network: 10
                }
            }
        ]
    },

    // ADDITIONAL GENERIC SCENARIOS - To increase variety for all characters
    {
        id: "nepal_economic_crisis_general_2025",
        title: {
            ne: "नेपालको आर्थिक संकट",
            en: "Nepal's Economic Crisis"
        },
        description: {
            ne: "मुद्रास्फीति ३०% भन्दा माथि, पेट्रोलियम पदार्थको अभाव, युवाहरू रोजगारीका लागि विदेश भाग्दै। आर्थिक संकटको समाधान के हुन्छ?",
            en: "Inflation above 30%, petroleum shortage, youth fleeing abroad for employment. What's the solution to economic crisis?"
        },
        type: "economic",
        imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.3,
        realWorldEvent: true,
        // No characterSpecific field - generic for all characters
        
        choices: [
            {
                text: {
                    ne: "तत्काल भारतसँग आर्थिक सहयोग वार्ता गर्ने",
                    en: "Immediately negotiate economic assistance with India"
                },
                outcome: {
                    ne: "भारतसँग आपातकालीन व्यापार सम्झौता गरी तेल आपूर्ति सुरक्षित गर्नुभयो। तत्काल राहत तर दीर्घकालीन निर्भरता बढ्यो।",
                    en: "Secured oil supply through emergency trade agreement with India. Immediate relief but increased long-term dependency."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, economy: 25, morale: 20, stress: 5,
                    international: 20, business: 15, congress: 10,
                    youth: -5
                }
            },
            {
                text: {
                    ne: "चीनसँग BRI अन्तर्गत आपातकालीन ऋण माग्ने",
                    en: "Request emergency loan from China under BRI"
                },
                outcome: {
                    ne: "चीनबाट द्रुत ऋण सहायता पाएर तत्काल संकट टार्नुभयो। आर्थिक राहत तर भू-राजनीतिक जटिलता बढ्यो।",
                    en: "Averted immediate crisis with quick loan assistance from China. Economic relief but increased geopolitical complexity."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, economy: 30, morale: 15, stress: 10,
                    international: -10, business: 20, military: 10,
                    youth: -10, civil_society: -15
                }
            },
            {
                text: {
                    ne: "स्वदेशी उत्पादन प्रवर्द्धन र कृषि क्रान्तिको घोषणा",
                    en: "Declare agricultural revolution and promote domestic production"
                },
                outcome: {
                    ne: "राष्ट्रिय आत्मनिर्भरताको नारा दिएर कृषि र उद्योगमा जोड दिनुभयो। दीर्घकालीन दृष्टिकोण तर तत्काल परिणाम देखिएन।",
                    en: "Emphasized agriculture and industry with slogan of national self-reliance. Long-term vision but no immediate results visible."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, economy: 10, morale: 25, stress: 15,
                    civil_society: 25, youth: 20, business: -10,
                    international: 5
                }
            }
        ]
    },

    {
        id: "constitutional_court_dilemma_2025",
        title: {
            ne: "संवैधानिक अदालतको दुविधा",
            en: "Constitutional Court Dilemma"
        },
        description: {
            ne: "सर्वोच्च अदालतले सुशीला कार्की नियुक्तिमाथि प्रश्न उठायो। 'सांसद नभएकी व्यक्ति प्रधानमन्त्री बन्न सक्दैन' भनेर रिट दायर। संवैधानिक संकट कसरी समाधान गर्ने?",
            en: "Supreme Court questions Sushila Karki's appointment. 'Non-MP cannot become PM' petition filed. How to resolve constitutional crisis?"
        },
        type: "constitutional",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.35,
        realWorldEvent: true,
        // No characterSpecific field - generic for all characters
        
        choices: [
            {
                text: {
                    ne: "अदालतको फैसलालाई सम्मान गर्दै संविधान पालना",
                    en: "Respect court decision and follow constitution"
                },
                outcome: {
                    ne: "न्यायपालिकाको स्वतन्त्रतालाई सम्मान गर्दै संवैधानिक प्रक्रिया पछ्याउने निर्णय गर्नुभयो। कानुनी स्वच्छता तर राजनीतिक अस्थिरता।",
                    en: "Decided to follow constitutional process respecting judicial independence. Legal clarity but political instability."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 15, stress: 20,
                    judiciary: 40, civil_society: 30, international: 25,
                    congress: 20, youth: 10
                }
            },
            {
                text: {
                    ne: "संसदीय बहुमतको नाममा अदालतको हस्तक्षेप अस्वीकार",
                    en: "Reject court intervention in name of parliamentary majority"
                },
                outcome: {
                    ne: "जनताबाट निर्वाचित संसदको सर्वोच्चता भन्दै अदालतको हस्तक्षेपलाई अस्वीकार गर्नुभयो। संवैधानिक संकट गहिरियो।",
                    en: "Rejected court intervention citing supremacy of elected parliament. Constitutional crisis deepened."
                },
                isConstitutional: false,
                effects: { 
                    stability: -20, morale: -10, stress: 30,
                    judiciary: -40, civil_society: -25, international: -20,
                    congress: 25, military: 15, youth: -5
                }
            },
            {
                text: {
                    ne: "संविधान संशोधनको प्रस्ताव ल्याउने",
                    en: "Propose constitutional amendment"
                },
                outcome: {
                    ne: "आपातकालीन अवस्थामा संविधान संशोधन गर्ने प्रस्ताव ल्याएर मध्यम बाटो खोज्नुभयो। राजनीतिक समझदारी तर समय लाग्ने प्रक्रिया।",
                    en: "Sought middle path by proposing constitutional amendment for emergency situations. Political wisdom but time-consuming process."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 20, stress: 15,
                    judiciary: 15, civil_society: 20, international: 15,
                    congress: 30, youth: 15
                }
            }
        ]
    },

    // SHARED SCENARIOS - Different responses for each character on same situation
    {
        id: "corruption_escape_strategies_multi_character_2025",
        title: {
            ne: "भ्रष्टाचार आरोपबाट बच्ने रणनीति",
            en: "Strategies to Escape Corruption Charges"
        },
        description: {
            ne: "सुशीला कार्कीले भ्रष्टाचारी राजनीतिज्ञहरूलाई अदालत ल्याउने निर्णय गर्नुभयो। तपाईंको नाम पनि सूचीमा छ। मिडियाले घेराबन्दी गर्यो। कानुनी कारबाही सुरु भयो। यस अवस्थाबाट कसरी बच्ने? राजनीतिक बाँच्ने वा कानुनी सफाइ?",
            en: "Sushila Karki decided to bring corrupt politicians to court. Your name is also on the list. Media has surrounded you. Legal action started. How to escape this situation? Political survival or legal clearance?"
        },
        type: "corruption_crisis",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.5,
        realWorldEvent: true,
        // No characterSpecific - works for all but different responses
        
        characterSpecificChoices: {
            prachanda: [
                {
                    text: {
                        ne: "क्रान्तिकारी आवश्यकताको नाममा सफाइ दिने",
                        en: "Justify in name of revolutionary necessities"
                    },
                    outcome: {
                        ne: "गृहयुद्धकालीन परिस्थितिमा भएका निर्णयहरूको औचित्य प्रस्तुत गर्नुभयो। माओवादी समर्थकहरूको साथ तर कानुनी समस्या जारी।",
                        en: "Justified decisions made during civil war circumstances. Support from Maoist supporters but legal problems continue."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: -5, morale: 15, stress: 25,
                        maoist_network: 35, youth: 10, civil_society: -20,
                        judiciary: -25, international: -15
                    }
                },
                {
                    text: {
                        ne: "राजनीतिक साजिशको आरोप लगाउने",
                        en: "Accuse of political conspiracy"
                    },
                    outcome: {
                        ne: "सुशीला कार्कीको यो कदम राजनीतिक बदला भएको आरोप लगाउनुभयो। राजनीतिक ध्रुवीकरण बढ्यो।",
                        en: "Accused Sushila Karki's move as political revenge. Political polarization increased."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: -15, morale: 5, stress: 30,
                        maoist_network: 25, congress: 20, media: -20,
                        civil_society: -30, judiciary: -35
                    }
                }
            ],
            deuba: [
                {
                    text: {
                        ne: "कूटनीतिक तरिकाले कानुनी सफाइ दिने",
                        en: "Give legal clearance diplomatically"
                    },
                    outcome: {
                        ne: "अनुभवी राजनीतिज्ञको रूपमा कानुनी प्रक्रियामा सहयोग गर्ने घोषणा गर्नुभयो। सम्मानजनक तरिका अपनाउनुभयो।",
                        en: "As experienced politician, announced cooperation with legal process. Adopted respectful approach."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: 10, morale: 20, stress: 15,
                        congress: 20, international: 25, judiciary: 20,
                        civil_society: 15
                    }
                },
                {
                    text: {
                        ne: "अन्तर्राष्ट्रिय मध्यस्थताको माग गर्ने",
                        en: "Demand international mediation"
                    },
                    outcome: {
                        ne: "नेपालको राजनीतिक स्थिरताका लागि अन्तर्राष्ट्रिय मध्यस्थताको आग्रह गर्नुभयो। कूटनीतिक समाधान खोज्नुभयो।",
                        en: "Requested international mediation for Nepal's political stability. Sought diplomatic solution."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: 5, morale: 10, stress: 20,
                        international: 30, congress: 15, business: 20,
                        youth: -10, civil_society: -5
                    }
                }
            ],
            kp_oli: [
                {
                    text: {
                        ne: "राष्ट्रवादी आधारमा विदेशी षड्यन्त्रको आरोप लगाउने",
                        en: "Accuse foreign conspiracy on nationalist basis"
                    },
                    outcome: {
                        ne: "यो सबै विदेशी शक्तिहरूको षड्यन्त्र भएको आरोप लगाउनुभयो। राष्ट्रवादी समर्थकहरूको उत्साह।",
                        en: "Accused this as conspiracy of foreign powers. Enthusiasm from nationalist supporters."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: -10, morale: 15, stress: 25,
                        military: 25, business: 15, congress: 10,
                        international: -30, civil_society: -20
                    }
                },
                {
                    text: {
                        ne: "संसदीय बहुमतको बलमा कानुनी कारबाही रोक्ने",
                        en: "Stop legal action with parliamentary majority power"
                    },
                    outcome: {
                        ne: "संसदीय बहुमतको प्रयोग गरेर कानुनी कारबाही रोक्ने प्रयास गर्नुभयो। अधिकारवादी कदम।",
                        en: "Tried to stop legal action using parliamentary majority. Authoritarian step."
                    },
                    isConstitutional: false,
                    effects: { 
                        stability: -20, morale: -15, stress: 35,
                        congress: 20, military: 20, business: 25,
                        judiciary: -50, civil_society: -40, international: -35
                    }
                }
            ],
            genz_student: [
                {
                    text: {
                        ne: "सामाजिक सञ्जालमा पारदर्शिताको पक्षमा अभियान चलाउने",
                        en: "Campaign for transparency on social media"
                    },
                    outcome: {
                        ne: "फेसबुक र टिकटकमा भ्रष्टाचार विरोधी अभियान सुरु गर्नुभयो। युवाहरूको ठूलो समर्थन पाउनुभयो।",
                        en: "Started anti-corruption campaign on Facebook and TikTok. Got huge support from youth."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: 5, morale: 30, stress: 20,
                        youth: 45, civil_society: 35, media: 30,
                        congress: -25, business: -15
                    }
                },
                {
                    text: {
                        ne: "पुरानो राजनीतिको अन्त्यको घोषणा गर्ने",
                        en: "Announce end of old politics"
                    },
                    outcome: {
                        ne: "भ्रष्ट पुराना राजनीतिको अन्त्य गरेर नयाँ राजनीतिको सुरुवात गर्ने घोषणा गर्नुभयो। युवाहरूको जमघट।",
                        en: "Announced ending corrupt old politics and starting new politics. Youth gathering."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: -5, morale: 35, stress: 25,
                        youth: 50, civil_society: 40, media: 35,
                        congress: -35, business: -25, military: -10
                    }
                }
            ]
        },
        
        choices: [
            {
                text: {
                    ne: "कानुनी प्रक्रियामा पूर्ण सहयोग गर्ने",
                    en: "Fully cooperate with legal process"
                },
                outcome: {
                    ne: "न्यायिक प्रक्रियामा पूर्ण सहयोग गर्ने घोषणा गर्नुभयो। निर्दोष प्रमाणित भएमा सफाइ पाउने आशा।",
                    en: "Announced full cooperation with judicial process. Hope to get clearance if proven innocent."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: 10,
                    judiciary: 30, civil_society: 25, international: 20
                }
            },
            {
                text: {
                    ne: "राजनीतिक समझदारी खोजेर समस्या समाधान गर्ने",
                    en: "Solve problem by seeking political understanding"
                },
                outcome: {
                    ne: "राजनीतिक दलहरूसँग बसेर समझदारी गर्ने प्रयास गर्नुभयो। कूटनीतिक समाधान खोज्नुभयो।",
                    en: "Tried to reach understanding by sitting with political parties. Sought diplomatic solution."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 10, stress: 15,
                    congress: 20, business: 15, international: 10,
                    civil_society: -10, judiciary: -15
                }
            }
        ]
    },

    {
        id: "international_pressure_response_multi_character_2025",
        title: {
            ne: "अन्तर्राष्ट्रिय दबाबको प्रतिक्रिया",
            en: "Response to International Pressure"
        },
        description: {
            ne: "नेपालको राजनीतिक अस्थिरताका कारण अमेरिका, भारत र चीनले दबाब दिन थाले। MCC कार्यान्वयन, BRI परियोजना, सीमा समस्या - सबैमा निर्णय चाहिन्छ। तीनै शक्तिका राजदूतहरूले भेट्न खोजेका छन्। कसलाई प्राथमिकता दिने?",
            en: "Due to Nepal's political instability, USA, India and China started pressuring. Need decisions on MCC implementation, BRI projects, border issues. Ambassadors of all three powers want to meet. Who to prioritize?"
        },
        type: "foreign_policy",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        realWorldEvent: true,
        // No characterSpecific - works for all but different responses
        
        characterSpecificChoices: {
            prachanda: [
                {
                    text: {
                        ne: "चीनसँग नजिकको सम्बन्ध जोड्दै BRI प्राथमिकता दिने",
                        en: "Prioritize BRI by building closer relations with China"
                    },
                    outcome: {
                        ne: "चिनियाँ राजदूतसँग पहिले भेट गरेर BRI परियोजनाहरूमा जोड दिनुभयो। आर्थिक सहयोग तर भू-राजनीतिक जटिलता।",
                        en: "Met Chinese ambassador first and emphasized BRI projects. Economic assistance but geopolitical complexity."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: 10, economy: 25, stress: 20,
                        business: 20, maoist_network: 25,
                        international: -15, congress: -10, youth: -10
                    }
                }
            ],
            deuba: [
                {
                    text: {
                        ne: "भारतसँग पारम्परिक मित्रता जोड्दै सन्तुलन कायम गर्ने",
                        en: "Maintain balance by emphasizing traditional friendship with India"
                    },
                    outcome: {
                        ne: "भारतीय राजदूतसँग पहिले भेट गरेर ऐतिहासिक मित्रताको कुरा गर्नुभयो। पारम्परिक कूटनीति अपनाउनुभयो।",
                        en: "Met Indian ambassador first and talked about historical friendship. Adopted traditional diplomacy."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: 15, economy: 15, stress: 15,
                        congress: 25, international: 20, business: 15,
                        youth: -5
                    }
                }
            ],
            kp_oli: [
                {
                    text: {
                        ne: "राष्ट्रिय स्वाभिमानको नाममा सबैलाई बराबर व्यवहार गर्ने",
                        en: "Treat everyone equally in name of national pride"
                    },
                    outcome: {
                        ne: "कुनै देशलाई प्राथमिकता नदिएर सबै राजदूतहरूलाई एकै दिन भेट्नुभयो। राष्ट्रवादी दृष्टिकोण प्रदर्शन।",
                        en: "Met all ambassadors same day without prioritizing any country. Displayed nationalist approach."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: 5, morale: 20, stress: 25,
                        military: 25, congress: 20, civil_society: 15,
                        international: -10
                    }
                }
            ]
        },
        
        choices: [
            {
                text: {
                    ne: "नेपालको राष्ट्रिय हितमा निर्णय गर्ने",
                    en: "Decide in Nepal's national interest"
                },
                outcome: {
                    ne: "नेपालको राष्ट्रिय हितलाई सर्वोपरि राखेर निर्णय गर्ने घोषणा गर्नुभयो। सबै पक्षको सम्मान तर स्पष्ट नीति चाहिने।",
                    en: "Announced decisions putting Nepal's national interest first. Respect from all sides but need clear policy."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 25, stress: 15,
                    civil_society: 25, youth: 20, international: 15
                }
            },
            {
                text: {
                    ne: "सबै शक्तिहरूसँग समान दूरी कायम गर्ने",
                    en: "Maintain equal distance from all powers"
                },
                outcome: {
                    ne: "परम्परागत तटस्थ नीति अपनाउने घोषणा गर्नुभयो। सुरक्षित तर निर्णायक नेतृत्वको अभाव।",
                    en: "Announced adopting traditional neutral policy. Safe but lack of decisive leadership."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 10, stress: 10,
                    international: 20, congress: 15, civil_society: 10
                }
            }
        ]
    },

    // EXPANDED DEUBA SCENARIOS - Building to 30+ scenarios
    // Theme: Experienced diplomat balancing tradition and change
    {
        id: "deuba_coalition_mathematics_crisis_2025",
        title: {
            ne: "गठबन्धन गणितको संकट",
            en: "Coalition Mathematics Crisis"
        },
        description: {
            ne: "पाँच पटकको प्रधानमन्त्री तपाईंलाई गठबन्धन बनाउने कला आउँछ। तर अहिले सबै दलका नेताहरू आ-आफ्ना शर्त राख्दै। माओवादीले मुख्य सचिव चाहन्छ, एमालेले रक्षामन्त्री चाहन्छ, युवाहरूले नयाँ अनुहार चाहन्छन्। सबैलाई खुसी पार्ने असम्भव गणित।",
            en: "As five-time PM, you know the art of coalition building. But now all party leaders are setting their own terms. Maoists want Chief Secretary, UML wants Defense Minister, youth want new faces. Impossible mathematics of satisfying everyone."
        },
        type: "coalition_politics",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.5,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "deuba",
        
        choices: [
            {
                text: {
                    ne: "अनुभवको आधारमा कूटनीतिक समझदारी प्रस्तुत गर्ने",
                    en: "Present diplomatic understanding based on experience"
                },
                outcome: {
                    ne: "पञ्चकोणीय गठबन्धनको अनुभवबाट सबै दललाई सन्तुष्ट पार्ने फर्मुला प्रस्तुत गर्नुभयो। कूटनीतिक सफलता।",
                    en: "Presented formula to satisfy all parties based on five-way coalition experience. Diplomatic success."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 20, stress: 15,
                    congress: 30, international: 25, business: 20,
                    judiciary: 15, civil_society: 15
                }
            },
            {
                text: {
                    ne: "कांग्रेसको नेतृत्वमा बहुमत सरकार बनाउने",
                    en: "Form majority government under Congress leadership"
                },
                outcome: {
                    ne: "कांग्रेसको एकल नेतृत्वमा सरकार बनाउने घोषणा गर्नुभयो। स्पष्ट निर्णय तर गठबन्धन साझेदारहरूको असन्तुष्टि।",
                    en: "Announced forming government under sole Congress leadership. Clear decision but dissatisfaction from coalition partners."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: 20,
                    congress: 40, international: 20, business: 25,
                    maoist_network: -25, youth: -15, civil_society: 10
                }
            },
            {
                text: {
                    ne: "युवा नेताहरूलाई महत्वपूर्ण पद दिएर पुस्ता परिवर्तन गर्ने",
                    en: "Generational change by giving important positions to young leaders"
                },
                outcome: {
                    ne: "गगन थापा र डा. मिनेन्द्र रिजाललाई मुख्य जिम्मेवारी दिनुभयो। पुस्ता परिवर्तनको संकेत तर अनुभवी नेताहरूको चिन्ता।",
                    en: "Gave main responsibility to Gagan Thapa and Dr. Minendra Rijal. Signal of generational change but concern from experienced leaders."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 30, stress: 10,
                    youth: 40, civil_society: 30, media: 25,
                    congress: 20, international: 20
                }
            }
        ]
    },

    {
        id: "deuba_international_diplomatic_expertise_2025",
        title: {
            ne: "अन्तर्राष्ट्रिय कूटनीतिक विशेषज्ञता",
            en: "International Diplomatic Expertise"
        },
        description: {
            ne: "बिडेन, सी जिनपिङ र मोदीले व्यक्तिगत फोन गरेर नेपालको स्थिरताको चिन्ता व्यक्त गरे। तपाईंका अन्तर्राष्ट्रिय सम्पर्कहरूले नेपाललाई फाइदा दिलाउन सक्छ। तर घरेलु राजनीतिमा 'विदेशी कठपुतली' भनिने जोखिम। अन्तर्राष्ट्रिय विश्वसनीयता कि राष्ट्रिय स्वाभिमान?",
            en: "Biden, Xi Jinping and Modi personally called expressing concern about Nepal's stability. Your international contacts can benefit Nepal. But risk of being called 'foreign puppet' in domestic politics. International credibility or national pride?"
        },
        type: "international_relations",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.45,
        realWorldEvent: true,
        characterSpecific: "deuba",
        
        choices: [
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय सम्पर्कको फाइदा उठाएर नेपालका लागि सहयोग ल्याउने",
                    en: "Leverage international contacts to bring assistance for Nepal"
                },
                outcome: {
                    ne: "व्यक्तिगत कूटनीतिको प्रयोग गरेर नेपालका लागि विशेष सहयोग प्याकेज ल्याउनुभयो। आर्थिक फाइदा तर राजनीतिक आरोप।",
                    en: "Used personal diplomacy to bring special assistance package for Nepal. Economic benefit but political accusations."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, economy: 30, stress: 20,
                    international: 40, business: 25, congress: 25,
                    youth: -10, maoist_network: -20
                }
            },
            {
                text: {
                    ne: "नेपालको स्वतन्त्र विदेश नीतिमा जोड दिने",
                    en: "Emphasize Nepal's independent foreign policy"
                },
                outcome: {
                    ne: "नेपाल कसैको कठपुतली नभएको स्पष्ट गर्दै स्वतन्त्र विदेश नीतिको कुरा गर्नुभयो। राष्ट्रिय गर्व तर अवसर गुमाउने।",
                    en: "Clarified Nepal is nobody's puppet and talked about independent foreign policy. National pride but missing opportunities."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: 15,
                    military: 20, congress: 20, civil_society: 20,
                    international: -15, business: -10
                }
            },
            {
                text: {
                    ne: "नेपालको हितमा सबै शक्तिसँग समान दूरी कायम गर्ने",
                    en: "Maintain equal distance from all powers in Nepal's interest"
                },
                outcome: {
                    ne: "परम्परागत तटस्थ नीति अपनाउदै सबै शक्तिसँग मित्रता कायम गर्ने कुशल कूटनीति देखाउनुभयो।",
                    en: "Showed skillful diplomacy of maintaining friendship with all powers by adopting traditional neutral policy."
                },
                isConstitutional: true,
                effects: { 
                    stability: 30, economy: 15, stress: 10,
                    international: 30, congress: 30, business: 20,
                    civil_society: 20
                }
            }
        ]
    },

    {
        id: "deuba_generational_transition_dilemma_2025",
        title: {
            ne: "पुस्ता परिवर्तनको दुविधा",
            en: "Generational Transition Dilemma"
        },
        description: {
            ne: "७८ वर्षको उमेरमा युवाहरूले तपाईंलाई 'बुढो राजनीति' भन्छन्। गगन थापा र अन्य युवा नेताहरूले नेतृत्व हस्तान्तरणको दबाब दिँदै। तर तपाईंको अनुभव र सम्पर्क अझै आवश्यक। कहिले सन्यास लिने? युवालाई जिम्मेवारी दिने कि अनुभवको शक्ति प्रयोग गर्ने?",
            en: "At 78, youth call you 'old politics'. Gagan Thapa and other young leaders pressuring for leadership handover. But your experience and contacts still needed. When to retire? Give responsibility to youth or use power of experience?"
        },
        type: "generational_politics",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        realWorldEvent: true,
        characterSpecific: "deuba",
        
        choices: [
            {
                text: {
                    ne: "युवा नेताहरूलाई क्रमिक हस्तान्तरणको योजना घोषणा गर्ने",
                    en: "Announce gradual handover plan to young leaders"
                },
                outcome: {
                    ne: "अगामी दुई वर्षमा युवालाई नेतृत्व हस्तान्तरण गर्ने रोडम्याप घोषणा गर्नुभयो। दूरदर्शी निर्णय तर तत्काल शक्ति घटाउनुपर्ने।",
                    en: "Announced roadmap for leadership handover to youth in next two years. Visionary decision but immediate power reduction."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 35, stress: 20,
                    youth: 45, civil_society: 35, media: 30,
                    congress: 20, international: 25
                }
            },
            {
                text: {
                    ne: "अनुभवको आवश्यकता जनाउदै नेतृत्व जारी राख्ने",
                    en: "Continue leadership citing need for experience"
                },
                outcome: {
                    ne: "संकटकालमा अनुभवी नेतृत्वको आवश्यकता भएको तर्क गर्दै पदमा बहाल रहने निर्णय गर्नुभयो। स्थिरता तर युवाको असन्तुष्टि।",
                    en: "Decided to remain in position arguing need for experienced leadership in crisis. Stability but youth dissatisfaction."
                },
                isConstitutional: true,
                effects: { 
                    stability: 30, morale: 10, stress: 25,
                    congress: 35, international: 30, business: 25,
                    youth: -30, civil_society: -15, media: -10
                }
            },
            {
                text: {
                    ne: "युवा-अनुभवी नेतृत्वको मिश्रण बनाउने",
                    en: "Create mix of youth-experienced leadership"
                },
                outcome: {
                    ne: "युवा र अनुभवी नेताहरूको संयुक्त नेतृत्व मोडेल प्रस्तुत गर्नुभयो। सन्तुलित दृष्टिकोण तर दोहोरो शक्ति केन्द्रको जोखिम।",
                    en: "Presented joint leadership model of youth and experienced leaders. Balanced approach but risk of dual power centers."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 25, stress: 15,
                    youth: 25, congress: 30, civil_society: 25,
                    international: 25, media: 20
                }
            }
        ]
    },

    {
        id: "deuba_five_time_pm_legacy_2025",
        title: {
            ne: "देउवाको पाँच पटकको प्रधानमन्त्री अनुभव",
            en: "Deuba's Five-Time PM Experience"
        },
        description: {
            ne: "तपाईं पाँच पटक प्रधानमन्त्री भइसकेका छ। अनुभवी राजनीतिज्ञको रूपमा युवाहरूले 'बुढो राजनीति' भन्छन्, तर अन्तर्राष्ट्रिय समुदायले तपाईंलाई भरपर्दो मान्छ। कांग्रेसभित्र पनि पुस्ता परिवर्तनको दबाब। कसरी प्रासंगिक बन्ने?",
            en: "You've been PM five times. As experienced politician, youth call it 'old politics', but international community trusts you. Generational change pressure within Congress too. How to stay relevant?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.45,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "deuba",
        
        choices: [
            {
                text: {
                    ne: "युवा नेताहरूलाई मेन्टर गर्ने - अनुभव हस्तान्तरण गर्ने",
                    en: "Mentor young leaders - transfer experience"
                },
                outcome: {
                    ne: "गागन थापा र विश्वप्रकाशलाई व्यक्तिगत मार्गदर्शन दिएर पार्टी नवीकरण गर्नुभयो। युवाहरूको सम्मान पाएर 'Elder Statesman' बन्नुभयो।",
                    en: "Renewed party by personally guiding Gagan Thapa and Vishwa Prakash. Got youth respect and became 'Elder Statesman'."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 30, stress: 5,
                    youth: 25, congress: 30, civil_society: 25,
                    international: 20, media: 15
                }
            },
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय कूटनीतिक नेटवर्क प्रयोग गर्ने - विदेशी सहयोग",
                    en: "Use international diplomatic network - foreign support"
                },
                outcome: {
                    ne: "भारत, अमेरिका र युरोपसँगको पुराना सम्बन्ध प्रयोग गरेर नेपालका लागि ठूलो सहायता ल्याउनुभयो। राष्ट्रवादीहरूले आलोचना गरे।",
                    en: "Used old relations with India, America and Europe to bring big aid for Nepal. Nationalists criticized."
                },
                isConstitutional: true,
                effects: { 
                    stability: 30, morale: 15, stress: 10,
                    international: 35, business: 25, economy: 20,
                    youth: -10, civil_society: -5
                }
            },
            {
                text: {
                    ne: "कांग्रेसमा आमूल सुधार ल्याउने - पार्टी आधुनिकीकरण",
                    en: "Bring radical reform in Congress - party modernization"  
                },
                outcome: {
                    ne: "पार्टीको संरचना र नीति दुवै परिवर्तन गरेर नयाँ पुस्ताको आकांक्षा पूरा गर्ने प्रयास गर्नुभयो। साहसी तर जोखिमपूर्ण निर्णय।",
                    en: "Tried to fulfill new generation's aspirations by changing both party structure and policies. Bold but risky decision."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: 20,
                    youth: 30, civil_society: 20, congress: -10,
                    business: 10, media: 20
                }
            },
            {
                text: {
                    ne: "राष्ट्रिय एकताको वरिष्ठ व्यक्तित्व बन्ने - सबैको गुरु",
                    en: "Become senior figure of national unity - everyone's mentor"
                },
                outcome: {
                    ne: "पार्टीगत राजनीतिभन्दा माथि उठेर राष्ट्रिय व्यक्तित्व बन्नुभयो। सबै पार्टीका नेताहरूले सल्लाह सोध्छन्। सम्मानजनक भूमिका।",
                    en: "Rose above party politics to become national personality. Leaders from all parties seek advice. Honorable role."
                },
                isConstitutional: true,
                effects: { 
                    stability: 35, morale: 30, stress: -5,
                    congress: 25, military: 20, international: 30,
                    civil_society: 30, judiciary: 20
                }
            }
        ]
    },

    {
        id: "deuba_congress_internal_conflict_2025",
        title: {
            ne: "देउवा र कांग्रेसको आन्तरिक द्वन्द्व",
            en: "Deuba and Congress Internal Conflict"
        },
        description: {
            ne: "कांग्रेसभित्र तपाईंविरुद्ध विद्रोह सुरु भयो। शेखर कोइराला र प्रकाशमान सिंहले 'देउवाको एकाधिकार' विरुद्ध मोर्चा बनाए। युवा नेताहरू अस्पष्ट छन्। पार्टी अध्यक्षको हैसियतले कसरी एकता जोगाउने?",
            en: "Rebellion started against you within Congress. Shekhar Koirala and Prakash Man Singh formed front against 'Deuba's monopoly'. Young leaders unclear. As party president, how to preserve unity?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.35,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "पार्टी एकताको लागि अध्यक्ष पद त्याग्ने - आत्मबलिदान",
                    en: "Resign party presidency for unity - self-sacrifice"
                },
                outcome: {
                    ne: "पार्टीको हितमा व्यक्तिगत स्वार्थ त्यागेर ऐतिहासिक निर्णय गर्नुभयो। सबैले तपाईंको महानता स्वीकार गरे तर शक्ति गुमाउनुभयो।",
                    en: "Made historic decision sacrificing personal interest for party welfare. Everyone accepted your greatness but you lost power."
                },
                isConstitutional: true,
                effects: { 
                    stability: 30, morale: 35, stress: -10,
                    congress: 25, civil_society: 40, international: 30,
                    youth: 20, media: 25, business: -10
                }
            },
            {
                text: {
                    ne: "विद्रोही नेताहरूसँग बातचीत गरेर सम्झौता खोज्ने",
                    en: "Negotiate with rebel leaders seeking compromise"
                },
                outcome: {
                    ne: "कूटनीतिक दक्षता देखाएर आन्तरिक विवाद समाधान गर्नुभयो। शक्ति साझेदारी गर्नुपर्यो तर पार्टी एकजुट रह्यो।",
                    en: "Resolved internal dispute showing diplomatic skill. Had to share power but party remained united."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 20, stress: 10,
                    congress: 20, civil_society: 15, international: 15,
                    youth: 10, media: 10
                }
            },
            {
                text: {
                    ne: "पार्टी सदस्यताको भोट लिने - जनवादी तरिकाले निर्णय",
                    en: "Take party membership vote - decide democratically"
                },
                outcome: {
                    ne: "लोकतान्त्रिक प्रक्रियाबाट नेतृत्वको वैधता खोज्नुभयो। जितेर अधिकार बलियो बनाउनुभयो तर पार्टीमा विभाजनको दाग रह्यो।",
                    en: "Sought leadership legitimacy through democratic process. Won and strengthened authority but division scar remained in party."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 15, stress: 20,
                    congress: 15, civil_society: 20, youth: 15,
                    media: 20, judiciary: 25, business: 5
                }
            },
            {
                text: {
                    ne: "विद्रोही गुटलाई पार्टीबाट निष्कासन गर्ने धम्की दिने",
                    en: "Threaten to expel rebel faction from party"
                },
                outcome: {
                    ne: "कडा अडान लिएर अनुशासन देखाउनुभयो। केही नेताहरू डराएर फर्किए तर पार्टीमा डरको वातावरण बन्यो।",
                    en: "Showed discipline by taking tough stance. Some leaders got scared and returned but atmosphere of fear created in party."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 5, stress: 25,
                    congress: 10, civil_society: -10, youth: -15,
                    media: -15, military: 10, business: 5
                }
            }
        ]
    },

    {
        id: "deuba_india_relationship_management_2025",
        title: {
            ne: "देउवाको भारतसँगको सम्बन्ध व्यवस्थापन",
            en: "Deuba's India Relationship Management"
        },
        description: {
            ne: "भारतीय प्रधानमन्त्री मोदीले व्यक्तिगत फोन गरेर भन्नुभयो - 'देउवाजी, नेपालमा चिनियाँ प्रभाव बढिरहेको छ। तपाईं भरपर्दो साथी हुनुहुन्छ।' कालापानी मामिलामा नरमता देखाउन भनिएको छ। राष्ट्रवादीहरूले घेरा हालिरहेका छन्।",
            en: "Indian PM Modi personally called saying - 'Deubaji, Chinese influence increasing in Nepal. You are reliable friend.' Asked to show flexibility on Kalapani issue. Nationalists surrounding you."
        },
        type: "international",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "भारतसँग विशेष सम्बन्ध जोड्दै सहयोग बढाउने",
                    en: "Emphasize special relationship with India and increase cooperation"
                },
                outcome: {
                    ne: "ऐतिहासिक मित्रतालाई जोडेर भारतसँग आर्थिक र सुरक्षा सहयोग बढाउनुभयो। व्यावहारिक लाभ तर 'भारतीय कठपुतली' को आरोप लाग्यो।",
                    en: "Increased economic and security cooperation with India emphasizing historic friendship. Practical benefits but accusations of being 'Indian puppet'."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 10, stress: 15,
                    international: 30, business: 25, military: 20,
                    youth: -15, civil_society: -10, congress: 15
                }
            },
            {
                text: {
                    ne: "राष्ट्रिय स्वाभिमान जोगाउँदै कूटनीतिक सन्तुलन कायम राख्ने",
                    en: "Maintain diplomatic balance while preserving national dignity"
                },
                outcome: {
                    ne: "नेपालको स्वतन्त्रता जोगाउँदै भारतसँग मित्रतापूर्ण सम्बन्ध राख्नुभयो। कूटनीतिक उत्कृष्टता देखाएर दुवै पक्षलाई सन्तुष्ट पार्नुभयो।",
                    en: "Maintained friendly relations with India while preserving Nepal's independence. Showed diplomatic excellence satisfying both sides."
                },
                isConstitutional: true,
                effects: { 
                    stability: 30, morale: 25, stress: 10,
                    international: 20, congress: 25, civil_society: 25,
                    youth: 15, military: 15, business: 15
                }
            },
            {
                text: {
                    ne: "कालापानी मामिलामा कडा अडान लिने - राष्ट्रिय क्षेत्र रक्षा",
                    en: "Take tough stance on Kalapani issue - defend national territory"
                },
                outcome: {
                    ne: "राष्ट्रिय भूभागको पक्षमा दृढ उभिएर भारतलाई स्पष्ट सन्देश दिनुभयो। जनताको ठूलो समर्थन तर भारतसँग सम्बन्ध तनावपूर्ण भयो।",
                    en: "Stood firm for national territory giving clear message to India. Got huge public support but relations with India became tense."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 35, stress: 20,
                    youth: 25, civil_society: 30, congress: 20,
                    international: -20, business: -15, military: -10
                }
            },
            {
                text: {
                    ne: "चीनसँग पनि सम्बन्ध बलियो बनाएर भारतलाई सन्देश दिने",
                    en: "Strengthen relations with China too to send message to India"
                },
                outcome: {
                    ne: "रणनीतिक सन्तुलनको खेल खेलेर दुवै शक्तिसँग समान दूरी कायम राख्नुभयो। भारत र चीन दुवैलाई सचेत गराउनुभयो।",
                    en: "Played strategic balance game maintaining equal distance with both powers. Made both India and China alert."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 20, stress: 25,
                    international: 10, youth: 20, civil_society: 15,
                    congress: 15, business: 10, military: 5
                }
            }
        ]
    },

    // Continue with more Deuba scenarios...
    {
        id: "deuba_mcc_decision_dilemma_2025",
        title: {
            ne: "देउवाको MCC निर्णय दुविधा",
            en: "Deuba's MCC Decision Dilemma"
        },
        description: {
            ne: "अमेरिकी सहायता MCC पारित गर्न अमेरिकाबाट दबाब बढिरहेको छ। चीनले चेतावनी दिएको छ। कांग्रेसभित्र मतभेद छ - केहीले समर्थन गर्छन्, केहीले चिनियाँ चिन्ताको कुरा गर्छन्। तपाईंको निर्णय राष्ट्रको भविष्य तय गर्नेछ।",
            en: "Pressure from America increasing to pass MCC aid. China gave warning. Division within Congress - some support, some talk about Chinese concerns. Your decision will determine nation's future."
        },
        type: "international",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.45,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "MCC पारित गरेर अमेरिकासँग नजिक जाने - पश्चिमी गठबन्धन",
                    en: "Pass MCC and move closer to America - Western alliance"
                },
                outcome: {
                    ne: "अमेरिकाको ठूलो आर्थिक सहायता पाएर विकासको नयाँ अवसर खुल्यो। तर चीनले चेतावनी दियो र केही नेपालीले 'अमेरिकी दलाल' भने।",
                    en: "Got big economic aid from America opening new development opportunities. But China warned and some Nepalis called 'American agent'."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 15, stress: 20,
                    international: 35, business: 30, economy: 25,
                    youth: -10, civil_society: -5, congress: 10
                }
            },
            {
                text: {
                    ne: "MCC अस्वीकार गरेर चीनी चिन्ता सम्बोधन गर्ने",
                    en: "Reject MCC addressing Chinese concerns"
                },
                outcome: {
                    ne: "चीनको चिन्तालाई सम्मान गरेर MCC ठुक्राउनुभयो। चीनले BRI मार्फत ठूलो सहायताको वाचा दियो तर अमेरिका रुष्ट भयो।",
                    en: "Rejected MCC respecting Chinese concerns. China promised big aid through BRI but America became angry."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 10, stress: 25,
                    business: 20, economy: 15, congress: -10,
                    international: -20, youth: -5, civil_society: -5
                }
            },
            {
                text: {
                    ne: "संसदमा खुला बहस गराएर जनताको मत जान्ने",
                    en: "Have open debate in parliament to know public opinion"
                },
                outcome: {
                    ne: "लोकतान्त्रिक प्रक्रियाबाट निर्णय गर्ने साहसिक कदम चाल्नुभयो। व्यापक छलफलपछि मिश्रित राय आयो तर पारदर्शितको प्रशंसा भयो।",
                    en: "Took bold step to decide through democratic process. Mixed opinion came after extensive discussion but transparency praised."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 30, stress: 15,
                    congress: 25, judiciary: 20, civil_society: 30,
                    youth: 20, media: 25, international: 15
                }
            },
            {
                text: {
                    ne: "MCC लाई सर्त सहित स्वीकार गर्ने - नेपालको हित अनुसार परिमार्जन",
                    en: "Accept MCC with conditions - modify according to Nepal's interests"
                },
                outcome: {
                    ne: "चतुर कूटनीतिकले MCC लाई नेपालको पक्षमा परिमार्जन गराएर स्वीकार गर्नुभयो। दुवै पक्षलाई केही हदसम्म सन्तुष्ट पार्नुभयो।",
                    en: "Smart diplomat modified MCC in Nepal's favor and accepted it. Satisfied both sides to some extent."
                },
                isConstitutional: true,
                effects: { 
                    stability: 30, morale: 25, stress: 10,
                    international: 25, business: 25, congress: 20,
                    civil_society: 20, youth: 15, economy: 20
                }
            }
        ]
    },

    // CROSS-CHARACTER STORYLINE CONNECTIONS - Consequences from previous choices
    {
        id: "prachanda_deuba_secret_alliance_response",
        title: {
            ne: "प्रचण्ड-देउवा गुप्त गठबन्धनको प्रतिक्रिया",
            en: "Response to Prachanda-Deuba Secret Alliance"
        },
        description: {
            ne: "तपाईं जुन चरित्र खेल्दै हुनुहुन्छ, त्यसले प्रचण्ड र देउवाको गुप्त गठबन्धनको बारेमा सुन्यो। 'बिग थ्री' मध्ये दुई जनाले तेस्रोलाई बाहिर राख्ने षड्यन्त्र। यसले तपाईंको राजनीतिक स्थितिलाई कसरी असर गर्छ?",
            en: "Your character heard about secret alliance between Prachanda and Deuba. Two of 'Big Three' conspiring to keep third out. How does this affect your political position?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.3,
        realWorldEvent: true,
        
        // This scenario triggers based on previous choices in Prachanda/Deuba storylines
        triggerConditions: {
            requires: ["prachanda_pm_ambition_2025_choice_congress_alliance", "deuba_comeback_strategy_2025"],
            relationshipThreshold: { prachanda_deuba: 10 }
        },
        
        characterSpecificChoices: {
            oli: [
                {
                    text: {
                        ne: "तिनीहरूको गठबन्धन तोड्न चीनको सहायता लिने",
                        en: "Take China's help to break their alliance"
                    },
                    outcome: {
                        ne: "चिनियाँ राजदूतले गुप्त भेटमा तपाईंलाई सहयोगको आश्वासन दियो। आर्थिक प्रकोप र राजनीतिक दबाबको धम्की दिएर गठबन्धन कमजोर पार्ने योजना।",
                        en: "Chinese ambassador assured support in secret meeting. Plan to weaken alliance by threatening economic pressure and political interference."
                    },
                    isConstitutional: false,
                    effects: { 
                        stability: -15, morale: 20, stress: 25,
                        international: -10, business: 15,
                        relationships: { prachanda_deuba: -20, prachanda_oli: -30, deuba_oli: -30 }
                    }
                },
                {
                    text: {
                        ne: "जनताको अगाडि उनीहरूको षड्यन्त्र उजागर गर्ने",
                        en: "Expose their conspiracy to public"
                    },
                    outcome: {
                        ne: "मिडियामा प्रमाण सहित गुप्त गठबन्धनको पर्दाफाश गर्नुभयो। जनताको सहानुभूति पाउनुभयो तर राजनीतिक अस्थिरता बढ्यो।",
                        en: "Exposed secret alliance with evidence in media. Got public sympathy but political instability increased."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: -20, morale: 30, stress: 20,
                        youth: 15, civil_society: 25, media: 30,
                        relationships: { prachanda_oli: -40, deuba_oli: -40 }
                    }
                }
            ],
            genz_student: [
                {
                    text: {
                        ne: "पुराना राजनीतिविरुद्ध युवा एकताको आह्वान गर्ने",
                        en: "Call for youth unity against old politics"
                    },
                    outcome: {
                        ne: "सामाजिक सञ्जालमा #OldPoliticsOut ट्रेन्ड गराएर युवाहरूलाई एकजुट पार्नुभयो। हजारौं युवाहरूले समर्थन जनाए।",
                        en: "United youth by trending #OldPoliticsOut on social media. Thousands of youth showed support."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: 5, morale: 35, stress: 10,
                        youth: 40, civil_society: 30, media: 25,
                        relationships: { prachanda_genz: -30, genz_gagan: 20 }
                    }
                }
            ]
        }
    },

    {
        id: "consequence_prachanda_wealth_donation_followup",
        title: {
            ne: "प्रचण्डको सम्पत्ति दानको फलोअप",
            en: "Follow-up to Prachanda's Wealth Donation"
        },
        description: {
            ne: "प्रचण्डले आफ्नो सम्पत्ति गरिबहरूका लागि दान गर्ने घोषणा गरेपछि राजनीतिक वातावरण परिवर्तन भयो। अन्य नेताहरूमाथि पनि दबाब बढ्यो। तपाईंको चरित्रले यसको सामना कसरी गर्छ?",
            en: "Political environment changed after Prachanda announced donation of wealth for poor. Pressure increased on other leaders too. How does your character handle this?"
        },
        type: "social",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.35,
        realWorldEvent: true,
        
        triggerConditions: {
            requires: ["prachanda_wealth_scandal_2025_choice_donation"],
            characterReputation: { prachanda: { trustworthiness: 60 } }
        },
        
        characterSpecificChoices: {
            deuba: [
                {
                    text: {
                        ne: "प्रचण्डको अनुसरण गरेर आफ्नो सम्पत्ति पनि दान गर्ने",
                        en: "Follow Prachanda's example and donate own wealth too"
                    },
                    outcome: {
                        ne: "राजनीतिक प्रतिस्पर्धामा प्रचण्डलाई पछ्याउँदै सम्पत्ति दान गर्ने घोषणा गर्नुभयो। 'सद्भावना प्रतिस्पर्धा' को रूपमा चर्चा भयो।",
                        en: "Announced wealth donation following Prachanda in political competition. Discussed as 'goodwill competition'."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: 25, morale: 35, stress: 10,
                        civil_society: 40, international: 25, youth: 20,
                        relationships: { prachanda_deuba: 15 }
                    }
                },
                {
                    text: {
                        ne: "आफ्नो सम्पत्ति जायज र कानुनी भएको प्रमाण दिने",
                        en: "Prove own wealth is legitimate and legal"
                    },
                    outcome: {
                        ne: "सम्पूर्ण आम्दानीको विवरण सार्वजनिक गरेर कानुनी स्पष्टता दिनुभयो। प्रचण्डको तुलनामा कम प्रभावशाली लाग्यो।",
                        en: "Gave legal clarity by publishing all income details. Seemed less impressive compared to Prachanda."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: 15, morale: 10, stress: 5,
                        judiciary: 20, business: 15, congress: 10,
                        relationships: { prachanda_deuba: -5 }
                    }
                }
            ],
            oli: [
                {
                    text: {
                        ne: "प्रचण्डको चालबाजी भएको आरोप लगाउने",
                        en: "Accuse Prachanda of playing politics"
                    },
                    outcome: {
                        ne: "प्रचण्डको सम्पत्ति दानलाई राजनीतिक नाटक भन्दै आलोचना गर्नुभयो। केही समर्थकहरूले मान्यो तर धेरैले निष्ठुर ठाने।",
                        en: "Criticized Prachanda's wealth donation calling it political drama. Some supporters agreed but many thought it heartless."
                    },
                    isConstitutional: true,
                    effects: { 
                        stability: -5, morale: -10, stress: 15,
                        civil_society: -20, youth: -15, media: -15,
                        relationships: { prachanda_oli: -25 }
                    }
                }
            ]
        }
    },

    // GEN Z EXPANDED SCENARIOS - Building to 50+ scenarios
    {
        id: "genz_digital_democracy_experiment_2025",
        title: {
            ne: "जेन जेडको डिजिटल लोकतन्त्र प्रयोग",
            en: "Gen Z's Digital Democracy Experiment"
        },
        description: {
            ne: "तपाईं राजनले एउटा क्रान्तिकारी योजना बनाउनुभयो - ब्लकचेन प्रविधि प्रयोग गरेर पारदर्शी मतदान प्रणाली। स्मार्टफोनबाट मत हालेर भ्रष्टाचार रोक्ने र युवाहरूको सहभागिता बढाउने। पुराना राजनीतिज्ञहरू डराए, प्रविधिविद्हरू उत्साहित।",
            en: "You Rajan made revolutionary plan - transparent voting system using blockchain technology. Prevent corruption and increase youth participation by voting through smartphone. Old politicians scared, technologists excited."
        },
        type: "technology",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "genz_student",
        
        choices: [
            {
                text: {
                    ne: "पाइलट प्रोजेक्ट सुरु गर्ने - एउटा वडामा परीक्षण",
                    en: "Start pilot project - test in one ward"
                },
                outcome: {
                    ne: "स्थानीय स्तरमा डिजिटल मतदानको सफल परीक्षण गर्नुभयो। ९५% भोट पार्ने दर र पारदर्शी नतिजाले सबैलाई चकित पार्यो। राष्ट्रिय मिडियाको ध्यान।",
                    en: "Successfully tested digital voting at local level. 95% turnout and transparent results amazed everyone. National media attention."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 30, stress: 15,
                    youth: 40, civil_society: 35, international: 25,
                    media: 30, business: 20
                }
            },
            {
                text: {
                    ne: "राष्ट्रिय स्तरमा तत्काल लागू गर्ने माग गर्ने",
                    en: "Demand immediate nationwide implementation"
                },
                outcome: {
                    ne: "महत्वाकांक्षी योजनाले युवाहरूलाई उत्साहित पार्यो तर निर्वाचन आयोग र पुराना राजनीतिज्ञहरूले कडा विरोध गरे। तयारी नपुगेको आरोप।",
                    en: "Ambitious plan excited youth but Election Commission and old politicians strongly opposed. Accused of inadequate preparation."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 25, stress: 25,
                    youth: 35, civil_society: 20, congress: -20,
                    military: -10, judiciary: -15
                }
            },
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय विशेषज्ञहरूको सहयोग लिने",
                    en: "Seek help from international experts"
                },
                outcome: {
                    ne: "एस्टोनिया र स्विट्जरल्याण्डका डिजिटल लोकतन्त्र विशेषज्ञहरूसँग सहकार्य गर्नुभयो। विश्वसनीयता बढ्यो तर 'विदेशी प्रभाव' को आशंका।",
                    en: "Collaborated with digital democracy experts from Estonia and Switzerland. Credibility increased but concerns of 'foreign influence'."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 20, stress: 10,
                    international: 35, youth: 30, civil_society: 25,
                    congress: -5, military: -5
                }
            },
            {
                text: {
                    ne: "पारम्परिक राजनीतिज्ञहरूलाई प्रशिक्षण दिने प्रस्ताव गर्ने",
                    en: "Propose training traditional politicians"
                },
                outcome: {
                    ne: "पुराना नेताहरूलाई डिजिटल साक्षरता सिकाउने योजना बनाउनुभयो। केहीले सराहना गरे, केहीले अपमान महसुस गरे। पुस्ता अंतरको पुल।",
                    en: "Made plan to teach digital literacy to old leaders. Some appreciated, some felt insulted. Bridge across generations."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: 5,
                    congress: 10, youth: 25, civil_society: 20,
                    media: 20, international: 15
                }
            }
        ]
    },

    // GEN Z STORYLINE ARC 2: Political Awakening Journey
    {
        id: "genz_first_political_meeting_2025",
        title: {
            ne: "राजनको पहिलो राजनीतिक भेला",
            en: "Rajan's First Political Meeting"
        },
        description: {
            ne: "विश्वविद्यालयको इन्जिनियरिङ पढेर भर्खै सकेको राजनले पहिलो पटक राजनीतिक भेलामा बोल्ने मौका पायो। ५०० जना युवाहरू सुन्दै छन्। कोरोनाबाट सुरु भएको निराशा, बेरोजगारी, राजनीतिक भ्रष्टाचार सबैको कुरा गर्ने कि विकासको सपना देखाउने?",
            en: "Rajan, just finishing engineering university, got chance to speak at first political meeting. 500 youth listening. Talk about disappointment from COVID, unemployment, political corruption or show vision of development?"
        },
        type: "political_awakening",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.35,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "genz_student",
        
        choices: [
            {
                text: {
                    ne: "युवाको पीडाको कुरा गर्ने - 'हाम्रो भविष्य चोरियो'",
                    en: "Speak about youth pain - 'Our future was stolen'"
                },
                outcome: {
                    ne: "भावनात्मक भाषणले युवाहरूको मन छुन्यो। 'भ्रष्ट नेताहरूले हाम्रो भविष्य बेच्यो' भन्दा ताली बज्यो। तर पुराना नेताहरूले उग्रपन्थी भने।",
                    en: "Emotional speech touched youth hearts. When said 'corrupt leaders sold our future', applause erupted. But old leaders called you extremist."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 25, stress: 15,
                    youth: 40, civil_society: 30, media: 20,
                    congress: -15, military: -10
                }
            },
            {
                text: {
                    ne: "नेपालको सम्भावनाको कुरा गर्ने - 'हाम्रो पाला आयो'",
                    en: "Talk about Nepal's potential - 'Our time has come'"
                },
                outcome: {
                    ne: "आशावादी सन्देशले सबैलाई प्रेरणा दियो। जलविद्युत, पर्यटन, प्रविधिको कुरा गर्दा युवाहरूमा उमंग। राजनीतिक दलहरूले ध्यान दिए।",
                    en: "Optimistic message inspired everyone. When talked about hydropower, tourism, technology, youth got excited. Political parties paid attention."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 30, stress: 5,
                    youth: 35, civil_society: 25, business: 20,
                    congress: 10, international: 15
                }
            },
            {
                text: {
                    ne: "संविधानको शिक्षा दिने - 'हामी अधिकार चिन्दै नछौं'",
                    en: "Educate about constitution - 'We don't know our rights'"
                },
                outcome: {
                    ne: "संविधानका मौलिक अधिकारहरूको बारेमा बोल्दा युवाहरू चकित भए। धेरैलाई पहिलो पटक थाहा भयो आफूले के के माग्न सक्छन्। न्यायाधीशहरूले प्रशंसा गरे।",
                    en: "When spoke about constitutional fundamental rights, youth were amazed. Many learned for first time what they can demand. Judges praised."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 20, stress: -5,
                    youth: 30, civil_society: 35, judiciary: 25,
                    media: 20, international: 20
                }
            },
            {
                text: {
                    ne: "आन्दोलनको डाक दिने - 'परिवर्तन हामीले नै गर्नुपर्छ'",
                    en: "Call for movement - 'We must bring change ourselves'"
                },
                outcome: {
                    ne: "क्रान्तिकारी भाषणले युवाहरूलाई सडकमा ल्याउने शक्ति देखायो। तर सुरक्षा निकायको नजरमा परे। राजनीतिक शक्ति तर जोखिम पनि।",
                    en: "Revolutionary speech showed power to bring youth to streets. But came under security attention. Political power but also risk."
                },
                isConstitutional: true,
                effects: { 
                    stability: -15, morale: 35, stress: 25,
                    youth: 45, civil_society: 20, media: 25,
                    congress: -20, military: -15, business: -10
                }
            }
        ]
    },

    {
        id: "genz_social_media_influence_2025",
        title: {
            ne: "राजनको भाइरल पोस्ट - १० लाख भ्यु",
            en: "Rajan's Viral Post - 1 Million Views"
        },
        description: {
            ne: "राजनले टिकटकमा राजनीतिक भ्रष्टाचारको बारेमा बनाएको ३० सेकेन्डको भिडियो भाइरल भयो। '२०७५ सालदेखि २०८२ सालसम्म कति चोरी भयो?' भनेर तथ्याङ्क देखाउँदा १० लाख युवाले हेरे। अब सबै मिडिया र राजनीतिक दलहरूले सम्पर्क गर्दै।",
            en: "Rajan's 30-second TikTok video about political corruption went viral. When showed data 'How much stolen from 2075-2082?', 1 million youth viewed. Now all media and political parties contacting."
        },
        type: "social_media",
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.35,
        realWorldEvent: true,
        
        choices: [
            {
                text: {
                    ne: "व्यापक अनुसन्धान थप्ने - प्रत्येक मन्त्रालयको हिसाब",
                    en: "Add comprehensive research - account of every ministry"
                },
                outcome: {
                    ne: "व्यवस्थित अनुसन्धानले तपाईंलाई विश्वसनीय बनायो। युवाहरूले 'हाम्रो डेटा नेता' भन्न थाले। तर भ्रष्ट नेताहरूले धम्की दिन सुरु गरे।",
                    en: "Systematic research made you credible. Youth started calling 'our data leader'. But corrupt leaders began threatening."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 25, stress: 20,
                    youth: 35, civil_society: 30, media: 25,
                    congress: -15, business: -10
                }
            },
            {
                text: {
                    ne: "युवा नेताहरूको नेटवर्क बनाउने - #GenZNepal",
                    en: "Build youth leader network - #GenZNepal"
                },
                outcome: {
                    ne: "५० जिल्लाका युवा नेताहरूसँग जोडिनुभयो। डिजिटल आन्दोलनको जग बसाल्दै। सामाजिक सञ्जालमा एकैसाथ ट्रेन्ड गर्न सक्ने शक्ति।",
                    en: "Connected with youth leaders from 50 districts. Laying foundation of digital movement. Power to trend simultaneously on social media."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 30, stress: 15,
                    youth: 40, civil_society: 25, international: 15,
                    media: 30
                }
            },
            {
                text: {
                    ne: "पारम्परिक मिडियामा पनि उपस्थित हुने",
                    en: "Also appear in traditional media"
                },
                outcome: {
                    ne: "टेलिभिजन र अखबारमा इन्टरभ्यू दिनुभयो। ४० वर्ष माथिका मानिसहरूले पनि चिन्न थाले। पुराना र नयाँ मिडिया दुवैमा प्रभाव।",
                    en: "Gave interviews on TV and newspapers. People over 40 also started recognizing. Influence in both old and new media."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: 10,
                    youth: 30, civil_society: 30, media: 35,
                    congress: 5, international: 20
                }
            },
            {
                text: {
                    ne: "राजनीतिक दलहरूको प्रस्ताव अस्वीकार गर्ने",
                    en: "Reject political parties' proposals"
                },
                outcome: {
                    ne: "'तपाईंहरूको पार्टी राजनीतिमा आएर भ्रष्ट हुन्न' भनेर सबै प्रस्ताव फिर्ता गर्नुभयो। स्वतन्त्रताले युवाहरूलाई प्रेरणा, तर राजनीतिक समर्थन गुमाउने जोखिम।",
                    en: "Refused all proposals saying 'Won't join your party politics and get corrupt'. Independence inspired youth but risk of losing political support."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 35, stress: 5,
                    youth: 45, civil_society: 40,
                    congress: -20, military: -5, business: -5
                }
            }
        ]
    },

    {
        id: "genz_university_politics_entry_2025",
        title: {
            ne: "राजनको विद्यार्थी राजनीतिमा प्रवेश",
            en: "Rajan's Entry into Student Politics"
        },
        description: {
            ne: "विश्वविद्यालयको विद्यार्थी संघको चुनावमा राजनलाई स्वतन्त्र उम्मेदवार बन्ने अवसर मिल्यो। पारम्परिक राजनीतिक दलहरूका विद्यार्थी संगठनहरूसामु नयाँ पुस्ताको आवाज। नेकसुस, एन्सुको वर्चस्वलाई चुनौती दिने कि सहकार्यको बाटो लिने?",
            en: "Rajan got opportunity to be independent candidate in university student union election. Voice of new generation against traditional political parties' student organizations. Challenge NSSU, ANNFSU dominance or take path of cooperation?"
        },
        type: "student_politics",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.3,
        
        choices: [
            {
                text: {
                    ne: "पूर्ण स्वतन्त्र अभियान - 'पार्टीविहीन विद्यार्थी राजनीति'",
                    en: "Fully independent campaign - 'Party-free student politics'"
                },
                outcome: {
                    ne: "साहसी निर्णयले नयाँ इतिहास रच्यो। पहिलो पटक स्वतन्त्र उम्मेदवारले ४५% भोट पायो। पुराना संरचनामा दरार।",
                    en: "Courageous decision created new history. For first time independent candidate got 45% votes. Cracks in old structure."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 30, stress: 20,
                    youth: 40, civil_society: 35, media: 25,
                    congress: -10, military: -5
                }
            },
            {
                text: {
                    ne: "सुधारवादी गठबन्धन बनाउने",
                    en: "Build reformist coalition"
                },
                outcome: {
                    ne: "दलीय राजनीतिका केही युवा नेताहरूसँग मिलेर सुधारको एजेन्डा बनाउनुभयो। मध्यमार्गीले समर्थन, कट्टरपन्थीले विरोध।",
                    en: "Made reform agenda joining with some youth leaders from party politics. Moderates supported, hardliners opposed."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: 15,
                    youth: 30, civil_society: 25, congress: 5,
                    media: 20, business: 10
                }
            },
            {
                text: {
                    ne: "व्यावहारिक राजनीति - प्रभावशाली दलसँग सम्झौता",
                    en: "Practical politics - deal with influential party"
                },
                outcome: {
                    ne: "राजनीतिक यथार्थ बुझेर कांग्रेसका युवा नेताहरूसँग गठबन्धन गर्नुभयो। जित्नुभयो तर 'स्वतन्त्र' छविमा आँच।",
                    en: "Understanding political reality, made coalition with Congress youth leaders. Won but 'independent' image damaged."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 15, stress: 10,
                    youth: 20, congress: 25, media: 15,
                    business: 20
                }
            },
            {
                text: {
                    ne: "मुद्दामुखी अभियान - भ्रष्टाचार र गुणस्तर",
                    en: "Issue-based campaign - corruption and quality"
                },
                outcome: {
                    ne: "विश्वविद्यालयको समस्या समाधानमा केन्द्रित भएर अभियान गर्नुभयो। युवाहरूले बुझे यो फरक छ। राजनीतिबाट माथि उठेको छवि।",
                    en: "Focused campaign on solving university problems. Youth understood this is different. Image of being above politics."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 30, stress: 5,
                    youth: 35, civil_society: 40, judiciary: 15,
                    media: 30, international: 20
                }
            }
        ]
    },

    // KP OLI EXPANDED SCENARIOS - Building to 30+ scenarios
    // Theme: Nationalist strongman navigating democratic constraints
    {
        id: "oli_authoritarian_vs_democracy_2025",
        title: {
            ne: "अधिकारवाद र लोकतन्त्रको द्वन्द्व",
            en: "Authoritarianism vs Democracy Conflict"
        },
        description: {
            ne: "जेन जेड आन्दोलनले तपाईंलाई 'तानाशाह' भन्यो। लोकतान्त्रिक संस्थाहरूले 'अधिकारवादी' आरोप लगाए। तर तपाईं दृढ नेतृत्वमा विश्वास गर्नुहुन्छ। 'कमजोर लोकतन्त्र' र 'बलियो नेतृत्व' बीचको छनोट। नेपाललाई चाहिएको के हो?",
            en: "Gen Z movement called you 'dictator'. Democratic institutions accused of 'authoritarianism'. But you believe in strong leadership. Choice between 'weak democracy' and 'strong leadership'. What does Nepal need?"
        },
        type: "authoritarian_democracy",
        imageUrl: "https://images.unsplash.com/photo-1586715196006-cd2e4df15d18?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.5,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "kp_oli",
        
        choices: [
            {
                text: {
                    ne: "दृढ नेतृत्वको आवश्यकता प्रमाणित गर्ने",
                    en: "Prove necessity of strong leadership"
                },
                outcome: {
                    ne: "नेपालका लागि दृढ नेतृत्व जरुरी भएको तर्क प्रस्तुत गर्नुभयो। समर्थकहरूको उत्साह तर लोकतन्त्रप्रेमीहरूको चिन्ता।",
                    en: "Presented argument that strong leadership is necessary for Nepal. Supporters' enthusiasm but democrats' concern."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 25, stress: 20,
                    military: 35, business: 25, congress: 30,
                    civil_society: -30, international: -20, youth: -25
                }
            },
            {
                text: {
                    ne: "लोकतान्त्रिक मूल्यमान्यताप्रति प्रतिबद्धता जनाउने",
                    en: "Express commitment to democratic values"
                },
                outcome: {
                    ne: "लोकतन्त्रप्रति आफ्नो प्रतिबद्धता जनाउनुभयो। राजनीतिक दबाबमा झुकेको आरोप तर अन्तर्राष्ट्रिय स्वीकृति।",
                    en: "Expressed commitment to democracy. Accused of bending under political pressure but international acceptance."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 10, stress: 15,
                    international: 30, civil_society: 25, judiciary: 20,
                    military: -20, congress: 15, youth: 5
                }
            },
            {
                text: {
                    ne: "नेपाली विशेषता अनुसार शासन प्रणालीको वकालत गर्ने",
                    en: "Advocate governance system according to Nepali characteristics"
                },
                outcome: {
                    ne: "नेपाली परिस्थिति अनुसार शासन प्रणालीको नयाँ मोडेल प्रस्तुत गर्नुभयो। मौलिक चिन्तन तर व्यावहारिकतामा प्रश्न।",
                    en: "Presented new governance model according to Nepali situation. Original thinking but questions on practicality."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 20, stress: 25,
                    military: 25, congress: 20, business: 15,
                    international: -10, civil_society: 10
                }
            }
        ]
    },

    {
        id: "oli_china_india_balancing_crisis_2025",
        title: {
            ne: "चीन-भारत सन्तुलनको संकट",
            en: "China-India Balancing Crisis"
        },
        description: {
            ne: "चीनसँग नजिकको सम्बन्धका कारण भारतले आर्थिक नाकाबन्दीको धम्की दियो। तर चिनियाँ लगानी नेपालका लागि आवश्यक। अमेरिकाले MCC दबाब दिइरहेको। तीन ठूला शक्तिबीच नेपालको भविष्य। राष्ट्रिय स्वाभिमान कि व्यावहारिकता?",
            en: "India threatened economic blockade due to close ties with China. But Chinese investment necessary for Nepal. America pressuring MCC. Nepal's future between three major powers. National pride or practicality?"
        },
        type: "geopolitics",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.45,
        realWorldEvent: true,
        characterSpecific: "kp_oli",
        
        choices: [
            {
                text: {
                    ne: "राष्ट्रिय स्वाभिमानको पक्षमा दृढ उभिने",
                    en: "Stand firm for national pride"
                },
                outcome: {
                    ne: "कुनै पनि बाहिरी दबाबमा नझुक्ने घोषणा गर्नुभयो। राष्ट्रवादीहरूको तालीको आवाज तर आर्थिक जोखिम।",
                    en: "Announced not bending to any external pressure. Applause from nationalists but economic risks."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 30, stress: 30,
                    military: 40, congress: 25, civil_society: 20,
                    international: -30, business: -20, economy: -15
                }
            },
            {
                text: {
                    ne: "भारतसँग पारम्परिक मित्रता पुनर्स्थापना गर्ने",
                    en: "Restore traditional friendship with India"
                },
                outcome: {
                    ne: "भारतसँगको सम्बन्ध सुधार गर्न पहल गर्नुभयो। तत्काल आर्थिक राहत तर चिनियाँ लगानीमा बाधा।",
                    en: "Initiated improving relations with India. Immediate economic relief but obstacles to Chinese investment."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, economy: 20, stress: 20,
                    international: 25, business: 20, congress: 20,
                    military: -15, youth: -10
                }
            },
            {
                text: {
                    ne: "तीनैवटा शक्तिसँग सन्तुलित सम्बन्ध कायम गर्ने",
                    en: "Maintain balanced relations with all three powers"
                },
                outcome: {
                    ne: "सबै शक्तिसँग समान दूरी कायम गर्ने कूटनीति अपनाउनुभयो। जटिल तर दीर्घकालीन सुरक्षित रणनीति।",
                    en: "Adopted diplomacy of maintaining equal distance with all powers. Complex but long-term safe strategy."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, economy: 10, stress: 15,
                    international: 15, congress: 25, business: 15,
                    military: 10
                }
            }
        ]
    },

    {
        id: "oli_economic_nationalism_vs_globalization_2025",
        title: {
            ne: "आर्थिक राष्ट्रवाद र भूमण्डलीकरण",
            en: "Economic Nationalism vs Globalization"
        },
        description: {
            ne: "विदेशी कम्पनीहरूले नेपाली उद्योगलाई मार्दै। स्वदेशी उत्पादन घट्दै। तर विदेशी लगानी आर्थिक वृद्धिका लागि चाहिन्छ। 'मेड इन नेपाल' अभियान चलाउने कि खुला बजार नीति? आर्थिक राष्ट्रवाद र व्यावहारिकता बीचको छनोट।",
            en: "Foreign companies killing Nepali industries. Domestic production declining. But foreign investment needed for economic growth. Launch 'Made in Nepal' campaign or open market policy? Choice between economic nationalism and practicality."
        },
        type: "economic_policy",
        imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        realWorldEvent: true,
        characterSpecific: "kp_oli",
        
        choices: [
            {
                text: {
                    ne: "'मेड इन नेपाल' अभियान सुरु गर्ने",
                    en: "Start 'Made in Nepal' campaign"
                },
                outcome: {
                    ne: "स्वदेशी उत्पादन प्रवर्द्धनको राष्ट्रिय अभियान घोषणा गर्नुभयो। उद्योगपतिहरूको उत्साह तर निर्यात घट्ने चिन्ता।",
                    en: "Announced national campaign for promoting domestic production. Industrialists' enthusiasm but concern about declining exports."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, economy: 15, morale: 25,
                    business: 30, military: 20, congress: 20,
                    international: -15, youth: 10
                }
            },
            {
                text: {
                    ne: "विदेशी लगानीमा कडाई गरेर नियन्त्रण बढाउने",
                    en: "Increase control by restricting foreign investment"
                },
                outcome: {
                    ne: "विदेशी लगानीमा कडा नियमहरू लागू गर्नुभयो। आर्थिक सुरक्षा तर विकास ढिलो हुने जोखिम।",
                    en: "Implemented strict rules on foreign investment. Economic security but risk of slow development."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, economy: -5, morale: 20,
                    military: 25, business: 15, congress: 20,
                    international: -25, youth: -5
                }
            },
            {
                text: {
                    ne: "चुनिन्दा क्षेत्रमा मात्र विदेशी लगानी खुला गर्ने",
                    en: "Open foreign investment only in selected sectors"
                },
                outcome: {
                    ne: "रणनीतिक क्षेत्रहरूमा मात्र विदेशी लगानी खुला गर्ने स्मार्ट नीति ल्याउनुभयो। संतुलित दृष्टिकोण।",
                    en: "Brought smart policy of opening foreign investment only in strategic sectors. Balanced approach."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, economy: 10, morale: 15,
                    business: 25, international: 10, congress: 25,
                    military: 15
                }
            }
        ]
    },

    {
        id: "oli_nationalist_comeback_2025",
        title: {
            ne: "ओलीको राष्ट्रवादी वापसी",
            en: "Oli's Nationalist Comeback"
        },
        description: {
            ne: "सुशीला कार्की प्रधानमन्त्री भएपछि, केपी ओली गुमनाम भएका छैनन्। 'पहिलो महिला प्रधानमन्त्री भन्दै खुसी मनाउने बेला होइन, यो संविधानको हत्या हो' भन्दै कडा बयान दिनुभयो। पार्टीका नेताहरू विभाजित, राष्ट्रवादी समर्थकहरू उत्साहित। कानुनी लडाइँ लड्ने कि मुलुकको एकताको नारा दिने?",
            en: "After Sushila Karki became PM, KP Oli didn't fade away. Made strong statement 'This is not time to celebrate first woman PM, this is murder of constitution'. Party leaders divided, nationalist supporters excited. Fight legal battle or raise slogan of national unity?"
        },
        type: "constitutional_crisis",
        imageUrl: "https://images.unsplash.com/photo-1586715196006-cd2e4df15d18?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "kp_oli",
        
        choices: [
            {
                text: {
                    ne: "सर्वोच्चमा रिट हाल्ने - संविधान अनुसार एमालेको दावी",
                    en: "File writ in Supreme Court - UML's claim according to constitution"
                },
                outcome: {
                    ne: "संवैधानिक लडाइँमा उत्रिनुभयो। न्यायालयमा एमालेको बहुमतको तर्क पेश गर्दा कानुनी विशेषज्ञहरूमा बहस सुरु भयो। राष्ट्रवादीहरूको समर्थन बढ्यो।",
                    en: "Entered constitutional battle. When presented UML's majority argument in court, debate started among legal experts. Nationalist support increased."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 20, stress: 25,
                    congress: -20, judiciary: 15, media: 20,
                    military: 10, international: -5
                }
            },
            {
                text: {
                    ne: "सडक आन्दोलन छेड्ने - 'संविधान जोगाउ अभियान'",
                    en: "Launch street movement - 'Save Constitution Campaign'"
                },
                outcome: {
                    ne: "काठमाडौंको सडकमा हजारौं कार्यकर्ता ल्याउनुभयो। 'गैरसंसदीय व्यक्ति प्रधानमन्त्री बन्न सक्दैन' भन्दै प्रदर्शन। तर सुरक्षाकर्मीसँग झडप।",
                    en: "Brought thousands of cadres to Kathmandu streets. Protesting saying 'non-parliamentary person cannot become PM'. But clashes with security forces."
                },
                isConstitutional: true,
                effects: { 
                    stability: -20, morale: 30, stress: 30,
                    youth: -10, civil_society: -15, military: -15,
                    media: 10, congress: -25
                }
            },
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय समुदायसँग सम्पर्क गर्ने",
                    en: "Contact international community"
                },
                outcome: {
                    ne: "भारत र चीन दुवैसँग गैरआधिकारिक सम्पर्क गरेर नेपालको संवैधानिक संकटको चर्चा गर्नुभयो। कूटनीतिक दबाब सिर्जना गर्ने रणनीति।",
                    en: "Made unofficial contact with both India and China discussing Nepal's constitutional crisis. Strategy to create diplomatic pressure."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 10, stress: 15,
                    international: 20, congress: -10, youth: -5,
                    media: 15
                }
            },
            {
                text: {
                    ne: "पार्टी एकताको आह्वान गर्ने - 'देशको हित सर्वोपरि'",
                    en: "Call for party unity - 'National interest above all'"
                },
                outcome: {
                    ne: "व्यक्तिगत महत्वाकांक्षा भन्दा देशको हित ठूलो भनेर एमाले एकताको सन्देश दिनुभयो। वरिष्ठ नेताको छवि निर्माण तर कार्यकर्ताहरू निराश।",
                    en: "Sent message of UML unity saying national interest bigger than personal ambition. Senior leader image built but cadres disappointed."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 5, stress: -10,
                    congress: 15, youth: -5, civil_society: 20,
                    international: 25, media: 25
                }
            }
        ]
    },

    {
        id: "oli_china_special_relationship_2025",
        title: {
            ne: "ओलीको चीनसँग विशेष सम्बन्ध",
            en: "Oli's Special Relationship with China"
        },
        description: {
            ne: "नेपालको संकटकालमा चीनका राजदूतले ओलीलाई गैरआधिकारिक भेटघाट गरे। '२०१७-२०२१ मा जस्तै सम्बन्ध चाहिन्छ' भन्दै बेल्ट एन्ड रोडको नयाँ प्रस्ताव। भारतले नजर राखेको, अमेरिकाले चासो देखाएको। उत्तर दिशामा हेरेर दक्षिणका छिमेकीलाई सन्तुष्ट पार्न सकिन्छ?",
            en: "During Nepal's crisis, Chinese ambassador had unofficial meeting with Oli. Saying 'Need relationship like 2017-2021', new Belt and Road proposal. India watching, America showing interest. Can satisfy southern neighbors by looking north?"
        },
        type: "foreign_relations",
        imageUrl: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.3,
        
        choices: [
            {
                text: {
                    ne: "चीनसँग रणनीतिक साझेदारी जारी राख्ने",
                    en: "Continue strategic partnership with China"
                },
                outcome: {
                    ne: "चीनका लगानी परियोजनाहरूको समर्थन गर्नुभयो। तत्काल आर्थिक फाइदा तर भारत र पश्चिमी देशहरूको चिन्ता बढ्यो।",
                    en: "Supported Chinese investment projects. Immediate economic benefits but increased concerns from India and Western countries."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 15, stress: 20,
                    economy: 25, international: -15, congress: -10,
                    business: 20, military: -10
                }
            },
            {
                text: {
                    ne: "संतुलित कूटनीति - सबैसँग समान दूरी",
                    en: "Balanced diplomacy - equal distance with all"
                },
                outcome: {
                    ne: "पञ्चशीलको सिद्धान्त अनुसार सबै शक्तिहरूसँग समान व्यवहार गर्ने नीति अपनाउनुभयो। कूटनीतिक बुद्धिको प्रशंसा तर कसैले पूर्ण सन्तुष्टि नपाएको।",
                    en: "Adopted policy of equal treatment with all powers according to Panchsheel principle. Praised for diplomatic wisdom but no one fully satisfied."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 10, stress: 10,
                    international: 20, congress: 10, media: 20,
                    business: 10
                }
            },
            {
                text: {
                    ne: "भारतलाई पहिले विश्वासमा लिने",
                    en: "First take India into confidence"
                },
                outcome: {
                    ne: "दक्षिणका छिमेकीसँग छलफल गरेर चीनसँगको सम्बन्धको बारेमा पारदर्शिता देखाउनुभयो। भारतको आशंका कम भयो तर चीनले नराम्रो मान्यो।",
                    en: "Showed transparency about relationship with China by discussing with southern neighbor. India's concerns reduced but China took it badly."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 5, stress: 15,
                    international: 15, congress: 15, media: 10,
                    economy: -10
                }
            },
            {
                text: {
                    ne: "राष्ट्रिय स्वाभिमानको सन्देश - 'कसैको गुलाम होइनौं'",
                    en: "Message of national pride - 'We are nobody's slave'"
                },
                outcome: {
                    ne: "नेपालको स्वतन्त्रता र स्वाभिमानको कडा बयान दिनुभयो। राष्ट्रवादीहरूको ठूलो समर्थन पाउनुभयो तर सबै छिमेकीहरूसँग तनाव।",
                    en: "Made strong statement about Nepal's independence and pride. Got huge support from nationalists but tension with all neighbors."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 25, stress: 25,
                    youth: 15, civil_society: 10, military: 15,
                    international: -20, congress: -5
                }
            }
        ]
    },

    // SUSHILA KARKI EXPANDED SCENARIOS - Building to 30+ scenarios
    // Theme: Constitutional Expert navigating unprecedented PM role
    {
        id: "sushila_karki_corruption_court_dilemma_2025",
        title: {
            ne: "भ्रष्टाचारी पुराना नेताहरूलाई अदालत ल्याउने दुविधा",
            en: "Dilemma of Bringing Corrupt Old Politicians to Court"
        },
        description: {
            ne: "प्रधानमन्त्री बनेपछि तपाईंसँग पुराना भ्रष्टाचारी नेताहरूको फाइल छ। तर तपाईं संवैधानिक रूपमा विवादास्पद प्रधानमन्त्री हुनुहुन्छ। उनीहरूलाई अदालत ल्याउँदा 'राजनीतिक बदला' भनिने डर। न्यायाधीशको अनुभव र प्रधानमन्त्रीको दायित्व बीचको संघर्ष।",
            en: "As PM, you have files on corrupt old politicians. But you're constitutionally controversial PM. Fear of being called 'political revenge' if you bring them to court. Conflict between judge's experience and PM's responsibility."
        },
        type: "judicial_political",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.5,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "sushila_karki",
        
        choices: [
            {
                text: {
                    ne: "न्यायाधीशको अनुभव प्रयोग गरी कानुनी प्रक्रिया अगाडि बढाउने",
                    en: "Use judicial experience to advance legal process"
                },
                outcome: {
                    ne: "संवैधानिक स्वच्छताको नाममा भ्रष्टाचार मुद्दा दर्ता गराउनुभयो। न्यायप्रेमीहरूको साथ तर राजनीतिक षड्यन्त्रको आरोप।",
                    en: "Registered corruption cases in name of constitutional cleanliness. Support from justice lovers but accusations of political conspiracy."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 30, stress: 25,
                    judiciary: 50, civil_society: 40, international: 30,
                    congress: -30, business: -20, media: 25
                }
            },
            {
                text: {
                    ne: "राजनीतिक स्थिरताका लागि पुराना मुद्दाहरू स्थगित राख्ने",
                    en: "Postpone old cases for political stability"
                },
                outcome: {
                    ne: "राष्ट्रिय एकताको नाममा भ्रष्टाचार मुद्दाहरू पछि धकेल्नुभयो। अस्थायी शान्ति तर न्यायप्रेमीहरूको निराशा।",
                    en: "Pushed corruption cases back in name of national unity. Temporary peace but disappointment from justice lovers."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: -15, stress: 15,
                    judiciary: -25, civil_society: -30, international: -15,
                    congress: 25, business: 20, military: 10
                }
            },
            {
                text: {
                    ne: "स्वतन्त्र छानबिन आयोग गठन गरेर जिम्मेवारी सुम्पने",
                    en: "Form independent investigation commission and delegate responsibility"
                },
                outcome: {
                    ne: "न्यायिक र कार्यकारी शक्ति बीचको दुरी कायम राख्दै स्वतन्त्र आयोग बनाउनुभयो। संवैधानिक उचित तर ढिलो प्रक्रिया।",
                    en: "Formed independent commission maintaining distance between judicial and executive power. Constitutionally appropriate but slow process."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 20, stress: 10,
                    judiciary: 30, civil_society: 25, international: 25,
                    congress: 15, media: 20
                }
            },
            {
                text: {
                    ne: "सार्वजनिक दबाबमा सबै फाइल सार्वजनिक गर्ने",
                    en: "Make all files public under public pressure"
                },
                outcome: {
                    ne: "पारदर्शिताको नाममा सबै भ्रष्टाचार फाइल सार्वजनिक गर्नुभयो। राजनीतिक भूकम्प सुरु भयो। कहिल्यै नफर्कने निर्णय।",
                    en: "Made all corruption files public in name of transparency. Political earthquake started. Never-returning decision."
                },
                isConstitutional: true,
                effects: { 
                    stability: -30, morale: 40, stress: 40,
                    judiciary: 35, civil_society: 50, media: 45,
                    congress: -50, business: -40, military: -20,
                    international: 30
                }
            }
        ]
    },

    {
        id: "sushila_karki_constitutional_legitimacy_crisis_2025",
        title: {
            ne: "संवैधानिक वैधताको संकट",
            en: "Constitutional Legitimacy Crisis"
        },
        description: {
            ne: "संविधानविद्हरूले 'सांसद नभएकी व्यक्ति प्रधानमन्त्री बन्न सक्दैन' भन्दै तपाईंको नियुक्तिमाथि प्रश्न उठाए। तपाईं आफैं संविधानको जानकार हुनुहुन्छ। आफ्नै पदको वैधता कसरी स्थापना गर्ने? आत्म-सन्देह र राष्ट्रिय दायित्व बीचको द्वन्द्व।",
            en: "Constitutional experts question your appointment saying 'non-MP cannot become PM'. You yourself are constitutional expert. How to establish legitimacy of your own position? Conflict between self-doubt and national duty."
        },
        type: "constitutional_crisis",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.45,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "sushila_karki",
        
        choices: [
            {
                text: {
                    ne: "आपातकालीन संविधान संशोधनको प्रस्ताव गर्ने",
                    en: "Propose emergency constitutional amendment"
                },
                outcome: {
                    ne: "संकटकालीन अवस्थामा संविधान संशोधन गर्ने प्रस्ताव राख्नुभयो। संवैधानिक समाधान तर लामो प्रक्रिया र राजनीतिक विवाद।",
                    en: "Proposed constitutional amendment for crisis situation. Constitutional solution but long process and political controversy."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 15, stress: 20,
                    judiciary: 25, congress: 20, international: 20,
                    civil_society: 15, youth: 10
                }
            },
            {
                text: {
                    ne: "राष्ट्रपतिबाट पुनः नियुक्ति माग्ने",
                    en: "Request re-appointment from President"
                },
                outcome: {
                    ne: "संवैधानिक स्पष्टताका लागि राष्ट्रपतिबाट औपचारिक रूपमा पुनः नियुक्ति लिनुभयो। कानुनी सफाई तर कमजोरी देखाएको आरोप।",
                    en: "Got formal re-appointment from President for constitutional clarity. Legal cleanup but accusations of showing weakness."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 10, stress: 15,
                    judiciary: 30, international: 15, congress: 15,
                    youth: -5, civil_society: 10
                }
            },
            {
                text: {
                    ne: "जनमत संग्रहको घोषणा गर्ने",
                    en: "Announce referendum"
                },
                outcome: {
                    ne: "जनताको प्रत्यक्ष फैसलाका लागि जनमत संग्रहको घोषणा गर्नुभयो। लोकतान्त्रिक साहस तर राजनीतिक जोखिम।",
                    en: "Announced referendum for direct people's decision. Democratic courage but political risk."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 25, stress: 30,
                    civil_society: 35, youth: 30, international: 25,
                    congress: -20, business: -15
                }
            },
            {
                text: {
                    ne: "तत्काल सांसद बन्ने प्रक्रिया सुरु गर्ने",
                    en: "Start process to immediately become MP"
                },
                outcome: {
                    ne: "संवैधानिक आवश्यकता पूरा गर्न तत्काल सांसद बन्ने प्रक्रिया सुरु गर्नुभयो। व्यावहारिक समाधान तर राजनीतिक सम्झौताको आवश्यकता।",
                    en: "Started process to immediately become MP to fulfill constitutional requirement. Practical solution but need for political compromise."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 20, stress: 10,
                    judiciary: 20, congress: 25, international: 20,
                    civil_society: 15
                }
            }
        ]
    },

    {
        id: "sushila_karki_historic_appointment_2025",
        title: {
            ne: "सुशीला कार्कीको ऐतिहासिक नियुक्ति",
            en: "Sushila Karki's Historic Appointment"
        },
        description: {
            ne: "नेपालकी पहिलो महिला प्रधानमन्त्री बनेपछि, सुशीला कार्कीले आफ्नो पहिलो मन्त्रिपरिषद् बैठकमा के भन्नुहुन्छ? ५१ जनाको मृत्यु, जलेको संसद, सेनाको नियन्त्रण, अन्तर्राष्ट्रिय दबाब। न्यायाधीशको अनुभव, महिलाको पहिचान, संकटकालीन नेतृत्व - सबै एकसाथ।",
            en: "After becoming Nepal's first female PM, what does Sushila Karki say in her first cabinet meeting? 51 deaths, burned parliament, military control, international pressure. Judge's experience, woman's identity, crisis leadership - all together."
        },
        type: "historic_leadership",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.45,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "sushila_karki",
        
        choices: [
            {
                text: {
                    ne: "न्यायिक पृष्ठभूमिको प्रयोग - 'कानुनको शासन स्थापना'",
                    en: "Use judicial background - 'Establish rule of law'"
                },
                outcome: {
                    ne: "संविधान र कानुनको कडाइका साथ पालना गर्ने प्रतिबद्धता व्यक्त गर्नुभयो। न्यायपालिका र कानुनी विशेषज्ञहरूको भरपूर समर्थन मिल्यो।",
                    en: "Expressed commitment to strictly follow constitution and law. Got full support from judiciary and legal experts."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 20, stress: 10,
                    judiciary: 40, civil_society: 30, international: 25,
                    media: 25, congress: 5
                }
            },
            {
                text: {
                    ne: "महिला नेतृत्वको सन्देश - 'परिवर्तनको समय आयो'",
                    en: "Message of women leadership - 'Time for change has come'"
                },
                outcome: {
                    ne: "नेपालमा महिला नेतृत्वको नयाँ युग सुरु भएको घोषणा गर्नुभयो। महिला अधिकारकर्मी र प्रगतिशीलहरूको उत्साहजनक समर्थन।",
                    en: "Announced start of new era of women leadership in Nepal. Enthusiastic support from women rights activists and progressives."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 30, stress: 5,
                    youth: 25, civil_society: 35, international: 30,
                    media: 30, congress: 10
                }
            },
            {
                text: {
                    ne: "राष्ट्रिय एकताको आह्वान - 'संकट सँगै सामना गरौं'",
                    en: "Call for national unity - 'Face crisis together'"
                },
                outcome: {
                    ne: "राजनीतिक दल, नागरिक समाज, युवा सबैलाई मिलेर काम गर्न आह्वान गर्नुभयो। व्यापक समर्थन मिले तर ठोस कार्यक्रमको अभाव।",
                    en: "Called for political parties, civil society, youth all to work together. Got broad support but lacked concrete programs."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 25, stress: -5,
                    youth: 15, civil_society: 25, congress: 20,
                    international: 20, media: 20
                }
            },
            {
                text: {
                    ne: "तत्काल सुधारको घोषणा - '१०० दिनको कार्यक्रम'",
                    en: "Announce immediate reforms - '100 days program'"
                },
                outcome: {
                    ne: "पहिलो १०० दिनमा न्यायपालिका सुधार, भ्रष्टाचार नियन्त्रण, युवा रोजगारी सिर्जनाको घोषणा गर्नुभयो। महत्वाकांक्षी तर व्यावहारिक चुनौती।",
                    en: "Announced judiciary reform, corruption control, youth employment creation in first 100 days. Ambitious but practical challenge."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 35, stress: 20,
                    youth: 30, civil_society: 25, judiciary: 20,
                    media: 25, business: 15
                }
            }
        ]
    },

    {
        id: "sushila_karki_gender_equality_agenda_2025",
        title: {
            ne: "सुशीला कार्कीको लैंगिक समानताको एजेन्डा",
            en: "Sushila Karki's Gender Equality Agenda"
        },
        description: {
            ne: "प्रधानमन्त्री बनेको एक हप्तामै सुशीला कार्कीले महिला मन्त्रालयलाई सबैभन्दा शक्तिशाली मन्त्रालय बनाउने घोषणा गर्नुभयो। 'हरेक नीतिमा महिलाको प्रभाव मूल्याङ्कन हुनुपर्छ'। पुरुष प्रधान समाजमा क्रान्तिकारी कदम कि व्यावहारिक चुनौती?",
            en: "Within one week of becoming PM, Sushila Karki announced making Ministry of Women most powerful ministry. 'Every policy must have women's impact assessment'. Revolutionary step in male-dominated society or practical challenge?"
        },
        type: "gender_policy",
        imageUrl: "https://images.unsplash.com/photo-1594736797933-d0cf3b384d50?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.3,
        
        choices: [
            {
                text: {
                    ne: "संविधानमा भएको ५०% महिला सहभागिता तत्काल लागू गर्ने",
                    en: "Immediately implement 50% women participation in constitution"
                },
                outcome: {
                    ne: "सरकारी सेवा, न्यायपालिका, सुरक्षा निकायमा ५०% महिला सहभागिताको तत्काल कार्यान्वयन सुरु गर्नुभयो। महिलाहरूमा उत्साह, पुरुष वर्चस्ववादीहरूको विरोध।",
                    en: "Started immediate implementation of 50% women participation in government service, judiciary, security agencies. Excitement among women, opposition from male chauvinists."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 30, stress: 25,
                    youth: 20, civil_society: 40, international: 35,
                    military: -15, congress: -5
                }
            },
            {
                text: {
                    ne: "चरणबद्ध रूपमा लैंगिक बजेट प्रणाली लागू गर्ने",
                    en: "Implement gender budget system gradually"
                },
                outcome: {
                    ne: "हरेक मन्त्रालयको बजेटमा महिलाको हितमा न्यूनतम ३०% छुट्याउने निर्णय गर्नुभयो। व्यावहारिक दृष्टिकोणले व्यापक समर्थन मिल्यो।",
                    en: "Decided to allocate minimum 30% of every ministry's budget for women's welfare. Practical approach got broad support."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: 10,
                    youth: 15, civil_society: 30, congress: 15,
                    international: 25, business: -5
                }
            },
            {
                text: {
                    ne: "महिला उद्यमशीलता कार्यक्रम सुरु गर्ने",
                    en: "Start women entrepreneurship program"
                },
                outcome: {
                    ne: "महिला उद्यमीहरूलाई बिना धितो ऋण, प्राविधिक तालिम र बजार पहुँचको कार्यक्रम घोषणा गर्नुभयो। व्यापारिक समुदायको समर्थन।",
                    en: "Announced program for women entrepreneurs with collateral-free loans, technical training and market access. Business community support."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 25, stress: 5,
                    economy: 15, business: 25, civil_society: 25,
                    youth: 20, international: 20
                }
            },
            {
                text: {
                    ne: "लैंगिक हिंसा विरुद्ध आपतकालीन अभियान छेड्ने",
                    en: "Launch emergency campaign against gender-based violence"
                },
                outcome: {
                    ne: "२४ घन्टे हटलाइन, तत्काल न्यायिक प्रक्रिया र पीडितलाई सुरक्षाको आश्वासन दिनुभयो। महिला अधिकारकर्मीहरूको भरपूर समर्थन।",
                    en: "Assured 24-hour hotline, immediate judicial process and security to victims. Full support from women rights activists."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 35, stress: 15,
                    civil_society: 40, judiciary: 20, youth: 25,
                    international: 30, media: 25
                }
            }
        ]
    },

    // MORE KP OLI SCENARIOS - Building to 50+ storylines
    {
        id: "oli_uml_party_split_crisis_2025",
        title: {
            ne: "ओलीको एमाले विभाजनको संकट",
            en: "Oli's UML Split Crisis"
        },
        description: {
            ne: "सुशीला कार्कीको नियुक्तिपछि एमाले नेताहरूमा ठूलो मतभेद सुरु भयो। माधव नेपाल र झलनाथ खनालले ओलीको नेतृत्वमा प्रश्न उठाए। 'ओली सरले चुनावमा हारेर पार्टीलाई कमजोर बनाए'। अब एमाले फुट्ने संकेत देखिन थाल्यो। पार्टी एकता कि व्यक्तिगत नेतृत्व?",
            en: "After Sushila Karki's appointment, big disagreement started among UML leaders. Madhav Nepal and Jhala Nath Khanal questioned Oli's leadership. 'Oli sir lost election and weakened party'. Now UML showing signs of split. Party unity or personal leadership?"
        },
        type: "party_politics",
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.3,
        
        choices: [
            {
                text: {
                    ne: "पार्टी नेतृत्वमा बलियो अडान लिने - 'म अध्यक्ष हुँ'",
                    en: "Take strong stance in party leadership - 'I am the chairman'"
                },
                outcome: {
                    ne: "नेतृत्वको अधिकार देखाउनुभयो तर पार्टीभित्र उत्तेजना बढ्यो। माधव नेपाल समूह छुट्टिने तयारीमा। शक्ति देखाइयो तर एकता गुमाइयो।",
                    en: "Showed leadership authority but increased tension within party. Madhav Nepal group preparing to separate. Showed power but lost unity."
                },
                isConstitutional: true,
                effects: { 
                    stability: -15, morale: 10, stress: 25,
                    congress: -20, youth: -10, media: -5,
                    military: 5
                }
            },
            {
                text: {
                    ne: "सबै नेताहरूसँग छलफल गर्ने - 'सँगै मिलेर काम गरौं'",
                    en: "Discuss with all leaders - 'Let's work together'"
                },
                outcome: {
                    ne: "कूटनीतिक दृष्टिकोणले केही समयका लागि संकट टाल्यो। नेताहरू राजी भए तर पार्टीको भविष्यको दिशामा अझै भ्रम।",
                    en: "Diplomatic approach averted crisis for some time. Leaders agreed but still confusion about party's future direction."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 15, stress: 10,
                    congress: 10, media: 15, civil_society: 10
                }
            },
            {
                text: {
                    ne: "नयाँ नेतृत्वको घोषणा गर्ने - युवा नेताहरूलाई जिम्मेवारी",
                    en: "Announce new leadership - give responsibility to young leaders"
                },
                outcome: {
                    ne: "साहसिक निर्णय! इष्टदेव राई जस्ता युवाहरूलाई अगाडि सार्नुभयो। युवाहरू प्रशंसा गरे तर केही पुराना नेताहरू असन्तुष्ट।",
                    en: "Bold decision! Brought forward youth like Ishtadeva Rai. Youth praised but some old leaders dissatisfied."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 25, stress: 15,
                    youth: 25, civil_society: 20, congress: 5,
                    media: 20
                }
            },
            {
                text: {
                    ne: "पार्टी अध्यक्ष पदमा प्रतिस्पर्धाको प्रस्ताव गर्ने",
                    en: "Propose competition for party chairman position"
                },
                outcome: {
                    ne: "लोकतान्त्रिक प्रक्रिया अपनाउने निर्णयले सबैलाई चकित पार्यो। जोखिम लिनुभयो तर पार्टीभित्रको लोकतन्त्रको उदाहरण दिनुभयो।",
                    en: "Decision to adopt democratic process surprised everyone. Took risk but set example of democracy within party."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 20, stress: 20,
                    civil_society: 30, media: 25, international: 15,
                    congress: 15
                }
            }
        ]
    },

    // SUSHILA KARKI ADDITIONAL SCENARIOS
    {
        id: "sushila_karki_international_recognition_2025",
        title: {
            ne: "सुशीला कार्कीको अन्तर्राष्ट्रिय पहिचान",
            en: "Sushila Karki's International Recognition"
        },
        description: {
            ne: "संयुक्त राष्ट्र संघ र युरोपेली संघले सुशीला कार्कीलाई 'महिला नेतृत्वको आदर्श' भन्दै सम्मान गर्ने घोषणा गर्यो। टाइम म्यागजिनले 'वर्षकी व्यक्तित्व'को सूचीमा राख्यो। तर घरमा राजनीतिक चुनौती बढिरहेको छ। अन्तर्राष्ट्रिय प्रशंसा कि घरेलु राजनीति?",
            en: "UN and EU announced honoring Sushila Karki calling her 'model of women leadership'. Time Magazine put in 'Person of Year' list. But political challenges increasing at home. International praise or domestic politics?"
        },
        type: "international_recognition",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.3,
        
        choices: [
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय मञ्चमा नेपालको आवाज उठाउने",
                    en: "Raise Nepal's voice on international platform"
                },
                outcome: {
                    ne: "संयुक्त राष्ट्र संघमा महिला अधिकार र विकासशील देशको पक्षमा बोल्नुभयो। नेपालको अन्तर्राष्ट्रिय छवि सुधार भयो तर घरमा विपक्षीले 'बाहिर घुम्ने, घर बिर्सने' भने।",
                    en: "Spoke for women's rights and developing countries at UN. Nepal's international image improved but opposition at home said 'roaming outside, forgetting home'."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 20, stress: 15,
                    international: 35, civil_society: 25, youth: 15,
                    congress: -15, media: 10
                }
            },
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय सहयोग नेपाल ल्याउने",
                    en: "Bring international aid to Nepal"
                },
                outcome: {
                    ne: "महिला नेतृत्वको कारणले विश्व बैंक र IMF ले नेपाललाई विशेष सहयोग दिने घोषणा गर्यो। अर्थतन्त्रमा सुधार तर केहीले 'विदेशी सहायतामा निर्भर' भने।",
                    en: "Due to women leadership, World Bank and IMF announced special aid to Nepal. Economic improvement but some said 'dependent on foreign aid'."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: 10,
                    economy: 30, international: 30, business: 20,
                    youth: 10, congress: 5
                }
            },
            {
                text: {
                    ne: "नेपाली महिलाहरूको अन्तर्राष्ट्रिय नेटवर्क बनाउने",
                    en: "Build international network of Nepali women"
                },
                outcome: {
                    ne: "विदेशमा बसेका नेपाली महिला पेशेवरहरूलाई नेपाल फर्काउने कार्यक्रम सुरु गर्नुभयो। ब्रेन ड्रेनको समाधान तर पुरुष वर्चस्ववादीहरूको चिन्ता।",
                    en: "Started program to bring back Nepali women professionals living abroad. Solution to brain drain but concern from male chauvinists."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 30, stress: 15,
                    economy: 15, civil_society: 35, international: 25,
                    youth: 25, congress: -5, military: -10
                }
            },
            {
                text: {
                    ne: "घरेलु राजनीतिमा ध्यान केन्द्रित गर्ने",
                    en: "Focus on domestic politics"
                },
                outcome: {
                    ne: "अन्तर्राष्ट्रिय प्रशंसा छोडेर नेपालको समस्या समाधानमा लाग्नुभयो। राजनीतिक दलहरूको सराहना मिल्यो तर महिला अधिकारकर्मीहरू निराश।",
                    en: "Left international praise and focused on solving Nepal's problems. Got appreciation from political parties but women rights activists disappointed."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 15, stress: -5,
                    congress: 20, media: 20, youth: 5,
                    civil_society: -15, international: -10
                }
            }
        ]
    },

    {
        id: "sushila_karki_women_leadership_challenge_2025",
        title: {
            ne: "महिला नेतृत्वको चुनौती",
            en: "Women Leadership Challenge"
        },
        description: {
            ne: "पुरुष प्रधान राजनीतिमा पहिलो महिला प्रधानमन्त्री बनेपछि धेरै पुरुष नेताहरूले तपाईंलाई 'कमजोर' ठान्छन्। मन्त्रिपरिषद्मा तपाईंका निर्देशनहरू बेवास्ता गरिँदै। लैंगिक भेदभाव र नेतृत्वको अधिकार बीचको संघर्ष।",
            en: "As first female PM in male-dominated politics, many male leaders consider you 'weak'. Your directives being ignored in cabinet. Struggle between gender discrimination and leadership authority."
        },
        type: "gender_politics",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        realWorldEvent: true,
        characterSpecific: "sushila_karki",
        
        choices: [
            {
                text: {
                    ne: "कडा अनुशासनका साथ मन्त्रीहरूलाई जिम्मेवार बनाउने",
                    en: "Hold ministers accountable with strict discipline"
                },
                outcome: {
                    ne: "महिला शक्तिको प्रदर्शन गर्दै अनुशासनहीन मन्त्रीहरूलाई बर्खास्त गर्नुभयो। नेतृत्व स्थापना तर राजनीतिक शत्रुता बढ्यो।",
                    en: "Displayed women power by dismissing undisciplined ministers. Established leadership but increased political enmity."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 30, stress: 20,
                    civil_society: 40, international: 25, media: 30,
                    congress: -25, business: -15, military: 15
                }
            },
            {
                text: {
                    ne: "कूटनीतिक तरिकाले सहमति निर्माण गर्ने",
                    en: "Build consensus diplomatically"
                },
                outcome: {
                    ne: "धैर्य र कूटनीतिको प्रयोग गरेर मन्त्रीहरूसँग व्यक्तिगत छलफल गर्नुभयो। सम्मानजनक तर समय लाग्ने प्रक्रिया।",
                    en: "Used patience and diplomacy for personal discussions with ministers. Respectful but time-consuming process."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 15, stress: 10,
                    congress: 20, international: 20, civil_society: 15,
                    youth: 10
                }
            },
            {
                text: {
                    ne: "महिला मन्त्रीहरूको संख्या बढाएर सहयोग प्राप्त गर्ने",
                    en: "Increase number of women ministers for support"
                },
                outcome: {
                    ne: "५०% महिला मन्त्री नियुक्त गरेर मन्त्रिपरिषद्मा लैंगिक संतुलन ल्याउनुभयो। ऐतिहासिक निर्णय तर राजनीतिक विवाद।",
                    en: "Achieved gender balance in cabinet by appointing 50% women ministers. Historic decision but political controversy."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 35, stress: 25,
                    civil_society: 50, international: 35, youth: 30,
                    congress: -30, business: -20
                }
            }
        ]
    },

    {
        id: "sushila_karki_judicial_reform_agenda_2025",
        title: {
            ne: "न्यायिक सुधारको एजेन्डा",
            en: "Judicial Reform Agenda"
        },
        description: {
            ne: "न्यायाधीशको अनुभवबाट तपाईंलाई न्यायपालिकाका समस्याहरू राम्ररी थाहा छ। ढिलो न्याय, भ्रष्टाचार, राजनीतिक दबाब। प्रधानमन्त्री भएपछि न्यायपालिकमा सुधार गर्ने वा नगर्ने? न्यायाधीशहरूले 'हस्तक्षेप' भन्ने डर।",
            en: "From judge's experience, you know judiciary's problems well. Delayed justice, corruption, political pressure. After becoming PM, whether to reform judiciary or not? Fear of judges calling it 'interference'."
        },
        type: "judicial_reform",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.35,
        realWorldEvent: true,
        characterSpecific: "sushila_karki",
        
        choices: [
            {
                text: {
                    ne: "न्यायपालिकाको स्वतन्त्रता कायम राख्दै सुधारका सुझावहरू दिने",
                    en: "Give reform suggestions while maintaining judicial independence"
                },
                outcome: {
                    ne: "संवैधानिक सीमाभित्र रहेर न्यायिक सुधारका सुझावहरू दिनुभयो। संतुलित दृष्टिकोण तर न्यायाधीशहरूको मिश्रित प्रतिक्रिया।",
                    en: "Gave judicial reform suggestions within constitutional limits. Balanced approach but mixed reaction from judges."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 20, stress: 15,
                    judiciary: 25, civil_society: 25, international: 20,
                    congress: 15
                }
            },
            {
                text: {
                    ne: "द्रुत न्यायका लागि प्रविधि प्रयोग गर्ने योजना ल्याउने",
                    en: "Bring plan to use technology for fast justice"
                },
                outcome: {
                    ne: "डिजिटल अदालत र अनलाइन मुद्दा व्यवस्थापनको योजना ल्याउनुभयो। आधुनिकीकरणको पहल तर कार्यान्वयनमा चुनौती।",
                    en: "Brought plan for digital courts and online case management. Modernization initiative but implementation challenges."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: 20,
                    judiciary: 30, youth: 25, international: 25,
                    business: 20
                }
            },
            {
                text: {
                    ne: "न्यायाधीशहरूको तालिम र क्षमता विकास कार्यक्रम सुरु गर्ने",
                    en: "Start training and capacity development program for judges"
                },
                outcome: {
                    ne: "न्यायाधीशहरूको दक्षता बृद्धिका लागि तालिम कार्यक्रम सुरु गर्नुभयो। व्यावसायिक विकासमा जोड तर बजेटको चुनौती।",
                    en: "Started training program to enhance judges' efficiency. Focus on professional development but budget challenges."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 15, stress: 10,
                    judiciary: 35, civil_society: 20, international: 25
                }
            }
        ]
    },

    // GAGAN THAPA EXPANDED SCENARIOS - Building to 50+ scenarios
    {
        id: "gagan_thapa_congress_renewal_2025",
        title: {
            ne: "गगन थापाको कांग्रेस नवीकरण",
            en: "Gagan Thapa's Congress Renewal"
        },
        description: {
            ne: "सुशीला कार्कीको नियुक्तिपछि कांग्रेसभित्र नेतृत्व सङ्कट सुरु भयो। देउबाको नेतृत्वमा प्रश्न उठ्दै। गगन थापाले युवा नेताहरूसँग मिलेर 'कांग्रेस पुनर्जागरण अभियान' सुरु गर्ने घोषणा गर्नुभयो। पार्टीको भविष्य युवाका हातमा कि अनुभवीका हातमा?",
            en: "After Sushila Karki's appointment, leadership crisis started within Congress. Questions raised about Deuba's leadership. Gagan Thapa announced starting 'Congress Renaissance Campaign' with young leaders. Party's future in hands of youth or experienced?"
        },
        type: "party_renewal",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "gagan_thapa",
        
        choices: [
            {
                text: {
                    ne: "युवा नेतृत्वको जोरदार वकालत गर्ने - 'समय बदलियो'",
                    en: "Strongly advocate for youth leadership - 'Times have changed'"
                },
                outcome: {
                    ne: "साहसी भाषणले युवाहरूलाई उत्साहित पार्यो। 'कांग्रेसलाई युवाले नेतृत्व गर्ने समय आयो' भन्दा ठूलो तालीको आवाज। तर वरिष्ठ नेताहरूले अवज्ञाको संकेत भने।",
                    en: "Bold speech excited youth. When said 'Time for youth to lead Congress', huge applause. But senior leaders called it sign of disobedience."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 30, stress: 20,
                    youth: 40, civil_society: 25, media: 25,
                    congress: -20, military: -5
                }
            },
            {
                text: {
                    ne: "अनुभवी र युवाको साझेदारी प्रस्ताव गर्ने",
                    en: "Propose partnership between experienced and youth"
                },
                outcome: {
                    ne: "बुद्धिमानी दृष्टिकोणले पार्टीभित्र तनाव कम गर्यो। देउबा जीसँग व्यक्तिगत छलफल गरेर सहकार्यको बाटो खोज्नुभयो। समझदारीको प्रशंसा।",
                    en: "Wise approach reduced tension within party. Had personal discussion with Deuba ji and found path of cooperation. Praised for understanding."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 20, stress: 5,
                    youth: 25, congress: 15, civil_society: 20,
                    media: 20, international: 10
                }
            },
            {
                text: {
                    ne: "प्रगतिशील नीतिहरूको एजेन्डा पेश गर्ने",
                    en: "Present progressive policy agenda"
                },
                outcome: {
                    ne: "जलवायु परिवर्तन, डिजिटल नेपाल, युवा उद्यमशीलताको नयाँ एजेन्डा पेश गर्नुभयो। नीति-केन्द्रित दृष्टिकोणले व्यापक प्रशंसा पायो।",
                    en: "Presented new agenda of climate change, digital Nepal, youth entrepreneurship. Policy-focused approach got broad praise."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 25, stress: 5,
                    youth: 30, civil_society: 30, business: 20,
                    international: 25, media: 25
                }
            },
            {
                text: {
                    ne: "पार्टी एकताको पक्षमा बोल्ने - व्यक्तिगत महत्वाकांक्षा त्याग्ने",
                    en: "Speak for party unity - sacrifice personal ambition"
                },
                outcome: {
                    ne: "व्यक्तिगत महत्वाकांक्षा भन्दा पार्टीको हित ठूलो भन्दै देउबाको नेतृत्वमा विश्वास व्यक्त गर्नुभयो। वरिष्ठ नेताहरूको प्रशंसा तर युवाहरू निराश।",
                    en: "Expressed trust in Deuba's leadership saying party interest bigger than personal ambition. Senior leaders' praise but youth disappointed."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 10, stress: -10,
                    congress: 30, international: 15, media: 15,
                    youth: -20, civil_society: 5
                }
            }
        ]
    },

    {
        id: "gagan_thapa_climate_activism_2025",
        title: {
            ne: "गगन थापाको जलवायु सक्रियता",
            en: "Gagan Thapa's Climate Activism"
        },
        description: {
            ne: "हिमालका ग्लेसियर पग्लिरहेको, असामयिक वर्षा, बाढी पहिरोले नेपाली जनताले भोग्नुपरेको। गगन थापाले 'नेपाल क्लाइमेट चैम्पियन' अभियान सुरु गर्ने घोषणा गर्नुभयो। साउथ एसियामा पहिलो कार्बन न्यूट्रल देश बनाउने सपना। महत्वाकांक्षी लक्ष्य कि व्यावहारिक योजना?",
            en: "Himalayan glaciers melting, unseasonal rain, floods landslides affecting Nepali people. Gagan Thapa announced starting 'Nepal Climate Champion' campaign. Dream to make first carbon neutral country in South Asia. Ambitious goal or practical plan?"
        },
        type: "environmental_policy",
        imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.3,
        
        choices: [
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय जलवायु सम्मेलनमा नेपालको आवाज उठाउने",
                    en: "Raise Nepal's voice at international climate summit"
            },
                outcome: {
                    ne: "COP सम्मेलनमा हिमाली देशहरूको तर्फबाट शक्तिशाली भाषण दिनुभयो। 'हामी कम उत्सर्जन गर्छौं तर बढी भोग्छौं' भन्दा विश्वव्यापी ध्यान पायो।",
                    en: "Gave powerful speech representing Himalayan countries at COP summit. Got global attention saying 'We emit less but suffer more'."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 25, stress: 15,
                    international: 35, youth: 30, civil_society: 30,
                    media: 25, congress: 10
                }
            },
            {
                text: {
                    ne: "नेपालमा ग्रीन टेक्नोलोजी हब बनाउने प्रस्ताव गर्ने",
                    en: "Propose making Nepal green technology hub"
                },
                outcome: {
                    ne: "सोलार, विन्ड, जलविद्युत क्षेत्रमा दक्षिण एसियाको केन्द्र बनाउने योजना घोषणा गर्नुभयो। उद्योगपतिहरूको चासो, तर लगानीको प्रश्न।",
                    en: "Announced plan to make South Asia's center in solar, wind, hydropower sectors. Industrialists interested, but question of investment."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 20, stress: 10,
                    economy: 20, business: 25, youth: 25,
                    international: 20, media: 15
                }
            },
            {
                text: {
                    ne: "युवाहरूको क्लाइमेट एक्टिविजम सुरु गर्ने",
                    en: "Start youth climate activism"
                },
                outcome: {
                    ne: "५० हजार युवाहरूको 'क्लाइमेट आर्मी' बनाएर वृक्षारोपण र सफाई अभियान सुरु गर्नुभयो। ठूलो उत्साह तर दीर्घकालीन प्रतिबद्धताको प्रश्न।",
                    en: "Created 'Climate Army' of 50 thousand youth starting tree plantation and cleaning campaigns. Great enthusiasm but question of long-term commitment."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 30, stress: 5,
                    youth: 40, civil_society: 35, media: 20,
                    congress: 5, international: 15
                }
            },
            {
                text: {
                    ne: "संसदमा क्लाइमेट इमर्जेन्सीको प्रस्ताव गर्ने",
                    en: "Propose climate emergency in parliament"
                },
                outcome: {
                    ne: "संसदमा जलवायु संकटलाई राष्ट्रिय आपतकाल घोषणा गर्ने प्रस्ताव ल्याउनुभयो। कानुनी रूपमा बाध्यकारी बनाउने प्रयास तर राजनीतिक अवरोध।",
                    en: "Brought proposal in parliament to declare climate crisis as national emergency. Attempt to make legally binding but political obstacles."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 20, stress: 20,
                    civil_society: 30, youth: 25, judiciary: 15,
                    congress: -10, business: -15, media: 20
                }
            }
        ]
    },

    // RABI LAMICHHANE EXPANDED SCENARIOS - Building to 50+ scenarios
    {
        id: "rabi_lamichhane_anti_corruption_crusade_2025",
        title: {
            ne: "रवि लामिछानेको भ्रष्टाचार विरुद्धको लडाइँ",
            en: "Rabi Lamichhane's Anti-Corruption Crusade"
        },
        description: {
            ne: "मिडियामान्छेबाट राजनीतिज्ञ बनेका रवि लामिछानेले 'सिधा कुरा' कार्यक्रमको शैलीमा संसदमा भ्रष्टाचारको पर्दाफाश गर्न थाले। प्रत्येक हप्ता एक जना मन्त्रीको भ्रष्टाचार सार्वजनिक गर्ने घोषणा। सबै डराए, जनता खुशी। तर शक्तिशाली शत्रुहरू बनाउने जोखिम।",
            en: "Rabi Lamichhane, who became politician from media person, started exposing corruption in parliament in 'Sidha Kura' program style. Announced exposing one minister's corruption every week. Everyone scared, people happy. But risk of making powerful enemies."
        },
        type: "anti_corruption",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        realWorldEvent: true,
        isStartingScenario: true,
        characterSpecific: "rabi_lamichhane",
        
        choices: [
            {
                text: {
                    ne: "ठूला नेताहरूको भ्रष्टाचार सार्वजनिक गर्ने - 'कसैलाई नछोडिने'",
                    en: "Expose big leaders' corruption - 'Will spare no one'"
                },
                outcome: {
                    ne: "प्रचण्ड र देउबाका छोराहरूको सम्पत्ति खुलासा गर्नुभयो। जनताले 'वाह रवि सर!' भने तर राजनीतिक हत्याको धम्की आयो। साहस देखाउनुभयो तर जीवनमा जोखिम।",
                    en: "Exposed Prachanda and Deuba's sons' wealth. People said 'Wah Ravi sir!' but political assassination threats came. Showed courage but life at risk."
                },
                isConstitutional: true,
                effects: { 
                    stability: -20, morale: 40, stress: 30,
                    youth: 45, civil_society: 35, media: 30,
                    congress: -30, military: -15, business: -20
                }
            },
            {
                text: {
                    ne: "सिस्टमेटिक रूपमा प्रमाण जम्मा गरेर कानुनी लडाइँ लड्ने",
                    en: "Fight legal battle by systematically collecting evidence"
                },
                outcome: {
                    ne: "न्यायालयमा ठोस प्रमाणका साथ मुद्दा दर्ता गराउनुभयो। कानुनी रूपमा बलियो भयो तर मिडिया ट्रायलको चर्चो प्रभाव कम भयो।",
                    en: "Filed cases in court with solid evidence. Became legally strong but media trial's sensational impact reduced."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 25, stress: 15,
                    judiciary: 25, civil_society: 30, media: 20,
                    congress: -15, youth: 20
                }
            },
            {
                text: {
                    ne: "जनताको आवाजलाई संसदको आवाज बनाउने",
                    en: "Make people's voice the voice of parliament"
                },
                outcome: {
                    ne: "फेसबुक लाइभमार्फत जनताको प्रश्नहरू सीधा संसदमा उठाउनुभयो। प्रत्यक्ष लोकतन्त्रको नयाँ प्रयोग तर संसदीय मर्यादाको प्रश्न।",
                    en: "Raised people's questions directly in parliament through Facebook live. New experiment of direct democracy but question of parliamentary dignity."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 35, stress: 20,
                    youth: 40, civil_society: 30, media: 35,
                    congress: -20, military: -10
                }
            },
            {
                text: {
                    ne: "राष्ट्रपतिलाई भ्रष्टाचार विरोधी आयोग बनाउन दबाब दिने",
                    en: "Press president to form anti-corruption commission"
                },
                outcome: {
                    ne: "संवैधानिक ढङ्गले भ्रष्टाचार नियन्त्रणको माग गर्नुभयो। राष्ट्रपतिले सकारात्मक प्रतिक्रिया दिए तर स्थापनाको विरोध।",
                    en: "Demanded corruption control in constitutional way. President gave positive response but establishment opposed."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 30, stress: 10,
                    judiciary: 30, civil_society: 25, international: 20,
                    congress: -10, media: 25
                }
            }
        ]
    },

    {
        id: "rabi_lamichhane_media_to_politics_transition_2025",
        title: {
            ne: "रवि लामिछानेको मिडियाबाट राजनीतिमा संक्रमण",
            en: "Rabi Lamichhane's Media to Politics Transition"
        },
        description: {
            ne: "२० वर्ष मिडियामा काम गरेर जनताको मन जित्ने रवि लामिछानेले राजनीतिमा प्रवेश गरेपछि पहिलो चुनावमै ठूलो जित हासिल गर्नुभयो। तर अब मिडियाको स्वतन्त्रता र राजनीतिक दायित्वको बीचमा सन्तुलन मिलाउनुपर्ने चुनौती। पुरानो पहिचान कि नयाँ भूमिका?",
            en: "Rabi Lamichhane, who won people's hearts working 20 years in media, achieved big victory in first election after entering politics. But now challenge to balance between media freedom and political responsibility. Old identity or new role?"
        },
        type: "career_transition",
        imageUrl: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.3,
        
        choices: [
            {
                text: {
                    ne: "राजनीतिक जिम्मेवारी लिएर मिडियाको काम छोड्ने",
                    en: "Leave media work taking political responsibility"
                },
                outcome: {
                    ne: "'अब म पूर्ण राजनीतिज्ञ हुँ' भन्दै सबै मिडिया कार्यक्रम बन्द गर्ने घोषणा गर्नुभयो। राजनीतिक मर्यादा देखाउनुभयो तर जनताले 'रवि सर परिवर्तन भए' भने।",
                    en: "Announced closing all media programs saying 'Now I am full politician'. Showed political dignity but people said 'Ravi sir changed'."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: -10, stress: 15,
                    congress: 15, judiciary: 10, international: 15,
                    youth: -15, civil_society: -10, media: -20
                }
            },
            {
                text: {
                    ne: "मिडिया र राजनीतिको साझेदारी मोडल बनाउने",
                    en: "Create partnership model of media and politics"
                },
                outcome: {
                    ne: "नयाँ प्रयोग! राजनीतिक निर्णयहरू मिडियामार्फत जनतासँग छलफल गर्ने तरिका अपनाउनुभयो। पारदर्शिता बढ्यो तर हितको टकराव भएको आरोप।",
                    en: "New experiment! Adopted method of discussing political decisions with people through media. Transparency increased but accused of conflict of interest."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 25, stress: 20,
                    youth: 30, civil_society: 20, media: 30,
                    congress: -15, judiciary: -10
                }
            },
            {
                text: {
                    ne: "जनसञ्चार नीति सुधारको नेतृत्व गर्ने",
                    en: "Lead mass communication policy reform"
                },
                outcome: {
                    ne: "मिडियाको अनुभव प्रयोग गरेर प्रेस स्वतन्त्रता र जनसञ्चार ऐनमा सुधारको नेतृत्व गर्नुभयो। मिडिया जगतको भरपूर समर्थन।",
                    en: "Led press freedom and mass communication act reform using media experience. Full support from media world."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 30, stress: 5,
                    media: 40, civil_society: 25, youth: 20,
                    congress: 5, international: 20
                }
            },
            {
                text: {
                    ne: "पारम्परिक राजनीतिको ढाँचामा काम गर्ने",
                    en: "Work in traditional politics pattern"
                },
                outcome: {
                    ne: "अन्य राजनीतिज्ञहरू जस्तै पार्टी अनुशासन मान्दै काम गर्ने निर्णय गर्नुभयो। पार्टीको समर्थन मिल्यो तर जनताले 'रवि सर पनि त्यस्तै भए' भने।",
                    en: "Decided to work following party discipline like other politicians. Got party support but people said 'Ravi sir also became like that'."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: -15, stress: -5,
                    congress: 25, military: 10, business: 15,
                    youth: -25, civil_society: -20, media: -15
                }
            }
        ]
    },

    // CROSS-CHARACTER STORYLINE CONNECTIONS
    {
        id: "cross_character_big_three_alliance_2025",
        title: {
            ne: "बिग थ्री गठबन्धन - प्रचण्ड, देउबा, ओली",
            en: "Big Three Alliance - Prachanda, Deuba, Oli"
        },
        description: {
            ne: "सुशीला कार्कीको नियुक्तिले राजनीतिक संकट गहिरो बनाएपछि, तीनै पुराना नेताहरू - प्रचण्ड, देउबा र ओलीले गुप्त भेट गरे। 'हामी तीन जनाले मिलेर काम गरेर संकट समाधान गर्नुपर्छ' भन्ने सहमति। युवा आन्दोलनको दबाबमा पुराना शत्रुहरू मित्र बने।",
            en: "After Sushila Karki's appointment deepened political crisis, three old leaders - Prachanda, Deuba and Oli had secret meeting. Consensus 'We three must work together to solve crisis'. Under youth movement pressure, old enemies became friends."
        },
        type: "cross_character_alliance",
        imageUrl: "https://images.unsplash.com/photo-1586715196006-cd2e4df15d18?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.65,
        realWorldEvent: true,
        
        triggerConditions: {
            // This scenario appears based on previous character interactions
            anyCharacterRelationship: [
                { character1: "prachanda", character2: "deuba", minRelationship: -20 },
                { character1: "oli", character2: "deuba", minRelationship: -20 }
            ]
        },
        
        characterSpecificChoices: {
            prachanda: [
                {
                    text: {
                        ne: "क्रान्तिकारी अनुभव साझा गर्ने - 'मैले राजतन्त्र ढाले, अब गणतन्त्र जोगाउनुपर्छ'",
                        en: "Share revolutionary experience - 'I toppled monarchy, now must protect republic'"
                    },
                    outcome: {
                        ne: "देउबा र ओलीले तपाईंको नेतृत्व स्वीकार गरे। अनुभवको कदर भएको महसुस गर्नुभयो तर जिम्मेवारी पनि बढ्यो।",
                        en: "Deuba and Oli accepted your leadership. Felt experience was valued but responsibility also increased."
                    },
                    effects: { 
                        stability: 15, morale: 25, stress: 20,
                        congress: 15, youth: -10, maoist_network: 30
                    }
                }
            ],
            deuba: [
                {
                    text: {
                        ne: "कूटनीतिक समाधान प्रस्ताव गर्ने - 'संविधान र संस्थाको सम्मान गरौं'",
                        en: "Propose diplomatic solution - 'Respect constitution and institutions'"
                    },
                    outcome: {
                        ne: "संवैधानिक ढङ्गले संकट समाधानको बाटो देखाउनुभयो। प्रचण्ड र ओली दुवैले तपाईंको बुद्धि मानेर सहयोग गर्ने भने।",
                        en: "Showed path to solve crisis constitutionally. Both Prachanda and Oli respected your wisdom and promised cooperation."
                    },
                    effects: { 
                        stability: 25, morale: 20, stress: 10,
                        international: 25, judiciary: 20, congress: 20
                    }
                }
            ],
            oli: [
                {
                    text: {
                        ne: "राष्ट्रवादी एकताको आह्वान गर्ने - 'देश बचाउन एक भएर काम गरौं'",
                        en: "Call for nationalist unity - 'Unite to save country'"
                    },
                    outcome: {
                        ne: "देशभक्तिको जोशले अन्य दुई नेतालाई प्रभावित पार्नुभयो। राष्ट्रिय स्वाभिमानको कुरा गर्दा सबै सहमत भए।",
                        en: "Patriotic fervor influenced other two leaders. When talked about national pride, everyone agreed."
                    },
                    effects: { 
                        stability: 20, morale: 30, stress: 15,
                        military: 20, international: -5, youth: 5
                    }
                }
            ]
        }
    },

    // ADDITIONAL CHARACTER-SPECIFIC SCENARIOS

    // More PRACHANDA scenarios
    {
        id: "prachanda_party_youth_revolt_2025",
        title: {
            ne: "प्रचण्डका पार्टी युवाहरूको विद्रोह",
            en: "Revolt of Prachanda's Party Youth"
        },
        description: {
            ne: "माओवादी पार्टीका युवा नेताहरूले प्रचण्डको विरुद्ध खुला विद्रोह गरे। 'तपाईं क्रान्तिकारी नभएर भ्रष्ट राजनीतिज्ञ बनिसक्नुभयो' भन्दै पार्टी छोड्ने धम्की। देव गुरुङ र टप बहादुर रायमाझी चुप छन्। युवाहरूलाई कसरी सम्हाल्ने?",
            en: "Maoist party youth leaders openly rebelled against Prachanda. 'You became corrupt politician instead of revolutionary' threatening to leave party. Dev Gurung and Top Bahadur Rayamajhi silent. How to handle youth?"
        },
        type: "party_crisis",
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.3,
        characterSpecific: "prachanda",
        
        choices: [
            {
                text: {
                    ne: "युवाहरूलाई प्रमुख पदहरू दिएर मनाउने",
                    en: "Appease youth by giving major positions"
                },
                outcome: {
                    ne: "चतुर राजनीति! युवाहरू खुसी भए तर पुराना नेताहरू नाराज। पार्टीभित्र नयाँ शक्ति संघर्ष सुरु भयो।",
                    en: "Clever politics! Youth happy but old leaders angry. New power struggle started within party."
                },
                effects: { 
                    stability: -5, morale: 15, stress: 15,
                    youth: 25, maoist_network: 10, congress: -5
                }
            },
            {
                text: {
                    ne: "कडा अनुशासन - 'पार्टी एकताभन्दा माथि केही छैन'",
                    en: "Strict discipline - 'Nothing above party unity'"
                },
                outcome: {
                    ne: "पार्टी अनुशासन देखाउनुभयो तर केही युवा नेता वास्तवमै छोडेर गए। शक्ति कम भयो तर एकता कायम।",
                    en: "Showed party discipline but some youth leaders actually left. Power reduced but unity maintained."
                },
                effects: { 
                    stability: 15, morale: -10, stress: 20,
                    maoist_network: 20, youth: -20, congress: 5
                }
            }
        ]
    },

    {
        id: "prachanda_wealth_controversy_2025",
        title: {
            ne: "प्रचण्डको सम्पत्ति विवाद",
            en: "Prachanda's Wealth Controversy"
        },
        description: {
            ne: "मिडियाले प्रचण्डको परिवारको ठूलो सम्पत्ति खुलासा गर्यो। बाबुरामले 'जनयुद्धकै नाममा सम्पत्ति जम्मा गर्यो' भन्दै आरोप लगाए। पुराना माओवादी लडाकुहरू पनि प्रश्न गर्न थाले। क्रान्तिकारी छवि जोगाउन के गर्ने?",
            en: "Media exposed Prachanda family's vast wealth. Baburam accused 'accumulated wealth in name of people's war'. Old Maoist fighters also questioning. What to do to save revolutionary image?"
        },
        type: "scandal",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        characterSpecific: "prachanda",
        
        choices: [
            {
                text: {
                    ne: "सबै सम्पत्ति पार्टी कोषमा दान गर्ने घोषणा गर्ने",
                    en: "Announce donating all wealth to party fund"
                },
                outcome: {
                    ne: "चौंकाउने निर्णय! जनताले 'यो साँचो क्रान्तिकारी हो' भने। अन्तर्राष्ट्रिय मिडियाले प्रशंसा गर्यो तर परिवारले गुनासो गरे।",
                    en: "Shocking decision! People said 'this is true revolutionary'. International media praised but family complained."
                },
                effects: { 
                    stability: 10, morale: 35, stress: 25,
                    youth: 30, civil_society: 40, international: 25,
                    maoist_network: 35, congress: 10
                }
            },
            {
                text: {
                    ne: "पारदर्शी लेखाजोखाको घोषणा गर्ने",
                    en: "Announce transparent accounting"
                },
                outcome: {
                    ne: "व्यावहारिक दृष्टिकोण। सबै सम्पत्तिको विवरण सार्वजनिक गर्नुभयो। केहीको शंका मिटेन तर इमानदारी देखाउनुभयो।",
                    en: "Practical approach. Made all wealth details public. Some doubts remained but showed honesty."
                },
                effects: { 
                    stability: 15, morale: 20, stress: 15,
                    civil_society: 20, media: 25, international: 15,
                    youth: 10, congress: 5
                }
            }
        ]
    },

    // More DEUBA scenarios
    {
        id: "deuba_congress_generational_conflict_2025",
        title: {
            ne: "देउवाको कांग्रेसमा पुस्ता द्वन्द्व",
            en: "Deuba's Congress Generational Conflict"
        },
        description: {
            ne: "कांग्रेसका युवा नेता गगन थापा र विश्व प्रकाश शर्माले देउवाको विरुद्ध खुला आवाज उठाए। '७५ वर्षको उमेरमा पार्टी नेतृत्व गर्न सक्नुहुन्न' भन्दै नयाँ नेतृत्वको माग। कांग्रेस कार्यकर्ताहरू विभाजित। अनुभव कि युवाशक्ति?",
            en: "Congress youth leaders Gagan Thapa and Bishwa Prakash Sharma openly challenged Deuba. 'Cannot lead party at 75 years' demanding new leadership. Congress workers divided. Experience or youth power?"
        },
        type: "party_politics",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.35,
        characterSpecific: "deuba",
        
        choices: [
            {
                text: {
                    ne: "युवाहरूलाई जिम्मेवारी सुम्पेर आफू सल्लाहकार बन्ने",
                    en: "Hand over responsibility to youth and become advisor"
                },
                outcome: {
                    ne: "राज्यनीति प्रज्ञता! युवाहरूले सम्मान गरे र अनुभवको कदर भयो। नम्र संक्रमणले सबैको प्रशंसा पायो।",
                    en: "Political wisdom! Youth respected and experience valued. Graceful transition earned everyone's praise."
                },
                effects: { 
                    stability: 25, morale: 30, stress: -10,
                    youth: 35, congress: 30, civil_society: 25,
                    international: 20, media: 25
                }
            },
            {
                text: {
                    ne: "अनुभवको महत्व देखाएर नेतृत्व कायम राख्ने",
                    en: "Maintain leadership showing importance of experience"
                },
                outcome: {
                    ne: "५ पटकको प्रधानमन्त्रीको अनुभवले युवाहरूलाई चुप लगायो। तर पार्टीभित्र मौन असन्तुष्टि बढ्यो।",
                    en: "5-time PM experience silenced youth. But silent dissatisfaction increased within party."
                },
                effects: { 
                    stability: 10, morale: 5, stress: 20,
                    congress: 15, international: 15, business: 10,
                    youth: -25, civil_society: -10
                }
            }
        ]
    },

    // More Gen Z scenarios
    {
        id: "genz_university_takeover_2025",
        title: {
            ne: "जेन जेडको विश्वविद्यालय कब्जा",
            en: "Gen Z University Takeover"
        },
        description: {
            ne: "तपाईं राजनले त्रिभुवन विश्वविद्यालयमा 'स्वतन्त्र शिक्षा आन्दोलन' सुरु गर्नुभयो। राजनीतिक दलीय नेताहरूको हस्तक्षेप बन्द गर्न माग गर्दै। हजारौं विद्यार्थी सामेल भए। सरकारले दमन गर्ने धम्की दियो। शिक्षा क्रान्ति कि अराजकता?",
            en: "You Rajan started 'Independent Education Movement' at Tribhuvan University. Demanding end to political party interference. Thousands of students joined. Government threatened crackdown. Education revolution or anarchy?"
        },
        type: "student_movement",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.4,
        characterSpecific: "genz_student",
        
        choices: [
            {
                text: {
                    ne: "विश्वविद्यालयमा डिजिटल लोकतन्त्र स्थापना गर्ने",
                    en: "Establish digital democracy in university"
                },
                outcome: {
                    ne: "नवाचार! मोबाइल एपमार्फत विद्यार्थी मतदान सुरु गर्नुभयो। पारदर्शिता बढ्यो, भ्रष्टाचार कम भयो। अन्तर्राष्ट्रिय ध्यान पायो।",
                    en: "Innovation! Started student voting through mobile app. Increased transparency, reduced corruption. Got international attention."
                },
                effects: { 
                    stability: 15, morale: 30, stress: 10,
                    youth: 40, civil_society: 30, international: 25,
                    media: 30, business: 15
                }
            },
            {
                text: {
                    ne: "अन्य विश्वविद्यालयमा पनि आन्दोलन फैलाउने",
                    en: "Spread movement to other universities too"
                },
                outcome: {
                    ne: "राष्ट्रव्यापी आन्दोलन! सबै विश्वविद्यालयमा युवाहरू सडकमा ओर्लिए। शक्तिशाली तर सरकारले आपतकाल लगाउने चेतावनी दियो।",
                    en: "Nationwide movement! Youth hit streets in all universities. Powerful but government warned of emergency."
                },
                effects: { 
                    stability: -20, morale: 40, stress: 30,
                    youth: 50, civil_society: 35, media: 25,
                    military: -20, congress: -25, business: -15
                }
            }
        ]
    },

    // NEW: September 2025 Crisis Event - Prachanda Focus
    {
        id: "prachanda_revolutionary_echoes_2025",
        title: {
            ne: "प्रचण्डलाई जेन जेडले क्रान्तिकारी नेता भने",
            en: "Gen Z Calls Prachanda Revolutionary Leader"
        },
        description: {
            ne: "सडकमा रगत बगेको देखेर, जेन जेड आन्दोलनका नेताहरूले प्रचण्डलाई भने: 'तपाईंले राजतन्त्र ढाल्नुभयो, अब हामी यो भ्रष्ट गणतन्त्र ढाल्छौं। हाम्रो साथ दिनुहोस्।' ५१ जनाको मृत्यु, संसद जलेको, सेनाले नियन्त्रण लिएको। तपाईंको क्रान्तिकारी अनुभवले यो परिस्थितिलाई कसरी देख्छ?",
            en: "Seeing blood on streets, Gen Z movement leaders tell Prachanda: 'You toppled monarchy, now we topple this corrupt republic. Support us.' 51 dead, parliament burned, army in control. How does your revolutionary experience see this situation?"
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.35, // Very high priority for this crisis event
        realWorldEvent: true,
        eventDate: "2025-09-13",
        
        choices: [
            {
                text: {
                    ne: "जेन जेड आन्दोलनलाई खुला समर्थन दिनुहोस् - 'क्रान्ति अधूरो छ'",
                    en: "Openly support Gen Z movement - 'Revolution is incomplete'"
                },
                outcome: {
                    ne: "युवाहरू उत्साहित! 'प्रचण्डले हाम्रो साथ दिनुभयो!' तर पार्टीका नेताहरू चिन्तित - 'उहाँ फेरि क्रान्तिकारी बन्दै हुनुहुन्छ।' अन्तर्राष्ट्रिय समुदाय चिन्तित।",
                    en: "Youth ecstatic! 'Prachanda supports us!' But party leaders worried - 'He's becoming revolutionary again.' International community concerned."
                },
                isConstitutional: true,
                effects: { 
                    stability: -15, morale: 35, stress: 25, economy: -20,
                    youth: 50, civil_society: 30, maoist_network: 40,
                    military: -30, business: -35, international: -25, congress: -20, media: 15
                }
            },
            {
                text: {
                    ne: "गुप्त रूपमा आन्दोलनकर्ताहरूसँग भेट गर्नुहोस् - रणनीति बनाउनुहोस्",
                    en: "Meet secretly with movement leaders - build strategy"
                },
                outcome: {
                    ne: "चतुर चाल! मिडियाले पत्ता लगाएन तर युवाहरूले 'प्रचण्डले हामीलाई सल्लाह दिनुभयो' भने। तपाईंले आन्दोलनलाई दिशा दिनुभयो तर जोखिम लिनुभएन।",
                    en: "Clever move! Media didn't catch but youth say 'Prachanda advised us.' You guided movement without taking risks."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 20, stress: 15, economy: -5,
                    youth: 35, civil_society: 20, maoist_network: 25,
                    military: -10, business: -10, international: -5, congress: -5, media: 5
                }
            },
            {
                text: {
                    ne: "शान्ति र संविधानको पक्षमा बोल्नुहोस् - 'हिंसाले केही समाधान गर्दैन'",
                    en: "Speak for peace and constitution - 'Violence solves nothing'"
                },
                outcome: {
                    ne: "अन्तर्राष्ट्रिय प्रशंसा र स्थापनाको राहत! तर केही युवाहरूले भने 'प्रचण्ड अब बुढा भइसके, भ्रष्ट व्यवस्थाको हिस्सा बने।' पार्टीभित्र पनि बहस।",
                    en: "International praise and establishment relief! But some youth say 'Prachanda got old, became part of corrupt system.' Debate within party too."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: -10, stress: -5, economy: 15,
                    youth: -25, civil_society: 10, maoist_network: -15,
                    military: 20, business: 25, international: 30, congress: 15, media: -5
                }
            },
            {
                text: {
                    ne: "मध्यम मार्ग - 'युवाहरूको आवाज सुनिनुपर्छ तर संवैधानिक प्रक्रिया मार्फत'",
                    en: "Middle path - 'Youth voice must be heard but through constitutional process'"
                },
                outcome: {
                    ne: "राजनीतिक बुद्धि! सबैले केही न केही पाए। युवाहरूले समर्थन महसुस गरे, स्थापनाले खतरा महसुस गरेन। तर कसैले पूर्ण सन्तुष्टि पाएन।",
                    en: "Political wisdom! Everyone got something. Youth felt support, establishment felt no threat. But no one completely satisfied."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 15, stress: 10, economy: 5,
                    youth: 20, civil_society: 15, maoist_network: 10,
                    military: 5, business: 10, international: 15, congress: 10, media: 10
                }
            }
        ]
    },
    
    {
        id: "earthquake_relief_ne",
        title: {
            ne: "भूकम्प राहत कोष हराएको",
            en: "Earthquake Relief Funds Vanish"
        },
        description: {
            ne: "२ अर्ब डलर राहत कोषको मात्र ३०% पीडितहरूसम्म पुग्यो। बाँकी राजनीतिज्ञहरूको गैरसरकारी संस्थाबाट हराए।",
            en: "Only 30% of $2 billion relief fund reached victims. Rest vanished through politician-run NGOs."
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop&q=60", // Nepal earthquake destruction
        baseWeight: 0.52,
        choices: [
            {
                text: {
                    ne: "भ्रष्ट गैरसरकारी संस्थाहरूमा नाटकीय छापामारी गर्नुहोस्",
                    en: "Launch dramatic raids on corrupt NGOs"
                },
                outcome: {
                    ne: "मिडियाले कार्यलाई मन पराए, तर तपाईंको आफ्नै पार्टीका सदस्यहरू संलग्न छन्।",
                    en: "Media loves the action, but your own party members are involved."
                },
                effects: { morale: 25, stability: 5, stress: 10, media: 15, congress: -15, coalition_relations: -10 }
            },
            {
                text: {
                    ne: "पीडितहरूलाई मद्दत गर्न चुपचाप अन्य बजेट मोड्नुहोस्",
                    en: "Quietly divert other budgets to help victims"
                },
                outcome: {
                    ne: "पीडितहरूले सहायता पाए तर विपक्षीले अनाधिकृत खर्च पत्ता लगाए।",
                    en: "Victims get help but opposition discovers unauthorized spending."
                },
                isConstitutional: false,
                effects: { morale: 10, stability: -15, stress: 12 }
            }
        ]
    },
    
    {
        id: "china_bri_ne",
        title: {
            ne: "चीनको बेल्ट एन्ड रोड अल्टिमेटम",
            en: "China's Belt and Road Ultimatum"
        },
        description: {
            ne: "चीनले ५ अर्ब डलरको बेल्ट एन्ड रोड परियोजनाको तुरुन्त निर्णय माग्यो। भारतले निजी चेतावनी दियो।",
            en: "China demands immediate decision on $5 billion Belt and Road projects. India privately warns of consequences."
        },
        type: "diplomatic",
        imageUrl: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=400&h=200&fit=crop&q=60", // China infrastructure construction
        baseWeight: 0.58,
        choices: [
            {
                text: {
                    ne: "चीनसँग व्यापक सम्झौता स्वीकार गर्नुहोस्",
                    en: "Sign comprehensive agreement with China"
                },
                outcome: {
                    ne: "विकासको ठूलो बढावा तर भारतसँग सम्बन्ध बिग्रियो।",
                    en: "Massive development boost but relations with India deteriorate."
                },
                effects: { economy: 30, stability: -10, international: -15, coalition_relations: -20 }
            },
            {
                text: {
                    ne: "भारत-चीनसँग त्रिपक्षीय साझेदारी प्रस्ताव गर्नुहोस्",
                    en: "Propose trilateral partnership with India-China"
                },
                outcome: {
                    ne: "कूटनीतिक उत्कृष्टता वा असम्भव सपना?",
                    en: "Diplomatic masterpiece or impossible dream?"
                },
                effects: { stability: 15, economy: 10, stress: 5, international: 20, coalition_relations: 15 }
            }
        ]
    },
    
    {
        id: "constitution_amendment_ne",
        title: {
            ne: "संविधान संशोधन माग",
            en: "Constitution Amendment Demand"
        },
        description: {
            ne: "मधेशी र जनजाति समुदायहरूले ठूलो आन्दोलनको साथ संविधान संशोधनको माग गर्दै। राजधानी बन्द छ।",
            en: "Madheshi and indigenous communities demand constitution amendments with massive protests. Capital paralyzed."
        },
        type: "political",
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop&q=60", // Nepal parliament building
        baseWeight: 0.54,
        choices: [
            {
                text: {
                    ne: "तत्काल संविधान संशोधन प्रक्रिया सुरु गर्नुहोस्",
                    en: "Immediately begin constitutional amendment process"
                },
                outcome: {
                    ne: "आन्दोलनकारी खुसी भए तर पहाडी समुदाय रिसाए।",
                    en: "Protesters satisfied but hill communities angered."
                },
                effects: { morale: 15, stability: -10, stress: -5, madheshi: 25, hill_community: -15, coalition_relations: 10 }
            },
            {
                text: {
                    ne: "संविधानको पवित्रता रक्षा गर्नुहोस्",
                    en: "Defend constitutional sanctity"
                },
                outcome: {
                    ne: "कानुनी रुपमा सही तर राजनीतिक रुपमा खतरनाक।",
                    en: "Legally correct but politically dangerous."
                },
                effects: { stability: -20, morale: -15, stress: 15, judiciary: 10 }
            }
        ]
    },
    
    {
        id: "corruption_scandal_ne", 
        title: {
            ne: "मन्त्री भ्रष्टाचार पर्दाफाश",
            en: "Minister Corruption Exposed"
        },
        description: {
            ne: "तपाईंको नजिकका मन्त्रीले ५ करोड ठक्याएको पत्ता लाग्यो। मिडिया र विपक्षी दल तपाईंलाई निशाना बनाउँदै।",
            en: "Your close minister exposed for stealing 50 million. Media and opposition target you directly."
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=200&fit=crop&q=60", // Government corruption documents
        baseWeight: 0.56,
        choices: [
            {
                text: {
                    ne: "मन्त्रीलाई तत्काल बर्खास्त र कारबाही गर्नुहोस्",
                    en: "Immediately dismiss minister and prosecute"
                },
                outcome: {
                    ne: "तपाईंको छविमा सुधार तर मन्त्रीले बदलाको धम्की दिए।",
                    en: "Your image improves but minister threatens revenge."
                },
                effects: { morale: 20, stress: 10, media: 15, political_capital: -5 }
            },
            {
                text: {
                    ne: "चुपचाप मन्त्रीलाई राजीनामा दिन भन्नुहोस्",
                    en: "Quietly ask minister to resign"
                },
                outcome: {
                    ne: "कम नाटक तर जनताले तपाईंलाई कमजोर भन्छन्।",
                    en: "Less drama but public sees you as weak."
                },
                effects: { stability: 5, morale: -10, stress: -5 }
            }
        ]
    },
    
    {
        id: "fuel_crisis_ne",
        title: {
            ne: "इन्धन संकट र भारतीय नाकाबन्दी",
            en: "Fuel Crisis and Indian Blockade"
        },
        description: {
            ne: "भारतले अनौपचारिक नाकाबन्दी गर्यो। इन्धन सकियो, अस्पताल बन्द हुँदै, जनताको गुस्सा बढ्दै।",
            en: "India imposes informal blockade. Fuel runs out, hospitals closing, public anger rising."
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60", // Long fuel queues cars waiting
        baseWeight: 0.53,
        choices: [
            {
                text: {
                    ne: "चीनबाट तत्काल तेल आयात गर्ने सम्झौता गर्नुहोस्",
                    en: "Sign emergency oil import deal with China"
                },
                outcome: {
                    ne: "तत्काल राहत तर भारतसँग सम्बन्ध थप बिग्रियो।",
                    en: "Immediate relief but India relations worsen further."
                },
                effects: { stability: 10, economy: 5, international: -20, china_relations: 15 }
            },
            {
                text: {
                    ne: "भारतसँग कूटनीतिक वार्ता सुरु गर्नुहोस्",
                    en: "Initiate diplomatic talks with India"
                },
                outcome: {
                    ne: "वार्ता ढिलो तर दीर्घकालीन समाधानको आशा।",
                    en: "Slow process but hope for long-term solution."
                },
                effects: { stability: -10, morale: -15, stress: 12, diplomacy: 10 }
            }
        ]
    },
    
    {
        id: "covid_response_ne",
        title: {
            ne: "कोभिड-१९ दोस्रो लहर",
            en: "COVID-19 Second Wave"
        },
        description: {
            ne: "अस्पतालहरू भरिए, अक्सिजन सकियो, दैनिक हजारौं संक्रमित। भारतले सीमा बन्द गर्यो।",
            en: "Hospitals overwhelmed, oxygen shortage, thousands infected daily. India closes borders."
        },
        type: "crisis", 
        imageUrl: "https://images.unsplash.com/photo-1584118624012-df056829fbd0?w=400&h=200&fit=crop&q=60", // COVID hospital overwhelmed
        baseWeight: 0.55,
        choices: [
            {
                text: {
                    ne: "कडा लकडाउन र आर्थिक सहायता प्रदान गर्नुहोस्",
                    en: "Impose strict lockdown with economic support"
                },
                outcome: {
                    ne: "जीवन बच्यो तर अर्थव्यवस्था धराशायी भयो।",
                    en: "Lives saved but economy crashes."
                },
                effects: { stability: -15, economy: -25, morale: 10, health: 20 }
            },
            {
                text: {
                    ne: "अर्थव्यवस्था खुला राख्दै स्वास्थ्य प्रोटोकल बढाउनुहोस्",
                    en: "Keep economy open while increasing health protocols"
                },
                outcome: {
                    ne: "व्यापारीहरू खुसी तर मृत्यु दर बढ्यो।",
                    en: "Business happy but death rates increase."
                },
                effects: { economy: 10, morale: -20, stress: 15, business: 15 }
            }
        ]
    },

    {
        id: "supreme_court_crisis_ne",
        title: {
            ne: "सर्वोच्च अदालतले संसद भंग गर्ने धम्की",
            en: "Supreme Court Threatens to Dissolve Parliament"
        },
        description: {
            ne: "प्रधानन्यायाधीशले संवैधानिक अधिकार प्रयोग गर्दै संसद भंग गर्ने चेतावनी दिए। तपाईंको निर्णयहरू असंवैधानिक भएको आरोप। मिडिया हंगामा मच्चिएको छ, विपक्षीले महाअभियोग ल्याउने धम्की दिइरहेका छन्।",
            en: "Chief Justice threatens to dissolve parliament citing constitutional violations in your decisions. Media in chaos, opposition threatens impeachment. Constitutional crisis deepens as judicial-executive standoff intensifies."
        },
        type: "constitutional",
        imageUrl: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=400&h=200&fit=crop&q=60", // Supreme Court Nepal
        baseWeight: 0.58,
        choices: [
            {
                text: {
                    ne: "न्यायपालिकासँग समझदारी गर्दै संवैधानिक समीक्षा स्वीकार गर्नुहोस्",
                    en: "Accept constitutional review and negotiate with judiciary"
                },
                outcome: {
                    ne: "तपाईंको नम्रताले संकट टाल्यो तर कमजोर नेता भन्ने छवि बन्यो। न्यायपालिका खुसी भए तर तपाईंको अधिकार सीमित भयो। विपक्षीले तपाईंलाई कठपुतली भन्दै आक्रमण गरे।",
                    en: "Your humility averts crisis but creates image of weak leadership. Judiciary satisfied but your authority diminished. Opposition attacks you as a puppet of the courts."
                },
                effects: { stability: 10, morale: -15, stress: -10, judiciary: 25, media: 5, political_capital: -15 }
            },
            {
                text: {
                    ne: "राष्ट्रपतिलाई आपतकाल घोषणा गर्न दबाब दिनुहोस्",
                    en: "Pressure President to declare state of emergency"
                },
                outcome: {
                    ne: "आपातकालले तपाईंलाई शक्ति दियो तर लोकतन्त्रको हत्या भयो। अन्तर्राष्ट्रिय समुदायले प्रतिबन्ध लगायो, सडकमा विरोध बढ्यो। तपाईं अधिनायकवादी बन्नुभयो।",
                    en: "Emergency powers give you control but democracy dies. International sanctions imposed, street protests intensify. You become an authoritarian ruler overnight."
                },
                isConstitutional: false,
                effects: { stability: -25, economy: -20, morale: -30, stress: 20, military: 15, international: -35 }
            },
            {
                text: {
                    ne: "राष्ट्रिय एकताको नाममा सबै दललाई संवैधानिक सम्मेलन बोलाउनुहोस्",
                    en: "Call constitutional convention in name of national unity"
                },
                outcome: {
                    ne: "साहसी कदमले राष्ट्रलाई एकजुट बनायो। सबै दल एकसाथ आएर समाधान खोजे। तपाईं राष्ट्रिय नेता बन्नुभयो तर प्रक्रिया ढिलो र जटिल भयो।",
                    en: "Bold move unites the nation. All parties come together seeking solutions. You emerge as national leader but process becomes slow and complex."
                },
                effects: { stability: 15, morale: 20, stress: 10, congress: 20, international: 15, political_capital: 10 }
            }
        ]
    },

    {
        id: "china_military_buildup_ne",
        title: {
            ne: "चीनले सीमामा सेना बढायो",
            en: "China Increases Military Buildup on Border"
        },
        description: {
            ne: "चिनियाँ सेनाले नेपाली सीमामा ट्याङ्क र मिसाइल तैनात गर्यो। भारतले जवाफी कारबाही गर्ने चेतावनी दियो। अमेरिकाले नेपाललाई छनोट गर्न भन्यो। युद्धको डर फैलिँदै छ, पर्यटक भाग्दै छन्।",
            en: "Chinese military deploys tanks and missiles on Nepali border. India warns of retaliation. US demands Nepal choose sides. War fears spread as tourists flee and economy collapses."
        },
        type: "military",
        imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=200&fit=crop&q=60", // Military tanks on border
        baseWeight: 0.60,
        choices: [
            {
                text: {
                    ne: "चीनसँग गुप्त सैन्य सम्झौता गर्नुहोस्",
                    en: "Sign secret military agreement with China"
                },
                outcome: {
                    ne: "चिनियाँ सुरक्षाले तपाईंलाई बलियो बनायो तर नेपाल चीनको उपनिवेश बन्यो। भारतले सीमा बन्द गर्यो, अमेरिकाले प्रतिबन्ध लगायो। नेपाली जनता विदेशी कब्जामा परे।",
                    en: "Chinese protection makes you strong but Nepal becomes Chinese colony. India closes borders, US imposes sanctions. Nepali people live under foreign occupation."
                },
                effects: { stability: 10, economy: -30, morale: -25, stress: 15, military: 20, china_relations: 40, international: -30 }
            },
            {
                text: {
                    ne: "निष्पक्षताको नीति अपनाउँदै दुवै देशसँग वार्ता गर्नुहोस्",
                    en: "Adopt neutrality policy and negotiate with both countries"
            },
                outcome: {
                    ne: "कूटनीतिक चतुरताले युद्ध टाल्यो। तर दुवै पक्ष असन्तुष्ट भए र नेपाल दबाबमा परिरह्यो। आर्थिक सहायता कम भयो, सुरक्षा जोखिम बढ्यो।",
                    en: "Diplomatic skill prevents war but both sides remain unhappy. Nepal stays under pressure. Economic aid decreases, security risks increase."
                },
                effects: { stability: 5, economy: -10, stress: 12, international: -5, political_capital: 5 }
            },
            {
                text: {
                    ne: "संयुक्त राष्ट्रसंघमा शान्ति सेना माग्नुहोस्",
                    en: "Request UN peacekeeping forces"
                },
                outcome: {
                    ne: "अन्तर्राष्ट्रिय समुदायले प्रशंसा गर्यो तर चीन र भारत दुवै रिसाए। UN शान्ति सेना आयो, तर नेपाल कमजोर राष्ट्र बन्यो। स्वाधीनता गुम्यो।",
                    en: "International community praises but China and India both angry. UN peacekeepers arrive but Nepal becomes weak state. Independence lost."
                },
                effects: { stability: 15, morale: -15, stress: -5, international: 25, china_relations: -20, political_capital: -10 }
            }
        ]
    },

    {
        id: "massive_earthquake_ne",
        title: {
            ne: "विनाशकारी भूकम्प - हजारौंको मृत्यु",
            en: "Devastating Earthquake - Thousands Dead"
        },
        description: {
            ne: "८.२ म्यागनिच्युडको भूकम्पले काठमाडौं ध्वस्त पार्यो। १० हजार मानिस मरे, लाखौं घरबारविहीन। अस्पताल भत्किए, सडक बन्द भए। अन्तर्राष्ट्रिय सहायता आउँदै छ तर भ्रष्टाचारको डर।",
            en: "8.2 magnitude earthquake destroys Kathmandu. 10,000 dead, millions homeless. Hospitals collapsed, roads blocked. International aid arriving but corruption fears widespread."
        },
        type: "disaster",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop&q=60", // Earthquake destruction Kathmandu
        baseWeight: 0.52,
        choices: [
            {
                text: {
                    ne: "आफैं भग्नावशेषमा गएर उद्धार कार्यमा नेतृत्व दिनुहोस्",
                    en: "Personally lead rescue operations in the rubble"
                },
                outcome: {
                    ne: "तपाईंको साहसले राष्ट्रलाई प्रेरणा दियो। हात फोहोर गरेर काम गर्दा जनताको मुटु छुन्यो। तर सुरक्षा जोखिम बढ्यो, प्रशासन अस्तव्यस्त भयो।",
                    en: "Your courage inspires the nation. Getting hands dirty touches people's hearts. But security risks increase, administration becomes chaotic."
                },
                effects: { morale: 30, stability: -5, stress: 20, public_support: 25, media: 20 }
            },
            {
                text: {
                    ne: "आपतकालीन सरकार गठन गरी सेना र प्रहरी परिचालन गर्नुहोस्",
                    en: "Form emergency government and deploy military and police"
                },
                outcome: {
                    ne: "व्यवस्थित उद्धार कार्यले धेरै जीवन बचायो। तर सैन्य शासनको डर फैलियो। केही नेताले तपाईंमाथि सत्ता कब्जाको आरोप लगाए।",
                    en: "Organized rescue saves many lives. But fears of military rule spread. Some leaders accuse you of power grab during crisis."
                },
                effects: { stability: 20, economy: -15, stress: 15, military: 25, congress: -10 }
            },
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय सहायता एजेन्सीलाई पूर्ण अधिकार दिनुहोस्",
                    en: "Give full authority to international aid agencies"
                },
                outcome: {
                    ne: "विदेशी सहायताले द्रुत राहत मिल्यो तर नेपाली सरकार कमजोर देखियो। विदेशी संस्थाले नेपाल नियन्त्रण गरे। राष्ट्रिय गौरव घट्यो।",
                    en: "Foreign aid provides quick relief but Nepali government looks weak. Foreign agencies control Nepal. National pride diminished."
                },
                effects: { stability: 15, economy: 10, morale: -20, international: 20, sovereignty: -15 }
            }
        ]
    },

    {
        id: "indian_currency_ban_ne",
        title: {
            ne: "भारतले नेपाली नोट प्रतिबन्ध गर्यो",
            en: "India Bans Nepali Currency Exchange"
        },
        description: {
            ne: "भारतले अचानक नेपाली रुपैयाँ साट्न प्रतिबन्ध लगायो। सीमावर्ती क्षेत्रमा व्यापार ठप्प, हजारौं व्यापारी दिवालिया। बैंकमा नगद संकट, जनताले बैंकमा लाइन लगाए। आर्थिक संकट गहिरियो।",
            en: "India suddenly bans Nepali rupee exchange. Border trade stops, thousands of traders go bankrupt. Cash crisis in banks, people queue desperately. Economic crisis deepens rapidly."
        },
        type: "economic",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop&q=60", // Currency bank crisis
        baseWeight: 0.54,
        choices: [
            {
                text: {
                    ne: "आफ्नै डिजिटल करेन्सी सुरु गर्नुहोस्",
                    en: "Launch your own digital currency"
                },
                outcome: {
                    ne: "अत्याधुनिक समाधानले संसारको ध्यान तान्यो। तर जनताले नबुझे, पुरानो पुस्ताले विरोध गरे। प्राविधिक समस्या आयो, हैकिङको डर फैलियो।",
                    en: "Cutting-edge solution attracts world attention. But people don't understand, older generation protests. Technical problems arise, hacking fears spread."
                },
                effects: { economy: 5, morale: -10, stress: 15, international: 15, youth: 20, elderly: -15 }
            },
            {
                text: {
                    ne: "चीन र अन्य देशहरूसँग द्विपक्षीय व्यापार सम्झौता गर्नुहोस्",
                    en: "Sign bilateral trade agreements with China and other countries"
                },
                outcome: {
                    ne: "वैकल्पिक बजार भेटियो तर भारतसँग सम्बन्ध बिग्रियो। नयाँ व्यापारिक साझेदार फेला परे तर भाषा र सांस्कृतिक बाधा आयो। भारतले थप दबाब दियो।",
                    en: "Alternative markets found but India relations worsen. New trade partners discovered but language and cultural barriers emerge. India increases pressure further."
                },
                effects: { economy: 15, stability: -5, stress: 10, china_relations: 20, india_relations: -25 }
            },
            {
                text: {
                    ne: "राष्ट्रिय आपतकाल घोषणा गरी सेनालाई व्यापार नियन्त्रण दिनुहोस्",
                    en: "Declare national emergency and give military control of trade"
                },
                outcome: {
                    ne: "सैन्य नियन्त्रणले तत्काल व्यवस्था मिल्यो तर स्वतन्त्रता हराए। कालोबजारी बढ्यो, भ्रष्टाचार फैलियो। लोकतन्त्र खतरामा परे।",
                    en: "Military control brings immediate order but freedom disappears. Black market increases, corruption spreads. Democracy under threat."
                },
                isConstitutional: false,
                effects: { stability: 10, economy: -5, morale: -20, stress: 18, military: 30, freedom: -25 }
            }
        ]
    },

    {
        id: "youth_revolution_ne",
        title: {
            ne: "युवाहरूको क्रान्ति - हड्ताल र प्रदर्शन",
            en: "Youth Revolution - Strikes and Mass Protests"
        },
        description: {
            ne: "लाखौं युवाहरूले सरकार विरुद्ध आन्दोलन गरे। बेरोजगारी, भ्रष्टाचार र भविष्यविहीनताको आक्रोश फुट्यो। फेसबुकबाट सुरु भएको आन्दोलन सडकमा पुग्यो। सरकारी भवन घेरे, इन्टरनेट बन्द गर्नुपर्ने अवस्था।",
            en: "Millions of youth revolt against government. Unemployment, corruption and hopelessness explode. Facebook-started movement hits streets. Government buildings surrounded, internet shutdown considered."
        },
        type: "social",
        imageUrl: "https://images.unsplash.com/photo-1612538498456-e861df91d4d6?w=400&h=200&fit=crop&q=60", // Student mass protest demonstration
        baseWeight: 0.56,
        choices: [
            {
                text: {
                    ne: "युवाहरूसँग प्रत्यक्ष संवाद गर्नुहोस् र उनीहरूका माग सुन्नुहोस्",
                    en: "Directly engage with youth and listen to their demands"
                },
                outcome: {
                    ne: "साहसी कदमले युवाहरूको मन छुन्यो। केहीले तपाईंलाई साँचो नेता भने। तर पुरानो राजनीतिज्ञहरू रिसाए। युवाहरूका माग पूरा गर्न गाह्रो भयो।",
                    en: "Brave step touches youth hearts. Some call you true leader. But old politicians angry. Difficult to fulfill youth demands completely."
                },
                effects: { morale: 25, stress: -10, youth: 40, political_establishment: -20, media: 15 }
            },
            {
                text: {
                    ne: "इन्टरनेट बन्द गरी आन्दोलन दबाउनुहोस्",
                    en: "Shut down internet and suppress the movement"
                },
                outcome: {
                    ne: "आन्दोलन तत्कालका लागि रोकियो तर भूमिगत भयो। युवाहरू थप रिसाए, अन्तर्राष्ट्रिय समुदायले निन्दा गर्यो। तपाईं तानाशाह बन्नुभयो।",
                    en: "Movement temporarily stopped but goes underground. Youth become more angry, international community condemns. You become dictator."
                },
                isConstitutional: false,
                effects: { stability: -20, morale: -30, stress: 25, youth: -40, international: -25, freedom: -30 }
            },
            {
                text: {
                    ne: "युवा आयोग गठन गरी उनीहरूलाई सरकारमा सहभागिता दिनुहोस्",
                    en: "Form youth commission and give them government participation"
                },
                outcome: {
                    ne: "नयाँ विचारले सरकारमा जीवन फैलायो। युवाहरूले नवाचार ल्याए। तर अनुभवको कमी र राजनीतिक षडयन्त्रले समस्या सिर्जना गर्यो।",
                    en: "New ideas bring life to government. Youth bring innovations. But lack of experience and political conspiracies create problems."
                },
                effects: { morale: 20, economy: 10, stress: 8, youth: 35, innovation: 25, political_establishment: -15 }
            }
        ]
    },

    {
        id: "climate_disaster_ne",
        title: {
            ne: "हिमाली हिमताल फुट्यो - बाढी आपदा",
            en: "Himalayan Glacial Lake Bursts - Flood Disaster"
        },
        description: {
            ne: "जलवायु परिवर्तनका कारण हिमताल फुट्दा भयानक बाढी आयो। सयौं गाउँ डुब्यो, हजारौं मरे। विदेशी जलवायु विज्ञानीहरूले नेपाललाई चेतावनी दिएका थिए तर सुनेको थिएन। अब विश्वभरका आँखा नेपालमा।",
            en: "Climate change causes glacial lake burst creating massive floods. Hundreds of villages submerged, thousands die. Foreign climate scientists had warned Nepal but were ignored. Now world watches Nepal."
        },
        type: "environmental",
        imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=200&fit=crop&q=60", // Flood disaster water everywhere 
        baseWeight: 0.53,
        choices: [
            {
                text: {
                    ne: "विश्व जलवायु सम्मेलन बोलाउनुहोस् र नेपाललाई जलवायु परिवर्तनको प्रतीक बनाउनुहोस्",
                    en: "Host world climate summit and make Nepal symbol of climate change"
                },
                outcome: {
                    ne: "नेपाल विश्व जलवायुको केन्द्र बन्यो। अरबौं डलर सहायता आयो। तर पर्यावरणीय नियमहरूले विकास कार्य रोकिए। आर्थिक गतिविधि सुस्त भयो।",
                    en: "Nepal becomes world climate center. Billions of dollars aid arrives. But environmental regulations stop development works. Economic activities slow down."
                },
                effects: { international: 35, economy: -10, stability: 5, stress: -5, environmental_reputation: 40 }
            },
            {
                text: {
                    ne: "चीन र भारतसँग हिमाली संरक्षणको साझा कार्यक्रम सुरु गर्नुहोस्",
                    en: "Start joint Himalayan conservation program with China and India"
                },
                outcome: {
                    ne: "ऐतिहासिक सम्झौताले क्षेत्रीय सहयोग बढायो। तीनै देश मिलेर काम गर्न थाले। तर राष्ट्रिय स्वाधीनतामा केही प्रभाव परे।",
                    en: "Historic agreement increases regional cooperation. All three countries start working together. But some impact on national sovereignty."
                },
                effects: { stability: 15, international: 25, china_relations: 20, india_relations: 20, sovereignty: -5 }
            },
            {
                text: {
                    ne: "प्रभावित क्षेत्रलाई विशेष स्वशासित क्षेत्र घोषणा गर्नुहोस्",
                    en: "Declare affected areas as special autonomous zones"
                },
                outcome: {
                    ne: "स्थानीयहरूले स्वशासन पाए र द्रुत पुनर्निर्माण गरे। तर केन्द्रीय नियन्त्रण कमजोर भयो। अन्य क्षेत्रहरूले पनि स्वायत्तताको माग गरे।",
                    en: "Locals get self-governance and rebuild quickly. But central control weakens. Other regions also demand autonomy."
                },
                effects: { morale: 15, stability: -10, stress: -5, local_governance: 30, central_authority: -20 }
            }
        ]
    },

    {
        id: "maoist_insurgency_return_ne",
        title: {
            ne: "नयाँ माओवादी विद्रोह - जंगलमा लड्नेहरू",
            en: "New Maoist Insurgency - Fighters Return to Jungle"
        },
        description: {
            ne: "असन्तुष्ट माओवादी कमाण्डरहरूले हतियार उठाए। शान्ति सम्झौता तोडेर जंगलमा फर्किए। बम विस्फोट, प्रहरी चौकीमा आक्रमण, जिल्ला सदरमुकाम कब्जा गर्ने धम्की। दोस्रो गृहयुद्धको डर फैलिँदै। अन्तर्राष्ट्रिय समुदाय चिन्तित।",
            en: "Dissatisfied Maoist commanders take up arms again. Break peace agreement and return to jungle. Bombings, police post attacks, threats to capture district headquarters. Fear of second civil war spreading. International community worried."
        },
        type: "insurgency",
        imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=200&fit=crop&q=60", // Military jungle warfare armed conflict
        baseWeight: 0.17,
        choices: [
            {
                text: {
                    ne: "तत्काल सैन्य अपरेशन सुरु गरी विद्रोहीहरूलाई समाप्त पार्नुहोस्",
                    en: "Launch immediate military operation to eliminate rebels"
                },
                outcome: {
                    ne: "कडा कारबाहीले विद्रोह दमन गर्यो तर नागरिक मृत्यु भयो। गाउँमा सेनाको आतंक फैलियो। मानवअधिकार उल्लङ्घनको आरोप लाग्यो। शान्ति प्रक्रिया नष्ट भयो।",
                    en: "Harsh action suppresses rebellion but civilian casualties occur. Military terror spreads in villages. Human rights violation accusations. Peace process destroyed."
                },
                effects: { stability: 10, morale: -25, stress: 20, military: 15, international: -30, human_rights: -25 }
            },
            {
                text: {
                    ne: "पूर्व प्रधानमन्त्री प्रचण्डलाई मध्यस्थताको लागि पठाउनुहोस्",
                    en: "Send former PM Prachanda for mediation"
                },
                outcome: {
                    ne: "प्रचण्डको प्रभावले केही विद्रोही मान्न तयार भए। तर कट्टरपन्थीहरूले उनलाई धोकेबाज भने। आंशिक सफलता भए पनि समस्या जारी रह्यो। तपाईं कमजोर देखिनुभयो।",
                    en: "Prachanda's influence makes some rebels agree. But hardliners call him traitor. Partial success but problems continue. You appear weak."
                },
                effects: { stability: 5, morale: -10, stress: 15, maoist_relations: 20, political_capital: -10 }
            },
            {
                text: {
                    ne: "राष्ट्रिय एकताको आह्वान गर्दै सबै दललाई सहयोग माग्नुहोस्",
                    en: "Call for national unity and seek all parties' cooperation"
                },
                outcome: {
                    ne: "राजनीतिक एकताले राष्ट्रलाई बलियो बनायो। विद्रोहीहरू एक्लिए, जनताले सरकारलाई समर्थन गरे। तर समाधान ढिलो भयो, केही क्षेत्रमा हिंसा जारी रह्यो।",
                    en: "Political unity strengthens nation. Rebels isolated, people support government. But solution slow, violence continues in some areas."
                },
                effects: { stability: 15, morale: 20, stress: 5, congress: 25, international: 10, national_unity: 30, coalition_relations: 25 }
            }
        ]
    },

    {
        id: "covid_vaccine_scandal_ne",
        title: {
            ne: "कोभिड खोप घोटाला - मन्त्रीहरूको मिलेमतो",
            en: "COVID Vaccine Scandal - Ministers' Collusion"
        },
        description: {
            ne: "स्वास्थ्य मन्त्री र व्यापारीहरूको मिलेमतो पत्ता लाग्यो। नक्कली खोप आयात गरेर करोडौं कमाए। जनताले पानी मिसिएको खोप लगाए, संक्रमण बढ्यो। अस्पतालमा मृत्यु बढेपछि सत्य बाहिर आयो। जनताको आक्रोश चरममा।",
            en: "Health minister and businessmen collusion exposed. Imported fake vaccines earning crores. People got water-mixed vaccines, infections increased. Truth emerged after hospital deaths rose. Public rage at peak."
        },
        type: "health",
        imageUrl: "https://images.unsplash.com/photo-1632053002636-32e4ae92060e?w=400&h=200&fit=crop&q=60", // Vaccine vials medical corruption
        baseWeight: 0.55,
        choices: [
            {
                text: {
                    ne: "मन्त्रीलाई तुरुन्त पक्राउ गरी आजीवन कारावासको माग गर्नुहोस्",
                    en: "Immediately arrest minister and demand life imprisonment"
                },
                outcome: {
                    ne: "कडा न्यायले जनताको मन छुन्यो। तपाईंको इमान्दारिता प्रशंसित भयो। तर स्वास्थ्य व्यवस्था ध्वस्त भयो, अन्य मन्त्रीहरू डराए। सरकारमा अस्थिरता आयो।",
                    en: "Strict justice touches people's hearts. Your honesty praised. But health system collapses, other ministers scared. Government instability comes."
                },
                effects: { morale: 30, stability: -10, stress: 15, media: 25, cabinet: -20, justice: 20 }
            },
            {
                text: {
                    ne: "चुपचाप मन्त्रीलाई राजीनामा दिलाएर नयाँ खोप तत्काल ल्याउनुहोस्",
                    en: "Quietly make minister resign and bring new vaccines immediately"
                },
                outcome: {
                    ne: "तत्काल समाधानले जीवन बचायो तर न्यायको हत्या भयो। मन्त्री भागेर विदेश पुगे। भ्रष्टाचारीलाई बचाउने आरोप लाग्यो। जनताले तपाईंलाई सहयोगी भने।",
                    en: "Immediate solution saves lives but justice dies. Minister flees abroad. Accused of protecting corrupt officials. People call you accomplice."
                },
                effects: { morale: -20, stability: 5, stress: 10, health: 15, corruption_image: -25 }
            },
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय अनुसन्धान टोली बोलाएर पारदर्शी छानबिन गर्नुहोस्",
                    en: "Call international investigation team for transparent inquiry"
            },
                outcome: {
                    ne: "पारदर्शी अनुसन्धानले सत्य बाहिर ल्यायो। तर राष्ट्रिय गौरवमा आँच आयो। विदेशी दबाब बढ्यो। केही नेताले तपाईंलाई राष्ट्रद्रोही भने।",
                    en: "Transparent investigation reveals truth. But national pride hurt. Foreign pressure increases. Some leaders call you traitor."
                },
                effects: { morale: 10, stability: -5, stress: 12, international: 25, nationalism: -15, transparency: 30 }
            }
        ]
    },

    {
        id: "royal_family_return_ne",
        title: {
            ne: "पूर्व राजा ज्ञानेन्द्रको राजनीतिक पुनरागमन",
            en: "Former King Gyanendra's Political Comeback"
        },
        description: {
            ne: "पूर्व राजा ज्ञानेन्द्रले राजतन्त्र पुनर्स्थापनाको घोषणा गरे। हजारौं समर्थकहरू काठमाडौंमा जम्मा भए। राजाले संविधानसभा भंग गर्ने र पुरानो व्यवस्था फर्काउने धम्की दिए। सेनाका केही अधिकारीहरू राजाको पक्षमा देखिए। संकटकाल घोषणाको दबाब।",
            en: "Former King Gyanendra announces monarchy restoration. Thousands of supporters gather in Kathmandu. King threatens to dissolve constituent assembly and restore old system. Some army officers appear pro-monarchy. Pressure for emergency declaration."
        },
        type: "constitutional",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&q=60", // Royal palace monarchy crown
        baseWeight: 0.54,
        choices: [
            {
                text: {
                    ne: "राजतन्त्रवादी आन्दोलनलाई तुरुन्त गैरकानुनी घोषणा गर्नुहोस्",
                    en: "Immediately declare monarchist movement illegal"
                },
                outcome: {
                    ne: "कडा कारबाहीले राजतन्त्रवादी भागे तर गणतन्त्रवादीहरू खुसी भए। सेनामा विभाजन आयो, केही अधिकारीहरू पक्राउ परे। लोकतन्त्र बच्यो तर अस्थिरता बढ्यो।",
                    en: "Harsh action makes royalists flee but republicans happy. Army division emerges, some officers arrested. Democracy saved but instability increases."
                },
                effects: { stability: -15, morale: 15, stress: 18, republican: 25, military: -10, constitutional: 20 }
            },
            {
                text: {
                    ne: "राजासँग वार्ता गरी संवैधानिक राजतन्त्रको प्रस्ताव गर्नुहोस्",
                    en: "Negotiate with king and propose constitutional monarchy"
                },
                outcome: {
                    ne: "समझदारीले हिंसा टाल्यो तर गणतन्त्रवादीहरू रिसाए। नयाँ संवैधानिक संकट सिर्जना भयो। जनताले भ्रम महसुस गरे। राजनीतिक समीकरण जटिल भयो।",
                    en: "Compromise prevents violence but republicans angry. New constitutional crisis created. People feel confused. Political equations become complex."
                },
                effects: { stability: 5, morale: -10, stress: 15, monarchist: 20, republican: -25, international: -10 }
            },
            {
                text: {
                    ne: "जनमत संग्रह गराएर जनताको फैसला गर्न दिनुहोस्",
                    en: "Conduct referendum and let people decide"
                },
                outcome: {
                    ne: "लोकतान्त्रिक तरिकाले राष्ट्रलाई गौरवान्वित बनायो। तर अभियानमा हिंसा भयो। देश दुई भागमा बाँडियो। जे परिणाम आए पनि आधा जनता असन्तुष्ट हुनेछन्।",
                    en: "Democratic method makes nation proud. But campaign violence occurs. Country divided in two. Whatever result comes, half population will be dissatisfied."
                },
                effects: { morale: 15, stability: -20, stress: 20, democratic_process: 30, polarization: 25 }
            }
        ]
    },

    {
        id: "media_press_freedom_ne",
        title: {
            ne: "प्रेस स्वतन्त्रताको संकट - पत्रकार हत्या",
            en: "Press Freedom Crisis - Journalist Murder"
        },
        description: {
            ne: "सरकारी भ्रष्टाचारको अनुसन्धान गर्ने प्रसिद्ध पत्रकारको हत्या भयो। मृत्यु अघि उनले तपाईंका नजिकका व्यक्तिहरूको भ्रष्टाचारको प्रमाण तयार गरेका थिए। मिडिया हंगामा मचे, विदेशी दूतावासले दबाब दिए। पत्रकारहरूले काम बन्द गरे।",
            en: "Famous journalist investigating government corruption murdered. Before death he prepared evidence of corruption by your close associates. Media in uproar, foreign embassies pressure. Journalists stop work."
        },
        type: "media",
        imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop&q=60", // Press freedom journalism crisis
        baseWeight: 0.56,
        choices: [
            {
                text: {
                    ne: "तुरुन्त स्वतन्त्र अनुसन्धान कमिसन गठन गर्नुहोस्",
                    en: "Immediately form independent investigation commission"
                },
                outcome: {
                    ne: "स्वतन्त्र अनुसन्धानले सत्य बाहिर ल्यायो। तपाईंका केही साथीहरू संलग्न थिए। न्याय भए तर तपाईंको सत्ता कमजोर भयो। प्रेस स्वतन्त्रता बच्यो।",
                    en: "Independent investigation reveals truth. Some of your friends involved. Justice done but your power weakens. Press freedom saved."
                },
                effects: { morale: 20, stability: -10, stress: 15, media: 30, political_capital: -20, justice: 25 }
            },
            {
                text: {
                    ne: "आतंकवादी समूहको कारबाही भनेर सेनामार्फत अनुसन्धान गर्नुहोस्",
                    en: "Investigate through military calling it terrorist group action"
            },
                outcome: {
                    ne: "सैन्य अनुसन्धानले वास्तविक हत्याराहरूलाई लुकायो। मिडियाले तपाईंलाई संदिग्ध ठहर्यायो। अन्तर्राष्ट्रिय समुदायले प्रतिबन्ध लगायो। लोकतन्त्र खतरामा परे।",
                    en: "Military investigation hides real murderers. Media suspects you. International community imposes sanctions. Democracy under threat."
                },
                effects: { stability: -20, morale: -25, stress: 25, media: -35, international: -25, military: 10 }
            },
            {
                text: {
                    ne: "पत्रकारको परिवारलाई क्षतिपूर्ति दिएर मामला शान्त पार्नुहोस्",
                    en: "Give compensation to journalist's family and quiet the matter"
                },
                outcome: {
                    ne: "पैसाले परिवार चुप भए तर सत्य दबियो। अन्य पत्रकारहरूले डर महसुस गरे। प्रेस स्वतन्त्रता मर्यो। तपाईं अपराधीको संरक्षक बन्नुभयो।",
                    en: "Money silences family but truth buried. Other journalists feel fear. Press freedom dies. You become protector of criminals."
                },
                effects: { stability: 5, morale: -30, stress: 20, media: -40, corruption_image: -30, fear: 25 }
            }
        ]
    },

    {
        id: "everest_climbing_disaster_ne",
        title: {
            ne: "सगरमाथामा चढाइ प्रकोप - विदेशी पर्यटकको मृत्यु",
            en: "Everest Climbing Disaster - Foreign Tourist Deaths"
        },
        description: {
            ne: "सगरमाथामा १५ जना विदेशी पर्वतारोहीको मृत्यु भयो। सुरक्षा उपकरणको कमी, अनुभवहीन गाइड र भ्रष्ट अनुमति प्रक्रियाका कारण दुर्घटना भयो। विदेशी मिडियाले नेपालको नकारात्मक प्रचार गरे। पर्यटन उद्योग संकटमा। अन्तर्राष्ट्रिय दबाब बढ्यो।",
            en: "15 foreign climbers die on Everest. Accident due to lack of safety equipment, inexperienced guides and corrupt permit process. Foreign media negative publicity about Nepal. Tourism industry in crisis. International pressure mounts."
        },
        type: "tourism",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&q=60", // Mount Everest snow death zone
        baseWeight: 0.53,
        choices: [
            {
                text: {
                    ne: "सगरमाथा चढाइमा स्थगन घोषणा गरी सुरक्षा सुधार गर्नुहोस्",
                    en: "Announce Everest climbing moratorium and improve safety"
                },
                outcome: {
                    ne: "सुरक्षा सुधारले भविष्यका जीवन बचायो तर पर्यटन उद्योग ध्वस्त भयो। हजारौं मानिस बेरोजगार भए। शेर्पा समुदाय संकटमा। अर्थव्यवस्था कमजोर भयो।",
                    en: "Safety improvements save future lives but tourism industry collapses. Thousands become unemployed. Sherpa community in crisis. Economy weakens."
                },
                effects: { stability: -15, economy: -30, morale: -20, safety: 30, international: 15, sherpa_community: -25 }
            },
            {
                text: {
                    ne: "सबै चढाइ कम्पनीलाई कडा नियमन गरी जरिवाना गर्नुहोस्",
                    en: "Strictly regulate all climbing companies with heavy fines"
                },
                outcome: {
                    ne: "कडा नियमनले सुरक्षा बढ्यो तर साना कम्पनीहरू बन्द भए। केवल धनी कम्पनीहरूले मात्र व्यवसाय गरे। एकाधिकार बन्यो। स्थानीय रोजगार घट्यो।",
                    en: "Strict regulation increases safety but small companies close. Only wealthy companies do business. Monopoly forms. Local employment decreases."
                },
                effects: { stability: 5, economy: -10, morale: -5, safety: 20, business_regulation: 25, small_business: -20 }
            },
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय पर्वतारोहण संस्थासँग साझेदारी गर्नुहोस्",
                    en: "Partner with international mountaineering organizations"
                },
                outcome: {
                    ne: "विदेशी विशेषज्ञताले सुरक्षा बढ्यो र छवि सुधरियो। तर नेपाली कम्पनीहरूको भूमिका घट्यो। विदेशी नियन्त्रण बढ्यो। स्वदेशी सीप विकास रोकियो।",
                    en: "Foreign expertise increases safety and improves image. But Nepali companies' role decreases. Foreign control increases. Indigenous skill development stops."
                },
                effects: { stability: 10, economy: 5, morale: -10, international: 25, foreign_dependence: 20, local_capacity: -15 }
            }
        ]
    },

    // ============================================================================
    // NORMAL CITIZEN SPECIFIC SCENARIOS - Citizen's Perspective
    // ============================================================================

    {
        id: "normal_citizen_rising_food_prices",
        characterSpecific: "normal_citizen", 
        title: {
            ne: "खाना महंगो भएको छ - के गर्ने?",
            en: "Food prices rising - what to do?"
        },
        description: {
            ne: "तपाईं एक सामान्य नेपाली नागरिक हुनुहुन्छ। दाल, चामल, तेलको मूल्य बढ्दै गएको छ। पारिवारिक बजेट मिलाउन गाह्रो भएको छ। राजनीतिज्ञहरूले बोली हावा फेर्छन् तर वास्तविक समाधान देखिंदैन।",
            en: "You are an ordinary Nepali citizen. Prices of lentils, rice, oil keep rising. Family budget is getting difficult. Politicians just give speeches but no real solutions visible."
        },
        type: "economic_citizen_crisis",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.65,
        isStartingScenario: true,
        choices: [
            {
                text: {
                    ne: "महंगी विरोधी आन्दोलनमा सामेल हुने",
                    en: "Join anti-inflation protest movement"
                },
                outcome: {
                    ne: "सडकमा उत्रेर आवाज उठाउनुभयो। केही समान विचारका मानिसहरूको साथ पाउनुभयो तर तुरुन्त समाधान भएन।",
                    en: "Took to streets and raised voice. Got support from like-minded people but immediate solution didn't come."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 15, stress: 10,
                    civil_society: 20, youth: 25, government_pressure: 15
                }
            },
            {
                text: {
                    ne: "स्थानीय तरकारी उत्पादकसँग सीधा किन्ने",
                    en: "Buy directly from local vegetable farmers"
                },
                outcome: {
                    ne: "बिचौलियालाई छोडेर किसानसँग सीधा सम्बन्ध बनाउनुभयो। केही बचत भयो र स्थानीय अर्थतन्त्रलाई समर्थन गर्नुभयो।",
                    en: "Skipped middlemen and built direct relationship with farmers. Some savings made and supported local economy."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 10, stress: -5,
                    local_economy: 20, farmer_relations: 25, practical_solution: 15
                }
            },
            {
                text: {
                    ne: "सामुदायिक बचत समूह बनाएर सामूहिक खरिदारी गर्ने",
                    en: "Form community savings group for collective purchasing"
                },
                outcome: {
                    ne: "छिमेकीहरूसँग मिलेर बल्क खरिदारीको व्यवस्था गर्नुभयो। सामुदायिक एकता बढ्यो र खर्च केही कम भयो।",
                    en: "Organized bulk purchasing with neighbors. Community unity increased and expenses somewhat reduced."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 20, stress: -10,
                    community_cooperation: 30, collective_action: 25, innovation: 15
                }
            },
            {
                text: {
                    ne: "चुप लागेर आफ्नै परिवारको मात्र ख्याल गर्ने",
                    en: "Stay quiet and just take care of own family"
                },
                outcome: {
                    ne: "राजनीतिक गतिविधिमा नसामेल भएर आफ्नै घरपरिवारमा ध्यान दिनुभयो। व्यक्तिगत शान्ति तर सामाजिक परिवर्तनमा योगदान नभएको खेद।",
                    en: "Didn't join political activities and focused on own household. Personal peace but regret of not contributing to social change."
                },
                isConstitutional: true,
                effects: { 
                    stability: 0, morale: -5, stress: 5,
                    family_focus: 10, political_disengagement: 15, missed_opportunity: -10
                }
            }
        ]
    },

    {
        id: "normal_citizen_power_cut_crisis",
        characterSpecific: "normal_citizen",
        title: {
            ne: "लोडसेडिङ फेरि फर्कियो - के गर्ने?",
            en: "Load shedding returned - what to do?"
        },
        description: {
            ne: "तपाईं एक सामान्य नेपाली नागरिक हुनुहुन्छ। लोडसेडिङले दैनिक जीवन बिगारेको छ। बच्चाहरूको पढाइ, घरको काम, व्यापार सबै प्रभावित। विद्युत् प्राधिकरणको बहाना सुन्दै थकित भइसक्नुभयो।",
            en: "You are an ordinary Nepali citizen. Load shedding has disrupted daily life. Children's studies, household work, business all affected. Tired of hearing Nepal Electricity Authority's excuses."
        },
        type: "infrastructure_citizen_crisis",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.60,
        choices: [
            {
                text: {
                    ne: "सोलार प्यानल जडान गर्ने योजना बनाउने",
                    en: "Plan to install solar panels"
                },
                outcome: {
                    ne: "नवीकरणीय ऊर्जाको दिशामा लाग्नुभयो। शुरुको लगानी महंगो तर दीर्घकालीन समाधानको बाटो देख्नुभयो।",
                    en: "Moved towards renewable energy. Initial investment expensive but saw path to long-term solution."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 15, stress: 10,
                    environmental_consciousness: 25, energy_independence: 20, innovation: 15
                }
            },
            {
                text: {
                    ne: "स्थानीय नेतालाई धक्का दिएर समाधान खोज्ने",
                    en: "Pressure local leader to find solution"
                },
                outcome: {
                    ne: "वडाध्यक्षलाई भेटेर समस्या बुझाउनुभयो। केही आश्वासन पाउनुभयो तर तत्कालीन समाधान भएन।",
                    en: "Met ward chairperson and explained problem. Got some assurances but immediate solution didn't happen."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 5, stress: 15,
                    local_political_engagement: 20, government_pressure: 10, expectations: 15
                }
            },
            {
                text: {
                    ne: "छिमेकीहरूसँग मिलेर जेनेरेटर साझा गर्ने",
                    en: "Share generator with neighbors"
                },
                outcome: {
                    ne: "सामुदायिक सहयोगले केही समस्या हल भयो। इन्धनको खर्च साझा भयो र छिमेकी सम्बन्ध बलियो भयो।",
                    en: "Community cooperation solved some problems. Fuel costs shared and neighbor relationships strengthened."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 20, stress: -5,
                    community_solidarity: 30, resource_sharing: 25, practical_solution: 20
                }
            },
            {
                text: {
                    ne: "बसाइँसराइ गरेर राम्रो ठाउँ खोज्ने",
                    en: "Migrate to find better place"
                },
                outcome: {
                    ne: "समस्याबाट भागेर समाधान खोज्ने सोच्नुभयो। तर बसाइँसराइ पनि आफैमा चुनौती हो भन्ने महसुस गर्नुभयो।",
                    en: "Thought of escaping problems to find solution. But realized migration itself is a challenge."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: -15, stress: 25,
                    brain_drain: 20, family_disruption: 25, escapism: 15
                }
            }
        ]
    },

    {
        id: "normal_citizen_medical_emergency",
        characterSpecific: "normal_citizen",
        title: {
            ne: "अस्पतालमा घुस माग्यो - के गर्ने?",
            en: "Hospital demanded bribe - what to do?"
        },
        description: {
            ne: "तपाईं एक सामान्य नेपाली नागरिक हुनुहुन्छ। आमाको हृदयघातको आकस्मिक उपचारका लागि अस्पताल गएका थिए। डाक्टरले 'छिटो भर्ना गर्न' भनेर २० हजार 'व्यवस्था गर्न' भन्यो। जीवन र मर्यादा बीचको द्वन्द्वमा पर्नुभयो।",
            en: "You are an ordinary Nepali citizen. Went to hospital for mother's heart attack emergency treatment. Doctor said to 'arrange' 20 thousand for 'quick admission'. Caught between life and dignity."
        },
        type: "corruption_citizen_crisis",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.70,
        choices: [
            {
                text: {
                    ne: "जीवन बचाउन घुस तिरेर तत्काल उपचार गराउने",
                    en: "Pay bribe to save life and get immediate treatment"
                },
                outcome: {
                    ne: "घुस तिरेर आमाको जीवन बचाउनुभयो। मन खुसी भयो तर भ्रष्टाचारको चक्रमा सामेल भएको दुःख भयो।",
                    en: "Saved mother's life by paying bribe. Heart felt relieved but saddened by joining corruption cycle."
                },
                isConstitutional: false,
                effects: { 
                    stability: -10, morale: 10, stress: 20,
                    family_relief: 40, corruption_normalization: 25, moral_compromise: -20
                }
            },
            {
                text: {
                    ne: "भ्रष्टाचार विरोधी आयोगमा उजुरी दिने",
                    en: "File complaint with anti-corruption commission"
                },
                outcome: {
                    ne: "सिद्धान्तको पक्षमा उभिनुभयो तर उपचारमा ढिलाइ भयो। लामो कानुनी प्रक्रियाको सुरुवात भयो।",
                    en: "Stood for principles but treatment got delayed. Long legal process began."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: -10, stress: 35,
                    anti_corruption_stance: 30, legal_process: 20, family_stress: 30
                }
            },
            {
                text: {
                    ne: "मिडियामा गएर घटना सार्वजनिक गर्ने",
                    en: "Go to media and make incident public"
                },
                outcome: {
                    ne: "सामाजिक सञ्जालमा घटना भाइरल भयो। केही समर्थन पाउनुभयो तर अस्पतालसँग विवाद बढ्यो।",
                    en: "Incident went viral on social media. Got some support but conflict with hospital increased."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 20, stress: 25,
                    public_awareness: 35, media_attention: 30, institutional_conflict: 20
                }
            },
            {
                text: {
                    ne: "अर्को अस्पताल खोजेर उपचार गराउने",
                    en: "Find another hospital for treatment"
                },
                outcome: {
                    ne: "समयमै अर्को अस्पताल भेटियो र उपचार भयो। भ्रष्टाचारसँग सम्झौता नगरी समाधान भेटियो।",
                    en: "Found another hospital in time and got treatment. Found solution without compromising with corruption."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 25, stress: 15,
                    problem_solving: 30, integrity_maintained: 25, alternative_seeking: 20
                }
            }
        ]
    },

    {
        id: "normal_citizen_local_election_choice",
        characterSpecific: "normal_citizen",
        title: {
            ne: "स्थानीय चुनावमा कसलाई भोट दिने?",
            en: "Who to vote for in local election?"
        },
        description: {
            ne: "तपाईं एक सामान्य नेपाली नागरिक हुनुहुन्छ। स्थानीय चुनावमा तीन जना उम्मेदवार छन्: पुराना दलका भ्रष्ट तर अनुभवी नेता, युवा तर अनुभवहीन स्वतन्त्र उम्मेदवार, र स्थानीय व्यापारी जसले सडक बनाउने वाचा गरेका छन्।",
            en: "You are an ordinary Nepali citizen. Three candidates in local election: corrupt but experienced leader from old party, young but inexperienced independent candidate, and local businessman who promised to build roads."
        },
        type: "electoral_choice",
        imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.55,
        choices: [
            {
                text: {
                    ne: "अनुभवी नेतालाई भोट दिने - 'भ्रष्ट भए पनि काम त गर्छ'",
                    en: "Vote for experienced leader - 'Corrupt but gets work done'"
                },
                outcome: {
                    ne: "व्यावहारिक छनोट गर्नुभयो। केही विकासका काम भए तर भ्रष्टाचार जारी रह्यो। मिश्रित परिणाम।",
                    en: "Made practical choice. Some development works happened but corruption continued. Mixed results."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: -10, stress: 5,
                    development_works: 20, corruption_tolerance: 15, pragmatic_politics: 10
                }
            },
            {
                text: {
                    ne: "युवा स्वतन्त्र उम्मेदवारलाई मौका दिने",
                    en: "Give chance to young independent candidate"
                },
                outcome: {
                    ne: "परिवर्तनको पक्षमा उभिनुभयो। नयाँ उत्साह देखियो तर व्यावहारिक काममा केही ढिलाइ भयो।",
                    en: "Stood for change. Saw new enthusiasm but some delays in practical work."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 25, stress: 10,
                    political_renewal: 30, youth_empowerment: 25, learning_curve: 15
                }
            },
            {
                text: {
                    ne: "व्यापारीलाई भोट दिने - 'पैसा छ, सडक बनाउँछ'",
                    en: "Vote for businessman - 'Has money, will build roads'"
                },
                outcome: {
                    ne: "व्यावहारिक सुविधाको आशामा भोट हाल्नुभयो। केही भौतिक विकास भयो तर लोकतान्त्रिक मूल्यमा प्रश्न उठ्यो।",
                    en: "Voted hoping for practical facilities. Some physical development happened but questions arose about democratic values."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 10, stress: 0,
                    infrastructure_development: 25, money_politics: 20, democratic_values: -10
                }
            },
            {
                text: {
                    ne: "भोट नहालेर घरमा बसी रहने",
                    en: "Don't vote and stay home"
                },
                outcome: {
                    ne: "राजनीतिक प्रक्रियामा सहभागी नभएर निष्क्रिय रहनुभयो। व्यक्तिगत शान्ति तर लोकतान्त्रिक दायित्व पूरा नगरेको खेद।",
                    en: "Remained passive by not participating in political process. Personal peace but regret of not fulfilling democratic responsibility."
                },
                isConstitutional: true,
                effects: { 
                    stability: 0, morale: -15, stress: -5,
                    political_disengagement: 25, civic_irresponsibility: 20, apathy: 15
                }
            }
        ]
    },

    {
        id: "normal_citizen_social_media_misinformation",
        characterSpecific: "normal_citizen", 
        title: {
            ne: "फेसबुकमा झुटो समाचार देखियो - के गर्ने?",
            en: "Saw fake news on Facebook - what to do?"
        },
        description: {
            ne: "तपाईं एक सामान्य नेपाली नागरिक हुनुहुन्छ। फेसबुकमा एउटा पोस्ट देख्नुभयो जसमा लेखिएको छ 'सरकारले नागरिकताको नयाँ नियम ल्यायो, अब १ लाख तिर्नुपर्छ'। तर यो झुटो खबर जस्तो लाग्छ। यसलाई कसरी सम्हाल्ने?",
            en: "You are an ordinary Nepali citizen. Saw a Facebook post saying 'Government brought new citizenship rule, now have to pay 1 lakh'. But this seems like fake news. How to handle this?"
        },
        type: "digital_literacy_crisis",
        imageUrl: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.50,
        choices: [
            {
                text: {
                    ne: "तुरुन्त साझा गरेर सबैलाई सचेत गराउने",
                    en: "Immediately share to alert everyone"
                },
                outcome: {
                    ne: "झुटो खबर फैलाउने काममा योगदान पुर्याउनुभयो। धेरै मानिसहरू भ्रममा परे र अनावश्यक आतंक फैलियो।",
                    en: "Contributed to spreading fake news. Many people got confused and unnecessary panic spread."
                },
                isConstitutional: false,
                effects: { 
                    stability: -15, morale: -20, stress: 25,
                    misinformation_spread: 30, social_panic: 25, media_literacy: -20
                }
            },
            {
                text: {
                    ne: "सरकारी वेबसाइटमा गएर जाँच गर्ने",
                    en: "Check on government website"
                },
                outcome: {
                    ne: "सत्य खोजी गर्नुभयो र थाहा पाउनुभयो कि यो झुटो खबर हो। साइबर साक्षरताको महत्व बुझ्नुभयो।",
                    en: "Sought truth and found out it's fake news. Understood importance of cyber literacy."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 15, stress: -5,
                    digital_literacy: 30, fact_checking: 25, responsible_behavior: 20
                }
            },
            {
                text: {
                    ne: "साथीहरूलाई सोधेर र छलफल गरेर निर्णय गर्ने",
                    en: "Ask friends and decide after discussion"
                },
                outcome: {
                    ne: "सामुदायिक छलफलमार्फत सत्य पत्ता लगाउने प्रयास गर्नुभयो। केही भ्रम मेटियो तर पूर्ण यकिन भएन।",
                    en: "Tried to find truth through community discussion. Some confusion cleared but not completely certain."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 10, stress: 10,
                    community_verification: 20, social_discussion: 15, partial_clarity: 10
                }
            },
            {
                text: {
                    ne: "बेवास्ता गरेर केही नगर्ने",
                    en: "Ignore and do nothing"
                },
                outcome: {
                    ne: "तटस्थ रहेर कुनै काम नगर्नुभयो। झुटो खबर फैलिनु रोकिएन तर आफूले गलत काम पनि गरेनुं।",
                    en: "Remained neutral and did nothing. Didn't stop fake news spread but also didn't do wrong."
                },
                isConstitutional: true,
                effects: { 
                    stability: 0, morale: 0, stress: 0,
                    passive_response: 15, missed_opportunity: 10, neutral_stance: 5
                }
            }
        ]
    }

];

// ============================================================================
// GENZ SPECIFIC EVENTS - Non-Political Life Scenarios
// ============================================================================

const GENZ_EVENTS = [
    {
        id: "college_assignment_deadline",
        title: {
            ne: "असाइनमेंट डेडलाइन - रातभरि जाग्नुपर्ने",
            en: "Assignment Deadline - All-Nighter Required"
        },
        description: {
            ne: "भोलि बिहान जम्मा गर्नुपर्ने महत्वपूर्ण असाइनमेंट अझै अधुरो छ। साथीहरू पार्टी गर्न बोलाइरहेका छन् तर काम पूरा गर्नुपर्छ। तनाव बढिरहेको छ, कफी र एनर्जी ड्रिंकमात्र सहारा।",
            en: "Important assignment due tomorrow morning is still incomplete. Friends calling for party but work needs to be finished. Stress rising, only coffee and energy drinks for support."
        },
        type: "education",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.65,
        choices: [
            {
                text: {
                    ne: "रातभर जागेर असाइनमेंट पूरा गर्नुहोस्",
                    en: "Stay up all night and complete assignment"
                },
                outcome: {
                    ne: "असाइनमेंट राम्रो भयो तर स्वास्थ्यमा नकारात्मक प्रभाव। अर्को दिन क्लासमा सुत्नुभयो।",
                    en: "Assignment turned out well but negative health impact. Slept through next day's classes."
                },
                effects: { morale: 15, stress: 20, economy: -5 }
            },
            {
                text: {
                    ne: "साथीहरूसँग पार्टी गएर तनाव कम गर्नुहोस्",
                    en: "Go partying with friends to reduce stress"
                },
                outcome: {
                    ne: "राम्रो समय बितायो तर असाइनमेंट अधुरो। प्रोफेसरले गुणस्तरमा प्रश्न उठाए।",
                    en: "Had great time but assignment incomplete. Professor questioned the quality."
                },
                effects: { morale: 25, stress: -10, economy: -10, stability: -5 }
            },
            {
                text: {
                    ne: "साथीहरूसँग ग्रुप स्टडी गरेर सहयोग माग्नुहोस्",
                    en: "Organize group study with friends for help"
                },
                outcome: {
                    ne: "सबैले मिलेर राम्रो काम गरे। नयाँ मित्रता बन्यो र असाइनमेंट पनि राम्रो भयो।",
                    en: "Everyone worked together well. New friendships formed and assignment turned out great."
                },
                effects: { morale: 20, stress: -5, stability: 10 }
            }
        ]
    },

    {
        id: "social_media_viral_post",
        title: {
            ne: "इन्स्टाग्राम पोस्ट भाइरल - हजारौं लाइक",
            en: "Instagram Post Goes Viral - Thousands of Likes"
        },
        description: {
            ne: "सनराइजको फोटो खिचेर पोस्ट गरेको थियो। अचानक हजारौं लाइक र कमेन्ट आयो। ब्रान्डहरूले स्पन्सरशिप अफर गर्दै। इन्फ्लुएन्सर बन्ने मौका आयो तर पढाईमा असर पर्न सक्छ।",
            en: "Posted sunrise photo casually. Suddenly thousands of likes and comments. Brands offering sponsorships. Chance to become influencer but might affect studies."
        },
        type: "social",
        imageUrl: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.55,
        choices: [
            {
                text: {
                    ne: "फुलटाइम इन्फ्लुएन्सर बन्ने निर्णय गर्नुहोस्",
                    en: "Decide to become full-time influencer"
                },
                outcome: {
                    ne: "पैसा कमाउन थाल्नुभयो तर अध्ययनमा ध्यान घट्यो। परिवारले चिन्ता जनाए।",
                    en: "Started earning money but focus on studies decreased. Family expressed concern."
                },
                effects: { economy: 25, morale: 15, stress: 10, stability: -10 }
            },
            {
                text: {
                    ne: "पढाईलाई प्राथमिकता दिएर बालेन्स गर्नुहोस्",
                    en: "Prioritize studies while maintaining balance"
                },
                outcome: {
                    ne: "दुवै काम सम्भाल्न गाह्रो भयो तर व्यवस्थापन सिकिनुभयो। भविष्यका लागि राम्रो अनुभव।",
                    en: "Difficult to manage both but learned management skills. Good experience for future."
                },
                effects: { morale: 10, stress: 15, stability: 15, economy: 5 }
            },
            {
                text: {
                    ne: "सामाजिक कारणहरूका लागि प्लेटफर्म प्रयोग गर्नुहोस्",
                    en: "Use platform for social causes"
                },
                outcome: {
                    ne: "सकारात्मक सन्देश फैलाउनुभयो। NGO हरूले सम्पर्क गरे। सामाजिक जिम्मेवारी महसुस गर्नुभयो। (राजनीतिक सक्रियता +10)",
                    en: "Spread positive messages. NGOs reached out. Felt social responsibility. (Political activation +10)"
                },
                effects: { morale: 20, stress: 5, stability: 10 },
                politicalActivation: 10
            }
        ]
    },

    {
        id: "internship_opportunity",
        title: {
            ne: "सपनाको इन्टर्नशिप अवसर",
            en: "Dream Internship Opportunity"
        },
        description: {
            ne: "प्रसिद्ध टेक कम्पनीमा इन्टर्नशिपको अवसर आयो। तर यो गर्मी बिदामा छ जब साथीहरूसँग युरोप ट्रिप प्लान गरेको थियो। परिवारले पैसा खर्च गरिसकेको, तर क्यारियरको लागि इन्टर्नशिप महत्वपूर्ण।",
            en: "Got internship opportunity at famous tech company. But it's during summer break when planned Europe trip with friends. Family already spent money, but internship crucial for career."
        },
        type: "career",
        imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.60,
        choices: [
            {
                text: {
                    ne: "इन्टर्नशिप लिएर भविष्यमा लगानी गर्नुहोस्",
                    en: "Take internship and invest in future"
                },
                outcome: {
                    ne: "व्यावसायिक सीप सिकिनुभयो र नेटवर्क बनाउनुभयो। तर साथीहरूसँगको यात्रा गुमाएर अलिकति पछुतो लाग्यो।",
                    en: "Learned professional skills and built network. But felt slight regret missing trip with friends."
                },
                effects: { economy: 20, stability: 15, stress: 10, morale: -5 }
            },
            {
                text: {
                    ne: "साथीहरूसँग यात्रा गएर यादहरू बनाउनुहोस्",
                    en: "Go traveling with friends and make memories"
                },
                outcome: {
                    ne: "अविस्मरणीय यादहरू बनाउनुभयो र मानसिक स्वास्थ्य राम्रो भयो। तर क्यारियरको अवसर गुमाएको अनुभव गर्नुभयो।",
                    en: "Made unforgettable memories and improved mental health. But felt like missed career opportunity."
                },
                effects: { morale: 30, stress: -15, economy: -15, stability: -5 }
            }
        ]
    },

    {
        id: "political_awakening_moment",
        title: {
            ne: "विद्यार्थी संगठनको निमन्त्रणा",
            en: "Student Organization Invitation"
        },
        description: {
            ne: "क्याम्पसमा फ्री वाइफाई र राम्रो खाना नपाउने समस्यामा विद्यार्थी संगठनले आन्दोलन गर्ने भन्यो। तपाईंको एक पोस्टले धेरै लाइक पाएकोले नेताहरूले सम्पर्क गरे। राजनीतिमा सक्रिय हुने पहिलो मौका।",
            en: "Student organization planning protest about poor WiFi and food quality on campus. Your post got many likes so leaders contacted you. First chance to become politically active."
        },
        type: "political_transition",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.08, // Low chance unless political activation is increasing
        choices: [
            {
                text: {
                    ne: "आन्दोलनमा सक्रिय भाग लिनुहोस्",
                    en: "Actively participate in the movement"
                },
                outcome: {
                    ne: "विद्यार्थी नेता बन्नुभयो। समस्या समाधानमा योगदान पुर्याउनुभयो तर राजनीतिक दुनियामा प्रवेश गर्नुभयो। (राजनीतिक सक्रियता +25)",
                    en: "Became student leader. Contributed to solving problems but entered political world. (Political activation +25)"
                },
                effects: { morale: 15, stress: 15, stability: 10 },
                politicalActivation: 25,
                triggersTransition: true // This can trigger transition to political character
            },
            {
                text: {
                    ne: "समर्थन गर्नुहोस् तर नेतृत्वबाट टाढा रहनुहोस्",
                    en: "Support but stay away from leadership"
                },
                outcome: {
                    ne: "समस्याको समाधान भयो। सामाजिक चेतना बढ्यो तर राजनीतिमा गहिरो संलग्नता भएन। (राजनीतिक सक्रियता +5)",
                    en: "Problems got solved. Social awareness increased but didn't get deeply involved in politics. (Political activation +5)"
                },
                effects: { morale: 10, stress: 5 },
                politicalActivation: 5
            },
            {
                text: {
                    ne: "राजनीतिबाट टाढा रहेर आफ्ना कुरामा फोकस गर्नुहोस्",
                    en: "Stay away from politics and focus on own matters"
                },
                outcome: {
                    ne: "अध्ययनमा फोकस बढ्यो। साथीहरूले निष्क्रिय भन्दै आलोचना गरे तर व्यक्तिगत लक्ष्य पूरा भयो।",
                    en: "Increased focus on studies. Friends criticized as passive but achieved personal goals."
                },
                effects: { economy: 10, stress: -5, morale: -5 }
            }
        ]
    },

    {
        id: "job_placement_pressure",
        title: {
            ne: "जागिर खोज्ने दबाब",
            en: "Job Search Pressure"
        },
        description: {
            ne: "ग्रेजुएशन नजिकिदै छ। साथीहरूले जागिर पाएका छन् तर तपाईंलाई अझै केही मिलेको छैन। परिवारको अपेक्षा बढिरहेको छ। CV बनाउने, इन्टर्भ्यूको तयारी र नेटवर्किंग गर्नुपर्छ।",
            en: "Graduation approaching. Friends got jobs but you haven't found anything yet. Family expectations increasing. Need to build CV, prepare for interviews and do networking."
        },
        type: "career",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.58,
        choices: [
            {
                text: {
                    ne: "जुनसुकै जागिर लिएर अनुभव सुरु गर्नुहोस्",
                    en: "Take any job available to start gaining experience"
                },
                outcome: {
                    ne: "आर्थिक स्वतन्त्रता पाउनुभयो तर काम मन नपर्ने। सीप विकास ढिलो भयो तर जिम्मेवारी बढ्यो।",
                    en: "Got financial independence but job unsatisfying. Skill development slow but responsibility increased."
                },
                effects: { economy: 25, morale: -10, stress: 15, stability: 10 }
            },
            {
                text: {
                    ne: "सपनाको जागिरको लागि कुर्नुहोस् र स्किल बिल्ड गर्नुहोस्",
                    en: "Wait for dream job and build skills"
                },
                outcome: {
                    ne: "स्किल बढ्यो तर आर्थिक तनाव बढ्यो। परिवारको दबाब झेल्नुपर्यो तर भविष्यका लागि तयार भयो।",
                    en: "Skills improved but financial stress increased. Faced family pressure but became better prepared for future."
                },
                effects: { economy: -10, morale: 5, stress: 20, stability: -5 }
            }
        ]
    },

    // ============================================================================
    // KP OLI SPECIFIC SCENARIOS - AUTHORITARIAN LEADER ARC
    // ============================================================================

    {
        id: "kpoli_authoritarian_vs_democracy_crisis",
        characterSpecific: "kp_oli",
        title: {
            ne: "सत्तामा बसेर लोकतन्त्र कसरी चलाउने?",
            en: "How to run democracy while staying in power?"
        },
        description: {
            ne: "तपाईं फेरि प्रधानमन्त्री बन्नुभएको छ। सर्वोच्चले संविधान उल्लंघन गरेको ठहर दिएर बर्खास्त गरेको इतिहास छ। यसपटक कसरी लामो समय सत्तामा बसेर आफ्ना योजनाहरू कार्यान्वयन गर्ने? लोकतान्त्रिक प्रक्रिया र व्यक्तिगत शक्ति बीचको संघर्ष।",
            en: "You've become PM again. Supreme Court dismissed you before for constitutional violations. This time, how to stay in power longer and implement your plans? Conflict between democratic process and personal power."
        },
        type: "leadership_crisis",
        imageUrl: "https://images.unsplash.com/photo-1541872705-1f73c6400ec9?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.70,
        characterTraits: ["authoritarian_tendency", "experienced_politician", "strategic_survivor"],
        choices: [
            {
                text: {
                    ne: "संसद भंग गरेर नयाँ चुनावमा जाने",
                    en: "Dissolve parliament and go for fresh elections"
                },
                outcome: {
                    ne: "राजनीतिक संकट सिर्जना भयो। विपक्षी दलहरूले संविधान उल्लंघन भन्दै आन्दोलन सुरु गरे। तर आफ्ना समर्थकहरूले मजबूत नेतृत्वको रूपमा हेरे।",
                    en: "Created political crisis. Opposition parties started protests calling it constitutional violation. But your supporters saw it as strong leadership."
                },
                isConstitutional: false,
                effects: { 
                    stability: -15, morale: 10, stress: 20,
                    congress: -25, communist: 15, civil_society: -20, international: -15
                }
            },
            {
                text: {
                    ne: "न्यायपालिकासँग बफादारीपूर्ण न्यायाधीशहरू नियुक्त गर्ने वातावरण बनाउने",
                    en: "Create environment to appoint loyal judges to judiciary"
                },
                outcome: {
                    ne: "न्यायिक स्वतन्त्रताको प्रश्न उठ्यो। कानुनी विशेषज्ञहरूले आपत्ति जनाए तर राजनीतिक हस्तक्षेपको जोखिम कम भयो।",
                    en: "Questions raised about judicial independence. Legal experts objected but reduced risk of political interference."
                },
                isConstitutional: false,
                effects: { 
                    stability: -10, morale: -10, stress: 15,
                    judiciary: -30, civil_society: -25, international: -20, communist: 20
                }
            },
            {
                text: {
                    ne: "लोकप्रिय नीतिहरू ल्याएर जनताको समर्थन बढाउने",
                    en: "Increase public support by bringing popular policies"
                },
                outcome: {
                    ne: "आर्थिक राहतका कार्यक्रमहरू सुरु गर्नुभयो। जनताको समर्थन बढ्यो तर राजकोषीय दबाब बढ्यो। लोकतान्त्रिक तरिकाले जीत हासिल गर्नुभयो।",
                    en: "Started economic relief programs. Public support increased but fiscal pressure grew. Achieved victory through democratic means."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 25, stress: 10,
                    public_support: 30, business: -10, international: 10
                }
            },
            {
                text: {
                    ne: "चीन-भारत दुवैसँग मिलेर अन्तर्राष्ट्रिय समर्थन पाउने",
                    en: "Get international support by balancing both China and India"
                },
                outcome: {
                    ne: "कूटनीतिक सन्तुलन कायम राख्नुभयो। विदेशी लगानी बढ्यो तर आन्तरिक राजनीतिक समस्याहरू अझै बाँकी रहे।",
                    en: "Maintained diplomatic balance. Foreign investment increased but internal political problems remained."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 5, stress: 5,
                    international: 25, business: 20, economy: 15
                }
            }
        ]
    },

    {
        id: "kpoli_china_india_balancing_crisis",
        characterSpecific: "kp_oli",
        title: {
            ne: "चीन-भारत बीचको कूटनीतिक जालमा कसरी बाँच्ने?",
            en: "How to survive diplomatic web between China and India?"
        },
        description: {
            ne: "चीनले बेल्ट एन्ड रोडमा नेपाललाई बढी संलग्न गराउन चाहन्छ। भारतले MCC र अन्य परियोजनामा ध्यान दिन भन्छ। दुवैले आफ्नो पक्षमा तान्न खोजिरहेका छन्। एक छान्दा अर्कोसँग समस्या हुन्छ।",
            en: "China wants Nepal more involved in Belt and Road. India says focus on MCC and other projects. Both trying to pull towards their side. Choosing one creates problems with the other."
        },
        type: "international_relations",
        imageUrl: "https://images.unsplash.com/photo-1570395281617-53b95a4e5faf?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.65,
        characterTraits: ["international_experience", "pragmatic_balancer", "nationalist"],
        choices: [
            {
                text: {
                    ne: "चीनसँग नजिक भएर BRI मा जोडदार सहभागिता गर्ने",
                    en: "Get closer to China and participate strongly in BRI"
                },
                outcome: {
                    ne: "चिनियाँ लगानी र पूर्वाधार विकास तेज भयो। तर भारतले नाकाबन्दीको धम्की दियो र अमेरिकाले दबाब बढायो।",
                    en: "Chinese investment and infrastructure development accelerated. But India threatened blockade and America increased pressure."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 15, stress: 20,
                    china: 40, india: -30, usa: -25, economy: 20, business: 15
                }
            },
            {
                text: {
                    ne: "भारतको MCC स्वीकार गरेर दक्षिण एशियाली सहयोग बढाउने",
                    en: "Accept India's MCC and increase South Asian cooperation"
                },
                outcome: {
                    ne: "भारतसँग व्यापार र ऊर्जा सहयोग बढ्यो। तर चीनले प्रतिशोधको नीति अपनायो र आफ्ना परियोजनाहरू ढिला गर्यो।",
                    en: "Trade and energy cooperation with India increased. But China adopted retaliatory policy and delayed their projects."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 10, stress: 15,
                    india: 35, china: -25, usa: 20, economy: 15
                }
            },
            {
                text: {
                    ne: "नेपालको राष्ट्रिय स्वार्थलाई प्राथमिकता दिएर दुवैसँग सन्तुलित सम्बन्ध राख्ने",
                    en: "Prioritize Nepal's national interest and maintain balanced relations with both"
                },
                outcome: {
                    ne: "कूटनीतिक सन्तुलनको नीति अपनाउनुभयो। दुवै देशले दबाब दिइरहे तर नेपालको स्वाधीनता कायम राख्नुभयो। लामो समयमा सफल रणनीति।",
                    en: "Adopted policy of diplomatic balance. Both countries kept pressuring but maintained Nepal's independence. Successful long-term strategy."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 20, stress: 25,
                    china: 5, india: 5, usa: 10, nationalist_pride: 30
                }
            },
            {
                text: {
                    ne: "अमेरिका र युरोपसँग मिलेर तेस्रो विकल्प खोज्ने",
                    en: "Search for third option by aligning with America and Europe"
                },
                outcome: {
                    ne: "पश्चिमी देशहरूसँग नयाँ साझेदारी सुरु भयो। तर चीन र भारत दुवैले नेपाललाई धम्की दिन थाले। जोखिमपूर्ण तर स्वतन्त्र नीति।",
                    en: "New partnership with Western countries began. But both China and India started threatening Nepal. Risky but independent policy."
                },
                isConstitutional: true,
                effects: { 
                    stability: -20, morale: 10, stress: 30,
                    usa: 30, europe: 25, china: -20, india: -15, international: 15
                }
            }
        ]
    },

    {
        id: "kpoli_economic_nationalism_vs_globalization",
        characterSpecific: "kp_oli",
        title: {
            ne: "आर्थिक राष्ट्रवाद वा विश्वीकरण - कुन बाटो?",
            en: "Economic nationalism or globalization - which path?"
        },
        description: {
            ne: "नेपाली उत्पादनहरूको बजार घट्दै छ। विदेशी कम्पनीहरूले ठूलो पूंजी ल्याउन चाहन्छन् तर स्थानीय व्यवसायीहरू डराएका छन्। रोजगारी बढाउने कि स्वदेशी उद्योग बचाउने - दुईटा लक्ष्य बीचको द्वन्द्व।",
            en: "Market for Nepali products shrinking. Foreign companies want to bring big capital but local businesspeople are scared. Create employment or save domestic industry - conflict between two goals."
        },
        type: "economic_policy",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.60,
        characterTraits: ["economic_nationalist", "development_focused", "business_pragmatist"],
        choices: [
            {
                text: {
                    ne: "स्वदेशी उत्पादनलाई संरक्षण दिएर आयात महसुल बढाउने",
                    en: "Protect domestic products by increasing import duties"
                },
                outcome: {
                    ne: "स्थानीय उद्यमीहरू खुसी भए तर उपभोक्ताले महँगो सामान किन्नुपर्यो। अन्तर्राष्ट्रिय व्यापार सन्धिमा समस्या आयो।",
                    en: "Local entrepreneurs happy but consumers had to buy expensive goods. Problems arose in international trade treaties."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: -10, stress: 10,
                    business: 25, public_support: -15, international: -10, economy: -5
                }
            },
            {
                text: {
                    ne: "विदेशी लगानीलाई खुला गरेर रोजगारी सिर्जना गर्ने",
                    en: "Open foreign investment and create employment"
                },
                outcome: {
                    ne: "ठूला कारखानाहरू स्थापना भए र नौकरी बढ्यो। तर केही स्थानीय कम्पनीहरू बन्द भए र आर्थिक निर्भरता बढ्यो।",
                    en: "Big factories established and jobs increased. But some local companies closed and economic dependency increased."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 15, stress: 5,
                    business: -10, economy: 20, international: 15, employment: 25
                }
            },
            {
                text: {
                    ne: "नेपाली उद्यमीहरूलाई आधुनिकीकरणको लागि सरकारी सहयोग दिने",
                    en: "Provide government support to Nepali entrepreneurs for modernization"
                },
                outcome: {
                    ne: "स्थानीय उद्योगमा टेक्नोलोजी सुधार भयो। प्रतिस्पर्धा क्षमता बढ्यो तर बजेटमा दबाब पड्यो। दीर्घकालीन रूपमा सफल नीति।",
                    en: "Technology improved in local industries. Competitive capacity increased but budget pressure rose. Successful long-term policy."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 20, stress: 15,
                    business: 30, economy: 15, innovation: 25, public_debt: -10
                }
            },
            {
                text: {
                    ne: "मिश्रित नीति अपनाएर रणनीतिक क्षेत्रमा मात्र संरक्षण गर्ने",
                    en: "Adopt mixed policy protecting only strategic sectors"
                },
                outcome: {
                    ne: "खाद्य सुरक्षा र ऊर्जामा स्वावलम्बनता बढायो। अन्य क्षेत्रमा प्रतिस्पर्धा बढ्यो। सन्तुलित आर्थिक नीति हासिल गर्नुभयो।",
                    en: "Increased self-reliance in food security and energy. Competition increased in other sectors. Achieved balanced economic policy."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 15, stress: 10,
                    business: 10, economy: 20, strategic_autonomy: 30, international: 5
                }
            }
        ]
    },

    {
        id: "kp_oli_deadly_incident_comeback_strategy",
        characterSpecific: "kp_oli",
        title: {
            ne: "५१ जनाको मृत्यु पछि राजनीतिक पुनरागमन कसरी?",
            en: "Political comeback after 51 deaths - how to return?"
        },
        description: {
            ne: "तपाईं केपी ओली हुनुहुन्छ। जेन जेड आन्दोलनको दमनमा ५१ जना प्रदर्शनकारीको मृत्यु भयो। अन्तर्राष्ट्रिय मानव अधिकार संगठनहरूले युद्ध अपराधी भने। राजीनामा दिनु परेको छ। अब कसरी राजनीतिक जीवनमा फर्कने? रक्तपातको दाग कसरी धुने?",
            en: "You are KP Oli. 51 protesters died during Gen Z movement crackdown. International human rights organizations called you war criminal. Had to resign. Now how to return to political life? How to wash away bloodstain?"
        },
        type: "accountability_crisis",
        imageUrl: "https://images.unsplash.com/photo-1586715196006-cd2e4df15d18?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.75,
        realWorldEvent: true,
        characterTraits: ["political_survivor", "authoritarian_tendencies", "experienced_politician"],
        choices: [
            {
                text: {
                    ne: "राष्ट्रिय सुरक्षाको नाममा कारबाहीको औचित्य प्रमाणित गर्ने",
                    en: "Justify the action in name of national security"
                },
                outcome: {
                    ne: "देशको स्थिरताको लागि कडा निर्णय लिनुपरेको बताउनुभयो। सेना र पुराना समर्थकहरूले ठीक भने तर युवा र मानव अधिकारकर्मीहरूले कहिल्यै माफ नगर्ने भने।",
                    en: "Said had to take tough decision for country's stability. Military and old supporters agreed but youth and human rights activists said they'll never forgive."
                },
                isConstitutional: false,
                effects: { 
                    stability: -25, morale: -40, stress: 30,
                    military: 25, old_politicians: 20, 
                    youth: -50, civil_society: -45, international: -35
                }
            },
            {
                text: {
                    ne: "सार्वजनिक माफी माग्दै पीडित परिवारहरूलाई क्षतिपूर्ति दिने",
                    en: "Public apology and compensation to victim families"
                },
                outcome: {
                    ne: "ऐतिहासिक माफी मागेर मानवीयता देखाउनुभयो। केही मानिसहरूले दोस्रो मौका दिने सोचे तर आफ्नै पार्टीका कडालाइनरहरूले कमजोरी देखाएको भने।",
                    en: "Showed humanity by asking historic apology. Some people thought of giving second chance but hardliners in own party said showed weakness."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 15, stress: 25,
                    civil_society: 20, international: 15, victim_families: 30,
                    military: -15, authoritarian_base: -25, political_hardliners: -20
                }
            },
            {
                text: {
                    ne: "न्यायिक छानबिनमा सहयोग गर्दै स्वच्छ छविमा फर्कने प्रयास",
                    en: "Cooperate with judicial investigation to return with clean image"
                },
                outcome: {
                    ne: "न्यायालयको छानबिनमा पूर्ण सहयोग गर्ने घोषणा गर्नुभयो। कानुनी विशेषज्ञहरूले सराहना गरे तर राजनीतिक शत्रुहरूले जालमा फसेको भने।",
                    en: "Announced full cooperation with court investigation. Legal experts appreciated but political enemies said trapped in net."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 10, stress: 35,
                    judiciary: 30, legal_experts: 25, transparency: 20,
                    political_rivals: -10, party_control: -15, investigation_risk: 40
                }
            },
            {
                text: {
                    ne: "मुक्ति सेनाका पूर्व साथीहरूसँग गठबन्धन गरेर 'युद्धकालीन नेता' को रूपमा फर्कने",
                    en: "Alliance with ex-Mukti Sena comrades to return as 'wartime leader'"
                },
                outcome: {
                    ne: "पुराना योद्धाहरूसँग एकजुट भएर 'कठिन समयमा कडा नेतृत्व' को नारा दिनुभयो। राष्ट्रवादी आधार बलियो भयो तर लोकतान्त्रिक छवि थप बिग्रियो।",
                    en: "United with old fighters and raised slogan of 'strong leadership in difficult times'. Nationalist base strengthened but democratic image further damaged."
                },
                isConstitutional: false,
                effects: { 
                    stability: -10, morale: -20, stress: 20,
                    nationalist_base: 35, ex_military: 30, authoritarian_supporters: 25,
                    democratic_institutions: -30, international: -25, youth: -35
                }
            }
        ]
    },

    // ============================================================================
    // GAGAN THAPA SPECIFIC SCENARIOS - YOUTH LEADER ARC
    // ============================================================================

    {
        id: "gagan_thapa_youth_politics_modernization",
        characterSpecific: "gagan_thapa",
        title: {
            ne: "युवा नेताको रूपमा पुराना राजनीतिलाई कसरी परिवर्तन गर्ने?",
            en: "As youth leader, how to transform old politics?"
        },
        description: {
            ne: "तपाईं कांग्रेसको युवा नेता हुनुहुन्छ। पुराना नेताहरूले पार्टीमा नियन्त्रण गरिरहेका छन्। युवाहरू परिवर्तनको माग गरिरहेका छन् तर अनुभवी नेताहरू जोखिम लिन चाहँदैनन्। पार्टी भित्रको संघर्ष।",
            en: "You're Congress youth leader. Old leaders controlling party. Youth demanding change but experienced leaders don't want to take risks. Struggle within party."
        },
        type: "internal_party_politics",
        imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.65,
        characterTraits: ["youth_leader", "progressive_thinker", "reform_minded"],
        choices: [
            {
                text: {
                    ne: "पुराना नेताहरूको सम्मान गर्दै बिस्तारै परिवर्तन ल्याउने",
                    en: "Respect old leaders and bring gradual change"
                },
                outcome: {
                    ne: "अनुभवी नेताहरूको साथ पाउनुभयो तर युवाहरूले ढिलो प्रगति देखेर निराशा व्यक्त गरे। संस्थागत स्थिरता कायम राख्नुभयो।",
                    en: "Got support of experienced leaders but youth expressed frustration over slow progress. Maintained institutional stability."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 5, stress: 10,
                    congress_old: 25, congress_youth: -10, party_unity: 20
                }
            },
            {
                text: {
                    ne: "युवाहरूसँग मिलेर पार्टी भित्र क्रान्तिकारी परिवर्तन सुरु गर्ने",
                    en: "Unite with youth and start revolutionary change within party"
                },
                outcome: {
                    ne: "युवा शक्तिको उभार भयो तर पार्टीमा विभाजन गहिरो भयो। केही अनुभवी नेताहरूले विरोध जनाए। जोखिमपूर्ण तर साहसिक निर्णय।",
                    en: "Youth power emerged but party division deepened. Some experienced leaders opposed. Risky but courageous decision."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 20, stress: 25,
                    congress_youth: 40, congress_old: -25, youth: 30, innovation: 20
                }
            },
            {
                text: {
                    ne: "नयाँ युवा राजनीतिक मञ्च स्थापना गर्ने वातावरण तयार गर्ने",
                    en: "Prepare environment to establish new youth political platform"
                },
                outcome: {
                    ne: "स्वतन्त्र युवा राजनीतिको संकेत दिनुभयो। मुख्य पार्टीहरू चिन्तित भए तर युवाहरूमा उत्साह बढ्यो। ऐतिहासिक निर्णयको सम्भावना।",
                    en: "Signaled independent youth politics. Main parties got worried but enthusiasm increased among youth. Possibility of historic decision."
                },
                isConstitutional: true,
                effects: { 
                    stability: -15, morale: 25, stress: 30,
                    congress: -20, youth: 50, political_innovation: 35, risk_level: 40
                }
            },
            {
                text: {
                    ne: "शिक्षा र स्वास्थ्य जस्ता युवा मुद्दाहरूमा फोकस गर्ने",
                    en: "Focus on youth issues like education and health"
                },
                outcome: {
                    ne: "युवाहरूको समस्या समाधानमा योगदान पुर्याउनुभयो। राजनीतिक कलह छोडेर वास्तविक कामको प्रशंसा भयो। व्यावहारिक दृष्टिकोण।",
                    en: "Contributed to solving youth problems. Praised for leaving political conflict and doing real work. Practical approach."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 30, stress: 5,
                    youth: 35, education: 25, health: 20, congress: 15
                }
            }
        ]
    },

    {
        id: "gagan_thapa_anti_corruption_campaign",
        characterSpecific: "gagan_thapa",
        title: {
            ne: "भ्रष्टाचार विरुद्धको अभियानमा कति टाढा जाने?",
            en: "How far to go in anti-corruption campaign?"
        },
        description: {
            ne: "तपाईंको भ्रष्टाचार विरुद्धको अभियानले ध्यान पाइरहेको छ। तर अहिले केही प्रभावशाली नेताहरूको भ्रष्टाचारको प्रमाण भेटिएको छ - आफ्नै पार्टीका केही र विपक्षीका पनि। सबैलाई समान रूपमा कारबाही गर्ने कि राजनीतिक बुद्धि काम गर्ने?",
            en: "Your anti-corruption campaign getting attention. But now got evidence of corruption by influential leaders - some from own party and some from opposition. Take equal action against all or use political wisdom?"
        },
        type: "ethics_vs_politics",
        imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.68,
        characterTraits: ["anti_corruption_crusader", "principled_politician", "youth_idealism"],
        choices: [
            {
                text: {
                    ne: "पार्टी फार्क नपर्दे गरी सबैको भ्रष्टाचारको विरुद्ध समान कारबाही गर्ने",
                    en: "Take equal action against everyone's corruption regardless of party"
                },
                outcome: {
                    ne: "राष्ट्रिय नायकको रूप प्रतिष्ठा पाउनुभयो तर आफ्नै पार्टीभित्र शत्रु बढ्यो। राजनीतिक करियरमा जोखिम तर नैतिक शक्ति बढ्यो।",
                    en: "Got reputation as national hero but increased enemies within own party. Career risk but moral strength increased."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 40, stress: 30,
                    congress: -20, public_support: 50, civil_society: 40, youth: 35, media: 30
                }
            },
            {
                text: {
                    ne: "पहिले विपक्षी दलका भ्रष्टहरूलाई टार्गेट गर्ने",
                    en: "First target corrupt people from opposition parties"
                },
                outcome: {
                    ne: "राजनीतिक लाभ उठाउनुभयो तर जनताले 'चुनिंदा न्याय' भन्दै आलोचना गरे। नैतिक स्थितिमा कमजोरी आयो।",
                    en: "Gained political advantage but public criticized as 'selective justice'. Weakness came in moral position."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: -15, stress: 10,
                    congress: 15, opposition: -25, public_support: -20, credibility: -25
                }
            },
            {
                text: {
                    ne: "व्यवस्थित तरिकाले सबै पार्टीसँग छलफल गरेर एकै ठाउँमा कारबाही गर्ने",
                    en: "Systematically discuss with all parties and take action simultaneously"
                },
                outcome: {
                    ne: "राष्ट्रिय सहमति निर्माण गर्नुभयो। भ्रष्टाचार सफाईको ऐतिहासिक अभियान सुरु भयो। लामो समयको लगानी तर स्थायी समाधान।",
                    en: "Built national consensus. Historic campaign to clean corruption began. Long-term investment but permanent solution."
                },
                isConstitutional: true,
                effects: { 
                    stability: 25, morale: 35, stress: 20,
                    all_parties: 15, public_support: 40, institutional_strength: 30, anti_corruption: 50
                }
            },
            {
                text: {
                    ne: "केही समयका लागि मुद्दालाई शान्त राख्ने - राजनीतिक अवस्था हेरेर",
                    en: "Keep issue quiet for some time - depending on political situation"
                },
                outcome: {
                    ne: "राजनीतिक संकटबाट बच्नुभयो तर युवाहरू र सिभिल सोसाइटीले विश्वासघात भएको महसुस गरे। अवसर गुमाएको आरोप लाग्यो।",
                    en: "Avoided political crisis but youth and civil society felt betrayed. Accused of missing opportunity."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: -25, stress: 5,
                    congress: 10, youth: -30, civil_society: -35, credibility: -20
                }
            }
        ]
    },

    // ============================================================================
    // RABI LAMICHHANE SPECIFIC SCENARIOS - INVESTIGATIVE JOURNALIST TURNED POLITICIAN ARC
    // ============================================================================

    {
        id: "rabi_lamichhane_journalism_vs_politics_conflict",
        characterSpecific: "rabi_lamichhane",
        title: {
            ne: "पत्रकारिता र राजनीतिको द्वन्द्व - कुन पहिचान छान्ने?",
            en: "Journalism vs politics conflict - which identity to choose?"
        },
        description: {
            ne: "तपाईं प्रसिद्ध खोजी पत्रकार हुनुहुन्छ तर अहिले राजनीतिमा सक्रिय हुनुभएको छ। पुराना पत्रकार साथीहरूले 'विश्वसनीयता गुमायो' भन्छन्। राजनीतिकहरूले 'पत्रकार मानसिकता छोड' भन्छन्। दुई संसारको बीचमा कसरी बाँच्ने?",
            en: "You're famous investigative journalist but now active in politics. Old journalist friends say 'lost credibility'. Politicians say 'leave journalist mentality'. How to survive between two worlds?"
        },
        type: "identity_crisis",
        imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.70,
        characterTraits: ["investigative_mindset", "media_expert", "anti_establishment"],
        choices: [
            {
                text: {
                    ne: "पत्रकारिताको मूल्यहरू राजनीतिमा ल्याएर पारदर्शिता बढाउने",
                    en: "Bring journalism values to politics and increase transparency"
                },
                outcome: {
                    ne: "राजनीतिमा नयाँ शैली ल्याउनुभयो। जनताले सराहना गरे तर राजनीतिक इस्टब्लिसमेन्टले विरोध गर्यो। अनुठो तर कठिन बाटो।",
                    en: "Brought new style to politics. Public appreciated but political establishment opposed. Unique but difficult path."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 30, stress: 25,
                    public_support: 40, media: 35, establishment: -30, transparency: 35
                }
            },
            {
                text: {
                    ne: "पूर्ण रूपमा राजनीतिक व्यक्तित्व अपनाएर पुराना कनेक्सन बिर्सने",
                    en: "Fully adopt political personality and forget old connections"
                },
                outcome: {
                    ne: "राजनीतिक दलहरूले स्वीकार गरे तर जनताले 'ओरिजिनल रबी हराएको' भने। पत्रकारिताको विश्वसनीयता गुमाउनुभयो।",
                    en: "Political parties accepted but public said 'lost original Rabi'. Lost journalism credibility."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: -15, stress: 10,
                    political_acceptance: 30, public_support: -20, media: -25, authenticity: -30
                }
            },
            {
                text: {
                    ne: "राजनीतिमा बसेर पनि कहिलेकाहीं खोजी पत्रकारिता जारी राख्ने",
                    en: "Continue investigative journalism occasionally while staying in politics"
                },
                outcome: {
                    ne: "दुवै क्षेत्रमा सक्रिय रहनुभयो तर दुवैमा शङ्का आयो। 'के पत्रकार के राजनीतिज्ञ' भन्ने द्वन्द्व सिर्जना भयो।",
                    en: "Remained active in both fields but suspicion arose in both. Created confusion 'what journalist what politician'."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 5, stress: 30,
                    media: -10, political_parties: -15, public_confusion: 20, identity_crisis: 25
                }
            },
            {
                text: {
                    ne: "मिडिया र राजनीति बीचको पुल बनेर नयाँ मोडल सिर्जना गर्ने",
                    en: "Create new model by becoming bridge between media and politics"
                },
                outcome: {
                    ne: "अनुठो राजनीतिक मोडल विकास गर्नुभयो। युवाहरूले प्रेरणा पाए तर स्थापित संस्थानहरूले चुनौती महसुस गरे। ऐतिहासिक प्रयोग।",
                    en: "Developed unique political model. Youth got inspiration but established institutions felt challenged. Historic experiment."
                },
                isConstitutional: true,
                effects: { 
                    stability: -15, morale: 25, stress: 35,
                    youth: 40, innovation: 40, establishment: -25, political_evolution: 45
                }
            }
        ]
    },

    {
        id: "rabi_lamichhane_cooperative_fraud_investigation",
        characterSpecific: "rabi_lamichhane",
        title: {
            ne: "सहकारी ठगी खुलासा - राजनीतिक करियरमा जोखिम",
            en: "Cooperative fraud exposure - risk to political career"
        },
        description: {
            ne: "तपाईंले ठूलो सहकारी घोटालाको खोजी गरिरहनुभएको छ। केही राजनीतिक दलका नेताहरू संलग्न छन्। तर तपाईं अहिले आफैं राजनीतिमा छ। यो खुलासाले आफ्नो राजनीतिक भविष्यलाई नकारात्मक असर गर्न सक्छ। सत्य र स्वार्थको द्वन्द्व।",
            en: "You're investigating big cooperative scam. Some political party leaders are involved. But you're now in politics yourself. This exposure could negatively affect your political future. Conflict between truth and self-interest."
        },
        type: "investigative_dilemma",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.35,
        characterTraits: ["truth_seeker", "investigative_courage", "public_accountability"],
        choices: [
            {
                text: {
                    ne: "सबै सत्य खुलासा गरेर जनताको हितमा काम गर्ने",
                    en: "Expose all truth and work in public interest"
                },
                outcome: {
                    ne: "ठूलो भ्रष्टाचार नेटवर्क खुल्यो। जनताले नायक बनाए तर राजनीतिक शत्रु धेरै बने। करियरमा जोखिम तर नैतिक जीत।",
                    en: "Big corruption network exposed. Public made you hero but gained many political enemies. Career risk but moral victory."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: 45, stress: 30,
                    public_support: 60, media: 50, political_parties: -40, anti_corruption: 50
                }
            },
            {
                text: {
                    ne: "चुनिंदा जानकारी मात्र सार्वजनिक गरेर राजनीतिक सम्बन्ध जोगाउने",
                    en: "Publish selective information only and protect political relationships"
                },
                outcome: {
                    ne: "केही भ्रष्टाचारी पक्राउ परे तर मुख्य नेताहरू बचे। राजनीतिक स्थिति सुरक्षित तर पत्रकारीय इमान्दारीमा प्रश्न उठ्यो।",
                    en: "Some corrupt caught but main leaders escaped. Political position safe but journalistic integrity questioned."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: -20, stress: 15,
                    political_safety: 25, public_support: -15, media: -20, credibility: -25
                }
            },
            {
                text: {
                    ne: "खोजलाई केही समयका लागि रोकेर राजनीतिक अवस्था बुझ्ने",
                    en: "Stop investigation temporarily and understand political situation"
                },
                outcome: {
                    ne: "तत्कालको राजनीतिक संकटबाट बच्नुभयो तर ढिलाईले प्रमाणहरू हराए। पछि खुलासा नगरेकोमा आरोप लाग्यो।",
                    en: "Avoided immediate political crisis but delay caused evidence to disappear. Later accused of not exposing."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: -30, stress: 25,
                    short_term_safety: 30, public_trust: -35, investigative_reputation: -40
                }
            },
            {
                text: {
                    ne: "सबै साक्षीहरूलाई सुरक्षा दिएर व्यापक खोजी अघि बढाउने",
                    en: "Provide security to all witnesses and advance comprehensive investigation"
                },
                outcome: {
                    ne: "गहिरो र व्यापक खोजी सम्भव भयो। ठूलो भ्रष्टाचार चक्र भत्कियो तर आफैंलाई धम्की बढ्यो। साहसी तर जोखिमपूर्ण।",
                    en: "Deep and comprehensive investigation became possible. Big corruption circle collapsed but threats to self increased. Courageous but risky."
                },
                isConstitutional: true,
                effects: { 
                    stability: -20, morale: 40, stress: 40,
                    public_support: 55, anti_corruption: 60, personal_safety: -30, investigative_impact: 70
                }
            }
        ]
    },

    // ============================================================================
    // SHARED MULTI-CHARACTER SCENARIOS - CURRENT EVENTS FOCUS
    // ============================================================================

    {
        id: "climate_change_nepal_glacier_melting_crisis",
        title: {
            ne: "हिमाल पग्लिने संकट - कसरी सामना गर्ने?",
            en: "Himalayan glacier melting crisis - how to face it?"
        },
        description: {
            ne: "एभरेस्ट र अन्य हिमालहरूको बरफ तेज गतिमा पग्लिरहेको छ। बाढी र खडेरीको जोखिम बढिरहेको छ। अन्तर्राष्ट्रिय समुदायले नेपाललाई जलवायु परिवर्तनको सामना गर्न दबाब दिइरहेको छ। तर आर्थिक विकास पनि चाहिन्छ।",
            en: "Ice from Everest and other Himalayas melting rapidly. Risk of floods and drought increasing. International community pressuring Nepal to face climate change. But economic development also needed."
        },
        type: "environmental_crisis",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.62,
        characterSpecificChoices: {
            kp_oli: [
                {
                    text: {
                        ne: "चीनसँग मिलेर हरित ऊर्जामा ठूलो लगानी ल्याउने",
                        en: "Partner with China for big investment in green energy"
                    },
                    outcome: {
                        ne: "सौर्य र पवन ऊर्जाको ठूलो परियोजना सुरु भयो। तर भारतले चिन्ता व्यक्त गर्यो र पश्चिमी देशहरूले शङ्का गरे।",
                        en: "Big solar and wind energy projects started. But India expressed concerns and Western countries became suspicious."
                    },
                    effects: { 
                        stability: -5, morale: 20, stress: 15,
                        china: 30, india: -15, environment: 40, economy: 15
                    }
                }
            ],
            sher_bahadur: [
                {
                    text: {
                        ne: "सबै पार्टीको सहमतिमा राष्ट्रिय जलवायु नीति बनाउने",
                        en: "Create national climate policy with all party consensus"
                    },
                    outcome: {
                        ne: "व्यापक छलफलपछि राष्ट्रिय जलवायु नीति तयार भयो। सबैको सहमति भए तर कार्यान्वयनमा ढिलाई भयो।",
                        en: "National climate policy prepared after extensive discussions. Everyone agreed but implementation got delayed."
                    },
                    effects: { 
                        stability: 25, morale: 15, stress: 10,
                        all_parties: 20, environment: 25, policy_framework: 30
                    }
                }
            ],
            prachanda: [
                {
                    text: {
                        ne: "पुँजीवादी देशहरूलाई जिम्मेवार ठहराएर क्षतिपूर्ति माग्ने",
                        en: "Hold capitalist countries responsible and demand compensation"
                    },
                    outcome: {
                        ne: "विकसित देशहरूसँग क्षतिपूर्तिको कडा माग गर्नुभयो। केही सहायता मिल्यो तर आर्थिक सम्बन्धमा तनाव आयो।",
                        en: "Made strong compensation demands from developed countries. Got some aid but tension arose in economic relations."
                    },
                    effects: { 
                        stability: -10, morale: 25, stress: 20,
                        developing_nations: 35, developed_nations: -20, climate_justice: 40
                    }
                }
            ],
            gagan_thapa: [
                {
                    text: {
                        ne: "युवाहरूलाई नेतृत्वमा राखेर जलवायु आन्दोलन सुरु गर्ने",
                        en: "Start climate movement with youth in leadership"
                    },
                    outcome: {
                        ne: "युवाहरूको नेतृत्वमा राष्ट्रव्यापी जलवायु आन्दोलन भयो। अन्तर्राष्ट्रिय ध्यान पाइयो तर राजनीतिक दबाब बढ्यो।",
                        en: "Nationwide climate movement happened under youth leadership. Got international attention but political pressure increased."
                    },
                    effects: { 
                        stability: -15, morale: 35, stress: 25,
                        youth: 50, international: 30, environmental_activism: 45
                    }
                }
            ],
            rabi_lamichhane: [
                {
                    text: {
                        ne: "जलवायु परिवर्तनका वास्तविक तथ्यहरू जनतामा पुर्याउने",
                        en: "Deliver real facts about climate change to people"
                    },
                    outcome: {
                        ne: "वैज्ञानिक तथ्यहरूमा आधारित जनचेतना अभियान चलाउनुभयो। मानिसहरूको बुझाइ बढ्यो तर तत्काल कार्यान्वयनमा समस्या रह्यो।",
                        en: "Ran public awareness campaign based on scientific facts. People's understanding increased but immediate implementation remained problematic."
                    },
                    effects: { 
                        stability: 10, morale: 20, stress: 10,
                        public_awareness: 40, scientific_literacy: 35, media: 25
                    }
                }
            ]
        },
        choices: [
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय जलवायु कोषबाट सहयोग लिएर अनुकूलन कार्यक्रम गर्ने",
                    en: "Get help from international climate fund and do adaptation program"
                },
                outcome: {
                    ne: "विश्व बैंक र युरोपेली देशहरूबाट सहायता पाएर बाढी नियन्त्रण र कृषि अनुकूलन कार्यक्रम सुरु गर्नुभयो। स्थायी समाधानको दिशामा अगाडि बढ्नुभयो।",
                    en: "Got aid from World Bank and European countries to start flood control and agricultural adaptation programs. Moved towards sustainable solution."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 25, stress: 10,
                    international: 30, environment: 35, rural_development: 25
                }
            }
        ]
    },

    {
        id: "remittance_economy_dependency_crisis",
        title: {
            ne: "रेमिटेन्समा निर्भरताको संकट - वैकल्पिक अर्थतन्त्र कसरी बनाउने?",
            en: "Remittance dependency crisis - how to build alternative economy?"
        },
        description: {
            ne: "नेपालको ७०% अर्थतन्त्र विदेशी रेमिटेन्समा निर्भर छ। युवाहरू बाहिर जान्छन्, देश खाली हुँदैछ। कोभिडले रेमिटेन्स घट्यो। देशमै रोजगारी सिर्जना गर्ने ठोस योजना चाहिन्छ।",
            en: "70% of Nepal's economy dependent on foreign remittances. Youth going abroad, country becoming empty. COVID reduced remittances. Need concrete plan to create employment within country."
        },
        type: "economic_structural_crisis",
        imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.70,
        characterSpecificChoices: {
            kp_oli: [
                {
                    text: {
                        ne: "स्वदेशी उद्योग र कृषिमा सरकारी लगानी बढाएर आयात प्रतिस्थापन गर्ने",
                        en: "Increase government investment in domestic industry and agriculture for import substitution"
                    },
                    outcome: {
                        ne: "स्थानीय उत्पादनमा जोड दिएर आयात कम गर्ने नीति अपनाउनुभयो। केही सफलता मिल्यो तर अन्तर्राष्ट्रिय व्यापारमा समस्या आयो।",
                        en: "Adopted policy to reduce imports by emphasizing local production. Got some success but problems arose in international trade."
                    },
                    effects: { 
                        stability: 10, morale: 15, stress: 15,
                        domestic_industry: 35, employment: 20, international: -10, innovation: -5
                    }
                }
            ],
            sher_bahadur: [
                {
                    text: {
                        ne: "निजी क्षेत्रसँग साझेदारी गरेर औद्योगिक क्षेत्र विकास गर्ने",
                        en: "Develop industrial zones in partnership with private sector"
                    },
                    outcome: {
                        ne: "सरकारी-निजी साझेदारीमा औद्योगिक पार्क स्थापना भयो। रोजगारी बढ्यो तर वातावरणीय चिन्ता र मजदुर अधिकारको प्रश्न उठ्यो।",
                        en: "Industrial parks established in public-private partnership. Employment increased but environmental concerns and labor rights questions arose."
                    },
                    effects: { 
                        stability: 15, morale: 20, stress: 10,
                        business: 30, employment: 35, environment: -15, labor_rights: -10
                    }
                }
            ]
        },
        choices: [
            {
                text: {
                    ne: "कुशल जनशक्ति तयारी गरेर मध्यपूर्व र मलेसियामा गुणस्तरीय रोजगारी पठाउने",
                    en: "Prepare skilled workforce and send quality employment to Middle East and Malaysia"
                },
                outcome: {
                    ne: "व्यावसायिक तालिम केन्द्रहरू स्थापना गरेर दक्ष कामदारहरू तयार पारनुभयो। रेमिटेन्स बढ्यो तर मानव पुँजीको ब्रेन ड्रेनको समस्या जारी रह्यो।",
                    en: "Established vocational training centers and prepared skilled workers. Remittances increased but human capital brain drain problem continued."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 15, stress: 5,
                    remittances: 30, skilled_migration: 25, domestic_workforce: -20
                }
            }
        ]
    },

    // ============================================================================
    // RAPID TEMPLATE-BASED SCENARIOS - CORRUPTION VARIANTS
    // ============================================================================

    {
        id: "police_traffic_bribery_crisis",
        title: {
            ne: "ट्राफिक पुलिसको घुस माग - कसरी सामना गर्ने?",
            en: "Traffic police bribery demand - how to handle?"
        },
        description: {
            ne: "तपाईंको गाडी चेकिंगमा पक्राउ पर्यो। ट्राफिक पुलिसले ५० हजार घुस माग्यो। फेला पर्दा ठूलो स्क्यान्डल हुन्छ। तर नदिए अदालतमा झैझगडा। सामान्य कुरा तर राजनीतिज्ञको लागि जोखिमपूर्ण।",
            en: "Your car caught in checking. Traffic police demanding 50 thousand bribe. If discovered, big scandal happens. But if not given, court hassle. Normal thing but risky for politician."
        },
        type: "corruption_dilemma",
        imageUrl: "https://images.unsplash.com/photo-1544465544-4db5b4b1b9f3?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.45,
        choices: [
            {
                text: {
                    ne: "सिधै घुस दिएर समस्या समाधान गर्ने",
                    en: "Give bribe directly and solve problem"
                },
                outcome: {
                    ne: "तत्काल समस्या समाधान भयो तर भोलि मिडियामा खबर आयो। नैतिक प्रतिष्ठामा दाग लाग्यो।",
                    en: "Immediate problem solved but news came in media tomorrow. Stain on moral reputation."
                },
                isConstitutional: false,
                effects: { 
                    stability: 5, morale: -15, stress: -5,
                    media: -25, civil_society: -20, corruption_exposure: 30
                }
            },
            {
                text: {
                    ne: "कानुनी प्रक्रिया अपनाएर अदालत जाने",
                    en: "Follow legal process and go to court"
                },
                outcome: {
                    ne: "न्यायिक प्रक्रिया छान्नुभयो। समय लाग्यो तर इमान्दारीको छवि बन्यो। पुलिस सुधारको मुद्दा उठ्यो।",
                    en: "Chose judicial process. Took time but image of honesty built. Police reform issue arose."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 20, stress: 15,
                    judiciary: 15, civil_society: 25, police_reform: 20
                }
            },
            {
                text: {
                    ne: "मिडियामा पुलिसको भ्रष्टाचार उजागर गर्ने",
                    en: "Expose police corruption in media"
                },
                outcome: {
                    ne: "पुलिसको भ्रष्टाचार सार्वजनिक गर्नुभयो। जनताले सराहना गरे तर पुलिस प्रशासनसँग बिग्रियो।",
                    en: "Made police corruption public. People appreciated but relations with police administration soured."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: 25, stress: 20,
                    media: 30, public_support: 25, police: -30
                }
            }
        ]
    },

    {
        id: "ministry_contract_corruption_offer",
        title: {
            ne: "मन्त्रालयको ठेक्का घुस प्रस्ताव - ५ लाख कमिसन",
            en: "Ministry contract bribery offer - 5 lakh commission"
        },
        description: {
            ne: "सडक निर्माणको ठेक्कामा ठेकेदारले ५ लाख कमिसन दिन चाहन्छ। उसले भन्यो 'सबैले लिन्छन्, सर'। पैसाको खाँचो छ तर नैतिकताको प्रश्न छ। अरू मन्त्रीहरूले के गर्छन् होला?",
            en: "Contractor wants to give 5 lakh commission in road construction contract. He said 'everyone takes it, sir'. Need money but question of ethics. What do other ministers do?"
        },
        type: "corruption_dilemma",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.50,
        choices: [
            {
                text: {
                    ne: "कमिसन लिएर चुपचाप राख्ने",
                    en: "Take commission and keep quiet"
                },
                outcome: {
                    ne: "पैसा हातमा आयो तर मन शान्त भएन। ठेकेदारले अब नियन्त्रणमा राख्न खोज्यो। भ्रष्टाचारको जालमा फसिनुभयो।",
                    en: "Money came to hand but mind not at peace. Contractor now trying to control. Got trapped in corruption web."
                },
                isConstitutional: false,
                effects: { 
                    stability: -10, morale: -20, stress: 25,
                    business: 10, corruption_network: 40, personal_finance: 30
                }
            },
            {
                text: {
                    ne: "ठेक्का रद्द गरेर नयाँ बोलपत्र आह्वान गर्ने",
                    en: "Cancel contract and call new tender"
                },
                outcome: {
                    ne: "पारदर्शी प्रक्रिया अपनाउनुभयो। केही ढिलाई भयो तर जनताको भरोसा जित्नुभयो। निर्माण कामलाई गुणस्तरीय बनाउनुभयो।",
                    en: "Adopted transparent process. Some delay occurred but won people's trust. Made construction work quality."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: 15,
                    public_support: 30, transparency: 35, business: -15
                }
            },
            {
                text: {
                    ne: "CIAA लाई रिपोर्ट गरेर ठेकेदारलाई कारबाही गर्ने",
                    en: "Report to CIAA and take action against contractor"
                },
                outcome: {
                    ne: "भ्रष्टाचार अनुसन्धान आयोगमा रिपोर्ट गर्नुभयो। ठूलो भ्रष्टाचार नेटवर्क फुट्यो तर व्यापारी समुदायसँग शत्रुता बढ्यो।",
                    en: "Reported to corruption investigation commission. Big corruption network exposed but enmity with business community increased."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 30, stress: 25,
                    anti_corruption: 50, judiciary: 20, business: -35, ciaa: 40
                }
            }
        ]
    },

    {
        id: "university_admission_bribery_request",
        title: {
            ne: "विश्वविद्यालय भर्नामा २ लाख सिफारिस",
            en: "2 lakh recommendation for university admission"
        },
        description: {
            ne: "तपाईंको नातेदारको छोराले मेडिकल कलेजमा भर्ना हुन सकेन। परिवारका मानिसहरूले २ लाख तिरेर सिफारिस गर्न दबाब दिइरहेका छन्। 'एक पटक मात्र, बुबा'। पारिवारिक दबाब र नैतिकताको द्वन्द्व।",
            en: "Your relative's son couldn't get admission in medical college. Family members pressuring to pay 2 lakh and recommend. 'Just once, father'. Conflict between family pressure and ethics."
        },
        type: "family_corruption_pressure",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.40,
        choices: [
            {
                text: {
                    ne: "पारिवारिक दबाबमा सिफारिस गर्ने",
                    en: "Give recommendation under family pressure"
                },
                outcome: {
                    ne: "परिवारले खुसी पाए तर गुण्डा विद्यार्थी भर्ना भएको खबर आयो। शिक्षा प्रणालीमा भ्रष्टाचार बढाउनुभयो।",
                    en: "Family became happy but news came that unqualified student got admitted. Increased corruption in education system."
                },
                isConstitutional: false,
                effects: { 
                    stability: -5, morale: -15, stress: -10,
                    family_relations: 25, education_integrity: -30, social_pressure: 15
                }
            },
            {
                text: {
                    ne: "सिफारिस अस्वीकार गरेर मेरिट प्रणाली जोगाउने",
                    en: "Refuse recommendation and protect merit system"
                },
                outcome: {
                    ne: "पारिवारिक रिसाइरहे तर शिक्षा क्षेत्रमा सुधारको संकेत दिनुभयो। योग्य विद्यार्थीहरूले प्रशंसा गरे।",
                    en: "Family got angry but signaled education sector reform. Qualified students praised."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 20, stress: 20,
                    education_integrity: 35, youth: 25, family_relations: -20
                }
            },
            {
                text: {
                    ne: "छोरालाई छात्रवृत्ति पाउन मद्दत गर्ने वैकल्पिक बाटो खोज्ने",
                    en: "Find alternative way to help son get scholarship"
                },
                outcome: {
                    ne: "वैकल्पिक छात्रवृत्ति योजना खोजेर मद्दत गर्नुभयो। पारिवारिक सम्बन्ध जोगियो र नैतिकता पनि कायम राखुभयो।",
                    en: "Helped by finding alternative scholarship scheme. Maintained family relations and also preserved ethics."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 15, stress: 10,
                    family_relations: 15, education_support: 25, creative_solutions: 20
                }
            }
        ]
    },

    // ============================================================================
    // MORE RAPID TEMPLATE SCENARIOS - SOCIAL/ECONOMIC VARIANTS
    // ============================================================================

    {
        id: "petrol_price_hike_public_anger",
        title: {
            ne: "पेट्रोलको मूल्य वृद्धि - जनताको रोष",
            en: "Petrol price hike - public anger"
        },
        description: {
            ne: "पेट्रोलको मूल्य लगातार बढिरहेको छ। जनताले सरकारविरुद्ध प्रदर्शन गरिरहेका छन्। यातायात ठप्प छ। तर आर्थिक मन्त्रीले भन्छन् 'बाध्यता छ'। जनमत र आर्थिक वास्तविकताको द्वन्द्व।",
            en: "Petrol prices continuously increasing. People protesting against government. Transportation stopped. But finance minister says 'compulsion'. Conflict between public opinion and economic reality."
        },
        type: "economic_crisis",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.65,
        choices: [
            {
                text: {
                    ne: "तुरुन्त सब्सिडी दिएर मूल्य घटाउने",
                    en: "Immediately give subsidy and reduce price"
                },
                outcome: {
                    ne: "जनताले खुसी पाए तर सरकारी खजाना खाली भयो। अन्य विकास कामहरू रोकिए। आर्थिक नीतिमा असन्तुलन आयो।",
                    en: "People became happy but government treasury emptied. Other development works stopped. Imbalance came in economic policy."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 30, stress: -10,
                    public_support: 40, economy: -25, development_budget: -30
                }
            },
            {
                text: {
                    ne: "विकल्पहरू खोजेर सार्वजनिक यातायात सुधार गर्ने",
                    en: "Find alternatives and improve public transportation"
                },
                outcome: {
                    ne: "सार्वजनिक यातायातमा लगानी बढाउनुभयो। लामो समयमा राम्रो समाधान तर तत्काल जनताको समस्या बाँकी रह्यो।",
                    en: "Increased investment in public transport. Good long-term solution but immediate public problem remained."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 10, stress: 15,
                    public_transport: 35, environment: 20, short_term_relief: -15
                }
            },
            {
                text: {
                    ne: "आर्थिक वास्तविकता जनतालाई बुझाउने",
                    en: "Explain economic reality to people"
                },
                outcome: {
                    ne: "मिडियामार्फत अन्तर्राष्ट्रिय बजारको अवस्था बुझाउनुभयो। केहीले बुझे तर धेरैले सरकारी बहाना भन्दै आलोचना गरे।",
                    en: "Explained international market situation through media. Some understood but many criticized calling it government excuse."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: -10, stress: 10,
                    economic_literacy: 25, media: 15, public_support: -20
                }
            }
        ]
    },

    {
        id: "internet_outage_student_exam_crisis",
        title: {
            ne: "इन्टरनेट अवरोध - विद्यार्थी परीक्षा संकट",
            en: "Internet outage - student exam crisis"
        },
        description: {
            ne: "राष्ट्रिय परीक्षाको दिन इन्टरनेट सेवा बन्द भयो। हजारौं विद्यार्थीले अनलाइन परीक्षा दिन सकेनन्। अभिभावकहरू क्रोधित छन्। टेलिकम कम्पनीले प्राविधिक समस्या भन्यो। शिक्षा मन्त्रालयमा दबाब।",
            en: "Internet service stopped on national exam day. Thousands of students couldn't take online exam. Parents are angry. Telecom company said technical problem. Pressure on education ministry."
        },
        type: "education_technology_crisis",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.60,
        choices: [
            {
                text: {
                    ne: "परीक्षा रद्द गरेर नयाँ मिति तोक्ने",
                    en: "Cancel exam and set new date"
                },
                outcome: {
                    ne: "विद्यार्थी र अभिभावकले राहत पाए तर शैक्षिक क्यालेन्डर बिग्रियो। भर्ना प्रक्रियामा ढिलाई भयो।",
                    en: "Students and parents got relief but academic calendar was disrupted. Admission process got delayed."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 20, stress: 5,
                    student_relief: 35, education_schedule: -20, admin_workload: 25
                }
            },
            {
                text: {
                    ne: "वैकल्पिक व्यवस्था मिलाएर कागजी परीक्षा गर्ने",
                    en: "Arrange alternative and conduct paper exam"
                },
                outcome: {
                    ne: "तुरुन्त कागजी परीक्षाको व्यवस्था गर्नुभयो। समय सीमामा परीक्षा सम्पन्न भयो तर व्यवस्थापन चुनौती भयो।",
                    en: "Immediately arranged paper exam. Exam completed within time limit but management became challenging."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 15, stress: 25,
                    crisis_management: 30, logistical_challenge: 35, time_pressure: 40
                }
            },
            {
                text: {
                    ne: "टेलिकम कम्पनीलाई जरिवाना गरेर भविष्यको गारेन्टी माग्ने",
                    en: "Fine telecom company and demand future guarantee"
                },
                outcome: {
                    ne: "कम्पनीलाई कडा कारबाही गर्नुभयो। जनताले सराहना गरे तर टेलिकम सेवामा झनै समस्या आउने डर बढ्यो।",
                    en: "Took strict action against company. People appreciated but fear increased of more problems in telecom service."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 25, stress: 15,
                    public_support: 30, telecom_relations: -25, regulatory_strength: 35
                }
            }
        ]
    },

    {
        id: "monsoon_flood_emergency_response",
        title: {
            ne: "मनसुनी बाढी - आपतकालीन प्रतिक्रिया",
            en: "Monsoon flood - emergency response"
        },
        description: {
            ne: "भारी वर्षाले तराईमा ठूलो बाढी आयो। २० हजार मानिस विस्थापित, १५ जनाको मृत्यु। राहत सामाग्री चाहिन्छ तर बजेट छैन। अन्तर्राष्ट्रिय सहायताको प्रतीक्षा गर्ने कि स्थानीय स्रोतमा भर पर्ने?",
            en: "Heavy rain caused major flood in Terai. 20 thousand people displaced, 15 dead. Relief materials needed but no budget. Wait for international aid or depend on local resources?"
        },
        type: "natural_disaster",
        imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.70,
        choices: [
            {
                text: {
                    ne: "तुरुन्त सेना र अन्य मन्त्रालयको बजेट भएर राहत कार्य गर्ने",
                    en: "Immediately divert army and other ministry budgets for relief work"
                },
                outcome: {
                    ne: "तत्काल राहत कार्य सुरु भयो। जीवन बचाउने काममा सफलता पाइयो तर अन्य विभागको काम बाधित भयो।",
                    en: "Immediate relief work started. Success achieved in saving lives but other departments' work got hindered."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 30, stress: 20,
                    disaster_response: 45, life_saved: 40, other_ministries: -20
                }
            },
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय समुदायसँग तुरुन्त सहायता माग्ने",
                    en: "Immediately ask international community for help"
                },
                outcome: {
                    ne: "भारत, चीन र संयुक्त राष्ट्रले सहायता पठाए। पर्याप्त राहत मिल्यो तर विदेशी निर्भरताको छवि बन्यो।",
                    en: "India, China and UN sent help. Got adequate relief but image of foreign dependency formed."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 25, stress: 10,
                    international: 30, relief_adequacy: 35, sovereignty: -15
                }
            },
            {
                text: {
                    ne: "स्थानीय समुदायको सहकार्यमा राहत कार्य संयोजन गर्ने",
                    en: "Coordinate relief work with local community cooperation"
                },
                outcome: {
                    ne: "समुदायिक सहयोगमा राहत कार्य भयो। स्थानीय क्षमता निर्माण भयो तर केही ठाउँमा राहत अपर्याप्त रह्यो।",
                    en: "Relief work happened with community support. Local capacity building occurred but relief remained inadequate in some places."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 20, stress: 25,
                    community_strength: 40, local_capacity: 35, relief_gaps: 20
                }
            }
        ]
    },

    {
        id: "youth_unemployment_protest_movement",
        title: {
            ne: "युवा बेरोजगारी प्रदर्शन आन्दोलन",
            en: "Youth unemployment protest movement"
        },
        description: {
            ne: "स्नातक पासका युवाहरूले सरकारी जागिर नपाएको भन्दै धर्ना दिइरहेका छन्। प्रत्येक वर्ष लाखौं युवा बेरोजगार छन्। निजी क्षेत्रमा जागिर छैन, सरकारी पदमा भ्रष्टाचार। 'रोजगारी दे वा सत्ता छोड' भन्दै नारा लाग्दै।",
            en: "Graduate youth protesting saying no government jobs. Every year millions of youth unemployed. No jobs in private sector, corruption in government posts. Slogan 'Give employment or leave power'."
        },
        type: "youth_employment_crisis",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.65,
        choices: [
            {
                text: {
                    ne: "तुरुन्त सरकारी पदहरू सिर्जना गरेर युवालाई भर्ना गर्ने",
                    en: "Immediately create government posts and recruit youth"
                },
                outcome: {
                    ne: "हजारौं सरकारी जागिर सिर्जना गरिनुभयो। युवाहरू खुसी भए तर सरकारी खर्च बढ्यो र उत्पादकता घट्यो।",
                    en: "Thousands of government jobs created. Youth became happy but government expenditure increased and productivity decreased."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 35, stress: -10,
                    youth: 50, government_expenditure: -30, productivity: -20
                }
            },
            {
                text: {
                    ne: "उद्यमशीलता कार्यक्रम र स्किल डेभलपमेन्टमा लगानी गर्ने",
                    en: "Invest in entrepreneurship program and skill development"
                },
                outcome: {
                    ne: "व्यावसायिक तालिम र उद्यमी कार्यक्रम सुरु गर्नुभयो। दीर्घकालीन समाधान तर तत्काल युवाहरूको असन्तुष्टि कायम रह्यो।",
                    en: "Started vocational training and entrepreneur programs. Long-term solution but immediate youth dissatisfaction remained."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 10, stress: 20,
                    skill_development: 40, entrepreneurship: 35, long_term_benefit: 45
                }
            },
            {
                text: {
                    ne: "विदेशी रोजगारीको व्यवस्थित कार्यक्रम सञ्चालन गर्ने",
                    en: "Conduct systematic foreign employment program"
                },
                outcome: {
                    ne: "खाडी र मलेसियामा काम पठाउने व्यवस्था मिलाउनुभयो। रेमिटेन्स बढ्यो तर ब्रेन ड्रेनको समस्या बढ्यो।",
                    en: "Arranged system to send work to Gulf and Malaysia. Remittances increased but brain drain problem grew."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 20, stress: 5,
                    remittances: 35, foreign_employment: 40, brain_drain: -25
                }
            }
        ]
    },

    {
        id: "doctor_strike_health_system_collapse",
        title: {
            ne: "डाक्टर हड्ताल - स्वास्थ्य प्रणाली ठप्प",
            en: "Doctor strike - health system collapse"
        },
        description: {
            ne: "सरकारी अस्पतालका डाक्टरहरूले तलब वृद्धि र सुविधा सुधारको माग गर्दै हड्ताल गरेका छन्। बिरामीहरू पीडामा छन्। निजी अस्पतालले मनपरी शुल्क लिइरहेको छ। जनस्वास्थ्य संकटमा छ।",
            en: "Government hospital doctors on strike demanding salary increase and facility improvement. Patients are suffering. Private hospitals charging arbitrary fees. Public health in crisis."
        },
        type: "health_worker_crisis",
        imageUrl: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.60,
        choices: [
            {
                text: {
                    ne: "डाक्टरहरूको मागलाई तुरुन्त मान्ने",
                    en: "Immediately accept doctors' demands"
                },
                outcome: {
                    ne: "डाक्टरहरू काममा फर्किए र स्वास्थ्य सेवा सामान्य भयो। तर अन्य सरकारी कर्मचारीहरूले पनि उस्तै माग गर्न थाले।",
                    en: "Doctors returned to work and health service normalized. But other government employees also started making similar demands."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 25, stress: -5,
                    health_service: 40, doctor_satisfaction: 35, other_unions: -20
                }
            },
            {
                text: {
                    ne: "बुझाएरा डाक्टरलाई काममा फर्काउने प्रयास गर्ने",
                    en: "Try to convince doctors to return to work through negotiation"
                },
                outcome: {
                    ne: "केही डाक्टर बुझेर फर्किए तर धेरैले हड्ताल जारी राखे। आंशिक सेवा मात्र सञ्चालन भयो।",
                    en: "Some doctors understood and returned but many continued strike. Only partial service operated."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 10, stress: 15,
                    partial_service: 20, negotiation_skills: 25, unresolved_tension: 30
                }
            },
            {
                text: {
                    ne: "आपतकालीन सेवा भएर निजी अस्पतालसँग समझदारी गर्ने",
                    en: "Emergency service through agreement with private hospitals"
                },
                outcome: {
                    ne: "निजी अस्पतालसँग आपतकालीन समझदारी गर्नुभयो। तत्काल सेवा मिल्यो तर सरकारी खर्च धेरै बढ्यो।",
                    en: "Made emergency agreement with private hospitals. Got immediate service but government expenditure increased significantly."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 15, stress: 10,
                    emergency_service: 35, cost_increase: -25, private_partnership: 20
                }
            }
        ]
    },

    // ============================================================================
    // DECISION CHAIN SCENARIOS - FOLLOW-UP EVENTS
    // ============================================================================

    {
        id: "corruption_bribery_exposure_media_investigation",
        title: {
            ne: "भ्रष्टाचार पर्दाफास - मिडिया अनुसन्धान",
            en: "Corruption exposure - media investigation"
        },
        description: {
            ne: "तपाईंले पहिले घुस लिएको कुरा मिडियामा आयो। खोजी पत्रकारहरूले प्रमाण जुटाइरहेका छन्। CIAA ले अनुसन्धान सुरु गर्यो। अब कसरी सफाइ दिने? राजनीतिक करियरमा ठूलो खतरा।",
            en: "News came in media about bribe you took earlier. Investigative journalists gathering evidence. CIAA started investigation. How to defend now? Big threat to political career."
        },
        type: "corruption_crisis_followup",
        imageUrl: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.45,
        triggerConditions: {
            previousDecisions: ["ministry_contract_corruption_offer"],
            corruptionChoices: true
        },
        choices: [
            {
                text: {
                    ne: "पूर्ण रूपमा इन्कार गरेर झुटो आरोप भन्ने",
                    en: "Completely deny and call it false accusation"
                },
                outcome: {
                    ne: "दृढताका साथ अस्वीकार गर्नुभयो। केही समर्थकहरूले विश्वास गरे तर प्रमाणहरू बढ्दै गएपछि अझ समस्या बढ्यो।",
                    en: "Firmly denied. Some supporters believed but as evidence increased, problems grew further."
                },
                isConstitutional: false,
                effects: { 
                    stability: -10, morale: -15, stress: 25,
                    credibility: -30, legal_trouble: 35, supporter_loyalty: 15
                }
            },
            {
                text: {
                    ne: "गल्ती स्वीकार गरेर माफी माग्ने र फिर्ता गर्ने",
                    en: "Admit mistake, apologize and return money"
                },
                outcome: {
                    ne: "इमान्दारीपूर्वक गल्ती मानेर पैसा फिर्ता गर्नुभयो। केही मानिसहरूले मन परिवर्तनको कदरी गरे तर राजनीतिक क्षति भयो।",
                    en: "Honestly admitted mistake and returned money. Some people appreciated change of heart but political damage occurred."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 10, stress: 15,
                    honesty_bonus: 25, political_capital: -20, redemption: 30
                }
            },
            {
                text: {
                    ne: "प्रतिआक्रमण गरेर मिडिया र CIAA लाई प्रश्न गर्ने",
                    en: "Counter-attack and question media and CIAA"
                },
                outcome: {
                    ne: "आक्रामक रुख अपनाएर संस्थाहरूलाई प्रश्न गर्नुभयो। आफ्ना समर्थकहरूले उत्साह देखाए तर संस्थागत द्वन्द्व बढ्यो।",
                    en: "Adopted aggressive stance and questioned institutions. Your supporters showed enthusiasm but institutional conflict increased."
                },
                isConstitutional: false,
                effects: { 
                    stability: -15, morale: 5, stress: 30,
                    media: -35, ciaa: -30, hardcore_supporters: 40, authoritarianism: 25
                }
            }
        ]
    },

    {
        id: "doctor_strike_resolution_followup_crisis",
        title: {
            ne: "डाक्टर हड्ताल समाधानपछिको नयाँ समस्या",
            en: "New problem after doctor strike resolution"
        },
        description: {
            ne: "डाक्टरहरूको माग पूरा गरेपछि अब शिक्षक, इन्जिनियर र नर्सहरूले पनि उस्तै सुविधाको माग गरिरहेका छन्। 'डाक्टरलाई किन, हामीलाई किन नहीं?' भन्दै सरकारी कर्मचारीहरूको संघले राष्ट्रव्यापी हड्ताल गर्ने चेतावनी दिएको छ।",
            en: "After fulfilling doctors' demands, now teachers, engineers and nurses also demanding same facilities. 'Why doctors, why not us?' Government employees' union threatened nationwide strike."
        },
        type: "cascading_demand_crisis",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.50,
        triggerConditions: {
            previousDecisions: ["doctor_strike_health_system_collapse"],
            acceptedDemands: true
        },
        choices: [
            {
                text: {
                    ne: "सबै सरकारी कर्मचारीलाई समान सुविधा दिने",
                    en: "Give equal facilities to all government employees"
                },
                outcome: {
                    ne: "न्यायोचित नीति अपनाएर सबैलाई समान सुविधा दिनुभयो। सरकारी कर्मचारी खुसी भए तर राज्यको खर्च अत्यधिक बढ्यो।",
                    en: "Adopted fair policy and gave equal facilities to all. Government employees became happy but state expenditure increased excessively."
                },
                isConstitutional: true,
                effects: { 
                    stability: 20, morale: 35, stress: 10,
                    all_government_employees: 50, fiscal_deficit: -40, equality: 40
                }
            },
            {
                text: {
                    ne: "डाक्टरहरू विशेष भएको कारण बुझाउने",
                    en: "Explain why doctors are special case"
                },
                outcome: {
                    ne: "जनस्वास्थ्यको महत्व र डाक्टरहरूको विशेषता बुझाउनुभयो। केहीले बुझे तर धेरैले भेदभाव भएको आरोप लगाए।",
                    en: "Explained importance of public health and doctors' specialty. Some understood but many accused of discrimination."
                },
                isConstitutional: true,
                effects: { 
                    stability: -5, morale: -10, stress: 20,
                    health_priority: 25, employee_resentment: 30, inequality_perception: 35
                }
            },
            {
                text: {
                    ne: "चरणबद्ध रूपमा सुधार गर्ने योजना बनाउने",
                    en: "Make plan for gradual improvement"
                },
                outcome: {
                    ne: "५ वर्षे चरणबद्ध सुधार योजना घोषणा गर्नुभयो। कर्मचारीहरूले आंशिक सन्तुष्टि पाए तर तत्काल दबाब कम भएन।",
                    en: "Announced 5-year gradual improvement plan. Employees got partial satisfaction but immediate pressure didn't reduce."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 15, stress: 15,
                    long_term_planning: 35, immediate_satisfaction: -15, systematic_approach: 30
                }
            }
        ]
    },

    {
        id: "flood_relief_corruption_scandal_emergence",
        title: {
            ne: "बाढी राहतमा भ्रष्टाचारको आरोप",
            en: "Accusation of corruption in flood relief"
        },
        description: {
            ne: "बाढी राहत वितरणमा अनियमितताको खबर आयो। केही राहत सामाग्री गुणस्तरहीन निस्कियो, केही मात्रामा कम भयो। स्थानीय ठेकेदारहरू र सरकारी कर्मचारी बीचको मिलेमतोको शङ्का। पीडितहरू आक्रोशित छन्।",
            en: "News of irregularities in flood relief distribution. Some relief materials turned out poor quality, some quantity reduced. Suspicion of collusion between local contractors and government employees. Victims are outraged."
        },
        type: "relief_corruption_scandal",
        imageUrl: "https://images.unsplash.com/photo-1594736797933-d0813ba7b6b8?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.55,
        triggerConditions: {
            previousDecisions: ["monsoon_flood_emergency_response"],
            reliefDistribution: true
        },
        choices: [
            {
                text: {
                    ne: "तुरुन्त जाँच आयोग गठन गरेर दोषीलाई कारबाही गर्ने",
                    en: "Immediately form investigation commission and take action against guilty"
                },
                outcome: {
                    ne: "निष्पक्ष जाँच आयोग गठन गर्नुभयो। केही कर्मचारी र ठेकेदार पक्राउ परे। जनताले पारदर्शिताको कदरी गरे।",
                    en: "Formed impartial investigation commission. Some employees and contractors were arrested. People appreciated transparency."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: 30, stress: 20,
                    anti_corruption: 40, public_trust: 35, relief_accountability: 45
                }
            },
            {
                text: {
                    ne: "आन्तरिक जाँच गरेर मिडियालाई आश्वस्त पार्ने",
                    en: "Conduct internal investigation and assure media"
                },
                outcome: {
                    ne: "आन्तरिक रूपमा जाँच गरेर केही सुधार गर्नुभयो। तर जनताले ढाकछोप भएको शङ्का गरे। विश्वसनीयतामा प्रश्न उठ्यो।",
                    en: "Conducted internal investigation and made some improvements. But people suspected cover-up. Credibility was questioned."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: -10, stress: 15,
                    internal_control: 20, public_suspicion: 30, transparency: -25
                }
            },
            {
                text: {
                    ne: "नयाँ राहत वितरण गरेर समस्या ढाक्ने प्रयास गर्ने",
                    en: "Try to cover problem by distributing new relief"
                },
                outcome: {
                    ne: "थप राहत सामाग्री वितरण गर्नुभयो। तत्कालको समस्या कम भयो तर भ्रष्टाचारको मूल कारण समाधान भएन।",
                    en: "Distributed additional relief materials. Immediate problem reduced but root cause of corruption not solved."
                },
                isConstitutional: true,
                effects: { 
                    stability: 10, morale: 10, stress: 5,
                    temporary_satisfaction: 25, underlying_corruption: 20, systemic_problem: 30
                }
            }
        ]
    },

    {
        id: "petrol_subsidy_economic_crisis_deepening",
        title: {
            ne: "पेट्रोल सब्सिडीको आर्थिक संकट गहिरो हुँदै",
            en: "Economic crisis deepening due to petrol subsidy"
        },
        description: {
            ne: "पेट्रोलमा सब्सिडी दिएपछि सरकारी खजाना रित्तिएको छ। अन्तर्राष्ट्रिय मुद्रा कोषले चेतावनी दिएको छ। विकास बजेट कटौती गर्नुपर्ने अवस्था आयो। तर पेट्रोलको मूल्य बढाए जनता आक्रोशित हुनेछन्।",
            en: "Government treasury emptied after giving petrol subsidy. IMF has given warning. Situation arose to cut development budget. But if petrol price increased, people will be outraged."
        },
        type: "fiscal_crisis_followup",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.60,
        triggerConditions: {
            previousDecisions: ["petrol_price_hike_public_anger"],
            subsidyGiven: true
        },
        choices: [
            {
                text: {
                    ne: "IMF सँग ऋण लिएर संकट व्यवस्थापन गर्ने",
                    en: "Manage crisis by taking loan from IMF"
                },
                outcome: {
                    ne: "अन्तर्राष्ट्रिय मुद्रा कोषबाट ऋण लिएर तत्काल संकट टर्नुभयो। तर कडा सर्तहरू मान्नुपर्यो र आर्थिक स्वाधीनता घट्यो।",
                    en: "Took loan from IMF and averted immediate crisis. But had to accept strict conditions and economic independence decreased."
                },
                isConstitutional: true,
                effects: { 
                    stability: 15, morale: -10, stress: 20,
                    immediate_relief: 30, economic_sovereignty: -35, international_debt: 40
                }
            },
            {
                text: {
                    ne: "विकास बजेट कटौती गरेर सब्सिडी जारी राख्ने",
                    en: "Continue subsidy by cutting development budget"
                },
                outcome: {
                    ne: "पूर्वाधार निर्माण र विकास कामहरू बन्द गर्नुभयो। जनताले तत्काल खुसी पाए तर दीर्घकालीन विकासमा असर पर्यो।",
                    en: "Stopped infrastructure construction and development works. People got immediate happiness but long-term development was affected."
                },
                isConstitutional: true,
                effects: { 
                    stability: 5, morale: 15, stress: 10,
                    development_halt: -40, public_satisfaction: 25, future_growth: -30
                }
            },
            {
                text: {
                    ne: "चरणबद्ध रूपमा सब्सिडी घटाएर वास्तविकताको सामना गर्ने",
                    en: "Face reality by gradually reducing subsidy"
                },
                outcome: {
                    ne: "बिस्तारै सब्सिडी कम गर्दै वास्तविक मूल्यतर्फ लैजानुभयो। कठिन निर्णय तर आर्थिक स्थिरताको दिशामा कदम चाल्नुभयो।",
                    en: "Gradually reduced subsidy and moved towards real price. Difficult decision but took step towards economic stability."
                },
                isConstitutional: true,
                effects: { 
                    stability: -10, morale: -20, stress: 25,
                    economic_realism: 40, fiscal_discipline: 35, public_anger: 30
                }
            }
        ]
    }
];

// ============================================================================
// TRANSLATION FUNCTION
// ============================================================================

function t(key) {
    const currentLang = gameState.currentLanguage || 'ne';
    
    if (!TRANSLATIONS[currentLang]) {
        console.error('❌ Language not found:', currentLang);
        return key;
    }
    
    return TRANSLATIONS[currentLang][key] || TRANSLATIONS['en'][key] || key;
}

function updateAllTranslations() {
    console.log('🔄 Updating all translations...');
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    
    // Also update dynamically generated content that uses translations
    if (window.uiManager) {
        console.log('🔄 Updating event probabilities for language change');
        window.uiManager.updateEventProbabilities();
        window.uiManager.updateFactions();
    }
}

// ============================================================================
// PERFORMANCE-OPTIMIZED UI MANAGEMENT
// ============================================================================

class OptimizedUIManager {
    constructor() {
        this.pendingUpdates = new Set();
        this.lastUpdate = 0;
        this.updateTimer = null;
        this.chart = null;
        this.isUpdating = false;
    }
    
    // Debounced UI updates to prevent lag
    scheduleUpdate(component) {
        this.pendingUpdates.add(component);
        
        if (!this.updateTimer) {
            this.updateTimer = setTimeout(() => {
                this.performBatchUpdate();
            }, PERFORMANCE_CONFIG.UI_UPDATE_THROTTLE);
        }
    }
    
    performBatchUpdate() {
        console.log('🔄 performBatchUpdate() called with:', Array.from(this.pendingUpdates));
        if (this.isUpdating) return;
        this.isUpdating = true;
        
        requestAnimationFrame(() => {
            try {
                console.log('🔄 Processing pending updates:', Array.from(this.pendingUpdates));
                this.pendingUpdates.forEach(component => {
                    console.log('🔄 Processing component:', component);
                    switch(component) {
                        case 'metrics':
                            console.log('🔄 About to call updateMetrics...');
                            this.updateMetrics();
                            break;
                        case 'factions':
                            this.updateFactions();
                            break;
                        case 'counters':
                            this.updateCounters();
                            break;
                        case 'timer':
                            this.updateTimer();
                            break;
                        case 'analytics':
                            this.updateAnalytics();
                            this.updateDecisionHistory();
                            this.updatePerformanceStats();
                            break;
                        case 'profile':
                            console.log('🔄 Processing PROFILE update - calling updateCharacterProfile and updateEventProbabilities');
                            this.updateCharacterProfile();
                            this.updateEventProbabilities();
                            console.log('🔄 PROFILE update completed');
                            break;
                    }
                });
                
                this.pendingUpdates.clear();
                this.updateTimer = null;
                this.lastUpdate = Date.now();
            } finally {
                this.isUpdating = false;
            }
        });
    }
    
    updateMetrics() {
        console.log('📊 updateMetrics() called - Current values:');
        console.log('  Stability:', gameState.stability, 'Economy:', gameState.economy, 
                   'Morale:', gameState.morale, 'Stress:', gameState.stress);
        
        const metrics = ['stability', 'economy', 'morale', 'stress', 'coalition_relations'];
        metrics.forEach(metric => {
            const value = Math.round(gameState[metric]);
            const valueEl = document.getElementById(`${metric}Value`);
            const barEl = document.getElementById(`${metric}Bar`);
            
            console.log(`  📊 Metric ${metric}: value=${value}, element found=${!!valueEl}, bar found=${!!barEl}`);
            
            if (valueEl && barEl) {
                const currentDisplay = valueEl.textContent;
                if (currentDisplay !== value.toString()) {
                    console.log(`  🔄 Updating ${metric}: ${currentDisplay} → ${value}`);
                    valueEl.textContent = value;
                    barEl.style.width = `${value}%`;
                } else {
                    console.log(`  ➖ ${metric} unchanged: ${value}`);
                }
            } else {
                console.log(`  ❌ ${metric} elements missing - valueEl: ${!!valueEl}, barEl: ${!!barEl}`);
            }
        });
    }
    
    updateFactions() {
        const container = document.getElementById('factionRelations');
        if (!container) return;
        
        // Only show main factions with icons (not internal game state factions)
        const mainFactions = ['military', 'judiciary', 'media', 'youth', 'international', 'congress', 'business', 'civil_society'];
        
        const html = mainFactions
            .map(faction => {
                const value = gameState.factions[faction];
                const level = value > 60 ? 'high' : value > 20 ? 'medium' : 'low';
                const icon = this.getFactionIcon(faction);
                const displayValue = Math.abs(Math.round(value));
                return `
                    <div class="faction-circle ${level}" title="${t(faction)}: ${displayValue}">
                        <span>${icon}</span>
                        <div class="faction-score ${level}">${displayValue}</div>
                    </div>
                `;
            }).join('');
        
        if (container.innerHTML !== html) {
            container.innerHTML = html;
        }
    }
    
    updateCounters() {
        const elements = [
            { id: 'dayCounter', value: gameState.daysPassed },
            { id: 'politicalCapital', value: Math.round(gameState.politicalCapital) },
            { id: 'decisionsMade', value: gameState.decisionsMade }
        ];
        
        elements.forEach(({ id, value }) => {
            const el = document.getElementById(id);
            if (el && el.textContent !== value.toString()) {
                el.textContent = value;
            }
        });
    }
    
    updateCharacterProfile() {
        const container = document.getElementById('characterProfile');
        if (!container || !gameState.character) return;
        
        const character = CHARACTERS[gameState.character];
        if (!character) return;
        
        console.log('📊 updateCharacterProfile() called for:', gameState.character);
        
        const traits = Object.entries(character.traits).map(([trait, value]) => {
            const percentage = Math.round(value * 100);
            const color = percentage > 0 ? 'text-green-400' : 'text-red-400';
            return `
                <div class="flex justify-between">
                    <span class="text-sm text-gray-300">${trait.replace(/_/g, ' ')}</span>
                    <span class="text-sm ${color}">${percentage > 0 ? '+' : ''}${percentage}%</span>
                </div>
            `;
        }).join('');
        
        // Add political activation for GenZ character
        let extraInfo = '';
        if (gameState.character === 'genz_student' && gameState.politicalActivation !== undefined) {
            extraInfo = `
                <div class="flex justify-between">
                    <span class="text-sm text-gray-300">Political Activation</span>
                    <span class="text-sm text-blue-400">${Math.round(gameState.politicalActivation)}%</span>
                </div>
            `;
        }
        
        const html = `
            <div class="space-y-2">
                <div class="text-center mb-3">
                    <div class="text-3xl mb-1">${character.icon}</div>
                    <div class="text-sm font-semibold">${t(character.nameKey)}</div>
                </div>
                ${traits}
                ${extraInfo}
            </div>
        `;
        
        container.innerHTML = html;
    }
    
    updateEventProbabilities() {
        const container = document.getElementById('eventProbabilities');
        if (!container) {
            console.log('❌ eventProbabilities container not found!');
            return;
        }
        
        console.log('📊 updateEventProbabilities() called - container found');
        
        // Get next possible event types and their probabilities
        const eventTypes = [
            { key: 'constitutional_crisis', probability: 15, color: 'text-red-400' },
            { key: 'economic_emergency', probability: 20, color: 'text-yellow-400' },
            { key: 'social_conflict', probability: 25, color: 'text-orange-400' },
            { key: 'international_relations', probability: 12, color: 'text-blue-400' },
            { key: 'natural_disaster', probability: 8, color: 'text-green-400' },
            { key: 'security_challenge', probability: 20, color: 'text-purple-400' }
        ];
        
        // Adjust probabilities based on game state - VERY DYNAMIC
        console.log('📊 Current game state for probability calculation:');
        console.log(`  Stability: ${gameState.stability}, Economy: ${gameState.economy}, Morale: ${gameState.morale}`);
        console.log(`  Stress: ${gameState.stress}, Political Capital: ${gameState.politicalCapital}`);
        console.log(`  Days: ${gameState.daysPassed}, Decisions: ${gameState.decisionsMade}`);
        
        eventTypes.forEach(event => {
            const originalProbability = event.probability;
            
            // Constitutional Crisis - MAJOR increases with low stability OR low political capital
            if (event.key === 'constitutional_crisis') {
                if (gameState.stability < 10) event.probability += 40;
                else if (gameState.stability < 30) event.probability += 30;
                else if (gameState.stability < 50) event.probability += 15;
                else if (gameState.stability > 80) event.probability -= 5; // Reduce when very stable
                
                // CRITICAL: Add political capital effects
                if (gameState.politicalCapital < 10) event.probability += 50; // HUGE increase when nearly powerless
                else if (gameState.politicalCapital < 30) event.probability += 35;
                else if (gameState.politicalCapital < 50) event.probability += 20;
                
                console.log(`📊 Constitutional Crisis: ${originalProbability} → ${event.probability} (stability: ${gameState.stability}, political capital: ${gameState.politicalCapital})`);
            }
            
            // Economic Emergency - MAJOR increases with poor economy
            if (event.key === 'economic_emergency') {
                if (gameState.economy < 10) event.probability += 50;
                else if (gameState.economy < 30) event.probability += 35;
                else if (gameState.economy < 50) event.probability += 20;
                else if (gameState.economy > 80) event.probability -= 5; // Reduce when very good
                
                // Low political capital makes economic crises more likely
                if (gameState.politicalCapital < 20) event.probability += 25;
                
                console.log(`📊 Economic Emergency: ${originalProbability} → ${event.probability} (economy: ${gameState.economy}, political capital: ${gameState.politicalCapital})`);
            }
            
            // Social Conflict - MAJOR increases with low morale
            if (event.key === 'social_conflict') {
                if (gameState.morale < 10) event.probability += 45;
                else if (gameState.morale < 30) event.probability += 30;
                else if (gameState.morale < 50) event.probability += 15;
                else if (gameState.morale > 80) event.probability -= 5; // Reduce when very happy
                
                // Low political capital increases social unrest
                if (gameState.politicalCapital < 20) event.probability += 20;
                
                console.log(`📊 Social Conflict: ${originalProbability} → ${event.probability} (morale: ${gameState.morale}, political capital: ${gameState.politicalCapital})`);
            }
            
            // International Relations - increases with faction tensions
            if (event.key === 'international_relations') {
                const intlFaction = gameState.factions.international;
                if (intlFaction < -50) event.probability += 35;
                else if (intlFaction < -20) event.probability += 25;
                else if (intlFaction < 20) event.probability += 15;
                else if (intlFaction > 70) event.probability -= 5; // Reduce when very good relations
            }
            
            // Security Challenge - increases with high stress and low military relations
            if (event.key === 'security_challenge') {
                if (gameState.stress > 90) event.probability += 25;
                else if (gameState.stress > 70) event.probability += 15;
                
                if (gameState.factions.military < 20) event.probability += 20;
                else if (gameState.factions.military < 40) event.probability += 10;
                else if (gameState.factions.military > 80) event.probability -= 5; // Reduce when military likes you
            }
            
            // Natural Disaster - increases with time and environmental factors
            if (event.key === 'natural_disaster') {
                const timeBonus = Math.min(15, Math.floor(gameState.daysPassed / 20));
                const economicFactor = gameState.economy < 40 ? 5 : 0; // Poor countries handle disasters worse
                event.probability += timeBonus + economicFactor;
            }
        });
        
        // Normalize probabilities to 100% total
        const total = eventTypes.reduce((sum, event) => sum + event.probability, 0);
        eventTypes.forEach(event => {
            event.probability = Math.round((event.probability / total) * 100);
        });
        
        const html = eventTypes.map(event => `
            <div class="flex justify-between items-center">
                <span class="text-xs text-gray-400">${t(event.key)}</span>
                <div class="flex items-center space-x-2">
                    <div class="w-16 bg-gray-600 rounded h-1.5">
                        <div class="bg-current h-1.5 rounded ${event.color}" style="width: ${event.probability}%"></div>
                    </div>
                    <span class="text-xs ${event.color} w-8 text-right">${event.probability}%</span>
                </div>
            </div>
        `).join('');
        
        // Update container only if content changed
        if (container.innerHTML !== html) {
            container.innerHTML = html;
        }
    }
    
    updateTimer() {
        const timeUntilNext = Math.max(0, gameState.nextEventTime - Date.now());
        const seconds = Math.floor(timeUntilNext / 1000);
        const minutes = Math.floor(seconds / 60);
        const displaySeconds = seconds % 60;
        
        const display = `${minutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;
        const timerEl = document.getElementById('nextEventTimer');
        const timerTextEl = document.querySelector('#gameTimer .text-sm');
        const containerEl = document.getElementById('gameTimer');
        
        // Debug logging only for timer issues
        if (display === '00:00' && timeUntilNext > 0) {
            console.log('⚠️ Timer display issue - showing 00:00 but time remaining:', timeUntilNext);
        }
        
        if (timerEl) {
            timerEl.textContent = display;
        } else if (display !== '00:00') {
            console.error('❌ Timer Element NOT Found! ID: nextEventTimer');
        }
        
        // Update timer text with translation
        if (timerTextEl) {
            timerTextEl.textContent = t('next_event');
        }
        
        // Update timer styling based on time remaining
        if (containerEl) {
            containerEl.className = 'timer-display';
            if (seconds < 5) {
                containerEl.classList.add('timer-critical');
            } else if (seconds < 10) {
                containerEl.classList.add('timer-warning');
            }
        }
    }
    
    updateAnalytics() {
        console.log('📊 Analytics Update - Chart exists:', !!this.chart, 'History length:', gameState.analyticsData.scoreHistory.length);
        if (!this.chart || gameState.analyticsData.scoreHistory.length === 0) {
            console.log('⚠️ Analytics update skipped - no chart or no data');
            return;
        }
        
        const data = gameState.analyticsData.scoreHistory.slice(-20); // Last 20 points
        
        // Update chart data
        this.chart.data.labels = data.map((_, i) => i + 1);
        this.chart.data.datasets[0].data = data.map(d => d.stability);
        this.chart.data.datasets[1].data = data.map(d => d.economy);
        this.chart.data.datasets[2].data = data.map(d => d.morale);
        this.chart.data.datasets[3].data = data.map(d => d.stress);
        
        // Add threshold line
        const thresholds = data.map(() => 30); // Critical threshold at 30
        this.chart.data.datasets[4].data = thresholds;
        
        this.chart.update('none'); // No animation for performance
        
        // Update analytics stats
        this.updateAnalyticsStats();
    }
    
    updateAnalyticsStats() {
        console.log('📊 updateAnalyticsStats called');
        const decisions = gameState.analyticsData.decisions;
        const totalDecisions = decisions.length;
        const successfulDecisions = decisions.filter(d => d.success).length;
        const successRate = totalDecisions > 0 ? Math.round((successfulDecisions / totalDecisions) * 100) : 0;
        
        console.log('📊 Analytics data:', {
            totalDecisions,
            successfulDecisions,  
            successRate,
            decisionsArray: decisions
        });
        
        // Calculate average score
        const currentScore = (gameState.stability + gameState.economy + gameState.morale + (100 - gameState.stress)) / 4;
        const avgScore = Math.round(currentScore);
        
        // Calculate time in office (better formatting with precision fix)
        const startTime = gameState.analyticsData.startTime || Date.now();
        const elapsedMs = Date.now() - startTime;
        const elapsedMinutes = Math.floor(elapsedMs / 60000);
        const elapsedHours = Math.floor(elapsedMinutes / 60);
        const remainingMinutes = elapsedMinutes % 60;
        
        // Fix floating point precision for days display
        const elapsedDays = Math.round((elapsedMs / (1000 * 60 * 60 * 24)) * 10) / 10; // Round to 1 decimal
        
        let timeDisplay;
        if (elapsedHours > 24) {
            const days = Math.floor(elapsedHours / 24);
            const hours = elapsedHours % 24;
            timeDisplay = days > 0 ? `${days}d ${hours}h` : `${hours}h`;
        } else if (elapsedHours > 0) {
            timeDisplay = `${elapsedHours}h ${remainingMinutes}m`;
        } else if (elapsedMinutes > 0) {
            timeDisplay = `${elapsedMinutes}m`;
        } else {
            timeDisplay = `${Math.floor(elapsedMs / 1000)}s`;
        }
        
        // Update display elements
        const elements = [
            { id: 'totalDecisions', value: totalDecisions },
            { id: 'successRate', value: `${successRate}%` },
            { id: 'avgScore', value: avgScore },
            { id: 'timeInOffice', value: timeDisplay }
        ];
        
        console.log('📊 Updating elements:', elements);
        
        elements.forEach(({ id, value }) => {
            const el = document.getElementById(id);
            console.log(`📊 Element ${id}:`, el ? 'found' : 'NOT FOUND', 'value:', value);
            if (el) {
                if (el.textContent !== value.toString()) {
                    console.log(`📊 Updating ${id} from "${el.textContent}" to "${value}"`);
                    el.textContent = value;
                } else {
                    console.log(`📊 ${id} already has correct value: "${value}"`);
                }
            } else {
                console.error(`❌ Element with id "${id}" not found!`);
            }
        });
        
        // Update decision history
        this.updateDecisionHistory();
    }
    
    updateDecisionHistory() {
        console.log('📊 updateDecisionHistory() called');
        console.log('📊 gameState.analyticsData:', gameState.analyticsData);
        console.log('📊 Raw decisions array:', gameState.analyticsData.decisions);
        
        // Update analytics panel
        const container = document.getElementById('analyticsDecisionHistory');
        console.log('📊 Analytics container found:', !!container);
        
        // Also update sidebar
        const sidebarContainer = document.getElementById('decisionHistory');
        console.log('📊 Sidebar container found:', !!sidebarContainer);
        
        if (!container && !sidebarContainer) {
            console.log('📊 No containers found, returning');
            return;
        }
        
        const allDecisions = gameState.analyticsData.decisions || [];
        const decisions = allDecisions.slice(-10).reverse(); // Last 10 decisions
        console.log('📊 Total decisions in array:', allDecisions.length);
        console.log('📊 Decisions to display:', decisions.length);
        console.log('📊 First few decisions:', decisions.slice(0, 3));
        
        if (decisions.length === 0) {
            const emptyMessage = '<div class="text-sm text-gray-400">निर्णयहरू यहाँ देखिनेछन्...</div>';
            if (container) {
                container.innerHTML = emptyMessage;
                console.log('📊 Analytics container updated with empty message');
            }
            if (sidebarContainer) {
                sidebarContainer.innerHTML = '<div class="text-sm text-gray-400" data-i18n="no_decisions">अहिलेसम्म कुनै निर्णय छैन</div>';
                console.log('📊 Sidebar container updated with empty message');
            }
            return;
        }
        
        const decisionHTML = decisions.map(decision => `
            <div class="bg-gray-800/50 border border-gray-700/50 p-3 rounded-lg">
                <div class="flex items-start justify-between mb-2">
                    <div class="font-semibold text-sm text-blue-400">${decision.eventTitle}</div>
                    <div class="text-xs px-2 py-1 rounded ${
                        decision.success ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'
                    }">
                        ${decision.success ? '✅' : '⚠️'} ${decision.successRate}%
                    </div>
                </div>
                <div class="text-xs text-gray-400 mb-1">${decision.choice}</div>
                <div class="text-xs text-gray-500">दिन ${Math.round(decision.daysPassed)} • ${
                    decision.success ? t('success') : t('partial_success')
                }</div>
            </div>
        `).join('');
        
        // Update both containers
        if (container) {
            container.innerHTML = decisionHTML;
            console.log('📊 Analytics panel updated with', decisions.length, 'decisions');
        }
        if (sidebarContainer) {
            sidebarContainer.innerHTML = decisionHTML;
            console.log('📊 Sidebar updated with', decisions.length, 'decisions');
        }
    }
    
    updateAnalytics() {
        if (!this.chart) {
            console.log('📊 Chart not initialized, skipping analytics update');
            return;
        }
        
        const data = gameState.analyticsData.scoreHistory.slice(-20); // Last 20 points
        console.log('📊 updateAnalytics() called with data points:', data.length);
        console.log('📊 Sample data:', data.slice(0, 3));
        
        if (data.length === 0) {
            console.log('📊 No score history data available');
            return;
        }
        
        this.chart.data.labels = data.map((_, i) => i + 1);
        this.chart.data.datasets[0].data = data.map(d => d.stability);
        this.chart.data.datasets[1].data = data.map(d => d.economy);
        this.chart.data.datasets[2].data = data.map(d => d.morale);
        this.chart.data.datasets[3].data = data.map(d => d.stress);
        
        console.log('📊 Chart data updated - stability points:', this.chart.data.datasets[0].data.length);
        
        this.chart.update('none'); // No animation for performance
        
        console.log('📊 Chart.update() called successfully');
    }
    
    updatePerformanceStats() {
        console.log('📊 updatePerformanceStats() called');
        
        const decisions = gameState.analyticsData.decisions;
        const totalDecisions = decisions.length;
        
        // Calculate success rate
        const successfulDecisions = decisions.filter(d => d.success).length;
        const successRate = totalDecisions > 0 ? Math.round((successfulDecisions / totalDecisions) * 100) : 0;
        
        // Calculate average score (combined metrics)
        const avgScore = totalDecisions > 0 ? Math.round(
            (gameState.stability + gameState.economy + gameState.morale + (100 - gameState.stress)) / 4
        ) : 0;
        
        // Calculate time in office
        const gameStartTime = gameState.analyticsData.startTime || Date.now();
        const currentTime = Date.now();
        const timeInOfficeMs = currentTime - gameStartTime;
        const timeInOfficeSeconds = Math.floor(timeInOfficeMs / 1000);
        const timeInOfficeMinutes = Math.floor(timeInOfficeMs / (1000 * 60));
        
        // Show seconds if less than 2 minutes, otherwise show minutes
        let timeDisplay;
        if (timeInOfficeMinutes < 2) {
            timeDisplay = `${timeInOfficeSeconds}s`;
        } else {
            timeDisplay = `${timeInOfficeMinutes}m`;
        }
        
        console.log('📊 Time calculation debug:');
        console.log('  Game start time:', new Date(gameStartTime).toLocaleTimeString());
        console.log('  Current time:', new Date(currentTime).toLocaleTimeString());
        console.log('  Time difference (ms):', timeInOfficeMs);
        console.log('  Time difference (sec):', timeInOfficeSeconds);
        console.log('  Time difference (min):', timeInOfficeMinutes);
        console.log('  Display format:', timeDisplay);
        
        console.log('📊 Performance stats calculated:', {
            totalDecisions,
            successRate,
            avgScore,
            timeDisplay
        });
        
        // Update UI elements
        const updates = [
            ['totalDecisions', totalDecisions],
            ['successRate', `${successRate}%`],
            ['avgScore', avgScore],
            ['timeInOffice', timeDisplay]
        ];
        
        updates.forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) {
                const currentText = el.textContent;
                if (currentText !== value.toString()) {
                    console.log(`📊 Updating ${id}: "${currentText}" → "${value}"`);
                    el.textContent = value;
                } else {
                    console.log(`📊 ${id} already has correct value: "${value}"`);
                }
            } else {
                console.error(`❌ Performance stat element with id "${id}" not found!`);
            }
        });
    }
    
    getFactionIcon(faction) {
        const icons = {
            military: '⚔️', judiciary: '⚖️', media: '📺', youth: '👥',
            international: '🌍', congress: '🏛️', business: '💼', civil_society: '🤝'
        };
        return icons[faction] || '👥';
    }
    
    initializeAnalyticsChart() {
        const ctx = document.getElementById('scoreChart');
        console.log('🎯 initializeAnalyticsChart() called');
        console.log('🎯 Canvas element found:', !!ctx);
        console.log('🎯 Canvas element:', ctx);
        
        if (!ctx) {
            console.error('❌ Canvas element scoreChart not found!');
            // Try to find it with querySelector as backup
            const canvasBackup = document.querySelector('#scoreChart');
            console.log('🎯 Backup canvas search result:', !!canvasBackup);
            return;
        }
        console.log('✅ Initializing analytics chart...');
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: t('stability'),
                        data: [],
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.3
                    },
                    {
                        label: t('economy'),
                        data: [],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.3
                    },
                    {
                        label: t('morale'),
                        data: [],
                        borderColor: '#8B5CF6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        tension: 0.3
                    },
                    {
                        label: t('stress'),
                        data: [],
                        borderColor: '#EF4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        tension: 0.3
                    },
                    {
                        label: 'Critical Threshold',
                        data: [],
                        borderColor: '#F59E0B',
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false, // Disable for performance
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// ============================================================================
// OPTIMIZED PROBABILITY ENGINE
// ============================================================================

class OptimizedProbabilityEngine {
    constructor() {
        this.cache = new Map();
        this.lastCleanup = Date.now();
    }
    
    calculateEventProbability(event, character) {
        const cacheKey = `${event.id}_${character}_${gameState.stress}_${gameState.stability}`;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < PERFORMANCE_CONFIG.PROBABILITY_CACHE_TTL) {
                return cached.value;
            }
        }
        
        // Calculate probability
        let probability = event.baseWeight || 0.1;
        
        // MASSIVE BOOST for starting scenarios
        if (event.isStartingScenario === true && gameState.eventHistory.length === 0) {
            console.log('🚀 HUGE BOOST for starting scenario:', event.id);
            probability *= 10.0; // 10x boost for starting scenarios
        }
        
        // WEIGHT DECAY for recently used events to reduce repetition
        const eventIndex = gameState.usedEvents.indexOf(event.id);
        if (eventIndex !== -1) {
            const recencyFactor = gameState.usedEvents.length - eventIndex; // How recently was it used?
            if (recencyFactor <= 5) { // Apply decay for last 5 events
                const decayMultiplier = Math.pow(0.3, (6 - recencyFactor)); // Exponential decay
                probability *= decayMultiplier;
                console.log(`📉 Weight decay for ${event.id}: recent factor ${recencyFactor}, multiplier ${decayMultiplier.toFixed(3)}`);
            }
        }
        
        const characterData = CHARACTERS[character];
        if (characterData && characterData.eventModifiers[event.type]) {
            probability *= characterData.eventModifiers[event.type];
        }
        
        // State-based modifiers (simplified for performance)
        probability *= this.getQuickStateModifier(event.type);
        
        // Cache the result
        this.cache.set(cacheKey, {
            value: probability,
            timestamp: Date.now()
        });
        
        // Cleanup cache if needed
        this.cleanupCache();
        
        return Math.max(0.001, Math.min(0.99, probability));
    }
    
    getQuickStateModifier(eventType) {
        switch(eventType) {
            case 'crisis':
                return (100 - gameState.stability) / 100 * 1.5;
            case 'economic':
                return gameState.economy < 40 ? 1.3 : 1.0;
            case 'social':
                return gameState.morale < 50 ? 1.2 : 1.0;
            default:
                return 1.0;
        }
    }
    
    cleanupCache() {
        if (Date.now() - this.lastCleanup > PERFORMANCE_CONFIG.CLEANUP_INTERVAL) {
            const cutoff = Date.now() - PERFORMANCE_CONFIG.PROBABILITY_CACHE_TTL;
            
            for (let [key, value] of this.cache) {
                if (value.timestamp < cutoff) {
                    this.cache.delete(key);
                }
            }
            
            this.lastCleanup = Date.now();
        }
    }
    
    selectEventByProbability(eventPool, character) {
        if (eventPool.length === 0) return null;
        if (eventPool.length === 1) return eventPool[0];
        
        const probabilities = eventPool.map(event => ({
            event: event,
            probability: this.calculateEventProbability(event, character)
        }));
        
        const totalProbability = probabilities.reduce((sum, p) => sum + p.probability, 0);
        let random = Math.random() * totalProbability;
        
        for (let i = 0; i < probabilities.length; i++) {
            random -= probabilities[i].probability;
            if (random <= 0) {
                return probabilities[i].event;
            }
        }
        
        return probabilities[0].event;
    }
}

// ============================================================================
// OPTIMIZED REAL-TIME ENGINE
// ============================================================================

class OptimizedRealTimeEngine {
    constructor(uiManager, probabilityEngine) {
        this.uiManager = uiManager;
        this.probabilityEngine = probabilityEngine;
        this.eventTimer = null;
        this.backgroundTimer = null;
        this.isRunning = false;
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        
        // Trigger first event immediately
        setTimeout(async () => {
            if (this.isRunning) {
                // Set timer for next event first, so the countdown starts immediately
                const delay = this.calculateEventDelay();
                const currentTime = Date.now();
                gameState.nextEventTime = currentTime + delay;
                console.log('🎯 Game Start - DEBUG TIMER:');
                console.log('  Current time:', currentTime);
                console.log('  Delay:', delay);
                console.log('  nextEventTime set to:', gameState.nextEventTime);
                console.log('  Time difference:', gameState.nextEventTime - currentTime);
                console.log('  Minutes until next event:', Math.floor((gameState.nextEventTime - currentTime) / 60000));
                
                console.log('🔥 About to trigger first event...');
                await this.triggerEvent();
                console.log('✅ First event triggered, nextEventTime is now:', gameState.nextEventTime);
                this.scheduleNextEvent(); // Then schedule the next one with normal delay
                console.log('🔄 After scheduleNextEvent, nextEventTime is now:', gameState.nextEventTime);
            }
        }, 100); // Tiny delay just for UI to initialize
        
        this.startBackgroundProcesses();
        
        console.log('🚀 Optimized real-time engine started - first event immediate');
    }
    
    stop() {
        this.isRunning = false;
        
        if (this.eventTimer) {
            clearTimeout(this.eventTimer);
            this.eventTimer = null;
        }
        
        if (this.backgroundTimer) {
            clearInterval(this.backgroundTimer);
            this.backgroundTimer = null;
        }
    }
    
    scheduleNextEvent() {
        if (!this.isRunning) return;
        
        const delay = this.calculateEventDelay();
        const currentTime = Date.now();
        gameState.nextEventTime = currentTime + delay;
        
        console.log('⏰ scheduleNextEvent - DEBUG:');
        console.log('  Current time:', currentTime);
        console.log('  Delay:', delay);
        console.log('  nextEventTime:', gameState.nextEventTime);
        console.log('  Minutes until next:', Math.floor(delay / 60000));
        
        this.eventTimer = setTimeout(async () => {
            if (this.isRunning && !gameState.isPaused) {
                await this.triggerEvent();
                this.scheduleNextEvent();
            } else if (this.isRunning && gameState.isPaused) {
                // If paused, wait and try again
                setTimeout(() => this.scheduleNextEvent(), 1000);
            }
        }, delay);
    }
    
    calculateEventDelay() {
        const baseMin = PERFORMANCE_CONFIG.EVENT_INTERVAL_MIN;
        const baseMax = PERFORMANCE_CONFIG.EVENT_INTERVAL_MAX;
        
        // Stress affects event frequency
        const stressMultiplier = Math.max(0.3, 1.0 - (gameState.stress / 200));
        
        const minDelay = baseMin * stressMultiplier;
        const maxDelay = baseMax * stressMultiplier;
        
        return Math.random() * (maxDelay - minDelay) + minDelay;
    }
    
    async triggerEvent() {
        const eventPool = this.getEventPool();
        console.log('🎲 Event pool:', eventPool ? eventPool.length : 'NULL', 'events');
        
        if (!eventPool || eventPool.length === 0) {
            console.log('❌ No events available, ending game');
            this.triggerGameEnd(t('all_scenarios_complete') || "All scenarios completed!");
            return;
        }
        
        console.log('🎯 Available events in pool:', eventPool.map(e => e.id));
        
        const selectedEvent = this.probabilityEngine.selectEventByProbability(
            eventPool, 
            gameState.character
        );
        
        console.log('🎲 Selected event result:', selectedEvent ? selectedEvent.id : 'NULL');
        
        if (selectedEvent) {
            console.log('🎯 Selected event:', selectedEvent.id, selectedEvent.title?.ne);
            console.log('🎮 About to call displayEvent...');
            this.displayEvent(selectedEvent);
            gameState.usedEvents.push(selectedEvent.id);
            console.log('✅ Event displayed and added to used events');
        } else {
            console.error('❌ No event was selected by probability engine!');
        }
    }
    
    getEventPool() {
        // PRIORITY: Show starting scenarios first for each character
        if (gameState.eventHistory.length === 0) {
            console.log('🚀 FIRST EVENT - Checking for starting scenarios for character:', gameState.character);
            
            // Get character-specific starting scenarios
            const startingScenarios = NEPALI_EVENTS.filter(event => 
                event.isStartingScenario === true && 
                (event.characterSpecific === gameState.character || !event.characterSpecific)
            );
            
            console.log('🎯 Available starting scenarios:', startingScenarios.map(e => e.id));
            
            if (startingScenarios.length > 0) {
                // For first event, return only starting scenarios
                console.log('✅ Returning starting scenarios for first event');
                return startingScenarios;
            }
        }
        
        // Check if GenZ character and political activation level
        const character = CHARACTERS[gameState.character];
        let pool;
        
        if (gameState.character === 'genz_student') {
            const politicalActivation = gameState.politicalActivation || 0;
            
            if (politicalActivation >= 50) {
                // High political activation - mix of both types
                pool = [...NEPALI_EVENTS, ...GENZ_EVENTS];
                console.log('🎓 GenZ with high political activation - using mixed events');
            } else {
                // Low political activation - mostly non-political
                pool = [...GENZ_EVENTS];
                // Add small chance of political events
                if (Math.random() < 0.2) {
                    const politicalEvents = NEPALI_EVENTS.filter(e => 
                        e.type === 'social' || e.type === 'constitutional'
                    ).slice(0, 2);
                    pool.push(...politicalEvents);
                }
                console.log('🎓 GenZ with low political activation - using mostly GenZ events');
            }
        } else {
            // Regular political characters
            pool = [...NEPALI_EVENTS];
            console.log('🏛️ Political character - using political events');
        }
        
        console.log('🎲 Total events available:', pool.length);
        console.log('🎲 Used events:', gameState.usedEvents.length, gameState.usedEvents);
        
        // First get character-specific + generic events
        const characterEvents = pool.filter(event => 
            event.characterSpecific === gameState.character || !event.characterSpecific
        );
        
        console.log('🎯 Character-specific + generic events available:', characterEvents.length);
        
        // IMPROVED ALGORITHM: Dynamic exclusion based on pool size
        const totalCharacterEvents = characterEvents.length;
        let eventsToExclude;
        
        // Dynamic exclusion window based on available events
        if (totalCharacterEvents <= 8) {
            eventsToExclude = Math.min(1, gameState.usedEvents.length); // Very small pool - exclude only 1
        } else if (totalCharacterEvents <= 15) {
            eventsToExclude = Math.min(3, gameState.usedEvents.length); // Small pool - exclude 3
        } else if (totalCharacterEvents <= 30) {
            eventsToExclude = Math.min(5, gameState.usedEvents.length); // Medium pool - exclude 5
        } else {
            eventsToExclude = Math.min(8, gameState.usedEvents.length); // Large pool - exclude 8
        }
        
        const recentlyUsed = gameState.usedEvents.slice(-eventsToExclude);
        console.log(`🎲 Dynamic exclusion: ${eventsToExclude} events from pool of ${totalCharacterEvents}`);
        
        // Apply smart filtering with fallback strategy
        let availablePool = characterEvents.filter(event => 
            !recentlyUsed.includes(event.id)
        );
        
        console.log('🎲 Pool after smart filtering:', availablePool.length);
        console.log('🎲 Recently used events (excluded):', recentlyUsed);
        
        // SMART FALLBACK SYSTEM
        if (availablePool.length === 0) {
            console.log('🎲 Smart fallback: No events available after filtering');
            
            // Fallback 1: Use all character events except the very last one
            if (gameState.usedEvents.length > 0) {
                const lastUsed = gameState.usedEvents.slice(-1);
                availablePool = characterEvents.filter(event => 
                    !lastUsed.includes(event.id)
                );
                console.log('🎲 Fallback 1: Excluding only last event, available:', availablePool.length);
            }
            
            // Fallback 2: If still empty, use ALL character events (complete reset)
            if (availablePool.length === 0) {
                availablePool = [...characterEvents];
                console.log('🎲 Fallback 2: Using all character events (reset cycle)');
                
                // Reset the used events tracker to prevent infinite exclusion
                gameState.usedEvents = [];
                console.log('🎲 Resetting usedEvents tracker for fresh cycle');
            }
        }
        
        pool = availablePool;
        
        return pool;
    }
    
    displayEvent(event) {
        console.log('🎮 displayEvent() called with:', event?.id);
        gameState.currentEvent = event;
        
        if (!event) {
            console.error('❌ displayEvent: No event provided!');
            return;
        }
        
        // Update UI with current language
        const lang = gameState.currentLanguage;
        const title = typeof event.title === 'object' ? event.title[lang] : event.title;
        const description = typeof event.description === 'object' ? event.description[lang] : event.description;
        
        console.log('🎮 Event details:', { title, description, lang, type: event.type });
        
        // Add professional question numbering header
        const questionNumber = gameState.decisionsMade + 1;
        const eventContainer = document.querySelector('#gameInterface .event-card') || document.querySelector('.event-card');
        
        // Create or update question header (only if container exists)
        let questionHeader = document.querySelector('.question-header');
        if (eventContainer && !questionHeader) {
            questionHeader = document.createElement('div');
            questionHeader.className = 'question-header';
            eventContainer.insertBefore(questionHeader, eventContainer.firstChild);
        }
        
        const eventTypeNe = {
            'crisis': 'संकट', 'diplomatic': 'कूटनीति', 'economic': 'आर्थिक',
            'political': 'राजनीतिक', 'social': 'सामाजिक', 'constitutional': 'संवैधानिक',
            'military': 'सैन्य', 'health': 'स्वास्थ्य', 'media': 'मिडिया',
            'tourism': 'पर्यटन', 'insurgency': 'विद्रोह', 'climate': 'जलवायु',
            'disaster': 'आपदा'
        };
        
        const eventTypeText = eventTypeNe[event.type] || event.type;
        
        // Update header content only if it exists
        if (questionHeader) {
            questionHeader.innerHTML = `
                <div class="question-number">
                    घटना #${questionNumber}
                </div>
                <div class="question-title">
                    ${eventTypeText} घटना
                </div>
                <div class="text-xs text-white opacity-75">
                    ${new Date().toLocaleDateString('ne-NP')}
                </div>
            `;
        }
        
        // Add transition animation to event content
        const eventContent = document.querySelector('.event-card');
        if (eventContent) {
            eventContent.classList.add('event-transition');
        }
        
        // Update main event elements with safety checks
        const titleEl = document.getElementById('eventTitle');
        const descEl = document.getElementById('eventDescription');
        const imageEl = document.getElementById('eventImage');
        
        console.log('🔍 DOM Elements found:', {
            titleEl: !!titleEl,
            descEl: !!descEl, 
            imageEl: !!imageEl,
            eventContainer: !!eventContainer
        });
        
        if (titleEl) titleEl.textContent = title;
        if (descEl) descEl.textContent = description;
        if (imageEl && event.imageUrl) imageEl.src = event.imageUrl;
        
        // Clear and populate choices
        const choicesContainer = document.getElementById('choicesContainer');
        if (!choicesContainer) {
            console.error('❌ choicesContainer not found! Cannot display choices.');
            return;
        }
        
        console.log('🎯 Clearing choices container, found', choicesContainer);
        choicesContainer.innerHTML = '';
        
        console.log('🎯 Creating', event.choices.length, 'choice cards...');
        event.choices.forEach((choice, index) => {
            console.log(`🎯 Creating choice card ${index + 1}:`, choice.text);
            const choiceCard = this.createOptimizedChoiceCard(choice, index);
            choicesContainer.appendChild(choiceCard);
            console.log(`✅ Choice card ${index + 1} added to container`);
        });
        
        console.log('🎯 Final choices container HTML length:', choicesContainer.innerHTML.length);
        
        // Add progress indicator after choices
        this.addProgressIndicator(choicesContainer);
        
        this.uiManager.scheduleUpdate('timer');
    }
    
    addProgressIndicator(container) {
        // Remove existing progress indicator
        const existing = container.querySelector('.decision-progress');
        if (existing) existing.remove();
        
        // Create new progress indicator
        const progressDiv = document.createElement('div');
        progressDiv.className = 'decision-progress mt-4 p-3 bg-gray-100 rounded-lg';
        
        const currentDecision = gameState.decisionsMade + 1;
        const progressPercentage = Math.min(100, (gameState.decisionsMade / 20) * 100); // Assume 20 decisions for full progress
        
        progressDiv.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-semibold text-gray-700">
                    ${gameState.currentLanguage === 'en' ? 'Decision Progress' : 'निर्णय प्रगति'}
                </span>
                <span class="text-xs text-gray-600">
                    ${currentDecision}/20
                </span>
            </div>
            <div class="w-full bg-gray-300 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full transition-all duration-300" style="width: ${progressPercentage}%"></div>
            </div>
            <div class="text-xs text-gray-500 mt-1">
                ${gameState.currentLanguage === 'en' ? 'Decisions made' : 'निर्णयहरू गरिएका'}: ${gameState.decisionsMade}
            </div>
        `;
        
        container.appendChild(progressDiv);
        console.log('📊 Progress indicator added - Decision', currentDecision, 'Progress:', progressPercentage + '%');
    }
    
    createOptimizedChoiceCard(choice, index) {
        const card = document.createElement('div');
        card.className = `event-card p-4 border-2 rounded-lg cursor-pointer ${
            choice.isConstitutional === false ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'
        }`;
        
        const lang = gameState.currentLanguage;
        const choiceText = typeof choice.text === 'object' ? choice.text[lang] : choice.text;
        const choiceOutcome = typeof choice.outcome === 'object' ? choice.outcome[lang] : choice.outcome;
        
        const successRate = this.calculateSuccessRate(choice);
        
        card.innerHTML = `
            <div class="flex items-start justify-between mb-2">
                <p class="font-bold text-gray-800">${choiceText}</p>
                <span class="text-xs px-2 py-1 rounded ${
                    successRate > 70 ? 'bg-green-200 text-green-800' :
                    successRate > 40 ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                }">
                    ${successRate}% ${t('success_chance')}
                </span>
            </div>
            <p class="text-sm text-gray-600 mb-3">${choiceOutcome}</p>
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    ${this.createEffectPreview(choice.effects)}
                </div>
                <span class="text-xs ${choice.isConstitutional === false ? 'text-red-600' : 'text-green-600'}">
                    ${choice.isConstitutional === false ? '⚠️ ' + t('unconstitutional') : '✅ ' + t('constitutional')}
                </span>
            </div>
        `;
        
        // Optimized event listener
        card.addEventListener('click', () => {
            console.log('🖱️ CLICK EVENT TRIGGERED - Choice card clicked!');
            console.log('🖱️ this context:', this);
            console.log('🖱️ choice object:', choice);
            console.log('🖱️ this.makeChoice exists?', typeof this.makeChoice);
            console.log('🖱️ window.gameEngine exists?', typeof window.gameEngine);
            console.log('🖱️ window.gameEngine.makeChoice exists?', typeof window.gameEngine?.makeChoice);
            
            // Try both approaches
            try {
                console.log('🖱️ Trying this.makeChoice...');
                this.makeChoice(choice);
            } catch (error) {
                console.error('❌ this.makeChoice failed:', error);
                console.log('🖱️ Trying window.gameEngine.makeChoice...');
                window.gameEngine.makeChoice(choice);
            }
        }, { passive: false });
        return card;
    }
    
    calculateSuccessRate(choice) {
        const character = CHARACTERS[gameState.character];
        let baseRate = 50;
        
        // Simple trait-based modification for performance
        if (character && character.traits && choice.traitModifiers) {
            for (let [trait, modifier] of Object.entries(choice.traitModifiers)) {
                if (character.traits[trait]) {
                    baseRate += character.traits[trait] * modifier * 100;
                }
            }
        }
        
        // State-based modifiers
        if (gameState.stress > 70) baseRate -= 10;
        if (gameState.politicalCapital > 100) baseRate += 10;
        
        return Math.max(10, Math.min(90, Math.round(baseRate)));
    }
    
    createEffectPreview(effects) {
        if (!effects) return '';
        
        const previews = [];
        for (let [key, value] of Object.entries(effects)) {
            if (typeof value === 'number') {
                const icon = this.getMetricIcon(key);
                const color = value > 0 ? 'text-green-600' : 'text-red-600';
                const sign = value > 0 ? '+' : '';
                previews.push(`<span class="${color} text-xs">${icon}${sign}${value}</span>`);
            }
        }
        return previews.join(' ');
    }
    
    getMetricIcon(metric) {
        const icons = {
            stability: '🏛️', economy: '💰', morale: '😊', stress: '⚠️',
            military: '⚔️', judiciary: '⚖️', media: '📺', youth: '👥',
            international: '🌍', congress: '🏛️', business: '💼'
        };
        return icons[metric] || '📊';
    }
    
    
    applyEffects(effects, multiplier = 1.0) {
        if (!effects) {
            console.log('⚠️ No effects to apply');
            return;
        }
        
        console.log('🎯 APPLYING EFFECTS:');
        console.log('  Effects:', effects);
        console.log('  Multiplier:', multiplier);
        console.log('  BEFORE - Stability:', gameState.stability, 'Economy:', gameState.economy, 
                   'Morale:', gameState.morale, 'Stress:', gameState.stress);
        
        for (let [key, value] of Object.entries(effects)) {
            if (typeof value === 'number') {
                const adjustedValue = Math.round(value * multiplier);
                const oldValue = gameState[key] || gameState.factions?.[key] || 0;
                
                if (key in gameState) {
                    gameState[key] = Math.max(0, Math.min(100, gameState[key] + adjustedValue));
                    console.log(`  ✅ ${key}: ${oldValue} → ${gameState[key]} (${adjustedValue > 0 ? '+' : ''}${adjustedValue})`);
                } else if (key in gameState.factions) {
                    const oldFactionValue = gameState.factions[key];
                    gameState.factions[key] = Math.max(-100, Math.min(100, 
                        gameState.factions[key] + adjustedValue
                    ));
                    console.log(`  🏢 Faction ${key}: ${oldFactionValue} → ${gameState.factions[key]} (${adjustedValue > 0 ? '+' : ''}${adjustedValue})`);
                } else if (key === 'politicalCapital') {
                    const oldPC = gameState.politicalCapital;
                    gameState.politicalCapital = Math.max(0, gameState.politicalCapital + adjustedValue);
                    console.log(`  💰 Political Capital: ${oldPC} → ${gameState.politicalCapital} (${adjustedValue > 0 ? '+' : ''}${adjustedValue})`);
                } else {
                    console.log(`  ⚠️ Unknown effect key: ${key} = ${value} (IGNORED)`);
                    console.log('  🔍 Available gameState keys:', Object.keys(gameState).slice(0, 10));
                    console.log('  🔍 Available faction keys:', Object.keys(gameState.factions));
                }
            }
        }
    }
    
    makeChoice(choice) {
        console.log('🎯 Making choice:', choice);
        
        const successRate = this.calculateSuccessRate(choice);
        const isSuccess = Math.random() * 100 < successRate;
        const effectMultiplier = isSuccess ? 1.0 : 0.4;
        
        // Apply effects
        this.applyEffects(choice.effects, effectMultiplier);
        
        // IMMEDIATE UI UPDATE - Force metrics to update right away
        console.log('🔄 Forcing immediate UI update...');
        this.uiManager.updateMetrics();
        
        // Handle political activation for GenZ character
        this.handlePoliticalActivation(choice);
        
        // Record analytics
        this.recordDecision(choice, isSuccess, successRate);
        
        // IMMEDIATE DECISION HISTORY UPDATE
        console.log('🔄 Forcing immediate decision history update...');
        this.uiManager.updateDecisionHistory();
        
        // Update game state
        gameState.decisionsMade++;
        
        // Check if game should end after applying effects
        this.checkGameEnd();
        
        // Schedule UI updates (only if game hasn't ended)
        if (this.isRunning) {
            this.uiManager.scheduleUpdate('metrics');
            this.uiManager.scheduleUpdate('factions');
            this.uiManager.scheduleUpdate('counters');
            this.uiManager.scheduleUpdate('analytics');
            this.uiManager.scheduleUpdate('profile');
        }
        
        // Show result notification
        this.showOptimizedNotification(choice, isSuccess);
        
        // Clear current event and immediately schedule next one
        gameState.currentEvent = null;
        
        // Cancel existing timer and schedule new one with short delay
        if (this.eventTimer) {
            clearTimeout(this.eventTimer);
            this.eventTimer = null;
        }
        
        // Set next event time and schedule immediately  
        const properDelay = this.calculateEventDelay(); // Use normal event delay 1-2 minutes
        const shortDelay = 3000; // 3 seconds to process choice, but show real countdown
        gameState.nextEventTime = Date.now() + properDelay; // Show correct countdown time
        
        console.log('⏰ TIMER FIX - Setting nextEventTime to show proper countdown:', Math.floor(properDelay / 1000), 'seconds');
        
        this.eventTimer = setTimeout(async () => {
            if (this.isRunning && !gameState.isPaused) {
                await this.triggerEvent();
                this.scheduleNextEvent(); // Schedule the one after that
            }
        }, shortDelay); // Use short delay for processing, but timer shows proper countdown
    }
    
    handlePoliticalActivation(choice) {
        // Only applies to GenZ character
        if (gameState.character !== 'genz_student') return;
        
        // Initialize political activation if not exists
        if (gameState.politicalActivation === undefined) {
            gameState.politicalActivation = 0;
        }
        
        // Apply political activation from choice
        if (choice.politicalActivation) {
            gameState.politicalActivation = Math.min(100, 
                gameState.politicalActivation + choice.politicalActivation
            );
            console.log('🎓 Political activation increased to:', gameState.politicalActivation);
            
            // Check for character transition
            if (choice.triggersTransition && gameState.politicalActivation >= 50) {
                console.log('🔄 GenZ character becoming politically active!');
                this.showPoliticalTransitionNotification();
            }
        }
    }
    
    showPoliticalTransitionNotification() {
        // Show special notification about becoming political
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center';
        overlay.style.zIndex = '2500';
        
        const notification = document.createElement('div');
        notification.className = 'bg-gradient-to-r from-blue-800 to-red-600 border-2 border-yellow-400 rounded-lg shadow-2xl max-w-2xl mx-4 p-6';
        
        notification.innerHTML = `
            <div class="text-center text-white">
                <div class="text-4xl mb-4">🎓➡️🏛️</div>
                <h2 class="text-xl font-bold mb-4">राजनीतिक जागृति!</h2>
                <p class="mb-4">तपाईं अब राजनीतिक रूपमा सक्रिय हुनुभयो। अबका घटनाहरूमा राजनीतिक परिस्थितिहरू पनि आउनेछन्।</p>
                <p class="text-sm opacity-75">Political Awakening! You are now politically active. Future events will include political scenarios.</p>
            </div>
        `;
        
        overlay.appendChild(notification);
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }, 4000);
    }

    recordDecision(choice, isSuccess, successRate) {
        console.log('📊 recordDecision called:', { choice: choice?.text, isSuccess, successRate });
        
        const lang = gameState.currentLanguage;
        const choiceText = typeof choice.text === 'object' ? choice.text[lang] : choice.text;
        
        const decision = {
            eventTitle: gameState.currentEvent.title[lang] || gameState.currentEvent.title,
            choice: choiceText,
            success: isSuccess,
            successRate: successRate,
            timestamp: Date.now(),
            daysPassed: gameState.daysPassed,
            metricsAfter: {
                stability: gameState.stability,
                economy: gameState.economy,
                morale: gameState.morale,
                stress: gameState.stress
            }
        };
        
        gameState.analyticsData.decisions.push(decision);
        gameState.analyticsData.scoreHistory.push({
            stability: gameState.stability,
            economy: gameState.economy,
            morale: gameState.morale,
            stress: gameState.stress,
            timestamp: Date.now()
        });
        
        console.log('📊 Analytics data updated:');
        console.log('  Decisions count:', gameState.analyticsData.decisions.length);
        console.log('  Score history count:', gameState.analyticsData.scoreHistory.length);
        console.log('  Latest decision:', decision);
        
        // Limit history for performance
        if (gameState.analyticsData.decisions.length > PERFORMANCE_CONFIG.MAX_EVENT_HISTORY) {
            gameState.analyticsData.decisions = gameState.analyticsData.decisions.slice(-50);
        }
        if (gameState.analyticsData.scoreHistory.length > PERFORMANCE_CONFIG.MAX_EVENT_HISTORY) {
            gameState.analyticsData.scoreHistory = gameState.analyticsData.scoreHistory.slice(-50);
        }
    }
    
    showOptimizedNotification(choice, isSuccess) {
        const lang = gameState.currentLanguage;
        const outcome = typeof choice.outcome === 'object' ? choice.outcome[lang] : choice.outcome;
        const questionNumber = gameState.decisionsMade;
        
        const statusIcon = isSuccess ? '✅' : '⚠️';
        const statusText = isSuccess ? t('success') : t('partial_success');
        
        // Create professional news-style notification modal
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center';
        overlay.style.zIndex = '2000';
        
        const notification = document.createElement('div');
        notification.className = `bg-gray-800 border-2 ${isSuccess ? 'border-green-400' : 'border-yellow-400'} rounded-lg shadow-2xl max-w-2xl mx-4 transform transition-all duration-300 scale-95`;
        notification.style.animation = 'slideIn 0.3s ease-out forwards';
        
        notification.innerHTML = `
            <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-2">
                        <span class="text-2xl">${statusIcon}</span>
                        <span class="font-bold text-lg ${isSuccess ? 'text-green-400' : 'text-yellow-400'}">
                            ${statusText}
                        </span>
                    </div>
                    <div class="text-sm text-gray-400 font-mono">
                        निर्णय #${questionNumber}
                    </div>
                </div>
                <div class="text-white text-base leading-relaxed mb-4">
                    ${outcome}
                </div>
                <div class="text-xs text-gray-400 text-center">
                    नयाँ घटना तयारी गरिँदै... (3 सेकेन्ड)
                </div>
            </div>
        `;
        
        overlay.appendChild(notification);
        
        document.body.appendChild(overlay);
        
        // Add professional slide-in animation
        setTimeout(() => {
            notification.style.transform = 'scale(1)';
        }, 10);
        
        // Remove after delay with smooth transition
        setTimeout(() => {
            overlay.style.opacity = '0';
            notification.style.transform = 'scale(0.95)';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.remove();
                }
            }, 300);
        }, 2700); // Show for 2.7 seconds, then 0.3s transition
    }
    
    checkGameEnd() {
        let endReason = null;
        
        if (gameState.stability <= 0) {
            endReason = "सरकार राजनीतिक अस्थिरताका कारण ढलेको छ!";
        } else if (gameState.morale <= 0) {
            endReason = "जनताले तपाईंको नेतृत्वमा पूर्ण विश्वास गुमाएको छ!";
        } else if (gameState.stress >= 100) {
            endReason = "नेतृत्वको अत्यधिक दबाबले तपाईंलाई विचलित बनाएको छ!";
        } else if (gameState.politicalCapital <= 0) {
            endReason = "शासन गर्न तपाईंसँग कुनै राजनीतिक पूँजी बाँकी छैन!";
        }
        
        if (endReason) {
            this.triggerGameEnd(endReason);
        }
    }
    
    triggerGameEnd(message) {
        this.stop();
        
        document.getElementById('gameOverTitle').textContent = t('game_over');
        document.getElementById('gameOverMessage').textContent = message;
        
        // Show final analytics
        this.showFinalAnalytics();
        
        document.getElementById('gameOverScreen').classList.remove('hidden');
    }
    
    showFinalAnalytics() {
        const stats = document.getElementById('finalStats');
        const decisions = gameState.analyticsData.decisions;
        const successRate = decisions.length > 0 
            ? Math.round((decisions.filter(d => d.success).length / decisions.length) * 100)
            : 0;
        
        stats.innerHTML = `
            <div class="grid grid-cols-2 gap-4 text-left text-sm">
                <div><strong>${t('time_in_office')}:</strong> ${gameState.daysPassed} ${t('day')}</div>
                <div><strong>${t('decisions')}:</strong> ${gameState.decisionsMade}</div>
                <div><strong>${t('success_rate')}:</strong> ${successRate}%</div>
                <div><strong>${t('stability')}:</strong> ${gameState.stability}</div>
                <div><strong>${t('economy')}:</strong> ${gameState.economy}</div>
                <div><strong>${t('morale')}:</strong> ${gameState.morale}</div>
            </div>
        `;
    }
    
    startBackgroundProcesses() {
        // Optimized background process - less frequent updates
        this.backgroundTimer = setInterval(() => {
            if (!this.isRunning || gameState.isPaused) return;
            
            // Political capital decay (slower)
            gameState.politicalCapital = Math.max(0, 
                gameState.politicalCapital - (PERFORMANCE_CONFIG.EVENT_INTERVAL_MIN / 60000)
            );
            
            // Day progression (slower for smoother gameplay)
            gameState.daysPassed += 0.1;
            
            // Schedule UI update with aggressive debugging
            this.uiManager.scheduleUpdate('counters');
            this.uiManager.scheduleUpdate('timer');
            
            // Update event probabilities and faction display every few seconds
            if (Math.floor(Date.now() / 1000) % 5 === 0) { // Every 5 seconds
                this.uiManager.scheduleUpdate('profile');
                this.uiManager.scheduleUpdate('factions');
                console.log('📊 Background update: refreshing event probabilities and factions');
                
                // AGGRESSIVE DEBUG: Call functions directly
                console.log('🔥 FORCING DIRECT CALLS:');
                try {
                    this.uiManager.updateEventProbabilities();
                    console.log('🔥 Direct updateEventProbabilities called');
                } catch (e) {
                    console.error('🔥 Direct updateEventProbabilities FAILED:', e);
                }
                
                try {
                    this.uiManager.updateFactions();
                    console.log('🔥 Direct updateFactions called');
                } catch (e) {
                    console.error('🔥 Direct updateFactions FAILED:', e);
                }
            }
            
            // AGGRESSIVE TIMER DEBUG - Every 5 seconds
            if (Math.floor(Date.now() / 1000) % 5 === 0) {
                console.log('🔍 BACKGROUND PROCESS TIMER DEBUG:');
                console.log('  isRunning:', this.isRunning);
                console.log('  isPaused:', gameState.isPaused);
                console.log('  nextEventTime:', gameState.nextEventTime);
                console.log('  Current time:', Date.now());
                console.log('  Difference:', gameState.nextEventTime - Date.now());
                console.log('  uiManager exists:', !!this.uiManager);
            }
            
        }, 1000); // Every 1 second for smooth timer display
    }
}

// ============================================================================
// TRANSLATION HELPER
// ============================================================================

function t(key, lang = null) {
    const currentLang = lang || gameState.currentLanguage || 'ne';
    return TRANSLATIONS[currentLang][key] || TRANSLATIONS['en'][key] || key;
}

function updateAllTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
}

// ============================================================================
// OPTIMIZED GAME INITIALIZATION
// ============================================================================

class OptimizedGameInitializer {
    constructor() {
        this.uiManager = new OptimizedUIManager();
        this.probabilityEngine = new OptimizedProbabilityEngine();
        this.gameEngine = new OptimizedRealTimeEngine(this.uiManager, this.probabilityEngine);
        this.loadingSteps = [
            'initializing',
            'loading_events', 
            'building_profiles',
            'ready'
        ];
        this.currentStep = 0;
    }
    
    async initialize() {
        console.log('🇳🇵 Starting optimized Nepal Political Strategy Game');
        
        this.showLoadingScreen();
        
        for (let stepKey of this.loadingSteps) {
            await this.simulateLoadingStep(stepKey);
            this.updateLoadingProgress();
        }
        
        this.hideLoadingScreen();
        this.showCharacterSelection();
        this.setupLanguageToggle();
        this.setupThemeToggle();
        this.setupPauseToggle();
        this.setupAnalyticsPanel();
        
        // Start idle timeout monitoring
        setInterval(() => this.checkIdleTimeout(), 10000); // Check every 10 seconds
    }
    
    async simulateLoadingStep(stepKey) {
        console.log('📋 Loading step:', stepKey);
        const loadingElement = document.getElementById('loadingText');
        if (loadingElement) {
            loadingElement.textContent = t(stepKey);
        } else {
            console.error('❌ Loading text element not found!');
        }
        await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    updateLoadingProgress() {
        this.currentStep++;
        const progress = (this.currentStep / this.loadingSteps.length) * 100;
        document.getElementById('loadingBar').style.width = `${progress}%`;
    }
    
    showLoadingScreen() {
        document.getElementById('loadingScreen').classList.remove('hidden');
    }
    
    hideLoadingScreen() {
        document.getElementById('loadingScreen').classList.add('hidden');
    }
    
    showCharacterSelection() {
        document.getElementById('characterSelection').classList.remove('hidden');
        this.populateCharacterGrid();
        this.setupCharacterSelectionListeners();
    }
    
    populateCharacterGrid() {
        const grid = document.getElementById('characterGrid');
        grid.innerHTML = Object.entries(CHARACTERS).map(([key, character]) => `
            <div class="character-card bg-gray-700 p-6 rounded-lg cursor-pointer hover:bg-gray-600 transition-all duration-200 transform hover:scale-105" 
                 data-character="${key}">
                <div class="text-center">
                    <div class="text-6xl mb-3">${character.icon}</div>
                    <h3 class="text-xl font-bold mb-2 text-white">${t(character.nameKey)}</h3>
                    <p class="text-sm text-gray-300 mb-4">${t(character.descKey)}</p>
                    <div class="space-y-2">
                        ${Object.entries(character.traits).slice(0, 2).map(([trait, value]) => `
                            <div class="text-xs character-trait px-2 py-1 rounded text-white">
                                ${trait.replace(/_/g, ' ')}: ${value > 0 ? '+' : ''}${Math.round(value * 100)}%
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    setupCharacterSelectionListeners() {
        let selectedCharacter = null;
        
        document.querySelectorAll('.character-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.character-card').forEach(c => {
                    c.classList.remove('ring-4', 'ring-blue-500');
                });
                
                card.classList.add('ring-4', 'ring-blue-500');
                selectedCharacter = card.dataset.character;
                
                document.getElementById('startAdvancedGame').disabled = false;
            });
        });
        
        document.getElementById('startAdvancedGame').addEventListener('click', () => {
            if (selectedCharacter) {
                this.startGame(selectedCharacter);
            }
        });
    }
    
    updateEventContent(event) {
        console.log('🔄 Updating event content for language change');
        const lang = gameState.currentLanguage || 'ne';
        
        // Update event title
        const titleEl = document.getElementById('eventTitle');
        if (titleEl && event.title) {
            titleEl.textContent = event.title[lang] || event.title.ne;
        }
        
        // Update event description
        const descEl = document.getElementById('eventDescription');
        if (descEl && event.description) {
            descEl.textContent = event.description[lang] || event.description.ne;
        }
        
        // Update choice buttons
        const choiceButtons = document.querySelectorAll('.choice-btn');
        event.choices.forEach((choice, index) => {
            if (choiceButtons[index] && choice.text) {
                choiceButtons[index].textContent = choice.text[lang] || choice.text.ne;
            }
        });
    }
    
    setupLanguageToggle() {
        const langToggle = document.getElementById('langToggle');
        
        langToggle.addEventListener('click', () => {
            gameState.currentLanguage = gameState.currentLanguage === 'ne' ? 'en' : 'ne';
            langToggle.textContent = gameState.currentLanguage === 'ne' ? 'EN' : 'ने';
            
            updateAllTranslations();
            
            // Update character grid if visible
            if (!document.getElementById('characterSelection').classList.contains('hidden')) {
                this.populateCharacterGrid();
                this.setupCharacterSelectionListeners();
            }
            
            // Update current event content if game is running
            if (gameState.currentEvent && !document.getElementById('gameInterface').classList.contains('hidden')) {
                this.updateEventContent(gameState.currentEvent);
                
                // Update analytics sections for language change
                this.uiManager.scheduleUpdate('profile');
            }
        });
    }
    
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        
        themeToggle.addEventListener('click', () => {
            gameState.currentTheme = gameState.currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', gameState.currentTheme);
            
            // Update button appearance
            themeToggle.textContent = gameState.currentTheme === 'dark' ? '🌞' : '🌙';
        });
    }
    
    setupPauseToggle() {
        const pauseToggle = document.getElementById('pauseToggle');
        
        pauseToggle.addEventListener('click', () => {
            this.togglePause();
        });
        
        // Setup keyboard shortcut (spacebar)
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                this.togglePause();
            }
        });
        
        // Track user activity for idle detection
        document.addEventListener('click', () => this.updateUserActivity());
        document.addEventListener('keydown', () => this.updateUserActivity());
        document.addEventListener('mousemove', () => this.updateUserActivity());
    }
    
    togglePause() {
        gameState.isPaused = !gameState.isPaused;
        const pauseToggle = document.getElementById('pauseToggle');
        const gameTimer = document.getElementById('gameTimer');
        
        if (gameState.isPaused) {
            pauseToggle.textContent = '▶️';
            pauseToggle.classList.add('paused');
            pauseToggle.title = 'Resume Game';
            
            if (gameTimer) {
                gameTimer.style.background = 'var(--accent-warning)';
                gameTimer.querySelector('.text-sm').textContent = 'पज गरिएको';
            }
            
            console.log('🎮 Game Paused');
        } else {
            pauseToggle.textContent = '⏸️';
            pauseToggle.classList.remove('paused');
            pauseToggle.title = 'Pause Game';
            
            if (gameTimer) {
                gameTimer.style.background = 'var(--bg-secondary)';
                gameTimer.querySelector('.text-sm').textContent = 'अर्को घटना';
            }
            
            this.updateUserActivity();
            console.log('🎮 Game Resumed');
        }
    }
    
    updateUserActivity() {
        gameState.lastUserActivity = Date.now();
        gameState.idleWarningShown = false;
    }
    
    checkIdleTimeout() {
        if (gameState.isPaused) return;
        
        const idleTime = Date.now() - gameState.lastUserActivity;
        
        if (idleTime > PERFORMANCE_CONFIG.IDLE_TIMEOUT && !gameState.idleWarningShown) {
            this.showIdleWarning();
            gameState.idleWarningShown = true;
        }
        
        if (idleTime > PERFORMANCE_CONFIG.PAUSE_TIMEOUT) {
            this.autoPause();
        }
    }
    
    showIdleWarning() {
        const notification = document.createElement('div');
        notification.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white p-4 rounded-lg shadow-lg z-50';
        notification.innerHTML = `
            <div class="text-center">
                <div class="text-lg font-bold mb-2">⏰ निष्क्रिय चेतावनी</div>
                <div class="text-sm">तपाईं निष्क्रिय देखिनुहुन्छ। खेल ५ मिनेटमा पज हुनेछ।</div>
                <button onclick="this.parentElement.parentElement.remove()" class="mt-2 bg-white text-yellow-500 px-3 py-1 rounded text-sm font-bold">
                    ठीक छ
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 5000);
    }
    
    autoPause() {
        if (!gameState.isPaused) {
            this.togglePause();
            
            const notification = document.createElement('div');
            notification.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50';
            notification.innerHTML = `
                <div class="text-center">
                    <div class="text-lg font-bold mb-2">⏸️ स्वचालित पज</div>
                    <div class="text-sm">खेल निष्क्रियताका कारण पज गरिएको छ।</div>
                </div>
            `;
            
            document.body.appendChild(notification);
            setTimeout(() => {
                if (notification.parentNode) notification.remove();
            }, 3000);
        }
    }
    
    setupAnalyticsPanel() {
        const analyticsToggle = document.getElementById('analyticsToggle');
        const analyticsPanel = document.getElementById('analyticsPanel');
        const closeAnalytics = document.getElementById('closeAnalytics');
        
        analyticsToggle.addEventListener('click', () => {
            console.log('📊 Analytics toggle clicked!');
            analyticsPanel.classList.toggle('open');
            console.log('📊 Analytics panel open:', analyticsPanel.classList.contains('open'));
            
            if (analyticsPanel.classList.contains('open')) {
                console.log('📊 About to initialize chart and update analytics...');
                this.uiManager.initializeAnalyticsChart();
                this.uiManager.scheduleUpdate('analytics');
                
                // Force immediate update for debugging
                setTimeout(() => {
                    console.log('📊 Forcing immediate analytics update after 100ms...');
                    this.uiManager.updateAnalytics();
                    this.uiManager.updatePerformanceStats();
                }, 100);
            }
        });
        
        closeAnalytics.addEventListener('click', () => {
            analyticsPanel.classList.remove('open');
        });
        
        // Setup rules panel
        const rulesToggle = document.getElementById('rulesToggle');
        const rulesPanel = document.getElementById('rulesPanel');
        const closeRules = document.getElementById('closeRules');
        
        rulesToggle.addEventListener('click', () => {
            rulesPanel.classList.toggle('open');
        });
        
        closeRules.addEventListener('click', () => {
            rulesPanel.classList.remove('open');
        });
    }
    
    startGame(characterKey) {
        const character = CHARACTERS[characterKey];
        
        // Initialize game state
        gameState.character = characterKey;
        gameState.characterTraits = character.traits;
        gameState.analyticsData.startTime = Date.now();
        
        // Apply character starting stats
        Object.assign(gameState, character.startingStats);
        
        // Initialize GenZ specific properties
        if (characterKey === 'genz_student') {
            gameState.politicalActivation = 0;
            console.log('🎓 GenZ character initialized with political activation: 0');
        }
        
        if (character.startingStats.factionBonus) {
            Object.entries(character.startingStats.factionBonus).forEach(([faction, bonus]) => {
                gameState.factions[faction] += bonus;
            });
        }
        
        // Show game interface
        document.getElementById('characterSelection').classList.add('hidden');
        document.getElementById('gameInterface').classList.remove('hidden');
        
        // Update character name
        document.getElementById('characterName').textContent = t(character.nameKey);
        
        // Start optimized game engine
        this.gameEngine.start();
        
        // Initialize all UI components
        this.uiManager.scheduleUpdate('metrics');
        this.uiManager.scheduleUpdate('factions');
        this.uiManager.scheduleUpdate('counters');
        this.uiManager.scheduleUpdate('profile');
        
        console.log('🎮 Game started with character:', characterKey);
        
        // Add initial score data for analytics
        gameState.analyticsData.scoreHistory.push({
            stability: gameState.stability,
            economy: gameState.economy,
            morale: gameState.morale,
            stress: gameState.stress,
            timestamp: Date.now()
        });
        
        // Initial UI update
        this.uiManager.scheduleUpdate('metrics');
        this.uiManager.scheduleUpdate('factions'); 
        this.uiManager.scheduleUpdate('counters');
        this.uiManager.scheduleUpdate('timer');
        this.uiManager.scheduleUpdate('analytics');
        
        console.log(`🎮 Game started with ${t(character.nameKey)}`);
    }
}

// ============================================================================
// GAME STARTUP WITH OPTIMIZATIONS
// ============================================================================

document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('🚀 DOM Content Loaded - Starting game initialization...');
        
        // Set default language to Nepali
        gameState.currentLanguage = 'ne';
        document.body.setAttribute('data-lang', 'ne');
        
        // Set initial language toggle text
        const langToggle = document.getElementById('langToggle');
        if (langToggle) langToggle.textContent = 'EN';
        
        console.log('🇳🇵 Loading Nepal Optimized Political Strategy Game...');
        
        const gameInitializer = new OptimizedGameInitializer();
        await gameInitializer.initialize();
        
        // CRITICAL FIX: Expose gameEngine globally so makeChoice works
        window.gameEngine = gameInitializer.gameEngine;
        window.uiManager = gameInitializer.uiManager;
        
        
        console.log('✅ Game initialization completed successfully!');
    } catch (error) {
        console.error('❌ Game initialization failed:', error);
        // Show error message to user
        const loadingText = document.getElementById('loadingText');
        if (loadingText) {
            loadingText.textContent = 'Loading failed. Please refresh the page.';
            loadingText.style.color = '#ef4444';
        }
    }
    
    // Setup global event listeners
    document.getElementById('playAgainBtn')?.addEventListener('click', () => {
        location.reload();
    });
    
    document.getElementById('analyzeGameBtn')?.addEventListener('click', () => {
        const analyticsPanel = document.getElementById('analyticsPanel');
        analyticsPanel.classList.add('open');
    });
});

// Export for debugging
if (typeof window !== 'undefined') {
    window.GameState = gameState;
    window.t = t;
}

// ============================================================================
// DEBUG FUNCTIONS - UNCOMMENT FOR TROUBLESHOOTING
// ============================================================================
/*
// Manual UI update test
window.testMetrics = function() {
    console.log('🧪 Testing metrics update...');
    gameState.stability = Math.max(0, Math.min(100, gameState.stability + 10));
    gameState.morale = Math.max(0, Math.min(100, gameState.morale - 5));
    if (window.uiManager) window.uiManager.updateMetrics();
    console.log('🧪 Test complete - stability +10, morale -5');
};

// Force UI updates
window.forceUIUpdate = function() {
    console.log('🔧 Forcing all UI updates...');
    if (window.uiManager) {
        window.uiManager.updateEventProbabilities();
        window.uiManager.updateFactions();
        window.uiManager.updateCharacterProfile();
        console.log('✅ Force update complete');
    }
};

// Debug game state
window.debugState = function() {
    console.log('🔍 Current Game State:', {
        stability: gameState.stability,
        economy: gameState.economy,
        morale: gameState.morale,
        stress: gameState.stress,
        politicalCapital: gameState.politicalCapital,
        decisionsMade: gameState.decisionsMade,
        factions: gameState.factions
    });
};
*/