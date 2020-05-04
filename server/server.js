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
const PORT = process.env.GITM_PORT || 3000;

if (!process.env.GITM_FILE_DIRECTORY) {
  throw new Error(
    'Missing GITM_FILE_DIRECTORY environnement variable for files storage'
  );
}
if (!process.env.GITM_DB_FILE) {
  throw new Error(
    'Missing GITM_DB_FILE environnement variable for sqlite 3 DB'
  );
}

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

// The request handler must be the first middleware on the app
server.use(Sentry.Handlers.requestHandler());

server.use(compression());

const serverHttp = createServer(server);

const { updateClients } = updateDispatcher(serverHttp, db);

app(server, db, updateClients, SERVER_VARIABLES);

// The error handler must be before any other error middleware and after all controllers
server.use(Sentry.Handlers.errorHandler());

serverHttp.listen(PORT, () => {
  logger.info(`🚀  Server started on http://localhost:${PORT}`);
});

module.exports = server;
