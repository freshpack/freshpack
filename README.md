# freshpack

[![npm](https://img.shields.io/npm/v/freshpack.svg)](https://www.npmjs.com/package/freshpack) [![Build Status](https://travis-ci.org/freshpack/freshpack.svg?branch=master)](https://travis-ci.org/freshpack/freshpack) ![devDependencies](https://img.shields.io/david/freshpack/freshpack.svg) ![dependencies](https://img.shields.io/david/dev/freshpack/freshpack.svg) ![issues](https://img.shields.io/github/issues-raw/freshpack/freshpack.svg) ![downloads](https://img.shields.io/npm/dt/freshpack.svg) ![MIT Licensed](https://img.shields.io/npm/l/freshpack.svg)

**Wire Things up the Automatic Way**

Command line tool for a quick development start of React apps.
Creates minimal boilerplates and installs all required dependencies in _latest versions_ with 'yarn'.

**Note**: 'yarn' must be installed! See [yarn installation guide](https://yarnpkg.com/lang/en/docs/install/)

## Table of Contents
* [**Motivation**](#motivation)
* [**Installation**](#installation)
* [**Generating projects**](#generating-projects)
* [**Available run scripts**](#available-run-scripts)
* [**File structure**](#file-structure)

## Motivation
[_Create-react-app_](https://github.com/facebookincubator/create-react-app) is a great way to get started on a new React project. But unfortunately, standard tools such as Lint, Sass, Flow or Jest have to be installed later manually.

This created the idea of a command line tool that provides options for support of commonly used tools - including all required dependencies, configuration files, minimal sample applications and real commands in the scripts section of package.json (instead of _react-scripts_).

## Installation
(node v6 required)

```bash
$ yarn global add freshpack
```

## Generating project skeletons

### Basic features
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

### Option 'flow'
* Generates skeleton with 'flow' example(s)
* Installs all required 'flow' dependencies
* Adds 'flow-typed' files
* Adds Visual Studio Code settings file
```bash
$ freshpack <project-directory> [--flow, -f]
```

### Option 'styled' **[NEW]**
* Generates skeleton with 'styled-components' example(s)
* Installs required 'styled-components' dependency
* Adds 'styled-components' files
```bash
$ freshpack <project-directory> [--styled, -y]
```

### Option 'quiet'
* Disable verbose logging
```bash
$ freshpack <project-directory> [--quiet, -q]
```

### Option 'dev'
* Combine all dev options
```bash
$ freshpack <project-directory> [--dev, -d]
# .. shorthand for
$ freshpack <project-directory> --flow --lint --test
```

## Available run scripts

### Lint
Available after usage with option --lint
```bash
$ yarn lint
```

### Test
Available after usage with option --test
```bash
$ yarn test
$ yarn test:coverage
```

Available after usage with options --test and --lint (or --all)
```bash
$ yarn test:all
```

### Run flow status
Available after usage with option --flow
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

### Complete (react, redux, styled, lint, test, flow)
```bash
$ freshpack <project-directory> --dry

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
