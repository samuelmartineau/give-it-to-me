const { db } = require('../utils/db');
const logger = require('../utils/logger');

const getWineFamilies = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(
        `
        SELECT * FROM wineFamilies;
      `,
        (err, wineFamilies) => {
          if (err) {
            logger.error(err.stack);
            reject(err);
          } else {
            resolve(wineFamilies);
          }
        }
      );
    });
  });
};

const createWineFamily = name => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `INSERT INTO wineFamilies 
        (name)
        VALUES($name);
      `,
        {
          $name: name
        },
        err => {
          if (err) {
            logger.error(err.stack);
            reject(err);
          } else {
            db.get(
              `
              SELECT * from wineFamilies WHERE id = (select last_insert_rowid());
            `,
              (err, wineFamily) => {
                if (err) {
                  logger.error(err.stack);
                  reject(err);
                } else {
                  resolve(wineFamily);
                }
              }
            );
          }
        }
      );
    });
  });
};

module.exports = {
  getWineFamilies,
  createWineFamily
};
