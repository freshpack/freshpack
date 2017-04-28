/**
 * - Yarn scripts
 * - Dependencies
 * - File templates
*/

// Yarn scripts

const flowScripts = {
  flow: 'flow status'
};

// Dependencies

const devDependenciesFlow = [
  'babel-preset-flow',
  'flow-bin'
];

const devDependenciesLintFlow = [
  'eslint-plugin-flowtype'
];

// File templates

const flowConfig = `
[ignore]
.*/node_modules/.*

[include]

[libs]
flow-typed

[options]
module.file_ext=.css
module.file_ext=.scss
module.file_ext=.js
module.file_ext=.json
`;

const settingsVSCode = `
{
  "javascript.validate.enable": false
}
`;

const babelrcFlow = `
{
  "presets": ["flow"]
}
`;

const eslintrcFlow = `
plugins:
  ['flowtype']`;

const flowTypeRedux = `
declare module 'redux' {
  declare module.exports: any;
}
`;

const flowTypePropTypes = `
declare module 'prop-types' {
  declare module.exports: any;
}
`;

const flowTypeReactRedux = `
declare module 'react-redux' {
  declare module.exports: any;
}
`;

const appJsFlow = `
// @flow
import React from 'react';
import './style.css';

type DefaultProps = { opacity: number };
type Props = { opacity: number };
type State = { name: string };

export default class App extends React.Component<DefaultProps, Props, State> {
  state: State;
  static defaultProps = {
    opacity: 0.3
  };

  constructor(props: Props) {
    super(props);
    this.state = { name: 'World' };
  }

  log = (a: string, b: string) => {
    return a + b;
  }

  render() {
     return (
      <div className="app" style={{ opacity: this.props.opacity }}>
        <h1>
          <span>{this.log('Hello ', this.state.name)}</span>
          <span>!</span>
        </h1>
      </div>
    );
  }
}
`;

const appJsReduxFlow = `
// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { increase, decrease, double } from './state';
import type { CounterProps } from './state';
import './style.scss';

export class App extends React.Component<void, CounterProps, void> {
  render() {
    return (
      <div className="app">
        <h2>{ this.props.counter.value }</h2>
        <button onClick={this.props.increase}>+</button>{' '}
        <button onClick={this.props.decrease}>-</button>{' '}
        <button onClick={this.props.double}>double</button>
      </div>
    );
  }
}

App.propTypes = {
  counter: PropTypes.object,
  increase: PropTypes.func,
  decrease: PropTypes.func,
  double: PropTypes.func
};

export default connect(
  state => ({ counter: state.app.counter }),
  { increase, decrease, double }
)(App);
`;

const appStateJsFlow = `
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
`;


module.exports = {
  flowConfig,
  settingsVSCode,
  flowScripts,
  babelrcFlow,
  devDependenciesFlow,
  devDependenciesLintFlow,
  eslintrcFlow,
  appJsFlow,
  appJsReduxFlow,
  appStateJsFlow,
  flowTypeRedux,
  flowTypePropTypes,
  flowTypeReactRedux
};
