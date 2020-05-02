const express = require('express');
const bodyParser = require('body-parser');

const wineRoutes = require('./wine/routes');
const wineFamilyRoutes = require('./wineFamily/routes');
const favoriteRoutes = require('./favorite/routes');
const pictureRoutes = require('./pictures/routes');
const bottleRoutes = require('./bottle/routes');
const config = require('../config');

module.exports = (app, db, updateClients) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const router = express.Router();
  router.use(wineRoutes(db, updateClients));
  router.use(wineFamilyRoutes(db, updateClients));
  router.use(favoriteRoutes(db, updateClients));
  router.use(pictureRoutes());
  router.use(bottleRoutes(db, updateClients));
  router.get('/', (req, res) => res.send('API running'));
  router.get('/debug-sentry', () => {
    throw new Error('Sentry test error!');
  });
  app.use(config.API_BASE_URL, router);
};
