/**
 * PROOFCHAIN Admin - Translations
 * FR, EN, SW, LN support
 */

import type { Language } from '@proofchain/ui';

interface Translations {
    [key: string]: {
        [lang in Language]: string;
    };
}

export const adminTranslations: Translations = {
    // Navigation
    'admin.nav.dashboard': {
        fr: 'Dashboard',
        en: 'Dashboard',
        sw: 'Dashibodi',
        ln: 'Tableau ya bord',
    },
    'admin.nav.institutions': {
        fr: 'Institutions',
        en: 'Institutions',
        sw: 'Taasisi',
        ln: 'Ba Institutions',
    },
    'admin.nav.kyc': {
        fr: 'Validation KYC',
        en: 'KYC Validation',
        sw: 'Uthibitisho wa KYC',
        ln: 'Botalisi KYC',
    },
    'admin.nav.subscriptions': {
        fr: 'Abonnements',
        en: 'Subscriptions',
        sw: 'Usajili',
        ln: 'Ba Abonnements',
    },
    'admin.nav.statistics': {
        fr: 'Statistiques',
        en: 'Statistics',
        sw: 'Takwimu',
        ln: 'Ba Statistiques',
    },
    'admin.nav.settings': {
        fr: 'Paramètres',
        en: 'Settings',
        sw: 'Mipangilio',
        ln: 'Ba Paramètres',
    },
};
