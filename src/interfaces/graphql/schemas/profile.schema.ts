export const profileTypeDefs = `#graphql
  type SocialLink {
    platform: String!
    url: String!
  }

  type Profile {
    id: ID!
    fullName: String!
    title: String!
    bio: String
    location: String
    email: String
    phone: String
    avatarUrl: String
    resumeUrl: String
    socialLinks: [SocialLink!]!
    createdAt: String!
    updatedAt: String!
  }

  input SocialLinkInput {
    platform: String!
    url: String!
  }

  input CreateProfileInput {
    fullName: String!
    title: String!
    bio: String
    location: String
    email: String
    phone: String
    avatarUrl: String
    resumeUrl: String
    socialLinks: [SocialLinkInput!]
  }

  input UpdateProfileInput {
    fullName: String
    title: String
    bio: String
    location: String
    email: String
    phone: String
    avatarUrl: String
    resumeUrl: String
    socialLinks: [SocialLinkInput!]
  }

  type Query {
    profile: Profile
  }

  type Mutation {
    createProfile(input: CreateProfileInput!): Profile!
    updateProfile(input: UpdateProfileInput!): Profile!
    deleteProfile: Boolean!
  }
`;
