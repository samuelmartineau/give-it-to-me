const { knexInstance, Wine } = require('../utils/db');
const logger = require('../utils/logger');
const { CELLAR_SCHEMA, utils } = require('../../config/cellar');

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
      logger.log('error', error);
    });
};

const addWine = wine => {
  const { bottles } = wine;

  delete wine.bottles;
  if (wine.isInBoxes) {
    delete wine.positionComment;
    delete wine.count;
  }

  return knexInstance
    .transaction(trx => {
      return trx
        .insert(wine, 'id')
        .into('wines')
        .then(ids => {
          const wineId = ids[0];
          if (wine.isInBoxes) {
            const bottlesFormated = bottles.map(bottle => {
              return {
                ...bottle,
                ...{ wine_id: wineId }
              };
            });
            return trx.batchInsert('bottles', bottlesFormated);
          }
        });
    })
    .then(() => ({ message: 'Vin ajouté avec succés' }))
    .catch(error => {
      logger.error('Error adding Wine', error);
      return Promise.reject({
        message: "Probleme lors de l'ajout dans la base de données"
      });
    });
};

const updateWine = (wineId, data) => {
  let updateData = data;

  return knexInstance('wines')
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
      return knexInstance('wines')
        .where({ id: wineId })
        .update(updateData);
    })
    .catch(error => {
      logger.error('Error getting Wine', error);
      return Promise.reject({
        message: 'Probleme lors de la récupération du vin'
      });
    });
};

module.exports = {
  getCellar,
  addWine,
  updateWine
};

// {"wine":{"isInBoxes":true,"name":"Domaine test","wineFamily":"56","year":"2000","bottleType":"1","wineCategory":"REGULAR","wineType":"WHITE","blur":"data:image/gif;base64,R0lGODlhAwADAPIAABcXFzk5OWJiYoqKip+fn729vQAAAAAAACH5BAAAAAAAIf8LSW1hZ2VNYWdpY2sNZ2FtbWE9MC40NTQ1NQAsAAAAAAIAAwAAAwRIUDGSADs=","thumbnailFileName":"b6371ff0-56b7-11e8-94ba-93d7d7438749.png","pictureFileName":"projectavatar.png","source":"France"},"contextualData":{"bottles":[{"box":19,"cell":0},{"box":19,"cell":3},{"box":19,"cell":6},{"box":19,"cell":7},{"box":19,"cell":4},{"box":33,"cell":0}]}}
