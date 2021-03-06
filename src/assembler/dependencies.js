const tmpl = require('./tmpl');
const unique = require('../unique');

module.exports = (args) => {
  const dependencies = [];
  dependencies.push(...tmpl.dependencies);
  args.mobx && dependencies.push(...tmpl.dependenciesMobx);
  args.redux && dependencies.push(...tmpl.dependenciesRedux);
  args.styled && dependencies.push(...tmpl.dependenciesStyled);
  args.router && dependencies.push(...tmpl.dependenciesRouter);
  return unique(dependencies.sort()).join(' ');
};
