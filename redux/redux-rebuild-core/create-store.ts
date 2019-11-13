import { Reducer, ActionPayload, Store, CreateStore } from './types';

export const createStore: CreateStore = (reducer) => {
  let state;
  let observerGroup = [];
  const initialState = {};

  // * --------------------------------

  const getState = () => state;

  // * ----------------

  const dispatch = (action) => {
    state = reducer(state, action);
    observerGroup.forEach((observer) => observer());
    return action;
  };

  // * ----------------

  const subscribe = (observer) => {
    observerGroup.push(observer);

    const unsubscribe = () => {
      observerGroup = observerGroup.filter((ob) => ob !== observer);
    };
    return unsubscribe;
  };

  // * --------------------------------

  dispatch(initialState);

  return {
    getState,
    dispatch,
    subscribe,
  };
};
