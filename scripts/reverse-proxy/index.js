const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');
const config = require('../../config');

const MAIN_PORT = 3005;
const PORT = process.env.GITM_PORT || 3000;
const limit = '50mb';

const app = express();

app.use(express.json({ limit }));

app.use('/assets/', express.static(path.resolve(__dirname, '../../assets')));
app.use('/files', express.static(process.env.GITM_FILE_DIRECTORY));

const PROXY_URL = `http://localhost:${PORT}`;

const UPLOAD_URL = `${config.API_BASE_URL}${config.ROUTES.PICTURE}`;

app.use(
  UPLOAD_URL,
  proxy(PROXY_URL, {
    limit,
    parseReqBody: false,
    proxyReqPathResolver: () => {
      return UPLOAD_URL;
    },
  })
);

app.use('/', proxy(PROXY_URL));

app.listen(MAIN_PORT, () => {
  console.log(`Everything running on http://localhost:${MAIN_PORT}`);
});
