import urlJoin from 'url-join';
import express from 'express';
import Joi from '@hapi/joi';

import config from '../../config/index.js';
import { bottleServices } from './services.js';
import logger from '../utils/logger.js';
import { validateParams } from '../middlewares/validateParams.js';

const RemoveSchema = Joi.object({
  bottleIds: Joi.array().items(Joi.number()).min(1).required(),
});

function bottleRoutes(db, updateClients) {
  const router = express.Router();

  const { removeBottles, getBottlesByIds } = bottleServices(db);

  router
    .route(urlJoin(config.ROUTES.BOTTLE))
    .delete(validateParams(RemoveSchema, 'body'), async (req, res) => {
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
    });

  return router;
}

export default bottleRoutes;
