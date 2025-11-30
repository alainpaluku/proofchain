/**
 * PROOFCHAIN Verifier - Home Page
 * Display recent verifications
 */

'use client';

import React, { useEffect, useState } from 'react';
import { Search, QrCode, Shield, TrendingUp } from 'lucide-react';
import { InstitutionCard, LanguageSelector, ThemeToggle, useI18n } from '@proofchain/ui';
import { getRecentMints, type VerificationResult } from '@proofchain/chain';
import Link from 'next/link';

export default function HomePage() {
    const { t } = useI18n();
    const [recentVerifications, setRecentVerifications] = useState<VerificationResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadRecentVerifications();
    }, []);

    async function loadRecentVerifications() {
        setIsLoading(true);
        try {
            // For demo, we'll use a known policy ID or show empty state
            // In production, this would fetch from a database of verified diplomas
            const policyId = process.env.NEXT_PUBLIC_DEMO_POLICY_ID || '';

            if (policyId) {
                const results = await getRecentMints(policyId, 5);
                setRecentVerifications(results.filter(r => r.valid));
            }
        } catch (error) {
            console.error('Error loading recent verifications:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/verify/${searchQuery.trim()}`;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Shield className="w-8 h-8 text-purple-600" />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                PROOFCHAIN
                            </h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <LanguageSelector />
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
                        {t('nav.home')} - Vérification Académique
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Vérifiez l'authenticité des diplômes sur la blockchain Cardano
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Entrez l'Asset ID ou scannez le QR code..."
                                className="w-full px-6 py-4 pr-12 text-lg rounded-2xl border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800 focus:border-purple-600 dark:focus:border-purple-400 focus:outline-none transition-all"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all"
                            >
                                <Search className="w-6 h-6" />
                            </button>
                        </div>
                    </form>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <Link
                            href="/scan"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
                        >
                            <QrCode className="w-5 h-5" />
                            Scanner QR Code
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                                <Shield className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Diplômes Vérifiés</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Institutions</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">45</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                                <QrCode className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Vérifications/Jour</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">89</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Verifications */}
            <section className="container mx-auto px-4 py-12">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Vérifications Récentes
                </h3>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : recentVerifications.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {recentVerifications.map((verification, index) => (
                            verification.metadata && (
                                <InstitutionCard
                                    key={index}
                                    metadata={verification.metadata}
                                    txHash={verification.txHash}
                                    verified={verification.valid}
                                    onClick={() => window.location.href = `/verify/${verification.policyId}${verification.assetName}`}
                                />
                            )
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Aucune vérification récente disponible
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                            Commencez par vérifier un diplôme ci-dessus
                        </p>
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 mt-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400">
                        © 2024 PROOFCHAIN. Powered by Cardano Blockchain.
                    </p>
                </div>
            </footer>
        </div>
    );
}
