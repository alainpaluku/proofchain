/**
 * PROOFCHAIN - Async Hook
 * Hook générique pour gérer les opérations asynchrones
 */

'use client';

import { useState, useCallback, useEffect } from 'react';

interface UseAsyncOptions<T> {
    immediate?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
}

export function useAsync<T, Args extends any[] = []>(
    asyncFunction: (...args: Args) => Promise<T>,
    options: UseAsyncOptions<T> = {}
) {
    const { immediate = false, onSuccess, onError } = options;

    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const execute = useCallback(
        async (...args: Args) => {
            setIsLoading(true);
            setError(null);

            try {
                const result = await asyncFunction(...args);
                setData(result);
                onSuccess?.(result);
                return result;
            } catch (err) {
                const error = err instanceof Error ? err : new Error(String(err));
                setError(error);
                onError?.(error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        [asyncFunction, onSuccess, onError]
    );

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (immediate) {
            (execute as () => Promise<T>)();
        }
        // execute is stable due to useCallback, only run on immediate change
    }, [immediate, execute]);

    return {
        data,
        error,
        isLoading,
        execute,
        reset,
    };
}
