# Traductions PROOFCHAIN Issuer

## Langues supportées

- 🇫🇷 **Français** (fr) - Par défaut
- 🇬🇧 **English** (en)
- 🇹🇿 **Swahili** (sw)
- 🇨🇩 **Lingala** (ln)

## Utilisation

### Dans un composant

```tsx
import { useI18n } from '@proofchain/ui';
import { issuerTranslations } from '../../lib/translations';

export default function MyComponent() {
    const { t, language, setLanguage } = useI18n(issuerTranslations);
    
    return (
        <div>
            <h1>{t('issuer.dashboard.title')}</h1>
            <p>{t('issuer.dashboard.subtitle')}</p>
        </div>
    );
}
```

### Changer de langue

```tsx
// Changer vers l'anglais
setLanguage('en');

// Changer vers le swahili
setLanguage('sw');

// Changer vers le lingala
setLanguage('ln');
```

La langue est automatiquement sauvegardée dans `localStorage` et persiste entre les sessions.

## Structure des clés

Les clés de traduction suivent une structure hiérarchique :

```
issuer.{page}.{section}.{element}
```

### Exemples

- `issuer.dashboard.title` - Titre de la page dashboard
- `issuer.mint.form.studentName` - Label du champ nom étudiant
- `issuer.students.table.name` - En-tête colonne nom
- `issuer.nav.dashboard` - Label menu dashboard

## Ajouter une nouvelle traduction

1. Ouvrir `apps/issuer/lib/translations.ts`
2. Ajouter la clé avec les 4 langues :

```typescript
'issuer.mypage.title': {
    fr: 'Mon titre',
    en: 'My title',
    sw: 'Kichwa changu',
    ln: 'Titre na ngai',
},
```

3. Utiliser dans le composant :

```tsx
{t('issuer.mypage.title')}
```

## Pages traduites

- ✅ Dashboard (`/`)
- ✅ Mint (`/mint`)
- ✅ Students (`/students`)
- ✅ KYC (`/kyc`)
- ✅ Subscriptions (`/subscriptions`)
- ✅ Settings (`/settings`)
- ✅ Notifications (`/notifications`)
- ✅ Navigation (Sidebar)

## Traductions communes

Les traductions communes (wallet, actions, statuts) sont dans `@proofchain/ui` et disponibles automatiquement.

### Exemples de clés communes

- `wallet.connect` - Connecter le portefeuille
- `action.save` - Enregistrer
- `action.cancel` - Annuler
- `status.loading` - Chargement...
- `status.success` - Succès
- `theme.light` - Clair
- `theme.dark` - Sombre
