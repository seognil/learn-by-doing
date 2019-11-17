import * as React from 'react';
import { useMemo } from 'react';
import ReactDOM from 'react-dom';

import { memoizeWith } from 'ramda';
import { memoize } from 'lodash-es';

// * ------------------------------------------------

let ticker = 0;
let updateFlag = 0;

const getRandom = () => Math.random();

// * try different tools, but react useMemo only keep the previous deps to compare
const randamMemo = memoizeWith(() => updateFlag, getRandom);
const lodashMemo = memoize(getRandom, () => updateFlag);

// * ------------------------------------------------

const App = ({ updateFlag }) => {
  const now = Date.now();

  let result;

  {
    result = useMemo(getRandom, [updateFlag]);

    // * try different tools, try declare here, they would fail
    // result = randamMemo();
    // result = lodashMemo();
  }

  return (
    <div>
      <p>
        timer:
        <br />
        {now}
      </p>
      <p>
        result of useMemo: ('updateFlag' props changes by 2 secs)
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
