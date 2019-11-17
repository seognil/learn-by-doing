import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [state, setState] = useState({ value: 0 });

  const plusFn = () => setState({ value: state.value + 5 });
  const minusFn = () => setState((state) => ({ value: state.value - 3 }));

  return (
    <>
      Count by useState: {state.value}
      <br />
      <button onClick={plusFn}>plus 5</button>
      <button onClick={minusFn}>minus 3</button>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
