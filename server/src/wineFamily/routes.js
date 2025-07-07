import express from 'express';
import Joi from '@hapi/joi';

import config from '../../../config/index.js';
import { wineFamilyServices } from './services.js';
import logger from '../utils/logger.js';
import { validateParams } from '../middlewares/validateParams.js';

const CreateSchema = Joi.object({
  name: Joi.string().required(),
});

function wineFamilyRoutes(db) {
  const router = express.Router();

  const { getWineFamilies, createWineFamily } = wineFamilyServices(db);

  router.route(config.ROUTES.WINE_FAMILY).get(async (req, res) => {
    try {
      const wineFamilies = await getWineFamilies();
      res.status(200).json(wineFamilies);
    } catch (error) {
      logger.error('error during picture processing', error);
      res.status(500).json(error);
    }
  });

  router
    .route(config.ROUTES.WINE_FAMILY)
    .post(validateParams(CreateSchema, 'body'), async (req, res) => {
      try {
        const wineFamily = await createWineFamily(req.body.name);
        res.status(200).json(wineFamily);
      } catch (error) {
        res.status(500).json(error);
      }
    });
  return router;
}

export default wineFamilyRoutes;
