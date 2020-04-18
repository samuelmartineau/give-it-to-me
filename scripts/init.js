const sqlite3 = require('sqlite3');
const fs = require('fs');
const path = require('path');
const config = require('../config');

const db = new sqlite3.Database(
  path.resolve(__dirname, '../server/utils/', config.DB.filename)
);

const initScript = fs.readFileSync(
  path.resolve(__dirname, './database.sql'),
  'utf8'
);
const wineFamiliesScript = fs.readFileSync(
  path.resolve(__dirname, './wineFamilies.sql'),
  'utf8'
);

const samplingScript = fs.readFileSync(
  path.resolve(__dirname, './samping.sql'),
  'utf8'
);

db.exec(initScript, () => {
  db.exec(wineFamiliesScript, () => {
    db.exec(samplingScript, () => {
      console.log('success');
    });
  });
});
