/**
 * PROOFCHAIN - Internationalization Hook
 * Support for FR, EN, SW, LN languages
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

export type Language = 'fr' | 'en' | 'sw' | 'ln';

interface Translations {
    [key: string]: {
        [lang in Language]: string;
    };
}

// Common translations across all apps
const commonTranslations: Translations = {
    // Navigation
    'nav.home': {
        fr: 'Accueil',
        en: 'Home',
        sw: 'Nyumbani',
        ln: 'Ndako',
    },
    'nav.dashboard': {
        fr: 'Tableau de bord',
        en: 'Dashboard',
        sw: 'Dashibodi',
        ln: 'Tableau ya bord',
    },
    'nav.settings': {
        fr: 'Paramètres',
        en: 'Settings',
        sw: 'Mipangilio',
        ln: 'Ba paramètres',
    },

    // Wallet
    'wallet.connect': {
        fr: 'Connecter le portefeuille',
        en: 'Connect Wallet',
        sw: 'Unganisha Pochi',
        ln: 'Kokangisa Portefeuille',
    },
    'wallet.disconnect': {
        fr: 'Déconnecter',
        en: 'Disconnect',
        sw: 'Tenganisha',
        ln: 'Kolongola',
    },
    'wallet.connected': {
        fr: 'Connecté',
        en: 'Connected',
        sw: 'Imeunganishwa',
        ln: 'Ekangami',
    },
    'wallet.balance': {
        fr: 'Solde',
        en: 'Balance',
        sw: 'Salio',
        ln: 'Solde',
    },

    // Common actions
    'action.verify': {
        fr: 'Vérifier',
        en: 'Verify',
        sw: 'Thibitisha',
        ln: 'Kotala',
    },
    'action.mint': {
        fr: 'Émettre',
        en: 'Mint',
        sw: 'Chapisha',
        ln: 'Kobimisa',
    },
    'action.submit': {
        fr: 'Soumettre',
        en: 'Submit',
        sw: 'Wasilisha',
        ln: 'Kotinda',
    },
    'action.cancel': {
        fr: 'Annuler',
        en: 'Cancel',
        sw: 'Ghairi',
        ln: 'Kotika',
    },
    'action.save': {
        fr: 'Enregistrer',
        en: 'Save',
        sw: 'Hifadhi',
        ln: 'Kobomba',
    },

    // Status
    'status.loading': {
        fr: 'Chargement...',
        en: 'Loading...',
        sw: 'Inapakia...',
        ln: 'Ezali kotonda...',
    },
    'status.success': {
        fr: 'Succès',
        en: 'Success',
        sw: 'Mafanikio',
        ln: 'Elongi',
    },
    'status.error': {
        fr: 'Erreur',
        en: 'Error',
        sw: 'Kosa',
        ln: 'Libunga',
    },

    // Theme
    'theme.light': {
        fr: 'Clair',
        en: 'Light',
        sw: 'Mwanga',
        ln: 'Pole',
    },
    'theme.dark': {
        fr: 'Sombre',
        en: 'Dark',
        sw: 'Giza',
        ln: 'Moindo',
    },

    // Diploma fields
    'diploma.student': {
        fr: 'Étudiant',
        en: 'Student',
        sw: 'Mwanafunzi',
        ln: 'Moyekoli',
    },
    'diploma.degree': {
        fr: 'Diplôme',
        en: 'Degree',
        sw: 'Shahada',
        ln: 'Diplôme',
    },
    'diploma.institution': {
        fr: 'Institution',
        en: 'Institution',
        sw: 'Taasisi',
        ln: 'Établissement',
    },
    'diploma.date': {
        fr: 'Date',
        en: 'Date',
        sw: 'Tarehe',
        ln: 'Mokolo',
    },
    'diploma.verified': {
        fr: 'Vérifié',
        en: 'Verified',
        sw: 'Imethibitishwa',
        ln: 'Etalami',
    },
};

export function useI18n(customTranslations?: Translations) {
    const [language, setLanguage] = useState<Language>('fr');

    // Load language from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('language') as Language;
            if (saved && ['fr', 'en', 'sw', 'ln'].includes(saved)) {
                setLanguage(saved);
            }
        }
    }, []);

    // Save language to localStorage
    const changeLanguage = useCallback((lang: Language) => {
        setLanguage(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', lang);
        }
    }, []);

    // Translate function
    const t = useCallback((key: string): string => {
        const allTranslations = { ...commonTranslations, ...customTranslations };
        return allTranslations[key]?.[language] || key;
    }, [language, customTranslations]);

    return {
        language,
        setLanguage: changeLanguage,
        t,
    };
}
