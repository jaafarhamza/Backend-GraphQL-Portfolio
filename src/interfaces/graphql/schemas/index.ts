import { profileTypeDefs } from './profile.schema';
import { authTypeDefs } from './auth.schema';
import { skillTypeDefs } from './skill.schema';
import { projectTypeDefs } from './project.schema';
import { experienceTypeDefs } from './experience.schema';
import { portfolioTypeDefs } from './portfolio.schema';

export const typeDefs = `#graphql
  ${authTypeDefs}
  ${profileTypeDefs}
  ${skillTypeDefs}
  ${projectTypeDefs}
  ${experienceTypeDefs}
  ${portfolioTypeDefs}
`;
