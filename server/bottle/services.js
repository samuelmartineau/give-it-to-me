const { db } = require('../utils/db');

const removeBottles = (bottleIds) => {
  return db.runAsync(
    `
  UPDATE bottles
  SET _deleted = 1
  WHERE
    id IN (${bottleIds.map(() => '?')})
  `,
    bottleIds
  );
};

module.exports = {
  removeBottles,
};
