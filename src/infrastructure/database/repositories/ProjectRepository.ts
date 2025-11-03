import { IProjectRepository } from '../../../domain/repositories/IProjectRepository';
import { Project, CreateProjectInput, UpdateProjectInput } from '../../../domain/entities/Project.entity';
import { ProjectModel } from '../models/Project.model';

export class ProjectRepository implements IProjectRepository {
  async findAll(): Promise<Project[]> {
    const projects = await ProjectModel.find().sort({ createdAt: -1 }).lean();
    return projects.map((project) => ({
      id: (project._id as any).toString(),
      title: project.title,
      slug: project.slug,
      description: project.description,
      skillIds: project.skills.map((id) => id.toString()),
      repoUrl: project.repoUrl,
      liveUrl: project.liveUrl,
      imageUrls: project.imageUrls,
      startDate: project.startDate,
      endDate: project.endDate,
      featured: project.featured,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));
  }

  async findById(id: string): Promise<Project | null> {
    const project = await ProjectModel.findById(id).lean();
    if (!project) return null;

    return {
      id: (project._id as any).toString(),
      title: project.title,
      slug: project.slug,
      description: project.description,
      skillIds: project.skills.map((id) => id.toString()),
      repoUrl: project.repoUrl,
      liveUrl: project.liveUrl,
      imageUrls: project.imageUrls,
      startDate: project.startDate,
      endDate: project.endDate,
      featured: project.featured,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  async findBySlug(slug: string): Promise<Project | null> {
    const project = await ProjectModel.findOne({ slug }).lean();
    if (!project) return null;

    return {
      id: (project._id as any).toString(),
      title: project.title,
      slug: project.slug,
      description: project.description,
      skillIds: project.skills.map((id) => id.toString()),
      repoUrl: project.repoUrl,
      liveUrl: project.liveUrl,
      imageUrls: project.imageUrls,
      startDate: project.startDate,
      endDate: project.endDate,
      featured: project.featured,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  async findFeatured(): Promise<Project[]> {
    const projects = await ProjectModel.find({ featured: true }).sort({ createdAt: -1 }).lean();
    return projects.map((project) => ({
      id: (project._id as any).toString(),
      title: project.title,
      slug: project.slug,
      description: project.description,
      skillIds: project.skills.map((id) => id.toString()),
      repoUrl: project.repoUrl,
      liveUrl: project.liveUrl,
      imageUrls: project.imageUrls,
      startDate: project.startDate,
      endDate: project.endDate,
      featured: project.featured,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));
  }

  async create(data: CreateProjectInput): Promise<Project> {
    const project = new ProjectModel({
      ...data,
      skills: data.skillIds || [],
    });
    await project.save();

    return {
      id: (project._id as any).toString(),
      title: project.title,
      slug: project.slug,
      description: project.description,
      skillIds: project.skills.map((id) => id.toString()),
      repoUrl: project.repoUrl,
      liveUrl: project.liveUrl,
      imageUrls: project.imageUrls,
      startDate: project.startDate,
      endDate: project.endDate,
      featured: project.featured,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  async update(id: string, data: UpdateProjectInput): Promise<Project> {
    const updateData: any = { ...data };
    if (data.skillIds) {
      updateData.skills = data.skillIds;
      delete updateData.skillIds;
    }

    const project = await ProjectModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!project) throw new Error('Project not found');

    return {
      id: (project._id as any).toString(),
      title: project.title,
      slug: project.slug,
      description: project.description,
      skillIds: project.skills.map((id) => id.toString()),
      repoUrl: project.repoUrl,
      liveUrl: project.liveUrl,
      imageUrls: project.imageUrls,
      startDate: project.startDate,
      endDate: project.endDate,
      featured: project.featured,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProjectModel.findByIdAndDelete(id);
    return !!result;
  }
}
