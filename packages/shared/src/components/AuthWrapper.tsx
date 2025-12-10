'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from './AuthProvider';
import { isAdminEmail } from '../lib/auth';
import { ShieldX, Loader2 } from 'lucide-react';

export interface AuthWrapperProps {
    children: ReactNode;
    /** Routes publiques qui ne nécessitent pas d'authentification */
    publicRoutes?: string[];
    /** Composant Layout à utiliser pour les pages authentifiées */
    Layout: React.ComponentType<{ children: ReactNode }>;
    /** Si true, vérifie que l'utilisateur est admin */
    requireAdmin?: boolean;
    /** URL de redirection pour les non-admins (si requireAdmin=true) */
    nonAdminRedirectUrl?: string;
    /** Composant de chargement personnalisé */
    LoadingComponent?: React.ComponentType;
    /** Composant d'accès non autorisé personnalisé */
    UnauthorizedComponent?: React.ComponentType;
}

function DefaultLoadingComponent() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
    );
}

function DefaultUnauthorizedComponent({ redirectUrl }: { redirectUrl?: string }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center p-8">
                <div className="inline-flex p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                    <ShieldX className="w-12 h-12 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Accès non autorisé
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Vous n'avez pas les droits d'accès à cette interface.
                </p>
                {redirectUrl && (
                    <a
                        href={redirectUrl}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all"
                    >
                        Retour
                    </a>
                )}
            </div>
        </div>
    );
}

function AuthContent({ 
    children, 
    publicRoutes = ['/login'],
    Layout,
    requireAdmin = false,
    nonAdminRedirectUrl,
    LoadingComponent = DefaultLoadingComponent,
    UnauthorizedComponent
}: AuthWrapperProps) {
    const pathname = usePathname();
    const { user, loading } = useAuth();

    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // Afficher le loader pendant le chargement
    if (loading) {
        return <LoadingComponent />;
    }

    // Si c'est une route publique (login), afficher directement le contenu
    if (isPublicRoute) {
        return <>{children}</>;
    }

    // Si l'utilisateur n'est pas connecté, rediriger vers login
    if (!user) {
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
        return <LoadingComponent />;
    }

    // Vérifier les droits admin si requis
    if (requireAdmin && !isAdminEmail(user.email)) {
        if (UnauthorizedComponent) {
            return <UnauthorizedComponent />;
        }
        return <DefaultUnauthorizedComponent redirectUrl={nonAdminRedirectUrl} />;
    }

    // Utilisateur connecté (et admin si requis), afficher le layout avec le contenu
    return (
        <Layout>
            {children}
        </Layout>
    );
}

export function AuthWrapper(props: AuthWrapperProps) {
    return (
        <AuthProvider>
            <AuthContent {...props} />
        </AuthProvider>
    );
}
