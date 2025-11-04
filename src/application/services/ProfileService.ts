import { IProfileRepository } from '../../domain/repositories/IProfileRepository';
import {
  Profile,
  CreateProfileInput,
  UpdateProfileInput,
} from '../../domain/entities/Profile.entity';

export class ProfileService {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async getProfile(): Promise<Profile | null> {
    return this.profileRepository.findOne();
  }

  async createProfile(data: CreateProfileInput): Promise<Profile> {
    const existingProfile = await this.profileRepository.findOne();

    if (existingProfile) {
      throw new Error('Profile already exists. Use updateProfile to modify it.');
    }

    return this.profileRepository.create(data);
  }

  async updateProfile(data: UpdateProfileInput): Promise<Profile> {
    return this.profileRepository.update(data);
  }

  async deleteProfile(): Promise<boolean> {
    return this.profileRepository.delete();
  }
}
