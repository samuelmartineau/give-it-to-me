const express = require('express');
const urlJoin = require('url-join').default;
const asyncHandler = require('express-async-handler');

const config = require('../../config');
const { wineServices } = require('./services');
const { picturesServices } = require('../pictures/services');
const logger = require('../utils/logger');

const router = express.Router();

function wineRoutes(db, updateClients, SERVER_VARIABLES) {
  const { getCellar, addWine, removeOutsideBottles } = wineServices(db);
  const { moveWineToPermanentFolder } = picturesServices(SERVER_VARIABLES);
  router
    .route(config.ROUTES.WINE)
    .get(
      asyncHandler(async (req, res) => {
        try {
          const cellar = await getCellar();
          res.status(200).json(cellar);
        } catch (error) {
          logger.error(error.stack);
          res.status(500).json(error);
        }
      })
    )
    .post(
      asyncHandler(async (req, res) => {
        const fileUploaded = await moveWineToPermanentFolder(
          req.body.wine.thumbnailFileName,
          req.body.wine.pictureFileName
        );
        let computeWineData = {
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
      })
    );

  router.route(urlJoin(config.ROUTES.WINE, ':wineId')).delete(
    asyncHandler(async (req, res) => {
      const { wineId } = req.params;
      try {
        await removeOutsideBottles(wineId, req.body.count);
        updateClients();
        res.status(200).json({ message: 'Bouteille supprimée avec succés' });
      } catch (error) {
        logger.error(error.stack);
        res.status(500).json(error);
      }
    })
  );
  return router;
}

module.exports = wineRoutes;
