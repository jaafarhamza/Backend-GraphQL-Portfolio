import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User.entity';
import { UserModel } from '../models/User.model';

export class UserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username }).lean();
    if (!user) return null;

    return {
      id: (user._id as any).toString(),
      username: user.username,
      passwordHash: user.passwordHash,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id).lean();
    if (!user) return null;

    return {
      id: (user._id as any).toString(),
      username: user.username,
      passwordHash: user.passwordHash,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async create(username: string, passwordHash: string, role: string): Promise<User> {
    const user = new UserModel({ username, passwordHash, role });
    await user.save();

    return {
      id: (user._id as any).toString(),
      username: user.username,
      passwordHash: user.passwordHash,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
