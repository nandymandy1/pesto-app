import { useQuery } from "@apollo/client";
import { GET_ALL_TODOS_OF_USER } from "@graphql/Todo";
import { Button, Col, Row, Typography, Result, Segmented } from "antd";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Todo from "./Todo";
import { PiCircleNotch } from "react-icons/pi";

const FILTER_OPTS = [
  { label: "All", value: "" },
  { label: "Todo", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "DONE" },
];

/**
 * `Todos` is a functional React component that displays a list of todos categorized by their status:
 * "Todo", "In Progress", and "Completed". It uses Apollo Client's `useQuery` hook to fetch todos
 * based on the current status filter.
 *
 * The component also provides the ability to filter todos by status using URL search parameters.
 * It handles loading and error states, displaying appropriate messages and retry options.
 *
 * - `searchParams`: React Router's `useSearchParams` hook to manage URL query parameters.
 * - `status`: The current status filter extracted from URL query parameters.
 * - `data`, `loading`, `error`, `refetch`: Apollo Client's `useQuery` hook result for fetching todos.
 * - `sortedTodos`: A memoized object containing todos sorted by their status.
 * - `handleChange`: Updates the status filter in the URL query parameters.
 *
 * @returns {JSX.Element} The rendered `Todos` component.
 */
const Todos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("filter") || "";

  const { data, loading, error, refetch } = useQuery(GET_ALL_TODOS_OF_USER, {
    variables: { status },
  });

  const sortedTodos = useMemo(() => {
    const todos = data?.getAllTodosByStatus || [];

    return {
      todo: todos.filter((todo) => todo.status === "TODO"),
      done: todos.filter((todo) => todo.status === "DONE"),
      inProgress: todos.filter((todo) => todo.status === "IN_PROGRESS"),
    };
  }, [data, status]);

  const handleChange = (value) => {
    setSearchParams(
      (prev) => {
        prev.set("filter", value);
        return prev;
      },
      {
        replace: true,
      }
    );
  };

  if (error) {
    return (
      <Result
        status="error"
        title="Something went wrong."
        subTitle="We are experiencing some server issue due to heavy traffic. Please refresh the page"
        extra={
          <Button
            size="large"
            key="console"
            onClick={() => refetch({ status })}
          >
            Re Try
          </Button>
        }
      />
    );
  }

  if (loading) {
    return (
      <Result
        title="Loading..."
        subTitle="Please wait while we are fetching your todos."
        icon={
          <div className="w-full flex items-center justify-center">
            <PiCircleNotch className="animate-spin" size={30} color="#19181a" />
          </div>
        }
      />
    );
  }

  return (
    <div className="w-full">
      <div className="my-3 w-full flex justify-end">
        <Segmented
          value={status}
          options={FILTER_OPTS}
          onChange={handleChange}
        />
      </div>
      <Row gutter={[16, 16]}>
        {["", "TODO"].includes(status) && (
          <Col span={8}>
            <Typography.Title level={3}>Todo</Typography.Title>
            <div className="flex flex-col gap-3 h-[60vh] overflow-y-scroll p-2 bg-[#f6f6f6]">
              {sortedTodos?.todo.map((todo) => (
                <Todo key={todo._id} {...todo} />
              ))}
            </div>
          </Col>
        )}
        {["", "IN_PROGRESS"].includes(status) && (
          <Col span={8}>
            <Typography.Title level={3}>In Progress</Typography.Title>
            <div className="flex flex-col gap-3 h-[60vh] overflow-y-scroll p-2 bg-[#f6f6f6]">
              {sortedTodos?.inProgress.map((todo) => (
                <Todo key={todo._id} {...todo} />
              ))}
            </div>
          </Col>
        )}
        {["", "DONE"].includes(status) && (
          <Col span={8}>
            <Typography.Title level={3}>Completed</Typography.Title>
            <div className="flex flex-col gap-3 h-[60vh] overflow-y-scroll p-2 bg-[#f6f6f6]">
              {sortedTodos?.done.map((todo) => (
                <Todo key={todo._id} {...todo} />
              ))}
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Todos;
