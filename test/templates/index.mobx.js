import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App.js';
import { Counter } from './components/app/state.js';

const counter = new Counter();

ReactDOM.render(
  <App counter={ counter } />,
  document.getElementById('root')
);
