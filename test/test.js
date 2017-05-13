const test = require('tape');
const tapDifflet = require('tap-difflet');
const requireText = require('require-text');
// const hasha = require('hasha');

const assembleIndex = require('../src/assemble/index');
const assembleApp = require('../src/assemble/app');
const assembleAppState = require('../src/assemble/appState');
const assembleAppSpec = require('../src/assemble/appSpec');
const assembleDependencies = require('../src/assemble/dependencies');
const assembleDevDependencies = require('../src/assemble/devDependencies');
const assembleNpmScripts = require('../src/assemble/npmScripts');

test.createStream().pipe(tapDifflet()).pipe(process.stdout);

const devReduxArgs = { flow: true, lint: true, test: true, redux: true };
const devReduxStyledArgs = Object.assign({}, devReduxArgs, { styled: true });
const devReduxSassArgs = Object.assign({}, devReduxArgs, { sass: true });

const assembleTest = (msg, func, file, args) => {
  let hash1 = '-';
  let hash2 = '+';
  Promise.all([
    (() => {
      hash1 = func(args).trim();
    })(),
    (() => {
      hash2 = requireText('./templates/' + file, require).trim();
      if (file.split('.').pop() === 'txt') {
        hash2 = hash2.replace(/\s+/g, ' ')
      }
    })()
  ]).then(() => {
    test(msg, (t) => { t.plan(1); t.equal(hash1, hash2); });
  }, err => console.log(err));
};

assembleTest('[dev, redux] === index template',
  assembleIndex, 'index.js', devReduxArgs
);

assembleTest('[dev, redux, styled] === App.styled template',
  assembleApp, 'app.styled.js', devReduxStyledArgs
);

assembleTest('[dev, redux, sass] === App.sass template',
  assembleApp, 'app.sass.js', devReduxSassArgs
);

assembleTest('[dev, redux] === spec template',
  assembleAppSpec, 'spec.js', devReduxArgs
);

assembleTest('[dev, redux] === state template',
  assembleAppState, 'state.js', devReduxArgs
);

assembleTest('[dev, redux, styled] === dependencies.styled template',
  args => assembleDependencies(args), 'dependencies.styled.txt', devReduxStyledArgs
);

assembleTest('[dev, redux, styled] === devDependencies.styled template',
  args => assembleDevDependencies(args), 'devDependencies.styled.txt', devReduxStyledArgs
);

assembleTest('[dev, redux, sass] === devDependencies.sass template',
  args => assembleDevDependencies(args), 'devDependencies.sass.txt', devReduxSassArgs
);

assembleTest('[dev, redux] === npmScripts template',
  assembleNpmScripts, 'npmScripts.json', devReduxArgs
);
