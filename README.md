# freshpack [![npm](https://img.shields.io/npm/v/freshpack.svg)](https://www.npmjs.com/package/freshpack) [![Build Status](https://travis-ci.org/freshpack/freshpack.svg?branch=master)](https://travis-ci.org/freshpack/freshpack) ![dependencies](https://img.shields.io/david/freshpack/freshpack.svg) ![MIT Licensed](https://img.shields.io/npm/l/freshpack.svg)

Command line tool for generating react apps with current stable dependencies.

## Install
To Install (you'll need at least node v6):

```bash
$ yarn global add freshpack
# or
$ npm install freshpack -g
```

Using freshpack will scaffold out a project and generate additional files.
It also generates common scripts you can use to lint, test or start the dev server with hot reloding.

## Usage
Generate a new project folder, comes with package.json, readme, and minimal recommended structure and configuration
```bash
$ freshpack
```

Add sass files and configuration
```bash
$ freshpack --sass
```

Add lint files and configuration
```bash
$ freshpack --lint
```

Add jest/enzyme files and configuration
```bash
$ freshpack --test
```

Combine options
```bash
$ freshpack --sass --lint --test
```

Change to build dir
```bash
$ cd my-project
```

Test your app
```bash
$ yarn test
# or
$ npm test
```

Lint your app
```bash
$ yarn lint
# or
$ npm run lint
```

Run your app in dev mode
```bash
$ yarn start
# or
$ npm start
```

## License
MIT &copy;
