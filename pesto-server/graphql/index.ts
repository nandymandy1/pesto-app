import { makeExecutableSchema } from "@graphql-tools/schema";

import isAuthDirectiveTransformer from "./directives/isAuth";

import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

import type { GraphQLSchema } from "graphql";

let schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });

schema = isAuthDirectiveTransformer(schema, "isAuth");

export default schema;
