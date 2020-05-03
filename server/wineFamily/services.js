const getWineFamilies = (db) => () => {
  return db.allAsync(
    `
    SELECT * FROM wineFamilies;
  `
  );
};

const createWineFamily = (db) => async (name) => {
  const id = await db.insertAsync(
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
    SELECT * from wineFamilies WHERE id = (?);
  `,
    id
  );
  return wineFamily;
};

module.exports = {
  wineFamilyServices: (db) => ({
    getWineFamilies: getWineFamilies(db),
    createWineFamily: createWineFamily(db),
  }),
};
