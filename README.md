# Backend-GraphQL-Portfolio

Backend GraphQL moderne pour portfolio personnel avec Apollo Server v4, Express, TypeScript et MongoDB.

## 🚀 Stack Technique

- **Backend**: Node.js, Express.js
- **Langage**: TypeScript
- **API**: GraphQL (Apollo Server v4)
- **Base de données**: MongoDB (Mongoose)
- **Authentification**: JWT + bcrypt
- **Qualité du code**: ESLint, Prettier
- **Dev tools**: Nodemon, ts-node

## 📦 Installation

### Prérequis

- Node.js >= 18
- npm ou yarn
- Docker (optionnel, pour MongoDB)

### Étapes

1. **Cloner le projet**
```bash
git clone <repo-url>
cd Backend-GraphQL-Portfolio
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
# Éditer .env avec vos valeurs
```

4. **Démarrer MongoDB avec Docker (optionnel)**
```bash
docker-compose up -d
```

Ou utilisez une instance MongoDB locale/cloud et mettez à jour `MONGODB_URI` dans `.env`.

5. **Lancer le serveur de développement**
```bash
npm run dev
```

Le serveur démarre sur `http://localhost:4000/graphql`

## 🐳 Déploiement Docker (Recommandé)

Pour déployer l'application complète avec Docker (app + MongoDB):

**1. Créer le fichier `.env`:**
```bash
cp .env.example .env
```

**2. Démarrer tous les services:**
```bash
docker-compose up -d
```

Cela démarre:
- **MongoDB** sur `localhost:27017` (accessible via Compass)
- **App Node.js** sur `localhost:4000`

**3. Voir les logs:**
```bash
docker-compose logs -f app
```

**4. Arrêter les services:**
```bash
docker-compose down
```

**5. Rebuild après modifications du code:**
```bash
docker-compose up -d --build
```

### 🔌 Connexion MongoDB Compass (avec Docker)

```
mongodb://hamza:hamzapass123@localhost:27017/portfolio?authSource=admin
```

## 📜 Scripts disponibles

- `npm run dev` - Démarre le serveur en mode développement avec hot-reload
- `npm run build` - Compile le TypeScript vers JavaScript
- `npm start` - Lance le serveur en production
- `npm run typecheck` - Vérifie les types TypeScript
- `npm run lint` - Vérifie le code avec ESLint
- `npm run lint:fix` - Corrige automatiquement les erreurs ESLint
- `npm run format` - Formate le code avec Prettier

## 🏗️ Architecture (Clean Architecture)

```
src/
├── config/           # Configuration (env, constants)
├── domain/           # Entités et interfaces de repositories
│   ├── entities/     # Entités métier (Profile, Project, Skill, Experience)
│   └── repositories/ # Interfaces des repositories
├── application/      # Logique métier
│   ├── services/     # Services (AuthService)
│   └── use-cases/    # Cas d'utilisation
├── infrastructure/   # Implémentations techniques
│   ├── persistence/  # Repositories (MongoDB, Memory)
│   └── security/     # JWT, Password hashing
├── interfaces/       # Couche présentation
│   └── graphql/      # Schema, resolvers, context
├── container/        # Injection de dépendances
└── server.ts         # Point d'entrée
```

## 🔐 Sécurité & RBAC

- **Visiteur**: Accès en lecture seule (Queries publiques)
- **Admin**: Accès complet après authentification JWT (Queries + Mutations)


## 📄 License

MIT