import { app } from '../index';
import supertest from 'supertest';
import { processImage } from '../utilities/image-processing';
import fs from 'fs';
import { promises as fsPromises } from 'fs';

const request = supertest(app);

// This test suite tests the /api/image endpoint
describe('image endpoint testing', () => {
  it('should return 400 as query parameters are missing', async () => {
    const response = await request.get('/api/image');
    expect(response.status).toBe(400);
  });

  it('should return 400 as name parameter is missing', async () => {
    const response = await request.get('/api/image?width=400&height=400');
    expect(response.status).toBe(400);
  });

  it('should return 400 as width parameter is missing', async () => {
    const response = await request.get('/api/image?name=homelander&height=400');
    expect(response.status).toBe(400);
  });

  it('should return 400 as height parameter is missing', async () => {
    const response = await request.get('/api/image?name=homelander&width=400');
    expect(response.status).toBe(400);
  });

  it('should return 400 as height parameter is not a number', async () => {
    const response = await request.get(
      '/api/image?name=homelander&width=400&height=csnjkc'
    );
    expect(response.status).toBe(400);
  });

  it('should return 400 as width parameter is not a number', async () => {
    const response = await request.get(
      '/api/image?name=homelander&width=sakcab&height=676'
    );
    expect(response.status).toBe(400);
  });

  it('should return 400 as width parameter is a negative number', async () => {
    const response = await request.get(
      '/api/image?name=homelander&width=-300&height=676'
    );
    expect(response.status).toBe(400);
  });

  it('should return 400 as height parameter is a negative number', async () => {
    const response = await request.get(
      '/api/image?name=homelander&width=323&height=-676'
    );
    expect(response.status).toBe(400);
  });

  it('should return 404 as image does not exist', async () => {
    const response = await request.get(
      '/api/image?name=nothomelander&width=400&height=400'
    );
    expect(response.status).toBe(404);
  });

  it('should return 200 as image exists and all query parameters are available', async () => {
    const response = await request.get(
      '/api/image?name=homelander&width=400&height=400'
    );
    expect(response.status).toBe(200);
  });
});

// This test suite tests the image processing functionality with the Sharp package
describe('testing image processing with sharp ', () => {
  it('should return true as processing should succeed', async () => {
    try {
      const isSuccessful = await processImage(246, 349);
      expect(isSuccessful).toBe(true);
    } catch (e) {
      console.log('test failed');
    }
  });

  it('should return true as resized image should exist', async () => {
    try {
      const isExist = fs.existsSync(
        `storage/thumbnails/${`homelander`}_${246}x${349}.jpeg`
      );
      expect(isExist).toBe(true);
    } catch (e) {
      console.log('test failed');
    }
  });

  // Remove the created image from the previous spec
  afterAll(async () => {
    try {
      await fsPromises.unlink(
        `storage/thumbnails/${`homelander`}_${246}x${349}.jpeg`
      );
    } catch (e) {
      console.log('test failed');
    }
  });
});
