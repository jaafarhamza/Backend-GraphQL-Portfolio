import bcrypt from 'bcryptjs';

export class PasswordHasher {
  private readonly saltRounds: number;

  constructor() {
    this.saltRounds = 10;
  }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
