/**
 * PROOFCHAIN - Format Utilities
 * Fonctions de formatage réutilisables
 */

export function formatDate(date: Date | string, locale: string = 'fr-FR'): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function formatDateTime(date: Date | string, locale: string = 'fr-FR'): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatRelativeTime(date: Date | string, locale: string = 'fr'): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    const translations: Record<string, Record<string, string>> = {
        fr: {
            justNow: 'À l\'instant',
            minutesAgo: 'Il y a {n} minute(s)',
            hoursAgo: 'Il y a {n} heure(s)',
            daysAgo: 'Il y a {n} jour(s)',
        },
        en: {
            justNow: 'Just now',
            minutesAgo: '{n} minute(s) ago',
            hoursAgo: '{n} hour(s) ago',
            daysAgo: '{n} day(s) ago',
        },
    };

    const t = translations[locale] || translations.fr;

    if (diffMins < 1) return t.justNow;
    if (diffMins < 60) return t.minutesAgo.replace('{n}', diffMins.toString());
    if (diffHours < 24) return t.hoursAgo.replace('{n}', diffHours.toString());
    return t.daysAgo.replace('{n}', diffDays.toString());
}

export function formatCurrency(amount: number, currency: 'USD' | 'CDF' = 'USD'): string {
    const symbols = { USD: '$', CDF: 'FC' };
    return `${symbols[currency]}${amount.toLocaleString('fr-FR')}`;
}

export function formatNumber(num: number, locale: string = 'fr-FR'): string {
    return num.toLocaleString(locale);
}

export function truncateAddress(address: string, start: number = 8, end: number = 8): string {
    if (address.length <= start + end) return address;
    return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
}

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
