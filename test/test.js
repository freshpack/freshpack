const test = require('tape');
const tapSpec = require('tap-spec');
const requireText = require('require-text');
const hasha = require('hasha');

const assembleIndexJS = require('../src/assemble/indexJS');
const assembleAppJS = require('../src/assemble/appJS');
const assembleAppStateJS = require('../src/assemble/appStateJS');
const assembleAppSpecJS = require('../src/assemble/appSpecJS');

test.createStream().pipe(tapSpec()).pipe(process.stdout);

const dryArgs = { flow: true, lint: true, test: true, redux: true, styled: true };

const addTest = (func, file, msg) => {
  let hash1 = 'hash1';
  let hash2 = 'hash2';
  Promise.all([
    (() => { hash1 = hasha(func(dryArgs)); })(),
    (() => { hash2 = hasha(requireText('./prototypes/' + file, require)); })()
  ]).then(() => {
    test(msg, (t) => { t.plan(1); t.equal(hash1, hash2); });
  }, err => console.log(err));
};

addTest(assembleIndexJS, 'index.dry.js', 'index # assembled string and static file');
addTest(assembleAppJS, 'app.dry.js', 'app/App # assembled string and static file');
addTest(assembleAppSpecJS, 'spec.dry.js', 'app/spec # assembled string and static file');
addTest(assembleAppStateJS, 'state.dry.js', 'app/state # assembled string and static file');
