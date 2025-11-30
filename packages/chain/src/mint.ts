/**
 * PROOFCHAIN - NFT Minting Function
 * Real implementation using Lucid for Cardano Preprod
 * 
 * This is the CORE function for diploma NFT creation
 * NO MOCKS - Real blockchain transactions
 */

import { Lucid, MintingPolicy, PolicyId, fromText, Data } from 'lucid-cardano';
import type { MintingParams, MintingResult } from './types';
import { initLucidWithWallet } from './lucid';

/**
 * Create a minting policy for the institution
 * This should be done once per institution and the policy ID stored
 */
export async function createMintingPolicy(lucid: Lucid): Promise<{ policyId: PolicyId; policy: MintingPolicy }> {
    const { paymentCredential } = lucid.utils.getAddressDetails(
        await lucid.wallet.address()
    );

    const mintingPolicy: MintingPolicy = lucid.utils.nativeScriptFromJson({
        type: 'all',
        scripts: [
            {
                type: 'sig',
                keyHash: paymentCredential?.hash || '',
            },
        ],
    });

    const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);

    return { policyId, policy: mintingPolicy };
}

/**
 * Mint a Diploma NFT on Cardano Preprod
 * 
 * @param walletApi - Connected wallet API (Lace/Nami)
 * @param params - Minting parameters including recipient and metadata
 * @returns Transaction hash and asset ID
 */
export async function mintDiplomaNFT(
    walletApi: any,
    params: MintingParams
): Promise<MintingResult> {
    try {
        // Initialize Lucid with wallet
        const lucid = await initLucidWithWallet(walletApi);

        // Create or use existing minting policy
        const { policyId, policy } = params.policyId
            ? {
                policyId: params.policyId,
                policy: lucid.utils.nativeScriptFromJson({
                    type: 'all',
                    scripts: [
                        {
                            type: 'sig',
                            keyHash: lucid.utils.getAddressDetails(await lucid.wallet.address()).paymentCredential?.hash || '',
                        },
                    ],
                })
            }
            : await createMintingPolicy(lucid);

        // Create asset name (must be hex encoded)
        // Cardano asset names are limited to 32 bytes
        // Validate length before encoding
        const maxAssetNameLength = 32;
        const assetNameBytes = new TextEncoder().encode(params.assetName);

        if (assetNameBytes.length > maxAssetNameLength) {
            throw new Error(`Asset name too long: ${assetNameBytes.length} bytes (max ${maxAssetNameLength}). Original: ${params.assetName}`);
        }

        console.log('📝 Asset name validation:', {
            original: params.assetName,
            length: assetNameBytes.length,
            maxLength: maxAssetNameLength
        });

        const assetName = fromText(params.assetName);
        const assetId = policyId + assetName;

        // Prepare CIP-25 metadata
        // Use the original asset name (before hex encoding) as the key in metadata
        // But ensure it's not too long
        const metadataAssetName = params.assetName.length > 32
            ? params.assetName.substring(0, 32)
            : params.assetName;

        /**
         * Helper to split long strings into 64-byte chunks for Cardano metadata
         */
        function chunkString(str: string | string[], length: number = 64): string | string[] {
            if (Array.isArray(str)) return str;
            if (!str || str.length <= length) return str;

            const chunks = [];
            for (let i = 0; i < str.length; i += length) {
                chunks.push(str.substring(i, i + length));
            }
            return chunks;
        }

        // Helper to chunk all attributes
        const chunkedAttributes = Object.entries(params.metadata.attributes).reduce((acc, [key, value]) => {
            if (typeof value === 'string') {
                acc[key] = chunkString(value);
            } else {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, any>);

        const metadata: Record<string, any> = {
            [policyId]: {
                [metadataAssetName]: {
                    name: params.metadata.name?.substring(0, 64) || '', // Limit name length to 64 chars
                    image: chunkString(params.metadata.image), // Chunk image URL
                    mediaType: params.metadata.mediaType || 'image/png',
                    description: chunkString(params.metadata.description || ''), // Chunk description
                    ...chunkedAttributes,
                },
            },
        };

        console.log('📋 Metadata prepared:', {
            policyId,
            assetName: metadataAssetName,
            metadataSize: JSON.stringify(metadata).length
        });

        // Get wallet address for fees and recipient if not specified
        const walletAddress = await lucid.wallet.address();
        const recipientAddress = params.recipientAddress || walletAddress;

        console.log('💰 Wallet address (paying fees):', walletAddress);
        console.log('📍 Recipient address (receiving NFT):', recipientAddress);

        // Build the minting transaction
        // The wallet connected will pay the fees automatically
        console.log('🔨 Building transaction...');
        console.log('📊 Transaction details:', {
            assetId: assetId.substring(0, 20) + '...',
            assetIdLength: assetId.length,
            policyIdLength: policyId.length,
            assetNameLength: assetName.length,
            metadataSize: JSON.stringify(metadata).length,
            recipientAddressLength: recipientAddress.length
        });

        try {
            // Validate recipient address
            const recipientDetails = lucid.utils.getAddressDetails(recipientAddress);
            console.log('📍 Recipient address details:', recipientDetails);
        } catch (e) {
            console.error('❌ Invalid recipient address format:', recipientAddress, e);
        }

        const tx = await lucid
            .newTx()
            .mintAssets(
                { [assetId]: BigInt(1) } // Mint 1 NFT
            )
            .payToAddress(recipientAddress, {
                lovelace: BigInt(2000000), // 2 ADA minimum with the NFT
                [assetId]: BigInt(1)
            })
            .attachMintingPolicy(policy)
            .attachMetadata(721, metadata) // CIP-25 metadata label
            .complete();

        console.log('📝 Transaction built successfully');
        console.log('💵 Fees will be paid by:', walletAddress);

        // Sign the transaction with the connected wallet
        console.log('✍️ Signing transaction...');
        const signedTx = await tx.sign().complete();
        console.log('✍️ Transaction signed');

        // Submit to blockchain
        console.log('📤 Submitting transaction...');
        const txHash = await signedTx.submit();

        console.log('✅ NFT Minted Successfully!');
        console.log('Transaction Hash:', txHash);
        console.log('Asset ID:', assetId);
        console.log('Policy ID:', policyId);

        // Wait for confirmation
        console.log('⏳ Waiting for confirmation...');
        await lucid.awaitTx(txHash);
        console.log('✅ Transaction confirmed on blockchain!');

        return {
            success: true,
            txHash,
            assetId,
            policyId,
        };
    } catch (error: any) {
        console.error('❌ Minting Error:', error);

        // Parse common errors
        let errorMessage = error.message || 'Unknown minting error';

        if (errorMessage.includes('insufficient') || errorMessage.includes('balance')) {
            errorMessage = 'Insufficient ADA balance for transaction. Need at least 5 ADA.';
        } else if (errorMessage.includes('UTxO')) {
            errorMessage = 'No available UTxOs in wallet. Try sending some ADA to yourself first.';
        } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
            errorMessage = 'Network connection error. Check your internet connection.';
        } else if (errorMessage.includes('user') || errorMessage.includes('cancel')) {
            errorMessage = 'Transaction cancelled by user.';
        } else if (errorMessage.includes('invalid length') || errorMessage.includes('too long')) {
            errorMessage = 'Asset name is too long. Please use a shorter student ID.';
        } else if (errorMessage.includes('length')) {
            errorMessage = 'Invalid asset name length. Cardano asset names must be 32 bytes or less.';
        }

        return {
            success: false,
            error: errorMessage,
        };
    }
}

/**
 * Batch mint multiple diploma NFTs
 * Useful for graduating classes
 */
export async function batchMintDiplomas(
    walletApi: any,
    diplomaList: MintingParams[]
): Promise<MintingResult[]> {
    const results: MintingResult[] = [];

    for (const diploma of diplomaList) {
        const result = await mintDiplomaNFT(walletApi, diploma);
        results.push(result);

        // Add delay between mints to avoid rate limiting
        if (result.success) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    return results;
}
