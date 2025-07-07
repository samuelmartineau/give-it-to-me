import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import { enhanceDB } from '../src/utils/enhanceDB.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databaseScript = fs.readFileSync(
  path.resolve(__dirname, '../../data/database.sql'),
  'utf8',
);

async function getFreshDB() {
  const client = sqlite3.verbose();
  const db = new client.Database(':memory:');
  const enhancedDB = enhanceDB(db);
  await enhancedDB.exec(databaseScript);
  return enhancedDB;
}

export { getFreshDB };
