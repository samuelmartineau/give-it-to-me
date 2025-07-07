import express from 'express';
import urlJoin from 'url-join';

import config from '../../../config/index.js';
import { wineServices } from './services.js';
import { picturesServices } from '../pictures/services.js';
import logger from '../utils/logger.js';

function wineRoutes(db, updateClients, SERVER_VARIABLES) {
  const router = express.Router();

  const { getCellar, addWine, removeOutsideBottles } = wineServices(db);
  const { moveWineToPermanentFolder } = picturesServices(SERVER_VARIABLES);
  router
    .route(config.ROUTES.WINE)
    .get(async (req, res) => {
      try {
        const cellar = await getCellar();
        res.status(200).json(cellar);
      } catch (error) {
        logger.error(error.stack);
        res.status(500).json(error);
      }
    })
    .post(async (req, res) => {
      const fileUploaded = await moveWineToPermanentFolder(
        req.body.wine.thumbnailFileName,
        req.body.wine.pictureFileName,
      );
      const computeWineData = {
        ...req.body.wine,
        ...fileUploaded,
      };
      try {
        await addWine(computeWineData);
        updateClients();
        res.status(200).json({ message: 'Vin ajouté avec succés' });
      } catch (error) {
        logger.error(error.stack);
        res.status(500).json({ message: 'Error adding bottles' });
      }
    });

  router
    .route(urlJoin(config.ROUTES.WINE, ':wineId'))
    .delete(async (req, res) => {
      const { wineId } = req.params;
      try {
        await removeOutsideBottles(wineId, req.body.count);
        updateClients();
        res.status(200).json({ message: 'Bouteille supprimée avec succés' });
      } catch (error) {
        logger.error(error.stack);
        res.status(500).json(error);
      }
    });
  return router;
}

export default wineRoutes;
