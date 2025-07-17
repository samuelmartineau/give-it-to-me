import path from 'path';
import config from '../../../config/index.js';

function enhanceWine(wine) {
  wine.bottles = JSON.parse(wine.bottles);
  wine.thumbnailFileName = path.join(
    config.FILE_URL_PATH,
    config.UPLOADS_PERM_FOLDER,
    wine.thumbnailFileName,
  );
  wine.pictureFileName = path.join(
    config.FILE_URL_PATH,
    config.UPLOADS_PERM_FOLDER,
    wine.pictureFileName,
  );
}

const getWineById =
  (db) =>
  async ({ id, withDeletedData = false }) => {
    const wine = await db.getAsync(
      `
SELECT w.*, 
(SELECT 
  json_group_array(
    json_object('id', id, 'box', box, 'cell', cell, 'deleted', _deleted)
  ) AS json_result
  FROM (SELECT * FROM bottles AS b WHERE 
    b.wineId = w.id
    AND b._deleted = $deleteState)
) as bottles,
 (CASE WHEN f._deleted = '0' THEN 1 ELSE 0 END) AS isFavorite
  FROM wines AS w
  LEFT JOIN favorites AS f ON w.id = f.wineId
  WHERE w.id = $id ${withDeletedData ? '' : 'AND w.bottlesCount > 0 '}
`,
      { $id: id, $deleteState: withDeletedData ? 1 : 0 },
    );

    if (wine) {
      enhanceWine(wine);
    }

    return wine;
  };

const getCellar = (db) => async () => {
  const wines = await db.allAsync(`
  SELECT w.*, 
  (SELECT 
    json_group_array(
      json_object('id', id, 'box', box, 'cell', cell)
    ) AS json_result
    FROM (SELECT * FROM bottles AS b WHERE 
      b.wineId = w.id
      AND b._deleted = 0)
  ) as bottles,
   (CASE WHEN f._deleted = '0' THEN 1 ELSE 0 END) AS isFavorite
    FROM wines AS w
    LEFT JOIN favorites AS f ON w.id = f.wineId
    WHERE w.bottlesCount > 0
`);

  wines.forEach(enhanceWine);

  return wines;
};

const addWine = (db) => async (wine) => {
  const { bottles } = wine;

  await db.runAsync('BEGIN');
  const wineId = await db.insertAsync(
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
      $positionComment: wine.positionComment,
    },
  );

  if (wine.isInBoxes) {
    const promises = bottles.map((bottle) => {
      return db.runAsync(
        'INSERT INTO bottles (wineId, box, cell) VALUES ($wineId, $box, $cell)',
        {
          $wineId: wineId,
          $box: bottle.box,
          $cell: bottle.cell,
        },
      );
    });

    await Promise.all(promises);
  }
  await db.run('COMMIT');

  const newWine = await getWineById(db)({ id: wineId });
  return newWine;
};

const removeOutsideBottles = (db) => (wineId, count) => {
  return db.runAsync(
    `
  UPDATE wines
  SET bottlesCount = bottlesCount - $count
  WHERE id = $wineId
  `,
    {
      $wineId: wineId,
      $count: count,
    },
  );
};

export const wineServices = (db) => ({
  getCellar: getCellar(db),
  addWine: addWine(db),
  removeOutsideBottles: removeOutsideBottles(db),
  getWineById: getWineById(db),
});
