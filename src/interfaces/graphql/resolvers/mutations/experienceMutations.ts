import { GraphQLContext } from '../../context';
import { requireAdmin } from '../../../../middleware/authMiddleware';
import { CreateExperienceInput, UpdateExperienceInput } from '../../../../domain/entities/Experience.entity';

export const experienceMutations = {
  createExperience: async (
    _: any,
    { input }: { input: CreateExperienceInput },
    context: GraphQLContext
  ) => {
    requireAdmin(context);
    return context.experienceService.createExperience(input);
  },

  updateExperience: async (
    _: any,
    { id, input }: { id: string; input: UpdateExperienceInput },
    context: GraphQLContext
  ) => {
    requireAdmin(context);
    return context.experienceService.updateExperience(id, input);
  },

  deleteExperience: async (
    _: any,
    { id }: { id: string },
    context: GraphQLContext
  ) => {
    requireAdmin(context);
    return context.experienceService.deleteExperience(id);
  },
};
