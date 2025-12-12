# ProofChain - Guide de Déploiement Vercel

## Architecture du Monorepo

```
proofchain/
├── apps/
│   ├── admin/      → Dashboard administrateur (port 3002)
│   ├── issuer/     → Portail émetteur de certificats (port 3001)
│   ├── landing/    → Site vitrine (port 3003)
│   └── verifier/   → Vérification de certificats (port 3000)
├── packages/
│   ├── chain/      → Logique blockchain Cardano
│   ├── shared/     → Utilitaires partagés
│   └── ui/         → Composants UI réutilisables
└── turbo.json      → Configuration Turborepo
```

## Déploiement via GitHub (Recommandé)

### Option A : Projets Vercel existants

Si vos 4 projets existent déjà sur Vercel :

1. Aller dans **Settings → General** de chaque projet
2. Vérifier/modifier le **Root Directory** :

| Projet | Root Directory |
|--------|----------------|
| proofchain-landing | `apps/landing` |
| proofchain-verifier | `apps/verifier` |
| proofchain-issuer | `apps/issuer` |
| proofchain-admin | `apps/admin` |

3. Dans **Settings → Git**, vérifier que le repo GitHub est bien connecté
4. Les nouveaux `vercel.json` dans chaque app seront automatiquement utilisés au prochain push

**C'est tout !** Les fichiers `vercel.json` créés dans chaque app gèrent automatiquement :
- L'installation des dépendances du monorepo
- Le build via Turborepo
- L'optimisation avec `turbo-ignore`

---

### Option B : Nouveaux projets

Pour créer de nouveaux projets Vercel :

1. Aller sur [vercel.com/new](https://vercel.com/new)
2. Importer le repo GitHub `proofchain`
3. Configurer chaque projet :

| App | Root Directory | Nom suggéré |
|-----|----------------|-------------|
| Landing | `apps/landing` | proofchain-landing |
| Verifier | `apps/verifier` | proofchain-verifier |
| Issuer | `apps/issuer` | proofchain-issuer |
| Admin | `apps/admin` | proofchain-admin |

### Configuration du projet

Pour chaque projet Vercel :

1. **Root Directory** : Sélectionner le dossier de l'app (ex: `apps/landing`)
2. **Framework Preset** : Next.js (auto-détecté)
3. **Build & Output Settings** : Laisser par défaut (le `vercel.json` de chaque app gère ça)

### Étape 3 : Variables d'environnement

Ajouter ces variables dans chaque projet Vercel (Settings → Environment Variables) :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key  # Seulement pour admin/issuer

# Blockchain Cardano
NEXT_PUBLIC_BLOCKFROST_PROJECT_ID=your_blockfrost_id
NEXT_PUBLIC_BLOCKFROST_NETWORK=preprod  # ou mainnet
NEXT_PUBLIC_CARDANO_EXPLORER=https://preprod.cardanoscan.io

# IPFS (Pinata)
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret
```

**Note** : L'app `landing` n'a pas besoin de toutes ces variables.

### Étape 4 : Déploiement automatique

Une fois configuré, chaque push sur `main` déclenche automatiquement :
- Build des packages dépendants via Turborepo
- Build de l'app concernée
- Déploiement sur Vercel

Le `turbo-ignore` optimise les builds en ne redéployant que les apps affectées par les changements.

---

## Déploiement Manuel (CLI)

### Prérequis

```bash
npm install -g vercel
vercel login
```

### Lier chaque app (première fois)

```bash
# Pour chaque app
vercel link --cwd apps/landing
vercel link --cwd apps/verifier
vercel link --cwd apps/issuer
vercel link --cwd apps/admin
```

### Déployer

```bash
# Preview (toutes les apps)
npm run deploy

# Production (toutes les apps)
npm run deploy:prod

# Une seule app
npm run deploy:landing
npm run deploy:issuer:prod
```

---

## Structure des fichiers Vercel

Chaque app possède son propre `vercel.json` :

```json
{
  "framework": "nextjs",
  "installCommand": "npm install --prefix ../.. && npm run build --workspace=packages/...",
  "buildCommand": "cd ../.. && npx turbo run build --filter=@proofchain/[app]",
  "outputDirectory": ".next",
  "ignoreCommand": "npx turbo-ignore"
}
```

**Explication** :
- `installCommand` : Installe les dépendances à la racine du monorepo
- `buildCommand` : Utilise Turborepo pour builder uniquement l'app ciblée et ses dépendances
- `ignoreCommand` : Évite les builds inutiles si l'app n'est pas affectée

---

## Domaines personnalisés suggérés

| App | Domaine suggéré |
|-----|-----------------|
| Landing | proofchain.io |
| Verifier | verify.proofchain.io |
| Issuer | issuer.proofchain.io |
| Admin | admin.proofchain.io |

---

## Dépannage

### Erreur "Cannot find module @proofchain/..."

Les packages internes ne sont pas buildés. Vérifier que `installCommand` inclut le build des packages.

### Build trop long

Turborepo cache les builds. Le premier déploiement est plus long, les suivants sont optimisés.

### Variables d'environnement non trouvées

Vérifier que les variables sont définies pour l'environnement correct (Preview/Production) dans Vercel.

---

## Commandes utiles

```bash
# Dev local
npm run dev              # Toutes les apps
npm run landing:dev      # Une seule app

# Build local
npm run build            # Toutes les apps

# Lint
npm run lint
```
