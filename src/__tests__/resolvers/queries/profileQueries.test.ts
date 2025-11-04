import { describe, it, expect, vi } from 'vitest';
import { profileQueries } from '../../../interfaces/graphql/resolvers/queries/profileQueries';
import { createMockContext } from '../../utils/mockContext';
import { mockProfile } from '../../utils/mockData';

describe('Profile Queries', () => {
  describe('profile', () => {
    it('should return profile when it exists', async () => {
      // setup
      const context = createMockContext();
      vi.mocked(context.profileService.getProfile).mockResolvedValue(mockProfile);

      // execute
      const result = await profileQueries.profile({}, {}, context);

      // verify
      expect(result).toEqual(mockProfile);
      expect(context.profileService.getProfile).toHaveBeenCalledTimes(1);
    });

    it('should return null when profile does not exist', async () => {
      // setup
      const context = createMockContext();
      vi.mocked(context.profileService.getProfile).mockResolvedValue(null);

      // execute
      const result = await profileQueries.profile({}, {}, context);

      // verify
      expect(result).toBeNull();
      expect(context.profileService.getProfile).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors', async () => {
      // setup
      const context = createMockContext();
      const error = new Error('Database connection failed');
      vi.mocked(context.profileService.getProfile).mockRejectedValue(error);

      // execute & verify
      await expect(profileQueries.profile({}, {}, context)).rejects.toThrow(
        'Database connection failed'
      );
    });
  });
});
