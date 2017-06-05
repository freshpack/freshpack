/* eslint camelcase: 0, quotes: 0 */

const os = require('os');

const comment_flow = `// @flow`;

const react_dependencies = `
import React from 'react';
import PropTypes from 'prop-types';
`;

const styled_components_dependencies = `
import styled from 'styled-components';
`;

const redux_dependencies = `
import { connect } from 'react-redux';
import { increase, decrease, double } from './state';
`;

const mobx_dependencies = `
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
`;

const import_base_stylesheet = `
import './style.css';`;

const import_sass_file = `
import './style.scss';
`;

const styled_components_styles = `
const Wrapper = styled.div\`
  text-align: center;
  position: relative;
  margin-top: 15%;
  top: -15%;
\`;

const Headline = styled.h2\`
  font-size: 9rem;
  margin-bottom: 0px;
\`;

const Button = styled.button\`
  font-size: 1rem;
\`;
`;

const base_flow_types = `
type DefaultProps = { opacity: number };
type Props = { opacity: number };
type State = { name: string };
`;

const component_redux = `
export class App extends React.Component {
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
`;

const component_mobx = `
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
`;

const component_redux_styled = `
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
`;

const component_base = `
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { name: 'Hello World' };
  }

  render() {
     return (
      <div className="app" style={{ opacity: this.props.opacity || 1 }}>
        <h1>
          <span>{this.state.name}</span>
          <span>!</span>
        </h1>
      </div>
    );
  }
}
`;

const component_redux_flow = `
export class App extends React.Component {
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
`;

const component_styled_flow = `
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
       <Wrapper style={{ opacity: this.props.opacity }>
        <Headline>
          <span>{this.log('Hello ', this.state.name)}</span>
          <span>!</span>
        </Headline>
      </Wrapper>
    );
  }
}
`;

const component_base_flow = `
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

const component_base_styled = `
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { name: 'Hello World' };
  }

  render() {
     return (
      <Wrapper>
        <Headline>
          <span>{this.state.name}</span>
          <span>!</span>
        </Headline>
      </Wrapper>
    );
  }
}
`;

const prop_types_redux = `
App.propTypes = {
  counter: PropTypes.object,
  increase: PropTypes.func,
  decrease: PropTypes.func,
  double: PropTypes.func
};
`;

const prop_types_mobx = `
App.propTypes = {
  counter: PropTypes.object
};
`;

const export_component_redux = `
export default connect(
  state => ({ counter: state.app.counter }),
  { increase, decrease, double }
)(App);
`;

const export_component_mobx = `
export default App;
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

  // 2 base dependencies
  add(react_dependencies);

  // 3 other dependencies
  if (args.styled) {
    add(styled_components_dependencies);
  }

  if (args.redux) {
    add(redux_dependencies);
  } else if (args.mobx) {
    add(mobx_dependencies);
  }

  newline();

  // 4 styles
  if (args.styled) {
    add(styled_components_styles);
  } else if (args.sass) {
    add(import_sass_file);
  } else {
    add(import_base_stylesheet);
  }

  newline();

  // 5 flow-types
  if (args.flow && !args.redux) {
    add(base_flow_types);
    newline();
  }

  // 6 component
  if (args.redux && args.styled) {
    add(component_redux_styled);
  } else if (args.redux && args.flow) {
    add(component_redux_flow);
  } else if (args.styled && args.flow) {
    add(component_styled_flow);
  } else if (args.redux) {
    add(component_redux);
  } else if (args.mobx) {
    add(component_mobx);
  } else if (args.styled) {
    add(component_base_styled);
  } else if (args.flow) {
    add(component_base_flow);
  } else {
    add(component_base);
  }

  newline();

  // 7 prop-types
  if (args.redux) {
    add(prop_types_redux);
  } else if (args.mobx) {
    add(prop_types_mobx);
  }

  newline();

  // 8 default export
  if (args.redux) {
    add(export_component_redux);
  } else if (args.mobx) {
    add(export_component_mobx);
  }

  return fileString;
};
