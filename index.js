#!/usr/bin/env node

const config = require('./src/config');
const tmpl = require('./src/templates');
const main = require('./src/main');

const init = main.init;
const sequence = main.sequence;
const log = main.log;
const start = main.starting;
const paths = main.createFolders;
const write = main.writeFile;
const chdir = main.chdir;
const exec = main.exec;
const exit = main.exit;

config((projectName, projectDesc, projectAuthor, projectPort, dir, args) => {
  const render = template => template
    .replace('{{PROJEKT-NAME}}', projectName)
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
    tmpl.indexJs = tmpl.indexJsReact;
    tmpl.appJs = tmpl.appJsReact;
    tmpl.appJsSpec = tmpl.appJsSpecRedux;
  }

  if (args.sass) {
    tmpl.appJs = tmpl.appJs.replace('style.css', 'style.scss');
    tmpl.appCss = tmpl.appScss;
    styleExt = 'scss';
  }

  sequence([
    [init, args],
    [start, 'boilerplate files'],
    [paths, './' + dir + '/src/components/app'],
    [write, './' + dir + '/package.json', render(tmpl.package)],
    [write, './' + dir + '/.babelrc', tmpl.babelrc],
    [write, './' + dir + '/.editorconfig', tmpl.editorconfig],
    [write, './' + dir + '/.eslintrc.yaml', tmpl.eslintrc],
    [write, './' + dir + '/jest.config.json', tmpl.jestConfig],
    [write, './' + dir + '/webpack.config.js', render(tmpl.webpackConfig)],
    [write, './' + dir + '/src/index.js', tmpl.indexJs],
    [write, './' + dir + '/src/index.html', render(tmpl.indexHtml)],
    [write, './' + dir + '/src/store.js', tmpl.storeJs],
    [write, './' + dir + '/src/components/app/App.js', tmpl.appJs],
    [write, './' + dir + '/src/components/app/style.' + styleExt, tmpl.appCss],
    [write, './' + dir + '/src/components/app/state.js', tmpl.appStateJs],
    [write, './' + dir + '/src/components/app/spec.js', tmpl.appJsSpec],
    [chdir, './' + dir],
    [log, ''],
    [exec, 'yarn add ' + dependencies.join(' ')],
    [exec, 'yarn add -D ' + devDependencies.join(' ')],
    [chdir, '../'],
    [exec, 'npm view freshpack version', { version: true }],
    [exit, dir]
  ]);
});
