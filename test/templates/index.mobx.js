import React from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';

import { Counter } from './components/app/state.js';
import App from './components/app/App.js';

const counter = new Counter();

ReactDOM.render(
  <main>
    <App counter={counter} />
    <DevTools />
  </main>,
  document.getElementById('root')
);
