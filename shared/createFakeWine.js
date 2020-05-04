const { wineServices } = require('../server/wine/services');

async function createFakeWine({ db, getWineFamilyId, wine }) {
  const { addWine } = wineServices(db);
  const wineFamilyID = await getWineFamilyId();
  return addWine({ ...wine, wineFamily: wineFamilyID });
}

module.exports = {
  createFakeWine,
};
