import { IExperienceRepository } from '../../../domain/repositories/IExperienceRepository';
import { Experience, CreateExperienceInput, UpdateExperienceInput } from '../../../domain/entities/Experience.entity';
import { ExperienceModel } from '../models/Experience.model';

export class ExperienceRepository implements IExperienceRepository {
  async findAll(): Promise<Experience[]> {
    const experiences = await ExperienceModel.find().sort({ startDate: -1 }).lean();
    return experiences.map((exp) => ({
      id: (exp._id as any).toString(),
      position: exp.position,
      company: exp.company,
      companyUrl: exp.companyUrl,
      location: exp.location,
      employmentType: exp.employmentType,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description,
      responsibilities: exp.responsibilities,
      achievements: exp.achievements,
      skillIds: exp.skills.map((id) => id.toString()),
      createdAt: exp.createdAt,
      updatedAt: exp.updatedAt,
    }));
  }

  async findById(id: string): Promise<Experience | null> {
    const exp = await ExperienceModel.findById(id).lean();
    if (!exp) return null;

    return {
      id: (exp._id as any).toString(),
      position: exp.position,
      company: exp.company,
      companyUrl: exp.companyUrl,
      location: exp.location,
      employmentType: exp.employmentType,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description,
      responsibilities: exp.responsibilities,
      achievements: exp.achievements,
      skillIds: exp.skills.map((id) => id.toString()),
      createdAt: exp.createdAt,
      updatedAt: exp.updatedAt,
    };
  }

  async findCurrent(): Promise<Experience[]> {
    const experiences = await ExperienceModel.find({ current: true }).sort({ startDate: -1 }).lean();
    return experiences.map((exp) => ({
      id: (exp._id as any).toString(),
      position: exp.position,
      company: exp.company,
      companyUrl: exp.companyUrl,
      location: exp.location,
      employmentType: exp.employmentType,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description,
      responsibilities: exp.responsibilities,
      achievements: exp.achievements,
      skillIds: exp.skills.map((id) => id.toString()),
      createdAt: exp.createdAt,
      updatedAt: exp.updatedAt,
    }));
  }

  async create(data: CreateExperienceInput): Promise<Experience> {
    const exp = new ExperienceModel({
      ...data,
      skills: data.skillIds || [],
    });
    await exp.save();

    return {
      id: (exp._id as any).toString(),
      position: exp.position,
      company: exp.company,
      companyUrl: exp.companyUrl,
      location: exp.location,
      employmentType: exp.employmentType,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description,
      responsibilities: exp.responsibilities,
      achievements: exp.achievements,
      skillIds: exp.skills.map((id) => id.toString()),
      createdAt: exp.createdAt,
      updatedAt: exp.updatedAt,
    };
  }

  async update(id: string, data: UpdateExperienceInput): Promise<Experience> {
    const updateData: any = { ...data };
    if (data.skillIds) {
      updateData.skills = data.skillIds;
      delete updateData.skillIds;
    }

    const exp = await ExperienceModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!exp) throw new Error('Experience not found');

    return {
      id: (exp._id as any).toString(),
      position: exp.position,
      company: exp.company,
      companyUrl: exp.companyUrl,
      location: exp.location,
      employmentType: exp.employmentType,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description,
      responsibilities: exp.responsibilities,
      achievements: exp.achievements,
      skillIds: exp.skills.map((id) => id.toString()),
      createdAt: exp.createdAt,
      updatedAt: exp.updatedAt,
    };
  }

  async delete(id: string): Promise<boolean> {
    const result = await ExperienceModel.findByIdAndDelete(id);
    return !!result;
  }
}
