/**
 * PROOFCHAIN Verifier - QR Code Scanner Page
 * Scan QR codes to verify diplomas
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, QrCode, Camera, Upload } from 'lucide-react';
import { ThemeToggle, LanguageSelector } from '@proofchain/ui';
import Link from 'next/link';

export default function ScanPage() {
    const router = useRouter();
    const [manualInput, setManualInput] = useState('');

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (manualInput.trim()) {
            router.push(`/verify/${manualInput.trim()}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <QrCode className="w-8 h-8 text-purple-600" />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                PROOFCHAIN
                            </h1>
                        </Link>

                        <div className="flex items-center gap-3">
                            <LanguageSelector />
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Retour
                </button>

                <div className="max-w-2xl mx-auto space-y-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Scanner un QR Code
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Scannez le QR code du diplôme pour vérifier son authenticité
                        </p>
                    </div>

                    {/* QR Scanner Placeholder */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                        <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl flex flex-col items-center justify-center gap-4">
                            <Camera className="w-24 h-24 text-gray-400" />
                            <p className="text-gray-500 dark:text-gray-400 text-center">
                                Scanner QR Code
                            </p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 text-center max-w-xs">
                                Fonctionnalité de scan en cours de développement.
                                Utilisez la saisie manuelle ci-dessous.
                            </p>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                disabled
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl font-medium cursor-not-allowed"
                            >
                                <Camera className="w-5 h-5" />
                                Activer la caméra
                            </button>
                            <button
                                disabled
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl font-medium cursor-not-allowed"
                            >
                                <Upload className="w-5 h-5" />
                                Importer une image
                            </button>
                        </div>
                    </div>

                    {/* Manual Input */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Ou entrez l'Asset ID manuellement
                        </h3>
                        <form onSubmit={handleManualSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={manualInput}
                                onChange={(e) => setManualInput(e.target.value)}
                                placeholder="Collez l'Asset ID ici..."
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-600 dark:focus:border-purple-400 focus:outline-none transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!manualInput.trim()}
                                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Vérifier le diplôme
                            </button>
                        </form>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                        <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-3">
                            Comment utiliser le scanner ?
                        </h4>
                        <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
                            <li>1. Positionnez le QR code du diplôme devant votre caméra</li>
                            <li>2. Attendez que le code soit détecté automatiquement</li>
                            <li>3. La vérification se lancera automatiquement</li>
                            <li>4. Consultez les résultats de la vérification</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
