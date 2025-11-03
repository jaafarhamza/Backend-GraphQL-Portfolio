# 🚀 Project & Skills Management API

## 📋 Table of Contents
- [Skills API](#skills-api)
- [Projects API](#projects-api)
- [Complete Examples](#complete-examples)

---

## 🎯 Skills API

### **Public Queries (No Auth Required)**

#### Get All Skills
```graphql
query GetAllSkills {
  skills {
    id
    name
    category
    level
    icon
    createdAt
    updatedAt
  }
}
```

#### Get Skill by ID
```graphql
query GetSkill {
  skill(id: "SKILL_ID_HERE") {
    id
    name
    category
    level
  }
}
```

#### Get Skills by Category
```graphql
query GetSkillsByCategory {
  skillsByCategory(category: language) {
    id
    name
    level
  }
}
```

**Available Categories:**
- `language` - Programming languages (TypeScript, JavaScript, Python)
- `framework` - Frameworks (Node.js, Express, NestJS)
- `library` - Libraries (React, Vue, Angular)
- `tool` - Tools (Docker, Git, VS Code)
- `database` - Databases (MongoDB, PostgreSQL, Redis)
- `other` - Other skills

---

### **Admin Mutations (Auth Required)**

#### Create Skill
```graphql
mutation CreateSkill {
  createSkill(input: {
    name: "TypeScript"
    category: language
    level: 5
    icon: "typescript-icon.svg"
  }) {
    id
    name
    category
    level
  }
}
```

#### Update Skill
```graphql
mutation UpdateSkill {
  updateSkill(
    id: "SKILL_ID_HERE"
    input: {
      level: 5
      icon: "new-icon.svg"
    }
  ) {
    id
    name
    level
    updatedAt
  }
}
```

#### Delete Skill
```graphql
mutation DeleteSkill {
  deleteSkill(id: "SKILL_ID_HERE")
}
```

---

## 📦 Projects API

### **Public Queries (No Auth Required)**

#### Get All Projects
```graphql
query GetAllProjects {
  projects {
    id
    title
    slug
    description
    skills {
      id
      name
      category
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
}
```

#### Get Project by ID
```graphql
query GetProject {
  project(id: "PROJECT_ID_HERE") {
    id
    title
    description
    skills {
      name
      category
      level
    }
    repoUrl
    liveUrl
  }
}
```

#### Get Project by Slug
```graphql
query GetProjectBySlug {
  projectBySlug(slug: "portfolio-backend-api") {
    id
    title
    description
    skills {
      name
    }
  }
}
```

#### Get Featured Projects
```graphql
query GetFeaturedProjects {
  featuredProjects {
    id
    title
    slug
    description
    skills {
      name
    }
    liveUrl
    imageUrls
  }
}
```

---

### **Admin Mutations (Auth Required)**

#### Create Project
```graphql
mutation CreateProject {
  createProject(input: {
    title: "E-commerce Platform"
    slug: "ecommerce-platform"
    description: "Full-stack e-commerce application with payment integration and admin dashboard"
    skillIds: ["SKILL_ID_1", "SKILL_ID_2", "SKILL_ID_3"]
    repoUrl: "https://github.com/username/ecommerce"
    liveUrl: "https://demo-ecommerce.com"
    imageUrls: [
      "https://example.com/screenshot1.png"
      "https://example.com/screenshot2.png"
    ]
    startDate: "2024-01-01"
    endDate: "2024-06-30"
    featured: true
    status: published
  }) {
    id
    title
    slug
    skills {
      name
    }
  }
}
```

#### Update Project
```graphql
mutation UpdateProject {
  updateProject(
    id: "PROJECT_ID_HERE"
    input: {
      description: "Updated description"
      featured: true
      status: published
      imageUrls: ["https://example.com/new-screenshot.png"]
    }
  ) {
    id
    title
    description
    featured
    updatedAt
  }
}
```

#### Delete Project
```graphql
mutation DeleteProject {
  deleteProject(id: "PROJECT_ID_HERE")
}
```

---

## 🎯 Project Status Enum

- `draft` - Work in progress, not visible to public
- `published` - Live and visible
- `archived` - Completed but archived

---

## 📝 Complete Examples

### **Example 1: Create Complete Project Workflow**

**Step 1: Login**
```graphql
mutation {
  login(username: "admin", password: "admin123") {
    token
  }
}
```

**Step 2: Create Skills**
```graphql
mutation {
  skill1: createSkill(input: {
    name: "React"
    category: library
    level: 5
  }) { id name }
  
  skill2: createSkill(input: {
    name: "Node.js"
    category: framework
    level: 5
  }) { id name }
  
  skill3: createSkill(input: {
    name: "MongoDB"
    category: database
    level: 4
  }) { id name }
}
```

**Step 3: Create Project with Skills**
```graphql
mutation {
  createProject(input: {
    title: "Task Management App"
    slug: "task-management-app"
    description: "Real-time task management with team collaboration"
    skillIds: ["SKILL_ID_1", "SKILL_ID_2", "SKILL_ID_3"]
    repoUrl: "https://github.com/username/task-app"
    liveUrl: "https://tasks.example.com"
    featured: true
    status: published
  }) {
    id
    title
    skills {
      name
      category
    }
  }
}
```

---

### **Example 2: Get Portfolio Data (Public)**

```graphql
query GetPortfolio {
  profile {
    fullName
    title
    bio
    email
    socialLinks {
      platform
      url
    }
  }
  
  skills {
    name
    category
    level
  }
  
  featuredProjects {
    title
    slug
    description
    skills {
      name
    }
    liveUrl
    imageUrls
  }
}
```

---

### **Example 3: Update Project Skills**

```graphql
mutation {
  # First, get current project
  project(id: "PROJECT_ID") {
    skillIds
  }
  
  # Then update with new skills
  updateProject(
    id: "PROJECT_ID"
    input: {
      skillIds: ["NEW_SKILL_1", "NEW_SKILL_2", "NEW_SKILL_3"]
    }
  ) {
    id
    skills {
      name
    }
  }
}
```

---

## 🧪 Testing with ApiDog/Postman

### **Create Skill (JSON)**
```json
{
  "query": "mutation CreateSkill($input: CreateSkillInput!) { createSkill(input: $input) { id name category level } }",
  "variables": {
    "input": {
      "name": "Docker",
      "category": "tool",
      "level": 4
    }
  }
}
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### **Create Project (JSON)**
```json
{
  "query": "mutation CreateProject($input: CreateProjectInput!) { createProject(input: $input) { id title slug skills { name } } }",
  "variables": {
    "input": {
      "title": "Portfolio Website",
      "slug": "portfolio-website",
      "description": "Personal portfolio with blog and projects showcase",
      "skillIds": ["SKILL_ID_1", "SKILL_ID_2"],
      "repoUrl": "https://github.com/username/portfolio",
      "liveUrl": "https://myportfolio.com",
      "featured": true,
      "status": "published"
    }
  }
}
```

---

### **Get All Projects (JSON)**
```json
{
  "query": "query { projects { id title slug description skills { name category } repoUrl liveUrl featured } }"
}
```

---

## 📊 Field Descriptions

### **Skill Fields**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | ✅ | Skill name (unique) |
| `category` | SkillCategory | ✅ | Category enum |
| `level` | Int | ❌ | Proficiency (1-5) |
| `icon` | String | ❌ | Icon URL or name |

### **Project Fields**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | ✅ | Project title |
| `slug` | String | ✅ | URL-friendly identifier (unique) |
| `description` | String | ✅ | Project description |
| `skillIds` | [ID] | ❌ | Array of skill IDs |
| `repoUrl` | String | ❌ | GitHub/GitLab repository URL |
| `liveUrl` | String | ❌ | Live demo URL |
| `imageUrls` | [String] | ❌ | Screenshot URLs |
| `startDate` | String | ❌ | Project start date (ISO 8601) |
| `endDate` | String | ❌ | Project end date (ISO 8601) |
| `featured` | Boolean | ❌ | Show on homepage (default: false) |
| `status` | ProjectStatus | ❌ | draft/published/archived (default: draft) |

---

## 🎓 Summary

**Skills Management:**
- ✅ Public queries: `skills`, `skill`, `skillsByCategory`
- ✅ Admin mutations: `createSkill`, `updateSkill`, `deleteSkill`
- ✅ 6 categories: language, framework, library, tool, database, other

**Projects Management:**
- ✅ Public queries: `projects`, `project`, `projectBySlug`, `featuredProjects`
- ✅ Admin mutations: `createProject`, `updateProject`, `deleteProject`
- ✅ Skills relationship: Projects reference skills by ID
- ✅ 3 statuses: draft, published, archived

**Seeded Data:**
- ✅ 7 sample skills (TypeScript, JavaScript, Node.js, React, GraphQL, MongoDB, Docker)
- ✅ 2 sample projects (Portfolio Backend API, E-commerce Platform)

Ready to manage your projects! 🚀
