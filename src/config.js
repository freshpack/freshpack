const colors = require('colors');
const commandLineArgs = require('command-line-args');
const prompt = require('prompt');
const main = require('./main');
const pkg = require('../package.json');

const log = main.log;
let projectName = 'my-project';
let dir = projectName;
let projectDesc = '';
let projectAuthor = '';
let projectPort = 8084;

const help = `
Usage: freshpack <project-directory> [options]
   or: freshpack --conf

  Options:
    -h, --help      output usage information
    -v, --version   output the version number
    -q, --quiet     disable verbose logging
    -c, --conf      show prompt for advanced configuration

    -p, --port      set port (default is 8084)
    -d, --dir       set <project-directory> via option

    -r, --redux     enable redux
    -s, --sass      enable sass
    -t, --test      enable tests with jest
    -l, --lint      enable linting with eslint
    -a, --all       enable sass, lint & test (alias for -stl)
`;

const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'lint', alias: 'l', type: Boolean },
  { name: 'test', alias: 't', type: Boolean },
  { name: 'redux', alias: 'r', type: Boolean },
  { name: 'sass', alias: 's', type: Boolean },
  { name: 'quiet', alias: 'q', type: Boolean },
  { name: 'conf', alias: 'c', type: Boolean },
  { name: 'port', alias: 'p', type: String },
  { name: 'all', alias: 'a', type: Boolean },
  { name: 'dir', type: String, defaultOption: true }
];

const args = commandLineArgs(optionDefinitions);

const start = (callback) => {
  callback(
    projectName,
    projectDesc,
    projectAuthor,
    (args.port || projectPort),
    (args.dir || projectName),
    args
  );
};

const startWithPromt = (callback) => {
  prompt.start();
  prompt.message = 'X '.hidden;
  prompt.delimiter = '';
  prompt.get([
    'project name (' + (args.dir || projectName) + '):',
    'project description:',
    'project author:',
    'localhost port (' + (args.port || projectPort) + '):'
  ],
  (err, result) => {
    const name = result['project name (' + (args.dir || projectName) + '):'].replace(/\s/g, '-').trim();
    const description = result['project description:'];
    const author = result['project author:'];
    const port = result['localhost port (' + (args.port || projectPort) + '):'];

    projectName = name !== '' ? name : projectName;
    projectDesc = description !== '' ? description : projectDesc;
    projectAuthor = author !== '' ? author : projectAuthor;
    projectPort = port !== '' ? port : projectPort;
    dir = projectName;

    callback && callback(
      projectName,
      projectDesc,
      projectAuthor,
      (args.port || projectPort),
      dir,
      args
    );
  });
};

module.exports = (callback) => {
  if (!args.dir && !args.conf) {
    console.log(help);
    return;
  } else if (args.version) {
    console.log('v' + pkg.version);
    return;
  }

  log('');
  log(colors.white('freshpack v' + pkg.version));

  if (args.conf) {
    startWithPromt(callback);
  } else {
    if (args.all) {
      args.sass = true;
      args.lint = true;
      args.test = true;
      args.redux = true;
    }
    start(callback);
  }
};
