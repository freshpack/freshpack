import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app/App.js';

// // subscribe() returns a function for unregistering the listener
// let unsubscribe = store.subscribe(() => (
//   console.log(JSON.stringify(store.getState())
// )

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
