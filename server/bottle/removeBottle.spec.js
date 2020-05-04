const express = require('express');
const request = require('supertest');

const app = require('../app');
const { getFreshDB } = require('../utils/getFreshDB');
const { createFakeWine, createFakeWineFamily } = require('../../shared/faker');

const context = {
  FILE_DIRECTORY: './',
};

describe('Remove bottle suite test', () => {
  let db;

  beforeAll(async () => {
    db = await getFreshDB();
  });

  it('should return a 422 if no bottleId provided', async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const { body, status } = await request(gitmApp)
      .delete('/api/bottle')
      .set('Accept', 'application/json')
      .send();

    expect(status).toEqual(422);
    expect(body).toEqual({ error: '"bottleIds" is required' });
  });

  it('should return a 422 if bottleId is empty', async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const { body, status } = await request(gitmApp)
      .delete('/api/bottle')
      .set('Accept', 'application/json')
      .send({ bottleIds: [] });

    expect(status).toEqual(422);
    expect(body).toEqual({
      error: '"bottleIds" must contain at least 1 items',
    });
  });

  it('should return a 422 if bottleId is not a number', async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const { body, status } = await request(gitmApp)
      .delete('/api/bottle')
      .set('Accept', 'application/json')
      .send({ bottleIds: ['wrongId'] });

    expect(status).toEqual(422);
    expect(body).toEqual({ error: '"bottleIds[0]" must be a number' });
  });

  it("should return a 404 if one of bottleIds doesn`'t exist", async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const { body, status } = await request(gitmApp)
      .delete('/api/bottle')
      .set('Accept', 'application/json')
      .send({ bottleIds: [12] });

    expect(status).toEqual(404);
    expect(body).toEqual({ error: 'Unknown bottleIds' });
  });

  it('should return a 200 if success', async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const wineFamily = await createFakeWineFamily({
      db,
      name: 'fake wine family',
    });

    const wine = await createFakeWine({
      db,
      getWineFamilyId: () => wineFamily.id,
      wine: {
        name: 'Domaine test',
        year: 2010,
        wineFamily: wineFamily.id,
        blur: 'fake blur',
        thumbnailFileName: 'fake/path',
        pictureFileName: 'fake/path',
        wineType: 'RED',
        wineCategory: 'REGULAR',
        bottleType: 1,
        isInBoxes: true,
        bottlesCount: 3,
        bottles: [
          { box: 3, cell: 0 },
          { box: 3, cell: 1 },
          { box: 3, cell: 2 },
        ],
      },
    });

    const bottleIds = [wine.bottles[0].id, wine.bottles[1].id];
    const { body, status } = await request(gitmApp)
      .delete('/api/bottle')
      .set('Accept', 'application/json')
      .send({ bottleIds });

    expect(status).toEqual(200);
    expect(body).toEqual({ message: 'Bouteille supprimée avec succés' });
    setTimeout(() => {
      expect(updateClients).toHaveBeenCalled();
    }, 0);
  });
});
