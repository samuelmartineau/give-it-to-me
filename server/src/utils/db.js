import path from 'path';
import sqlite3 from 'sqlite3';

import { enhanceDB } from './enhanceDB.js';

function getDB({ filename, showLogs }) {
  const client = sqlite3.verbose();
  const db = new client.Database(path.resolve(filename));

  if (showLogs) {
    db.on('trace', (message) => {
      console.log(message);
    });
  }

  return enhanceDB(db);
}

export { getDB };
