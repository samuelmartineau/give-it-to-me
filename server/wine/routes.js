const express = require('express');
const asyncHandler = require('express-async-handler');

const config = require('../../config');
const { getCellar, addWine, removeOutsideBottles } = require('./services');
const { moveWineToPermanentFolder } = require('../pictures/services');
const { updateClients } = require('../handleChanges');
const logger = require('../utils/logger');

const router = express.Router();

router
  .route(config.ROUTES.WINE)
  .get(
    asyncHandler(async (req, res) => {
      try {
        const cellar = await getCellar();
        updateClients();
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

router.route(`${config.ROUTES.WINE}/:wineId`).delete(
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

module.exports = router;
