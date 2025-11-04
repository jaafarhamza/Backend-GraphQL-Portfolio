# 💼 Experience Management API

## 📋 Table of Contents
- [Overview](#overview)
- [Public Queries](#public-queries)
- [Admin Mutations](#admin-mutations)
- [Complete Examples](#complete-examples)

---

## 🎯 Overview

The Experience API allows you to manage your professional work experience including:
- **Position** - Job title/role
- **Company** - Company name and URL
- **Period** - Start date, end date, current position
- **Description** - Job description and responsibilities
- **Achievements** - Key accomplishments
- **Skills** - Technologies and skills used

---

## 📖 Public Queries (No Auth Required)

### **Get All Experiences**

```graphql
query GetAllExperiences {
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
```

**Response:**
```json
{
  "data": {
    "experiences": [
      {
        "id": "673abc123...",
        "position": "Senior Full Stack Developer",
        "company": "Tech Company Inc.",
        "companyUrl": "https://techcompany.example.com",
        "location": "Remote",
        "employmentType": "full_time",
        "startDate": "2022-01-01T00:00:00.000Z",
        "endDate": null,
        "current": true,
        "description": "Leading development of scalable web applications",
        "responsibilities": [
          "Architecting and implementing microservices",
          "Mentoring junior developers",
          "Code review and quality assurance"
        ],
        "achievements": [
          "Reduced API response time by 40%",
          "Implemented CI/CD pipeline"
        ],
        "skills": [
          { "id": "...", "name": "TypeScript", "category": "language" },
          { "id": "...", "name": "Node.js", "category": "framework" }
        ]
      }
    ]
  }
}
```

---

### **Get Experience by ID**

```graphql
query GetExperience {
  experience(id: "EXPERIENCE_ID_HERE") {
    id
    position
    company
    description
    responsibilities
    achievements
    skills {
      name
    }
  }
}
```

---

### **Get Current Experiences**

Get all positions where `current: true`:

```graphql
query GetCurrentExperiences {
  currentExperiences {
    id
    position
    company
    location
    startDate
    current
  }
}
```

---

## 🔐 Admin Mutations (Auth Required)

### **Create Experience**

```graphql
mutation CreateExperience {
  createExperience(input: {
    position: "Senior Full Stack Developer"
    company: "Tech Company Inc."
    companyUrl: "https://techcompany.com"
    location: "Remote"
    employmentType: full_time
    startDate: "2022-01-01"
    current: true
    description: "Leading development of scalable web applications using modern technologies and best practices"
    responsibilities: [
      "Architecting and implementing microservices"
      "Mentoring junior developers"
      "Code review and quality assurance"
      "Leading sprint planning and retrospectives"
    ]
    achievements: [
      "Reduced API response time by 40%"
      "Implemented CI/CD pipeline reducing deployment time by 60%"
      "Led migration to TypeScript improving code quality"
    ]
    skillIds: ["SKILL_ID_1", "SKILL_ID_2", "SKILL_ID_3"]
  }) {
    id
    position
    company
    startDate
    current
    skills {
      name
    }
  }
}
```

---

### **Update Experience**

```graphql
mutation UpdateExperience {
  updateExperience(
    id: "EXPERIENCE_ID_HERE"
    input: {
      current: false
      endDate: "2024-12-31"
      achievements: [
        "Reduced API response time by 40%"
        "Implemented CI/CD pipeline"
        "Led migration to TypeScript"
        "Mentored 5 junior developers"
      ]
    }
  ) {
    id
    position
    company
    endDate
    current
    achievements
    updatedAt
  }
}
```

---

### **Delete Experience**

```graphql
mutation DeleteExperience {
  deleteExperience(id: "EXPERIENCE_ID_HERE")
}
```

---

## 📊 Employment Types

Available employment types:

- **`full_time`** - Full-time position
- **`part_time`** - Part-time position
- **`contract`** - Contract/temporary position
- **`freelance`** - Freelance work
- **`internship`** - Internship

---

## 🎯 Complete Examples

### **Example 1: Create Complete Work Experience**

**Step 1: Login**
```graphql
mutation {
  login(username: "admin", password: "admin123") {
    token
  }
}
```

**Step 2: Get Skills (to reference in experience)**
```graphql
query {
  skills {
    id
    name
  }
}
```

**Step 3: Create Experience**
```graphql
mutation {
  createExperience(input: {
    position: "Full Stack Developer"
    company: "Startup XYZ"
    companyUrl: "https://startupxyz.com"
    location: "San Francisco, CA"
    employmentType: full_time
    startDate: "2020-06-01"
    endDate: "2021-12-31"
    current: false
    description: "Developed and maintained full-stack applications for e-commerce platform serving 100K+ users"
    responsibilities: [
      "Built RESTful APIs with Node.js and Express"
      "Developed responsive UIs with React and TypeScript"
      "Database design and optimization with MongoDB"
      "Implemented authentication and authorization"
    ]
    achievements: [
      "Increased conversion rate by 25% through UX improvements"
      "Implemented real-time notifications using WebSockets"
      "Reduced page load time by 50%"
    ]
    skillIds: ["TYPESCRIPT_ID", "REACT_ID", "NODEJS_ID", "MONGODB_ID"]
  }) {
    id
    position
    company
    skills {
      name
      category
    }
  }
}
```

---

### **Example 2: Update to Current Position**

```graphql
mutation {
  updateExperience(
    id: "EXPERIENCE_ID"
    input: {
      current: true
      endDate: null
    }
  ) {
    id
    current
    endDate
  }
}
```

---

### **Example 3: Complete Portfolio Query with Experiences**

```graphql
query GetCompletePortfolio {
  profile {
    fullName
    title
    bio
    email
  }
  
  skills {
    name
    category
    level
  }
  
  currentExperiences {
    position
    company
    location
    startDate
    skills {
      name
    }
  }
  
  experiences {
    position
    company
    startDate
    endDate
    current
    description
    achievements
  }
  
  featuredProjects {
    title
    slug
    description
    skills {
      name
    }
  }
}
```

---

## 🧪 Testing with ApiDog/Postman

### **Get All Experiences (JSON)**

**POST** `http://localhost:4000/graphql`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "query": "query { experiences { id position company location employmentType startDate endDate current description responsibilities achievements skills { name category } } }"
}
```

---

### **Create Experience (JSON)**

**POST** `http://localhost:4000/graphql`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```

**Body:**
```json
{
  "query": "mutation CreateExperience($input: CreateExperienceInput!) { createExperience(input: $input) { id position company startDate current skills { name } } }",
  "variables": {
    "input": {
      "position": "Backend Developer",
      "company": "Tech Startup",
      "location": "New York, NY",
      "employmentType": "full_time",
      "startDate": "2023-01-15",
      "current": true,
      "description": "Building scalable backend services",
      "responsibilities": [
        "API development",
        "Database optimization",
        "System architecture"
      ],
      "achievements": [
        "Improved performance by 50%",
        "Reduced costs by 30%"
      ],
      "skillIds": ["SKILL_ID_1", "SKILL_ID_2"]
    }
  }
}
```

---

## 📝 Field Descriptions

### **Experience Fields**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `position` | String | ✅ | Job title/role |
| `company` | String | ✅ | Company name |
| `companyUrl` | String | ❌ | Company website URL |
| `location` | String | ❌ | Work location (city, state, country, or "Remote") |
| `employmentType` | EmploymentType | ✅ | Type of employment |
| `startDate` | String | ✅ | Start date (ISO 8601 format) |
| `endDate` | String | ❌ | End date (null if current) |
| `current` | Boolean | ❌ | Currently working here (default: false) |
| `description` | String | ✅ | Job description |
| `responsibilities` | [String] | ❌ | List of responsibilities |
| `achievements` | [String] | ❌ | List of achievements |
| `skillIds` | [ID] | ❌ | Array of skill IDs used in this role |

---

## 💡 Best Practices

### **1. Date Formatting**
Use ISO 8601 format for dates:
```
"2022-01-15"  ✅
"01/15/2022"  ❌
```

### **2. Current Position**
For current positions:
```graphql
{
  current: true
  endDate: null  # or omit endDate
}
```

### **3. Responsibilities vs Achievements**
- **Responsibilities**: Day-to-day tasks and duties
- **Achievements**: Measurable results and accomplishments

### **4. Skills Reference**
Always reference existing skill IDs:
```graphql
# First, get skills
query { skills { id name } }

# Then use IDs in experience
skillIds: ["673abc...", "673def..."]
```

---

## 🎓 Summary

**Experience Management:**
- ✅ Public queries: `experiences`, `experience`, `currentExperiences`
- ✅ Admin mutations: `createExperience`, `updateExperience`, `deleteExperience`
- ✅ 5 employment types: full_time, part_time, contract, freelance, internship
- ✅ Skills relationship: Experiences reference skills by ID
- ✅ Current position tracking with `current` flag

**Seeded Data:**
- ✅ 2 sample experiences (current and past positions)
- ✅ Linked to sample skills

**Key Features:**
- Timeline tracking (startDate, endDate, current)
- Detailed responsibilities and achievements
- Skills used in each role
- Company information and location
- Employment type classification

Ready to manage your professional experience! 🚀
