import { gql } from "@apollo/client";

/**
 * `AUTHENTICATE_QUERY` is a GraphQL query that authenticates a user with the provided username and password.
 *
 * @query
 * @param {String} $username - The username of the user.
 * @param {String} $password - The password of the user.
 * @returns {Object} The authentication token and user details including _id, email, username, firstName, and lastName.
 */
export const AUTHENTICATE_QUERY = gql`
  query AuthenticateUser($username: String!, $password: String!) {
    authenticateUser(username: $username, password: $password) {
      token
      user {
        _id
        email
        username
        firstName
        lastName
      }
    }
  }
`;

/**
 * `REGISTER_MUTATION` is a GraphQL mutation that registers a new user with the provided user input.
 *
 * @mutation
 * @param {UserInput} $newUser - The input object containing user details for registration.
 * @returns {Object} The registered user details including _id, email, username, firstName, lastName, and the authentication token.
 */
export const REGISTER_MUTATION = gql`
  mutation Mutation($newUser: UserInput!) {
    registerUser(newUser: $newUser) {
      user {
        _id
        email
        username
        firstName
        lastName
      }
      token
    }
  }
`;

/**
 * `GET_AUTH_USER_QUERY` is a GraphQL query that retrieves the authenticated user's details.
 *
 * @query
 * @returns {Object} The authenticated user's details including _id, email, username, firstName, and lastName.
 */
export const GET_AUTH_USER_QUERY = gql`
  query Query {
    getAuthUser {
      _id
      email
      username
      firstName
      lastName
    }
  }
`;
