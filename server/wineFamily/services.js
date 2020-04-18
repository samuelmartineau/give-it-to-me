const { db } = require('../utils/db');

const getWineFamilies = () => {
  return db.allAsync(
    `
    SELECT * FROM wineFamilies;
  `
  );
};

const createWineFamily = async (name) => {
  await db.runAsync(
    `INSERT INTO wineFamilies 
    (name)
    VALUES($name);
  `,
    {
      $name: name,
    }
  );

  const wineFamily = await db.getAsync(
    `
    SELECT * from wineFamilies WHERE id = (select last_insert_rowid());
  `
  );
  return wineFamily;
};

module.exports = {
  getWineFamilies,
  createWineFamily,
};
