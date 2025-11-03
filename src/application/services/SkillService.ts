import { ISkillRepository } from '../../domain/repositories/ISkillRepository';
import { Skill, CreateSkillInput, UpdateSkillInput } from '../../domain/entities/Skill.entity';

export class SkillService {
  constructor(private readonly skillRepository: ISkillRepository) {}

  async getAllSkills(): Promise<Skill[]> {
    return this.skillRepository.findAll();
  }

  async getSkillById(id: string): Promise<Skill | null> {
    return this.skillRepository.findById(id);
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return this.skillRepository.findByCategory(category);
  }

  async createSkill(data: CreateSkillInput): Promise<Skill> {
    return this.skillRepository.create(data);
  }

  async updateSkill(id: string, data: UpdateSkillInput): Promise<Skill> {
    return this.skillRepository.update(id, data);
  }

  async deleteSkill(id: string): Promise<boolean> {
    return this.skillRepository.delete(id);
  }
}
