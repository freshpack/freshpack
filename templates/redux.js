/**
 * - Dependencies
 * - File templates
*/

// Dependencies

const dependenciesRedux = [
  'redux',
  'react-redux',
  'redux-thunk'
];

const devDependenciesTestRedux = [
  'redux-mock-store'
];

// File templates

const indexJsRedux = `
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
`;

const appStateJs = `
import { combineReducers } from 'redux';

// TYPES
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const DUPLICATION = 'DUPLICATION';

// ACTIONS
export const increase = () => ({ type: INCREMENT });
export const decrease = () => ({ type: DECREMENT });
export const double = () => ({ type: DUPLICATION });

// REDUCERS
const initialState = { value: 0 };
export const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT: return { ...state, value: state.value + 1 };
    case DECREMENT: return { ...state, value: state.value - 1 };
    case DUPLICATION: return { ...state, value: state.value * 2 };
    default: return state;
  }
};

export const reducers = combineReducers({ counter });
`;

const storeJs = `
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducers as app } from './components/app/state';

const store = createStore(combineReducers({ app }), {}, applyMiddleware(thunk));
export default store;
`;

const appJsRedux = `
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { increase, decrease, double } from './state';
import './style.scss';

export class App extends Component {
  render() {
    return (
      <div className="app" style={{ textAlign: 'center' }}>
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

const appJsSpecRedux = `

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import App from 'App';
import { increase, decrease, double, counter } from './state';

const mockStore = configureStore([]);
const store = mockStore({ app: { counter: { value: 0 } } });

describe('<App />', () => {
  it('renders without crashing', () => {
    mount(<App store={store} />);
  });
  it('should be selectable by class "app"', () => {
    expect(mount(<Provider store={store}><App /></Provider>).find('.app').length).toBe(1);
  });
  it('should contain one "H2" element', () => {
    expect(mount(<Provider store={store}><App /></Provider>).find('h2').length).toBe(1);
  });
  it('should contain three "button" elements', () => {
    expect(mount(<Provider store={store}><App /></Provider>).find('button').length).toBe(3);
  });
  it('should dispatch increase action', () => {
    store.dispatch(increase());
    expect(store.getActions()).toEqual([{ type: 'INCREMENT' }]);
  });
  it('should dispatch decrease action', () => {
    store.clearActions();
    store.dispatch(decrease());
    expect(store.getActions()).toEqual([{ type: 'DECREMENT' }]);
  });
  it('should dispatch double action', () => {
    store.clearActions();
    store.dispatch(double());
    expect(store.getActions()).toEqual([{ type: 'DUPLICATION' }]);
  });
  it('should increase counter', () => {
    expect(counter({ value: 1 }, { type: 'INCREMENT' })).toEqual({ value: 2 });
  });
  it('should decrease counter', () => {
    expect(counter({ value: 1 }, { type: 'DECREMENT' })).toEqual({ value: 0 });
  });
  it('should double counter', () => {
    expect(counter({ value: 3 }, { type: 'DUPLICATION' })).toEqual({ value: 6 });
  });
});
`;

module.exports = {
  dependenciesRedux,
  devDependenciesTestRedux,
  indexJsRedux,
  storeJs,
  appStateJs,
  appJsRedux,
  appJsSpecRedux
};
