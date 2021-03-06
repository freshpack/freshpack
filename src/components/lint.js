/**
 * - Yarn scripts
 * - Dependencies
 * - File templates
*/

// Yarn scripts

const lintScripts = {
  lint: 'eslint index.js ./src -f table || true'
};

// Dependencies

const devDependenciesLint = [
  'babel-eslint',
  'eslint-config-airbnb',
  'eslint-plugin-import'
];

// File templates

const eslintignore = `
/flow-typed/**
types.js
`;


const eslintrc = `
extends:
  eslint-config-airbnb
parser:
  babel-eslint
settings:
  ecmascript: 6
parserOptions:
  ecmaFeatures:
    jsx: true
    modules: true
    destructuring: true
    classes: true
    forOf: true
    blockBindings: true
    arrowFunctions: true
env:
  browser: true
  node: true
  jest: true
rules:
  global-require: 0
  indent: 2
  func-style: 0
  func-names: 0
  comma-dangle: 0
  no-console: 0
  no-param-reassign: 0
  linebreak-style: 0
  jsx-a11y/img-has-alt: 0
  jsx-a11y/href-no-hash: 0
  import/no-extraneous-dependencies: 0
  import/no-named-as-default: 0
  import/no-unresolved: 0
  import/extensions: 0
  react/jsx-filename-extension: 0
  react/prop-types: [1, { ignore: [] }]
  react/prefer-stateless-function: 0
  react/forbid-prop-types: 0
  react/require-default-props: 0
`;

module.exports = {
  devDependenciesLint,
  eslintrc,
  eslintignore,
  lintScripts
};
