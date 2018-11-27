const { db } = require('../utils/db');
const logger = require('../utils/logger');

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
            b.wineId = w.id
            AND b._deleted = 0  
          )) as bottles
          FROM wines AS w
          WHERE w.bottlesCount > 0
      `,
        (err, wines) => {
          if (err) {
            logger.log('error', err);
            reject(err);
          } else {
            wines.forEach(wine => {
              wine.bottles = JSON.parse(wine.bottles);
            });
            resolve(wines);
          }
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
        (name, year, wineFamily, blur, thumbnailFileName, pictureFileName, wineType, wineCategory, bottleType, isInBoxes, bottlesCount)
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
        $bottlesCount
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
          $bottlesCount: wine.isInBoxes ? wine.bottles.length : wine.count
        },
        function(err) {
          if (err) {
            logger.error('Error adding Wine', err);
            reject(err);
          } else {
            const wineId = this.lastID;
            if (wine.isInBoxes) {
              var stmt = db.prepare(
                'INSERT INTO bottles (wineId, box, cell) VALUES ($wineId, $box, $cell)'
              );
              bottles.forEach(bottle => {
                stmt.run({
                  $wineId: wineId,
                  $box: bottle.box,
                  $cell: bottle.cell
                });
              });
              stmt.finalize(err => {
                if (err) {
                  logger.error('Error adding bottles', err);
                  reject(err);
                }
                db.run('COMMIT');
                resolve({ message: 'Vin ajouté avec succés' });
              });
            }
          }
        }
      );
    });
  });
};

module.exports = {
  getCellar,
  addWine
};
