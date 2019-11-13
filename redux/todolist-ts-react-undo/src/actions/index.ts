import {
  ADD_TODO,
  SET_VISIBILITY,
  TOGGLE_TODO,
  VISO
} from "../constants/types";

export const getAddTodoAction = (payload: string) => ({
  type: ADD_TODO,
  payload
});

export const getSetVisoAction = (payload: VISO) => ({
  type: SET_VISIBILITY,
  payload
});

export const getToggleTodoAction = (payload: number) => ({
  type: TOGGLE_TODO,
  payload
});
