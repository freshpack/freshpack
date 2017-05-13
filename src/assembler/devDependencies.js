const tmpl = require('./tmpl');
const unique = require('../unique');

module.exports = (args) => {
  const devDependencies = tmpl.devDependencies;
  args.sass && devDependencies.push(...tmpl.devDependenciesSass);
  args.test && devDependencies.push(...tmpl.devDependenciesTest);
  args.test && args.redux && devDependencies.push(...tmpl.devDependenciesTestRedux);
  args.lint && devDependencies.push(...tmpl.devDependenciesLint);
  args.flow && devDependencies.push(...tmpl.devDependenciesFlow);
  args.lint && args.flow && devDependencies.push(...tmpl.devDependenciesLintFlow);
  return unique(devDependencies.sort()).join(' ');
};