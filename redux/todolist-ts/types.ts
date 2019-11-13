export type TodoAppData = {
  todos: TodoItemGroup;
  visibilityFilter: VISIBILITY;
};

export type TodoItemGroup = TodoItemData[];

export type TodoItemData = {
  id: number;
  text: string;
  done: boolean;
};

export enum VISIBILITY {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_DONE = 'SHOW_DONE',
  SHOW_UNDONE = 'SHOW_UNDONE',
}

export enum ACTION_TYPES {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
  SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER',
}

export interface ADD_ACTION {
  type: ACTION_TYPES.ADD_TODO;
  id: number;
  text: string;
  done?: boolean;
}

export interface REMOVE_ACTION {
  type: ACTION_TYPES.REMOVE_TODO;
  id: number;
}

export interface TOGGLE_ACTION {
  type: ACTION_TYPES.TOGGLE_TODO;
  id: number;
}

export interface VISO_ACTION {
  type: ACTION_TYPES.SET_VISIBILITY_FILTER;
  filter: VISIBILITY;
}

export type ACTION_CHOICES = ADD_ACTION | REMOVE_ACTION | TOGGLE_ACTION | VISO_ACTION;
