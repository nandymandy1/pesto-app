import { gql } from "@apollo/client";

/**
 * `GET_ALL_TODOS_OF_USER` is a GraphQL query that retrieves all todos for a user filtered by status.
 *
 * @query
 * @param {String} $status - The status of the todos to retrieve.
 * @returns {Object[]} The list of todos with their details including _id, title, status, description, and user information.
 */
export const GET_ALL_TODOS_OF_USER = gql`
  query GetALLTodos($status: String!) {
    getAllTodosByStatus(status: $status) {
      _id
      title
      status
      description
      user {
        _id
        firstName
      }
    }
  }
`;

/**
 * `UPDATE_TODO_STATUS` is a GraphQL mutation that updates the status of a todo by its ID.
 *
 * @mutation
 * @param {UpdateTodoInput} $updatedTodo - The input object containing the updated todo details.
 * @param {ID} $id - The ID of the todo to update.
 * @returns {Object} The updated todo details, success message, and success status.
 */
export const UPDATE_TODO_STATUS = gql`
  mutation UpdateTodoById($updatedTodo: UpdateTodoInput, $id: ID!) {
    updateTodoById(updatedTodo: $updatedTodo, id: $id) {
      todo {
        _id
        title
        status
        description
        user {
          email
          _id
        }
        createdAt
        updatedAt
      }
      message
      success
    }
  }
`;

/**
 * `DELETE_TODO` is a GraphQL mutation that deletes a todo by its ID.
 *
 * @mutation
 * @param {ID} $id - The ID of the todo to delete.
 * @returns {Object} The ID of the deleted todo, success message, and success status.
 */
export const DELETE_TODO = gql`
  mutation DeleteTodoById($id: ID!) {
    deleteTodoById(id: $id) {
      id
      message
      success
    }
  }
`;

/**
 * `CREATE_TODO` is a GraphQL mutation that creates a new todo.
 *
 * @mutation
 * @param {TodoInput} $newTodo - The input object containing the new todo details.
 * @returns {Object} The created todo details, success message, and success status.
 */
export const CREATE_TODO = gql`
  mutation CreateTodo($newTodo: TodoInput) {
    createTodo(newTodo: $newTodo) {
      message
      success
      todo {
        description
        status
        title
        _id
        createdAt
        user {
          _id
        }
      }
    }
  }
`;
