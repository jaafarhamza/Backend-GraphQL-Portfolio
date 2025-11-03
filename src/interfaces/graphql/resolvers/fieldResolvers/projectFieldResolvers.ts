import { GraphQLContext } from '../../context';
import { Project } from '../../../../domain/entities/Project.entity';

export const projectFieldResolvers = {
  Project: {
    skills: async (parent: Project, _: any, context: GraphQLContext) => {
      // Resolve skills from skillIds
      const skills = await Promise.all(
        parent.skillIds.map((skillId) => context.skillService.getSkillById(skillId))
      );
      return skills.filter((skill) => skill !== null);
    },
  },
};
