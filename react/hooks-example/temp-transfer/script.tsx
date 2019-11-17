// * https://zh-hans.reactjs.org/docs/lifting-state-up.html

import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';

// * ----------------------------------------------------------------

const toC = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

const toF = (celsius) => (celsius * 9) / 5 + 32;

const transTemp = (temperature, convert) =>
  Number.isNaN(parseFloat(temperature))
    ? ''
    : (Math.round(convert(parseFloat(temperature)) * 1000) / 1000).toString();

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit',
};

// * ----------------------------------------------------------------

const BoilingVerdict = (props) => (
  <p>
    The water would {props.celsius >= 100 ? '' : 'not'} boil at {props.celsius} Celsius
  </p>
);

const TemperatureInput = ({ temperature, scale, onTemperatureChange }) => {
  return (
    <fieldset>
      <legend>Enter temperature in {scale}:</legend>
      <input value={temperature} onChange={onTemperatureChange} />
    </fieldset>
  );
};

// * --------------------------------

const Calculator = () => {
  const [state, setState] = useState({ temperature: '', scale: 'c' });

  const { scale, temperature } = state;

  const celsius = scale === 'c' ? temperature : transTemp(temperature, toC);
  const fahrenheit = scale === 'f' ? temperature : transTemp(temperature, toF);

  const handler = (scale) => (e) => setState({ scale, temperature: e.target.value });
  const handleCelsiusChange = handler('c');
  const handleFahrenheitChange = handler('f');

  return (
    <div>
      <TemperatureInput
        scale={scaleNames.c}
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />

      <TemperatureInput
        scale={scaleNames.f}
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />

      <BoilingVerdict celsius={celsius} />
    </div>
  );
};

const App = () => <Calculator />;

ReactDOM.render(<App />, document.querySelector('#app'));
