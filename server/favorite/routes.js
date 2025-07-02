const Joi = require('@hapi/joi');
const urlJoin = require('url-join').default;
const express = require('express');
const asyncHandler = require('express-async-handler');

const logger = require('../utils/logger');
const config = require('../../config');
const { favoriteServices } = require('./services');
const { wineServices } = require('../wine/services');
const { validateParams } = require('../middlewares/validateParams');

const router = express.Router();

const AddSchema = Joi.object({
  wineId: Joi.number().required(),
});

const RemoveSchema = Joi.object({
  wineId: Joi.number().required(),
});

function favoriteRoutes(db, updateClients) {
  const { addToFavorite, removeFromFavorite } = favoriteServices(db);
  const { getWineById } = wineServices(db);

  router.route(config.ROUTES.FAVORITE).post(
    validateParams(AddSchema, 'body'),
    asyncHandler(async (req, res) => {
      const { wineId } = req.body;

      const wine = await getWineById(wineId);

      if (!wine) {
        return res.status(404).send({ error: 'Unknown wineId' });
      }

      try {
        await addToFavorite(wineId);
        updateClients();
        res.status(200).json({ message: 'Favoris ajouté avec succés' });
      } catch (error) {
        logger.error(error.stack);
        res.status(500).json(error);
      }
    })
  );

  router.route(urlJoin(config.ROUTES.FAVORITE, ':wineId')).delete(
    validateParams(RemoveSchema, 'params'),
    asyncHandler(async (req, res) => {
      const { wineId } = req.params;

      const wine = await getWineById(wineId);

      if (!wine) {
        return res.status(404).send({ error: 'Unknown wineId' });
      }
      try {
        await removeFromFavorite(wineId);
        updateClients();
        res
          .status(200)
          .json({ message: 'Vin supprimé avec succés des favoris' });
      } catch (error) {
        logger.error(error.stack);
        res.status(500).json(error);
      }
    })
  );
  return router;
}

module.exports = favoriteRoutes;
