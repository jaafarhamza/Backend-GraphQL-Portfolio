import { GraphQLContext } from '../../context';

export const profileQueries = {
  profile: async (_: any, __: any, context: GraphQLContext) => {
    return context.profileService.getProfile();
  },
};
