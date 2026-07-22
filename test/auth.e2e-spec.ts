/* eslint-disable @typescript-eslint/no-floating-promises */

import assert from 'node:assert/strict';
import { suite, test } from 'node:test';

import { API_BASE_URL, USERS } from './utilities/configuration.ts';
import { randomString } from './utilities/functions.ts';
import { HttpClient } from './utilities/http-client.ts';

/******************************************************************************************************/

const PATH = '/auth/login';

// Mirrors configuration.ts defaults; auth needs the raw password, which configuration
// intentionally does not export (it only exposes resolved tokens).
const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL ?? 'admin@ptsd-il.local';
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD ?? 'Admin@local123!';

function loginBody(body: unknown) {
  return { body: JSON.stringify(body), headers: { 'content-type': 'application/json' } };
}

async function getToken(email: string, password: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = (await response.json()) as { accessToken?: string };
  assert.ok(data.accessToken, `login failed for ${email}`);
  return data.accessToken;
}

async function loginStatus(email: string, password: string): Promise<number> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  await response.body?.cancel();
  return response.status;
}

/******************************************************************************************************/

suite('Auth integration tests', () => {
  const httpClient = new HttpClient();

  test('Valid - login returns accessToken', async () => {
    const response = await httpClient.post({
      path: PATH,
      token: 'none',
      expectedStatusCode: 201,
      options: loginBody({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    });
    const body = (await response!.json()) as { accessToken?: unknown };

    assert.strictEqual(typeof body.accessToken, 'string');
  });

  test('Invalid - wrong password', async () => {
    await httpClient.post({
      path: PATH,
      token: 'none',
      expectedStatusCode: 401,
      options: loginBody({ email: ADMIN_EMAIL, password: 'wrong-password' }),
      dropBody: true,
    });
  });

  test('Invalid - unknown email', async () => {
    await httpClient.post({
      path: PATH,
      token: 'none',
      expectedStatusCode: 401,
      options: loginBody({ email: 'nobody@ptsd-il.local', password: 'any' }),
      dropBody: true,
    });
  });

  test('Invalid - bad body', async () => {
    await httpClient.post({
      path: PATH,
      token: 'none',
      expectedStatusCode: 422,
      options: loginBody({ email: 'not-an-email', password: '' }),
      dropBody: true,
    });
  });
});

suite('Change password integration tests', () => {
  const httpClient = new HttpClient();
  const { masteradmin } = USERS;
  const CHANGE_PATH = '/auth/change-password';

  async function createUser(password: string): Promise<{ id: string; email: string }> {
    const email = `e2e-${randomString(8)}@ptsd-il.local`;
    const response = await httpClient.post({
      path: '/admin/users',
      token: masteradmin.token,
      expectedStatusCode: 201,
      options: {
        body: JSON.stringify({ firstName: 'Pw', lastName: 'Change', email, password }),
        headers: { 'content-type': 'application/json' },
      },
    });
    const user = (await response!.json()) as { id: string };
    return { id: user.id, email };
  }

  async function deleteUser(id: string): Promise<void> {
    await httpClient.delete({
      path: `/admin/users/${id}`,
      token: masteradmin.token,
      expectedStatusCode: 200,
      dropBody: true,
    });
  }

  test('Valid - user changes own password; new works, old fails', async () => {
    const user = await createUser('Known@pass123');
    const token = await getToken(user.email, 'Known@pass123');

    await httpClient.post({
      path: CHANGE_PATH,
      token,
      expectedStatusCode: 201,
      options: {
        body: JSON.stringify({ currentPassword: 'Known@pass123', newPassword: 'Changed@pass456' }),
        headers: { 'content-type': 'application/json' },
      },
      dropBody: true,
    });

    assert.strictEqual(await loginStatus(user.email, 'Changed@pass456'), 201);
    assert.strictEqual(await loginStatus(user.email, 'Known@pass123'), 401);

    await deleteUser(user.id);
  });

  test('Invalid - wrong current password returns 401', async () => {
    const user = await createUser('Known@pass123');
    const token = await getToken(user.email, 'Known@pass123');

    await httpClient.post({
      path: CHANGE_PATH,
      token,
      expectedStatusCode: 401,
      options: {
        body: JSON.stringify({ currentPassword: 'WrongCurrent1', newPassword: 'Changed@pass456' }),
        headers: { 'content-type': 'application/json' },
      },
      dropBody: true,
    });

    await deleteUser(user.id);
  });

  test('Invalid - short new password rejected (422)', async () => {
    const user = await createUser('Known@pass123');
    const token = await getToken(user.email, 'Known@pass123');

    await httpClient.post({
      path: CHANGE_PATH,
      token,
      expectedStatusCode: 422,
      options: {
        body: JSON.stringify({ currentPassword: 'Known@pass123', newPassword: 'short' }),
        headers: { 'content-type': 'application/json' },
      },
      dropBody: true,
    });

    await deleteUser(user.id);
  });

  test('Invalid - unauthenticated', async () => {
    await httpClient.post({
      path: CHANGE_PATH,
      token: 'none',
      expectedStatusCode: 401,
      options: {
        body: JSON.stringify({ currentPassword: 'Known@pass123', newPassword: 'Changed@pass456' }),
        headers: { 'content-type': 'application/json' },
      },
      dropBody: true,
    });
  });
});
