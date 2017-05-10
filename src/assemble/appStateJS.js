/* eslint camelcase: 0, quotes: 0 */

const os = require('os');

const comment_flow = `// @flow`;

const imports_redux = `
import { combineReducers } from 'redux';
`;

const flow_types = `
// FLOW TYPES
type CounterState = { value: number };
type CounterAction = { type: string };
export type CounterProps = {
  counter: CounterState,
  increase: Function,
  decrease: Function,
  double: Function
};
`;

const rest = `
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
`;

module.exports = (args) => {
  let fileString = '';

  const add = (content, linebreak) => {
    fileString += content.trim();
    if (!linebreak) {
      fileString += os.EOL;
    }
  };

  const newline = () => add('');

  // 1 comments
  if (args.flow) {
    add(comment_flow);
  }

  // 2 redux dependencies
  if (args.redux) {
    add(imports_redux);
    newline();
  }

  // 3 flow types
  if (args.flow) {
    add(flow_types);
    newline();
  }

  // 4 rest
  add(rest);

  return fileString;
};
