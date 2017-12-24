const fs = require('fs');
const http = require('http');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('give-it-to-me-config');

const logger = require('./utils/logger');
const { fakeWindow, skip } = require('./utils');

const handleRoutes = require('./handleRoutes');
const { handleChanges } = require('./handleChanges');
require('./utils/db');

if (!fs.existsSync(config.UPLOADS_PERM)) {
  fs.mkdirSync(config.UPLOADS_PERM);
}

if (typeof navigator === 'undefined') {
  global.navigator = {
    userAgent: 'all'
  };
}

// API REST
// =============================================================================
const app = express();
app.use(cors(config.CORS_CONFIG));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(skip(config.API_BASE_URL, cookieParser()));
app.use(skip(config.API_BASE_URL, fakeWindow()));
app.use('/', express.static(path.join(__dirname, '..', '..', 'assets')));
app.use('/', express.static(path.join(__dirname, '..', '..', config.DIST)));
app.use('/', express.static(path.join(__dirname, config.UPLOADS_PERM)));
app.use(
  '/',
  express.static(path.join(__dirname, config.UPLOADS_TMP_DIRECTORY))
);
const serverHttp = http.createServer(app);

serverHttp.listen(config.PORT, () => {
  logger.info(`🚀  Server started on http://localhost:${config.PORT}`);
  handleChanges(serverHttp);
});

handleRoutes(app);

process.on('unhandledRejection', function(reason, p) {
  logger.error(
    `Possibly Unhandled Rejection at: Promise ${p} reason: ${reason}`
  );
});
