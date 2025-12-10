/**
 * PROOFCHAIN Verifier - API de vérification
 * Vérifie un document par document_id ou asset_id
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const BLOCKFROST_API_URL = process.env.NEXT_PUBLIC_BLOCKFROST_NETWORK === 'mainnet'
    ? 'https://cardano-mainnet.blockfrost.io/api/v0'
    : 'https://cardano-preprod.blockfrost.io/api/v0';

const PROJECT_ID = process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID;

// Supabase client pour l'API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

interface VerificationResponse {
    valid: boolean;
    source: 'supabase' | 'blockchain' | 'both';
    document?: {
        documentId: string;
        studentName: string;
        studentNumber: string;
        degree: string;
        fieldOfStudy: string;
        institution: string;
        institutionCode: string;
        graduationDate: string;
        issueDate: string;
        status: string;
        ipfsUrl?: string;
        txHash?: string;
        assetId?: string;
        policyId?: string;
    };
    blockchain?: {
        verified: boolean;
        txHash?: string;
        mintedAt?: string;
        policyId?: string;
    };
    error?: string;
}

// Vérifier si c'est un document_id (format: CD-UN-000E-02032024-0000A00)
function isDocumentId(query: string): boolean {
    const documentIdPattern = /^[A-Z]{2}-[A-Z]{2}-[A-Z0-9]{4}-\d{8}-[A-Z0-9]{8}$/;
    return documentIdPattern.test(query);
}

// Requête Blockfrost
async function blockfrostRequest(endpoint: string) {
    if (!PROJECT_ID) {
        throw new Error('BLOCKFROST_PROJECT_ID non configuré');
    }

    const response = await fetch(`${BLOCKFROST_API_URL}${endpoint}`, {
        headers: { 'project_id': PROJECT_ID }
    });

    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Blockfrost API error: ${response.statusText}`);
    }

    return response.json();
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ valid: false, error: 'Paramètre de recherche manquant' }, { status: 400 });
    }

    const response: VerificationResponse = {
        valid: false,
        source: 'supabase',
    };

    try {
        // Cas 1: Recherche par document_id
        if (isDocumentId(query)) {
            if (!supabaseUrl || !supabaseAnonKey) {
                return NextResponse.json({ valid: false, error: 'Base de données non configurée' }, { status: 500 });
            }

            const supabase = createClient(supabaseUrl, supabaseAnonKey);

            const { data: document, error } = await supabase
                .from('documents')
                .select(`
                    *,
                    students!student_id(full_name, student_number, email),
                    institutions!institution_id(name, institution_code, country_code, type)
                `)
                .eq('document_id', query)
                .single();

            if (error || !document) {
                console.error('Supabase error:', error);
                return NextResponse.json({ 
                    valid: false, 
                    error: 'Document non trouvé dans la base de données' 
                });
            }

            // Document trouvé dans Supabase
            // @ts-ignore - Supabase types
            const student = document.students;
            // @ts-ignore - Supabase types
            const institution = document.institutions;
            
            response.valid = document.status === 'issued';
            response.source = 'supabase';
            response.document = {
                documentId: document.document_id,
                studentName: student?.full_name || 'N/A',
                studentNumber: student?.student_number || 'N/A',
                degree: document.degree_type,
                fieldOfStudy: document.field_of_study,
                institution: institution?.name || 'N/A',
                institutionCode: institution?.institution_code || 'N/A',
                graduationDate: document.graduation_date,
                issueDate: document.issue_date,
                status: document.status,
                ipfsUrl: document.ipfs_url,
                txHash: document.tx_hash,
                assetId: document.asset_id,
                policyId: document.policy_id,
            };

            // Vérifier aussi sur la blockchain si asset_id existe
            if (document.asset_id) {
                try {
                    const asset = await blockfrostRequest(`/assets/${document.asset_id}`);
                    if (asset) {
                        response.source = 'both';
                        response.blockchain = {
                            verified: true,
                            policyId: asset.policy_id,
                        };

                        // Récupérer la date de minting
                        const history = await blockfrostRequest(`/assets/${document.asset_id}/history`);
                        const mintTx = history?.find((tx: any) => tx.action === 'minted');
                        if (mintTx) {
                            response.blockchain.txHash = mintTx.tx_hash;
                            response.blockchain.mintedAt = new Date(mintTx.block_time * 1000).toISOString();
                        }
                    }
                } catch (e) {
                    // Blockchain non accessible, mais document valide dans Supabase
                    console.warn('Vérification blockchain échouée:', e);
                }
            }

            // Enregistrer la vérification
            await supabase.from('verification_logs').insert({
                document_id: document.id,
                document_code: document.document_id,
                verified: response.valid,
                verification_method: 'manual_search',
            });

        } else {
            // Cas 2: Recherche par asset_id (blockchain)
            const asset = await blockfrostRequest(`/assets/${query}`);

            if (!asset) {
                return NextResponse.json({ 
                    valid: false, 
                    error: 'Asset non trouvé sur la blockchain' 
                });
            }

            response.valid = true;
            response.source = 'blockchain';
            response.blockchain = {
                verified: true,
                policyId: asset.policy_id,
            };

            // Récupérer les métadonnées
            const metadata = asset.onchain_metadata;
            if (metadata) {
                // Extraire le documentId des attributs si présent
                const documentId = metadata.documentId || metadata.attributes?.documentId;
                
                response.document = {
                    documentId: documentId || 'N/A',
                    studentName: metadata.studentName || metadata.attributes?.studentName || 'N/A',
                    studentNumber: metadata.studentId || metadata.attributes?.studentId || 'N/A',
                    degree: metadata.degree || metadata.attributes?.degree || 'N/A',
                    fieldOfStudy: metadata.field || metadata.attributes?.field || 'N/A',
                    institution: metadata.institution || metadata.attributes?.institution || 'N/A',
                    institutionCode: metadata.institutionId || metadata.attributes?.institutionId || 'N/A',
                    graduationDate: metadata.graduationDate || metadata.attributes?.graduationDate || 'N/A',
                    issueDate: metadata.issueDate || metadata.attributes?.issueDate || 'N/A',
                    status: 'issued',
                    ipfsUrl: Array.isArray(metadata.image) ? metadata.image.join('') : metadata.image,
                    assetId: query,
                    policyId: asset.policy_id,
                };
            }

            // Récupérer l'historique de minting
            const history = await blockfrostRequest(`/assets/${query}/history`);
            const mintTx = history?.find((tx: any) => tx.action === 'minted');
            if (mintTx) {
                response.blockchain.txHash = mintTx.tx_hash;
                response.blockchain.mintedAt = new Date(mintTx.block_time * 1000).toISOString();
                if (response.document) {
                    response.document.txHash = mintTx.tx_hash;
                }
            }

            // Si on a un documentId, essayer de récupérer plus d'infos depuis Supabase
            if (response.document?.documentId && response.document.documentId !== 'N/A' && supabaseUrl && supabaseAnonKey) {
                try {
                    const supabase = createClient(supabaseUrl, supabaseAnonKey);
                    const { data: dbDoc } = await supabase
                        .from('documents')
                        .select(`
                            *,
                            student:students(full_name, student_number),
                            institution:institutions(name, institution_code)
                        `)
                        .eq('document_id', response.document.documentId)
                        .single();

                    if (dbDoc) {
                        response.source = 'both';
                        response.document.studentName = dbDoc.student?.full_name || response.document.studentName;
                        response.document.studentNumber = dbDoc.student?.student_number || response.document.studentNumber;
                        response.document.institution = dbDoc.institution?.name || response.document.institution;
                        response.document.status = dbDoc.status;
                    }
                } catch (e) {
                    // Pas grave si Supabase n'est pas accessible
                }
            }
        }

        return NextResponse.json(response);

    } catch (error: any) {
        console.error('Erreur de vérification:', error);
        return NextResponse.json({ 
            valid: false, 
            error: error.message || 'Erreur lors de la vérification' 
        }, { status: 500 });
    }
}
