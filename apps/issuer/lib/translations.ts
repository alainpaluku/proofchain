/**
 * PROOFCHAIN Issuer - Translations
 * FR, EN, SW, LN
 */

import { Language } from '@proofchain/ui';

interface Translations {
    [key: string]: {
        [lang in Language]: string;
    };
}

export const issuerTranslations: Translations = {
    // Dashboard
    'issuer.dashboard.title': {
        fr: 'Tableau de bord',
        en: 'Dashboard',
        sw: 'Dashibodi',
        ln: 'Tableau ya bord',
    },
    'issuer.dashboard.subtitle': {
        fr: 'Vue d\'ensemble de votre activité',
        en: 'Overview of your activity',
        sw: 'Muhtasari wa shughuli zako',
        ln: 'Vue d\'ensemble ya mosala na yo',
    },
    'issuer.dashboard.stats.diplomas': {
        fr: 'Diplômes émis',
        en: 'Diplomas issued',
        sw: 'Vyeti vilivyotolewa',
        ln: 'Ba diplômes ebimisami',
    },
    'issuer.dashboard.stats.students': {
        fr: 'Étudiants',
        en: 'Students',
        sw: 'Wanafunzi',
        ln: 'Bayekoli',
    },
    'issuer.dashboard.stats.pending': {
        fr: 'En attente',
        en: 'Pending',
        sw: 'Inasubiri',
        ln: 'Ezali kozela',
    },
    'issuer.dashboard.stats.verified': {
        fr: 'Vérifiés',
        en: 'Verified',
        sw: 'Imethibitishwa',
        ln: 'Etalami',
    },

    // Mint Page
    'issuer.mint.title': {
        fr: 'Émettre un diplôme',
        en: 'Issue a Diploma',
        sw: 'Toa Cheti',
        ln: 'Kobimisa Diplôme',
    },
    'issuer.mint.subtitle': {
        fr: 'Créez un nouveau diplôme NFT sur la blockchain',
        en: 'Create a new diploma NFT on the blockchain',
        sw: 'Unda cheti kipya cha NFT kwenye blockchain',
        ln: 'Sala diplôme ya sika ya NFT na blockchain',
    },
    'issuer.mint.form.studentName': {
        fr: 'Nom de l\'étudiant',
        en: 'Student Name',
        sw: 'Jina la Mwanafunzi',
        ln: 'Nkombo ya Moyekoli',
    },
    'issuer.mint.form.studentNamePlaceholder': {
        fr: 'Ex: Jean Dupont',
        en: 'Ex: John Doe',
        sw: 'Mfano: Juma Mwangi',
        ln: 'Ndakisa: Mbuta Nzambe',
    },
    'issuer.mint.form.degree': {
        fr: 'Type de diplôme',
        en: 'Degree Type',
        sw: 'Aina ya Cheti',
        ln: 'Lolenge ya Diplôme',
    },
    'issuer.mint.form.degreePlaceholder': {
        fr: 'Ex: Licence en Informatique',
        en: 'Ex: Bachelor in Computer Science',
        sw: 'Mfano: Shahada ya Kompyuta',
        ln: 'Ndakisa: Licence na Informatique',
    },
    'issuer.mint.form.graduationDate': {
        fr: 'Date de graduation',
        en: 'Graduation Date',
        sw: 'Tarehe ya Kuhitimu',
        ln: 'Mokolo ya Kosilisa',
    },
    'issuer.mint.form.honors': {
        fr: 'Mention',
        en: 'Honors',
        sw: 'Heshima',
        ln: 'Mention',
    },
    'issuer.mint.form.honorsPlaceholder': {
        fr: 'Ex: Très Bien',
        en: 'Ex: Summa Cum Laude',
        sw: 'Mfano: Kwa Heshima Kubwa',
        ln: 'Ndakisa: Malamu Mingi',
    },
    'issuer.mint.form.ipfsImage': {
        fr: 'Image IPFS (CID)',
        en: 'IPFS Image (CID)',
        sw: 'Picha ya IPFS (CID)',
        ln: 'Image IPFS (CID)',
    },
    'issuer.mint.form.ipfsImagePlaceholder': {
        fr: 'Ex: QmX...',
        en: 'Ex: QmX...',
        sw: 'Mfano: QmX...',
        ln: 'Ndakisa: QmX...',
    },
    'issuer.mint.button.mint': {
        fr: 'Émettre le diplôme',
        en: 'Issue Diploma',
        sw: 'Toa Cheti',
        ln: 'Kobimisa Diplôme',
    },
    'issuer.mint.button.minting': {
        fr: 'Émission en cours...',
        en: 'Issuing...',
        sw: 'Inatoa...',
        ln: 'Ezali kobimisa...',
    },

    // Students Page
    'issuer.students.title': {
        fr: 'Gestion des étudiants',
        en: 'Student Management',
        sw: 'Usimamizi wa Wanafunzi',
        ln: 'Boyangeli ya Bayekoli',
    },
    'issuer.students.subtitle': {
        fr: 'Gérez les informations de vos étudiants',
        en: 'Manage your students information',
        sw: 'Simamia taarifa za wanafunzi wako',
        ln: 'Simba ba informations ya bayekoli na yo',
    },
    'issuer.students.search': {
        fr: 'Rechercher un étudiant...',
        en: 'Search student...',
        sw: 'Tafuta mwanafunzi...',
        ln: 'Luka moyekoli...',
    },
    'issuer.students.addButton': {
        fr: 'Ajouter un étudiant',
        en: 'Add Student',
        sw: 'Ongeza Mwanafunzi',
        ln: 'Bakisa Moyekoli',
    },
    'issuer.students.table.name': {
        fr: 'Nom',
        en: 'Name',
        sw: 'Jina',
        ln: 'Nkombo',
    },
    'issuer.students.table.email': {
        fr: 'Email',
        en: 'Email',
        sw: 'Barua pepe',
        ln: 'Email',
    },
    'issuer.students.table.program': {
        fr: 'Programme',
        en: 'Program',
        sw: 'Programu',
        ln: 'Programme',
    },
    'issuer.students.table.status': {
        fr: 'Statut',
        en: 'Status',
        sw: 'Hali',
        ln: 'État',
    },
    'issuer.students.table.actions': {
        fr: 'Actions',
        en: 'Actions',
        sw: 'Vitendo',
        ln: 'Misala',
    },
    'issuer.students.empty': {
        fr: 'Aucun étudiant',
        en: 'No students',
        sw: 'Hakuna wanafunzi',
        ln: 'Bayekoli te',
    },
    'issuer.students.emptyDesc': {
        fr: 'Ajoutez votre premier étudiant pour commencer',
        en: 'Add your first student to get started',
        sw: 'Ongeza mwanafunzi wako wa kwanza kuanza',
        ln: 'Bakisa moyekoli na yo ya liboso mpo na kobanda',
    },

    // KYC Page
    'issuer.kyc.title': {
        fr: 'Validation KYC',
        en: 'KYC Validation',
        sw: 'Uthibitisho wa KYC',
        ln: 'Botalisi KYC',
    },
    'issuer.kyc.subtitle': {
        fr: 'Vérification d\'identité institutionnelle',
        en: 'Institutional identity verification',
        sw: 'Uthibitisho wa kitambulisho cha taasisi',
        ln: 'Botalisi ya identité ya établissement',
    },
    'issuer.kyc.form.institutionName': {
        fr: 'Nom de l\'institution',
        en: 'Institution Name',
        sw: 'Jina la Taasisi',
        ln: 'Nkombo ya Établissement',
    },
    'issuer.kyc.form.institutionNamePlaceholder': {
        fr: 'Ex: Université de Kinshasa',
        en: 'Ex: University of Kinshasa',
        sw: 'Mfano: Chuo Kikuu cha Kinshasa',
        ln: 'Ndakisa: Université ya Kinshasa',
    },
    'issuer.kyc.form.country': {
        fr: 'Pays',
        en: 'Country',
        sw: 'Nchi',
        ln: 'Mboka',
    },
    'issuer.kyc.form.countryPlaceholder': {
        fr: 'Sélectionnez un pays',
        en: 'Select a country',
        sw: 'Chagua nchi',
        ln: 'Pona mboka',
    },
    'issuer.kyc.form.registrationNumber': {
        fr: 'Numéro d\'enregistrement',
        en: 'Registration Number',
        sw: 'Nambari ya Usajili',
        ln: 'Nimero ya Enregistrement',
    },
    'issuer.kyc.form.registrationNumberPlaceholder': {
        fr: 'Ex: 123456789',
        en: 'Ex: 123456789',
        sw: 'Mfano: 123456789',
        ln: 'Ndakisa: 123456789',
    },
    'issuer.kyc.form.address': {
        fr: 'Adresse complète',
        en: 'Full Address',
        sw: 'Anwani Kamili',
        ln: 'Adresse mobimba',
    },
    'issuer.kyc.form.addressPlaceholder': {
        fr: 'Rue, ville, code postal',
        en: 'Street, city, postal code',
        sw: 'Barabara, mji, msimbo wa posta',
        ln: 'Balabala, engumba, code postal',
    },
    'issuer.kyc.form.phone': {
        fr: 'Téléphone',
        en: 'Phone',
        sw: 'Simu',
        ln: 'Telefone',
    },
    'issuer.kyc.form.phonePlaceholder': {
        fr: '+243 XXX XXX XXX',
        en: '+243 XXX XXX XXX',
        sw: '+243 XXX XXX XXX',
        ln: '+243 XXX XXX XXX',
    },
    'issuer.kyc.form.email': {
        fr: 'Email officiel',
        en: 'Official Email',
        sw: 'Barua pepe rasmi',
        ln: 'Email officiel',
    },
    'issuer.kyc.form.emailPlaceholder': {
        fr: 'contact@institution.cd',
        en: 'contact@institution.cd',
        sw: 'mawasiliano@taasisi.cd',
        ln: 'contact@établissement.cd',
    },
    'issuer.kyc.form.website': {
        fr: 'Site web',
        en: 'Website',
        sw: 'Tovuti',
        ln: 'Site web',
    },
    'issuer.kyc.form.websitePlaceholder': {
        fr: 'https://www.institution.cd',
        en: 'https://www.institution.cd',
        sw: 'https://www.taasisi.cd',
        ln: 'https://www.établissement.cd',
    },
    'issuer.kyc.form.documents': {
        fr: 'Documents requis',
        en: 'Required Documents',
        sw: 'Hati Zinazohitajika',
        ln: 'Mikanda esengeli',
    },
    'issuer.kyc.form.registrationCert': {
        fr: 'Certificat d\'enregistrement',
        en: 'Registration Certificate',
        sw: 'Cheti cha Usajili',
        ln: 'Certificat ya Enregistrement',
    },
    'issuer.kyc.form.ministerialDecree': {
        fr: 'Arrêté ministériel',
        en: 'Ministerial Decree',
        sw: 'Amri ya Wizara',
        ln: 'Arrêté ministériel',
    },
    'issuer.kyc.form.taxCert': {
        fr: 'Attestation fiscale',
        en: 'Tax Certificate',
        sw: 'Cheti cha Kodi',
        ln: 'Attestation fiscale',
    },
    'issuer.kyc.form.uploadButton': {
        fr: 'Télécharger',
        en: 'Upload',
        sw: 'Pakia',
        ln: 'Kotinda',
    },
    'issuer.kyc.form.submitButton': {
        fr: 'Soumettre la demande',
        en: 'Submit Request',
        sw: 'Wasilisha Ombi',
        ln: 'Kotinda Demande',
    },
    'issuer.kyc.form.submitting': {
        fr: 'Soumission en cours...',
        en: 'Submitting...',
        sw: 'Inawasilisha...',
        ln: 'Ezali kotinda...',
    },

    // Subscriptions Page
    'issuer.subscriptions.title': {
        fr: 'Abonnements',
        en: 'Subscriptions',
        sw: 'Usajili',
        ln: 'Ba Abonnements',
    },
    'issuer.subscriptions.subtitle': {
        fr: 'Choisissez le plan adapté à vos besoins',
        en: 'Choose the plan that fits your needs',
        sw: 'Chagua mpango unaofaa mahitaji yako',
        ln: 'Pona plan oyo ekokani na bamposa na yo',
    },
    'issuer.subscriptions.plan.starter': {
        fr: 'Starter',
        en: 'Starter',
        sw: 'Starter',
        ln: 'Starter',
    },
    'issuer.subscriptions.plan.professional': {
        fr: 'Professionnel',
        en: 'Professional',
        sw: 'Kitaaluma',
        ln: 'Professionnel',
    },
    'issuer.subscriptions.plan.enterprise': {
        fr: 'Entreprise',
        en: 'Enterprise',
        sw: 'Biashara',
        ln: 'Entreprise',
    },
    'issuer.subscriptions.price.month': {
        fr: '/mois',
        en: '/month',
        sw: '/mwezi',
        ln: '/sanza',
    },
    'issuer.subscriptions.feature.diplomas': {
        fr: 'diplômes/mois',
        en: 'diplomas/month',
        sw: 'vyeti/mwezi',
        ln: 'ba diplômes/sanza',
    },
    'issuer.subscriptions.feature.support': {
        fr: 'Support',
        en: 'Support',
        sw: 'Msaada',
        ln: 'Support',
    },
    'issuer.subscriptions.feature.supportEmail': {
        fr: 'Support email',
        en: 'Email support',
        sw: 'Msaada wa barua pepe',
        ln: 'Support na email',
    },
    'issuer.subscriptions.feature.supportPriority': {
        fr: 'Support prioritaire',
        en: 'Priority support',
        sw: 'Msaada wa kipaumbele',
        ln: 'Support ya liboso',
    },
    'issuer.subscriptions.feature.supportDedicated': {
        fr: 'Support dédié 24/7',
        en: 'Dedicated 24/7 support',
        sw: 'Msaada maalum 24/7',
        ln: 'Support ya moko 24/7',
    },
    'issuer.subscriptions.feature.storage': {
        fr: 'Stockage IPFS',
        en: 'IPFS Storage',
        sw: 'Hifadhi ya IPFS',
        ln: 'Stockage IPFS',
    },
    'issuer.subscriptions.feature.api': {
        fr: 'Accès API',
        en: 'API Access',
        sw: 'Ufikiaji wa API',
        ln: 'Accès API',
    },
    'issuer.subscriptions.feature.customization': {
        fr: 'Personnalisation avancée',
        en: 'Advanced customization',
        sw: 'Ubinafsishaji wa juu',
        ln: 'Personnalisation ya likolo',
    },
    'issuer.subscriptions.button.current': {
        fr: 'Plan actuel',
        en: 'Current Plan',
        sw: 'Mpango wa Sasa',
        ln: 'Plan ya lelo',
    },
    'issuer.subscriptions.button.choose': {
        fr: 'Choisir ce plan',
        en: 'Choose Plan',
        sw: 'Chagua Mpango',
        ln: 'Pona Plan oyo',
    },
    'issuer.subscriptions.button.upgrade': {
        fr: 'Mettre à niveau',
        en: 'Upgrade',
        sw: 'Boresha',
        ln: 'Kotombola',
    },

    // Settings Page
    'issuer.settings.title': {
        fr: 'Paramètres',
        en: 'Settings',
        sw: 'Mipangilio',
        ln: 'Ba Paramètres',
    },
    'issuer.settings.subtitle': {
        fr: 'Gérez vos préférences et paramètres',
        en: 'Manage your preferences and settings',
        sw: 'Simamia mapendeleo na mipangilio yako',
        ln: 'Simba ba préférences mpe ba paramètres na yo',
    },
    'issuer.settings.section.appearance': {
        fr: 'Apparence',
        en: 'Appearance',
        sw: 'Mwonekano',
        ln: 'Apparence',
    },
    'issuer.settings.section.language': {
        fr: 'Langue',
        en: 'Language',
        sw: 'Lugha',
        ln: 'Lokota',
    },
    'issuer.settings.section.notifications': {
        fr: 'Notifications',
        en: 'Notifications',
        sw: 'Arifa',
        ln: 'Ba Notifications',
    },
    'issuer.settings.section.security': {
        fr: 'Sécurité',
        en: 'Security',
        sw: 'Usalama',
        ln: 'Sécurité',
    },
    'issuer.settings.theme.label': {
        fr: 'Thème',
        en: 'Theme',
        sw: 'Mandhari',
        ln: 'Thème',
    },
    'issuer.settings.theme.light': {
        fr: 'Clair',
        en: 'Light',
        sw: 'Mwanga',
        ln: 'Pole',
    },
    'issuer.settings.theme.dark': {
        fr: 'Sombre',
        en: 'Dark',
        sw: 'Giza',
        ln: 'Moindo',
    },
    'issuer.settings.theme.system': {
        fr: 'Système',
        en: 'System',
        sw: 'Mfumo',
        ln: 'Système',
    },
    'issuer.settings.language.label': {
        fr: 'Langue de l\'interface',
        en: 'Interface Language',
        sw: 'Lugha ya Kiolesura',
        ln: 'Lokota ya Interface',
    },
    'issuer.settings.language.french': {
        fr: 'Français',
        en: 'French',
        sw: 'Kifaransa',
        ln: 'Lifalanse',
    },
    'issuer.settings.language.english': {
        fr: 'Anglais',
        en: 'English',
        sw: 'Kiingereza',
        ln: 'Lingelesi',
    },
    'issuer.settings.language.swahili': {
        fr: 'Swahili',
        en: 'Swahili',
        sw: 'Kiswahili',
        ln: 'Swahili',
    },
    'issuer.settings.language.lingala': {
        fr: 'Lingala',
        en: 'Lingala',
        sw: 'Lingala',
        ln: 'Lingala',
    },

    // Navigation
    'issuer.nav.dashboard': {
        fr: 'Tableau de bord',
        en: 'Dashboard',
        sw: 'Dashibodi',
        ln: 'Tableau ya bord',
    },
    'issuer.nav.mint': {
        fr: 'Émettre',
        en: 'Issue',
        sw: 'Toa',
        ln: 'Kobimisa',
    },
    'issuer.nav.students': {
        fr: 'Étudiants',
        en: 'Students',
        sw: 'Wanafunzi',
        ln: 'Bayekoli',
    },
    'issuer.nav.kyc': {
        fr: 'Validation KYC',
        en: 'KYC Validation',
        sw: 'Uthibitisho wa KYC',
        ln: 'Botalisi KYC',
    },
    'issuer.nav.subscriptions': {
        fr: 'Abonnements',
        en: 'Subscriptions',
        sw: 'Usajili',
        ln: 'Ba Abonnements',
    },
    'issuer.nav.settings': {
        fr: 'Paramètres',
        en: 'Settings',
        sw: 'Mipangilio',
        ln: 'Ba Paramètres',
    },

    // Common
    'issuer.common.loading': {
        fr: 'Chargement...',
        en: 'Loading...',
        sw: 'Inapakia...',
        ln: 'Ezali kotonda...',
    },
    'issuer.common.error': {
        fr: 'Une erreur est survenue',
        en: 'An error occurred',
        sw: 'Kosa limetokea',
        ln: 'Libunga esalemi',
    },
    'issuer.common.success': {
        fr: 'Opération réussie',
        en: 'Operation successful',
        sw: 'Mafanikio',
        ln: 'Elongi',
    },
    'issuer.common.cancel': {
        fr: 'Annuler',
        en: 'Cancel',
        sw: 'Ghairi',
        ln: 'Kotika',
    },
    'issuer.common.save': {
        fr: 'Enregistrer',
        en: 'Save',
        sw: 'Hifadhi',
        ln: 'Kobomba',
    },
    'issuer.common.delete': {
        fr: 'Supprimer',
        en: 'Delete',
        sw: 'Futa',
        ln: 'Kolongola',
    },
    'issuer.common.edit': {
        fr: 'Modifier',
        en: 'Edit',
        sw: 'Hariri',
        ln: 'Kobongola',
    },
    'issuer.common.view': {
        fr: 'Voir',
        en: 'View',
        sw: 'Ona',
        ln: 'Talá',
    },
    'issuer.common.back': {
        fr: 'Retour',
        en: 'Back',
        sw: 'Rudi',
        ln: 'Zonga',
    },
    'issuer.common.next': {
        fr: 'Suivant',
        en: 'Next',
        sw: 'Ifuatayo',
        ln: 'Oyo elandaka',
    },
    'issuer.common.previous': {
        fr: 'Précédent',
        en: 'Previous',
        sw: 'Iliyotangulia',
        ln: 'Oyo eleki',
    },
    'issuer.common.search': {
        fr: 'Rechercher',
        en: 'Search',
        sw: 'Tafuta',
        ln: 'Luka',
    },
    'issuer.common.filter': {
        fr: 'Filtrer',
        en: 'Filter',
        sw: 'Chuja',
        ln: 'Kopona',
    },
    'issuer.common.export': {
        fr: 'Exporter',
        en: 'Export',
        sw: 'Hamisha',
        ln: 'Kobimisa',
    },
    'issuer.common.import': {
        fr: 'Importer',
        en: 'Import',
        sw: 'Leta',
        ln: 'Kokotisa',
    },

    // Quick Actions
    'issuer.dashboard.quickActions.mint': {
        fr: 'Émettre un diplôme',
        en: 'Issue a Diploma',
        sw: 'Toa Cheti',
        ln: 'Kobimisa Diplôme',
    },
    'issuer.dashboard.quickActions.mintDesc': {
        fr: 'Créer un nouveau NFT diplôme',
        en: 'Create a new diploma NFT',
        sw: 'Unda cheti kipya cha NFT',
        ln: 'Sala diplôme ya sika ya NFT',
    },
    'issuer.dashboard.quickActions.students': {
        fr: 'Gérer les étudiants',
        en: 'Manage Students',
        sw: 'Simamia Wanafunzi',
        ln: 'Simba Bayekoli',
    },
    'issuer.dashboard.quickActions.studentsDesc': {
        fr: 'Voir et modifier les profils',
        en: 'View and edit profiles',
        sw: 'Ona na hariri wasifu',
        ln: 'Talá mpe bongola ba profils',
    },
    'issuer.dashboard.quickActions.kyc': {
        fr: 'Valider KYC',
        en: 'Validate KYC',
        sw: 'Thibitisha KYC',
        ln: 'Talá KYC',
    },
    'issuer.dashboard.quickActions.kycDesc': {
        fr: 'Vérifier les identités',
        en: 'Verify identities',
        sw: 'Thibitisha vitambulisho',
        ln: 'Talá ba identités',
    },
    'issuer.dashboard.recentActivity': {
        fr: 'Activité récente',
        en: 'Recent Activity',
        sw: 'Shughuli za Hivi Karibuni',
        ln: 'Misala ya Sika',
    },
    'issuer.dashboard.noActivity': {
        fr: 'Aucune activité récente',
        en: 'No recent activity',
        sw: 'Hakuna shughuli za hivi karibuni',
        ln: 'Misala ya sika te',
    },
    'issuer.dashboard.noActivityDesc': {
        fr: 'Les activités apparaîtront ici',
        en: 'Activities will appear here',
        sw: 'Shughuli zitaonekana hapa',
        ln: 'Misala ekomonana awa',
    },
};
