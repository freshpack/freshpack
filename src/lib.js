const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const entries = require('object.entries');
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const colors = require('colors');
const pkg = require('../package.json');

const spacer = ''.hidden;
const listitem = '';
const listitem1 = '▪︎'.yellow + '▪︎'.yellow.dim;
const listitem2 = '';  /* '✨  ◼︎◻︎';*/
const spinner = elegantSpinner();
const workingDir = process.cwd();

let start = 0;
let started = 0;
let finished = 0;
let ivalMain = null;
let ivalSpinner = null;
let cmdArgs = {};
let currentPath = ''; /* eslint no-unused-vars: 0 */
let projectDirName = '';

const next = () => {
  finished = started;
};

const trimLeft = str => str.replace(/^\s+/, '');
const getTimestamp = () => Date.now();
const getTimer = startx => Date.now() - startx;

const getPackage = () => require(path.join(workingDir, '/', projectDirName, '/package.json'));

const startSpinner = (msg) => {
  clearInterval(ivalSpinner);

  let text = '';
  msg = msg || 'installing packages';
  if (!cmdArgs.quiet) {
    text = colors.bold(msg + ' ');
  } else {
    text = colors.white('please wait during installation ');
  }

  ivalSpinner = setInterval(() => {
    let counterText = '';
    if (!cmdArgs.quiet) {
      counterText = colors.dim(' (' + getTimer(start) + ' ms)');
    }
    logUpdate(spacer + text + colors.yellow(spinner()) + counterText);
  }, 50);
};

const log = (msg) => {
  if (!cmdArgs.quiet) {
    console.log(spacer + msg);
  }
  next();
};

const logVersionWarning = (str) => {
  const latestPackageVersion = str.trim();
  if (latestPackageVersion && latestPackageVersion !== pkg.version) {
    console.log(spacer + colors.magenta('v' + latestPackageVersion + ' is available!'));
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
    next();
  }
  const dir = path.join.apply(null, parts.slice(0, i));
  fs.existsSync(dir) || fs.mkdirSync(dir);
};

const createFolders = (dirPath) => {
  const incl = str => dirPath.includes(str);

  if (
    (incl('vscode') && !cmdArgs.flow) ||
    (incl('flow-typed') && !cmdArgs.flow) ||
    (incl('mocks') && !cmdArgs.test) ||
    (incl('mocks') && cmdArgs.styled)
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
  const incl = str => filePath.includes(str);

  if (
    (incl('eslint') && !cmdArgs.lint) ||
    (incl('jest') && !cmdArgs.test) ||
    (incl('spec') && !cmdArgs.test) ||
    (incl('mocks') && !cmdArgs.test) ||
    (incl('mocks') && cmdArgs.styled) ||
    (incl('state') && !cmdArgs.redux && !cmdArgs.mobx) ||
    (incl('store') && !cmdArgs.redux) ||
    (incl('vscode') && !cmdArgs.flow) ||
    (incl('app/types') && !cmdArgs.flow && !cmdArgs.mobx) ||
    (incl('app/style') && cmdArgs.styled) ||
    (incl('flowConfig') && !cmdArgs.flow) ||
    (incl('flow-typed') && !cmdArgs.flow) ||
    (incl('flow-typed') && incl('redux') && !cmdArgs.redux) ||
    (incl('flow-typed/mobx') && !cmdArgs.mobx) ||
    (incl('flow-typed/styled-components') && cmdArgs.sass)
  ) {
    next();
    return;
  }

  content = trimLeft(content);

  fs.writeFile(path.join(workingDir, '/', projectDirName, '/', filePath), content, (err) => {
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
  if (options.dependencies && !cmdArgs.install) {
    setTimeout(next, 0);
    return;
  }
  !options.version && !options.callback && startSpinner();

  const cmd = cmdString.split(' ').slice(0, 1)[0];
  const args = cmdString.split(' ').slice(1);
  const prc = spawn(cmd, args);
  let result = '';

  prc.stdout.setEncoding('utf8');

  prc.stdout.on('data', (data) => {
    const str = data.toString();
    if (options.version) {
      logVersionWarning(str);
    } else if (options.callback) {
      result = str.trim();
    }
  });

  prc.stdout.on('end', () => {
    if (options.callback) {
      options.callback(result);
    } else {
      setTimeout(next, 0);
    }
  });
};

const getVersions = (dependencies, devDependencies) => {
  if (cmdArgs.install) {
    setTimeout(next, 0);
    return;
  }
  dependencies = dependencies.trim().split(' ');
  devDependencies = devDependencies.trim().split(' ');

  let dependenciesCounter = dependencies.length + devDependencies.length;
  const dependenciesObject = {};
  const devDependenciesObject = {};

  const get = (deps, obj) => {
    const depsObject = {};
    deps.forEach((dep) => {
      execCommand('npm view ' + dep + ' dist-tags.latest', {
        callback: (version) => {
          obj[dep] = '^' + version;
          dependenciesCounter -= 1;
        }
      });
    });
  };

  get(dependencies, dependenciesObject);
  get(devDependencies, devDependenciesObject);

  const ival = setInterval(() => {
    startSpinner('get latest version numbers');
    if (dependenciesCounter === 0) {
      clearInterval(ivalSpinner);
      clearInterval(ival);
      setTimeout(() => {
        const pkgApp = getPackage();
        pkgApp.dependencies = dependenciesObject;
        pkgApp.devDependencies = devDependenciesObject;
        writeFile('package.json', JSON.stringify(pkgApp, null, 2));
      }, 0);
    }
  }, 50);
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
  const pkgApp = getPackage();
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
  const pkgApp = getPackage();
  const port = pkgApp.scripts.start.split('--port ')[1];
  const scripts = entries(Object.assign({}, pkgApp.scripts));
  scripts.forEach((script) => {
    log(colors.white('yarn ' + script[0]));
    script[0] === 'start' && log(colors.white('open http://localhost:' + port + '/'));
  });
};

const countAllNodeModules = () => {
  let counter = 0;
  if (cmdArgs.install) {
    const dir = path.join(workingDir, '/', projectDirName, '/node_modules/');
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      if (fs.statSync(dir + file).isDirectory()) {
        if (file.charAt(0) !== '.') {
          counter += 1;
        }
      }
    });
  }
  return counter;
};

const exit = () => {
  const pkgApp = getPackage();
  const port = pkgApp.scripts.start.split('--port ')[1];
  const secs = getTimer(start) / 1000;
  const finishedMsg = listitem2 + colors.green('Done in ' + secs.toFixed(2) + 's.');
  const numModules = countAllNodeModules();
  let listMsg;

  if (!cmdArgs.quiet) {
    if (cmdArgs.install) {
      listMsg = 'installed packages';
    } else {
      listMsg = 'latest versions';
    }
    logUpdate(spacer + listMsg.bold);
    displayDependencies();
    log('');

    if (numModules > 0) {
      log(colors.dim(spacer + '(' + numModules + ' node modules)'));
      log('');
    }

    log(colors.bold(finishedMsg));
    log('');
  } else {
    logUpdate(spacer + finishedMsg + ' \n');
  }

  log('usage'.bold);
  log(colors.white('cd ' + projectDirName));
  if (!cmdArgs.install) {
    log(colors.white('yarn install'));
  }
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
  cmdArgs = args;
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
  versions: getVersions,
  writeFile
};
