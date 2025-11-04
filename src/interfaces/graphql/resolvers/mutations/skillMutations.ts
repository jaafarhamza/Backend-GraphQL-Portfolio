import { GraphQLContext } from '../../context';
import { requireAdmin } from '../../../../middleware/authMiddleware';
import { CreateSkillInput, UpdateSkillInput } from '../../../../domain/entities/Skill.entity';

export const skillMutations = {
  createSkill: async (_: any, { input }: { input: CreateSkillInput }, context: GraphQLContext) => {
    requireAdmin(context);
    return context.skillService.createSkill(input);
  },

  updateSkill: async (
    _: any,
    { id, input }: { id: string; input: UpdateSkillInput },
    context: GraphQLContext
  ) => {
    requireAdmin(context);
    return context.skillService.updateSkill(id, input);
  },

  deleteSkill: async (_: any, { id }: { id: string }, context: GraphQLContext) => {
    requireAdmin(context);
    return context.skillService.deleteSkill(id);
  },
};
