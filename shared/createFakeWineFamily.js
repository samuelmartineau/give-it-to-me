const { wineFamilyServices } = require('../server/wineFamily/services');

async function createFakeWineFamily({ db, name }) {
  const { createWineFamily } = wineFamilyServices(db);
  return createWineFamily(name);
}

module.exports = {
  createFakeWineFamily,
};
