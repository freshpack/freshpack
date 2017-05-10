import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { increase, decrease, double, counter } from './state';

import App from './App';

const mockStore = configureStore([]);
const store = mockStore({ app: { counter: { value: 0 } } });

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
