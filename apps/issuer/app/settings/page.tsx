'use client';

import React, { useState } from 'react';
import { Settings, Building2, Bell, Shield, Key, Save } from 'lucide-react';
import { useI18n } from '@proofchain/ui';
import { issuerTranslations } from '../../lib/translations';

export default function SettingsPage() {
    const { t } = useI18n(issuerTranslations);
    const [settings, setSettings] = useState({
        institutionName: '',
        institutionId: '',
        email: '',
        phone: '',
        address: '',
        notifications: {
            email: true,
            diploma: true,
            kyc: true,
            system: false
        },
        security: {
            twoFactor: false,
            apiAccess: false
        }
    });

    // Charger les paramètres depuis localStorage
    React.useEffect(() => {
        const saved = localStorage.getItem('institutionSettings');
        if (saved) {
            try {
                const parsedSettings = JSON.parse(saved);
                setSettings(parsedSettings);
            } catch (error) {
                console.error('Erreur chargement paramètres:', error);
            }
        }
    }, []);

    const handleSave = () => {
        try {
            localStorage.setItem('institutionSettings', JSON.stringify(settings));
            alert(t('issuer.common.success'));
        } catch (error) {
            console.error('Erreur sauvegarde:', error);
            alert(t('issuer.common.error'));
        }
    };

    return (
        <div className="p-6 space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Settings className="w-8 h-8 text-purple-600" />
                    {t('issuer.settings.title')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {t('issuer.settings.subtitle')}
                </p>
            </div>

            {/* Institution Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Building2 className="w-6 h-6 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Informations de l'institution
                    </h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nom de l'institution
                        </label>
                        <input
                            type="text"
                            value={settings.institutionName}
                            onChange={(e) => setSettings({ ...settings, institutionName: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            ID Institution
                        </label>
                        <input
                            type="text"
                            value={settings.institutionId}
                            onChange={(e) => setSettings({ ...settings, institutionId: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={settings.email}
                                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Téléphone
                            </label>
                            <input
                                type="tel"
                                value={settings.phone}
                                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Adresse
                        </label>
                        <textarea
                            value={settings.address}
                            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Bell className="w-6 h-6 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Notifications
                    </h2>
                </div>

                <div className="space-y-4">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white capitalize">
                                    {key === 'email' && 'Notifications par email'}
                                    {key === 'diploma' && 'Émission de diplômes'}
                                    {key === 'kyc' && 'Validation KYC'}
                                    {key === 'system' && 'Mises à jour système'}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Recevoir des notifications pour cette catégorie
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        notifications: { ...settings.notifications, [key]: e.target.checked }
                                    })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>



            {/* Security */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Sécurité
                    </h2>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                                Authentification à deux facteurs
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Sécurité renforcée pour votre compte
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.security.twoFactor}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    security: { ...settings.security, twoFactor: e.target.checked }
                                })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        </label>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Clé API
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Pour l'intégration avec vos systèmes
                                </p>
                            </div>
                            <Key className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="password"
                                value="sk_live_••••••••••••••••"
                                readOnly
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-all">
                                Régénérer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg"
                >
                    <Save className="w-5 h-5" />
                    {t('issuer.common.save')}
                </button>
            </div>
        </div>
    );
}
