import { APP_SECRET } from "../../config";
import { verify } from "jsonwebtoken";

import { GraphQLError } from "graphql";

import type { IUser, UserModel } from "../../models/User";

type TTokenUser = {
  user: null | IUser;
  isAuth: boolean;
};

const NO_USER_FROM_TOKEN: TTokenUser = {
  user: null,
  isAuth: false,
};

export const getUserFromAuthToken = async (
  tokenWithBearer: string,
  User: UserModel
): Promise<TTokenUser> => {
  if (!tokenWithBearer || tokenWithBearer === "") {
    return NO_USER_FROM_TOKEN;
  }

  try {
    let token = tokenWithBearer.split(" ")[1];
    const decodedToken = verify(token, APP_SECRET) as IUser;
    let authUser = await User.findById(decodedToken._id);

    return {
      isAuth: true,
      user: authUser,
    };
  } catch (err) {
    return NO_USER_FROM_TOKEN;
  }
};

const handleAuth = async (
  token: string,
  User: UserModel
): Promise<TTokenUser> => {
  const { isAuth, user } = await getUserFromAuthToken(token, User);

  if (!isAuth) {
    throw new GraphQLError(
      "You are not authenticated to access this resource.",
      {
        extensions: {
          code: "UN_AUTHENTICATED",
        },
      }
    );
  }

  return { user, isAuth };
};

export default handleAuth;
