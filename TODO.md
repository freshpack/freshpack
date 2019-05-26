# TODOS

## add deps
```
yarn add redux-saga
yarn add redux-logger
// yarn add svg-inline-loader
yarn add @babel/plugin-transform-regenerator
yarn add @babel/polyfill
yarn add -D url-loader
```

## add to files
```
@babel/plugin-transform-regenerator // .babelrc / plugins
require("@babel/polyfill"); // webpack config

test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true, // webpack@1.x
        disable: true, // webpack@2.x and newer
      },
    },
  ],
```