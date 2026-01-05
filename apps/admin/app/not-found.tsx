'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { useTranslation } from '@proofchain/ui';

export default function NotFound() {
    const { t } = useTranslation();
    
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{t('common', 'pageNotFound')}</p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                    <Home className="w-5 h-5" />
                    {t('common', 'backToHome')}
                </Link>
            </div>
        </div>
    );
}
