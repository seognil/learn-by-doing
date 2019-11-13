import { Reducer } from "redux";
import {
  ADD_TODO,
  TOGGLE_TODO,
  T_ADD_ACTION,
  T_Todos,
  T_TOGGLE_ACTION
} from "../constants/types";

const addTodoByText = (todos: T_Todos, payload: string) => [
  ...todos,
  { id: Date.now(), text: payload, done: false }
];

const toggleTodoById = (todos: T_Todos, payload: number) =>
  todos.map(todo => {
    if (todo.id === (payload as number)) {
      return {
        ...todo,
        done: !todo.done
      };
    } else {
      return todo;
    }
  });

const todoReducer: Reducer<T_Todos, T_ADD_ACTION | T_TOGGLE_ACTION> = (
  todos = [],
  { type, payload }
) => {
  if (type === ADD_TODO) {
    return addTodoByText(todos, payload as string);
  } else if (type === TOGGLE_TODO) {
    return toggleTodoById(todos, payload as number);
  } else {
    return todos;
  }
};

export default todoReducer;
