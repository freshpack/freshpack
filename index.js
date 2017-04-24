#!/usr/bin/env node

const config = require('./lib/config');
const main = require('./lib/main');

const tmpl = Object.assign(
  require('./templates/base'),
  require('./templates/sass'),
  require('./templates/lint'),
  require('./templates/test'),
  require('./templates/redux')
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

  scripts = render(JSON.stringify(scripts));

  sequence([
    [init, args, dir],
    [exec, 'npm view freshpack version', { version: true }],
    [start, 'boilerplate files'],
    [folders, 'src/components/app'],
    [write, '.babelrc', tmpl.babelrc],
    [write, '.editorconfig', tmpl.editorconfig],
    [write, '.eslintrc', tmpl.eslintrc],
    [write, '.jestrc', tmpl.jestConfig],
    [write, 'package.json', render(tmpl.package)],
    [write, 'webpack.config.js', render(tmpl.webpackConfig)],
    [write, 'src/index.js', tmpl.indexJs],
    [write, 'src/index.html', render(tmpl.indexHtml)],
    [write, 'src/store.js', tmpl.storeJs],
    [write, 'src/components/app/App.js', tmpl.appJs],
    [write, 'src/components/app/style.' + styleExt, tmpl.appCss],
    [write, 'src/components/app/state.js', tmpl.appStateJs],
    [write, 'src/components/app/spec.js', tmpl.appJsSpec],
    [chdir, './' + dir],
    [log, ''],
    [exec, 'yarn add ' + dependencies.join(' ')],
    [exec, 'yarn add -D ' + devDependencies.join(' ')],
    [chdir, '../'],
    [exit]
  ]);
});
