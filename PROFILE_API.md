# Profile Management API

## 🔐 Authentication

All mutations require admin authentication. First, login to get a JWT token:

### Login

```graphql
mutation Login {
  login(username: "admin", password: "admin123") {
    token
    user {
      id
      username
      role
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "login": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "...",
        "username": "admin",
        "role": "admin"
      }
    }
  }
}
```

**Use the token in HTTP Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📖 Public Queries (No Auth Required)

### Get Profile

```graphql
query GetProfile {
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
}
```

---

## 🔒 Admin Mutations (Auth Required)

### Create Profile

```graphql
mutation CreateProfile {
  createProfile(input: {
    fullName: "John Doe"
    title: "Full Stack Developer"
    bio: "Passionate developer with 5+ years of experience building modern web applications"
    location: "San Francisco, CA"
    email: "john.doe@example.com"
    phone: "+1 (555) 123-4567"
    avatarUrl: "https://example.com/avatar.jpg"
    resumeUrl: "https://example.com/resume.pdf"
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/johndoe" }
      { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" }
      { platform: "Twitter", url: "https://twitter.com/johndoe" }
    ]
  }) {
    id
    fullName
    title
    bio
    socialLinks {
      platform
      url
    }
  }
}
```

### Update Profile

```graphql
mutation UpdateProfile {
  updateProfile(input: {
    bio: "Updated bio with new information"
    location: "New York, NY"
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/johndoe" }
      { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" }
      { platform: "Portfolio", url: "https://johndoe.com" }
    ]
  }) {
    id
    fullName
    title
    bio
    location
    socialLinks {
      platform
      url
    }
    updatedAt
  }
}
```

### Delete Profile

```graphql
mutation DeleteProfile {
  deleteProfile
}
```

---

## 🧪 Testing with cURL

### Login
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { login(username: \"admin\", password: \"admin123\") { token user { username role } } }"}'
```

### Get Profile (Public)
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { profile { fullName title bio } }"}'
```

### Update Profile (Admin)
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"query":"mutation { updateProfile(input: { bio: \"New bio\" }) { id bio updatedAt } }"}'
```

---

## 🎯 Profile Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `fullName` | String | ✅ | Full name |
| `title` | String | ✅ | Professional title |
| `bio` | String | ❌ | Biography/About section |
| `location` | String | ❌ | Current location |
| `email` | String | ❌ | Contact email |
| `phone` | String | ❌ | Contact phone |
| `avatarUrl` | String | ❌ | Profile picture URL |
| `resumeUrl` | String | ❌ | Resume/CV PDF URL |
| `socialLinks` | [SocialLink] | ❌ | Social media links |

### SocialLink Object

```graphql
{
  platform: String!  # e.g., "GitHub", "LinkedIn", "Twitter"
  url: String!       # Full URL to profile
}
```

---

## 🚨 Error Handling

### Unauthenticated Error
```json
{
  "errors": [
    {
      "message": "Authentication required",
      "extensions": {
        "code": "UNAUTHENTICATED"
      }
    }
  ]
}
```

### Forbidden Error
```json
{
  "errors": [
    {
      "message": "Admin access required",
      "extensions": {
        "code": "FORBIDDEN"
      }
    }
  ]
}
```

### Profile Already Exists
```json
{
  "errors": [
    {
      "message": "Profile already exists. Use updateProfile to modify it."
    }
  ]
}
```

### Profile Not Found
```json
{
  "errors": [
    {
      "message": "Profile not found. Please create a profile first."
    }
  ]
}
```
