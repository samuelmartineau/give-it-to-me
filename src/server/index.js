if (process.env.HEROKU) {
  var fs = require('fs')
  var exists = fs.existsSync('gitm.db')
  if (!exists) {
    require('../../bin/initDb')
  }
}
require('babel-core/register') // enables ES6 ('import'.. etc) in Node
require('./app')
