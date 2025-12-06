'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Search, Calendar, Building2, Eye, Download, Trash2 } from 'lucide-react';
import { useI18n } from '@proofchain/ui';

interface Document {
    id: string;
    name: string;
    type: string;
    institution: string;
    verifiedAt: string;
    assetId: string;
    status: 'verified' | 'pending';
}

export default function DocumentsPage() {
    const { t } = useI18n();
    const [searchQuery, setSearchQuery] = useState('');
    const [documents, setDocuments] = useState<Document[]>([]);

    // Load documents from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('myDocuments');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setDocuments(Array.isArray(parsed) ? parsed : []);
            } catch (error) {
                console.error('Failed to parse documents:', error);
                localStorage.removeItem('myDocuments');
            }
        }
    }, []);

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.institution.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="p-6 space-y-8 max-w-6xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <FileText className="w-8 h-8 text-purple-600" />
                    {t('documents.title')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {t('documents.subtitle')}
                </p>
            </div>

            {/* Search */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg p-6 mb-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('verifier.hero.searchPlaceholder')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Documents Grid */}
            <div className="space-y-4">
                {filteredDocuments.length === 0 ? (
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg p-12 text-center">
                        <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {t('documents.empty')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('documents.emptyDesc')}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredDocuments.map((doc) => (
                            <div
                                key={doc.id}
                                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                                            <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">
                                                {doc.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {doc.type}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${doc.status === 'verified'
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                        }`}>
                                        {doc.status === 'verified' ? t('diploma.verified') : t('status.loading')}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Building2 className="w-4 h-4" />
                                        <span>{doc.institution}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        <span>{doc.verifiedAt}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                        Asset ID: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{doc.assetId}</code>
                                    </p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-all">
                                            <Eye className="w-4 h-4" />
                                            {t('action.verify')}
                                        </button>
                                        <button className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-all">
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-xl transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
