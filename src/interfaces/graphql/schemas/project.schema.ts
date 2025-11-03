export const projectTypeDefs = `#graphql
  enum ProjectStatus {
    draft
    published
    archived
  }

  type Project {
    id: ID!
    title: String!
    slug: String!
    description: String!
    skills: [Skill!]!
    repoUrl: String
    liveUrl: String
    imageUrls: [String!]!
    startDate: String
    endDate: String
    featured: Boolean!
    status: ProjectStatus!
    createdAt: String!
    updatedAt: String!
  }

  input CreateProjectInput {
    title: String!
    slug: String!
    description: String!
    skillIds: [ID!]
    repoUrl: String
    liveUrl: String
    imageUrls: [String!]
    startDate: String
    endDate: String
    featured: Boolean
    status: ProjectStatus
  }

  input UpdateProjectInput {
    title: String
    slug: String
    description: String
    skillIds: [ID!]
    repoUrl: String
    liveUrl: String
    imageUrls: [String!]
    startDate: String
    endDate: String
    featured: Boolean
    status: ProjectStatus
  }

  type Query {
    projects: [Project!]!
    project(id: ID!): Project
    projectBySlug(slug: String!): Project
    featuredProjects: [Project!]!
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project!
    updateProject(id: ID!, input: UpdateProjectInput!): Project!
    deleteProject(id: ID!): Boolean!
  }
`;
