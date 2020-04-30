const urlJoin = require('url-join');
const express = require('express');
const Joi = require('@hapi/joi');

const config = require('../../config');
const { removeBottles } = require('./services');
const { updateClients } = require('../handleChanges');
const logger = require('../utils/logger');
const { validateParams } = require('../middlewares/validateParams');

const router = express.Router();

const RemoveSchema = Joi.object({
  bottleIds: Joi.array().items(Joi.number()).min(1).required(),
});

router
  .route(urlJoin(config.ROUTES.BOTTLE))
  .delete(validateParams(RemoveSchema, 'body'), async (req, res) => {
    const { bottleIds } = req.body;
    try {
      await removeBottles(bottleIds);
      updateClients();
      res.status(200).json({ message: 'Bouteille supprimée avec succés' });
    } catch (error) {
      logger.error('error', error.stack);
      res.status(500).json(error);
    }
  });

module.exports = router;
