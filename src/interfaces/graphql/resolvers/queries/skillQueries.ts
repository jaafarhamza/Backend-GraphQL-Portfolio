import { GraphQLContext } from '../../context';

export const skillQueries = {
  skills: async (_: any, __: any, context: GraphQLContext) => {
    return context.skillService.getAllSkills();
  },

  skill: async (_: any, { id }: { id: string }, context: GraphQLContext) => {
    return context.skillService.getSkillById(id);
  },

  skillsByCategory: async (_: any, { category }: { category: string }, context: GraphQLContext) => {
    return context.skillService.getSkillsByCategory(category);
  },
};
