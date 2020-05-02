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
    removeBottles: removeBottles(db),
  }),
};
