/**
 * PROOFCHAIN - Shared Types
 * Types communs à toutes les applications
 */

// User & Auth
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'issuer' | 'verifier';
    institutionId?: string;
    createdAt: Date;
}

// Institution
export interface Institution {
    id: string;
    name: string;
    email: string;
    phone: string;
    website: string;
    country: string;
    address: string;
    logo?: string;
    status: 'pending' | 'approved' | 'rejected' | 'suspended';
    kycStatus: 'pending' | 'approved' | 'rejected';
    subscriptionPlan: 'free' | 'basic' | 'premium' | 'enterprise';
    createdAt: Date;
}

// Diploma/Credential
export interface Diploma {
    id: string;
    assetId: string;
    policyId: string;
    studentName: string;
    studentId: string;
    degree: string;
    field: string;
    institutionId: string;
    institutionName: string;
    issueDate: Date;
    graduationDate: Date;
    ipfsHash: string;
    txHash: string;
    verified: boolean;
    metadata: DiplomaMetadata;
}

export interface DiplomaMetadata {
    name: string;
    image: string;
    description: string;
    student: string;
    degree: string;
    institution: string;
    date: string;
    [key: string]: any;
}

// Subscription
export interface SubscriptionPlan {
    id: string;
    name: string;
    priceUSD: number;
    priceCDF: number;
    features: string[];
    maxDiplomas: number;
    maxStudents: number;
    support: 'email' | 'priority' | '24/7';
}

// KYC Request
export interface KYCRequest {
    id: string;
    institutionId: string;
    institutionName: string;
    documents: KYCDocument[];
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: Date;
    reviewedAt?: Date;
    reviewedBy?: string;
    notes?: string;
}

export interface KYCDocument {
    type: 'registration' | 'tax' | 'address' | 'identity';
    url: string;
    name: string;
}

// Notification
export interface Notification {
    id: string;
    type: 'success' | 'warning' | 'error' | 'info';
    title: string;
    message: string;
    read: boolean;
    createdAt: Date;
    actionUrl?: string;
}

// Statistics
export interface Stats {
    totalDiplomas: number;
    totalStudents: number;
    totalInstitutions: number;
    totalVerifications: number;
    monthlyRevenue: number;
    pendingKYC: number;
}

// API Response
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// Form State
export interface FormState<T> {
    data: T;
    errors: Partial<Record<keyof T, string>>;
    isSubmitting: boolean;
    isValid: boolean;
}
