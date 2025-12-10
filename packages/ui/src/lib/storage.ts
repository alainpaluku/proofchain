/**
 * Safe localStorage utilities with error handling
 */

export type Theme = 'light' | 'dark' | 'system';

export interface StorageKeys {
    theme: Theme;
    language: string;
    notifications: any[];
    myDocuments: any[];
    autoVerify: boolean;
}

export function getStorageItem<K extends keyof StorageKeys>(
    key: K
): StorageKeys[K] | null {
    if (typeof window === 'undefined') return null;

    try {
        const item = localStorage.getItem(key);
        if (item === null) return null;
        return JSON.parse(item) as StorageKeys[K];
    } catch (error) {
        console.error(`Failed to get storage item "${key}":`, error);
        return null;
    }
}

export function setStorageItem<K extends keyof StorageKeys>(
    key: K,
    value: StorageKeys[K]
): boolean {
    if (typeof window === 'undefined') return false;

    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Failed to set storage item "${key}":`, error);
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
            console.warn('localStorage quota exceeded. Consider clearing old data.');
        }
        return false;
    }
}

export function removeStorageItem(key: keyof StorageKeys): boolean {
    if (typeof window === 'undefined') return false;

    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Failed to remove storage item "${key}":`, error);
        return false;
    }
}

export function clearStorage(): boolean {
    if (typeof window === 'undefined') return false;

    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('Failed to clear storage:', error);
        return false;
    }
}

export function isStorageAvailable(): boolean {
    if (typeof window === 'undefined') return false;

    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
}
