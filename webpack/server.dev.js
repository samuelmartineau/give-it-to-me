import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import webpackConfig from './webpack.config.babel'
import config from '../config'

const host = 'localhost'
const appPort = config.PORT
const devServerPort = config.DEV_PORT

new WebpackDevServer(webpack(webpackConfig), {
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: true,
  hot: true,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  proxy: {
    '*': 'http://' + host + ':' + appPort
  }
}).listen(devServerPort, host, function (err) {
  if (err) {
    console.log(err)
  }
  console.log(`==> 🚧  Webpack development server listening on http://${host}:${devServerPort}`)
})
