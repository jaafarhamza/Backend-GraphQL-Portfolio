import { IProjectRepository } from '../../domain/repositories/IProjectRepository';
import {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
} from '../../domain/entities/Project.entity';

export class ProjectService {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.projectRepository.findById(id);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    return this.projectRepository.findBySlug(slug);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return this.projectRepository.findFeatured();
  }

  async createProject(data: CreateProjectInput): Promise<Project> {
    return this.projectRepository.create(data);
  }

  async updateProject(id: string, data: UpdateProjectInput): Promise<Project> {
    return this.projectRepository.update(id, data);
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projectRepository.delete(id);
  }
}
