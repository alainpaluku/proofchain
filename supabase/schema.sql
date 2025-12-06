-- PROOFCHAIN Database Schema
-- Supabase PostgreSQL Schema for Academic Document Verification Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE institution_type AS ENUM ('UN', 'IS', 'LC', 'CF');
CREATE TYPE kyc_status AS ENUM ('pending', 'approved', 'rejected', 'incomplete');
CREATE TYPE document_status AS ENUM ('draft', 'issued', 'revoked');
CREATE TYPE subscription_plan AS ENUM ('free', 'basic', 'premium', 'enterprise');
CREATE TYPE currency_type AS ENUM ('USD', 'FC');

-- ============================================================================
-- TABLES
-- ============================================================================

-- Countries table
CREATE TABLE countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(2) NOT NULL UNIQUE, -- CD, US, FR, etc.
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Institutions table
CREATE TABLE institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Unique identifier (4 chars base36: 0-9, A-Z)
    institution_code VARCHAR(4) NOT NULL UNIQUE,
    
    -- Basic info
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified BOOLEAN DEFAULT FALSE,
    
    -- Institution type
    type institution_type NOT NULL,
    
    -- Country
    country_id UUID REFERENCES countries(id),
    country_code VARCHAR(2) NOT NULL,
    
    -- Contact details
    website VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    
    -- Legal info
    tax_id VARCHAR(100),
    registration_number VARCHAR(100),
    
    -- KYC
    kyc_status kyc_status DEFAULT 'incomplete',
    kyc_submitted_at TIMESTAMPTZ,
    kyc_reviewed_at TIMESTAMPTZ,
    kyc_reviewed_by UUID REFERENCES auth.users(id),
    kyc_rejection_reason TEXT,
    
    -- Documents (stored in Supabase Storage)
    legal_docs_url TEXT,
    accreditation_url TEXT,
    tax_certificate_url TEXT,
    ministerial_decree_url TEXT,
    
    -- Subscription
    subscription_plan subscription_plan DEFAULT 'free',
    subscription_currency currency_type DEFAULT 'USD',
    subscription_starts_at TIMESTAMPTZ,
    subscription_ends_at TIMESTAMPTZ,
    
    -- Stats
    documents_issued INTEGER DEFAULT 0,
    students_count INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Students table
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Institution relationship
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    
    -- Student info
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    
    -- Student ID (internal to institution)
    student_number VARCHAR(100) NOT NULL,
    
    -- Program info
    program VARCHAR(255),
    field_of_study VARCHAR(255),
    enrollment_date DATE,
    
    -- Status
    status VARCHAR(50) DEFAULT 'active', -- active, graduated, suspended
    
    -- Stats
    documents_issued INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    
    -- Unique constraint: one student number per institution
    UNIQUE(institution_id, student_number)
);

-- Documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Unique document identifier (8 chars base36)
    document_code VARCHAR(8) NOT NULL UNIQUE,
    
    -- Full document ID: CD-UN-000E-02032024-0000A00
    document_id VARCHAR(50) NOT NULL UNIQUE,
    
    -- Relationships
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    
    -- Document type
    degree_type VARCHAR(100) NOT NULL, -- Bachelor, Master, PhD, Certificate, etc.
    field_of_study VARCHAR(255) NOT NULL,
    
    -- Dates
    issue_date DATE NOT NULL,
    graduation_date DATE NOT NULL,
    
    -- Blockchain info
    tx_hash VARCHAR(255), -- Cardano transaction hash
    asset_id VARCHAR(255), -- Cardano asset ID (policyId + assetName)
    policy_id VARCHAR(255),
    asset_name VARCHAR(255),
    
    -- IPFS
    ipfs_hash VARCHAR(255), -- Document image on IPFS
    ipfs_url TEXT,
    
    -- Status
    status document_status DEFAULT 'draft',
    revoked_at TIMESTAMPTZ,
    revoked_by UUID REFERENCES auth.users(id),
    revocation_reason TEXT,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Document verification logs
CREATE TABLE verification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
    document_code VARCHAR(50),
    
    -- Verification result
    verified BOOLEAN NOT NULL,
    verification_method VARCHAR(50), -- qr_code, manual_search, api
    
    -- IP and location (optional)
    ip_address INET,
    user_agent TEXT,
    country VARCHAR(2),
    
    -- Metadata
    verified_at TIMESTAMPTZ DEFAULT NOW()
);

-- CSV Import logs
CREATE TABLE import_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    
    -- File info
    file_name VARCHAR(255) NOT NULL,
    file_size INTEGER,
    
    -- Import results
    total_rows INTEGER NOT NULL,
    successful_rows INTEGER DEFAULT 0,
    failed_rows INTEGER DEFAULT 0,
    errors JSONB, -- Array of error messages
    
    -- Metadata
    imported_at TIMESTAMPTZ DEFAULT NOW(),
    imported_by UUID REFERENCES auth.users(id)
);

-- Subscription plans (admin managed)
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    plan_name subscription_plan NOT NULL UNIQUE,
    
    -- Pricing
    price_usd DECIMAL(10, 2) NOT NULL,
    price_fc DECIMAL(10, 2) NOT NULL,
    
    -- Limits
    max_documents INTEGER, -- NULL = unlimited
    max_students INTEGER,
    
    -- Features
    features JSONB,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin activity logs
CREATE TABLE admin_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    admin_id UUID NOT NULL REFERENCES auth.users(id),
    
    action VARCHAR(100) NOT NULL, -- kyc_approved, kyc_rejected, institution_suspended, etc.
    target_type VARCHAR(50), -- institution, document, user
    target_id UUID,
    
    details JSONB,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_institutions_code ON institutions(institution_code);
CREATE INDEX idx_institutions_email ON institutions(email);
CREATE INDEX idx_institutions_kyc_status ON institutions(kyc_status);
CREATE INDEX idx_institutions_country ON institutions(country_code);

CREATE INDEX idx_students_institution ON students(institution_id);
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_number ON students(student_number);

CREATE INDEX idx_documents_code ON documents(document_code);
CREATE INDEX idx_documents_id ON documents(document_id);
CREATE INDEX idx_documents_institution ON documents(institution_id);
CREATE INDEX idx_documents_student ON documents(student_id);
CREATE INDEX idx_documents_asset_id ON documents(asset_id);
CREATE INDEX idx_documents_status ON documents(status);

CREATE INDEX idx_verification_logs_document ON verification_logs(document_id);
CREATE INDEX idx_verification_logs_date ON verification_logs(verified_at);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Generate unique institution code (4 chars base36)
CREATE OR REPLACE FUNCTION generate_institution_code()
RETURNS VARCHAR(4) AS $$
DECLARE
    chars TEXT := '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    result VARCHAR(4) := '';
    i INTEGER;
BEGIN
    FOR i IN 1..4 LOOP
        result := result || substr(chars, floor(random() * 36 + 1)::int, 1);
    END LOOP;
    
    -- Check if exists, regenerate if needed
    WHILE EXISTS (SELECT 1 FROM institutions WHERE institution_code = result) LOOP
        result := '';
        FOR i IN 1..4 LOOP
            result := result || substr(chars, floor(random() * 36 + 1)::int, 1);
        END LOOP;
    END LOOP;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Generate unique document code (8 chars base36)
CREATE OR REPLACE FUNCTION generate_document_code()
RETURNS VARCHAR(8) AS $$
DECLARE
    chars TEXT := '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    result VARCHAR(8) := '';
    i INTEGER;
BEGIN
    FOR i IN 1..8 LOOP
        result := result || substr(chars, floor(random() * 36 + 1)::int, 1);
    END LOOP;
    
    -- Check if exists, regenerate if needed
    WHILE EXISTS (SELECT 1 FROM documents WHERE document_code = result) LOOP
        result := '';
        FOR i IN 1..8 LOOP
            result := result || substr(chars, floor(random() * 36 + 1)::int, 1);
        END LOOP;
    END LOOP;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Generate full document ID
CREATE OR REPLACE FUNCTION generate_document_id(
    p_country_code VARCHAR(2),
    p_institution_type institution_type,
    p_institution_code VARCHAR(4),
    p_issue_date DATE,
    p_document_code VARCHAR(8)
)
RETURNS VARCHAR(50) AS $$
BEGIN
    -- Format: CD-UN-000E-02032024-0000A00
    RETURN CONCAT(
        p_country_code, '-',
        p_institution_type::TEXT, '-',
        p_institution_code, '-',
        TO_CHAR(p_issue_date, 'DDMMYYYY'), '-',
        p_document_code
    );
END;
$$ LANGUAGE plpgsql;

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update updated_at
CREATE TRIGGER institutions_updated_at BEFORE UPDATE ON institutions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER documents_updated_at BEFORE UPDATE ON documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-generate institution code
CREATE OR REPLACE FUNCTION auto_generate_institution_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.institution_code IS NULL OR NEW.institution_code = '' THEN
        NEW.institution_code := generate_institution_code();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER institutions_auto_code BEFORE INSERT ON institutions
    FOR EACH ROW EXECUTE FUNCTION auto_generate_institution_code();

-- Auto-generate document code and ID
CREATE OR REPLACE FUNCTION auto_generate_document_codes()
RETURNS TRIGGER AS $$
DECLARE
    inst RECORD;
BEGIN
    -- Get institution details
    SELECT country_code, type, institution_code 
    INTO inst
    FROM institutions 
    WHERE id = NEW.institution_id;
    
    -- Generate document code if not provided
    IF NEW.document_code IS NULL OR NEW.document_code = '' THEN
        NEW.document_code := generate_document_code();
    END IF;
    
    -- Generate full document ID
    NEW.document_id := generate_document_id(
        inst.country_code,
        inst.type,
        inst.institution_code,
        NEW.issue_date,
        NEW.document_code
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER documents_auto_codes BEFORE INSERT ON documents
    FOR EACH ROW EXECUTE FUNCTION auto_generate_document_codes();

-- Update institution stats on document insert
CREATE OR REPLACE FUNCTION update_institution_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE institutions 
        SET documents_issued = documents_issued + 1
        WHERE id = NEW.institution_id;
        
        UPDATE students
        SET documents_issued = documents_issued + 1
        WHERE id = NEW.student_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER documents_update_stats AFTER INSERT ON documents
    FOR EACH ROW EXECUTE FUNCTION update_institution_stats();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE import_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = user_id
        AND raw_user_meta_data->>'role' = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get user's institution
CREATE OR REPLACE FUNCTION get_user_institution(user_id UUID)
RETURNS UUID AS $$
BEGIN
    RETURN (
        SELECT id FROM institutions
        WHERE created_by = user_id
        LIMIT 1
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Institutions policies
CREATE POLICY "Admins can view all institutions"
    ON institutions FOR SELECT
    USING (is_admin(auth.uid()));

CREATE POLICY "Users can view their own institution"
    ON institutions FOR SELECT
    USING (created_by = auth.uid());

CREATE POLICY "Users can update their own institution"
    ON institutions FOR UPDATE
    USING (created_by = auth.uid());

CREATE POLICY "Authenticated users can create institutions"
    ON institutions FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Students policies
CREATE POLICY "Admins can view all students"
    ON students FOR SELECT
    USING (is_admin(auth.uid()));

CREATE POLICY "Institutions can view their students"
    ON students FOR SELECT
    USING (institution_id = get_user_institution(auth.uid()));

CREATE POLICY "Institutions can manage their students"
    ON students FOR ALL
    USING (institution_id = get_user_institution(auth.uid()));

-- Documents policies
CREATE POLICY "Anyone can view issued documents"
    ON documents FOR SELECT
    USING (status = 'issued');

CREATE POLICY "Admins can view all documents"
    ON documents FOR SELECT
    USING (is_admin(auth.uid()));

CREATE POLICY "Institutions can view their documents"
    ON documents FOR SELECT
    USING (institution_id = get_user_institution(auth.uid()));

CREATE POLICY "Institutions can create documents"
    ON documents FOR INSERT
    WITH CHECK (
        institution_id = get_user_institution(auth.uid())
        AND EXISTS (
            SELECT 1 FROM institutions
            WHERE id = institution_id
            AND kyc_status = 'approved'
        )
    );

CREATE POLICY "Institutions can update their documents"
    ON documents FOR UPDATE
    USING (institution_id = get_user_institution(auth.uid()));

-- Verification logs policies
CREATE POLICY "Anyone can create verification logs"
    ON verification_logs FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins can view all verification logs"
    ON verification_logs FOR SELECT
    USING (is_admin(auth.uid()));

-- Import logs policies
CREATE POLICY "Institutions can view their import logs"
    ON import_logs FOR SELECT
    USING (institution_id = get_user_institution(auth.uid()));

CREATE POLICY "Institutions can create import logs"
    ON import_logs FOR INSERT
    WITH CHECK (institution_id = get_user_institution(auth.uid()));

-- Admin logs policies
CREATE POLICY "Only admins can view admin logs"
    ON admin_logs FOR SELECT
    USING (is_admin(auth.uid()));

CREATE POLICY "Only admins can create admin logs"
    ON admin_logs FOR INSERT
    WITH CHECK (is_admin(auth.uid()));

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Insert countries
INSERT INTO countries (code, name) VALUES
    ('CD', 'République Démocratique du Congo'),
    ('US', 'United States'),
    ('FR', 'France'),
    ('BE', 'Belgium'),
    ('CA', 'Canada')
ON CONFLICT (code) DO NOTHING;

-- Insert subscription plans
INSERT INTO subscription_plans (plan_name, price_usd, price_fc, max_documents, max_students, features) VALUES
    ('free', 0, 0, 10, 50, '{"support": "community", "api_access": false}'::jsonb),
    ('basic', 29.99, 75000, 100, 500, '{"support": "email", "api_access": true}'::jsonb),
    ('premium', 99.99, 250000, 1000, 5000, '{"support": "priority", "api_access": true, "custom_branding": true}'::jsonb),
    ('enterprise', 299.99, 750000, NULL, NULL, '{"support": "24/7", "api_access": true, "custom_branding": true, "dedicated_account": true}'::jsonb)
ON CONFLICT (plan_name) DO NOTHING;
