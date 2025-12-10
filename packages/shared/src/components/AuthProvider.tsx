'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
    AuthUser, 
    AuthError,
    getCurrentUser, 
    onAuthStateChange, 
    signInWithEmail, 
    signUp,
    signOut,
    resetPassword,
    updatePassword 
} from '../lib/auth';

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ success: boolean; error?: AuthError }>;
    signUp: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: AuthError }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{ success: boolean; error?: AuthError }>;
    updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: AuthError }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Charger l'utilisateur initial
        getCurrentUser().then((user) => {
            setUser(user);
            setLoading(false);
        });

        // Écouter les changements
        const unsubscribe = onAuthStateChange((user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const handleSignIn = async (email: string, password: string) => {
        return await signInWithEmail(email, password);
    };

    const handleSignUp = async (email: string, password: string, name?: string) => {
        return await signUp(email, password, name);
    };

    const handleSignOut = async () => {
        await signOut();
        setUser(null);
    };

    const handleResetPassword = async (email: string) => {
        return await resetPassword(email);
    };

    const handleUpdatePassword = async (newPassword: string) => {
        return await updatePassword(newPassword);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            signIn: handleSignIn, 
            signUp: handleSignUp,
            signOut: handleSignOut,
            resetPassword: handleResetPassword,
            updatePassword: handleUpdatePassword
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
