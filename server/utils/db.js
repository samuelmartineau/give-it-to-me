const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const config = require('../../config');

const db = new sqlite3.Database(path.resolve(__dirname, config.DB.filename));

db.on('trace', message => {
  console.log(message);
});

module.exports = {
  db
};
