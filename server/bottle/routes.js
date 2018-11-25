const urlJoin = require('url-join');
const express = require('express');

const config = require('../../config');
const { removeBottles } = require('./services');
const { updateClients } = require('../handleChanges');

const router = express.Router();

router.route(urlJoin(config.ROUTES.BOTTLE)).delete((req, res) => {
  const { bottleIds } = req.body;
  return removeBottles(bottleIds)
    .then(message => {
      updateClients();
      res.status(200).json(message);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
