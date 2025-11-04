import { GraphQLContext } from '../../context';

export const portfolioQueries = {
  getPortfolio: async (_: any, __: any, context: GraphQLContext) => {
    const [profile, projects, skills, experiences] = await Promise.all([
      context.profileService.getProfile(),
      context.projectService.getAllProjects(),
      context.skillService.getAllSkills(),
      context.experienceService.getAllExperiences(),
    ]);

    return {
      profile,
      projects,
      skills,
      experiences,
    };
  },
};
