/**
 * PROOFCHAIN - Blockchain Types
 * Type definitions for Cardano NFT operations
 */

export interface DiplomaMetadata {
    // CIP-25 NFT Metadata Standard
    name: string;
    image: string | string[]; // IPFS hash or array of chunks
    mediaType?: string;
    description?: string | string[];

    // Custom diploma attributes
    attributes: {
        studentName: string;
        studentId: string;
        degree: string;
        field: string;
        institution: string;
        institutionId: string;
        graduationDate: string;
        issueDate: string;
        documentHash: string; // IPFS hash of diploma document
    };

    // Additional metadata
    version: string;
    standard: 'CIP-25';
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
