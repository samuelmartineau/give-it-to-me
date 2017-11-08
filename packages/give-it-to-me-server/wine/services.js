const { knexInstance, Wine } = require("../utils/db");
const logger = require("../utils/logger");
const { CELLAR_SCHEMA } = require("../../../config/cellar");
const { removeItem } = require("../../../utils");

const getCellar = () => {
  return Wine.where({ _deleted: 0 })
    .fetchAll({
      withRelated: [
        {
          bottles: query => {
            query.where({ _deleted: 0 });
          }
        }
      ]
    })
    .then(wines => {
      return wines.toJSON();
    })
    .catch(error => {
      logger.log("error", error);
    });
};

const addWine = (wine, contextualData) => {
  if (!wine.isInBoxes) {
    wine = { ...wine, ...contextualData };
  }

  return knexInstance
    .transaction(trx => {
      return trx
        .insert(wine, "id")
        .into("wines")
        .then(ids => {
          const wineId = ids[0];
          if (wine.isInBoxes) {
            const bottles = contextualData.bottles.map(bottle => {
              return {
                ...bottle,
                ...{ wine_id: wineId }
              };
            });
            return trx.batchInsert("bottles", bottles);
          }
        });
    })
    .then(() => ({ message: "Vin ajouté avec succés" }))
    .catch(error => {
      logger.error("Error adding Wine", error);
      return Promise.reject({
        message: "Probleme lors de l'ajout dans la base de données"
      });
    });
};

const updateWine = (wineId, data) => {
  let updateData = data;

  return knexInstance("wines")
    .where({ id: wineId })
    .then(wines => {
      const wine = wines[0];
      if (data.removeBottlesCount) {
        Object.assign(updateData, {
          _deleted: wine.count <= data.removeBottlesCount,
          count: wine.count - data.removeBottlesCount,
          isFavorite: wine.count <= data.removeBottlesCount
        });
        delete updateData.removeBottlesCount;
      }
      return knexInstance("wines")
        .where({ id: wineId })
        .update(updateData);
    })
    .catch(error => {
      logger.error("Error getting Wine", error);
      return Promise.reject({
        message: "Probleme lors de la récupération du vin"
      });
    });
};

module.exports = {
  getCellar,
  addWine,
  updateWine
};
