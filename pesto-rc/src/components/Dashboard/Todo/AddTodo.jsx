import { useMutation } from "@apollo/client";
import { CREATE_TODO, GET_ALL_TODOS_OF_USER } from "@graphql/Todo";
import useToggle from "@hooks/useToggle";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  Radio,
  Typography,
} from "antd";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";

const TODO_STATUS_OPTS = [
  {
    label: "Todo",
    value: "TODO",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Done",
    value: "DONE",
  },
];

/**
 * `AddTodo` is a functional React component that provides a modal form for creating a new todo item.
 * The form includes fields for the title, description, and status of the todo.
 *
 * The component uses Apollo Client's `useMutation` hook to execute the `CREATE_TODO` mutation and
 * update the Apollo cache with the new todo item.
 *
 * - When the "Add Todo" button is clicked, the modal form is displayed.
 * - The form includes validation rules to ensure that the title and description fields are required.
 * - The status field is a set of radio buttons with three options: "Todo", "In Progress", and "Done".
 * - On form submission, the `createMutation` function is called to create the new todo.
 * - If the mutation is successful, a success notification is displayed and the form is reset.
 * - The Apollo cache is updated with the new todo item to ensure the UI is in sync with the data.
 *
 * The component also provides a "Cancel" button to close the modal and reset the form without creating a new todo.
 *
 * @returns {JSX.Element} The rendered `AddTodo` component.
 */
const AddTodo = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("filter") || "";

  const [todoForm] = Form.useForm();
  const [showModal, toggleModal] = useToggle();
  const [createMutation, { loading }] = useMutation(CREATE_TODO, {
    onCompleted: (
      { createTodo },
      {
        variables: {
          newTodo: { status },
        },
      }
    ) => {
      notification.success({
        message: (
          <Typography.Title level={4} className="text-[#229954]">
            {createTodo.message}
          </Typography.Title>
        ),
        description: clsx({
          "Task is added in the todo": status === "TODO",
          "Task is added in completed list": status === "DONE",
          "Task is added in progress list": status === "IN_PROGRESS",
        }),
      });
      todoForm.resetFields();
      toggleModal(false);
    },
    update: (cache, { data: { createTodo } }) => {
      if (createTodo.success) {
        const { getAllTodosByStatus } = cache.readQuery({
          query: GET_ALL_TODOS_OF_USER,
          variables: { status },
        });
        cache.writeQuery({
          query: GET_ALL_TODOS_OF_USER,
          variables: { status },
          data: {
            getAllTodosByStatus: [...getAllTodosByStatus, createTodo.todo],
          },
        });
      }
    },
  });

  const handleClose = () => {
    todoForm.resetFields();
    toggleModal(false);
  };

  const handleSubmit = (newTodo) => createMutation({ variables: { newTodo } });

  return (
    <div className="w-full flex justify-end">
      <Button type="primary" size="large" onClick={toggleModal}>
        Add Todo
      </Button>
      <Modal
        centered
        width={520}
        footer={null}
        open={showModal}
        onCancel={handleClose}
        title={<Typography.Title level={3}>Add Todo</Typography.Title>}
      >
        <Form
          form={todoForm}
          layout="vertical"
          disabled={loading}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title is required." }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Description is required." }]}
          >
            <Input.TextArea placeholder="Description" rows={4} />
          </Form.Item>
          <Form.Item name="status" label="Todo Status">
            <Radio.Group
              optionType="button"
              buttonStyle="solid"
              defaultValue="TODO"
              options={TODO_STATUS_OPTS}
            />
          </Form.Item>
          <Divider />
          <div className="w-full flex items-center gap-4">
            <Button onClick={handleClose} size="large" block>
              Cancel
            </Button>
            <Button
              block
              size="large"
              type="primary"
              loading={loading}
              htmlType="submit"
            >
              Add Todo
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddTodo;
