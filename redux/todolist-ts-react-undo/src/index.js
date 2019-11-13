import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { App } from './components/app';
import { todoAppReducer } from './reducers';

const logger = (store) => (dispatch) => (action) => {
  dispatch(action);
  console.warn('logger', store.getState());
  return action;
};

const middleware = applyMiddleware(logger);

const store = createStore(todoAppReducer, undefined, middleware);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
