# freshpack [![npm](https://img.shields.io/npm/v/freshpack.svg?maxAge=2592000)](https://www.npmjs.com/package/freshpack) [![Build Status](https://travis-ci.org/freshpack/freshpack.svg?branch=master)](https://travis-ci.org/freshpack/freshpack) ![MIT Licensed](https://img.shields.io/npm/l/freshpack.svg)

Tool for generating react apps with current stable dependencies.

To Install (you'll need at least node v6):

```bash
# install global
npm install freshpack -g
```

Using freshpack will scaffold out a project and generate additional files.
It also generates common scripts you can use to lint, test or start the dev server with hot reloding.

```bash
# generate a new project folder,
# comes with package.json, readme, and recommended structure
freshpack
```

```bash
# added sass files and configuration
freshpack --sass
```

```bash
# added lint files and configuration
freshpack --lint
```

```bash
# added jest/enzyme files and configuration
freshpack --test
```

```bash
# combine options
freshpack --sass --lint --test
```

```bash
# change to build dir
cd my-project
```

```bash
# test your app
npm test
```

```bash
# lint your app
npm run lint
```

```bash
# run your app in dev mode
npm start

```


## License
MIT &copy;
