const getBottlesByIds = (db) => async (bottleIds) => {
  const bottles = await db.getAsync(
    `
  SELECT *
  FROM bottles
  WHERE
    id IN (${bottleIds.map(() => '?')})
  `,
    bottleIds
  );
  return bottles || [];
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
