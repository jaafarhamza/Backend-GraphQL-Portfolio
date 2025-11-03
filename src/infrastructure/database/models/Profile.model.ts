import mongoose, { Schema, Document } from 'mongoose';
import { Profile, SocialLink } from '../../../domain/entities/Profile.entity';

export interface ProfileDocument extends Omit<Profile, 'id'>, Document {}

const SocialLinkSchema = new Schema<SocialLink>(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const ProfileSchema = new Schema<ProfileDocument>(
  {
    fullName: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String },
    location: { type: String },
    email: { type: String },
    phone: { type: String },
    avatarUrl: { type: String },
    resumeUrl: { type: String },
    socialLinks: { type: [SocialLinkSchema], default: [] },
  },
  {
    timestamps: true,
    collection: 'profiles',
  }
);

export const ProfileModel = mongoose.model<ProfileDocument>('Profile', ProfileSchema);
