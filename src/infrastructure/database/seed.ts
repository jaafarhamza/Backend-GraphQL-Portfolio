import { UserModel } from './models/User.model';
import { ProfileModel } from './models/Profile.model';
import { SkillModel } from './models/Skill.model';
import { ProjectModel } from './models/Project.model';
import { UserRole } from '../../domain/entities/User.entity';
import { SkillCategory } from '../../domain/entities/Skill.entity';
import { ProjectStatus } from '../../domain/entities/Project.entity';
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

    // Seed skills
    const skillsCount = await SkillModel.countDocuments();
    if (skillsCount === 0) {
      const skills = await SkillModel.insertMany([
        { name: 'TypeScript', category: SkillCategory.LANGUAGE, level: 5 },
        { name: 'JavaScript', category: SkillCategory.LANGUAGE, level: 5 },
        { name: 'Node.js', category: SkillCategory.FRAMEWORK, level: 5 },
        { name: 'React', category: SkillCategory.LIBRARY, level: 5 },
        { name: 'GraphQL', category: SkillCategory.TOOL, level: 4 },
        { name: 'MongoDB', category: SkillCategory.DATABASE, level: 4 },
        { name: 'Docker', category: SkillCategory.TOOL, level: 4 },
      ]);
      console.log(`✅ ${skills.length} skills created`);

      // Create sample projects
      await ProjectModel.create({
        title: 'Portfolio Backend API',
        slug: 'portfolio-backend-api',
        description: 'GraphQL backend with Clean Architecture, JWT authentication, and RBAC',
        skills: skills.slice(0, 5).map((s) => s._id),
        repoUrl: 'https://github.com/yourusername/portfolio-backend',
        featured: true,
        status: ProjectStatus.PUBLISHED,
        imageUrls: [],
      });

      await ProjectModel.create({
        title: 'E-commerce Platform',
        slug: 'ecommerce-platform',
        description: 'Full-stack e-commerce application with payment integration',
        skills: skills.slice(2, 7).map((s) => s._id),
        liveUrl: 'https://demo-ecommerce.example.com',
        featured: true,
        status: ProjectStatus.PUBLISHED,
        imageUrls: [],
      });

      console.log('✅ Sample projects created');
    }

    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
