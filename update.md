# Instructions pour la mise à jour et la publication du package

Suivez ces étapes pour mettre à jour la version du projet, appliquer les modifications et publier le package mis à jour dans le registre npm.

---

## Guide étape par étape

### 1. Cloner le dépôt

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Mettre à jour la version dans `package.json`

Modifiez le champ `"version"` en `1.0.7` dans votre fichier `package.json`, ou exécutez la commande suivante :

```bash
npm version 1.0.7 --no-git-tag-version
```

### 3. Apporter les modifications de code nécessaires

Appliquez les corrections de bugs, les nouvelles fonctionnalités ou le refactoring requis pour cette version.

### 4. Se connecter à npm

Authentifiez-vous auprès de votre compte npm si ce n'est pas déjà fait :

```bash
npm login
```

### 5. Publier le package

Déployez le package mis à jour dans le registre npm :

```bash
npm publish
```

### 6. Mettre à jour le dépôt

Validez vos modifications, créez un tag pour la version et poussez-les vers le dépôt distant :

```bash
git add .
git commit -m "chore: bump version to 1.0.7 and apply code updates"
git tag v1.0.7
git push origin main --tags
```

---

## Liste de contrôle

- [ ] Dépôt cloné
- [ ] Version mise à jour dans `package.json`
- [ ] Modifications de code apportées
- [ ] Connexion à npm effectuée
- [ ] Package publié (`npm publish`)
- [ ] Modifications validées, tag créé et poussé
