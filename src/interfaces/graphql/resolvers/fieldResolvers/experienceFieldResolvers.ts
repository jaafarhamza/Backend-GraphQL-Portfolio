import { GraphQLContext } from '../../context';
import { Experience } from '../../../../domain/entities/Experience.entity';

export const experienceFieldResolvers = {
  Experience: {
    skills: async (parent: Experience, _: unknown, context: GraphQLContext) => {
      const skills = await Promise.all(
        parent.skillIds.map((skillId) => context.skillService.getSkillById(skillId))
      );
      return skills.filter((skill) => skill !== null);
    },
  },
};
