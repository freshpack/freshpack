/**
 * - Yarn scripts
 * - Dependencies
 * - File templates
*/

// Yarn scripts

const testScripts = {
  test: 'jest --config=.jestrc',
  'test:coverage': 'jest --config=.jestrc --coverage'
};

const testAllScripts = {
  'test:all': 'yarn lint && yarn test:coverage'
};

// Dependencies

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

// File templates

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

module.exports = {
  appJsSpec,
  devDependenciesTest,
  jestConfig,
  testAllScripts,
  testScripts
};
