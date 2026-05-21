# Auralis System: Proofchain Academic Certification

## Enterprise-grade blockchain infrastructure for digital diploma issuance and verification.

Auralis System is a comprehensive platform designed to solve the challenges of academic document fraud and loss through decentralized technology. Built on the Cardano blockchain, it provides a secure environment for institutions to issue diplomas as Non-Fungible Tokens (NFTs), ensuring permanent traceability and instant global verification.

The system is optimized for performance, security, and scalability, providing a professional interface for institutions, students, and employers.

---

## Key Value Propositions

### Immutable Authenticity
Once a diploma is issued on the Cardano blockchain, its record is permanent and cannot be modified or deleted. This ensures that the academic credentials remain valid and verifiable for life.

### Instant Global Verification
Verification no longer requires manual checks or institutional correspondence. Any stakeholder can verify a document's authenticity in seconds using a unique identifier or QR code.

### Decentralized Storage
Document assets and metadata are stored using IPFS (InterPlanetary File System), ensuring that the digital representation of the diploma is as resilient as the blockchain record itself.

### Crisis Resilience
Designed with a focus on regions where physical archives are at risk due to conflict or natural disasters, Auralis System provides a digital safe haven for academic achievements.

---

## Repository Structure

This monorepo uses Turborepo for efficient task orchestration and shared code management.

### Applications
- **apps/landing**: The public-facing website and verification engine. Accessible at port 3003.
- **apps/issuer**: The portal for educational institutions to manage students and issue NFT diplomas. Accessible at port 3001.
- **apps/admin**: The governance platform for system administrators to validate institutions (KYC) and monitor platform health. Accessible at port 3002.

### Shared Packages
- **packages/ui**: A centralized design system providing consistent, accessible, and high-performance React components.
- **packages/shared**: Core business logic, shared hooks, utility functions, and global TypeScript definitions.
- **packages/chain**: Specialized library for Cardano blockchain interactions, including minting logic and metadata standards.

---

## Technology Stack

Auralis System is built with modern, industry-standard technologies:

- **Frontend**: Next.js, React, Tailwind CSS
- **Language**: TypeScript
- **Blockchain**: Cardano (Lucid SDK, Blockfrost API)
- **Storage**: IPFS (via Pinata)
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Infrastructure**: Vercel, Turborepo

---

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- A Cardano wallet (Eternl or Lace) configured for the Preprod network.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/alainpaluku/proofchains.git
   cd proofchains
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the root directory based on the `.env.example` file. You will need API keys for Blockfrost, Pinata, and Supabase.

### Development Commands
- Start all applications in development mode: `npm run dev`
- Build all applications for production: `npm run build`
- Run linting checks: `npm run lint`
- Clean build artifacts: `npm run clean`

---

## Security and Compliance

Auralis System prioritizes the security of institutional data and student privacy.
- **Access Control**: Role-based access control (RBAC) ensures that only authorized personnel can issue credentials.
- **KYC Validation**: All institutions must undergo a verification process before being granted issuance rights.
- **Data Integrity**: Cryptographic hashing ensures that document contents cannot be tampered with after issuance.

---

## Documentation

A detailed User Guide is available in the `apps/landing/public/docs/` directory, providing step-by-step instructions for institutions and verifiers.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

---

**AURALIS SYSTEM**
*A Proofchain Initiative for Academic Integrity.*
