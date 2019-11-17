import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import ReactDOM from 'react-dom';

// * ------------------------------------------------

const ChildInput = forwardRef((props, ref) => {
  const realRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => realRef.current);

  return <input type="text" name="child input" ref={realRef} />;
});

// * --------------------------------

const App = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <ChildInput ref={inputRef} />
    </div>
  );
};

// * ------------------------------------------------

ReactDOM.render(<App />, document.querySelector('#app'));
