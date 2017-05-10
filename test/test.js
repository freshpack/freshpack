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
  return requireText('./prototypes/' + file, require).trim();
};

const toHash = (string) => {
  return hasha(string).trim();
};

const dryArgs = { flow: true, lint: true, test: true, redux: true, styled: true };

test('index # assembled string and static file', (t) => {
  t.plan(1);
  t.equal(
    toHash(assembleIndexJS(dryArgs)),
    toHash(fileToString('index.dry.js'))
  );
});

test('app/App # assembled string and static file', (t) => {
  t.plan(1);
  t.equal(
    toHash(assembleAppJS(dryArgs)),
    toHash(fileToString('app.dry.js'))
  );
});

test('app/spec # assembled string and static file', (t) => {
  t.plan(1);
  t.equal(
    toHash(assembleAppSpecJS(dryArgs)),
    toHash(fileToString('spec.dry.js'))
  );
});

test('app/state # assembled string and static file', (t) => {
  t.plan(1);
  t.equal(
    toHash(assembleAppStateJS(dryArgs)),
    toHash(fileToString('state.dry.js'))
  );
});

