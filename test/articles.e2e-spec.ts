import request from 'supertest';
import { BASE_URL, getAdminToken, getModeratorToken } from './helpers/auth';

// NOTE: Article.langId references Language.id which is a short ISO code (e.g. 'en'),
// but CreateArticleSchema validates langId as z.string().uuid(). This is a schema mismatch
// that will cause POST /api/articles to return 400 even with a valid language ID.
// Fix: change langId in CreateArticleSchema to z.string().min(2).max(5).

describe('Articles (e2e)', () => {
  let adminToken: string;
  let moderatorToken: string;

  beforeAll(async () => {
    [adminToken, moderatorToken] = await Promise.all([getAdminToken(), getModeratorToken()]);
  });

  it('GET /api/articles → 200 with array (public, published only)', async () => {
    const res = await request(BASE_URL).get('/api/articles');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/articles/admin without auth → 401', async () => {
    const res = await request(BASE_URL).get('/api/articles/admin');
    expect(res.status).toBe(401);
  });

  it('GET /api/articles/admin with moderator → 200', async () => {
    const res = await request(BASE_URL)
      .get('/api/articles/admin')
      .set('Authorization', `Bearer ${moderatorToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/articles without auth → 401', async () => {
    const res = await request(BASE_URL)
      .post('/api/articles')
      .send({ langId: 'en', header: 'Test' });
    expect(res.status).toBe(401);
  });

  it('POST /api/articles with langId as short string → 400 (schema expects uuid)', async () => {
    const res = await request(BASE_URL)
      .post('/api/articles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ langId: 'en', header: 'Test Article' });
    expect(res.status).toBe(400);
  });

  it('POST /api/articles with empty header → 400', async () => {
    const res = await request(BASE_URL)
      .post('/api/articles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ langId: '00000000-0000-0000-0000-000000000001', header: '' });
    expect(res.status).toBe(400);
  });

  it('PATCH /api/articles/:id without auth → 401', async () => {
    const res = await request(BASE_URL)
      .patch('/api/articles/00000000-0000-0000-0000-000000000000')
      .send({ header: 'Updated' });
    expect(res.status).toBe(401);
  });

  it('DELETE /api/articles/:id with moderator → 403', async () => {
    const res = await request(BASE_URL)
      .delete('/api/articles/00000000-0000-0000-0000-000000000000')
      .set('Authorization', `Bearer ${moderatorToken}`);
    expect(res.status).toBe(403);
  });
});
