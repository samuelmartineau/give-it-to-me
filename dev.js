var nodemon = require('nodemon')
require('babel-core/register')
nodemon({
  script: './src/server/index.js',
  watch: './src/server',
  ignore: [
    './src/client/*', './src/common/*', 'node_modules/*'
  ],
  ext: 'js'
})
require('./webpack/server.dev')
