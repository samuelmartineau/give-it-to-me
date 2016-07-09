import webpack from 'webpack'
import path from 'path'

import config from '../config'

const webpackConfig = {
  devtool: 'source-map',
  entry: {
    main: [
      './src/client'
    ],
    vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'material-ui']
  },
  debug: true,
  output: {
    path: path.resolve(__dirname, '..', config.DIST),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  module: {
    preLoaders: [
      {
        // set up standard-loader as a preloader
        test: /\.jsx?$/,
        loader: 'standard',
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /(node_modules|src\/server)/
      }
    ]
  },
  standard: {
    // config options to be passed through to standard e.g.
    parser: 'babel-eslint'
  }
}

if (process.env.NODE_ENV === 'development') {
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  webpackConfig.entry.main = [`webpack-dev-server/client?http://localhost:${config.DEV_PORT}`, 'webpack/hot/only-dev-server', 'react-hot-loader/patch'].concat(webpackConfig.entry.main)
  webpackConfig.output.publicPath = `http://localhost:${config.DEV_PORT}/`
} else {
  webpackConfig.plugins.push(new webpack.optimize.DedupePlugin())
  webpackConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin())
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  }))
}

module.exports = webpackConfig
