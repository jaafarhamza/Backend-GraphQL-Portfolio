import { profileQueries } from './queries/profileQueries';
import { skillQueries } from './queries/skillQueries';
import { projectQueries } from './queries/projectQueries';
import { experienceQueries } from './queries/experienceQueries';
import { portfolioQueries } from './queries/portfolioQueries';
import { profileMutations } from './mutations/profileMutations';
import { skillMutations } from './mutations/skillMutations';
import { projectMutations } from './mutations/projectMutations';
import { experienceMutations } from './mutations/experienceMutations';
import { authMutations } from './mutations/authMutations';
import { projectFieldResolvers } from './fieldResolvers/projectFieldResolvers';
import { experienceFieldResolvers } from './fieldResolvers/experienceFieldResolvers';

export const resolvers = {
  Query: {
    ...profileQueries,
    ...skillQueries,
    ...projectQueries,
    ...experienceQueries,
    ...portfolioQueries,
  },
  Mutation: {
    ...authMutations,
    ...profileMutations,
    ...skillMutations,
    ...projectMutations,
    ...experienceMutations,
  },
  ...projectFieldResolvers,
  ...experienceFieldResolvers,
};
