import request from 'supertest';
import { BASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD } from './helpers/auth';

describe('Auth (e2e)', () => {
  it('POST /api/auth/login with valid credentials → 201 with accessToken', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('accessToken');
    expect(typeof res.body.accessToken).toBe('string');
  });

  it('POST /api/auth/login with wrong password → 401', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/login')
      .send({ email: ADMIN_EMAIL, password: 'wrong-password' });

    expect(res.status).toBe(401);
  });

  it('POST /api/auth/login with unknown email → 401', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/login')
      .send({ email: 'nobody@ptsd-il.local', password: 'any' });

    expect(res.status).toBe(401);
  });

  it('POST /api/auth/login with invalid body → 400', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/login')
      .send({ email: 'not-an-email', password: '' });

    expect(res.status).toBe(400);
  });
});
