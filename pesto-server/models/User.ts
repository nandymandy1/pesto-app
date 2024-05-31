import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import pick from "lodash/pick";
import {
  CallbackWithoutResultAndOptionalError,
  Document,
  model,
  Schema,
} from "mongoose";

import { APP_SECRET, R_APP_SECRET } from "../config";

const PICK_VALUES = [
  "_id",
  "username",
  "email",
  "firstName",
  "lastName",
] as const;

export type TUserAttrs = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

type TUserFixedAttrs = {
  _id: string;
  comparePassword(password: string): Promise<boolean>;
  getUserInfo(): Record<(typeof PICK_VALUES)[number], string>;
  issueRefreshToken(): Promise<string>;
  signToken(): Promise<string>;
};

export type IUser = Document & TUserAttrs & TUserFixedAttrs & {};

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre(
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
    const user = this;
    if (!user.isModified("password")) return next();
    user.password = await hash(user.password, 10);
    next();
  }
);

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await compare(password, this.password);
};

UserSchema.methods.signToken = function (): string {
  const payload = pick(this, PICK_VALUES);
  return sign(payload, APP_SECRET, { expiresIn: "1 day" });
};

UserSchema.methods.issueRefreshToken = function (): string {
  const payload = pick(this, ["_id"]);
  return sign(payload, R_APP_SECRET, { expiresIn: "1 year" });
};

UserSchema.methods.getUserInfo = function (): any {
  return pick(this, PICK_VALUES);
};

const User = model<IUser>("users", UserSchema);

export type UserModel = typeof User;

export default User;
