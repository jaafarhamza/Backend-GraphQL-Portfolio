import { GraphQLContext } from '../../context';

export const experienceQueries = {
  experiences: async (_: any, __: any, context: GraphQLContext) => {
    return context.experienceService.getAllExperiences();
  },

  experience: async (_: any, { id }: { id: string }, context: GraphQLContext) => {
    return context.experienceService.getExperienceById(id);
  },

  currentExperiences: async (_: any, __: any, context: GraphQLContext) => {
    return context.experienceService.getCurrentExperiences();
  },
};
