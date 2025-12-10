/**
 * PROOFCHAIN - Validation Utilities
 * Fonctions de validation réutilisables
 */

export const validators = {
    required: (value: any) => {
        if (!value || (typeof value === 'string' && !value.trim())) {
            return 'Ce champ est requis';
        }
        return undefined;
    },

    email: (value: string) => {
        if (!value) return undefined;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Email invalide';
        }
        return undefined;
    },

    minLength: (min: number) => (value: string) => {
        if (!value) return undefined;
        if (value.length < min) {
            return `Minimum ${min} caractères requis`;
        }
        return undefined;
    },

    maxLength: (max: number) => (value: string) => {
        if (!value) return undefined;
        if (value.length > max) {
            return `Maximum ${max} caractères autorisés`;
        }
        return undefined;
    },

    url: (value: string) => {
        if (!value) return undefined;
        try {
            new URL(value);
            return undefined;
        } catch {
            return 'URL invalide';
        }
    },

    phone: (value: string) => {
        if (!value) return undefined;
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
        if (!phoneRegex.test(value)) {
            return 'Numéro de téléphone invalide';
        }
        return undefined;
    },

    cardanoAddress: (value: string) => {
        if (!value) return undefined;
        if (!value.startsWith('addr')) {
            return 'Adresse Cardano invalide';
        }
        return undefined;
    },

    assetId: (value: string) => {
        if (!value) return undefined;
        const assetIdRegex = /^[a-f0-9]{56,120}$/i;
        if (!assetIdRegex.test(value)) {
            return 'Asset ID invalide';
        }
        return undefined;
    },
};

export function composeValidators(...validators: Array<(value: any) => string | undefined>) {
    return (value: any) => {
        for (const validator of validators) {
            const error = validator(value);
            if (error) return error;
        }
        return undefined;
    };
}
