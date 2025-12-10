/**
 * PROOFCHAIN - Admin Service
 * Service pour les opérations administratives (validation KYC, etc.)
 */

import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import type { Institution, KYCStatus } from '../types/database.types';

// Types
export interface KYCPendingRequest {
    id: string;
    institutionCode: string;
    name: string;
    email: string;
    phone: string | null;
    website: string | null;
    type: string;
    countryCode: string;
    address: string | null;
    taxId: string | null;
    registrationNumber: string | null;
    kycSubmittedAt: string | null;
    documents: {
        legalDocs: string | null;
        accreditation: string | null;
        taxCertificate: string | null;
        ministerialDecree: string | null;
    };
}

interface ServiceResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

interface AdminStats {
    totalInstitutions: number;
    pendingKYC: number;
    approvedKYC: number;
    rejectedKYC: number;
    totalDocuments: number;
    totalStudents: number;
}

// Helper functions
const checkSupabase = (): ServiceResponse<never> | null => {
    if (!isSupabaseConfigured()) {
        return { success: false, error: 'Supabase non configuré' };
    }
    return null;
};

const handleError = (error: unknown, context: string): ServiceResponse<never> => {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    console.error(`Erreur ${context}:`, error);
    return { success: false, error: message };
};

const mapInstitutionToKYCRequest = (inst: Institution): KYCPendingRequest => ({
    id: inst.id,
    institutionCode: inst.institution_code,
    name: inst.name,
    email: inst.email,
    phone: inst.phone,
    website: inst.website,
    type: inst.type,
    countryCode: inst.country_code,
    address: inst.address,
    taxId: inst.tax_id,
    registrationNumber: inst.registration_number,
    kycSubmittedAt: inst.kyc_submitted_at,
    documents: {
        legalDocs: inst.legal_docs_url,
        accreditation: inst.accreditation_url,
        taxCertificate: inst.tax_certificate_url,
        ministerialDecree: inst.ministerial_decree_url,
    },
});

// Service
export const adminService = {
    async getPendingKYCRequests(): Promise<ServiceResponse<KYCPendingRequest[]>> {
        const configError = checkSupabase();
        if (configError) return configError;

        try {
            const supabase = getSupabaseClient();
            const { data, error } = await supabase
                .from('institutions')
                .select('*')
                .eq('kyc_status', 'pending')
                .order('kyc_submitted_at', { ascending: true });

            if (error) throw error;
            return { success: true, data: (data || []).map(mapInstitutionToKYCRequest) };
        } catch (error) {
            return handleError(error, 'récupération demandes KYC');
        }
    },

    async getAllInstitutions(filters?: { 
        kycStatus?: KYCStatus; 
        countryCode?: string;
        type?: string;
    }): Promise<ServiceResponse<Institution[]>> {
        const configError = checkSupabase();
        if (configError) return configError;

        try {
            const supabase = getSupabaseClient();
            let query = supabase
                .from('institutions')
                .select('*')
                .order('created_at', { ascending: false });

            if (filters?.kycStatus) query = query.eq('kyc_status', filters.kycStatus);
            if (filters?.countryCode) query = query.eq('country_code', filters.countryCode);
            if (filters?.type) query = query.eq('type', filters.type);

            const { data, error } = await query;
            if (error) throw error;
            return { success: true, data: data || [] };
        } catch (error) {
            return handleError(error, 'récupération institutions');
        }
    },

    async updateKYCStatus(
        institutionId: string, 
        status: 'approved' | 'rejected', 
        reason?: string
    ): Promise<ServiceResponse<Institution>> {
        const configError = checkSupabase();
        if (configError) return configError;

        try {
            const supabase = getSupabaseClient();
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                return { success: false, error: 'Admin non connecté' };
            }

            const updatePayload = {
                kyc_status: status,
                kyc_reviewed_at: new Date().toISOString(),
                kyc_reviewed_by: user.id,
                kyc_rejection_reason: status === 'rejected' ? reason : null,
            };

            const { data, error } = await supabase
                .from('institutions')
                .update(updatePayload)
                .eq('id', institutionId)
                .select()
                .single();

            if (error) throw error;

            // Log admin action
            await supabase.from('admin_logs').insert({
                admin_id: user.id,
                action: `kyc_${status}`,
                target_type: 'institution',
                target_id: institutionId,
                details: { 
                    institution_name: data?.name,
                    ...(reason && { reason })
                },
            });

            return { success: true, data };
        } catch (error) {
            return handleError(error, `${status === 'approved' ? 'approbation' : 'rejet'} KYC`);
        }
    },

    async approveKYC(institutionId: string): Promise<ServiceResponse<Institution>> {
        return this.updateKYCStatus(institutionId, 'approved');
    },

    async rejectKYC(institutionId: string, reason: string): Promise<ServiceResponse<Institution>> {
        return this.updateKYCStatus(institutionId, 'rejected', reason);
    },

    async getCountries(): Promise<ServiceResponse<Array<{ code: string; name: string }>>> {
        const configError = checkSupabase();
        if (configError) return configError;

        try {
            const supabase = getSupabaseClient();
            const { data, error } = await supabase
                .from('countries')
                .select('code, name')
                .order('name');

            if (error) throw error;
            return { success: true, data: data || [] };
        } catch (error) {
            return handleError(error, 'récupération pays');
        }
    },

    async getAdminStats(): Promise<ServiceResponse<AdminStats>> {
        const configError = checkSupabase();
        if (configError) return configError;

        try {
            const supabase = getSupabaseClient();
            
            const countQuery = async (table: string, filter?: { column: string; value: string }) => {
                let query = supabase.from(table).select('*', { count: 'exact', head: true });
                if (filter) query = query.eq(filter.column, filter.value);
                const { count } = await query;
                return count || 0;
            };

            const [totalInstitutions, pendingKYC, approvedKYC, rejectedKYC, totalDocuments, totalStudents] = 
                await Promise.all([
                    countQuery('institutions'),
                    countQuery('institutions', { column: 'kyc_status', value: 'pending' }),
                    countQuery('institutions', { column: 'kyc_status', value: 'approved' }),
                    countQuery('institutions', { column: 'kyc_status', value: 'rejected' }),
                    countQuery('documents'),
                    countQuery('students'),
                ]);

            return { 
                success: true, 
                data: { totalInstitutions, pendingKYC, approvedKYC, rejectedKYC, totalDocuments, totalStudents }
            };
        } catch (error) {
            return handleError(error, 'récupération stats admin');
        }
    },
};
