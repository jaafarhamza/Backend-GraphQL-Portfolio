import mongoose, { Schema, Document } from 'mongoose';
import { Project, ProjectStatus } from '../../../domain/entities/Project.entity';

export interface ProjectDocument extends Omit<Project, 'id' | 'skillIds'>, Document {
  skills: mongoose.Types.ObjectId[];
}

const ProjectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    repoUrl: { type: String },
    liveUrl: { type: String },
    imageUrls: { type: [String], default: [] },
    startDate: { type: Date },
    endDate: { type: Date },
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.DRAFT,
    },
  },
  {
    timestamps: true,
    collection: 'projects',
  }
);

ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ status: 1 });

export const ProjectModel = mongoose.model<ProjectDocument>('Project', ProjectSchema);
