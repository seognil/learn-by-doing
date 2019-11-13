import { combineReducers } from "redux";
import undoable from "redux-undo";
import todos from "./todos";
import visibility from "./viso";

export const todoAppReducer = undoable(
  combineReducers({
    todos: todos,
    visibility
  })
);
