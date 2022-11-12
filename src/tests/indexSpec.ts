import { app } from '../index';
import supertest from 'supertest';

const request = supertest(app);

// describe('index.ts test suite', () => {});

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
