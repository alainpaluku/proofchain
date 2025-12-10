/**
 * PROOFCHAIN - Blockchain Types
 * Type definitions for Cardano NFT operations
 * 
 * IMPORTANT: Les données sensibles (nom étudiant, etc.) sont stockées dans Supabase
 * Seul le document_id est stocké dans les métadonnées NFT pour la vérification
 */

/**
 * Métadonnées NFT simplifiées - Stockées sur la blockchain
 * Seul le document_id permet de récupérer les données complètes depuis Supabase
 */
export interface DiplomaMetadata {
    // CIP-25 NFT Metadata Standard
    name: string;
    image: string | string[]; // IPFS hash or array of chunks
    mediaType?: string;
    description?: string | string[];

    // Référence vers Supabase - SEULE donnée sensible stockée
    attributes: {
        documentId: string;      // ID unique du document dans Supabase (ex: CD-UN-000E-02032024-0000A00)
        platform: string;        // "PROOFCHAIN"
        version: string;         // Version du format
        verifyUrl: string;       // URL de vérification
    };

    // Additional metadata
    version: string;
    standard: 'CIP-25';
}

/**
 * Métadonnées complètes - Stockées dans Supabase uniquement
 * @deprecated Utilisez les données de la table documents dans Supabase
 */
export interface DiplomaMetadataFull {
    studentName: string;
    studentId: string;
    degree: string;
    field: string;
    institution: string;
    institutionId: string;
    graduationDate: string;
    issueDate: string;
    documentHash: string;
}

export interface MintingParams {
    recipientAddress?: string;
    metadata: DiplomaMetadata;
    policyId?: string;
    assetName: string;
}

export interface MintingResult {
    success: boolean;
    txHash?: string;
    assetId?: string;
    error?: string;
    policyId?: string;
    metadata?: DiplomaMetadata;
}

export interface VerificationResult {
    valid: boolean;
    metadata?: DiplomaMetadata;
    policyId?: string;
    assetName?: string;
    mintedAt?: string;
    txHash?: string;
    error?: string;
}

export interface IPFSUploadResult {
    success: boolean;
    ipfsHash?: string;
    url?: string;
    error?: string;
}

export interface WalletInfo {
    address: string;
    balance: bigint;
    network: 'mainnet' | 'preprod' | 'preview';
}

export interface TransactionFees {
    minFee: bigint;
    deposit: bigint;
    total: bigint;
}
