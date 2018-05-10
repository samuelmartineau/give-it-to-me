const knex = require('knex');

const config = require('../../config');

const knexInstance = knex({
  dialect: 'sqlite3',
  connection: {
    filename: config.DB.filename
  }
});

const bookshelf = require('bookshelf')(knexInstance);

const Wine = bookshelf.Model.extend({
  tableName: 'wines',
  bottles: function() {
    return this.hasMany(Bottle);
  }
});

const Bottle = bookshelf.Model.extend({
  tableName: 'bottles',
  wine: function() {
    return this.belongsTo(Wine);
  }
});

const Favorite = bookshelf.Model.extend({
  tableName: 'favorites',
  wine: function() {
    return this.belongsTo(Wine);
  }
});

module.exports = {
  knexInstance,
  Wine,
  Bottle,
  Favorite
};
