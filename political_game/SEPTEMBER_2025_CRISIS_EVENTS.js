// ============================================================================
// SEPTEMBER 2025 REAL CRISIS EVENTS - FOR IMMEDIATE INTEGRATION
// ============================================================================

// These events can be directly added to your existing NEPALI_EVENTS array
// Same format, same structure - just focused on current real crisis

const SEPTEMBER_2025_CRISIS_EVENTS = [
    {
        id: "sushila_karki_appointment_crisis",
        title: {
            ne: "सुशीला कार्की अन्तरिम प्रधानमन्त्री नियुक्त",
            en: "Sushila Karki Appointed Interim PM"
        },
        description: {
            ne: "जेन जेड आन्दोलनले ओलीलाई राजीनामा दिन बाध्य पारेपछि, राष्ट्रपतिले पूर्व प्रधान न्यायाधीश सुशीला कार्कीलाई नेपालकी पहिलो महिला प्रधानमन्त्री बनाए। ५१ जनाको मृत्यु, संसद भवन जलेको, सेनाले काठमाडौं नियन्त्रणमा लिएको।",
            en: "After Gen Z movement forced Oli's resignation, President appoints former Chief Justice Sushila Karki as Nepal's first female PM. 51 dead, parliament burned, army controls Kathmandu."
        },
        type: "crisis",
        imageUrl: "https://images.unsplash.com/photo-1586715196006-cd2e4df15d18?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.25, // Very high priority current event
        realWorldEvent: true, // Flag for real current events
        eventDate: "2025-09-12",
        
        // Character-specific responses
        characterPerspectives: {
            sher_bahadur: {
                context: "आफ्नो ५ पटकको प्रधानमन्त्रीको अनुभवको साथ, तपाईं यो संवैधानिक संकटलाई कसरी हेर्नुहुन्छ?",
                bonus: 15 // Deuba gets bonus for experience with constitutional crises
            },
            prachanda: {
                context: "क्रान्तिकारी नेताको रूपमा, यो जनआन्दोलनले तपाईंलाई आफ्नो जनयुद्धको सम्झना दिलाउँछ।",
                bonus: 20 // Prachanda gets bonus for understanding mass movements
            },
            genz_student: {
                context: "तपाईंको पुस्ताले यो परिवर्तन ल्यायो! अब के गर्ने?",
                bonus: 25, // GenZ gets big bonus - this is their moment
                politicalActivationBoost: 30 // This event dramatically increases political awareness
            }
        },
        
        choices: [
            {
                text: {
                    ne: "सुशीला कार्कीलाई पूर्ण समर्थन दिनुहोस् - ऐतिहासिक क्षण",
                    en: "Give full support to Sushila Karki - historic moment"
                },
                outcome: {
                    ne: "महिला अधिकारकर्मी र प्रगतिशीलहरूले सराहना गरे। तर राजनीतिक दलहरू शङ्कास्पद।",
                    en: "Women's rights activists and progressives praise you. But political parties suspicious."
                },
                isConstitutional: true,
                characterBonuses: {
                    genz_student: 35, // Very high for supporting progressive change
                    clean_politician: 25,
                    prachanda: 15, // Some revolutionary spirit
                    sher_bahadur: 10 // Moderate support
                },
                effects: { 
                    stability: 10, morale: 20, stress: -5, 
                    youth: 30, civil_society: 25, media: 15,
                    congress: -5, military: -5
                }
            },
            {
                text: {
                    ne: "संवैधानिक प्रक्रियाको प्रश्न उठाउनुहोस् - सांसद नभएकी व्यक्ति कसरी PM?",
                    en: "Question constitutional process - how can non-MP become PM?"
                },
                outcome: {
                    ne: "कानुनी विशेषज्ञहरूले समर्थन गरे तर संकटलाई थप जटिल बनायो। विपक्षीले घेरा हाल्यो।",
                    en: "Legal experts support you but crisis becomes more complex. Opposition rallies around you."
                },
                isConstitutional: true, // Legitimate constitutional question
                characterBonuses: {
                    sher_bahadur: 30, // Deuba would know constitutional law well
                    clean_politician: 35, // Loves constitutional propriety  
                    prachanda: -5, // Would be more pragmatic
                    genz_student: -10 // Young people want change, not procedures
                },
                effects: { 
                    stability: -5, morale: -10, stress: 10,
                    judiciary: 20, congress: 15, international: 10,
                    youth: -20, civil_society: -10
                }
            },
            {
                text: {
                    ne: "जेन जेड आन्दोलनसँग सीधा संवाद स्थापना गर्नुहोस्",
                    en: "Establish direct dialogue with Gen Z movement"
                },
                outcome: {
                    ne: "युवाहरू उत्साहित भए तर पुराना राजनीतिज्ञहरूले कमजोरी देखाएको भने। जोखिमपूर्ण तर साहसिक।",
                    en: "Youth excited but old politicians say you show weakness. Risky but courageous."
                },
                isConstitutional: true,
                characterBonuses: {
                    genz_student: 40, // Perfect match for GenZ character
                    prachanda: 25, // Revolutionary would connect with mass movement
                    sher_bahadur: 5, // Deuba might do this but cautiously
                    clean_politician: 15 // Idealistic approach
                },
                effects: { 
                    stability: 5, morale: 25, stress: 15,
                    youth: 40, civil_society: 20, media: 10,
                    congress: -15, military: -10, business: -5
                }
            },
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय समुदायसँग स्थिरताको लागि सहयोग माग्नुहोस्",
                    en: "Seek international community help for stability"  
                },
                outcome: {
                    ne: "भारत र चीनले चासो देखाए तर यो हस्तक्षेप हो कि सहयोग भन्ने विवाद सुरु भयो।",
                    en: "India and China show interest but debate starts whether this is interference or help."
                },
                isConstitutional: true,
                characterBonuses: {
                    sher_bahadur: 35, // Deuba master of international relations
                    clean_politician: 10, // Somewhat idealistic but practical
                    prachanda: 5, // Suspicious of foreign involvement
                    genz_student: -5 // Youth want homegrown solutions
                },
                effects: { 
                    stability: 15, morale: -5, stress: 5,
                    international: 25, business: 15, congress: 10,
                    youth: -15, civil_society: -10
                }
            }
        ]
    },

    {
        id: "gen_z_demands_representation",
        title: {
            ne: "जेन जेडले सरकारमा प्रतिनिधित्वको माग",
            en: "Gen Z Demands Government Representation"
        },
        description: {
            ne: "आन्दोलनका नेताहरूले भने: 'हामीले सरकार ढाल्यौं, अब हाम्रो आवाज सुनिनुपर्छ।' तिनीहरूले मन्त्रिमण्डलमा कम्तीमा ३ जना युवा र डिजिटल मामिला मन्त्रालयको माग गरे।",
            en: "Movement leaders declare: 'We toppled government, now our voice must be heard.' They demand at least 3 youth in cabinet and Digital Affairs Ministry."
        },
        type: "political",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.18,
        realWorldEvent: true,
        eventDate: "2025-09-14",
        
        characterPerspectives: {
            genz_student: {
                context: "यो तपाईंको क्षण हो! युवाहरूले इतिहास बनाएका छन्।",
                bonus: 30
            },
            sher_bahadur: {
                context: "अनुभवी राजनीतिज्ञको रूपमा, तपाईं युवा र अनुभवको सन्तुलन कसरी मिलाउनुहुन्छ?",
                bonus: 10
            },
            prachanda: {
                context: "जनआन्दोलनका नेताहरूले सत्तामा साझेदारी चाहन्छन् - तपाईंको जस्तै।",
                bonus: 20
            }
        },
        
        choices: [
            {
                text: {
                    ne: "युवाहरूको मागलाई पूर्ण स्वीकार गर्नुहोस्",
                    en: "Fully accept youth demands"
                },
                outcome: {
                    ne: "युवाहरू खुशी तर अनुभवी राजनीतिज्ञहरूले चेतावनी दिए कि यो खतरनाक उदाहरण।",
                    en: "Youth happy but experienced politicians warn this sets dangerous precedent."
                },
                isConstitutional: true,
                characterBonuses: {
                    genz_student: 45, // Perfect alignment
                    prachanda: 20, // Supports power sharing with movements
                    clean_politician: 15, // Democratic inclusion
                    sher_bahadur: -10 // Too much too fast
                },
                effects: { 
                    stability: -5, morale: 30, stress: 20,
                    youth: 45, civil_society: 25, media: 20,
                    congress: -20, military: -15, business: -10
                }
            },
            {
                text: {
                    ne: "क्रमिक रूपमा युवा समावेशीकरणको योजना बनाउनुहोस्",
                    en: "Plan gradual youth inclusion"
                },
                outcome: {
                    ne: "व्यावहारिक दृष्टिकोण। युवाहरू निराश तर वयस्कहरूले बुद्धिमानी भने।",
                    en: "Practical approach. Youth disappointed but adults call it wise."
                },
                isConstitutional: true,
                characterBonuses: {
                    sher_bahadur: 35, // Perfect Deuba-style compromise
                    clean_politician: 25, // Systematic approach
                    prachanda: 15, // Somewhat strategic
                    genz_student: 5 // Better than nothing
                },
                effects: { 
                    stability: 10, morale: 10, stress: 5,
                    youth: 15, civil_society: 15, congress: 10,
                    military: 5, business: 5
                }
            },
            {
                text: {
                    ne: "युवाहरूलाई पहिले राजनीतिक प्रशिक्षण लिन भन्नुहोस्",
                    en: "Tell youth to get political training first"
                },
                outcome: {
                    ne: "अनुभवीहरूले सराहना गरे तर युवाहरू रिसाए। 'हामी सडकमा प्रशिक्षण पाइसक्यौं' भने।",
                    en: "Veterans approve but youth angry. 'We got training on the streets' they say."
                },
                isConstitutional: true,
                characterBonuses: {
                    sher_bahadur: 25, // Values experience
                    clean_politician: 20, // Believes in proper process
                    prachanda: -5, // Would be more inclusive of movements
                    genz_student: -25 // Completely against this
                },
                effects: { 
                    stability: 5, morale: -20, stress: 10,
                    youth: -30, civil_society: -15, media: -5,
                    congress: 15, military: 10, business: 10
                }
            },
            {
                text: {
                    ne: "डिजिटल मामिला मन्त्रालय स्थापना गर्नुहोस् तर अनुभवी मन्त्री राख्नुहोस्",
                    en: "Create Digital Affairs Ministry but with experienced minister"
                },
                outcome: {
                    ne: "चतुर समझौता! युवाहरूले विभाग पाए तर अनुभवीहरू सन्तुष्ट।",
                    en: "Clever compromise! Youth get department but veterans satisfied."
                },
                isConstitutional: true,
                characterBonuses: {
                    sher_bahadur: 40, // Master compromiser
                    clean_politician: 30, // Good governance innovation
                    prachanda: 25, // Smart political move
                    genz_student: 15 // Half satisfaction
                },
                effects: { 
                    stability: 15, morale: 20, stress: 5,
                    youth: 25, civil_society: 15, media: 20,
                    congress: 5, business: 15, international: 10
                }
            }
        ]
    },

    {
        id: "karki_first_week_challenges",
        title: {
            ne: "कार्कीको पहिलो हप्ताका चुनौतीहरू",
            en: "Karki's First Week Challenges"
        },
        description: {
            ne: "अन्तरिम प्रधानमन्त्री सुशीला कार्कीले संसदीय समर्थन जुटाउन संघर्ष गरिरहेकी छिन्। केही दलहरूले सहयोग गर्ने, केहीले शर्त राखेका छन्। युवाहरूले तत्काल सुधारको दबाब दिइरहेका छन्।",
            en: "Interim PM Sushila Karki struggles to gather parliamentary support. Some parties cooperate, others set conditions. Youth pressure for immediate reforms."
        },
        type: "political",
        imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=200&fit=crop&q=60",
        baseWeight: 0.20,
        realWorldEvent: true,
        eventDate: "2025-09-19",
        
        characterPerspectives: {
            sher_bahadur: {
                context: "तपाईंलाई संसदीय गणितको गहिरो ज्ञान छ। कार्कीलाई के सल्लाह दिनुहुन्छ?",
                bonus: 25
            },
            prachanda: {
                context: "शक्ति संघर्षको अनुभवी, तपाईं बुझ्नुहुन्छ कि समर्थन कसरी निर्माण गर्ने।",
                bonus: 20
            },
            clean_politician: {
                context: "एक सफा राजनीतिज्ञको रूपमा, तपाईं चाहनुहुन्छ कि कार्की सफल होस्।",
                bonus: 30
            }
        },
        
        choices: [
            {
                text: {
                    ne: "सबै दलहरूसँग तत्काल बैठक गरेर राष्ट्रिय सरकार प्रस्ताव गर्नुहोस्",
                    en: "Meet all parties immediately and propose national government"
                },
                outcome: {
                    ne: "महत्वाकांक्षी योजना! केही दलले स्वागत गरे, केहीले शंका गरे। राष्ट्रिय एकताको सम्भावना।",
                    en: "Ambitious plan! Some parties welcome, others suspicious. Possibility of national unity."
                },
                isConstitutional: true,
                characterBonuses: {
                    sher_bahadur: 40, // Perfect coalition-building approach
                    clean_politician: 35, // National interest focus
                    prachanda: 20, // Pragmatic power-sharing
                    genz_student: 10 // Wants action but okay with inclusion
                },
                effects: { 
                    stability: 20, morale: 15, stress: 15,
                    congress: 15, military: 10, business: 15,
                    international: 20, coalition_relations: 25
                }
            },
            {
                text: {
                    ne: "युवा मागहरूलाई प्राथमिकता दिएर सुधार एजेन्डा घोषणा गर्नुहोस्",
                    en: "Announce reform agenda prioritizing youth demands"
                },
                outcome: {
                    ne: "साहसी कदम! युवाहरू उत्साहित तर पारम्परिक दलहरूले चेतावनी दिए।",
                    en: "Bold step! Youth excited but traditional parties issue warnings."
                },
                isConstitutional: true,
                characterBonuses: {
                    genz_student: 40, // Exactly what youth want
                    prachanda: 25, // Revolutionary change approach
                    clean_politician: 20, // Reform-minded
                    sher_bahadur: 0 // Too risky for his taste
                },
                effects: { 
                    stability: -10, morale: 25, stress: 20,
                    youth: 35, civil_society: 25, media: 20,
                    congress: -15, military: -10, business: -5
                }
            },
            {
                text: {
                    ne: "संवैधानिक विशेषज्ञहरूसँग मिलेर कानुनी रूपरेखा तयार गर्नुहोस्",
                    en: "Work with constitutional experts to prepare legal framework"
                },
                outcome: {
                    ne: "कानुनी दृष्टिकोण। विशेषज्ञहरूले प्रशंसा गरे तर जनताले ढिलो प्रक्रिया भने।",
                    en: "Legal approach. Experts praise but public calls process slow."
                },
                isConstitutional: true,
                characterBonuses: {
                    clean_politician: 40, // Loves constitutional propriety
                    sher_bahadur: 30, // Appreciates legal foundation
                    prachanda: 10, // Would prefer faster action
                    genz_student: -5 // Impatient with slow process
                },
                effects: { 
                    stability: 15, morale: 5, stress: 5,
                    judiciary: 25, international: 15, congress: 10,
                    youth: -10, civil_society: 5
                }
            },
            {
                text: {
                    ne: "अन्तर्राष्ट्रिय सहयोग र आर्थिक स्थिरतामा फोकस गर्नुहोस्",
                    en: "Focus on international support and economic stability"
                },
                outcome: {
                    ne: "व्यावहारिक दृष्टिकोण। व्यापारीहरू खुशी तर युवाहरूले भने 'फेरि त्यही पुरानै राजनीति'।",
                    en: "Practical approach. Businesses happy but youth say 'same old politics again'."
                },
                isConstitutional: true,
                characterBonuses: {
                    sher_bahadur: 35, // Focuses on stability
                    clean_politician: 25, // Responsible governance
                    prachanda: 5, // Less inspiring approach
                    genz_student: -15 // Disappointing for youth
                },
                effects: { 
                    stability: 20, economy: 15, morale: -5, stress: 5,
                    business: 25, international: 20, congress: 15,
                    youth: -20, civil_society: -10
                }
            }
        ]
    }
];

// ============================================================================
// INTEGRATION INSTRUCTIONS
// ============================================================================

/*
TO ADD THESE EVENTS TO YOUR EXISTING GAME:

1. Copy the events from SEPTEMBER_2025_CRISIS_EVENTS array
2. Add them to your existing NEPALI_EVENTS array in optimized-game-engine.js
3. Events will automatically appear based on baseWeight and character modifiers
4. They use the same structure as your existing events - no code changes needed!

Example integration:
```javascript
const NEPALI_EVENTS = [
    // ... your existing events ...
    
    // Add the crisis events
    ...SEPTEMBER_2025_CRISIS_EVENTS,
    
    // ... rest of your events ...
];
```

These events will:
- Work with all your existing characters
- Use your existing scoring system  
- Show up based on character bonuses (GenZ gets more youth-related events)
- Provide constitutional education through isConstitutional flag
- Give realistic political consequences

The events are ordered chronologically:
1. Sushila Karki appointment (Sept 12)
2. Gen Z demands (Sept 14)  
3. Karki's first week challenges (Sept 19)

More events can be added as the real situation develops!
*/