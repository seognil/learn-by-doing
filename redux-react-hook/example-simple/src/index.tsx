import * as React from 'react';
import ReactDOM from 'react-dom';
import {StoreContext, myStore} from './store';
import {App} from './app';

ReactDOM.render(
  <StoreContext.Provider value={myStore}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('app'),
);
