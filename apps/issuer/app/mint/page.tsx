/**
 * PROOFCHAIN Issuer - Mint Diploma Page
 * REAL NFT MINTING - No simulation
 */

'use client';

import React, { useState } from 'react';
import {
    Upload,
    FileText,
    Coins,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ExternalLink
} from 'lucide-react';
import {
    mintDiplomaNFT,
    uploadToIPFS,
    type DiplomaMetadata,
    type MintingResult
} from '@proofchain/chain';
import { useWallet, ConnectWalletButton, useI18n } from '@proofchain/ui';

export default function MintPage() {
    const { walletApi, connected } = useWallet();
    const { t } = useI18n();

    const [formData, setFormData] = useState({
        studentName: '',
        studentId: '',
        degree: '',
        field: '',
        institution: '',
        institutionId: '',
        graduationDate: '',
        graduationDate: '',
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    const [isUploading, setIsUploading] = useState(false);
    const [isMinting, setIsMinting] = useState(false);
    const [mintResult, setMintResult] = useState<MintingResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log('📁 File selected:', file?.name, file?.size, 'bytes');

        if (!file) {
            console.warn('⚠️ No file selected');
            setImageFile(null);
            return;
        }

        // Validate file type - only PNG or JPG
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        const validExtensions = ['.png', '.jpg', '.jpeg'];
        const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

        if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
            setError('⚠️ L\'image doit être un fichier PNG ou JPG uniquement');
            console.error('❌ Invalid image type:', file.type, file.name);
            e.target.value = ''; // Reset input
            setImageFile(null);
            return;
        }

        setImageFile(file);
        setError(null); // Clear any previous errors
        console.log('✅ Image file set:', file.name, file.size, 'bytes', file.type);
    };

    const handleMint = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('🔄 Form submitted');
        console.log('📋 Form state:', {
            connected,
            hasWalletApi: !!walletApi,
            isUploading,
            isMinting,
            hasImageFile: !!imageFile
        });

        // Validate wallet connection
        if (!connected || !walletApi) {
            setError('⚠️ Veuillez connecter votre wallet avant de continuer');
            console.error('❌ Wallet not connected');
            return;
        }

        // Validate form data
        if (!formData.studentName || !formData.studentId || !formData.degree ||
            !formData.field || !formData.graduationDate || !formData.institution ||
            !formData.institutionId) {
            setError('⚠️ Veuillez remplir tous les champs obligatoires (*)');
            console.error('❌ Missing required fields');
            return;
        }

        // Validate image file
        console.log('📋 Checking image file:', imageFile ? {
            name: imageFile.name,
            size: imageFile.size,
            type: imageFile.type
        } : 'MISSING');

        if (!imageFile) {
            setError('⚠️ Veuillez uploader une image (PNG ou JPG)');
            console.error('❌ Missing image file');
            return;
        }

        // Validate file size
        const maxFileSize = 10 * 1024 * 1024; // 10 MB
        if (imageFile.size > maxFileSize) {
            setError('⚠️ L\'image est trop volumineuse. Taille maximum : 10 MB');
            console.error('❌ Image too large:', imageFile.size);
            return;
        }

        // Validate file type - only PNG or JPG
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        const validExtensions = ['.png', '.jpg', '.jpeg'];
        const fileExtension = imageFile.name.toLowerCase().substring(imageFile.name.lastIndexOf('.'));

        if (!validTypes.includes(imageFile.type) && !validExtensions.includes(fileExtension)) {
            setError('⚠️ L\'image doit être un fichier PNG ou JPG uniquement');
            console.error('❌ Invalid image type:', imageFile.type, imageFile.name);
            return;
        }

        console.log('✅ All validations passed');
        setError(null);
        setIsUploading(true);

        try {
            // Step 1: Upload image to IPFS
            console.log('📤 Uploading image to IPFS...');
            const imageUpload = await uploadToIPFS(imageFile);

            if (!imageUpload.success || !imageUpload.ipfsHash) {
                throw new Error(imageUpload.error || 'Failed to upload image');
            }

            setIsUploading(false);
            setIsMinting(true);

            // Step 2: Prepare metadata
            const imageMediaType = imageFile.type === 'image/png' ? 'image/png' : 'image/jpeg';
            const metadata: DiplomaMetadata = {
                name: `${formData.degree} - ${formData.studentName}`,
                image: imageUpload.url!,
                mediaType: imageMediaType,
                description: `Diploma in ${formData.field} awarded to ${formData.studentName}`,
                attributes: {
                    studentName: formData.studentName,
                    studentId: formData.studentId,
                    degree: formData.degree,
                    field: formData.field,
                    institution: formData.institution,
                    institutionId: formData.institutionId,
                    graduationDate: formData.graduationDate,
                    issueDate: new Date().toISOString(),
                    documentHash: imageUpload.url!, // Use image hash as document hash
                },
                version: '1.0',
                standard: 'CIP-25',
            };

            // Step 3: Get wallet address
            const changeAddress = await walletApi.getChangeAddress();
            console.log('📍 Wallet address:', changeAddress);

            // Step 4: Mint NFT on Cardano
            console.log('⛏️ Minting NFT on Cardano Preprod...');

            // Create a very short asset name (Cardano limit: 32 bytes)
            // Use only alphanumeric characters, max 20 chars to be safe
            const shortId = formData.studentId.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6).toUpperCase();
            const timestamp = Date.now().toString().slice(-6); // Last 6 digits
            const assetName = `D${shortId}${timestamp}`; // Max ~13 chars, well under 32 bytes

            // Validate length in bytes
            const assetNameBytes = new TextEncoder().encode(assetName);
            console.log('📝 Asset name:', assetName, 'Length (chars):', assetName.length, 'Length (bytes):', assetNameBytes.length);

            if (assetNameBytes.length > 32) {
                throw new Error(`Asset name too long: ${assetNameBytes.length} bytes. Generated: ${assetName}`);
            }

            const result = await mintDiplomaNFT(walletApi, {
                metadata,
                assetName,
            });

            setMintResult(result);
            setIsMinting(false);

            if (result.success) {
                console.log('✅ Minting successful!');
                console.log('Transaction Hash:', result.txHash);
                console.log('Asset ID:', result.assetId);

                // Reset form only on success
                setFormData({
                    studentName: '',
                    studentId: '',
                    degree: '',
                    field: '',
                    institution: '',
                    institutionId: '',
                    graduationDate: '',
                    graduationDate: '',
                });
                setImageFile(null);
                // Reset file input
                const imgInput = document.getElementById('image-upload') as HTMLInputElement;
                if (imgInput) imgInput.value = '';
            } else {
                setError(result.error || 'Minting failed');
                // Keep files on error so user doesn't have to re-upload
            }
        } catch (err: any) {
            console.error('❌ Minting error:', err);
            setError(err.message || 'An error occurred during minting');
            setIsUploading(false);
            setIsMinting(false);
        }
    };

    const explorerUrl = process.env.NEXT_PUBLIC_CARDANO_EXPLORER || 'https://preprod.cardanoscan.io';

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Coins className="w-8 h-8 text-purple-600" />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                PROOFCHAIN Issuer
                            </h1>
                        </div>
                        <ConnectWalletButton showBalance={true} />
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {t('action.mint')} Diploma NFT
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Créez un diplôme NFT sur la blockchain Cardano
                        </p>
                    </div>

                    {/* Success Message */}
                    {mintResult?.success && (
                        <div className="mb-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-xl p-8">
                            <div className="flex items-start gap-4">
                                <CheckCircle2 className="w-12 h-12 text-green-600 flex-shrink-0" />
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-3">
                                        ✅ Document Émis avec Succès !
                                    </h3>
                                    <p className="text-green-600 dark:text-green-500 mb-4">
                                        Le diplôme NFT a été créé sur la blockchain Cardano. Les frais ont été payés avec vos ADA de test.
                                    </p>
                                    <div className="space-y-3 bg-white dark:bg-gray-800 rounded-lg p-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                Transaction Hash:
                                            </p>
                                            <a
                                                href={`${explorerUrl}/transaction/${mintResult.txHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-mono text-sm flex items-center gap-2 break-all"
                                            >
                                                {mintResult.txHash}
                                                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                            </a>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                Asset ID (pour vérification):
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <code className="flex-1 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded font-mono text-sm text-gray-900 dark:text-white break-all">
                                                    {mintResult.assetId}
                                                </code>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(mintResult.assetId || '');
                                                        alert('Asset ID copié !');
                                                    }}
                                                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm"
                                                >
                                                    Copier
                                                </button>
                                            </div>
                                        </div>
                                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                💰 <strong>Frais payés:</strong> ~2.5 ADA (depuis votre wallet de test)
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                📍 <strong>NFT envoyé à:</strong> Votre wallet connecté
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-3">
                                        <a
                                            href={`http://localhost:3000/verify/${mintResult.assetId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                                        >
                                            Vérifier le Document
                                        </a>
                                        <a
                                            href={`${explorerUrl}/transaction/${mintResult.txHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium"
                                        >
                                            Voir sur Cardano Explorer
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-xl p-4">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                                <p className="text-red-700 dark:text-red-400">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Minting Form */}
                    <form onSubmit={handleMint} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
                        {/* Student Information */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Student Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Student Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="studentName"
                                        value={formData.studentName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Student ID *
                                    </label>
                                    <input
                                        type="text"
                                        name="studentId"
                                        value={formData.studentId}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="STU-2024-001"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Diploma Information */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Diploma Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Degree *
                                    </label>
                                    <select
                                        name="degree"
                                        value={formData.degree}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    >
                                        <option value="">Select degree</option>
                                        <option value="Bachelor">Bachelor</option>
                                        <option value="Master">Master</option>
                                        <option value="PhD">PhD</option>
                                        <option value="Diploma">Diploma</option>
                                        <option value="Certificate">Certificate</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Field of Study *
                                    </label>
                                    <input
                                        type="text"
                                        name="field"
                                        value={formData.field}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="Computer Science"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Graduation Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="graduationDate"
                                        value={formData.graduationDate}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    />
                                </div>


                            </div>
                        </div>

                        {/* Institution Information */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Institution Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Institution Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="institution"
                                        value={formData.institution}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="University of Example"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Institution ID *
                                    </label>
                                    <input
                                        type="text"
                                        name="institutionId"
                                        value={formData.institutionId}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="INST-001"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Image du Diplôme
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Image du Diplôme (PNG ou JPG uniquement) *
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="image-upload"
                                        key={imageFile ? 'image-set' : 'image-empty'}
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className={`flex items-center justify-center gap-2 w-full px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${imageFile
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                            : 'border-gray-300 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400'
                                            }`}
                                    >
                                        <Upload className={`w-6 h-6 ${imageFile ? 'text-green-600' : 'text-gray-400'}`} />
                                        <span className={imageFile ? 'text-green-700 dark:text-green-400 font-medium' : 'text-gray-600 dark:text-gray-400'}>
                                            {imageFile ? `✓ ${imageFile.name} (${(imageFile.size / 1024 / 1024).toFixed(2)} MB)` : 'Upload Image (PNG ou JPG)'}
                                        </span>
                                    </label>
                                </div>
                                {imageFile && (
                                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                        ✓ Image sélectionnée: {imageFile.type}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Formats acceptés: PNG, JPG uniquement (max 10 MB)
                                </p>
                            </div>

                            {/* File Status Indicator */}
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-sm">
                                <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">État de l'image :</p>
                                <p className={imageFile ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                    {imageFile ? `✓ Image sélectionnée (${imageFile.type})` : '✗ Image manquante'}
                                </p>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
                                ℹ️ Informations importantes
                            </h4>
                            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                                <li>• Le document NFT sera envoyé à votre wallet connecté</li>
                                <li>• Les frais d'émission (~2.5 ADA) seront payés avec vos ADA de test</li>
                                <li>• La transaction sera visible sur la blockchain Cardano</li>
                                <li>• Vous recevrez un Asset ID pour vérifier le document</li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!connected || isUploading || isMinting}
                            onClick={(e) => {
                                console.log('🖱️ Button clicked', {
                                    connected,
                                    isUploading,
                                    isMinting,
                                    disabled: !connected || isUploading || isMinting,
                                    hasImageFile: !!imageFile,
                                    formData: formData
                                });
                                if (!connected) {
                                    console.warn('⚠️ Wallet not connected');
                                }
                                if (isUploading) {
                                    console.warn('⚠️ Already uploading');
                                }
                                if (isMinting) {
                                    console.warn('⚠️ Already minting');
                                }
                                // Don't prevent default - let form onSubmit handle it
                            }}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Téléchargement vers IPFS...
                                </>
                            ) : isMinting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Émission en cours sur Cardano...
                                </>
                            ) : (
                                <>
                                    <Coins className="w-5 h-5" />
                                    ÉMETTRE DOCUMENT
                                </>
                            )}
                        </button>

                        {!connected && (
                            <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                                <p className="text-yellow-800 dark:text-yellow-300 font-medium mb-3">
                                    ⚠️ Connectez votre wallet pour minter des diplômes
                                </p>
                                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                                    Vous devez connecter votre wallet Lace ou Nami pour pouvoir créer des NFTs sur Cardano
                                </p>
                            </div>
                        )}

                        {/* Debug info */}
                        {process.env.NODE_ENV === 'development' && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 p-2 bg-gray-100 dark:bg-gray-900 rounded">
                                <p>Debug: connected={connected ? '✅' : '❌'}, uploading={isUploading ? '⏳' : '✅'}, minting={isMinting ? '⏳' : '✅'}, image={imageFile ? '✅' : '❌'}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
