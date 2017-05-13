// @flow
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { increase, decrease, double } from './state';

const Wrapper = styled.div`
  text-align: center;
  position: relative;
  margin-top: 15%;
  top: -15%;
`;

const Headline = styled.h2`
  font-size: 9rem;
  margin-bottom: 0px;
`;

const Button = styled.button`
  font-size: 1rem;
`;


export class App extends React.Component {
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
