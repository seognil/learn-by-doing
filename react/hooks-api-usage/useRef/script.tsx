import * as React from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const inputer = useRef<HTMLInputElement>(null);

  const logInputValue = () => console.log('input value:', inputer.current.value);

  return (
    <>
      <input ref={inputer} defaultValue="123"></input>
      <br />
      <button onClick={logInputValue}>console log input value</button>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
