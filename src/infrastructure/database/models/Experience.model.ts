import mongoose, { Schema, Document } from 'mongoose';
import { Experience, EmploymentType } from '../../../domain/entities/Experience.entity';

export interface ExperienceDocument extends Omit<Experience, 'id' | 'skillIds'>, Document {
  skills: mongoose.Types.ObjectId[];
}

const ExperienceSchema = new Schema<ExperienceDocument>(
  {
    position: { type: String, required: true },
    company: { type: String, required: true },
    companyUrl: { type: String },
    location: { type: String },
    employmentType: {
      type: String,
      enum: Object.values(EmploymentType),
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  },
  {
    timestamps: true,
    collection: 'experiences',
  }
);

ExperienceSchema.index({ company: 1 });
ExperienceSchema.index({ current: 1 });
ExperienceSchema.index({ startDate: -1 });

export const ExperienceModel = mongoose.model<ExperienceDocument>('Experience', ExperienceSchema);
