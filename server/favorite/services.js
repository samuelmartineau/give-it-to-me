const { db } = require('../utils/db');
const logger = require('../utils/logger');

const addToFavorite = wineId => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `
      INSERT OR REPLACE INTO favorites (id, wineId, _deleted) 
      VALUES (
        (SELECT id FROM favorites WHERE wineId = $wineId),
        $wineId, 
        '0'
          )
      `,
        { $wineId: wineId },
        err => {
          if (err) {
            logger.error(err.stack);
            reject(err);
          }
          resolve({ message: 'Favoris ajouté avec succés' });
        }
      );
    });
  });
};

const removeFromFavorite = wineId => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `
      UPDATE favorites
      SET _deleted = 1
      WHERE wineId = (?)
      `,
        wineId,
        err => {
          if (err) {
            logger.error(err.stack);
            reject(err);
          }
          resolve({ message: 'Vin supprimé avec succés des favoris' });
        }
      );
    });
  });
};

module.exports = {
  addToFavorite,
  removeFromFavorite
};
