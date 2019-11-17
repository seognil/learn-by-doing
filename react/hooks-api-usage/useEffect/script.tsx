import * as React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 1000);
    return () => {
      clearTimeout(timer);
      console.log(`cancel timer`);
    };
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
