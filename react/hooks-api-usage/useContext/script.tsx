import * as React from 'react';
import { createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom';

const genColor = () => `hsla(${Math.random() * 360}, 70%, 50%)`;

// * ------------------------------------------------

type MyContext = { color: string; changer: (any) => void };

const ThemeContext = createContext<MyContext>(null);

// * --------------------------------

const Comp = () => {
  const { color, changer } = useContext(ThemeContext);

  return (
    <button style={{ color, fontSize: '2em' }} onClick={changer}>
      Hello World! Click to change color
    </button>
  );
};

// * --------------------------------

const App = () => {
  const [state, setState] = useState({ color: 'green' });

  const { color } = state;
  const changer = () => setState({ color: genColor() });

  return (
    <ThemeContext.Provider value={{ color, changer }}>
      <Comp />
    </ThemeContext.Provider>
  );
};

// * ------------------------------------------------

ReactDOM.render(<App />, document.querySelector('#app'));
