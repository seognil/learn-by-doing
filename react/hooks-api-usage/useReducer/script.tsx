import * as React from 'react';
import { useReducer } from 'react';
import ReactDOM from 'react-dom';

type MyReducer = React.Reducer<{ value: number }, { type: string; payload?: number }>;

const reducer: MyReducer = (state, action) => {
  const { value } = state;
  const { type, payload = 1 } = action;
  const nextValue = type === 'plus' ? value + payload : type === 'minus' ? value - payload : value;
  return { value: nextValue };
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <>
      Count by useReducer: {state.value}
      <br />
      <button onClick={() => dispatch({ type: 'plus', payload: 5 })}>plus 5</button>
      <button onClick={() => dispatch({ type: 'minus', payload: 3 })}>minus 3</button>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
