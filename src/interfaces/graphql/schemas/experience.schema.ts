export const experienceTypeDefs = `#graphql
  enum EmploymentType {
    full_time
    part_time
    contract
    freelance
    internship
  }

  type Experience {
    id: ID!
    position: String!
    company: String!
    companyUrl: String
    location: String
    employmentType: EmploymentType!
    startDate: String!
    endDate: String
    current: Boolean!
    description: String!
    responsibilities: [String!]!
    achievements: [String!]!
    skills: [Skill!]!
    createdAt: String!
    updatedAt: String!
  }

  input CreateExperienceInput {
    position: String!
    company: String!
    companyUrl: String
    location: String
    employmentType: EmploymentType!
    startDate: String!
    endDate: String
    current: Boolean
    description: String!
    responsibilities: [String!]
    achievements: [String!]
    skillIds: [ID!]
  }

  input UpdateExperienceInput {
    position: String
    company: String
    companyUrl: String
    location: String
    employmentType: EmploymentType
    startDate: String
    endDate: String
    current: Boolean
    description: String
    responsibilities: [String!]
    achievements: [String!]
    skillIds: [ID!]
  }

  type Query {
    experiences: [Experience!]!
    experience(id: ID!): Experience
    currentExperiences: [Experience!]!
  }

  type Mutation {
    createExperience(input: CreateExperienceInput!): Experience!
    updateExperience(id: ID!, input: UpdateExperienceInput!): Experience!
    deleteExperience(id: ID!): Boolean!
  }
`;
