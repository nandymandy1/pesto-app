import gql from "graphql-tag";

const user = gql`
  type User {
    _id: ID!
    email: String!
    username: String!
    firstName: String!
    lastName: String!
  }

  type AuthResponse {
    user: User!
    token: String!
    refreshToken: String!
  }

  type Query {
    # Get authenticated User By Token
    getAuthUser: User! @isAuth
    # Authenticate user by Username and Password
    authenticateUser(username: String!, password: String!): AuthResponse!
  }

  type Mutation {
    # Register new user user with user crendentials
    registerUser(newUser: UserInput!): AuthResponse!
  }

  input UserInput {
    email: String!
    firstName: String!
    lastName: String!
    username: String!
    password: String!
  }
`;

export default user;
