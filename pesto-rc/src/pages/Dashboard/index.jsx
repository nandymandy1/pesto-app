import { Typography } from "antd";
import AddTodo from "@components/Dashboard/Todo/AddTodo";
import Todos from "@components/Dashboard/Todo/Todos";

const Dashboard = () => {
  return (
    <section className="flex flex-col gap-5">
      <article className="flex flex-col gap-3">
        <Typography.Title level={2}>Your Todos</Typography.Title>
      </article>
      <article className="flex flex-col gap-3">
        <div className="bg-white w-full rounded-md shadow-md p-5 flex flex-col gap-3">
          <AddTodo />
          <Todos />
        </div>
      </article>
    </section>
  );
};

export default Dashboard;
