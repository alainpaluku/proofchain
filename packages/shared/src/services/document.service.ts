/**
 * PROOFCHAIN - Document Service
 * Service pour gérer les documents/diplômes avec Supabase
 * Les données complètes sont stockées dans Supabase, seul l'ID est sur la blockchain
 */

import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import type { Document, Student, Institution } from '../types/database.types';

export interface CreateDocumentData {
    studentId: string;
    degreeType: string;
    fieldOfStudy: string;
    issueDate: string;
    graduationDate: string;
    ipfsHash?: string;
    ipfsUrl?: string;
}

export interface DocumentWithDetails extends Document {
    student?: Student;
    institution?: Institution;
}

export const documentService = {
    /**
     * Créer un nouveau document (avant le minting)
     * Retourne le document_id qui sera utilisé dans les métadonnées NFT
     */
    async create(institutionId: string, data: CreateDocumentData): Promise<{ success: boolean; document?: Document; error?: string }> {
        if (!isSupabaseConfigured()) {
            return { success: false, error: 'Supabase non configuré' };
        }

        try {
            const supabase = getSupabaseClient();
            
            const { data: document, error } = await supabase
                .from('documents')
                .insert({
                    institution_id: institutionId,
                    student_id: data.studentId,
                    degree_type: data.degreeType,
                    field_of_study: data.fieldOfStudy,
                    issue_date: data.issueDate,
                    graduation_date: data.graduationDate,
                    ipfs_hash: data.ipfsHash || null,
                    ipfs_url: data.ipfsUrl || null,
                    status: 'draft',
                    document_code: '', // Auto-généré par trigger
                    document_id: '', // Auto-généré par trigger
                })
                .select()
                .single();

            if (error) throw error;

            return { success: true, document };
        } catch (error: any) {
            console.error('Erreur création document:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Mettre à jour le document après le minting réussi
     */
    async updateAfterMint(
        documentId: string, 
        mintData: { txHash: string; assetId: string; policyId: string; assetName: string }
    ): Promise<{ success: boolean; error?: string }> {
        if (!isSupabaseConfigured()) {
            return { success: false, error: 'Supabase non configuré' };
        }

        try {
            const supabase = getSupabaseClient();
            
            const { error } = await supabase
                .from('documents')
                .update({
                    tx_hash: mintData.txHash,
                    asset_id: mintData.assetId,
                    policy_id: mintData.policyId,
                    asset_name: mintData.assetName,
                    status: 'issued',
                })
                .eq('id', documentId);

            if (error) throw error;

            return { success: true };
        } catch (error: any) {
            console.error('Erreur mise à jour document:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Récupérer un document par son ID
     */
    async getById(id: string): Promise<{ success: boolean; document?: DocumentWithDetails; error?: string }> {
        if (!isSupabaseConfigured()) {
            return { success: false, error: 'Supabase non configuré' };
        }

        try {
            const supabase = getSupabaseClient();
            
            const { data, error } = await supabase
                .from('documents')
                .select(`
                    *,
                    student:students(*),
                    institution:institutions(*)
                `)
                .eq('id', id)
                .single();

            if (error) throw error;

            return { success: true, document: data as DocumentWithDetails };
        } catch (error: any) {
            console.error('Erreur récupération document:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Récupérer un document par son document_id (utilisé pour la vérification)
     */
    async getByDocumentId(documentId: string): Promise<{ success: boolean; document?: DocumentWithDetails; error?: string }> {
        if (!isSupabaseConfigured()) {
            return { success: false, error: 'Supabase non configuré' };
        }

        try {
            const supabase = getSupabaseClient();
            
            const { data, error } = await supabase
                .from('documents')
                .select(`
                    *,
                    student:students(*),
                    institution:institutions(*)
                `)
                .eq('document_id', documentId)
                .single();

            if (error) throw error;

            return { success: true, document: data as DocumentWithDetails };
        } catch (error: any) {
            console.error('Erreur récupération document:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Récupérer un document par son asset_id (blockchain)
     */
    async getByAssetId(assetId: string): Promise<{ success: boolean; document?: DocumentWithDetails; error?: string }> {
        if (!isSupabaseConfigured()) {
            return { success: false, error: 'Supabase non configuré' };
        }

        try {
            const supabase = getSupabaseClient();
            
            const { data, error } = await supabase
                .from('documents')
                .select(`
                    *,
                    student:students(*),
                    institution:institutions(*)
                `)
                .eq('asset_id', assetId)
                .single();

            if (error) throw error;

            return { success: true, document: data as DocumentWithDetails };
        } catch (error: any) {
            console.error('Erreur récupération document:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Récupérer tous les documents d'une institution
     */
    async getByInstitution(institutionId: string): Promise<{ success: boolean; documents?: DocumentWithDetails[]; error?: string }> {
        if (!isSupabaseConfigured()) {
            return { success: false, error: 'Supabase non configuré' };
        }

        try {
            const supabase = getSupabaseClient();
            
            const { data, error } = await supabase
                .from('documents')
                .select(`
                    *,
                    student:students(*)
                `)
                .eq('institution_id', institutionId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return { success: true, documents: data as DocumentWithDetails[] };
        } catch (error: any) {
            console.error('Erreur récupération documents:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Récupérer les statistiques des documents d'une institution
     */
    async getStats(institutionId: string): Promise<{ 
        success: boolean; 
        stats?: { total: number; issued: number; draft: number; revoked: number }; 
        error?: string 
    }> {
        if (!isSupabaseConfigured()) {
            return { success: false, error: 'Supabase non configuré' };
        }

        try {
            const supabase = getSupabaseClient();
            
            const { data, error } = await supabase
                .from('documents')
                .select('status')
                .eq('institution_id', institutionId);

            if (error) throw error;

            const docs = data as Array<{ status: string }> || [];
            const stats = {
                total: docs.length,
                issued: docs.filter(d => d.status === 'issued').length,
                draft: docs.filter(d => d.status === 'draft').length,
                revoked: docs.filter(d => d.status === 'revoked').length,
            };

            return { success: true, stats };
        } catch (error: any) {
            console.error('Erreur récupération stats:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Révoquer un document
     */
    async revoke(documentId: string, reason: string, revokedBy: string): Promise<{ success: boolean; error?: string }> {
        if (!isSupabaseConfigured()) {
            return { success: false, error: 'Supabase non configuré' };
        }

        try {
            const supabase = getSupabaseClient();
            
            const { error } = await supabase
                .from('documents')
                .update({
                    status: 'revoked',
                    revoked_at: new Date().toISOString(),
                    revoked_by: revokedBy,
                    revocation_reason: reason,
                })
                .eq('id', documentId);

            if (error) throw error;

            return { success: true };
        } catch (error: any) {
            console.error('Erreur révocation document:', error);
            return { success: false, error: error.message };
        }
    },
};
