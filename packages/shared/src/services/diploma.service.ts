/**
 * PROOFCHAIN - Diploma Service
 * Service pour gérer les diplômes
 */

import { api } from './api';
import type { Diploma, ApiResponse, PaginatedResponse } from '../types';

export const diplomaService = {
    /**
     * Récupérer tous les diplômes
     */
    async getAll(page: number = 1, pageSize: number = 10): Promise<ApiResponse<PaginatedResponse<Diploma>>> {
        return api.get(`/diplomas?page=${page}&pageSize=${pageSize}`);
    },

    /**
     * Récupérer un diplôme par ID
     */
    async getById(id: string): Promise<ApiResponse<Diploma>> {
        return api.get(`/diplomas/${id}`);
    },

    /**
     * Récupérer un diplôme par Asset ID
     */
    async getByAssetId(assetId: string): Promise<ApiResponse<Diploma>> {
        return api.get(`/diplomas/asset/${assetId}`);
    },

    /**
     * Créer un nouveau diplôme
     */
    async create(data: Partial<Diploma>): Promise<ApiResponse<Diploma>> {
        return api.post('/diplomas', data);
    },

    /**
     * Mettre à jour un diplôme
     */
    async update(id: string, data: Partial<Diploma>): Promise<ApiResponse<Diploma>> {
        return api.put(`/diplomas/${id}`, data);
    },

    /**
     * Supprimer un diplôme
     */
    async delete(id: string): Promise<ApiResponse<void>> {
        return api.delete(`/diplomas/${id}`);
    },

    /**
     * Vérifier un diplôme
     */
    async verify(assetId: string): Promise<ApiResponse<{ valid: boolean; diploma?: Diploma }>> {
        return api.post('/diplomas/verify', { assetId });
    },

    /**
     * Récupérer les diplômes d'une institution
     */
    async getByInstitution(institutionId: string): Promise<ApiResponse<Diploma[]>> {
        return api.get(`/institutions/${institutionId}/diplomas`);
    },

    /**
     * Récupérer les diplômes d'un étudiant
     */
    async getByStudent(studentId: string): Promise<ApiResponse<Diploma[]>> {
        return api.get(`/students/${studentId}/diplomas`);
    },
};
