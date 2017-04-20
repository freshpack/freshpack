# freshpack [![npm](https://img.shields.io/npm/v/freshpack.svg?maxAge=2592000)](https://www.npmjs.com/package/freshpack) [![Build Status](https://travis-ci.org/freshpack/freshpack.svg?branch=master)](https://travis-ci.org/freshpack/freshpack) ![MIT Licensed](https://img.shields.io/npm/l/freshpack.svg)

Tool for generating react apps with current stable dependencies.

To Install (you'll need at least node v6):

```bash
$ npm install freshpack -g
```

Using freshpack will scaffold out a project and generate additional files.
It also generates common scripts you can use to lint, test or start the dev server with hot reloding.

generate a new project folder, comes with package.json, readme, and recommended structure
```bash
$ freshpack
```

added sass files and configuration
```bash
$ freshpack --sass
```

added lint files and configuration
```bash
$ freshpack --lint
```

added jest/enzyme files and configuration
```bash
$ freshpack --test
```

combine options
```bash
$ freshpack --sass --lint --test
```

change to build dir
```bash
$ cd my-project
```

test your app
```bash
$ npm test
```

lint your app
```bash
$ npm run lint
```

run your app in dev mode
```bash
$ npm start

```

## License
MIT &copy;
