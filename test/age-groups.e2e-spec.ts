import request from 'supertest';
import { BASE_URL, getAdminToken, getModeratorToken } from './helpers/auth';

describe('Age Groups (e2e)', () => {
  let adminToken: string;
  let moderatorToken: string;
  let createdId: string;

  beforeAll(async () => {
    [adminToken, moderatorToken] = await Promise.all([getAdminToken(), getModeratorToken()]);
  });

  afterAll(async () => {
    if (createdId) {
      await request(BASE_URL)
        .delete(`/api/age-groups/${createdId}`)
        .set('Authorization', `Bearer ${adminToken}`);
    }
  });

  it('GET /api/age-groups → 200 with array', async () => {
    const res = await request(BASE_URL).get('/api/age-groups');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/age-groups without auth → 401', async () => {
    const res = await request(BASE_URL)
      .post('/api/age-groups')
      .send({ name: 'Adults', min: 18, max: 65 });
    expect(res.status).toBe(401);
  });

  it('POST /api/age-groups with invalid body → 400', async () => {
    const res = await request(BASE_URL)
      .post('/api/age-groups')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: '', min: -1, max: 0 });
    expect(res.status).toBe(400);
  });

  it('POST /api/age-groups with moderator → 201', async () => {
    const res = await request(BASE_URL)
      .post('/api/age-groups')
      .set('Authorization', `Bearer ${moderatorToken}`)
      .send({ name: 'Adults', min: 18, max: 65 });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: 'Adults', min: 18, max: 65 });
    createdId = res.body.id as string;
  });

  it('PUT /api/age-groups/:id with admin → 200', async () => {
    const res = await request(BASE_URL)
      .put(`/api/age-groups/${createdId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Adults Updated', min: 20, max: 60 });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ name: 'Adults Updated' });
  });

  it('DELETE /api/age-groups/:id with moderator → 403', async () => {
    const res = await request(BASE_URL)
      .delete(`/api/age-groups/${createdId}`)
      .set('Authorization', `Bearer ${moderatorToken}`);
    expect(res.status).toBe(403);
  });
});
