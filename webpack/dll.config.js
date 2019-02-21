const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const path = require('path')
const config = require('../config')

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom', 'react-loadable', 'mobx', 'mobx-react', 'crypto-js', 'js-cookie', 'flyio']
  },
  mode: 'production',
  output: {
    path: path.resolve(config.basePath, 'dll'),
    filename: '[name].dll.[hash:5].js',
    library: '[name]_library'
  },
  performance: {
    hints: false
  },
  plugins: [
    new WebpackBar({
      minimal: false,
      compiledIn: false
    }),
    new webpack.DllPlugin({
      name: '[name]_library',
      path: path.resolve(config.basePath, 'dll', 'manifest.json'),
      context: config.basePath
    })
  ]
};