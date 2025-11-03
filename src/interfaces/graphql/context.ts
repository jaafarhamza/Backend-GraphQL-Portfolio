import { JwtPayload } from '../../infrastructure/security/JwtService';
import { ProfileService } from '../../application/services/ProfileService';
import { AuthService } from '../../application/services/AuthService';

export interface GraphQLContext {
  user?: JwtPayload;
  profileService: ProfileService;
  authService: AuthService;
}
