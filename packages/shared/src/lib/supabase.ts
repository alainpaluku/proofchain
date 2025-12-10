/**
 * PROOFCHAIN - Supabase Client
 * Client Supabase pour l'accès à la base de données
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Variables d'environnement Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Vérification des variables d'environnement
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '⚠️ Supabase credentials not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env file.'
    );
}

// Client Supabase singleton (sans typage strict pour éviter les erreurs de type)
let supabaseInstance: SupabaseClient | null = null;

/**
 * Obtenir le client Supabase (singleton)
 */
export function getSupabaseClient(): SupabaseClient {
    if (!supabaseInstance && supabaseUrl && supabaseAnonKey) {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true,
            },
        });
    }

    if (!supabaseInstance) {
        throw new Error('Supabase client not initialized. Check your environment variables.');
    }

    return supabaseInstance;
}

/**
 * Client Supabase exporté pour utilisation directe
 */
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
        },
    })
    : null;

/**
 * Vérifier si Supabase est configuré
 */
export function isSupabaseConfigured(): boolean {
    return Boolean(supabaseUrl && supabaseAnonKey);
}

/**
 * Créer un client Supabase côté serveur avec la clé service
 * À utiliser uniquement dans les API routes
 */
export function createServerSupabaseClient(): SupabaseClient {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error('Server Supabase credentials not configured.');
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}
