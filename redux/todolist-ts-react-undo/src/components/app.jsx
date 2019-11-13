import React from "react";
import { AddTodo } from "../container/add-todo";
import { FiltedTodoList } from "../container/filted-todo-list";
import { UndoRedo } from "../container/undo-redo";
import { Footer } from "./footer";

export const App = () => (
  <>
    <AddTodo />
    <FiltedTodoList />
    <Footer></Footer>
    <UndoRedo></UndoRedo>
  </>
);
