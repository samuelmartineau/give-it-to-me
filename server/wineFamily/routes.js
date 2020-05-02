const express = require('express');
const Joi = require('@hapi/joi');
const asyncHandler = require('express-async-handler');

const config = require('../../config');
const { wineFamilyServices } = require('./services');
const logger = require('../utils/logger');
const { validateParams } = require('../middlewares/validateParams');

const router = express.Router();

const CreateSchema = Joi.object({
  name: Joi.string().required(),
});

function wineFamilyRoutes(db) {
  const { getWineFamilies, createWineFamily } = wineFamilyServices(db);

  router.route(config.ROUTES.WINE_FAMILY).get(
    asyncHandler(async (req, res) => {
      try {
        const wineFamilies = await getWineFamilies();
        res.status(200).json(wineFamilies);
      } catch (error) {
        logger.error('error during picture processing', error);
        res.status(500).json(error);
      }
    })
  );

  router.route(config.ROUTES.WINE_FAMILY).post(
    validateParams(CreateSchema, 'body'),
    asyncHandler(async (req, res) => {
      try {
        const wineFamily = await createWineFamily(req.body.name);
        res.status(200).json(wineFamily);
      } catch (error) {
        res.status(500).json(error);
      }
    })
  );
  return router;
}

module.exports = wineFamilyRoutes;
