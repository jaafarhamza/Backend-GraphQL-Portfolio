import { IExperienceRepository } from '../../domain/repositories/IExperienceRepository';
import { Experience, CreateExperienceInput, UpdateExperienceInput } from '../../domain/entities/Experience.entity';

export class ExperienceService {
  constructor(private readonly experienceRepository: IExperienceRepository) {}

  async getAllExperiences(): Promise<Experience[]> {
    return this.experienceRepository.findAll();
  }

  async getExperienceById(id: string): Promise<Experience | null> {
    return this.experienceRepository.findById(id);
  }

  async getCurrentExperiences(): Promise<Experience[]> {
    return this.experienceRepository.findCurrent();
  }

  async createExperience(data: CreateExperienceInput): Promise<Experience> {
    return this.experienceRepository.create(data);
  }

  async updateExperience(id: string, data: UpdateExperienceInput): Promise<Experience> {
    return this.experienceRepository.update(id, data);
  }

  async deleteExperience(id: string): Promise<boolean> {
    return this.experienceRepository.delete(id);
  }
}
