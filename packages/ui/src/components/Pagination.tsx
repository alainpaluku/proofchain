'use client';

import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showFirstLast?: boolean;
    maxVisible?: number;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    showFirstLast = true,
    maxVisible = 5,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const halfVisible = Math.floor(maxVisible / 2);

        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, currentPage + halfVisible);

        // Adjust if we're near the start or end
        if (currentPage <= halfVisible) {
            endPage = Math.min(totalPages, maxVisible);
        }
        if (currentPage >= totalPages - halfVisible) {
            startPage = Math.max(1, totalPages - maxVisible + 1);
        }

        // Add first page and ellipsis
        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push('...');
        }

        // Add page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add ellipsis and last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2">
            {/* Previous button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-auralis-outline-variant dark:border-auralis-on-surface-variant hover:bg-auralis-surface-container-low dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Page précédente"
            >
                <ChevronLeftIcon className="w-5 h-5 text-auralis-on-surface dark:text-gray-300" />
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
                {pages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="w-10 text-center text-auralis-outline"
                            >
                                ...
                            </span>
                        );
                    }

                    const pageNum = page as number;
                    const isActive = pageNum === currentPage;

                    return (
                        <button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            className={`min-w-[40px] px-3 py-2 rounded-lg font-bold transition-all ${
                                isActive
                                    ? 'bg-primary-900 dark:bg-primary-600 text-white shadow-sm'
                                    : 'border border-auralis-outline-variant dark:border-auralis-on-surface-variant text-auralis-on-surface dark:text-gray-300 hover:bg-auralis-surface-container-low dark:hover:bg-white/5'
                            }`}
                            aria-label={`Page ${pageNum}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>

            {/* Next button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-auralis-outline-variant dark:border-auralis-on-surface-variant hover:bg-auralis-surface-container-low dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Page suivante"
            >
                <ChevronRightIcon className="w-5 h-5 text-auralis-on-surface dark:text-gray-300" />
            </button>
        </div>
    );
}
