import express from 'express';
import request from 'supertest';
import sharp from 'sharp';
import os from 'os';
import path from 'path';
import { promises as fs } from 'fs';
import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import app from '../app.js';
import config from '../../../config/index.js';

const { WIDTH, HEIGHT } = config.PICTURE_UPLOAD.THUMBNAIL;

const createApp = (context) => {
  const gitmApp = express();
  app(gitmApp, null, jest.fn(), context);
  return gitmApp;
};

describe('Upload picture suite test', () => {
  let context;

  beforeAll(async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'gitm-pictures-'));
    await fs.mkdir(path.join(dir, config.UPLOADS_TMP_FOLDER));
    context = { FILE_DIRECTORY: dir };
  });

  afterAll(async () => {
    await fs.rm(context.FILE_DIRECTORY, { recursive: true, force: true });
  });

  it('should create a cropped, auto-oriented thumbnail and a blur', async () => {
    // Landscape pixels stored with EXIF orientation 6 (rotate 90°): portrait once oriented.
    const picture = await sharp({
      create: {
        width: 1200,
        height: 800,
        channels: 3,
        background: { r: 120, g: 20, b: 40 },
      },
    })
      .jpeg()
      .withMetadata({ orientation: 6 })
      .toBuffer();

    const { body, status } = await request(createApp(context))
      .post('/api/picture')
      .attach(config.PICTURE_UPLOAD.FILE_NAME, picture, 'bottle.jpg');

    expect(status).toEqual(200);
    expect(body.pictureFileName).toEqual(
      path.join(config.FILE_URL_PATH, config.UPLOADS_TMP_FOLDER, 'bottle.jpg'),
    );
    expect(body.thumbnailFileName).toMatch(/\.jpg$/);
    expect(body.blur).toMatch(/^data:image\/gif;base64,/);

    const thumbnailPath = path.join(
      context.FILE_DIRECTORY,
      config.UPLOADS_TMP_FOLDER,
      path.basename(body.thumbnailFileName),
    );
    const thumbnail = await sharp(thumbnailPath).metadata();
    expect(thumbnail).toMatchObject({
      format: 'jpeg',
      width: WIDTH,
      height: HEIGHT,
    });
    expect(thumbnail.orientation ?? 1).toEqual(1);

    const blur = await sharp(
      Buffer.from(body.blur.split(',')[1], 'base64'),
    ).metadata();
    expect(blur.format).toEqual('gif');
    expect(Math.max(blur.width, blur.height)).toBeLessThanOrEqual(3);
  });

  it('should return a 500 when the upload is not an image', async () => {
    const { body, status } = await request(createApp(context))
      .post('/api/picture')
      .attach(
        config.PICTURE_UPLOAD.FILE_NAME,
        Buffer.from('not an image'),
        'notes.jpg',
      );

    expect(status).toEqual(500);
    expect(body).toEqual({
      error: { message: 'Erreur lors de la génération de la miniature' },
    });
  });
});
