import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { UserRole } from '../../domain/entities/User.entity';

export interface JwtPayload {
  sub: string;
  username: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export class JwtService {
  private readonly secret: string;

  constructor() {
    if (!env.jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    this.secret = env.jwtSecret;
  }

  sign(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload as object, this.secret, { expiresIn: '7d' });
  }

  verify(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.secret) as JwtPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  decode(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch {
      return null;
    }
  }
}
