import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { enhanceDB } from '../utils/enhanceDB.js';

const databaseScript = fs.readFileSync(
  path.resolve(__dirname, '../../data/database.sql'),
  'utf8'
);

async function getFreshDB() {
  const db = new sqlite3.verbose().Database(':memory:');
  const enhancedDB = enhanceDB(db);
  await enhancedDB.exec(databaseScript);
  return enhancedDB;
}

export {
  getFreshDB,
};
