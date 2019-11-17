import React, { useState } from 'react';

import convert from 'convert-units';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { Selector } from './selector';
import { InputField } from './input';

// * ------------------------------------------------

const updateCalc = (name, { leftType, rightType, leftValue, rightValue }) => {
  if ([leftType, rightType, leftValue, rightValue].filter((e) => !e).length > 1) return {};

  const fromLeft = name === 'leftValue' || name === 'rightType';
  return fromLeft
    ? {
        rightValue: convert(leftValue)
          .from(leftType)
          .to(rightType),
      }
    : {
        leftValue: convert(rightValue)
          .from(rightType)
          .to(leftType),
      };
};

const handleMesureFactory = (setState) => (event) => {
  const { name, value } = event.target;

  setState((state) => ({
    ...state,
    ...emptyState,
    [name]: value,
  }));
};

const emptyState = {
  Measurement: '',
  leftType: '',
  rightType: '',
  leftValue: '',
  rightValue: '',
};

const handleSelectorFactory = (setState) => (event) => {
  const { name, value } = event.target;

  setState((state) => {
    const nextState = { ...state, [name]: value };
    const calcPatch = updateCalc(name, nextState);
    return { ...nextState, ...calcPatch };
  });
};

// * ------------------------------------------------

export const App = () => {
  const [state, setState] = useState(emptyState);

  const handleMesure = handleMesureFactory(setState);
  const handleSelector = handleSelectorFactory(setState);

  return (
    <Container>
      <Grid container justify="center" align="center" spacing={3}>
        <Selector
          mdWidth={12}
          label={'Measurement'}
          value={state.Measurement}
          onChange={handleMesure}
          list={convert().measures()}
        />
        {state.Measurement ? (
          <>
            <Selector
              mdWidth={6}
              label={'Quantity'}
              name={'leftType'}
              value={state.leftType}
              list={convert().list(state.Measurement)}
              onChange={handleSelector}
            />
            <Selector
              mdWidth={6}
              label={'Quantity'}
              name={'rightType'}
              value={state.rightType}
              list={convert().list(state.Measurement)}
              onChange={handleSelector}
            />
          </>
        ) : (
          <></>
        )}
        {state.leftType && state.rightType ? (
          <>
            <InputField
              label={state.leftType}
              name={'leftValue'}
              value={state.leftValue}
              onChange={handleSelector}
            />
            <InputField
              label={state.rightType}
              name={'rightValue'}
              value={state.rightValue}
              onChange={handleSelector}
            />
          </>
        ) : (
          <></>
        )}
      </Grid>
    </Container>
  );
};
