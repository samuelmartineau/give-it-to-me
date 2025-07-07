import express from 'express';
import bodyParser from 'body-parser';

import wineRoutes from './wine/routes.js';
import wineFamilyRoutes from './wineFamily/routes.js';
import favoriteRoutes from './favorite/routes.js';
import pictureRoutes from './pictures/routes.js';
import bottleRoutes from './bottle/routes.js';
import config from '../../config/index.js';

export default (app, db, updateClients, SERVER_VARIABLES) => {
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());

  const router = express.Router();
  router.use(wineRoutes(db, updateClients, SERVER_VARIABLES));
  router.use(wineFamilyRoutes(db, updateClients));
  router.use(favoriteRoutes(db, updateClients));
  router.use(pictureRoutes(SERVER_VARIABLES));
  router.use(bottleRoutes(db, updateClients));
  router.get('/', (req, res) => res.send('API running'));
  router.get('/debug-sentry', () => {
    throw new Error('Sentry test error!');
  });
  app.use(config.API_BASE_URL, router);
};
