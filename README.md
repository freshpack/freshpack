# freshpack [![npm](https://img.shields.io/npm/v/freshpack.svg)](https://www.npmjs.com/package/freshpack) [![Build Status](https://travis-ci.org/freshpack/freshpack.svg?branch=master)](https://travis-ci.org/freshpack/freshpack) ![dependencies](https://img.shields.io/david/freshpack/freshpack.svg) ![MIT Licensed](https://img.shields.io/npm/l/freshpack.svg)

Command line tool for a quick and easy start of development of 'React' apps.
Installs automatically all required dependencies in current stable versions with 'yarn'.

**Note: 'yarn' must be installed!**

See [yarn installation guide](https://yarnpkg.com/lang/en/docs/install/)


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

## Install
(you'll need at least node v6)

```bash
$ yarn global add freshpack
# or
$ npm install freshpack -g
```

Display help screen
```bash
$ freshpack --help
```

## Generate project
Using freshpack will scaffold out a project and generate additional files.

Create minimal project (react, css)
```bash
$ freshpack <project-directory>
```

Disable verbose logging
```bash
$ freshpack <project-directory> --quiet
```

Add sass files and configuration
```bash
$ freshpack <project-directory> --sass
```

Add lint files and configuration
```bash
$ freshpack <project-directory> --lint
```

Add jest/enzyme files and configuration
```bash
$ freshpack <project-directory> --test
```

Combine options
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
MIT &copy;
