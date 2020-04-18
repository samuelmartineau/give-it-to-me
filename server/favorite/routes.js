const urlJoin = require('url-join');
const express = require('express');

const logger = require('../utils/logger');
const config = require('../../config');
const { addToFavorite, removeFromFavorite } = require('./services');
const { updateClients } = require('../handleChanges');

const router = express.Router();

router.route(config.ROUTES.FAVORITE).post(async (req, res) => {
  const { wineId } = req.body;

  try {
    await addToFavorite(wineId);
    updateClients();
    res.status(200).json({ message: 'Favoris ajouté avec succés' });
  } catch (error) {
    logger.error(error.stack);
    res.status(500).json(error);
  }
});

router
  .route(urlJoin(config.ROUTES.FAVORITE, ':wineId'))
  .delete(async (req, res) => {
    const { wineId } = req.params;
    try {
      await removeFromFavorite(wineId);
      updateClients();
      res.status(200).json({ message: 'Vin supprimé avec succés des favoris' });
    } catch (error) {
      logger.error(error.stack);
      res.status(500).json(error);
    }
  });

module.exports = router;
