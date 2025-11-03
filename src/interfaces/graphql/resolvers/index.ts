import { profileQueries } from './queries/profileQueries';
import { profileMutations } from './mutations/profileMutations';
import { authMutations } from './mutations/authMutations';

export const resolvers = {
  Query: {
    ...profileQueries,
  },
  Mutation: {
    ...authMutations,
    ...profileMutations,
  },
};
