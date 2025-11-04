import { Profile } from '../../domain/entities/Profile.entity';
import { Project, ProjectStatus } from '../../domain/entities/Project.entity';
import { Skill, SkillCategory } from '../../domain/entities/Skill.entity';
import { Experience, EmploymentType } from '../../domain/entities/Experience.entity';
import { User, UserRole } from '../../domain/entities/User.entity';

/**
 * Mock Profile Data
 */
export const mockProfile: Profile = {
  id: 'profile-123',
  fullName: 'Hamza jaafar',
  title: 'Full Stack Developer',
  bio: 'Passionate developer building modern web applications',
  location: 'Remote',
  email: 'john@example.com',
  phone: '+1234567890',
  avatarUrl: 'https://example.com/avatar.jpg',
  resumeUrl: 'https://example.com/resume.pdf',
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/johndoe' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
  ],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

/**
 * Mock Skills Data
 */
export const mockSkills: Skill[] = [
  {
    id: 'skill-1',
    name: 'TypeScript',
    category: SkillCategory.LANGUAGE,
    level: 5,
    icon: 'typescript-icon',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'skill-2',
    name: 'Node.js',
    category: SkillCategory.FRAMEWORK,
    level: 5,
    icon: 'nodejs-icon',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'skill-3',
    name: 'React',
    category: SkillCategory.LIBRARY,
    level: 4,
    icon: 'react-icon',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

/**
 * Mock Projects Data
 */
export const mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Portfolio Backend API',
    slug: 'portfolio-backend-api',
    description: 'GraphQL backend with Clean Architecture',
    skillIds: ['skill-1', 'skill-2'],
    repoUrl: 'https://github.com/johndoe/portfolio-backend',
    liveUrl: 'https://api.johndoe.com',
    imageUrls: ['https://example.com/project1.jpg'],
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-06-01'),
    featured: true,
    status: ProjectStatus.PUBLISHED,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'project-2',
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    description: 'Full-stack e-commerce application',
    skillIds: ['skill-2', 'skill-3'],
    repoUrl: 'https://github.com/johndoe/ecommerce',
    liveUrl: 'https://shop.johndoe.com',
    imageUrls: ['https://example.com/project2.jpg'],
    featured: false,
    status: ProjectStatus.PUBLISHED,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

/**
 * Mock Experiences Data
 */
export const mockExperiences: Experience[] = [
  {
    id: 'experience-1',
    position: 'Senior Full Stack Developer',
    company: 'Tech Company Inc.',
    companyUrl: 'https://techcompany.com',
    location: 'Remote',
    employmentType: EmploymentType.FULL_TIME,
    startDate: new Date('2022-01-01'),
    endDate: undefined,
    current: true,
    description: 'Leading development of scalable web applications',
    responsibilities: ['Architecting microservices', 'Mentoring junior developers', 'Code review'],
    achievements: ['Reduced API response time by 40%', 'Implemented CI/CD pipeline'],
    skillIds: ['skill-1', 'skill-2'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'experience-2',
    position: 'Full Stack Developer',
    company: 'Startup XYZ',
    location: 'San Francisco, CA',
    employmentType: EmploymentType.FULL_TIME,
    startDate: new Date('2020-06-01'),
    endDate: new Date('2021-12-31'),
    current: false,
    description: 'Developed full-stack applications',
    responsibilities: ['Built RESTful APIs', 'Developed UIs with React'],
    achievements: ['Increased conversion rate by 25%'],
    skillIds: ['skill-2', 'skill-3'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

/**
 * Mock User Data
 */
export const mockAdminUser: User = {
  id: 'user-admin',
  username: 'admin',
  passwordHash: '$2a$10$hashedpassword',
  role: UserRole.ADMIN,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockVisitorUser: User = {
  id: 'user-visitor',
  username: 'visitor',
  passwordHash: '$2a$10$hashedpassword',
  role: UserRole.VISITOR,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};
