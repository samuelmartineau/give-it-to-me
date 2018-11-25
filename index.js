const fs = require('fs');
const next = require('next');
const config = require('./config');

const logger = require('./server/utils/logger');
const server = require('./server/server');

if (!fs.existsSync(config.UPLOADS_PERM)) {
  fs.mkdirSync(config.UPLOADS_PERM);
}

// API REST
// =============================================================================

const app = next({ dev: !config.isProduction });
const handle = app.getRequestHandler();

const URL_MAP = {
  '/': '/'
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

    // server.listen(3000, err => {
    //   if (err) throw err;
    //   console.log('> Ready on http://localhost:3000');
    //
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
