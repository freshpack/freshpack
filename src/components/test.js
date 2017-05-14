/**
 * - Yarn scripts
 * - Dependencies
 * - File templates
*/

// Yarn scripts

const testScripts = {
  test: 'jest',
  'test:watch': 'jest --watch',
  'test:watch:all': 'jest --watchAll',
  'test:coverage': 'jest --coverage'
};

const testAllScripts = {
  'test:all': 'yarn lint && yarn test:coverage'
};

// Jest config

const jestConfig = `,
"jest": {
  "verbose": true,
  "notify": true,
  "testRegex": "spec.js$",
  "transformIgnorePatterns": ["/node_modules/"],
  "moduleNameMapper": {
    "\\\\.(css|scss|jpg|png)$": "<rootDir>/.mocks/empty-module.js"
  }
}
`;

// Dependencies

const devDependenciesTest = [
  'babel-jest',
  'enzyme',
  'jest',
  'jest-cli',
  'react-addons-test-utils',
  'react-test-renderer',
  'regenerator-runtime'
];

// File templates

const emptyModule = `
module.exports = '';
`;


module.exports = {
  devDependenciesTest,
  emptyModule,
  jestConfig,
  testAllScripts,
  testScripts
};
