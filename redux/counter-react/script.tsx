import * as React from 'react';
import ReactDOM from 'react-dom';

// import { createStore } from 'redux';
import { createStore } from '../redux-rebuild-core';

// * ------------------------------------------------

const $container = document.querySelector('#container');

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counter = (state = 0, action) => {
  const { type } = action;

  if (type === INCREMENT) {
    return state + 1;
  } else if (type === DECREMENT) {
    return state - 1;
  } else {
    return state;
  }
};

const store = createStore(counter);

// * ------------------------------------------------

const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <p>{value}</p>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: INCREMENT })}
      onDecrement={() => store.dispatch({ type: DECREMENT })}
    />,
    $container,
  );
};

render();
store.subscribe(render);

store.dispatch({ type: INCREMENT });
