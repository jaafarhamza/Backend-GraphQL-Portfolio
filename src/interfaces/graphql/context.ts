import { JwtPayload } from '../../infrastructure/security/JwtService';
import { ProfileService } from '../../application/services/ProfileService';
import { AuthService } from '../../application/services/AuthService';
import { SkillService } from '../../application/services/SkillService';
import { ProjectService } from '../../application/services/ProjectService';
import { ExperienceService } from '../../application/services/ExperienceService';

export interface GraphQLContext {
  user?: JwtPayload;
  profileService: ProfileService;
  authService: AuthService;
  skillService: SkillService;
  projectService: ProjectService;
  experienceService: ExperienceService;
}
