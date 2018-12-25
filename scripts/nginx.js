const path = require('path');
const express = require('express');
const config = require('../config');
const app = express();

app.use(
  config.ASSETS_BASE_URL,
  express.static(path.join(__dirname, '..', 'assets'))
);

app.use(
  config.ASSETS_BASE_URL,
  express.static(path.join(__dirname, '..', 'assets', config.UPLOADS_PERM))
);
app.use(
  config.ASSETS_BASE_URL,
  express.static(
    path.join(__dirname, '..', 'assets', config.UPLOADS_TMP_DIRECTORY)
  )
);

app.listen(config.devProxyPort, function() {
  console.log(`assets served from ${config.devProxyPort}!`);
});
