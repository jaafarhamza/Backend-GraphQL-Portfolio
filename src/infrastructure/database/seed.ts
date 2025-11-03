import { UserModel } from './models/User.model';
import { ProfileModel } from './models/Profile.model';
import { UserRole } from '../../domain/entities/User.entity';
import { PasswordHasher } from '../security/PasswordHasher';
import { env } from '../../config/env';

export async function seedDatabase() {
  try {
    const passwordHasher = new PasswordHasher();

    // Check if admin user exists
    const existingAdmin = await UserModel.findOne({ username: env.adminUsername });

    if (!existingAdmin) {
      const hashedPassword = await passwordHasher.hash(env.adminPassword!);
      await UserModel.create({
        username: env.adminUsername,
        passwordHash: hashedPassword,
        role: UserRole.ADMIN,
      });
      console.log('✅ Admin user created');
      console.log(`   Username: ${env.adminUsername}`);
    }

    // Check if profile exists
    const existingProfile = await ProfileModel.findOne();

    if (!existingProfile) {
      await ProfileModel.create({
        fullName: 'Your Name',
        title: 'Full Stack Developer',
        bio: 'Passionate developer building modern web applications',
        location: 'Remote',
        email: 'contact@example.com',
        socialLinks: [
          { platform: 'GitHub', url: 'https://github.com/yourusername' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
        ],
      });
      console.log('✅ Default profile created');
    }

    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
