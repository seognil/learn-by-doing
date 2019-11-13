import React from "react";
import { Todo } from "./todo";

export const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        onClick={() => onTodoClick(todo.id)}
      ></Todo>
    ))}
  </ul>
);
