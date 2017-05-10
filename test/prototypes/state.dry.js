// @flow
import { combineReducers } from 'redux';

// FLOW TYPES
type CounterState = { value: number };
type CounterAction = { type: string };
export type CounterProps = {
  counter: CounterState,
  increase: Function,
  decrease: Function,
  double: Function
};

// ACTION TYPES
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const DUPLICATION = 'DUPLICATION';

// ACTIONS
export const increase = () => ({ type: INCREMENT });
export const decrease = () => ({ type: DECREMENT });
export const double = () => ({ type: DUPLICATION });

// REDUCERS
/** State Shape
 * { counter: { value: INTEGER } }
*/

const initialState = { value: 0 };

export const counter = (state: CounterState = initialState, action: CounterAction) => {
  switch (action.type) {
    case INCREMENT: return { ...state, value: state.value + 1 };
    case DECREMENT: return { ...state, value: state.value - 1 };
    case DUPLICATION: return { ...state, value: state.value * 2 };
    default: return state;
  }
};

export const reducers = combineReducers({ counter });
