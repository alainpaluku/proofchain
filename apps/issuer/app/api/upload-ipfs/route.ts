/**
 * PROOFCHAIN Issuer - IPFS Upload API Route
 * Handles file uploads to IPFS via Pinata on the server side
 * This keeps the JWT secret secure
 */

import { NextRequest, NextResponse } from 'next/server';

const PINATA_API_URL = 'https://api.pinata.cloud';

export async function POST(request: NextRequest) {
    try {
        // Get JWT from environment (server-side only)
        const jwt = (process.env.PINATA_JWT || process.env.NEXT_PUBLIC_PINATA_JWT)?.trim();

        if (!jwt) {
            console.error('❌ PINATA_JWT not found in environment');
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'PINATA_JWT is not configured. Please add PINATA_JWT to your .env file and restart the server.' 
                },
                { status: 500 }
            );
        }

        // Get the file from the request
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
        }

        console.log('📤 Uploading file to Pinata IPFS...', file.name, file.size, 'bytes');

        // Create FormData for Pinata using native FormData
        const pinataFormData = new FormData();
        pinataFormData.append('file', file, file.name);

        // Add metadata
        const metadata = JSON.stringify({
            name: file.name,
            keyvalues: {
                project: 'PROOFCHAIN',
                type: file.type,
            }
        });
        pinataFormData.append('pinataMetadata', metadata);

        // Add pin options
        const options = JSON.stringify({
            cidVersion: 1,
        });
        pinataFormData.append('pinataOptions', options);

        // Upload to Pinata using native fetch
        const response = await fetch(`${PINATA_API_URL}/pinning/pinFileToIPFS`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
            },
            body: pinataFormData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('❌ Pinata API error:', response.status, errorData);
            throw new Error(errorData.error?.message || errorData.message || `Pinata API error: ${response.status}`);
        }

        const data = await response.json();
        const ipfsHash = data.IpfsHash;
        const url = `ipfs://${ipfsHash}`;

        console.log('✅ File uploaded to IPFS via Pinata:', ipfsHash);

        return NextResponse.json({
            success: true,
            ipfsHash,
            url,
        });
    } catch (error: any) {
        console.error('❌ Pinata upload error:', error);
        
        let errorMessage = error.message || 'Failed to upload to IPFS';
        
        // Check for network errors
        if (error.cause?.code === 'ENOTFOUND' || error.cause?.code === 'ECONNREFUSED') {
            errorMessage = 'Cannot connect to Pinata API. Please check your internet connection.';
        }
        
        return NextResponse.json(
            { 
                success: false, 
                error: errorMessage
            },
            { status: 500 }
        );
    }
}
