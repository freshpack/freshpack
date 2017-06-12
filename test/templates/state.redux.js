// @flow
import { combineReducers } from 'redux';

import type { CounterState, CounterAction } from './types';

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
