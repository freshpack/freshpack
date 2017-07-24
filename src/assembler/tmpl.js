const base = require('../components/base');
const lint = require('../components/lint');
const flow = require('../components/flow');
const test = require('../components/test');
const sass = require('../components/sass');
const styled = require('../components/styled');
const mobx = require('../components/mobx');
const redux = require('../components/redux');
const router = require('../components/router');

module.exports = Object.assign(
 base, lint, flow, test, styled, sass, mobx, redux, router
);
