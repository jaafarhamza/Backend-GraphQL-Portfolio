import { GraphQLContext } from '../../context';
import { requireAdmin } from '../../../../middleware/authMiddleware';
import { CreateProfileInput, UpdateProfileInput } from '../../../../domain/entities/Profile.entity';

export const profileMutations = {
  createProfile: async (
    _: any,
    { input }: { input: CreateProfileInput },
    context: GraphQLContext
  ) => {
    requireAdmin(context);
    return context.profileService.createProfile(input);
  },

  updateProfile: async (
    _: any,
    { input }: { input: UpdateProfileInput },
    context: GraphQLContext
  ) => {
    requireAdmin(context);
    return context.profileService.updateProfile(input);
  },

  deleteProfile: async (
    _: any,
    __: any,
    context: GraphQLContext
  ) => {
    requireAdmin(context);
    return context.profileService.deleteProfile();
  },
};
