# freshpack

[![npm](https://img.shields.io/npm/v/freshpack.svg)](https://www.npmjs.com/package/freshpack) [![Build Status](https://travis-ci.org/freshpack/freshpack.svg?branch=master)](https://travis-ci.org/freshpack/freshpack) ![devDependencies](https://img.shields.io/david/freshpack/freshpack.svg) ![dependencies](https://img.shields.io/david/dev/freshpack/freshpack.svg) ![issues](https://img.shields.io/github/issues-raw/freshpack/freshpack.svg) ![downloads](https://img.shields.io/npm/dt/freshpack.svg) ![MIT Licensed](https://img.shields.io/npm/l/freshpack.svg)

### Wire Things up the Automatic Way*

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
[Create-react-app](https://github.com/facebookincubator/create-react-app) is an awesome way to get started on a new React project. But unfortunately, standard tools such as Lint, Sass, Flow or Jest have to be installed later manually.

This created the idea of a command line tool that provides options for support of commonly used tools - including all required dependencies, configuration files, minimal sample applications and real commands in the scripts section of package.json (instead of _react-scripts_).

## Installation
(node v6 required)

```bash
$ yarn global add freshpack
```

## Generating project skeletons

### Basic features
```bash
$ freshpack <project-directory>
```
* Generates a minimal React app skeleton ('Hello World')
* Generates minimal webpack configuration file (webpack.config.js)
* Generates babel configuration file (.babelrc)
* Generates editor configuration file (.editorConfig)
* Generates package.json file
* Adds start script for development ('yarn start')
* Installs all required dependencies
* Enables hot reloading
* Displays info if new version of freshpack is available

### Option 'redux'
```bash
$ freshpack <project-directory> [--redux, -r]
```
* Generates skeleton with redux example ('Counter')
* Installs all required 'redux' dependencies
* Adds redux tests

### Option 'sass'
```bash
$ freshpack <project-directory> [--sass, -a]
```
* Generates skeleton with example 'App.sass' file (instead of css)
* Installs all required 'sass' dependencies
* Adds 'sass-loader' to webpack configuration

### Option 'lint'
```bash
$ freshpack <project-directory> [--lint, -l]
```
* Generates 'eslint' configuration (.eslintrc.yaml)
* Adds lint script ('yarn lint')
* Installs all required 'eslint' dependencies
* Installs 'airbnb code style' configuration

### Option 'test'
```bash
$ freshpack <project-directory> [--test, -t]
```
* Generates example 'App.spec.js' file
* Generates 'jest' configuration (.jestrc)
* Adds test script ('yarn test')
* Installs all required 'jest' and 'enzyme' dependencies

### Option 'flow'
```bash
$ freshpack <project-directory> [--flow, -f]
```
* Generates skeleton with 'flow' example(s)
* Installs all required 'flow' dependencies
* Adds 'flow-typed' files
* Adds Visual Studio Code settings file

### Option 'styled'
```bash
$ freshpack <project-directory> [--styled, -y]
```
* Generates skeleton with 'styled-components' example(s)
* Installs required 'styled-components' dependency
* Adds 'styled-components' files

### Option 'quiet'
```bash
$ freshpack <project-directory> [--quiet, -q]
```
* Disable verbose logging

### Option 'dev'
```bash
$ freshpack <project-directory> [--dev, -d]
# .. shorthand for
$ freshpack <project-directory> --flow --lint --test
```
* Combine all dev options

## Available run scripts

### Lint
```bash
$ yarn lint
```
Available after usage with option --lint

### Test
```bash
$ yarn test
$ yarn test:coverage
```
Available after usage with option --test

```bash
$ yarn test:all
```
Available after usage with options --test and --lint (or --dev)

### Run flow status
```bash
$ yarn flow
```
Available after usage with option --flow

### Run app in dev mode
```bash
$ yarn start
```

## File structure

### base:
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

### base + dev + redux + sass:
```bash
$ freshpack <project-directory> -dra

├── .babelrc
├── .editorconfig
├── .eslintrc.yml
├── .flowConfig
├── .mocks
│   └── empty-module.js
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
### base + dev + redux + styled:
```bash
$ freshpack <project-directory> -dry

├── .babelrc
├── .editorconfig
├── .eslintrc.yml
├── .flowConfig
├── .vscode
│   └── settings.json
├── flow-typed
│   ├── prop-types.js
│   ├── react-redux.js
│   ├── redux.js
│   └── styled-components.js
├── package.json
├── src
│   ├── components
│   │   └── app
│   │       ├── App.js
│   │       ├── spec.js
│   │       └── state.js
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

\* Header shamelessly stolen from [Justin Deal](https://zapier.com/engineering/how-to-build-redux/).
