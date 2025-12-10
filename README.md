# 🔐 PROOFCHAIN - Blockchain Academic Credentials

Système de vérification et d'émission de diplômes académiques sur la blockchain Cardano.

## 📦 Applications

### Verifier (Port 3000)
Application de vérification de diplômes pour le grand public.

### Issuer (Port 3001)
Application d'émission de diplômes pour les institutions.

### Admin (Port 3002)
Application d'administration de la plateforme.

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer toutes les applications
npm run dev
```

### Accès
- **Verifier**: http://localhost:3000
- **Issuer**: http://localhost:3001
- **Admin**: http://localhost:3002

## 🏗️ Architecture

```
proofchain/
├── apps/
│   ├── verifier/          # App de vérification (Port 3000)
│   ├── issuer/            # App d'émission (Port 3001)
│   └── admin/             # App d'administration (Port 3002)
├── packages/
│   ├── ui/                # Composants UI partagés
│   ├── shared/            # Logique métier partagée
│   └── chain/             # Logique blockchain
└── supabase/              # Schéma base de données
```

## 🎨 Stack technique

- **Framework**: Next.js 15
- **UI**: React 18, Tailwind CSS 3.4
- **Language**: TypeScript 5.6
- **Blockchain**: Cardano (Blockfrost API)
- **Storage**: IPFS (Pinata)
- **Database**: Supabase
- **Wallet**: Nami, Lace

## 🔧 Commandes

```bash
npm run dev              # Lancer toutes les apps
npm run verifier:dev     # Lancer uniquement Verifier
npm run issuer:dev       # Lancer uniquement Issuer
npm run admin:dev        # Lancer uniquement Admin
npm run build            # Build toutes les apps
npm run lint             # Vérifier le code
```

## 📝 Variables d'environnement

Créer un fichier `.env` à la racine avec :

```env
NEXT_PUBLIC_BLOCKFROST_PROJECT_ID=your_key
NEXT_PUBLIC_BLOCKFROST_NETWORK=preprod
NEXT_PUBLIC_CARDANO_EXPLORER=https://preprod.cardanoscan.io
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📄 License

Propriétaire - PROOFCHAIN
