# PROOFCHAIN - Cardano Academic Verification Platform

A decentralized academic diploma verification system built on Cardano blockchain.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and NPM 9+
- Lace Wallet browser extension
- Blockfrost API key (Preprod network)
- NFT.Storage API key

### Installation

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Start all applications
npm run dev
```

### Applications

- **Verifier** (Public): http://localhost:3000
- **Issuer** (Schools): http://localhost:3001
- **Admin**: http://localhost:3002

## 📁 Project Structure

```
proofchain/
├── apps/
│   ├── verifier/       # Public verification PWA
│   ├── issuer/         # School diploma minting PWA
│   └── admin/          # Super admin PWA
├── packages/
│   ├── ui/             # Shared UI components
│   └── chain/          # Blockchain utilities (Lucid, Blockfrost)
├── api/
│   └── hono-api/       # Backend API (Hono.js)
└── projet.md           # Full documentation (French)
```

## 🔑 Key Features

### Real Blockchain Integration
- **No Mocks**: All blockchain operations use real Lucid and Blockfrost
- **NFT Minting**: Actual CIP-25 compliant NFTs on Cardano Preprod
- **IPFS Storage**: Documents stored permanently on IPFS via NFT.Storage
- **Wallet Connection**: Lace Wallet integration for transaction signing

### Three PWA Applications
1. **Verifier**: Public diploma verification via Asset ID or QR code
2. **Issuer**: Schools mint diplomas as NFTs with full metadata
3. **Admin**: Platform management and school validation

### Multilingual Support
- French (FR)
- English (EN)
- Swahili (SW)
- Lingala (LN)

## 🛠️ Technology Stack

- **Frontend**: Next.js 14+, Tailwind CSS, Lucide Icons
- **Blockchain**: Cardano (Preprod), Lucid, Blockfrost
- **Storage**: IPFS via NFT.Storage
- **Wallet**: Lace Wallet + Mesh
- **Backend**: Hono.js on Cloudflare Workers
- **Build**: Turborepo with NPM workspaces

## 📖 Documentation

See [projet.md](./projet.md) for comprehensive documentation in French, including:
- Complete architecture details
- Security model
- API documentation
- Deployment guide
- Testing procedures

## 🔐 Environment Variables

Required variables (see `.env.example`):

```env
NEXT_PUBLIC_BLOCKFROST_PROJECT_ID=preprod_xxxxx
NEXT_PUBLIC_BLOCKFROST_NETWORK=preprod
NFT_STORAGE_API_KEY=xxxxx
NEXT_PUBLIC_API_URL=http://localhost:8787
```

## 🧪 Testing

### Mint a Diploma

1. Start issuer app: `npm run issuer:dev`
2. Connect Lace Wallet (ensure Preprod network)
3. Fill diploma form at http://localhost:3001/mint
4. Upload document and image
5. Click "Mint Diploma NFT"
6. Sign transaction in Lace
7. Receive Transaction Hash and Asset ID

### Verify a Diploma

1. Start verifier app: `npm run verifier:dev`
2. Go to http://localhost:3000
3. Enter Asset ID from minted diploma
4. View verified diploma details

## 📦 Scripts

```bash
# Development
npm run dev                 # Start all apps
npm run verifier:dev        # Start verifier only
npm run issuer:dev          # Start issuer only
npm run admin:dev           # Start admin only

# Build
npm run build               # Build all apps
npm run lint                # Lint all apps
npm run clean               # Clean all builds
```

## 🌐 Deployment

### Vercel (Frontend)
```bash
cd apps/verifier && vercel --prod
cd apps/issuer && vercel --prod
cd apps/admin && vercel --prod
```

### Cloudflare Workers (API)
```bash
cd api/hono-api && wrangler publish
```

## 📄 License

Proprietary - PROOFCHAIN © 2024

## 🤝 Contributing

This is a proprietary project. For access or collaboration inquiries, contact the project owner.

---

**Important**: This platform uses REAL blockchain transactions on Cardano Preprod testnet. Ensure you have test ADA before minting.
