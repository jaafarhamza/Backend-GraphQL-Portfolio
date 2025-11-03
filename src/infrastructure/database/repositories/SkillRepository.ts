import { ISkillRepository } from '../../../domain/repositories/ISkillRepository';
import { Skill, CreateSkillInput, UpdateSkillInput } from '../../../domain/entities/Skill.entity';
import { SkillModel } from '../models/Skill.model';

export class SkillRepository implements ISkillRepository {
  async findAll(): Promise<Skill[]> {
    const skills = await SkillModel.find().sort({ category: 1, name: 1 }).lean();
    return skills.map((skill) => ({
      id: (skill._id as any).toString(),
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon,
      createdAt: skill.createdAt,
      updatedAt: skill.updatedAt,
    }));
  }

  async findById(id: string): Promise<Skill | null> {
    const skill = await SkillModel.findById(id).lean();
    if (!skill) return null;

    return {
      id: (skill._id as any).toString(),
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon,
      createdAt: skill.createdAt,
      updatedAt: skill.updatedAt,
    };
  }

  async findByCategory(category: string): Promise<Skill[]> {
    const skills = await SkillModel.find({ category }).sort({ name: 1 }).lean();
    return skills.map((skill) => ({
      id: (skill._id as any).toString(),
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon,
      createdAt: skill.createdAt,
      updatedAt: skill.updatedAt,
    }));
  }

  async create(data: CreateSkillInput): Promise<Skill> {
    const skill = new SkillModel(data);
    await skill.save();

    return {
      id: (skill._id as any).toString(),
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon,
      createdAt: skill.createdAt,
      updatedAt: skill.updatedAt,
    };
  }

  async update(id: string, data: UpdateSkillInput): Promise<Skill> {
    const skill = await SkillModel.findByIdAndUpdate(id, data, { new: true });
    if (!skill) throw new Error('Skill not found');

    return {
      id: (skill._id as any).toString(),
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon,
      createdAt: skill.createdAt,
      updatedAt: skill.updatedAt,
    };
  }

  async delete(id: string): Promise<boolean> {
    const result = await SkillModel.findByIdAndDelete(id);
    return !!result;
  }
}
