# @proofchain/ui

Package de composants UI partagés pour les applications PROOFCHAIN.

## Installation

Ce package est utilisé en interne dans le monorepo :

```typescript
import { ComponentName } from '@proofchain/ui';
```

## Composants disponibles

### AppLayout

Layout principal avec sidebar responsive.

```typescript
import { AppLayout, type SidebarItem } from '@proofchain/ui';

const menuItems: SidebarItem[] = [
  { label: 'Accueil', icon: Home, href: '/' },
  { label: 'Paramètres', icon: Settings, href: '/settings' },
];

<AppLayout menuItems={menuItems} logo={<Logo />}>
  {children}
</AppLayout>
```

### Card, StatCard, EmptyState

Composants de carte réutilisables.

```typescript
import { Card, CardHeader, StatCard, EmptyState } from '@proofchain/ui';

<Card>
  <CardHeader title="Titre" icon={Icon} />
  {content}
</Card>

<StatCard icon={Users} value="123" label="Utilisateurs" change="+5%" />

<EmptyState icon={FileX} title="Aucune donnée" description="..." />
```

### Button

Bouton avec variants.

```typescript
import { Button } from '@proofchain/ui';

<Button variant="primary" icon={Save}>Enregistrer</Button>
<Button variant="outline" size="sm">Annuler</Button>
<Button variant="danger">Supprimer</Button>
```

### FormField

Champs de formulaire standardisés.

```typescript
import { InputField, TextAreaField, SelectField, ToggleSwitch } from '@proofchain/ui';

<InputField label="Email" type="email" value={email} onChange={...} />
<SelectField label="Pays" options={countries} value={country} onChange={...} />
<ToggleSwitch label="Activer" checked={enabled} onChange={...} />
```

### ConnectWalletButton

Connexion au wallet Cardano.

```typescript
import { ConnectWalletButton } from '@proofchain/ui';

<ConnectWalletButton showBalance={true} />
```

### ThemeToggle

Basculement du thème (light/dark/system).

```typescript
import { ThemeToggle } from '@proofchain/ui';

<ThemeToggle />
```

### Modal, LoadingSpinner, Toast

Composants utilitaires.

```typescript
import { Modal, LoadingSpinner, Toast } from '@proofchain/ui';

<Modal isOpen={open} onClose={close} title="Titre">
  {content}
</Modal>

<LoadingSpinner size="lg" />
```

## Hooks disponibles

### useWallet

Gestion du wallet Cardano.

```typescript
import { useWallet } from '@proofchain/ui';

const { walletApi, connected, connecting, connect, disconnect } = useWallet();
await connect('nami');
```

### useTheme

Gestion du thème.

```typescript
import { useTheme } from '@proofchain/ui';

const { theme, setTheme, effectiveTheme } = useTheme();
setTheme('dark');
```

## Utilitaires

```typescript
import { Z_INDEX, COLOR_MAP, BREAKPOINTS } from '@proofchain/ui';
import { getStorageItem, setStorageItem } from '@proofchain/ui';
```

## License

Propriétaire - PROOFCHAIN
