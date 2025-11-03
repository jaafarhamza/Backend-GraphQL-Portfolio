import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { env } from './config/env';
import { connectDatabase } from './config/database';
import { typeDefs } from './interfaces/graphql/schemas';
import { resolvers } from './interfaces/graphql/resolvers';
import { GraphQLContext } from './interfaces/graphql/context';

// Repositories
import { ProfileRepository } from './infrastructure/database/repositories/ProfileRepository';
import { UserRepository } from './infrastructure/database/repositories/UserRepository';

// Services
import { ProfileService } from './application/services/ProfileService';
import { AuthService } from './application/services/AuthService';
import { JwtService } from './infrastructure/security/JwtService';
import { PasswordHasher } from './infrastructure/security/PasswordHasher';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function startServer() {
  // Connect to MongoDB
  await connectDatabase();

  // Initialize dependencies (Dependency Injection)
  const profileRepository = new ProfileRepository();
  const userRepository = new UserRepository();
  const jwtService = new JwtService();
  const passwordHasher = new PasswordHasher();

  const profileService = new ProfileService(profileRepository);
  const authService = new AuthService(userRepository, jwtService, passwordHasher);

  // Create Apollo Server
  const server = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (token) {
          try {
            const user = jwtService.verify(token);
            return { user, profileService, authService };
          } catch (error) {
            return { profileService, authService };
          }
        }

        return { profileService, authService };
      },
    })
  );

  app.listen(env.port, () => {
    console.log(`🚀 Server ready at http://localhost:${env.port}/graphql`);
    console.log(`📋 Health check at http://localhost:${env.port}/health`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
