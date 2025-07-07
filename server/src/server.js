import express from 'express';
import compression from 'compression';
import config from '../../config/index.js';
import { createServer } from 'http';
import * as Sentry from '@sentry/node';
import fs from 'fs';
import path from 'path';

import logger from './utils/logger.js';
import { getDB } from './utils/db.js';
import app from './app.js';
import { updateDispatcher } from './updateDispatcher.js';
const PORT = process.env.GITM_SERVER_PORT || 3000;

const SERVER_VARIABLES = {
  FILE_DIRECTORY: process.env.GITM_FILE_DIRECTORY,
};

const db = getDB({
  filename: process.env.GITM_DB_FILE,
  showLogs: !process.env.NODE_ENV,
});

const permFolderPath = path.join(
  SERVER_VARIABLES.FILE_DIRECTORY,
  config.UPLOADS_PERM_FOLDER,
);

if (!fs.existsSync(permFolderPath)) {
  fs.mkdirSync(permFolderPath);
}

const server = express();

Sentry.init({ dsn: process.env.GITM_API_SENTRY_DSN });

server.use(compression());

const serverHttp = createServer(server);

const { updateClients } = updateDispatcher(serverHttp, db);

app(server, db, updateClients, SERVER_VARIABLES);

serverHttp.listen(PORT, () => {
  logger.info(`🚀  Server started on http://localhost:${PORT}`);
});
