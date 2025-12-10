'use client';

import React from 'react';
import {
    Shield,
    GraduationCap,
    Search,
    Settings,
    CheckCircle,
    Globe,
    Lock,
    Zap,
    ArrowRight,
    Github,
    ExternalLink
} from 'lucide-react';

const apps = [
    {
        name: 'Verifier',
        description: 'Vérifiez l\'authenticité des diplômes en scannant un QR code ou en entrant l\'ID du document.',
        icon: Search,
        color: 'from-green-500 to-emerald-600',
        url: process.env.NEXT_PUBLIC_VERIFIER_URL || 'https://proofchain-verifier.vercel.app',
        features: ['Scan QR Code', 'Vérification blockchain', 'Résultats instantanés'],
    },
    {
        name: 'Issuer',
        description: 'Émettez des diplômes certifiés sur la blockchain Cardano sous forme de NFT uniques.',
        icon: GraduationCap,
        color: 'from-purple-500 to-violet-600',
        url: process.env.NEXT_PUBLIC_ISSUER_URL || 'https://proofchain-issuer.vercel.app',
        features: ['Mint NFT diplômes', 'Gestion étudiants', 'Dashboard analytics'],
    },
    {
        name: 'Admin',
        description: 'Gérez les institutions, validez les demandes KYC et supervisez la plateforme.',
        icon: Settings,
        color: 'from-blue-500 to-indigo-600',
        url: process.env.NEXT_PUBLIC_ADMIN_URL || 'https://proofchain-admin.vercel.app',
        features: ['Validation KYC', 'Gestion institutions', 'Statistiques globales'],
    },
];

const features = [
    {
        icon: Shield,
        title: 'Sécurité Blockchain',
        description: 'Chaque diplôme est enregistré de manière immuable sur la blockchain Cardano.',
    },
    {
        icon: Globe,
        title: 'Accessible Partout',
        description: 'Vérifiez vos diplômes depuis n\'importe où dans le monde, 24h/24.',
    },
    {
        icon: Lock,
        title: 'Anti-Fraude',
        description: 'Impossible de falsifier un diplôme grâce à la cryptographie avancée.',
    },
    {
        icon: Zap,
        title: 'Instantané',
        description: 'Vérification en quelques secondes grâce à notre infrastructure optimisée.',
    },
];

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                
                {/* Floating elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-float" />
                <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-violet-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />

                <div className="relative container mx-auto px-4 py-20 lg:py-32">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-purple-200 text-sm mb-8">
                            <Shield className="w-4 h-4" />
                            Propulsé par Cardano Blockchain
                        </div>
                        
                        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                            PROOF<span className="text-purple-400">CHAIN</span>
                        </h1>
                        
                        <p className="text-xl lg:text-2xl text-purple-100 mb-8 max-w-2xl mx-auto">
                            La plateforme de certification académique nouvelle génération.
                            Sécurisez et vérifiez vos diplômes sur la blockchain.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="#apps"
                                className="px-8 py-4 bg-white text-purple-900 font-semibold rounded-xl hover:bg-purple-100 transition-all hover:scale-105 flex items-center gap-2"
                            >
                                Découvrir les Apps
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <a
                                href="https://github.com/alainpaluku/proofchain"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all flex items-center gap-2"
                            >
                                <Github className="w-5 h-5" />
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Pourquoi PROOFCHAIN ?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Une solution complète pour lutter contre la fraude aux diplômes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Apps Section */}
            <section id="apps" className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Nos Applications
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Trois applications spécialisées pour répondre à tous vos besoins
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {apps.map((app, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
                            >
                                <div className={`h-32 bg-gradient-to-br ${app.color} relative`}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <app.icon className="w-16 h-16 text-white/80" />
                                    </div>
                                </div>
                                
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                        {app.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        {app.description}
                                    </p>
                                    
                                    <ul className="space-y-2 mb-8">
                                        {app.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href={app.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full py-4 bg-gradient-to-r ${app.color} text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2`}
                                    >
                                        Accéder à {app.name}
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                
                <div className="relative container mx-auto px-4 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Prêt à sécuriser vos diplômes ?
                    </h2>
                    <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
                        Rejoignez les institutions qui font confiance à PROOFCHAIN pour certifier leurs diplômes sur la blockchain.
                    </p>
                    <a
                        href={apps[1].url}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-900 font-semibold rounded-xl hover:bg-purple-100 transition-all hover:scale-105"
                    >
                        Commencer maintenant
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-gray-900 text-gray-400">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Shield className="w-8 h-8 text-purple-500" />
                            <span className="text-xl font-bold text-white">PROOFCHAIN</span>
                        </div>
                        
                        <div className="flex gap-6">
                            <a href={apps[0].url} className="hover:text-white transition-colors">Verifier</a>
                            <a href={apps[1].url} className="hover:text-white transition-colors">Issuer</a>
                            <a href={apps[2].url} className="hover:text-white transition-colors">Admin</a>
                            <a href="https://github.com/alainpaluku/proofchain" className="hover:text-white transition-colors">GitHub</a>
                        </div>
                        
                        <p className="text-sm">
                            © 2024 PROOFCHAIN. Propulsé par Cardano.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
