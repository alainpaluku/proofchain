/**
 * PROOFCHAIN - Institution Card Component
 * Display diploma/NFT information
 */

'use client';

import React from 'react';
import { GraduationCap, Calendar, Award, Building2, CheckCircle2, ExternalLink } from 'lucide-react';
import type { DiplomaMetadata } from '@proofchain/chain';

interface InstitutionCardProps {
    metadata: DiplomaMetadata;
    assetId?: string;
    txHash?: string;
    verified?: boolean;
    className?: string;
    onClick?: () => void;
}

export function InstitutionCard({
    metadata,
    assetId,
    txHash,
    verified = false,
    className = '',
    onClick,
}: InstitutionCardProps) {
    const explorerUrl = process.env.NEXT_PUBLIC_CARDANO_EXPLORER || 'https://preprod.cardanoscan.io';

    return (
        <div
            className={`
        relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all
        ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}
        ${className}
      `}
            onClick={onClick}
        >
            {/* Gradient header */}
            <div className="h-32 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 relative">
                <div className="absolute inset-0 bg-black/10" />
                {verified && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                        <CheckCircle2 className="w-4 h-4" />
                        Verified
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Student name */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {metadata.attributes.studentName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {metadata.attributes.studentId}
                    </p>
                </div>

                {/* Degree info */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <GraduationCap className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">{metadata.attributes.degree}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Award className="w-5 h-5 text-blue-600" />
                        <span>{metadata.attributes.field}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Building2 className="w-5 h-5 text-indigo-600" />
                        <span>{metadata.attributes.institution}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span>{new Date(metadata.attributes.graduationDate).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Honors/Grade */}
                {(metadata.attributes.honors || metadata.attributes.grade) && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        {metadata.attributes.honors && (
                            <div className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-sm font-medium rounded-full">
                                🏆 {metadata.attributes.honors}
                            </div>
                        )}
                        {metadata.attributes.grade && (
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Grade: <span className="font-semibold">{metadata.attributes.grade}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Transaction link */}
                {txHash && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <a
                            href={`${explorerUrl}/transaction/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ExternalLink className="w-4 h-4" />
                            View on Cardano Explorer
                        </a>
                    </div>
                )}

                {/* Asset ID */}
                {assetId && (
                    <div className="text-xs text-gray-500 dark:text-gray-500 font-mono break-all">
                        {assetId}
                    </div>
                )}
            </div>
        </div>
    );
}
