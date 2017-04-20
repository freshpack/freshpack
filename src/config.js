const commandLineArgs = require('command-line-args');
const prompt = require('prompt');
const main = require('./main');

const log = main.log;
let projectName = 'my-project';
let dir = projectName;
let projectDesc = '';
let projectAuthor = '';
let projectPort = 8084;

const optionDefinitions = [
  // { name: 'help', alias: 'h', type: Boolean }
  { name: 'lint', alias: 'l', type: Boolean },
  { name: 'test', alias: 't', type: Boolean },
  { name: 'sass', alias: 's', type: Boolean },
  { name: 'quite', alias: 'q', type: Boolean }
];

const args = commandLineArgs(optionDefinitions);

module.exports = (callback) => {
  log('');
  prompt.start();
  prompt.message = 'X '.hidden;
  prompt.delimiter = '';
  prompt.get([
    'project name (' + projectName + '):',
    'project description:',
    'project author:',
    'localhost port (' + projectPort + '):'
  ],
  (err, result) => {
    const name = result['project name (' + projectName + '):'].replace(/\s/g, '-').trim();
    const description = result['project description:'];
    const author = result['project author:'];
    const port = result['localhost port (' + projectPort + '):'];

    projectName = name !== '' ? name : projectName;
    projectDesc = description !== '' ? description : projectDesc;
    projectAuthor = author !== '' ? author : projectAuthor;
    projectPort = port !== '' ? port : projectPort;
    dir = projectName;

    log('');

    callback && callback(projectName, projectDesc, projectAuthor, projectPort, dir, args);
  });
};
