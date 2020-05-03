const getBottlesByIds = (db) => (bottleIds) => {
  return db.allAsync(
    `
  SELECT *
  FROM bottles
  WHERE
    id IN (${bottleIds.map(() => '?')})
  `,
    bottleIds
  );
};

const removeBottles = (db) => (bottleIds) => {
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
  bottleServices: (db) => ({
    getBottlesByIds: getBottlesByIds(db),
    removeBottles: removeBottles(db),
  }),
};
