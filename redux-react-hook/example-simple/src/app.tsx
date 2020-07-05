import * as React from 'react';
import {useDispatch, useMappedState} from './store';

export const App: React.FC = () => {
  const appData = useMappedState((state) => ({
    value: state.val,
    times: state.count,
  }));

  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch({type: 'plus', payload: 2})}>
        plus 2
      </button>
      <button onClick={() => dispatch({type: 'minus', payload: 1})}>
        minus 1
      </button>

      <p>value is: {appData.value}</p>
      <p>change times: {appData.times}</p>
    </div>
  );
};
