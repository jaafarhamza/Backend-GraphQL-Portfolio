import { profileQueries } from './queries/profileQueries';
import { skillQueries } from './queries/skillQueries';
import { projectQueries } from './queries/projectQueries';
import { profileMutations } from './mutations/profileMutations';
import { skillMutations } from './mutations/skillMutations';
import { projectMutations } from './mutations/projectMutations';
import { authMutations } from './mutations/authMutations';
import { projectFieldResolvers } from './fieldResolvers/projectFieldResolvers';

export const resolvers = {
  Query: {
    ...profileQueries,
    ...skillQueries,
    ...projectQueries,
  },
  Mutation: {
    ...authMutations,
    ...profileMutations,
    ...skillMutations,
    ...projectMutations,
  },
  ...projectFieldResolvers,
};
