# Déploiement Vercel - PROOFCHAIN Monorepo

Ce projet est un monorepo avec 4 applications Next.js. Chaque app doit être déployée comme un **projet Vercel séparé**.

## Configuration pour chaque application

Créez **4 projets Vercel** en important le repo `alainpaluku/proofchain`:

### 1. Landing Page (proofchain-landing)

| Paramètre | Valeur |
|-----------|--------|
| **Root Directory** | `.` (racine) |
| **Framework Preset** | Next.js |
| **Build Command** | `npx turbo run build --filter=@proofchain/landing` |
| **Output Directory** | `apps/landing/.next` |

### 2. Verifier (proofchain-verifier)

| Paramètre | Valeur |
|-----------|--------|
| **Root Directory** | `.` (racine) |
| **Framework Preset** | Next.js |
| **Build Command** | `npx turbo run build --filter=@proofchain/verifier` |
| **Output Directory** | `apps/verifier/.next` |

### 3. Issuer (proofchain-issuer)

| Paramètre | Valeur |
|-----------|--------|
| **Root Directory** | `.` (racine) |
| **Framework Preset** | Next.js |
| **Build Command** | `npx turbo run build --filter=@proofchain/issuer` |
| **Output Directory** | `apps/issuer/.next` |

### 4. Admin (proofchain-admin)

| Paramètre | Valeur |
|-----------|--------|
| **Root Directory** | `.` (racine) |
| **Framework Preset** | Next.js |
| **Build Command** | `npx turbo run build --filter=@proofchain/admin` |
| **Output Directory** | `apps/admin/.next` |

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

1. Allez sur [vercel.com](https://vercel.com) > "Add New Project"
2. Importez `alainpaluku/proofchain`
3. **IMPORTANT**: Laissez Root Directory vide (`.` = racine)
4. Modifiez Build Command et Output Directory selon le tableau
5. Ajoutez les variables d'environnement
6. Deploy!
