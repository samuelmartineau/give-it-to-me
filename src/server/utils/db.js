import knex from 'knex'

import config from '../../../config'

const knexInstance = knex({
  dialect: 'sqlite3',
  connection: {
    filename: config.DB.filename
  }
})

const bookshelf = require('bookshelf')(knexInstance)

export const Wine = bookshelf.Model.extend({
  tableName: 'wines',
  bottles: function () {
    return this.hasMany(Bottle)
  }
})

export const Bottle = bookshelf.Model.extend({
  tableName: 'bottles',
  wine: function () {
    return this.belongsTo(Wine)
  }
})

export const Favorite = bookshelf.Model.extend({
  tableName: 'favorites',
  wine: function () {
    return this.belongsTo(Wine)
  }
})

export default knexInstance
