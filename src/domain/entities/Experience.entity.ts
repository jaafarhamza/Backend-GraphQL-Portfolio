export enum EmploymentType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship',
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  companyUrl?: string;
  location?: string;
  employmentType: EmploymentType;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  skillIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExperienceInput {
  position: string;
  company: string;
  companyUrl?: string;
  location?: string;
  employmentType: EmploymentType;
  startDate: Date;
  endDate?: Date;
  current?: boolean;
  description: string;
  responsibilities?: string[];
  achievements?: string[];
  skillIds?: string[];
}

export interface UpdateExperienceInput {
  position?: string;
  company?: string;
  companyUrl?: string;
  location?: string;
  employmentType?: EmploymentType;
  startDate?: Date;
  endDate?: Date;
  current?: boolean;
  description?: string;
  responsibilities?: string[];
  achievements?: string[];
  skillIds?: string[];
}
