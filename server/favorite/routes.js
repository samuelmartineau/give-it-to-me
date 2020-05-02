const Joi = require('@hapi/joi');
const urlJoin = require('url-join');
const express = require('express');
const asyncHandler = require('express-async-handler');

const logger = require('../utils/logger');
const config = require('../../config');
const { addToFavorite, removeFromFavorite } = require('./services');
const { updateClients } = require('../handleChanges');
const { validateParams } = require('../middlewares/validateParams');

const router = express.Router();

const AddSchema = Joi.object({
  wineId: Joi.number().required(),
});

router.route(config.ROUTES.FAVORITE).post(
  validateParams(AddSchema, 'body'),
  asyncHandler(async (req, res) => {
    const { wineId } = req.body;

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

const RemoveSchema = Joi.object({
  wineId: Joi.number().required(),
});

router
  .route(urlJoin(config.ROUTES.FAVORITE, ':wineId'))
  .delete(validateParams(RemoveSchema, 'params'), async (req, res) => {
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
