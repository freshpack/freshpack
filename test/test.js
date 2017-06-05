const test = require('tape');
const tapDifflet = require('tap-difflet');
const requireText = require('require-text');
// const hasha = require('hasha');

const assembleIndex = require('../src/assembler/index');
const assembleApp = require('../src/assembler/app');
const assembleAppState = require('../src/assembler/app-state');
const assembleAppSpec = require('../src/assembler/app-spec');
const assembleDependencies = require('../src/assembler/dependencies');
const assembleDevDependencies = require('../src/assembler/dev-dependencies');
const assembleNpmScripts = require('../src/assembler/npm-scripts');

test.createStream().pipe(tapDifflet()).pipe(process.stdout);

const devReduxArgs = { flow: true, lint: true, test: true, redux: true };
const devReduxStyledArgs = Object.assign({}, devReduxArgs, { styled: true });
const devReduxSassArgs = Object.assign({}, devReduxArgs, { sass: true });

const assembleTest = (msg, func, file, args) => {
  let actual = '-';
  let expected = '+';
  Promise.all([
    (() => {
      actual = func(args).trim();
    })(),
    (() => {
      expected = requireText('./templates/' + file, require).trim();
      if (file.split('.').pop() === 'txt') {
        expected = expected.replace(/\s+/g, ' ');
      }
    })()
  ]).then(() => {
    test(msg, (t) => { t.plan(1); t.equal(actual, expected); });
  }, err => console.log(err));
};

assembleTest('[mobx] === index.mobx.js',
  assembleIndex, 'index.mobx.js', { mobx: true }
);

assembleTest('[dev, redux] === index.redux.js',
  assembleIndex, 'index.redux.js', devReduxArgs
);

assembleTest('[dev, redux] === spec.js',
  assembleAppSpec, 'spec.js', devReduxArgs
);

assembleTest('[mobx] === state.mobx.js',
  assembleAppState, 'state.mobx.js', { mobx: true }
);

assembleTest('[dev, redux] === state.redux.js',
  assembleAppState, 'state.redux.js', devReduxArgs
);

assembleTest('[dev, redux] === npm-scripts.json',
  assembleNpmScripts, 'npm-scripts.json', devReduxArgs
);

assembleTest('[mobx] === app.mobx.js',
  assembleApp, 'app.mobx.js', { mobx: true }
);

assembleTest('[dev, redux, sass] === app.sass.js',
  assembleApp, 'app.sass.js', devReduxSassArgs
);

assembleTest('[dev, redux, styled] === app.styled.js',
  assembleApp, 'app.styled.js', devReduxStyledArgs
);

assembleTest('[dev, redux, sass] === dev-dependencies.sass.txt',
  args => assembleDevDependencies(args), 'dev-dependencies.sass.txt', devReduxSassArgs
);

assembleTest('[dev, redux, styled] === dependencies.styled.txt',
  args => assembleDependencies(args), 'dependencies.styled.txt', devReduxStyledArgs
);

assembleTest('[dev, redux, styled] === dev-dependencies.styled.txt',
  args => assembleDevDependencies(args), 'dev-dependencies.styled.txt', devReduxStyledArgs
);
