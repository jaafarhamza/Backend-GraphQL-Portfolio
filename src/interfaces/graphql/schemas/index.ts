import { profileTypeDefs } from './profile.schema';
import { authTypeDefs } from './auth.schema';

export const typeDefs = `#graphql
  ${authTypeDefs}
  ${profileTypeDefs}
`;
