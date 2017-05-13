const base = require('../options/base');
const sass = require('../options/sass');
const styled = require('../options/styled');
const lint = require('../options/lint');
const test = require('../options/test');
const redux = require('../options/redux');
const flow = require('../options/flow');

module.exports = Object.assign(
 base, sass, lint, test, redux, flow, styled
);
