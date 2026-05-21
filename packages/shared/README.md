# @proofchain/shared

Package partagé contenant les utilitaires, hooks, types et services communs à toutes les applications PROOFCHAINS.

## 📦 Contenu

### Types
Types TypeScript partagés pour garantir la cohérence entre les apps :
- `User`, `Institution`, `Diploma`, `KYCRequest`
- `Notification`, `Stats`, `SubscriptionPlan`
- `ApiResponse`, `PaginatedResponse`, `FormState`

### Contexts
- **AppContext** : Gestion d'état global (user, notifications, loading, errors)

### Hooks
- **useAsync** : Gestion des opérations asynchrones
- **useForm** : Gestion des formulaires avec validation
- **usePagination** : Pagination de listes

### Services
- **api** : Service centralisé pour les appels API (GET, POST, PUT, DELETE)

### Utils
- **format** : Formatage de dates, devises, nombres, adresses
- **validation** : Validateurs réutilisables (email, URL, phone, etc.)

## 🚀 Utilisation

```typescript
// Import types
import type { User, Diploma } from '@proofchain/shared';

// Use context
import { useApp } from '@proofchain/shared';
const { user, addNotification } = useApp();

// Use hooks
import { useAsync, useForm, usePagination } from '@proofchain/shared';

// Use services
import { api } from '@proofchain/shared';
const result = await api.get('/diplomas');

// Use utils
import { formatDate, formatCurrency, validators } from '@proofchain/shared';
```

## 📝 Avantages

✅ **DRY** : Pas de duplication de code entre apps
✅ **Type Safety** : Types partagés garantissent la cohérence
✅ **Maintenabilité** : Modifications centralisées
✅ **Testabilité** : Logique isolée et testable
✅ **Performance** : Code optimisé et réutilisable
