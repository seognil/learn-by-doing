import * as React from 'react';
import ReactDOM from 'react-dom';
import { createStore, Reducer } from 'redux';
import { Provider, useSelector, useDispatch, useStore } from 'react-redux';

// * ------------------------------------------------

type MyState = { val: number };

// * ----------------

const reducer: Reducer<MyState, { type: string; payload: number }> = (
  state = { val: 0 },
  action,
) => ({ val: state.val + (action.payload ?? 0) });
const store = createStore(reducer);

// * ------------------------------------------------

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Comp />
    </Provider>
  );
};

// * ----------------

const Comp: React.FC = () => {
  const store = useStore<MyState>();
  const val = useSelector<MyState, number>((state) => state.val);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Hello react-redux</h3>
      <button onClick={() => dispatch({ type: 'any', payload: 1 })}> add 1 </button>
      <p>useSelector mapped: {val}</p>
      <p>store.getState().val: {store.getState().val} </p>
    </div>
  );
};

// * ------------------------------------------------

ReactDOM.render(<App />, document.querySelector('#app'));
