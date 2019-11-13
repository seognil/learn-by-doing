import { ReducerGroup, CombineReducers } from './types';

// export const combineReducers: CombineReducers = (reducers: ReducerGroup) => (state = {}, action) =>
export const combineReducers = (reducers: ReducerGroup) => (state = {}, action) =>
  (Object as any).fromEntries(
    Object.entries(reducers).map(([key, reducer]) => [key, reducer(state[key], action)]),
  );
