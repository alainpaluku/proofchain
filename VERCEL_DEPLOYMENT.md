# 🚀 Déploiement sur Vercel

Guide pour déployer les 3 applications PROOFCHAIN sur Vercel.

## 📋 Prérequis

- Compte Vercel (gratuit)
- Repository GitHub connecté à Vercel
- Variables d'environnement configurées (voir `.env.example`)

## 🏗️ Architecture

```
proofchain/
├── apps/
│   ├── verifier/    ← App publique (vérification diplômes)
│   ├── issuer/      ← App institutions (émission NFT)
│   └── admin/       ← App admin (gestion plateforme)
├── packages/
│   ├── ui/          ← Composants UI partagés
│   ├── shared/      ← Logique métier partagée
│   └── chain/       ← Intégration Cardano
└── turbo.json       ← Configuration Turborepo
```

Chaque app sera déployée comme un **projet Vercel séparé**.

---

## 📝 Déploiement rapide

### 1. Importer le repository

1. Va sur [vercel.com/new](https://vercel.com/new)
2. Connecte ton compte GitHub
3. Sélectionne le repository `proofchain`
4. **Important** : Tu devras créer 3 projets séparés

### 2. Configuration par app

| App | Root Directory | Project Name |
|-----|----------------|--------------|
| Verifier | `apps/verifier` | `proofchain-verifier` |
| Issuer | `apps/issuer` | `proofchain-issuer` |
| Admin | `apps/admin` | `proofchain-admin` |

### 3. Paramètres de build (automatiques)

Vercel détecte automatiquement Next.js. Les fichiers `vercel.json` dans chaque app configurent :
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Region: `cdg1` (Paris)

---

## 🔐 Variables d'environnement

### Variables communes (toutes les apps)

```env
NEXT_PUBLIC_BLOCKFROST_PROJECT_ID=your_blockfrost_id
NEXT_PUBLIC_BLOCKFROST_NETWORK=preprod
NEXT_PUBLIC_CARDANO_EXPLORER=https://preprod.cardanoscan.io
```

### Variables Verifier

```env
# Aucune variable supplémentaire requise
```

### Variables Issuer

```env
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt
```

### Variables Admin

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## ⚙️ Configuration importante

### Activer l'accès aux packages partagés

Dans **Settings > General** de chaque projet Vercel :

1. Trouve **"Root Directory"**
2. Active **"Include source files outside of the Root Directory in the Build Step"**

Cela permet à Vercel d'accéder aux packages dans `packages/*`.

### Version Node.js

Dans **Settings > General** :
- Node.js Version: `20.x`

---

## 🌐 URLs de production

Après déploiement :

| App | URL |
|-----|-----|
| Verifier | `https://proofchain-verifier.vercel.app` |
| Issuer | `https://proofchain-issuer.vercel.app` |
| Admin | `https://proofchain-admin.vercel.app` |

---

## 🔗 Domaines personnalisés

1. Va dans **Settings > Domains**
2. Ajoute ton domaine
3. Configure les DNS :

```
verifier.proofchain.io  → CNAME → cname.vercel-dns.com
issuer.proofchain.io    → CNAME → cname.vercel-dns.com
admin.proofchain.io     → CNAME → cname.vercel-dns.com
```

---

## 🔄 Déploiements automatiques

- Push sur `main` → Déploiement **Production**
- Push sur autre branche → Déploiement **Preview**
- Pull Request → URL de preview automatique

---

## ❓ Résolution de problèmes

### "Module not found: @proofchain/ui"
→ Active "Include source files outside of the Root Directory"

### "Build failed - Node version"
→ Définis Node.js Version sur `20.x`

### "WASM not supported"
→ Déjà configuré dans `next.config.js` avec `asyncWebAssembly: true`

### Erreur Blockfrost/crypto
→ Les fallbacks sont configurés dans `next.config.js`

### Build trop long
→ Turborepo cache les builds. Le premier peut être long, les suivants seront rapides.

---

## 📊 Monitoring

Vercel fournit automatiquement :
- Analytics de performance
- Logs en temps réel
- Métriques Web Vitals
- Alertes d'erreurs

---

## 📞 Support

- [Documentation Vercel](https://vercel.com/docs)
- [Guide Monorepo](https://vercel.com/docs/monorepos/turborepo)
- [Next.js sur Vercel](https://vercel.com/docs/frameworks/nextjs)
