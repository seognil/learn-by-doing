import {create} from 'redux-react-hook';
import {Reducer, createStore} from 'redux';

type MyState = {val: number; count: number};

type MyAction = {
  type: string;
  payload: number;
};

const myReducer: Reducer<MyState, MyAction> = (state, action) =>
  state === undefined
    ? {val: 0, count: 0}
    : {
        val:
          action.type === 'plus'
            ? state.val + action.payload
            : state.val - action.payload,
        count: state.count + 1,
      };

export const myStore = createStore(myReducer);

export const {StoreContext, useDispatch, useMappedState} = create<
  MyState,
  MyAction,
  typeof myStore
>();
