import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import get from "lodash/get";

import { defaultFieldResolver, GraphQLError } from "graphql";

import handleAuth from "./handleAuth";

import type { GraphQLSchema } from "graphql";

const isAuthDirectiveTransformer = (
  schema: GraphQLSchema,
  directiveName: string
): GraphQLSchema => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      try {
        const allDirectives = getDirective(schema, fieldConfig, directiveName);
        const isAuth = get(allDirectives, "0", "");

        if (isAuth) {
          const { resolve = defaultFieldResolver } = fieldConfig;

          fieldConfig.resolve = async (source, args, context, info) => {
            const { User, token } = context;
            const { user, isAuth } = await handleAuth(token, User);

            return await resolve(
              source,
              args,
              {
                User,
                user,
                token,
                isAuth,
                ...context,
              },
              info
            );
          };

          return fieldConfig;
        }
      } catch (err) {
        throw new GraphQLError("Something went wrong.", {
          extensions: {
            code: "INTERNAL SERVER ERROR",
          },
        });
      }
    },
  });
};

export default isAuthDirectiveTransformer;
