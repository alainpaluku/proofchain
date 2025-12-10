/**
 * PROOFCHAIN - Shared Package Index
 * Export all shared utilities, hooks, types, and services
 */

// Types
export * from './types';
export type { 
    InstitutionType, 
    KYCStatus, 
    DocumentStatus, 
    SubscriptionPlan as DBSubscriptionPlan,
    Institution as DBInstitution,
    Student,
    Document,
    Database
} from './types/database.types';

// Contexts
export { AppProvider, useApp } from './contexts/AppContext';

// Hooks
export { useAsync } from './hooks/useAsync';
export { useForm } from './hooks/useForm';
export { usePagination } from './hooks/usePagination';
export { useLocalStorage } from './hooks/useLocalStorage';
export { useDebounce } from './hooks/useDebounce';
export { useDebounceCallback } from './hooks/useDebounceCallback';
export { useMediaQuery, useIsMobile, useIsTablet, useIsDesktop, useIsDarkMode } from './hooks/useMediaQuery';

// Services
export { api } from './services/api';
export { diplomaService } from './services/diploma.service';
export { institutionService } from './services/institution.service';
export { statsService } from './services/stats.service';
export { documentService } from './services/document.service';
export { studentService } from './services/student.service';
export { issuerService } from './services/issuer.service';
export { adminService } from './services/admin.service';
export type { KYCPendingRequest } from './services/admin.service';

// Utils
export * from './utils/format';
export * from './utils/validation';

// Auth
export { AuthProvider, useAuth } from './components/AuthProvider';
export { AuthWrapper, type AuthWrapperProps } from './components/AuthWrapper';
export { 
    signUp, 
    signInWithEmail, 
    signOut, 
    resetPassword, 
    updatePassword,
    getCurrentUser,
    onAuthStateChange,
    isAdminEmail,
    ADMIN_EMAIL
} from './lib/auth';
export type { AuthUser, AuthError } from './lib/auth';

// Supabase
export { getSupabaseClient, supabase, isSupabaseConfigured, createServerSupabaseClient } from './lib/supabase';
