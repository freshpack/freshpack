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
  'babel-core',
  'babel-loader',
  'babel-plugin-transform-class-properties',
  'babel-plugin-transform-object-rest-spread',
  'babel-plugin-transform-runtime',
  'babel-preset-es2015',
  'babel-preset-react',
  'babel-preset-stage-0',
  'cross-env',
  'extract-text-webpack-plugin',
  'file-loader',
  'css-loader',
  'style-loader',
  'html-webpack-plugin',
  'webpack',
  'webpack-dev-server'
];

// File templates

const packageJson = `{
  "name": "{{PROJEKT-NAME}}",
  "description": "{{PROJEKT-DESCRIPTION}}",
  "author": "{{PROJEKT-AUTHOR}}",
  "version": "{{PROJEKT-VERSION}}",
  "license": "{{PROJEKT-LICENCE}}",
  "main": "index.js",
  "scripts": {{PACKAGE-SCRIPTS}}
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
  "presets": ["es2015", "react"],
  "plugins": ["transform-object-rest-spread"]
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
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:{{PORT}}',
    './src/index.js',
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
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

const indexJs = `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App.js';

ReactDOM.render(<App />, document.getElementById('root'));
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

const appJs = `
import React from 'react';
import './style.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="app" style={{ textAlign: 'center' }}>
        <h1>Hello <span>World</span><span>!</span></h1>
      </div>
    );
  }
}
`;

const appCss = `
h1 { color: red }
h1 span { color: blue }

h2 {
  font-size: 9rem;
  margin-bottom: 0px;
}

button {
  font-size: 1rem;
}
`;

module.exports = {
  baseScripts,
  dependencies,
  devDependencies,
  editorconfig,
  package: packageJson,
  babelrc,
  webpackConfig,
  indexJs,
  indexHtml,
  appJs,
  appCss
};
