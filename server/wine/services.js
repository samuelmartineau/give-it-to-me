const path = require('path');
const { db } = require('../utils/db');
const config = require('../../config');

const getCellar = async () => {
  const wines = await db.allAsync(`
  SELECT w.*, 
  (SELECT 
    json_group_array(
      json_object('id', id, 'box', box, 'cell', cell)
    ) AS json_result
    FROM (SELECT * FROM bottles AS b WHERE 
      b.wineId = w.id
      AND b._deleted = 0  
   )) as bottles,
   (CASE WHEN f._deleted = '0' THEN 1 ELSE 0 END) AS isFavorite
    FROM wines AS w
    LEFT JOIN favorites AS f ON w.id = f.wineId
    WHERE w.bottlesCount > 0
`);

  wines.forEach((wine) => {
    wine.bottles = JSON.parse(wine.bottles);
    wine.thumbnailFileName = path.join(
      config.FILE_URL_PATH,
      config.UPLOADS_PERM_FOLDER,
      wine.thumbnailFileName
    );
    wine.pictureFileName = path.join(
      config.FILE_URL_PATH,
      config.UPLOADS_PERM_FOLDER,
      wine.pictureFileName
    );
  });

  return wines;
};

const addWine = async (wine) => {
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
    }
  );
  if (wine.isInBoxes) {
    const promises = bottles.map((bottle) => {
      return db.runAsync(
        'INSERT INTO bottles (wineId, box, cell) VALUES ($wineId, $box, $cell)',
        {
          $wineId: wineId,
          $box: bottle.box,
          $cell: bottle.cell,
        }
      );
    });

    await Promise.all(promises);
  }
  await db.run('COMMIT');
};

const removeOutsideBottles = (wineId, count) => {
  return db.runAsync(
    `
  UPDATE wines
  SET bottlesCount = bottlesCount - $count
  WHERE id = $wineId
  `,
    {
      $wineId: wineId,
      $count: count,
    }
  );
};

module.exports = {
  getCellar,
  addWine,
  removeOutsideBottles,
};
