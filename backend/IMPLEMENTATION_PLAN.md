# Plan d'Implémentation Backend NestJS - Blog avec Rôles

## 📋 Vue d'ensemble

Backend complet avec système de blog et gestion des rôles (Admin, Moderator, User).

---

## 🔄 Commit 1: Configuration de base et Database

**Objectif**: Mettre en place la configuration de base et la connexion à la base de données

### Fichiers à créer:
- `src/app.module.ts` - Module racine avec imports
- `src/config/database.config.ts` - Configuration TypeORM
- `src/config/jwt.config.ts` - Configuration JWT
- `src/common/enums/role.enum.ts` - Énumération des rôles
- `src/common/enums/article-status.enum.ts` - Statuts des articles

### Tâches:
- [ ] Configurer TypeORM avec PostgreSQL
- [ ] Créer les enums pour rôles (ADMIN, MODERATOR, USER)
- [ ] Créer les enums pour statuts articles (DRAFT, PUBLISHED, ARCHIVED)
- [ ] Configurer les variables d'environnement
- [ ] Tester la connexion à la base de données

**Commit**: `feat: configure database and base enums`

---

## 🔄 Commit 2: Entities et Relations

**Objectif**: Créer toutes les entités TypeORM avec leurs relations

### Fichiers à créer:
- `src/modules/users/entities/user.entity.ts`
- `src/modules/articles/entities/article.entity.ts`
- `src/modules/categories/entities/category.entity.ts`
- `src/modules/tags/entities/tag.entity.ts`

### Tâches:
- [ ] Entity User (id, email, password, firstName, lastName, role, isActive, createdAt, updatedAt)
- [ ] Entity Article (id, title, slug, content, excerpt, coverImage, status, publishedAt, author, category, tags, views, createdAt, updatedAt)
- [ ] Entity Category (id, name, slug, description, articles)
- [ ] Entity Tag (id, name, slug, articles)
- [ ] Définir les relations ManyToOne, OneToMany, ManyToMany
- [ ] Ajouter les index pour performance (slug, email, status)

**Commit**: `feat: create database entities with relations`

---

## 🔄 Commit 3: DTOs et Validation

**Objectif**: Créer tous les DTOs avec validation stricte

### Fichiers à créer:
- `src/modules/auth/dto/register.dto.ts`
- `src/modules/auth/dto/login.dto.ts`
- `src/modules/users/dto/create-user.dto.ts`
- `src/modules/users/dto/update-user.dto.ts`
- `src/modules/articles/dto/create-article.dto.ts`
- `src/modules/articles/dto/update-article.dto.ts`
- `src/modules/articles/dto/query-article.dto.ts`
- `src/modules/categories/dto/create-category.dto.ts`
- `src/modules/categories/dto/update-category.dto.ts`
- `src/modules/tags/dto/create-tag.dto.ts`

### Tâches:
- [ ] DTOs avec class-validator (IsEmail, IsString, MinLength, MaxLength, etc.)
- [ ] DTOs de pagination (page, limit, sort, order)
- [ ] DTOs de filtrage (search, status, category, tags, author)
- [ ] Swagger decorators (@ApiProperty)
- [ ] Validation des rôles et permissions

**Commit**: `feat: add DTOs with validation and Swagger docs`

---

## 🔄 Commit 4: Module Auth - JWT Strategy

**Objectif**: Implémenter l'authentification complète avec JWT

### Fichiers à créer:
- `src/modules/auth/auth.module.ts`
- `src/modules/auth/auth.service.ts`
- `src/modules/auth/auth.controller.ts`
- `src/modules/auth/strategies/jwt.strategy.ts`
- `src/modules/auth/strategies/jwt-refresh.strategy.ts`
- `src/modules/auth/guards/jwt-auth.guard.ts`
- `src/modules/auth/guards/jwt-refresh.guard.ts`

### Tâches:
- [ ] Service d'authentification (register, login, refresh, logout)
- [ ] Hachage bcrypt des mots de passe
- [ ] Génération de JWT access token (7 jours)
- [ ] Génération de JWT refresh token (30 jours)
- [ ] Stratégie Passport JWT
- [ ] Guards pour protéger les routes
- [ ] Endpoints: POST /auth/register, POST /auth/login, POST /auth/refresh, GET /auth/profile

**Commit**: `feat: implement JWT authentication with refresh tokens`

---

## 🔄 Commit 5: Guards et Decorators pour Rôles

**Objectif**: Système de contrôle d'accès basé sur les rôles (RBAC)

### Fichiers à créer:
- `src/common/guards/roles.guard.ts`
- `src/common/decorators/roles.decorator.ts`
- `src/common/decorators/current-user.decorator.ts`
- `src/common/decorators/public.decorator.ts`
- `src/common/interfaces/request-with-user.interface.ts`

### Tâches:
- [ ] RolesGuard pour vérifier les permissions
- [ ] @Roles decorator pour définir les rôles requis
- [ ] @CurrentUser decorator pour récupérer l'utilisateur
- [ ] @Public decorator pour routes publiques
- [ ] Logique de vérification des rôles (Admin > Moderator > User)
- [ ] Tests unitaires des guards

**Commit**: `feat: add role-based access control (RBAC) system`

---

## 🔄 Commit 6: Module Users

**Objectif**: CRUD complet pour la gestion des utilisateurs

### Fichiers à créer:
- `src/modules/users/users.module.ts`
- `src/modules/users/users.service.ts`
- `src/modules/users/users.controller.ts`

### Tâches:
- [ ] Service Users (findAll, findOne, create, update, delete, changeRole)
- [ ] Controller avec protection par rôles
- [ ] Endpoints:
  - GET /users (Admin/Moderator)
  - GET /users/:id (Admin/Moderator/Owner)
  - POST /users (Admin)
  - PATCH /users/:id (Admin/Owner)
  - DELETE /users/:id (Admin)
  - PATCH /users/:id/role (Admin uniquement)
- [ ] Validation des permissions
- [ ] Pagination et filtres

**Commit**: `feat: implement users module with role management`

---

## 🔄 Commit 7: Module Categories

**Objectif**: Gestion des catégories d'articles

### Fichiers à créer:
- `src/modules/categories/categories.module.ts`
- `src/modules/categories/categories.service.ts`
- `src/modules/categories/categories.controller.ts`

### Tâches:
- [ ] Service Categories (CRUD complet)
- [ ] Génération automatique des slugs
- [ ] Vérification des doublons de slug
- [ ] Endpoints:
  - GET /categories (Public)
  - GET /categories/:slug (Public)
  - POST /categories (Admin/Moderator)
  - PUT /categories/:id (Admin/Moderator)
  - DELETE /categories/:id (Admin)
- [ ] Compteur d'articles par catégorie

**Commit**: `feat: add categories module with slug generation`

---

## 🔄 Commit 8: Module Tags

**Objectif**: Système de tags pour les articles

### Fichiers à créer:
- `src/modules/tags/tags.module.ts`
- `src/modules/tags/tags.service.ts`
- `src/modules/tags/tags.controller.ts`

### Tâches:
- [ ] Service Tags (CRUD)
- [ ] Génération automatique des slugs
- [ ] Endpoints:
  - GET /tags (Public)
  - GET /tags/:slug (Public)
  - POST /tags (Admin/Moderator)
  - DELETE /tags/:id (Admin/Moderator)
- [ ] Compteur d'articles par tag
- [ ] Recherche de tags

**Commit**: `feat: implement tags module for article taxonomy`

---

## 🔄 Commit 9: Module Articles - CRUD

**Objectif**: Gestion complète des articles de blog

### Fichiers à créer:
- `src/modules/articles/articles.module.ts`
- `src/modules/articles/articles.service.ts`
- `src/modules/articles/articles.controller.ts`

### Tâches:
- [ ] Service Articles avec toute la logique métier
- [ ] Génération automatique des slugs uniques
- [ ] Gestion des statuts (DRAFT, PUBLISHED, ARCHIVED)
- [ ] Endpoints:
  - GET /articles (Public - seulement PUBLISHED)
  - GET /articles/:slug (Public - seulement PUBLISHED)
  - GET /articles/drafts (Author/Moderator/Admin)
  - POST /articles (Authenticated)
  - PUT /articles/:id (Author/Moderator/Admin)
  - DELETE /articles/:id (Author/Moderator/Admin)
  - PATCH /articles/:id/publish (Author/Moderator/Admin)
  - PATCH /articles/:id/archive (Moderator/Admin)
- [ ] Validation des permissions (auteur ou admin/moderator)
- [ ] Association avec catégories et tags

**Commit**: `feat: implement articles module with status management`

---

## 🔄 Commit 10: Recherche et Filtres Avancés

**Objectif**: Système de recherche et filtrage performant

### Fichiers à créer:
- `src/modules/articles/articles.repository.ts`
- `src/common/dto/pagination.dto.ts`
- `src/common/interfaces/paginated-result.interface.ts`

### Tâches:
- [ ] Repository pattern pour requêtes complexes
- [ ] Recherche full-text (titre, contenu, excerpt)
- [ ] Filtres multiples (catégorie, tags, auteur, statut, date)
- [ ] Tri (date, vues, titre)
- [ ] Pagination avec métadonnées (total, pages, hasNext, hasPrev)
- [ ] Optimisation des requêtes (eager loading)
- [ ] Index de recherche

**Commit**: `feat: add advanced search and filtering for articles`

---

## 🔄 Commit 11: Interceptors et Filters

**Objectif**: Gestion globale des erreurs et transformation des réponses

### Fichiers à créer:
- `src/common/interceptors/transform.interceptor.ts`
- `src/common/interceptors/logging.interceptor.ts`
- `src/common/filters/http-exception.filter.ts`
- `src/common/filters/all-exceptions.filter.ts`

### Tâches:
- [ ] TransformInterceptor pour format de réponse uniforme
- [ ] LoggingInterceptor pour logs des requêtes
- [ ] HttpExceptionFilter pour erreurs HTTP
- [ ] AllExceptionsFilter pour erreurs non gérées
- [ ] Format de réponse standardisé:
  ```json
  {
    "success": true,
    "data": {...},
    "message": "Success",
    "timestamp": "2026-02-12T..."
  }
  ```

**Commit**: `feat: add interceptors and exception filters`

---

## 🔄 Commit 12: Sécurité et Rate Limiting

**Objectif**: Renforcer la sécurité de l'API

### Fichiers à créer:
- `src/common/guards/throttle.guard.ts`
- `src/config/throttle.config.ts`

### Tâches:
- [ ] Rate limiting avec @nestjs/throttler
- [ ] Configuration par endpoint (login: 5/min, register: 3/min)
- [ ] Protection contre brute force
- [ ] Validation stricte des entrées
- [ ] Sanitization des données
- [ ] Headers de sécurité (Helmet)

**Commit**: `feat: add rate limiting and security enhancements`

---

## 🔄 Commit 13: Migrations et Seeds

**Objectif**: Scripts de migration et données de test

### Fichiers à créer:
- `src/database/migrations/` (générées par TypeORM)
- `src/database/seeds/user.seed.ts`
- `src/database/seeds/category.seed.ts`
- `src/database/seeds/article.seed.ts`

### Tâches:
- [ ] Migration initiale des tables
- [ ] Seed admin par défaut (admin@mhdev.xyz)
- [ ] Seed catégories de base (Tech, DevOps, Architecture, etc.)
- [ ] Seed articles de démonstration
- [ ] Script npm pour seeding

**Commit**: `feat: add database migrations and seed data`

---

## 🔄 Commit 14: Tests Unitaires

**Objectif**: Couverture de tests pour les services critiques

### Fichiers à créer:
- `src/modules/auth/auth.service.spec.ts`
- `src/modules/users/users.service.spec.ts`
- `src/modules/articles/articles.service.spec.ts`
- `src/common/guards/roles.guard.spec.ts`

### Tâches:
- [ ] Tests du service Auth (register, login, JWT)
- [ ] Tests du service Users (CRUD, rôles)
- [ ] Tests du service Articles (CRUD, permissions)
- [ ] Tests des Guards (JWT, Roles)
- [ ] Mocking des repositories
- [ ] Couverture > 80%

**Commit**: `test: add unit tests for core services and guards`

---

## 🔄 Commit 15: Documentation Swagger Complète

**Objectif**: Documentation API professionnelle et interactive

### Tâches:
- [ ] Annotations Swagger sur tous les endpoints
- [ ] Exemples de requêtes/réponses
- [ ] Documentation des erreurs possibles
- [ ] Schémas de sécurité (Bearer token)
- [ ] Tags et groupes logiques
- [ ] Descriptions détaillées
- [ ] Export OpenAPI 3.0

**Commit**: `docs: complete Swagger API documentation`

---

## 🔄 Commit 16: Docker et CI/CD

**Objectif**: Containerisation et déploiement automatisé

### Fichiers à créer:
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- `.github/workflows/ci.yml` (si GitHub)

### Tâches:
- [ ] Dockerfile multi-stage optimisé
- [ ] Docker Compose (app + PostgreSQL)
- [ ] Variables d'environnement Docker
- [ ] Health checks
- [ ] CI/CD pipeline (tests, build, deploy)
- [ ] Scripts de déploiement

**Commit**: `feat: add Docker support and CI/CD pipeline`

---

## 📊 Résumé des Fonctionnalités

### Rôles et Permissions

| Action | USER | MODERATOR | ADMIN |
|--------|------|-----------|-------|
| Lire articles publics | ✅ | ✅ | ✅ |
| Créer article | ✅ | ✅ | ✅ |
| Modifier son article | ✅ | ✅ | ✅ |
| Modifier article autre | ❌ | ✅ | ✅ |
| Supprimer son article | ✅ | ✅ | ✅ |
| Supprimer article autre | ❌ | ✅ | ✅ |
| Publier article | ✅ (son) | ✅ | ✅ |
| Archiver article | ❌ | ✅ | ✅ |
| Gérer catégories | ❌ | ✅ | ✅ |
| Gérer tags | ❌ | ✅ | ✅ |
| Gérer utilisateurs | ❌ | ❌ | ✅ |
| Changer rôles | ❌ | ❌ | ✅ |

### Stack Technique

- **Framework**: NestJS 10
- **Database**: PostgreSQL + TypeORM
- **Auth**: JWT + Passport
- **Validation**: class-validator + class-transformer
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate Limiting, Bcrypt
- **Architecture**: Clean Architecture + SOLID
- **Tests**: Jest (unitaires + e2e)
- **Deployment**: Docker + Docker Compose

---

## 🚀 Ordre d'Exécution Recommandé

1. Commits 1-2: Base et Database
2. Commit 3: DTOs
3. Commits 4-5: Auth et RBAC
4. Commits 6-9: Modules fonctionnels
5. Commit 10: Recherche
6. Commits 11-12: Sécurité
7. Commits 13-14: Data et Tests
8. Commits 15-16: Documentation et Deploy

**Durée estimée**: 3-5 jours pour un développeur expérimenté

---

## 📝 Notes Importantes

- Toujours tester après chaque commit
- Respecter les conventions de nommage
- Documenter le code complexe
- Suivre les principes SOLID
- Valider les permissions à chaque endpoint
- Gérer les erreurs proprement
- Logger les actions critiques
