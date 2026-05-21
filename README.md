# PROOFCHAINS: Decentralized Academic Certification

PROOFCHAINS is a professional-grade platform designed to combat academic document fraud and loss through decentralized technology. Built on the Cardano blockchain, it provides a secure, immutable environment for educational institutions to issue diplomas as Non-Fungible Tokens (NFTs), ensuring permanent traceability and instant global verification.

## Core Mission

The platform serves as a digital safe haven for academic achievements, particularly in regions where physical archives are vulnerable. By leveraging blockchain technology, PROOFCHAINS ensures that an individual's educational record remains accessible, verifiable, and secure throughout their lifetime, independent of any centralized authority or physical storage.

## Key Features

- **Immutable Issuance**: Institutions can issue digital diplomas that are cryptographically signed and stored on the blockchain.
- **Instant Verification**: Employers and third parties can verify the authenticity of a credential in seconds via a public interface.
- **Ownership Control**: Graduates have full control over their digital credentials and can share them securely with relevant parties.
- **Global Standards**: Follows international academic certification standards while utilizing the security and efficiency of the Cardano blockchain.
- **Enterprise-Grade UI**: A modern, soft-industrial design system (PROOFCHAINS System) ensuring a professional and accessible experience for all stakeholders.

## Technical Architecture

The project is structured as a monorepo using Turborepo, ensuring consistency across various applications:

- **apps/landing**: The public gateway for information and initial verification.
- **apps/issuer**: A dedicated portal for educational institutions to manage and issue certifications.
- **apps/verifier**: A streamlined interface for rapid, secure credential verification.
- **apps/admin**: Internal management and institution onboarding.
- **packages/ui**: A centralized, themed component library built with React, Tailwind CSS, and Headless UI.
- **packages/shared**: Common logic, types, and blockchain integration utilities.

### Stack

- **Frontend**: Next.js 14, Tailwind CSS, TypeScript.
- **Design**: PROOFCHAINS Soft-Industrial System.
- **Backend**: Supabase (PostgreSQL, Auth, Storage).
- **Blockchain**: Cardano (Lucid/Mesh SDK for NFT minting and verification).

## Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account and Cardano wallet (for issuance)

### Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables in each application based on `.env.example`.
4. Run the development server: `npm run dev`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
