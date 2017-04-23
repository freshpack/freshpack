/**
 * CONFIGURATION
 * - Dependencies
 * - File templates
*/

// Dependencies

const dependencies = [
  'react',
  'react-dom'
];

const dependenciesRedux = [
  'redux',
  'react-redux',
  'redux-thunk'
];

const devDependencies = [
  'babel-core',
  'babel-loader',
  'babel-plugin-transform-class-properties',
  'babel-plugin-transform-object-rest-spread',
  'babel-plugin-transform-runtime',
  'babel-preset-es2015',
  'babel-preset-react',
  'babel-preset-stage-0',
  'cross-env',
  'extract-text-webpack-plugin',
  'file-loader',
  'css-loader',
  'style-loader',
  'html-webpack-plugin',
  'webpack',
  'webpack-dev-server'
];

const devDependenciesSass = [
  'autoprefixer',
  'sass-loader',
  'node-sass'
];

const devDependenciesTest = [
  'babel-jest',
  'enzyme',
  'identity-obj-proxy',
  'jest',
  'jest-cli',
  'react-addons-test-utils',
  'react-test-renderer',
  'regenerator-runtime'
];

const devDependenciesTestRedux = [
  'redux-mock-store'
];

const devDependenciesLint = [
  'babel-eslint',
  'eslint',
  'eslint-config-airbnb',
  'eslint-plugin-import',
  'eslint-plugin-jsx-a11y',
  'eslint-plugin-react'
];

// File templates

const packageJson = `{
  "name": "{{PROJEKT-NAME}}",
  "description": "{{PROJEKT-DESCRIPTION}}",
  "author": "{{PROJEKT-AUTHOR}}",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "webpack-dev-server --hot --inline --host 0.0.0.0 --port {{PORT}}",
    "lint": "eslint index.js ./src -f table || true",
    "test": "jest src --config=jest.config.json --coverage"
  }
}
`;

const editorconfig = `
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
`;

const babelrc = `{
  "presets": ["es2015", "react"],
  "plugins": ["transform-object-rest-spread"]
}
`;

const eslintrc = `
extends:
  eslint-config-airbnb
parser:
  babel-eslint
settings:
  ecmascript: 6
ecmaFeatures:
  jsx: true
  modules: true
  destructuring: true
  classes: true
  forOf: true
  blockBindings: true
  arrowFunctions: true
env:
  browser: true
  node: true
  jest: true
rules:
  global-require: 0
  indent: 2
  func-style: 0
  func-names: 0
  comma-dangle: 0
  no-console: 0
  no-param-reassign: 0
  linebreak-style: 0
  import/no-extraneous-dependencies: 0
  import/no-unresolved: 0
  import/extensions: 0
  react/jsx-filename-extension: 0
  react/prop-types: [1, { ignore: [] }]
  react/prefer-stateless-function: 0
  react/forbid-prop-types: 0
  react/require-default-props: 0
`;

const webpackConfig = `
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:{{PORT}}',
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true
    }
  }
};
`;

const jestConfig = `{
  "verbose": true,
  "notify": true,
  "testRegex": "spec.js$",
  "transformIgnorePatterns": ["/node_modules/"],
  "moduleNameMapper": {
    ".(css|less)$": "identity-obj-proxy",
    "App": "<rootDir>/src/components/app/App.js"
  }
}
`;

const indexJs = `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App.js';

ReactDOM.render(<App />, document.getElementById('root'));
`;

const indexJsReact = `
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { store } from './store';
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
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const DUPLICATION = "DUPLICATION";

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

export const store = createStore(combineReducers({ app }), {}, applyMiddleware(thunk) );
`;

const indexHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{PROJEKT-NAME}}</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
`;

const appJs = `
import React from 'react';
import './style.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="app" style={{ textAlign: 'center' }}>
        <h1>Hello <span>World</span><span>!</span></h1>
      </div>
    );
  }
}
`;

const appJsReact = `
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increase, decrease, double } from './state';
import './style.css';

export class App extends Component {

  render() {
    return (
      <div className="app" style={{ textAlign: 'center' }}>
        <h2>{ this.props.counter.value }</h2>
        <button onClick={ this.props.increase }>+</button>{' '}
        <button onClick={ this.props.decrease }>-</button>{' '}
        <button onClick={ this.props.double }>double</button>
      </div>
    );
  }
}

export default connect(
  (state) => ({ counter: state.app.counter }),
  { increase, decrease, double }
)(App);
`;

const appJsSpec = `
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from 'App';

describe('<App />', () => {
  it('should be selectable by class "app"', () => {
    expect(shallow(<App />).is('.app')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(<App />).find('.app').length).toBe(1);
  });

  it('contains an "H1" element', () => {
    expect(shallow(<App />).contains(
      <h1>Hello <span>World</span><span>!</span></h1>
    )).toBe(true);
  });

  it('and contains two "span" elements', () => {
    expect(shallow(<App />).find('h1 span').length).toBe(2);
  });
});
`;

const appJsSpecRedux = `
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import App from 'App';
import { increase, decrease, double, counter } from './state';

const mockStore = configureStore([])
const store = mockStore({ app: { counter: { value: 0 } } })

describe('<App />', () => {
  it('renders without crashing', () => {
      mount(<App store={store}/>);
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
    expect(store.getActions()).toEqual([{ type: 'INCREMENT' }])
  });
  it('should dispatch decrease action', () => {
    store.clearActions();
    store.dispatch(decrease());
    expect(store.getActions()).toEqual([{ type: 'DECREMENT' }])
  });
  it('should dispatch double action', () => {
    store.clearActions();
    store.dispatch(double());
    expect(store.getActions()).toEqual([{ type: 'DUPLICATION' }])
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

const appCss = `
h1 { color: red }
h1 span { color: blue }

h2 {
  font-size: 9rem;
  margin-bottom: 0px;
}

button {
  font-size: 1rem;
}
`;

const appScss = `
.app {
  h1 {
    color: red;
    span { color: blue; }
  }
  h2 {
    font-size: 9rem;
    margin-bottom: 0px;
  }
  button { font-size: 1rem; }
}
`;

module.exports = {
  dependencies,
  dependenciesRedux,
  devDependencies,
  devDependenciesSass,
  devDependenciesLint,
  devDependenciesTest,
  devDependenciesTestRedux,
  editorconfig,
  eslintrc,
  package: packageJson,
  babelrc,
  jestConfig,
  webpackConfig,
  indexJs,
  indexJsReact,
  appStateJs,
  storeJs,
  appJsReact,
  indexHtml,
  appJs,
  appJsSpec,
  appJsSpecRedux,
  appCss,
  appScss
};
