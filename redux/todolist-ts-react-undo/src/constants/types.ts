export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const SET_VISIBILITY = "SET_VISIBILITY";

export enum VISO {
  "SHOW_ALL" = "SHOW_ALL",
  "SHOW_DONE" = "SHOW_DONE",
  "SHOW_UNFINISHED" = "SHOW_UNFINISHED"
}

export interface T_ADD_ACTION {
  type: string;
  payload: string;
}

export interface T_TOGGLE_ACTION {
  type: string;
  payload: number;
}
export interface T_SET_VISO_ACTION {
  type: string;
  payload: VISO;
}

export interface T_Todo {
  id: number;
  text: string;
  done: boolean;
}

export type T_Todos = Array<T_Todo>;

export interface T_TodoApp {
  todos: T_Todos;
  visibility: VISO;
}
