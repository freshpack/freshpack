import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import './style.css';

@observer
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <h2>{ this.props.counter.value }</h2>
        <button onClick={ () => this.props.counter.increase() }>+</button>{' '}
        <button onClick={ () => this.props.counter.decrease() }>-</button>{' '}
        <button onClick={ () => this.props.counter.double() }>double</button>
        <DevTools />
      </div>
    );
  }
}

App.propTypes = {
  counter: PropTypes.object
};

export default App;
