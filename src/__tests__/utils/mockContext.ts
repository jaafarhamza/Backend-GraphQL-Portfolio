import { GraphQLContext } from '../../interfaces/graphql/context';
import { JwtPayload } from '../../infrastructure/security/JwtService';
import { UserRole } from '../../domain/entities/User.entity';
import { vi } from 'vitest';

/**
 * Create a mock GraphQL context for testing
 */
export const createMockContext = (overrides?: Partial<GraphQLContext>): GraphQLContext => {
  return {
    user: undefined,
    profileService: {
      getProfile: vi.fn(),
      createProfile: vi.fn(),
      updateProfile: vi.fn(),
      deleteProfile: vi.fn(),
    } as any,
    authService: {
      login: vi.fn(),
      validateToken: vi.fn(),
    } as any,
    skillService: {
      getAllSkills: vi.fn(),
      getSkillById: vi.fn(),
      getSkillsByCategory: vi.fn(),
      createSkill: vi.fn(),
      updateSkill: vi.fn(),
      deleteSkill: vi.fn(),
    } as any,
    projectService: {
      getAllProjects: vi.fn(),
      getProjectById: vi.fn(),
      getProjectBySlug: vi.fn(),
      getFeaturedProjects: vi.fn(),
      createProject: vi.fn(),
      updateProject: vi.fn(),
      deleteProject: vi.fn(),
    } as any,
    experienceService: {
      getAllExperiences: vi.fn(),
      getExperienceById: vi.fn(),
      getCurrentExperiences: vi.fn(),
      createExperience: vi.fn(),
      updateExperience: vi.fn(),
      deleteExperience: vi.fn(),
    } as any,
    ...overrides,
  };
};

/**
 * Create a mock authenticated user (admin)
 */
export const createMockAdminUser = (): JwtPayload => ({
  sub: 'admin-user-id',
  username: 'admin',
  role: UserRole.ADMIN,
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
});

/**
 * Create a mock authenticated user (visitor)
 */
export const createMockVisitorUser = (): JwtPayload => ({
  sub: 'visitor-user-id',
  username: 'visitor',
  role: UserRole.VISITOR,
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
});

/**
 * Create a mock context with authenticated admin user
 */
export const createMockAdminContext = (): GraphQLContext => {
  return createMockContext({
    user: createMockAdminUser(),
  });
};

/**
 * Create a mock context with authenticated visitor user
 */
export const createMockVisitorContext = (): GraphQLContext => {
  return createMockContext({
    user: createMockVisitorUser(),
  });
};
