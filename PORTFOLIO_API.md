# Portfolio API - getPortfolio Query

## 📖 Description

La query `getPortfolio` permet de récupérer **toutes les données du portfolio en un seul appel API**. C'est idéal pour les visiteurs qui veulent consulter l'ensemble du contenu du portfolio.

---

## 🔓 Accès Public

Cette query est **publique** et ne nécessite **aucune authentification**.

---

## 📊 Structure de la Réponse

```graphql
type Portfolio {
  profile: Profile
  projects: [Project!]!
  skills: [Skill!]!
  experiences: [Experience!]!
}
```

---

## 🧪 Exemples de Requêtes

### Exemple 1 : Récupérer Tout le Portfolio (Complet)

```graphql
query GetCompletePortfolio {
  getPortfolio {
    profile {
      id
      fullName
      title
      bio
      location
      email
      phone
      avatarUrl
      resumeUrl
      socialLinks {
        platform
        url
      }
      createdAt
      updatedAt
    }
    projects {
      id
      title
      slug
      description
      skills {
        id
        name
        category
        level
      }
      repoUrl
      liveUrl
      imageUrls
      startDate
      endDate
      featured
      status
      createdAt
      updatedAt
    }
    skills {
      id
      name
      category
      level
      icon
      createdAt
      updatedAt
    }
    experiences {
      id
      position
      company
      companyUrl
      location
      employmentType
      startDate
      endDate
      current
      description
      responsibilities
      achievements
      skills {
        id
        name
        category
      }
      createdAt
      updatedAt
    }
  }
}
```

---

### Exemple 2 : Récupérer les Données Essentielles

```graphql
query GetEssentialPortfolio {
  getPortfolio {
    profile {
      fullName
      title
      bio
      socialLinks {
        platform
        url
      }
    }
    projects {
      title
      description
      featured
      liveUrl
      skills {
        name
      }
    }
    skills {
      name
      category
      level
    }
    experiences {
      position
      company
      current
      startDate
      endDate
    }
  }
}
```

---

### Exemple 3 : Portfolio pour Page d'Accueil

```graphql
query GetHomePagePortfolio {
  getPortfolio {
    profile {
      fullName
      title
      bio
      avatarUrl
      socialLinks {
        platform
        url
      }
    }
    projects {
      id
      title
      slug
      description
      featured
      imageUrls
      skills {
        name
        category
      }
    }
    skills {
      name
      category
      level
      icon
    }
    experiences {
      position
      company
      current
      startDate
    }
  }
}
```

---

### Exemple 4 : Portfolio Minimaliste

```graphql
query GetMinimalPortfolio {
  getPortfolio {
    profile {
      fullName
      title
    }
    projects {
      title
      featured
    }
    skills {
      name
      category
    }
    experiences {
      position
      company
      current
    }
  }
}
```

---

## 📋 Réponse Exemple

```json
{
  "data": {
    "getPortfolio": {
      "profile": {
        "id": "673456789abc",
        "fullName": "Your Name",
        "title": "Full Stack Developer",
        "bio": "Passionate developer building modern web applications",
        "location": "Remote",
        "email": "contact@example.com",
        "socialLinks": [
          {
            "platform": "GitHub",
            "url": "https://github.com/yourusername"
          },
          {
            "platform": "LinkedIn",
            "url": "https://linkedin.com/in/yourusername"
          }
        ]
      },
      "projects": [
        {
          "id": "673456789def",
          "title": "Portfolio Backend API",
          "slug": "portfolio-backend-api",
          "description": "GraphQL backend with Clean Architecture",
          "featured": true,
          "status": "published",
          "skills": [
            {
              "name": "TypeScript",
              "category": "language"
            },
            {
              "name": "GraphQL",
              "category": "tool"
            }
          ]
        }
      ],
      "skills": [
        {
          "id": "673456789ghi",
          "name": "TypeScript",
          "category": "language",
          "level": 5
        },
        {
          "id": "673456789jkl",
          "name": "Node.js",
          "category": "framework",
          "level": 5
        }
      ],
      "experiences": [
        {
          "id": "673456789mno",
          "position": "Senior Full Stack Developer",
          "company": "Tech Company Inc.",
          "location": "Remote",
          "employmentType": "full_time",
          "current": true,
          "startDate": "2022-01-01T00:00:00.000Z",
          "description": "Leading development of scalable web applications",
          "responsibilities": [
            "Architecting microservices",
            "Mentoring developers"
          ],
          "achievements": [
            "Reduced API response time by 40%"
          ],
          "skills": [
            {
              "name": "TypeScript",
              "category": "language"
            }
          ]
        }
      ]
    }
  }
}
```

---

## 🔧 Test avec cURL

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { getPortfolio { profile { fullName title } projects { title } skills { name } experiences { position company } } }"
  }'
```

---

## ⚡ Avantages de getPortfolio

1. **Un seul appel API** : Récupère toutes les données en une fois
2. **Performance optimisée** : Utilise `Promise.all()` pour des requêtes parallèles
3. **Flexibilité** : Vous choisissez les champs dont vous avez besoin
4. **Public** : Accessible sans authentification
5. **Idéal pour SSR** : Parfait pour le Server-Side Rendering

---

## 🎯 Cas d'Usage

### Pour un Site Portfolio Frontend

```javascript
// React/Next.js Example
const GET_PORTFOLIO = gql`
  query GetPortfolio {
    getPortfolio {
      profile {
        fullName
        title
        bio
        avatarUrl
        socialLinks {
          platform
          url
        }
      }
      projects {
        id
        title
        description
        featured
        imageUrls
        liveUrl
        skills {
          name
        }
      }
      skills {
        name
        category
        level
      }
      experiences {
        position
        company
        current
        startDate
        endDate
      }
    }
  }
`;

const { data, loading, error } = useQuery(GET_PORTFOLIO);
```

---

## 🚨 Gestion d'Erreurs

### Profil Non Trouvé

Si aucun profil n'existe, `profile` sera `null` :

```json
{
  "data": {
    "getPortfolio": {
      "profile": null,
      "projects": [],
      "skills": [],
      "experiences": []
    }
  }
}
```

### Erreur Serveur

```json
{
  "errors": [
    {
      "message": "Internal server error",
      "path": ["getPortfolio"]
    }
  ]
}
```

---

## 📊 Comparaison avec Queries Individuelles

### Avant (4 appels API)

```graphql
query { profile { ... } }
query { projects { ... } }
query { skills { ... } }
query { experiences { ... } }
```

### Après (1 seul appel)

```graphql
query { getPortfolio { profile { ... } projects { ... } skills { ... } experiences { ... } } }
```

**Résultat** : Réduction de 75% des appels réseau ! 🚀

---

## ✅ Checklist de Test

- [ ] Récupérer le portfolio complet
- [ ] Récupérer uniquement certains champs
- [ ] Vérifier que profile peut être null
- [ ] Vérifier que projects/skills/experiences sont des tableaux
- [ ] Tester avec un portfolio vide
- [ ] Tester avec des données complètes
- [ ] Vérifier les relations (Project → Skills, Experience → Skills)
- [ ] Mesurer le temps de réponse

---

## 🎉 Félicitations !

Vous avez maintenant une query `getPortfolio` complète qui permet aux visiteurs de consulter tout votre portfolio en un seul appel ! 🚀
