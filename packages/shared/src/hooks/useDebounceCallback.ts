/**
 * PROOFCHAIN - Debounce Callback Hook
 * Hook pour debouncer les fonctions
 */

'use client';

import { useCallback, useRef } from 'react';

export function useDebounceCallback<T extends (...args: any[]) => any>(
    callback: T,
    delay: number = 500
): T {
    const timeoutRef = useRef<NodeJS.Timeout>();

    return useCallback(
        ((...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        }) as T,
        [callback, delay]
    );
}
