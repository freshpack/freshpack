const tmpl = require('./tmpl');
const unique = require('../unique');

module.exports = (args) => {
  const devDependencies = [];
  const eslintAirbnbDependencies = [
    'eslint', 'eslint-plugin-jsx-a11y', 'eslint-plugin-import', 'eslint-plugin-react'
  ];

  devDependencies.push(...tmpl.devDependencies);
  args.sass && devDependencies.push(...tmpl.devDependenciesSass);
  args.test && devDependencies.push(...tmpl.devDependenciesTest);
  args.mobx && devDependencies.push(...tmpl.devDependenciesMobx);
  args.test && args.redux && devDependencies.push(...tmpl.devDependenciesTestRedux);
  args.lint && devDependencies.push(...tmpl.devDependenciesLint, ...eslintAirbnbDependencies);
  args.flow && devDependencies.push(...tmpl.devDependenciesFlow);
  args.lint && args.flow && devDependencies.push(...tmpl.devDependenciesLintFlow);
  return unique(devDependencies.sort()).join(' ');
};
