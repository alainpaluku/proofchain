/**
 * PROOFCHAIN - Institution Service
 * Service pour gérer les institutions
 */

import { api } from './api';
import type { Institution, ApiResponse, PaginatedResponse } from '../types';

export const institutionService = {
    /**
     * Récupérer toutes les institutions
     */
    async getAll(page: number = 1, pageSize: number = 10): Promise<ApiResponse<PaginatedResponse<Institution>>> {
        return api.get(`/institutions?page=${page}&pageSize=${pageSize}`);
    },

    /**
     * Récupérer une institution par ID
     */
    async getById(id: string): Promise<ApiResponse<Institution>> {
        return api.get(`/institutions/${id}`);
    },

    /**
     * Créer une nouvelle institution
     */
    async create(data: Partial<Institution>): Promise<ApiResponse<Institution>> {
        return api.post('/institutions', data);
    },

    /**
     * Mettre à jour une institution
     */
    async update(id: string, data: Partial<Institution>): Promise<ApiResponse<Institution>> {
        return api.put(`/institutions/${id}`, data);
    },

    /**
     * Supprimer une institution
     */
    async delete(id: string): Promise<ApiResponse<void>> {
        return api.delete(`/institutions/${id}`);
    },

    /**
     * Approuver une institution
     */
    async approve(id: string): Promise<ApiResponse<Institution>> {
        return api.post(`/institutions/${id}/approve`, {});
    },

    /**
     * Rejeter une institution
     */
    async reject(id: string, reason: string): Promise<ApiResponse<Institution>> {
        return api.post(`/institutions/${id}/reject`, { reason });
    },

    /**
     * Suspendre une institution
     */
    async suspend(id: string, reason: string): Promise<ApiResponse<Institution>> {
        return api.post(`/institutions/${id}/suspend`, { reason });
    },

    /**
     * Rechercher des institutions
     */
    async search(query: string): Promise<ApiResponse<Institution[]>> {
        return api.get(`/institutions/search?q=${encodeURIComponent(query)}`);
    },
};
