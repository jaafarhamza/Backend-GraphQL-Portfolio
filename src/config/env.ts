import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: parseInt(process.env.PORT!, 10),
  nodeEnv: process.env.NODE_ENV,
  
  // MongoDB
  mongoHost: process.env.MONGO_HOST,
  mongoPort: parseInt(process.env.MONGO_PORT!, 10),
  mongoInitDbRootUsername: process.env.MONGO_INITDB_ROOT_USERNAME,
  mongoInitDbRootPassword: process.env.MONGO_INITDB_ROOT_PASSWORD,
  mongoDb: process.env.MONGO_DB,
  mongoUri: process.env.MONGO_URI,
  
  // JWT
  jwtSecret: process.env.JWT_SECRET,
  
  // Admin credentials
  adminUsername: process.env.ADMIN_USERNAME,
  adminPassword: process.env.ADMIN_PASSWORD,
};
