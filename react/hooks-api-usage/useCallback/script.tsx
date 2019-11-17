import * as React from 'react';
import { useCallback } from 'react';
import ReactDOM from 'react-dom';

// * ------------------------------------------------

let ticker = 0;
let updateFlag = 0;

const sameRandomFunctionFactory = () => {
  const Rand = Math.random();
  return () => Rand;
};

// * ------------------------------------------------

const App = ({ updateFlag }) => {
  const now = Date.now();

  const cb = useCallback(sameRandomFunctionFactory(), [updateFlag]);
  const result = cb();

  return (
    <div>
      <p>
        timer:
        <br />
        {now}
      </p>
      <p>
        result of useCallback: ('updateFlag' props changes by 2 secs)
        <br />
        {result}
      </p>
    </div>
  );
};

// * ------------------------------------------------

setInterval(() => {
  ticker += 1 / 2;
  updateFlag = Math.round(ticker);
  ReactDOM.render(<App updateFlag={updateFlag} />, document.querySelector('#app'));
}, 1000);
