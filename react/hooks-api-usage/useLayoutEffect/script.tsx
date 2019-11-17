import * as React from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [height, setHeight] = useState(0);
  const refer = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const $dom = refer.current;
    const domHeight = $dom.getBoundingClientRect().height;
    if (height !== domHeight) setHeight(domHeight);
  });

  return (
    <div>
      <h1 ref={refer}>hello</h1>
      <h2>{height}</h2>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
