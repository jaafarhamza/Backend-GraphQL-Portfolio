import { Skill, CreateSkillInput, UpdateSkillInput } from '../entities/Skill.entity';

export interface ISkillRepository {
  findAll(): Promise<Skill[]>;
  findById(id: string): Promise<Skill | null>;
  findByCategory(category: string): Promise<Skill[]>;
  create(data: CreateSkillInput): Promise<Skill>;
  update(id: string, data: UpdateSkillInput): Promise<Skill>;
  delete(id: string): Promise<boolean>;
}
