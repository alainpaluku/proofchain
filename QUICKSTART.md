# PROOFCHAIN - Quick Reference Guide

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd /home/paluku/Desktop/haha
npm install
```

### 2. Configure Environment

```bash
# Copy template
cp .env.example .env

# Edit with your API keys
nano .env
```

**Required API Keys**:
- **Blockfrost**: Get from https://blockfrost.io (Preprod project)
- **NFT.Storage**: Get from https://nft.storage (Free account)

### 3. Install Lace Wallet
1. Install browser extension: https://www.lace.io/
2. Create or restore wallet
3. Switch to **Preprod** network in settings
4. Get test ADA: https://docs.cardano.org/cardano-testnet/tools/faucet

### 4. Start Development

```bash
# Start all applications
npm run dev

# Or start individually
npm run verifier:dev  # Port 3000
npm run issuer:dev    # Port 3001
npm run admin:dev     # Port 3002
```

## 📱 Applications

### Verifier (Public) - http://localhost:3000
- Verify diplomas by Asset ID
- View recent verifications
- Scan QR codes (structure ready)
- Multilingual interface

### Issuer (Schools) - http://localhost:3001
- **Mint diploma NFTs** (REAL blockchain!)
- Upload documents to IPFS
- Manage students
- View minted diplomas

### Admin - http://localhost:3002
- Validate schools
- Manage fees
- Platform statistics

## 🧪 Testing the Platform

### Test 1: Mint a Diploma

1. Open http://localhost:3001/mint
2. Click "Connect Wallet" → Approve in Lace
3. Fill the form:
   - Student Name: "John Doe"
   - Student ID: "STU-2024-001"
   - Degree: "Bachelor"
   - Field: "Computer Science"
   - Graduation Date: Select date
   - Institution: "University of Example"
   - Institution ID: "INST-001"
4. Upload a PDF document
5. Upload an image
6. Click "Mint Diploma NFT"
7. Sign transaction in Lace wallet
8. **Success!** Copy the Asset ID

### Test 2: Verify the Diploma

1. Open http://localhost:3000
2. Paste the Asset ID from Test 1
3. Press Enter or click Search
4. **View verified diploma** with all details!

## 🔑 Environment Variables

```env
# Blockfrost (Cardano API)
NEXT_PUBLIC_BLOCKFROST_PROJECT_ID=preprod_xxxxxxxxxxxxx
NEXT_PUBLIC_BLOCKFROST_NETWORK=preprod

# IPFS Storage
NFT_STORAGE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx

# API Backend
NEXT_PUBLIC_API_URL=http://localhost:8787

# Cardano Network
NEXT_PUBLIC_CARDANO_NETWORK=preprod
NEXT_PUBLIC_CARDANO_EXPLORER=https://preprod.cardanoscan.io
```

## 📦 Project Structure

```
proofchain/
├── apps/
│   ├── verifier/          # Public verification (Port 3000)
│   ├── issuer/            # School minting (Port 3001)
│   └── admin/             # Admin panel (Port 3002)
├── packages/
│   ├── ui/                # Shared components
│   │   ├── components/    # ConnectWalletButton, InstitutionCard, etc.
│   │   └── hooks/         # useWallet, useI18n, useTheme
│   └── chain/             # Blockchain utilities
│       ├── mint.ts        # Real NFT minting with Lucid
│       ├── verify.ts      # Blockfrost verification
│       └── ipfs.ts        # NFT.Storage uploads
├── .env.example           # Environment template
├── projet.md              # Full documentation (French)
└── README.md              # Quick start guide
```

## 🔗 Key Files

### Blockchain Integration
- [packages/chain/src/mint.ts](file:///home/paluku/Desktop/haha/packages/chain/src/mint.ts) - Real NFT minting
- [packages/chain/src/verify.ts](file:///home/paluku/Desktop/haha/packages/chain/src/verify.ts) - Blockfrost verification
- [packages/chain/src/ipfs.ts](file:///home/paluku/Desktop/haha/packages/chain/src/ipfs.ts) - IPFS uploads

### UI Components
- [packages/ui/src/components/ConnectWalletButton.tsx](file:///home/paluku/Desktop/haha/packages/ui/src/components/ConnectWalletButton.tsx) - Lace wallet
- [packages/ui/src/components/InstitutionCard.tsx](file:///home/paluku/Desktop/haha/packages/ui/src/components/InstitutionCard.tsx) - Diploma display

### Applications
- [apps/issuer/app/mint/page.tsx](file:///home/paluku/Desktop/haha/apps/issuer/app/mint/page.tsx) - Minting interface
- [apps/verifier/app/verify/[assetId]/page.tsx](file:///home/paluku/Desktop/haha/apps/verifier/app/verify/[assetId]/page.tsx) - Verification page

## 🌍 Languages

Switch between:
- 🇫🇷 Français
- 🇬🇧 English
- 🇹🇿 Kiswahili
- 🇨🇩 Lingala

## 🎨 Features

✅ Real Cardano blockchain integration  
✅ IPFS document storage  
✅ Lace Wallet connection  
✅ CIP-25 NFT standard  
✅ Multilingual support  
✅ Dark mode  
✅ PWA ready  
✅ Responsive design  

## 📚 Documentation

- **projet.md**: Complete architecture and implementation details (French)
- **README.md**: Quick start guide
- **Walkthrough**: Implementation summary with code examples

## 🆘 Troubleshooting

### Wallet won't connect
- Ensure Lace is installed
- Check you're on Preprod network
- Refresh the page

### Minting fails
- Check you have test ADA (min ~5 ADA)
- Verify API keys in .env
- Check Lace is on Preprod network

### Verification shows "Not Found"
- Wait 1-2 minutes after minting
- Check Asset ID is correct
- Verify Blockfrost API key

## 🔧 NPM Scripts

```bash
# Development
npm run dev                 # All apps
npm run verifier:dev        # Verifier only
npm run issuer:dev          # Issuer only
npm run admin:dev           # Admin only

# Build
npm run build               # All apps
npm run lint                # Lint check
npm run clean               # Clean builds
```

## 🚀 Deployment

### Vercel (Recommended for Frontend)

```bash
# Verifier
cd apps/verifier
vercel --prod

# Issuer
cd apps/issuer
vercel --prod
```

### Environment Variables on Vercel

Add these in Vercel dashboard:
- `NEXT_PUBLIC_BLOCKFROST_PROJECT_ID`
- `NFT_STORAGE_API_KEY`
- `NEXT_PUBLIC_API_URL`

## 📊 What's Next?

### Immediate
1. ✅ Install dependencies (`npm install`)
2. ✅ Configure `.env` with API keys
3. ✅ Test minting flow
4. ✅ Test verification flow

### Short Term
- Complete Admin app pages
- Implement Hono.js API
- Add batch minting
- QR code generation

### Long Term
- Mainnet deployment
- Mobile apps
- Analytics dashboard
- Multi-wallet support

## 🎯 Success Criteria

You'll know it's working when:
1. ✅ Wallet connects successfully
2. ✅ Minting returns a transaction hash
3. ✅ Transaction appears on https://preprod.cardanoscan.io
4. ✅ Verification shows diploma details
5. ✅ IPFS document is downloadable

---

**Built with ❤️ using Cardano blockchain**
