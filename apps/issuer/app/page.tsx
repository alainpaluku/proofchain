/**
 * PROOFCHAIN Issuer - Home Page
 * Redirect to mint page or show dashboard
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to mint page
        router.push('/mint');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-lg text-gray-600 dark:text-gray-400">Chargement...</p>
            </div>
        </div>
    );
}
