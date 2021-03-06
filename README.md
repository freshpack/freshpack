# freshpack

[![npm](https://img.shields.io/npm/v/freshpack.svg)](https://www.npmjs.com/package/freshpack) [![Build Status](https://travis-ci.org/freshpack/freshpack.svg?branch=master)](https://travis-ci.org/freshpack/freshpack) ![dependencies](https://img.shields.io/david/freshpack/freshpack.svg) <!---![devDependencies](https://img.shields.io/david/dev/freshpack/freshpack.svg)--> ![issues](https://img.shields.io/github/issues-raw/freshpack/freshpack.svg) <!---![downloads](https://img.shields.io/npm/dt/freshpack.svg)--> ![BSD Licensed](https://img.shields.io/badge/license-MIT-blue.svg)

### Wire Things up the Automatic Way*

Command line tool for a quick development start of React apps. freshpack creates minimal boilerplates and installs **latest versions** of all required dependencies.

## Table of Contents
* [**About**](#about)
* [**Installation**](#installation)
* [**Usage**](#usage)
* [**Commands**](#commands)
* [**Structure**](#structure)

## About
[Create-react-app](https://github.com/facebookincubator/create-react-app) is a comfortable way to get started on a new React project. But unfortunately, standard tools are not selectable and have to be installed (or removed) later.

In contrast, freshpack works _à-la-carte_ and provides options for commonly used tools:

* [ESLint](http://eslint.org/)
* [Flow](https://flow.org/)
* [Jest](https://facebook.github.io/jest/)
* [Enzyme](http://airbnb.io/enzyme/)
* [Sass](http://sass-lang.com/)
* [Styled Components](https://www.styled-components.com/)
* [React Router](https://reacttraining.com/react-router/)
* [Redux](http://redux.js.org/)
* [Mobx](https://mobx.js.org/)

Includes all required dependencies, configuration files, minimal sample applications and original tool commands in the scripts section of package.json (instead of react-scripts).

The tools of modern web development are constantly changing and expanding. This does not lastly affect configuration files and who does not know problems after [webpack](https://webpack.js.org/) updates. [rollup](https://rollupjs.org/guide/en) and other tools affect the development of webpack (tree shaking, inlining, options instead of configuration files, ..) and so the wheel spins on and on.

Of course, this is critical for freshpack, which always loads the latest versions of various components and assembles them without the ability to test. **So no guarantee for a proper interaction of all necessary dependencies in the latest versions.**

>If you get an error after generating an react app with freshpack, please report an issue on the github page!


## Installation
Node v10.16.0 or later and Yarn are required

**Note**: If you are using the  `--lint`  option, please update your Node version: the newest versions of eslint '5.x.x' needs a current Node release (Node v10+)

```bash
$ yarn global add freshpack
```

## Usage

### Basic features
```bash
$ freshpack <project-directory>
```
* Generates a minimal React app skeleton ('Hello World')
* Generates webpack configuration file
* Generates babel configuration file
* Generates editor configuration file (.editorConfig)
* Generates package.json file
* Adds start script for development ('yarn start')
* Retrieves the last version numbers of all necessary dependencies and saved them in package.json file.
* Enables hot reloading
* Displays info when new freshpack version available

### Option `install`
```bash
$ freshpack <project-directory> [--install, -i]
```
* Installs dependencies automatically (yarn install)

### Option `quiet`
```bash
$ freshpack <project-directory> [--quiet, -q]
```
* Disable verbose logging

### Option `router`
```bash
$ freshpack <project-directory> [--router, -o]
```
* Generates skeleton with router example ('Navigation')
* Installs all required 'router' dependencies
* Adds router tests

### Option `redux`
```bash
$ freshpack <project-directory> [--redux, -r]
```
* Generates skeleton with redux example ('Counter')
* Installs all required 'redux' dependencies
* Adds redux tests

### Option `mobx`
```bash
$ freshpack <project-directory> [--mobx, -m]
```
* Generates skeleton with mobx example ('Counter')
* Installs all required 'mobx' dependencies
* Adds mobx dev tools to index file

### Option `sass`
```bash
$ freshpack <project-directory> [--sass, -a]
```
* Generates skeleton with example 'App.sass' file (instead of css)
* Installs all required 'sass' dependencies
* Adds 'sass-loader' to webpack configuration

### Option `lint`
```bash
$ freshpack <project-directory> [--lint, -l]
```
* Generates 'eslint' configuration (.eslintrc.yaml)
* Adds lint script ('yarn lint')
* Installs all required 'eslint' dependencies
* Installs 'airbnb code style' configuration

### Option `test`
```bash
$ freshpack <project-directory> [--test, -t]
```
* Generates example 'App.spec.js' file
* Generates 'jest' configuration (.jestrc)
* Adds test script ('yarn test')
* Installs all required 'jest' and 'enzyme' dependencies

### Option `flow`
```bash
$ freshpack <project-directory> [--flow, -f]
```
* Generates skeleton with 'flow' example(s)
* Installs all required 'flow' dependencies
* Adds 'flow-typed' files
* Adds Visual Studio Code settings file

### Option `styled`
```bash
$ freshpack <project-directory> [--styled, -y]
```
* Generates skeleton with 'styled-components' example(s)
* Installs required 'styled-components' dependency
* Adds 'styled-components' files

### Option `dev`
```bash
$ freshpack <project-directory> [--dev, -d]
# .. shorthand for
$ freshpack <project-directory> --flow --lint --test
```
* Combine all dev options

## Commands

### Lint
Available after usage with option --lint
```bash
$ yarn lint
```

### Test
Available after usage with option --test
```bash
$ yarn test
$ yarn test:watch
$ yarn test:watch:all
$ yarn test:coverage
```

Available after usage with options --test and --lint (or --dev)

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

## Structure

Here are some **examples** of the generated boilerplate file systems, which differ from each other according to selected options.

The source folder is not sorted according to functionalities (folders for all components, containers, reducers, tests, etc.), but bundles all module-related files (scripts, styles, state, spec and types) in module folders.

Redux components (actions, action creators and reducers) are stored together in a single "state" file in the module folder and not in different folders or files.

This structure is, of course, a matter of taste as well as the application case and easy to change in the generated boilerplate.

### Minimal React Skeleton
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

### React + Flow + ESLint + Test + Redux + Sass
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
### React + Flow + ESLint + Test + Redux + Styled Components

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
│   │       ├── state.js
│   │       └── styled.js
│   ├── index.html
│   ├── index.js
│   └── store.js
├── webpack.config.js
└── yarn.lock
```

## Copyright & License
&copy; 2017 - 2018 Uli Preuss, BSD-3-Clause

\* Header from '[Build Yourself a Redux](https://zapier.com/engineering/how-to-build-redux/)' by Justin Deal.
