import { describe, it, expect, vi } from 'vitest';
import { GraphQLError } from 'graphql';
import { profileMutations } from '../../../interfaces/graphql/resolvers/mutations/profileMutations';
import {
  createMockContext,
  createMockAdminContext,
  createMockVisitorContext,
} from '../../utils/mockContext';
import { mockProfile } from '../../utils/mockData';

describe('Profile Mutations', () => {
  describe('createProfile', () => {
    it('should create profile when user is admin', async () => {
      // setup
      const context = createMockAdminContext();
      const input = {
        fullName: 'hamza jaafar',
        title: 'Developer',
      };
      vi.mocked(context.profileService.createProfile).mockResolvedValue(mockProfile);

      // Act
      const result = await profileMutations.createProfile({}, { input }, context);

      // Assert
      expect(result).toEqual(mockProfile);
      expect(context.profileService.createProfile).toHaveBeenCalledWith(input);
    });

    it('should throw UNAUTHENTICATED error when user is not authenticated', async () => {
      // setup
      const context = createMockContext(); // No user

      // Act & Assert
      await expect(
        profileMutations.createProfile({}, { input: { fullName: 'Test', title: 'Dev' } }, context)
      ).rejects.toThrow(GraphQLError);

      await expect(
        profileMutations.createProfile({}, { input: { fullName: 'Test', title: 'Dev' } }, context)
      ).rejects.toThrow('Authentication required');
    });

    it('should throw FORBIDDEN error when user is not admin', async () => {
      // setup
      const context = createMockVisitorContext();

      // Act & Assert
      await expect(
        profileMutations.createProfile({}, { input: { fullName: 'Test', title: 'Dev' } }, context)
      ).rejects.toThrow(GraphQLError);

      await expect(
        profileMutations.createProfile({}, { input: { fullName: 'Test', title: 'Dev' } }, context)
      ).rejects.toThrow('Admin access required');
    });
  });

  describe('updateProfile', () => {
    it('should update profile when user is admin', async () => {
      // setup
      const context = createMockAdminContext();
      const input = { bio: 'Updated bio' };
      const updatedProfile = { ...mockProfile, bio: 'Updated bio' };
      vi.mocked(context.profileService.updateProfile).mockResolvedValue(updatedProfile);

      // execute
      const result = await profileMutations.updateProfile({}, { input }, context);

      // assert
      expect(result).toEqual(updatedProfile);
      expect(context.profileService.updateProfile).toHaveBeenCalledWith(input);
    });

    it('should throw error when user is not authenticated', async () => {
      // setup
      const context = createMockContext();

      // execute/ verify
      await expect(
        profileMutations.updateProfile({}, { input: { bio: 'Test' } }, context)
      ).rejects.toThrow('Authentication required');
    });

    it('should throw error when user is not admin', async () => {
      // setup
      const context = createMockVisitorContext();

      // execute/ verify
      await expect(
        profileMutations.updateProfile({}, { input: { bio: 'Test' } }, context)
      ).rejects.toThrow('Admin access required');
    });
  });

  describe('deleteProfile', () => {
    it('should delete profile when user is admin', async () => {
      // setup
      const context = createMockAdminContext();
      vi.mocked(context.profileService.deleteProfile).mockResolvedValue(true);

      // execute
      const result = await profileMutations.deleteProfile({}, {}, context);

      // verify
      expect(result).toBe(true);
      expect(context.profileService.deleteProfile).toHaveBeenCalledTimes(1);
    });

    it('should throw error when user is not authenticated', async () => {
      // setup
      const context = createMockContext();

      // execute/ verify
      await expect(profileMutations.deleteProfile({}, {}, context)).rejects.toThrow(
        'Authentication required'
      );
    });

    it('should throw error when user is not admin', async () => {
      // setup
      const context = createMockVisitorContext();

      // execute/ verify
      await expect(profileMutations.deleteProfile({}, {}, context)).rejects.toThrow(
        'Admin access required'
      );
    });
  });
});
