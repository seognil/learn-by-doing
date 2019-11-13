import { VISO, T_Todos } from "../constants/types";

export const getVisoTodos = (todos: T_Todos, filter: VISO) =>
  todos.filter(({ done }) =>
    filter === VISO.SHOW_DONE
      ? done
      : filter === VISO.SHOW_UNFINISHED
      ? !done
      : true
  );
