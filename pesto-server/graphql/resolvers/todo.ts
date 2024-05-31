import { GraphQLError } from "graphql";
import type { IUser } from "../../models/User";
import type { TodoModel, TTodoAttrs, ITodo } from "../../models/Todo";

type TContext = { Todo: TodoModel; user: IUser };

type TTodoWithUser = ITodo & { user: IUser };

const handleErrors =
  (fn: Function) =>
  async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (err) {
      console.error("HERE_ERR", err);
      throw new GraphQLError("Something went wrong", {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  };

const formatTodoResponse = (todo: TTodoWithUser & any) => ({
  ...todo._doc,
  createdAt: todo.createdAt.toISOString(),
  updatedAt: todo.updatedAt.toISOString(),
});

const todoResolver = {
  Query: {
    getAllTodosByStatus: handleErrors(
      async (
        _: any,
        { status = "" }: { status?: "" | "TODO" | "IN_PROGRESS" | "DONE" },
        { Todo, user }: TContext
      ) => {
        const filter: any = { user: user?._id.toString() };
        if (status) filter.status = status;

        const todos = (await Todo.find(filter).populate(
          "user"
        )) as TTodoWithUser[];
        return todos.map(formatTodoResponse);
      }
    ),
  },
  Mutation: {
    createTodo: handleErrors(
      async (
        _: any,
        { newTodo }: { newTodo: TTodoAttrs },
        { Todo, user }: TContext
      ) => {
        const todo = await Todo.create({
          ...newTodo,
          user: user?._id.toString(),
        });
        const populatedTodo = (await Todo.findById(todo._id).populate(
          "user"
        )) as TTodoWithUser;

        return {
          todo: formatTodoResponse(populatedTodo),
          success: true,
          message: "Todo Created Successfully.",
        };
      }
    ),
    deleteTodoById: handleErrors(
      async (_: any, { id }: { id: string }, { Todo, user }: TContext) => {
        const todo = await Todo.findOne({
          _id: id,
          user: user?._id.toString(),
        });

        if (!todo) {
          throw new GraphQLError("Todo not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        await todo.deleteOne();

        return {
          id,
          success: true,
          message: "Todo Deleted Successfully.",
        };
      }
    ),
    updateTodoById: handleErrors(
      async (
        _: any,
        { id, updatedTodo }: { id: string; updatedTodo: ITodo },
        { Todo, user }: TContext
      ) => {
        const todo = await Todo.findOne({
          _id: id,
          user: user?._id.toString(),
        });

        if (!todo) {
          throw new GraphQLError("Todo not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        const updated = (await Todo.findOneAndUpdate(
          { _id: id, user: user?._id.toString() },
          { $set: updatedTodo },
          { new: true, runValidators: true }
        ).populate("user")) as TTodoWithUser;

        return {
          todo: formatTodoResponse(updated),
          success: true,
          message: "Todo updated successfully.",
        };
      }
    ),
  },
};

export default todoResolver;
