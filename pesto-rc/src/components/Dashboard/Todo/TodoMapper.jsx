import { RxCheckCircled, RxCrosshair1, RxShadow } from "react-icons/rx";

const bgColors = {
  DONE: "bg-[#229954]",
  TODO: "bg-[#34495E]",
  IN_PROGRESS: "bg-[#F39C12]",
};

const TODO_ACTION = {
  TODO: { type: "moveToTodo", text: "In Todo" },
  DELETE: { type: "delete", text: "Delete Todo" },
  DONE: { type: "markComplete", text: "Complete" },
  IN_PROGRESS: { type: "moveToProgress", text: "In Progress" },
};

/**
 * `TODO_MAPPER` is an object that maps todo statuses to their corresponding properties,
 * including background color, actions, and icon component.
 *
 * - `DONE`: Represents a completed todo with a green background, an icon, and actions to move it to progress or delete it.
 * - `IN_PROGRESS`: Represents a todo that is currently in progress with an orange background, a spinning icon,
 *   and actions to move it to todo, mark as done, or delete it.
 * - `TODO`: Represents a pending todo with a grey background, an icon, and actions to move it to progress, mark as done, or delete it.
 *
 * @constant
 * @type {Object}
 * @property {Object} DONE - Configuration for completed todos.
 * @property {string} DONE.color - Background color for completed todos.
 * @property {Array<Object>} DONE.actions - Actions available for completed todos.
 * @property {JSX.Element} DONE.Icon - Icon representing completed todos.
 *
 * @property {Object} IN_PROGRESS - Configuration for todos in progress.
 * @property {string} IN_PROGRESS.color - Background color for todos in progress.
 * @property {Array<Object>} IN_PROGRESS.actions - Actions available for todos in progress.
 * @property {JSX.Element} IN_PROGRESS.Icon - Spinning icon representing todos in progress.
 *
 * @property {Object} TODO - Configuration for pending todos.
 * @property {string} TODO.color - Background color for pending todos.
 * @property {Array<Object>} TODO.actions - Actions available for pending todos.
 * @property {JSX.Element} TODO.Icon - Icon representing pending todos.
 */
export const TODO_MAPPER = {
  DONE: {
    color: bgColors.DONE,
    actions: [TODO_ACTION.IN_PROGRESS, TODO_ACTION.DELETE],
    Icon: <RxCheckCircled size={20} color="#fff" fontWeight="bold" />,
  },
  IN_PROGRESS: {
    color: bgColors.IN_PROGRESS,
    Icon: (
      <RxShadow
        size={20}
        color="#fff"
        fontWeight="bold"
        className="animate-spin"
      />
    ),
    actions: [TODO_ACTION.TODO, TODO_ACTION.DONE, TODO_ACTION.DELETE],
  },
  TODO: {
    color: bgColors.TODO,
    Icon: <RxCrosshair1 size={20} color="#fff" fontWeight="bold" />,
    actions: [TODO_ACTION.IN_PROGRESS, TODO_ACTION.DONE, TODO_ACTION.DELETE],
  },
};
