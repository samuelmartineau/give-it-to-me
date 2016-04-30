var webpack = require('webpack'),
    path = require('path'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

var config = require('./config');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './src/client/index.js'
    ],
    output: {
        path: path.resolve(__dirname, config.DIST),
        publicPath: '/',
        filename: config.BUNDLE_FILENAME
    },
    plugins: [
        new CopyWebpackPlugin([{ from: 'assets'}]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            },
            '__SOCKET_PORT__': config.PORT
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
