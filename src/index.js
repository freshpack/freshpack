#!/usr/bin/env node

const config = require('./config');
const lib = require('./lib');

const assembleIndex = require('./assembler/index');
const assembleApp = require('./assembler/app');
const assembleAppState = require('./assembler/app-state');
const assembleAppSpec = require('./assembler/app-spec');
const assembleDependencies = require('./assembler/dependencies');
const assembleDevDependencies = require('./assembler/dev-dependencies');
const assembleNpmScripts = require('./assembler/npm-scripts');
const tmpl = require('./assembler/tmpl');

const init = lib.init;
const sequence = lib.sequence;
const log = lib.log;
const start = lib.starting;
const folders = lib.createFolders;
const write = lib.writeFile;
const chdir = lib.chdir;
const exec = lib.exec;
const exit = lib.exit;
const versions = lib.versions;

const mergeBabelrcs = (a, b) => {
  a.presets && b.presets && b.presets.forEach((preset) => {
    a.presets.push(preset);
  });
  a.plugins && b.plugins && b.plugins.forEach((plugin) => {
    a.plugins.push(plugin);
  });
  return a;
};

config((project, args) => {
  const dir = project.name;
  const dependencies = assembleDependencies(args);
  const devDependencies = assembleDevDependencies(args);
  const index = assembleIndex(args);
  const app = assembleApp(args);
  const appState = assembleAppState(args);
  const appSpec = assembleAppSpec(args);
  let npmScripts = {};
  let jestConfig = '';

  const render = template => template
    .replace('{{PROJEKT-NAME}}', project.name)
    .replace('{{PROJEKT-DESCRIPTION}}', project.desc)
    .replace('{{PROJEKT-LICENCE}}', project.license)
    .replace('{{PROJEKT-VERSION}}', project.version)
    .replace('{{PROJEKT-AUTHOR}}', project.author)
    .replace('{{PORT}}', (args.port || project.port))
    .replace('{{PACKAGE-SCRIPTS}}', npmScripts)
    .replace('{{JEST-CONFIG}}', jestConfig);

  npmScripts = render(assembleNpmScripts(args));
  let appStylesheetExt = 'css';
  tmpl.appStylesheet = tmpl.appCss;

  if (args.flow) {
    tmpl.eslintrc += tmpl.eslintrcFlow;
    tmpl.babelrc = JSON.stringify(mergeBabelrcs(
      JSON.parse(tmpl.babelrc),
      JSON.parse(tmpl.babelrcFlow)
    ), null, 2);
  }

  if (args.test) {
    jestConfig = tmpl.jestConfig;
  }

  if (args.sass) {
    tmpl.appStylesheet = tmpl.appScss;
    appStylesheetExt = 'scss';
  }

  sequence([
    [init, args, dir],
    [exec, 'npm view freshpack version', { version: true }],
    [start, 'project files'],
    [folders, 'src/components/app'],
    [folders, 'flow-typed'],
    [folders, '.vscode'],
    [folders, '.mocks'],
    [write, '.babelrc', tmpl.babelrc],
    [write, '.editorconfig', tmpl.editorconfig],
    [write, '.eslintrc.yml', tmpl.eslintrc],
    [write, '.flowConfig', tmpl.flowConfig],
    [write, 'package.json', render(tmpl.package)],
    [write, 'webpack.config.js', render(tmpl.webpackConfig)],
    [write, 'src/index.js', index],
    [write, 'src/index.html', render(tmpl.indexHtml)],
    [write, 'src/store.js', tmpl.storeJs],
    [write, 'src/components/app/App.js', app],
    [write, 'src/components/app/style.' + appStylesheetExt, tmpl.appStylesheet],
    [write, 'src/components/app/state.js', appState],
    [write, 'src/components/app/spec.js', appSpec],
    [write, 'flow-typed/redux.js', tmpl.flowTypeRedux],
    [write, 'flow-typed/react-redux.js', tmpl.flowTypePropTypes],
    [write, 'flow-typed/prop-types.js', tmpl.flowTypeReactRedux],
    [write, 'flow-typed/styled-components.js', tmpl.flowTypeStyled],
    [write, '.mocks/empty-module.js', tmpl.emptyModule],
    [write, '.vscode/settings.json', tmpl.settingsVSCode],
    [chdir, './' + dir],
    [log, ''],
    [versions, dependencies, devDependencies],
    [exec, 'yarn add ' + dependencies, { dependencies: true }],
    [exec, 'yarn add -D ' + devDependencies, { dependencies: true }],
    [chdir, '../'],
    [exit]
  ]);
});
