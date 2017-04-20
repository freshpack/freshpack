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

  const styleExt = args.sass ? 'scss' : 'css';
  const styleTmpl = args.sass ? tmpl.appScss : tmpl.appCss;
  tmpl.appJs = args.sass ? tmpl.appJs.replace('App.css', 'App.scss') : tmpl.appJs;


  sequence([
    [init, args],
    [start, 'new files and folders'],
    [paths, './' + dir + '/src/components'],
    [write, './' + dir + '/package.json', render(tmpl.package)],
    [write, './' + dir + '/.babelrc', tmpl.babelrc],
    [write, './' + dir + '/.editorconfig', tmpl.editorconfig],
    [write, './' + dir + '/.eslintrc.yaml', tmpl.eslintrc],
    [write, './' + dir + '/jest.config.json', tmpl.jestConfig],
    [write, './' + dir + '/webpack.config.js', render(tmpl.webpackConfig)],
    [write, './' + dir + '/src/index.js', tmpl.indexJs],
    [write, './' + dir + '/src/index.html', render(tmpl.indexHtml)],
    [write, './' + dir + '/src/components/App.js', tmpl.appJs],
    [write, './' + dir + '/src/components/App.spec.js', tmpl.appJsSpec],
    [write, './' + dir + '/src/components/App.' + styleExt, styleTmpl],
    [chdir, './' + dir],
    [log, ''],
    [exec, 'yarn add ' + dependencies.join(' ')],
    [exec, 'yarn add -D ' + devDependencies.join(' ')],
    [chdir, '../'],
    [exit, dir]
  ]);
});
