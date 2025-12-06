'use client';

import React, { useState, useEffect } from 'react';
import { FileCheck, Upload, CheckCircle, XCircle, Clock, AlertCircle, Building2, FileText, Send } from 'lucide-react';
import { useI18n } from '@proofchain/ui';
import { issuerTranslations } from '../../lib/translations';

interface KYCStatus {
    status: 'not_submitted' | 'pending' | 'approved' | 'rejected';
    submittedAt?: string;
    reviewedAt?: string;
    rejectionReason?: string;
}

export default function KYCPage() {
    const { t } = useI18n(issuerTranslations);
    const [kycStatus, setKycStatus] = useState<KYCStatus>({ status: 'not_submitted' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        institutionName: '',
        institutionEmail: '',
        website: '',
        address: '',
        phone: '',
        taxId: '',
        registrationNumber: '',
    });

    const [documents, setDocuments] = useState({
        legalDocs: null as File | null,
        accreditation: null as File | null,
        taxCertificate: null as File | null,
        ministerialDecree: null as File | null,
    });

    useEffect(() => {
        const saved = localStorage.getItem('kycStatus');
        if (saved) {
            try {
                setKycStatus(JSON.parse(saved));
            } catch (error) {
                console.error('Erreur chargement KYC:', error);
            }
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (field: keyof typeof documents) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setDocuments({
                ...documents,
                [field]: file,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const newStatus: KYCStatus = {
                status: 'pending',
                submittedAt: new Date().toISOString(),
            };
            
            setKycStatus(newStatus);
            localStorage.setItem('kycStatus', JSON.stringify(newStatus));
            
            alert('Demande KYC soumise avec succès !');
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la soumission.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusBadge = () => {
        switch (kycStatus.status) {
            case 'approved':
                return (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">KYC Approuvé</span>
                    </div>
                );
            case 'pending':
                return (
                    <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-xl">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">En cours</span>
                    </div>
                );
            case 'rejected':
                return (
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl">
                        <XCircle className="w-5 h-5" />
                        <span className="font-medium">Rejeté</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-medium">Non soumis</span>
                    </div>
                );
        }
    };

    return (
        <div className="p-6 space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <FileCheck className="w-8 h-8 text-purple-600" />
                        Vérification KYC
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Soumettez votre demande de vérification institutionnelle
                    </p>
                </div>
                {getStatusBadge()}
            </div>

            {kycStatus.status === 'approved' && (
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                        <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                        <div>
                            <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-2">
                                Institution vérifiée ✓
                            </h3>
                            <p className="text-green-600 dark:text-green-500">
                                Vous pouvez maintenant émettre des diplômes NFT.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {kycStatus.status === 'pending' && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                        <Clock className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                        <div>
                            <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-400 mb-2">
                                En cours de validation
                            </h3>
                            <p className="text-yellow-600 dark:text-yellow-500">
                                Votre demande est en cours de traitement.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {(kycStatus.status === 'not_submitted' || kycStatus.status === 'rejected') && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Building2 className="w-6 h-6 text-purple-600" />
                            Informations
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nom institution *
                                </label>
                                <input
                                    type="text"
                                    name="institutionName"
                                    value={formData.institutionName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="institutionEmail"
                                    value={formData.institutionEmail}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Site web *
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Téléphone *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-purple-600" />
                            Documents requis
                        </h2>

                        <div className="space-y-4">
                            {[
                                { key: 'legalDocs', label: 'Documents légaux', accept: '.pdf' },
                                { key: 'accreditation', label: 'Accréditation', accept: '.pdf' },
                                { key: 'taxCertificate', label: 'Attestation fiscale', accept: '.pdf' },
                                { key: 'ministerialDecree', label: 'Arrêté ministériel', accept: '.pdf' },
                            ].map((doc) => (
                                <div key={doc.key} className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                                    <label className="block cursor-pointer">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {doc.label} *
                                            </span>
                                            {documents[doc.key as keyof typeof documents] && (
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept={doc.accept}
                                            onChange={handleFileChange(doc.key as keyof typeof documents)}
                                            required
                                            className="hidden"
                                        />
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Upload className="w-4 h-4" />
                                            <span>
                                                {documents[doc.key as keyof typeof documents]
                                                    ? documents[doc.key as keyof typeof documents]!.name
                                                    : 'Cliquer pour uploader (PDF)'}
                                            </span>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-xl font-semibold transition-all shadow-lg disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Clock className="w-5 h-5 animate-spin" />
                                    Soumission...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Soumettre
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
