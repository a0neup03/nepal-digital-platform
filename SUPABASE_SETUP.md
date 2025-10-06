# 🏛️ Nepal Office Tracker - Supabase Setup Guide

## 📋 Quick Setup (5 minutes)

### Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub/Google
4. Create new project:
   - **Name**: `nepal-office-tracker`
   - **Database Password**: Generate strong password
   - **Region**: Singapore (closest to Nepal)

### Step 2: Create Database Tables
1. Go to **SQL Editor** in Supabase dashboard
2. Copy and run this SQL:

```sql
-- Office experiences table
CREATE TABLE office_experiences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Location
    province VARCHAR(50) NOT NULL,
    district VARCHAR(100) NOT NULL,
    ward VARCHAR(10),
    
    -- Office details
    office_type VARCHAR(100) NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    
    -- Experience data
    wait_time_minutes INTEGER,
    mood VARCHAR(20),
    staff_rating INTEGER CHECK (staff_rating >= 1 AND staff_rating <= 5),
    process_rating INTEGER CHECK (process_rating >= 1 AND process_rating <= 5),
    
    -- Process issues
    bribe_asked BOOLEAN DEFAULT FALSE,
    dalaal_needed BOOLEAN DEFAULT FALSE,
    unnecessary_documents BOOLEAN DEFAULT FALSE,
    redundant_data_entry BOOLEAN DEFAULT FALSE,
    
    -- Security metadata
    ip_address INET NOT NULL,
    user_agent TEXT,
    submitted_at TIMESTAMP DEFAULT NOW(),
    form_completion_seconds INTEGER,
    fingerprint TEXT
);

-- User sessions for fraud prevention
CREATE TABLE user_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ip_address INET NOT NULL,
    fingerprint TEXT,
    first_visit TIMESTAMP DEFAULT NOW(),
    submission_count INTEGER DEFAULT 0,
    is_flagged BOOLEAN DEFAULT FALSE
);

-- Create indexes for performance
CREATE INDEX idx_office_location ON office_experiences(province, district);
CREATE INDEX idx_office_service ON office_experiences(office_type, service_type);
CREATE INDEX idx_ip_tracking ON user_sessions(ip_address);
CREATE INDEX idx_submission_time ON office_experiences(submitted_at);
```

### Step 3: Configure API Keys
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon (public) key**: `eyJhbGciOiJIUzI1...`

### Step 4: Update JavaScript
1. Open `office-tracker-db.js`
2. Replace these lines:
```javascript
this.supabaseUrl = 'YOUR_SUPABASE_URL'; // Replace with Project URL
this.supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // Replace with Anon key
```

### Step 5: Enable Row Level Security (RLS)
1. Go to **Authentication** → **Policies**
2. For `office_experiences` table, add policy:
   - **Policy name**: `Enable insert for everyone`
   - **Allowed operation**: INSERT
   - **Policy definition**: `true`

## 📊 View Your Data

### Database Dashboard
- Go to **Table Editor** to see submissions
- **SQL Editor** for custom queries
- **Real-time** for live data

### Useful Queries
```sql
-- View recent submissions
SELECT province, district, office_type, service_type, 
       staff_rating, process_rating, submitted_at
FROM office_experiences 
ORDER BY submitted_at DESC 
LIMIT 20;

-- Corruption indicators by district
SELECT district, 
       COUNT(*) as total_submissions,
       SUM(CASE WHEN bribe_asked THEN 1 ELSE 0 END) as bribe_count,
       SUM(CASE WHEN dalaal_needed THEN 1 ELSE 0 END) as dalaal_count
FROM office_experiences 
GROUP BY district
ORDER BY total_submissions DESC;

-- Average ratings by office type
SELECT office_type,
       COUNT(*) as submissions,
       ROUND(AVG(staff_rating), 2) as avg_staff_rating,
       ROUND(AVG(process_rating), 2) as avg_process_rating
FROM office_experiences 
WHERE staff_rating IS NOT NULL 
GROUP BY office_type
ORDER BY avg_process_rating ASC;
```

## 🔒 Security Features Enabled

✅ **IP Address Tracking** - Detect multiple submissions
✅ **Browser Fingerprinting** - Identify unique users  
✅ **Completion Time Tracking** - Detect bot behavior
✅ **Encrypted Data Storage** - All data encrypted at rest
✅ **HTTPS APIs** - Secure data transmission

## 📈 Free Tier Limits

- **Storage**: 500MB (≈ 250,000 office submissions)
- **Bandwidth**: 2GB/month
- **Realtime**: Up to 200 concurrent connections
- **API requests**: Unlimited

## 🔄 Migration Ready

When you need to migrate to PlanetScale:
1. Export data: `SELECT * FROM office_experiences`
2. Convert PostgreSQL → MySQL syntax (minimal changes)
3. Update API endpoints
4. Zero downtime migration possible

---

**🚀 Once setup is complete, your office tracker will:**
- Safely store all user submissions
- Track fraud/abuse automatically  
- Provide real-time analytics
- Be ready for thousands of users
- Have automatic backups

**Need help?** The integration is already built - just add your Supabase credentials!