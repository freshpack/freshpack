// @flow
/* eslint
   no-unused-vars: 0
   react/no-multi-comp: 0
*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import type { CounterType } from './types';

import './style.scss';
import { increase, decrease, double } from './state';

export class App extends React.Component {
  render() {
    return (
      <div className="center-wrapper">
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
