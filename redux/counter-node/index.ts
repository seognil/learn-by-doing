import { createStore } from 'redux';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const reducer = (state = 0, { type, payload = 1 }) => {
  const switcher = {
    [INCREMENT]: () => state + payload,
    [DECREMENT]: () => state - payload,
  };
  return switcher[type] ? switcher[type]() : state;
};
const store = createStore(reducer);

const observerNext = () => console.warn(store.getState());
store.subscribe(observerNext);

const actionPlus = { type: INCREMENT, payload: 3 };
const actionMinus = { type: DECREMENT };

store.dispatch(actionPlus);
store.dispatch(actionPlus);
store.dispatch(actionPlus);

store.dispatch(actionMinus);
store.dispatch(actionMinus);
