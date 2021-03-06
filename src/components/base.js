/**
 * - Yarn scripts
 * - Dependencies
 * - File templates
*/

// Yarn scripts

const baseScripts = {
  start: 'webpack-dev-server --hot --inline --host 0.0.0.0 --port {{PORT}}'
};

// Dependencies

const dependencies = [
  'react',
  'react-dom',
  'prop-types'
];

const devDependencies = [
  '@babel/core',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-decorators',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-transform-runtime',
  '@babel/preset-env',
  '@babel/preset-react',
  'babel-loader',
  'cross-env',
  'extract-text-webpack-plugin',
  'file-loader',
  'css-loader',
  'style-loader',
  'html-webpack-plugin',
  'webpack',
  'webpack-cli',
  'webpack-dev-server'
];

// File templates

const packageJson = `{
  "name": "{{PROJEKT-NAME}}",
  "private": true,
  "description": "{{PROJEKT-DESCRIPTION}}",
  "author": "{{PROJEKT-AUTHOR}}",
  "version": "{{PROJEKT-VERSION}}",
  "license": "{{PROJEKT-LICENCE}}",
  "main": "index.js",
  "scripts": {{PACKAGE-SCRIPTS}}
  {{JEST-CONFIG}}
}
`;

const editorconfig = `
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
`;

const babelrc = `{
  "presets": ["@babel/env", "@babel/react"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-proposal-object-rest-spread"]
  ]
}
`;

const webpackConfig = `
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:{{PORT}}',
    './src/index.js',
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    stats: {
      assets: true,
      timings: true,
      warnings: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      version: false
    }
  }
};
`;

const indexHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{PROJEKT-NAME}}</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
`;

const appCss = `
body {
  margin: 0;
}

.center-wrapper {
  text-align: center;
  position: relative;
  margin-top: 15%;
  top: -25%;
}

h2 {
  font-size: 9rem;
  margin-bottom: 0px;
}

h2 span:first-child { color: black }
h2 span:last-child { color: blue }

button {
  font-size: 1rem;
}
`;

module.exports = {
  appCss,
  babelrc,
  baseScripts,
  dependencies,
  devDependencies,
  editorconfig,
  indexHtml,
  package: packageJson,
  webpackConfig
};
