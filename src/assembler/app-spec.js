/* eslint camelcase: 0, quotes: 0 */

const os = require('os');

const imports_base = `
import React from 'react';
`;

const imports_enzyme_base = `
import { mount } from 'enzyme';
`;

const imports_enzyme_pro = `
import { shallow, mount } from 'enzyme';
`;

const imports_redux = `
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { increase, decrease, double, counter } from './state';
`;

const imports_mobx = `
import { Counter } from './state.js';
`;

const imports_router = `
import { MemoryRouter } from 'react-router-dom';
`;

const imports_router_mobx = `
import { Provider } from 'mobx-react';
`;

const import_component = `
import App from './App';
`;

const import_component_router = `
import App, { MainWrapper } from './App';
`;

const mock_store = `
const mockStore = configureStore([]);
const store = mockStore({ app: { counter: { value: 0 } } });
`;

const base_tests = `
describe('App', () => {
  it('should be selectable by class "center-wrapper"', () => {
    expect(shallow(<App />).is('.center-wrapper')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(<App />).find('.center-wrapper').length).toBe(1);
  });

  it('contains an "H2" element', () => {
    expect(shallow(<App />).contains(
      <h2><span>Hello World</span><span>!</span></h2>
    )).toBe(true);
  });

  it('and contains two "SPAN" elements', () => {
    expect(shallow(<App />).find('h2 span').length).toBe(2);
  });
});
`;

const router_tests = `
describe('App', () => {
  it('should render correctly', () => {
    mount(<App />);
  });
});
describe('Contact Page', () => {
  let component;

  it('should render via Router correctly', () => {
    component = mount(
      <MemoryRouter initialEntries={['/contact']}>
        <MainWrapper />
      </MemoryRouter>
    );
  });
  it('should contain one "H2" element', () => {
    expect(component.find('h2').length).toBe(1);
  });
  it('should contain a "Contact" string in the "H2" element', () => {
    expect(component.find('h2').text()).toBe('Contact');
  });
});
`;

const router_mobx_tests = `
describe('App', () => {
  const counter = new Counter();
  it('should render correctly', () => {
    mount(<App counter={counter} />);
  });
});

describe('Counter', () => {
  let component;
  const counter = new Counter();

  it('should render via Router correctly', () => {
    component = mount(
      <Provider counter={counter}>
        <MemoryRouter initialEntries={['/counter']}>
          <MainWrapper />
        </MemoryRouter>
      </Provider>
    );
  });
  it('should contain one "H2"-element', () => {
    expect(component.find('h2').length).toBe(1);
  });
  it('should contain three "button"-elements', () => {
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
`;

const redux_tests = `
describe('App', () => {
  it('renders correctly', () => {
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

const router_redux_tests = `
describe('App', () => {
  it('should render correctly', () => {
    mount(<App store={store} />);
  });
});
describe('Counter', () => {
  let component;

  it('should render via Router correctly', () => {
    component = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/counter']}>
          <MainWrapper />
        </MemoryRouter>
      </Provider>
    );
  });

  it('should contain one "H2" element', () => {
    expect(component.find('h2').length).toBe(1);
  });
  it('should contain three "button" elements', () => {
    expect(component.find('button').length).toBe(3);
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

const mobx_tests = `
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

  if (args.redux || args.router) {
    add(imports_enzyme_base);
  } else {
    add(imports_enzyme_pro);
  }


  // 2 state imports
  if (args.router) {
    add(imports_router);
    if (args.mobx) {
      add(imports_router_mobx);
      add(imports_mobx);
    } else if (args.redux) {
      add(imports_redux);
    }
  } else if (args.redux) {
    add(imports_redux);
  } else if (args.mobx) {
    add(imports_mobx);
  }

  newline();

  // 3 component import
  if (args.router) {
    add(import_component_router);
  } else {
      add(import_component);
  }

  newline();

  // 4 mock store
  if (args.redux) {
    add(mock_store);
    newline();
  }

  // 5 tests
  if (args.router) {
    if (args.mobx) {
      add(router_mobx_tests);
    } else if (args.router) {
      add(router_redux_tests);
    } else {
      add(router_tests);
    }
  } else if (args.redux) {
    add(redux_tests);
  } else if (args.mobx) {
    add(mobx_tests);
  } else {
    add(base_tests);
  }

  return fileString;
};
