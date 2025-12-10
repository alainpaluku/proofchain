'use client';

import React, { useState } from 'react';
import { Settings, Shield, Bell, Key, Save } from 'lucide-react';
import { Card, CardHeader, InputField, ToggleSwitch, Button } from '@proofchain/ui';

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        platformName: 'PROOFCHAIN',
        adminEmail: '',
        supportEmail: '',
        notifications: {
            newInstitution: true,
            kycSubmission: true,
            newSubscription: true,
            systemAlerts: true
        },
        security: {
            twoFactor: false,
            sessionTimeout: 30
        }
    });

    const handleSave = () => {
        console.log('Saving settings:', settings);
        alert('Paramètres sauvegardés avec succès !');
    };

    return (
        <div className="p-6 space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Settings className="w-8 h-8 text-purple-600" />
                    Paramètres Admin
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Configuration de la plateforme
                </p>
            </div>

            {/* Platform Settings */}
            <Card>
                <CardHeader icon={Settings} title="Paramètres généraux" />
                <div className="space-y-4">
                    <InputField
                        label="Nom de la plateforme"
                        value={settings.platformName}
                        onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Email admin"
                            type="email"
                            value={settings.adminEmail}
                            onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                            placeholder="admin@proofchain.com"
                        />
                        <InputField
                            label="Email support"
                            type="email"
                            value={settings.supportEmail}
                            onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                            placeholder="support@proofchain.com"
                        />
                    </div>

                </div>
            </Card>

            {/* Notifications */}
            <Card>
                <CardHeader icon={Bell} title="Notifications" />
                <div className="space-y-4">
                    <ToggleSwitch
                        label="Nouvelle institution"
                        description="Recevoir une notification lors d'une nouvelle inscription"
                        checked={settings.notifications.newInstitution}
                        onChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, newInstitution: checked }
                        })}
                    />
                    <ToggleSwitch
                        label="Soumission KYC"
                        description="Recevoir une notification lors d'une nouvelle demande KYC"
                        checked={settings.notifications.kycSubmission}
                        onChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, kycSubmission: checked }
                        })}
                    />
                    <ToggleSwitch
                        label="Nouvel abonnement"
                        description="Recevoir une notification lors d'un nouvel abonnement"
                        checked={settings.notifications.newSubscription}
                        onChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, newSubscription: checked }
                        })}
                    />
                    <ToggleSwitch
                        label="Alertes système"
                        description="Recevoir les alertes système importantes"
                        checked={settings.notifications.systemAlerts}
                        onChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, systemAlerts: checked }
                        })}
                    />
                </div>
            </Card>

            {/* Security */}
            <Card>
                <CardHeader icon={Shield} title="Sécurité" />
                <div className="space-y-4">
                    <ToggleSwitch
                        label="Authentification à deux facteurs"
                        description="Sécurité renforcée pour le compte admin"
                        checked={settings.security.twoFactor}
                        onChange={(checked) => setSettings({
                            ...settings,
                            security: { ...settings.security, twoFactor: checked }
                        })}
                    />
                    <InputField
                        label="Timeout de session (minutes)"
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => setSettings({
                            ...settings,
                            security: { ...settings.security, sessionTimeout: Number(e.target.value) }
                        })}
                    />
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Clé API Admin</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Pour l'intégration système</p>
                            </div>
                            <Key className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="password"
                                value="sk_admin_••••••••••••••••"
                                readOnly
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <Button variant="secondary" size="sm">
                                Régénérer
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button variant="primary" size="lg" icon={Save} onClick={handleSave}>
                    Enregistrer les modifications
                </Button>
            </div>
        </div>
    );
}
