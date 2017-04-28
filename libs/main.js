const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const entries = require('object.entries');
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const colors = require('colors');
const pkg = require('../package.json');

const spacer = ''.hidden;
const listitem = '▪︎'.yellow + '▪︎'.yellow.dim;
const listitem2 = '';  /* '✨  ◼︎◻︎';*/
const spinner = elegantSpinner();
const workingDir = process.cwd();

let start = 0;
let started = 0;
let finished = 0;
let ivalMain = null;
let ivalSpinner = null;
let cmdLineArgs = {};
let currentPath = ''; /* eslint no-unused-vars: 0 */
let projectDirName = '';

const next = () => {
  finished = started;
};

const trimLeft = str => str.replace(/^\s+/, '');
const getTimestamp = () => Date.now();
const getTimer = startx => Date.now() - startx;

const startSpinner = () => {
  clearInterval(ivalSpinner);

  let text = '';
  if (!cmdLineArgs.quiet) {
    text = colors.bold('installing packages ');
  } else {
    // text = colors.white('generating "' + cmdLineArgs.dir + '" boilerplate ');
    text = colors.white('please wait during installation ');
  }

  ivalSpinner = setInterval(() => {
    let counterText = '';
    if (!cmdLineArgs.quiet) {
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
  if (!cmdLineArgs.quiet) {
    console.log(spacer + msg);
  }
  next();
};

const logVersionWarning = (str) => {
  const latestPackageVersion = str.trim();
  if (latestPackageVersion && latestPackageVersion !== pkg.version) {
    console.log(spacer + colors.magenta('v' + latestPackageVersion + ' is available!'));
    // console.log(spacer + colors.white('$ yarn global add freshpack'));
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
    // log(colors.white(currentPath));
    next();
  }
  const dir = path.join.apply(null, parts.slice(0, i));
  fs.existsSync(dir) || fs.mkdirSync(dir);
};

const createFolders = (dirPath) => {
  if (
    (dirPath.includes('vscode') && !cmdLineArgs.flow) ||
    (dirPath.includes('flow-typed') && !cmdLineArgs.flow)
  ) {
    next();
    return;
  }
  dirPath = './' + projectDirName + '/' + dirPath;
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
    (filePath.includes('spec') && !cmdLineArgs.test) ||
    (filePath.includes('state') && !cmdLineArgs.redux) ||
    (filePath.includes('store') && !cmdLineArgs.redux) ||
    (filePath.includes('vscode') && !cmdLineArgs.flow) ||
    (filePath.includes('flowConfig') && !cmdLineArgs.flow) ||
    (filePath.includes('flowType') && !cmdLineArgs.flow)
  ) {
    next();
    return;
  }

  content = trimLeft(content);

  fs.writeFile('./' + projectDirName + '/' + filePath, content, (err) => {
    if (err) return log(err);
    let fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    fileName = colors.yellow(fileName);
    filePath = filePath.substring(0, filePath.lastIndexOf('/'));
    filePath = filePath.length > 0 ? colors.white(filePath + '/') : '';
    const msg = listitem + filePath + fileName;
    log(msg);
    return next();
  });
};

const execCommand = (cmdString, options = {}) => {
  !options.version && startSpinner();

  const cmd = cmdString.split(' ').slice(0, 1)[0];
  const args = cmdString.split(' ').slice(1);
  const prc = spawn(cmd, args);

  prc.stdout.setEncoding('utf8');
  prc.stdout.on('data', (data) => {
    const str = data.toString();
    if (options.version) {
      logVersionWarning(str);
    }
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

const displayDependencies = () => {
  const pkgApp = require(path.join(workingDir, '/', projectDirName, '/package.json'));
  const dependencies = entries(Object.assign(pkgApp.dependencies, pkgApp.devDependencies));
  dependencies.sort();
  dependencies.forEach((dependency) => {
    log(
      listitem +
      colors.white(dependency[0]) + ': '.white +
      colors.yellow(dependency[1])
    );
  });
};

const displayAvailableScripts = () => {
  const pkgApp = require(path.join(workingDir, '/', projectDirName, '/package.json'));
  const port = pkgApp.scripts.start.split('--port ')[1];
  const scripts = entries(Object.assign({}, pkgApp.scripts));
  scripts.forEach((script) => {
    log(colors.white('yarn ' + script[0]));
    script[0] === 'start' && log(colors.white('open http://localhost:' + port + '/'));
  });
};

const exit = () => {
  const pkgApp = require(path.join(workingDir, '/', projectDirName, '/package.json'));
  const port = pkgApp.scripts.start.split('--port ')[1];
  const finishedMsg = listitem2 + colors.green('finished in ~' + Math.round(getTimer(start) / 1000) + ' s');

  if (!cmdLineArgs.quiet) {
    logUpdate(spacer + 'installed packages'.bold);
    displayDependencies();
    log('');
    log(colors.bold(finishedMsg));
    log('');
  } else {
    logUpdate(spacer + finishedMsg + ' \n');
  }

  log('usage'.bold);
  log(colors.white('cd ' + projectDirName));
  displayAvailableScripts();
  log('');

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

const init = (args, dir) => {
  cmdLineArgs = args;
  projectDirName = dir;
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
