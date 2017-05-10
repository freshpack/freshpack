#!/usr/bin/env node

const config = require('./config');
const lib = require('./lib');

const assembleIndexJS = require('./assemble/indexJS');
const assembleAppJS = require('./assemble/appJS');
const assembleAppStateJS = require('./assemble/appStateJS');
const assembleAppSpecJS = require('./assemble/appSpecJS');

const base = require('./templates/base');
const sass = require('./templates/sass');
const styled = require('./templates/styled');
const lint = require('./templates/lint');
const test = require('./templates/test');
const redux = require('./templates/redux');
const flow = require('./templates/flow');

const init = lib.init;
const sequence = lib.sequence;
const log = lib.log;
const start = lib.starting;
const folders = lib.createFolders;
const write = lib.writeFile;
const chdir = lib.chdir;
const exec = lib.exec;
const exit = lib.exit;

const tmpl = Object.assign(
  base, sass, lint, test, redux, flow, styled
);

const mergeBabelrcs = (a, b) => {
  a.presets && b.presets && b.presets.forEach((preset) => {
    a.presets.push(preset);
  });
  a.plugins && b.plugins && a.plugins.forEach((plugin) => {
    b.plugins.push(plugin);
  });
  return a;
};

config((project, args) => {
  const dir = project.name;
  const dependencies = tmpl.dependencies;
  const devDependencies = tmpl.devDependencies;
  let scripts = tmpl.baseScripts;

  const addDependencies = (newDependencies) => {
    dependencies.push(...newDependencies);
  };

  const addDevDependencies = (newDevDependencies) => {
    devDependencies.push(...newDevDependencies);
  };

  const addScripts = (newScript) => {
    scripts = Object.assign(scripts, newScript);
  };

  const render = template => template
    .replace('{{PROJEKT-NAME}}', project.name)
    .replace('{{PROJEKT-DESCRIPTION}}', project.desc)
    .replace('{{PROJEKT-LICENCE}}', project.license)
    .replace('{{PROJEKT-VERSION}}', project.version)
    .replace('{{PROJEKT-AUTHOR}}', project.author)
    .replace('{{PORT}}', (args.port || project.port))
    .replace('{{PACKAGE-SCRIPTS}}', scripts);

  let appStylesheetExt = 'css';
  tmpl.appStylesheet = tmpl.appCss;

  if (args.flow) {
    tmpl.eslintrc += tmpl.eslintrcFlow;
    tmpl.babelrc = JSON.stringify(mergeBabelrcs(
      JSON.parse(tmpl.babelrc),
      JSON.parse(tmpl.babelrcFlow)
    ), null, 2);
  }

  if (args.sass) {
    tmpl.appStylesheet = tmpl.appScss;
    appStylesheetExt = 'scss';
  }

  args.sass && addDevDependencies(tmpl.devDependenciesSass);
  args.redux && addDependencies(tmpl.dependenciesRedux);
  args.test && addDevDependencies(tmpl.devDependenciesTest);
  args.test && args.redux && addDevDependencies(tmpl.devDependenciesTestRedux);
  args.styled && addDependencies(tmpl.dependenciesStyled);
  args.lint && addDevDependencies(tmpl.devDependenciesLint);
  args.flow && addDevDependencies(tmpl.devDependenciesFlow);
  args.lint && args.flow && addDevDependencies(tmpl.devDependenciesLintFlow);

  tmpl.indexJs = assembleIndexJS(args);
  tmpl.appJs = assembleAppJS(args);
  tmpl.appStateJs = assembleAppStateJS(args);
  tmpl.appJsSpec = assembleAppSpecJS(args);

  args.flow && addScripts(tmpl.flowScripts);
  args.lint && addScripts(tmpl.lintScripts);
  args.test && addScripts(tmpl.testScripts);
  args.lint && args.test && addScripts(tmpl.testAllScripts);

  scripts = render(JSON.stringify(scripts));

  sequence([
    [init, args, dir],
    [exec, 'npm view freshpack version', { version: true }],
    [start, 'project files'],
    [folders, 'src/components/app'],
    [folders, 'flow-typed'],
    [folders, '.vscode'],
    [write, '.babelrc', tmpl.babelrc],
    [write, '.editorconfig', tmpl.editorconfig],
    [write, '.eslintrc.yml', tmpl.eslintrc],
    [write, '.flowConfig', tmpl.flowConfig],
    [write, '.jestrc', tmpl.jestConfig],
    [write, 'package.json', render(tmpl.package)],
    [write, 'webpack.config.js', render(tmpl.webpackConfig)],
    [write, 'src/index.js', tmpl.indexJs],
    [write, 'src/index.html', render(tmpl.indexHtml)],
    [write, 'src/store.js', tmpl.storeJs],
    [write, 'src/components/app/App.js', tmpl.appJs],
    [write, 'src/components/app/style.' + appStylesheetExt, tmpl.appStylesheet],
    [write, 'src/components/app/state.js', tmpl.appStateJs],
    [write, 'src/components/app/spec.js', tmpl.appJsSpec],
    [write, 'flow-typed/redux.js', tmpl.flowTypeRedux],
    [write, 'flow-typed/react-redux.js', tmpl.flowTypePropTypes],
    [write, 'flow-typed/prop-types.js', tmpl.flowTypeReactRedux],
    [write, 'flow-typed/styled-components.js', tmpl.flowTypeStyled],
    [write, '.vscode/settings.json', tmpl.settingsVSCode],
    [chdir, './' + dir],
    [log, ''],
    [exec, 'yarn add ' + dependencies.join(' ')],
    [exec, 'yarn add -D ' + devDependencies.join(' ')],
    [chdir, '../'],
    [exit]
  ]);
});
