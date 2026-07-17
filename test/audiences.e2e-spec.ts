import request from 'supertest';
import { BASE_URL, getAdminToken, getModeratorToken } from './helpers/auth';

describe('Audiences (e2e)', () => {
  let adminToken: string;
  let moderatorToken: string;
  let createdId: string;

  beforeAll(async () => {
    [adminToken, moderatorToken] = await Promise.all([getAdminToken(), getModeratorToken()]);
  });

  afterAll(async () => {
    if (createdId) {
      await request(BASE_URL)
        .delete(`/api/audiences/${createdId}`)
        .set('Authorization', `Bearer ${adminToken}`);
    }
  });

  it('GET /api/audiences → 200 with array', async () => {
    const res = await request(BASE_URL).get('/api/audiences');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/audiences without auth → 401', async () => {
    const res = await request(BASE_URL)
      .post('/api/audiences')
      .send({ name: 'Veterans' });
    expect(res.status).toBe(401);
  });

  it('POST /api/audiences with invalid body → 400', async () => {
    const res = await request(BASE_URL)
      .post('/api/audiences')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: '' });
    expect(res.status).toBe(400);
  });

  it('POST /api/audiences with moderator → 201', async () => {
    const res = await request(BASE_URL)
      .post('/api/audiences')
      .set('Authorization', `Bearer ${moderatorToken}`)
      .send({ name: 'E2E Veterans', description: 'Test audience' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: 'E2E Veterans' });
    createdId = res.body.id as string;
  });

  it('PUT /api/audiences/:id with admin → 200', async () => {
    const res = await request(BASE_URL)
      .put(`/api/audiences/${createdId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'E2E Veterans Updated' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ name: 'E2E Veterans Updated' });
  });

  it('PUT /api/audiences/:id without auth → 401', async () => {
    const res = await request(BASE_URL)
      .put(`/api/audiences/${createdId}`)
      .send({ name: 'Should fail' });
    expect(res.status).toBe(401);
  });

  it('DELETE /api/audiences/:id with moderator → 403', async () => {
    const res = await request(BASE_URL)
      .delete(`/api/audiences/${createdId}`)
      .set('Authorization', `Bearer ${moderatorToken}`);
    expect(res.status).toBe(403);
  });
});
