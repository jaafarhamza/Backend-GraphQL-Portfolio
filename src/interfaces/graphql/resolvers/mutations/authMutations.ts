import { GraphQLContext } from '../../context';

export const authMutations = {
  login: async (
    _: any,
    { username, password }: { username: string; password: string },
    context: GraphQLContext
  ) => {
    return context.authService.login(username, password);
  },
};
