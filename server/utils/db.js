const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const config = require('../../config');
const { enhanceDB } = require('./enhanceDB');

const db = new sqlite3.Database(path.resolve(config.DB.filename));

if (!process.env.NODE_ENV) {
  db.on('trace', (message) => {
    console.log(message);
  });
}

module.exports = {
  db: enhanceDB(db),
};
