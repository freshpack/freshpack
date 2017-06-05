const base = require('../components/base');
const sass = require('../components/sass');
const styled = require('../components/styled');
const lint = require('../components/lint');
const test = require('../components/test');
const mobx = require('../components/mobx');
const redux = require('../components/redux');
const flow = require('../components/flow');

module.exports = Object.assign(
 base, sass, lint, test, mobx, redux, flow, styled
);
