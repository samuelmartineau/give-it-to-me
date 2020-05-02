const express = require('express');
const compression = require('compression');
const config = require('../config');
const { createServer } = require('http');
const Sentry = require('@sentry/node');

const logger = require('./utils/logger');
const { db } = require('./utils/db');
const app = require('./app');
const { updateDispatcher } = require('./updateDispatcher');

const server = express();

Sentry.init({ dsn: process.env.GITM_API_SENTRY_DSN });

// The request handler must be the first middleware on the app
server.use(Sentry.Handlers.requestHandler());

server.use(compression());

const serverHttp = createServer(server);

const { updateClients } = updateDispatcher(serverHttp, db);

app(server, db, updateClients);

// The error handler must be before any other error middleware and after all controllers
server.use(Sentry.Handlers.errorHandler());

serverHttp.listen(config.PORT, () => {
  logger.info(`🚀  Server started on http://localhost:${config.PORT}`);
});

module.exports = server;
