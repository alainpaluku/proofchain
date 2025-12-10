/**
 * PROOFCHAIN - NFT Verification
 * Verify diploma authenticity using Blockfrost API
 */

/**
 * PROOFCHAIN - NFT Verification
 * Verify diploma authenticity using Blockfrost API (Fetch implementation)
 */

import type { VerificationResult, DiplomaMetadata } from './types';

const BLOCKFROST_API_URL = process.env.NEXT_PUBLIC_BLOCKFROST_NETWORK === 'mainnet'
    ? 'https://cardano-mainnet.blockfrost.io/api/v0'
    : 'https://cardano-preprod.blockfrost.io/api/v0';

const PROJECT_ID = process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID;

async function blockfrostRequest(endpoint: string) {
    if (!PROJECT_ID) {
        throw new Error('NEXT_PUBLIC_BLOCKFROST_PROJECT_ID is not set');
    }

    const response = await fetch(`${BLOCKFROST_API_URL}${endpoint}`, {
        headers: {
            'project_id': PROJECT_ID
        }
    });

    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }
        // Get more details about the error
        let errorDetail = response.statusText || `HTTP ${response.status}`;
        try {
            const errorBody = await response.json();
            errorDetail = errorBody.message || errorBody.error || errorDetail;
        } catch {
            // Ignore JSON parse errors
        }
        throw new Error(`Blockfrost API error (${response.status}): ${errorDetail}`);
    }

    return response.json();
}

/**
 * Verify a diploma NFT by Asset ID
 * @param assetId - Full asset ID (policyId + assetName in hex)
 * @returns Verification result with metadata
 */
export async function verifyNFT(assetId: string): Promise<VerificationResult> {
    try {
        // Get asset information
        const asset = await blockfrostRequest(`/assets/${assetId}`);

        if (!asset) {
            return {
                valid: false,
                error: 'Asset not found on blockchain',
            };
        }

        // Get asset metadata (CIP-25)
        const metadata = asset.onchain_metadata;

        if (!metadata) {
            return {
                valid: false,
                error: 'No metadata found for this asset',
            };
        }

        // Parse diploma metadata - support both old format (direct attributes) and new format (documentId reference)
        const diplomaMetadata: DiplomaMetadata = {
            name: metadata.name || '',
            image: metadata.image || '',
            mediaType: metadata.mediaType,
            description: metadata.description,
            attributes: metadata.attributes || {
                // Support legacy format where attributes are at root level
                studentName: metadata.studentName || '',
                studentId: metadata.studentId || '',
                degree: metadata.degree || '',
                field: metadata.field || '',
                institution: metadata.institution || '',
                institutionId: metadata.institutionId || '',
                graduationDate: metadata.graduationDate || '',
                issueDate: metadata.issueDate || '',
                documentHash: metadata.documentHash || '',
                // New format fields
                documentId: metadata.documentId || '',
                platform: metadata.platform || 'PROOFCHAIN',
                version: metadata.version || '1.0',
                verifyUrl: metadata.verifyUrl || '',
            },
            version: metadata.version || '1.0',
            standard: 'CIP-25',
        };

        // Get minting transaction
        const assetHistory = await blockfrostRequest(`/assets/${assetId}/history`);
        const mintTx = assetHistory?.find((tx: any) => tx.action === 'minted');

        return {
            valid: true,
            metadata: diplomaMetadata,
            policyId: asset.policy_id,
            assetName: asset.asset_name || '',
            mintedAt: mintTx?.block_time ? new Date(mintTx.block_time * 1000).toISOString() : undefined,
            txHash: mintTx?.tx_hash,
        };
    } catch (error: any) {
        console.error('Verification error:', error);

        return {
            valid: false,
            error: error.message || 'Verification failed',
        };
    }
}

/**
 * Get recent NFT mints for a policy ID
 * @param policyId - Policy ID of the institution
 * @param limit - Number of recent mints to fetch
 */
export async function getRecentMints(policyId: string, limit: number = 5): Promise<VerificationResult[]> {
    try {
        const assets = await blockfrostRequest(`/assets/policy/${policyId}?count=${limit}&order=desc`);

        if (!assets) return [];

        const results: VerificationResult[] = [];

        for (const asset of assets) {
            const assetId = asset.asset;
            const verification = await verifyNFT(assetId);
            results.push(verification);
        }

        return results;
    } catch (error: any) {
        console.error('Error fetching recent mints:', error);
        return [];
    }
}

/**
 * Check if an asset exists on the blockchain
 * @param assetId - Asset ID to check
 */
export async function assetExists(assetId: string): Promise<boolean> {
    try {
        const asset = await blockfrostRequest(`/assets/${assetId}`);
        return !!asset;
    } catch (error) {
        return false;
    }
}
