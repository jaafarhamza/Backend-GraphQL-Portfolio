import mongoose from 'mongoose';
import { env } from './env';
import { seedDatabase } from '../infrastructure/database/seed';

export const connectDatabase = async (): Promise<void> => {
  try {
    const uri = env.mongoUri;
    if (!uri) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
    console.log(`Database: ${env.mongoDb}`);
    console.log(`Host: ${env.mongoHost}:${env.mongoPort}`);

    // Seed database
    await seedDatabase();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
