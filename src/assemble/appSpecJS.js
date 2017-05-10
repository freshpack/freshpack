/* eslint camelcase: 0, quotes: 0 */

const os = require('os');

const imports_base = `
import React from 'react';
`;

const imports_enzyme_base = `
import { shallow } from 'enzyme';
`;

const imports_enzyme_redux = `
import { mount } from 'enzyme';
`;

const imports_redux = `
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { increase, decrease, double, counter } from './state';
`;

const import_component = `
import App from './App';
`;

const mock_store = `
const mockStore = configureStore([]);
const store = mockStore({ app: { counter: { value: 0 } } });
`;

const base_tests = `
describe('<App />', () => {
  it('should be selectable by class "app"', () => {
    expect(shallow(<App />).is('.app')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(<App />).find('.app').length).toBe(1);
  });

  it('contains an "H1" element', () => {
    expect(shallow(<App />).contains(
      <h1><span>Hello World</span><span>!</span></h1>
    )).toBe(true);
  });

  it('and contains two "span" elements', () => {
    expect(shallow(<App />).find('h1 span').length).toBe(2);
  });
});
`;

const redux_tests = `
describe('<App />', () => {
  it('renders without crashing', () => {
    mount(<App store={store} />);
  });
  it('should contain one "H2" element', () => {
    expect(mount(<Provider store={store}><App /></Provider>).find('h2').length).toBe(1);
  });
  it('should contain three "button" elements', () => {
    expect(mount(<Provider store={store}><App /></Provider>).find('button').length).toBe(3);
  });
  it('should dispatch increase action', () => {
    store.dispatch(increase());
    expect(store.getActions()).toEqual([{ type: 'INCREMENT' }]);
  });
  it('should dispatch decrease action', () => {
    store.clearActions();
    store.dispatch(decrease());
    expect(store.getActions()).toEqual([{ type: 'DECREMENT' }]);
  });
  it('should dispatch double action', () => {
    store.clearActions();
    store.dispatch(double());
    expect(store.getActions()).toEqual([{ type: 'DUPLICATION' }]);
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


module.exports = (args) => {
  let fileString = '';

  const add = (content, linebreak) => {
    fileString += content.trim();
    if (!linebreak) {
      fileString += os.EOL;
    }
  };

  const newline = () => add('');

  // 1 base imports
  add(imports_base);

  if (args.redux) {
    add(imports_enzyme_redux);
  } else {
    add(imports_enzyme_base);
  }

  // 2 redux imports
  if (args.redux) {
    add(imports_redux);
  }

  newline();

  // 3 import component
  add(import_component);

  newline();

  // 4 mock store
  if (args.redux) {
    add(mock_store);
    newline();
  }

  // 5 tests
  if (args.redux) {
    add(redux_tests);
  } else {
    add(base_tests);
  }

  return fileString;
};
