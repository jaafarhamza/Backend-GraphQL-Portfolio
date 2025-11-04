import {
  Experience,
  CreateExperienceInput,
  UpdateExperienceInput,
} from '../entities/Experience.entity';

export interface IExperienceRepository {
  findAll(): Promise<Experience[]>;
  findById(id: string): Promise<Experience | null>;
  findCurrent(): Promise<Experience[]>;
  create(data: CreateExperienceInput): Promise<Experience>;
  update(id: string, data: UpdateExperienceInput): Promise<Experience>;
  delete(id: string): Promise<boolean>;
}
