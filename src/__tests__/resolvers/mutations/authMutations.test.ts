import { describe, it, expect, vi } from 'vitest';
import { authMutations } from '../../../interfaces/graphql/resolvers/mutations/authMutations';
import { createMockContext } from '../../utils/mockContext';
import { UserRole } from '../../../domain/entities/User.entity';

describe('Auth Mutations', () => {
  describe('login', () => {
    it('should return token and user on successful login', async () => {
      // setup
      const context = createMockContext();
      const loginResponse = {
        token: 'jwt-token-123',
        user: {
          id: 'user-123',
          username: 'admin',
          role: UserRole.ADMIN,
        },
      };
      vi.mocked(context.authService.login).mockResolvedValue(loginResponse);

      // execute
      const result = await authMutations.login(
        {},
        { username: 'admin', password: 'password123' },
        context
      );

      // verify
      expect(result).toEqual(loginResponse);
      expect(context.authService.login).toHaveBeenCalledWith('admin', 'password123');
    });

    it('should throw error on invalid credentials', async () => {
      // setup
      const context = createMockContext();
      vi.mocked(context.authService.login).mockRejectedValue(new Error('Invalid credentials'));

      // execute/ verify
      await expect(
        authMutations.login({}, { username: 'wrong', password: 'wrong' }, context)
      ).rejects.toThrow('Invalid credentials');
    });

    it('should throw error when username is missing', async () => {
      // setup
      const context = createMockContext();
      vi.mocked(context.authService.login).mockRejectedValue(new Error('Username is required'));

      // execute/ verify
      await expect(
        authMutations.login({}, { username: '', password: 'password' }, context)
      ).rejects.toThrow();
    });

    it('should throw error when password is missing', async () => {
      // setup
      const context = createMockContext();
      vi.mocked(context.authService.login).mockRejectedValue(new Error('Password is required'));

      // execute/ verify
      await expect(
        authMutations.login({}, { username: 'admin', password: '' }, context)
      ).rejects.toThrow();
    });
  });
});
