import request from 'supertest';

export const BASE_URL = process.env['TEST_BASE_URL'] ?? 'http://localhost:3000';
export const ADMIN_EMAIL = process.env['TEST_ADMIN_EMAIL'] ?? 'admin@ptsd-il.local';
export const ADMIN_PASSWORD = process.env['TEST_ADMIN_PASSWORD'] ?? 'Admin@local123!';
export const MODERATOR_EMAIL = process.env['TEST_MODERATOR_EMAIL'] ?? 'moderator@ptsd-il.local';
export const MODERATOR_PASSWORD = process.env['TEST_MODERATOR_PASSWORD'] ?? 'Mod@local123!';

export async function getAdminToken(): Promise<string> {
  const res = await request(BASE_URL)
    .post('/api/auth/login')
    .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
  return res.body.accessToken as string;
}

export async function getModeratorToken(): Promise<string> {
  const res = await request(BASE_URL)
    .post('/api/auth/login')
    .send({ email: MODERATOR_EMAIL, password: MODERATOR_PASSWORD });
  return res.body.accessToken as string;
}
