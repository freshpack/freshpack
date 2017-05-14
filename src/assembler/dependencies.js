const tmpl = require('./tmpl');
const unique = require('../unique');

module.exports = (args) => {
  const dependencies = [];
  dependencies.push(...tmpl.dependencies);
  args.redux && dependencies.push(...tmpl.dependenciesRedux);
  args.styled && dependencies.push(...tmpl.dependenciesStyled);
  return unique(dependencies.sort()).join(' ');
};
