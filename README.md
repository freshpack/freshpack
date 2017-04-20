# freshpack [![npm](https://img.shields.io/npm/v/freshpack.svg)](https://www.npmjs.com/package/freshpack) [![Build Status](https://travis-ci.org/freshpack/freshpack.svg?branch=master)](https://travis-ci.org/freshpack/freshpack) ![dependencies](https://img.shields.io/david/freshpack/freshpack.svg) ![MIT Licensed](https://img.shields.io/npm/l/freshpack.svg)

Command line tool for generating react apps with current stable dependencies.

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
$ freshpack <project-directory> --quite
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
