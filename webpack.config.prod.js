var webpack = require('webpack'),
    path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

var config = require('./config');

module.exports = {
    devtool: 'source-map',
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, config.DIST),
        publicPath: '/',
        filename: config.BUNDLE_FILENAME
    },
    plugins: [
        new CopyWebpackPlugin([{ from: 'assets'}]),
        new CleanWebpackPlugin([config.DIST], {verbose: true}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        })
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel'
        }]
    },
    resolve: {
        extensions: ['', '.js']
    }
};
