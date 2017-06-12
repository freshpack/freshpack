import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App.js';
import { Counter } from './components/app/state.js';
import DevTools from 'mobx-react-devtools';

const counter = new Counter();

ReactDOM.render(
  <main>
    <App counter={ counter } />
    <DevTools />
  </main>,
  document.getElementById('root')
);
