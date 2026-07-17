import request from 'supertest';
import { BASE_URL, getAdminToken, getModeratorToken } from './helpers/auth';

describe('Communities (e2e)', () => {
  let adminToken: string;
  let moderatorToken: string;
  let createdId: string;

  beforeAll(async () => {
    [adminToken, moderatorToken] = await Promise.all([getAdminToken(), getModeratorToken()]);
  });

  afterAll(async () => {
    if (createdId) {
      await request(BASE_URL)
        .delete(`/api/communities/${createdId}`)
        .set('Authorization', `Bearer ${adminToken}`);
    }
  });

  it('GET /api/communities → 200 with array', async () => {
    const res = await request(BASE_URL).get('/api/communities');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/communities without auth → 401', async () => {
    const res = await request(BASE_URL)
      .post('/api/communities')
      .send({ name: 'Test Community' });
    expect(res.status).toBe(401);
  });

  it('POST /api/communities with invalid contactUrl → 400', async () => {
    const res = await request(BASE_URL)
      .post('/api/communities')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Test', contactUrl: 'not-a-url' });
    expect(res.status).toBe(400);
  });

  it('POST /api/communities with moderator → 201', async () => {
    const res = await request(BASE_URL)
      .post('/api/communities')
      .set('Authorization', `Bearer ${moderatorToken}`)
      .send({
        name: 'E2E Test Community',
        description: 'Created in e2e test',
        isActive: true,
      });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: 'E2E Test Community' });
    createdId = res.body.id as string;
  });

  it('GET /api/communities/:id → 200', async () => {
    const res = await request(BASE_URL).get(`/api/communities/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: createdId });
  });

  it('GET /api/communities/:id with unknown id → 404', async () => {
    const res = await request(BASE_URL).get('/api/communities/00000000-0000-0000-0000-000000000000');
    expect(res.status).toBe(404);
  });

  it('PUT /api/communities/:id with moderator → 200', async () => {
    const res = await request(BASE_URL)
      .put(`/api/communities/${createdId}`)
      .set('Authorization', `Bearer ${moderatorToken}`)
      .send({ name: 'E2E Test Community Updated' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ name: 'E2E Test Community Updated' });
  });

  it('DELETE /api/communities/:id with moderator → 403', async () => {
    const res = await request(BASE_URL)
      .delete(`/api/communities/${createdId}`)
      .set('Authorization', `Bearer ${moderatorToken}`);
    expect(res.status).toBe(403);
  });
});
