const urlJoin = require('url-join');
const express = require('express');
const Joi = require('@hapi/joi');
const asyncHandler = require('express-async-handler');

const config = require('../../config');
const { bottleServices } = require('./services');
const logger = require('../utils/logger');
const { validateParams } = require('../middlewares/validateParams');

const router = express.Router();

const RemoveSchema = Joi.object({
  bottleIds: Joi.array().items(Joi.number()).min(1).required(),
});

function bottleRoutes(db, updateClients) {
  const { removeBottles, getBottlesByIds } = bottleServices(db);

  router.route(urlJoin(config.ROUTES.BOTTLE)).delete(
    validateParams(RemoveSchema, 'body'),
    asyncHandler(async (req, res) => {
      const { bottleIds } = req.body;

      try {
        const found = await getBottlesByIds(bottleIds);

        if (found.length < bottleIds.length) {
          return res.status(404).send({ error: 'Unknown bottleIds' });
        }

        await removeBottles(bottleIds);
        updateClients();
        res.status(200).json({ message: 'Bouteille supprimée avec succés' });
      } catch (error) {
        logger.error('error', error.stack);
        res.status(500).json(error);
      }
    })
  );

  return router;
}

module.exports = bottleRoutes;
