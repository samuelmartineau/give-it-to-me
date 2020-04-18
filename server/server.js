const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('../config');
const { createServer } = require('http');

const logger = require('./utils/logger');

const handleRoutes = require('./handleRoutes');
const { handleChanges } = require('./handleChanges');

const server = express();

server.use(cors(config.CORS_CONFIG));
server.use(compression());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const serverHttp = createServer(server);

handleRoutes(server);

serverHttp.listen(config.PORT, () => {
  logger.info(`🚀  Server started on http://localhost:${config.PORT}`);
  handleChanges(serverHttp);
});

process.on('unhandledRejection', (reason, p) => {
  logger.error(
    `Possibly Unhandled Rejection at: Promise ${p} reason: ${reason}`
  );
});

module.exports = server;
