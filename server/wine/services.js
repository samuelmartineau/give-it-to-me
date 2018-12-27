const path = require('path');
const { db } = require('../utils/db');
const logger = require('../utils/logger');
const config = require('../../config');

const getCellar = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(
        `
        SELECT w.*, 
        (SELECT 
          json_group_array(
            json_object('id', id, 'box', box, 'cell', cell)
          ) AS json_result
          FROM (SELECT * FROM bottles AS b WHERE 
            b.wineId = w.id
            AND b._deleted = 0  
         )) as bottles,
         (CASE WHEN f._deleted = '0' THEN 1 ELSE 0 END) AS isFavorite
          FROM wines AS w
          LEFT JOIN favorites AS f ON w.id = f.wineId
          WHERE w.bottlesCount > 0
      `,
        (err, wines) => {
          if (err) {
            logger.error(err.stack);
            reject(err);
          } else {
            wines.forEach(wine => {
              wine.bottles = JSON.parse(wine.bottles);
              wine.thumbnailFileName = path.join(
                config.ASSETS_BASE_URL,
                config.UPLOADS_PERM,
                wine.thumbnailFileName
              );
              wine.pictureFileName = path.join(
                config.ASSETS_BASE_URL,
                config.UPLOADS_PERM,
                wine.pictureFileName
              );
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
        (name, year, wineFamily, blur, thumbnailFileName, pictureFileName, wineType, wineCategory, bottleType, isInBoxes, bottlesCount, source, positionComment)
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
        $bottlesCount,
        $source,
        $positionComment
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
          $bottlesCount: wine.isInBoxes ? wine.bottles.length : wine.count,
          $source: wine.source,
          $positionComment: wine.positionComment
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
            } else {
              db.run('COMMIT');
              resolve({ message: 'Vin ajouté avec succés' });
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
