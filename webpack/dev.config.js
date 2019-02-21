const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./base.config')
const { srcDir } = require('../config')

const development = {
  entry: {
    main: ['webpack-hot-middleware/client?path=./__webpack_hmr']
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /(\.less|\.css)$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
          paths: [srcDir]
        }
      }]
    }]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(base, development)