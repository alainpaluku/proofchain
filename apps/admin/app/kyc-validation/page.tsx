'use client';

import React, { useState, useEffect } from 'react';
import { FileCheck, CheckCircle, XCircle, Building2, Mail, Phone, Globe, Loader2, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, EmptyState, LoadingSpinner } from '@proofchain/ui';
import { adminService, type KYCPendingRequest } from '@proofchain/shared';

interface KYCRequest {
    id: string;
    institutionName: string;
    email: string;
    phone: string;
    website: string;
    country: string;
    type: string;
    registrationNumber: string;
    submittedDate: string;
    documents: {
        registrationCert: boolean;
        ministerialDecree: boolean;
        taxCert: boolean;
    };
}

export default function KYCValidationPage() {
    const [requests, setRequests] = useState<KYCRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [selectedRequest, setSelectedRequest] = useState<KYCRequest | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectForm, setShowRejectForm] = useState(false);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        setLoading(true);
        const result = await adminService.getPendingKYCRequests();
        if (result.success && result.data) {
            const mapped: KYCRequest[] = result.data.map((req: KYCPendingRequest) => ({
                id: req.id,
                institutionName: req.name,
                email: req.email,
                phone: req.phone || '',
                website: req.website || '',
                country: req.countryCode,
                type: req.type,
                registrationNumber: req.registrationNumber || '',
                submittedDate: req.kycSubmittedAt 
                    ? new Date(req.kycSubmittedAt).toLocaleDateString('fr-FR')
                    : 'N/A',
                documents: {
                    registrationCert: !!req.documents.legalDocs,
                    ministerialDecree: !!req.documents.ministerialDecree,
                    taxCert: !!req.documents.taxCertificate,
                },
            }));
            setRequests(mapped);
        } else {
            setError(result.error || 'Erreur de chargement');
        }
        setLoading(false);
    };

    const openModal = (request: KYCRequest) => {
        setSelectedRequest(request);
        setShowModal(true);
        setShowRejectForm(false);
        setRejectReason('');
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedRequest(null);
        setShowRejectForm(false);
        setRejectReason('');
    };

    const handleApprove = async () => {
        if (!selectedRequest) return;
        setActionLoading(true);
        setError(null);
        
        const result = await adminService.approveKYC(selectedRequest.id);
        if (result.success) {
            setRequests(prev => prev.filter(r => r.id !== selectedRequest.id));
            setSuccessMessage(`${selectedRequest.institutionName} a été approuvée !`);
            closeModal();
            setTimeout(() => setSuccessMessage(null), 5000);
        } else {
            setError(result.error || 'Erreur lors de l\'approbation');
        }
        setActionLoading(false);
    };

    const handleReject = async () => {
        if (!selectedRequest) return;
        if (!rejectReason.trim()) {
            alert('Veuillez fournir une raison pour le rejet');
            return;
        }
        
        setActionLoading(true);
        setError(null);
        
        const result = await adminService.rejectKYC(selectedRequest.id, rejectReason);
        if (result.success) {
            setRequests(prev => prev.filter(r => r.id !== selectedRequest.id));
            setSuccessMessage(`${selectedRequest.institutionName} a été rejetée.`);
            closeModal();
            setTimeout(() => setSuccessMessage(null), 5000);
        } else {
            setError(result.error || 'Erreur lors du rejet');
        }
        setActionLoading(false);
    };

    const getTypeLabel = (type: string) => {
        const types: Record<string, string> = {
            'UN': 'Université', 'IS': 'Institut Supérieur',
            'LC': 'Lycée/Collège', 'CF': 'Centre de Formation',
        };
        return types[type] || type;
    };

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <FileCheck className="w-8 h-8 text-purple-600" />
                    Validation KYC
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {requests.length} demande{requests.length > 1 ? 's' : ''} en attente
                </p>
            </div>

            {loading && (
                <div className="flex justify-center py-12">
                    <LoadingSpinner size="lg" />
                </div>
            )}

            {successMessage && (
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-xl p-4 text-green-700 dark:text-green-400 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    {successMessage}
                </div>
            )}

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-xl p-4 text-red-700 dark:text-red-400 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {!loading && requests.length === 0 ? (
                <EmptyState icon={FileCheck} title="Aucune demande KYC" description="Les demandes apparaîtront ici" />
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {requests.map((request) => (
                        <Card key={request.id}>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                        <Building2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{request.institutionName}</h3>
                                        <p className="text-sm text-purple-600 font-medium">{getTypeLabel(request.type)}</p>
                                        <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                            <p className="flex items-center gap-2"><Mail className="w-4 h-4" />{request.email}</p>
                                            {request.phone && <p className="flex items-center gap-2"><Phone className="w-4 h-4" />{request.phone}</p>}
                                            {request.website && <p className="flex items-center gap-2"><Globe className="w-4 h-4" />{request.website}</p>}
                                        </div>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">En attente</span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <div><p className="text-sm text-gray-500">Pays</p><p className="font-semibold text-gray-900 dark:text-white">{request.country}</p></div>
                                <div><p className="text-sm text-gray-500">N° Enregistrement</p><p className="font-semibold text-gray-900 dark:text-white">{request.registrationNumber || 'N/A'}</p></div>
                                <div><p className="text-sm text-gray-500">Soumis le</p><p className="font-semibold text-gray-900 dark:text-white">{request.submittedDate}</p></div>
                            </div>

                            <button
                                onClick={() => openModal(request)}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold"
                            >
                                <FileCheck className="w-5 h-5" />
                                Valider cette institution
                            </button>
                        </Card>
                    ))}
                </div>
            )}

            {showModal && selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/60" onClick={closeModal} />
                    <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Valider l&apos;institution</h2>
                            <button onClick={closeModal} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                    <Building2 className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedRequest.institutionName}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{selectedRequest.email}</p>
                            </div>

                            {!showRejectForm ? (
                                <>
                                    <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
                                        Voulez-vous approuver cette institution ?
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={handleApprove}
                                            disabled={actionLoading}
                                            className="flex flex-col items-center gap-3 p-6 bg-green-50 hover:bg-green-100 border-2 border-green-500 rounded-xl disabled:opacity-50"
                                        >
                                            {actionLoading ? <Loader2 className="w-10 h-10 text-green-600 animate-spin" /> : <ThumbsUp className="w-10 h-10 text-green-600" />}
                                            <span className="text-lg font-bold text-green-700">OUI</span>
                                        </button>
                                        <button
                                            onClick={() => setShowRejectForm(true)}
                                            disabled={actionLoading}
                                            className="flex flex-col items-center gap-3 p-6 bg-red-50 hover:bg-red-100 border-2 border-red-500 rounded-xl disabled:opacity-50"
                                        >
                                            <ThumbsDown className="w-10 h-10 text-red-600" />
                                            <span className="text-lg font-bold text-red-700">NON</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-center text-gray-700 dark:text-gray-300 mb-4">Raison du rejet :</p>
                                    <textarea
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                        placeholder="Expliquez pourquoi..."
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                                    />
                                    <div className="flex gap-3">
                                        <button onClick={() => setShowRejectForm(false)} className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium">
                                            Retour
                                        </button>
                                        <button
                                            onClick={handleReject}
                                            disabled={actionLoading || !rejectReason.trim()}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-xl font-medium"
                                        >
                                            {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5" />}
                                            Rejeter
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
