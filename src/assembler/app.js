/* eslint camelcase: 0, quotes: 0 */

const os = require('os');

const comment_flow = `// @flow`;

const comment_eslint = `/* eslint
   no-unused-vars: 0
   react/no-multi-comp: 0
*/`;

const react_dependencies = `
import React from 'react';
import PropTypes from 'prop-types';
`;

const styled_components_dependencies = `
import { Wrapper, Headline, Button } from './styled.js';
`;

const styled_components_dependencies_router = `
import {
  CounterWrapper, Headline, Button,
  AppWrapper, Menu, MenuItem
} from './styled.js';
`;

const redux_dependencies = `
import { connect } from 'react-redux';
`;

const import_redux_state = `
import { increase, decrease, double } from './state';
`;

const router_dependencies = `
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
`;

const mobx_dependencies = `
import { observer } from 'mobx-react';
`;

const mobx_dependencies_router = `
import { observer, inject, Provider } from 'mobx-react';
`;

const flow_dependencies_base = `
import type { DefaultProps, Props, State } from './types';
`;

const flow_dependencies_state = `
import type { CounterType } from './types';
`;

const import_base_stylesheet = `
import './style.css';`;

const import_sass_file = `
import './style.scss';
`;

const mobx_flow_types = `
type Props = {
  counter: CounterType
};
`;

const component_mobx = `
@observer
class App extends React.Component {
  render() {
    return (
      <div className="center-wrapper">
        <h2>{ this.props.counter.value }</h2>
        <button onClick={ () => this.props.counter.increase() }>+</button>{' '}
        <button onClick={ () => this.props.counter.decrease() }>-</button>{' '}
        <button onClick={ () => this.props.counter.double() }>double</button>
      </div>
    );
  }
}
`;

const component_mobx_flow = `
@observer
class App extends React.Component {
  props: Props;

  render() {
    return (
      <div className="center-wrapper">
        <h2>{ this.props.counter.value }</h2>
        <button onClick={ () => this.props.counter.increase() }>+</button>{' '}
        <button onClick={ () => this.props.counter.decrease() }>-</button>{' '}
        <button onClick={ () => this.props.counter.double() }>double</button>
      </div>
    );
  }
}
`;

const component_mobx_flow_styled = `
@observer
class App extends React.Component {
  props: Props;

  render() {
    return (
      <Wrapper>
        <Headline>{ this.props.counter.value }</Headline>
        <Button onClick={ () => this.props.counter.increase() }>+</Button>{' '}
        <Button onClick={ () => this.props.counter.decrease() }>-</Button>{' '}
        <Button onClick={ () => this.props.counter.double() }>double</Button>
      </Wrapper>
    );
  }
}
`;

const component_mobx_router_flow = `
const Home = () => (<h2>Home</h2>);
const About = () => (<h2>About</h2>);

@inject('counter') @observer
class Counter extends React.Component {
  props: Props;

  render() {
    return (
      <div className="center-wrapper">
        <h2>{ this.props.counter.value }</h2>
        <button onClick={() => this.props.counter.increase()}>+</button>{' '}
        <button onClick={() => this.props.counter.decrease()}>-</button>{' '}
        <button onClick={() => this.props.counter.double()}>double</button>
      </div>
    );
  }
}

export const MainWrapper = () => (
  <div className="main-wrapper">
    <ul className="menu">
      <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
      <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
      <li><NavLink to="/counter" activeClassName="active">Counter</NavLink></li>
    </ul>

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/counter" component={Counter} />
  </div>
);

class App extends React.Component {
  render() {
    return (
      <Provider counter={this.props.counter}>
        <Router>
          <MainWrapper />
        </Router>
      </Provider>
    );
  }
}
`;

const component_mobx_router_flow_styled = `
const Home = () => (<Headline>Home</Headline>);
const About = () => (<Headline>About</Headline>);

@inject('counter') @observer
class Counter extends React.Component {
  props: Props;

  render() {
    return (
      <CounterWrapper>
        <Headline>{ this.props.counter.value }</Headline>
        <Button onClick={() => this.props.counter.increase()}>+</Button>{' '}
        <Button onClick={() => this.props.counter.decrease()}>-</Button>{' '}
        <Button onClick={() => this.props.counter.double()}>double</Button>
      </CounterWrapper>
    );
  }
}

export const MainWrapper = () => (
  <AppWrapper>
    <Menu>
      <MenuItem>
        <NavLink exact to="/" activeClassName="active">Home</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/about" activeClassName="active">About</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/counter" activeClassName="active">Counter</NavLink>
      </MenuItem>
    </Menu>

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/counter" component={Counter} />
  </AppWrapper>
);

class App extends React.Component {
  render() {
    return (
      <Provider counter={this.props.counter}>
        <Router>
          <MainWrapper />
        </Router>
      </Provider>
    );
  }
}
`;

const component_mobx_router = `
const Home = () => (<h2>Home</h2>);
const About = () => (<h2>About</h2>);

@inject('counter') @observer
class Counter extends React.Component {
  render() {
    return (
      <div className="center-wrapper">
        <h2>{ this.props.counter.value }</h2>
        <button onClick={() => this.props.counter.increase()}>+</button>{' '}
        <button onClick={() => this.props.counter.decrease()}>-</button>{' '}
        <button onClick={() => this.props.counter.double()}>double</button>
      </div>
    );
  }
}

export const MainWrapper = () => (
  <div className="main-wrapper">
    <ul className="menu">
      <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
      <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
      <li><NavLink to="/counter" activeClassName="active">Counter</NavLink></li>
    </ul>

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/counter" component={Counter} />
  </div>
);

class App extends React.Component {
  render() {
    return (
      <Provider counter={this.props.counter}>
        <Router>
          <MainWrapper />
        </Router>
      </Provider>
    );
  }
}
`;

const component_redux_router_flow = `
const Home = () => (<h2>Home</h2>);
const About = () => (<h2>About</h2>);

class Counter extends React.Component {
  props: CounterType
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

const ConnectedCounter = connect(
  state => ({
    counter: state.app.counter
  }),
  { increase, decrease, double }
)(Counter);

export const MainWrapper = () => (
  <div className="main-wrapper">
    <ul className="menu">
      <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
      <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
      <li><NavLink to="/counter" activeClassName="active">Counter</NavLink></li>
    </ul>

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/counter" component={ConnectedCounter} />
  </div>
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <MainWrapper />
      </Router>
    );
  }
}
`;

const component_redux_router_flow_styled = `
const Home = () => (<Headline>Home</Headline>);
const About = () => (<Headline>About</Headline>);

class Counter extends React.Component {
  props: CounterType
  render() {
    return (
      <CounterWrapper>
        <Headline>{ this.props.counter.value }</Headline>
        <Button onClick={this.props.increase}>+</Button>{' '}
        <Button onClick={this.props.decrease}>-</Button>{' '}
        <Button onClick={this.props.double}>double</Button>
      </CounterWrapper>
    );
  }
}

const ConnectedCounter = connect(
  state => ({
    counter: state.app.counter
  }),
  { increase, decrease, double }
)(Counter);

export const MainWrapper = () => (
  <AppWrapper>
    <Menu>
      <MenuItem>
        <NavLink exact to="/" activeClassName="active">Home</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/about" activeClassName="active">About</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/counter" activeClassName="active">Counter</NavLink>
      </MenuItem>
    </Menu>

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/counter" component={ConnectedCounter} />
  </AppWrapper>
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <MainWrapper />
      </Router>
    );
  }
}
`;

const component_redux_router = `
const Home = () => (<h2>Home</h2>);
const About = () => (<h2>About</h2>);

class Counter extends React.Component {
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

const ConnectedCounter = connect(
  state => ({
    counter: state.app.counter
  }),
  { increase, decrease, double }
)(Counter);

export const MainWrapper = () => (
  <div className="main-wrapper">
    <ul className="menu">
      <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
      <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
      <li><NavLink to="/counter" activeClassName="active">Counter</NavLink></li>
    </ul>

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/counter" component={ConnectedCounter} />
  </div>
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <MainWrapper />
      </Router>
    );
  }
}
`;

const component_mobx_styled = `
class App extends React.Component {
  render() {
    return (
      <Wrapper>
        <Headline>{ this.props.counter.value }</Headline>
        <Button onClick={ () => this.props.counter.increase() }>+</Button>{' '}
        <Button onClick={ () => this.props.counter.decrease() }>-</Button>{' '}
        <Button onClick={ () => this.props.counter.double() }>double</Button>
      </Wrapper>
    );
  }
}
`;

const component_redux = `
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
`;

const component_redux_flow = `
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

const component_redux_flow_styled = `
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
`;

const component_base = `
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { name: 'Hello World' };
  }

  render() {
     return (
      <div className="center-wrapper" style={{ opacity: this.props.opacity || 1 }}>
        <h2>
          <span>{this.state.name}</span>
          <span>!</span>
        </h2>
      </div>
    );
  }
}
`;

const component_base_flow_styled = `
class App extends React.Component<DefaultProps, Props, State> {
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
class App extends React.Component<DefaultProps, Props, State> {
  static defaultProps = {
    opacity: 0.3
  };

  constructor(props: Props) {
    super(props);
    this.state = { name: 'World' };
  }

  state: State;

  log = (a: string, b: string) => a + b;

  render() {
    return (
      <div className="center-wrapper" style={{ opacity: this.props.opacity }}>
        <h2>
          <span>{this.log('Hello ', this.state.name)}</span>
          <span>!</span>
        </h2>
      </div>
    );
  }
}
`;

const component_base_styled = `
class center-wrapper extends React.Component {

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


const component_base_router = `
const Home = () => (<h2>Home</h2>);
const About = () => (<h2>About</h2>);
const Contact = () => (<h2>Contact</h2>);

export const MainWrapper = () => (
  <div className="main-wrapper">
    <ul className="menu">
      <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
      <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
      <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
    </ul>

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
  </div>
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <MainWrapper />
      </Router>
    );
  }
}
`;

const component_base_router_styled = `
const Home = () => (<Headline>Home</Headline>);
const About = () => (<Headline>About</Headline>);
const Contact = () => (<Headline>Contact</Headline>);

export const MainWrapper = () => (
  <AppWrapper>
    <Menu>
      <MenuItem>
        <NavLink exact to="/" activeClassName="active">Home</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/about" activeClassName="active">About</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/contact" activeClassName="active">Contact</NavLink>
      </MenuItem>
    </Menu>

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
  </AppWrapper>
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <MainWrapper />
      </Router>
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

const export_component_default = `
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
  if (args.lint) {
    add(comment_eslint);
  }

  // 2 base dependencies
  add(react_dependencies);

  // 3 other dependencies
  if (args.redux) {
    add(redux_dependencies);
  } else if (args.mobx) {
    if (args.router) {
      add(mobx_dependencies_router);
    } else {
      add(mobx_dependencies);
    }
    
  }

  if (args.router) {
    add(router_dependencies);
  }
  
  if (args.flow) {
    if (args.mobx || args.redux) {
      add(flow_dependencies_state);
    } else {
      add(flow_dependencies_base);
    }
  }

  newline();

  // 4 styles
  if (args.styled) {
    if (args.router) {
      add(styled_components_dependencies_router);
    } else {
      add(styled_components_dependencies);
    }
  }
  if (args.sass) {
    add(import_sass_file);
  } else if (!args.styled){
    add(import_base_stylesheet);
  }

  // 5 state
  if (args.redux) {
    add(import_redux_state);
  }
  

  newline();

  // 6 flow-types
  if (args.flow && args.mobx) {
    add(mobx_flow_types);
    newline();
  }

  // 7 component
  if (args.mobx) {
    if (args.router) {
      if (args.flow) {
        if (args.styled) {
          add(component_mobx_router_flow_styled);
        } else {
          add(component_mobx_router_flow);
        }
      } else {
        add(component_mobx_router);
      }
    } else if (args.flow && args.styled) {
      add(component_mobx_flow_styled);
    } else if (args.flow) {
      add(component_mobx_flow);
    } else if (args.styled) {
      add(component_mobx_styled);
    } else {
      add(component_mobx);
    }
  } else if (args.redux) {
    if (args.router) {
      if (args.flow) {
        if (args.styled) {
          add(component_redux_router_flow_styled);
        } else {
          add(component_redux_router_flow);
        }
      } else {
        add(component_redux_router);
      }
    } else if (args.flow && args.styled) {
      add(component_redux_flow_styled);
    } else if (args.flow) {
      add(component_redux_flow);
    } else if (args.styled) {
      add(component_redux_styled);
    } else {
      add(component_redux);
    }
  } else if (!args.redux && !args.mobx) {
    if (args.router && args.styled) {
      add(component_base_router_styled);
    } else if (args.router) {
      add(component_base_router);
    } else if (args.flow && args.styled) {
      add(component_base_flow_styled);
    } else if (args.flow) {
      add(component_base_flow);
    } else if (args.styled) {
      add(component_base_styled);
    } else {
      add(component_base);
    }
  }

  newline();

  // 8 prop-types
  if (args.redux) {
    add(prop_types_redux);
  } else if (args.mobx) {
    add(prop_types_mobx);
  }

  newline();

  // 9 default export
  if (args.redux) {
    add(export_component_redux);
  } else {
    add(export_component_default);
  }

  return fileString;
};
