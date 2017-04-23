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

config((projectName, projectDesc, projectAuthor, projectPort, dir, args) => {
  const render = template => template
    .replace('{{PROJEKT-NAME}}', dir)
    .replace('{{PROJEKT-DESCRIPTION}}', projectDesc)
    .replace('{{PROJEKT-AUTHOR}}', projectAuthor)
    .replace('{{PORT}}', (args.port || projectPort));

  const dependencies = tmpl.dependencies;

  const devDependencies = tmpl.devDependencies;
  args.lint && devDependencies.push(...tmpl.devDependenciesLint);
  args.sass && devDependencies.push(...tmpl.devDependenciesSass);
  args.test && devDependencies.push(...tmpl.devDependenciesTest);

  let styleExt = 'css';

  if (args.redux) {
    devDependencies.push(...tmpl.devDependenciesTestRedux);
    dependencies.push(...tmpl.dependenciesRedux);
    args.test && devDependencies.push(...tmpl.devDependenciesTestRedux);
    tmpl.indexJs = tmpl.indexJsRedux;
    tmpl.appJs = tmpl.appJsRedux;
    tmpl.appJsSpec = tmpl.appJsSpecRedux;
  }

  if (args.sass) {
    tmpl.appJs = tmpl.appJs.replace('style.css', 'style.scss');
    tmpl.appCss = tmpl.appScss;
    styleExt = 'scss';
  }

  sequence([
    [init, args, dir],
    [exec, 'npm view freshpack version', { version: true }],
    [start, 'boilerplate files'],
    [folders, 'src/components/app'],
    [write, '.babelrc', tmpl.babelrc],
    [write, '.editorconfig', tmpl.editorconfig],
    [write, '.eslintrc.yaml', tmpl.eslintrc],
    [write, 'jest.config.json', tmpl.jestConfig],
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
