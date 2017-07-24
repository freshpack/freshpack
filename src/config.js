const colors = require('colors');
const commandLineArgs = require('command-line-args');
const prompt = require('prompt');
const main = require('./lib');
const pkg = require('../package.json');

const log = main.log;
const projectDefaults = {
  name: 'my-project',
  desc: '',
  author: '',
  license: 'MIT',
  version: '0.0.1',
  port: 8084
};
let project = {};

const help = `
Usage: freshpack <project-directory> [options]
   or: freshpack --conf

  Options:
    -h, --help      usage information
    -v, --version   version number

    -q, --quiet    disable verbose logging
    -c, --conf     prompt for configuration (not completed yet!)
    -p, --port     port (default is 8084)
    -i, --install  install dependencies

    -f, --flow     include 'flow' - static type checker
    -l, --lint     include 'eslint' - pattern identifying and reporting
    -t, --test     include 'jest' and 'enzyme' - testing toolset
    -d, --dev      alias for '--flow --lint --test'

    -m, --mobx     include 'mobx' - simple, scalable state management
    -r, --redux    include 'redux' - predictable state container

    -o, --router   include 'react-router' - declarative routing

    -a, --sass     include 'sass'
    -y, --styled   include 'styled-components'
`;

const optionDefinitions = [
  { name: 'dir', type: String, defaultOption: true },
  { name: 'port', alias: 'p', type: String },
  { name: 'version', alias: 'v', type: String },
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'install', alias: 'i', type: Boolean },
  { name: 'lint', alias: 'l', type: Boolean },
  { name: 'flow', alias: 'f', type: Boolean },
  { name: 'test', alias: 't', type: Boolean },
  { name: 'mobx', alias: 'm', type: Boolean },
  { name: 'redux', alias: 'r', type: Boolean },
  { name: 'router', alias: 'o', type: Boolean },
  { name: 'sass', alias: 'a', type: Boolean },
  { name: 'styled', alias: 'y', type: Boolean },
  { name: 'quiet', alias: 'q', type: Boolean },
  { name: 'conf', alias: 'c', type: Boolean },
  { name: 'dev', alias: 'd', type: Boolean }
];

const args = commandLineArgs(optionDefinitions);

const startWithPromt = (callback) => {
  const promptLines = [
    'project name (' + (args.dir || projectDefaults.name) + '):',
    'project description:',
    'project author:',
    'project version: (' + projectDefaults.version + '):',
    'project licence: (' + projectDefaults.license + '):',
    'localhost port (' + (args.port || projectDefaults.port) + '):'
  ];
  prompt.start();
  // prompt.message = 'X '.hidden;
  prompt.delimiter = '';
  prompt.get(
    promptLines,
    (err, result) => {
      const name = result[promptLines[0]].replace(/\s/g, '-').trim();
      const description = result[promptLines[1]];
      const author = result[promptLines[2]];
      const version = result[promptLines[3]];
      const licence = result[promptLines[4]];
      const port = result[promptLines[5]];

      project = {
        name: name !== '' ? name : projectDefaults.name,
        desc: description !== '' ? description : projectDefaults.desc,
        author: author !== '' ? author : projectDefaults.author,
        version: version !== '' ? version : projectDefaults.version,
        license: licence !== '' ? licence : projectDefaults.license,
        port: port !== '' ? port : projectDefaults.port
      };

      callback(project, args);
    }
  );
};

module.exports = (callback) => {
  if (!args.dir && !args.conf) {
    console.log(help);
    return;
  } else if (args.version) {
    console.log('v' + pkg.version);
    return;
  } else if (args.sass && args.styled ) {
    console.log('Please use only ONE of the style options:');
    console.log('--sass OR --styled');
    return;
  } else if (args.mobx && args.redux ) {
    console.log('Please use only ONE of the state management options:');
    console.log('--mobx OR --redux');
    return;
  }

  log('');
  log(colors.white('freshpack v' + pkg.version));

  if (args.conf) {
    startWithPromt(callback);
  } else {
    if (args.dev) {
      args.lint = true;
      args.test = true;
      args.flow = true;
    }

    project = {
      name: args.dir || projectDefaults.name,
      desc: projectDefaults.desc,
      author: projectDefaults.author,
      version: projectDefaults.version,
      license: projectDefaults.license,
      port: args.port || projectDefaults.port
    };

    callback(project, args);
  }
};
