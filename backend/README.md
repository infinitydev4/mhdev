# Portfolio Blog Backend - NestJS

Backend professionnel en NestJS pour le module Blog du portfolio Mohamed Oullami.

## 🏗️ Architecture

Clean Architecture avec séparation des responsabilités :

```
src/
├── main.ts                 # Point d'entrée
├── app.module.ts          # Module racine
├── config/                # Configuration
│   ├── database.config.ts
│   ├── jwt.config.ts
│   └── swagger.config.ts
├── common/                # Utilitaires partagés
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   ├── pipes/
│   └── interfaces/
└── modules/               # Modules fonctionnels
    ├── auth/             # Authentification JWT
    │   ├── dto/
    │   ├── entities/
    │   ├── guards/
    │   ├── strategies/
    │   └── auth.service.ts
    ├── users/            # Gestion utilisateurs
    │   ├── dto/
    │   ├── entities/
    │   └── users.service.ts
    ├── articles/         # Articles de blog
    │   ├── dto/
    │   ├── entities/
    │   └── articles.service.ts
    ├── categories/       # Catégories
    │   ├── dto/
    │   ├── entities/
    │   └── categories.service.ts
    └── tags/            # Tags
        ├── dto/
        ├── entities/
        └── tags.service.ts
```

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Copier et configurer les variables d'environnement
cp .env.example .env

# Créer la base de données PostgreSQL
createdb portfolio_blog

# Lancer les migrations
npm run migration:run

# Démarrer en mode développement
npm run start:dev
```

## 📦 Technologies

- **NestJS 10** - Framework Node.js progressif
- **TypeORM** - ORM pour PostgreSQL
- **PostgreSQL** - Base de données relationnelle
- **JWT** - Authentification stateless
- **Passport** - Stratégies d'authentification
- **Swagger** - Documentation API
- **Class Validator** - Validation des DTOs
- **Bcrypt** - Hachage des mots de passe

## 🔐 Sécurité

- ✅ Helmet pour headers HTTP sécurisés
- ✅ CORS configuré
- ✅ Rate limiting
- ✅ Validation stricte des entrées
- ✅ Hachage bcrypt (12 rounds)
- ✅ JWT avec refresh tokens
- ✅ Guards pour les rôles (Admin/User)

## 📚 API Endpoints

### Auth
- `POST /api/v1/auth/register` - Inscription
- `POST /api/v1/auth/login` - Connexion
- `POST /api/v1/auth/refresh` - Refresh token
- `GET /api/v1/auth/profile` - Profil utilisateur

### Articles
- `GET /api/v1/articles` - Liste des articles (publics)
- `GET /api/v1/articles/:slug` - Détail d'un article
- `POST /api/v1/articles` - Créer un article (Auth)
- `PUT /api/v1/articles/:id` - Modifier un article (Auth)
- `DELETE /api/v1/articles/:id` - Supprimer un article (Auth)
- `PATCH /api/v1/articles/:id/publish` - Publier un article (Auth)

### Categories
- `GET /api/v1/categories` - Liste des catégories
- `POST /api/v1/categories` - Créer une catégorie (Auth)
- `PUT /api/v1/categories/:id` - Modifier une catégorie (Auth)
- `DELETE /api/v1/categories/:id` - Supprimer une catégorie (Auth)

### Tags
- `GET /api/v1/tags` - Liste des tags
- `POST /api/v1/tags` - Créer un tag (Auth)
- `DELETE /api/v1/tags/:id` - Supprimer un tag (Auth)

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Couverture
npm run test:cov
```

## 📖 Documentation

La documentation Swagger est disponible sur : `http://localhost:3001/api/docs`

## 🌍 Déploiement

### Docker

```bash
docker build -t portfolio-blog-backend .
docker run -p 3001:3001 portfolio-blog-backend
```

### Variables d'environnement production

Assurez-vous de configurer :
- `JWT_SECRET` - Clé secrète forte
- `JWT_REFRESH_SECRET` - Clé refresh forte
- `DB_*` - Credentials PostgreSQL
- `CORS_ORIGIN` - Domaine frontend autorisé

## 👨‍💻 Auteur

**Mohamed Oullami**
- Portfolio: https://mhdev.xyz
- GitHub: https://github.com/homdev
