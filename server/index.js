const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('../config');
const { createServer } = require('http');

const logger = require('./utils/logger');

const handleRoutes = require('./handleRoutes');
const { handleChanges } = require('./handleChanges');
require('./utils/db');

if (!fs.existsSync(config.UPLOADS_PERM)) {
  fs.mkdirSync(config.UPLOADS_PERM);
}

// API REST
// =============================================================================

const server = express();

server.use(cors(config.CORS_CONFIG));
server.use(compression());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(
  config.ASSETS_BASE_URL,
  express.static(path.join(__dirname, '..', 'assets'))
);
server.use(
  config.ASSETS_BASE_URL,
  express.static(path.join(__dirname, config.UPLOADS_PERM))
);
server.use(
  config.ASSETS_BASE_URL,
  express.static(path.join(__dirname, config.UPLOADS_TMP_DIRECTORY))
);
const serverHttp = createServer(server);

serverHttp.listen(config.PORT, () => {
  logger.info(`🚀  Server started on http://localhost:${config.PORT}`);
  handleChanges(serverHttp);
});

handleRoutes(server);

process.on('unhandledRejection', function(reason, p) {
  logger.error(
    `Possibly Unhandled Rejection at: Promise ${p} reason: ${reason}`
  );
});
