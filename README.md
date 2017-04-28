# freshpack

[![npm](https://img.shields.io/npm/v/freshpack.svg)](https://www.npmjs.com/package/freshpack) [![Build Status](https://travis-ci.org/freshpack/freshpack.svg?branch=master)](https://travis-ci.org/freshpack/freshpack) ![devDependencies](https://img.shields.io/david/freshpack/freshpack.svg) ![dependencies](https://img.shields.io/david/dev/freshpack/freshpack.svg) ![issues](https://img.shields.io/github/issues-raw/freshpack/freshpack.svg) ![downloads](https://img.shields.io/npm/dt/freshpack.svg) ![MIT Licensed](https://img.shields.io/npm/l/freshpack.svg)

Command line tool for a quick development start of React apps.
Creates dynamically boilerplates and installs _automatically_ all required dependencies in _latest versions_ with 'yarn'.

**Note**: 'yarn' must be installed! See [yarn installation guide](https://yarnpkg.com/lang/en/docs/install/)

## Table of Contents

* [**Features**](#features)
* [**Installation**](#installation)
* [**Generating project**](#generating-project)
* [**Available yarn scripts**](#available-yarn-scripts)
* [**Generated file structure**](#generated-file-structure)

## Features

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

### Option 'sass'
* Generates skeleton with example 'App.sass' file (instead of css)
* Installs all required 'sass' dependencies
* Adds 'sass-loader' to webpack configuration

### Option 'lint'
* Generates 'eslint' configuration (.eslintrc.yaml)
* Adds lint script ('yarn lint')
* Installs all required 'eslint' dependencies
* Installs 'airbnb code style' configuration

### Option 'test'
* Generates example 'App.spec.js' file
* Generates 'jest' configuration (.jestrc)
* Adds test script ('yarn test')
* Installs all required 'jest' and 'enzyme' dependencies

### Option 'redux'
* Generates skeleton with redux example ('Counter')
* Installs all required 'redux' dependencies
* Adds redux tests

### Option 'flow' **[NEW]**
* Generates skeleton with flow example(s)
* Installs all required 'flow' dependencies
* Adds 'flow-typed' files
* Adds Visual Studio Code settings file


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

## Generating project
Using freshpack will scaffold out a project and generate additional files.

Create minimal project (React, CSS, configuration files and dependencies)
```bash
$ freshpack <project-directory>
```

Disable verbose logging [--quiet, -q]
```bash
$ freshpack <project-directory> --quiet
```

Add Redux files, configuration and dependencies [--redux, -r]
```bash
$ freshpack <project-directory> --redux
```

Add sass files, configuration and dependencies [--sass, -s]
```bash
$ freshpack <project-directory> --sass
```

Adds ESLint files, configuration and dependencies [--lint, -l]
```bash
$ freshpack <project-directory> --lint
```

Add Jest and Enzyme files, configuration and dependencies [--test, -t]
```bash
$ freshpack <project-directory> --test
```

Add Flow-type files, configuration and dependencies [--flow, -f]
```bash
$ freshpack <project-directory> --flow
```

Combine options [--all, -a]
```bash
$ freshpack <project-directory> -all
# .. shorthand for
$ freshpack <project-directory> --redux --sass --lint --test --flow

```

## Available yarn scripts

Note: Do not forget to change the directory
```bash
$ cd <project-directory>
```

### Lint app
Note: Only usable after previous use of option --lint
```bash
$ yarn lint
```

### Test app
Note: Only usable after previous use of option --test
```bash
$ yarn test
$ yarn test:coverage
```

Note: Only usable after previous use of option --test and --lint or --all
```bash
$ yarn test:all
```

### Run flow status
Note: Only usable after previous use of option --flow
```bash
$ yarn flow
```

### Run app in dev mode
```bash
$ yarn start
```

## Generated file structure

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
$ freshpack <project-directory> -a

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
