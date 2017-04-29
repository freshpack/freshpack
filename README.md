# freshpack

[![npm](https://img.shields.io/npm/v/freshpack.svg)](https://www.npmjs.com/package/freshpack) [![Build Status](https://travis-ci.org/freshpack/freshpack.svg?branch=master)](https://travis-ci.org/freshpack/freshpack) ![devDependencies](https://img.shields.io/david/freshpack/freshpack.svg) ![dependencies](https://img.shields.io/david/dev/freshpack/freshpack.svg) ![issues](https://img.shields.io/github/issues-raw/freshpack/freshpack.svg) ![downloads](https://img.shields.io/npm/dt/freshpack.svg) ![MIT Licensed](https://img.shields.io/npm/l/freshpack.svg)

Command line tool for a quick development start of React apps.
Creates dynamically boilerplates and installs _automatically_ all required dependencies in _latest versions_ with 'yarn'.

**Note**: 'yarn' must be installed! See [yarn installation guide](https://yarnpkg.com/lang/en/docs/install/)

## Table of Contents

* [**Installation**](#installation)
* [**Generating projects**](#generating-projects)
* [**Yarn scripts**](#available-yarn-scripts)
* [**File structures**](#generated-file-structure)

## Installation
(node v6 required)

```bash
$ yarn global add freshpack
```

### Installation test
Display help screen [--help, -h]
```bash
$ freshpack --help
```

### Version info
Display help screen [--version, -v]
```bash
$ freshpack --version
```

## Generating projects

### Basic
* Generates a minimal React app skeleton ('Hello World')
* Generates minimal webpack configuration file (webpack.config.js)
* Generates babel configuration file (.babelrc)
* Generates editor configuration file (.editorConfig)
* Generates package.json file
* Adds start script for development ('yarn start')
* Installs all required dependencies
* Enables hot reloading
* Displays info if new version of freshpack is available
```bash
$ freshpack <project-directory>
```

### Option 'redux'
* Generates skeleton with redux example ('Counter')
* Installs all required 'redux' dependencies
* Adds redux tests
```bash
$ freshpack <project-directory> [--redux, -r]
```

### Option 'sass'
* Generates skeleton with example 'App.sass' file (instead of css)
* Installs all required 'sass' dependencies
* Adds 'sass-loader' to webpack configuration
```bash
$ freshpack <project-directory> [--sass, -s]
```

### Option 'lint'
* Generates 'eslint' configuration (.eslintrc.yaml)
* Adds lint script ('yarn lint')
* Installs all required 'eslint' dependencies
* Installs 'airbnb code style' configuration
```bash
$ freshpack <project-directory> [--lint, -l]
```

### Option 'test'
* Generates example 'App.spec.js' file
* Generates 'jest' configuration (.jestrc)
* Adds test script ('yarn test')
* Installs all required 'jest' and 'enzyme' dependencies
```bash
$ freshpack <project-directory> [--test, -t]
```

### Option 'flow' **[NEW]**
* Generates skeleton with flow example(s)
* Installs all required 'flow' dependencies
* Adds 'flow-typed' files
* Adds Visual Studio Code settings file
```bash
$ freshpack <project-directory> [--flow, -f]
```

### Option 'quiet'
* Disable verbose logging
```bash
$ freshpack <project-directory> [--quiet, -q]
```

### Option 'all'
* Combine all options
```bash
$ freshpack <project-directory> [--all, -a]
# .. shorthand for
$ freshpack <project-directory> --redux --sass --lint --test --flow
```

## Yarn scripts

### Lint scripts
Usable with option --lint
```bash
$ yarn lint
```

### Test scripts
Usable with option --test
```bash
$ yarn test
$ yarn test:coverage
```

Usable with options --test and --lint (or --all)
```bash
$ yarn test:all
```

### Run flow
Usable with option --flow
```bash
$ yarn flow
```

### Run app in dev mode
```bash
$ yarn start
```

## File structure

### Minimal (react, css)
```bash
$ freshpack <project-directory>

├── .babelrc
├── .editorconfig
├── package.json
├── src
│   ├── components
│   │   └── app
│   │       ├── App.js
│   │       └── style.css
│   ├── index.html
│   └── index.js
├── webpack.config.js
└── yarn.lock
```

### Complete (react, redux, sass, lint, test, flow)
```bash
$ freshpack <project-directory> --all

├── .babelrc
├── .editorconfig
├── .eslintrc.yml
├── .flowConfig
├── .jestrc
├── .vscode
│   └── settings.json
├── flow-typed
│   ├── prop-types.js
│   ├── react-redux.js
│   └── redux.js
├── package.json
├── src
│   ├── components
│   │   └── app
│   │       ├── App.js
│   │       ├── spec.js
│   │       ├── state.js
│   │       └── style.scss
│   ├── index.html
│   ├── index.js
│   └── store.js
├── webpack.config.js
└── yarn.lock
```

## License
MIT

## Copyright
&copy; 2017 Uli Preuss
