const express = require('express');

const config = require('../../config');
const { getWineFamilies, createWineFamily } = require('./services');

const router = express.Router();

router.route(config.ROUTES.WINE_FAMILY).get((req, res) => {
  return getWineFamilies()
    .then(wineFamilies => {
      res.status(200).json(wineFamilies);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.route(config.ROUTES.WINE_FAMILY).post((req, res) => {
  return createWineFamily(req.body.name)
    .then(wineFamily => {
      res.status(200).json(wineFamily);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
