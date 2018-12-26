const path = require('path');
const express = require('express');
const config = require('../config');
const app = express();

app.use(
  config.ASSETS_BASE_URL,
  express.static(path.join(__dirname, '..', 'assets'))
);

app.listen(config.devProxyPort, function() {
  console.log(`assets served from ${config.devProxyPort}!`);
});
