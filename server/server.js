const express = require('express');
const compression = require('compression');
const config = require('../config');
const { createServer } = require('http');
const Sentry = require('@sentry/node');
const fs = require('fs');
const path = require('path');

const logger = require('./utils/logger');
const { getDB } = require('./utils/db');
const app = require('./app');
const { updateDispatcher } = require('./updateDispatcher');
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
  config.UPLOADS_PERM_FOLDER
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
