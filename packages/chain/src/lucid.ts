/**
 * PROOFCHAIN - Lucid Initialization
 * Initialize Lucid with Blockfrost provider for Cardano Preprod
 */

import { Blockfrost, Lucid } from 'lucid-cardano';

let lucidInstance: Lucid | null = null;

export async function initLucid(network: 'Mainnet' | 'Preprod' | 'Preview' = 'Preprod'): Promise<Lucid> {
    if (lucidInstance) {
        return lucidInstance;
    }

    const blockfrostApiKey = process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID;

    if (!blockfrostApiKey) {
        throw new Error('NEXT_PUBLIC_BLOCKFROST_PROJECT_ID is not set in environment variables');
    }

    const blockfrostUrl = network === 'Mainnet'
        ? 'https://cardano-mainnet.blockfrost.io/api/v0'
        : network === 'Preprod'
            ? 'https://cardano-preprod.blockfrost.io/api/v0'
            : 'https://cardano-preview.blockfrost.io/api/v0';

    const blockfrost = new Blockfrost(blockfrostUrl, blockfrostApiKey);

    lucidInstance = await Lucid.new(blockfrost, network);

    return lucidInstance;
}

export async function initLucidWithWallet(walletApi: any): Promise<Lucid> {
    const lucid = await initLucid();
    lucid.selectWallet(walletApi);
    return lucid;
}

export function getLucidInstance(): Lucid | null {
    return lucidInstance;
}

export function resetLucidInstance(): void {
    lucidInstance = null;
}
