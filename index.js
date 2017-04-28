#!/usr/bin/env node

const config = require('./libs/config');
const main = require('./libs/main');
const base = require('./templates/base');
const sass = require('./templates/sass');
const lint = require('./templates/lint');
const test = require('./templates/test');
const redux = require('./templates/redux');
const flow = require('./templates/flow');

const mergeBabelrcs = (a, b) => {
  a.presets && b.presets && b.presets.forEach((preset) => {
    a.presets.push(preset);
  });
  a.plugins && b.plugins && a.plugins.forEach((plugin) => {
    b.plugins.push(plugin);
  });
  return a;
};

const tmpl = Object.assign(
  base, sass, lint, test, redux, flow
);

const init = main.init;
const sequence = main.sequence;
const log = main.log;
const start = main.starting;
const folders = main.createFolders;
const write = main.writeFile;
const chdir = main.chdir;
const exec = main.exec;
const exit = main.exit;

config((project, args) => {
  const dir = project.name;
  let scripts = tmpl.baseScripts;

  const render = template => template
    .replace('{{PROJEKT-NAME}}', project.name)
    .replace('{{PROJEKT-DESCRIPTION}}', project.desc)
    .replace('{{PROJEKT-LICENCE}}', project.license)
    .replace('{{PROJEKT-VERSION}}', project.version)
    .replace('{{PROJEKT-AUTHOR}}', project.author)
    .replace('{{PORT}}', (args.port || project.port))
    .replace('{{PACKAGE-SCRIPTS}}', scripts);

  const dependencies = tmpl.dependencies;
  const devDependencies = tmpl.devDependencies;

  let styleExt = 'css';

  if (args.flow) {
    devDependencies.push(...tmpl.devDependenciesFlow);
    tmpl.appJs = tmpl.appJsFlow;
    tmpl.eslintrc += tmpl.eslintrcFlow;
    tmpl.babelrc = JSON.stringify(mergeBabelrcs(
      JSON.parse(tmpl.babelrc),
      JSON.parse(tmpl.babelrcFlow)
    ), null, 2);
    scripts = Object.assign(scripts, tmpl.flowScripts);
  }

  if (args.redux) {
    devDependencies.push(...tmpl.devDependenciesTestRedux);
    dependencies.push(...tmpl.dependenciesRedux);
    tmpl.indexJs = tmpl.indexJsRedux;
    tmpl.appJs = tmpl.appJsRedux;
    tmpl.appJsSpec = tmpl.appJsSpecRedux;
  }

  if (args.sass) {
    devDependencies.push(...tmpl.devDependenciesSass);
    tmpl.appJs = tmpl.appJs.replace('style.css', 'style.scss');
    tmpl.appCss = tmpl.appScss;
    styleExt = 'scss';
  }

  if (args.lint) {
    devDependencies.push(...tmpl.devDependenciesLint);
    scripts = Object.assign(scripts, tmpl.lintScripts);
  }

  if (args.test) {
    devDependencies.push(...tmpl.devDependenciesTest);
    scripts = Object.assign(scripts, tmpl.testScripts);
  }

  if (args.test && args.redux) {
    devDependencies.push(...tmpl.devDependenciesTestRedux);
  }

  if (args.lint && args.test) {
    scripts = Object.assign(scripts, tmpl.testAllScripts);
  }

  if (args.lint && args.flow) {
    devDependencies.push(...tmpl.devDependenciesLintFlow);
  }

  if (args.redux && args.flow) {
    tmpl.appJs = tmpl.appJsReduxFlow;
    tmpl.appStateJs = tmpl.appStateJsFlow;
  }

  scripts = render(JSON.stringify(scripts));

  sequence([
    [init, args, dir],
    [exec, 'npm view freshpack version', { version: true }],
    [start, 'boilerplate files'],
    [folders, 'src/components/app'],
    [folders, 'flow-typed'],
    [folders, '.vscode'],
    [write, '.babelrc', tmpl.babelrc],
    [write, '.editorconfig', tmpl.editorconfig],
    [write, '.jestrc', tmpl.jestConfig],
    [write, '.flowConfig', tmpl.flowConfig],
    [write, '.eslintrc.yml', tmpl.eslintrc],
    [write, 'package.json', render(tmpl.package)],
    [write, 'webpack.config.js', render(tmpl.webpackConfig)],
    [write, 'src/index.js', tmpl.indexJs],
    [write, 'src/index.html', render(tmpl.indexHtml)],
    [write, 'src/store.js', tmpl.storeJs],
    [write, 'src/components/app/App.js', tmpl.appJs],
    [write, 'src/components/app/style.' + styleExt, tmpl.appCss],
    [write, 'src/components/app/state.js', tmpl.appStateJs],
    [write, 'src/components/app/spec.js', tmpl.appJsSpec],
    [write, 'flow-typed/redux.js', tmpl.flowTypeRedux],
    [write, 'flow-typed/react-redux.js', tmpl.flowTypePropTypes],
    [write, 'flow-typed/prop-types.js', tmpl.flowTypeReactRedux],
    [write, '.vscode/settings.json', tmpl.settingsVSCode],
    [chdir, './' + dir],
    [log, ''],
    [exec, 'yarn add ' + dependencies.join(' ')],
    [exec, 'yarn add -D ' + devDependencies.join(' ')],
    [chdir, '../'],
    [exit]
  ]);
});
