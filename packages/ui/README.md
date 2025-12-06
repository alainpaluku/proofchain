# @proofchain/ui

Package de composants UI partagés pour les applications PROOFCHAIN (Verifier et Issuer).

## Installation

Ce package est utilisé en interne dans le monorepo. Il est automatiquement disponible via:

```typescript
import { ComponentName } from '@proofchain/ui';
```

## Composants disponibles

### IPFSImage

Composant d'image avec gestion des états de chargement IPFS.

```typescript
import { IPFSImage } from '@proofchain/ui';

<IPFSImage
  src="ipfs://QmHash..."
  alt="Description de l'image"
  className="w-full h-auto"
  fallbackText="Image non disponible"
  onLoad={() => console.log('Image chargée')}
  onError={() => console.log('Erreur de chargement')}
/>
```

**Props:**
- `src` (string, required): URL de l'image IPFS
- `alt` (string, required): Texte alternatif
- `className` (string, optional): Classes CSS additionnelles
- `fallbackText` (string, optional): Texte affiché en cas d'erreur
- `onLoad` (function, optional): Callback après chargement réussi
- `onError` (function, optional): Callback en cas d'erreur

**Fonctionnalités:**
- ✅ États: loading, loaded, error
- ✅ Retry automatique (2 tentatives)
- ✅ Bouton retry manuel
- ✅ Skeleton loader
- ✅ Dimensions stables

### NotificationButton

Bouton de notifications avec dropdown.

```typescript
import { NotificationButton } from '@proofchain/ui';

<NotificationButton />
```

**Fonctionnalités:**
- ✅ Badge avec nombre de notifications non lues
- ✅ Modal avec liste des notifications
- ✅ Marquer comme lu (individuel ou tout)
- ✅ Persistance dans localStorage
- ✅ Prévention du scroll du body
- ✅ Accessibilité complète (ARIA)

**Format des notifications:**
```typescript
interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}
```

### Sidebar

Sidebar de navigation responsive.

```typescript
import { Sidebar, type SidebarItem } from '@proofchain/ui';
import { Home, Settings } from 'lucide-react';

const items: SidebarItem[] = [
  {
    name: 'Accueil',
    icon: Home,
    href: '/',
    active: true,
  },
  {
    name: 'Paramètres',
    icon: Settings,
    href: '/settings',
    active: false,
  }
];

<Sidebar
  items={items}
  logo={{
    icon: Shield,
    title: 'PROOFCHAIN',
    subtitle: 'Verifier'
  }}
  onClose={() => console.log('Sidebar fermée')}
/>
```

### ConnectWalletButton

Bouton de connexion au wallet Cardano.

```typescript
import { ConnectWalletButton } from '@proofchain/ui';

<ConnectWalletButton showBalance={true} />
```

### InstitutionCard

Carte d'affichage d'un diplôme vérifié.

```typescript
import { InstitutionCard } from '@proofchain/ui';

<InstitutionCard
  metadata={diplomaMetadata}
  txHash="abc123..."
  verified={true}
  onClick={() => console.log('Carte cliquée')}
/>
```

### ThemeToggle

Bouton de basculement du thème (light/dark).

```typescript
import { ThemeToggle } from '@proofchain/ui';

<ThemeToggle />
```

### LanguageSelector

Sélecteur de langue.

```typescript
import { LanguageSelector } from '@proofchain/ui';

<LanguageSelector />
```

## Hooks disponibles

### useWallet

Hook pour la gestion du wallet Cardano.

```typescript
import { useWallet } from '@proofchain/ui';

const { walletApi, connected, connecting, connect, disconnect } = useWallet();

// Connexion
await connect('nami');

// Déconnexion
disconnect();

// Vérifier la connexion
if (connected && walletApi) {
  const address = await walletApi.getChangeAddress();
}
```

### useI18n

Hook pour l'internationalisation.

```typescript
import { useI18n } from '@proofchain/ui';

const { t, language, setLanguage } = useI18n();

// Traduction
const text = t('common.welcome');

// Changer de langue
setLanguage('fr');
```

### useTheme

Hook pour la gestion du thème.

```typescript
import { useTheme } from '@proofchain/ui';

const { theme, setTheme, effectiveTheme } = useTheme();

// Changer le thème
setTheme('dark'); // 'light' | 'dark' | 'system'

// Thème effectif (résolu si 'system')
console.log(effectiveTheme); // 'light' | 'dark'
```

## Utilitaires disponibles

### Constantes

```typescript
import { Z_INDEX, COLOR_MAP, BREAKPOINTS, ANIMATION } from '@proofchain/ui';

// Z-index standardisé
const modalZIndex = Z_INDEX.modalContent; // 101

// Couleurs pré-définies
const purpleClasses = COLOR_MAP.purple;
// {
//   bg: 'bg-purple-100 dark:bg-purple-900/30',
//   text: 'text-purple-600 dark:text-purple-400',
//   ...
// }

// Breakpoints
const isMobile = window.innerWidth < BREAKPOINTS.md; // 768

// Durées d'animation
const duration = ANIMATION.normal; // 200ms
```

### localStorage sécurisé

```typescript
import { getStorageItem, setStorageItem, removeStorageItem, clearStorage } from '@proofchain/ui';

// Lire
const theme = getStorageItem('theme'); // 'light' | 'dark' | 'system' | null

// Écrire
const success = setStorageItem('theme', 'dark'); // boolean

// Supprimer
removeStorageItem('theme');

// Tout effacer
clearStorage();
```

**Fonctionnalités:**
- ✅ Try/catch automatique
- ✅ Validation des données
- ✅ Gestion des erreurs de quota
- ✅ Types TypeScript stricts
- ✅ SSR-safe (vérifie window)

## Types disponibles

```typescript
import type {
  Notification,
  SidebarItem,
  WalletState,
  Language,
  Theme,
  FeatureColor,
  ColorClasses,
  StorageKeys
} from '@proofchain/ui';
```

## Bonnes pratiques

### ⚠️ Classes Tailwind dynamiques

**❌ Ne jamais faire:**
```typescript
const color = 'purple';
<div className={`bg-${color}-100`}> // Ne fonctionne pas!
```

**✅ Toujours faire:**
```typescript
import { COLOR_MAP } from '@proofchain/ui';

const color = 'purple';
const classes = COLOR_MAP[color];
<div className={classes.bg}> // Fonctionne!
```

### ✅ Accessibilité

Tous les composants incluent:
- Attributs ARIA appropriés
- Touch targets minimum 44x44px
- Focus indicators visibles
- Support clavier complet
- Contraste WCAG AA

### ✅ Performance

- Lazy loading des images
- Memoization des composants lourds
- Optimisation des re-renders
- Bundle size minimal

### ✅ Dark Mode

Tous les composants supportent le dark mode avec:
- Classes `dark:` Tailwind
- Transitions douces
- Contraste adapté

## Développement

### Ajouter un nouveau composant

1. Créer le fichier dans `src/components/`
2. Exporter depuis `src/index.ts`
3. Ajouter les types si nécessaire
4. Documenter dans ce README

### Ajouter un nouvel utilitaire

1. Créer le fichier dans `src/lib/`
2. Exporter depuis `src/index.ts`
3. Ajouter les types
4. Documenter dans ce README

### Tests

```bash
# Lancer les tests
npm test

# Lancer les tests en watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

## Support

Pour toute question ou problème, créer une issue dans le repository.

## License

Propriétaire - PROOFCHAIN
