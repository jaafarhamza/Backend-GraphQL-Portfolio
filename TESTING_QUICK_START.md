# Testing Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Run Tests
```bash
npm test
```

### 3️⃣ View Results
Tests will run in watch mode. Press `q` to quit.

---

## 📋 Quick Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:ui` | Open test UI in browser |
| `npm run test:coverage` | Generate coverage report |

---

## 📊 What's Tested

✅ **35+ Unit Tests** covering:

### Queries (Public - No Auth)
- ✅ `profile` - Get profile data
- ✅ `getPortfolio` - Get all portfolio data
- ✅ `projects` - Get all projects
- ✅ `project(id)` - Get project by ID
- ✅ `projectBySlug(slug)` - Get project by slug
- ✅ `featuredProjects` - Get featured projects

### Mutations (Protected - Admin Only)
- ✅ `login` - Authenticate user
- ✅ `createProfile` - Create profile (admin)
- ✅ `updateProfile` - Update profile (admin)
- ✅ `deleteProfile` - Delete profile (admin)

### Middleware
- ✅ `requireAuth()` - Authentication check
- ✅ `requireAdmin()` - Admin role check

---

## 🎯 Test Examples

### Example 1: Query Test
```typescript
it('should return profile when it exists', async () => {
  const context = createMockContext();
  vi.mocked(context.profileService.getProfile).mockResolvedValue(mockProfile);
  
  const result = await profileQueries.profile({}, {}, context);
  
  expect(result).toEqual(mockProfile);
});
```

### Example 2: Mutation Test with Auth
```typescript
it('should create profile when user is admin', async () => {
  const context = createMockAdminContext();
  vi.mocked(context.profileService.createProfile).mockResolvedValue(mockProfile);
  
  const result = await profileMutations.createProfile({}, { input }, context);
  
  expect(result).toEqual(mockProfile);
});
```

### Example 3: Error Test
```typescript
it('should throw error when not authenticated', async () => {
  const context = createMockContext(); // No user
  
  await expect(
    profileMutations.createProfile({}, { input }, context)
  ).rejects.toThrow('Authentication required');
});
```

---

## 📁 Test Files Location

```
src/__tests__/
├── utils/
│   ├── mockContext.ts      # Context helpers
│   └── mockData.ts          # Test data
├── resolvers/
│   ├── queries/
│   │   ├── profileQueries.test.ts
│   │   ├── portfolioQueries.test.ts
│   │   └── projectQueries.test.ts
│   └── mutations/
│       ├── authMutations.test.ts
│       └── profileMutations.test.ts
└── middleware/
    └── authMiddleware.test.ts
```

---

## 🔧 Troubleshooting

### Tests not running?
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Want to run specific test?
```bash
npm test profileQueries.test.ts
```

### Need to debug?
```bash
npm run test:ui
# Opens http://localhost:51204/__vitest__/
```

---

## ✅ Expected Output

When you run `npm test`, you should see:

```
✓ src/__tests__/resolvers/queries/profileQueries.test.ts (3)
✓ src/__tests__/resolvers/queries/portfolioQueries.test.ts (4)
✓ src/__tests__/resolvers/queries/projectQueries.test.ts (8)
✓ src/__tests__/resolvers/mutations/authMutations.test.ts (4)
✓ src/__tests__/resolvers/mutations/profileMutations.test.ts (9)
✓ src/__tests__/middleware/authMiddleware.test.ts (8)

Test Files  6 passed (6)
     Tests  35+ passed (35+)
```

---

## 🎉 You're All Set!

Your resolvers are fully tested with best practices:
- ✅ Fast tests with Vitest
- ✅ Comprehensive coverage
- ✅ Easy to maintain
- ✅ CI/CD ready

For more details, see [TESTING.md](./TESTING.md)
