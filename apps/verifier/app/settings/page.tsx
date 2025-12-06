'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Info, Save } from 'lucide-react';

export default function SettingsPage() {
    const [autoVerify, setAutoVerify] = useState(false);

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedAutoVerify = localStorage.getItem('autoVerify') === 'true';
        setAutoVerify(savedAutoVerify);
    }, []);

    const handleSave = () => {
        localStorage.setItem('autoVerify', autoVerify.toString());
        alert('Paramètres sauvegardés !');
    };

    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Settings className="w-8 h-8 text-purple-600" />
                    Paramètres
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Gérez vos préférences et paramètres de l'application
                </p>
            </div>



            {/* Verification Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Vérification
                </h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                                Vérification automatique
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Vérifier automatiquement les QR codes scannés
                            </p>
                        </div>
                        <button
                            onClick={() => setAutoVerify(!autoVerify)}
                            className={`relative w-14 h-7 rounded-full transition-colors ${autoVerify ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                        >
                            <span
                                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${autoVerify ? 'translate-x-7' : 'translate-x-0'
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    À propos
                </h2>

                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                        <span>Version de l'application</span>
                        <span className="font-mono font-semibold text-gray-900 dark:text-white">1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Dernière mise à jour</span>
                        <span className="font-semibold text-gray-900 dark:text-white">01 Décembre 2024</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Blockchain</span>
                        <span className="font-semibold text-gray-900 dark:text-white">Cardano Preprod</span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        © 2024 PROOFCHAIN. Tous droits réservés.
                    </p>
                </div>
            </div>

            {/* Save Button */}
            <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
            >
                <Save className="w-5 h-5" />
                Sauvegarder les paramètres
            </button>
        </div>
    );
}
