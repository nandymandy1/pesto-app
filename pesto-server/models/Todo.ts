import { Document, model, Schema } from "mongoose";

export type TTodoAttrs = {
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  updatedAt: Date;
  createdAt: Date;
};

type TTodoFixedAttrs = {
  user?: string;
};

export type ITodo = TTodoAttrs & Document & TTodoFixedAttrs & {};

const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
      default: "TODO",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = model<ITodo>("todos", TodoSchema);

export type TodoModel = typeof Todo & {};

export default Todo;
