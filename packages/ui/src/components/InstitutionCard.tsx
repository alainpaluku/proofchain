/**
 * PROOFCHAINS - Institution Card Component
 * Display diploma/NFT information with PROOFCHAINS style
 */

'use client';

import React from 'react';
import { AcademicCapIcon, CalendarIcon, TrophyIcon, BuildingLibraryIcon, CheckBadgeIcon, ArrowTopRightOnSquareIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import { Card } from './Card';

// Données complètes du diplôme (depuis Supabase)
interface DiplomaData {
    documentId: string;
    studentName?: string;
    studentId?: string;
    degree?: string;
    field?: string;
    institution?: string;
    graduationDate?: string;
    issueDate?: string;
}

interface InstitutionCardProps {
    data: DiplomaData;
    assetId?: string;
    txHash?: string;
    verified?: boolean;
    className?: string;
    onClick?: () => void;
}

export function InstitutionCard({
    data,
    assetId,
    txHash,
    verified = false,
    className = '',
    onClick,
}: InstitutionCardProps) {
    const explorerUrl = process.env.NEXT_PUBLIC_CARDANO_EXPLORER || 'https://preprod.cardanoscan.io';

    return (
        <Card
            padding="none"
            className={`overflow-hidden group ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={onClick}
            hover
        >
            {/* Soft Industrial header */}
            <div className="h-28 bg-primary-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-800/40" />

                {verified && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20">
                        <CheckBadgeIcon className="w-4 h-4 text-primary-400" />
                        VERIFIED
                    </div>
                )}

                <div className="absolute bottom-4 left-6">
                    <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10">
                        <AcademicCapIcon className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
                {/* Student name or Document ID */}
                <div>
                    <h3 className="text-xl font-bold text-proofchains-on-surface dark:text-white leading-tight mb-1">
                        {data.studentName || 'Document Vérifié'}
                    </h3>
                    <div className="flex items-center gap-1.5 text-proofchains-on-surface-variant dark:text-gray-400">
                        <DocumentTextIcon className="w-4 h-4 opacity-50" />
                        <span className="text-xs font-mono">{data.studentId || data.documentId}</span>
                    </div>
                </div>

                {/* Degree info with clean typography */}
                <div className="space-y-3">
                    {data.degree && (
                        <div className="flex items-center gap-3 text-proofchains-on-surface dark:text-gray-200">
                            <AcademicCapIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            <span className="text-sm font-semibold">{data.degree}</span>
                        </div>
                    )}

                    {data.field && (
                        <div className="flex items-center gap-3 text-proofchains-on-surface-variant dark:text-gray-300">
                            <TrophyIcon className="w-5 h-5 text-proofchains-outline" />
                            <span className="text-sm">{data.field}</span>
                        </div>
                    )}

                    {data.institution && (
                        <div className="flex items-center gap-3 text-proofchains-on-surface-variant dark:text-gray-300">
                            <BuildingLibraryIcon className="w-5 h-5 text-proofchains-outline" />
                            <span className="text-sm">{data.institution}</span>
                        </div>
                    )}

                    {data.graduationDate && (
                        <div className="flex items-center gap-3 text-proofchains-on-surface-variant dark:text-gray-400">
                            <CalendarIcon className="w-5 h-5 text-proofchains-outline" />
                            <span className="text-xs font-medium">{new Date(data.graduationDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    )}
                </div>

                {/* Transaction link with PROOFCHAINS editorial style */}
                {txHash && (
                    <div className="pt-4 border-t border-proofchains-surface-highest dark:border-proofchains-on-surface-variant">
                        <a
                            href={`${explorerUrl}/transaction/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 label-caps text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                            Cardano Explorer
                        </a>
                    </div>
                )}

                {/* Asset ID footer */}
                {assetId && (
                    <div className="text-[10px] text-proofchains-outline font-mono truncate bg-proofchains-surface-container-low dark:bg-black/20 p-2 rounded border border-proofchains-surface-highest/50">
                        ASSET: {assetId}
                    </div>
                )}
            </div>
        </Card>
    );
}
