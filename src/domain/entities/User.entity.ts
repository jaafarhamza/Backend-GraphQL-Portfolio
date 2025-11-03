export enum UserRole {
  ADMIN = 'admin',
  VISITOR = 'visitor',
}

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
