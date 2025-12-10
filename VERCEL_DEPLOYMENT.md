# Déploiement Vercel - PROOFCHAIN Monorepo

Ce projet est un monorepo avec 4 applications Next.js 13.5.6. Chaque app doit être déployée comme un **projet Vercel séparé**.

## Configuration pour chaque application

Créez **4 projets Vercel** en important le repo `alainpaluku/proofchain`:

### 1. Landing Page (proofchain-landing)

| Paramètre | Valeur |
|-----------|--------|
| **Root Directory** | `apps/landing` |
| **Framework Preset** | Next.js |
| **Build Command** | `cd ../.. && npm install && npx turbo run build --filter=@proofchain/landing` |
| **Output Directory** | `.next` |

### 2. Verifier (proofchain-verifier)

| Paramètre | Valeur |
|-----------|--------|
| **Root Directory** | `apps/verifier` |
| **Framework Preset** | Next.js |
| **Build Command** | `cd ../.. && npm install && npx turbo run build --filter=@proofchain/verifier` |
| **Output Directory** | `.next` |

### 3. Issuer (proofchain-issuer)

| Paramètre | Valeur |
|-----------|--------|
| **Root Directory** | `apps/issuer` |
| **Framework Preset** | Next.js |
| **Build Command** | `cd ../.. && npm install && npx turbo run build --filter=@proofchain/issuer` |
| **Output Directory** | `.next` |

### 4. Admin (proofchain-admin)

| Paramètre | Valeur |
|-----------|--------|
| **Root Directory** | `apps/admin` |
| **Framework Preset** | Next.js |
| **Build Command** | `cd ../.. && npm install && npx turbo run build --filter=@proofchain/admin` |
| **Output Directory** | `.next` |

## Variables d'environnement

Ajoutez ces variables dans chaque projet (Settings > Environment Variables):

```
NEXT_PUBLIC_BLOCKFROST_PROJECT_ID=votre_project_id
NEXT_PUBLIC_BLOCKFROST_NETWORK=preprod
NEXT_PUBLIC_CARDANO_EXPLORER=https://preprod.cardanoscan.io
NEXT_PUBLIC_PINATA_API_KEY=votre_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=votre_secret_key
NEXT_PUBLIC_SUPABASE_URL=votre_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
```

## Étapes

1. Allez sur [vercel.com](https://vercel.com) → "Add New Project"
2. Sélectionnez le repo `alainpaluku/proofchain`
3. Sélectionnez le dossier de l'app (ex: `apps/landing`)
4. Configurez le Build Command selon le tableau ci-dessus
5. Ajoutez les variables d'environnement
6. Cliquez "Deploy"

## Versions utilisées

- Next.js: 13.5.6
- React: 18.2.0
- TypeScript: 5.3.2
- Turbo: 1.10.16
