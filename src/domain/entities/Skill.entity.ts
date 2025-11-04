export enum SkillCategory {
  LANGUAGE = 'language',
  FRAMEWORK = 'framework',
  LIBRARY = 'library',
  TOOL = 'tool',
  DATABASE = 'database',
  OTHER = 'other',
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level?: number;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSkillInput {
  name: string;
  category: SkillCategory;
  level?: number;
  icon?: string;
}

export interface UpdateSkillInput {
  name?: string;
  category?: SkillCategory;
  level?: number;
  icon?: string;
}
