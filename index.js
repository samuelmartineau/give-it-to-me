const next = require('next');

const server = require('./server/server');

const isProduction = process.env.NODE_ENV === 'production';

// API REST
// =============================================================================

const app = next({ dev: !isProduction });
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
