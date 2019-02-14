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
  '@babel/preset-flow',
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
# unsafe.enable_getters_and_setters=true
esproposal.decorators=ignore
`;

const typesFileBase = `
// @flow
export type DefaultProps = { opacity: number };
export type Props = { opacity: number };
export type State = { name: string };
`;

const typesFileMobx = `
// @flow
export type CounterType = {
  value: string;
  increase: Function;
  decrease: Function;
  double: Function;
}
`;

const typesFileRedux = `
// @flow
export type CounterState = { value: number };
export type CounterAction = { type: string };
export type CounterType = {
  counter: CounterState,
  increase: Function,
  decrease: Function,
  double: Function
};

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

const flowTypeReactRouterDom = `
declare module 'react-router-dom' {
  declare module.exports: any;
}
`;

const flowTypeReactRedux = `
declare module 'react-redux' {
  declare module.exports: any;
}
`;

const flowTypeMobx = `
declare module 'mobx' {
  declare module.exports: any;
}
`;

const flowTypeMobxReact = `
declare module 'mobx-react' {
  declare module.exports: any;
}
`;

const flowTypeMobxReactDevtools = `
declare module 'mobx-react-devtools' {
  declare module.exports: any;
}
`;

module.exports = {
  babelrcFlow,
  devDependenciesFlow,
  devDependenciesLintFlow,
  eslintrcFlow,
  settingsVSCode,
  flowConfig,
  flowScripts,
  flowTypeRedux,
  flowTypePropTypes,
  flowTypeReactRouterDom,
  flowTypeReactRedux,
  flowTypeStyled,
  flowTypeMobx,
  flowTypeMobxReact,
  flowTypeMobxReactDevtools,
  typesFileBase,
  typesFileMobx,
  typesFileRedux
};
