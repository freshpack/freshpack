import React from 'react';
import { shallow, mount } from 'enzyme';
import { Counter } from './state.js';

import App from './App';

describe('App', () => {
  const counter = new Counter();
  let component;

  it('renders correctly', () => {
    component = mount(<App counter={counter} />);
  });
  it('should contain one "H2" element', () => {
    expect(component.find('h2').length).toBe(1);
  });
  it('should contain three "button" elements', () => {
    expect(component.find('button').length).toBe(3);
  });
  it('should increase counter', () => {
    counter.increase();
    counter.increase();
    expect(counter.value).toEqual(2);
  });
  it('should double counter', () => {
    counter.double();
    expect(counter.value).toEqual(4);
  });
  it('should decrease counter', () => {
    counter.decrease();
    expect(counter.value).toEqual(3);
  });
});
