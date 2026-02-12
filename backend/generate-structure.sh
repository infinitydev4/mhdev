#!/bin/bash

# Script de génération de la structure complète du backend NestJS
# Architecture Clean avec best practices

echo "🏗️  Génération de la structure backend NestJS..."

# Créer la structure de répertoires
mkdir -p src/{config,common/{decorators,filters,guards,interceptors,pipes,interfaces},modules/{auth/{dto,entities,guards,strategies},users/{dto,entities},articles/{dto,entities},categories/{dto,entities},tags/{dto,entities}}}

echo "✅ Structure de répertoires créée"

# Installer les dépendances manquantes
npm install --save helmet compression @nestjs/throttler

echo "✅ Dépendances installées"

echo "
📦 Structure créée :
   src/
   ├── main.ts ✅
   ├── app.module.ts (à créer)
   ├── config/
   ├── common/
   │   ├── decorators/
   │   ├── filters/
   │   ├── guards/
   │   ├── interceptors/
   │   └── pipes/
   └── modules/
       ├── auth/
       ├── users/
       ├── articles/
       ├── categories/
       └── tags/

🚀 Prochaines étapes :
   1. Configurer PostgreSQL
   2. Créer .env depuis .env.example
   3. Lancer 'npm run start:dev'
   4. Accéder à http://localhost:3001/api/docs
"
