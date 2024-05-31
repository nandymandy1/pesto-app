import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { baseURL as uri } from "@constants/index";

/**
 * `httpLink` is the Apollo Client HTTP link that points to the GraphQL endpoint.
 * It uses the base URL from the constants and appends "/graphql".
 *
 * @constant
 * @type {ApolloLink}
 */
const httpLink = createHttpLink({ uri: [uri, "graphql"].join("/") });

/**
 * `authLink` is the Apollo Client context link that attaches the authorization token to the headers
 * of each GraphQL request if the token is available in localStorage.
 *
 * @constant
 * @type {ApolloLink}
 */
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? ["Bearer", token].join(" ") : "",
    },
  };
});

/**
 * `client` is the Apollo Client instance configured with the HTTP link and authorization link,
 * and uses an in-memory cache for caching GraphQL data.
 *
 * @constant
 * @type {ApolloClient}
 */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
