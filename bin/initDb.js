#!/usr/bin/env node

var r = require('rethinkdb')
var config = require('../config')

var getConnection = r.connect({host: config.DB.host})

getConnection.then(function (conn) {
  return r.dbCreate(config.DB.database).run(conn).then(function () {
    Object.keys(config.DB.tables).forEach(function (tableKey) {
      r.db(config.DB.database).tableCreate(config.DB.tables[tableKey]).run(conn)
    })
  })
}).finally(process.exit)
