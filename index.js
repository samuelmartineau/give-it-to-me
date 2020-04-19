const fs = require('fs');
const path = require('path');
const next = require('next');
const config = require('./config');

const server = require('./server/server');

const permFolderPath = path.join(
  __dirname,
  config.ASSETS_BASE_URL,
  config.UPLOADS_PERM
);

if (!fs.existsSync(permFolderPath)) {
  fs.mkdirSync(permFolderPath);
}

// API REST
// =============================================================================

const app = next({ dev: !config.isProduction });
const handle = app.getRequestHandler();

const URL_MAP = {
  '/': '/',
};

app
  .prepare()
  .then(() => {
    server.get('*', (req, res) => {
      const url = URL_MAP[req.path];
      if (url) {
        app.render(req, res, url);
      } else {
        handle(req, res);
      }
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
