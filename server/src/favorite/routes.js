import Joi from '@hapi/joi';
import urlJoin from 'url-join';
import express from 'express';

import logger from '../utils/logger.js';
import config from '../../../config/index.js';
import { favoriteServices } from './services.js';
import { wineServices } from '../wine/services.js';
import { validateParams } from '../middlewares/validateParams.js';

const AddSchema = Joi.object({
  wineId: Joi.number().required(),
});

const RemoveSchema = Joi.object({
  wineId: Joi.number().required(),
});

function favoriteRoutes(db, updateClients) {
  const router = express.Router();

  const { addToFavorite, removeFromFavorite } = favoriteServices(db);
  const { getWineById } = wineServices(db);

  router
    .route(config.ROUTES.FAVORITE)
    .post(validateParams(AddSchema, 'body'), async (req, res) => {
      const { wineId } = req.body;
      const wine = await getWineById({ id: wineId });

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
    });

  router
    .route(urlJoin(config.ROUTES.FAVORITE, ':wineId'))
    .delete(validateParams(RemoveSchema, 'params'), async (req, res) => {
      const { wineId } = req.params;

      const wine = await getWineById({ id: wineId });

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
    });
  return router;
}

export default favoriteRoutes;
