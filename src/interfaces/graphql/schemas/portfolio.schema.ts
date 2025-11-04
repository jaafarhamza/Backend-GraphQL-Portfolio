export const portfolioTypeDefs = `#graphql
  type Portfolio {
    profile: Profile
    projects: [Project!]!
    skills: [Skill!]!
    experiences: [Experience!]!
  }

  type Query {
    getPortfolio: Portfolio!
  }
`;
