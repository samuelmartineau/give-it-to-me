const fs = require('fs');
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const request = require('supertest');
const app = require('../app');
const { enhanceDB } = require('../utils/enhanceDB');

const samplingScript = fs.readFileSync(
  path.resolve(__dirname, '../../data/database.sql'),
  'utf8'
);

describe('Bottle suite test', () => {
  let gitmApp = express();

  beforeEach(async () => {
    const db = new sqlite3.Database(':memory:');
    const enhancedDB = enhanceDB(db);
    const updateClients = jest.fn();

    await enhancedDB.exec(samplingScript);
    app(gitmApp, enhancedDB, updateClients);
  });

  it('should return a 422 if no bottleId provided', async () => {
    const { body, status } = await request(gitmApp)
      .delete('/api/bottle')
      .set('Accept', 'application/json')
      .send();

    expect(status).toEqual(422);
    expect(body).toEqual({ error: '"bottleIds" is required' });
  });

  it('should return a 422 if bottleId is empty', async () => {
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
    const { body, status } = await request(gitmApp)
      .delete('/api/bottle')
      .set('Accept', 'application/json')
      .send({ bottleIds: ['wrongId'] });

    expect(status).toEqual(422);
    expect(body).toEqual({ error: '"bottleIds[0]" must be a number' });
  });

  it("should return a 404 if one of bottleIds doesn`'t exist", async () => {
    const { body, status } = await request(gitmApp)
      .delete('/api/bottle')
      .set('Accept', 'application/json')
      .send({ bottleIds: [12] });

    expect(status).toEqual(404);
    expect(body).toEqual({ error: 'Unknown bottleIds' });
  });
});
