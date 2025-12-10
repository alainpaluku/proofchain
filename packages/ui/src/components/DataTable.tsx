/**
 * PROOFCHAIN UI - DataTable Component
 * Composant de tableau réutilisable avec tri, pagination et recherche
 */

'use client';

import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { Button } from './Button';

export interface Column<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (item: T) => React.ReactNode;
    width?: string;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    searchable?: boolean;
    searchPlaceholder?: string;
    onRowClick?: (item: T) => void;
    emptyMessage?: string;
    className?: string;
}

export function DataTable<T extends Record<string, any>>({
    data,
    columns,
    searchable = false,
    searchPlaceholder = 'Rechercher...',
    onRowClick,
    emptyMessage = 'Aucune donnée disponible',
    className = '',
}: DataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | 'desc';
    } | null>(null);

    // Filter data based on search
    const filteredData = useMemo(() => {
        if (!searchQuery) return data;

        return data.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [data, searchQuery]);

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortConfig) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [filteredData, sortConfig]);

    const handleSort = (key: string) => {
        setSortConfig(current => {
            if (!current || current.key !== key) {
                return { key, direction: 'asc' };
            }
            if (current.direction === 'asc') {
                return { key, direction: 'desc' };
            }
            return null;
        });
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Search */}
            {searchable && (
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            {columns.map(column => (
                                <th
                                    key={String(column.key)}
                                    className={`px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white ${
                                        column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''
                                    }`}
                                    style={{ width: column.width }}
                                    onClick={() => column.sortable && handleSort(String(column.key))}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.label}
                                        {column.sortable && sortConfig?.key === column.key && (
                                            sortConfig.direction === 'asc' ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" />
                                            )
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {sortedData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            sortedData.map((item, index) => (
                                <tr
                                    key={index}
                                    onClick={() => onRowClick?.(item)}
                                    className={`bg-white dark:bg-gray-900 ${
                                        onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''
                                    }`}
                                >
                                    {columns.map(column => (
                                        <td
                                            key={String(column.key)}
                                            className="px-6 py-4 text-sm text-gray-900 dark:text-white"
                                        >
                                            {column.render
                                                ? column.render(item)
                                                : String(item[column.key] || '-')}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Results count */}
            {sortedData.length > 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    {sortedData.length} résultat{sortedData.length > 1 ? 's' : ''}
                    {searchQuery && ` sur ${data.length} total`}
                </div>
            )}
        </div>
    );
}
