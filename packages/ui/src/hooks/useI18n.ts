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

    // Verifier App - Home Page
    'verifier.hero.badge': {
        fr: 'Sécurisé par Cardano',
        en: 'Secured by Cardano',
        sw: 'Imelindwa na Cardano',
        ln: 'Ebatelami na Cardano',
    },
    'verifier.hero.title': {
        fr: 'Vérification Académique',
        en: 'Academic Verification',
        sw: 'Uthibitisho wa Kitaaluma',
        ln: 'Botalisi ya Kelasi',
    },
    'verifier.hero.subtitle': {
        fr: 'Vérifiez l\'authenticité des diplômes instantanément grâce à la technologie blockchain. Simple, rapide et infalsifiable.',
        en: 'Verify the authenticity of diplomas instantly using blockchain technology. Simple, fast and tamper-proof.',
        sw: 'Thibitisha uhalali wa vyeti mara moja kwa kutumia teknolojia ya blockchain. Rahisi, haraka na isiyoweza kubadilishwa.',
        ln: 'Talá bosolo ya ba diplômes mbala moko na tekinolozi ya blockchain. Pete, mbangu mpe ekoki kobongwana te.',
    },
    'verifier.hero.searchPlaceholder': {
        fr: 'Entrez l\'Asset ID ou scannez le QR code...',
        en: 'Enter Asset ID or scan QR code...',
        sw: 'Weka Asset ID au scan QR code...',
        ln: 'Kotisa Asset ID to scan QR code...',
    },
    'verifier.hero.scanButton': {
        fr: 'Scanner un QR Code',
        en: 'Scan QR Code',
        sw: 'Scan QR Code',
        ln: 'Scan QR Code',
    },

    // Stats
    'verifier.stats.verified': {
        fr: 'Diplômes Vérifiés',
        en: 'Verified Diplomas',
        sw: 'Vyeti Vilivyothibitishwa',
        ln: 'Ba Diplômes Etalami',
    },
    'verifier.stats.institutions': {
        fr: 'Institutions Partenaires',
        en: 'Partner Institutions',
        sw: 'Taasisi Washirika',
        ln: 'Ba Institutions Partenaires',
    },
    'verifier.stats.daily': {
        fr: 'Vérifications/Jour',
        en: 'Verifications/Day',
        sw: 'Uthibitisho/Siku',
        ln: 'Botalisi/Mokolo',
    },

    // Recent Verifications
    'verifier.recent.title': {
        fr: 'Vérifications Récentes',
        en: 'Recent Verifications',
        sw: 'Uthibitisho wa Hivi Karibuni',
        ln: 'Botalisi ya Sika',
    },
    'verifier.recent.viewAll': {
        fr: 'Voir tout',
        en: 'View All',
        sw: 'Ona Yote',
        ln: 'Talá Nionso',
    },
    'verifier.recent.empty': {
        fr: 'Aucune vérification récente',
        en: 'No recent verifications',
        sw: 'Hakuna uthibitisho wa hivi karibuni',
        ln: 'Botalisi ya sika te',
    },
    'verifier.recent.emptyDesc': {
        fr: 'Les diplômes vérifiés apparaîtront ici',
        en: 'Verified diplomas will appear here',
        sw: 'Vyeti vilivyothibitishwa vitaonekana hapa',
        ln: 'Ba diplômes etalami ekomonana awa',
    },

    // Footer
    'verifier.footer.copyright': {
        fr: '© 2024 PROOFCHAIN. Propulsé par',
        en: '© 2024 PROOFCHAIN. Powered by',
        sw: '© 2024 PROOFCHAIN. Inaendeshwa na',
        ln: '© 2024 PROOFCHAIN. Etambwisami na',
    },
    'verifier.footer.blockchain': {
        fr: 'Cardano Blockchain',
        en: 'Cardano Blockchain',
        sw: 'Cardano Blockchain',
        ln: 'Cardano Blockchain',
    },

    // Navigation
    'nav.history': {
        fr: 'Historique',
        en: 'History',
        sw: 'Historia',
        ln: 'Likambo ya kala',
    },
    'nav.profile': {
        fr: 'Profil',
        en: 'Profile',
        sw: 'Wasifu',
        ln: 'Profil',
    },
    'nav.documents': {
        fr: 'Mes Documents',
        en: 'My Documents',
        sw: 'Hati Zangu',
        ln: 'Mikanda na ngai',
    },
    'nav.scan': {
        fr: 'Scanner',
        en: 'Scan',
        sw: 'Scan',
        ln: 'Scan',
    },

    // Scan Page
    'scan.title': {
        fr: 'Scanner un QR Code',
        en: 'Scan QR Code',
        sw: 'Scan QR Code',
        ln: 'Scan QR Code',
    },
    'scan.subtitle': {
        fr: 'Scannez le QR code du diplôme pour vérifier son authenticité',
        en: 'Scan the diploma QR code to verify its authenticity',
        sw: 'Scan QR code ya cheti ili kuthibitisha uhalali wake',
        ln: 'Scan QR code ya diplôme mpo na kotalá bosolo na yango',
    },
    'scan.back': {
        fr: 'Retour',
        en: 'Back',
        sw: 'Rudi',
        ln: 'Zonga',
    },
    'scan.manualTitle': {
        fr: 'Ou entrez l\'Asset ID manuellement',
        en: 'Or enter Asset ID manually',
        sw: 'Au weka Asset ID kwa mkono',
        ln: 'To kotisa Asset ID na mabɔkɔ',
    },
    'scan.manualPlaceholder': {
        fr: 'Collez l\'Asset ID ici...',
        en: 'Paste Asset ID here...',
        sw: 'Bandika Asset ID hapa...',
        ln: 'Kotisa Asset ID awa...',
    },
    'scan.verifyButton': {
        fr: 'Vérifier le diplôme',
        en: 'Verify Diploma',
        sw: 'Thibitisha Cheti',
        ln: 'Talá Diplôme',
    },

    // Documents Page
    'documents.title': {
        fr: 'Mes Documents',
        en: 'My Documents',
        sw: 'Hati Zangu',
        ln: 'Mikanda na ngai',
    },
    'documents.subtitle': {
        fr: 'Gérez et consultez vos documents vérifiés',
        en: 'Manage and view your verified documents',
        sw: 'Simamia na uangalie hati zako zilizothibitishwa',
        ln: 'Simba mpe talá mikanda na yo etalami',
    },
    'documents.empty': {
        fr: 'Aucun document',
        en: 'No documents',
        sw: 'Hakuna hati',
        ln: 'Mikanda te',
    },
    'documents.emptyDesc': {
        fr: 'Vous n\'avez pas encore de documents vérifiés',
        en: 'You don\'t have any verified documents yet',
        sw: 'Bado huna hati zilizothibitishwa',
        ln: 'Ozali naino na mikanda etalami te',
    },
    'documents.addButton': {
        fr: 'Ajouter un document',
        en: 'Add Document',
        sw: 'Ongeza Hati',
        ln: 'Bakisa Mokanda',
    },

    // Logout
    'nav.logout': {
        fr: 'Déconnexion',
        en: 'Logout',
        sw: 'Toka',
        ln: 'Kobima',
    },
    'logout.confirm': {
        fr: 'Êtes-vous sûr de vouloir vous déconnecter ?',
        en: 'Are you sure you want to logout?',
        sw: 'Una uhakika unataka kutoka?',
        ln: 'Ozali na ntembe ya kolinga kobima?',
    },
    'logout.message': {
        fr: 'Déconnexion...',
        en: 'Logging out...',
        sw: 'Inatoka...',
        ln: 'Ezali kobima...',
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
