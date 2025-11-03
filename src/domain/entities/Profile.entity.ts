export interface SocialLink {
  platform: string;
  url: string;
}

export interface Profile {
  id: string;
  fullName: string;
  title: string;
  bio?: string;
  location?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  resumeUrl?: string;
  socialLinks: SocialLink[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProfileInput {
  fullName: string;
  title: string;
  bio?: string;
  location?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  resumeUrl?: string;
  socialLinks?: SocialLink[];
}

export interface UpdateProfileInput {
  fullName?: string;
  title?: string;
  bio?: string;
  location?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  resumeUrl?: string;
  socialLinks?: SocialLink[];
}
