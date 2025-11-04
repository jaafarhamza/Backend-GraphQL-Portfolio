export enum ProjectStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  skillIds: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageUrls: string[];
  startDate?: Date;
  endDate?: Date;
  featured: boolean;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectInput {
  title: string;
  slug: string;
  description: string;
  skillIds?: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageUrls?: string[];
  startDate?: Date;
  endDate?: Date;
  featured?: boolean;
  status?: ProjectStatus;
}

export interface UpdateProjectInput {
  title?: string;
  slug?: string;
  description?: string;
  skillIds?: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageUrls?: string[];
  startDate?: Date;
  endDate?: Date;
  featured?: boolean;
  status?: ProjectStatus;
}
