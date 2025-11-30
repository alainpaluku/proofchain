# 🎯 Guide de Test PROOFCHAIN

## ✅ Configuration Actuelle

### Blockfrost (Cardano Preprod)
- **Clé API**: Configurée ✅
- **Réseau**: Preprod (Testnet Cardano)
- **Statut**: Prêt pour les transactions blockchain

### Applications en Ligne
- **Verifier**: http://localhost:3000 ✅
- **Issuer**: http://localhost:3001 ✅

## 📋 Étapes de Test

### Étape 1: Installer Lace Wallet (5 minutes)

1. **Installer l'extension**:
   - Aller sur: https://www.lace.io/
   - Télécharger pour votre navigateur (Chrome/Brave/Edge)

2. **Créer un nouveau wallet**:
   - Ouvrir l'extension Lace
   - Suivre les instructions pour créer un wallet
   - Sauvegarder la phrase de récupération (24 mots) **IMPORTANT!**

3. **Basculer vers Preprod**:
   - Ouvrir Lace
   - Aller dans les paramètres (Settings)
   - Chercher "Network"
   - Sélectionner **"Preprod"**

4. **Obtenir des ADA de test**:
   - Copier votre adresse de réception
   - Aller sur: https://docs.cardano.org/cardano-testnet/tools/faucet
   - Coller votre adresse
   - Demander 1000 ADA de test
   - Attendre 1-2 minutes
   - ✅ Vérifier le solde dans Lace

### Étape 2: Tester la Connexion Wallet (2 minutes)

1. Ouvrir http://localhost:3001/mint
2. Cliquer sur le bouton **"Connect Wallet"** (en haut à droite)
3. Une popup Lace devrait apparaître
4. Cliquer **"Authorize"** pour autoriser la connexion
5. ✅ Vous devriez voir votre adresse et solde affichés

**Problèmes possibles**:
- Si "Install Lace Wallet" s'affiche → Lace n'est pas détecté
- Si rien ne se passe → Rafraîchir la page (F5)
- Si erreur de réseau → Vérifier que Lace est sur Preprod

### Étape 3: Préparer les Fichiers (3 minutes)

Pour tester le minting, vous aurez besoin de:

1. **Un fichier PDF** (diplôme):
   - Créer un PDF simple avec un éditeur de texte
   - Ou utiliser un PDF existant
   - Taille recommandée: < 5 MB

2. **Une image PNG/JPG** (photo du diplôme):
   - Créer une image simple
   - Ou utiliser une image existante
   - Taille recommandée: < 2 MB

### Étape 4: Minter Votre Premier Diplôme NFT (5 minutes)

1. **Ouvrir la page de minting**:
   - URL: http://localhost:3001/mint
   - Vérifier que le wallet est connecté

2. **Remplir le formulaire**:

   **Student Information**:
   - Student Name: `Jean Dupont`
   - Student ID: `STU-2024-001`

   **Diploma Information**:
   - Degree: Sélectionner `Bachelor`
   - Field of Study: `Informatique`
   - Graduation Date: Sélectionner une date (ex: 2024-06-15)
   - Grade (optionnel): `A+`
   - Honors (optionnel): `Summa Cum Laude`

   **Institution Information**:
   - Institution Name: `Université de Kinshasa`
   - Institution ID: `UNIKIN-001`

   **Documents**:
   - Cliquer "Upload PDF" → Sélectionner votre PDF
   - Cliquer "Upload Image" → Sélectionner votre image

3. **Lancer le minting**:
   - Cliquer le bouton **"Mint Diploma NFT"**
   - Vous verrez "Uploading to IPFS..." (upload des fichiers)
   - Puis "Minting NFT on Cardano..." (création du NFT)

4. **Signer la transaction**:
   - Une popup Nami apparaîtra
   - Vérifier les détails de la transaction
   - Cliquer **"Sign"**
   - Entrer votre mot de passe Nami

5. **Confirmation**:
   - ✅ Un message vert "Diploma Minted Successfully! 🎉" apparaîtra
   - Vous verrez:
     - **Transaction Hash**: Lien vers Cardano Explorer
     - **Asset ID**: ID unique du NFT (IMPORTANT - copiez-le!)

**Exemple de résultat**:
```
Transaction Hash: a1b2c3d4e5f6...
Asset ID: 1234567890abcdef1234567890abcdef1234567890abcdefDIPLOMA_STU-2024-001_1234567890
```

### Étape 5: Vérifier le Diplôme (2 minutes)

1. **Copier l'Asset ID** de l'étape précédente

2. **Ouvrir le Verifier**:
   - URL: http://localhost:3000

3. **Rechercher le diplôme**:
   - Coller l'Asset ID dans la barre de recherche
   - Appuyer sur Entrée ou cliquer 🔍

4. **Voir le résultat**:
   - ✅ Badge vert "Diplôme Vérifié ✓"
   - Toutes les informations du diplôme
   - Lien vers le document IPFS
   - Lien vers la transaction Cardano

### Étape 6: Vérifier sur Cardano Explorer (2 minutes)

1. Cliquer sur le lien "View on Cardano Explorer" dans la page de vérification
2. Vous serez redirigé vers https://preprod.cardanoscan.io
3. Vous verrez:
   - La transaction de minting
   - Les métadonnées du NFT
   - L'adresse du créateur
   - Le timestamp

## 🎉 Succès!

Si vous avez réussi toutes les étapes, vous avez:
- ✅ Connecté un wallet Cardano
- ✅ Uploadé des fichiers sur IPFS
- ✅ Minté un NFT réel sur la blockchain Cardano
- ✅ Vérifié l'authenticité du diplôme
- ✅ Consulté la transaction sur l'explorateur

## 🔄 Tests Supplémentaires

### Test 2: Minter un Deuxième Diplôme

Répétez l'étape 4 avec des données différentes:
- Student Name: `Marie Kabila`
- Student ID: `STU-2024-002`
- Degree: `Master`
- Field: `Génie Civil`

### Test 3: Vérifier un Asset ID Invalide

1. Aller sur http://localhost:3000
2. Entrer un Asset ID aléatoire: `invalidassetid123`
3. ✅ Vous devriez voir "Diplôme Non Vérifié" avec un message d'erreur

### Test 4: Tester les Langues

1. Sur n'importe quelle page
2. Cliquer sur le sélecteur de langue
3. Essayer: Français, English, Kiswahili, Lingala
4. ✅ L'interface devrait changer de langue

### Test 5: Tester le Mode Sombre

1. Cliquer sur l'icône 🌙/☀️
2. ✅ L'interface devrait basculer entre mode clair et sombre

## 📊 Statistiques de Test

Après vos tests, vous devriez avoir:
- **NFTs mintés**: 2+
- **Transactions Cardano**: 2+
- **Fichiers IPFS**: 4+ (2 PDFs + 2 images)
- **Coût en ADA**: ~5-10 ADA de test (frais de transaction)

## ⚠️ Problèmes Courants

### "Insufficient ADA balance"
- **Solution**: Demander plus d'ADA sur le faucet
- Minimum requis: ~5 ADA par transaction

### "Failed to upload to IPFS"
- **Cause**: Clé NFT.Storage manquante
- **Solution**: Pour l'instant, le minting fonctionnera mais sans upload IPFS
- **Note**: Vous devrez ajouter une clé NFT.Storage pour la production

### "Asset not found"
- **Cause**: Transaction pas encore confirmée
- **Solution**: Attendre 1-2 minutes et réessayer

### Wallet ne se connecte pas
- **Solution**: 
  1. Vérifier que Nami est sur Preprod
  2. Rafraîchir la page
  3. Redémarrer le navigateur

## 🎯 Prochaines Étapes

Une fois les tests réussis:

1. **Obtenir une clé NFT.Storage** (gratuit):
   - https://nft.storage
   - Créer un compte
   - Générer une clé API
   - Ajouter dans `.env`: `NFT_STORAGE_API_KEY=...`

2. **Tester avec IPFS complet**:
   - Redémarrer les serveurs: `Ctrl+C` puis `npm run dev`
   - Minter un nouveau diplôme
   - Vérifier que les fichiers sont sur IPFS

3. **Déployer en production**:
   - Suivre le guide dans `projet.md`
   - Déployer sur Vercel
   - Basculer vers Mainnet (avec de vrais ADA!)

## 📝 Notes Importantes

- **Preprod vs Mainnet**: 
  - Preprod = Testnet (ADA gratuits, pour tester)
  - Mainnet = Production (vrais ADA, coûte de l'argent)
  
- **Sécurité**:
  - Ne partagez JAMAIS votre phrase de récupération
  - Les clés API sont dans `.env` (ignoré par git)
  
- **Performance**:
  - Premier minting: ~30-60 secondes
  - Minting suivants: ~20-30 secondes
  - Vérification: ~2-5 secondes

---

**Bon test! 🚀**

Si vous rencontrez des problèmes, consultez:
- `projet.md` pour la documentation complète
- `QUICKSTART.md` pour le guide rapide
- Les logs dans le terminal pour les erreurs
