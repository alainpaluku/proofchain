'use client';

import React from 'react';
import { Shield, Globe, Lock, Zap, Heart } from 'lucide-react';

export default function AboutPage() {

    const features = [
        {
            icon: Shield,
            title: 'Sécurité Maximale',
            description: 'Vos diplômes sont protégés par la blockchain Cardano, garantissant leur authenticité.',
            color: 'purple'
        },
        {
            icon: Zap,
            title: 'Vérification Instantanée',
            description: 'Vérifiez n\'importe quel diplôme en quelques secondes grâce à notre technologie.',
            color: 'blue'
        },
        {
            icon: Globe,
            title: 'Accès Mondial',
            description: 'Vérifiez des diplômes de n\'importe où dans le monde, à tout moment.',
            color: 'green'
        },
        {
            icon: Lock,
            title: 'Confidentialité',
            description: 'Vos données personnelles sont protégées et ne sont jamais partagées.',
            color: 'orange'
        }
    ];

    const colorClasses: Record<string, { bg: string; icon: string }> = {
        purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', icon: 'text-purple-600 dark:text-purple-400' },
        blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', icon: 'text-blue-600 dark:text-blue-400' },
        green: { bg: 'bg-green-100 dark:bg-green-900/30', icon: 'text-green-600 dark:text-green-400' },
        orange: { bg: 'bg-orange-100 dark:bg-orange-900/30', icon: 'text-orange-600 dark:text-orange-400' }
    };

    return (
        <div className="min-h-full pb-20">
            {/* Hero Section */}
            <section className="relative px-4 py-12 md:py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-white dark:from-purple-950/20 dark:via-blue-950/20 dark:to-gray-900 pointer-events-none" />
                
                <div className="container mx-auto max-w-4xl relative z-10">
                    <div className="text-center space-y-6">
                        {/* Logo */}
                        <div className="inline-flex p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg">
                            <Shield className="w-12 h-12 text-white" />
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                            À propos de PROOFCHAIN
                        </h1>
                        
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            La solution de vérification de diplômes sur blockchain
                        </p>
                    </div>
                </div>
            </section>

            {/* What is PROOFCHAIN */}
            <section className="px-4 py-8">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Qu'est-ce que PROOFCHAIN ?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            PROOFCHAIN est une plateforme innovante qui utilise la technologie blockchain pour certifier et vérifier l'authenticité des diplômes académiques. Chaque diplôme est enregistré de manière immuable sur la blockchain Cardano, garantissant son authenticité et empêchant toute falsification.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="px-4 py-8">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        Nos Fonctionnalités
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className={`inline-flex p-3 rounded-xl ${colorClasses[feature.color].bg} mb-3`}>
                                    <feature.icon className={`w-6 h-6 ${colorClasses[feature.color].icon}`} />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="px-4 py-8">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 md:p-8 text-white">
                        <h2 className="text-xl font-bold mb-4">
                            Comment ça marche ?
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                                    1
                                </div>
                                <p className="text-purple-100">
                                    Scannez le QR code présent sur le diplôme ou entrez l'identifiant unique
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                                    2
                                </div>
                                <p className="text-purple-100">
                                    Notre système vérifie l'authenticité sur la blockchain Cardano
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                                    3
                                </div>
                                <p className="text-purple-100">
                                    Recevez instantanément le résultat de la vérification avec tous les détails
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Info */}
            <section className="px-4 py-8">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Informations Techniques
                        </h2>
                        
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">Application</span>
                                <span className="font-semibold text-gray-900 dark:text-white">PROOFCHAIN Verifier</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">Version</span>
                                <span className="font-mono font-semibold text-gray-900 dark:text-white">1.0.0</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">Blockchain</span>
                                <span className="font-semibold text-gray-900 dark:text-white">Cardano</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-600 dark:text-gray-400">Network</span>
                                <span className="font-semibold text-purple-600 dark:text-purple-400">Preprod Testnet</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="px-4 py-8">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                        <span>Fait avec</span>
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>par l'équipe PROOFCHAIN</span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        © 2024 PROOFCHAIN. Tous droits réservés.
                    </p>
                </div>
            </section>
        </div>
    );
}
