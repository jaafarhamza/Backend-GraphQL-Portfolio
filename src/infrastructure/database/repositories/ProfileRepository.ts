import { IProfileRepository } from '../../../domain/repositories/IProfileRepository';
import { Profile, CreateProfileInput, UpdateProfileInput } from '../../../domain/entities/Profile.entity';
import { ProfileModel } from '../models/Profile.model';

export class ProfileRepository implements IProfileRepository {
  async findOne(): Promise<Profile | null> {
    const profile = await ProfileModel.findOne().lean();
    if (!profile) return null;

    return {
      id: profile._id.toString(),
      fullName: profile.fullName,
      title: profile.title,
      bio: profile.bio,
      location: profile.location,
      email: profile.email,
      phone: profile.phone,
      avatarUrl: profile.avatarUrl,
      resumeUrl: profile.resumeUrl,
      socialLinks: profile.socialLinks,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  async create(data: CreateProfileInput): Promise<Profile> {
    const profile = new ProfileModel(data);
    await profile.save();

    return {
      id: (profile._id as any).toString(),
      fullName: profile.fullName,
      title: profile.title,
      bio: profile.bio,
      location: profile.location,
      email: profile.email,
      phone: profile.phone,
      avatarUrl: profile.avatarUrl,
      resumeUrl: profile.resumeUrl,
      socialLinks: profile.socialLinks,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  async update(data: UpdateProfileInput): Promise<Profile> {
    let profile = await ProfileModel.findOne();

    if (!profile) {
      throw new Error('Profile not found. Please create a profile first.');
    }

    Object.assign(profile, data);
    await profile.save();

    return {
      id: (profile._id as any).toString(),
      fullName: profile.fullName,
      title: profile.title,
      bio: profile.bio,
      location: profile.location,
      email: profile.email,
      phone: profile.phone,
      avatarUrl: profile.avatarUrl,
      resumeUrl: profile.resumeUrl,
      socialLinks: profile.socialLinks,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  async delete(): Promise<boolean> {
    const result = await ProfileModel.deleteOne({});
    return result.deletedCount > 0;
  }
}
