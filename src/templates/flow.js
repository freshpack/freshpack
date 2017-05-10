/**
 * - Yarn scripts
 * - Dependencies
 * - File templates
*/

// Yarn scripts

const flowScripts = {
  flow: 'flow status'
};

// Dependencies

const devDependenciesFlow = [
  'babel-preset-flow',
  'flow-bin'
];

const devDependenciesLintFlow = [
  'eslint-plugin-flowtype'
];

// File templates

const flowConfig = `
[ignore]
.*/node_modules/.*

[include]

[libs]
flow-typed

[options]
module.file_ext=.css
module.file_ext=.scss
module.file_ext=.js
module.file_ext=.json
`;

const settingsVSCode = `
{
  "javascript.validate.enable": false
}
`;

const babelrcFlow = `
{
  "presets": ["flow"]
}
`;

const eslintrcFlow = `
plugins:
  ['flowtype']`;

const flowTypeStyled = `
declare module 'styled-components' {
  declare module.exports: any;
}
`;

const flowTypeRedux = `
declare module 'redux' {
  declare module.exports: any;
}
`;

const flowTypePropTypes = `
declare module 'prop-types' {
  declare module.exports: any;
}
`;

const flowTypeReactRedux = `
declare module 'react-redux' {
  declare module.exports: any;
}
`;

module.exports = {
  flowConfig,
  settingsVSCode,
  flowScripts,
  babelrcFlow,
  devDependenciesFlow,
  devDependenciesLintFlow,
  eslintrcFlow,
  flowTypeRedux,
  flowTypePropTypes,
  flowTypeReactRedux,
  flowTypeStyled
};
