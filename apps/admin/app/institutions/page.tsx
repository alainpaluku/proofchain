'use client';

import React, { useState, useEffect } from 'react';
import { Building2, Search, Eye, Ban, CheckCircle, Mail, Phone, Globe } from 'lucide-react';
import { Card, EmptyState, Button, LoadingSpinner } from '@proofchain/ui';
import { adminService } from '@proofchain/shared';

interface InstitutionDisplay {
    id: string;
    name: string;
    email: string;
    phone: string;
    website: string;
    country: string;
    status: 'active' | 'suspended' | 'pending';
    kycStatus: 'approved' | 'pending' | 'rejected' | 'incomplete' | null;
    diplomasIssued: number;
    subscription: string;
    joinedDate: string;
}

export default function InstitutionsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [institutions, setInstitutions] = useState<InstitutionDisplay[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadInstitutions();
    }, []);

    const loadInstitutions = async () => {
        setLoading(true);
        const result = await adminService.getAllInstitutions();
        if (result.success && result.data) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const mapped: InstitutionDisplay[] = result.data.map((inst: any) => ({
                id: inst.id,
                name: inst.name,
                email: inst.email,
                phone: inst.phone || '',
                website: inst.website || '',
                country: inst.country_code,
                status: inst.kyc_status === 'approved' ? 'active' : 'pending',
                kycStatus: inst.kyc_status,
                diplomasIssued: inst.documents_issued || 0,
                subscription: inst.subscription_plan || 'free',
                joinedDate: inst.created_at ? new Date(inst.created_at).toLocaleDateString('fr-FR') : 'N/A',
            }));
            setInstitutions(mapped);
        } else {
            setError(result.error || 'Erreur de chargement');
        }
        setLoading(false);
    };

    const filteredInstitutions = institutions.filter((inst: InstitutionDisplay) =>
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
            case 'suspended':
                return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
            case 'pending':
                return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
            default:
                return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
        }
    };

    const getKYCStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'text-green-600 dark:text-green-400';
            case 'pending':
                return 'text-yellow-600 dark:text-yellow-400';
            case 'rejected':
                return 'text-red-600 dark:text-red-400';
            default:
                return 'text-gray-600 dark:text-gray-400';
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-purple-600" />
                        Gestion des institutions
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {institutions.length} institution{institutions.length > 1 ? 's' : ''} inscrite{institutions.length > 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            {/* Search */}
            <Card>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher une institution..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                </div>
            </Card>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center py-12">
                    <LoadingSpinner size="lg" />
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-400">
                    {error}
                </div>
            )}

            {/* Institutions List */}
            {!loading && filteredInstitutions.length === 0 ? (
                <EmptyState
                    icon={Building2}
                    title="Aucune institution"
                    description="Les institutions inscrites apparaîtront ici"
                />
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {filteredInstitutions.map((institution) => (
                        <Card key={institution.id} hover>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                                        <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                            {institution.name}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Mail className="w-4 h-4" />
                                                {institution.email}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Phone className="w-4 h-4" />
                                                {institution.phone}
                                            </span>
                                            {institution.website && (
                                                <span className="flex items-center gap-1">
                                                    <Globe className="w-4 h-4" />
                                                    {institution.website}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(institution.status)}`}>
                                        {institution.status === 'active' ? 'Actif' : institution.status === 'suspended' ? 'Suspendu' : 'En attente'}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">KYC</p>
                                    <p className={`font-semibold ${getKYCStatusColor(institution.kycStatus || 'pending')}`}>
                                        {institution.kycStatus === 'approved' ? 'Approuvé' : institution.kycStatus === 'pending' ? 'En attente' : 'Rejeté'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Diplômes émis</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{institution.diplomasIssued}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Abonnement</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{institution.subscription}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Inscrit le</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{institution.joinedDate}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" icon={Eye}>
                                    Détails
                                </Button>
                                {institution.status === 'active' ? (
                                    <Button variant="ghost" size="sm" icon={Ban}>
                                        Suspendre
                                    </Button>
                                ) : (
                                    <Button variant="ghost" size="sm" icon={CheckCircle}>
                                        Activer
                                    </Button>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
