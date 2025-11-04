import mongoose, { Schema, Document } from 'mongoose';
import { User, UserRole } from '../../../domain/entities/User.entity';

export interface UserDocument extends Omit<User, 'id'>, Document {}

const UserSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.VISITOR,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
