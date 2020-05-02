const express = require('express');

const pictureRoutes = require('./pictures/routes');
const favoriteRoutes = require('./favorite/routes');
const wineRoutes = require('./wine/routes');
const bottleRoutes = require('./bottle/routes');
const wineFamilyRoutes = require('./wineFamily/routes');
const config = require('../config');

module.exports = (app) => {
  const router = express.Router();
  router.use(pictureRoutes);
  router.use(favoriteRoutes);
  router.use(wineRoutes);
  router.use(bottleRoutes);
  router.use(wineFamilyRoutes);
  router.get('/', (req, res) => res.send('API running'));
  router.get('/debug-sentry', () => {
    throw new Error('My first Sentry error!');
  });
  app.use(config.API_BASE_URL, router);
};
