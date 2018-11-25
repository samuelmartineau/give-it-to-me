const { db } = require('../utils/db');
const logger = require('../utils/logger');
const { CELLAR_SCHEMA, utils } = require('../../config/cellar');

const getCellar = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(
        `
        SELECT w.*, (SELECT 
          json_group_array(
            json_object('id', id, 'box', box, 'cell', cell)
          ) AS json_result
          FROM (SELECT * FROM bottles AS b WHERE 
            b.wine_id = w.id
            AND b._deleted = 0  
          )) as bottles
          FROM wines AS w
          WHERE w._deleted = 0
      `,
        (err, wines) => {
          if (err) {
            logger.log('error', err);
            reject(err);
          }
          wines.forEach(wine => {
            wine.bottles = JSON.parse(wine.bottles);
          });
          resolve(wines);
        }
      );
    });
  });
};

const addWine = wine => {
  const { bottles } = wine;

  return new Promise((resolve, reject) => {
    db.run('BEGIN');
    db.serialize(() => {
      db.run(
        `INSERT INTO wines 
        (name, year, wineFamily, blur, thumbnailFileName, pictureFileName, wineType, wineCategory, bottleType, isInBoxes, stock, count)
        VALUES(
        $name,
        $year,
        $wineFamily,
        $blur,
        $thumbnailFileName,
        $pictureFileName,
        $wineType,
        $wineCategory,
        $bottleType,
        $isInBoxes,
        $stock,
        $count
      )`,
        {
          $name: wine.name,
          $year: wine.year,
          $wineFamily: wine.wineFamily,
          $blur: wine.blur,
          $thumbnailFileName: wine.thumbnailFileName,
          $pictureFileName: wine.pictureFileName,
          $wineType: wine.wineType,
          $wineCategory: wine.wineCategory,
          $bottleType: wine.bottleType,
          $isInBoxes: wine.isInBoxes,
          $stock: wine.isInBoxes ? wine.bottles.length : null,
          $count: !wine.isInBoxes ? wine.count : null
        },
        function(err) {
          if (err) throw reject(err);

          const wineId = this.lastID;
          if (wine.isInBoxes) {
            var stmt = db.prepare(
              'INSERT INTO bottles (wine_id, box, cell) VALUES ($wine_id, $box, $cell)'
            );
            bottles.forEach(bottle => {
              stmt.run({
                $wine_id: wineId,
                $box: bottle.box,
                $cell: bottle.cell
              });
            });
            stmt.finalize(err => {
              if (err) throw reject(err);
              db.run('COMMIT');
              resolve({ message: 'Vin ajouté avec succés' });
            });
          }
        }
      );
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
