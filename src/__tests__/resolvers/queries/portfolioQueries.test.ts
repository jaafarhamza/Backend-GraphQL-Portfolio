import { describe, it, expect, vi } from 'vitest';
import { portfolioQueries } from '../../../interfaces/graphql/resolvers/queries/portfolioQueries';
import { createMockContext } from '../../utils/mockContext';
import { mockProfile, mockProjects, mockSkills, mockExperiences } from '../../utils/mockData';

describe('Portfolio Queries', () => {
  describe('getPortfolio', () => {
    it('should return complete portfolio data', async () => {
      // setup
      const context = createMockContext();
      vi.mocked(context.profileService.getProfile).mockResolvedValue(mockProfile);
      vi.mocked(context.projectService.getAllProjects).mockResolvedValue(mockProjects);
      vi.mocked(context.skillService.getAllSkills).mockResolvedValue(mockSkills);
      vi.mocked(context.experienceService.getAllExperiences).mockResolvedValue(mockExperiences);

      // execute
      const result = await portfolioQueries.getPortfolio({}, {}, context);

      // verify
      expect(result).toEqual({
        profile: mockProfile,
        projects: mockProjects,
        skills: mockSkills,
        experiences: mockExperiences,
      });

      // Verify all services
      expect(context.profileService.getProfile).toHaveBeenCalledTimes(1);
      expect(context.projectService.getAllProjects).toHaveBeenCalledTimes(1);
      expect(context.skillService.getAllSkills).toHaveBeenCalledTimes(1);
      expect(context.experienceService.getAllExperiences).toHaveBeenCalledTimes(1);
    });

    it('should return portfolio with null profile when profile does not exist', async () => {
      // setup
      const context = createMockContext();
      vi.mocked(context.profileService.getProfile).mockResolvedValue(null);
      vi.mocked(context.projectService.getAllProjects).mockResolvedValue(mockProjects);
      vi.mocked(context.skillService.getAllSkills).mockResolvedValue(mockSkills);
      vi.mocked(context.experienceService.getAllExperiences).mockResolvedValue(mockExperiences);

      // execute
      const result = await portfolioQueries.getPortfolio({}, {}, context);

      // verify
      expect(result.profile).toBeNull();
      expect(result.projects).toEqual(mockProjects);
      expect(result.skills).toEqual(mockSkills);
      expect(result.experiences).toEqual(mockExperiences);
    });

    it('should return empty arrays when no data exists', async () => {
      // setup
      const context = createMockContext();
      vi.mocked(context.profileService.getProfile).mockResolvedValue(null);
      vi.mocked(context.projectService.getAllProjects).mockResolvedValue([]);
      vi.mocked(context.skillService.getAllSkills).mockResolvedValue([]);
      vi.mocked(context.experienceService.getAllExperiences).mockResolvedValue([]);

      // execute
      const result = await portfolioQueries.getPortfolio({}, {}, context);

      // verify
      expect(result).toEqual({
        profile: null,
        projects: [],
        skills: [],
        experiences: [],
      });
    });

    it('should handle service errors', async () => {
      // setup
      const context = createMockContext();
      const error = new Error('Service unavailable');
      vi.mocked(context.profileService.getProfile).mockRejectedValue(error);

      // execute/ verify
      await expect(portfolioQueries.getPortfolio({}, {}, context)).rejects.toThrow(
        'Service unavailable'
      );
    });
  });
});
