const tmpl = require('./tmpl');

let scripts = tmpl.baseScripts;

const addScripts = (newScript) => {
  scripts = Object.assign(scripts, newScript);
};
module.exports = (args) => {
  args.flow && addScripts(tmpl.flowScripts);
  args.lint && addScripts(tmpl.lintScripts);
  args.test && addScripts(tmpl.testScripts);
  args.lint && args.test && addScripts(tmpl.testAllScripts);
  return JSON.stringify(scripts, null, 2);
};
