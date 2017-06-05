/* eslint camelcase: 0, quotes: 0 */

const os = require('os');

const imports_base = `
import React from 'react';
import ReactDOM from 'react-dom';
`;

const imports_redux = `
import { Provider } from 'react-redux';
import store from './store';
`;

const import_component = `
import App from './components/app/App.js';
`;

const import_state_mobx = `
import { Counter } from './components/app/state.js';

const counter = new Counter();
`;

const comment_subscribe_redux = `
// // subscribe() returns a function for unregistering the listener
// let unsubscribe = store.subscribe(() => (
//   console.log(JSON.stringify(store.getState())
// )
`;

const render_base = `
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
`;

const render_redux = `
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
`;

const render_mobx = `
ReactDOM.render(
  <App counter={ counter } />,
  document.getElementById('root')
);
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

  // 1 base dependencies
  add(imports_base);

  // 2 redux dependencies
  if (args.redux) {
    add(imports_redux);
  }

  // 3 import component
  add(import_component);

  // 4 import mobx state
  if (args.mobx) {
    add(import_state_mobx);
  }

  newline();

  // 5 comment subscribe
  if (args.redux) {
    add(comment_subscribe_redux);
    newline();
  }

  // 6 render component
  if (args.redux) {
    add(render_redux);
  } else if (args.mobx) {
    add(render_mobx);
  } else {
    add(render_base);
  }

  return fileString;
};
