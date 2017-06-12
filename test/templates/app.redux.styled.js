// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Wrapper, Headline, Button } from './styled.js';
import { connect } from 'react-redux';
import { increase, decrease, double } from './state';
import type { CounterType } from './types';


class App extends React.Component {
  props: CounterType;
  render() {
    return (
      <Wrapper>
        <Headline>{ this.props.counter.value }</Headline>
        <Button onClick={this.props.increase}>+</Button>{' '}
        <Button onClick={this.props.decrease}>-</Button>{' '}
        <Button onClick={this.props.double}>double</Button>
      </Wrapper>
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
