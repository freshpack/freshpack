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

const devMobxArgs = { flow: true, lint: true, test: true, mobx: true };
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

assembleTest('[dev, redux] INDEX && index.redux template',
  assembleIndex, 'index.redux.js', devReduxArgs
);

assembleTest('[dev, mobx] INDEX && index.mobx template',
  assembleIndex, 'index.mobx.js', devMobxArgs
);

assembleTest('[dev, mobx] APP && app.mobx template',
  assembleApp, 'app.mobx.js', devMobxArgs
);

assembleTest('[dev, redux, sass] APP && app.sass template',
  assembleApp, 'app.sass.js', devReduxSassArgs
);

assembleTest('[dev, redux, styled] APP && app.redux.styled template',
  assembleApp, 'app.redux.styled.js', devReduxStyledArgs
);

assembleTest('[dev, redux] SPEC && spec.redux template',
  assembleAppSpec, 'spec.redux.js', devReduxArgs
);

assembleTest('[dev, mobx] SPEC && spec.mobx template',
  assembleAppSpec, 'spec.mobx.js', devMobxArgs
);

assembleTest('[dev, redux] STATE && state.redux template',
  assembleAppState, 'state.redux.js', devReduxArgs
);

assembleTest('[dev, mobx] STATE && state.mobx template',
  assembleAppState, 'state.mobx.js', devMobxArgs
);

assembleTest('[dev, redux, styled] DEPENDENCIES && dependencies.styled template',
  args => assembleDependencies(args), 'dependencies.styled.txt', devReduxStyledArgs
);

assembleTest('[dev, redux, styled] DEV DEPENDENCIES && dev-dependencies.styled template',
  args => assembleDevDependencies(args), 'dev-dependencies.styled.txt', devReduxStyledArgs
);

assembleTest('[dev, redux, sass] DEV DEPENDENCIES && dev-dependencies.sass template',
  args => assembleDevDependencies(args), 'dev-dependencies.sass.txt', devReduxSassArgs
);

assembleTest('[dev, redux] NPM SCRIPTS && npm-scripts template',
  assembleNpmScripts, 'npm-scripts.json', devMobxArgs
);

assembleTest('[dev, modx] NPM SCRIPTS && npm-scripts template',
  assembleNpmScripts, 'npm-scripts.json', devReduxArgs
);
