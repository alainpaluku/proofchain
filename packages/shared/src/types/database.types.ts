/**
 * PROOFCHAIN - Supabase Database Types
 * Types pour l'accès type-safe à la base de données
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type InstitutionType = 'UN' | 'IS' | 'LC' | 'CF';
export type KYCStatus = 'pending' | 'approved' | 'rejected' | 'incomplete';
export type DocumentStatus = 'draft' | 'issued' | 'revoked';
export type SubscriptionPlan = 'free' | 'basic' | 'premium' | 'enterprise';
export type CurrencyType = 'USD' | 'FC';

export interface Country {
    id: string;
    code: string;
    name: string;
    created_at: string | null;
}

export interface Institution {
    id: string;
    institution_code: string;
    name: string;
    email: string;
    email_verified: boolean | null;
    type: InstitutionType;
    country_id: string | null;
    country_code: string;
    website: string | null;
    phone: string | null;
    address: string | null;
    tax_id: string | null;
    registration_number: string | null;
    kyc_status: KYCStatus | null;
    kyc_submitted_at: string | null;
    kyc_reviewed_at: string | null;
    kyc_reviewed_by: string | null;
    kyc_rejection_reason: string | null;
    legal_docs_url: string | null;
    accreditation_url: string | null;
    tax_certificate_url: string | null;
    ministerial_decree_url: string | null;
    subscription_plan: SubscriptionPlan | null;
    subscription_currency: CurrencyType | null;
    subscription_starts_at: string | null;
    subscription_ends_at: string | null;
    documents_issued: number | null;
    students_count: number | null;
    created_at: string | null;
    updated_at: string | null;
    created_by: string | null;
}


export interface Student {
    id: string;
    institution_id: string;
    full_name: string;
    email: string | null;
    phone: string | null;
    student_number: string;
    program: string | null;
    field_of_study: string | null;
    enrollment_date: string | null;
    status: string | null;
    documents_issued: number | null;
    created_at: string | null;
    updated_at: string | null;
    created_by: string | null;
}

export interface Document {
    id: string;
    document_code: string;
    document_id: string;
    institution_id: string;
    student_id: string;
    degree_type: string;
    field_of_study: string;
    issue_date: string;
    graduation_date: string;
    tx_hash: string | null;
    asset_id: string | null;
    policy_id: string | null;
    asset_name: string | null;
    ipfs_hash: string | null;
    ipfs_url: string | null;
    status: DocumentStatus | null;
    revoked_at: string | null;
    revoked_by: string | null;
    revocation_reason: string | null;
    created_at: string | null;
    updated_at: string | null;
    created_by: string | null;
}

export interface VerificationLog {
    id: string;
    document_id: string | null;
    document_code: string | null;
    verified: boolean;
    verification_method: string | null;
    ip_address: unknown;
    user_agent: string | null;
    country: string | null;
    verified_at: string | null;
}

export interface ImportLog {
    id: string;
    institution_id: string;
    file_name: string;
    file_size: number | null;
    total_rows: number;
    successful_rows: number | null;
    failed_rows: number | null;
    errors: Json | null;
    imported_at: string | null;
    imported_by: string | null;
}

export interface SubscriptionPlanData {
    id: string;
    plan_name: SubscriptionPlan;
    price_usd: number;
    price_fc: number;
    max_documents: number | null;
    max_students: number | null;
    features: Json | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface AdminLog {
    id: string;
    admin_id: string;
    action: string;
    target_type: string | null;
    target_id: string | null;
    details: Json | null;
    created_at: string | null;
}

// Types utilitaires pour les opérations CRUD
type InsertType<T> = Partial<T> & { [K in keyof T]?: T[K] };
type UpdateType<T> = Partial<T>;

// Database schema type compatible avec Supabase
export interface Database {
    public: {
        Tables: {
            countries: {
                Row: Country;
                Insert: InsertType<Country>;
                Update: UpdateType<Country>;
            };
            institutions: {
                Row: Institution;
                Insert: InsertType<Institution>;
                Update: UpdateType<Institution>;
            };
            students: {
                Row: Student;
                Insert: InsertType<Student>;
                Update: UpdateType<Student>;
            };
            documents: {
                Row: Document;
                Insert: InsertType<Document>;
                Update: UpdateType<Document>;
            };
            verification_logs: {
                Row: VerificationLog;
                Insert: InsertType<VerificationLog>;
                Update: UpdateType<VerificationLog>;
            };
            import_logs: {
                Row: ImportLog;
                Insert: InsertType<ImportLog>;
                Update: UpdateType<ImportLog>;
            };
            subscription_plans: {
                Row: SubscriptionPlanData;
                Insert: InsertType<SubscriptionPlanData>;
                Update: UpdateType<SubscriptionPlanData>;
            };
            admin_logs: {
                Row: AdminLog;
                Insert: InsertType<AdminLog>;
                Update: UpdateType<AdminLog>;
            };
        };
        Enums: {
            currency_type: CurrencyType;
            document_status: DocumentStatus;
            institution_type: InstitutionType;
            kyc_status: KYCStatus;
            subscription_plan: SubscriptionPlan;
        };
        Functions: {
            generate_document_code: { Args: Record<string, never>; Returns: string };
            generate_document_id: {
                Args: {
                    p_country_code: string;
                    p_document_code: string;
                    p_institution_code: string;
                    p_institution_type: InstitutionType;
                    p_issue_date: string;
                };
                Returns: string;
            };
            generate_institution_code: { Args: Record<string, never>; Returns: string };
            get_user_institution: { Args: { user_id: string }; Returns: string };
            is_admin: { Args: { user_id: string }; Returns: boolean };
        };
    };
}
