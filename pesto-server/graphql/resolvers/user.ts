import { GraphQLError } from "graphql";
import type { IUser, UserModel, TUserAttrs } from "../../models/User";

const userResolver = {
  Query: {
    getAuthUser: async (_: any, __: any, { user }: { user: IUser }) => user,
    authenticateUser: async (
      _: any,
      { username, password }: { username: string; password: string },
      { User }: { User: UserModel }
    ) => {
      try {
        let user = await User.findOne({ username });
        if (!user) {
          return new GraphQLError("Username not found.", {
            extensions: {
              code: "NOT FOUND",
            },
          });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return new GraphQLError("Incorrect Password.", {
            extensions: {
              code: "BAD REQUEST",
            },
          });
        }

        const token = user.signToken();
        const refreshToken = user.issueRefreshToken();
        return { token, user, refreshToken };
      } catch (err) {
        throw new GraphQLError("Something went wrong.", {
          extensions: {
            code: "INTERNAL SERVER ERROR",
          },
        });
      }
    },
  },
  Mutation: {
    registerUser: async (
      _: any,
      { newUser }: { newUser: TUserAttrs },
      { User }: { User: UserModel }
    ) => {
      try {
        const { username, email } = newUser;
        let user = await User.findOne({ email });

        if (user) {
          return new GraphQLError("Email is already registered.", {
            extensions: {
              code: "BAD REQUEST",
            },
          });
        }

        user = await User.findOne({ username });
        if (user) {
          return new GraphQLError("Username is already taken.", {
            extensions: {
              code: "BAD REQUEST",
            },
          });
        }

        user = await User.create({ ...newUser });
        const token = user.signToken();
        const refreshToken = user.issueRefreshToken();
        return { token, user, refreshToken };
      } catch (err) {
        throw new GraphQLError("Something went wrong.", {
          extensions: {
            code: "INTERNAL SERVER ERROR",
          },
        });
      }
    },
  },
};

export default userResolver;
