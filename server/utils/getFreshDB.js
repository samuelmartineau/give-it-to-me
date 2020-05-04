const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { enhanceDB } = require('../../shared/enhanceDB');

const databaseScript = fs.readFileSync(
  path.resolve(__dirname, '../../data/database.sql'),
  'utf8'
);

async function getFreshDB() {
  const db = new sqlite3.Database(':memory:');
  const enhancedDB = enhanceDB(db);
  await enhancedDB.exec(databaseScript);
  return enhancedDB;
}

module.exports = {
  getFreshDB,
};
