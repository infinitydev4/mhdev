# Module Admin - Architecture & Refactoring

## Résumé de l'audit architectural

### Problèmes identifiés (avant refactoring)

1. **Composants trop volumineux** : `AdminArticleForm` (~355 lignes), `AdminCategoriesPage` (~424 lignes)
2. **Code dupliqué** : Bloc d'authentification (loading, auth gate) répété sur chaque page (~50 lignes × 5)
3. **Logique métier dans l'UI** : `slugify`, `cycleStatus` éparpillés dans les composants
4. **Couplage fort** : Appels API directs dans les pages, pas de couche d'abstraction
5. **Pas de validation côté client** : Validation minimale avant soumission
6. **Gestion d'erreur inconsistante** : Messages extraits manuellement dans chaque `catch`
7. **État dispersé** : Nombreux `useState` locaux, pas de normalisation
8. **Sécurité** : Token en `localStorage` (XSS), pas de refresh token, `dangerouslySetInnerHTML` sans sanitization

### Structure actuelle (après refactoring)

```
src/
├── features/admin/
│   ├── domain/utils/          # Logique métier pure
│   │   ├── slugify.ts
│   │   ├── article-status.ts
│   │   └── index.ts
│   ├── hooks/                 # Hooks réutilisables
│   │   ├── useRequireAuth.ts
│   │   ├── useTaxonomies.ts
│   │   ├── useArticles.ts
│   │   └── index.ts
│   ├── ui/                    # Composants UI génériques
│   │   ├── AdminLoadingState.tsx
│   │   ├── AdminAuthGate.tsx
│   │   ├── AdminAlert.tsx
│   │   └── index.ts
│   ├── components/            # Composants admin spécifiques
│   │   ├── AdminPageHeader.tsx
│   │   ├── AdminFormField.tsx
│   │   ├── AdminFormInput.tsx
│   │   ├── AdminFormTextarea.tsx
│   │   ├── TagSelector.tsx
│   │   └── index.ts
│   ├── lib/                   # Utilitaires
│   │   ├── validators.ts
│   │   └── api-client.ts
│   └── README.md
├── app/admin/
│   ├── layout.tsx             # Layout partagé, fournit AdminLayout quand auth
│   ├── page.tsx
│   ├── articles/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── edit/page.tsx
│   └── categories/page.tsx
└── components/admin/         # Composants existants (partiellement refactorisés)
    ├── AdminLayout.tsx
    ├── AdminArticleForm.tsx
    └── AdminMarkdownEditor.tsx
```

## Améliorations réalisées

### Architecture
- **Séparation des responsabilités** : Domain (utils), hooks (logique), UI (présentation)
- **Layout centralisé** : `layout.tsx` fournit `AdminLayout` quand l'utilisateur est connecté
- **Composants réutilisables** : `AdminLoadingState`, `AdminAuthGate`, `AdminAlert`, `AdminPageHeader`, `AdminFormField`, `TagSelector`
- **Hooks dédiés** : `useTaxonomies`, `useArticles`, `useRequireAuth` pour centraliser la logique

### Qualité du code
- **Validation centralisée** : `validators.ts` pour login, article, catégorie/tag
- **Extraction d'erreurs API** : `extractApiError()` pour un traitement uniforme
- **Utils métier** : `slugify`, `getArticleStatusLabel`, `getNextArticleStatus` extraits
- **Réduction de la duplication** : Suppression de ~200 lignes de code répétées

### Sécurité
- **Validation des entrées** : Email, champs obligatoires, limites de caractères (meta title/description)
- **Messages d'erreur** : Pas de fuite d'informations sensibles
- **TODO** : Sanitization du HTML pour `dangerouslySetInnerHTML` (à faire côté backend ou avec DOMPurify)

### Performance
- **Hooks avec dépendances correctes** : `useTaxonomies` évite les requêtes dupliquées
- **Callbacks mémorisés** : `useCallback` pour `handleStatusClick`, `handleDelete`, `toggleTag`
- **Suppression de `safeToken` dans les deps** : Évite des re-fetches inutiles (edit page)

### Gestion d'état
- **Mise à jour optimiste** : `updateArticleInList`, `removeArticleFromList` dans `useArticles`
- **État prévisible** : Flux clair auth → layout → contenu

## Améliorations recommandées (long terme)

1. **Sécurité**
   - Migrer les tokens vers des cookies `httpOnly` + CSRF
   - Implémenter le refresh token dans `useAdminAuth`
   - Sanitiser le HTML du contenu article (DOMPurify ou backend)

2. **Performance**
   - Intégrer React Query ou SWR pour le cache et la déduplication
   - Lazy load des routes admin (dynamic import)

3. **RBAC**
   - Afficher/masquer les actions selon le rôle (ADMIN vs MODERATOR)
   - Vérifier le rôle dans les hooks avant les appels API sensibles

4. **UX**
   - Remplacer `window.confirm` par un modal de confirmation réutilisable
   - Feedback visuel pour les actions (optimistic UI complet)
   - Pagination côté liste articles

5. **Tests**
   - Tests unitaires pour `validators`, `slugify`, `getNextArticleStatus`
   - Tests d'intégration pour les formulaires admin
