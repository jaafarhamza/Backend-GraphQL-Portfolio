import { GraphQLContext } from '../../context';

export const projectQueries = {
  projects: async (_: any, __: any, context: GraphQLContext) => {
    return context.projectService.getAllProjects();
  },

  project: async (_: any, { id }: { id: string }, context: GraphQLContext) => {
    return context.projectService.getProjectById(id);
  },

  projectBySlug: async (_: any, { slug }: { slug: string }, context: GraphQLContext) => {
    return context.projectService.getProjectBySlug(slug);
  },

  featuredProjects: async (_: any, __: any, context: GraphQLContext) => {
    return context.projectService.getFeaturedProjects();
  },
};
