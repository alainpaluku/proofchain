/**
 * PROOFCHAIN - Chain Package Index
 * Export all blockchain utilities
 */

// Types
export * from './types';

// Core functions
export { initLucid, initLucidWithWallet, getLucidInstance, resetLucidInstance } from './lucid';
export { mintDiplomaNFT, batchMintDiplomas, createMintingPolicy } from './mint';
export { verifyNFT, getRecentMints, assetExists } from './verify';
export { uploadToIPFS, uploadMetadataToIPFS, getIPFSGatewayUrl, testPinataConnection } from './ipfs';
