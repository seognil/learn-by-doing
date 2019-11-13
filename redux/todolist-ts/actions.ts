import { ACTION_TYPES, VISIBILITY, ADD_ACTION, TOGGLE_ACTION, VISO_ACTION } from './types';

export const getAddAction = (text: string): ADD_ACTION => ({
  type: ACTION_TYPES.ADD_TODO,
  text,
  id: Date.now(),
});

export const getVisoAction = (filter: VISIBILITY): VISO_ACTION => ({
  type: ACTION_TYPES.SET_VISIBILITY_FILTER,
  filter,
});

export const getToggleAction = (id: number): TOGGLE_ACTION => ({
  type: ACTION_TYPES.TOGGLE_TODO,
  id,
});
