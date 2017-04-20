const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const entries = require('object.entries');
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const colors = require('colors');

const spacer = '##'.hidden;
const spinner = elegantSpinner();
const workingDir = process.cwd();

let currentPath = '';
let start = 0;
let started = 0;
let finished = 0;
let ivalMain = null;
let ivalSpinner = null;
let cmdLineArgs = {};

const next = () => {
  finished = started;
};

const getTimestamp = () => Date.now();

const getTimer = startx => Date.now() - startx;

const startSpinner = () => {
  clearInterval(ivalSpinner);

  let text = '';
  if (!cmdLineArgs.quite) {
    text = colors.bold('installing dependencies ');
  } else {
    text = colors.white('creating "' + cmdLineArgs.dir + '" ');
  }

  ivalSpinner = setInterval(() => {
    let counterText = '';
    if (!cmdLineArgs.quite) {
      counterText = colors.dim(' (' + getTimer(start) + ' ms)');
    }
    logUpdate(
      spacer +
      text +
      colors.yellow(spinner()) +
      counterText
    );
  }, 50);
};

const log = (msg) => {
  if (!cmdLineArgs.quite) {
    console.log(spacer + msg);
  }
  next();
};

const chdir = (dir) => {
  try {
    process.chdir(dir);
    next();
  } catch (err) {
    console.log('CHDIR:ERROR: ' + err);
  }
};

const createFolder = (parts, i) => {
  if (typeof parts[i] !== 'undefined') {
    currentPath += '/' + parts[i];
    log(colors.white(currentPath));
  }
  const dir = path.join.apply(null, parts.slice(0, i));
  fs.existsSync(dir) || fs.mkdirSync(dir);
};

const createFolders = (dirPath) => {
  const parts = dirPath.split(path.sep);
  currentPath = '.';
  for (let i = 1; i <= parts.length; i += 1) {
    if (i !== parts.length) {
      createFolder(parts, i);
    } else {
      createFolder(parts, i, next);
    }
  }
};

const writeFile = (filePath, content) => {
  if (
    (filePath.includes('eslint') && !cmdLineArgs.lint) ||
    (filePath.includes('jest') && !cmdLineArgs.test) ||
    (filePath.includes('spec') && !cmdLineArgs.test)
  ) {
    next();
    return;
  }
  fs.writeFile(filePath, content, (err) => {
    if (err) return log(err);
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    filePath = filePath.substring(0, filePath.lastIndexOf('/'));
    const msg = colors.white(filePath + '/') + colors.yellow(fileName);
    log(msg);
    return next();
  });
};

const execCommand = (cmdString) => {
  startSpinner();

  const cmd = cmdString.split(' ').slice(0, 1)[0];
  const args = cmdString.split(' ').slice(1);
  const prc = spawn(cmd, args);

  prc.stdout.setEncoding('utf8');
  prc.stdout.on('data', (data) => {
    const str = data.toString();
    const lines = str.split(/(\r?\n)/g);
    lines.forEach((line) => {
      if (line.trim() !== '') {
        // console.log(line);
      }
    });
  });
  prc.stdout.on('end', () => {
    setTimeout(next, 0);
  });
};

const sequence = (actions) => {
  started -= 1;
  ivalMain = setInterval(() => {
    // console.log(actions.length, started, finished);
    if (actions.length !== finished && (started === finished || started === -1)) {
      clearInterval(ivalSpinner);
      started += 1;
      if (actions.length > started) {
        const args = actions[started].slice(1);
        if (args.length === 1) {
          actions[started][0].call(this, args[0]);
        } else {
          actions[started][0].apply(this, args);
        }
      } else {
        startSpinner();
      }
    }
  }, 100);
};

const displayDependencies = (dir) => {
  const pkg = require(path.join(workingDir, '/', dir, '/package.json'));
  const dependencies = entries(Object.assign(pkg.dependencies, pkg.devDependencies));
  dependencies.forEach((dependency) => {
    log(
      colors.white(dependency[0]) +
      ': '.white + colors.yellow(dependency[1])
    );
  });
};

const exit = (dir) => {
  const pkg = require(path.join(workingDir, '/', dir, '/package.json'));
  const port = pkg.scripts.start.split('--port ')[1];
  const finishedMsg = 'finished in ~' + Math.round(getTimer(start) / 1000) + ' s';

  if (!cmdLineArgs.quite) {
    logUpdate(spacer + 'installed dependencies'.bold);
    displayDependencies(dir);
    log('');
    log(colors.bold(finishedMsg));
    log('');
  } else {
    logUpdate(spacer + finishedMsg + ' \n');
  }

  log('Usage:');
  log('');
  log('$ cd ' + dir);
  log('');
  log('$ yarn start');
  log('# or');
  log('$ npm start');
  log('');
  log('$ open http://localhost:' + port + '/');
  log('');

  if (cmdLineArgs.lint) {
    log('$ yarn lint');
    log('# or');
    log('$ npm run start');
    log('');
  }

  if (cmdLineArgs.lint) {
    log('$ yarn test');
    log('# or');
    log('$ npm start');
    log('');
  }

  clearInterval(ivalMain);
  clearInterval(ivalSpinner);
};

const sleep = (delay) => {
  setTimeout(() => {
    next();
  }, delay);
};

const starting = (headertext) => {
  start = getTimestamp();
  log('');
  log(colors.bold(headertext));
  next();
};

const init = (args) => {
  cmdLineArgs = args;
  next();
};

module.exports = {
  chdir,
  createFolders,
  exec: execCommand,
  exit,
  getTimestamp,
  getTimer,
  init,
  log,
  next,
  sequence,
  sleep,
  starting,
  writeFile
};
