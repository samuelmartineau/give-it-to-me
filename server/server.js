const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('../config');
const { createServer } = require('http');
const Sentry = require('@sentry/node');

const logger = require('./utils/logger');

const handleRoutes = require('./handleRoutes');
const { handleChanges } = require('./handleChanges');

const server = express();

Sentry.init({ dsn: process.env.GITM_API_SENTRY_DSN });

// The request handler must be the first middleware on the app
server.use(Sentry.Handlers.requestHandler());

server.use(cors(config.CORS_CONFIG));
server.use(compression());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const serverHttp = createServer(server);

handleRoutes(server);

// The error handler must be before any other error middleware and after all controllers
server.use(Sentry.Handlers.errorHandler());

serverHttp.listen(config.PORT, () => {
  logger.info(`🚀  Server started on http://localhost:${config.PORT}`);
  handleChanges(serverHttp);
});

module.exports = server;
