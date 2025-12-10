/**
 * PROOFCHAIN - Stats Service
 * Service pour récupérer les statistiques
 */

import { api } from './api';
import type { Stats, ApiResponse } from '../types';

export const statsService = {
    /**
     * Récupérer les statistiques globales
     */
    async getGlobal(): Promise<ApiResponse<Stats>> {
        return api.get('/stats/global');
    },

    /**
     * Récupérer les statistiques d'une institution
     */
    async getByInstitution(institutionId: string): Promise<ApiResponse<Stats>> {
        return api.get(`/stats/institution/${institutionId}`);
    },

    /**
     * Récupérer les statistiques mensuelles
     */
    async getMonthly(year: number, month: number): Promise<ApiResponse<any>> {
        return api.get(`/stats/monthly?year=${year}&month=${month}`);
    },

    /**
     * Récupérer les statistiques annuelles
     */
    async getYearly(year: number): Promise<ApiResponse<any>> {
        return api.get(`/stats/yearly?year=${year}`);
    },
};
