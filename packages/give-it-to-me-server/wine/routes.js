const urlJoin = require('url-join');
const express = require('express');

const config = require('give-it-to-me-config');
const { getCellar, addWine, updateWine } = require('./services');
const { moveWineToPermanetFolder } = require('../pictures/services');
const { updateClients } = require('../handleChanges');

const router = express.Router();

router
  .route(config.ROUTES.WINE)
  .get((req, res, next) => {
    return getCellar()
      .then(cellar => {
        updateClients();
        res.status(200).json(cellar);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  })
  .post((req, res, next) => {
    return moveWineToPermanetFolder(
      req.body.wine.thumbnailFileName,
      req.body.wine.pictureFileName
    )
      .then(fileUploaded => {
        let computeWineData = {
          ...req.body.wine,
          ...fileUploaded
        };
        return addWine(computeWineData, req.body.contextualData);
      })
      .then(message => {
        updateClients();
        res.status(200).json(message);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

router.route(urlJoin(config.ROUTES.WINE, ':wineId')).put((req, res) => {
  const { wineId } = req.params;
  let { data } = req.body;

  return updateWine(wineId, data)
    .then(() => {
      updateClients();
      res.status(200).json({
        message: 'Bouteille(s) supprimé avec succés'
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
