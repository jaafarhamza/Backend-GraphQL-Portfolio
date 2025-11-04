import { describe, it, expect } from 'vitest';
import { GraphQLError } from 'graphql';
import { requireAuth, requireAdmin } from '../../middleware/authMiddleware';
import {
  createMockContext,
  createMockAdminContext,
  createMockVisitorContext,
} from '../utils/mockContext';

describe('Auth Middleware', () => {
  describe('requireAuth', () => {
    it('should pass when user is authenticated', () => {
      // setup
      const context = createMockAdminContext();

      // execute & verify
      expect(() => requireAuth(context)).not.toThrow();
    });

    it('should throw UNAUTHENTICATED error when user is not authenticated', () => {
      // setup
      const context = createMockContext(); // No user

      // execute & verify
      expect(() => requireAuth(context)).toThrow(GraphQLError);
      expect(() => requireAuth(context)).toThrow('Authentication required');
    });

    it('should throw error with UNAUTHENTICATED code', () => {
      // setup
      const context = createMockContext();

      // execute & verify
      try {
        requireAuth(context);
      } catch (error) {
        expect(error).toBeInstanceOf(GraphQLError);
        expect((error as GraphQLError).extensions.code).toBe('UNAUTHENTICATED');
      }
    });
  });

  describe('requireAdmin', () => {
    it('should pass when user is admin', () => {
      // setup
      const context = createMockAdminContext();

      // execute & verify
      expect(() => requireAdmin(context)).not.toThrow();
    });

    it('should throw UNAUTHENTICATED error when user is not authenticated', () => {
      // setup
      const context = createMockContext(); // No user

      // execute & verify
      expect(() => requireAdmin(context)).toThrow(GraphQLError);
      expect(() => requireAdmin(context)).toThrow('Authentication required');
    });

    it('should throw FORBIDDEN error when user is not admin', () => {
      // setup
      const context = createMockVisitorContext();

      // execute & verify
      expect(() => requireAdmin(context)).toThrow(GraphQLError);
      expect(() => requireAdmin(context)).toThrow('Admin access required');
    });

    it('should throw error with FORBIDDEN code for non-admin user', () => {
      // setup
      const context = createMockVisitorContext();

      // execute & verify
      try {
        requireAdmin(context);
      } catch (error) {
        expect(error).toBeInstanceOf(GraphQLError);
        expect((error as GraphQLError).extensions.code).toBe('FORBIDDEN');
      }
    });

    it('should call requireAuth internally', () => {
      // setup
      const context = createMockContext();

      // execute & verify
      // requireAdmin
      expect(() => requireAdmin(context)).toThrow('Authentication required');
    });
  });
});
