/**
 * PROOFCHAIN - Authentication avec Google via Supabase
 */

import { getSupabaseClient, isSupabaseConfigured } from './supabase';

export type AuthUser = {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
};

/**
 * Connexion avec Google
 */
export async function signInWithGoogle(redirectTo?: string) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase non configuré');
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    });

    if (error) throw error;
    return data;
}

/**
 * Déconnexion
 */
export async function signOut() {
    if (!isSupabaseConfigured()) return;

    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

/**
 * Obtenir l'utilisateur courant
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
    if (!isSupabaseConfigured()) return null;

    const supabase = getSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    return {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.full_name || user.user_metadata?.name,
        avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture,
    };
}

/**
 * Écouter les changements d'auth
 */
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
    if (!isSupabaseConfigured()) return () => {};

    const supabase = getSupabaseClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
            callback({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
                avatar: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture,
            });
        } else {
            callback(null);
        }
    });

    return () => subscription.unsubscribe();
}
