import { GraphQLError } from 'graphql';
import { GraphQLContext } from '../interfaces/graphql/context';
import { UserRole } from '../domain/entities/User.entity';

export const requireAuth = (context: GraphQLContext) => {
  if (!context.user) {
    throw new GraphQLError('Authentication required', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
};

export const requireAdmin = (context: GraphQLContext) => {
  requireAuth(context);

  if (context.user?.role !== UserRole.ADMIN) {
    throw new GraphQLError('Admin access required', {
      extensions: { code: 'FORBIDDEN' },
    });
  }
};
