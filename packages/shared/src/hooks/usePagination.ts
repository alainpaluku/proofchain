/**
 * PROOFCHAIN - Pagination Hook
 * Hook pour gérer la pagination
 */

'use client';

import { useState, useMemo, useCallback } from 'react';

interface UsePaginationOptions {
    initialPage?: number;
    pageSize?: number;
}

export function usePagination<T>(
    items: T[],
    options: UsePaginationOptions = {}
) {
    const { initialPage = 1, pageSize = 10 } = options;

    const [currentPage, setCurrentPage] = useState(initialPage);

    const totalPages = useMemo(
        () => Math.ceil(items.length / pageSize),
        [items.length, pageSize]
    );

    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return items.slice(start, end);
    }, [items, currentPage, pageSize]);

    const goToPage = useCallback((page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    }, [totalPages]);

    const nextPage = useCallback(() => {
        goToPage(currentPage + 1);
    }, [currentPage, goToPage]);

    const prevPage = useCallback(() => {
        goToPage(currentPage - 1);
    }, [currentPage, goToPage]);

    const canGoNext = currentPage < totalPages;
    const canGoPrev = currentPage > 1;

    return {
        items: paginatedItems,
        currentPage,
        totalPages,
        pageSize,
        totalItems: items.length,
        goToPage,
        nextPage,
        prevPage,
        canGoNext,
        canGoPrev,
    };
}
