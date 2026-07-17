import request from 'supertest';
import { BASE_URL, getAdminToken, getModeratorToken } from './helpers/auth';

describe('Languages (e2e)', () => {
  let adminToken: string;
  let moderatorToken: string;
  let createdId: string;

  beforeAll(async () => {
    [adminToken, moderatorToken] = await Promise.all([getAdminToken(), getModeratorToken()]);
  });

  afterAll(async () => {
    if (createdId) {
      await request(BASE_URL)
        .delete(`/api/languages/${createdId}`)
        .set('Authorization', `Bearer ${adminToken}`);
    }
  });

  it('GET /api/languages → 200 with array', async () => {
    const res = await request(BASE_URL).get('/api/languages');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/languages without auth → 401', async () => {
    const res = await request(BASE_URL)
      .post('/api/languages')
      .send({ id: 'xx', name: 'Test' });
    expect(res.status).toBe(401);
  });

  it('POST /api/languages with moderator → 403', async () => {
    const res = await request(BASE_URL)
      .post('/api/languages')
      .set('Authorization', `Bearer ${moderatorToken}`)
      .send({ id: 'xx', name: 'Test' });
    expect(res.status).toBe(403);
  });

  it('POST /api/languages with invalid body → 400', async () => {
    const res = await request(BASE_URL)
      .post('/api/languages')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ id: 'toolongid', name: '' });
    expect(res.status).toBe(400);
  });

  it('POST /api/languages with admin → 201', async () => {
    const res = await request(BASE_URL)
      .post('/api/languages')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ id: 'xx', name: 'Test Language', direction: 'ltr', isActive: true });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 'xx', name: 'Test Language' });
    createdId = res.body.id as string;
  });

  it('PUT /api/languages/:id with admin → 200', async () => {
    const res = await request(BASE_URL)
      .put(`/api/languages/${createdId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Test Language Updated' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ name: 'Test Language Updated' });
  });

  it('PUT /api/languages/:id without auth → 401', async () => {
    const res = await request(BASE_URL)
      .put(`/api/languages/${createdId}`)
      .send({ name: 'Should fail' });
    expect(res.status).toBe(401);
  });

  it('DELETE /api/languages/:id with moderator → 403', async () => {
    const res = await request(BASE_URL)
      .delete(`/api/languages/${createdId}`)
      .set('Authorization', `Bearer ${moderatorToken}`);
    expect(res.status).toBe(403);
  });
});
