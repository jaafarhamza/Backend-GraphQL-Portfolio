import { Profile, CreateProfileInput, UpdateProfileInput } from '../entities/Profile.entity';

export interface IProfileRepository {
  findOne(): Promise<Profile | null>;
  create(data: CreateProfileInput): Promise<Profile>;
  update(data: UpdateProfileInput): Promise<Profile>;
  delete(): Promise<boolean>;
}
