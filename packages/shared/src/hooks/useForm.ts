/**
 * PROOFCHAIN - Form Hook
 * Hook générique pour gérer les formulaires
 */

'use client';

import { useState, useCallback, ChangeEvent } from 'react';
import type { FormState } from '../types';

interface UseFormOptions<T> {
    initialValues: T;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
    onSubmit: (values: T) => Promise<void> | void;
}

export function useForm<T extends Record<string, any>>({
    initialValues,
    validate,
    onSubmit,
}: UseFormOptions<T>) {
    const [state, setState] = useState<FormState<T>>({
        data: initialValues,
        errors: {},
        isSubmitting: false,
        isValid: true,
    });

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value, type } = e.target;
            const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

            setState(prev => ({
                ...prev,
                data: { ...prev.data, [name]: finalValue },
                errors: { ...prev.errors, [name]: undefined },
            }));
        },
        []
    );

    const setFieldValue = useCallback((name: keyof T, value: any) => {
        setState(prev => ({
            ...prev,
            data: { ...prev.data, [name]: value },
            errors: { ...prev.errors, [name]: undefined },
        }));
    }, []);

    const setFieldError = useCallback((name: keyof T, error: string) => {
        setState(prev => ({
            ...prev,
            errors: { ...prev.errors, [name]: error },
        }));
    }, []);

    const handleSubmit = useCallback(
        async (e?: React.FormEvent) => {
            e?.preventDefault();

            // Validate
            const errors = validate?.(state.data) || {};
            const isValid = Object.keys(errors).length === 0;

            setState(prev => ({ ...prev, errors, isValid }));

            if (!isValid) return;

            // Submit
            setState(prev => ({ ...prev, isSubmitting: true }));

            try {
                await onSubmit(state.data);
            } catch (error) {
                console.error('Form submission error:', error);
            } finally {
                setState(prev => ({ ...prev, isSubmitting: false }));
            }
        },
        [state.data, validate, onSubmit]
    );

    const reset = useCallback(() => {
        setState({
            data: initialValues,
            errors: {},
            isSubmitting: false,
            isValid: true,
        });
    }, [initialValues]);

    return {
        values: state.data,
        errors: state.errors,
        isSubmitting: state.isSubmitting,
        isValid: state.isValid,
        handleChange,
        setFieldValue,
        setFieldError,
        handleSubmit,
        reset,
    };
}
