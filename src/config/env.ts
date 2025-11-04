import dotenv from 'dotenv';

dotenv.config();

// Build MongoDB URI dynamically if MONGODB_URI is not provided
const buildMongoUri = (): string => {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  const host = process.env.MONGO_HOST;
  const port = process.env.MONGO_PORT;
  const username = process.env.MONGO_INITDB_ROOT_USERNAME;
  const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
  const database = process.env.MONGO_DB;

  return `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;
};

export const env = {
  port: parseInt(process.env.PORT!, 10),
  nodeEnv: process.env.NODE_ENV,

  // MongoDB
  mongoHost: process.env.MONGO_HOST,
  mongoPort: parseInt(process.env.MONGO_PORT!, 10),
  mongoInitDbRootUsername: process.env.MONGO_INITDB_ROOT_USERNAME,
  mongoInitDbRootPassword: process.env.MONGO_INITDB_ROOT_PASSWORD,
  mongoDb: process.env.MONGO_DB,
  mongoUri: buildMongoUri(),

  // JWT
  jwtSecret: process.env.JWT_SECRET,

  // Admin credentials
  adminUsername: process.env.ADMIN_USERNAME,
  adminPassword: process.env.ADMIN_PASSWORD,
};
