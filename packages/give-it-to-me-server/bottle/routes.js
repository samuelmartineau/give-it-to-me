const urlJoin = require("url-join");
const express = require("express");

const config = require("../../../config");
const { removeBottle } = require("./services");
const { updateClients } = require("../handleChanges");

const router = express.Router();

router
  .route(urlJoin(config.ROUTES.BOTTLE, ":bottleId"))
  .delete((req, res, next) => {
    const { bottleId } = req.params;
    const { wineId } = req.body;
    return removeBottle(parseInt(wineId), parseInt(bottleId))
      .then(message => {
        updateClients();
        res.status(200).json(message);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

module.exports = router;
