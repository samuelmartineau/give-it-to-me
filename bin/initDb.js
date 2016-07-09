#!/usr/bin/env node

const r = require('rethinkdb')
const config = require('../config')

const getConnection = r.connect({host: config.DB.host})
const database = config.DB.database

getConnection.then(conn => {
  return r.dbCreate(database).run(conn).then(() => {
    return Promise.all(Object.keys(config.DB.tables).map(tableKey => {
      const table = config.DB.tables[tableKey]
      return r.db(database)
        .tableCreate(table.name)
        .run(conn)
        .then(() => {
          if (table.indexes) {
            const indexPromises = table.indexes.map(index => {
              return r.db(database).table(table.name)
                .indexCreate(index)
                .run(conn)
            })
            return Promise.all(indexPromises)
          }
        })
        .then(function () {
          return r.db(database).table(table.name).indexWait().run(conn)
        })
    }))
  })
})
.catch(console.error)
.finally(process.exit)
