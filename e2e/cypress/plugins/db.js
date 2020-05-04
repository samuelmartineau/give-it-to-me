const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { enhanceDB } = require('../../shared/enhanceDB');

if (!process.env.GITM_DB_FILE) {
  throw new Error(
    'Missing GITM_DB_FILE environnement variable for sqlite 3 DB'
  );
}

const db = new sqlite3.Database(process.env.GITM_DB_FILE);
const enhancedDB = enhanceDB(db);

module.exports = {
  db: enhancedDB,
};
