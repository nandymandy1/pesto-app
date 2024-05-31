import gql from "graphql-tag";

const todos = gql`
  input TodoInput {
    title: String!
    description: String!
    status: TODO_STATUS
  }

  input UpdateTodoInput {
    title: String
    status: TODO_STATUS
    description: String
  }

  type Todo {
    _id: ID!
    title: String!
    status: TODO_STATUS!
    description: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type TodoResponse {
    todo: Todo!
    message: String!
    success: Boolean!
  }

  type TodoDeleteResponse {
    id: ID!
    message: String!
    success: Boolean!
  }

  enum TODO_STATUS {
    TODO
    IN_PROGRESS
    DONE
  }

  type Query {
    # Get all the todos of an user
    getAllTodosByStatus(status: String!): [Todo!] @isAuth
  }

  type Mutation {
    # Create new todo by an authenticated user
    createTodo(newTodo: TodoInput): TodoResponse @isAuth
    # Delete todo by an authenticated user
    deleteTodoById(id: ID!): TodoDeleteResponse @isAuth
    # Update todo by an authenticated user
    updateTodoById(id: ID!, updatedTodo: UpdateTodoInput): TodoResponse @isAuth
  }
`;

export default todos;
