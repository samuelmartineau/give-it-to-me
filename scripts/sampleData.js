const sqlite3 = require('sqlite3');
const { promises: fs } = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

const { enhanceDB } = require('../server/utils/enhanceDB');

const dbFilePath = argv.dbPath;

async function main() {
  console.log(`Starting to create DB file here : ${dbFilePath}`);
  const db = new sqlite3.Database(dbFilePath);
  const enhancedDB = enhanceDB(db);

  const samplingScript = await fs.readFile(
    path.resolve(__dirname, '../data/sampling.sql'),
    'utf8'
  );
  await enhancedDB.exec(samplingScript);
}

main();
