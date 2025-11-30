/**
 * PROOFCHAIN - IPFS Upload Utility
 * Upload diploma documents to IPFS via Pinata
 */

import axios from 'axios';
import type { IPFSUploadResult } from './types';

const PINATA_API_URL = 'https://api.pinata.cloud';

/**
 * Upload a file to IPFS using Pinata via API route
 * @param file - File to upload (can be image or PDF)
 * @returns IPFS hash and URL
 */
export async function uploadToIPFS(file: File): Promise<IPFSUploadResult> {
    try {
        console.log('📤 Uploading file to IPFS via API route...', file.name, file.size, 'bytes');

        // Use API route instead of direct Pinata call (keeps JWT secure on server)
        const formData = new FormData();
        formData.append('file', file);

        // Determine API URL based on environment
        const apiUrl = typeof window !== 'undefined'
            ? window.location.origin
            : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

        const response = await fetch(`${apiUrl}/api/upload-ipfs`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Upload failed with status ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Upload failed');
        }

        console.log('✅ File uploaded to IPFS:', result.ipfsHash);

        return {
            success: true,
            ipfsHash: result.ipfsHash,
            url: result.url,
        };
    } catch (error: any) {
        console.error('❌ IPFS upload error:', error.message);
        return {
            success: false,
            error: error.message || 'Failed to upload to IPFS',
        };
    }
}

/**
 * Upload JSON metadata to IPFS
 * @param metadata - JSON object to upload
 * @returns IPFS hash and URL
 */
export async function uploadMetadataToIPFS(metadata: any): Promise<IPFSUploadResult> {
    try {
        const jwt = process.env.PINATA_JWT || process.env.NEXT_PUBLIC_PINATA_JWT;

        if (!jwt) {
            throw new Error('PINATA_JWT is not configured. Please add it to your .env file.');
        }

        const response = await axios.post(
            `${PINATA_API_URL}/pinning/pinJSONToIPFS`,
            {
                pinataContent: metadata,
                pinataMetadata: {
                    name: 'diploma-metadata.json',
                    keyvalues: {
                        project: 'PROOFCHAIN',
                        type: 'metadata',
                    }
                },
                pinataOptions: {
                    cidVersion: 1,
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const ipfsHash = response.data.IpfsHash;
        const url = `ipfs://${ipfsHash}`;

        console.log('✅ Metadata uploaded to IPFS via Pinata:', ipfsHash);

        return {
            success: true,
            ipfsHash,
            url,
        };
    } catch (error: any) {
        console.error('❌ Pinata metadata upload error:', error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data?.error || error.message || 'Failed to upload metadata to IPFS',
        };
    }
}

/**
 * Get IPFS gateway URL from hash
 * @param ipfsHash - IPFS hash (CID) or array of chunks
 * @returns HTTP gateway URL
 */
export function getIPFSGatewayUrl(ipfsHash: string | string[]): string {
    // Handle chunked IPFS hash (array of strings)
    const fullHash = Array.isArray(ipfsHash) ? ipfsHash.join('') : ipfsHash;

    // Remove ipfs:// prefix if present
    const hash = fullHash.replace('ipfs://', '');
    // Use Pinata's dedicated gateway for better performance
    return `https://gateway.pinata.cloud/ipfs/${hash}`;
}

/**
 * Test Pinata connection
 * @returns true if connection successful
 */
export async function testPinataConnection(): Promise<boolean> {
    try {
        const jwt = process.env.PINATA_JWT || process.env.NEXT_PUBLIC_PINATA_JWT;

        if (!jwt) {
            console.error('❌ PINATA_JWT not configured');
            return false;
        }

        const response = await axios.get(
            `${PINATA_API_URL}/data/testAuthentication`,
            {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                },
            }
        );

        console.log('✅ Pinata connection successful:', response.data.message);
        return true;
    } catch (error: any) {
        console.error('❌ Pinata connection failed:', error.response?.data || error.message);
        return false;
    }
}
