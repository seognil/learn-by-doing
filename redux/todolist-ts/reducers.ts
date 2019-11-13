// import { combineReducers, Reducer, ReducersMapObject as ReducerGroup } from 'redux';
import { combineReducers, Reducer, ReducerGroup } from '../redux-rebuild-core';

import {
  TodoAppData,
  TodoItemGroup,
  //
  ACTION_TYPES,
  ACTION_CHOICES,
  ADD_ACTION,
  REMOVE_ACTION,
  TOGGLE_ACTION,
  VISO_ACTION,
  //
  VISIBILITY,
} from './types';

// * ================================================================================ reducer

const ADD_TODO_reducer: Reducer<TodoItemGroup, ADD_ACTION> = (state, { id, text }) => [
  ...state,
  { id, text, done: false },
];

const REMOVE_TODO_reducer: Reducer<TodoItemGroup, REMOVE_ACTION> = (state, { id }) =>
  state.filter((item) => item.id !== id);

const TOGGLE_TODO_reducer: Reducer<TodoItemGroup, TOGGLE_ACTION> = (state, { id }) =>
  state.map((item) => (item.id === id ? { ...item, done: !item.done } : item));

// * ----------------

const strategy: ReducerGroup = {
  [ACTION_TYPES.ADD_TODO]: ADD_TODO_reducer,
  [ACTION_TYPES.REMOVE_TODO]: REMOVE_TODO_reducer,
  [ACTION_TYPES.TOGGLE_TODO]: TOGGLE_TODO_reducer,
};

const todos: Reducer<TodoItemGroup, ACTION_CHOICES> = (state = [], action) =>
  strategy[action.type] ? strategy[action.type](state, action) : state;

// * --------------------------------

const visibilityFilter: Reducer<VISIBILITY, VISO_ACTION> = (
  state = VISIBILITY.SHOW_ALL,
  { type, filter },
) => (type === ACTION_TYPES.SET_VISIBILITY_FILTER ? filter : state);

// * --------------------------------

// export const todoApp = combineReducers({
export const todoApp: Reducer<TodoAppData, ACTION_CHOICES> = combineReducers({
  todos,
  visibilityFilter,
});
