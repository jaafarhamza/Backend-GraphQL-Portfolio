import mongoose, { Schema, Document } from 'mongoose';
import { Skill, SkillCategory } from '../../../domain/entities/Skill.entity';

export interface SkillDocument extends Omit<Skill, 'id'>, Document {}

const SkillSchema = new Schema<SkillDocument>(
  {
    name: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: Object.values(SkillCategory),
      required: true,
    },
    level: { type: Number, min: 1, max: 5 },
    icon: { type: String },
  },
  {
    timestamps: true,
    collection: 'skills',
  }
);

SkillSchema.index({ name: 1 });
SkillSchema.index({ category: 1 });

export const SkillModel = mongoose.model<SkillDocument>('Skill', SkillSchema);
