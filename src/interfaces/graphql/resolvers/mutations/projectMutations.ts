import { GraphQLContext } from '../../context';
import { requireAdmin } from '../../../../middleware/authMiddleware';
import { CreateProjectInput, UpdateProjectInput } from '../../../../domain/entities/Project.entity';

export const projectMutations = {
  createProject: async (
    _: any,
    { input }: { input: CreateProjectInput },
    context: GraphQLContext
  ) => {
    requireAdmin(context);
    return context.projectService.createProject(input);
  },

  updateProject: async (
    _: any,
    { id, input }: { id: string; input: UpdateProjectInput },
    context: GraphQLContext
  ) => {
    requireAdmin(context);
    return context.projectService.updateProject(id, input);
  },

  deleteProject: async (
    _: any,
    { id }: { id: string },
    context: GraphQLContext
  ) => {
    requireAdmin(context);
    return context.projectService.deleteProject(id);
  },
};
