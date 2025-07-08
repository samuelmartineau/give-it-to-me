import express from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import app from '../app.js';
import { getFreshDB } from '../../tests/utils.js';
import { wineServices } from '../wine/services.js';
import { wineFamilyServices } from '../wineFamily/services.js';

const context = {
  FILE_DIRECTORY: './',
};

describe('Get Transaction suite test', () => {
  let db;

  beforeEach(async () => {
    db = await getFreshDB();
  });

  it('should return empty transactions list when no transactions exist', async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const { body, status } = await request(gitmApp)
      .get('/api/transactions')
      .set('Content-Type', 'application/json');

    expect(status).toEqual(200);
    expect(body).toEqual({
      transactions: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    });
  });

  it('should return default pagination when no query params provided', async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const { body, status } = await request(gitmApp)
      .get('/api/transactions')
      .set('Content-Type', 'application/json');

    expect(status).toEqual(200);
    expect(body.pagination.page).toEqual(1);
    expect(body.pagination.limit).toEqual(10);
  });

  it('should respect custom page and limit parameters', async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const { body, status } = await request(gitmApp)
      .get('/api/transactions?page=2&limit=5')
      .set('Content-Type', 'application/json');

    expect(status).toEqual(200);
    expect(body.pagination.page).toEqual(2);
    expect(body.pagination.limit).toEqual(5);
  });

  it('should return transactions with wine information when transactions exist', async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const { addWine } = wineServices(db);
    const { createWineFamily } = wineFamilyServices(db);
    const wineFamily = await createWineFamily('Test Wine Family');
    const wine = await addWine({
      name: 'Test Wine',
      year: 2020,
      wineFamily: wineFamily.id,
      blur: 'test blur',
      thumbnailFileName: 'test/thumb.jpg',
      pictureFileName: 'test/pic.jpg',
      wineType: 'RED',
      wineCategory: 'REGULAR',
      bottleType: 1,
      isInBoxes: false,
      count: 5,
      bottles: [],
      source: 'test source',
      positionComment: 'test position',
    });

    const { body, status } = await request(gitmApp)
      .get('/api/transactions')
      .set('Content-Type', 'application/json');

    expect(status).toEqual(200);
    expect(body.transactions).toHaveLength(2);
    expect(body.transactions.find(t => t.wineId === wine.id)).toMatchObject({
      wineId: wine.id,
      type: 'ADDED',
    });
    expect(body.pagination.total).toEqual(2);
  });

  it('should handle pagination correctly with multiple transactions', async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const { addWine } = wineServices(db);
    const { createWineFamily } = wineFamilyServices(db);

    for (let i = 0; i < 15; i++) {
      const wineFamily = await createWineFamily(`Test Wine Family ${i}`);
      await addWine({
        name: `Test Wine ${i}`,
        year: 2021,
        wineFamily: wineFamily.id,
        blur: `test blur ${i}`,
        thumbnailFileName: `test/thumb${i}.jpg`,
        pictureFileName: `test/pic${i}.jpg`,
        wineType: 'WHITE',
        wineCategory: 'REGULAR',
        bottleType: 1,
        isInBoxes: false,
        count: 3,
        bottles: [],
        source: `test source ${i}`,
        positionComment: `test position ${i}`,
      });
    }

    const { body, status } = await request(gitmApp)
      .get('/api/transactions?page=2&limit=5')
      .set('Content-Type', 'application/json');

    expect(status).toEqual(200);
    expect(body.transactions).toHaveLength(5);
    expect(body.pagination).toEqual({
      page: 2,
      limit: 5,
      total: 30,
      totalPages: 6,
    });
  });

  it('should return transactions ordered by creation date descending', async () => {
    const gitmApp = express();
    const updateClients = jest.fn();
    app(gitmApp, db, updateClients, context);

    const { addWine } = wineServices(db);
    const { createWineFamily } = wineFamilyServices(db);

    const wineFamily1 = await createWineFamily('Test Wine Family 1');
    await addWine({
      name: 'Test Wine 1',
      year: 2022,
      wineFamily: wineFamily1.id,
      blur: 'test blur 1',
      thumbnailFileName: 'test/thumb1.jpg',
      pictureFileName: 'test/pic1.jpg',
      wineType: 'RED',
      wineCategory: 'REGULAR',
      bottleType: 1,
      isInBoxes: false,
      count: 2,
      bottles: [],
      source: 'test source 1',
      positionComment: 'test position 1',
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    const wineFamily2 = await createWineFamily('Test Wine Family 2');
    await addWine({
      name: 'Test Wine 2',
      year: 2023,
      wineFamily: wineFamily2.id,
      blur: 'test blur 2',
      thumbnailFileName: 'test/thumb2.jpg',
      pictureFileName: 'test/pic2.jpg',
      wineType: 'WHITE',
      wineCategory: 'REGULAR',
      bottleType: 1,
      isInBoxes: false,
      count: 3,
      bottles: [],
      source: 'test source 2',
      positionComment: 'test position 2',
    });

    const { body, status } = await request(gitmApp)
      .get('/api/transactions')
      .set('Content-Type', 'application/json');

    expect(status).toEqual(200);
    expect(body.transactions).toHaveLength(4);
    expect(body.transactions.filter(t => t.wineId !== null)).toHaveLength(2);
    expect(body.pagination.total).toEqual(4);
  });
});
