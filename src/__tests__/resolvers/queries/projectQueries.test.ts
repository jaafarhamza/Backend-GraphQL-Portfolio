import { describe, it, expect, vi } from 'vitest';
import { projectQueries } from '../../../interfaces/graphql/resolvers/queries/projectQueries';
import { createMockContext } from '../../utils/mockContext';
import { mockProjects } from '../../utils/mockData';

describe('Project Queries', () => {
  describe('projects', () => {
    it('should return all projects', async () => {
      // setup
      const context = createMockContext();
      vi.mocked(context.projectService.getAllProjects).mockResolvedValue(mockProjects);

      // execute
      const result = await projectQueries.projects({}, {}, context);

      // verify
      expect(result).toEqual(mockProjects);
      expect(context.projectService.getAllProjects).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no projects exist', async () => {
      // setup
      const context = createMockContext();
      vi.mocked(context.projectService.getAllProjects).mockResolvedValue([]);

      // execute
      const result = await projectQueries.projects({}, {}, context);

      // verify
      expect(result).toEqual([]);
    });
  });

  describe('project', () => {
    it('should return project by id', async () => {
      // setup
      const context = createMockContext();
      const projectId = 'project-1';
      vi.mocked(context.projectService.getProjectById).mockResolvedValue(mockProjects[0]);

      // execute
      const result = await projectQueries.project({}, { id: projectId }, context);

      // verify
      expect(result).toEqual(mockProjects[0]);
      expect(context.projectService.getProjectById).toHaveBeenCalledWith(projectId);
    });

    it('should return null when project not found', async () => {
      // setup
      const context = createMockContext();
      vi.mocked(context.projectService.getProjectById).mockResolvedValue(null);

      // execute
      const result = await projectQueries.project({}, { id: 'non-existent' }, context);

      // verify
      expect(result).toBeNull();
    });
  });

  describe('projectBySlug', () => {
    it('should return project by slug', async () => {
      // setup
      const context = createMockContext();
      const slug = 'portfolio-backend-api';
      vi.mocked(context.projectService.getProjectBySlug).mockResolvedValue(mockProjects[0]);

      // execute
      const result = await projectQueries.projectBySlug({}, { slug }, context);

      // verify
      expect(result).toEqual(mockProjects[0]);
      expect(context.projectService.getProjectBySlug).toHaveBeenCalledWith(slug);
    });

    it('should return null when slug not found', async () => {
      // setup
      const context = createMockContext();
      vi.mocked(context.projectService.getProjectBySlug).mockResolvedValue(null);

      // execute
      const result = await projectQueries.projectBySlug({}, { slug: 'non-existent' }, context);

      // verify
      expect(result).toBeNull();
    });
  });

  describe('featuredProjects', () => {
    it('should return only featured projects', async () => {
      // setup
      const context = createMockContext();
      const featuredProjects = mockProjects.filter((p) => p.featured);
      vi.mocked(context.projectService.getFeaturedProjects).mockResolvedValue(featuredProjects);

      // execute
      const result = await projectQueries.featuredProjects({}, {}, context);

      // verify
      expect(result).toEqual(featuredProjects);
      expect(result.every((p) => p.featured)).toBe(true);
      expect(context.projectService.getFeaturedProjects).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no featured projects', async () => {
      // setup
      const context = createMockContext();
      vi.mocked(context.projectService.getFeaturedProjects).mockResolvedValue([]);

      // execute
      const result = await projectQueries.featuredProjects({}, {}, context);

      // verify
      expect(result).toEqual([]);
    });
  });
});
