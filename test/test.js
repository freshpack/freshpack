const test = require('tape');
const tapSpec = require('tap-spec');
const requireText = require('require-text');
const hasha = require('hasha');

const assembleIndexJS = require('../src/assemble/indexJS');
const assembleAppJS = require('../src/assemble/appJS');
const assembleAppStateJS = require('../src/assemble/appStateJS');
const assembleAppSpecJS = require('../src/assemble/appSpecJS');

test.createStream().pipe(tapSpec()).pipe(process.stdout);

const fileToString = (file) => {
  return requireText('./prototypes/' + file, require);
};

const dryArgs = { flow: true, lint: true, test: true, redux: true, styled: true };

test('index # assembled string and static file', (t) => {
  t.plan(1);
  t.equal(
    hasha(assembleIndexJS(dryArgs)),
    hasha(fileToString('index.dry.js'))
  );
});

test('app/App # assembled string and static file', (t) => {
  t.plan(1);
  t.equal(
    hasha(assembleAppJS(dryArgs)),
    hasha(fileToString('app.dry.js'))
  );
});

test('app/spec # assembled string and static file', (t) => {
  t.plan(1);
  t.equal(
    hasha(assembleAppSpecJS(dryArgs)),
    hasha(fileToString('spec.dry.js'))
  );
});

test('app/state # assembled string and static file', (t) => {
  t.plan(1);
  t.equal(
    hasha(assembleAppStateJS(dryArgs)),
    hasha(fileToString('state.dry.js'))
  );
});

