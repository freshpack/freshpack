# freshpack

[![npm](https://img.shields.io/npm/v/freshpack.svg)](https://www.npmjs.com/package/freshpack) [![Build Status](https://travis-ci.org/freshpack/freshpack.svg?branch=master)](https://travis-ci.org/freshpack/freshpack) ![devDependencies](https://img.shields.io/david/freshpack/freshpack.svg) ![dependencies](https://img.shields.io/david/dev/freshpack/freshpack.svg) ![issues](https://img.shields.io/github/issues-raw/freshpack/freshpack.svg) ![downloads](https://img.shields.io/npm/dt/freshpack.svg) ![MIT Licensed](https://img.shields.io/npm/l/freshpack.svg)

Command line tool for a quick and easy development start of React apps.
Installs _**automatically**_ all required dependencies in _**current stable versions**_ with 'yarn'.

**Note**: 'yarn' must be installed! See [yarn installation guide](https://yarnpkg.com/lang/en/docs/install/)

## Features

### Basic
* Generates minimal App-Skeleton
* Generates minimal webpack configuration file (webpack.config.js)
* Generates babel configuration file (.babelrc)
* Generates editor configuration file (.editorConfig)
* Generates package.json file
* Adds 'start' script for development ('yarn start')
* Installs all required dependencies
* Enable hot reloading
* Displays info if new version of freshpack is available **[NEW]**

### Option 'redux' **[NEW]**
* Generates App-Skeleton with redux example 'App.js' file
* Installs all required 'redux' dependencies

### Option 'sass'
* Generates App-Skeleton with example 'App.sass' file instead of css
* Installs all required 'sass' dependencies
* Adds 'sass-loader' to webpack configuration

### Option 'lint'
* Generates 'eslint' configuration (.eslintrc.yaml)
* Adds 'lint' script ('yarn lint')
* Installs all required 'eslint' dependencies
* Installs 'airbnb code style' configuration

### Option 'test'
* Generates example 'App.spec.js' file
* Generates 'jest' configuration
* Adds 'test' script ('yarn test')
* Installs all required 'jest' and 'enzyme' dependencies

**More options like 'redux', 'postcss' or 'stylelint' are coming soon ..**

## Installation
(you'll need at least node v6)

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

Create minimal project (react, css)
```bash
$ freshpack <project-directory>
```

Disable verbose logging [--quiet, -q]
```bash
$ freshpack <project-directory> --quiet
```

Add redux files, configuration and dependencies [--redux, -r]
```bash
$ freshpack <project-directory> --redux
```

Add sass files, configuration and dependencies [--sass, -s]
```bash
$ freshpack <project-directory> --sass
```

Add lint files, configuration and dependencies [--lint, -l]
```bash
$ freshpack <project-directory> --lint
```

Add jest/enzyme files, configuration and dependencies [--test, -t]
```bash
$ freshpack <project-directory> --test
```

Combine all addon options [--all, -a]
```bash
$ freshpack <project-directory> --sass --lint --test
# or
$ freshpack <project-directory> -all
```

## Project scripts

Change to build dir
```bash
$ cd <project-directory>
```

Test your app
```bash
$ yarn test
```

Lint your app
```bash
$ yarn lint
```

Run your app in dev mode
```bash
$ yarn start
```

## License
MIT

## Copyright
&copy; 2017 Uli Preuss
