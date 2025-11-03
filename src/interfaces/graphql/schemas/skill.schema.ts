export const skillTypeDefs = `#graphql
  enum SkillCategory {
    language
    framework
    library
    tool
    database
    other
  }

  type Skill {
    id: ID!
    name: String!
    category: SkillCategory!
    level: Int
    icon: String
    createdAt: String!
    updatedAt: String!
  }

  input CreateSkillInput {
    name: String!
    category: SkillCategory!
    level: Int
    icon: String
  }

  input UpdateSkillInput {
    name: String
    category: SkillCategory
    level: Int
    icon: String
  }

  type Query {
    skills: [Skill!]!
    skill(id: ID!): Skill
    skillsByCategory(category: SkillCategory!): [Skill!]!
  }

  type Mutation {
    createSkill(input: CreateSkillInput!): Skill!
    updateSkill(id: ID!, input: UpdateSkillInput!): Skill!
    deleteSkill(id: ID!): Boolean!
  }
`;
