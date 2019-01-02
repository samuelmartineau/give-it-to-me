const { db } = require('../utils/db');
const logger = require('../utils/logger');

const removeBottles = bottleIds => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `
      UPDATE bottles
      SET _deleted = 1
      WHERE
        id IN (${bottleIds.map(() => '?')})
      `,
        bottleIds,
        err => {
          if (err) {
            logger.error('error', err);
            reject(err);
          }
          resolve({ message: 'Bouteille supprimée avec succés' });
        }
      );
    });
  });
};

module.exports = {
  removeBottles
};
