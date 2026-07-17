import request from 'supertest';
import { BASE_URL, getAdminToken, getModeratorToken } from './helpers/auth';

describe('Categories (e2e)', () => {
  let adminToken: string;
  let moderatorToken: string;
  let createdId: string;

  beforeAll(async () => {
    [adminToken, moderatorToken] = await Promise.all([getAdminToken(), getModeratorToken()]);
  });

  afterAll(async () => {
    if (createdId) {
      await request(BASE_URL)
        .delete(`/api/categories/${createdId}`)
        .set('Authorization', `Bearer ${adminToken}`);
    }
  });

  it('GET /api/categories → 200 with array', async () => {
    const res = await request(BASE_URL).get('/api/categories');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/categories without auth → 401', async () => {
    const res = await request(BASE_URL)
      .post('/api/categories')
      .send({ slug: 'test', name: 'Test' });
    expect(res.status).toBe(401);
  });

  it('POST /api/categories with invalid slug → 400', async () => {
    const res = await request(BASE_URL)
      .post('/api/categories')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ slug: 'Invalid Slug!', name: 'Test' });
    expect(res.status).toBe(400);
  });

  it('POST /api/categories with admin → 201', async () => {
    const res = await request(BASE_URL)
      .post('/api/categories')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ slug: 'e2e-test-category', name: 'E2E Test Category', isActive: true });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ slug: 'e2e-test-category', name: 'E2E Test Category' });
    createdId = res.body.id as string;
  });

  it('GET /api/categories/:id → 200', async () => {
    const res = await request(BASE_URL).get(`/api/categories/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: createdId });
  });

  it('GET /api/categories/:id with unknown id → 404', async () => {
    const res = await request(BASE_URL).get('/api/categories/00000000-0000-0000-0000-000000000000');
    expect(res.status).toBe(404);
  });

  it('PUT /api/categories/:id with moderator → 200', async () => {
    const res = await request(BASE_URL)
      .put(`/api/categories/${createdId}`)
      .set('Authorization', `Bearer ${moderatorToken}`)
      .send({ name: 'E2E Test Category Updated' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ name: 'E2E Test Category Updated' });
  });

  it('DELETE /api/categories/:id with moderator → 403', async () => {
    const res = await request(BASE_URL)
      .delete(`/api/categories/${createdId}`)
      .set('Authorization', `Bearer ${moderatorToken}`);
    expect(res.status).toBe(403);
  });
});
