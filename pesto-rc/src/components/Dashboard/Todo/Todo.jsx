import { useMutation } from "@apollo/client";
import {
  DELETE_TODO,
  GET_ALL_TODOS_OF_USER,
  UPDATE_TODO_STATUS,
} from "@graphql/Todo";
import useToggle from "@hooks/useToggle";
import { Avatar, Button, notification, Popconfirm, Typography } from "antd";
import clsx from "clsx";
import { useMemo } from "react";

import { TODO_MAPPER } from "./TodoMapper";

/**
 * `Todo` is a functional React component that displays a single todo item with options to update its status or delete it.
 *
 * The component utilizes Apollo Client's `useMutation` hook to perform the `UPDATE_TODO_STATUS` and `DELETE_TODO` mutations.
 *
 * - The todo item displays its title, description, and status.
 * - Users can toggle between showing more or less of the description.
 * - Status updates and deletion of the todo item trigger corresponding mutations and update the Apollo cache.
 * - Success and error notifications are shown based on the result of the mutations.
 *
 * The component also displays action buttons for updating the status and deleting the todo, with confirmation for deletion.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the todo item.
 * @param {string} props.description - The description of the todo item.
 * @param {string} props._id - The unique identifier of the todo item.
 * @param {Object} todo - The remaining properties of the todo item.
 * @returns {JSX.Element} The rendered `Todo` component.
 */
const Todo = ({ title, description, _id, ...todo }) => {
  const [showMore, toggleShowMore] = useToggle();
  const details = useMemo(() => TODO_MAPPER[todo.status], [todo]);

  const [updateMutation, { loading }] = useMutation(UPDATE_TODO_STATUS, {
    onCompleted: (
      { updateTodoById },
      {
        variables: {
          updatedTodo: { status },
        },
      }
    ) => {
      notification.success({
        message: (
          <Typography.Title level={4} className="text-[#229954]">
            {updateTodoById.message}
          </Typography.Title>
        ),
        description: clsx({
          "Task is moved to todo list": status === "TODO",
          "Task is successfully marked completed": status === "DONE",
          "Task is successfully moved to in progress": status === "IN_PROGRESS",
        }),
      });
    },
    onError: () => {
      notification.error({
        message: (
          <Typography.Title level={4} className="text-[#229954]">
            Task didn't move
          </Typography.Title>
        ),
        description: "Unable to update the status of todo.",
      });
    },
    update: (cache, { data: { updateTodoById } }) => {
      if (updateTodoById.success) {
        const { getAllTodosByStatus } = cache.readQuery({
          query: GET_ALL_TODOS_OF_USER,
          variables: { status: "" },
        });

        const updatedTodos = getAllTodosByStatus.map((todo) =>
          todo._id === updateTodoById.todo._id ? updateTodoById.todo : todo
        );

        cache.writeQuery({
          query: GET_ALL_TODOS_OF_USER,
          variables: { status: "" },
          data: {
            getAllTodosByStatus: updatedTodos,
          },
        });
      }
    },
  });

  const [deleteMutation, { loading: deleting }] = useMutation(DELETE_TODO, {
    onCompleted: () => {
      notification.success({
        message: (
          <Typography.Title level={4} className="text-[#229954]">
            Todo Deleted
          </Typography.Title>
        ),
        description: "Todo is deleted successfully.",
      });
    },
    onError: () => {
      notification.error({
        message: (
          <Typography.Title level={4} className="text-[#229954]">
            Todo Not Deleted
          </Typography.Title>
        ),
        description: "Unable to delete the todo.",
      });
    },
    update: (cache, { data: { deleteTodoById } }) => {
      if (deleteTodoById.success) {
        const { getAllTodosByStatus } = cache.readQuery({
          query: GET_ALL_TODOS_OF_USER,
          variables: { status: "" },
        });
        const updatedTodos = getAllTodosByStatus.filter(
          (todo) => todo._id !== deleteTodoById.id
        );
        cache.writeQuery({
          query: GET_ALL_TODOS_OF_USER,
          variables: { status: "" },
          data: {
            getAllTodosByStatus: updatedTodos,
          },
        });
      }
    },
  });

  const handleAction = (type) => {
    const actions = {
      markComplete: {
        mutation: updateMutation,
        variables: { id: _id, updatedTodo: { status: "DONE" } },
      },
      moveToProgress: {
        mutation: updateMutation,
        variables: { id: _id, updatedTodo: { status: "IN_PROGRESS" } },
      },
      moveToTodo: {
        mutation: updateMutation,
        variables: { id: _id, updatedTodo: { status: "TODO" } },
      },
      delete: { mutation: deleteMutation, variables: { id: _id } },
    };

    const action = actions[type];
    if (action) {
      action.mutation({ variables: action.variables });
    }
  };

  return (
    <div
      className={clsx(
        "w-full bg-white shadow-md p-3 border-solid border-[1px] border-[#e7e7e7]",
        {
          "bg-[#f6f6f6] animate-pulse": loading || deleting,
        }
      )}
    >
      <div className="flex items-center gap-2 py-2">
        <Avatar className={clsx(details?.color)}>{details?.Icon}</Avatar>
        <h3 className="text-[20px] font-bold">{title}</h3>
      </div>
      <Typography.Paragraph className="my-2">
        <Typography.Text className={clsx({ "line-clamp-2": !showMore })}>
          {description}
        </Typography.Text>{" "}
        <Typography.Text
          onClick={toggleShowMore}
          className="font-[600] cursor-pointer"
        >
          {!showMore ? "Show More +" : "Show Less -"}
        </Typography.Text>
      </Typography.Paragraph>
      <div className="w-full flex items-center gap-2 mt-3 justify-end">
        {(details?.actions || []).map((action) => {
          if (action.type === "delete") {
            return (
              <Popconfirm
                title="Are you sure?"
                okButtonProps={{ loading: deleting }}
                onConfirm={() => handleAction(action.type)}
                description="You are want to delete this todo."
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
            );
          }
          return (
            <Button
              id={action?.text}
              disabled={loading}
              danger={action.type === "delete"}
              onClick={() => handleAction(action.type)}
            >
              {action.text}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
