'use client';

import React, { useEffect, useState } from 'react';
import { Search, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface VerificationHistory {
    id: string;
    assetId: string;
    timestamp: number;
    valid: boolean;
    diplomaName?: string;
    studentName?: string;
}

export default function HomePage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [history, setHistory] = useState<VerificationHistory[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('verificationHistory');
        if (saved) { setHistory(JSON.parse(saved)); }
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) { router.push(`/verify/${encodeURIComponent(searchQuery.trim())}`); }
    };

    const clearHistory = () => {
        localStorage.removeItem('verificationHistory');
        setHistory([]);
    };

    const removeFromHistory = (id: string) => {
        const newHistory = history.filter(h => h.id !== id);
        localStorage.setItem('verificationHistory', JSON.stringify(newHistory));
        setHistory(newHistory);
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('fr-FR', {
            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="min-h-full p-4 md:p-6">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center pt-8 pb-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Vérifier un diplôme</h1>
                    <p className="text-gray-600 dark:text-gray-400">Entrez l'identifiant ou scannez le QR code</p>
                </div>

                <form onSubmit={handleSearch}>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Asset ID ou Policy ID..." className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors" />
                        <button type="submit" disabled={!searchQuery.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-xl font-medium transition-all disabled:cursor-not-allowed">
                            Vérifier
                        </button>
                    </div>
                </form>

                <div className="pt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-500" />
                            Historique
                        </h2>
                        {history.length > 0 && (
                            <button onClick={clearHistory} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1">
                                <Trash2 className="w-4 h-4" />
                                Effacer
                            </button>
                        )}
                    </div>

                    {history.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700">
                            <Clock className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">Aucune vérification récente</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Vos vérifications apparaîtront ici</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {history.map((item) => (
                                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push(`/verify/${encodeURIComponent(item.assetId)}`)}>
                                    <div className={`p-2 rounded-full ${item.valid ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                        {item.valid ? (<CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />) : (<XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white truncate">{item.diplomaName || 'Diplôme'}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{item.studentName || item.assetId.slice(0, 20) + '...'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(item.timestamp)}</p>
                                        <span className={`text-xs font-medium ${item.valid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{item.valid ? 'Valide' : 'Invalide'}</span>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); removeFromHistory(item.id); }} className="p-2 text-gray-400 hover:text-red-500 transition-colors" aria-label="Supprimer">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
