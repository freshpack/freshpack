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

module.exports = {
  devDependenciesTest,
  jestConfig,
  testAllScripts,
  testScripts
};
