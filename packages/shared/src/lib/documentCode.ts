/**
 * PROOFCHAIN - Générateur de Code Document Unique
 * Format: CD-UN-000A-PHD-02012025-0000000A
 * 
 * Structure:
 * - CD: Code pays (2 lettres)
 * - UN: Type institution (UN=Université, IS=Institut, LC=Lycée, CF=Centre Formation)
 * - 000A: Numéro école (base 36, 4 caractères)
 * - PHD: Type diplôme (Bachelor, Master, PhD, Certificate, Diploma)
 * - 02012025: Date émission (DDMMYYYY)
 * - 0000000A: Numéro document (base 36, 8 caractères)
 */

// Types d'institutions
export type InstitutionType = 'UN' | 'IS' | 'LC' | 'CF';

// Types de diplômes
export type DegreeType = 'BAC' | 'LIC' | 'MAS' | 'PHD' | 'CER' | 'DIP';

// Mapping des types de diplômes
export const DEGREE_TYPE_MAP: Record<string, DegreeType> = {
    'Bachelor': 'BAC',
    'Licence': 'LIC',
    'Master': 'MAS',
    'PhD': 'PHD',
    'Doctorat': 'PHD',
    'Certificate': 'CER',
    'Certificat': 'CER',
    'Diploma': 'DIP',
    'Diplôme': 'DIP',
};

// Mapping inverse pour affichage
export const DEGREE_TYPE_LABELS: Record<DegreeType, string> = {
    'BAC': 'Bachelor',
    'LIC': 'Licence',
    'MAS': 'Master',
    'PHD': 'Doctorat',
    'CER': 'Certificat',
    'DIP': 'Diplôme',
};

// Mapping des types d'institutions
export const INSTITUTION_TYPE_LABELS: Record<InstitutionType, string> = {
    'UN': 'Université',
    'IS': 'Institut Supérieur',
    'LC': 'Lycée',
    'CF': 'Centre de Formation',
};

/**
 * Convertir un nombre en base 36 (0-9, A-Z)
 */
export function toBase36(num: number, length: number): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    let n = num;
    
    do {
        result = chars[n % 36] + result;
        n = Math.floor(n / 36);
    } while (n > 0);
    
    // Padding avec des zéros
    return result.padStart(length, '0');
}

/**
 * Convertir une chaîne base 36 en nombre
 */
export function fromBase36(str: string): number {
    return parseInt(str, 36);
}

/**
 * Formater une date en DDMMYYYY
 */
export function formatDateDDMMYYYY(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}${month}${year}`;
}

/**
 * Parser une date DDMMYYYY
 */
export function parseDateDDMMYYYY(dateStr: string): Date {
    const day = parseInt(dateStr.substring(0, 2), 10);
    const month = parseInt(dateStr.substring(2, 4), 10) - 1;
    const year = parseInt(dateStr.substring(4, 8), 10);
    return new Date(year, month, day);
}

/**
 * Générer un code document unique
 */
export function generateDocumentCode(params: {
    countryCode: string;
    institutionType: InstitutionType;
    institutionNumber: number;
    degreeType: DegreeType;
    issueDate: Date;
    documentNumber: number;
}): string {
    const {
        countryCode,
        institutionType,
        institutionNumber,
        degreeType,
        issueDate,
        documentNumber,
    } = params;

    const parts = [
        countryCode.toUpperCase().substring(0, 2),
        institutionType,
        toBase36(institutionNumber, 4),
        degreeType,
        formatDateDDMMYYYY(issueDate),
        toBase36(documentNumber, 8),
    ];

    return parts.join('-');
}

/**
 * Parser un code document
 */
export function parseDocumentCode(code: string): {
    countryCode: string;
    institutionType: InstitutionType;
    institutionNumber: number;
    degreeType: DegreeType;
    issueDate: Date;
    documentNumber: number;
} | null {
    const parts = code.split('-');
    
    if (parts.length !== 6) {
        return null;
    }

    try {
        return {
            countryCode: parts[0],
            institutionType: parts[1] as InstitutionType,
            institutionNumber: fromBase36(parts[2]),
            degreeType: parts[3] as DegreeType,
            issueDate: parseDateDDMMYYYY(parts[4]),
            documentNumber: fromBase36(parts[5]),
        };
    } catch {
        return null;
    }
}

/**
 * Valider un code document
 */
export function isValidDocumentCode(code: string): boolean {
    const parsed = parseDocumentCode(code);
    if (!parsed) return false;

    // Vérifier le format
    const validInstitutionTypes: InstitutionType[] = ['UN', 'IS', 'LC', 'CF'];
    const validDegreeTypes: DegreeType[] = ['BAC', 'LIC', 'MAS', 'PHD', 'CER', 'DIP'];

    return (
        parsed.countryCode.length === 2 &&
        validInstitutionTypes.includes(parsed.institutionType) &&
        validDegreeTypes.includes(parsed.degreeType) &&
        !isNaN(parsed.issueDate.getTime())
    );
}

/**
 * Obtenir le type de diplôme à partir du nom
 */
export function getDegreeTypeCode(degreeName: string): DegreeType {
    const normalized = degreeName.trim();
    return DEGREE_TYPE_MAP[normalized] || 'DIP';
}
