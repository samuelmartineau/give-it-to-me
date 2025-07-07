import express from 'express';
import request from 'supertest';
import { beforeAll, describe, expect, it, jest } from '@jest/globals';

import app from '../app.js';
import { getFreshDB } from '../../tests/utils.js';
import { wineServices } from '../wine/services.js';
import { wineFamilyServices } from '../wineFamily/services.js';

const context = {
  FILE_DIRECTORY: './',
};

describe('Add to Favorite suite test', () => {
  let db;

  beforeAll(async () => {
    db = await getFreshDB();
  });

  it('should return a 422 if no wineId provided', async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const { body, status } = await request(gitmApp)
      .post('/api/favorite')
      .set('Content-Type', 'application/json')
      .send();

    expect(status).toEqual(422);
    expect(body).toEqual({ error: '"wineId" is required' });
  });

  it('should return a 422 if wineId is not a number', async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const { body, status } = await request(gitmApp)
      .post('/api/favorite')
      .set('Content-Type', 'application/json')
      .send({ wineId: 'wrongId' });

    expect(status).toEqual(422);
    expect(body).toEqual({ error: '"wineId" must be a number' });
  });

  it("should return a 404 if one of wineId doesn`'t exist", async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const { body, status } = await request(gitmApp)
      .post('/api/favorite')
      .set('Content-Type', 'application/json')
      .send({ wineId: 12 });

    expect(status).toEqual(404);
    expect(body).toEqual({ error: 'Unknown wineId' });
  });

  it('should return a 200 if success', async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const { addWine } = wineServices(db);
    const { createWineFamily } = wineFamilyServices(db);
    const wineFamily = await createWineFamily('fake wine family');
    const wine = await addWine({
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
    });
    const { body, status } = await request(gitmApp)
      .post('/api/favorite')
      .set('Content-Type', 'application/json')
      .send({ wineId: wine.id });

    expect(status).toEqual(200);
    expect(body).toEqual({ message: 'Favoris ajouté avec succés' });
    setTimeout(() => {
      expect(updateClients).toHaveBeenCalled();
    }, 0);
  });
});
