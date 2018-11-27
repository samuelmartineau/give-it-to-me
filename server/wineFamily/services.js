const { db } = require('../utils/db');
const logger = require('../utils/logger');

const getWineFamilies = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(
        `
        SELECT * FROM wineFamilies
          
      `,
        (err, wineFamilies) => {
          if (err) {
            logger.log('error', err);
            reject(err);
          } else {
            resolve(wineFamilies);
          }
        }
      );
    });
  });
};

module.exports = {
  getWineFamilies
};
