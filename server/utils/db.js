const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const { enhanceDB } = require('./enhanceDB');

function getDB({ filename, showLogs }) {
  const db = new sqlite3.Database(path.resolve(filename));

  if (showLogs) {
    db.on('trace', (message) => {
      console.log(message);
    });
  }

  return enhanceDB(db);
}

module.exports = {
  getDB,
};
