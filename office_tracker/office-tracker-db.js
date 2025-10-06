// Office Tracker Database Integration
// Safe and secure data collection for Nepal Office Tracker

class OfficeTrackerDB {
    constructor() {
        // Supabase configuration - Load from external config file
        this.supabaseUrl = window.NEPAL_CONFIG?.supabaseUrl || 'YOUR_SUPABASE_URL';
        this.supabaseKey = window.NEPAL_CONFIG?.supabaseKey || 'YOUR_SUPABASE_ANON_KEY';
        this.apiUrl = `${this.supabaseUrl}/rest/v1`;
        
        // Generate browser fingerprint for fraud detection
        this.fingerprint = this.generateFingerprint();
        this.startTime = Date.now();
    }

    generateFingerprint() {
        // Create unique browser fingerprint
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Nepal Office Tracker', 2, 2);
        
        return btoa([
            navigator.userAgent,
            screen.width + 'x' + screen.height,
            new Date().getTimezoneOffset(),
            navigator.language,
            navigator.platform,
            canvas.toDataURL()
        ].join('|')).substring(0, 50);
    }

    async getUserIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.log('IP detection failed, using fallback');
            return 'unknown';
        }
    }

    async submitOfficeExperience(formData) {
        try {
            const submissionData = {
                // Location data
                province: formData.province,
                district: formData.district,
                ward: formData.ward || null,
                
                // Office details
                office_type: formData.officeType,
                service_types: JSON.stringify(formData.services), // Store as JSON array
                service_count: formData.services ? formData.services.length : 0,
                custom_service_description: formData.customServiceDescription || null, // Store custom "अन्य सेवा" description
                
                // Experience metrics
                wait_time_minutes: this.calculateWaitTime(),
                mood: formData.mood,
                staff_rating: formData.staffRating,
                process_rating: formData.processRating,
                
                // Process issues
                bribe_asked: formData.bribeAsked === 'yes',
                dalaal_needed: formData.dalaalNeeded === 'yes', 
                unnecessary_documents: formData.unnecessaryDocs === 'yes',
                redundant_data_entry: formData.redundantData === 'yes',
                
                // Security metadata
                ip_address: await this.getUserIP(),
                user_agent: navigator.userAgent,
                form_completion_seconds: Math.floor((Date.now() - this.startTime) / 1000),
                fingerprint: this.fingerprint
            };

            // Submit to Supabase
            const response = await fetch(`${this.apiUrl}/office_experiences`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`,
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(submissionData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Office experience submitted successfully:', result[0]?.id);
                
                // Track user session for fraud prevention
                await this.trackUserSession();
                
                return { success: true, id: result[0]?.id };
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

        } catch (error) {
            console.error('❌ Failed to submit office experience:', error);
            return { success: false, error: error.message };
        }
    }

    calculateWaitTime() {
        // Calculate from timer start to completion
        const totalSeconds = Math.floor((Date.now() - window.trackerStartTime) / 1000);
        return Math.max(1, Math.floor(totalSeconds / 60)); // Convert to minutes
    }

    async trackUserSession() {
        try {
            const sessionData = {
                ip_address: await this.getUserIP(),
                fingerprint: this.fingerprint
            };

            await fetch(`${this.apiUrl}/user_sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(sessionData)
            });

        } catch (error) {
            console.log('Session tracking failed (non-critical):', error.message);
        }
    }

    // Simple fraud detection
    validateSubmission(formData) {
        const errors = [];
        
        // Check completion time (too fast = suspicious)
        const completionTime = (Date.now() - this.startTime) / 1000;
        if (completionTime < 30) {
            errors.push('Form completed too quickly');
        }
        
        // Check required fields
        if (!formData.province || !formData.district || !formData.officeType || !formData.services || formData.services.length === 0) {
            errors.push('Missing required fields');
        }

        // Check if "अन्य सेवा" is selected but no custom description provided
        if (formData.services && formData.services.includes('other') && (!formData.customServiceDescription || formData.customServiceDescription.trim() === '')) {
            errors.push('अन्य सेवा छनोट गरेमा सेवाको विवरण आवश्यक छ');
        }
        
        // Check rating validity
        if (formData.staffRating && (formData.staffRating < 1 || formData.staffRating > 5)) {
            errors.push('Invalid staff rating');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

// Initialize database connector
window.officeDB = new OfficeTrackerDB();

// Success message for users
function showSubmissionSuccess(submissionId) {
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    successMessage.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div class="text-6xl mb-4">🙏</div>
            <h2 class="text-2xl font-bold text-gray-800 mb-4">धन्यवाद!</h2>
            <p class="text-gray-600 mb-6">
                तपाईंको अनुभव सफलतापूर्वक रेकर्ड भयो। 
                यसले नेपालका सरकारी सेवाहरू सुधार गर्न मद्दत गर्नेछ।
            </p>
            <div class="text-xs text-gray-400 mb-4">
                Submission ID: ${submissionId?.substring(0, 8)}...
            </div>
            <button onclick="this.closest('.fixed').remove(); window.location.href='index.html'" 
                    class="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
                मुख्य पृष्ठमा फर्कनुहोस्
            </button>
        </div>
    `;
    document.body.appendChild(successMessage);
}

console.log('🏛️ Office Tracker Database ready - Safe & Secure data collection enabled');