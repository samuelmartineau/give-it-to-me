const { db } = require('../db');
const { createFakeWine } = require('../../../../shared/createFakeWine');

const { createWine: createWineDB } = wineFamilyServices(db);

async function createWine() {
  await createWineDB();
}

module.exports = { createWine };
