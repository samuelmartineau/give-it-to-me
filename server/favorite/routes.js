const urlJoin = require('url-join');
const express = require('express');

const config = require('../../config');
const { addToFavorite, removeFromFavorite } = require('./services');
const { updateClients } = require('../handleChanges');

const router = express.Router();

router.route(config.ROUTES.FAVORITE).post((req, res) => {
  return addToFavorite(req.body.wineId)
    .then(message => {
      updateClients();
      res.status(200).json(message);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.route(urlJoin(config.ROUTES.FAVORITE, ':wineId')).delete((req, res) => {
  return removeFromFavorite(req.params.wineId)
    .then(message => {
      updateClients();
      res.status(200).json(message);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
