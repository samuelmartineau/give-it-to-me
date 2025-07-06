const addToFavorite = (db) => (wineId) => {
  return db.runAsync(
    `
  INSERT OR REPLACE INTO favorites (id, wineId, _deleted) 
  VALUES (
    (SELECT id FROM favorites WHERE wineId = $wineId),
    $wineId, 
    '0'
      )
  `,
    { $wineId: wineId },
  );
};

const removeFromFavorite = (db) => (wineId) => {
  return db.runAsync(
    `
    UPDATE favorites
    SET _deleted = 1
    WHERE wineId = (?)
    `,
    wineId,
  );
};

export const favoriteServices = (db) => ({
  addToFavorite: addToFavorite(db),
  removeFromFavorite: removeFromFavorite(db),
});
