export const authTypeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    role: String!
  }

  type LoginResponse {
    token: String!
    user: User!
  }

  type Mutation {
    login(username: String!, password: String!): LoginResponse!
  }
`;
