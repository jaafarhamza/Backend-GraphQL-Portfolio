# Testing Documentation

## 🧪 Testing Setup

This project uses **Vitest** as the testing framework - a blazing fast unit test framework powered by Vite.

### Why Vitest?

- ⚡ **Extremely Fast**: Powered by Vite, with instant hot module replacement
- 🔧 **TypeScript First**: Native TypeScript support without configuration
- 🎯 **Jest Compatible**: Familiar API if you've used Jest
- 📊 **Built-in Coverage**: Integrated code coverage with v8
- 🎨 **Beautiful UI**: Optional web-based UI for test visualization

---

## 📦 Installation

Install the testing dependencies:

```bash
npm install
```

This will install:
- `vitest` - Test framework
- `@vitest/ui` - Web UI for tests
- `@vitest/coverage-v8` - Code coverage tool

---

## 🚀 Running Tests

### Run Tests in Watch Mode (Development)
```bash
npm test
```

### Run Tests Once (CI/Production)
```bash
npm run test:run
```

### Run Tests with UI
```bash
npm run test:ui
```
Then open http://localhost:51204/__vitest__/

### Run Tests with Coverage
```bash
npm run test:coverage
```

---

## 📁 Test Structure

```
src/
├── __tests__/
│   ├── utils/
│   │   ├── mockContext.ts      # Mock GraphQL context helpers
│   │   └── mockData.ts          # Mock data for testing
│   ├── resolvers/
│   │   ├── queries/
│   │   │   ├── profileQueries.test.ts
│   │   │   ├── portfolioQueries.test.ts
│   │   │   └── projectQueries.test.ts
│   │   └── mutations/
│   │       ├── authMutations.test.ts
│   │       └── profileMutations.test.ts
│   └── middleware/
│       └── authMiddleware.test.ts
```

---

## 🧩 Test Utilities

### Mock Context

Create mock GraphQL contexts for testing:

```typescript
import { createMockContext, createMockAdminContext } from '../utils/mockContext';

// Unauthenticated context
const context = createMockContext();

// Admin context
const adminContext = createMockAdminContext();

// Visitor context
const visitorContext = createMockVisitorContext();
```

### Mock Data

Use predefined mock data:

```typescript
import { mockProfile, mockProjects, mockSkills } from '../utils/mockData';

// Use in tests
vi.mocked(context.profileService.getProfile).mockResolvedValue(mockProfile);
```

---

## ✅ Test Coverage

### Current Test Coverage

| Category | Files | Tests | Coverage |
|----------|-------|-------|----------|
| **Queries** | 3 | 15+ | ✅ |
| **Mutations** | 2 | 12+ | ✅ |
| **Middleware** | 1 | 8+ | ✅ |
| **Total** | **6** | **35+** | **✅** |

### What's Tested

#### ✅ Query Resolvers
- **Profile Queries**
  - Get profile (exists/not exists)
  - Error handling
  
- **Portfolio Queries**
  - Get complete portfolio
  - Handle null profile
  - Handle empty data
  - Error handling

- **Project Queries**
  - Get all projects
  - Get project by ID
  - Get project by slug
  - Get featured projects
  - Handle not found cases

#### ✅ Mutation Resolvers
- **Auth Mutations**
  - Successful login
  - Invalid credentials
  - Missing username/password

- **Profile Mutations**
  - Create profile (admin only)
  - Update profile (admin only)
  - Delete profile (admin only)
  - UNAUTHENTICATED errors
  - FORBIDDEN errors

#### ✅ Middleware
- **requireAuth()**
  - Pass with authenticated user
  - Throw UNAUTHENTICATED error
  - Correct error code

- **requireAdmin()**
  - Pass with admin user
  - Throw UNAUTHENTICATED for no user
  - Throw FORBIDDEN for non-admin
  - Correct error codes

---

## 📝 Writing Tests

### Test Structure (AAA Pattern)

```typescript
it('should do something', async () => {
  // Arrange - Setup test data and mocks
  const context = createMockContext();
  vi.mocked(context.service.method).mockResolvedValue(data);

  // Act - Execute the function being tested
  const result = await resolver({}, { args }, context);

  // Assert - Verify the results
  expect(result).toEqual(expectedData);
  expect(context.service.method).toHaveBeenCalledWith(args);
});
```

### Testing Queries

```typescript
import { describe, it, expect, vi } from 'vitest';
import { profileQueries } from '../../../interfaces/graphql/resolvers/queries/profileQueries';
import { createMockContext } from '../../utils/mockContext';
import { mockProfile } from '../../utils/mockData';

describe('Profile Queries', () => {
  describe('profile', () => {
    it('should return profile when it exists', async () => {
      // Arrange
      const context = createMockContext();
      vi.mocked(context.profileService.getProfile).mockResolvedValue(mockProfile);

      // Act
      const result = await profileQueries.profile({}, {}, context);

      // Assert
      expect(result).toEqual(mockProfile);
      expect(context.profileService.getProfile).toHaveBeenCalledTimes(1);
    });
  });
});
```

### Testing Mutations with Auth

```typescript
import { GraphQLError } from 'graphql';
import { createMockAdminContext, createMockContext } from '../../utils/mockContext';

describe('Profile Mutations', () => {
  it('should create profile when user is admin', async () => {
    const context = createMockAdminContext();
    // ... test logic
  });

  it('should throw error when not authenticated', async () => {
    const context = createMockContext(); // No user
    
    await expect(
      profileMutations.createProfile({}, { input }, context)
    ).rejects.toThrow('Authentication required');
  });
});
```

### Testing Middleware

```typescript
describe('Auth Middleware', () => {
  it('should pass when user is authenticated', () => {
    const context = createMockAdminContext();
    expect(() => requireAuth(context)).not.toThrow();
  });

  it('should throw error when not authenticated', () => {
    const context = createMockContext();
    expect(() => requireAuth(context)).toThrow(GraphQLError);
  });
});
```

---

## 🎯 Best Practices

### ✅ DO

- **Use descriptive test names**: `it('should return profile when it exists')`
- **Follow AAA pattern**: Arrange, Act, Assert
- **Test one thing per test**: Keep tests focused
- **Mock external dependencies**: Use `vi.mocked()` for services
- **Test error cases**: Don't just test happy paths
- **Use type-safe mocks**: Leverage TypeScript
- **Clean up after tests**: Vitest handles this automatically

### ❌ DON'T

- **Don't test implementation details**: Test behavior, not internals
- **Don't share state between tests**: Each test should be independent
- **Don't skip error testing**: Error cases are critical
- **Don't mock everything**: Only mock external dependencies
- **Don't write brittle tests**: Tests should be maintainable

---

## 🔍 Debugging Tests

### Run Specific Test File
```bash
npm test profileQueries.test.ts
```

### Run Tests Matching Pattern
```bash
npm test -- --grep "profile"
```

### Debug with UI
```bash
npm run test:ui
```

### View Coverage Report
```bash
npm run test:coverage
open coverage/index.html
```

---

## 📊 Coverage Goals

| Metric | Target | Current |
|--------|--------|---------|
| **Statements** | > 80% | ✅ |
| **Branches** | > 75% | ✅ |
| **Functions** | > 80% | ✅ |
| **Lines** | > 80% | ✅ |

---

## 🚦 CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:run
      - run: npm run test:coverage
```

---

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vitest API Reference](https://vitest.dev/api/)
- [Testing Best Practices](https://vitest.dev/guide/best-practices.html)

---

## 🎉 Summary

Your GraphQL resolvers are now fully tested with:

- ✅ **35+ unit tests** covering queries, mutations, and middleware
- ✅ **Vitest** for fast, modern testing
- ✅ **Mock utilities** for easy test setup
- ✅ **Coverage reporting** to track test quality
- ✅ **Best practices** following AAA pattern

Run `npm test` to see all tests in action! 🚀
